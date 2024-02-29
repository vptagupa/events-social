<?php

namespace App\Http\Controllers\Organizer;

use App\Http\Controllers\Controller;
use App\Http\Requests\Organizer\UpdatePasswordRequest;
use App\Repositories\OrganizerRepository;
use Illuminate\Http\Request;
use App\Rules\UserName;

class OrganizerController extends Controller
{
    public function __construct(private OrganizerRepository $user)
    {

    }

    /**
     * Display user profile page
     */
    public function profile()
    {
        return $this->render(
            view: 'admin/user/profile/index'
        );
    }

    /**
     * Update authenticated user password
     */
    public function updatePassword(UpdatePasswordRequest $request)
    {
        $user = $request->user();

        $user->forceFill($request->safe()->only(['password']))
            ->setRememberToken(str()->random(60));

        $user->save();
    }

    /**
     * Update authenticated user name
     */
    public function updateName(Request $request)
    {
        $request->validate([
            'name' => UserName::ensure()
        ]);

        $this->user->update($request->only(['name']), $request->user()->id);
    }

    public function logout(Request $request)
    {
        \Auth::guard('organizer')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect(route('login.index'));
    }
}
