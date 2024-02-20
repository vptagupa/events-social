<?php

namespace App\Models\Relations;

use App\Enums\Access;
use App\Enums\Action;
use App\Enums\Role;
use App\Enums\UserType;
use Illuminate\Database\Eloquent\Casts\Attribute;

trait Permission
{
    public function getAccess(): array
    {
        return Access::permissions()[
            $this->type === UserType::ADMIN ? $this->role->name : $this->type->name
        ];
    }

    public function hasAccess(Access $access, Action $action): bool
    {
        $actions = $this->getAccess()[$access->name] ?? [];

        // Check if the access has ALL actions
        if (in_array(Action::ALL->name, $actions)) {
            return true;
        }

        return in_array($action->name, $actions);
    }

    public function access(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->getAccess()
        );
    }
}