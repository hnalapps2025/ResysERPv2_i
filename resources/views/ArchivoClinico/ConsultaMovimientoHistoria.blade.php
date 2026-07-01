@extends('layouts/default')

{{-- Page title --}}
@section('title')
    Consulta Movimiento Historia
    @parent
@stop
{{-- page level styles --}}
@section('header_styles')
    <!--Plugin styles-->
    <!--Page level styles-->
    <link type="text/css" rel="stylesheet" href="{{asset('assets/css/pages/form_elements.css')}}"/>	
	<style>
    body {
        font-family: Arial, sans-serif;
        padding: 20px;
    }

    table {
        border-collapse: collapse;
        margin-top: 10px;
        width: 100%;
        font-size: 11px;
    }

    th, td {
        border: 1px solid #666;
        padding: 4px 6px;
        text-align: left;
    }

    thead {
        background-color: #2c3e50;
        color: white;
    }

    tr:nth-child(even) {
        background-color: #f8f9fa;
    }

    /* Estilos para impresión */
    @media print {

        body {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 10px;
            padding: 5px;
            margin: 0;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            font-size: 9px;
        }

        th {
            background-color: #d9d9d9 !important;
            color: #000 !important;
            font-weight: bold;
            text-align: center;
            padding: 4px;
        }

        td {
            padding: 3px;
            vertical-align: top;
        }

        .datos-paciente {
            margin-bottom: 10px;
            font-size: 10px;
        }

        .titulo-reporte {
            text-align: center;
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 10px;
        }

        @page {
            margin: 10mm;
        }
    }
</style>
@stop
@section('content')
@if($errors->any())
<h4 style="background-color: #ce0707; color: #fff8f8;">{{$errors->first()}}</h4>
@endif
	<div class="form-group">
		{{ html()->form('POST')->open() }}
		<div class="form-group row m-12">
			<div class="col-lg-4">
                {{html()->label('NroHistoriaClinica','NroHistoriaClinica')->class(['form-check-label'])}}
			</div>
			<div class="col-lg-4">
				{{html()->number('NroHistoriaClinica','')->attribute('min', '1')->attribute('step', '1')->required()->class(['form-control'])}}
			</div>
            <div class="col-lg-4">
                <input type="submit" name="guardar" id="guardar" value="Buscar" class="form-control btn btn-primary"/>
            </div>
        </div>
		{{html()->form()->close()}}
	</div>
@isset($datos)
<div class="form-group row m-12">
	<input type="button" value="Imprimir" class="form-control btn btn-success" onclick="imprimir()"/>
</div>
<div id='imprimir'>
	<div class="titulo-reporte">
        HISTORIAL DE MOVIMIENTOS DE HISTORIA CLÍNICA
    </div>

    <div class="datos-paciente">
        <strong>Historia Clínica:</strong> {{$datos->NroHistoriaClinica}}
        &nbsp;&nbsp;&nbsp;
        <strong>Paciente:</strong>
        {{$datos->ApellidoPaterno}} {{$datos->ApellidoMaterno}} {{$datos->PrimerNombre}}
        &nbsp;&nbsp;&nbsp;
        <strong>Fecha Nacimiento:</strong>
        {{date("d/m/Y", strtotime($datos->FechaNacimiento))}}
    </div>
	<table border="1" width="100%">
	  <thead>
		<tr>
		  <th>MotivoMovimiento</th>
		  <th>FechaMovimiento</th>
		  <th>FechaCita</th>
		  <th>Observacion</th>
		  <th>ServicioOrigen</th>
		  <th>ServicioDestino</th>
		</tr>
	  </thead>
	  <tbody>
		@foreach($datos->Movimientos as $Movimiento)
		<tr>
		  <td>{{$Movimiento->MotivoMovimiento}}</td>
		  <td>{{date("d/m/Y H:i:s", strtotime($Movimiento->FechaMovimiento))}}</td>
		  <td>{{$Movimiento->FechaIngreso!=null?date("d/m/Y", strtotime($Movimiento->FechaIngreso))." ".$Movimiento->HoraIngreso:""}}</td>
		  <td>{{$Movimiento->Observacion}}</td>
		  <td>{{$Movimiento->ServicioOrigen}}</td>
		  <td>{{$Movimiento->ServicioDestino}}</td>
		</tr>
		@endforeach
	  </tbody>
	</table>
</div>
@endisset
@stop
@section('footer_scripts')
<!--Plugin scripts-->

<!--Page level scripts-->
<script type="text/javascript">
function imprimir() {
    const contenido = document.getElementById('imprimir').innerHTML;

    const ventanaImpresion = window.open('', '_blank');

    ventanaImpresion.document.write(`
        <html>
        <head>
            <title>Historial de Movimientos</title>
            <style>
                body{
                    font-family: Arial, sans-serif;
                    font-size:10px;
                    margin:10px;
                }
                .titulo-reporte{
                    text-align:center;
                    font-size:14px;
                    font-weight:bold;
                    margin-bottom:10px;
                }
                .datos-paciente{
                    margin-bottom:10px;
                    font-size:10px;
                }
                table{
                    width:100%;
                    border-collapse:collapse;
                    font-size:9px;
                }
                th,td{
                    border:1px solid #000;
                    padding:3px;
                }
                th{
                    background:#d9d9d9;
                }
                @page{
                    margin:10mm;
                }
            </style>
        </head>
        <body>
            ${contenido}
        </body>
        </html>
    `);

    ventanaImpresion.document.close();
    ventanaImpresion.focus();

    setTimeout(() => {
        ventanaImpresion.print();
        ventanaImpresion.close();
    }, 500);
}
</script>
<!-- end page level scripts -->
@stop