<?php

namespace App\Repositories;

use App\Models\Event;
use App\Models\Fee;
use App\Models\OrganizerFee;

class OrganizerFeeRepository extends Repository
{
    use Conditions\OrganizerFeeConditions;

    public function __construct(protected OrganizerFee $model)
    {

    }

    public function activate($id)
    {
        $model = $this->find($id);

        $this->update([
            'active' => !$model->active
        ], $id);
    }

    public function updateEvent(Event $event, int $fee, bool $checked)
    {
        $fee = $this->find($fee);

        $model = $event->organizerFees()->whereModelId($fee->id)->first();

        if ($model) {
            $model->active = $checked;
            return $model->save();
        }

        $event->organizerFees()->save(
            new Fee([
                'model_type' => OrganizerFee::class,
                'model_id' => $fee->id,
                'price' => $fee->price,
                'active' => $checked
            ])
        );
    }
}