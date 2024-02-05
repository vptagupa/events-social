<?php

namespace App\Repositories;

use App\Models\Event;
use App\Models\Fee;
use App\Models\SystemFee;

class SystemFeeRepository extends Repository
{
    use Conditions\SystemFeeConditions;

    public function __construct(protected SystemFee $model)
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

        $model = $event->systemFees()->whereModelId($fee->id)->first();

        if ($model) {
            $model->active = $checked;
            return $model->save();
        }

        $event->systemFees()->save(
            new Fee([
                'model_type' => SystemFee::class,
                'model_id' => $fee->id,
                'price' => $fee->price,
                'active' => $checked
            ])
        );
    }
}