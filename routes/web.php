<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\LoginController;
use App\Http\Controllers\ConsultaExternaController;
use App\Http\Controllers\WSConsultaExternaController;
use App\Http\Controllers\ArchivoClinicoController;
use App\Http\Controllers\ReferenciasController;
use App\Http\Controllers\ServicioController;
use App\Http\Controllers\HisController;
use App\Http\Controllers\ServicioSocialController;

Route::get('/', function () {
    return redirect()->route('login');
});
Route::get('login', [LoginController::class, 'login'])->name('login');
Route::post('login', [LoginController::class, 'login']);
Route::get('logout', [LoginController::class, 'logout'])->name('logout');
Route::get('cambiar_contrasena',[LoginController::class, 'cambiar_contrasena'])->middleware('auth:empleado');
Route::post('cambiar_contrasena',[LoginController::class, 'cambiar_contrasena'])->middleware('auth:empleado');

// Ruta protegida solo para empleados autenticados
Route::get('principal',[LoginController::class, 'principal'])->middleware('auth:empleado');
//ConsultaExterna
Route::get('ConsultaExterna/FUAMasivo',[ConsultaExternaController::class, 'FUAMasivo'])->middleware('auth:empleado');
Route::post('ConsultaExterna/FUAMasivo',[ConsultaExternaController::class, 'FUAMasivo'])->middleware('auth:empleado');
Route::get('ConsultaExterna/HISMasivo',[ConsultaExternaController::class, 'HISMasivo'])->middleware('auth:empleado');
Route::post('ConsultaExterna/HISMasivo',[ConsultaExternaController::class, 'HISMasivo'])->middleware('auth:empleado');
//Mantenimiento de Servicio
Route::resource('servicios', ServicioController::class)->middleware('auth:empleado');
//ConsultaExternaWS
Route::post('WSConsultaExterna/FUAMasivo/buscar_especialidades_x_fecha',[WSConsultaExternaController::class, 'buscar_especialidades_x_fecha'])->middleware('auth:empleado');
Route::post('WSConsultaExterna/HISMasivo/listar_servicios_x_fecha',[WSConsultaExternaController::class, 'listar_servicios_x_fecha'])->middleware('auth:empleado');
//Archivo Clinico
Route::get('ArchivoClinico/ConsultaMovimientoHistoria',[ArchivoClinicoController::class, 'ConsultaMovimientoHistoria'])->middleware('auth:empleado');
Route::post('ArchivoClinico/ConsultaMovimientoHistoria',[ArchivoClinicoController::class, 'ConsultaMovimientoHistoria'])->middleware('auth:empleado');
Route::get('ArchivoClinico/SalidaHistoria',[ArchivoClinicoController::class, 'SalidaHistoria'])->middleware('auth:empleado');
Route::post('ArchivoClinico/SalidaHistoria',[ArchivoClinicoController::class, 'SalidaHistoria'])->middleware('auth:empleado');
Route::get('ArchivoClinico/RetornoHistoria',[ArchivoClinicoController::class, 'RetornoHistoria'])->middleware('auth:empleado');
Route::post('ArchivoClinico/RetornoHistoria',[ArchivoClinicoController::class, 'RetornoHistoria'])->middleware('auth:empleado');
Route::get('ArchivoClinico/NoDevueltasXServicio',[ArchivoClinicoController::class, 'NoDevueltasXServicio'])->middleware('auth:empleado');
Route::post('ArchivoClinico/NoDevueltasXServicio',[ArchivoClinicoController::class, 'NoDevueltasXServicio'])->middleware('auth:empleado');
Route::get('ArchivoClinico/NoDevueltasXFechas',[ArchivoClinicoController::class, 'NoDevueltasXFechas'])->middleware('auth:empleado');
Route::post('ArchivoClinico/NoDevueltasXFechas',[ArchivoClinicoController::class, 'NoDevueltasXFechas'])->middleware('auth:empleado');
Route::get('ArchivoClinico/NoDevueltasXSerie',[ArchivoClinicoController::class, 'NoDevueltasXSerie'])->middleware('auth:empleado');
Route::post('ArchivoClinico/NoDevueltasXSerie',[ArchivoClinicoController::class, 'NoDevueltasXSerie'])->middleware('auth:empleado');
Route::get('ArchivoClinico/NoDevueltasXRuta',[ArchivoClinicoController::class, 'NoDevueltasXRuta'])->middleware('auth:empleado');
Route::post('ArchivoClinico/NoDevueltasXRuta',[ArchivoClinicoController::class, 'NoDevueltasXRuta'])->middleware('auth:empleado');
Route::get('ArchivoClinico/ReporteCitados',[ArchivoClinicoController::class, 'ReporteCitados'])->middleware('auth:empleado');
Route::post('ArchivoClinico/ReporteCitados',[ArchivoClinicoController::class, 'ReporteCitados'])->middleware('auth:empleado');
Route::get('ArchivoClinico/ReporteHospitalizados',[ArchivoClinicoController::class, 'ReporteHospitalizados'])->middleware('auth:empleado');
Route::get('ArchivoClinico/MantenimientoRutas',[ArchivoClinicoController::class, 'MantenimientoRutas'])->middleware('auth:empleado');
Route::post('ArchivoClinico/MantenimientoRutas',[ArchivoClinicoController::class, 'MantenimientoRutas'])->middleware('auth:empleado');
Route::get('ArchivoClinico/MantenimientoRutasServicios',[ArchivoClinicoController::class, 'MantenimientoRutasServicios'])->middleware('auth:empleado');
Route::post('ArchivoClinico/MantenimientoRutasServicios',[ArchivoClinicoController::class, 'MantenimientoRutasServicios'])->middleware('auth:empleado');
Route::get('ArchivoClinico/Rutas',[ArchivoClinicoController::class, 'Rutas'])->middleware('auth:empleado');
Route::post('ArchivoClinico/Rutas',[ArchivoClinicoController::class, 'Rutas'])->middleware('auth:empleado');
Route::get('ArchivoClinico/RutasConserje',[ArchivoClinicoController::class, 'RutasConserje'])->middleware('auth:empleado');
Route::post('ArchivoClinico/RutasConserje',[ArchivoClinicoController::class, 'RutasConserje'])->middleware('auth:empleado');
Route::get('ArchivoClinico/ReporteConserjeriaUbicados',[ArchivoClinicoController::class, 'ReporteConserjeriaUbicados'])->middleware('auth:empleado');
Route::post('ArchivoClinico/ReporteConserjeriaUbicados',[ArchivoClinicoController::class, 'ReporteConserjeriaUbicados'])->middleware('auth:empleado');
Route::get('ArchivoClinico/ReporteConserjeriaConsultorio',[ArchivoClinicoController::class, 'ReporteConserjeriaConsultorio'])->middleware('auth:empleado');
Route::post('ArchivoClinico/ReporteConserjeriaConsultorio',[ArchivoClinicoController::class, 'ReporteConserjeriaConsultorio'])->middleware('auth:empleado');
Route::get('ArchivoClinico/SalidaExternaHistoria',[ArchivoClinicoController::class, 'SalidaExternaHistoria'])->middleware('auth:empleado');
Route::post('ArchivoClinico/SalidaExternaHistoria',[ArchivoClinicoController::class, 'SalidaExternaHistoria'])->middleware('auth:empleado');
Route::post('ArchivoClinico/api/BuscarPacienteSalidaHC',[ArchivoClinicoController::class, 'BuscarPacienteSalidaHC'])->middleware('auth:empleado');
//Referencias
Route::get('Referencias/Refcon/indicador_mensual',[ReferenciasController::class, 'indicador_mensual'])->middleware('auth:empleado');
Route::post('Referencias/Refcon/indicador_mensual',[ReferenciasController::class, 'indicador_mensual'])->middleware('auth:empleado');
Route::get('Referencias/contrareferir',[ReferenciasController::class, 'contrareferir'])->middleware('auth:empleado');
Route::post('Referencias/contrareferir',[ReferenciasController::class, 'contrareferir'])->middleware('auth:empleado');
//EnviarHis
Route::get('HIS/servicios_his',[HisController::class, 'servicios_his'])->middleware('auth:empleado');
Route::post('HIS/servicios_his',[HisController::class, 'servicios_his'])->middleware('auth:empleado');
Route::get('HIS/r_his_ce',[HisController::class, 'r_his_ce'])->middleware('auth:empleado');
Route::get('HIS/r_his_ce_aprobados',[HisController::class, 'r_his_ce_aprobados'])->middleware('auth:empleado');
Route::get('HIS/r_his_ce_observados',[HisController::class, 'r_his_ce_observados'])->middleware('auth:empleado');
Route::get('HIS/r_his_ce_enviados',[HisController::class, 'r_his_ce_enviados'])->middleware('auth:empleado');
Route::get('HIS/actualiza_estado_his',[HisController::class, 'actualiza_estado_his'])->middleware('auth:empleado');
Route::get('HIS/atencion_detalle_his',[HisController::class, 'atencion_detalle_his'])->middleware('auth:empleado');
Route::post('HIS/atencion_detalle_his',[HisController::class, 'atencion_detalle_his'])->middleware('auth:empleado');
Route::get('HIS/enviar_atencion/{IdAtencion}',[HisController::class, 'enviar_atencion'])->middleware('auth:empleado');
Route::post('HIS/envio_masivo',[HisController::class, 'envio_masivo'])->middleware('auth:empleado');
//Servicio Social
Route::get('ServicioSocial/listar_atenciones',[ServicioSocialController::class, 'listar_atenciones'])->middleware('auth:empleado');
Route::get('ServicioSocial/crear_atencion_ss',[ServicioSocialController::class, 'crear_atencion_ss'])->middleware('auth:empleado');
Route::post('ServicioSocial/crear_atencion_ss',[ServicioSocialController::class, 'crear_atencion_ss'])->middleware('auth:empleado');
Route::post('ServicioSocial/buscar_paciente',[ServicioSocialController::class, 'buscar_paciente'])->middleware('auth:empleado');
Route::get('ServicioSocial/FichaSocial/{IdCuentaAtencion}',[ServicioSocialController::class, 'FichaSocial'])->middleware('auth:empleado');
Route::post('ServicioSocial/FichaSocial/{IdCuentaAtencion}',[ServicioSocialController::class, 'FichaSocial'])->middleware('auth:empleado');
Route::get('ServicioSocial/his_diario',[ServicioSocialController::class, 'his_diario'])->middleware('auth:empleado');
Route::post('ServicioSocial/his_diario',[ServicioSocialController::class, 'his_diario'])->middleware('auth:empleado');