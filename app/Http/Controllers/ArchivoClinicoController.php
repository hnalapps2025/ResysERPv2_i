<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use App\RS_ArchivoClinico;
use \PDO;
use rivcar\jqgrid\jqGridRender;
use rivcar\jqgrid\jqGridUtils;
use rivcar\jqGrid\DBdrivers\jqGridDB;
use rivcar\tcpdf\TCPDF;

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
				return Redirect::back()
					->withInput($request->except('NroHistoria','Observacion'))
					->with("mensaje","Historia Clinica ".$request->NroHistoria." con Destino a: ".$datos['Servicio']);
			else
			{
				return Redirect::back()
					->withInput($request->except('NroHistoria','Observacion'))
					->withErrors([$mensaje])
					->with("datos",$datos);
			}
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
		$filas=DB::select("SELECT DISTINCT SIGHAL_Especialidad.id_esp, SIGHAL_Especialidad.especialidad
FROM            v_rs_HistoriasNoDevueltas INNER JOIN
                         Servicios ON v_rs_HistoriasNoDevueltas.IdServicioDestino = Servicios.IdServicio INNER JOIN
                         SIGHAL_Especialidad_detalle ON Servicios.IdEspecialidad = SIGHAL_Especialidad_detalle.idEspecialidad INNER JOIN
                         SIGHAL_Especialidad ON SIGHAL_Especialidad_detalle.id_esp = SIGHAL_Especialidad.id_esp
ORDER BY SIGHAL_Especialidad.especialidad");
		$Especialidades['']="Seleccione Consultorio";
		foreach($filas as $fila)$Especialidades[$fila->id_esp]=$fila->especialidad;
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
						 Atenciones ON v_rs_HistoriasNoDevueltas.IdAtencion = Atenciones.IdAtencion INNER JOIN
                         SIGHAL_Especialidad_detalle ON Servicios.IdEspecialidad = SIGHAL_Especialidad_detalle.idEspecialidad
WHERE SIGHAL_Especialidad_detalle.id_esp=?
AND CAST(case ? when 1 then v_rs_HistoriasNoDevueltas.FechaMovimiento else Atenciones.FechaIngreso end AS date) BETWEEN ? AND ?
ORDER BY v_rs_HistoriasNoDevueltas.FechaMovimiento ASC", [$request->id_esp,$request->tipo_fecha,$request->FechaIni,$request->FechaFin]);
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
					->with('Especialidades',$Especialidades)
					->with("datos",$datos);
			}
			else
				return Redirect::back()->withErrors([$mensaje]);
		}
		else
		{			
			return view('ArchivoClinico.NoDevueltasXServicio')
				->with('Especialidades',$Especialidades);
		}
	}
	public function NoDevueltasXFechas(Request $request)
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
WHERE CAST(case ? when 1 then v_rs_HistoriasNoDevueltas.FechaMovimiento else Atenciones.FechaIngreso end AS date) between ? and ?
ORDER BY v_rs_HistoriasNoDevueltas.FechaMovimiento ASC", [$request->tipo_fecha,$request->FechaIni,$request->FechaFin]);
			if(count($filas)>0)
			{
				$datos=$filas;
				$resultado=true;
			}
			else
				$mensaje="No existen registros";
			if($resultado)
			{
				return view('ArchivoClinico.NoDevueltasXFechas')
					->with("datos",$datos);
			}
			else
				return Redirect::back()->withErrors([$mensaje]);
		}
		else
			return view('ArchivoClinico.NoDevueltasXFechas');
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
						 Pacientes.NroHistoriaClinica, Citas.Fecha as FechaCita
FROM            v_rs_HistoriasNoDevueltas INNER JOIN
                         Pacientes ON v_rs_HistoriasNoDevueltas.IdPaciente = Pacientes.IdPaciente INNER JOIN
                         Servicios ON v_rs_HistoriasNoDevueltas.IdServicioDestino = Servicios.IdServicio INNER JOIN
                         MotivosMovimientoHistoria ON v_rs_HistoriasNoDevueltas.IdMotivo = MotivosMovimientoHistoria.IdMotivo LEFT OUTER JOIN
                         Empleados ON v_rs_HistoriasNoDevueltas.IdEmpleadoRecepcion = Empleados.IdEmpleado LEFT OUTER JOIN
						 Citas ON v_rs_HistoriasNoDevueltas.IdAtencion = Citas.IdAtencion
WHERE CAST(case ? when 1 then v_rs_HistoriasNoDevueltas.FechaMovimiento else Citas.Fecha end AS date) between ? and ?
and RIGHT(Pacientes.NroHistoriaClinica, 2) between ? and ?
ORDER BY RIGHT(Pacientes.NroHistoriaClinica, 2) ASC, NroHistoriaClinica ASC", [$request->tipo_fecha,$request->FechaIni,$request->FechaFin,$request->SerieIni,$request->SerieFin]);
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
						 Pacientes.NroHistoriaClinica, Citas.Fecha as FechaCita
FROM            v_rs_HistoriasNoDevueltas INNER JOIN
                         Pacientes ON v_rs_HistoriasNoDevueltas.IdPaciente = Pacientes.IdPaciente INNER JOIN
                         Servicios ON v_rs_HistoriasNoDevueltas.IdServicioDestino = Servicios.IdServicio INNER JOIN
                         MotivosMovimientoHistoria ON v_rs_HistoriasNoDevueltas.IdMotivo = MotivosMovimientoHistoria.IdMotivo LEFT OUTER JOIN
                         Empleados ON v_rs_HistoriasNoDevueltas.IdEmpleadoRecepcion = Empleados.IdEmpleado LEFT OUTER JOIN
						 Citas ON v_rs_HistoriasNoDevueltas.IdAtencion = Citas.IdAtencion
WHERE CAST(case ? when 1 then v_rs_HistoriasNoDevueltas.FechaMovimiento else Citas.Fecha end AS date)=?
and v_rs_HistoriasNoDevueltas.IdServicioDestino in(select IdServicio from ArchivoRutaServicio where estado=1 and IdRuta=?)
ORDER BY RIGHT(Pacientes.NroHistoriaClinica, 2) ASC, NroHistoriaClinica ASC", [$request->tipo_fecha,$request->Fecha,$request->IdRuta]);
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
			$turno=$request->Turno;
			$rini=strlen($request->rini)>0?$request->rini:'00';
			$rfin=strlen($request->rfin)>0?$request->rfin:'99';
			$rechequeo=$request->rechequeo;
			$query="SELECT        Pacientes.NroHistoriaClinica, '' AS E, Servicios.Nombre AS Servicio, Pacientes.ApellidoPaterno AS Paciente, 
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
if($rechequeo=='on')
	$query=$query." AND ((SELECT        count(*)
FROM            MovimientosHistoriaClinica
WHERE        (IdMotivo = 1) AND (IdAtencion = Citas.IdAtencion)) = 0)";
//	$query=$query." ORDER BY ArchivoRutaServicio.grupo, RIGHT(Pacientes.NroHistoriaClinica, 2)";
$query=$query." union 
SELECT Pacientes.NroHistoriaClinica, '' AS E , Servicios.Nombre AS Servicio
, Pacientes.ApellidoPaterno AS Paciente, 
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
				if (!defined('K_PATH_IMAGES'))define('K_PATH_IMAGES', public_path('assets/img/') . DIRECTORY_SEPARATOR);
				$pdf = new TCPDF('P', 'mm', 'A4', true, 'UTF-8', false);
				$pdf->setPrintHeader(true);
				$pdf->setPrintFooter(false);
				$pdf->SetMargins(10, 10, 10);
				$pdf->SetHeaderData(
					'cabecera.png',
					80,            // ancho del logo
					'Citados para el dia '.date('d/m/Y',strtotime($fecha)).' - Serie '.$rini.' hasta '.$rfin,
					'Turno '.($turno==0?"Todos":($turno==1?"Mañana":"Tarde")).($rechequeo=='on'?" - Rechequeo":" - Todos")
				);
				$pdf->AddPage();
				$ancho=[
					8,  // No
					18,  // Historia
					7,  // Blanco
					60,  // Servicio
					60,  // Ult. Movimiento
					40   // Paciente
				];

				// Encabezado
				$pdf->SetFont('helvetica', 'B',8);
				$pdf->SetFillColor(255, 255, 0);
				$pdf->Cell($ancho[0], 7, 'No', 1, 0, 'C',true);
				$pdf->Cell($ancho[1], 7, 'Historia', 1, 0, 'C',true);
				$pdf->Cell($ancho[2], 7, 'E', 1, 0, 'C',true);
				$pdf->Cell($ancho[3], 7, 'Servicio', 1, 0, 'C',true);
				$pdf->Cell($ancho[4], 7, 'Ult. Movimiento', 1, 0, 'C',true);
				$pdf->Cell($ancho[5], 7, 'Paciente', 1, 1, 'C',true);

				// Datos
				$pdf->SetFont('helvetica', '',10);
				foreach ($citados as $i=>$fila) {
					$pdf->Cell($ancho[0], 6, $i+1, 1, 0, 'C');
					$pdf->Cell($ancho[1], 6, $fila->NroHistoriaClinica, 1, 0, 'R');
					$pdf->Cell($ancho[2], 6, '', 1, 0, 'L');
					$pdf->Cell($ancho[3], 6, $fila->Servicio, 1, 0, 'L', false, '', 1);
					$pdf->Cell($ancho[4], 6, $fila->donde_esta, 1, 0, 'L');
					$pdf->Cell($ancho[5], 6, $fila->Paciente, 1, 1, 'L');
				}
				$resultado=true;
			}
			else
				$mensaje="Sin registros";
			if($resultado)
			{
				return response($pdf->Output('documento.pdf', 'S'), 200)
					->header('Content-Type', 'application/pdf');
			}
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
		$grid->SelectCommand = "SELECT        IdCuentaAtencion as Cuenta, convert(date,FechaIngreso) as FechaIngreso, ApellidoPaterno, ApellidoMaterno, PrimerNombre, NroHistoriaClinica, NroDocumento, Servicio, Cama, EstadoHistoria
FROM            v_rs_hositalizados";
		// set the ouput format to json
		$grid->dataType = 'json';
		$grid->setColModel();
		$grid->gSQLMaxRows=100000;
		$grid->setSelect('EstadoHistoria',[0=>'Pendiente',1=>'Entregado'],true,true, true,array(""=>"Todos"));
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
		$grid->setColProperty('EstadoHistoria', array(
    'formatter' => 'js:function(cellvalue, options, rowObject) {
        if (cellvalue == 1) {
            return "<span style=\"background:#28a745;color:#fff;padding:3px 8px;border-radius:4px;\">Entregado</span>";
        }
        return "<span style=\"background:#dc3545;color:#fff;padding:3px 8px;border-radius:4px;\">Pendiente</span>";
    }'
));
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
	public function MantenimientoRutas(Request $request)
    {   
		$val=$request->oper=='grid'||$request->oper=='excel'?true:false;
		$conn =DB::connection()->getPdo();
		$grid = new jqGridRender($conn);
		$grid->SelectCommand = "SELECT        IdServicio, Nombre, ISNULL
                             ((SELECT        COUNT(ArchivoRutaServicio.IdRuta)
                                 FROM            ArchivoRutaServicio INNER JOIN
                                                          ArchivoRuta ON ArchivoRutaServicio.IdRuta = ArchivoRuta.IdRuta
                                 WHERE        (ArchivoRutaServicio.estado = 1) AND (ArchivoRutaServicio.IdServicio = Servicios.IdServicio) AND (ArchivoRuta.estado = 1) AND (ArchivoRuta.IdTipoTurnoRef = 1)), 0) AS ruta_m, ISNULL
                             ((SELECT        COUNT(ArchivoRutaServicio.IdRuta)
                                 FROM            ArchivoRutaServicio INNER JOIN
                                                          ArchivoRuta ON ArchivoRutaServicio.IdRuta = ArchivoRuta.IdRuta
                                 WHERE        (ArchivoRutaServicio.estado = 1) AND (ArchivoRutaServicio.IdServicio = Servicios.IdServicio) AND (ArchivoRuta.estado = 1) AND (ArchivoRuta.IdTipoTurnoRef = 2)), 0) AS ruta_t
FROM            Servicios
WHERE        (idEstado = 1)";
		// set the ouput format to json
		$grid->dataType = 'json';
		$grid->setColModel();
		$grid->gSQLMaxRows=100000;
		// Set the url from where we obtain the data
		//$grid->setUrl('r_hospitalizados');
		$grid->setGridOptions(array(
			"caption"=>"Servicios - Rutas",
			"rowNum"=>20,
			"sortname"=>"IdServicio",
			"hoverrows"=>true,
			"autowidth"=>true,
			"rowList"=>array(10,20,50),
			"height"=>"auto",
			"sortorder"=>"asc"
		));
		$token = csrf_token();
		$grid->addCol(array(
			"name"=>"_token",
			"label"=>"_token",
			"hidden"=>true,
			"formatter"=>"js:function(cellvalue, options, rowObject) { return '$token'; }"
		));
		// Enable filter toolbar searching
		$grid->toolbarfilter = true;
		$grid->setSubGridGrid("MantenimientoRutasServicios",["_token"]);
		// navigator first should be enabled
		$grid->navigator = true;
		$grid->setNavOptions('navigator', array("pdf"=>true,"excel"=>true,"add"=>false,"edit"=>false,"del"=>false,"view"=>false, "search"=>false));
		$conn = null;
		// Enjoy
		if($val)
			$grid->renderGrid('#grid','#pager',true, null, null, true,true,$val);
		else
			return view("general_grid")
				->with('grid',$grid->renderGrid('#grid','#pager',true, null, null, true,true,$val))
				->with('titulo','Servicios - Rutas');
    }
	public function MantenimientoRutasServicios(Request $request)
    {   
		$val=$request->oper=='grid'||$request->oper=='excel'?true:false;
		$rowid = jqGridUtils::Strip($request->rowid);
		$conn =DB::connection()->getPdo();
		$grid = new jqGridRender($conn);
		$grid->SelectCommand = "SELECT        ArchivoRutaServicio.IdRutaServicio, ArchivoRutaServicio.IdRuta, ArchivoRutaServicio.IdServicio, ArchivoRutaServicio.grupo, ArchivoRutaServicio.estado
FROM            ArchivoRutaServicio INNER JOIN
                         ArchivoRuta ON ArchivoRutaServicio.IdRuta = ArchivoRuta.IdRuta
WHERE        (ArchivoRutaServicio.IdServicio =?) AND (ArchivoRuta.estado = 1)";
		$grid->table='ArchivoRutaServicio';
		$grid->setPrimaryKeyId("IdRutaServicio");
		// set the ouput format to json
		$grid->dataType = 'json';
		$grid->setColModel(null,array(&$rowid));
		$grid->gSQLMaxRows=100000;
		// Set the url from where we obtain the data
		$grid->setUrl('MantenimientoRutasServicios');
		$grid->setSelect('IdRuta',"SELECT IdRuta, Nombre FROM ArchivoRuta",true,true, true,array(""=>"Todos"));
		$grid->setSelect('estado',array(1=>"Activo",2=>"Inactivo"),true,true, true,array(""=>"Todos"));
		$grid->setGridOptions(array(
			"caption"=>"Servicios - Rutas",
			"rowNum"=>20,
			"sortname"=>"IdServicio",
			"hoverrows"=>true,
			"autowidth"=>true,
			"rowList"=>array(10,20,50),
			"height"=>"auto",
			"sortorder"=>"asc",
			"postData"=>array(
				"rowid"=>$rowid
			)
		));
		$grid->toolbarfilter = true;
		$token = csrf_token();
		$grid->addCol(array(
			"name"=>"_token",
			"label"=>"_token",
			"hidden"=>true,
			"formatter"=>"js:function(cellvalue, options, rowObject) { return '$token'; }",
			"editoptions" => array(
				"defaultValue" => $token
			)
		));
		$grid->setColProperty("IdServicio",array("hidden"=>true,"editoptions"=>array("defaultValue"=>$rowid)));
		$grid->setColProperty("IdRutaServicio",array("hidden"=>true));
		$grid->setColProperty("IdRuta",array("editrules"=>array("required"=>true)));
		$grid->setColProperty("grupo",array("label"=>"Grupo","editrules"=>array("required"=>true)));
		$grid->setColProperty("estado",array("label"=>"Estado","editrules"=>array("required"=>true)));
		$grid->navigator = true;
		$grid->setNavOptions('navigator', array("excel"=>false,"add"=>true,"edit"=>true,"del"=>false,"view"=>false));
		$conn = null;
		// Enjoy
		if($val)
			$grid->renderGrid("#grid".$rowid,"#pager".$rowid, true, null, array(&$rowid), true,true);
		else
			return $grid->renderGrid("#grid".$rowid,"#pager".$rowid, true, null, array(&$rowid), true,true);
    }
	public function Rutas(Request $request)
    {   
		$val=$request->oper=='grid'||$request->oper=='excel'?true:false;
		$conn =DB::connection()->getPdo();
		$grid = new jqGridRender($conn);
		$grid->SelectCommand ="SELECT * FROM ArchivoRuta";
		$grid->table='ArchivoRuta';
		$grid->setPrimaryKeyId("IdRuta");
		$grid->serialKey =true;
		// set the ouput format to json
		$grid->dataType = 'json';
		$grid->setColModel();
		$grid->gSQLMaxRows=100000;
		// Set the url from where we obtain the data
		$grid->setUrl('Rutas');
		$grid->setSelect('IdTipoTurnoRef',array("1"=>"Mañana","2"=>"Tarde"),true,true, true,array(""=>"Todos"));
		$grid->setSelect('estado',array("1"=>"Activo","2"=>"Inactivo"),true,true, true,array(""=>"Todos"));
		$grid->setGridOptions(array(
			"caption"=>"Rutas",
			"rowNum"=>20,
			"sortname"=>"IdRuta",
			"hoverrows"=>true,
			"autowidth"=>true,
			"rowList"=>array(10,20,50),
			"height"=>"auto",
			"sortorder"=>"asc"
		));
		$token = csrf_token();
		$grid->addCol(array(
			"name"=>"_token",
			"label"=>"_token",
			"hidden"=>true,
			"formatter"=>"js:function(cellvalue, options, rowObject) { return '$token'; }"
		));
		// Enable filter toolbar searching
		$grid->toolbarfilter = true;
		$grid->setSubGridGrid("RutasConserje",["_token"]);
		// navigator first should be enabled
		$grid->navigator = true;
		$dobleclick= <<<DC
function(rowid,iRow,iCol,e)
{
   window.location="mant_ruta.php?IdRuta="+rowid+"&tipo_mant=2";
}
DC;
$grid->setGridEvent('ondblClickRow',$dobleclick);
$grid->setColProperty('IdRuta',array("label"=>"Codigo","editable"=>false));
$grid->setColProperty('IdTipoTurnoRef',array("label"=>"Turno"));
		$grid->setNavOptions('navigator', array("pdf"=>true,"excel"=>true,"add"=>true,"edit"=>true,"del"=>false,"view"=>false, "search"=>false));
		$conn = null;
		// Enjoy
		if($val)
			$grid->renderGrid('#grid','#pager',true, null, null, true,true,$val);
		else
			return view("general_grid")
				->with('grid',$grid->renderGrid('#grid','#pager',true, null, null, true,true,$val))
				->with('titulo','Rutas');
    }
	public function RutasConserje(Request $request)
    {   
		$val=$request->oper=='grid'||$request->oper=='excel'?true:false;
		$rowid = jqGridUtils::Strip($request->rowid);
		$conn =DB::connection()->getPdo();
		$grid = new jqGridRender($conn);
		$grid->SelectCommand = "SELECT IdRutaConserje, IdRuta, IdEmpleado, estado
		FROM ArchivoRutaConserje
		WHERE IdRuta= ?";
		$grid->table='ArchivoRutaConserje';
		$grid->setPrimaryKeyId("IdRutaConserje");
		// set the ouput format to json
		$grid->dataType = 'json';
		$grid->setColModel(null,array(&$rowid));
		$grid->gSQLMaxRows=100000;
		// Set the url from where we obtain the data
		$grid->setUrl('RutasConserje');
		$grid->setSelect('IdEmpleado',"SELECT distinct Empleados.IdEmpleado, ApellidoPaterno + ' ' + ApellidoMaterno + ' ' + Nombres AS Empleado
FROM Empleados
inner join UsuariosRoles on Empleados.IdEmpleado = UsuariosRoles.IdEmpleado
where UsuariosRoles.IdRol in (62,87,171,180,181,199,203,208,216,229,269)
and Empleados.esActivo=1
ORDER BY Empleado",true,true, true,array(""=>"Todos"));
$grid->setSelect('estado',array("1"=>"Activo","2"=>"Inactivo"),true,true, true,array(""=>"Todos"));
		$grid->setGridOptions(array(
			"caption"=>"Ruta Conserje",
			"rowNum"=>20,
			"sortname"=>"IdRutaConserje",
			"hoverrows"=>true,
			"autowidth"=>true,
			"rowList"=>array(10,20,50),
			"height"=>"auto",
			"sortorder"=>"asc",
			"postData"=>array(
				"rowid"=>$rowid
			)
		));
		$token = csrf_token();
		$grid->addCol(array(
			"name"=>"_token",
			"label"=>"_token",
			"hidden"=>true,
			"formatter"=>"js:function(cellvalue, options, rowObject) { return '$token'; }",
			"editoptions" => array(
				"defaultValue" => $token
			)
		));
		$grid->setColProperty('IdRutaConserje',array("hidden"=>true));
$grid->setColProperty('IdRuta',array("hidden"=>true,"editoptions"=>array("defaultValue"=>$rowid)));
$grid->setColProperty('IdEmpleado',array("label"=>"Empleado","editrules"=>array("required"=>true)));
$grid->setColProperty('estado',array("label"=>"Estado","editrules"=>array("required"=>true)));
		$grid->navigator = true;
		$grid->setNavOptions('navigator', array("excel"=>false,"add"=>true,"edit"=>true,"del"=>false,"view"=>false));
		$conn = null;
		// Enjoy
		if($val)
			$grid->renderGrid("#grid".$rowid,"#pager".$rowid, true, null, array(&$rowid), true,true);
		else
			return $grid->renderGrid("#grid".$rowid,"#pager".$rowid, true, null, array(&$rowid), true,true);
    }
	public function ReporteConserjeriaUbicados(Request $request)
	{
		if($request->method()=='POST')
		{
			$resultado=false;
			$mensaje=null;
			$datos=null;
			$query="SELECT        ArchivoRutaServicio.grupo, COUNT(Citas.IdCita) AS contador
FROM            Citas INNER JOIN
                         Servicios ON Servicios.IdServicio = Citas.IdServicio INNER JOIN
						 ArchivoRutaServicio ON ArchivoRutaServicio.IdServicio = Servicios.IdServicio INNER JOIN
						 ArchivoRuta ON ArchivoRutaServicio.IdRuta = ArchivoRuta.IdRuta INNER JOIN
                         Atenciones ON Citas.IdAtencion = Atenciones.IdAtencion INNER JOIN
                         ProgramacionMedica ON Citas.IdProgramacion = ProgramacionMedica.IdProgramacion INNER JOIN
                         Turnos ON ProgramacionMedica.IdTurno = Turnos.IdTurno
WHERE        (ArchivoRutaServicio.estado = 1) AND (ArchivoRuta.estado = 1) AND (Atenciones.idEstadoAtencion <> 0) AND (CONVERT(DATE, Citas.Fecha) = CONVERT(DATE,?))";
			$parametros[]=$request->fecha;
			if($request->turno!=0)
			{
				$query=$query." AND (Turnos.IdTipoTurnoRef =?)";
				$parametros[]=$request->turno;
				if($request->ruta!=0)
				{
					$query=$query." AND (ArchivoRutaServicio.IdRuta =?)";
					$parametros[]=$request->ruta;
					if($request->especialidad!=0)
					{
						$query=$query." AND (Servicios.IdEspecialidad =?)";
						$parametros[]=$request->especialidad;
						if($request->servicio!=0)
						{
							$query=$query." AND (ArchivoRutaServicio.IdServicio =?)";
							$parametros[]=$request->servicio;
						}
					}
				}
			}
			$query=$query." GROUP BY ArchivoRutaServicio.grupo ORDER BY ArchivoRutaServicio.grupo";
			$filas=DB::select($query,$parametros);
			if(count($filas)>0)
			{
				$n_ruta=$request->n_ruta;
				$fecha = date('d/m/Y', strtotime($request->fecha));
				$turno=$request->turno;
				$pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);
				$pdf->setHeaderMargin(15);
				$pdf->setFooterMargin(6);
				$pdf->SetMargins(5,26,5,true);
				$pdf->SetHeaderData("logo.gif",90,"Citados de ".$n_ruta." Para el dia ".$fecha,"Turno ".($turno==0?"Todos":($turno==1?"Mañana":"Tarde")." - REPORTE: CONSERJE"));
				foreach($filas as $row)
				{
					$pdf->AddPage();
					$tabla_u='';
					$grupo=$row->grupo;
					$query = "SELECT        Pacientes.NroHistoriaClinica, Pacientes.ApellidoPaterno + ' ' + Pacientes.ApellidoMaterno + ' ' + Pacientes.PrimerNombre AS Paciente, Servicios.Nombre AS Servicio, 
							 Empleados.ApellidoPaterno + ' ' + Empleados.ApellidoMaterno + ' ' + Empleados.Nombres AS Solicitante
	FROM            Citas INNER JOIN
							 Pacientes ON Citas.IdPaciente = Pacientes.IdPaciente INNER JOIN
							 Servicios ON Servicios.IdServicio = Citas.IdServicio INNER JOIN
							 ArchivoRutaServicio ON ArchivoRutaServicio.IdServicio = Servicios.IdServicio INNER JOIN
							 ArchivoRuta ON ArchivoRutaServicio.IdRuta = ArchivoRuta.IdRuta INNER JOIN
							 Atenciones ON Citas.IdAtencion = Atenciones.IdAtencion INNER JOIN
							 MovimientosHistoriaClinica ON Atenciones.IdAtencion = MovimientosHistoriaClinica.IdAtencion INNER JOIN
							 Empleados ON MovimientosHistoriaClinica.IdEmpleadoRecepcion = Empleados.IdEmpleado INNER JOIN
							 ProgramacionMedica ON Citas.IdProgramacion = ProgramacionMedica.IdProgramacion INNER JOIN
							 Turnos ON ProgramacionMedica.IdTurno = Turnos.IdTurno
	WHERE        (MovimientosHistoriaClinica.IdMotivo = 1) AND (Atenciones.idEstadoAtencion <> 0) AND (ArchivoRutaServicio.grupo =?) AND (CONVERT(DATE, Citas.Fecha) = CONVERT(DATE,?)) AND (Turnos.IdTipoTurnoRef = ArchivoRuta.IdTipoTurnoRef)";
					$parametros=[$grupo,$request->fecha];
					if($request->turno!=0)
					{
						$query=$query." AND (Turnos.IdTipoTurnoRef =?)";
						$parametros[]=$request->turno;
						if($request->ruta!=0)
						{
							$query=$query." AND (ArchivoRutaServicio.IdRuta =?)";
							$parametros[]=$request->ruta;
							if($request->especialidad!=0)
							{
								$query=$query." AND (Servicios.IdEspecialidad =?)";
								$parametros[]=$request->especialidad;
								if($request->servicio!=0)
								{
									$query=$query." AND (ArchivoRutaServicio.IdServicio =?)";
									$parametros[]=$request->servicio;
								}
							}
						}
					}
					$query=$query." ORDER BY RIGHT(Pacientes.NroHistoriaClinica, 2)";
					$ubicados=DB::select($query,$parametros);
					if(count($ubicados)>0)
					{
						$ubicados = json_decode(json_encode($ubicados), true);
						$tabla_u='<h4>Especialidad: '.$grupo.' - Ubicados</h4><table border="1" width="100%" style="font-size:10px">
						<thead>
							<tr style="background-color:#FFFF00;color:#0000FF;">
							  <td width="4%" align="center">N°</td>
							  <td width="9%" align="center">Historia</td>
							  <td width="3%" align="center">E</td>
							  <td width="3%" align="center">D</td>
							  <td width="40%" align="center">Paciente</td>
							  <td width="41%" align="center">Consultorio / Medico</td>
							</tr>
						</thead>';
						$i=1;
						foreach($ubicados as $fila_u)
						{
							$tabla_u.='<tr>
							  <th width="4%" align="center">'.$i.'</th>
							  <th width="9%" align="rigth">'.$fila_u['NroHistoriaClinica'].'</th>
							  <th width="3%"></th>
							  <th width="3%"></th>
							  <th width="40%">'.substr($fila_u['Paciente'],0,34).'</th>
							  <th width="41%">'.substr($fila_u['Servicio'].' / '.$fila_u['Solicitante'],0,37).'</th>
							</tr>';
							$i++;
						}
						$tabla_u.='</table>';
					}
					$query = "SELECT        Pacientes.NroHistoriaClinica, Pacientes.ApellidoPaterno + ' ' + Pacientes.ApellidoMaterno + ' ' + Pacientes.PrimerNombre AS Paciente, Servicios.Nombre AS Servicio, ISNULL
								 ((SELECT        TOP (1) s.Nombre
									 FROM            MovimientosHistoriaClinica AS mhc INNER JOIN
															  Servicios AS s ON mhc.IdServicioDestino = s.IdServicio
									 WHERE        (mhc.IdPaciente = Citas.IdPaciente)
									 ORDER BY mhc.FechaMovimiento DESC), 'Archivo Clinico') AS donde_esta
	FROM            Citas INNER JOIN
							 Pacientes ON Citas.IdPaciente = Pacientes.IdPaciente INNER JOIN
							 Servicios ON Servicios.IdServicio = Citas.IdServicio INNER JOIN
							 ArchivoRutaServicio ON ArchivoRutaServicio.IdServicio = Servicios.IdServicio INNER JOIN
							 ArchivoRuta ON ArchivoRutaServicio.IdRuta = ArchivoRuta.IdRuta INNER JOIN
							 Atenciones ON Citas.IdAtencion = Atenciones.IdAtencion INNER JOIN
							 ProgramacionMedica ON Citas.IdProgramacion = ProgramacionMedica.IdProgramacion INNER JOIN
							 Turnos ON ProgramacionMedica.IdTurno = Turnos.IdTurno
	WHERE        (Atenciones.idEstadoAtencion <> 0) AND (ArchivoRutaServicio.grupo =?) AND (CONVERT(DATE, Citas.Fecha) = CONVERT(DATE,?)) AND
								 ((SELECT        COUNT(IdMovimiento)
									 FROM            MovimientosHistoriaClinica
									 WHERE        (IdAtencion = Atenciones.IdAtencion)) = 0)  AND (Turnos.IdTipoTurnoRef = ArchivoRuta.IdTipoTurnoRef)";
					$parametros=[$grupo,$request->fecha];
					if($request->turno!=0)
					{
						$query=$query." AND (Turnos.IdTipoTurnoRef =?)";
						$parametros[]=$request->turno;
						if($request->ruta!=0)
						{
							$query=$query." AND (ArchivoRutaServicio.IdRuta =?)";
							$parametros[]=$request->ruta;
							if($request->especialidad!=0)
							{
								$query=$query." AND (Servicios.IdEspecialidad =?)";
								$parametros[]=$request->especialidad;
								if($request->servicio!=0)
								{
									$query=$query." AND (ArchivoRutaServicio.IdServicio =?)";
									$parametros[]=$request->servicio;
								}
							}
						}
					}
					$query=$query." ORDER BY RIGHT(Pacientes.NroHistoriaClinica, 2)";
					$ubicados=DB::select($query,$parametros);
					if(count($ubicados)>0)
					{
						$ubicados = json_decode(json_encode($ubicados), true);
						$tabla_u.='<h4>Especialidad: '.$grupo.' - Pendientes</h4><table border="1" width="100%" style="font-size:10px">
						<thead>
							<tr style="background-color:#FFFF00;color:#0000FF;">
							  <td width="4%" align="center">N°</td>
							  <td width="8%" align="center">Historia</td>
							  <td width="3%" align="center">E</td>
							  <td width="3%" align="center">D</td>
							  <td width="27%" align="center">Paciente</td>
							  <td width="27%" align="center">Consultorio</td>
							  <td width="28%" align="center">Ult.Movimiento</td>
							</tr>
						</thead>';
						$i=1;
						foreach($ubicados as $fila_u)
						{
							$tabla_u.='<tr>
							  <th width="4%" align="center">'.$i.'</th>
							  <th width="8%" align="rigth">'.$fila_u['NroHistoriaClinica'].'</th>
							  <th width="3%"></th>
							  <th width="3%"></th>
							  <th width="27%">'.substr($fila_u['Paciente'],0,22).'</th>
							  <th width="27%">'.substr($fila_u['Servicio'],0,22).'</th>
							  <th width="28%">'.substr($fila_u['donde_esta'],0,23).'</th>
							</tr>';
							$i++;
						}
						$tabla_u.='</table>';
					}
					$pdf->writeHTML($tabla_u,true,false,false,false,'');				
				}
				$resultado=true;
			}
			else
				$mensaje="No hay registros";
			if($resultado)
			{
				$pdf->Output('example_011.pdf', 'I');
			}
			else
				return Redirect::back()->withErrors([$mensaje]);
		}
		else
		{
			$ListaTurnos = DB::table('ArchivoRuta')
				->where('estado',1)
				->orderBy('IdTipoTurnoRef')
				->orderBy('Nombre')
				->get(['IdTipoTurnoRef','IdRuta','Nombre']);
			$ListaRutas = $ListaTurnos->pluck('Nombre','IdRuta')->prepend('Todos', 0);
			$ListaEspecialidadesBD = DB::table('ArchivoRutaServicio')
				->join('Servicios', 'ArchivoRutaServicio.IdServicio', '=', 'Servicios.IdServicio')
				->join('Especialidades', 'Servicios.IdEspecialidad', '=', 'Especialidades.IdEspecialidad')
				->select(
					'ArchivoRutaServicio.IdRuta',
					'Especialidades.IdEspecialidad',
					'Especialidades.Nombre'
				)
				->distinct()
				->get();
			$ListaEspecialidades = $ListaEspecialidadesBD
				->pluck('Nombre', 'IdEspecialidad')
				->prepend('Todos', 0);
			$ListaServiciosBD = DB::table('Servicios')
				->where('idEstado',1)
				->select(
					'IdEspecialidad',
					'IdServicio',
					'Nombre'
				)
				->get();
			$ListaServicios = $ListaServiciosBD
				->pluck('Nombre', 'IdServicio')
				->prepend('Todos', 0);
			return view('ArchivoClinico.ReporteConserjeriaUbicados', compact(
				'ListaTurnos',
				'ListaRutas',
				'ListaEspecialidadesBD',
				'ListaEspecialidades',
				'ListaServiciosBD',
				'ListaServicios'
			));
		}
	}
	
	public function ReporteConserjeriaConsultorio(Request $request)
	{
		if($request->method()=='POST')
		{
			$resultado=false;
			$mensaje=null;
			$datos=null;
			$query = "SELECT        ArchivoRutaServicio.grupo, COUNT(Citas.IdCita) AS contador
FROM            Citas INNER JOIN
                         Servicios ON Servicios.IdServicio = Citas.IdServicio INNER JOIN
						 ArchivoRutaServicio ON ArchivoRutaServicio.IdServicio = Servicios.IdServicio INNER JOIN
						 ArchivoRuta ON ArchivoRutaServicio.IdRuta = ArchivoRuta.IdRuta INNER JOIN
                         Atenciones ON Citas.IdAtencion = Atenciones.IdAtencion INNER JOIN
                         ProgramacionMedica ON Citas.IdProgramacion = ProgramacionMedica.IdProgramacion INNER JOIN
                         Turnos ON ProgramacionMedica.IdTurno = Turnos.IdTurno
WHERE        (ArchivoRutaServicio.estado = 1) AND (ArchivoRuta.estado = 1) AND (Atenciones.idEstadoAtencion <> 0) AND (CONVERT(DATE, Citas.Fecha) = CONVERT(DATE,?))";
			$parametros[]=$request->fecha;
			if($request->turno!=0)
			{
				$query=$query." AND (Turnos.IdTipoTurnoRef =?)";
				$parametros[]=$request->turno;
				if($request->ruta!=0)
				{
					$query=$query." AND (ArchivoRutaServicio.IdRuta =?)";
					$parametros[]=$request->ruta;
					if($request->especialidad!=0)
					{
						$query=$query." AND (Servicios.IdEspecialidad =?)";
						$parametros[]=$request->especialidad;
						if($request->servicio!=0)
						{
							$query=$query." AND (ArchivoRutaServicio.IdServicio =?)";
							$parametros[]=$request->servicio;
						}
					}
				}
			}
			$query=$query." GROUP BY ArchivoRutaServicio.grupo ORDER BY ArchivoRutaServicio.grupo";
			$filas=DB::select($query,$parametros);			
			if(count($filas)>0)
			{
				$n_ruta=$request->n_ruta;
				$fecha = date('d/m/Y', strtotime($request->fecha));
				$turno=$request->turno;
				$pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);
				$pdf->setHeaderMargin(15);
				$pdf->setFooterMargin(6);
				$pdf->SetMargins(5,26,5, true);
				$pdf->SetHeaderData("logo.gif",90,"Citados de ".$n_ruta." Para el dia ".$fecha,"Turno ".($turno==0?"Todos":($turno==1?"Mañana":"Tarde")." - REPORTE: CONSULTORIO"));
				foreach($filas as $row)
				{
					$tabla_u='';
					$pdf->AddPage();				
					$grupo=$row->grupo;
					$tabla_u.='<h4>Especialidad: '.$grupo.'</h4>';
					$query = "SELECT DISTINCT Servicios.IdServicio, Servicios.Nombre AS Servicio, Citas.IdMedico, Empleados.ApellidoPaterno + ' ' + Empleados.ApellidoMaterno + ' ' + Empleados.Nombres AS Medico
	FROM            Citas INNER JOIN
							 Pacientes ON Citas.IdPaciente = Pacientes.IdPaciente INNER JOIN
							 Servicios ON Servicios.IdServicio = Citas.IdServicio INNER JOIN
							 ArchivoRutaServicio ON ArchivoRutaServicio.IdServicio = Servicios.IdServicio INNER JOIN
							 ArchivoRuta ON ArchivoRutaServicio.IdRuta = ArchivoRuta.IdRuta INNER JOIN
							 Atenciones ON Citas.IdAtencion = Atenciones.IdAtencion INNER JOIN
							 FuentesFinanciamiento ON FuentesFinanciamiento.IdFuenteFinanciamiento = Atenciones.idFuenteFinanciamiento INNER JOIN
							 Medicos ON Citas.IdMedico = Medicos.IdMedico INNER JOIN
							 Empleados ON Medicos.IdEmpleado = Empleados.IdEmpleado INNER JOIN
							 ProgramacionMedica ON Citas.IdProgramacion = ProgramacionMedica.IdProgramacion INNER JOIN
							 Turnos ON ProgramacionMedica.IdTurno = Turnos.IdTurno
	WHERE        (Atenciones.idEstadoAtencion <> 0) AND (ArchivoRuta.estado=1) AND (ArchivoRutaServicio.estado=1) AND (ArchivoRutaServicio.grupo =?) AND (CONVERT(DATE, Citas.Fecha) = CONVERT(DATE,?))";
					$parametros=[$grupo,$request->fecha];
					if($request->turno!=0)
					{
						$query=$query." AND (Turnos.IdTipoTurnoRef =?)";
						$parametros[]=$request->turno;
						if($request->ruta!=0)
						{
							$query=$query." AND (ArchivoRutaServicio.IdRuta =?)";
							$parametros[]=$request->ruta;
							if($request->especialidad!=0)
							{
								$query=$query." AND (Servicios.IdEspecialidad =?)";
								$parametros[]=$request->especialidad;
								if($request->servicio!=0)
								{
									$query=$query." AND (ArchivoRutaServicio.IdServicio =?)";
									$parametros[]=$request->servicio;
								}
							}
						}
					}
					$query=$query." ORDER BY Servicio";
					$l_consultorios=json_decode(json_encode(DB::select($query,$parametros)), true);
					foreach($l_consultorios as $consultorio)
					{
						$IdMedico=$consultorio['IdMedico'];
						$IdServicio=$consultorio['IdServicio'];
						$query = "SELECT        Citas.HoraInicio, case (SELECT        COUNT(IdMovimiento)
								 FROM            MovimientosHistoriaClinica
								 WHERE        (IdAtencion = Atenciones.IdAtencion)) when 0 then 'Pe' else 'Ubi' end as est, Pacientes.NroHistoriaClinica, Pacientes.ApellidoPaterno + ' ' + Pacientes.ApellidoMaterno + ' ' + Pacientes.PrimerNombre AS Paciente, CASE isnull(Citas.EsCitaAdicional, 0) 
						 WHEN 0 THEN 'Citado' ELSE 'Adicional' END AS cupo, FuentesFinanciamiento.Descripcion AS financia, ISNULL
							 ((SELECT        TOP (1) Servicios.Nombre
								 FROM            MovimientosHistoriaClinica INNER JOIN
														  Servicios ON MovimientosHistoriaClinica.IdServicioDestino = Servicios.IdServicio
								 WHERE        (MovimientosHistoriaClinica.IdPaciente = Citas.IdPaciente)
								 ORDER BY MovimientosHistoriaClinica.FechaMovimiento DESC), 'Archivo Clinico') AS UltMovimiento
FROM            Citas INNER JOIN
						 Pacientes ON Citas.IdPaciente = Pacientes.IdPaciente INNER JOIN
						 Servicios ON Servicios.IdServicio = Citas.IdServicio INNER JOIN
						 ArchivoRutaServicio ON ArchivoRutaServicio.IdServicio = Servicios.IdServicio INNER JOIN
						 ArchivoRuta ON ArchivoRutaServicio.IdRuta = ArchivoRuta.IdRuta INNER JOIN
						 Atenciones ON Citas.IdAtencion = Atenciones.IdAtencion INNER JOIN
						 FuentesFinanciamiento ON FuentesFinanciamiento.IdFuenteFinanciamiento = Atenciones.idFuenteFinanciamiento INNER JOIN
						 ProgramacionMedica ON Citas.IdProgramacion = ProgramacionMedica.IdProgramacion INNER JOIN
						 Turnos ON ProgramacionMedica.IdTurno = Turnos.IdTurno
WHERE        (Atenciones.idEstadoAtencion <> 0) AND (ArchivoRuta.estado=1) AND (ArchivoRutaServicio.estado=1) AND (ArchivoRuta.IdTipoTurnoRef = Turnos.IdTipoTurnoRef) AND (ArchivoRutaServicio.grupo =?) AND (CONVERT(DATE, Citas.Fecha) = CONVERT(DATE,?)) AND (Citas.IdMedico =?)";
						$parametros=[$grupo,$fecha,$IdMedico];
						if($request->turno!=0)
						{
							$query=$query." AND (Turnos.IdTipoTurnoRef =?)";
							$parametros[]=$request->turno;
						}
						$query=$query." ORDER BY HoraInicio";
						$l_pacientes=json_decode(json_encode(DB::select($query,$parametros)), true);
						$tabla_u.="<h5>Medico: ".$consultorio['Medico']." - ".$consultorio['Servicio']."</h5>";
						$tabla_u.='<table border="1" width="100%" style="font-size:9px">
						<thead>
							<tr style="background-color:#FFFF00;color:#0000FF;">
							  <td width="3.5%" align="center">N°</td>
							  <td width="5.5%" align="center">Hora</td>
							  <td width="4%" align="center">Est</td>
							  <td width="7.5%" align="center">Historia</td>
							  <td width="2.5%" align="center">E</td>
							  <td width="2.5%" align="center">D</td>
							  <td width="33%" align="center">Paciente</td>
							  <td width="7.5%" align="center">Cupo</td>
							  <td width="9%" align="center">Financia</td>
							  <td width="25%" align="center">Ult.Movimiento</td>
							</tr>
						</thead>';
						$i=1;
						foreach($l_pacientes as $paciente)
						{
							$tabla_u.='<tr>
								  <td width="3.5%" align="center">'.$i.'</td>
								  <td width="5.5%" align="center">'.$paciente['HoraInicio'].'</td>
								  <td width="4%" align="center">'.$paciente['est'].'</td>
								  <td width="7.5%" align="rigth">'.$paciente['NroHistoriaClinica'].'</td>
								  <td width="2.5%"></td>
								  <td width="2.5%"></td>
								  <th width="33%">'.substr($paciente['Paciente'],0,31).'</th>
								  <td width="7.5%">'.$paciente['cupo'].'</td>
								  <td width="9%" style="font-size:7px">'.$paciente['financia'].'</td>
								  <td width="25%" style="font-size:8px">'.$paciente['UltMovimiento'].'</td>
								</tr>';
							$i++;
						}
						$tabla_u.='</table>';
					}
					$pdf->writeHTML($tabla_u,true,false,false,false,'');
				}
				$resultado=true;
			}
			else
				$mensaje="Sin registros";			
			if($resultado)
			{
				$pdf->Output('example_011.pdf', 'I');
			}
			else
				return Redirect::back()->withErrors([$mensaje]);
		}
		else
		{
			$ListaTurnos = DB::table('ArchivoRuta')
				->where('estado',1)
				->orderBy('IdTipoTurnoRef')
				->orderBy('Nombre')
				->get(['IdTipoTurnoRef','IdRuta','Nombre']);
			$ListaRutas = $ListaTurnos->pluck('Nombre','IdRuta')->prepend('Todos', 0);
			$ListaEspecialidadesBD = DB::table('ArchivoRutaServicio')
				->join('Servicios', 'ArchivoRutaServicio.IdServicio', '=', 'Servicios.IdServicio')
				->join('Especialidades', 'Servicios.IdEspecialidad', '=', 'Especialidades.IdEspecialidad')
				->select(
					'ArchivoRutaServicio.IdRuta',
					'Especialidades.IdEspecialidad',
					'Especialidades.Nombre'
				)
				->distinct()
				->get();
			$ListaEspecialidades = $ListaEspecialidadesBD
				->pluck('Nombre', 'IdEspecialidad')
				->prepend('Todos', 0);
			$ListaServiciosBD = DB::table('Servicios')
				->where('idEstado',1)
				->select(
					'IdEspecialidad',
					'IdServicio',
					'Nombre'
				)
				->get();
			$ListaServicios = $ListaServiciosBD
				->pluck('Nombre', 'IdServicio')
				->prepend('Todos', 0);
			return view('ArchivoClinico.ReporteConserjeriaConsultorio', compact(
				'ListaTurnos',
				'ListaRutas',
				'ListaEspecialidadesBD',
				'ListaEspecialidades',
				'ListaServiciosBD',
				'ListaServicios'
			));
		}
	}
	public function SalidaExternaHistoria(Request $request)
	{
		if($request->method()=='POST')
		{
			$resultado=false;
			$mensaje=null;
			$datos=null;
			$SalidaHistoriaClinica=RS_ArchivoClinico::SalidaExternaHistoriaClinica($request->IdPaciente,$request->IdServicio,$request->IdMotivo,date('Ymd H:i:s'),$request->Observacion,auth()->user()->IdEmpleado,$request->IdConserje,$request->IdEmpleadoSolicita);
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
				return view('ArchivoClinico.SalidaExternaHistoria')
					->with("mensaje","Historia Clinica a Destino: ".$datos['Servicio']);
			else
				return view('ArchivoClinico.SalidaExternaHistoria')
					->with("error",$mensaje)
					->with("datos",$datos);
		}
		else
		{
			$servicios = DB::table('Servicios')
				->where('idEstado', 1)
				->orderBy('Nombre', 'asc')
				->pluck('Nombre', 'IdServicio');
			$motivos = DB::table('MotivosMovimientoHistoria')
				->orderBy('Descripcion', 'asc')
				->pluck('Descripcion', 'IdMotivo');
			$conserjes = DB::table('ArchivoRutaConserje')
				->join('Empleados', 'ArchivoRutaConserje.IdEmpleado', '=', 'Empleados.IdEmpleado')
				->select(
					'ArchivoRutaConserje.IdEmpleado',
					DB::raw("Empleados.ApellidoPaterno + ' ' + Empleados.ApellidoMaterno + ' ' + Empleados.Nombres AS NombreCompleto")
				)
				->where('ArchivoRutaConserje.estado', 1)
				->orderBy('Empleados.ApellidoPaterno')
				->orderBy('Empleados.ApellidoMaterno')
				->orderBy('Empleados.Nombres')
				->pluck('NombreCompleto', 'IdEmpleado');
			$empleados = DB::table('Empleados')
				->select(
					'IdEmpleado',
					DB::raw("ApellidoPaterno + ' ' + ApellidoMaterno + ' ' + Nombres AS NombreCompleto")
				)
				->where('esActivo', 1)
				->orderBy('ApellidoPaterno')
				->orderBy('ApellidoMaterno')
				->orderBy('Nombres')
				->pluck('NombreCompleto', 'IdEmpleado');
			return view('ArchivoClinico.SalidaExternaHistoria', compact('servicios','motivos','empleados','conserjes'));
		}
	}
	public function BuscarPacienteSalidaHC(Request $request)
	{
		$resultado=false;
		$mensaje=null;
		$datos=null;
		$filas=DB::select("Select IdPaciente, ApellidoPaterno, ApellidoMaterno, PrimerNombre from Pacientes where NroHistoriaClinica=?",[$request->NroHistoriaClinica]);
		if(count($filas)==1)
		{
			$datos=$filas[0];
			$resultado=true;
		}
		elseif(count($filas)>1)
			$mensaje="Duplicidad de Registros";
		else
			$mensaje="Paciente no encontrado";
		return['resultado'=>$resultado,"mensaje"=>$mensaje,"datos"=>$datos];
	}
}