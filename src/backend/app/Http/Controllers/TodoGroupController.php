<?php

namespace App\Http\Controllers;

use App\Models\TodoGroup;

class TodoGroupController extends Controller
{
    public function get()
    {
        return TodoGroup::where('created_by', auth()->user()->id)->get();
    }
}
