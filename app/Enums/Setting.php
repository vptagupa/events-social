<?php

namespace App\Enums;

enum Setting: string
{
    case OFFER_PACKAGE = "Offer package.";
    case OFFER_FREE = "Offer free.";

    case ALLOW_UPLOAD_PAYMENT = "Allow upload proof of payment.";

    case ALLOW_PAYMENT_INTEGRATION = "Allow payment integration.";


    public static function all(): array
    {
        return array_map(function ($case) {
            return $case->toArray();
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