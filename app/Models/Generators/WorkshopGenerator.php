<?php

namespace App\Models\Generators;

use App\Enums\PaymentStatus;
use App\Models\Workshop;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;

trait WorkshopGenerator
{
    protected function generateCode()
    {
        $code = Carbon::now()->format('ymdhis');
        $code = substr(str_shuffle($code . $this->id), 0, 6);

        if (Workshop::whereCode($code)->exists()) {
            return $this->generateCode();
        }

        return $code;
    }

    public function primaryName(): Attribute
    {
        return Attribute::make(
            get: function () {
                $name = explode(",", $this->event->registrationForm->primary_name);
                $names = $this->registrations()
                    ->whereIn('name', $name)
                    ->get();

                return $names->implode('value', ' ');
            }
        );
    }

    public function primaryEmail(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->registrations()
                ->where('name', $this->event->registrationForm->primary_email)
                ->first()?->value
        );
    }

    public function salutation(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->registrations()
                ->where('name', $this->event->registrationForm->salutation)
                ->first()?->value
        );
    }

    public function statusClasses(PaymentStatus $status)
    {
        return match (true) {
            PaymentStatus::CONFIRMED === $status => "success",
            PaymentStatus::REJECTED === $status => "danger",
            PaymentStatus::CANCELLED === $status => "warning",
            PaymentStatus::PARTIAL === $status => "info",
            PaymentStatus::SUBMITTED === $status => "bg-slate-400 text-white",
        };
    }

    public function statuses(): Attribute
    {
        return Attribute::make(
            get: function () {
                $statuses = [
                    [
                        'status' => 'Confirmed',
                        'date' => $this->confirmed_at
                    ],
                    [
                        'status' => 'Cancelled',
                        'date' => $this->cancelled_at
                    ],
                    [
                        'status' => 'Payment Submitted',
                        'date' => $this->payment_at
                    ],
                    [
                        'status' => 'Form Submitted',
                        'date' => $this->submitted_at
                    ],
                ];

                $statuses = array_filter($statuses, fn($status) => $status['date'] != null);

                uasort($statuses, fn($a, $b) => strtotime($b['date']) - strtotime($a['date']));

                return array_values($statuses);
            }
        );
    }
}