<?php

namespace App\Repositories;

use App\Models\Export;

class ExportRepository extends Repository
{
    use Conditions\ExportConditions;

    public function __construct(protected Export $model)
    {

    }
}