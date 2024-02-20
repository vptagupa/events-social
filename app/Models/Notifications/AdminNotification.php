<?php

namespace App\Models\Notifications;

use App\Notifications\Admin\AccountLogin;

trait AdminNotification
{
    public function notifyAccountLogin(string $password)
    {
        $this->notify(new AccountLogin($this, $password));
    }
}
