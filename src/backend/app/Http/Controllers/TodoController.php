<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    public function create(Request $request)
    {
        $title = $request->input('title');
        $createdBy = auth()->user()->id;

        $todo = Todo::create([
            'title' => $title,
            'created_by' => $createdBy,
        ]);

        return $todo;
    }

    public function complete(Todo $todo)
    {
        $todo->update(['completed_at' => now()]);

        return $todo;
    }

    public function uncomplete(Todo $todo)
    {
        $todo->update(['completed_at' => null]);

        return $todo;
    }
}
