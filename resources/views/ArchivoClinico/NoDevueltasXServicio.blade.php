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
	<style>
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
    }

    table {
      border-collapse: collapse;
      margin-top: 20px;
    }

    th, td {
      border: 1px solid #ddd;
      padding: 10px;
      text-align: left;
    }

    thead {
      background-color: #4CAF50;
      color: white;
    }

    tr:nth-child(even) {
      background-color: #f2f2f2;
    }

    tr:hover {
      background-color: #e0f7fa;
    }
  </style>
@stop
@section('content')
@if($errors->any())
<h4>{{$errors->first()}}</h4>
@endif
	<div class="form-group">
	<h1>No Devueltas por Servicio</h1>
		{{ html()->form('POST')->open() }}
		<div class="form-group row m-12">
			{{html()->label('Rango Fecha','FechaIni')->class(['form-check-label col-lg-3'])}}
			{{html()->date('FechaIni','')->required()->class(['form-control col-lg-3'])}}
			{{html()->date('FechaFin','')->required()->class(['form-control col-lg-3'])}}
            <input type="submit" name="guardar" id="guardar" value="Buscar" class="form-control btn btn-primary col-lg-3"/>
        </div>
		{{html()->form()->close()}}
	</div>
@isset($datos)
<div class="form-group row m-12">
	<input type="button" value="Imprimir" class="form-control btn btn-success" onclick="imprimir()"/>
</div>
<div id='imprimir'>
	<table border="1" width="100%">
	  <thead>
		<tr>
		  <th>HC</th>
		  <th>Paciente</th>
		  <th>Servicio</th>
		  <th>Solicitante</th>
		  <th>Observacion</th>
		  <th>Fecha Movimiento</th>
		  <th>Fecha Cita</th>
		</tr>
	  </thead>
	  <tbody>
		@foreach($datos as $Movimiento)
		<tr>
		  <td>{{$Movimiento->NroHistoriaClinica}}</td>
		  <td>{{$Movimiento->Paciente}}</td>
		  <td>{{$Movimiento->Servicio}}</td>
		  <td>{{$Movimiento->Solicitante}}</td>
		  <td>{{$Movimiento->Observacion}}</td>
		  <td>{{date("d/m/Y", strtotime($Movimiento->FechaMovimiento))}}</td>
		  <td>{{date("d/m/Y", strtotime($Movimiento->FechaCita))}}</td>
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