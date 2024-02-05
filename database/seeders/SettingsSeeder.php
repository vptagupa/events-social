<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Enums\Setting as Constant;

class SettingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                "name" => Constant::OFFER_PACKAGE,
                "type" => "boolean",
                "description" => "",
                'default' => 0
            ],
            [
                "name" => Constant::OFFER_FREE,
                "type" => "boolean",
                "description" => "",
                'default' => 0
            ],
            [
                "name" => Constant::ALLOW_UPLOAD_PAYMENT,
                "type" => "boolean",
                "description" => "",
                'default' => 0
            ],
            [
                "name" => Constant::ALLOW_PAYMENT_INTEGRATION,
                "type" => "boolean",
                "description" => "",
                'default' => 0
            ]
        ];

        foreach ($data as $row) {
            Setting::updateOrInsert(
                [
                    "name" => $row["name"],
                ],
                $row,
            );
        }
    }
}
