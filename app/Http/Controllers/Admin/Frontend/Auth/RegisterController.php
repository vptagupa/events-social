<?php

namespace App\Http\Controllers\Admin\Frontend\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterRequest;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;

// 
class RegisterController extends Controller
{
    public function __construct(private UserRepository $user)
    {

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(RegisterRequest $request)
    {
        $this->user->create($request->safe()->only(['name', 'email', 'password']));
    }
}
