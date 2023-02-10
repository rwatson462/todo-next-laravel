<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TodoGroup extends Model
{
    use HasFactory;

    public $fillable = [
        'name',
        'created_by'
    ];

    public function todos()
    {
        return $this->hasMany(Todo::class, 'group_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
