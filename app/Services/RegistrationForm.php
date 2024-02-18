<?php

namespace App\Services;

use App\Repositories\ParticipantRepository;

class RegistrationForm
{
    private $workshop;
    private $model;
    public function __construct(private ParticipantRepository $repository)
    {

    }

    public static function populate(int $participant, int $event)
    {
        $repository = app()->make(ParticipantRepository::class);
        return (new RegistrationForm($repository))->get($participant, $event);
    }

    public function get(int $participant, int $event)
    {
        $this->model = $this->repository->find($participant);
        $this->workshop = $this->model->currentWorkshop($event);

        return array_map(function ($flex) {

            $flexReg = function ($flex) {
                return $this->workshop->registrations()->where('flex', $flex['flex'])->exists();
            };

            if ($flexReg($flex)) {
                $flex = $this->grids($flex);
            }

            return $flex;
        }, $this->workshop->event->registrationForm->schema['flexis']);
    }

    private function grids($flex)
    {
        $gridReg = function ($flex, $grid) {
            \Log::info($flex);
            return $this->workshop->registrations()->where([
                'flex' => isset($flex['flex']) ? $flex['flex'] : $flex['id'],
                'grid' => $grid['grid'],
            ])->exists();
        };

        $flex['grids'] = array_map(function ($grid) use ($flex, $gridReg) {
            if ($gridReg($flex, $grid)) {
                $grid = $this->columns($flex, $grid);
            }
            return $grid;
        }, $flex['grids']);

        return $flex;
    }

    private function columns($flex, $grid)
    {
        $columnReg = function ($flex, $grid, $column) {
            return $this->workshop->registrations()->where([
                'flex' => isset($flex['flex']) ? $flex['flex'] : $flex['id'],
                'grid' => $grid['grid'],
                'column' => $column['column'],
            ])->exists();
        };

        $grid['columns'] = array_map(function ($column) use ($flex, $grid, $columnReg) {
            if ($columnReg($flex, $grid, $column)) {
                $column = $this->components($flex, $grid, $column);
            }
            return $column;
        }, $grid['columns']);

        return $grid;
    }

    private function components($flex, $grid, $column)
    {
        $componentReg = function ($flex, $grid, $column, $component) {
            return $this->workshop->registrations()->where([
                'flex' => isset($flex['flex']) ? $flex['flex'] : $flex['id'],
                'grid' => $grid['grid'],
                'column' => $column['column'],
                'component' => $component['id'],
            ])->first();
        };

        $column['components'] = array_map(function ($component) use ($flex, $grid, $column, $componentReg) {
            if ($component['type'] == 'grid') {
                return $this->grids($component);
            } elseif ($value = $componentReg($flex, $grid, $column, $component)) {
                $component['value'] = $value->newValue($component['type']);
            }
            return $component;
        }, $column['components']);

        return $column;
    }
}