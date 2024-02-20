<?php

namespace App\Models\Generators;

use Illuminate\Database\Eloquent\Casts\Attribute;
use React\Dns\Config\Config;

trait RegistrationFormGenerator
{
    public function getKeyValue($key)
    {
        foreach ($this->schema['flexis'] as $flex) {
            $value = $this->grids($flex, $key);
            if ($value) {
                return $value;
            }
        }
    }

    protected function grids($flex, $key)
    {
        foreach ($flex['grids'] as $grid) {
            foreach ($grid['columns'] as $column) {
                foreach ($column['components'] as $component) {
                    if ($component['type'] == 'grid') {
                        return $this->grids($component, $key);
                    }

                    if (isset($component['config']['name']) && strtolower($component['config']['name']) == strtolower($key)) {
                        return $component['value'] ?? '';
                    }
                }
            }
        }
    }
}