<?php

namespace App\Repositories\Conditions;

trait Conditions
{
    public function conditions($builder, $query)
    {
        $keys = array_keys($query);

        foreach ($keys as $key) {
            if (preg_match('/(\w+|\W+|\w+)*\(\d\)/', $key, $matches)) {
                $key = preg_replace('/\(\d\)/', '', $matches[0]);
                preg_match('/\d/', $matches[0], $limit);

                $query[$key]['limit'] = $limit[0];
            }

            $key = str_replace('.', 'With_', $key);
            $condition = str($key)->camel() . 'Condition';

            $builder = $this->$condition($builder, $query);
        }

        return $builder;
    }

    public function idCondition(&$builder, $query)
    {
        return $builder->when(isset($query['id']) && $query['id'], function ($builder) use ($query) {
            $builder->whereId($query['id']);
        });
    }

    public function nameCondition(&$builder, $query)
    {
        return $builder->when(isset($query['name']) && $query['name'], function ($builder) use ($query) {
            $builder->where('name', 'like', '%' . $query['name'] . '%');
        });
    }
}