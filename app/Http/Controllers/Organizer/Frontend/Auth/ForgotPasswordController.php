<?php

namespace App\Http\Controllers\Organizer\Frontend\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;

class ForgotPasswordController extends Controller
{

    /**
     * Validate form and send email reset password notification
     */
    public function send(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $status = Password::broker('organizers')->sendResetLink(
            $request->only('email'),
        );

        return $status === Password::RESET_LINK_SENT
            ? back()->with(['status' => __($status)])
            : back()->withErrors(['email' => __($status)]);
    }
}
