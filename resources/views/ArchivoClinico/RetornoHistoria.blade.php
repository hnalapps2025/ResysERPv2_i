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
    {{ html()->label('N° Historia', 'NroHistoria')->class(['col-lg-2']) }}

    {{ html()->text(
        'NroHistoria',
        isset($datos) ? $datos->NroHistoriaClinica : ''
    )->required()->class(['form-control col-lg-4']) }}

    <input type="submit"
           name="accion"
           id="Buscar"
           value="Buscar"
           class="form-control btn btn-primary col-lg-6"/>
</div>

@isset($datos)

<div class="form-group row m-12">
    {{ html()->label('Observacion', 'Observacion')->class(['col-lg-2']) }}

    {{ html()->textarea('Observacion', $datos->Observacion)
        ->placeholder('Observacion')
        ->class(['form-control col-lg-10'])
        ->attribute('id', 'Observacion') }}
</div>

<div class="form-group row m-12">
    <input type="submit"
           name="accion"
           id="Retornar"
           value="Retornar"
           class="form-control btn btn-success col-lg-12"/>
</div>

@endisset

{{ html()->form()->close() }}
	</div>
@stop
@section('footer_scripts')
<!--Plugin scripts-->

<!--Page level scripts-->
<script type="text/javascript">
document.addEventListener('DOMContentLoaded', function () {

    const nroHistoria = document.getElementById('NroHistoria');
    const observacion = document.getElementById('Observacion');
    const retornar = document.getElementById('Retornar');

    // Primera pantalla: foco en N° Historia
    if (nroHistoria && !observacion) {
        nroHistoria.focus();
    }

    // Segunda pantalla: foco en Observación
    if (observacion) {
        observacion.focus();

        // Enter en Observación => click en Retornar
        observacion.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                retornar.click();
            }
        });
    }
});
</script>
<!-- end page level scripts -->
@stop