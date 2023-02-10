<?php

use App\Models\Todo;
use App\Models\TodoGroup;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('todo_groups', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->string('name');
            $table->integer('created_by');
        });

        Schema::table('todos', function (Blueprint $table) {
            $table->integer('group_id')->nullable();
        });
    }

    public function down()
    {
        Schema::dropIfExists('todo_groups');
        Schema::table('todos', function (Blueprint $table) {
            $table->dropColumn('group_id');
        });
    }
};
