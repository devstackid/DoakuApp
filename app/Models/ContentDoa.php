<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContentDoa extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    protected $table = 'doa_contents';

    public function category(){
        return $this->belongsTo(Category::class);
    }

    public function histories(){
        return $this->hasMany(History::class);
    }

    public function favorites(){
        return $this->hasMany(Favorite::class);
    }

    public function scopeFilter($query){
        if(request('search')){
            return $query->where('title', 'like', '%' . request('search') . '%');
        }
    }
}
