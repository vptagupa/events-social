<?php

namespace App\Enums;

enum UserType: string
{
    case ADMIN = "administrator";
    case ORGANIZER = "organizer";

    case PARTICIPANT = "participant";

    public static function all(): array
    {
        return array_map(function ($role) {
            return $role->toArray();
        }, Role::cases());
    }

    public function toArray(): array
    {
        return [
            'id' => $this->value,
            'name' => str($this->value)->ucfirst()
        ];
    }

}