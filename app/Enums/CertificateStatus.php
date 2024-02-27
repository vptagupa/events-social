<?php

namespace App\Enums;

enum CertificateStatus: string
{
    case ALL = "All";
    case PRINTED = "Printed";
    case DOWNLOADDED = "Downloaded";
    case NOT_PRINTED = "Not Printed";
    case NOT_DOWNLOADDED = "Not Downloaded";


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