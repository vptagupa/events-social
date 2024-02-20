<?php

namespace App\Http\Controllers\Organizer\Frontend\Auth;

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
        $this->user->create($request->safe()->only(['name', 'email', 'password']));
    }
}
