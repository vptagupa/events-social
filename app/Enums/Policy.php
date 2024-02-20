<?php

namespace App\Enums;

enum Policy: string
{
    case VIEW_ANY = "viewAny";
    case VIEW = "view";
    case CREATE = "create";
    case DELETE = "delete";
    case DELETE_ANY = "deleteAny";
    case UPDATE = "update";
    case UPDATE_ANY = "updateAny";
    case RESTORE = "restore";
    case RESTORE_ANY = "restoreAny";
    case FORCE_DELETE = "forceDelete";
    case FORCE_DELETE_ANY = "forceDeleteAny";

    public static function viewAny(): string
    {
        return self::VIEW_ANY->value;
    }
    public static function view(): string
    {
        return self::VIEW->value;
    }

    public static function create(): string
    {
        return self::CREATE->value;
    }

    public static function delete(): string
    {
        return self::DELETE->value;
    }

    public static function deleteAny(): string
    {
        return self::DELETE_ANY->value;
    }

    public static function update(): string
    {
        return self::UPDATE->value;
    }

    public static function updateAny(): string
    {
        return self::UPDATE_ANY->value;
    }

    public static function restore(): string
    {
        return self::RESTORE->value;
    }

    public static function restoreAny(): string
    {
        return self::RESTORE_ANY->value;
    }

    public static function forceDelete(): string
    {
        return self::FORCE_DELETE->value;
    }

    public static function forceDeleteAny(): string
    {
        return self::FORCE_DELETE_ANY->value;
    }
}