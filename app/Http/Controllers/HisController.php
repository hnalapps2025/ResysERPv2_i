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
    public function r_his_ce(Request $request)
	{
		$val = $request->oper == 'grid' || $request->oper == 'excel' ? true : false;
		$conn = DB::connection()->getPdo();
		$grid = new jqGridRender($conn);
		$grid->SelectCommand = "SELECT        Atenciones.IdAtencion, Atenciones.IdCuentaAtencion, Servicios.codigoServicioHIS as UPS, SIGHAL_Especialidad.especialidad AS Especialidad, Servicios.Nombre AS Servicio, CONVERT(date, Atenciones.FechaIngreso) AS Fecha, 
					 TiposDocIdentidad.Descripcion+' '+Pacientes.NroDocumento as Documento, Pacientes.NroHistoriaClinica, Pacientes.ApellidoPaterno + ' ' + Pacientes.ApellidoMaterno + ' ' + Pacientes.PrimerNombre AS Paciente, 
					 FuentesFinanciamiento.Descripcion AS FuenteFinanciamiento, HIS_tabetnia.etnias AS Etnia, Distritos.Nombre AS Distrito, CASE Pacientes.IdTipoSexo WHEN 1 THEN 'M' WHEN 2 THEN 'F' ELSE 'S/D' END AS Sexo, 
					 cast(Atenciones.Edad as varchar(15))+' '+TiposEdad.Descripcion AS Edad, Empleados.ApellidoPaterno+' '+Empleados.ApellidoMaterno as Medico, '" . csrf_token() . "' as _token
FROM            Atenciones INNER JOIN
					 Servicios ON Atenciones.IdServicioIngreso = Servicios.IdServicio INNER JOIN
					 Especialidades ON Servicios.IdEspecialidad = Especialidades.IdEspecialidad INNER JOIN
					 SIGHAL_Especialidad_detalle ON Especialidades.IdEspecialidad = SIGHAL_Especialidad_detalle.idEspecialidad INNER JOIN
					 SIGHAL_Especialidad ON SIGHAL_Especialidad_detalle.id_esp = SIGHAL_Especialidad.id_esp INNER JOIN
					 Pacientes ON Atenciones.IdPaciente = Pacientes.IdPaciente LEFT OUTER JOIN
					 TiposDocIdentidad ON Pacientes.IdDocIdentidad = TiposDocIdentidad.IdDocIdentidad INNER JOIN
					 FuentesFinanciamiento ON Atenciones.idFuenteFinanciamiento = FuentesFinanciamiento.IdFuenteFinanciamiento LEFT OUTER JOIN
					 Distritos ON Pacientes.IdDistritoDomicilio = Distritos.IdDistrito INNER JOIN
					 TiposEdad ON Atenciones.IdTipoEdad = TiposEdad.IdTipoEdad LEFT OUTER JOIN
					 HIS_tabetnia ON Pacientes.IdEtnia = HIS_tabetnia.codetni LEFT OUTER JOIN
					 AtencionesRevisionHIS ON Atenciones.IdAtencion = AtencionesRevisionHIS.IdAtencion INNER JOIN
					 Medicos ON Atenciones.IdMedicoIngreso = Medicos.IdMedico INNER JOIN
					 Empleados ON Medicos.IdEmpleado = Empleados.IdEmpleado
WHERE        (Atenciones.idEstadoAtencion = 2) AND (Atenciones.IdTipoServicio = 1) AND (isnull(AtencionesRevisionHIS.Estado,1)=1) and cast(Atenciones.FechaIngreso as date)<=cast(getdate() as date)";
		// set the ouput format to json
		$grid->dataType = 'json';
		$grid->setColModel();
		// Set the url from where we obtain the data
		$grid->setUrl('r_his_ce');
		$grid->setGridOptions(array(
			"caption" => "His Consulta Externa",
			"rowNum" => 20,
			"sortname" => "IdAtencion",
			"hoverrows" => true,
			"autowidth" => true,
			"rowList" => array(10, 20, 50),
			"multiselect" => true,
			"height" => "auto",
			"sortorder" => "desc"
		));
		// Enable filter toolbar searching
		$grid->toolbarfilter = true;
		////
		$aprobar = <<<DBLCLICK
function()
{
var selr = jQuery('#grid').jqGrid('getGridParam','selarrrow');
if(selr.length>0)
{
	selr.forEach(function(IdAtencion) {
		$.ajax({
			url:"actualiza_estado_his",
			dataType:"json",
			async:false,
			data:{IdAtencion:IdAtencion,Estado:2,Observacion:null},
			success:function(response)
			{
				console.log(response);
			}
		});
	});
	$('#grid').trigger( 'reloadGrid' );
}
else
	alert("Seleccione Atenciones para Aprobar");
}
DBLCLICK;
		$b_aprobar = array(
			"#pager",
			array("caption" => "Aprobar", 'buttonicon' => "ui-icon-circle-check", "onClickButton" => "js:" . $aprobar)
		);
		$grid->callGridMethod("#grid", "navButtonAdd", $b_aprobar);
		$desaprobar = <<<DBLCLICK
function()
{
var selr = jQuery('#grid').jqGrid('getGridParam','selarrrow');
if(selr.length>0)
{
	let Observacion= prompt("Ingrese Motivo de Observacion", "Error");
	if (Observacion!= null)
	{
		selr.forEach(function(IdAtencion) {
			$.ajax({
				url:"actualiza_estado_his",
				dataType:"json",
				async:false,
				data:{IdAtencion:IdAtencion,Estado:3,Observacion:Observacion},
				success:function(response)
				{
					console.log(response);
				}
			});
		});
		$('#grid').trigger( 'reloadGrid' );
	} 
	else
		alert("Ingrese Motivo de Observacion");		
}
else
	alert("Seleccione Atenciones para Desaprobar");
}
DBLCLICK;
		$b_desaprobar = array(
			"#pager",
			array("caption" => "Observar", 'buttonicon' => "ui-icon-squaresmall-close", "onClickButton" => "js:" . $desaprobar)
		);
		$grid->callGridMethod("#grid", "navButtonAdd", $b_desaprobar);
		////
		$grid->setSubGridGrid("atencion_detalle_his", array("_token"));
		$grid->setColProperty('IdAtencion', array("hidden" => true));
		$grid->setColProperty('_token', array("hidden" => true));
		// navigator first should be enabled
		$grid->navigator = true;
		$grid->setNavOptions('navigator', array("add" => false, "edit" => false, "del" => false, "excel" => true, "pdf" => true, "view" => false));
		$conn = null;
		// Enjoy
		if ($val)
			$grid->renderGrid('#grid', '#pager', true, null, null, true, true, $val);
		else
			return view("general_grid")->with('grid', $grid->renderGrid('#grid', '#pager', true, null, null, true, true, $val));
	}
	public function atencion_detalle_his(Request $request)
	{
		$subtable = $request->subgrid;
		$rowid = $request->rowid;
		//$val=$request->oper=='grid'||$request->oper=='excel'?true:false;
		$conn = DB::connection()->getPdo();
		$grid = new jqGridRender($conn);
		$grid->SelectCommand = "SELECT        cast(AtencionesDiagnosticos.IdAtencionDiagnostico as varchar(30)) as Atencion, 'Diagnostico' as Caracteristica, Diagnosticos.Descripcion, Diagnosticos.CodigoCIE10, SubclasificacionDiagnosticos.Codigo AS Tipo, AtencionesDiagnosticos.labConfHIS
FROM            AtencionesDiagnosticos INNER JOIN
					 Diagnosticos ON AtencionesDiagnosticos.IdDiagnostico = Diagnosticos.IdDiagnostico INNER JOIN
					 SubclasificacionDiagnosticos ON AtencionesDiagnosticos.IdSubclasificacionDx = SubclasificacionDiagnosticos.IdSubclasificacionDx
WHERE        (AtencionesDiagnosticos.IdAtencion = ?)
union all
SELECT        cast(FacturacionServicioDespacho.idOrden as varchar(15))+cast(FacturacionServicioDespacho.IdProducto as varchar(15)) as Atencion, 'Procedimiento' as Caracteristica, FactCatalogoServicios.Nombre, FactCatalogoServicios.Codigo, '' AS Tipo, FacturacionServicioDespacho.labConfHIS
FROM            FactOrdenServicio INNER JOIN
					 FacturacionServicioDespacho ON FactOrdenServicio.IdOrden = FacturacionServicioDespacho.idOrden INNER JOIN
					 FactCatalogoServicios ON FactCatalogoServicios.IdProducto = FacturacionServicioDespacho.IdProducto
WHERE        (FactOrdenServicio.IdCuentaAtencion =(select IdCuentaAtencion from Atenciones where IdAtencion=?))";
		// set the ouput format to json
		$grid->dataType = 'json';
		$grid->setColModel(null, array(&$rowid, &$rowid));
		// Set the url from where we obtain the data
		$grid->setUrl('atencion_detalle_his');
		$grid->setGridOptions(array(
			"rowNum" => 20,
			"sortname" => "Atencion",
			"hoverrows" => true,
			"autowidth" => true,
			"rowList" => array(10, 20, 50),
			"height" => "auto",
			"sortorder" => "desc",
			"postData" => array("subgrid" => $subtable, "rowid" => $rowid)
		));
		// Enable filter toolbar searching
		$grid->toolbarfilter = true;
		$grid->setColProperty('Atencion', array("hidden" => true));
		$grid->setColProperty('CodigoCIE10', array("label" => "CIE10/CPMS"));
		// navigator first should be enabled
		$grid->navigator = false;
		$grid->setNavOptions('navigator', array("add" => false, "edit" => false, "del" => false, "excel" => true, "pdf" => true, "view" => false));
		$conn = null;
		// Enjoy
		$subtable = $subtable . "_t";
		$pager = $subtable . "_p";
		$grid->renderGrid($subtable, $pager, true, null, array(&$rowid, &$rowid), true, true);
	}
	public function actualiza_estado_his(Request $request)
	{
		$resultado=false;
		$mensaje=null;
		$IdAtencionRevisionHIS=null;
		$actualiza_estado_his=RS_His::actualiza_estado_his(
			$request->IdAtencion
			,$request->Estado
			,$request->Observacion
			,date('Ymd H:i:s')
			,auth()->user()->IdEmpleado
		);
		if($actualiza_estado_his['resultado'])
		{
			$IdAtencionRevisionHIS=$actualiza_estado_his['IdAtencionRevisionHIS'];
			$resultado=true;
		}
		else
			$mensaje=$actualiza_estado_his['mensaje'];
		return ['resultado'=>$resultado, 'mensaje'=>$mensaje, 'IdAtencionRevisionHIS' => $IdAtencionRevisionHIS];
	}
	public function r_his_ce_aprobados(Request $request)
	{
		$val = $request->oper == 'grid' || $request->oper == 'excel' ? true : false;
		$conn = DB::connection()->getPdo();
		$grid = new jqGridRender($conn);
		$grid->SelectCommand = "SELECT        Atenciones.IdAtencion, Atenciones.IdCuentaAtencion, SIGHAL_Especialidad.especialidad AS Especialidad, Servicios.Nombre AS Servicio, CONVERT(date, Atenciones.FechaIngreso) AS Fecha, 
					 TiposDocIdentidad.Descripcion+' '+Pacientes.NroDocumento as Documento, Pacientes.NroHistoriaClinica, Pacientes.ApellidoPaterno + ' ' + Pacientes.ApellidoMaterno + ' ' + Pacientes.PrimerNombre AS Paciente, 
					 FuentesFinanciamiento.Descripcion AS FuenteFinanciamiento, HIS_tabetnia.etnias AS Etnia, Distritos.Nombre AS Distrito, CASE Pacientes.IdTipoSexo WHEN 1 THEN 'M' WHEN 2 THEN 'F' ELSE 'S/D' END AS Sexo, 
					 cast(Atenciones.Edad as varchar(15))+' '+TiposEdad.Descripcion AS Edad, Empleados.ApellidoPaterno+' '+Empleados.ApellidoMaterno as Medico, '" . csrf_token() . "' as _token
FROM            Atenciones INNER JOIN
					 Servicios ON Atenciones.IdServicioIngreso = Servicios.IdServicio INNER JOIN
					 Especialidades ON Servicios.IdEspecialidad = Especialidades.IdEspecialidad INNER JOIN
					 SIGHAL_Especialidad_detalle ON Especialidades.IdEspecialidad = SIGHAL_Especialidad_detalle.idEspecialidad INNER JOIN
					 SIGHAL_Especialidad ON SIGHAL_Especialidad_detalle.id_esp = SIGHAL_Especialidad.id_esp INNER JOIN
					 Pacientes ON Atenciones.IdPaciente = Pacientes.IdPaciente LEFT OUTER JOIN
					 TiposDocIdentidad ON Pacientes.IdDocIdentidad = TiposDocIdentidad.IdDocIdentidad INNER JOIN
					 FuentesFinanciamiento ON Atenciones.idFuenteFinanciamiento = FuentesFinanciamiento.IdFuenteFinanciamiento LEFT OUTER JOIN
					 Distritos ON Pacientes.IdDistritoDomicilio = Distritos.IdDistrito INNER JOIN
					 TiposEdad ON Atenciones.IdTipoEdad = TiposEdad.IdTipoEdad LEFT OUTER JOIN
					 HIS_tabetnia ON Pacientes.IdEtnia = HIS_tabetnia.codetni INNER JOIN
					 AtencionesRevisionHIS ON Atenciones.IdAtencion = AtencionesRevisionHIS.IdAtencion INNER JOIN
					 Medicos ON Atenciones.IdMedicoIngreso = Medicos.IdMedico INNER JOIN
					 Empleados ON Medicos.IdEmpleado = Empleados.IdEmpleado
WHERE        (Atenciones.idEstadoAtencion = 2) AND (Atenciones.IdTipoServicio = 1) AND (AtencionesRevisionHIS.Estado=2)";
		// set the ouput format to json
		$grid->dataType = 'json';
		$grid->setColModel();
		// Set the url from where we obtain the data
		$grid->setUrl('r_his_ce_aprobados');
		$grid->setGridOptions(array(
			"caption" => "His Consulta Externa Aprobados",
			"rowNum" => 20,
			"sortname" => "IdAtencion",
			"hoverrows" => true,
			"autowidth" => true,
			"rowList" => array(10, 20, 50),
			"multiselect" => true,
			"height" => "auto",
			"sortorder" => "desc"
		));
		$token=csrf_token();
		// Enable filter toolbar searching
		$grid->toolbarfilter = true;
		////
		$aprobar = <<<DBLCLICK
function()
{
var selr = jQuery('#grid').jqGrid('getGridParam','selarrrow');
if(selr.length>0)
{
	//console.log(selr);
	$.ajax({
            url: 'envio_masivo',
            type: 'POST',
            data: {
                atenciones: selr,
                _token: '$token'
            },
            success: function(response) {
                console.log(response);
                $('#grid').trigger('reloadGrid');
            },
            error: function(xhr) {
                console.log(xhr.responseText);
                alert('Ocurrió un error al enviar las atenciones.');
            }
        });
	$('#grid').trigger( 'reloadGrid' );
}
else
	alert("Seleccione Atenciones para Enviar a HIS Minsa");
}
DBLCLICK;
		$b_aprobar = array(
			"#pager",
			array("caption" => "Enviar HIs", 'buttonicon' => "ui-icon-circle-check", "onClickButton" => "js:" . $aprobar)
		);
		$grid->callGridMethod("#grid", "navButtonAdd", $b_aprobar);
		////
		$grid->setSubGridGrid("atencion_detalle_his", array("_token"));
		$grid->setColProperty('IdAtencion', array("hidden" => true));
		$grid->setColProperty('_token', array("hidden" => true));
		// navigator first should be enabled
		$grid->navigator = true;
		$grid->setNavOptions('navigator', array("add" => false, "edit" => false, "del" => false, "excel" => true, "pdf" => true, "view" => false));
		$conn = null;
		// Enjoy
		if ($val)
			$grid->renderGrid('#grid', '#pager', true, null, null, true, true, $val);
		else
			return view("general_grid")->with('grid', $grid->renderGrid('#grid', '#pager', true, null, null, true, true, $val));
	}
	public function r_his_ce_observados(Request $request)
	{
		$val = $request->oper == 'grid' || $request->oper == 'excel' ? true : false;
		$conn = DB::connection()->getPdo();
		$grid = new jqGridRender($conn);
		$grid->SelectCommand = "SELECT        Atenciones.IdAtencion, Atenciones.IdCuentaAtencion, SIGHAL_Especialidad.especialidad AS Especialidad, Servicios.Nombre AS Servicio, CONVERT(date, Atenciones.FechaIngreso) AS Fecha, 
					 TiposDocIdentidad.Descripcion+' '+Pacientes.NroDocumento as Documento, Pacientes.NroHistoriaClinica, Pacientes.ApellidoPaterno + ' ' + Pacientes.ApellidoMaterno + ' ' + Pacientes.PrimerNombre AS Paciente, 
					 FuentesFinanciamiento.Descripcion AS FuenteFinanciamiento, HIS_tabetnia.etnias AS Etnia, Distritos.Nombre AS Distrito, CASE Pacientes.IdTipoSexo WHEN 1 THEN 'M' WHEN 2 THEN 'F' ELSE 'S/D' END AS Sexo, 
					 cast(Atenciones.Edad as varchar(15))+' '+TiposEdad.Descripcion AS Edad, Empleados.ApellidoPaterno+' '+Empleados.ApellidoMaterno as Medico, '" . csrf_token() . "' as _token
FROM            Atenciones INNER JOIN
					 Servicios ON Atenciones.IdServicioIngreso = Servicios.IdServicio INNER JOIN
					 Especialidades ON Servicios.IdEspecialidad = Especialidades.IdEspecialidad INNER JOIN
					 SIGHAL_Especialidad_detalle ON Especialidades.IdEspecialidad = SIGHAL_Especialidad_detalle.idEspecialidad INNER JOIN
					 SIGHAL_Especialidad ON SIGHAL_Especialidad_detalle.id_esp = SIGHAL_Especialidad.id_esp INNER JOIN
					 Pacientes ON Atenciones.IdPaciente = Pacientes.IdPaciente LEFT OUTER JOIN
					 TiposDocIdentidad ON Pacientes.IdDocIdentidad = TiposDocIdentidad.IdDocIdentidad INNER JOIN
					 FuentesFinanciamiento ON Atenciones.idFuenteFinanciamiento = FuentesFinanciamiento.IdFuenteFinanciamiento LEFT OUTER JOIN
					 Distritos ON Pacientes.IdDistritoDomicilio = Distritos.IdDistrito INNER JOIN
					 TiposEdad ON Atenciones.IdTipoEdad = TiposEdad.IdTipoEdad LEFT OUTER JOIN
					 HIS_tabetnia ON Pacientes.IdEtnia = HIS_tabetnia.codetni INNER JOIN
					 AtencionesRevisionHIS ON Atenciones.IdAtencion = AtencionesRevisionHIS.IdAtencion INNER JOIN
					 Medicos ON Atenciones.IdMedicoIngreso = Medicos.IdMedico INNER JOIN
					 Empleados ON Medicos.IdEmpleado = Empleados.IdEmpleado
WHERE        (Atenciones.idEstadoAtencion = 2) AND (Atenciones.IdTipoServicio = 1) AND (AtencionesRevisionHIS.Estado=3)";
		// set the ouput format to json
		$grid->dataType = 'json';
		$grid->setColModel();
		// Set the url from where we obtain the data
		$grid->setUrl('r_his_ce_observados');
		$grid->setGridOptions(array(
			"caption" => "His Consulta Externa Observados",
			"rowNum" => 20,
			"sortname" => "IdAtencion",
			"hoverrows" => true,
			"autowidth" => true,
			"rowList" => array(10, 20, 50),
			"multiselect" => true,
			"height" => "auto",
			"sortorder" => "desc"
		));
		// Enable filter toolbar searching
		$grid->toolbarfilter = true;
		$grid->setSubGridGrid("atencion_detalle_his", array("_token"));
		$grid->setColProperty('IdAtencion', array("hidden" => true));
		$grid->setColProperty('_token', array("hidden" => true));
		// navigator first should be enabled
		$grid->navigator = true;
		$grid->setNavOptions('navigator', array("add" => false, "edit" => false, "del" => false, "excel" => true, "pdf" => true, "view" => false));
		$conn = null;
		// Enjoy
		if ($val)
			$grid->renderGrid('#grid', '#pager', true, null, null, true, true, $val);
		else
			return view("general_grid")->with('grid', $grid->renderGrid('#grid', '#pager', true, null, null, true, true, $val));
	}
	public function r_his_ce_enviados(Request $request)
	{
		$val = $request->oper == 'grid' || $request->oper == 'excel' ? true : false;
		$conn = DB::connection()->getPdo();
		$grid = new jqGridRender($conn);
		$grid->SelectCommand = "SELECT        Atenciones.IdAtencion, Atenciones.IdCuentaAtencion, SIGHAL_Especialidad.especialidad AS Especialidad, Servicios.Nombre AS Servicio, CONVERT(date, Atenciones.FechaIngreso) AS Fecha, 
					 TiposDocIdentidad.Descripcion+' '+Pacientes.NroDocumento as Documento, Pacientes.NroHistoriaClinica, Pacientes.ApellidoPaterno + ' ' + Pacientes.ApellidoMaterno + ' ' + Pacientes.PrimerNombre AS Paciente, 
					 FuentesFinanciamiento.Descripcion AS FuenteFinanciamiento, HIS_tabetnia.etnias AS Etnia, Distritos.Nombre AS Distrito, CASE Pacientes.IdTipoSexo WHEN 1 THEN 'M' WHEN 2 THEN 'F' ELSE 'S/D' END AS Sexo, 
					 cast(Atenciones.Edad as varchar(15))+' '+TiposEdad.Descripcion AS Edad, Empleados.ApellidoPaterno+' '+Empleados.ApellidoMaterno as Medico, '" . csrf_token() . "' as _token
FROM            Atenciones INNER JOIN
					 Servicios ON Atenciones.IdServicioIngreso = Servicios.IdServicio INNER JOIN
					 Especialidades ON Servicios.IdEspecialidad = Especialidades.IdEspecialidad INNER JOIN
					 SIGHAL_Especialidad_detalle ON Especialidades.IdEspecialidad = SIGHAL_Especialidad_detalle.idEspecialidad INNER JOIN
					 SIGHAL_Especialidad ON SIGHAL_Especialidad_detalle.id_esp = SIGHAL_Especialidad.id_esp INNER JOIN
					 Pacientes ON Atenciones.IdPaciente = Pacientes.IdPaciente LEFT OUTER JOIN
					 TiposDocIdentidad ON Pacientes.IdDocIdentidad = TiposDocIdentidad.IdDocIdentidad INNER JOIN
					 FuentesFinanciamiento ON Atenciones.idFuenteFinanciamiento = FuentesFinanciamiento.IdFuenteFinanciamiento LEFT OUTER JOIN
					 Distritos ON Pacientes.IdDistritoDomicilio = Distritos.IdDistrito INNER JOIN
					 TiposEdad ON Atenciones.IdTipoEdad = TiposEdad.IdTipoEdad LEFT OUTER JOIN
					 HIS_tabetnia ON Pacientes.IdEtnia = HIS_tabetnia.codetni INNER JOIN
					 AtencionesRevisionHIS ON Atenciones.IdAtencion = AtencionesRevisionHIS.IdAtencion INNER JOIN
					 Medicos ON Atenciones.IdMedicoIngreso = Medicos.IdMedico INNER JOIN
					 Empleados ON Medicos.IdEmpleado = Empleados.IdEmpleado
WHERE        (Atenciones.idEstadoAtencion = 2) AND (Atenciones.IdTipoServicio = 1) AND (AtencionesRevisionHIS.Estado=4)";
		// set the ouput format to json
		$grid->dataType = 'json';
		$grid->setColModel();
		// Set the url from where we obtain the data
		$grid->setUrl('r_his_ce_enviados');
		$grid->setGridOptions(array(
			"caption" => "His Consulta Externa Enviados",
			"rowNum" => 20,
			"sortname" => "IdAtencion",
			"hoverrows" => true,
			"autowidth" => true,
			"rowList" => array(10, 20, 50),
			"multiselect" => true,
			"height" => "auto",
			"sortorder" => "desc"
		));
		// Enable filter toolbar searching
		$grid->toolbarfilter = true;
		$grid->setSubGridGrid("atencion_detalle_his", array("_token"));
		$grid->setColProperty('IdAtencion', array("hidden" => true));
		$grid->setColProperty('_token', array("hidden" => true));
		// navigator first should be enabled
		$grid->navigator = true;
		$grid->setNavOptions('navigator', array("add" => false, "edit" => false, "del" => false, "excel" => true, "pdf" => true, "view" => false));
		$conn = null;
		// Enjoy
		if ($val)
			$grid->renderGrid('#grid', '#pager', true, null, null, true, true, $val);
		else
			return view("general_grid")->with('grid', $grid->renderGrid('#grid', '#pager', true, null, null, true, true, $val));
	}
	public function servicios_his(Request $request)
	{
		$val = $request->oper == 'grid' || $request->oper == 'excel' ? true : false;
		$conn = DB::connection()->getPdo();
		$grid = new jqGridRender($conn);
		$grid->SelectCommand = "select IdServicio, Nombre,codigoServicioHIS, '" . csrf_token() . "' as _token from Servicios where idEstado<>0";
		// Set the table to where you add the data
		$grid->table = 'Servicios';
		$grid->setPrimaryKeyId('IdServicio');
		$grid->serialKey = true;
		// set the ouput format to json
		$grid->dataType = 'json';
		$grid->setColModel();
		// Set the url from where we obtain the data
		$grid->setUrl('servicios_his');
		$grid->setGridOptions(array(
			"caption" => "Servicios His",
			"rowNum" => 20,
			"sortname" => "IdServicio",
			"hoverrows" => true,
			"autowidth" => true,
			"rowList" => array(10, 20, 50),
			"height" => "auto",
			"sortorder" => "desc"
		));
		// Enable filter toolbar searching
		$grid->toolbarfilter = true;
		$grid->setColProperty('_token', array("hidden" => true));
		// navigator first should be enabled
		$grid->navigator = true;
		$grid->setNavOptions('navigator', array("add" => false, "edit" => true, "del" => false, "excel" => true, "pdf" => true, "view" => false));
		$conn = null;
		// Enjoy
		if ($val)
			$grid->renderGrid('#grid', '#pager', true, null, null, true, true, $val);
		else
			return view("general_grid")->with('grid', $grid->renderGrid('#grid', '#pager', true, null, null, true, true, $val));
	}
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
			$ObtenerDatosAtencionHis=RS_His::ObtenerDatosAtencionHis($request->IdAtencion,auth()->user()->IdEmpleado);
			if($ObtenerDatosAtencionHis['resultado'])
			{
				$PostFields=$ObtenerDatosAtencionHis['datos'];
				//dd(json_encode($PostFields));
				$HttpHeader=RS_His::$HttpHeader;
				$pagina=RS_Funciones::LeerPagina(RS_His::$url_envio_his,'POST',$PostFields,$HttpHeader);
				$httpCode=RS_Funciones::retornar_httpCode($pagina[0]);
				if($httpCode==200)
				{
					$datos=$pagina[1];
					$resultado=true;
				}
				else
					$mensaje="ERROR: ".$pagina[0];
			}
			else
				$mensaje=$ObtenerDatosAtencionHis['mensaje'];
			return ['resultado'=>$resultado,'mensaje'=>$mensaje,'datos'=>$datos];
		}
	}
	public function envio_masivo(Request $request)
	{
		$resultado=false;
		$mensaje=null;
		$datos=null;
		$envio_masivo=RS_His::envio_masivo($request->input('atenciones', []),auth()->user()->IdEmpleado);
		if($envio_masivo['resultado'])
		{
			$datos=$envio_masivo['datos'];
			$resultado=true;
		}
		else
			$mensaje=$envio_masivo['mensaje'];
		return ['resultado'=>$resultado,'mensaje'=>$mensaje,'datos'=>$datos];
	}
}