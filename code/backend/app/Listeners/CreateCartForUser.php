<?php

namespace App\Listeners;

use App\Events\UserLoggedIn;
use App\Models\Cart;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class CreateCartForUser
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(UserLoggedIn $event): void
    {
        $user=$event->user;

        if(!$user->cart){
            Cart::create([
                'user_id'=>$user->id,
            ]);
        }
    }
}