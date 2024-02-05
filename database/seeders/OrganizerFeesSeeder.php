<?php

namespace Database\Seeders;

use App\Models\Organizer;
use App\Models\OrganizerFee;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OrganizerFeesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $organizer = Organizer::first()->id;
        $data = [
            [
                "name" => "Fee A",
                "price" => "99",
                'active' => 1,
                'organizer_id' => $organizer,
            ],
            [
                "name" => "Fee B",
                "price" => "99",
                'active' => 1,
                'organizer_id' => $organizer,
            ],
            [
                "name" => "Fee C",
                "price" => "99",
                'active' => 1,
                'organizer_id' => $organizer,
            ],
            [
                "name" => "Fee D",
                "price" => "99",
                'active' => 1,
                'organizer_id' => $organizer,
            ],
            [
                "name" => "Fee E",
                "price" => "99",
                'active' => 1,
                'organizer_id' => $organizer,
            ],
            [
                "name" => "Fee F",
                "price" => "99",
                'active' => 1,
                'organizer_id' => $organizer,
            ],
        ];

        foreach ($data as $row) {
            OrganizerFee::updateOrInsert(
                [
                    "name" => $row["name"],
                    "organizer_id" => $row["organizer_id"],
                ],
                $row,
            );
        }
    }
}
