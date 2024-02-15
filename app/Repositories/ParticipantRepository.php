<?php

namespace App\Repositories;

use App\Enums\PaymentStatus;
use App\Models\Participant;
use App\Models\Transaction;
use App\Models\Workshop;
use App\Repositories\Creators\Registration;
use App\Services\Payment;
use Carbon\Carbon;
use Illuminate\Http\UploadedFile;

class ParticipantRepository extends Repository
{
    use Conditions\ParticipantCondition;
    use Creators\File;

    public function __construct(protected Participant $model)
    {
        $this->file = app()->make(FileRepository::class);
    }

    public function create(array $data): ?Participant
    {
        if (!isset($data['password'])) {
            $data['password'] = bcrypt(config('auth.password_default'));
        }

        return parent::create($data);
    }

    /**
     * Upload proof of payment
     * @param array $data, int $id
     * @expected $data {
     *  file as Illuminate\Http\UploadedFile,
     *  event_id as int
     *  price as float
     *  tax as int presentage as percentage
     *  paid_amount as float, nullable
     * }
     * @sideEffect file will be stored in the file system
     * @throws \Exception
     */
    public function uploadProofOfPayment(array $data, int $id)
    {
        \DB::transaction(function () use ($data, $id) {
            $model = $this->find($id);

            $workshop = function () use ($model, $data) {
                return $model->workshop($data['event_id'])->first();
            };

            $payment = Payment::calculate($data['event_id'], $data['price'], $data['tax']);
            $transaction = $workshop()->save(
                new Transaction([
                    'expected_price' => $payment['total'],
                    'actual_paid_amount' => $data['paid_amount'] ?? 0,
                    'charges' => $payment['total_fees'],
                    'price' => $payment['price'],
                    'tax_amount' => $payment['tax_amount'],
                    'tax' => $payment['tax'],
                ])
            );

            $model->refresh();

            $workshop = $workshop();

            if ($data['file'] instanceof UploadedFile) {
                $transaction->file()->associate($this->saveFile($data['file'], 'payments'));
                $transaction->save();

                $workshop->payment_status = PaymentStatus::SUBMITTED;
                $workshop->payment_at = Carbon::now();
                $workshop->save();
            }
        });
    }

    /**
     * Invite participant to the event
     * @param array $data
     * @expected $data {email, event_id}
     * @sideEffect send invitation email
     * @throws \Exception
     */
    public function sendInvitation(array $data)
    {
        \DB::transaction(function () use ($data) {
            $model = $this->model()->whereEmail($data['email'])->first();
            if (!$model) {
                $model = $this->create([
                    'email' => $data['email']
                ]);
            }

            $model->workshops()->save(
                new Workshop(
                    [
                        'code' => '', // code will be added when created successfully
                        'event_id' => $data['event_id'],
                        'invited_at' => Carbon::now()
                    ]
                )
            );
        }, 2);
    }

    /**
     * Register participant
     * @param array $data, int $id
     * @expected $data {
     *  event_id as int
     *  flexis as array (
     *      flex, grids, columns, components
     * )
     * }
     * @throws \Exception
     */
    public function register($data, int $id)
    {
        foreach ($data['flexis'] as $flex) {
            $this->storeForm(
                ['flex' => $flex, 'event_id' => $data['event_id']],
                $id
            );
        }

        $model = $this->find($id);
        $workshop = $model->workshops()->where('event_id', $data['event_id'])->first();

        $workshop->submitted_at = Carbon::now();
        $workshop->save();
    }

    /**
     * Store participant registration form
     * @param array $data, int $id
     * @expected $data {
     *  event_id as int
     *  flex as array (
     *      flex, grids, columns, components
     * )
     * }
     * @throws \Exception
     */
    public function storeForm($data, int $id)
    {
        \DB::transaction(function () use ($data, $id) {
            $model = $this->find($id);

            $workshop = function () use ($model, $data) {
                return $model->workshops()->where('event_id', $data['event_id'])->first();
            };

            if (!$workshop()) {
                $model->workshops()->save(
                    new Workshop(
                        [
                            'code' => '', // code will be added when created successfully
                            'event_id' => $data['event_id'],
                        ]
                    )
                );

                $model->refresh();
            }

            $registrationValuesParser = function ($registration) {
                if ($registration['value'] instanceof UploadedFile) {
                    $registration['value'] = $this->saveFile($registration['value'], "participants")->id;
                }

                return $registration;
            };

            $workshop = $workshop();

            foreach (Registration::generate($data['flex']) as $row) {
                $where = $row;
                $row = $registrationValuesParser($row);

                unset($where['name'], $where['value']);

                $registraion = $workshop->registrations()->where($where);

                if ($registraion->exists()) {
                    $registraion = $registraion->first();
                    $registraion->name = $row['name'];
                    $registraion->value = $row['value'];
                    $registraion->save();
                } else {
                    $workshop->registrations()->save(
                        new \App\Models\Registration(
                            $row
                        )
                    );
                }
            }
        });
    }

    /**
     * Register participant
     * @param array $data, int $id
     * @expected $data {
     *  event_id as int
     *  file as Illuminate\Http\UploadedFile
     *  method as string
     * }
     * @throws \Exception
     */
    public function pay($data, int $id)
    {
        \DB::transaction(function () use ($data, $id) {
            $model = $this->find($id);
            $workshop = $model->workshops()->where('event_id', $data['event_id'])->first();

            $breakdown = $workshop->priceBreakdown();

            $file = null;
            if ($data['file'] instanceof UploadedFile) {
                $file = $this->saveFile($data['file'], "payments");
            }

            $workshop->transactions()->save(
                new Transaction([
                    'expected_price' => $breakdown['total'],
                    'actual_paid_amount' => 0,
                    'charges' => $breakdown['total_fees'],
                    'price' => $workshop->price,
                    'tax_amount' => $breakdown['tax_amount'],
                    'tax' => $breakdown['tax'],
                    'paid_at' => Carbon::now(),
                    'is_gateway' => $data['method'] == 'gateway' ? true : false,
                    'file_id' => $file?->id
                ])
            );

            $workshop->payment_status = PaymentStatus::SUBMITTED;
            $workshop->payment_at = Carbon::now();
            $workshop->save();
        });
    }

    /**
     * Join participant to the event
     * @param array $data
     * @expected $data {email, event_id}
     * @sideEffect send joining email
     * @throws \Exception
     */
    public function join(array $data): Participant
    {
        \DB::transaction(function () use ($data) {
            $model = $this->model()->whereEmail($data['email'])->first();
            if (!$model) {
                $model = $this->create([
                    'email' => $data['email']
                ]);
            }

            $model->workshops()->save(
                new Workshop(
                    [
                        'code' => '', // code will be added when created successfully
                        'event_id' => $data['event_id'],
                    ]
                )
            );
        }, 2);

        return $this->model()->whereEmail($data['email'])->first();
    }

    public function getStatistics()
    {

    }
}