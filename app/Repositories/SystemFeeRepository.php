<?php

namespace App\Repositories;

use App\Models\SystemFee;

class SystemFeeRepository extends Repository
{
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
}