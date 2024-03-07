<?php

namespace App\Repositories\Conditions;

trait AuditConditions
{
    public function auditableTypeCondition(&$builder, $query)
    {
        return $builder->when(isset($query['auditable_type']) && $query['auditable_type'], function ($builder) use ($query) {
            $builder->where('auditable_type', 'like', '%' . $query['auditable_type'] . '%');
        });
    }

    public function userCondition(&$builder, $query)
    {
        return $builder->when(isset($query['user']) && $query['user'], function ($builder) use ($query) {
            $builder->with('user');
        });
    }
}