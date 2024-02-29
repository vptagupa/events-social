<?php

namespace Database\Seeders;

use App\Models\Organizer;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OrganizersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                "name" => "AACCUP",
                "email" => "aacup@gmail.com",
                "password" => bcrypt("secret"),
                'active' => 1
            ]
        ];

        foreach ($data as $row) {
            Organizer::updateOrInsert(
                [
                    "email" => $row["email"],
                ],
                $row,
            );
        }
    }
}
