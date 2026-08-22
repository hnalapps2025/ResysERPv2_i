<?php
namespace App;

use Illuminate\Support\Facades\DB;
use \PDO;

class RS_His
{
	public static $url_envio_his="https://dservicios.minsa.gob.pe/mcs-interoperabilidad-hisminsa/servicio/atencion/v1.0/registrarAtencion";
	public static $HttpHeader=[
        "Accept: application/json;charset=UTF-8",
        "ipclient: 181.176.5.225",
        "username: USR_00006207",
        "Content-Type: application/json"
    ];
	public static $idEntidad=6207;
	public static $AccionNuevo=1;
	public static $AccionActualizar=2;
	public static $AccionAnular=3;
	public static $TipoEnvioAtencionesGenerales=1;
	public static $TipoEnvioVacunas=2;
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
	public static function ObtenerDatosAtencionHis($Atenciones,$IdEmpleadoRegistra)
	{
		$resultado=false;
		$mensaje=null;
		$datos=[];
		$ObtenerRegistrosEnviarHIS=self::ObtenerRegistrosEnviarHIS($Atenciones,$IdEmpleadoRegistra);
		if($ObtenerRegistrosEnviarHIS['resultado'])
		{
			$datos=[
				"idEntidad" => self::$idEntidad,
				"fecEnvio" => date('Ymd'),
				"tipoEnvio" =>self::$TipoEnvioAtencionesGenerales,
				"accion" => self::$AccionNuevo,
				"registro" => $ObtenerRegistrosEnviarHIS['datos']
			];
			$resultado=true;
		}
		else
			$mensaje=$ObtenerRegistrosEnviarHIS['mensaje'];
		return ['resultado'=>$resultado,'mensaje'=>$mensaje,'datos'=>$datos];
	}
	public static function ObtenerRegistrosEnviarHIS($Atenciones,$IdEmpleadoRegistra)
	{
		$resultado=false;
		$mensaje=null;
		$datos=[];
		foreach($Atenciones as $i=>$IdAtencion)
		{
			$atencion=DB::select("SELECT Atenciones.IdPaciente, Medicos.IdEmpleado,
Atenciones.FechaIngreso, AtencionesObtetricas.FechaUltimaRegla, Atenciones.IdFormaPago,
Atenciones.HoraIngreso, Servicios.codigoServicioHIS, SIGH_EXTERNA..SisFuaAtencion.idSiasis
	FROM            Atenciones
	INNER JOIN AtencionesRevisionHIS ON Atenciones.IdAtencion = AtencionesRevisionHIS.IdAtencion
	INNER JOIN Medicos ON Atenciones.IdMedicoIngreso= Medicos.IdMedico
	INNER JOIN Servicios ON ISNULL(Atenciones.IdServicioEgreso,Atenciones.IdServicioIngreso)=Servicios.IdServicio
	LEFT OUTER JOIN AtencionesObtetricas ON Atenciones.IdAtencion=AtencionesObtetricas.IdAtencion
	LEFT JOIN SIGH_EXTERNA..SisFuaAtencion ON Atenciones.IdCuentaAtencion = SIGH_EXTERNA..SisFuaAtencion.IdCuentaAtencion
	WHERE        (Atenciones.IdAtencion=?)",[$IdAtencion]);
			$cont=count($atencion);
			if($cont==1)
			{
				$filas[]=[
					"idSecuencial" =>$i,
					"idExterno" => $IdAtencion,
					"idCita" => null,            
					"paciente" => self::ObtenerDatosPacienteAtencionHis($atencion[0]->IdPaciente),
					"personalRegistra" => self::ObtenerPersonalRegistraHis($IdEmpleadoRegistra),
					"personalAtiende" => self::ObtenerPersonalAtiendeHis($atencion[0]->IdEmpleado),
					"cita" => [
						"codRenipress" => 6207,
						/*"examenFisico" => [
							"hemoglobina" => "string",
							"perimetroAbdominal" => "string",
							"perimetroCefalico" => "string",
							"peso" => "string",
							"pesoPregestacional" => "string",
							"talla" => "string"
						],*/
						"fecAtencion" => date('Ymd', strtotime($atencion[0]->FechaIngreso)),
						"fechaUltimaRegla" => $atencion[0]->FechaUltimaRegla?date('Ymd', strtotime($atencion[0]->FechaUltimaRegla)):null,
						"idFinanciador" => $atencion[0]->IdFormaPago,
						"idTipoActividad" => 1,
						"idTurno" => (($h = (int)substr($atencion[0]->HoraIngreso, 0, 2)) < 12 ? 'M' : ($h < 18 ? 'T' : 'N')),
						"idUPS" => $atencion[0]->codigoServicioHIS,
						"items" => self::ObtenerItemsAtencionHis($IdAtencion),
						"numeroAfiliacion" => $atencion[0]->idSiasis
					],
					"tutor"=>null
				];
			}
		}
		if(count($filas)>0)
		{
			$datos=$filas;
			$resultado=true;
		}
		else
			$mensaje="No existe Registros a Enviar";
		return ['resultado'=>$resultado,'mensaje'=>$mensaje,'datos'=>$datos];
	}
	public static function ObtenerDatosPacienteAtencionHis($IdPaciente)
	{
		$e =DB::selectOne("SELECT CASE WHEN len(Pacientes.NroDocumento) = 0 THEN '5' ELSE Pacientes.IdDocIdentidad END AS idTipoDoc, Pacientes.NroDocumento,
										Pacientes.ApellidoPaterno, Pacientes.ApellidoMaterno, Pacientes.PrimerNombre as nombres, 
										Pacientes.FechaNacimiento, Pacientes.NroHistoriaClinica, case Pacientes.IdTipoSexo when 1 then 'M' else 'F' end as IdSexo, 
										ISNULL(Paises.Codigo, 'PER') AS IdPais, rtrim(ltrim(ISNULL(HIS_tabetnia.codhis, '58'))) AS idEtnia
	FROM            Pacientes LEFT OUTER JOIN
							 Paises ON Pacientes.IdPaisNacimiento = Paises.IdPais LEFT OUTER JOIN
							 HIS_tabetnia ON Pacientes.IdEtnia = HIS_tabetnia.codetni
	WHERE        (Pacientes.IdPaciente=?)",[$IdPaciente]);
		return [
			"idTipoDoc" => $e?->idTipoDoc,
			"numeroDoc" => $e?->NroDocumento,
			"apePaterno" => $e?->ApellidoPaterno,
			"apeMaterno" => $e?->ApellidoMaterno,
			"nombres" => $e?->nombres,
			"fecNacimiento" => date('Ymd', strtotime($e?->FechaNacimiento)),
			"idEtnia" => $e?->idEtnia,
			"idGenero" => $e?->IdSexo,
			"idPais" => $e?->IdPais ?? 'PER',
			"numHistoria" => $e?->NroHistoriaClinica
		];
	}
	public static function ObtenerPersonalRegistraHis($IdEmpleado)
	{
		$e = DB::table('empleados')->where('IdEmpleado', $IdEmpleado)->first();
		return [
			"idTipoDoc"     => $e?->idTipoDocumento,
			"numeroDoc"     => trim($e?->DNI ?? ''),
			"apePaterno"    => $e?->ApellidoPaterno,
			"apeMaterno"    => $e?->ApellidoMaterno,
			"nombres"       => $e?->Nombres,
			"fecNacimiento" => date('Ymd', strtotime($e?->FechaNacimiento)),
			"idCondicion"   => $e?->IdCondicionTrabajo,
			"idGenero"      => ($e?->IdTipoSexo ?? 1) == 1 ? 'M' : 'F',
			"idPais" => $e?->idPaisNacimiento ?? 'PER',
			"idProfesion"   => 29,
			"idCondicion"   =>1
		];
	}
	public static function ObtenerPersonalAtiendeHis($IdEmpleado)
	{
		$e = DB::table('empleados')->where('IdEmpleado', $IdEmpleado)->first();
		return [
			"idTipoDoc"     => $e?->idTipoDocumento,
			"numeroDoc"     => trim($e?->DNI ?? ''),
			"apePaterno"    => $e?->ApellidoPaterno,
			"apeMaterno"    => $e?->ApellidoMaterno,
			"nombres"       => $e?->Nombres,
			"fecNacimiento" => date('Ymd', strtotime($e?->FechaNacimiento)),
			"idCondicion"   => $e?->IdCondicionTrabajo,
			"idGenero"      => ($e?->IdTipoSexo ?? 1) == 1 ? 'M' : 'F',
			"idPais" => $e?->idPaisNacimiento ?? 'PER',
			"idProfesion"   => 29,
			"idCondicion"   =>1
		];
	}
	public static function ObtenerItemsAtencionHis($IdAtencion)
	{
		$diagnosticos =DB::select("SELECT        '0' as IdAtencionDiagnostico,FactCatalogoServicios.Nombre Descripcion, FactCatalogoServicios.Codigo CodigoCIE10, 'D' AS Tipo, FacturacionServicioDespacho.labConfHIS LAB1, FacturacionServicioDespacho.labConfHIS2 LAB2,FacturacionServicioDespacho.labConfHIS3 LAB3
						,'CP' tipoItem
						FROM            FactOrdenServicio INNER JOIN
												FacturacionServicioDespacho ON FactOrdenServicio.IdOrden = FacturacionServicioDespacho.idOrden INNER JOIN
												FactCatalogoServicios ON FactCatalogoServicios.IdProducto = FacturacionServicioDespacho.IdProducto
						WHERE        (FactOrdenServicio.IdCuentaAtencion =(select IdCuentaAtencion from Atenciones where IdAtencion=?))
						union all
						SELECT      IdAtencionDiagnostico,  Diagnosticos.Descripcion, Diagnosticos.codigoCIEsinPto COLLATE DATABASE_DEFAULT, SubclasificacionDiagnosticos.Codigo AS Tipo, AtencionesDiagnosticos.labConfHIS  AS LAB1, AtencionesDiagnosticos.IdLabHis2 AS LAB2,AtencionesDiagnosticos.IdLabHis3 AS LAB3 --, AtencionesDiagnosticos.labConfHIS, AtencionesDiagnosticos.labConfHIS
						,'CX' tipoItem
						FROM            AtencionesDiagnosticos INNER JOIN
												Diagnosticos ON AtencionesDiagnosticos.IdDiagnostico = Diagnosticos.IdDiagnostico INNER JOIN
												SubclasificacionDiagnosticos ON AtencionesDiagnosticos.IdSubclasificacionDx = SubclasificacionDiagnosticos.IdSubclasificacionDx
						WHERE        (AtencionesDiagnosticos.IdAtencion = ?)",[$IdAtencion,$IdAtencion]);
		$items = [];
		foreach ($diagnosticos as $d) {
			$labs = [];
			if (!is_null($d->LAB1)&&strlen(trim($d->LAB1))>0) {
				$labs[] = [
					"codigo" => "LAB1",
					"valor"  => $d->LAB1
				];
			}

			if (!is_null($d->LAB2)&&strlen(trim($d->LAB2))>0) {
				$labs[] = [
					"codigo" => "LAB2",
					"valor"  => $d->LAB2
				];
			}

			if (!is_null($d->LAB3)&&strlen(trim($d->LAB3))>0) {
				$labs[] = [
					"codigo" => "LAB3",
					"valor"  => $d->LAB3
				];
			}

			$items[] = [
				"codigoItem"      => trim($d->CodigoCIE10),
				"labs"            => $labs,
				"tipoDiagnostico" => $d->Tipo,
				"tipoItem"        => $d->tipoItem
			];
		}
		return $items;
	}
	public static function envio_masivo($atenciones,$IdEmpleadoRegistra)
	{
		$resultado=false;
		$mensaje=null;
		$datos=null;
		$ObtenerDatosAtencionHis=self::ObtenerDatosAtencionHis($atenciones,$IdEmpleadoRegistra);
		if($ObtenerDatosAtencionHis['resultado'])
		{
			$EnvioTramaHIS=self::EnvioTramaHIS($ObtenerDatosAtencionHis['datos'],$IdEmpleadoRegistra);
			if($EnvioTramaHIS['resultado'])
			{
				$datos=$EnvioTramaHIS['datos'];
				$resultado=true;
			}
			else
				$mensaje=$EnvioTramaHIS['mensaje'];
		}
		else
			$mensaje=$ObtenerDatosAtencionHis['mensaje'];
		return ['resultado'=>$resultado,'mensaje'=>$mensaje,'datos'=>$datos];
	}
	public static function EnvioTramaHIS($Trama,$IdEmpleadoRegistra)
	{
		$resultado=false;
		$mensaje=null;
		$datos=null;
		//dd(json_encode($Trama));
		$pagina=RS_Funciones::LeerPagina(self::$url_envio_his,'POST',$Trama,self::$HttpHeader);
		$httpCode=RS_Funciones::retornar_httpCode($pagina[0]);
		if($httpCode==200)
		{
			$array=json_decode($pagina[1], true);
			if($array['codigo']=='0000')
			{
				$ActualizarAtencionRespuestaTrama=self::ActualizarAtencionRespuestaTrama($array['data'],$IdEmpleadoRegistra);
				$datos=$array['data'];
				$resultado=true;
			}
			else
				$mensaje="Error: ".$pagina[1];
		}
		else
			$mensaje="ERROR: ".$pagina[0];
		return ['resultado'=>$resultado,'mensaje'=>$mensaje,'datos'=>$datos];
	}
	public static function actualiza_estado_his($IdAtencion,$Estado,$Observacion,$fecha,$IdEmpleado)
	{
		$resultado=false;
		$mensaje=null;
		$IdAtencionRevisionHIS=null;
		$tsql = "exec rs_AtencionesRevisionHIS ?,?,?,?,?,?,?,?";
		$resultadop = '';
		$mensajep = '';		
		$getReviews = DB::connection()->getPdo()->prepare($tsql);
		$getReviews->bindValue(1, $IdAtencion, PDO::PARAM_STR);
		$getReviews->bindValue(2, $Estado, PDO::PARAM_STR);
		$getReviews->bindValue(3, $Observacion, PDO::PARAM_STR);
		$getReviews->bindValue(4, $fecha, PDO::PARAM_STR);
		$getReviews->bindValue(5, $IdEmpleado, PDO::PARAM_STR);
		$getReviews->bindParam(6, $resultadop, PDO::PARAM_STR, 1);
		$getReviews->bindParam(7, $mensajep, PDO::PARAM_STR, 150);
		$getReviews->bindParam(8, $IdAtencionRevisionHIS, PDO::PARAM_STR, 50);
		if($getReviews->execute())
		{
			if($resultadop==1)
				$resultado=true;
			else
				$mensaje=$mensajep;
		}
		else
			$mensaje = $getReviews->errorInfo()[2];
		return ['resultado'=>$resultado,'mensaje'=>$mensaje,'IdAtencionRevisionHIS'=>$IdAtencionRevisionHIS];
	}
	public static function ActualizarAtencionRespuestaTrama($filas,$IdEmpleadoRegistra)
	{
		$resultado=false;
		$mensaje=null;
		$datos=null;
		foreach($filas as $fila)
		{
			$fu=DB::update("UPDATE AtencionesHis
					SET estado =?
					, descripcion =?
					, idCita =?
					, fecha=GETDATE()
				WHERE (IdAtencion=?)",[
					$fila['estado']
					,$fila['mensaje']
					,$fila['idCita']
					,$fila['idExterno']
				]);
			if($fu==0)
				DB::insert("INSERT INTO AtencionesHis(
					IdAtencion
					, estado
					, descripcion
					, idCita
					, fecha)
				VALUES (?,?,?,?,GETDATE())", [
					$fila['idExterno']
					,$fila['estado']
					,$fila['mensaje']
					,$fila['idCita']]);
			if($fila['estado']==2)
			{
				$actualiza_estado_his=self::actualiza_estado_his(
					$fila['idExterno']
					,4
					,$fila['idExterno']
					,date('Ymd H:i:s')
					,$IdEmpleadoRegistra
				);
				
			}
		}
		$resultado=true;
		return ['resultado'=>$resultado,'mensaje'=>$mensaje,'datos'=>$datos];
	}
}