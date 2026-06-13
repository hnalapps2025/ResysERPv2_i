<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use App\RS_Referencia;
use App\RS_Funciones;
use App\RS_His;
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
			$resultado=false;
			$mensaje=null;
			$datos=null;
			$ObtenerDatosAtencionHis=RS_His::ObtenerDatosAtencionHis($request->IdAtencion);
			if($ObtenerDatosAtencionHis['resultado'])
			{
				$PostFields=$ObtenerDatosAtencionHis['datos'];
				$HttpHeader=[
					'Content-Type: application/json'
				];
				$datos=RS_Funciones::LeerPagina(RS_His::$url_envio_his,'POST',$PostFields,$HttpHeader);
				$resultado=true;
			}
			else
				$mensaje=$ObtenerDatosAtencionHis['mensaje'];
			return ['resultado'=>$resultado,'mensaje'=>$mensaje,'datos'=>$datos];
		}
	}
}