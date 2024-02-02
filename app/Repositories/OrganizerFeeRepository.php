<?php

namespace App\Repositories;

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
}