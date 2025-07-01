<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\ContentDoa;
use App\Models\Event;
use App\Models\Favorite;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;

class LandingController extends Controller
{
    
    public function index()
    {
       
        $user = Auth::user();
        $favorites = $user
            ? Favorite::where('user_id', $user->id)->pluck('doa_id')->toArray()
            : [];

        // Ambil data surah dari API AlQuran
        $response = Http::get('https://api.alquran.cloud/v1/surah');
        $allSurahs = collect($response->json()['data'] ?? []);

        // Paginasi manual
        $currentPage = request()->get('page', 1);
        $perPage = 5;
        $pagedSurahs = $allSurahs->forPage($currentPage, $perPage);
        $surahs = new LengthAwarePaginator(
            $pagedSurahs,
            $allSurahs->count(),
            $perPage,
            $currentPage,
            ['path' => url()->current()]
        );

        return Inertia::render('Landing/Landing', [
            'surahs' => $surahs,
            'content' => ContentDoa::with('category')->paginate(5),
            'favorites' => $favorites,
        ]);
    }

    public function doaIndex()
    {
        $user = Auth::user();

        $favorites = [];
        if ($user) {
            $favorites = Favorite::where('user_id', $user->id)->pluck('doa_id')->toArray();
        }

        return Inertia::render('Landing/Doa', [
            'content' => ContentDoa::with('category')->get(),
            'categories' => Category::all(),
            'favorites' => $favorites,
        ]);
    }

    public function quranIndex()
    {

        $response = Http::get('https://api.alquran.cloud/v1/surah');
        $data = $response->json();
        return Inertia::render('Landing/Quran', [
            'canLogin' => Route::has('login'),
            'surahs' => $data['data'] ?? []
        ]);
    }

    public function show($number)
    {
        // Ambil teks Arab
        $arab = Http::get("https://api.alquran.cloud/v1/surah/{$number}");
        $arabData = $arab->json()['data']['ayahs'];

        // Ambil terjemahan Indonesia
        $indo = Http::get("https://api.alquran.cloud/v1/surah/{$number}/id.indonesian");
        $indoData = $indo->json()['data']['ayahs'];

        // Gabungkan ayat berdasarkan urutan
        $ayahs = collect($arabData)->zip($indoData)->map(function ($pair) {
            return [
                'numberInSurah' => $pair[0]['numberInSurah'],
                'text_arab'     => $pair[0]['text'],
                'juz'           => $pair[0]['juz'],
                'translation'   => $pair[1]['text'],
            ];
        });

        return Inertia::render('Landing/Show', [
            'surah' => [
                'number' => $number,
                'name'   => $arab->json()['data']['name'],
                'englishName' => $arab->json()['data']['englishName'],
                'englishNameTranslation' => $arab->json()['data']['englishNameTranslation'],
                'numberOfAyahs' => $arab->json()['data']['numberOfAyahs'],
                'ayahs' => $ayahs,
            ],
        ]);
    }

    public function tampilDoa($id)
    {
        $user = Auth::user();
        $doa = ContentDoa::with('category')->findOrFail($id);
        $favorites = [];
        if ($user) {
            $favorites = Favorite::where('user_id', $user->id)->pluck('doa_id')->toArray();
        }

        return Inertia::render('Landing/PreviewDoa', [
            'doa' => $doa,
            'categories' => Category::all(),
            'favorites' => $favorites,
        ]);
    }

    public function kalenderIndex()
    {
        $upcomingEvents = Event::where('tanggal', '>', now())
            ->orderBy('tanggal', 'asc')
            ->limit(5)
            ->get();

        $pastEvents = Event::where('tanggal', '<', now())
            ->orderBy('tanggal', 'desc')
            ->limit(5)
            ->get();

        return Inertia::render('Landing/Kalender', [
            'upcomingEvents' => $upcomingEvents,
            'pastEvents' => $pastEvents
        ]);
    }


    public function koleksiIndex()
    {
        $user = Auth::user();
        $favorites = [];

        if ($user) {
            $favorites = Favorite::with('doa.category', 'user')
                ->where('user_id', $user->id)
                ->get();
        }

        return Inertia::render('Landing/Koleksi', [
            'favorites' => $favorites
        ]);
    }



    // tambah favorit
    public function add($id)
    {
        $user = Auth::user();

        // Cek apakah doa sudah ada di favorit
        if (Favorite::where('user_id', $user->id)->where('doa_id', $id)->exists()) {
            return response()->json(['message' => 'Doa sudah ada di favorit'], 400);
        }

        // Tambah doa ke favorit
        Favorite::create([
            'user_id' => $user->id,
            'doa_id' => $id,
        ]);

        return response()->json(['message' => 'Doa ditambahkan ke favorit'], 200);
    }


    // hapus favorit
    public function remove($id)
    {
        $user = Auth::user();

        // Hapus doa dari favorit
        Favorite::where('user_id', $user->id)->where('doa_id', $id)->delete();

        return response()->json(['message' => 'Doa dihapus dari favorit'], 200);
    }

    public function profileEdit(Request $request): Response
    {
        return Inertia::render('Landing/Profile', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }
}
