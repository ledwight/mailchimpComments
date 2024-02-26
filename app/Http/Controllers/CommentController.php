<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use DB;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Comments/Index', [
            'comments' => Comment::with('user:id,name')->latest()->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'message' => 'required|string|max:255',
            'commenter' => 'required|string|max:255',
        ]);
 
        $request->user()->comments()->create($validated);
 
        return redirect(route('comments.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Comment $comment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Comment $comment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Comment $comment): RedirectResponse
    {
        $this->authorize('update', $comment);
 
        $validated = $request->validate([
            'message' => 'required|string|max:255',
        ]);
 
        $comment->update($validated);
 
        return redirect(route('comments.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comment $comment): RedirectResponse
    {
        $this->authorize('delete', $comment);
 
        $comment->delete();
 
        return redirect(route('comments.index'));

    }

    public function deleteAll(): RedirectResponse
    {
        Comment::truncate();
        return redirect(route('comments.index'));
    }
    
}
