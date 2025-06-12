<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\ContentDoa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DoaController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        return Inertia::render('Admin/Doa', [
            'contents' => ContentDoa::with('category')->get(),
            'user' => $user,
        ]);
    }

    public function tambah()
    {
        $user = Auth::user();
        return Inertia::render('Admin/TambahDoa', [
            'user' => $user,
            'categories' => Category::all()
        ]);
    }

    public function ubah($id)
    {
        $user = Auth::user();
        $doa = ContentDoa::findOrFail($id);
        $categories = Category::all();
        return inertia('Admin/EditDoa', [
            'user' => $user,
            'doa' => $doa,
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:20',
            'category_id' => 'required|exists:categories,id',
            'content' => 'required',
            'sejarah_doa' => 'nullable|string',
            'catatan_kaki' => 'nullable|string',
        ]);

        $content = new ContentDoa();
        $content->category_id = $request->input('category_id');
        $content->title = $request->input('title');
        $content->content = $request->input('content');
        if($request->sejarah_doa){
            $content->sejarah_doa = $request->input('sejarah_doa');
        }
        if($request->catatan_kaki){
            $content->catatan_kaki = $request->input('catatan_kaki');
        }
        

        $content->save();

        return redirect()->route('admin.doa.dashboard');
    }

    public function update(Request $request, $id)
    {

        $request->validate([
            'title' => 'required|string|max:20',
            'category_id' => 'required|exists:categories,id',
            'content' => 'required',
            'sejarah_doa' => 'nullable|string',
            'catatan_kaki' => 'nullable|string',
        ]);

        $content = ContentDoa::findOrFail($id);

        $content->category_id = $request->category_id;
        $content->title = $request->title;
        $content->content = $request->content;
        $content->sejarah_doa = $request->sejarah_doa;
        $content->catatan_kaki = $request->catatan_kaki;

        $content->save();


        return redirect()->route('admin.doa.dashboard');
    }


    public function destroy($id)
    {
        $content = ContentDoa::findOrFail($id);

        $content->delete();

        return redirect()->route('admin.doa.dashboard');
    }
}
