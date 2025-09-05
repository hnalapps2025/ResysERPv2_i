<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

class Empleado extends Authenticatable
{
    protected $table = 'Empleados';
    protected $primaryKey = 'IdEmpleado';

    protected $fillable = ['Usuario', 'ClaveVWeb'];
    protected $hidden = ['ClaveVWeb'];

    public function getAuthPassword()
    {
        return $this->ClaveVWeb;
    }

    public function getAuthIdentifierName()
    {
        return 'Usuario';
    }
}