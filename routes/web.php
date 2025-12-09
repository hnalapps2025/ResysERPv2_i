<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\LoginController;
use App\Http\Controllers\ConsultaExternaController;
use App\Http\Controllers\WSConsultaExternaController;
use App\Http\Controllers\ArchivoClinicoController;
use App\Http\Controllers\ReferenciasController;

Route::get('login', [LoginController::class, 'login'])->name('login');
Route::post('login', [LoginController::class, 'login']);
Route::get('logout', [LoginController::class, 'logout'])->name('logout');

// Ruta protegida solo para empleados autenticados
Route::get('principal',[LoginController::class, 'principal'])->middleware('auth:empleado');
//ConsultaExterna
Route::get('ConsultaExterna/FUAMasivo',[ConsultaExternaController::class, 'FUAMasivo'])->middleware('auth:empleado');
Route::post('ConsultaExterna/FUAMasivo',[ConsultaExternaController::class, 'FUAMasivo'])->middleware('auth:empleado');
//ConsultaExternaWS
Route::post('WSConsultaExterna/FUAMasivo/buscar_especialidades_x_fecha',[WSConsultaExternaController::class, 'buscar_especialidades_x_fecha'])->middleware('auth:empleado');
//Archivo Clinico
Route::get('ArchivoClinico/ConsultaMovimientoHistoria',[ArchivoClinicoController::class, 'ConsultaMovimientoHistoria'])->middleware('auth:empleado');
Route::post('ArchivoClinico/ConsultaMovimientoHistoria',[ArchivoClinicoController::class, 'ConsultaMovimientoHistoria'])->middleware('auth:empleado');
Route::get('ArchivoClinico/SalidaHistoria',[ArchivoClinicoController::class, 'SalidaHistoria'])->middleware('auth:empleado');
Route::post('ArchivoClinico/SalidaHistoria',[ArchivoClinicoController::class, 'SalidaHistoria'])->middleware('auth:empleado');
Route::get('ArchivoClinico/RetornoHistoria',[ArchivoClinicoController::class, 'RetornoHistoria'])->middleware('auth:empleado');
Route::post('ArchivoClinico/RetornoHistoria',[ArchivoClinicoController::class, 'RetornoHistoria'])->middleware('auth:empleado');
Route::get('ArchivoClinico/NoDevueltasXServicio',[ArchivoClinicoController::class, 'NoDevueltasXServicio'])->middleware('auth:empleado');
Route::post('ArchivoClinico/NoDevueltasXServicio',[ArchivoClinicoController::class, 'NoDevueltasXServicio'])->middleware('auth:empleado');
Route::get('ArchivoClinico/NoDevueltasXSerie',[ArchivoClinicoController::class, 'NoDevueltasXSerie'])->middleware('auth:empleado');
Route::post('ArchivoClinico/NoDevueltasXSerie',[ArchivoClinicoController::class, 'NoDevueltasXSerie'])->middleware('auth:empleado');
Route::get('ArchivoClinico/NoDevueltasXRuta',[ArchivoClinicoController::class, 'NoDevueltasXRuta'])->middleware('auth:empleado');
Route::post('ArchivoClinico/NoDevueltasXRuta',[ArchivoClinicoController::class, 'NoDevueltasXRuta'])->middleware('auth:empleado');
Route::get('ArchivoClinico/ReporteCitados',[ArchivoClinicoController::class, 'ReporteCitados'])->middleware('auth:empleado');
Route::post('ArchivoClinico/ReporteCitados',[ArchivoClinicoController::class, 'ReporteCitados'])->middleware('auth:empleado');
Route::get('ArchivoClinico/ReporteHospitalizados',[ArchivoClinicoController::class, 'ReporteHospitalizados'])->middleware('auth:empleado');
//Referencias
Route::get('Referencias/Refcon/indicador_mensual',[ReferenciasController::class, 'indicador_mensual'])->middleware('auth:empleado');
Route::post('Referencias/Refcon/indicador_mensual',[ReferenciasController::class, 'indicador_mensual'])->middleware('auth:empleado');