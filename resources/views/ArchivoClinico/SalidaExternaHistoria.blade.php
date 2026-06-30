@extends('layouts/default')

{{-- Page title --}}
@section('title')
    Salida Historia
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
<div class="container">
    <div class="card">
        <div class="card-header">
            <h4>Registro de Movimiento de Historia Clínica</h4>
        </div>

        <div class="card-body">

            {{ html()->form('POST')->id('frmMovimiento')->open() }}

            {{ html()->hidden('IdPaciente')->id('IdPaciente') }}

            <div class="row">

                <div class="col-md-2">
                    {{ html()->label('Nro. Historia Clínica', 'NroHistoriaClinica') }}

                    {{ html()->text('NroHistoriaClinica')
                        ->class('form-control')
                        ->id('NroHistoriaClinica')
                        ->placeholder('Ingrese N° Historia Clínica')->required() }}
                </div>

                <div class="col-md-2 d-flex align-items-end">
                    {{ html()->button('Buscar')
                        ->type('button')
                        ->class('btn btn-primary')
                        ->id('btnBuscar') }}
                </div>

                <div class="col-md-8">
                    {{ html()->label('Paciente') }}

                    {{ html()->text('Paciente')
                        ->class('form-control')
                        ->id('Paciente')
                        ->attribute('readonly', true) }}
                </div>
            </div>
            <hr>
            <div class="row">
                <div class="col-md-6">
                    {{ html()->label('Servicio Destino', 'IdServicio') }}
                    {{ html()->select('IdServicio', $servicios ?? [])->class('form-control')->placeholder('Seleccione...')->required() }}
                </div>

                <div class="col-md-6">
                    {{ html()->label('Motivo', 'IdMotivo') }}

                    {{ html()->select('IdMotivo', $motivos ?? [])
                        ->class('form-control')
                        ->placeholder('Seleccione...')->required() }}
                </div>

            </div>

            <br>

            <div class="row">

                <div class="col-md-6">
                    {{ html()->label('Conserje', 'IdConserje') }}

                    {{ html()->select('IdConserje', $conserjes ?? [])
                        ->class('form-control')
                        ->placeholder('Seleccione...')->required() }}
                </div>

                <div class="col-md-6">
                    {{ html()->label('Empleado que Solicita', 'IdEmpleadoSolicita') }}

                    {{ html()->select('IdEmpleadoSolicita', $empleados ?? [])
                        ->class('form-control')
                        ->placeholder('Seleccione...')->required() }}
                </div>
            </div>
            <br>
            <div class="row">
                <div class="col-md-12">
                    {{ html()->label('Observación', 'Observacion') }}
                    {{ html()->textarea('Observacion')->class('form-control')->rows(4)->placeholder('Ingrese una observación') }}
                </div>
            </div>
            <hr>
            {{ html()->submit('Guardar Movimiento')->id('btnGuardar')->class('btn btn-success')->attribute('disabled', true) }}
            {{ html()->form()->close() }}
        </div>
    </div>
</div>
@stop
@section('footer_scripts')
<!--Plugin scripts-->

<!--Page level scripts-->
<script type="text/javascript">
$('#btnBuscar').on('click', function () {
    $('#btnGuardar').prop('disabled', true);
	$('#Paciente').val('');
	let historia = $('#NroHistoriaClinica').val();
    if (historia.trim() === '') {
        alert('Ingrese el número de historia clínica');
        return;
    }
    $.ajax({
        url: '/ArchivoClinico/api/BuscarPacienteSalidaHC',
        method: 'POST',
        data: {
            NroHistoriaClinica: historia,
            _token: '{{ csrf_token() }}'
        },
        success: function (response) {
            if (response.resultado) {
                $('#IdPaciente').val(response.datos.IdPaciente);
                $('#Paciente').val(response.datos.ApellidoPaterno + ' ' +response.datos.ApellidoMaterno+' '+ response.datos.PrimerNombre);
				$('#btnGuardar').prop('disabled', false);
            } else {
                alert(response.mensaje);
            }
        },
        error: function () {
            alert('Ocurrió un error al consultar la información.');
        }
    });

});
</script>
<!-- end page level scripts -->
@stop