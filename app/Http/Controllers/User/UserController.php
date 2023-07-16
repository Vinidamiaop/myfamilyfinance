<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserFormRequest;
use App\Services\Users\UserService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    private readonly UserService $service;

    public function __construct(UserService $service)
    {
        $this->service = $service;
    }

    public function index(): \Inertia\Response
    {
        $users = $this->service->all();
        return Inertia::render('Users/Index', [
            'users' => $users
        ]);
    }

    public function create()
    {
        return Inertia::render('Users/Create');
    }

    public function show(int $id)
    {
        $user = $this->service->find($id);
        return Inertia::render('Users/Create', [
            'user' => $user
        ]);
    }

    public function store(UserFormRequest $request)
    {
        $this->service->create($request);
        return redirect()->route('users.index');
    }
}
