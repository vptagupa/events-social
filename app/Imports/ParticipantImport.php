<?php

namespace App\Imports;

use App\Models\Event;
use App\Models\Participant;
use App\Models\Registration;
use App\Models\Workshop;
use App\Repositories\EventRepository;
use App\Repositories\ParticipantRepository;
use App\Services\Griddable;
use Carbon\Carbon;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Imports\HeadingRowFormatter;

class ParticipantImport implements ToCollection, WithHeadingRow
{
    private $participant;
    private $event;

    public function __construct(protected $eventSlug)
    {
        ini_set('memory_limit', '512M');
        ini_set('max_execution_time', '0');


        $this->participant = app()->make(ParticipantRepository::class);
        $this->event = app()->make(EventRepository::class);

        HeadingRowFormatter::default('none');
    }

    /**
     * @param Collection $collection
     */
    public function collection(Collection $rows)
    {
        $event = $this->event->model()->where('slug', $this->eventSlug)->first();
        foreach ($rows as $row) {
            \DB::transaction(function () use ($row, $event) {
                if ($participant = $this->participant($row)) {
                    $this->registrationForm(
                        $this->workshop($participant, $event, $row),
                        $row
                    );
                }
            });
        }
    }

    /**
     * No insert for duplicate records of email address and full name
     * For entries with the same email address but different full name, 
     * the email address will be appended by a -duplicate keyword
     * this is to ensure that all records are imported without errors since email addresses are unique in the database
     */
    private function participant($row)
    {
        if (!empty($row['Email Address'])) {
            $name = $row['Professional Title'] . ' ' . $row['Firstname'] . ' ' . $row['Middle Initial (M. I.)'] . ' ' . $row['Lastname'];
            $participant = $this->participant->model()->where([
                'email' => $row['Email Address'],
                'name' => $name,
            ])->first();

            if (!$participant) {
                $exists = $this->participant->model()->where([
                    'email' => $row['Email Address'],
                ])->exists();

                $email = $exists ? $row['Email Address'] . '-duplicate' : $row['Email Address'];

                $exists = $this->participant->model()->where([
                    'email' => $email,
                ])->exists();

                if (!$exists) {
                    $participant = $this->participant->create([
                        'name' => $name,
                        'email' => $email,
                        'password' => bcrypt(config('auth.password_default'))
                    ]);

                    return $participant;
                }
            }
        }

        return null;
    }

    private function workshop(Participant $participant, Event $event, $data)
    {
        $offer = $event->offers()->first();
        $price = $event->is_offer_package ? $offer->price : $event->price;

        $participant->workshops()->save(
            new Workshop([
                'code' => '',
                'event_id' => $event->id,
                'participant_id' => $participant->id,
                'offer_id' => $offer?->id,
                'payment_status' => null,
                'notified_at' => null,
                'accepted_at' => null,
                'submitted_at' => !empty($data['Timestamp']) ? Carbon::parse($data['Timestamp'])->format('Y-m-d H:i:s') : null,
                'payment_at' => null,
                'confirmed_at' => null,
                'invited_at' => null,
                'cancelled_at' => null,
                'amount' => $price,
                'note' => null
            ])
        );

        $participant->refresh();

        return $participant->workshops()->latest()->first();
    }

    private function registrationForm(Workshop $workshop, $row)
    {
        $form = $workshop->event->registrationForm;

        foreach ($form->schema['flexis'] as $flex) {
            Griddable::grids($flex['grids'], function ($grid, $column, $component, $flex) use ($row, $workshop) {
                foreach ($row as $key => $value) {
                    if (trim($key) == trim(($component['config']['name'] ?? ''))) {
                        $workshop->registrations()->saveQuietly(
                            new Registration([
                                'flex' => $flex['flex'],
                                'grid' => $grid['grid'],
                                'column' => $column['column'],
                                'component' => $component['id'],
                                'name' => trim($key),
                                'value' => trim($value ?: '')
                            ])
                        );
                    }
                }
            }, $flex);
        }
    }
}
