<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        return $this->render(
            view: "auth/index",
        );
    }

    public function changePassword(Request $request)
    {
        return $this->render(
            view: "auth/reset",
        );
    }
}
