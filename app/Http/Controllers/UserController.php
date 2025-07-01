<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    public function store(Request $request)
{
    $request->validate([
        'name' => 'required|string|max:20',
        'password' => 'required|min:6',
        'email' => 'required|string|unique:users,email',
        'role' => 'required|in:admin,pengguna',
    ]);

    $user = new User();
    $user->name = $request->input('name');
    $user->email = $request->input('email');
    $user->password = bcrypt($request->input('password'));
    $user->role = $request->input('role');

    $user->save();

    return redirect()->route('admin.users.dashboard');
}

public function update(Request $request, $id)
{

    // Validasi input
    $request->validate([
        'name' => 'required|string|min:3|max:255',
        'password' => 'nullable|min:3',
        'email' => 'required|email|unique:users,email,' . $id,
        'role' => 'required|in:admin,pengguna',
    ]);

    $user = User::findOrFail($id);   

    $user->name = $request->name;
    $user->email = $request->email;
    if($request->password){
        $user->password = Hash::make($request->password);
    }
    $user->email = $request->email;
    $user->role = $request->role;

    $user->save();

    
    return redirect()->route('admin.users.dashboard');
}


public function destroy($id)
{
    $user = User::findOrFail($id);

    // Ambil dan hapus semua favorite yang berkaitan
    $favorites = Favorite::where('user_id', $user->id)->get();

    foreach ($favorites as $favorite) {
        $favorite->delete();
    }

    // Hapus user
    $user->delete();

    return redirect()->route('admin.users.dashboard')->with('success', 'User dan data favorit berhasil dihapus.');
}

}
