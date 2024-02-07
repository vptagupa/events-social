<?php

namespace App\Enums;

enum PaymentStatus: string
{
    case UNPAID = "Unpaid";
    case SUBMITTED = "Submitted";
    case PROCESSING = "Processing";
    case FAILED = "FAILED";
    case APPROVED = "Approved";
    case COMPLETED = "Completed";

    public static function all(): array
    {
        return array_map(function ($role) {
            return $role->toArray();
        }, Role::cases());
    }

    public function toArray(): array
    {
        return [
            'id' => str($this->value)->slug(),
            'name' => str($this->value)->ucfirst()
        ];
    }

}