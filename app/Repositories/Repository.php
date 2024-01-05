<?php

namespace App\Repositories;

class Repository
{
    protected $model;

    public function model()
    {
        return $this->model;
    }

    public function create(array $data)
    {
        return $this->model->create($data);
    }

    public function update(array $data, $id, $key = 'id')
    {
        $model = $this->model->where($key, $id)->first();

        foreach ($data as $key => $value) {
            $model->$key = $value;
        }

        $model->save();
    }

    public function delete($id)
    {
        return $this->model->destroy($id);
    }

    public function find($id)
    {
        return $this->model->find($id);
    }

    public function all($columns = ["*"])
    {
        return $this->model;
    }
}