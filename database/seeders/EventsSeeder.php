<?php

namespace Database\Seeders;

use App\Models\Event;
use App\Models\Organizer;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Carbon\CArbon;

class EventsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                "title" => "Event",
                'slug' => 'event',
                'description' => 'Event',
                'place' => 'SMX',
                'address' => 'Mall of Asia',
                'map' => "",
                'expected_start_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'expected_end_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'organizer_id' => Organizer::first()->id
            ]
        ];

        foreach ($data as $row) {
            Event::updateOrInsert(
                [
                    "slug" => $row["slug"],
                    "organizer_id" => $row["organizer_id"],
                ],
                $row,
            );
        }
    }
}
