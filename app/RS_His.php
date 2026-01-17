<?php
namespace App;

use Illuminate\Support\Facades\DB;

class RS_His
{
	public static function ObtenerDatosHisMasivo($fecha,$IdTipoServicio,$id_esp,$servicios)
	{
		$resultado=false;
		$mensaje=null;
		$datos=null;
		$sql="select *
from rs_v_atenciones_ce
where cast(FechaIngreso as date)=?
and IdTipoServicio=?";
		$parametros=[$fecha,$IdTipoServicio];
		if(strlen($id_esp)>0)
		{
			$sql.=" and id_esp=?";
			$parametros[]=$id_esp;
		}
		if(is_array($servicios)&&count($servicios)>0)
		{
			$sql.=" and IdServicioIngreso in (".implode(',', array_fill(0, count($servicios), '?')).")";
			$parametros=array_merge($parametros,$servicios);
		}
		$sql.=" order by Servicio asc, HoraIngreso asc";
		$filas=DB::select($sql,$parametros);
		if(count($filas)>0)
		{
			$OrdenarDatosImpresionHis=self::OrdenarDatosImpresionHis($filas);
			if($OrdenarDatosImpresionHis['resultado'])
			{
				$datos=$OrdenarDatosImpresionHis['datos'];
				$resultado=true;
			}
			else
				$mensaje=$OrdenarDatosImpresionHis['mensaje'];
		}
		else
			$mensaje='No existe Registros';
		return ['resultado'=>$resultado,'mensaje'=>$mensaje,'datos'=>$datos];
	}
	public static function OrdenarDatosImpresionHis($filas)
	{
		$resultado=false;
		$mensaje=null;
		$datos=[];
		foreach($filas as $fila)
		{
			$posicion=RS_Funciones::devuelve_indice_array('IdMedico',$fila->IdMedico,$datos);
			if($posicion===null)
			{
				$datos[]=json_decode(json_encode($fila), true);
				$posicion=count($datos)-1;
			}
			$datos[$posicion]['registros'][]=json_decode(json_encode($fila), true);
		}
		$resultado=true;
		return ['resultado'=>$resultado,'mensaje'=>$mensaje,'datos'=>$datos];
	}
}