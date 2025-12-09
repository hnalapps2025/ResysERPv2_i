<?php
namespace App;
class RS_Referencia
{
	public static $username="44856543";
	public static $password="MarcoA1234@@";
	public static function ObtenerCookiePrincipalRefcon($username,$password)
	{
		$validador=false;
		$mensaje='';
		$pagina=[];
		$pagina1=RS_Funciones::LeerPagina('https://refcon.minsa.gob.pe/refconv02/desktop','POST',array('mlkuser' =>$username,'mlkpass' =>$password,'C' =>'LOGIN','S' =>'INIT'),["Content-Type: application/x-www-form-urlencoded; charset=UTF-8"]);
		if(count($pagina1)==2)
		{
			if(!strpos($pagina1[0],'"error":true'))
			{
				$pagina=$pagina1;
				$validador=true;
			}
			else
				$mensaje="Usuario o contraseña inválida para conectar a Refcon.";
		}
		else
			$mensaje="Fallo al Obtener Cookies iniciales";
		return ['valid'=>$validador,'mensaje'=>$mensaje,'pagina'=>$pagina];
	}
	
	public static function buscar_referencias_aceptadas($PaginaCookie,$fechaini,$fechafin)
    {
        ini_set('max_execution_time', '3600');
		ini_set('memory_limit', '2048M');
		$validador=false;
		$mensaje='';
		$datos=[];
		$parametros=[
			"fechaini"=>$fechaini
			,"fechafin"=>$fechafin
			,"idestado"=>3
		];
		$ObtenerListaReferencias=self::ObtenerListaReferencias($PaginaCookie,$parametros);
		if($ObtenerListaReferencias['valid'])
		{
			$datos=$ObtenerListaReferencias['datos'];
			$validador=true;
		}
		else
			$mensaje=$ObtenerListaReferencias['mensaje'];
		return ['valid'=>$validador,'mensaje'=>$mensaje,'datos'=>$datos];
    }
	
	public static function buscar_referencias_citadas($PaginaCookie,$fechaini,$fechafin,$fecha_cita)
    {
        ini_set('max_execution_time', '3600');
		ini_set('memory_limit', '2048M');
		$validador=false;
		$mensaje='';
		$datos=[];
		$parametros=[
			"fechaini"=>$fechaini
			,"fechafin"=>$fechafin
			,"idestado"=>7
		];
		$ObtenerListaReferencias=self::ObtenerListaReferencias($PaginaCookie,$parametros);
		if($ObtenerListaReferencias['valid'])
		{
			$buscar_citas=self::buscar_citas($ObtenerListaReferencias["datos"],'fechacita',$fecha_cita);
			if($buscar_citas['valid'])
			{
				$datos=$buscar_citas['datos'];
				$validador=true;
			}
			else
				$mensaje=$buscar_citas['mensaje'];
		}
		else
			$mensaje=$ObtenerListaReferencias['mensaje'];
		return ['valid'=>$validador,'mensaje'=>$mensaje,'datos'=>$datos];
    }
	
	public static function ObtenerListaReferencias($CookiePrincipalRefcon,$parametros)
	{
		$validador=false;
		$mensaje='';
		$datos=[];
		if($CookiePrincipalRefcon['valid'])
		{
			$parametros['C']='REFERENCIA';
			$parametros['S']='INGRESANTES';			
			if(!array_search('limit',$parametros))$parametros["limit"]=50000;
			if(!array_search('start',$parametros))$parametros["start"]=0;
						
			$Cookie=$CookiePrincipalRefcon['pagina'][0];
			preg_match_all('/^Set-Cookie:\s*([^;]*)/mi',$Cookie,$Cookies);
			$url='https://refcon.minsa.gob.pe/refconv02/his/referencia'.'?'.http_build_query($parametros);
			$pagina1=RS_Funciones::LeerPagina($url,'GET',[],count($Cookies)==2?array('Cookie: '.implode('; ',$Cookies[1])):[]);
			if(count($pagina1)==2)
			{
				if(!strpos($pagina1[0],'"error":true'))
				{
					$retorno=json_decode($pagina1[1],true);
					if(count($retorno["items"])>0)
					{
						$datos=$retorno["items"];
						$validador=true;
					}
					else
						$mensaje='No se obtuvieron referencias en Refcon';
				}
				else
					$mensaje=RS_Funciones::BuscarCSRF($pagina1[0],'"error":true',12,'"');
			}
			else
				$mensaje="Fallo Pagina 1 ObtenerListaReferencias";
		}
		else
			$mensaje=$CookiePrincipalRefcon['mensaje'];
		return ['valid'=>$validador,'mensaje'=>$mensaje,'datos'=>$datos];
	}
	
	public static function buscar_citas($filas,$nombre_campo,$valor_campo)
	{
        $validador=false;
		$mensaje='No existe Registros';
		$datos=[];
		foreach($filas as $fila)
		{
			if(substr($fila[$nombre_campo],0,10)==$valor_campo)
				$datos[]=$fila;
		}
		if(count($datos)>0)
		{
			$validador=true;
			$mensaje='';
		}
		return ['valid'=>$validador,'mensaje'=>$mensaje,'datos'=>$datos];
    }
	
	public static function RecibirReferencia($CookiePrincipalRefcon,$idreferencia,$fgllegada="N")
    {
        $validador=false;
		$mensaje='';
		if($CookiePrincipalRefcon['valid'])
		{
			$parametros['C']='REFERENCIA';
			$parametros['S']='CONDICIONREF';
			$parametros['idreferencia']=$idreferencia;
			$parametros['idcondicion']='E';
			$parametros['fgllegada']=$fgllegada;
			$Cookie=$CookiePrincipalRefcon['pagina'][0];
			preg_match_all('/^Set-Cookie:\s*([^;]*)/mi',$Cookie,$Cookies);
			$url='https://refcon.minsa.gob.pe/refconv02/his/referencia';
			$pagina1=RS_Funciones::LeerPagina($url,'POST',$parametros,count($Cookies)==2?array('Cookie: '.implode('; ',$Cookies[1])):[]);
			if(count($pagina1)==2)
			{
				if(strlen(trim($pagina1[1]))==0)
					$validador=true;
				else
					$mensaje=trim($pagina1[1]);
			}
			else
				$mensaje="Fallo Pagina de refcon recibir paciente";
		}
		else
			$mensaje=$PaginaCookie['mensaje'];
		return ['valid'=>$validador,'mensaje'=>$mensaje];
    }
	public static function ListarReferenciasPersona($IdDocIdentidad,$NroDocumento,$fechaini,$fechafin)
    {
        $resultado=false;
		$mensaje=null;
		$datos=null;
		$PaginaCookie=self::ObtenerCookiePrincipalRefcon(self::$username,self::$password);
		if($PaginaCookie['valid'])
		{
			$parametros=[
				"fechaini"=>$fechaini
				,"fechafin"=>$fechafin
				,"idtipodoc"=>$IdDocIdentidad
				,"numdoc"=>$NroDocumento
			];
			$ObtenerListaReferencias=self::ObtenerListaReferencias($PaginaCookie,$parametros);
			if($ObtenerListaReferencias['valid'])
			{
				if(count($ObtenerListaReferencias['datos'])>0)
				{
					$datos=$ObtenerListaReferencias['datos'];
					$resultado=true;
				}
				else
					$mensaje='No se encontraron referencias con los datos ingresados';
			}
			else
				$mensaje=$ObtenerListaReferencias['mensaje'];
		}
		else
			$mensaje=$PaginaCookie['mensaje'];
		return ['resultado'=>$resultado,'mensaje'=>$mensaje,'datos'=>$datos];
    }
	public static function ListarReferenciasFecha($fechaini,$fechafin)
    {
        $resultado=false;
		$mensaje=null;
		$datos=null;
		$PaginaCookie=self::ObtenerCookiePrincipalRefcon(self::$username,self::$password);
		if($PaginaCookie['valid'])
		{
			$parametros=[
				"fechaini"=>$fechaini
				,"fechafin"=>$fechafin
			];
			$ObtenerListaReferencias=self::ObtenerListaReferencias($PaginaCookie,$parametros);
			if($ObtenerListaReferencias['valid'])
			{
				if(count($ObtenerListaReferencias['datos'])>0)
				{
					$datos=$ObtenerListaReferencias['datos'];
					$resultado=true;
				}
				else
					$mensaje='No se encontraron referencias con los datos ingresados';
			}
			else
				$mensaje=$ObtenerListaReferencias['mensaje'];
		}
		else
			$mensaje=$PaginaCookie['mensaje'];
		return ['resultado'=>$resultado,'mensaje'=>$mensaje,'datos'=>$datos];
    }
	public static function CitarReferencias($CookiePrincipalRefcon,$referencia)
	{
		$validador=false;
		$mensaje='';
		if($CookiePrincipalRefcon['valid'])
		{
			$parametros['C']='WEBSERVICECITA';
			$parametros['S']='GUARDARCITAREST';			
			$parametros['idestablecimiento']='6204';
			$parametros['nrohis']='2';
			$parametros['codservicio']=$referencia['idupsdestino'];
			$parametros['codmedico']=$referencia['numdocper'];
			$parametros['fechaactual']=date('d/m/Y');
			$parametros['fechacita']=date('d/m/Y');
			$parametros['idtipodoc']=$referencia['idtipodoc'];
			$parametros['numdoc']=$referencia['numdoc'];
			$parametros['apelpaterno']=$referencia['apelpatpac'];
			$parametros['apelmaterno']=$referencia['apelmatpac'];
			$parametros['nombres']=$referencia['nombpac'];
			$parametros['fechanac']=$referencia['fechnacpac'];
			$parametros['direccion']=$referencia['direccion'];
			$parametros['sexo']=$referencia['idsexo'];
			$parametros['ubigeonac']=$referencia['idubigeonac'];
			$parametros['ubigeores']=$referencia['idubigeores'];
			$parametros['idreferencia']=$referencia['idreferencia'];
			$parametros['idcita']=$referencia['idcita'];
			$parametros['telefono']=$referencia['celularpac'];
			$parametros['fecharefc']=$referencia['fechacreacion'];
			$parametros['nroreferencia']=$referencia['nroreferencia'];
			$parametros['codrenaesorigen']=$referencia['codunico'];
			$parametros['codrenaesdestino']=$referencia['codunicodest'];
			$parametros['ubigeoineidest']=$referencia['idubigeoineidest'];
			$parametros['descarteraservicio']=$referencia['descarteraservicio'];
			$parametros['idcarteraservicio']=$referencia['idcarteraservicio'];
			$parametros['fgregistro']=$referencia['fgregistro'];
			$parametros['condicionpac']='E';
						
			$Cookie=$CookiePrincipalRefcon['pagina'][0];
			preg_match_all('/^Set-Cookie:\s*([^;]*)/mi',$Cookie,$Cookies);
			$url='https://refcon.minsa.gob.pe/refconv02/his/referencia'.'?'.http_build_query($parametros);
			$pagina1=RS_Funciones::LeerPagina($url,'POST',[],count($Cookies)==2?array('Cookie: '.implode('; ',$Cookies[1])):[]);
			if(count($pagina1)==2)
			{
				$retorno=json_decode($pagina1[1],true);
				if($retorno["success"])
				{
					$validador=true;
				}
				else
					$mensaje=$retorno["errorMessage"];
			}
			else
				$mensaje="Falló Pagina Citar Refcon";
		}
		else
			$mensaje=$CookiePrincipalRefcon['mensaje'];
		return ['valid'=>$validador,'mensaje'=>$mensaje];
	}
}