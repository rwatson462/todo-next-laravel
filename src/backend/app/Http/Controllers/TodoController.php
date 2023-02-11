<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use App\Models\TodoGroup;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    public function all()
    {
        return Todo::where('created_by', auth()->user()->id)->get();
    }

    public function getByGroup(TodoGroup $group)
    {
        return $group->todos()
            ->where('created_by', auth()->user()->id)
            ->get();
    }

    public function create(Request $request)
    {
        $validated = $request->validate([
            'title' => 'string|required|min:1|max:255',
            'group_id' => 'integer|required|exists:todo_groups,id'
        ]);

        return Todo::create([
            ...$validated,
            'created_by' => auth()->user()->id,
        ]);
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
