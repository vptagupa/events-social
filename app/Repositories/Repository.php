<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class Repository
{
    use Conditions\Conditions;

    /**
     * @TODO: Allow model return type as mixed so it can return a multiple models or paginated results
     */
    public function model()
    {
        return $this->model;
    }

    public function create(array $data): ?Model
    {
        return $this->model()->create($data);
    }

    public function update(array $data, $id, $key = 'id'): ?Model
    {
        $id = is_array($id) ? $id : [$id];
        $model = $this->model()->whereIn($key, $id)->first();

        foreach ($data as $key => $value) {
            $model->$key = $value;
        }

        $model->save();

        return $model;
    }

    public function callableUpdate(callable $callable, $id, $key = 'id', $chunk = 100)
    {
        $id = is_array($id) ? $id : [$id];
        $this->model()->whereIn($key, $id)->chunkById($chunk, function (Collection $models) use ($callable) {
            $callable($models);
        }, $key);
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
            if (is_array($orderBy[0])) {
                foreach ($orderBy as $sort) {
                    $builder->orderBy($sort['key'], $sort['asc'] ? 'asc' : 'desc');
                }
            } else {
                $builder->orderBy($orderBy[0], $orderBy[1]);
            }
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