<?php

namespace App\Enums;

enum Action
{
    case CREATE;
    case UPDATE;
    case DELETE;
    case ALL;
    case VIEW_ANY;
    case VIEW;
    case RESTORE;
    case FORCE_DELETE;
}