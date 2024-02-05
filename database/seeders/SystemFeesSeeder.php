<?php

namespace Database\Seeders;

use App\Models\SystemFee;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SystemFeesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                "name" => "Sys Fee A",
                "price" => "99",
                'active' => 1,
            ],
            [
                "name" => "Sys Fee B",
                "price" => "99",
                'active' => 1,
            ],
            [
                "name" => "Sys Fee C",
                "price" => "99",
                'active' => 1,
            ],
            [
                "name" => "Sys Fee D",
                "price" => "99",
                'active' => 1,
            ],
            [
                "name" => "Sys Fee E",
                "price" => "99",
                'active' => 1,
            ],
            [
                "name" => "Sys Fee F",
                "price" => "99",
                'active' => 1,
            ],
        ];

        foreach ($data as $row) {
            SystemFee::updateOrInsert(
                [
                    "name" => $row["name"],
                ],
                $row,
            );
        }
    }
}
