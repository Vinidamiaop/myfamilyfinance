<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserFormRequest;
use App\Services\Users\UserService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    private readonly UserService $service;

    public function __construct(UserService $service)
    {
        $this->service = $service;
    }

    public function destroy(int $id): RedirectResponse
    {
        $deletedUser = $this->service->delete($id);
        if ($deletedUser) {
            return to_route('users.index')->with('success', 'Usuário excluído com sucesso');
        }

        return redirect()->route('users.index')->with('error', 'Erro ao excluir usuário');
    }

    public function index(): Response
    {
        $users = $this->service->all();
        return Inertia::render('Users/Index', [
            'users' => $users
        ]);
    }

    public function show(int $id): Response
    {
        $user = $this->service->find($id);
        return Inertia::render('Users/Create', [
            'user' => $user
        ]);
    }

    public function store(UserFormRequest $request): RedirectResponse
    {
        $this->service->create($request);
        return to_route('users.index')->with('success', 'Usuário criado com sucesso');
    }

    public function create(): Response
    {
        return Inertia::render('Users/Create');
    }

    public function update(UserFormRequest $request, int $id): RedirectResponse
    {
        $user = $this->service->update($request, $id);

        if ($user) {
            return to_route('users.show', [
                'id' => $id,
            ], 303)->with('success', 'Usuário atualizado com sucesso');
        }

        return redirect()->route('users.show', [
            'id' => $id,
        ])->with('error', 'Erro ao atualizar usuário');
    }
}
