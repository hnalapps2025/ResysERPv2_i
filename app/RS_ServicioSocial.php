<?php
namespace App;

use Illuminate\Support\Facades\DB;
use \PDO;

class RS_ServicioSocial
{
	public static function BuscarPaciente($IdDocIdentidad,$NroDocumento)
	{
		$resultado=false;
		$mensaje=null;
		$datos=null;
		$paciente=null;
		$verifico_sis=false;
		$datos_ws_sis=null;
		$BuscarPacienteBD=self::BuscarPacienteBD($IdDocIdentidad,$NroDocumento);
		if($BuscarPacienteBD['resultado'])
		{
			$paciente=$BuscarPacienteBD['datos'];
		}
		else
		{
			$BuscarPacienteSIS=self::BuscarPacienteSIS($IdDocIdentidad,$NroDocumento);
			if($BuscarPacienteSIS['resultado'])
			{
				$verifico_sis=true;
				$datos_ws_sis=$BuscarPacienteSIS['datos'];
				$paciente=RS_SIS::ConvertirRegistroPaciente($BuscarPacienteSIS['datos']);
			}
			else
			{
				if($IdDocIdentidad==1)
				{
					$BuscarPacienteReniec=self::BuscarPacienteReniec($IdDocIdentidad,$NroDocumento);
					if($BuscarPacienteReniec['resultado'])
					{
						$paciente=$BuscarPacienteReniec['datos'];
					}
					else
						$mensaje=$BuscarPacienteReniec['mensaje'];
				}
				else
					$mensaje=$BuscarPacienteSIS['mensaje'];
			}
		}
		if($paciente!=null)
		{
			if(!$verifico_sis)
			{
				$BuscarPacienteSIS=self::BuscarPacienteSIS($IdDocIdentidad,$NroDocumento);
				if($BuscarPacienteSIS['resultado'])
				{
					$datos_ws_sis=$BuscarPacienteSIS['datos'];
				}
				else
					$datos_ws_sis=(object)['IdError'=>-1,'Estado'=>'NO ENCONTRADO','Resultado'=>$BuscarPacienteSIS['mensaje']];
			}
			$paciente->datos_sis=self::VerificaDatosSis($datos_ws_sis);
		}
		if($paciente!=null)
		{
			$datos=$paciente;
			$resultado=true;
		}
		else
			if($mensaje==null||strlen($mensaje))
				$mensaje='No existe registros para la busqueda';
		return ['resultado'=>$resultado,'mensaje'=>$mensaje,'datos'=>$datos];
	}
	public static function VerificaDatosSis($r_sis_data)
	{
		$resultado=false;
		$mensaje=null;
		$datos=null;
		if($r_sis_data->IdError==0&&$r_sis_data->Estado=='ACTIVO')
		{
			$datos=['IdNumReg'=>$r_sis_data->IdNumReg,'Tabla'=>$r_sis_data->Tabla];
			$resultado=true;
		}
		else
			$mensaje=$r_sis_data->Resultado;
		return ['resultado'=>$resultado,'mensaje'=>$mensaje,'datos'=>$datos];
	}
	public static function BuscarPacienteBD($IdDocIdentidad,$NroDocumento)
	{
		$resultado=false;
		$mensaje=null;
		$datos=null;
		$BuscarPacientePaciente=self::BuscarPacientePaciente($IdDocIdentidad,$NroDocumento);
		if($BuscarPacientePaciente['resultado'])
		{
			$datos=$BuscarPacientePaciente['datos'];
			$resultado=true;
		}
		else
		{
			if($BuscarPacientePaciente['mensaje']=='No existe registros para la busqueda')
			{
				$BuscarPacienteTriaje=self::BuscarPacienteTriaje($IdDocIdentidad,$NroDocumento);
				if($BuscarPacienteTriaje['resultado'])
				{
					$datos=$BuscarPacienteTriaje['datos'];
					$resultado=true;
				}
				else
					$mensaje=$BuscarPacienteTriaje['mensaje'];
			}
			else
				$mensaje=$BuscarPacientePaciente['mensaje'];
		}
		return ['resultado'=>$resultado,'mensaje'=>$mensaje,'datos'=>$datos];
	}
	public static function BuscarPacientePaciente($IdDocIdentidad,$NroDocumento)
	{
		$resultado=false;
		$mensaje=null;
		$datos=null;
		$filas=DB::select("SELECT        IdPaciente, ApellidoPaterno, ApellidoMaterno, PrimerNombre, CAST(FechaNacimiento AS Date) AS FechaNacimiento, NroDocumento, Telefono, DireccionDomicilio, IdTipoSexo, IdGradoInstruccion, IdEstadoCivil, IdDocIdentidad, 
                         IdTipoOcupacion, NombrePadre, NombreMadre, NroHistoriaClinica, IdPaisNacimiento, IdDistritoNacimiento, IdDistritoDomicilio, IdEtnia, UsoWebReniec, IdIdioma, Email, IdReligion
FROM            Pacientes
WHERE        (IdDocIdentidad =?) AND (NroDocumento =?)",[$IdDocIdentidad,$NroDocumento]);		
		if(count($filas)==1)
		{
			$datos=$filas[0];
			$resultado=true;
		}
		elseif(count($filas)>0)
			$mensaje='Existe Duplicidad de Registros para esa busqueda';
		else
			$mensaje='No existe registros para la busqueda';
		return ['resultado'=>$resultado,'mensaje'=>$mensaje,'datos'=>$datos];
	}
	public static function BuscarPacienteTriaje($IdDocIdentidad,$NroDocumento)
	{
		$resultado=false;
		$mensaje=null;
		$datos=null;
		$filas=DB::select("SELECT *
                            FROM Tab_PacienteTriaje
                            WHERE (IdDocIdentidad =?) AND (NroDocumento =?)",[$IdDocIdentidad,$NroDocumento]);		
		if(count($filas)==1)
		{
			$datos=$filas[0];
			$resultado=true;
		}
		elseif(count($filas)>0)
			$mensaje='Existe Duplicidad de Registros para esa busqueda';
		else
			$mensaje='No existe registros para la busqueda';
		return ['resultado'=>$resultado,'mensaje'=>$mensaje,'datos'=>$datos];
	}
	public static function BuscarPacienteSIS($IdDocIdentidad,$NroDocumento)
	{
		$resultado=false;
		$mensaje=null;
		$datos=null;
		try{
			$r_sis_data=RS_SIS::ConsultaSIS($IdDocIdentidad,$NroDocumento);
			if($r_sis_data->ConsultarAfiliadoFuaEResult->IdError==0)
			{
				$datos=$r_sis_data->ConsultarAfiliadoFuaEResult;
				$resultado=true;
			}
			else
				$mensaje=$r_sis_data->ConsultarAfiliadoFuaEResult->Resultado;
		}
		catch (\Exception $e){
			$mensaje=$e->getMessage();
		}
		return ['resultado'=>$resultado,'mensaje'=>$mensaje,'datos'=>$datos];
	}
	public static function BuscarPacienteSisfho($IdDocIdentidad,$NroDocumento)
	{
		$resultado=false;
		$mensaje=null;
		$datos=null;
		$in_doc_nacimiento=RS_WebServicesMIDIS::ConvertirTipoDocumentoGalenhos($IdDocIdentidad);
		if($in_doc_nacimiento!=null)
		{
			$getIntegrantePublico=RS_WebServicesMIDIS::getIntegrantePublico($in_doc_nacimiento,$NroDocumento);
			if($getIntegrantePublico['resultado'])
			{
				$datos=$getIntegrantePublico['datos'];
				$resultado=true;
			}
			else
				$mensaje=$getIntegrantePublico['mensaje'];
		}
		else
			$mensaje='Tipo de Documento no existe en SISFHO';
		return ['resultado'=>$resultado,'mensaje'=>$mensaje,'datos'=>$datos];
	}
	public static function BuscarPacienteReniec($IdDocIdentidad,$NroDocumento)
	{
		$resultado=false;
		$mensaje=null;
		$datos=null;
		$result=RS_Reniec::ConsultaReniec($NroDocumento,session("IdEmpleado"),\Request::getRequestUri(),'RS_ServicioSocial');
		if($result!=null)
		{
			if($result->obtenerDatosCompletosResult->string[0]=='0000')
			{
				$datos=RS_Reniec::ConvertirRegistroPaciente($result->obtenerDatosCompletosResult);
				$resultado=true;
			}
			else
				$mensaje=strlen($result->obtenerDatosCompletosResult->string[1])>0?$result->obtenerDatosCompletosResult->string[1]:'No se encuentra registros en RENIEC';
		}
		else
			$mensaje='Tipo de Documento no existe en SISFHO';
		return ['resultado'=>$resultado,'mensaje'=>$mensaje,'datos'=>$datos];
	}
	public static function GuardarPaciente($request)
	{
		$resultado=false;
		$mensaje=null;
		$IdPaciente=null;
		$filas=DB::select("select IdPaciente from Pacientes where IdDocIdentidad=? and NroDocumento=?",[$request->IdDocIdentidad,$request->NroDocumento]);
		$cont=count($filas);
		if($cont==1)
		{
			DB::update("UPDATE Pacientes 
						SET IdDistritoNacimiento=?,
							IdPaisNacimiento=?,
							IdDistritoDomicilio=?,
							DireccionDomicilio=?,
							IdEstadoCivil=?,
							IdGradoInstruccion=?,
							IdTipoOcupacion=?,
							IdReligion=?,
							Telefono=?,
							IdEtnia=?,
							IdIdioma=?
						WHERE IdPaciente=?",
						[$request->IdDistritoNacimiento,
						 $request->IdPaisNacimiento,
						 $request->IdDistritoDomicilio,
						 $request->DireccionDomicilio,
						 $request->IdEstadoCivil,
						 $request->IdGradoInstruccion,
						 $request->IdTipoOcupacion,
						 $request->IdReligion,
						 $request->Telefono,
						 $request->IdEtnia,
						 $request->IdIdioma,
						 $filas[0]->IdPaciente]);
			$request->paciente_nuevo=2;
			$IdPaciente=$filas[0]->IdPaciente;
			$resultado=true;
		}
		elseif($cont==0)
		{
			$tsql = "exec rs_crea_paciente_emergencia ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?";
			$resultado_p='';
			$mensaje_p='';
			$IdPaciente_p='';
			$request->paciente_nuevo=1;						
			$getReviews =DB::connection()->getPdo()->prepare($tsql);
			$getReviews->bindValue(1,$request->ApellidoPaterno,PDO::PARAM_STR);
			$getReviews->bindValue(2,$request->ApellidoMaterno,PDO::PARAM_STR);
			$getReviews->bindValue(3,$request->Nombres,PDO::PARAM_STR);
			$getReviews->bindValue(4,$request->FechaNacimiento,PDO::PARAM_STR);
			$getReviews->bindValue(5,$request->IdTipoSexo,PDO::PARAM_STR);
			$getReviews->bindValue(6,$request->IdDocIdentidad,PDO::PARAM_STR);
			$getReviews->bindValue(7,$request->NroDocumento,PDO::PARAM_STR);
			$getReviews->bindValue(8,$request->IdDistritoNacimiento,PDO::PARAM_STR);//
			$getReviews->bindValue(9,$request->IdPaisNacimiento,PDO::PARAM_STR);
			$getReviews->bindValue(10,$request->IdDistritoDomicilio,PDO::PARAM_STR);
			$getReviews->bindValue(11,$request->IdGradoInstruccion,PDO::PARAM_STR);
			$getReviews->bindValue(12,$request->IdTipoOcupacion,PDO::PARAM_STR);
			$getReviews->bindValue(13,$request->DireccionDomicilio,PDO::PARAM_STR);
			$getReviews->bindValue(14,$request->IdEtnia,PDO::PARAM_STR);//etnia 80 mestizo
			$getReviews->bindValue(15,$request->IdIdioma,PDO::PARAM_STR);//Idioma 101 español
			$getReviews->bindValue(16,$request->IdReligion,PDO::PARAM_STR);
			$getReviews->bindValue(17,1,PDO::PARAM_STR);//Tipo Numeracion
			$getReviews->bindValue(18,$request->Telefono,PDO::PARAM_STR);//Telefono
			$getReviews->bindValue(19,$request->IdEstadoCivil,PDO::PARAM_STR);//Estado Civil
			$getReviews->bindValue(20,$request->UsoWebReniec,PDO::PARAM_STR);
			$getReviews->bindValue(21,0,PDO::PARAM_STR);//Forzar
			$getReviews->bindParam(22,$resultado_p,PDO::PARAM_STR,1);
			$getReviews->bindParam(23,$mensaje_p,PDO::PARAM_STR,150);
			$getReviews->bindParam(24,$IdPaciente_p,PDO::PARAM_STR,50);
			if($getReviews->execute())
			{
				if($resultado_p==1)
				{
					$IdPaciente=$IdPaciente_p;
					$resultado=true;
				}
				else
					$mensaje=$mensaje_p;
			}
			else
				$mensaje=$getReviews->errorInfo()[2];
		}
		else
			$mensaje='Existe Duplicidad de Registros para Pacientes';
		return ['resultado'=>$resultado,'mensaje'=>$mensaje,'IdPaciente'=>$IdPaciente];
	}
	public static function CreaAtencion($paciente_nuevo,$IdPaciente,$fecha,$IdOrigenAtencion,$IdServicio,$IdMedico,$IdTipoGravedad
			,$IdFuenteFinanciamiento,$IdTipoFinanciamiento,$IdSiaSis,$SisCodigo,$NombreAcompaniante,$TelefonoAcompaniante,$Categoria
			,$IdEmpleado,$IP)
	{
		$resultado=false;
		$mensaje=null;
		$IdCuentaAtencion=null;
		try{
			$tsql = "exec rs_crea_atencion_ServicioSocial ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?";
			$resultado_p='';
			$mensaje_p='';
			$IdCuentaAtencion_p='';
			$getReviews =DB::connection()->getPdo()->prepare($tsql);
			$getReviews->bindValue(1,$paciente_nuevo,PDO::PARAM_STR);
			$getReviews->bindValue(2,$IdPaciente,PDO::PARAM_STR);
			$getReviews->bindValue(3,$fecha,PDO::PARAM_STR);
			$getReviews->bindValue(4,$IdOrigenAtencion,PDO::PARAM_STR);
			$getReviews->bindValue(5,$IdServicio,PDO::PARAM_STR); //Servicio
			$getReviews->bindValue(6,$IdMedico,PDO::PARAM_STR); //Medico
			$getReviews->bindValue(7,$IdTipoGravedad,PDO::PARAM_STR);
			$getReviews->bindValue(8,$IdFuenteFinanciamiento,PDO::PARAM_STR);
			$getReviews->bindValue(9,$IdTipoFinanciamiento,PDO::PARAM_STR);
			$getReviews->bindValue(10,$IdSiaSis,PDO::PARAM_STR);
			$getReviews->bindValue(11,$SisCodigo,PDO::PARAM_STR);
			$getReviews->bindValue(12,$NombreAcompaniante,PDO::PARAM_STR);
			$getReviews->bindValue(13,$TelefonoAcompaniante,PDO::PARAM_STR);
			$getReviews->bindValue(14,$IdEmpleado,PDO::PARAM_STR);
			$getReviews->bindValue(15,$IP,PDO::PARAM_STR);
			$getReviews->bindParam(16,$resultado_p,PDO::PARAM_STR,1);
			$getReviews->bindParam(17,$mensaje_p,PDO::PARAM_STR,150);
			$getReviews->bindParam(18,$IdCuentaAtencion_p,PDO::PARAM_STR,50);
			if($getReviews->execute()) {
				if($resultado_p==1)
				{					
					$NumFichaSocial=DB::selectone("select max(NumFichaSocial)+1 as NumFichaSocial from SigesaFichaSocialDocumento_old")->NumFichaSocial;
					DB::insert("INSERT INTO SigesaFichaSocialDocumento_old(NumFichaSocial,IdPaciente,IdCuentaAtencion,FechaRegistro,Categoria,CodAsisSocial)
	values(?,?,?,?,?,?)",[$NumFichaSocial,$IdPaciente,$IdCuentaAtencion_p,$fecha,$Categoria,$IdEmpleado]);
					$IdCuentaAtencion=$IdCuentaAtencion_p;
					$resultado=true;
				}
				else
					$mensaje=$mensaje_p;
			}
			else
				$mensaje=$getReviews->errorInfo()[2];
		}catch(\Exception $e){
			$mensaje=$e->getMessage();
		}
		return ['resultado'=>$resultado,'mensaje'=>$mensaje,'IdCuentaAtencion'=>$IdCuentaAtencion];
	}
	public static function TablaHisDiario($fecha,$IdEmpleado)
	{
		$resultado=false;
		$mensaje=null;
		$IdCuentaAtencion=null;
		/////////////////////////////////
		$tsql = "SELECT c.IdPaciente,
				                a.FechaIngreso,
								YEAR(c.Fecha) [Anio],
								MONTH(c.Fecha) [Mes],
								DAY(c.Fecha) [Dia],
								CASE WHEN p.NroDocumento IS NULL THEN '' ELSE p.NroDocumento END [NroDocumento],
								RIGHT('000' + CONVERT(VARCHAR(8), p.NroHistoriaClinica), 7) [NroHistoriaClinica],
								RIGHT(p.NroHistoriaClinica, 2) [Lote],
								LTRIM(RTRIM(UPPER(p.ApellidoPaterno + ' ' + p.ApellidoMaterno + ' ' + ISNULL(p.PrimerNombre, '') + ' ' + ISNULL(p.SegundoNombre, '') + ' ' + ISNULL(p.TercerNombre, '')))) [Paciente],
								c.HoraInicio [HoraInicio],
								CONVERT(VARCHAR(10), c.FechaSolicitud, 23) [FechaSolicitud],
								CASE c.EsCitaAdicional WHEN 0 THEN 'NO' ELSE 'SI' END [EsAdicional],
								CASE c.IdEstadoCita WHEN 4 THEN 'PAGADA' ELSE 'NO PAGADA' END [IdEstadoCita],
								LTRIM(RTRIM(ff.Descripcion)) [Financiamiento],
								p.IdEtnia [IdEtnia],
								CASE WHEN p.IdDistritoDomicilio IS NULL THEN '' ELSE p.IdDistritoDomicilio END [IdDistritoDomicilio],
								UPPER(CASE WHEN dep_proc.Nombre IS NULL THEN '' ELSE dep_proc.Nombre END) [Departamento],
								UPPER(CASE WHEN prov_proc.Nombre IS NULL THEN '' ELSE prov_proc.Nombre END) [Provincia],
								UPPER(CASE WHEN dist_proc.Nombre IS NULL THEN '' ELSE dist_proc.Nombre END) [Distrito],
								CONVERT(VARCHAR(3), a.Edad) + ' ' + te.Descripcion [Años],
								CONVERT(VARCHAR(3), a.Edad) + ' ' + te.Descripcion [Meses],
								CONVERT(VARCHAR(3), a.Edad) + ' ' + te.Descripcion [Dias],
								CASE p.IdTipoSexo WHEN 1 THEN 'M' ELSE 'F' END [Sexo],
								em.ApellidoPaterno + ' ' + em.ApellidoMaterno + ' ' + em.Nombres [Medico],
								CASE t.IdTipoTurnoRef WHEN 1 THEN 'MAÑANA' WHEN 2 THEN 'TARDE' WHEN 3 THEN 'NOCHE' ELSE '' END [Turno],
								CASE WHEN (SELECT a1.FechaIngreso 
								           FROM Atenciones a1
										   WHERE a1.IdAtencion = a.IdAtencion
										   AND a1.idEstadoAtencion != 0) = hc.FechaCreacion THEN 'N' ELSE 'C' END [EnEstablecimiento],
								CASE WHEN (SELECT COUNT(s1.codigoServicioSuSalud)
								           FROM Atenciones a1 
										   INNER JOIN Servicios s1
										   ON a1.IdServicioIngreso = s1.IdServicio
										   WHERE a1.IdTipoServicio = 1
										   AND a1.idEstadoAtencion != 0
										   AND a1.IdPaciente = a.IdPaciente
										   AND s1.codigoServicioSuSalud = s.codigoServicioSuSalud) = 1 THEN 'N' ELSE 'C' END [EnServicio],
										   s.Nombre [Consultorio],
								rtrim(ltrim(em.DNI)) [DNI_Medico],
								s.codigoServicioSuSalud [UPS],
								(SELECT u.Descripcion
								 FROM SuSalud_ups u
								 WHERE u.Codigo LIKE s.codigoServicioSuSalud) [UPS_desc],
								CONVERT(varchar,p.FechaNacimiento,103) FechaNacimiento
						 FROM Atenciones a
						 INNER JOIN Pacientes p ON a.IdPaciente = p.IdPaciente
						 INNER JOIN HistoriasClinicas hc ON p.NroHistoriaClinica = hc.NroHistoriaClinica
						 LEFT OUTER JOIN Citas c ON c.IdAtencion = a.IdAtencion
						 INNER JOIN FuentesFinanciamiento ff ON a.idFuenteFinanciamiento = ff.IdFuenteFinanciamiento
						 INNER JOIN TiposEdad te ON a.IdTipoEdad = te.IdTipoEdad
						 LEFT JOIN Distritos dist_proc ON p.IdDistritoDomicilio = dist_proc.IdDistrito
						 INNER JOIN Provincias prov_proc ON dist_proc.IdProvincia = prov_proc.IdProvincia
						 INNER JOIN Departamentos dep_proc ON prov_proc.IdDepartamento = dep_proc.IdDepartamento
						 INNER JOIN Medicos m ON a.IdMedicoIngreso = m.IdMedico
						 INNER JOIN Empleados em ON m.IdEmpleado = em.IdEmpleado
						 LEFT OUTER JOIN ProgramacionMedica pm ON c.IdProgramacion = pm.IdProgramacion
						 LEFT OUTER JOIN Turnos t ON pm.IdTurno = t.IdTurno
						 INNER JOIN Servicios s ON a.IdServicioIngreso = s.IdServicio
						 WHERE a.IdTipoServicio=18 and convert(date,a.FechaIngreso) = CONVERT(DATE,?) ORDER BY c.IdEspecialidad, Medico, Turno, Paciente ASC";
		$filas=DB::select($tsql,[$fecha]);
		if(count($filas)>0)
		{
			$c="<table width='100%'><tbody><tr>
								<td colspan='2' style='font-size:8px;font-weight: bold;' width='6%' height='25px'>LOTE</td>
								<td rowspan='4' style='border-collapse: collapse;' width='9%' height='100px'>
								<table style='border-collapse: collapse;' width='100%' height='108px' border='1'> 
								<tbody>
								<tr>
								<td style='font-size:8px; text-align: center;' width='100%' height='20%'></td>
								</tr>
								<tr>
								<td style='font-size:8px; text-align: center; font-weight: bold; ' width='100%' height='20%'>".date('d/m/Y',strtotime($filas[0]->FechaIngreso))."
								</td>
								</tr>
								<tr> 
								<td style='font-size:8px; text-align: center; font-weight: bold; ' width='100%' height='20%'>".date("d/m/Y")."
								</td>
								</tr>
								<tr>
								<td style='font-size:8px; text-align: center; font-weight: bold; ' width='100%' height='20%'></td>
								</tr>
								</tbody>
								</table>
								</td>
								<td colspan='16' width='65%'></td>
								<td rowspan='3' colspan='4' width='24%'>
								<table style='border-collapse: collapse;' width='100%' height='80px' border='1'> 
								<tbody>
								<tr>
								<td style='font-size:8px; text-align: center; font-weight: bold; ' width='100%' height='10%'>FIRMA Y SELLO DE RESPONSABLE</td>
								</tr>
								<tr>
								<td width='100%' height='90%'></td>
								</tr>
								</tbody>
								</table>
								</td>
								</tr>
								<tr>
								<td colspan='2' style='font-size:8px;' width='6%' height='20px'>FECHA</td>
								<td colspan='16' style='font-size:16px; font-weight: bold; text-align: center;' width='65%'>HOSPITAL NACIONAL ARZOBISPO LOAYZA</td>
								</tr>
								<tr>
								<td colspan='2' style='font-size:6px;' width='6%' height='20px'>FECHA PROCES</td>
								<td colspan='16' style='font-size:14px; text-align: center;' width='65%'>OF. DE ESTADISTICA E INFORMATICA</td>
								</tr>
								<tr>
								<td colspan='2' style='font-size:6px;' width='6%' height='20px'>DNI DIGITADOR</td>
								<td colspan='16' style='font-size:12px; text-align: center;' width='65%'>REGISTRO DIARIO DE ATENCION Y OTRAS ACTIVIDADES DE SALUD</td>
								<td width='3%'></td>
								<td width='3%'></td>
								<td colspan='2' width='21%'>
								<table style='border-collapse: collapse;' width='130px' height='20px' border='1'> 
								<tbody width='100%'>
								<tr width='100%'>
								<td colspan='2' style='font-size:8px; text-align: center; font-weight: bold; ' width='100%' height='10%'>TURNO</td>
								</tr>
								<tr width='100%'>
								<td colspan='2' style='font-size:10px; text-align: center;font-weight: bold;' width='100%' height='90%'>".$filas[0]->Turno."</td>
								</tr>
								</tbody>
								</table>

								</td>
								</tr>
								</tbody>
								</table>";
			$c.="<table border='1' width='100%' style='border-collapse: collapse;'> 
							<thead>
							<tr>
							<td style='border-top: white 1px solid; border-bottom: white 1px solid; border-left: white 1px solid ;'></td>
							<td style='font-size:8px; text-align: center; font-weight: bold;'>AÑO</td>
							<td style='font-size:8px; text-align: center; font-weight: bold;'>MES</td>
							<td colspan='6' style='font-size:8px; font-weight: bold; text-align: center;'>NOMBRE DE ESTABLECIMIENTO DE SALUD (PRESS)</td>
							<td colspan='5' style='font-size:8px; text-align: center; font-weight: bold;'>UNIDAD PRODUCTORA DE SERVICIOS (UPSS)</td>
							<td colspan='8' style='font-size:8px; font-weight: bold; text-align: center;'>NOMBRE DE RESPONSABLE DE LA ATENCION</td>
							</tr>
							<tr>
							<td style='border-top: white 1px solid; border-bottom: white 1px solid; border-left: white 1px solid ;' height='14px'></td>
							<td style='font-size:8px; text-align: center;font-weight: bold;'>".date('Y',strtotime($filas[0]->FechaIngreso))."</td>
							<td style='font-size:8px; text-align: center;font-weight: bold;'>".date('m',strtotime($filas[0]->FechaIngreso))."</td>
							<td colspan='6' style='font-size:8px; font-weight: bold; text-align: center;'>HNAL</td>
							<td colspan='5' style='font-size:8px; text-align: center; font-weight: bold;'>".$filas[0]->UPS_desc."</td>
							<td colspan='8' style='font-size:8px; font-weight: bold; text-align: center;'>".$filas[0]->DNI_Medico." ".$filas[0]->Medico."</td>
							</tr>
							<tr>
							<td rowspan='2' style='border-top: white 1px solid; border-bottom: white 1px solid; border-left: white 1px solid ;'> </td>
							<td rowspan='2' style='font-size:8px; text-align: center; font-weight: bold;'>DIA</td>
							<td style='font-size:8px; text-align: center; font-weight: bold;'>DNI</td>
							<td style='font-size:8px; text-align: center;font-weight: bold;'>FINANC.</td>
							<td style='font-size:7px; text-align: center;font-weight: bold;'>DISTRITO DE PROC.</td>
							<td rowspan='2' style='font-size:8px; text-align: center; font-weight: bold;'>EDAD</td>
							<td rowspan='2' style='font-size:8px; text-align: center; font-weight: bold; writing-mode: vertical-lr; transform: rotate(180deg);'>SEXO</td>
							<td colspan='2' rowspan='2' style='font-size:8px; text-align: center; font-weight: bold;'>PERIMETRO CEFALICO Y ABDOMINAL</td>
							<td colspan='2' rowspan='2' style='font-size:8px; text-align: center; font-weight: bold;'>EVALUACION ANTROPOMETRICA HEMOGLOBINA</td>
							<td rowspan='2' style='font-size:8px; text-align: center; font-weight: bold; writing-mode: vertical-lr; transform: rotate(180deg);'>ESTA</td>
							<td rowspan='2' style='font-size:8px; text-align: center; font-weight: bold; writing-mode: vertical-lr; transform: rotate(180deg);'>SERV.</td>
							<td colspan='2' rowspan='2'style='font-size:8px; text-align: center;'>DIAGNOSTICO MOTIVO DE CONSULTA </BR> Y O ACTIVIDAD DE SALUD</td>
							<td colspan='3' style='font-size:8px; text-align: center; font-weight: bold;'>TIPO DE DIAGNOS</td>
							<td colspan='3' style='font-size:8px; text-align: center; font-weight: bold;'>LAB</td>
							<td rowspan='2' style='font-size:8px; text-align: center; font-weight: bold;'>COD. CIE/CPT</td>
							</tr>

							<tr>
							<td style='font-size:8px; text-align: center; font-weight: bold;'>HISTORIA CLINICA</td>
							<td style='font-size:8px; text-align: center; font-weight: bold;'>ETNIA</td>
							<td style='font-size:8px; text-align: center; font-weight: bold;'>CENTRO POBLADO</td>
							<td style='font-size:8px; text-align: center; font-weight: bold;'>P</td>
							<td style='font-size:8px; text-align: center; font-weight: bold;'>D</td>
							<td style='font-size:8px; text-align: center; font-weight: bold;'>R</td>
							<td style='font-size:8px; text-align: center; font-weight: bold;'>1°</td>
							<td style='font-size:8px; text-align: center; font-weight: bold;'>2°</td>
							<td style='font-size:8px; text-align: center; font-weight: bold;'>3°</td>
							</tr>
							</thead>
							<tbody>";
			foreach($filas as $i=>$fila)
			{
				$row=array_values(get_object_vars($fila));
				//dd($row);
				$c.="<tr style='border-right: white 1px solid ; border-left: white 1px solid;'>
									<td style='font-size:10px; border-right: white 1px solid; border-left: white 1px solid ;font-weight: bold;'>".($i+1)."</td>
									<td style='font-size:10px; border-right: white 1px solid; border-left: white 1px solid ;font-weight: bold;'colspan='8'>".$row[8]."</td>
									<td style='font-size:10px; border-right: white 1px solid; border-left: white 1px solid ;font-weight: bold;'colspan='5'>Fecha Nacimiento: ".$row[31]."</td>
									<td style='font-size:10px; border-right: white 1px solid; border-left: white 1px solid ;font-weight: bold;'colspan='4'>Fecha Ultimo Hb:___/___/______</td>
									<td style='font-size:10px; border-right: white 1px solid; border-left: white 1px solid ;font-weight: bold;'colspan='5'>FUR:___/___/______</td>
									</tr>

									<tr>
									<td width='2%' rowspan='6' style='font-size:10px; border-top: white 1px solid; border-bottom: white 1px solid; border-left: white 1px solid;'></td>
									<td width='3%' rowspan='6' style='font-size:8px; text-align: center; font-weight: bold;'>".$row[4]."</td>
									<td width='7%' rowspan='3' style='font-size:10px; text-align: center;font-weight: bold;'>".$row[5]."</td>
									<td width='5%' rowspan='3' style='font-size:8px; text-align: center;font-weight: bold;'>".$row[13]."</td>
									<td width='9%' rowspan='3' style='font-size:8px; text-align: center;font-weight: bold;'>".$row[18]."</td>
									<td width='6%' rowspan='6' style='font-size:8px; text-align: center;'font-weight: bold;>".$row[19]."</td>
									<td width='1%' rowspan='6' style='font-size:8px; text-align: center; font-weight: bold;'>".$row[22]."</td>
									<td width='3%' rowspan='3' style='font-size:8px; text-align: center; font-weight: bold;'>PC</td>
									<td width='3%' rowspan='3' style='font-size:8px; text-align: center; font-weight: bold;'></td>
									<td width='3%' rowspan='2' style='font-size:8px; text-align: center; font-weight: bold;'>PESO</td>
									<td width='3%' rowspan='2' style='font-size:8px; text-align: center; font-weight: bold;'></td>
									<td width='1%' rowspan='2' style='font-size:8px; text-align: center;font-weight: bold;'>N</td>
									<td width='1%' rowspan='2' style='font-size:8px; text-align: center;font-weight: bold;'>N</td>
									<td width='36%' colspan='2' style='font-size:8px; text-align: center; font-weight: bold;'></td>
									<td width='1%' style='font-size:8px; text-align: center; font-weight: bold;'>P</td>
									<td width='1%' style='font-size:8px; text-align: center; font-weight: bold;'>D</td>
									<td width='1%' style='font-size:8px; text-align: center; font-weight: bold;'>R</td>
									<td width='2%' style='font-size:8px; text-align: center; font-weight: bold;'></td>
									<td width='2%' style='font-size:8px; text-align: center; font-weight: bold;'></td>
									<td width='2%' style='font-size:8px; text-align: center; font-weight: bold;'></td>
									<td width='8%' style='font-size:8px; text-align: center; font-weight: bold;'></td>
									</tr>

									<tr>
									<td colspan='2' style='font-size:8px; text-align: center; font-weight: bold;'></td>
									<td style='font-size:8px; text-align: center; font-weight: bold;'>P</td>
									<td style='font-size:8px; text-align: center; font-weight: bold;'>D</td>
									<td style='font-size:8px; text-align: center; font-weight: bold;'>R</td>
									<td style='font-size:8px; text-align: center; font-weight: bold;'></td>
									<td style='font-size:8px; text-align: center; font-weight: bold;'></td>
									<td style='font-size:8px; text-align: center; font-weight: bold;'></td>
									<td style='font-size:8px; text-align: center; font-weight: bold;'></td>
									</tr>

									<tr>
									<td rowspan='2' style='font-size:8px; text-align: center; font-weight: bold;'>TALLA</td>
									<td rowspan='2' style='font-size:8px; text-align: center; font-weight: bold;'></td>
									<td rowspan='2' style='font-size:8px; text-align: center; font-weight: bold;'>C</td>
									<td rowspan='2' style='font-size:8px; text-align: center; font-weight: bold;'>C</td>
									<td colspan='2' style='font-size:8px; text-align: center; font-weight: bold;'></td>
									<td style='font-size:8px; text-align: center; font-weight: bold;'>P</td>
									<td style='font-size:8px; text-align: center; font-weight: bold;'>D</td>
									<td style='font-size:8px; text-align: center; font-weight: bold;'>R</td>
									<td style='font-size:8px; text-align: center; font-weight: bold;'></td>
									<td style='font-size:8px; text-align: center; font-weight: bold;'></td>
									<td style='font-size:8px; text-align: center; font-weight: bold;'></td>
									<td style='font-size:8px; text-align: center; font-weight: bold;'></td>
									</tr>

									<tr>
									<td rowspan='3' style='font-size:10px; text-align: center;font-weight: bold;'>".$row[6]."</td>
									<td rowspan='3' style='font-size:8px; text-align: center;font-weight: bold;'>".$row[14]."</td>
									<td rowspan='3' style='font-size:8px; text-align: center; font-weight: bold;'></td>
									<td rowspan='3' style='font-size:8px; text-align: center; font-weight: bold;'>PB</td>
									<td rowspan='3' style='font-size:8px; text-align: center; font-weight: bold;'></td>
									<td colspan='2' style='font-size:8px; text-align: center; font-weight: bold;'></td>
									<td style='font-size:8px; text-align: center; font-weight: bold;'>P</td>
									<td style='font-size:8px; text-align: center; font-weight: bold;'>D</td>
									<td style='font-size:8px; text-align: center; font-weight: bold;'>R</td>
									<td style='font-size:8px; text-align: center; font-weight: bold;'></td>
									<td style='font-size:8px; text-align: center; font-weight: bold;'></td>
									<td style='font-size:8px; text-align: center; font-weight: bold;'></td>
									<td style='font-size:8px; text-align: center; font-weight: bold;'></td>
									</tr>

									<tr>
									<td rowspan='2' style='font-size:8px; text-align: center; font-weight: bold;'>Hb.</td>
									<td rowspan='2' style='font-size:8px; text-align: center; font-weight: bold;'></td>
									<td rowspan='2' style='font-size:8px; text-align: center;font-weight: bold;'>R</td>
									<td rowspan='2' style='font-size:8px; text-align: center;font-weight: bold;'>R</td>
									<td colspan='2' style='font-size:8px; text-align: center; font-weight: bold;'></td>
									<td style='font-size:8px; text-align: center; font-weight: bold;'>P</td>
									<td style='font-size:8px; text-align: center; font-weight: bold;'>D</td>
									<td style='font-size:8px; text-align: center; font-weight: bold;'>R</td>
									<td style='font-size:8px; text-align: center; font-weight: bold;'></td>
									<td style='font-size:8px; text-align: center; font-weight: bold;'></td>
									<td style='font-size:8px; text-align: center; font-weight: bold;'></td>
									<td style='font-size:8px; text-align: center; font-weight: bold;'></td>
									</tr>

									<tr>
									<td colspan='2' style='font-size:8px; text-align: center; font-weight: bold;'></td>
									<td style='font-size:8px; text-align: center; font-weight: bold;'>P</td>
									<td style='font-size:8px; text-align: center; font-weight: bold;'>D</td>
									<td style='font-size:8px; text-align: center; font-weight: bold;'>R</td>
									<td style='font-size:8px; text-align: center; font-weight: bold;'></td>
									<td style='font-size:8px; text-align: center; font-weight: bold;'></td>
									<td style='font-size:8px; text-align: center; font-weight: bold;'></td>
									<td style='font-size:8px; text-align: center; font-weight: bold;'></td>
									</tr>";
			}
			$c.="</tbody></table>";
			if(strlen($c)>0)
			{
				$datos=$c;
				$resultado=true;
			}
			else
				$mensaje="Datos Vacios";
		}
		else
			$mensaje='No existe Atenciones';
		/////////////////////////////////
		return ['resultado'=>$resultado,'mensaje'=>$mensaje,'datos'=>$datos];
	}
}