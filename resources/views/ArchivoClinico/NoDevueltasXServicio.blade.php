@extends('layouts/default')

{{-- Page title --}}
@section('title')
    No Devueltas X Servicio
    @parent
@stop
{{-- page level styles --}}
@section('header_styles')
    <!--Plugin styles-->
    <!--Page level styles-->
    <link type="text/css" rel="stylesheet" href="{{asset('assets/css/pages/form_elements.css')}}"/>
	<link rel="stylesheet" href="https://cdn.datatables.net/1.13.8/css/jquery.dataTables.min.css">

	<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
	<script src="https://cdn.datatables.net/1.13.8/js/jquery.dataTables.min.js"></script>
	<style>
    
  </style>
@stop
@section('content')
@if($errors->any())
<h4 style="background-color: #ce0707; color: #fff8f8;">{{$errors->first()}}</h4>
@endif	
	<h1>No Devueltas por Servicio</h1>
	{{ html()->form('POST')->open() }}
	<div class="form-group row m-12">
		{{html()->select('tipo_fecha',[1=>'Fecha Movimiento',2=>'Fecha Cita'],1)->required()->class(['form-control col-lg-2'])}}
		{{html()->date('FechaIni','')->required()->class(['form-control col-lg-2'])}}
		{{html()->date('FechaFin','')->required()->class(['form-control col-lg-2'])}}
		{{html()->label('Consultorio','id_esp')->class(['form-check-label col-lg-1'])}}
		{{html()->select('id_esp',$Especialidades,'')->required()->class(['form-control col-lg-4'])}}
		<input type="submit" name="guardar" id="guardar" value="Buscar" class="form-control btn btn-primary col-lg-1"/>
	</div>
	{{html()->form()->close()}}
@isset($datos)
<div class="form-group row m-12">
	<input type="button" value="Imprimir" class="form-control btn btn-success" onclick="imprimir()"/>
</div>
<div id='imprimir'>
	<table border="1" width="100%" id="tablaHistorias" style="font-size:9px">
	  <thead style="background-color: #4CAF50; color: white;">
		<tr>
		  <th>HC</th>
		  <th>C</th>
		  <th>Paciente</th>
		  <th>Servicio</th>
		  <th>Solicitante</th>
		  <th>Observacion</th>
		  <th>F. Movimiento</th>
		  <th>F. Cita</th>
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
            url: '//cdn.datatables.net/plug-ins/1.13.8/i18n/es-ES.json'
        },
		pageLength: 5000,
		autoWidth: false,
		columnDefs: [
			{ width: "6%", targets: 0 },
			{ width: "1%", targets: 1 },
			{ width: "22%", targets: 2 },
			{ width: "22%", targets: 3 },
			{ width: "22%", targets: 4 },
			{ width: "12%", targets: 5 },
			{ width: "7%", targets: 6 },
			{ width: "7%", targets: 7 }
		]
    });
});
function imprimir()
{
	const contenido = document.getElementById('imprimir').innerHTML;
      const ventanaImpresion = window.open('', '', 'height=600,width=800');
      ventanaImpresion.document.write('<html><head><title>Imprimir</title></head><body>');
      ventanaImpresion.document.write(contenido);
      ventanaImpresion.document.write('</body></html>');
      ventanaImpresion.document.close();
      ventanaImpresion.focus();
      ventanaImpresion.print();
      ventanaImpresion.close();
}
</script>
<!-- end page level scripts -->
@stop