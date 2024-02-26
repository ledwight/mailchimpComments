<?php

namespace App\Listeners;

use App\Models\User;
use App\Notifications\NewComment;
use App\Events\CommentCreated;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class SendCommentCreatedNotifications implements ShouldQueue
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
    public function handle(CommentCreated $event): void
    {
        foreach (User::where('id', $event->comment->user_id)->cursor() as $user) {
            $user->notify(new NewComment($event->comment));
        }
    }
}
