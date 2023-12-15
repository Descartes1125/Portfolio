<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use \App\Models\Category;


class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Category::create(["name" => "チョコレート"]);
        Category::create(["name" => "スナック"]);
        Category::create(["name" => "アイス"]);
        Category::create(["name" => "駄菓子"]);    }
}
