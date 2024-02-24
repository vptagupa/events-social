<?php

namespace App\Enums;

enum PaymentStatus: string
{
    case SUBMITTED = "Submitted";
    case FAILED = "Failed";
    case CONFIRMED = "Confirmed";
    case REJECTED = "Rejected";
    case CANCELLED = "Cancelled";
    case PARTIAL = "Partial";
    case PAID = "Paid";

    public static function all(): array
    {
        return array_map(function ($role) {
            return $role->toArray();
        }, static::cases());
    }

    public function toArray(): array
    {
        return [
            'id' => $this->value,
            'name' => str($this->value)->ucfirst()
        ];
    }

}