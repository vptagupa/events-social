<?php

namespace App\Repositories\Creators;

use App\Services\Griddable;

class Registration
{
    protected $data = [];

    public function __construct(private array $flex)
    {

    }

    protected function create()
    {
        Griddable::grids($this->flex['grids'], function ($grid, $column, $component, $flex) {
            $this->data[] = [
                'flex' => $flex['flex'],
                'grid' => $grid['grid'],
                'column' => $column['column'],
                'component' => $component['id'],
                'name' => $component['config']['name'] ?? "",
                'value' => $component['value'] ?? "",
            ];
        }, $this->flex);

        return $this->data;
    }

    public static function generate(array $flex)
    {
        $registration = new Registration($flex);

        return $registration->create();
    }
}