@extends('layouts/default')

{{-- Page title --}}
@section('title')
    No Devueltas X Serie
    @parent
@stop
{{-- page level styles --}}
@section('header_styles')
    <!--Plugin styles-->
    <!--Page level styles-->
    <link type="text/css" rel="stylesheet" href="{{asset('assets/css/pages/form_elements.css')}}"/>
	<link rel="stylesheet" href="https://cdn.datatables.net/1.13.8/css/jquery.dataTables.min.css">
	<style>
    .titulo-reporte {
            text-align: center;
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 10px;
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
			{{html()->label('Serie','SerieIni')->class(['form-check-label col-lg-2'])}}
			{{html()->number('SerieIni','')->required()->class(['form-control col-lg-1'])}}
			{{html()->number('SerieFin','')->required()->class(['form-control col-lg-1'])}}
			{{html()->select('tipo_fecha',[1=>'Fecha Movimiento',2=>'Fecha Cita'],1)->required()->class(['form-control col-lg-2'])}}
			{{html()->date('FechaIni','')->required()->class(['form-control col-lg-2'])}}
			{{html()->date('FechaFin','')->required()->class(['form-control col-lg-2'])}}
            <input type="submit" name="guardar" id="guardar" value="Buscar" class="form-control btn btn-primary col-lg-2"/>
        </div>
		{{html()->form()->close()}}
	</div>
@isset($datos)
<div class="form-group row m-12">
	<input type="button" value="Imprimir" class="form-control btn btn-success" onclick="imprimir()"/>
</div>
<div id='imprimir'>
	<div class="titulo-reporte">
        No Devueltas Por Serie
    </div>
	<table border="1" width="100%" id="tablaHistorias" style="font-size:9px">
	  <thead style="background-color: #4CAF50; color: white;">
		<tr>
		  <th>HC</th>
		  <th>C</th>
		  <th>Paciente</th>
		  <th>Servicio</th>
		  <th>Solicitante</th>
		  <th>Motivo</th>
		  <th>Observacion</th>
		  <th>Fecha Movimiento</th>
		  <th>Fecha Cita</th>
		</tr>
	  </thead>
	  <tbody>
		@foreach($datos as $Movimiento)
		<tr>
		  <td>{{$Movimiento->NroHistoriaClinica}}</td>
		  <td>{{substr($Movimiento->NroHistoriaClinica, -2)}}</td>
		  <td>{{$Movimiento->Paciente}}</td>
		  <td>{{$Movimiento->Servicio}}</td>
		  <td>{{$Movimiento->Solicitante}}</td>
		  <td>{{$Movimiento->Motivo}}</td>
		  <td>{{$Movimiento->Observacion}}</td>
		  <td>{{date("d/m/Y", strtotime($Movimiento->FechaMovimiento))}}</td>
		  <td>{{ $Movimiento->FechaCita ? date("d/m/Y", strtotime($Movimiento->FechaCita)) : '' }}</td>
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
$(document).ready(function() {
    $('#tablaHistorias').DataTable({
        language: {
            url: 'https://cdn.datatables.net/plug-ins/1.13.8/i18n/es-ES.json'
        },
		pageLength: 5000,
		autoWidth: false,
		columnDefs: [
			{ width: "5%", targets: 0 },
			{ width: "1%", targets: 1 },
			{ width: "23%", targets: 2 },
			{ width: "22%", targets: 3 },
			{ width: "22%", targets: 4 },
			{ width: "9%", targets: 5 },
			{ width: "6%", targets: 6 },
			{ width: "6%", targets: 7 },
			{ width: "6%", targets: 8 }
		]
    });
});
function imprimir()
{
    const tabla = document.getElementById('tablaHistorias').cloneNode(true);

    // Eliminar clases/atributos propios de DataTables
    tabla.removeAttribute('id');
    tabla.classList.remove('dataTable');

    // Crear ventana
    const ventanaImpresion = window.open('', '', 'height=800,width=1200');

    ventanaImpresion.document.write(`
        <html>
        <head>
            <title>No Devueltas Por Serie</title>

            <style>
                body {
                    font-family: Arial, sans-serif;
                    font-size: 9px;
                }

                .titulo-reporte {
                    text-align: center;
                    font-size: 14px;
                    font-weight: bold;
                    margin-bottom: 10px;
                }

                table {
                    border-collapse: collapse;
                    width: 100%;
                }

                th {
                    background-color: #4CAF50;
                    color: white;
                    font-weight: bold;
                }

                th, td {
                    border: 1px solid #000;
                    padding: 3px;
                }

                @media print {
                    @page {
                        size: A4;
                        margin: 10mm;
                    }
                }
            </style>
        </head>

        <body>

            <div class="titulo-reporte">
                No Devueltas Por Serie
            </div>

            ${tabla.outerHTML}

        </body>
        </html>
    `);

    ventanaImpresion.document.close();
    ventanaImpresion.focus();

    setTimeout(function() {
        ventanaImpresion.print();
        ventanaImpresion.close();
    }, 300);
}
</script>
<!-- end page level scripts -->
@stop