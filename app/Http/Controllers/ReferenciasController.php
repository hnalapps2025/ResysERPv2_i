<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use App\RS_Referencia;
use App\RS_Funciones;
use \PDO;
use rivcar\jqgrid\jqGridRender;
use rivcar\jqGrid\DBdrivers\jqGridDB;

class ReferenciasController extends Controller
{
    public function indicador_mensual(Request $request)
	{
		if($request->method()=='POST')
		{
			$resultado=false;
			$mensaje=null;
			$datos=null;
			$cantidad=6;
			$anio=$request->Anio;
			$mes=$request->Mes;
			$ultimoDia=new \DateTime();
			for($i=1;$i<=$cantidad;$i++)
			{
				$ff=$ultimoDia->format("d/m/Y");
				$fi=$ultimoDia->modify("-3 months")->format("d/m/Y");
				$ListarReferenciasFecha=RS_Referencia::ListarReferenciasFecha($fi,$ff);
				if($ListarReferenciasFecha['resultado'])
				{
					foreach($ListarReferenciasFecha['datos'] as $referencia)
					{
						if($referencia['fechapacrecibido']!='')
						{
							if(RS_Funciones::verificar_fecha_en_periodo($referencia['fechapacrecibido'],$mes,$anio,'d/m/Y - H:i:s'))
							{
								$filas[]=$referencia;
							}
						}
					}
				}
				/*$periodos[]=[
					"ff"=>$ultimoDia->format("d/m/Y")
					,"fi"=>$ultimoDia->modify("-3 months")->format("d/m/Y")
				];*/
				$ultimoDia->modify("-1 day");
			}
			///////
			$Array2ArrayXlsx=RS_Funciones::Array2ArrayXlsx($filas);
			if($Array2ArrayXlsx['valid'])
			{
				$Array2Xlsx=RS_Funciones::Array2Xlsx($Array2ArrayXlsx['datos']);
				if($Array2Xlsx['valid'])
				{
					$filename="ResysERP_Refcon_".$request->Mes."_".$request->Anio.".xlsx";
					header("Content-Type: application/vnd.openxmlformats-officedocument.spreadsheet‌​ml.sheet");
					header('Content-Disposition: attachment; filename="' . $filename. '"');
					$Array2Xlsx['libro']->save("php://output");
				}
				else
					return Redirect::back()->withErrors([$Array2Xlsx['mensaje']]);
			}
			else
				return Redirect::back()->withErrors([$Array2ArrayXlsx['mensaje']]);
			///////
			//$datos=$filas;
			//$resultado=true;
			//return $datos;
		}
		else
			return view('Referencias.indicador_mensual');
	}
	public function contrareferir(Request $request)
	{
		if($request->method()=='POST')
		{
			$resultado=false;
			$mensaje=null;
			$datos=null;
			//////
			$PaginaCookie=RS_Referencia::ObtenerCookiePrincipalRefcon(RS_Referencia::$username,RS_Referencia::$password);
			if($PaginaCookie['valid'])
			{
				$parametros=[
					"fechaini"=>(new \DateTime($request->fechai))->format('d/m/Y')
					,"fechafin"=>(new \DateTime($request->fechaf))->format('d/m/Y')
					,"idestado"=>5
				];
				$ObtenerListaReferencias=RS_Referencia::ObtenerListaReferencias($PaginaCookie,$parametros);
				if($ObtenerListaReferencias['valid'])
				{
					if(count($ObtenerListaReferencias['datos'])>0)
					{
						foreach($ObtenerListaReferencias['datos'] as $key=>$referencia)
						{
							$resultado_p=false;
							$mensaje_p=null;
							$GuardarParaContrareferencia=RS_Referencia::GuardarParaContrareferencia($PaginaCookie,$referencia);
							if($GuardarParaContrareferencia['resultado'])
								$resultado_p=true;
							else
								$mensaje_p=$GuardarParaContrareferencia['mensaje'];
							$ObtenerListaReferencias['datos'][$key]['resultado']=$resultado_p;
							$ObtenerListaReferencias['datos'][$key]['mensaje']=$mensaje_p;
						}
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
			//////
			return ['resultado'=>$resultado,'mensaje'=>$mensaje,'datos'=>$datos];
		}
		else
			return view('Referencias.contrareferir');
	}
}