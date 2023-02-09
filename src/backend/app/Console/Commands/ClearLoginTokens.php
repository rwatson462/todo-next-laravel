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
                ->where(function($query) {
                    $query
                        ->where('expires_at', '<', now())
                        ->orWhere('last_used_at', '<', now()->subDays(1));
                })
                ->delete();
        });

        echo "{$this->tokensDeleted} tokens deleted\n";
    }
}
