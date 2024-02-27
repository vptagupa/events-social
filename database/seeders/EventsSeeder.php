<?php

namespace Database\Seeders;

use App\Models\Event;
use App\Models\Organizer;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Carbon\CArbon;
use Illuminate\Support\Str;

class EventsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'uuid' => Str::uuid(),
                "title" => "37th Annual Conference and General Assembly 2024",
                'slug' => Str::slug('37th Annual Conference and General Assembly 2024'),
                'description' => "Sustaining a workplace culture of Quality Assurance and Accreditation.",
                'place' => 'Grand Ballroom, Century Park Hotel',
                'address' => '599 P. Ocampo St., Malate Manila',
                'map' => "Map",
                'expected_start_at' => '2024-03-20',
                'expected_end_at' => '2024-03-22',
                'organizer_id' => Organizer::first()->id
            ]
        ];

        foreach ($data as $row) {
            Event::updateOrInsert(
                [
                    "slug" => $row["slug"],
                ],
                $row,
            );
        }
    }
}
