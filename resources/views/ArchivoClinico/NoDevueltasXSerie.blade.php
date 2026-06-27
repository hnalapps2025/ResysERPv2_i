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

	<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
	<script src="https://cdn.datatables.net/1.13.8/js/jquery.dataTables.min.js"></script>
	<style>
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
	<table border="1" width="100%" id="tablaHistorias">
	  <thead style="background-color: #4CAF50; color: white;">
		<tr>
		  <th width="7%" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">HC</th>
		  <th width="20%" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Paciente</th>
		  <th width="20%" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Servicio</th>
		  <th width="20%" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Solicitante</th>
		  <th width="9%" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Motivo</th>
		  <th width="12%" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Observacion</th>
		  <th width="6%" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Fecha Movimiento</th>
		  <th width="6%" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Fecha Cita</th>
		</tr>
	  </thead>
	  <tbody>
		@foreach($datos as $Movimiento)
		<tr>
		  <td width="7%" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{{$Movimiento->NroHistoriaClinica}}</td>
		  <td width="20%" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{{$Movimiento->Paciente}}</td>
		  <td width="20%" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{{$Movimiento->Servicio}}</td>
		  <td width="20%" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{{$Movimiento->Solicitante}}</td>
		  <td width="9%" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{{$Movimiento->Motivo}}</td>
		  <td width="12%" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{{$Movimiento->Observacion}}</td>
		  <td width="6%" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{{date("d/m/Y", strtotime($Movimiento->FechaMovimiento))}}</td>
		  <td width="6%" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{{ $Movimiento->FechaCita ? date("d/m/Y", strtotime($Movimiento->FechaCita)) : '' }}</td>
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
		autoWidth: false
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