<?php

namespace App\Repositories;

use App\Models\Audit;

class AuditRepository extends Repository
{
    use Conditions\AuditConditions;

    public function __construct(Audit $model)
    {
        $this->model = $model;
    }
}