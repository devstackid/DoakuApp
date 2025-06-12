<?php

namespace App\Http\Controllers;

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
        'username' => 'required|string|unique:users,username',
        'password' => 'required|min:6',
        'phone' => 'required|string|max:20', 
        'email' => 'required|string|unique:users,email',
        'role' => 'required|in:admin,pengguna',
    ]);

    $user = new User();
    $user->name = $request->input('name');
    $user->username = $request->input('username');
    $user->email = $request->input('email');
    $user->password = bcrypt($request->input('password'));
    $user->phone = $request->input('phone');
    $user->role = $request->input('role');

    $user->save();

    return redirect()->route('admin.users.dashboard');
}

public function update(Request $request, $id)
{

    // Validasi input
    $request->validate([
        'name' => 'required|string|min:3|max:255',
        'username' => 'required|string|unique:users,username,' . $id,
        'password' => 'nullable|min:3',
        'phone' => 'required|max:20',
        'email' => 'required|email|unique:users,email,' . $id,
        'role' => 'required|in:admin,pengguna',
    ]);

    $user = User::findOrFail($id);   

    $user->name = $request->name;
    $user->username = $request->username;
    $user->email = $request->email;
    if($request->password){
        $user->password = Hash::make($request->password);
    }
    $user->phone = $request->phone;
    $user->email = $request->email;
    $user->role = $request->role;

    $user->save();

    
    return redirect()->route('admin.users.dashboard');
}


public function destroy($id)
{
    $user = User::findOrFail($id);


    

    $user->delete();

    return redirect()->route('admin.users.dashboard');

}
}
