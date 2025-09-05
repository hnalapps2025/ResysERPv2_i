@extends('layouts/default')

{{-- Page title --}}
@section('title')
    Movimiento Historia
    @parent
@stop
{{-- page level styles --}}
@section('header_styles')
    <!--Plugin styles-->
    <!--Page level styles-->
    <link type="text/css" rel="stylesheet" href="{{asset('assets/css/pages/form_elements.css')}}"/>	
	<style>
    
	</style>
@stop
@section('content')
@isset($mensaje))
<h4 style="background-color: #43ca06;">{{$mensaje}}</h4>
@endisset
@isset($error))
<h4 style="background-color: #ce0707; color: #fff8f8;">{{$error}}</h4>
@endisset
	<h3>Salida de Historia</h3>
	<div class="form-group">
		{{ html()->form('POST')->open() }}
		<div class="form-group row m-12">
			{{html()->label('Fecha Solicitada','Fecha')->class(['col-lg-2'])}}
			{{html()->date('Fecha','')->required()->class(['form-control col-lg-2'])}}
			{{html()->label('Turno','Turno')->class(['col-lg-1'])}}
			{{html()->select('Turno',[1=>'Mañana',2=>'Tarde'],1)->required()->class(['form-control col-lg-1'])}}
			{{html()->label('N° Historia','NroHistoria')->class(['col-lg-2'])}}
			{{html()->text('NroHistoria','')->required()->class(['form-control col-lg-2'])}}
			{{html()->text('Observacion','')->placeholder('Observacion')->class(['form-control col-lg-2'])}}
		</div>
		<div class="form-group row m-12">
			<div class="col-lg-12">
                <input type="submit" name="guardar" id="guardar" value="Buscar" class="form-control btn btn-primary"/>
            </div>
        </div>
		{{html()->form()->close()}}
	</div>
	@isset($datos)
	<h3>Retorno de Historia</h3>
	<div class="form-group">
		{{ html()->form('POST',asset('ArchivoClinico/RetornoHistoria'))->open() }}
		{{html()->hidden('NroHistoria',isset($datos)?$datos->NroHistoriaClinica:'')->required()->class(['form-control col-lg-4'])}}
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
		{{html()->form()->close()}}
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