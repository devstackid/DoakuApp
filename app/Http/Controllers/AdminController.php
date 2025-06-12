<?php

namespace App\Http\Controllers;

use App\Models\Theme;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index(){
        return Inertia::render('Admin/Index');
    }

    public function users(){
        $user = Auth::user();
        return Inertia::render('Admin/Users', [
            'users' => User::latest()->get(),
            'user' => $user,
        ]);
    }

    
    
}
