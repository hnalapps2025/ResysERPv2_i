@extends('layouts/default')

{{-- Page title --}}
@section('title')
    FUA Masivo
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
				{{html()->select('id_esp',[],0)->class(['form-control chzn-select'])}}
            </div>
            <div class="col-lg-3">
                <div class="form-check mb-0">
                    <input type="checkbox" class="form-check-input" id="cbx_servicio">
                    <label for="servicio" class="control-label font-weight-bold">Servicio</label>
                </div>
				{{html()->select('servicio',[],0)->class(['form-control chzn-select'])}}
            </div>
            <div class="col-lg-1 d-flex align-items-end">
                <input type="submit" name="guardar" id="guardar" value="Buscar" class="btn btn-primary"/>
            </div>
        </div>
		{{html()->form()->close()}}
	</div>
<div id='imprimir'>
</div>
<div id="cargando" style="position:absolute;top:0;left:0;width:100%;height:100%;display:none;background:red;z-index:100000;opacity:0.6;">
	<div style="position:absolute;top:50%;left: 50%; font-size:40px">Espere...Estamos Realizando la Peticion</div>
</div>
@stop
@section('footer_scripts')
<!--Plugin scripts-->

<!--Page level scripts-->
<script type="text/javascript">
function cambiar_fecha(fecha)
{
	listar_especialidaddes(fecha,$('input[name="IdTipoServicio"]:checked').val());
}
function cambiar_IdTipoServicio(IdTipoServicio)
{
	listar_especialidaddes($("#fecha").val(),IdTipoServicio);
}
function listar_especialidaddes(fecha,IdTipoServicio)
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
</script>
<!-- end page level scripts -->
@stop