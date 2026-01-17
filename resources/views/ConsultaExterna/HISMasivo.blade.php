@extends('layouts/default')

{{-- Page title --}}
@section('title')
    HIS Masivo
    @parent
@stop
{{-- page level styles --}}
@section('header_styles')
    <!--Plugin styles-->
    <!--Page level styles-->
    <link type="text/css" rel="stylesheet" href="{{asset('assets/css/pages/form_elements.css')}}"/>	
@stop
@section('content')
@if($errors->any())
<h4>{{$errors->first()}}</h4>
@endif
	<div class="form-group">
		{{ html()->form('POST')->open() }}
		<div class="form-group row m-4">
			<div class="col-lg-2">
                <label for="fecha" class="control-label font-weight-bold">Fecha</label>
				{{html()->date('fecha','')->class(['form-control'])->attribute('onchange', 'cambiar_fecha(this.value)')->attribute('autocomplete', 'off')->required()}}
            </div>
            <div class="col-lg-2">
                <div class="form-check d-flex align-items-end">
					{{html()->radio('IdTipoServicio')->value(1)->checked(true)->attribute('onchange', 'cambiar_IdTipoServicio(this.value)')->class(['form-check-input'])}}
					{{html()->label('Consultorio')->class(['form-check-label'])}}
                </div>
                <div class="form-check">
                    {{html()->radio('IdTipoServicio')->value(5)->checked(false)->attribute('onchange', 'cambiar_IdTipoServicio(this.value)')->class(['form-check-input'])}}
					{{html()->label('Procedimiento')->class(['form-check-label'])}}
                </div>
            </div>
            <div class="col-lg-3">
                <label for="id_esp" id="label_esp" class="control-label font-weight-bold">Especialidad</label>
				{{html()->select('id_esp',[],0)->attribute('onchange', 'cambiar_id_esp(this.value)')->class(['form-control chzn-select'])}}
            </div>
            <div class="col-lg-3">
                <div class="form-check mb-0">
                    <input type="checkbox" class="form-check-input" id="cbx_servicio">
                    <label for="servicio" class="control-label font-weight-bold">Servicio</label>
                </div>
				{{html()->select('servicio[]',[],0)->id('servicio')->attribute('multiple', 'multiple')->class(['form-control chzn-select'])}}
            </div>
            <div class="col-lg-1 d-flex align-items-end">
                <input type="submit" name="guardar" id="guardar" value="Buscar" class="btn btn-primary"/>
            </div>
        </div>
		{{html()->form()->close()}}
	</div>
@isset($datos)
<div class="mb-3">
    <button type="button" class="btn btn-secondary" onclick="imprimirDiv()">
        Imprimir
    </button>
</div>
<div id='imprimir'>
@foreach($datos as $key=>$dato)
	@include('His.encabezado', ['fila'=>$dato])
	@if($key+1<count($datos))
		<div class='saltopagina' style='display:block; page-break-before:always;'></div>
	@endif
@endforeach
</div>
@endisset
@stop
@section('footer_scripts')
<!--Plugin scripts-->

<!--Page level scripts-->
<script type="text/javascript">
function cambiar_fecha(fecha)
{
	listar_especialidades(fecha,$('input[name="IdTipoServicio"]:checked').val());
}
function cambiar_IdTipoServicio(IdTipoServicio)
{
	listar_especialidades($("#fecha").val(),IdTipoServicio);
}
function cambiar_id_esp(id_esp)
{
	listar_servicios($("#fecha").val(),$('input[name="IdTipoServicio"]:checked').val(),id_esp);
}
function listar_especialidades(fecha,IdTipoServicio)
{
	var data = new URLSearchParams();
	data.append('fecha',fecha);
	data.append('IdTipoServicio',IdTipoServicio);
	data.append('_token', '{{csrf_token()}}');
	fetch('/WSConsultaExterna/FUAMasivo/buscar_especialidades_x_fecha', {
		method: "POST",
		body: data
	})
	.then(response => response.json())
	.then(dato => {
		if(dato.resultado)
		{
			$('#id_esp').empty().append('<option value="">Seleccione una opción</option>');    
			$.each(dato.datos, function(i, item) {
				$('#id_esp').append(
					$('<option>', {
						value: item.id_esp,
						text: item.especialidad
					})
				);
			});
		}
		else
			alert(dato.mensaje);
	})
	.catch(error => {
		console.error('Error al obtener la información:', error);
	});
}
function listar_servicios(fecha,IdTipoServicio,id_esp)
{
	var data = new URLSearchParams();
	data.append('fecha',fecha);
	data.append('IdTipoServicio',IdTipoServicio);
	data.append('id_esp',id_esp);
	data.append('_token', '{{csrf_token()}}');
	fetch('/WSConsultaExterna/HISMasivo/listar_servicios_x_fecha', {
		method: "POST",
		body: data
	})
	.then(response => response.json())
	.then(dato => {
		if(dato.resultado)
		{
			$('#servicio').empty();
			$.each(dato.datos, function(i, item) {
				$('#servicio').append(
					$('<option>', {
						value: item.IdServicioIngreso,
						text: item.Servicio
					})
				);
			});
		}
		else
			alert(dato.mensaje);
	})
	.catch(error => {
		console.error('Error al obtener la información:', error);
	});
}
function imprimirDiv() {
    let contenido = document.getElementById('imprimir').innerHTML;
    let ventana = window.open('', '', 'height=800,width=1000');

    ventana.document.write('<html><head><title>Imprimir</title>');
    ventana.document.write('<link rel="stylesheet" href="{{ asset('assets/css/app.css') }}">'); // opcional
    ventana.document.write('</head><body>');
    ventana.document.write(contenido);
    ventana.document.write('</body></html>');

    ventana.document.close();
    ventana.focus();
    ventana.print();
    ventana.close();
}
</script>
<!-- end page level scripts -->
@stop