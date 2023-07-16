<?php

namespace App\Services\Users;

use App\Repositories\Users\UserRepository;
use Illuminate\Http\Request;

class UserService
{
    private readonly UserRepository $repository;

    public function __construct(UserRepository $repository)
    {
        $this->repository = $repository;
    }

    public function all()
    {
        return $this->repository->all();
    }

    public function create(Request $request)
    {
        try {
            $data = $request->all();
            return $this->repository->create($data);
        } catch(\Exception $e) {
            dd($e);
        }

    }

    public function find(int $id)
    {
        return $this->repository->find($id);
    }

    public function update(Request $request, int $id)
    {
        $data = $request->all();
        return $this->repository->update($data, $id);
    }

    public function delete(int $id)
    {
        return $this->repository->delete($id);
    }
}
