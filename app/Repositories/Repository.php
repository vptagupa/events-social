<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Model;

class Repository
{
    use Conditions\Conditions;

    public function model()
    {
        return $this->model;
    }

    public function create(array $data): Model
    {
        return $this->model()->create($data);
    }

    public function update(array $data, $id, $key = 'id'): Model
    {
        $model = $this->model()->where($key, $id)->first();

        foreach ($data as $key => $value) {
            $model->$key = $value;
        }

        $model->save();

        return $model;
    }

    public function delete(int $id)
    {
        return $this->model()->destroy($id);
    }

    public function find(int $id): Model
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
        array $orderBy = [],
        $pageName = 'page'
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
            return $builder->paginate(
                $perPage,
                pageName: $pageName
            );
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