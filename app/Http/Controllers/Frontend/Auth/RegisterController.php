<?php

namespace App\Http\Controllers\Frontend\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Requests\Organizer\StoreOrganizerRequest;
use App\Repositories\OrganizerRepository;
use Illuminate\Http\Request;

// 
class RegisterController extends Controller
{
    public function __construct(private OrganizerRepository $user)
    {

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOrganizerRequest $request)
    {
        $request->merge(['active' => 1]);

        $this->user->create($request->only(['name', 'email', 'password', 'active']));
    }
}
