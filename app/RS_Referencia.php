<?php
namespace App;

use Illuminate\Support\Facades\DB;

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
	public static function GuardarParaContrareferencia($CookiePrincipalRefcon,$referencia)
    {
        $resultado=false;
		$mensaje=null;
		$datos=null;
		if($CookiePrincipalRefcon['valid'])
		{
			$parametros['C']='INFORMACION';
			$parametros['S']='REGISTROCONTRAREF';
			$parametros['idenvio']='R';
			$parametros['fecha']=date('Ymd');
			$parametros['hora']=date('H:i:s');
			$parametros['idestab']=$referencia['idestorigen'];
			$parametros['idestreferido']=$referencia['idestorigen'];
			$parametros['idups']='220000';
			$parametros['idupsdestino']=$referencia['idupsorigen'];
			$parametros['idupsdestinodato']=$referencia['idupsorigen'];
			$parametros['fgprioridad']='0';
			//$parametros['idespecialidad']=$referencia['idespecialidad'];
			$parametros['idespecialidad']=79;
			$parametros['idtipodocref']='1';
			$parametros['numdocref']='41414939';
			$parametros['nroreferencia']=explode('-',$referencia['nroreferencia'])[1];
			$parametros['idreferencia']='';
			$parametros['idpersonalrefiere']='62816';
			$parametros['calireferencia']='J';
			$parametros['calireferenciacomentario']='';
			$parametros['condicionusuario']='ME';
			$parametros['idcita']='';
			$parametros['idtipodoc']=$referencia['idtipodoc'];
			$parametros['numdoc']=$referencia['numdoc'];
			$parametros['nrohis']=DB::selectOne("SELECT NroHistoriaClinica FROM Pacientes WHERE NroDocumento = ?", [$referencia['numdoc']])->NroHistoriaClinica ?? null;
			$parametros['idsexo']=$referencia['idsexo'];
			$parametros['idfinanciador']=$referencia['idfinanciador'];
			$parametros['fechnacpac']=$referencia['fechnacpac'];			
			$parametros['nombpac']=$referencia['nombpac'];
			$parametros['apelpatpac']=$referencia['apelpatpac'];
			$parametros['apelmatpac']=$referencia['apelmatpac'];			
			$parametros['idpaciente']=$referencia['idpaciente'];
			$parametros['codafiliacion']=$referencia['numafil'];
			$parametros['correopac']=$referencia['correopac'];
			$parametros['celularpac']=$referencia['celularpac'];
			$parametros['direccion']=$referencia['direccion'];
			$parametros['idubigeores']=$referencia['idubigeores'];
			$parametros['direccionnew']=$referencia['direccion'];
			$parametros['idubigeoresnew']=$referencia['idubigeores'];
			$parametros['idtipoatencion']='C';			
			$parametros['condicion']='';
			$parametros['caditemcpt']='';
			$parametros['caditempru']='';
			$parametros['caditemexa']='';
			$parametros['caditems']='';
			$parametros['caditemsc']='';
			$parametros['terrestre']='T';
			$parametros['aereo']='';
			$parametros['fluvial']='';
			$parametros['maritimo']='';
			$parametros['temp']='';
			$parametros['pa']='';
			$parametros['fr']='';
			$parametros['fc']='';
			$parametros['idexfisico']='';
			$parametros['numdocresp']='';
			$parametros['numdocacomp']='';
			$parametros['idmotivoref']='';
			$parametros['obsmotivoref']='';
			$parametros['idcitaref']=$referencia['idcita'];
			$parametros['idpersonalresp']='';
			$parametros['idpersonalacomp']='';			
			$parametros['iddisa']='36';
			$parametros['idred']='00';
			$parametros['idmicrored']='00';
			$parametros['seccodigo']='1';			
			$parametros['idpersonalreg']='159360';
			$parametros['recomendacion']='';
			$parametros['notasobs']='';
			$parametros['idreferenciaold']=$referencia['idreferencia'];
			$parametros['regcontraref']='C';
			$parametros['idusuarioreg']='60745';
			//dd($parametros);
			$Cookie=$CookiePrincipalRefcon['pagina'][0];
			preg_match_all('/^Set-Cookie:\s*([^;]*)/mi',$Cookie,$Cookies);
			$url='https://refcon.minsa.gob.pe/refconv02/his/referencia';
			$pagina1=RS_Funciones::LeerPagina($url,'POST',$parametros,count($Cookies)==2?array('Cookie: '.implode('; ',$Cookies[1])):[]);
			//dd($pagina1);
			if(count($pagina1)==2)
			{
				if(strlen(trim($pagina1[1]))==0)
				{
					$xJson = json_decode(
						collect(explode("\r\n",trim($pagina1[0])))
							->filter(fn($h) => str_starts_with($h, 'X-JSON:'))
							->map(fn($h) => trim(str_replace('X-JSON:', '', $h)))
							->first(),
						true
					);
					if($xJson['rpta']==1)
					{
						$CambiarEstadoRefrencia=self::CambiarEstadoRefrencia($CookiePrincipalRefcon,$referencia['idreferencia'],8);
						if($CambiarEstadoRefrencia['resultado'])
						{
							$datos=$CambiarEstadoRefrencia['datos'];
							$resultado=true;
						}
						else
							$mensaje=$CambiarEstadoRefrencia['mensaje'];
					}
					else
						$mensaje=$xJson['msj'];
				}
				else
					$mensaje=$pagina1[1];
			}
			else
				$mensaje="Fallo Pagina de refcon recibir paciente";
		}
		else
			$mensaje=$PaginaCookie['mensaje'];
		return ['resultado'=>$resultado,'mensaje'=>$mensaje,'datos'=>$datos];
    }
	public static function CambiarEstadoRefrencia($CookiePrincipalRefcon,$idreferencia,$fgestado)
    {
        $resultado=false;
		$mensaje=null;
		$datos=null;
		if($CookiePrincipalRefcon['valid'])
		{
			$parametros['C']='REFERENCIA';
			$parametros['S']='CHANGEESTADO';
			$parametros['idreferencia']=$idreferencia;
			$parametros['fgestado']=$fgestado;
			$Cookie=$CookiePrincipalRefcon['pagina'][0];
			preg_match_all('/^Set-Cookie:\s*([^;]*)/mi',$Cookie,$Cookies);
			$url='https://refcon.minsa.gob.pe/refconv02/his/referencia';
			$pagina1=RS_Funciones::LeerPagina($url,'POST',$parametros,count($Cookies)==2?array('Cookie: '.implode('; ',$Cookies[1])):[]);
			//dd($pagina1);
			if(count($pagina1)==2)
			{
				if(strlen(trim($pagina1[1]))==0)
				{
					$datos=$pagina1;
					$resultado=true;
					//dd($pagina1);
				}
				else
					$mensaje=$pagina1[1];
			}
			else
				$mensaje="Fallo Pagina de refcon recibir paciente";
		}
		else
			$mensaje=$PaginaCookie['mensaje'];
		return ['resultado'=>$resultado,'mensaje'=>$mensaje,'datos'=>$datos];
    }
}