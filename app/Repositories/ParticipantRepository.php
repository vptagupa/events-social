<?php

namespace App\Repositories;

use App\Enums\PaymentStatus;
use App\Models\Participant;
use App\Models\Transaction;
use App\Models\Workshop;
use App\Services\Payment;
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
     * @param array $data, int $id, int $event, float $price
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
                $transaction->file()->associate($this->saveFile($data['file']));
                $transaction->save();

                $workshop->payment_status = PaymentStatus::SUBMITTED;
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
                    ]
                )
            );
        }, 2);
    }
}