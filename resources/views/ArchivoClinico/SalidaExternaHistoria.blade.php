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

            {{ html()->form('POST', route('guardar_movimiento'))
                ->id('frmMovimiento')
                ->open() }}

            <div class="row">

                <div class="col-md-4">
                    {{ html()->label('Nro. Historia Clínica', 'NroHistoriaClinica') }}

                    {{ html()->text('NroHistoriaClinica')
                        ->class('form-control')
                        ->id('NroHistoriaClinica')
                        ->placeholder('Ingrese N° Historia Clínica')
                    }}
                </div>

                <div class="col-md-2 d-flex align-items-end">
                    {{ html()->button('Buscar')
                        ->type('button')
                        ->class('btn btn-primary')
                        ->id('btnBuscar')
                    }}
                </div>

            </div>

            <hr>

            {{ html()->hidden('IdPaciente')->id('IdPaciente') }}

            <div class="row">

                <div class="col-md-6">
                    {{ html()->label('Paciente') }}

                    {{ html()->text('Paciente')
                        ->class('form-control')
                        ->id('Paciente')
                        ->attribute('readonly', true)
                    }}
                </div>

                <div class="col-md-3">
                    {{ html()->label('DNI') }}

                    {{ html()->text('Dni')
                        ->class('form-control')
                        ->id('Dni')
                        ->attribute('readonly', true)
                    }}
                </div>

                <div class="col-md-3">
                    {{ html()->label('Fecha Nacimiento') }}

                    {{ html()->text('FechaNacimiento')
                        ->class('form-control')
                        ->id('FechaNacimiento')
                        ->attribute('readonly', true)
                    }}
                </div>

            </div>

            <hr>

            {{ html()->submit('Guardar Movimiento')
                ->class('btn btn-success')
            }}

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

    let historia = $('#NroHistoriaClinica').val();

    if (historia.trim() === '') {
        alert('Ingrese el número de historia clínica');
        return;
    }

    $.ajax({
        url: '/archivoclinico/api/buscar_paciente_salida',
        method: 'POST',
        data: {
            NroHistoriaClinica: historia,
            _token: '{{ csrf_token() }}'
        },
        success: function (response) {

            if (response.success) {

                $('#IdPaciente').val(response.data.IdPaciente);
                $('#Paciente').val(response.data.Apellidos + ' ' + response.data.Nombres);
                $('#Dni').val(response.data.Dni);
                $('#FechaNacimiento').val(response.data.FechaNacimiento);

            } else {

                $('#IdPaciente').val('');
                $('#Paciente').val('');
                $('#Dni').val('');
                $('#FechaNacimiento').val('');

                alert('Paciente no encontrado.');

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