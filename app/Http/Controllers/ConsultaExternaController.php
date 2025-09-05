<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;

class ConsultaExternaController extends Controller
{
    public function FUAMasivo(Request $request)
	{
		if($request->method()=='POST')
		{
			$resultado=false;
			$mensaje=null;
			$datos=null;
			$filas=DB::select("select Atenciones.IdCuentaAtencion
from Atenciones
inner join Servicios on Atenciones.IdServicioIngreso=Servicios.IdServicio
inner join SIGHAL_Especialidad_detalle ON Servicios.IdEspecialidad=SIGHAL_Especialidad_detalle.idEspecialidad
inner JOIN SIGHAL_Especialidad ON SIGHAL_Especialidad_detalle.id_esp=SIGHAL_Especialidad.id_esp
where Atenciones.IdTipoServicio=?
and cast(Atenciones.FechaIngreso as date)=cast(? as date)
and Atenciones.idEstadoAtencion<>0", [$request->IdTipoServicio, $request->fecha]);
			if(count($filas)>0)
			{
				$spreadsheet=\PhpOffice\PhpSpreadsheet\IOFactory::load("PlantillaFua.xlsx");
				$HojaPlantilla='SisFua';
				foreach($filas as $key=>$fila)
				{
					$filas[$key]->resultado=false;
					$filas[$key]->mensaje=null;
					$ObtieneCabeceraFua=RS_Fua::ObtieneCabeceraFua($fila->IdCuentaAtencion);
					if($ObtieneCabeceraFua['resultado'])
					{
						$filas[$key]->CabeceraFua=$ObtieneCabeceraFua['datos'];
						RS_Fua::GeneraHojaFua($ObtieneCabeceraFua['datos'],$spreadsheet,$HojaPlantilla);
					}
					else
						$filas[$key]->mensaje=$ObtieneCabeceraFua['mensaje'];
				}
				if($spreadsheet->getSheetCount()>1)
				{
					$datos=$filas;
					$resultado=true;
				}
				else
					$mensaje='Se encontraron atenciones pero el archivo excel esta vacio';
			}
			else
				$mensaje="No existen registros";
			if($resultado)
			{
				return view('ConsultaExterna.FUAMasivo')
					->with("datos",$datos);
			}
			else
				return Redirect::back()->withErrors([$mensaje]);
		}
		else
			return view('ConsultaExterna.FUAMasivo');
	}
}