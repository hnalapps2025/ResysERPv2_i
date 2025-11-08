<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use App\RS_ArchivoClinico;
use \PDO;
use rivcar\jqgrid\jqGridRender;
use rivcar\jqGrid\DBdrivers\jqGridDB;

class ArchivoClinicoController extends Controller
{
    public function ConsultaMovimientoHistoria(Request $request)
	{
		if($request->method()=='POST')
		{
			$resultado=false;
			$mensaje=null;
			$datos=null;
			$filas=DB::select("select IdPaciente, ApellidoPaterno, ApellidoMaterno,PrimerNombre, FechaNacimiento, IdTipoSexo, NroHistoriaClinica
from Pacientes
where NroHistoriaClinica=?", [$request->NroHistoriaClinica]);
			if(count($filas)==1)
			{
				$filas[0]->Movimientos=DB::select("SELECT        MovimientosHistoriaClinica.IdMovimiento, MotivosMovimientoHistoria.Descripcion as MotivoMovimiento,
Atenciones.FechaIngreso, Atenciones.HoraIngreso, MovimientosHistoriaClinica.FechaMovimiento, MovimientosHistoriaClinica.Observacion, Servicios.Nombre AS ServicioOrigen,
Servicios2.Nombre AS ServicioDestino
FROM            MovimientosHistoriaClinica
INNER JOIN MotivosMovimientoHistoria ON MovimientosHistoriaClinica.IdMotivo = MotivosMovimientoHistoria.IdMotivo
INNER JOIN Servicios ON MovimientosHistoriaClinica.IdServicioOrigen=Servicios.IdServicio
INNER JOIN Servicios Servicios2 ON MovimientosHistoriaClinica.IdServicioDestino=Servicios2.IdServicio
LEFT OUTER JOIN Atenciones ON MovimientosHistoriaClinica.IdAtencion = Atenciones.IdAtencion
WHERE        (MovimientosHistoriaClinica.IdPaciente =?)
order by MovimientosHistoriaClinica.FechaMovimiento desc", [$filas[0]->IdPaciente]);
				$datos=$filas[0];
				$resultado=true;
			}
			elseif(count($filas)==0)
				$mensaje="No existen registros";
			else
				$mensaje="Duplicidad de registros";
			if($resultado)
			{
				return view('ArchivoClinico.ConsultaMovimientoHistoria')
					->with("datos",$datos);
			}
			else
				return Redirect::back()->withErrors([$mensaje]);
		}
		else
			return view('ArchivoClinico.ConsultaMovimientoHistoria');
	}
	public function SalidaHistoria(Request $request)
	{
		if($request->method()=='POST')
		{
			$resultado=false;
			$mensaje=null;
			$datos=null;
			$SalidaHistoriaClinica=RS_ArchivoClinico::SalidaHistoriaClinica($request->NroHistoria,$request->Fecha,date('Ymd H:i:s'),$request->Turno,$request->Observacion,auth()->user()->IdEmpleado);
			if($SalidaHistoriaClinica['resultado'])
			{
				$datos=$SalidaHistoriaClinica['datos'];
				$resultado=true;
			}
			else
			{
				$mensaje=$SalidaHistoriaClinica['mensaje'];
				$datos=$SalidaHistoriaClinica['datos'];
			}
			if($resultado)
				return view('ArchivoClinico.SalidaHistoria')
					->with("mensaje","Historia Clinica a Destino");
			else
				return view('ArchivoClinico.SalidaHistoria')
					->with("error",$mensaje)
					->with("datos",$datos);
		}
		else
			return view('ArchivoClinico.SalidaHistoria');
	}
	public function RetornoHistoria(Request $request)
	{
		if($request->method()=='POST')
		{
			$resultado=false;
			$mensaje=null;
			$datos=null;
			if($request->accion=="Retornar")
			{
				$SalidaHistoriaClinica=RS_ArchivoClinico::RetornoHistoriaClinica($request->NroHistoria,date('Ymd H:i:s'),$request->Observacion,auth()->user()->IdEmpleado);
				if($SalidaHistoriaClinica['resultado'])
				{
					$datos=$SalidaHistoriaClinica['datos'];
					$resultado=true;
				}
				else
					$mensaje=$SalidaHistoriaClinica['mensaje'];
				if($resultado)
					return Redirect::back()->withErrors(["Retornado Correctamente"]);
				else
					return Redirect::back()->withErrors([$mensaje]);
			}
			else
			{
				$ObtenerDatosHistoria=RS_ArchivoClinico::ObtenerDatosHistoria($request->NroHistoria);
				if($ObtenerDatosHistoria['resultado'])
				{
					$UbicacionActualHistoria=RS_ArchivoClinico::UbicacionActualHistoria($ObtenerDatosHistoria['datos']->IdPaciente);
					if($UbicacionActualHistoria['resultado'])
					{
						if($UbicacionActualHistoria['datos']->IdServicioDestino!=RS_ArchivoClinico::$IdServicioArchivoClinico)
						{
							$datos=$UbicacionActualHistoria['datos'];
							$resultado=true;
						}
						else
							$mensaje="La historia clinica ya está en el Archivo";
					}
					else
						$mensaje=$UbicacionActualHistoria['mensaje'];
				}
				else
					$mensaje=$ObtenerDatosHistoria['mensaje'];
				if($resultado)
				{
					return view('ArchivoClinico.RetornoHistoria')
						->with("datos",$datos);
				}
				else
					return Redirect::back()->withErrors([$mensaje]);
			}
		}
		else
			return view('ArchivoClinico.RetornoHistoria');
	}
	public function NoDevueltasXServicio(Request $request)
	{
		if($request->method()=='POST')
		{
			$resultado=false;
			$mensaje=null;
			$datos=null;
			$filas=DB::select("SELECT        v_rs_HistoriasNoDevueltas.IdMovimiento, v_rs_HistoriasNoDevueltas.FechaMovimiento, v_rs_HistoriasNoDevueltas.Observacion, 
                         Pacientes.ApellidoPaterno + ' ' + Pacientes.ApellidoMaterno + ' ' + Pacientes.PrimerNombre AS Paciente, Servicios.Nombre AS Servicio, 
                         Empleados.ApellidoPaterno + ' ' + Empleados.ApellidoMaterno + ' ' + Empleados.Nombres AS Solicitante, MotivosMovimientoHistoria.Descripcion AS Motivo,
						 Pacientes.NroHistoriaClinica, cast(Atenciones.FechaIngreso as date) as FechaCita
FROM            v_rs_HistoriasNoDevueltas INNER JOIN
                         Pacientes ON v_rs_HistoriasNoDevueltas.IdPaciente = Pacientes.IdPaciente INNER JOIN
                         Servicios ON v_rs_HistoriasNoDevueltas.IdServicioDestino = Servicios.IdServicio INNER JOIN
                         MotivosMovimientoHistoria ON v_rs_HistoriasNoDevueltas.IdMotivo = MotivosMovimientoHistoria.IdMotivo LEFT OUTER JOIN
                         Empleados ON v_rs_HistoriasNoDevueltas.IdEmpleadoRecepcion = Empleados.IdEmpleado LEFT OUTER JOIN
						 Atenciones ON v_rs_HistoriasNoDevueltas.IdAtencion = Atenciones.IdAtencion
WHERE CAST(v_rs_HistoriasNoDevueltas.FechaMovimiento AS date) between ? and ?
ORDER BY Servicios.Nombre ASC", [$request->FechaIni,$request->FechaFin]);
			if(count($filas)>0)
			{
				$datos=$filas;
				$resultado=true;
			}
			else
				$mensaje="No existen registros";
			if($resultado)
			{
				return view('ArchivoClinico.NoDevueltasXServicio')
					->with("datos",$datos);
			}
			else
				return Redirect::back()->withErrors([$mensaje]);
		}
		else
			return view('ArchivoClinico.NoDevueltasXServicio');
	}
	public function NoDevueltasXSerie(Request $request)
	{
		if($request->method()=='POST')
		{
			$resultado=false;
			$mensaje=null;
			$datos=null;
			$filas=DB::select("SELECT        v_rs_HistoriasNoDevueltas.IdMovimiento, v_rs_HistoriasNoDevueltas.FechaMovimiento, v_rs_HistoriasNoDevueltas.Observacion, 
                         Pacientes.ApellidoPaterno + ' ' + Pacientes.ApellidoMaterno + ' ' + Pacientes.PrimerNombre AS Paciente, Servicios.Nombre AS Servicio, 
                         Empleados.ApellidoPaterno + ' ' + Empleados.ApellidoMaterno + ' ' + Empleados.Nombres AS Solicitante, MotivosMovimientoHistoria.Descripcion AS Motivo,
						 Pacientes.NroHistoriaClinica
FROM            v_rs_HistoriasNoDevueltas INNER JOIN
                         Pacientes ON v_rs_HistoriasNoDevueltas.IdPaciente = Pacientes.IdPaciente INNER JOIN
                         Servicios ON v_rs_HistoriasNoDevueltas.IdServicioDestino = Servicios.IdServicio INNER JOIN
                         MotivosMovimientoHistoria ON v_rs_HistoriasNoDevueltas.IdMotivo = MotivosMovimientoHistoria.IdMotivo LEFT OUTER JOIN
                         Empleados ON v_rs_HistoriasNoDevueltas.IdEmpleadoRecepcion = Empleados.IdEmpleado
WHERE CAST(v_rs_HistoriasNoDevueltas.FechaMovimiento AS date) between ? and ?
and RIGHT(Pacientes.NroHistoriaClinica, 2) between ? and ?
ORDER BY RIGHT(Pacientes.NroHistoriaClinica, 2) ASC, NroHistoriaClinica ASC", [$request->FechaIni,$request->FechaFin,$request->SerieIni,$request->SerieFin]);
			if(count($filas)>0)
			{
				$datos=$filas;
				$resultado=true;
			}
			else
				$mensaje="No existen registros";
			if($resultado)
			{
				return view('ArchivoClinico.NoDevueltasXSerie')
					->with("datos",$datos);
			}
			else
				return Redirect::back()->withErrors([$mensaje]);
		}
		else
			return view('ArchivoClinico.NoDevueltasXSerie');
	}
	public function NoDevueltasXRuta(Request $request)
	{
		if($request->method()=='POST')
		{
			$resultado=false;
			$mensaje=null;
			$datos=null;
			$filas=DB::select("SELECT        v_rs_HistoriasNoDevueltas.IdMovimiento, v_rs_HistoriasNoDevueltas.FechaMovimiento, v_rs_HistoriasNoDevueltas.Observacion, 
                         Pacientes.ApellidoPaterno + ' ' + Pacientes.ApellidoMaterno + ' ' + Pacientes.PrimerNombre AS Paciente, Servicios.Nombre AS Servicio, 
                         Empleados.ApellidoPaterno + ' ' + Empleados.ApellidoMaterno + ' ' + Empleados.Nombres AS Solicitante, MotivosMovimientoHistoria.Descripcion AS Motivo,
						 Pacientes.NroHistoriaClinica
FROM            v_rs_HistoriasNoDevueltas INNER JOIN
                         Pacientes ON v_rs_HistoriasNoDevueltas.IdPaciente = Pacientes.IdPaciente INNER JOIN
                         Servicios ON v_rs_HistoriasNoDevueltas.IdServicioDestino = Servicios.IdServicio INNER JOIN
                         MotivosMovimientoHistoria ON v_rs_HistoriasNoDevueltas.IdMotivo = MotivosMovimientoHistoria.IdMotivo LEFT OUTER JOIN
                         Empleados ON v_rs_HistoriasNoDevueltas.IdEmpleadoRecepcion = Empleados.IdEmpleado
WHERE CAST(v_rs_HistoriasNoDevueltas.FechaMovimiento AS date)=?
and v_rs_HistoriasNoDevueltas.IdServicioDestino in(select IdServicio from ArchivoRutaServicio where estado=1 and IdRuta=?)
ORDER BY RIGHT(Pacientes.NroHistoriaClinica, 2) ASC, NroHistoriaClinica ASC", [$request->Fecha,$request->IdRuta]);
			if(count($filas)>0)
			{
				$datos=$filas;
				$resultado=true;
			}
			else
				$mensaje="No existen registros";
			if($resultado)
			{
				$Rutas=RS_ArchivoClinico::ListarRutasCombo();
				return view('ArchivoClinico.NoDevueltasXRuta')
					->with("Rutas",$Rutas)
					->with("datos",$datos);
			}
			else
				return Redirect::back()->withErrors([$mensaje]);
		}
		else
		{
			$Rutas=RS_ArchivoClinico::ListarRutasCombo();
			return view('ArchivoClinico.NoDevueltasXRuta')
				->with("Rutas",$Rutas);
		}
	}
	public function ReporteCitados(Request $request)
	{
		if($request->method()=='POST')
		{
			$resultado=false;
			$mensaje=null;
			$datos=null;
			$fecha=strlen($request->fecha)>0?$request->fecha:date("Y-m-d");
			$turno=$request->turno;
			$rini=strlen($request->rini)>0?$request->rini:'00';
			$rfin=strlen($request->rfin)>0?$request->rfin:'99';
			$rechequeo=$request->rechequeo;
			$query="SELECT        Pacientes.NroHistoriaClinica, '' AS E, Servicios.Nombre AS Servicio, Pacientes.ApellidoPaterno + ' ' + Pacientes.ApellidoMaterno AS Paciente, 
					 ISNULL
						 ((SELECT        TOP (1) s.Nombre
							 FROM            MovimientosHistoriaClinica AS mhc INNER JOIN
													  Servicios AS s ON mhc.IdServicioDestino = s.IdServicio
							 WHERE        (mhc.IdPaciente = Citas.IdPaciente)
							 ORDER BY mhc.FechaMovimiento DESC), 'No Tuvo Movimiento') AS donde_esta,
					 (SELECT        TOP (1) cast(mhc2.FechaMovimiento as date)
							 FROM            MovimientosHistoriaClinica AS mhc2
							 WHERE        (mhc2.IdPaciente = Citas.IdPaciente)
							 ORDER BY mhc2.FechaMovimiento DESC) AS fecha_um, ArchivoRutaServicio.grupo
FROM            Citas INNER JOIN
					 ProgramacionMedica ON Citas.IdProgramacion = ProgramacionMedica.IdProgramacion INNER JOIN
					 Turnos ON ProgramacionMedica.IdTurno = Turnos.IdTurno INNER JOIN
					 Pacientes ON Citas.IdPaciente = Pacientes.IdPaciente INNER JOIN
					 Servicios ON Citas.IdServicio = Servicios.IdServicio INNER JOIN
					 Atenciones ON Citas.IdAtencion = Atenciones.IdAtencion INNER JOIN
					 ArchivoRutaServicio ON Servicios.IdServicio = ArchivoRutaServicio.IdServicio INNER JOIN
					 ArchivoRuta ON ArchivoRutaServicio.IdRuta = ArchivoRuta.IdRuta
WHERE        (Atenciones.idEstadoAtencion <> 0) AND (ArchivoRutaServicio.estado = 1) AND (ArchivoRuta.IdTipoTurnoRef = Turnos.IdTipoTurnoRef) AND (ArchivoRuta.estado = 1) AND (CONVERT(DATE,Citas.Fecha) = CONVERT(DATE,'$fecha')) AND (RIGHT(Pacientes.NroHistoriaClinica,2) BETWEEN $rini AND $rfin)";
if($turno!=0)
	$query=$query." AND (Turnos.IdTipoTurnoRef = $turno)";
if($rechequeo==1)
	$query=$query." AND ((SELECT        count(*)
FROM            MovimientosHistoriaClinica
WHERE        (IdMotivo = 1) AND (IdAtencion = Citas.IdAtencion)) = 0)";
//	$query=$query." ORDER BY ArchivoRutaServicio.grupo, RIGHT(Pacientes.NroHistoriaClinica, 2)";
$query=$query." union 
SELECT Pacientes.NroHistoriaClinica, '' AS E , Servicios.Nombre AS Servicio
, Pacientes.ApellidoPaterno + ' ' + Pacientes.ApellidoMaterno + ' ' + Pacientes.PrimerNombre AS Paciente, 
					 ISNULL
						 ((SELECT        TOP (1) s.Nombre
							 FROM            MovimientosHistoriaClinica AS mhc1 INNER JOIN
													  Servicios AS s ON mhc1.IdServicioDestino = s.IdServicio
							 WHERE        (mhc1.IdPaciente = mhc.IdPaciente)
							 ORDER BY mhc1.FechaMovimiento DESC), 'No Tuvo Movimiento') AS donde_esta,
					 (SELECT        TOP (1) cast(mhc3.FechaMovimiento as date)
							 FROM            MovimientosHistoriaClinica AS mhc3
							 WHERE        (mhc3.IdPaciente = mhc.IdPaciente)
							 ORDER BY mhc3.FechaMovimiento DESC) AS fecha_um, ArchivoRutaServicio.grupo
from HistoriasSolicitadas mhc
inner join 
Pacientes ON mhc.IdPaciente = Pacientes.IdPaciente inner join 
Servicios ON mhc.IdServicio = Servicios.IdServicio left JOIN
ArchivoRutaServicio ON Servicios.IdServicio = ArchivoRutaServicio.IdServicio left JOIN
ArchivoRuta ON ArchivoRutaServicio.IdRuta = ArchivoRuta.IdRuta
WHERE mhc.IdServicio  = (SELECT TOP 1 IdServicio from Servicios where nombre='SIS') and mhc.fecharequerida= CONVERT(DATE,'$fecha') AND (RIGHT(Pacientes.NroHistoriaClinica,2) BETWEEN $rini AND $rfin)";
			$query="select * from (".$query.") as Tabla order by grupo, RIGHT(NroHistoriaClinica, 2)";
			$citados=DB::select($query);
			$tabla_u='';
			if(count($citados)>0)
			{
				$tabla_u.='<table border="0" width="100%">
						<tr>
							<td rowspan="2"><img src="data:image/png;base64,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"></td>
							<td>Citados para el dia '.date('d/m/Y',strtotime($fecha)).' - Serie '.$rini.' hasta '.$rfin.'</td>
						</tr>
						<tr>
							<td>Turno '.($turno==0?"Todos":($turno==1?"Mañana":"Tarde")).($rechequeo==1?" - Rechequeo":" - Todos").'</td>
						</tr>
					</table>';
				$tabla_u.='<table border="1" width="100%" style="font-size:12px">
							<thead>
								<tr style="background-color:#FFFF00;color:#0000FF;">
								  <td width="5%" align="center">No</td>
								  <td width="10%" align="center">Historia</td>
								  <td width="3%" align="center">E</td>
								  <td width="28%" align="center">Servicio</td>
								  <td width="27%" align="center">Ult.Movimiento</td>
								  <td width="10%" align="center">Fe.Ul.Mo</td>
								  <td width="17%" align="center">Paciente</td>
								</tr>
							</thead><tbody>';
				foreach($citados as $i=>$fila_u)
				{
					$tabla_u.='<tr>
								  <th width="5%" align="center">'.($i+1).'</th>
								  <th width="10%" align="rigth">'.$fila_u->NroHistoriaClinica.'</th>
								  <th width="3%"></th>
								  <th width="28%">'.$fila_u->Servicio.'</th>
								  <th width="27%">'.$fila_u->donde_esta.'</th>
								  <th width="10%">'.date('d/m/Y',strtotime($fila_u->fecha_um)).'</th>
								  <th width="17%" style="font-size:10px">'.$fila_u->Paciente.'</th>
								</tr>';
				}
				$tabla_u.='</tbody></table>';
				if(strlen($tabla_u)>0)
					$resultado=true;
				else
					$mensaje='Nada que mostrar';
			}
			else
				$mensaje="Sin registros";
			if($resultado)
				return view("ArchivoClinico.ReporteCitados")
					->with('Tabla',$tabla_u);
			else
				return Redirect::back()->withErrors([$mensaje]);
		}
		else
			return view("ArchivoClinico.ReporteCitados");
	}
	public function ReporteHospitalizados(Request $request)
    {   
		$val=$request->oper=='grid'||$request->oper=='excel'?true:false;
		$conn =DB::connection()->getPdo();
		$grid = new jqGridRender($conn);
		$grid->SelectCommand = "select  a.IdCuentaAtencion [Cuenta], convert(date,FechaIngreso) as FechaIngreso,  P.ApellidoPaterno AS [Apellido Paterno], P.ApellidoMaterno AS [Apellido Materno], P.PrimerNombre AS [Primer Nombre], 
	p.NroHistoriaClinica , p.NroDocumento as DNI,s.Nombre Servicio, c.Codigo as CAMA
from atenciones a
inner join AtencionesEstanciaHospitalaria aeh on a.IdAtencion=aeh.IdAtencion
left join AtencionesDatosAdicionales ad on a.IdAtencion = ad.idAtencion
inner join pacientes p on a.IdPaciente = p.IdPaciente
left join Camas c on aeh.IdCama = c.IdCama
left join servicios s on aeh.IdServicio = s.IdServicio
where a.idEstadoAtencion !=0 and aeh.Secuencia = (select top 1 secuencia from AtencionesEstanciaHospitalaria ae where ae.IdAtencion = a.IdAtencion order by Secuencia desc)
and (FechaEgresoAdministrativo is null and HoraEgresoAdministrativo is null and FechaEgreso is null)
and a.IdTipoServicio in (3)
union
select  a.IdCuentaAtencion [Cuenta], convert(date,FechaIngreso) as FechaIngreso,  P.ApellidoPaterno AS [Apellido Paterno], P.ApellidoMaterno AS [Apellido Materno], P.PrimerNombre AS [Primer Nombre], 
	p.NroHistoriaClinica, p.NroDocumento as DNI,s.Nombre Servicio, c.Codigo as CAMA
from atenciones a
inner join AtencionesEstanciaHospitalaria aeh on a.IdAtencion=aeh.IdAtencion
left join AtencionesDatosAdicionales ad on a.IdAtencion = ad.idAtencion
inner join pacientes p on a.IdPaciente = p.IdPaciente
left join Camas c on aeh.IdCama = c.IdCama
left join servicios s on aeh.IdServicio = s.IdServicio
where a.idEstadoAtencion !=0 and aeh.Secuencia = (select top 1 secuencia from AtencionesEstanciaHospitalaria ae where ae.IdAtencion = a.IdAtencion order by Secuencia desc)
and (FechaEgreso is null and IdTipoAlta is null and FechaEgresoAdministrativo is null)
and a.IdTipoServicio in (3)";
		// set the ouput format to json
		$grid->dataType = 'json';
		$grid->setColModel();
		$grid->gSQLMaxRows=100000;
		// Set the url from where we obtain the data
		//$grid->setUrl('r_hospitalizados');
		$grid->setGridOptions(array(
			"caption"=>"Hospitalizados",
			"rowNum"=>20,
			"sortname"=>"FechaIngreso",
			"hoverrows"=>true,
			"autowidth"=>true,
			"rowList"=>array(10,20,50),
			"height"=>"auto",
			"sortorder"=>"desc"
		));
		// Enable filter toolbar searching
		$grid->toolbarfilter = true;
		// navigator first should be enabled
		$grid->navigator = true;
		$grid->setNavOptions('navigator', array("add"=>false,"edit"=>false,"del"=>false,"excel"=>true,"pdf"=>true,"view"=>false));
		$conn = null;
		// Enjoy
		if($val)
			$grid->renderGrid('#grid','#pager',true, null, null, true,true,$val);
		else
			return view("general_grid")
				->with('grid',$grid->renderGrid('#grid','#pager',true, null, null, true,true,$val))
				->with('titulo','Reporte Hospitalizados');
    }
}