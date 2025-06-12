<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class EventController extends Controller
{

    public function index(){
        $user = Auth::user();
        return Inertia::render('Admin/Event', [
            'events' => Event::latest()->get(),
            'user' => $user,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:20',
            'deskripsi' => 'nullable|string|min:3|max:255',
            'tanggal' => 'required|date',
            
        ]);

        $event = new Event();
        $event->title = $request->input('title');
        if($request->deskripsi){
            $event->deskripsi = $request->input('deskripsi');
        }
        $event->tanggal = $request->input('tanggal');

        $event->save();

        return redirect()->route('admin.event.dashboard');
    }

    public function update(Request $request, $id)
    {

        // Validasi input
        $request->validate([
            'title' => 'required|string|max:20',
            'deskripsi' => 'nullable|string|min:3|max:255',
            'tanggal' => 'required|date',
        ]);

        $event = Event::findOrFail($id);

        $event->title = $request->title;
        if($request->deskripsi){
            $event->deskripsi = $request->deskripsi;
        }
        
        $event->tanggal = $request->tanggal;

        $event->save();


        return redirect()->route('admin.event.dashboard');
    }


    public function destroy($id)
    {
        $event = Event::findOrFail($id);
        $event->delete();

        return redirect()->route('admin.event.dashboard');
    }
}
