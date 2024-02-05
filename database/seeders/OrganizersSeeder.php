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
                "name" => "PCU",
                "email" => "pcu@gmail.com",
                "password" => bcrypt("secret"),
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
