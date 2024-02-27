<?php

namespace App\Http\Controllers\Frontend\Auth;

use App\Http\Controllers\Controller;
use App\Repositories\AdminRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Auth\UpdateUserPasswordRequest;

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

    public function changePassword(Request $request)
    {
        return $this->render(
            view: "frontend/auth/reset",
        );
    }

    public function updatePassword(UpdateUserPasswordRequest $request)
    {
        $this->repository->update($request->validationData(), $request->user()->id);

        return redirect()->intended('admin/');
    }

    public function profile(Request $request)
    {
        return $this->render(
            view: "auth/profile",
        );
    }

    public function auth(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::guard('admin')->attempt($credentials, $request->get('remember'))) {

            $request->session()->regenerate();

            return $this->redirectTo();
        }

        return $this->render(
            view: "admin/frontend/auth/index",
            options: [
                'errors' => [
                    'message' => 'The provided credentials do not match our records.'
                ]
            ]
        );
    }

    public function redirectTo()
    {
        return redirect()->intended(route('admin.backend.index'));
    }
}
