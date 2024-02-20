<?php

return [

    /*
    |--------------------------------------------------------------------------
    | System config
    |--------------------------------------------------------------------------
    |
    | Place the system configurations
    |
    */

    'media' => [
        'image' => [
            'max' => 5 // in mb
        ],
        'max' => env("MAX_FILE_SIZE", 1) // in mb
    ],

    'include_tax' => env('PAYMENT_INCLUDE_TAX', true),
    'tax' => env('PAYMENT_TAX', 12),

    'reCaptcha' => env('GOOGLE_SECRET_KEY', ''),
];
