<?php

namespace App\Http\Controllers\Frontend\Auth;

use App\Http\Controllers\Controller;
use App\Repositories\AdminRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function __construct(private AdminRepository $repository)
    {

    }

    public function login(Request $request)
    {
        return $this->render(
            view: "frontend/auth/index",
        );
    }


    public function profile(Request $request)
    {
        return $this->render(
            view: "auth/profile",
        );
    }

    public function redirect()
    {
        foreach ($this->guards() as $guard => $route) {
            if (Auth::guard($guard)->check()) {
                return redirect()->intended(route($route));
            }
        }

        return to_route('login.index');
    }

    /**
     * Global authentication for defined guards.
     */
    public function attempt(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        foreach ($this->guards() as $guard => $route) {
            if (Auth::guard($guard)->attempt([...$credentials, ...['active' => 1]], $request->get('remember'))) {

                $request->session()->regenerate();

                return $this->redirectTo();
            }
        }

        return $this->render(
            view: "frontend/auth/index",
            options: [
                'errors' => [
                    'message' => 'The provided credentials do not match our records.'
                ]
            ]
        );
    }

    public function redirectTo()
    {
        return to_route('redirect');
    }

    /**
     * List guards by level
     */
    public function guards()
    {
        return [
            'admin' => 'admin.backend.index',
            'organizer' => 'organizer.index'
        ];
    }
}
