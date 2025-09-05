<?php
namespace App;

use Illuminate\Support\Facades\DB;

class RS_ArchivoClinico
{
	public static $IdServicioArchivoClinico=48;
	public static $NombreServicio='Archivo Clinico';
	public static $IdMotivoDevolucion=9;
	public static function SalidaHistoriaClinica($NroHistoriaClinica,$fecha,$FechaMovimiento,$IdTurno,$Observacion,$IdEmpleadoArchivo)
	{
		$resultado=false;
		$mensaje=null;
		$datos=null;
		$BuscarSolicitudHistoria=self::BuscarSolicitudHistoria($NroHistoriaClinica,$fecha);
		if($BuscarSolicitudHistoria['resultado'])
		{
			$UbicacionActualHistoria=self::UbicacionActualHistoria($BuscarSolicitudHistoria['datos']->IdPaciente);
			if($UbicacionActualHistoria['resultado'])
			{
				if($UbicacionActualHistoria['datos']->IdServicioDestino==self::$IdServicioArchivoClinico)
				{
					$BuscarConserje=self::BuscarConserje($BuscarSolicitudHistoria['datos']->IdServicio,$IdTurno);
					if($BuscarConserje['resultado'])
					{
						$ObtenerIdGrupoMovimiento=self::ObtenerIdGrupoMovimiento($BuscarConserje['datos']->IdEmpleado,$BuscarSolicitudHistoria['datos']->IdServicio);
						if($ObtenerIdGrupoMovimiento['resultado'])
						{
							$GenerarRegistroMovimientosHistoriaClinica=self::GenerarRegistroMovimientosHistoriaClinica(
								$BuscarSolicitudHistoria['datos']->IdPaciente
								,$FechaMovimiento
								,$BuscarSolicitudHistoria['datos']->IdMotivo
								,$Observacion
								,self::$IdServicioArchivoClinico
								,$BuscarSolicitudHistoria['datos']->IdServicio
								,$IdEmpleadoArchivo
								,$BuscarConserje['datos']->IdEmpleado
								,$BuscarSolicitudHistoria['datos']->IdEmpleadoSolicita
								,$ObtenerIdGrupoMovimiento['datos']->IdGrupoMovimiento
								,$BuscarSolicitudHistoria['datos']->IdAtencion);
							if($GenerarRegistroMovimientosHistoriaClinica['resultado'])
							{
								DB::update("Update HistoriasSolicitadas set IdMovimiento=?, estado=5 where IdHistoriaSolicitada=?",[$GenerarRegistroMovimientosHistoriaClinica['datos'],$BuscarSolicitudHistoria['datos']->IdHistoriaSolicitada]);
								$resultado=true;
							}
							else
								$mensaje=$GenerarRegistroMovimientosHistoriaClinica['mensaje'];
						}
						else
							$mensaje=$ObtenerIdGrupoMovimiento['mensaje'];
					}
					else
						$mensaje=$BuscarConserje['mensaje'];
				}
				else
				{
					$mensaje="La historia clinica esta en el servicio: ".$UbicacionActualHistoria['datos']->Servicio;
					$datos=$UbicacionActualHistoria['datos'];
				}
			}
			else
				$mensaje=$UbicacionActualHistoria['mensaje'];
		}
		else
			$mensaje=$BuscarSolicitudHistoria['mensaje'];
		return ['resultado'=>$resultado,'mensaje'=>$mensaje,'datos'=>$datos];
	}
	public static function RetornoHistoriaClinica($NroHistoriaClinica,$FechaMovimiento,$Observacion,$IdEmpleadoArchivo)
	{
		$resultado=false;
		$mensaje=null;
		$datos=null;
		$ObtenerDatosHistoria=self::ObtenerDatosHistoria($NroHistoriaClinica);
		if($ObtenerDatosHistoria['resultado'])
		{
			$UbicacionActualHistoria=self::UbicacionActualHistoria($ObtenerDatosHistoria['datos']->IdPaciente);
			if($UbicacionActualHistoria['resultado'])
			{
				if($UbicacionActualHistoria['datos']->IdServicioDestino!=self::$IdServicioArchivoClinico)
				{
					$ObtenerIdGrupoMovimiento=self::ObtenerIdGrupoMovimiento($UbicacionActualHistoria['datos']->IdEmpleadoTransporte,self::$IdServicioArchivoClinico);
					if($ObtenerIdGrupoMovimiento['resultado'])
					{
						$GenerarRegistroMovimientosHistoriaClinica=self::GenerarRegistroMovimientosHistoriaClinica($ObtenerDatosHistoria['datos']->IdPaciente,$FechaMovimiento,self::$IdMotivoDevolucion,$Observacion,$UbicacionActualHistoria['datos']->IdServicioDestino,self::$IdServicioArchivoClinico,$IdEmpleadoArchivo,$UbicacionActualHistoria['datos']->IdEmpleadoTransporte,$UbicacionActualHistoria['datos']->IdEmpleadoRecepcion,$ObtenerIdGrupoMovimiento['datos']->IdGrupoMovimiento,$UbicacionActualHistoria['datos']->IdAtencion);
						if($GenerarRegistroMovimientosHistoriaClinica['resultado'])
						{
							DB::update("Update HistoriasSolicitadas set IdMovimientoRetorno=?, estado=9 where IdAtencion=?",[$GenerarRegistroMovimientosHistoriaClinica['datos'],$UbicacionActualHistoria['datos']->IdAtencion]);
							$resultado=true;
						}
						else
							$mensaje=$GenerarRegistroMovimientosHistoriaClinica['mensaje'];
					}
					else
						$mensaje=$ObtenerIdGrupoMovimiento['mensaje'];
				}
				else
					$mensaje="La historia clinica ya está en el Archivo";
			}
			else
				$mensaje=$UbicacionActualHistoria['mensaje'];
		}
		else
			$mensaje=$ObtenerDatosHistoria['mensaje'];
		return ['resultado'=>$resultado,'mensaje'=>$mensaje,'datos'=>$datos];
	}
	public static function BuscarSolicitudHistoria($NroHistoriaClinica,$fecha)
	{
		$resultado=false;
		$mensaje=null;
		$datos=null;
		$filas=DB::select("SELECT        HistoriasSolicitadas.IdHistoriaSolicitada, HistoriasSolicitadas.IdPaciente,
                         HistoriasSolicitadas.FechaSolicitud, HistoriasSolicitadas.HoraSolicitud, HistoriasSolicitadas.FechaRequerida, HistoriasSolicitadas.HoraRequerida, HistoriasSolicitadas.IdMotivo, 
                         HistoriasSolicitadas.IdServicio, HistoriasSolicitadas.IdAtencion, HistoriasSolicitadas.IdEmpleadoSolicita, isnull(HistoriasSolicitadas.estado,1) as estado
FROM            HistoriasSolicitadas
                         INNER JOIN Pacientes ON HistoriasSolicitadas.IdPaciente = Pacientes.IdPaciente
WHERE        (Pacientes.NroHistoriaClinica =?) AND (CAST(HistoriasSolicitadas.FechaRequerida AS date) =cast(? as date)) AND (ISNULL(HistoriasSolicitadas.estado_registro,1)=1)
ORDER BY FechaRequerida ASC, HoraRequerida ASC",[$NroHistoriaClinica,$fecha]);
		if(count($filas)>0)
		{
			foreach($filas as $fila)
			{
				if($fila->estado==1)
				{
					$datos=$fila;
					$resultado=true;
					break;
				}
			}
			if(!$resultado)
				$mensaje="Ya todas las Peticiones para ese dia fueron procesadas";
		}
		else
			$mensaje='No existe Solicitud para esa fecha: '.$fecha;
		return ['resultado'=>$resultado,'mensaje'=>$mensaje,'datos'=>$datos];
	}
	public static function UbicacionActualHistoria($IdPaciente)
	{
		$resultado=false;
		$mensaje=null;
		$datos=null;
		try{
			$filas=DB::select("SELECT        MovimientosHistoriaClinica.IdMovimiento, MovimientosHistoriaClinica.IdPaciente, MovimientosHistoriaClinica.IdServicioDestino, Servicios.Nombre AS Servicio, MovimientosHistoriaClinica.FechaMovimiento, 
                         MotivosMovimientoHistoria.Descripcion AS Motivo, MovimientosHistoriaClinica.IdAtencion, MovimientosHistoriaClinica.IdEmpleadoRecepcion, MovimientosHistoriaClinica.IdEmpleadoTransporte, Pacientes.ApellidoPaterno, 
                         Pacientes.ApellidoMaterno, Pacientes.PrimerNombre, Pacientes.NroHistoriaClinica, MovimientosHistoriaClinica.Observacion, 
                         Empleados.ApellidoPaterno + ' ' + Empleados.ApellidoMaterno + ' ' + Empleados.Nombres AS Conserje, Empleados2.ApellidoPaterno + ' ' + Empleados2.ApellidoMaterno + ' ' + Empleados2.Nombres AS Archivero
FROM            MovimientosHistoriaClinica INNER JOIN
                         Servicios ON MovimientosHistoriaClinica.IdServicioDestino = Servicios.IdServicio INNER JOIN
                         MotivosMovimientoHistoria ON MovimientosHistoriaClinica.IdMotivo = MotivosMovimientoHistoria.IdMotivo INNER JOIN
                         Pacientes ON MovimientosHistoriaClinica.IdPaciente = Pacientes.IdPaciente INNER JOIN
                         Empleados ON MovimientosHistoriaClinica.IdEmpleadoTransporte = Empleados.IdEmpleado LEFT OUTER JOIN
                         Empleados AS Empleados2 ON MovimientosHistoriaClinica.IdEmpleadoRecepcion = Empleados2.IdEmpleado
WHERE        (MovimientosHistoriaClinica.IdPaciente =?)
ORDER BY MovimientosHistoriaClinica.FechaMovimiento DESC",[$IdPaciente]);
			if(count($filas)>0)
			{
				$datos=$filas[0];
			}
			else
			{
				$datos = new \stdClass();
				$datos->IdServicioDestino =self::$IdServicioArchivoClinico;
				$datos->Nombre =self::$NombreServicio;
				$datos->FechaMovimiento =null;
				$datos->Motivo =null;
			}
			$resultado=true;
		}catch(\Exception $e){
			$mensaje=$e->getMessage();
		}
		return ['resultado'=>$resultado,'mensaje'=>$mensaje,'datos'=>$datos];
	}
	public static function ObtenerDatosHistoria($NroHistoriaClinica)
	{
		$resultado=false;
		$mensaje=null;
		$datos=null;
		try{
			$filas=DB::select("select NroHistoriaClinica, IdPaciente from HistoriasClinicas where NroHistoriaClinica=?",[$NroHistoriaClinica]);
			if(count($filas)==1)
			{
				$datos=$filas[0];
				$resultado=true;
			}
			elseif(count($filas)>1)
				$mensaje='Existe duplicidad de Registros para ese Número de Historia: '.$NroHistoriaClinica;
			else
				$mensaje='No Existe Registros para ese Número de Historia: '.$NroHistoriaClinica;
		}catch(\Exception $e){
			$mensaje=$e->getMessage();
		}
		return ['resultado'=>$resultado,'mensaje'=>$mensaje,'datos'=>$datos];
	}
	public static function GenerarRegistroMovimientosHistoriaClinica($IdPaciente,$FechaMovimiento,$IdMotivo,$Observacion,$IdServicioOrigen,$IdServicioDestino,$IdEmpleadoArchivo,$IdEmpleadoTransporte,$IdEmpleadoRecepcion,$IdGrupoMovimiento,$IdAtencion)
	{
		$resultado=false;
		$mensaje=null;
		$datos=null;
		try{
			DB::insert("insert into MovimientosHistoriaClinica(IdPaciente,FechaMovimiento,
			IdMotivo,Observacion,IdServicioOrigen,IdServicioDestino,IdEmpleadoArchivo,
			IdEmpleadoTransporte,IdEmpleadoRecepcion,IdGrupoMovimiento,IdAtencion) values(?,?,
			?,?,?,?,?,
			?,?,?,?)",[$IdPaciente,$FechaMovimiento,
			$IdMotivo,$Observacion,$IdServicioOrigen,$IdServicioDestino,$IdEmpleadoArchivo,
			$IdEmpleadoTransporte,$IdEmpleadoRecepcion,$IdGrupoMovimiento,$IdAtencion]);
			$datos=DB::connection()->getPdo()->lastInsertId();
			$resultado=true;
		}catch(\Exception $e){
			$mensaje=$e->getMessage();
		}
		return ['resultado'=>$resultado,'mensaje'=>$mensaje,'datos'=>$datos];
	}
	public static function ObtenerIdGrupoMovimiento($IdEmpleado,$IdServicio)
	{
		$resultado=false;
		$mensaje=null;
		$datos=null;
		try{
			$filas=DB::select("SELECT        TOP (1) IdGrupoMovimiento, IdServicioDestino
				FROM            MovimientosHistoriaClinica
				WHERE        (CONVERT(date, FechaMovimiento) = CONVERT(date, GETDATE())) AND (IdEmpleadoTransporte =?)
				ORDER BY FechaMovimiento DESC",[$IdEmpleado]);
			if(count($filas)>0&&$filas[0]->IdServicioDestino==$IdServicio)
				$datos=$filas[0];
			else
			{
				$ValorInt=DB::selectone("SELECT ValorInt FROM Parametros WHERE (IdParametro = 6)")->ValorInt;
				DB::update("UPDATE Parametros SET ValorInt = ValorInt + 1 WHERE (IdParametro = 6)");
				$datos = new \stdClass();
				$datos->IdGrupoMovimiento=$ValorInt;
				$datos->IdServicioDestino=$IdServicio;
			}		
			$resultado=true;
		}catch(\Exception $e){
			$mensaje=$e->getMessage();
		}
		return ['resultado'=>$resultado,'mensaje'=>$mensaje,'datos'=>$datos];
	}
	
	public static function BuscarConserje($IdServicio,$IdTurno)
	{
		$resultado=false;
		$mensaje=null;
		$datos=null;
		try{
			$filas=DB::select("SELECT        ArchivoRutaConserje.IdEmpleado
FROM            ArchivoRutaServicio INNER JOIN
                         ArchivoRuta ON ArchivoRutaServicio.IdRuta = ArchivoRuta.IdRuta INNER JOIN
                         ArchivoRutaConserje ON ArchivoRuta.IdRuta = ArchivoRutaConserje.IdRuta
WHERE        (ArchivoRutaConserje.estado = 1) AND (ArchivoRuta.estado = 1) AND (ArchivoRutaServicio.estado = 1) AND (ArchivoRutaServicio.IdServicio = ?) AND (ArchivoRuta.IdTipoTurnoRef =?)",[$IdServicio,$IdTurno]);
			if(count($filas)==1)
			{
				$datos=$filas[0];
				$resultado=true;
			}
			elseif(count($filas)>1)
				$mensaje="Existe Duplicidad de Registro para Conserje";
			else
				$mensaje="No existe Conserje Configurado";
		}catch(\Exception $e){
			$mensaje=$e->getMessage();
		}
		return ['resultado'=>$resultado,'mensaje'=>$mensaje,'datos'=>$datos];
	}
	public static function ListarRutas($Turno=null)
	{
		return $Turno!=null?DB::select("select * from ArchivoRuta where estado=1 and IdTipoTurnoRef=?",[$turno]):DB::select("select * from ArchivoRuta where estado=1");
	}
	public static function ListarRutasCombo($Turno=null,)
	{
		$rutas['']="Seleccione una Ruta";
		$ListarRutas=self::ListarRutas($Turno);
		foreach($ListarRutas as $Ruta)
			$rutas[$Ruta->IdRuta]=$Ruta->Nombre;
		return $rutas;
	}
}