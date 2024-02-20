<?php

namespace App\Http\Controllers\Organizer\Frontend\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\ResetPasswordRequest;
use Illuminate\Http\Request;

use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class ResetPasswordController extends Controller
{
    /**
     * Display a page resource.
     */
    public function index(string $token)
    {
        return $this->render(
            view: 'organizer/frontend/password/reset',
            options: [
                'token' => $token
            ]
        );
    }

    /**
     * Validate form and send email reset password notification
     */
    public function update(ResetPasswordRequest $request)
    {
        $status = Password::broker('organizers')->reset(
            $request->safe()->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, string $password) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->setRememberToken(Str::random(60));

                $user->save();

                event(new PasswordReset($user));
            }
        );

        return $status === Password::PASSWORD_RESET
            ? $this->render('organizer/frontend/password/reset', [
                'status' => __($status),
                'token' => $request->token
            ])
            : back()->withErrors(['email' => [__($status)]]);
    }
}
