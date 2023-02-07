<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class ClearLoginTokens extends Command
{
    protected $signature = 'tokens:clear';

    protected $description = 'Deletes all Login tokens that are older than 30 minutes';

    private int $tokensDeleted = 0;

    public function handle()
    {
        User::cursor()->each(function (User $user) {
            $this->tokensDeleted += $user->tokens()
                ->where('name', 'login')
                ->where('expires_at', '<', now())
                ->delete();
        });

        echo "{$this->tokensDeleted} tokens deleted\n";
    }
}
