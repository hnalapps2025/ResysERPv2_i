<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\RS_Referencia;

class SRefconRecibidoPasada extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'SincroRefconRecibidoPasada {fi} {ff}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $fi = $this->argument('fi');
        $ff = $this->argument('ff');
		$this->info("Sincronizando datos desde {$fi} hasta {$ff}...");

        // Aquí colocas tu lógica de sincronización
        // Ejemplo:
        $SincroRefconRecibidoPasada=$this->SincroRefconRecibidoPasada($fi, $ff);
		var_dump($SincroRefconRecibidoPasada);

        $this->info("Sincronización completada.");
        return 0;
    }
	
	protected function SincroRefconRecibidoPasada($fi, $ff)
	{
		$resultado=false;
		$mensaje=null;
		$datos=null;
		try{
			$ObtenerCookiePrincipalRefcon=RS_Referencia::ObtenerCookiePrincipalRefcon(RS_Referencia::$username,RS_Referencia::$password);
			if($ObtenerCookiePrincipalRefcon['valid'])
			{
				$parametros=[
					"fechaini"=>date("d/m/Y",strtotime($fi))
					,"fechafin"=>date("d/m/Y",strtotime($ff))
					,"idestado"=>7
				];
				$ObtenerListaReferencias=RS_Referencia::ObtenerListaReferencias($ObtenerCookiePrincipalRefcon,$parametros);
				if($ObtenerListaReferencias['valid'])
				{
					foreach($ObtenerListaReferencias['datos'] as $key=>$referencia)
					{
						$respuesta_fila=false;
						$mensaje_fila=null;
						$fa=\DateTime::createFromFormat('d/m/Y - H:i:s',$referencia['fechaaceptacion']);
						$fc=\DateTime::createFromFormat('d/m/Y H:i:s',$referencia['fechacita']);
						$hoy = new \DateTime();
						if($fc<=$hoy)
						{
							$RecibirReferencia=RS_Referencia::RecibirReferencia($ObtenerCookiePrincipalRefcon,$referencia["idreferencia"],$hoy->diff($fa)->days<=20?"S":"N");
							if($RecibirReferencia['valid'])
								$respuesta_fila=true;
							else
								$mensaje_fila=$RecibirReferencia['mensaje'];
						}
						else
							$mensaje_fila="El rango de fecha no cuadra";
						$ObtenerListaReferencias['datos'][$key]["respuesta"]=$respuesta_fila;
						$ObtenerListaReferencias['datos'][$key]["mensaje_fila"]=$mensaje_fila;
					}
				}
				else
					$mensaje_fila=$ObtenerListaReferencias['mensaje'];
				$datos=$ObtenerListaReferencias['datos'];
				$resultado=true;
			}
			else
				$mensaje=$ObtenerCookiePrincipalRefcon['mensaje'];
		}catch(\Exception $e){
			$mensaje=$e->getMessage().' en la linea: '.$e->getLine().' en el archivo: '.$e->getFile();
		}
		return ["resultado"=>$resultado,"mensaje"=>$mensaje,"datos"=>$datos];
	}
}
