<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('todos', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('title');
            $table->integer('created_by');
            $table->datetime('completed_at')->nullable()->default(null);
        });
    }

    public function down()
    {
        Schema::dropIfExists('todos');
    }
};
