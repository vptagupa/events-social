<?php

namespace App\Services;

class Griddable
{
    public static function grids($grids, \Closure $callback, $flex = null)
    {
        foreach ($grids as $grid) {
            foreach ($grid['columns'] as $column) {
                foreach ($column['components'] as $component) {
                    if ($component['type'] == 'grid') {
                        $component['flex'] = $component['id'];
                        static::grids($component['grids'], $callback, $component);
                    } else {
                        $callback($grid, $column, $component, $flex);
                    }
                }
            }
        }

        return $grids;
    }
}