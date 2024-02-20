<?php

namespace App\Http\Controllers\Organizer\Frontend\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\UpdateUserPasswordRequest;
use App\Repositories\OrganizerRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function __construct(private OrganizerRepository $repository)
    {

    }

    public function login(Request $request)
    {
        return $this->render(
            view: "organizer/frontend/auth/index",
        );
    }

    public function changePassword(Request $request)
    {
        return $this->render(
            view: "organizer/frontend/auth/reset",
        );
    }

    public function updatePassword(UpdateUserPasswordRequest $request)
    {
        $this->repository->update($request->validationData(), $request->user()->id);

        return redirect()->intended('organizer/');
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

        if (Auth::guard('organizer')->attempt($credentials, $request->get('remember'))) {

            $request->session()->regenerate();

            return $this->redirectTo();
        }

        return $this->render(
            view: "organizer/frontend/auth/index",
            options: [
                'errors' => [
                    'message' => 'The provided credentials do not match our records.'
                ]
            ]
        );
    }

    public function redirectTo()
    {
        return redirect()->intended(route('organizer.index'));
    }
}
