<?php
namespace App;

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use SoapClient;
use SOAPHeader;

class RS_Funciones
{
	public static function LeerPagina($url,$tipo,$PostFields,$HttpHeader,$agent='')
	{
		$curl=curl_init();
		curl_setopt_array($curl, array(
		  CURLOPT_URL =>$url,
		  CURLOPT_RETURNTRANSFER => true,
		  CURLOPT_ENCODING => '',
		  CURLOPT_TIMEOUT => 0,
		  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		  CURLOPT_CUSTOMREQUEST =>$tipo,
		  CURLOPT_HEADER=>1,
		  CURLOPT_SSL_VERIFYPEER=>false
		));
		if($agent!="")curl_setopt($curl, CURLOPT_USERAGENT, $agent);
		if($tipo=='POST'&&count($PostFields)>0) curl_setopt($curl,CURLOPT_POSTFIELDS,http_build_query($PostFields));
		if(count($HttpHeader)>0)curl_setopt($curl,CURLOPT_HTTPHEADER,$HttpHeader);		
		$response =mb_convert_encoding(curl_exec($curl), "UTF-8", "Windows-1252");
		$header_size = curl_getinfo($curl,CURLINFO_HEADER_SIZE);
		$header= substr($response, 0, $header_size);
		$body=substr($response, $header_size);
		curl_close($curl);
		return [$header,$body];
	}
	
	public static function BuscarCSRF($body,$nombre,$CaracteresSumar,$CaracterFin)
	{
		$pos=strpos($body,$nombre);
		if($pos===false)$pos=0;
		$primeraparte=substr($body,$pos+strlen($nombre)+$CaracteresSumar,strlen($body));			
		$csrfmiddlewaretoken=substr($primeraparte,0,strpos($primeraparte,$CaracterFin)!==false?strpos($primeraparte,$CaracterFin):strlen($primeraparte));
		return $csrfmiddlewaretoken;
	}
	
	public static function Array2ArrayXlsx($filas)
	{
		$validador=false;
		$mensaje='';
		$datos=[];
		if(count($filas)>0)
		{
			$datos[]=array_keys($filas[0]);
			foreach($filas as $fila)
			{
				$datos[]=array_values($fila);
			}
			$validador=true;
		}
		else
			$mensaje="No existen registros";
		return ['valid'=>$validador,'message'=>$mensaje,'datos'=>$datos];
	}
	
	public static function Array2Xlsx($filas)
	{
		$validador=false;
		$mensaje='';
		$writer=null;
		/////
		$spreadSheet = new Spreadsheet();
		$workSheet = $spreadSheet->getActiveSheet();
		$workSheet->fromArray($filas,null,'A1');
		$writer=new Xlsx($spreadSheet);
		$validador=true;
		/////
		return ['valid'=>$validador,'message'=>$mensaje,'libro'=>$writer];
	}
	public static function Separar_Palabras($palabras,$cantidad)
	{
		$resultado=false;
		$mensaje='';
		$datos=null;
		if(strlen(trim($palabras))>0)
		{
			$porciones=array_unique(explode(" ",trim($palabras)));
			foreach($porciones as $porcion)$filas[]=$porcion;
			$porciones=$filas;
			for($i=1;$i<=$cantidad;$i++)
			{
				if(isset($porciones[$i-1]))
				{
					if($i==$cantidad&&count($porciones)>$cantidad)
					{
						$texto='';
						for($j=$i;$j<=count($porciones);$j++)
							$texto.=$porciones[$j-1].' ';
					}
					else
						$texto=$porciones[$i-1];					
				}
				else
					$texto='';
				$datos[$i-1]=$texto;
			}
			$resultado=true;
		}
		else
			$mensaje='Cadena vacia';
		return ['resultado'=>$resultado,'mensaje'=>$mensaje,'datos'=>$datos];
	}
	public static function verifica_celular_sms($numero)
	{
		$resultado=false;
		$mensaje=null;
		$datos=null;
		$numero=str_replace(' ','',trim($numero));
		if(strlen($numero)>0)
		{
			if(ctype_digit(strval($numero)))
			{
				if(strlen($numero)==9)
				{
					$datos=$numero;
					$resultado=true;
				}
				else
					$mensaje='El numero de celular no tiene 9 digitos';
			}
			else
				$mensaje='El numero de celular no tiene el formato numero: '.$numero;
		}
		else
			$mensaje='Cadena vacia';
		return ['resultado'=>$resultado,'mensaje'=>$mensaje,'datos'=>$datos];
	}
	public static function obtener_cui_dni($numero_documento,$tipo)
	{
		$resultado=false;
		$mensaje=null;
		$cui=null;
		$constantes=array(3,2,7,6,5,4,3,2);
		$suma=0;
		for($i=0;$i<8;$i++)
			$suma+=substr($numero_documento,$i,1)*$constantes[$i];
		$pos_veri=11-$suma%11;
		if($pos_veri==11)$pos_veri=0;
		if($tipo)
			$lista=array('6', '7', '8', '9', '0', '1', '1', '2', '3', '4', '5');
		else
			$lista=array('K', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J');
		$cui=$lista[$pos_veri];
		$resultado=true;
		return ['resultado'=>$resultado,'mensaje'=>$mensaje,'cui'=>$cui];
	}
	public static function verifica_cui_dni($IdDocIdentidad,$numero_documento,$cui)
	{
		$resultado=false;
		$mensaje=null;
		if($IdDocIdentidad==1)
		{
			$obtener_cui_dni=RS_Funciones::obtener_cui_dni($numero_documento,ctype_digit($cui)?1:2);
			if($obtener_cui_dni["resultado"])
			{
				if(strtoupper($cui)==$obtener_cui_dni["cui"])
				{
					$resultado=true;
				}
				else
					$mensaje='CUI Invalido';
			}
			else
				$mensaje=$obtener_cui_dni["mensaje"];
		}
		else
			$resultado=true;
		return ['resultado'=>$resultado,'mensaje'=>$mensaje];
	}
	public static function devuelve_indice_array($campo_buscar,$valor_buscar,$filas)
	{
		$index=null;
		foreach($filas as $key=>$fila)
		{
			if($fila[$campo_buscar]==$valor_buscar)
			{
				$index=$key;
				break;
			}
		}
		return $index;
	}
	public static function array_combine2($arr1, $arr2)
	{
		$count1 = count($arr1);
		$numofloops =count($arr2)/$count1;			
		$i=0;
		while($i < $numofloops){
			$arr4[]=array_combine($arr1,array_slice($arr2, $count1*$i, $count1));
			$i++;
		}		
		return $arr4;
	}
	public static function calcula_edad_anios($fecha_nacimiento, $fecha_referencia)
	{
		$dia=date("d",strtotime($fecha_referencia));
		$mes=date("m",strtotime($fecha_referencia));
		$ano=date("Y",strtotime($fecha_referencia));

		$dianaz=date("d",strtotime($fecha_nacimiento));
		$mesnaz=date("m",strtotime($fecha_nacimiento));
		$anonaz=date("Y",strtotime($fecha_nacimiento));
		
		//si el mes es el mismo pero el día inferior aun no ha cumplido años, le quitaremos un año al actual
		if(($mesnaz == $mes) && ($dianaz > $dia))$ano=$ano-1;

		//si el mes es superior al actual tampoco habrá cumplido años, por eso le quitamos un año al actual
		if($mesnaz > $mes)$ano=$ano-1;

		//ya no habría mas condiciones, ahora simplemente restamos los años y mostramos el resultado como su edad
		return $ano-$anonaz;
	}
	public static function verificar_fecha_en_periodo($fecha,$mesBuscado,$anioBuscado,$FormatoFecha='Y-m-d')
	{
		$resultado=false;
		$fecha = \DateTime::createFromFormat($FormatoFecha,$fecha);
		if($fecha && (int)$fecha->format("m")===(int)$mesBuscado && (int)$fecha->format("Y") === (int)$anioBuscado)
			$resultado=true;
		return $resultado;
	}
}