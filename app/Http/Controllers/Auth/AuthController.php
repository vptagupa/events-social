<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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

    public function auth(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::attempt($credentials, $request->get('remember'))) {

            $request->session()->regenerate();

            return $this->redirectTo();
        }

        return $this->render(
            view: "auth/index",
            options: [
                'errors' => [
                    'message' => 'The provided credentials do not match our records.'
                ]
            ]
        );
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect(route('login.index'));
    }

    public function redirectTo()
    {
        return redirect()->intended(route('admin.index'));
    }
}
