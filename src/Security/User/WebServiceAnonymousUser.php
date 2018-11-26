<?php

namespace App\Security\User;

class WebServiceAnonymousUser extends WebServiceUser
{
    public function __construct()
    {
        parent::__construct(null, array('IS_AUTHENTICATED_ANONYMOUSLY'));
    }

    public function getUsername()
    {
        return null;
    }
}