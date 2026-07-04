<?php
namespace App;

use SoapClient;

class RS_WebServicesMIDIS
{
	
	/*///////Calidad
	public static $url='https://serviciosqa.sisfoh.gob.pe:472/MIDISHomeQueryServiceqa/HomeService?wsdl';
	public static $location='https://serviciosqa.sisfoh.gob.pe:472/MIDISHomeQueryServiceqa/HomeService';
	public static $entidad='1001';
	public static $usuario='usu_midis_test';
	public static $clave='ClaveNoCopiar';
	*/
	///////Produccion
	public static $url='https://servicios.sisfoh.gob.pe:444/MIDISHomeQueryService/HomeService?wsdl';
	public static $location='https://servicios.sisfoh.gob.pe:444/MIDISHomeQueryService/HomeService';
	public static $entidad='1011';
	public static $usuario='usu_mimp';
	public static $clave='M1mp_wsPGH$091216#';
	public static function ObtenerClienteGen($url,$location)
	{
		$resultado=false;
		$mensaje='';
		$cliente=null;
		try {
			$cliente=new SoapClient($url,array('trace'=>1,'stream_context' => stream_context_create(array('ssl'=>array('verify_peer'=>false,'verify_peer_name'=>false)))));
			$cliente->__setLocation($location);
			$resultado=true;
		} catch(\Exception $e) {
			$mensaje=$e->getMessage();
		}
		return ["resultado"=>$resultado,"mensaje"=>$mensaje,"cliente"=>$cliente];
	}
	public static function getHogarGen($cliente,$entidad,$usuario,$clave,$hogar)
	{
		$resultado=false;
		$mensaje='';
		$datos=null;
		try {
			$datos=$cliente->getHogar(['entidad'=>$entidad,'usuario'=>$usuario,'clave'=>$clave,'hogar'=>$hogar]);
			$resultado=true;
		} catch(\Exception $e) {
			$mensaje=$e->getMessage();
		}
		return ["resultado"=>$resultado,"mensaje"=>$mensaje,"datos"=>$datos];
	}
	
	public static function getIntegranteGen($cliente,$entidad,$usuario,$clave,$tipoDocumento,$nroDocumento)
	{
		$resultado=false;
		$mensaje='';
		$datos=null;
		try {
			$datos=$cliente->getIntegrante(['entidad'=>$entidad,'usuario'=>$usuario,'clave'=>$clave,'tipoDocumento'=>$tipoDocumento,'nroDocumento'=>$nroDocumento]);
			$resultado=true;
		} catch(\Exception $e) {
			$mensaje=$e->getMessage();
		}
		return ["resultado"=>$resultado,"mensaje"=>$mensaje,"datos"=>$datos];
	}
	public static function getIntegranteMinimalGen($cliente,$entidad,$usuario,$clave,$tipoDocumento,$nroDocumento)
	{
		$resultado=false;
		$mensaje='';
		$datos=null;
		try {
			$datos=$cliente->getIntegranteMinimal(['entidad'=>$entidad,'usuario'=>$usuario,'clave'=>$clave,'tipoDocumento'=>$tipoDocumento,'nroDocumento'=>$nroDocumento]);
			$resultado=true;
		} catch(\Exception $e) {
			$mensaje=$e->getMessage();
		}
		return ["resultado"=>$resultado,"mensaje"=>$mensaje,"datos"=>$datos];
	}
	public static function getHogarPublico($hogar)
	{
		$resultado=2;
		$mensaje='';
		$datos=null;
		try {
			$ObtenerClienteGen=RS_WebServicesMIDIS::ObtenerClienteGen(RS_WebServicesMIDIS::$url,RS_WebServicesMIDIS::$location);
			if($ObtenerClienteGen["resultado"])
			{
				$getHogarGen=RS_WebServicesMIDIS::getHogarGen($ObtenerClienteGen["cliente"],RS_WebServicesMIDIS::$entidad,RS_WebServicesMIDIS::$usuario,RS_WebServicesMIDIS::$clave,$hogar);
				if($getHogarGen["resultado"])
				{
					$datos=$getHogarGen["datos"];
					$resultado=1;
				}
				else
					$mensaje=$getHogarGen["mensaje"];
			}
			else
				$mensaje=$ObtenerClienteGen["mensaje"];
		} catch(\Exception $e) {
			$mensaje=$e->getMessage();
		}
		return ["resultado"=>$resultado,"mensaje"=>$mensaje,"datos"=>$datos];
	}
	public static function getIntegrantePublico($tipoDocumento,$nroDocumento)
	{
		$resultado=false;
		$mensaje=null;
		$datos=null;
		try {
			$ObtenerClienteGen=RS_WebServicesMIDIS::ObtenerClienteGen(RS_WebServicesMIDIS::$url,RS_WebServicesMIDIS::$location);
			if($ObtenerClienteGen["resultado"])
			{
				$getIntegranteGen=RS_WebServicesMIDIS::getIntegranteGen($ObtenerClienteGen["cliente"],RS_WebServicesMIDIS::$entidad,RS_WebServicesMIDIS::$usuario,RS_WebServicesMIDIS::$clave,$tipoDocumento,$nroDocumento);
				if($getIntegranteGen["resultado"])
				{
					$Convertir_getIntegranteGen=RS_WebServicesMIDIS::Convertir_getIntegranteGen($getIntegranteGen["datos"]->return);
					if($Convertir_getIntegranteGen['resultado'])
					{
						$datos=$Convertir_getIntegranteGen['datos'];
						$resultado=true;
					}
					else
						$mensaje=$Convertir_getIntegranteGen['mensaje'];
				}
				else
					$mensaje=$getIntegranteGen["mensaje"];
			}
			else
				$mensaje=$ObtenerClienteGen["mensaje"];
		} catch(\Exception $e) {
			$mensaje=$e->getMessage();
		}
		return ["resultado"=>$resultado,"mensaje"=>$mensaje,"datos"=>$datos];
	}
	public static function getIntegranteMinimalPublico($tipoDocumento,$nroDocumento)
	{
		$resultado=false;
		$mensaje=null;
		$datos=null;
		try {
			$ObtenerClienteGen=RS_WebServicesMIDIS::ObtenerClienteGen(RS_WebServicesMIDIS::$url,RS_WebServicesMIDIS::$location);
			if($ObtenerClienteGen["resultado"])
			{
				$getIntegranteGen=RS_WebServicesMIDIS::getIntegranteMinimalGen($ObtenerClienteGen["cliente"],RS_WebServicesMIDIS::$entidad,RS_WebServicesMIDIS::$usuario,RS_WebServicesMIDIS::$clave,$tipoDocumento,$nroDocumento);
				if($getIntegranteGen["resultado"])
				{
					$Convertir_getIntegranteGen=RS_WebServicesMIDIS::Convertir_getIntegranteMinimalGen($getIntegranteGen["datos"]->return);
					if($Convertir_getIntegranteGen['resultado'])
					{
						$datos=$Convertir_getIntegranteGen['datos'];
						$resultado=true;
					}
					else
						$mensaje=$Convertir_getIntegranteGen['mensaje'];
				}
				else
					$mensaje=$getIntegranteGen["mensaje"];
			}
			else
				$mensaje=$ObtenerClienteGen["mensaje"];
		} catch(\Exception $e) {
			$mensaje=$e->getMessage();
		}
		return ["resultado"=>$resultado,"mensaje"=>$mensaje,"datos"=>$datos];
	}
	public static function Convertir_getIntegranteGen($getIntegrante)
	{
		$resultado=false;
		$mensaje='';
		$datos=null;
		try{
			if(strlen($getIntegrante)>0)
			{
				if(strpos($getIntegrante,'|'))
				{
					$keys_hogar=['co_hogar','co_ubigeo','de_ubigeo','co_centropoblado','de_centropoblado','de_direccion','in_cse_nivpobreza','nu_cse_ticket','fe_cse_ticket_emision','fe_cse_ticket_vigencia_ini','fe_cse_ticket_vigencia_fin','es_cse_ticket_vigencia'];
					$keys_integrantes=['in_doc_nacimiento','nu_doc_nacimiento','ap_primer','ap_segundo','ap_casada','prenombre_inscrito','de_genero','fe_nacimiento','co_restri','fe_restri','ap_primer2','ap_segundo2','ap_casada2','prenombre_inscrito2','de_genero2','fe_nacimiento2','co_estado_civil','co_restri2','fe_restri2','fe_reniec'];
					$long_keys_hogar=count($keys_hogar);
					$long_keys_integrantes=count($keys_integrantes);
					$columnas=explode('|',substr($getIntegrante, 0, -1));
					if(count($columnas)>=$long_keys_hogar+$long_keys_integrantes)
					{
						$datos=array_combine($keys_hogar,array_slice($columnas,0,$long_keys_hogar));
						$datos["integrantes"]=RS_Funciones::array_combine2($keys_integrantes,array_slice($columnas,$long_keys_hogar,count($columnas)-$long_keys_hogar));
						$resultado=true;
					}
					else
						$mensaje='El retorno de Web Service de Midis tiene menos de 32 campos';
				}
				else
					$mensaje=$getIntegrante;
			}
			else
				$mensaje='El valor retornado por la WS de MIDIS no tiene longitud';
		} catch(\Exception $e) {
			$mensaje=$e->getMessage();
		}
		return ["resultado"=>$resultado,"mensaje"=>$mensaje,"datos"=>$datos];
	}
	public static function Convertir_getIntegranteMinimalGen($getIntegrante)
	{
		$resultado=false;
		$mensaje='';
		$datos=null;
		try{
			if(strlen($getIntegrante)>0)
			{
				if(strpos($getIntegrante,'|'))
				{
					$keys_hogar=['co_hogar','co_ubigeo','co_centropoblado','de_centropoblado','de_direccion','in_cse_nivpobreza','nu_cse_ticket','fe_cse_ticket_emision','fe_cse_ticket_vigencia_ini','fe_cse_ticket_vigencia_fin','es_cse_ticket_vigencia'];
					$keys_integrantes=['in_doc_nacimiento','nu_doc_nacimiento','ap_primer','ap_segundo','ap_casada','prenombre_inscrito','de_genero','fe_nacimiento','co_estado_civil','co_restri','fe_restri','fe_reniec'];
					$long_keys_hogar=count($keys_hogar);
					$long_keys_integrantes=count($keys_integrantes);
					$columnas=explode('|',substr($getIntegrante, 0, -1));
					if(count($columnas)>=$long_keys_hogar+$long_keys_integrantes)
					{
						$datos=array_combine($keys_hogar,array_slice($columnas,0,$long_keys_hogar));
						$datos["integrantes"]=RS_Funciones::array_combine2($keys_integrantes,array_slice($columnas,$long_keys_hogar,count($columnas)-$long_keys_hogar));
						$resultado=true;
					}
					else
						$mensaje='El retorno de Web Service de Midis tiene menos de 23 campos';
				}
				else
					$mensaje=$getIntegrante;
			}
			else
				$mensaje='El valor retornado por la WS de MIDIS no tiene longitud';
		} catch(\Exception $e) {
			$mensaje=$e->getMessage();
		}
		return ["resultado"=>$resultado,"mensaje"=>$mensaje,"datos"=>$datos];
	}
	public static function Convertir_ReniecLoayza($DatosReniec)
	{
		$resultado=false;
		$mensaje='';
		$datos=null;
		try{
			$old_date=explode('/',$DatosReniec[29]);
			$fe_nacimiento=$old_date[2].'-'.$old_date[1].'-'.$old_date[0];
			$keys_hogar=['co_hogar','co_ubigeo','de_ubigeo','co_centropoblado','de_centropoblado','de_direccion','in_cse_nivpobreza','nu_cse_ticket','fe_cse_ticket_emision','fe_cse_ticket_vigencia_ini','fe_cse_ticket_vigencia_fin','es_cse_ticket_vigencia'];
			$datos_hogar=[null,null,null,null,null,trim($DatosReniec[36].' '.$DatosReniec[37]),null,null,null,null,null,null];
			$keys_integrantes=['in_doc_nacimiento','nu_doc_nacimiento','ap_primer','ap_segundo','ap_casada','prenombre_inscrito','de_genero','fe_nacimiento','co_restri','fe_restri','ap_primer2','ap_segundo2','ap_casada2','prenombre_inscrito2','de_genero2','fe_nacimiento2','co_estado_civil','co_restri2','fe_restri2','fe_reniec'];
			$datos_integrantes=['00030299',$DatosReniec[2],$DatosReniec[4],$DatosReniec[5],$DatosReniec[6],$DatosReniec[7],$DatosReniec[22],$fe_nacimiento,strlen($DatosReniec[34])==0?'SR':$DatosReniec[34],null,$DatosReniec[4],$DatosReniec[5],$DatosReniec[6],$DatosReniec[7],$DatosReniec[22],$fe_nacimiento,$DatosReniec[20],strlen($DatosReniec[34])==0?'SR':$DatosReniec[34],null,null];
			$datos=array_combine($keys_hogar,$datos_hogar);
			$datos["integrantes"][]=array_combine($keys_integrantes,$datos_integrantes);
			$resultado=true;
		} catch(\Exception $e) {
			$mensaje=$e->getMessage()." Linea: ".$e->getLine()." Archivo:".$e->getFile();
		}
		return ["resultado"=>$resultado,"mensaje"=>$mensaje,"datos"=>$datos];
	}
	public static function verificar_integrantes_hogar($registro,$integrantes_hogar_midis)
	{
		$resultado=false;
		$mensaje='';
		try{
			$resultado=true;
			foreach($registro['NumDocInt'] as $NumDocInt)
			{
				if(!RS_Funciones::buscar_en_array($NumDocInt,'nu_doc_nacimiento',$integrantes_hogar_midis))
				{
					$mensaje='El integrante con Número de Identificación '.$NumDocInt.' NO está registrado en su hogar en el Padron General de Hogares de MIDIS.';
					$resultado=false;
					break;
				}
			}
			if($resultado)
				foreach($integrantes_hogar_midis as $integrante)
				{
					if($integrante['nu_doc_nacimiento']!=$registro['NumeroDocumento'])
						if(!RS_Funciones::busqueda_simple_array($integrante['nu_doc_nacimiento'],$registro['NumDocInt']))
						{
							$mensaje='Existe Integrantes en el Padron General de Hogares de MIDIS que no registro en el formulario.';
							$resultado=false;
							break;
						}
				}
		} catch(\Exception $e) {
			$resultado=false;
			$mensaje=$e->getMessage();
		}
		return ["resultado"=>$resultado,"mensaje"=>$mensaje];
	}
	public static function VerificaMujerJefaHogar($registro)
	{
		$resultado=false;
		$mensaje=null;
		$datos=null;
		try {
			if(isset($registro["DocInt"])&&count($registro["DocInt"])>0)
			{
				$registro['IdTipoDocumento']=$registro['IdTipoDocumento']==1?'DNI':'CE';
				$getIntegrantePublico=RS_WebServicesMIDIS::getIntegrantePublico($registro);
				if($getIntegrantePublico["resultado"]==1)
				{
					$VerificaDatosPersonaBusqueda=RS_WebServicesMIDIS::VerificaDatosPersonaBusqueda($registro,$getIntegrantePublico["datos"]);
					if($VerificaDatosPersonaBusqueda["resultado"])
					{
						$verificar_integrantes_hogar=RS_WebServicesMIDIS::verificar_integrantes_hogar($registro,$getIntegrantePublico['datos']['integrantes']);
						if($verificar_integrantes_hogar['resultado'])
						{
							$VerificaDatosHogar=RS_WebServicesMIDIS::VerificaDatosHogar($getIntegrantePublico["datos"]);
							if($VerificaDatosHogar["resultado"])
							{
								$VerificaDatosIntegrantes=RS_WebServicesMIDIS::VerificaDatosIntegrantes($registro,$getIntegrantePublico["datos"]);
								if($VerificaDatosIntegrantes["resultado"])
								{
									$datos=$getIntegrantePublico["datos"];
									$resultado=true;
								}
								else
									$mensaje=$VerificaDatosIntegrantes["mensaje"];
							}
							else
								$mensaje=$VerificaDatosHogar["mensaje"];
						}
						else
							$mensaje=$verificar_integrantes_hogar['mensaje'];
					}
					else
						$mensaje=$VerificaDatosPersonaBusqueda["mensaje"];
				}
				else
					$mensaje=$getIntegrantePublico["mensaje"];
			}
			else
				$mensaje="No se ingresó Integrantes de Hogar";
		} catch(\Exception $e) {
			$mensaje=$e->getMessage();
		}
		return ["resultado"=>$resultado,"mensaje"=>$mensaje,"datos"=>$datos];
	}
	
	public static function ObtieneDatosPersonaMIDIS($tipoDocumento,$nroDocumento,$Hogar)
	{
		$resultado=false;
		$mensaje='';
		$datos=null;
		try {
			foreach($Hogar["integrantes"] as $integrante)
			{
				if(RS_WebServicesMIDIS::ConvertirTipoDocumentoCodigoMidis($tipoDocumento)==$integrante["in_doc_nacimiento"]&&$integrante["nu_doc_nacimiento"]==$nroDocumento)
				{
					$datos=$integrante;
					$resultado=true;
					break;
				}
			}
			if($datos===null)
			{
				$mensaje="No se encontró datos";
				$resultado=false;
			}
		} catch(\Exception $e) {
			$mensaje=$e->getMessage();
		}
		return ["resultado"=>$resultado,"mensaje"=>$mensaje,"datos"=>$datos];
	}
	public static function ConvertirTipoDocumentoCodigoMidis($tipoDocumento)
	{
		switch(strtoupper($tipoDocumento))
		{
			case 'DNI':
				$IN_DOC_NACIMIENTO='00030299';
				break;
			case 'CE':
				$IN_DOC_NACIMIENTO='00030205';
				break;
			default:
				$IN_DOC_NACIMIENTO=null;
		}
		return $IN_DOC_NACIMIENTO;
	}
	
	public static function VerificaDiscapacidadConadisPIDE($DocNumber)
	{
		$resultado=false;
		$mensaje='';
		$discapacidad=false;
		try{
			$ObtenerUsuarioConadisPIDE=RS_WebServicesPIDE::ObtenerUsuarioConadisPIDE();
			if($ObtenerUsuarioConadisPIDE["resultado"])
			{
				$ConsultaPDiscapacidadConadisPIDE=RS_WebServicesPIDE::ConsultaPDiscapacidadConadisPIDE($ObtenerUsuarioConadisPIDE["datos"]['url'],$ObtenerUsuarioConadisPIDE["datos"]['Username'],$ObtenerUsuarioConadisPIDE["datos"]['Password'],$DocNumber);
				if($ConsultaPDiscapacidadConadisPIDE["resultado"])
				{
					if($ConsultaPDiscapacidadConadisPIDE["datos"]["Estado"]==1&&$ConsultaPDiscapacidadConadisPIDE["datos"]["Fallecido"]==false)
						$discapacidad=true;
					$resultado=true;
				}
				else
					$mensaje=$ConsultaPDiscapacidadConadisPIDE["mensaje"];
			}
			else
				$mensaje=ObtenerUsuarioConadisPIDE["mensaje"];
		}catch(\Exception $e) {
			$mensaje=$e->getMessage();
		}
		return ["resultado"=>$resultado,"mensaje"=>$mensaje,"discapacidad"=>$discapacidad];
	}
	public static function Buscar_relacion_parentesco($NumeroDocumento,$registro)
	{
		$resultado=false;
		$mensaje=null;
		$datos=null;
		try{
			foreach($registro['NumDocInt'] as $key=>$NumDocInt)
			{
				if($NumDocInt==$NumeroDocumento)
				{
					$datos=['IdParentesco'=>$registro['ParInt'][$key],'TieneDiscapacidad'=>$registro['DisInt'][$key]];
					$resultado=true;
					break;
				}
			}
			if($resultado==false)
				$mensaje="No se encontro Parentesco";
		}catch(\Exception $e) {
			$mensaje=$e->getMessage();
		}
		return ["resultado"=>$resultado,"mensaje"=>$mensaje,"datos"=>$datos];
	}
	public static function ConvertirPGH_JefaIntegrantes($DatosJefa,$Hogar)
	{
		$resultado=false;
		$mensaje=null;
		$datos=null;
		try{
			unset($Hogar['co_centropoblado']);
			unset($Hogar['co_hogar']);
			unset($Hogar['de_centropoblado']);
			unset($Hogar['es_cse_ticket_vigencia']);
			unset($Hogar['fe_cse_ticket_emision']);
			unset($Hogar['fe_cse_ticket_vigencia_fin']);
			unset($Hogar['fe_cse_ticket_vigencia_ini']);
			unset($Hogar['in_cse_nivpobreza']);
			unset($Hogar['nu_cse_ticket']);
			$Hogar['ApellidoPaterno']=$DatosJefa['ap_primer2'];
			$Hogar['ApellidoMaterno']=$DatosJefa['ap_segundo2'];
			$Hogar['Nombres']=$DatosJefa['prenombre_inscrito2'];
			$Hogar['FechaNacimiento']=$DatosJefa['fe_nacimiento2'];
			$Hogar['de_genero2']=$DatosJefa['de_genero2'];
			$Hogar['co_estado_civil']=$DatosJefa['co_estado_civil'];
			foreach($Hogar['integrantes'] as $key=>$integrante)
			{
				$tiene_discapacidad=false;
				$VerificaDiscapacidadConadisPIDE=RS_WebServicesMIDIS::VerificaDiscapacidadConadisPIDE($integrante["nu_doc_nacimiento"]);
				if($VerificaDiscapacidadConadisPIDE["resultado"]&&$VerificaDiscapacidadConadisPIDE["discapacidad"])
					$tiene_discapacidad=true;
				$Hogar['integrantes'][$key]['tiene_discapacidad']=$tiene_discapacidad;
			}
			$datos=$Hogar;
			$resultado=true;
		}catch(\Exception $e) {
			$mensaje=$e->getMessage();
		}
		return ["resultado"=>$resultado,"mensaje"=>$mensaje,"datos"=>$datos];
	}
	public static function ObtenerIdPersonaPGH($in_doc_nacimiento)
	{
		switch($in_doc_nacimiento)
		{
			case '00030299':
				$IdDocIdentidad=1;
				break;
			case '00030205':
				$IdDocIdentidad=2;
				break;
			default:
				$IdDocIdentidad=1;
		}
		return $IdDocIdentidad;
	}
	public static function ConvertirTipoDocumentoGalenhos($IdDocIdentidad)
	{
		switch($IdDocIdentidad)
		{
			case 1:
				$in_doc_nacimiento='00030299';
				break;
			case 2:
				$in_doc_nacimiento='00030205';
				break;
			default:
				$in_doc_nacimiento=null;
		}
		return $in_doc_nacimiento;
	}
}