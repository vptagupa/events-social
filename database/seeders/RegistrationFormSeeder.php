<?php

namespace Database\Seeders;

use App\Models\Event;
use App\Models\RegistrationForm;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RegistrationFormSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'event_id' => Event::first()->id,
                "primary_name" => "First Name,Last Name",
                "primary_email" => "Email Address",
                "schema" => '{"flexis": [{"flex": "a3cb3ac67b4", "class": "bg-slate-200", "grids": [{"grid": "3cb3ac67b4e", "class": "bg-slate-300", "columns": [{"class": "bg-slate-200", "title": "Column Configuration", "column": "cb3ac67b4e6", "config": {"form": ["class", "minimum fields required as number", "is options required"], "active": false}, "components": [{"id": "b3ac67b4e6f", "attr": [], "type": "input", "class": "bg-slate-100", "title": "Input", "value": null, "config": {"form": ["name", "class", "style", "condition", "placeholder", "default value", "select", "is required", "is number"], "name": "First Name", "active": false, "options": [], "is_required": true, "placeholder": "First Name", "defaultValue": null}, "draggable": true, "properties": {"type": "text", "types": ["Text", "Email", "Number", "Date"]}}, {"id": "3ac67b4e6fc", "attr": [], "type": "input", "class": "bg-slate-100", "title": "Input", "value": null, "config": {"form": ["name", "class", "style", "condition", "placeholder", "default value", "select", "is required", "is number"], "name": "Last Name", "active": false, "options": [], "is_required": true, "placeholder": "Last Name", "defaultValue": null}, "draggable": true, "properties": {"type": "text", "types": ["Text", "Email", "Number", "Date"]}}, {"id": "c67b4e6fc37", "attr": [], "type": "input", "class": "bg-slate-100", "title": "Input", "value": null, "config": {"form": ["name", "class", "style", "condition", "placeholder", "default value", "select", "is required", "is number"], "name": "Email Address", "active": false, "options": [], "is_required": true, "placeholder": "Email Address", "defaultValue": null}, "draggable": true, "properties": {"type": "Email", "types": ["Text", "Email", "Number", "Date"]}}, {"id": "ac67b4e6fc3", "attr": [], "type": "textarea", "class": "bg-slate-100", "title": "Textarea", "value": null, "config": {"form": ["name", "class", "style", "condition", "placeholder", "default value", "select", "is required", "is number"], "name": "Address", "active": false, "options": [], "is_required": true, "placeholder": "Address", "defaultValue": null}, "draggable": true}, {"id": "40ed6ad8a90", "attr": [], "type": "file", "class": "bg-slate-100", "title": "File", "value": null, "config": {"form": ["name", "class", "style", "condition", "placeholder", "default value", "select", "is required", "is number"], "name": "Profile Picture", "active": false, "options": [], "is_required": true, "placeholder": "Profile Picture", "defaultValue": null}, "draggable": true}]}]}], "title": "Step Configuration", "active": true, "config": {"form": ["name", "class", "style", "next button", "prev button"], "name": "Step 1", "active": false}}], "properties": {"maxFlex": 5}}',
            ]
        ];

        foreach ($data as $row) {
            RegistrationForm::updateOrInsert(
                [
                    "event_id" => $row["event_id"],
                ],
                $row,
            );
        }
    }
}
