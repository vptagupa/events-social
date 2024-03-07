<?php

namespace App\Models\Notifications;

use App\Notifications\Admin\AccountLogin;

trait AdminNotification
{
    public function notifyAccountLogin(string $password, bool $notifyPassword = false)
    {
        $this->notify(new AccountLogin($this, $password, $notifyPassword));
    }
}
