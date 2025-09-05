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
			$filas=DB::select("select distinct SIGHAL_Especialidad.id_esp, SIGHAL_Especialidad.especialidad
from Atenciones
inner join Servicios on Atenciones.IdServicioIngreso=Servicios.IdServicio
inner join SIGHAL_Especialidad_detalle ON Servicios.IdEspecialidad=SIGHAL_Especialidad_detalle.idEspecialidad
inner JOIN SIGHAL_Especialidad ON SIGHAL_Especialidad_detalle.id_esp=SIGHAL_Especialidad.id_esp
where Atenciones.IdTipoServicio=?
and cast(Atenciones.FechaIngreso as date)=cast(? as date)
and Atenciones.idEstadoAtencion<>0
order by SIGHAL_Especialidad.especialidad asc", [$request->IdTipoServicio, $request->fecha]);
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
}