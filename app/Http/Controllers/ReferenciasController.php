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
}