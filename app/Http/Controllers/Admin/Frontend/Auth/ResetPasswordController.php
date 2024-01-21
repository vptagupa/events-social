<?php

namespace App\Http\Controllers\Admin\Frontend\Auth;

use App\Http\Controllers\Controller;
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
            view: 'password/reset',
            options: [
                'token' => $token
            ]
        );
    }

    /**
     * Validate form and send email reset password notification
     */
    // public function update(ResetPasswordRequest $request)
    // {
    //     $status = Password::reset(
    //         $request->safe()->only('email', 'password', 'password_confirmation', 'token'),
    //         function (User $user, string $password) {
    //             $user->forceFill([
    //                 'password' => Hash::make($password)
    //             ])->setRememberToken(Str::random(60));

    //             $user->save();

    //             event(new PasswordReset($user));
    //         }
    //     );

    //     return $status === Password::PASSWORD_RESET
    //         ? $this->render('password/reset/index', [
    //             'status' => __($status)
    //         ])
    //         : back()->withErrors(['email' => [__($status)]]);
    // }
}
