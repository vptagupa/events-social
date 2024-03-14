<?php

namespace App\Repositories;

use App\Enums\PaymentStatus;
use App\Models\Event;
use App\Models\Export;
use App\Models\Offer;

use App\Exports\ParticipantsExport;
use Carbon\Carbon;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Str;
use Illuminate\Http\UploadedFile;

class EventRepository extends Repository
{
    use Conditions\EventConditions;
    use Creators\File;

    public function __construct(protected Event $model)
    {
        $this->file = app()->make(FileRepository::class);
    }

    public function activate(int $id)
    {
        $model = $this->find($id);

        $this->update([
            'active' => !$model->active
        ], $id);
    }

    /**
     * Store or update offers
     */
    public function saveOffers(int $id, $data, array $offers)
    {
        $event = $this->update($data, $id);

        if (!$event->is_offer_package)
            return;

        foreach ($event->offers as $offer) {
            $update = array_values(
                array_filter(
                    $offers,
                    fn($f) => $f['id'] == $offer->id
                )
            );
            if (isset($update[0])) {
                $update = $update[0];
                $offer->name = $update['name'];
                $offer->description = $update['description'];
                $offer->price = $event->is_free ? 0 : $update['price'];
                $offer->active = $update['active'];
                $offer->save();
            } else {
                $offer->delete();
            }
        }

        $newOffers = array_filter($offers, function ($f) use ($event) {
            $exist = $event->offers->filter(fn($d) => $d->id == $f['id'])->first();

            // Return only the non existing
            return $exist ? false : true;
        });

        if (count($newOffers) > 0) {
            $event->offers()->saveMany(array_map(fn($offer) => new Offer([
                'name' => $offer['name'],
                'description' => $offer['description'],
                'price' => $event->is_free ? 0 : $offer['price'],
                'active' => $offer['active'],
            ]), $newOffers));
        }
    }

    /**
     * Export participants
     * @expected $data {
     *  int event_id,
     *  array filter
     * }
     */
    public function export($type, $criteria)
    {
        $event = $this->find($criteria['event_id']);

        $types = [
            'pdf' => \Maatwebsite\Excel\Excel::DOMPDF,
            'csv' => \Maatwebsite\Excel\Excel::CSV
        ];

        $type = strtolower($type);
        $path = 'public/exports/' . Str::uuid() . '.' . $type;
        $filename = Carbon::now()->format('Ymdhis') . '.' . $type;

        Excel::store(
            new ParticipantsExport($criteria),
            $path,
            'local',
            $types[$type],
        );

        $criteria['type'] = $type;

        return $event->exports()->save(new Export([
            'criteria' => $criteria,
            'path' => $path,
            'filename' => $filename
        ]));
    }

    /**
     * Get event stat counts
     */
    public function statistics(int $event)
    {
        $event = $this->find($event);

        return [
            'registered' => $event->workshops->count(),
            'confirmed' => $event->workshops()->whereNotNull('confirmed_at')->count(),
            'payments_accepted' => $event->workshops()->where('payment_status', PaymentStatus::CONFIRMED)->count(),
            'pending_payments' => $event->workshops()
                ->where('payment_status', '<>', PaymentStatus::CONFIRMED)
                ->whereNotNull('submitted_at')
                ->count(),
            'failed' => $event->workshops()->where('payment_status', PaymentStatus::FAILED)->count(),
            'attendance' => $event->workshops()->whereHas('attendance')->count(),
        ];
    }

    /**
     * Update official receipt settings
     */
    public function updateOfficialReceipt(array $data, int $event)
    {
        $model = $this->find($event);

        if (isset($data['signature']) && $data['signature'] instanceof UploadedFile) {
            $signature = $this->saveFile($data['signature'], 'events/signatures');
            $model->officialReceiptSignature()->associate($signature);
            $model->save();
        }

        unset($data['signature']);

        $this->update($data, $event);
    }
}