<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{

    public function index(){
        return Inertia::render('Admin/Categories', [
            'categories' => Category::all()
        ]);
    }

    public function store(Request $request){
        $validateData = $request->validate([
            'name' => 'required|min:3|max:30|string',
            'description' => 'required|min:3|max:255|string'
        ]);
    
        Category::create($validateData);
    
        return redirect()->route('admin.kategori.dashboard');
    }
    
    public function update(Request $request, $id){
        $request->validate([
            'name' => 'nullable|string|max:50|min:3',
            'description' => 'nullable|string|max:255|min:3'
        ]);
    
        $categories = Category::findOrFail($id);
    
            $categories->update($request->except(['image']));
            return redirect()->route('admin.kategori.dashboard');
    }
    
    public function destroy($id){
        $categories = Category::findOrFail($id);
    
        $categories->delete();
        return redirect()->route('admin.kategori.dashboard');
    
    }
}
