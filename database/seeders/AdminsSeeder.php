<?php

namespace Database\Seeders;

use App\Enums\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Admin;

class AdminsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $realUsers = [
            [
                "name" => "Vic",
                "email" => "victortagupa@gmail.com",
                "password" => bcrypt("secret"),
                'role' => Role::ADMIN
            ]
        ];

        foreach ($realUsers as $user) {
            Admin::updateOrInsert(
                [
                    "email" => $user["email"],
                ],
                $user,
            );
        }
    }
}
