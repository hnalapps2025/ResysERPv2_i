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
		{{ html()->form('POST')->open() }}
		<div class="form-group row m-12">
			<div class="col-lg-4">
                {{html()->label('NroHistoriaClinica','NroHistoriaClinica')->class(['form-check-label'])}}
			</div>
			<div class="col-lg-4">
				{{html()->text('NroHistoriaClinica','')->required()->class(['form-control'])}}
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
	<div class="form-group">
		<div class="form-group row m-12">
			{{html()->label('NroHistoriaClinica','NroHistoriaClinica')->class(['col-lg-2'])}}
			{{html()->text('Paciente',$datos->NroHistoriaClinica)->class(['col-lg-2 form-control'])}}
			{{html()->label('Paciente','Paciente')->class(['col-lg-1'])}}
			{{html()->text('Paciente',$datos->ApellidoPaterno.' '.$datos->ApellidoMaterno.' '.$datos->PrimerNombre)->class(['col-lg-4 form-control'])}}
			{{html()->label('FechaNacimiento','FechaNacimiento')->class(['col-lg-2'])}}
			{{html()->text('FechaNacimiento',date("d/m/Y", strtotime($datos->FechaNacimiento)))->class(['col-lg-1 form-control'])}}
        </div>
	</div>
	<table border="1" width="100%">
	  <thead>
		<tr>
		  <th>IdMovimiento</th>
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
		  <td>{{$Movimiento->IdMovimiento}}</td>
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