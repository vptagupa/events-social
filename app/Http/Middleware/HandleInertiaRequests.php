<?php

namespace App\Http\Middleware;

use App\Enums\UserType;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Auth;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Defines the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            ...$this->config(),
            ...$this->authenticated($request)
        ]);
    }

    /**
     * Set config properties to inertia request
     */
    private function config()
    {
        return [
            'config' => [
                'name' => config('app.name')
            ],
        ];
    }

    /**
     * Set authenticated properties to inertia request
     */
    private function authenticated($request)
    {
        $user = (function () {
            if (Auth::guard('admin')->check()) {
                return Auth::guard('admin')->user();
            } elseif (Auth::guard('organizer')->check()) {
                return Auth::guard('organizer')->user();
            } elseif (Auth::guard('web')->check()) {
                return Auth::guard('web')->user();
            }

            return null;
        })();
        return [
            'auth' => [
                'user' => $user,
                'type' => $user?->type?->value,
                'logout' => !$user ? null : route($user->routes['logout'])
            ]
        ];
    }
}
