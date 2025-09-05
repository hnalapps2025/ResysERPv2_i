@extends('layouts/default')

{{-- Page title --}}
@section('title')
    Retorno Historia
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
			{{html()->label('N° Historia','NroHistoria')->class(['col-lg-2'])}}
			{{html()->text('NroHistoria',isset($datos)?$datos->NroHistoriaClinica:'')->required()->class(['form-control col-lg-4'])}}
			<input type="submit" name="accion" id="Buscar" value="Buscar" class="form-control btn btn-primary col-lg-6"/>
		</div>
		@isset($datos)
		<table width="100%" border=1>
			<thead>
			  <tr>
				<th>Nro Historia</th>
				<th>Servicio</th>
				<th>Fecha Movimiento</th>
				<th>Tipo Movimiento</th>
				<th>Archivero</th>
				<th>Conserje</th>
				<th>Observación</th>
			  </tr>
			</thead>
			<tbody>
			  <!-- Filas de ejemplo -->
			  <tr>
				<td>{{$datos->NroHistoriaClinica}}</td>
				<td>{{$datos->Servicio}}</td>
				<td>{{$datos->FechaMovimiento}}</td>
				<td>{{$datos->Motivo}}</td>
				<td>{{$datos->Archivero}}</td>
				<td>{{$datos->Conserje}}</td>
				<td>{{$datos->Observacion}}</td>
			  </tr>
			</tbody>
		</table>
		<div class="form-group row m-12">
			{{html()->label('Observacion','Observacion')->class(['col-lg-2'])}}
			{{html()->text('Observacion','')->placeholder('Observacion')->class(['form-control col-lg-10'])}}
		</div>
		<div class="form-group row m-12">
			<input type="submit" name="accion" id="Retornar" value="Retornar" class="form-control btn btn-success col-lg-12"/>
        </div>
		@endisset
		{{html()->form()->close()}}
	</div>
@stop
@section('footer_scripts')
<!--Plugin scripts-->

<!--Page level scripts-->
<script type="text/javascript">

</script>
<!-- end page level scripts -->
@stop