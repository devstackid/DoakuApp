<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Favorite extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function doa(){
        return $this->belongsTo(ContentDoa::class);
    }

    public function user(){
        return $this->belongsTo(User::class);
    }
}
