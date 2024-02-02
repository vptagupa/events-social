<?php

namespace App\Repositories;

class Repository
{
    use Conditions\Conditions;

    public function model()
    {
        return $this->model;
    }

    public function create(array $data)
    {
        return $this->model()->create($data);
    }

    public function update(array $data, $id, $key = 'id')
    {
        $model = $this->model()->where($key, $id)->first();

        foreach ($data as $key => $value) {
            $model->$key = $value;
        }

        $model->save();
    }

    public function delete(int $id)
    {
        return $this->model()->destroy($id);
    }

    public function find(int $id)
    {
        return $this->model()->find($id);
    }

    public function all($columns = ["*"])
    {
        return $this->model();
    }

    public function list(
        $query = [],
        $perPage = 10,
        $paginate = false,
        $first = false,
        $get = false,
        $columns = ['*'],
        $limit = null,
        array $orderBy = []
    ) {
        $builder = $this->model()->newQuery();
        if ($columns[0] != '*') {
            $builder->select($columns);
        }

        $builder = $this->conditions($builder, $query);

        if ($orderBy) {
            $builder->orderBy($orderBy[0], $orderBy[1]);
        }

        if ($limit) {
            $builder->limit($limit);
        }

        if ($paginate) {
            return $builder->paginate($perPage);
        }

        if ($first) {
            return $builder->first();
        }

        if ($get) {
            return $builder->get();
        }

        return $builder;
    }
}