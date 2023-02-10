<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    use HasFactory;

    public $fillable = [
        'title',
        'created_by',
        'completed_at',
        'group_id',
    ];

    protected $casts = [
        'completed_at' => 'datetime',
    ];

    public function user() {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function group() {
        return $this->belongsTo(TodoGroup::class, 'group_id');
    }
}
