<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\Auth\OAuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DoaController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\LandingController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\AdminMiddleware;
use App\Models\ContentDoa;
use Illuminate\Support\Facades\Route;

Route::get('/', [LandingController::class, 'index'])->name('home');

Route::get('/doa', [LandingController::class, 'doaIndex'])->name('doa.index');
Route::get('/doa/{id}', [LandingController::class, 'tampilDoa'])->name('doa.show');
Route::get('/kalender', [LandingController::class, 'kalenderIndex'])->name('kalender.index');
Route::get('/quran', [LandingController::class, 'quranIndex'])->name('quran.index');


Route::get('/api/content', function () {
    $content = ContentDoa::all();
    return response()->json([
        'content' => $content,
    ]);
});

Route::get('/auth/redirect/{provider}', [OAuthController::class, 'redirect']);
Route::get('/auth/callback/{provider}', [OAuthController::class, 'callback']);
Route::get('/quran/{number}', [LandingController::class, 'show'])->name('quran.show');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::middleware([AdminMiddleware::class])->group(function () {
        Route::get('/dashboard', [AdminController::class, 'index'])->name('admin.dashboard');
        Route::get('/dashboard/users', [AdminController::class, 'users'])->name('admin.users.dashboard');
        Route::get('/dashboard/event', [EventController::class, 'index'])->name('admin.event.dashboard');
        Route::get('/dashboard/kategori', [CategoryController::class, 'index'])->name('admin.kategori.dashboard');
        Route::get('/dashboard/doa', [DoaController::class, 'index'])->name('admin.doa.dashboard');

        // Route::get('/dashboard/config', [ConfigController::class, 'index'])->name('admin.configs.dashboard');
        // Route::put('/dashboard/config/update/{id}', [ConfigController::class, 'update'])->name('config.update');


        Route::post('/dashboard/user/add', [UserController::class, 'store'])->name('user.add');
        Route::post('/dashboard/user/update/{id}', [UserController::class, 'update'])->name('user.update');
        Route::delete('/dashboard/user/delete/{id}', [UserController::class, 'destroy'])->name('user.delete');

        Route::post('/dashboard/event/add', [EventController::class, 'store'])->name('event.add');
        Route::post('/dashboard/event/update/{id}', [EventController::class, 'update'])->name('event.update');
        Route::delete('/dashboard/event/delete/{id}', [EventController::class, 'destroy'])->name('event.delete');

        Route::post('/dashboard/kategori/add', [CategoryController::class, 'store'])->name('kategori.add');
        Route::post('/dashboard/kategori/update/{id}', [CategoryController::class, 'update'])->name('kategori.update');
        Route::delete('/dashboard/kategori/delete/{id}', [CategoryController::class, 'destroy'])->name('kategori.delete');

        Route::get('/dashboard/doa/tambah', [DoaController::class, 'tambah'])->name('doa.tambah');
        Route::get('/dashboard/doa/ubah/{id}', [DoaController::class, 'ubah'])->name('doa.ubah');
        Route::post('/dashboard/doa/add', [DoaController::class, 'store'])->name('doa.add');
        Route::put('/dashboard/doa/update/{id}', [DoaController::class, 'update'])->name('doa.update');
        Route::delete('/dashboard/doa/delete/{id}', [DoaController::class, 'destroy'])->name('doa.delete');

        Route::post('/dashboard/report/add', [ReportController::class, 'store'])->name('report.add');
        Route::post('/dashboard/report/update/{id}', [ReportController::class, 'update'])->name('report.update');
        Route::delete('/dashboard/report/delete/{id}', [ReportController::class, 'destroy'])->name('report.delete');
    });

    Route::get('/profile/edit', [LandingController::class, 'profileEdit'])->name('profile');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/koleksi', [LandingController::class, 'koleksiIndex'])->name('koleksi');

    Route::post('/favorite/add/{id}', [LandingController::class, 'add'])->name('favorite.add');
    Route::post('/favorite/remove/{id}', [LandingController::class, 'remove'])->name('favorite.remove');
});




require __DIR__ . '/auth.php';
