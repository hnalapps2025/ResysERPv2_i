<?php
namespace App;

use SoapClient;
use Illuminate\Support\Facades\DB;

class RS_SIS
{
	public static function ConsultaSIS($TipoDocumento,$NumeroDocumento)
	{
		$webService=new SoapClient('http://app.sis.gob.pe/sisWSAFI/Service.asmx?WSDL');
		$r_sis_session=$webService->GetSession(array("strUsuario"=>'HNAL','strClave'=>'45-hnAL@s1s23'));
		$r_sis_data=$webService->ConsultarAfiliadoFuaE(array('intOpcion'=>1,'strAutorizacion'=>$r_sis_session->GetSessionResult,'strDni'=>'09618951','strTipoDocumento'=>$TipoDocumento==2?3:$TipoDocumento,'strNroDocumento'=>$NumeroDocumento,'strDisa'=>'','strTipoFormato'=>'','strNroContrato'=>'','strCorrelativo'=>''));
		return $r_sis_data;
	}
	
	public static function ConsultarAfiliacionesTemporales($strApPaterno,$strApMaterno,$strNombres,$strIdSexo,$strFecNac)
	{
		$resultado=false;
		$mensaje='';
		$datos=null;
		try{
			$webService=new SoapClient('http://app.sis.gob.pe/sisWSAFI/Service.asmx?WSDL');
			$r_sis_session=$webService->GetSession(array("strUsuario"=>'HNAL','strClave'=>'45-hnAL@s1s23'));
			$datos=$webService->ConsultarAfiliacionesTemporales(['strAutorizacion'=>$r_sis_session->GetSessionResult,'strDni'=>'09618951','strApPaterno'=>$strApPaterno,'strApMaterno'=>$strApMaterno,'strNombres'=>$strNombres,'strIdSexo'=>$strIdSexo,'strFecNac'=>$strFecNac]);
			$resultado=true;
		}catch(\Exception $e){
			$mensaje=$e->getMessage();
		}
		return ['resultado'=>$resultado,'mensaje'=>$mensaje,'datos'=>$datos];
	}
	public static function ObtenerCookiePrincipalSISContingencia()
	{
		$resultado=false;
		$mensaje='';
		$pagina=[];
		$pagina1=RS_Funciones::LeerPagina('https://contingenciasis.minsa.gob.pe/frmConsultaContingencia.aspx','GET',[],[]);
		if(count($pagina1)==2)
		{
			$pagina=$pagina1;
			$resultado=true;
		}
		else
			$mensaje="Fallo al Obtener Cookies iniciales";
		return ['resultado'=>$resultado,'mensaje'=>$mensaje,'pagina'=>$pagina];
	}
	public static function ConsultaSisContingenciaXDocumento($cboTipoDocumento,$txtNroDocumento)
	{
		$resultado=false;
		$mensaje='';
		$datos=null;
		$ObtenerCookiePrincipalSISContingencia=RS_SIS::ObtenerCookiePrincipalSISContingencia();
		if($ObtenerCookiePrincipalSISContingencia['resultado'])
		{
			$PostFields=[
				'__VIEWSTATE'=>RS_Funciones::BuscarCSRF($ObtenerCookiePrincipalSISContingencia['pagina'][1],'__VIEWSTATE" value="',0,'"')
				,'__VIEWSTATEGENERATOR'=>RS_Funciones::BuscarCSRF($ObtenerCookiePrincipalSISContingencia['pagina'][1],'__VIEWSTATEGENERATOR" value="',0,'"')
				,'__EVENTVALIDATION'=>RS_Funciones::BuscarCSRF($ObtenerCookiePrincipalSISContingencia['pagina'][1],'__EVENTVALIDATION" value="',0,'"')
				,'hdnTipo'=>2
				,'cboTipoBusqueda'=>2
				,'cboTipoDocumento'=>$cboTipoDocumento
				,'txtNroDocumento'=>$txtNroDocumento
				,'btnConsultar'=>'Consultar'
			];
			$pagina1=RS_Funciones::LeerPagina('https://contingenciasis.minsa.gob.pe/frmConsultaContingencia.aspx','POST',$PostFields,[]);
			if(count($pagina1)==2)
			{
				$datos=RS_SIS::tablaAfiliaciones2array(RS_Funciones::BuscarCSRF($pagina1[1],'id="dgConsulta',-139,'</div>'));
				//$datos=$filas;
				$resultado=true;
			}
			else
				$mensaje="Fallo al Obtener Datos de SIS Contingencia";
		}
		else
			$mensaje=$ObtenerCookiePrincipalSISContingencia['mensaje'];
		return ['resultado'=>$resultado,'mensaje'=>$mensaje,'datos'=>$datos];
	}
	public static function tablaAfiliaciones2array($tablaHTML)
	{
		$tabla=[];
		preg_match_all("/<tr.*?>(.*?)<\/[\s]*tr>/s", $tablaHTML, $filas);
		unset($filas[1][count($filas[1])-1]);
		foreach($filas[1] as $fila){
			if(strpos($fila,'<td'))
				preg_match_all("/<td.*?>(.*?)<\/[\s]*td>/s", $fila, $columnas);
			else
				preg_match_all("/<th.*?>(.*?)<\/[\s]*th>/s", $fila, $columnas);
			foreach($columnas[1] as $key=>$valor)
				$filax[$key]=$valor;
			array_push($tabla,$filax);
		}
		return $tabla;
	}
	
	public static function VerificaSisGalenhos($TipoDocumento,$NumeroDocumento,$IdSiaSis,$SisCodigo)
	{
		$resultado=false;
		$mensaje=null;
		$datos=['IdSiaSis'=>$IdSiaSis,'SisCodigo'=>$SisCodigo];
		if(DB::select("select count(*) as cont from SIGH_EXTERNA.dbo.SisFiliaciones where idSiasis=? and Codigo=?",[$IdSiaSis,$SisCodigo])[0]->cont==0)
			try{
				$r_sis_data=RS_SIS::ConsultaSIS($TipoDocumento,$NumeroDocumento);
				if($r_sis_data->ConsultarAfiliadoFuaEResult->IdError==0&&$r_sis_data->ConsultarAfiliadoFuaEResult->Estado=='ACTIVO')
				{
					$data_sis=$r_sis_data->ConsultarAfiliadoFuaEResult;
					DB::insert('INSERT INTO SIGH_EXTERNA.dbo.SisFiliaciones
								 (idSiasis, Codigo, AfiliacionDisa, AfiliacionTipoFormato, AfiliacionNroFormato, DocumentoTipo, CodigoEstablAdscripcion, AfiliacionFecha, Paterno, Materno, Pnombre, Genero, Fnacimiento, IdDistritoDomicilio, Estado,DocumentoNumero)
								VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[$data_sis->IdNumReg,$data_sis->Tabla,$data_sis->Disa,$data_sis->TipoFormato,$data_sis->NroContrato,$data_sis->TipoDocumento,'00'.$data_sis->EESS,$data_sis->FecAfiliacion,$data_sis->ApePaterno,$data_sis->ApeMaterno,$data_sis->Nombres,$data_sis->Genero,$data_sis->FecNacimiento,$data_sis->EESSUbigeo,0,$data_sis->NroDocumento]);
					$datos=['IdSiaSis'=>$data_sis->IdNumReg,'SisCodigo'=>$data_sis->Tabla];
					$resultado=true;
				}
				elseif($r_sis_data->ConsultarAfiliadoFuaEResult->IdError!=0)
					$mensaje='La web service de SIS retorno el Error: '.$r_sis_data->ConsultarAfiliadoFuaEResult->IdError;
				else
					$mensaje='La web service de SIS retorno el Estado: '.$r_sis_data->ConsultarAfiliadoFuaEResult->Estado;
			}
			catch (\Exception $e){
				$mensaje=$e->getMessage();
			}
		else
			$resultado=true;
		return ['resultado'=>$resultado,'mensaje'=>$mensaje,'datos'=>$datos];
	}
	public static function ConvertirRegistroPaciente($registroSis)
	{
		return(object)[
			'paciente_nuevo'=>1,
			'IdpacienteTriaje'=>null,
			'ApellidoPaterno'=>$registroSis->ApePaterno,
			'ApellidoMaterno'=>$registroSis->ApeMaterno,
			'PrimerNombre'=>$registroSis->Nombres,
			'FechaNacimiento'=>date("Y-m-d",strtotime($registroSis->FecNacimiento)),
			'IdTipoSexo'=>$registroSis->Genero==0?2:1,
			'IdPaisNacimiento'=>$registroSis->TipoDocumento==1?166:'',
			'IdPaciente'=>null,
			'UsoWebReniec'=>1,
			'IdDistritoNacimiento'=>$registroSis->EESSUbigeo,
			'IdDistritoDomicilio'=>$registroSis->EESSUbigeo,
			'DireccionDomicilio'=>null,
			'Telefono'=>null,
			'IdEstadoCivil'=>2,
			'IdGradoInstruccion'=> 99,//
			'IdTipoOcupacion'=> 3, //
			'IdReligion'=>6
		];
	}
}