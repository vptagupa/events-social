<?php

namespace App\Repositories\Conditions;

trait ExportConditions
{
    public function exportableIdCondition(&$builder, $query)
    {
        return $builder->when(isset($query['exportable_id']) && $query['exportable_id'], function ($builder) use ($query) {
            $builder->whereExportableId($query['exportable_id']);
        });
    }

    public function exportableTypeCondition(&$builder, $query)
    {
        return $builder->when(isset($query['exportable_type']) && $query['exportable_type'], function ($builder) use ($query) {
            $builder->whereExportableType($query['exportable_type']);
        });
    }
}