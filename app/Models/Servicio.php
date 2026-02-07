<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Servicio extends Model
{
    protected $table = 'Servicios';
    protected $primaryKey = 'IdServicio';
    public $timestamps = false;

    protected $fillable = [
        'Nombre',
        'AceptaCupoWeb',
        'NroCuposWeb'
    ];
}