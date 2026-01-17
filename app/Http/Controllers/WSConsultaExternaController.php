<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class WSConsultaExternaController extends Controller
{
    public function buscar_especialidades_x_fecha(Request $request)
	{
		if($request->method()=='POST')
		{
			$resultado=false;
			$mensaje=null;
			$datos=null;
			$filas=DB::select("select distinct id_esp, especialidad
from rs_v_atenciones_ce
where cast(FechaIngreso as date)=cast(? as date)
and IdTipoServicio=?
Order by especialidad asc", [$request->fecha, $request->IdTipoServicio]);
			if(count($filas)>0)
			{
				$datos=$filas;
				$resultado=true;
			}
			else
				$mensaje="No existen atenciones para los datos ingresados";
			return ['resultado'=>$resultado,"mensaje"=>$mensaje,"datos"=>$datos];
		}
		else
		{
			echo "get";
		}
	}
	public function listar_servicios_x_fecha(Request $request)
	{
		if($request->method()=='POST')
		{
			$resultado=false;
			$mensaje=null;
			$datos=null;
			$filas=DB::select("select distinct IdServicioIngreso, Servicio
from rs_v_atenciones_ce
where cast(FechaIngreso as date)=cast(? as date)
and IdTipoServicio=?
and id_esp=?
Order by Servicio asc", [$request->fecha, $request->IdTipoServicio, $request->id_esp]);
			if(count($filas)>0)
			{
				$datos=$filas;
				$resultado=true;
			}
			else
				$mensaje="No existen servicios para los datos ingresados";
			return ['resultado'=>$resultado,"mensaje"=>$mensaje,"datos"=>$datos];
		}
		else
		{
			echo "get";
		}
	}
}