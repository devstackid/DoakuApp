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
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        // \App\Models\Theme::create([
        //     'id' => 1,
        //     'theme_name' => 'Beautiful Light',
        //     'description' => 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium, adipisci?',
        //     'image' => 'dummy.jpg'
        // ]);

        // \App\Models\Theme::create([
        //     'id' => 2,
        //     'theme_name' => 'Pinky',
        //     'description' => 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium, adipisci?',
        //     'image' => 'dummy2.jpg'
        // ]);

        \App\Models\User::create([
            'id' => 1,
            'name' => 'admin',
            // 'username' => 'admin',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('admin'),
            // 'phone' => '+62895631780344',
            'role' => 'admin',
        ]);
        // \App\Models\User::create([
        //     'id' => 2,
        //     'name' => 'pengguna',
        //     'username' => 'pengguna',
        //     'email' => 'pengguna@gmail.com',
        //     'password' => Hash::make('pengguna'),
        //     'phone' => '+62895631780344',
        //     'role' => 'pengguna',
        //     'active_theme_id' => 1,
        //     'pricing' => 'premium'
        // ]);

        // \App\Models\Content::create([
        //     'id' => 1,
        //     'user_id' => 2,
        //     'nama_pendek_pria' => 'John',
        //     'nama_pendek_wanita' => 'Elly',
        //     'tanggal_resepsi' => '2025-01-25',
        //     'tanggal_akad' => '2025-01-10',
        //     'lokasi_resepsi' => 'Banjarbaru',
        //     'lokasi_akad' => 'Banjarmasin',
        //     // 'cover_image' => 'saif.jpg',
        //     'nama_ayah_pria' => 'Asroruddin',
        //     'nama_ibu_pria' => 'Dewi',
        //     // 'avatar_pria' => 'saif_avatar.jpg',
        //     // 'avatar_wanita' => 'siska_avatar.jpg',
        //     'nama_ayah_wanita' => 'Suriansyah',
        //     'nama_ibu_wanita' => 'Zahra',
        //     'nama_lengkap_pria' => 'John Tomy',
        //     'nama_lengkap_wanita' => 'Elly Catrina',
        //     'youtube_video_link' => 'https://Youtu.be.com/haha',
        //     'cerita_perkenalan' => 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum, possimus.',
        //     'cerita_awal_hubungan' => 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum, possimus. Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
        //     'cerita_lamaran' => 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum, possimus. Lorem, ipsum dolor',
        //     'cerita_pernikahan' => 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum, possimus. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum, possimus.',
        //     // 'kode_qr' => 'tesqr.png',
        //     'streaming_ig' => 'https://instagram.com/dyyyynn_',
        //     'streaming_zoom' => '231we34sad2',
        //     'waktu_resepsi' => now(),
        //     'waktu_akad' => now(),
        //     // 'audio' => 'starling.mp3'
        // ]);
    }
}
