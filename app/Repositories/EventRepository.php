<?php

namespace App\Repositories;

use App\Models\Event;
use App\Models\Offer;

class EventRepository extends Repository
{
    use Conditions\EventConditions;

    public function __construct(protected Event $model)
    {
        // 
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
}