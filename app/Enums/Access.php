<?php

namespace App\Enums;

enum Access
{
    case DASHBOARD_ADMIN;
    case EVENTS;
    case FEES;
    case ORGANIZERS;
    case PARTICIPANTS;
    case PAYMENTS;
    case SETUP;
    case SETUP_FEES;
    case USERS;
    case AUDIT_TRAILS;
    case VERIFIER;


    public static function all(): array
    {
        return array_map(fn($access) => $access->toArray(), Access::cases());
    }

    public static function permissions()
    {
        return [
            Role::ADMIN->name => [
                Access::DASHBOARD_ADMIN->name => [Action::ALL->name],
                Access::EVENTS->name => [Action::ALL->name],
                Access::FEES->name => [Action::ALL->name],
                Access::ORGANIZERS->name => [Action::ALL->name],
                Access::PARTICIPANTS->name => [Action::ALL->name],
                Access::PAYMENTS->name => [Action::ALL->name],
                Access::SETUP->name => [Action::ALL->name],
                Access::SETUP_FEES->name => [Action::ALL->name],
                Access::USERS->name => [Action::ALL->name],
                Access::VERIFIER->name => [Action::ALL->name],
                Access::AUDIT_TRAILS->name => [Action::ALL->name],

            ],
            Role::EDITOR->name => [
                Access::DASHBOARD_ADMIN->name => [Action::ALL->name],
                Access::EVENTS->name => [Action::ALL->name],
                Access::FEES->name => [Action::ALL->name],
                Access::ORGANIZERS->name => [Action::ALL->name],
                Access::PARTICIPANTS->name => [Action::ALL->name],
                Access::PAYMENTS->name => [Action::ALL->name],
            ],
            UserType::ORGANIZER->name => [
                Access::EVENTS->name => [Action::ALL->name],
                Access::FEES->name => [Action::ALL->name],
                Access::PARTICIPANTS->name => [Action::ALL->name],
                Access::PAYMENTS->name => [Action::ALL->name],
                Access::VERIFIER->name => [Action::ALL->name],
            ],
            UserType::PARTICIPANT->name => [
                Access::EVENTS->name => [Action::ALL->name],
            ]
        ];
    }

    public function toArray(): array
    {
        return [
            $this->name => $this->name
        ];
    }
}