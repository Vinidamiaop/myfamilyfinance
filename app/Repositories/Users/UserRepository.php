<?php

namespace App\Repositories\Users;

use App\Models\Users\User;
use App\Repositories\CrudRepository;

class UserRepository extends CrudRepository
{
    public function __construct(User $user)
    {
        parent::__construct($user);
    }
}
