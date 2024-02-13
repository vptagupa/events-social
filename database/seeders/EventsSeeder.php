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
                "title" => "Life Time Style",
                'slug' => Str::slug('Life Time Style'),
                'description' => "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
                'place' => 'SMX',
                'address' => 'Mall of Asia',
                'map' => "",
                'expected_start_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'expected_end_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'organizer_id' => Organizer::first()->id
            ]
        ];
        \Log::info($data);
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
