<?php
namespace App;

use Illuminate\Support\Facades\DB;

class RS_His
{
	public static $url_envio_his='http://dpidesalud.minsa.gob.pe:18080/mcs-sihce-hisminsa/integracion/v1.0/paquete/actualizar';
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
	public static function ObtenerDatosAtencionHis($IdAtencion)
	{
		$resultado=false;
		$mensaje=null;
		$datos=[];
		$atencion=DB::select("SELECT        Atenciones.IdMedicoIngreso, CASE WHEN len(Pacientes.NroDocumento) = 0 THEN '5' ELSE Pacientes.IdDocIdentidad END AS idtipodoc, CASE WHEN len(Pacientes.NroDocumento) = 0 THEN '1' ELSE Pacientes.NroDocumento END AS nrodocumento,
										Pacientes.ApellidoPaterno as apepaterno, Pacientes.ApellidoMaterno as apematerno, Pacientes.PrimerNombre as nombres, 
										CONVERT(varchar(8),Pacientes.FechaNacimiento,112) as fechanacimiento, Pacientes.NroHistoriaClinica as nrohistoriaclinica, case Pacientes.IdTipoSexo when 1 then 'M' else 'F' end as idsexo, 
										ISNULL(Paises.Codigo, 'PER') AS idpais, rtrim(ltrim(ISNULL(HIS_tabetnia.codhis, '58'))) AS idetnia,5 AS idflag,6207 as idestablecimiento,Atenciones.idEstadoAtencion, isnull(AtencionesRevisionHIS.Estado,1) as Estado
	FROM            Atenciones INNER JOIN
							 Pacientes on Atenciones.IdPaciente = Pacientes.IdPaciente LEFT OUTER JOIN
							 Paises ON Pacientes.IdPaisNacimiento = Paises.IdPais LEFT OUTER JOIN
							 HIS_tabetnia ON Pacientes.IdEtnia = HIS_tabetnia.codetni INNER JOIN
						 AtencionesRevisionHIS ON Atenciones.IdAtencion = AtencionesRevisionHIS.IdAtencion
	WHERE        (Atenciones.IdAtencion=?)",[$IdAtencion]);
		$cont=count($atencion);
		if($cont==1)
		{
			$data=[
				"paciente"=>$atencion[0]
			];
			$resultado=true;
		}
		elseif($cont==0)
			$mensaje="No existe registros";
		else
			$mensaje="Duplicidad de registros";
		return ['resultado'=>$resultado,'mensaje'=>$mensaje,'datos'=>$datos];
	}
}