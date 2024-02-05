<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Payment Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for payment  services
    |
    */

    'include_tax' => env('PAYMENT_INCLUDE_TAX', true),
    'tax' => env('PAYMENT_TAX', 12)

];
