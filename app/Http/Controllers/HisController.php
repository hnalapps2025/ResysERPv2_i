<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use App\RS_Referencia;
use App\RS_Funciones;
use \PDO;
use rivcar\jqgrid\jqGridRender;
use rivcar\jqGrid\DBdrivers\jqGridDB;

class HisController extends Controller
{
    public function enviar_atencion(Request $request)
	{
		if($request->method()=='POST')
		{
		}
		else
		{
			/*$data=array(
				"paciente"=>$paciente[0],
				"personal_atiende"=>$personal_atiende[0],
				"personal_registra"=>$personal_atiende[0],
				"cita"=>$cita[0]
			);*/
			$PostFields=[];
			$HttpHeader=[
				'Content-Type: application/json'
			];
			return RS_Funciones::LeerPagina(RSHis::$url_envio_his,'POST',$PostFields,$HttpHeader);
		}
	}
}