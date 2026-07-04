<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use \PDO;
use Redirect;
use rivcar\jqgrid\jqGridUtils;
use rivcar\jqgrid\jqGridRender;
use rivcar\jqGrid\DBdrivers\jqGridDB;
use App\RS_SIS;
use App\RS_ServicioSocial;

class ServicioSocialController extends Controller {
    public function listar_atenciones(Request $request)
	{
        $val=$request->oper=='grid'||$request->oper=='excel'?true:false;
		$conn =DB::connection()->getPdo();
		$grid = new jqGridRender($conn);
		$grid->SelectCommand = "SELECT        Atenciones.IdAtencion, Atenciones.IdCuentaAtencion, Pacientes.ApellidoPaterno, Pacientes.ApellidoMaterno, Pacientes.PrimerNombre, TiposDocIdentidad.Descripcion, Pacientes.NroDocumento, Pacientes.NroHistoriaClinica, 
					 convert(date,Atenciones.FechaIngreso) as FechaIngreso, Atenciones.HoraIngreso, Servicios.Nombre as Servicio, FuentesFinanciamiento.Descripcion AS FuenteFinanciamiento
FROM            Atenciones INNER JOIN
					 Pacientes ON Atenciones.IdPaciente = Pacientes.IdPaciente LEFT OUTER JOIN
					 TiposDocIdentidad ON Pacientes.IdDocIdentidad = TiposDocIdentidad.IdDocIdentidad INNER JOIN
					 Servicios ON Atenciones.IdServicioIngreso = Servicios.IdServicio INNER JOIN
					 FuentesFinanciamiento ON Atenciones.idFuenteFinanciamiento = FuentesFinanciamiento.IdFuenteFinanciamiento INNER JOIN
					 Medicos ON Atenciones.IdMedicoIngreso = Medicos.IdMedico
WHERE        (Atenciones.IdAtencion <> 0) AND (Atenciones.IdTipoServicio = 18) AND (Medicos.IdEmpleado=".auth('empleado')->user()->IdEmpleado.")";
		// set the ouput format to json
		$grid->dataType = 'json';
		$grid->setColModel();
		// Set the url from where we obtain the data
		$grid->setUrl('listar_atenciones');
		$grid->setGridOptions(array(
			"caption"=>"Atenciones Servicio Social",
			"rowNum"=>20,
			"sortname"=>"IdCuentaAtencion",
			"hoverrows"=>true,
			"autowidth"=>true,
			"rowList"=>array(10,20,50),
			"height"=>"auto",
			"sortorder"=>"desc",
		));
		$grid->gSQLMaxRows=500000;
		// Enable filter toolbar searching
		$grid->toolbarfilter = true;
		$grid->setColProperty('IdAtencion',array("hidden"=>true));
		// navigator first should be enabled
		$grid->navigator = true;
		$grid->setNavOptions('navigator', array("add"=>false,"edit"=>false,"del"=>false,"excel"=>true,"pdf"=>false,"view"=>false));
		////
		$editar_microbiano= <<<DBLCLICK
function()
{
window.location='crear_atencion_ss';
}
DBLCLICK;
		$b_editar_m= array("#pager",
			array("caption"=>"Nuevo",'buttonicon'=>"ui-icon-plus","onClickButton"=>"js:".$editar_microbiano)
		);
		$grid->callGridMethod("#grid", "navButtonAdd", $b_editar_m);
		$editar_microbiano= <<<DBLCLICK
function()
{
var IdAtencion=jQuery('#grid').jqGrid('getGridParam','selrow');
if(IdAtencion!=null)
	window.location='FichaSocial/'+jQuery("#grid").getRowData(IdAtencion).IdCuentaAtencion;
else
	alert("Seleccione un registro");
}
DBLCLICK;
		$b_editar_m= array("#pager",
			array("caption"=>"Ver", "onClickButton"=>"js:".$editar_microbiano)
		);
		$grid->callGridMethod("#grid", "navButtonAdd", $b_editar_m);
		
		////
		$conn = null;
		if($val)
			$grid->renderGrid('#grid','#pager',true, null, null, true,true,$val);
		else
			return view("general_grid")->with('grid',$grid->renderGrid('#grid','#pager',true, null, null, true,true,$val))->with("titulo","Atenciones SS");
    }
	public function crear_atencion_ss(Request $request)
    {
        if($request->method()=='POST')
		{
			$resultado=false;
			$mensaje=null;
			if($request->sis==1)
			{
				$VerificaSisGalenhos=RS_SIS::VerificaSisGalenhos($request->IdDocIdentidad,$request->NumeroDocumento,$request->IdSiaSis,$request->SisCodigo);
				if($VerificaSisGalenhos['resultado'])
				{
					$IdFuenteFinanciamiento=3;
					$IdTipoFinanciamiento=2;
				}
				else
				{
					$IdFuenteFinanciamiento=1;
					$IdTipoFinanciamiento=1;
				}
			}
			else
			{
				$IdFuenteFinanciamiento=1;
				$IdTipoFinanciamiento=1;
			}
			$GuardarPaciente=RS_ServicioSocial::GuardarPaciente($request);
			if($GuardarPaciente['resultado'])
			{
				$filas=DB::select("select IdMedico from Medicos where IdEmpleado=?",[auth('empleado')->user()->IdEmpleado]);
				if(count($filas)>0)
				{
					$IdMedico=$filas[0]->IdMedico;
					$CreaAtencion=RS_ServicioSocial::CreaAtencion($request->paciente_nuevo,$GuardarPaciente['IdPaciente'],date('Ymd H:i:s'),1,$request->IdServicio,$IdMedico,5
,$IdFuenteFinanciamiento,$IdTipoFinanciamiento,$request->IdSiaSis,$request->SisCodigo,$request->NombreAcompaniante,$request->TelefonoAcompaniante
,$request->ClasificacionSocioEconomica,auth('empleado')->user()->IdEmpleado,request()->getClientIp());
					if($CreaAtencion['resultado'])
					{
						$IdCuentaAtencion=$CreaAtencion['IdCuentaAtencion'];
						$resultado=true;
					}
					else
						$mensaje=$CreaAtencion['mensaje'];
				}
				else
					$mensaje='El usuario no tiene registro en la tabla Medico';
			}
			else
				$mensaje=$GuardarPaciente['mensaje'];
			if($resultado)
				return redirect('ServicioSocial/FichaSocial/'.$IdCuentaAtencion);
			else
				return Redirect::back()->withErrors([$mensaje]);
		}
		else
		{
			$filas=DB::select("SELECT IdDocIdentidad,Descripcion from TiposDocIdentidad");
			$TiposDocIdentidad=array();
			foreach($filas as $fila)
				$TiposDocIdentidad[$fila->IdDocIdentidad]=$fila->Descripcion;
			
			$filas=DB::select("SELECT IdEstadoCivil, Descripcion from TiposEstadoCivil");
			$EstadoCivil=array();
			foreach($filas as $fila)
				$EstadoCivil[$fila->IdEstadoCivil]=$fila->Descripcion;

			$filas=DB::select("SELECT IdGradoInstruccion, Descripcion from TiposGradoInstruccion");
			$GradoInstruccion=array();
			foreach($filas as $fila)
				$GradoInstruccion[$fila->IdGradoInstruccion]=$fila->Descripcion;
			
			$filas=DB::select("SELECT IdTipoOcupacion, descripcion from TiposOcupacion");
			$Ocupaciones=array();
			foreach($filas as $fila)
				$Ocupaciones[$fila->IdTipoOcupacion]=$fila->descripcion;
				
			$filas=DB::select("SELECT IdReligion,Descripcion from TiposReligion");
			$Religiones=array();
			foreach($filas as $fila)
				$Religiones[$fila->IdReligion]=$fila->Descripcion;
				
			$filas=DB::select("SELECT Distritos.IdDistrito, Distritos.Nombre + ' - ' + Provincias.Nombre + ' - ' + Departamentos.Nombre AS Descripcion
							   FROM Distritos 
							   INNER JOIN Provincias ON Distritos.IdProvincia = Provincias.IdProvincia 
							   INNER JOIN Departamentos ON Provincias.IdDepartamento = Departamentos.IdDepartamento");				
			$Distritos=array();
			foreach($filas as $fila)
				$Distritos[$fila->IdDistrito]=$fila->Descripcion;	
				
			$filas=DB::select("SELECT IdPais,Nombre from Paises");
			$Paises[""]="";
			foreach($filas as $fila)
				$Paises[$fila->IdPais]=$fila->Nombre;
				
			$filas=DB::select("SELECT IdServicio, Nombre from Servicios where idEstado=1 and IdTipoServicio=18 order by Nombre");
			$Servicios[""]="";
			foreach($filas as $fila)
				$Servicios[$fila->IdServicio]=$fila->Nombre;
				
			$filas=DB::select("select codetni,desetni from HIS_tabetnia");
			$Etnias[""]="";
			foreach($filas as $fila)
				$Etnias[$fila->codetni]=$fila->desetni;
				
			$filas=DB::select("select IdIdioma,Lengua from TiposIdiomas");
			$Idiomas[""]="";
			foreach($filas as $fila)
				$Idiomas[$fila->IdIdioma]=$fila->Lengua;
			
			return view("ServicioSocial.crea_atencion_ss")
				->with('TiposDocIdentidad',$TiposDocIdentidad)
				->with('Paises',$Paises)
				->with('EstadoCivil',$EstadoCivil)
				->with('GradoInstruccion',$GradoInstruccion)
				->with('Ocupaciones',$Ocupaciones)
				->with('Religiones',$Religiones)
				->with('Distritos',$Distritos)
				->with('Servicios',$Servicios)
				->with('Etnias',$Etnias)
				->with('Idiomas',$Idiomas);
		}
    }
	public function buscar_paciente(Request $request)
	{
		$resultado=false;
		$mensaje=null;
		$datos=null;
		$BuscarPaciente=RS_ServicioSocial::BuscarPaciente($request->IdDocIdentidad,$request->NroDocumento);
		if($BuscarPaciente['resultado'])
		{
			$datos=$BuscarPaciente['datos'];
			$resultado=true;
		}
		else
			$mensaje=$BuscarPaciente['mensaje'];
		return ['resultado'=>$resultado,'mensaje'=>$mensaje,'datos'=>$datos];
	}
	public function FichaSocial(Request $request)
	{
		if($request->method()=='POST')
		{
			$resultado=false;
			$mensaje=null;
			$datos=null;
			$filas=DB::select("SELECT        Atenciones.IdAtencion, Atenciones.IdTipoServicio, Atenciones.FechaIngreso, Pacientes.ApellidoPaterno,
						 Pacientes.ApellidoMaterno, Pacientes.PrimerNombre, cast(Pacientes.FechaNacimiento as date) as FechaNacimiento,
						 Pacientes.IdDocIdentidad, Pacientes.NroDocumento, Pacientes.IdTipoSexo, Pacientes.IdEtnia, Pacientes.IdEstadoCivil,
						 Pacientes.IdGradoInstruccion, Pacientes.IdTipoOcupacion, Pacientes.Telefono, Pacientes.NroHistoriaClinica,
						 Pacientes.IdPaisDomicilio, Pacientes.IdDistritoProcedencia, Pacientes.IdDistritoDomicilio,
						 Pacientes.DireccionDomicilio, Atenciones.IdServicioIngreso,
						 SigesaFichaSocialDocumento_old.Categoria as ClasificacionSocioEconomica
FROM            Atenciones INNER JOIN
						 Pacientes ON Atenciones.IdPaciente = Pacientes.IdPaciente left outer JOIN
						 SigesaFichaSocialDocumento_old ON Atenciones.IdCuentaAtencion = SigesaFichaSocialDocumento_old.IdCuentaAtencion
WHERE        (Atenciones.IdCuentaAtencion =?)",[$request->IdCuentaAtencion]);
			if(count($filas)==1)
			{
				if($filas[0]->IdTipoServicio==18)
				{
					$GuardarPaciente=RS_ServicioSocial::GuardarPaciente($request);
					DB::update("Update SigesaFichaSocialDocumento_old set Categoria=? where IdCuentaAtencion=?",[$request->ClasificacionSocioEconomica,$request->IdCuentaAtencion]);
					DB::update("Update AtencionesDatosAdicionales set NombreAcompaniante=?, TelefonoAcompaniante=? where IdAtencion=?",[$request->NombreAcompaniante,$request->TelefonoAcompaniante,$filas[0]->IdAtencion]);
					$resultado=true;
				}
				else
					$mensaje='Esta atencion no pertenece a Servicio Social';
			}
			elseif(count($filas)>1)
				$mensaje="Duplicidad de registros";
			else
				$mensaje="No existe registros";
			if($resultado)
			{
				return redirect('ServicioSocial/listar_atenciones')->withErrors(["Guardado Correctamente"]);
			}
			else
				return Redirect::back()->withErrors([$mensaje]);
		}
		else
		{
			$resultado=false;
			$mensaje=null;
			$datos=null;
			$filas=DB::select("SELECT        Atenciones.IdAtencion, Atenciones.IdTipoServicio, Atenciones.FechaIngreso, Pacientes.ApellidoPaterno,
						 Pacientes.ApellidoMaterno, Pacientes.PrimerNombre, cast(Pacientes.FechaNacimiento as date) as FechaNacimiento,
						 Pacientes.IdDocIdentidad, Pacientes.NroDocumento, Pacientes.IdTipoSexo, Pacientes.IdEtnia, Pacientes.IdIdioma,
						 Pacientes.IdEstadoCivil, Pacientes.IdGradoInstruccion, Pacientes.IdTipoOcupacion, Pacientes.Telefono,
						 Pacientes.IdReligion, Pacientes.NroHistoriaClinica, Pacientes.IdPaisNacimiento, Pacientes.IdDistritoNacimiento,
						 Pacientes.IdDistritoDomicilio, Pacientes.DireccionDomicilio, Atenciones.IdServicioIngreso,
						 SigesaFichaSocialDocumento_old.Categoria as ClasificacionSocioEconomica, AtencionesDatosAdicionales.NombreAcompaniante, 
						 AtencionesDatosAdicionales.TelefonoAcompaniante
FROM            Atenciones INNER JOIN
						 Pacientes ON Atenciones.IdPaciente = Pacientes.IdPaciente left outer JOIN
						 SigesaFichaSocialDocumento_old ON Atenciones.IdCuentaAtencion = SigesaFichaSocialDocumento_old.IdCuentaAtencion INNER JOIN
						 AtencionesDatosAdicionales ON Atenciones.IdAtencion = AtencionesDatosAdicionales.IdAtencion
WHERE        (Atenciones.IdCuentaAtencion =?)",[$request->IdCuentaAtencion]);
			if(count($filas)==1)
			{
				if($filas[0]->IdTipoServicio==18)
				{
					$FichaSocial=$filas[0];
					$resultado=true;
				}
				else
					$mensaje='Esta atencion no pertenece a Servicio Social';
			}
			elseif(count($filas)>1)
				$mensaje="Duplicidad de registros";
			else
				$mensaje="No existe registros";
			if($resultado)
			{
				$filas=DB::select("SELECT IdDocIdentidad,Descripcion from TiposDocIdentidad");
				$TiposDocIdentidad=array();
				foreach($filas as $fila)
					$TiposDocIdentidad[$fila->IdDocIdentidad]=$fila->Descripcion;
				
				$filas=DB::select("SELECT IdEstadoCivil, Descripcion from TiposEstadoCivil");
				$EstadoCivil=array();
				foreach($filas as $fila)
					$EstadoCivil[$fila->IdEstadoCivil]=$fila->Descripcion;

				$filas=DB::select("SELECT IdGradoInstruccion, Descripcion from TiposGradoInstruccion");
				$GradoInstruccion=array();
				foreach($filas as $fila)
					$GradoInstruccion[$fila->IdGradoInstruccion]=$fila->Descripcion;
				
				$filas=DB::select("SELECT IdTipoOcupacion, descripcion from TiposOcupacion");
				$Ocupaciones=array();
				foreach($filas as $fila)
					$Ocupaciones[$fila->IdTipoOcupacion]=$fila->descripcion;
					
				$filas=DB::select("SELECT IdReligion,Descripcion from TiposReligion");
				$Religiones=array();
				foreach($filas as $fila)
					$Religiones[$fila->IdReligion]=$fila->Descripcion;
					
				$filas=DB::select("SELECT Distritos.IdDistrito, Distritos.Nombre + ' - ' + Provincias.Nombre + ' - ' + Departamentos.Nombre AS Descripcion
								   FROM Distritos 
								   INNER JOIN Provincias ON Distritos.IdProvincia = Provincias.IdProvincia 
								   INNER JOIN Departamentos ON Provincias.IdDepartamento = Departamentos.IdDepartamento");				
				$Distritos=array();
				foreach($filas as $fila)
					$Distritos[$fila->IdDistrito]=$fila->Descripcion;	
					
				$filas=DB::select("SELECT IdPais,Nombre from Paises");
				$Paises[""]="";
				foreach($filas as $fila)
					$Paises[$fila->IdPais]=$fila->Nombre;
					
				$filas=DB::select("SELECT IdServicio, Nombre from Servicios where idEstado=1 and IdTipoServicio=18 order by Nombre");
				$Servicios[""]="";
				foreach($filas as $fila)
					$Servicios[$fila->IdServicio]=$fila->Nombre;
					
				$filas=DB::select("select codetni,desetni from HIS_tabetnia");
				$Etnias[""]="";
				foreach($filas as $fila)
					$Etnias[$fila->codetni]=$fila->desetni;
					
				$filas=DB::select("select IdIdioma,Lengua from TiposIdiomas");
				$Idiomas[""]="";
				foreach($filas as $fila)
					$Idiomas[$fila->IdIdioma]=$fila->Lengua;
				return view("ServicioSocial.FichaSocial")
					->with('TiposDocIdentidad',$TiposDocIdentidad)
					->with('Paises',$Paises)
					->with('EstadoCivil',$EstadoCivil)
					->with('GradoInstruccion',$GradoInstruccion)
					->with('Ocupaciones',$Ocupaciones)
					->with('Religiones',$Religiones)
					->with('Distritos',$Distritos)
					->with('Servicios',$Servicios)
					->with('Etnias',$Etnias)
					->with('Idiomas',$Idiomas)
					->with('FichaSocial',$FichaSocial);
			}
			else
				return Redirect::back()->withErrors([$mensaje]);
		}
	}
	public function his_diario(Request $request)
	{
		if($request->method()=='POST')
		{
			$resultado=false;
			$mensaje=null;
			$datos=null;
			$TablaHisDiario=RS_ServicioSocial::TablaHisDiario($request->fecha,auth('empleado')->user()->IdEmpleado);
			if($TablaHisDiario['resultado'])
			{
				$datos=$TablaHisDiario['datos'];
				$resultado=true;
			}
			else
				$mensaje=$TablaHisDiario['mensaje'];
			if($resultado)
			{
				return view("ServicioSocial.his_diario")
					->with('datos',$datos);
			}
			else
				return Redirect::back()->withErrors([$mensaje]);
		}
		else
		{
			return view("ServicioSocial.his_diario");
		}
	}
}