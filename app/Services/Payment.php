<?php

namespace App\Services;

use App\Repositories\EventRepository;

class Payment
{
    public function __construct(private EventRepository $repository)
    {

    }
    public static function calculate(int $event, float $price, float $tax = 0)
    {
        $repository = app()->make(EventRepository::class);
        $service = new Payment($repository);

        return $service->compute($event, $price, $tax);
    }

    /**
     * Compute total payments and return the breakdown in array
     */
    public function compute(int $event, float $price, float $tax)
    {
        $event = $this->repository->find($event);

        $organizerFees = $event->organizerFees->filter(fn($f) => $f->active == 1)->reduce(function ($s, $f) {
            $s += $f->price;

            return $s;
        }, 0);

        $systemFees = $event->systemFees->filter(fn($f) => $f->active == 1)->reduce(function ($s, $f) {
            $s += $f->price;

            return $s;
        }, 0);

        $fees = $organizerFees + $systemFees + $price;
        $tax_amount = $fees * ($tax / 100);
        $total = $fees + $tax_amount;

        return [
            'organizer' => $organizerFees,
            'system' => $systemFees,
            'total_fees' => $fees,
            'price' => $price,
            'tax_amount' => $tax_amount,
            'tax' => $tax . '%',
            'total' => $total
        ];
    }
}