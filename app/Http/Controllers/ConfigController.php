<?php

namespace App\Http\Controllers;

use App\Models\Config;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ConfigController extends Controller
{

    public function index(){
        $config = Config::latest()->first();
        return Inertia::render('Admin/Config', [
            'config' => $config
        ]);
    }


    public function update(Request $request, $id)
{

    // Validasi input
    $request->validate([
        'nama_aplikasi' => 'required|string|min:3|max:255',
        'deskripsi_aplikasi' => 'required|string',
        'telepon' => 'nullable|min:3',
        'email' => 'nullable|email',
        'instagram' => 'nullable|min:3',
    ]);

    $config = Config::findOrFail($id);   

    $config->nama_aplikasi = $request->nama_aplikasi;
    $config->deskripsi_aplikasi = $request->deskripsi_aplikasi;
    if($request->telepon){
        $config->telepon = $request->telepon;
    }
    if($request->email){
        $config->email = $request->email;
    }
    if($request->instagram){
        $config->instagram = $request->instagram;
    }

    $config->save();

    
    return redirect()->route('admin.config.dashboard');
}
}
