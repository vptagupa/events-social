<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            AdminsSeeder::class,
            SettingsSeeder::class,
            OrganizersSeeder::class,
            EventsSeeder::class,
            RegistrationFormSeeder::class,
            SystemFeesSeeder::class,
            OrganizerFeesSeeder::class
        ]);
    }
}
