<?php

namespace App\Repositories\Creators;

class Registration
{
    protected $data = [];

    public function __construct(private array $flex)
    {

    }

    protected function grids(array $flex)
    {
        foreach ($flex['grids'] as $grid) {
            foreach ($grid['columns'] as $column) {
                foreach ($column['components'] as $component) {
                    if (isset($component['type']) && $component['type'] == 'grid') {
                        $component['flex'] = $component['id'];
                        return $this->grids($component);
                    }
                    $this->data[] = [
                        'flex' => $flex['flex'],
                        'grid' => $grid['grid'],
                        'column' => $column['column'],
                        'component' => $component['id'],
                        'name' => $component['config']['name'] ?? "",
                        'value' => $component['value'] ?? "",
                    ];
                }
            }
        }
    }

    protected function create()
    {
        $this->grids($this->flex);

        return $this->data;
    }

    public static function generate(array $flex)
    {
        $registration = new Registration($flex);

        return $registration->create();
    }
}