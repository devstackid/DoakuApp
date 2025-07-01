<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {


        \App\Models\User::create([
            'id' => 1,
            'name' => 'admin',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('admin'),
            'role' => 'admin',
        ]);
        \App\Models\Category::create(
            [
                'id' => 1,
                'name' => 'Doa Harian',
            ],
            [
                'id' => 2,
                'name' => 'Doa Ziarah',
            ],
            [
                'id' => 3,
                'name' => 'Lain-lain',
            ]
        );
        
    }
}
