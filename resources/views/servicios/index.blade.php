@extends('layouts/default')

{{-- Page title --}}
@section('title')
    Lista de Servicios
    @parent
@stop
{{-- page level styles --}}
@section('header_styles')
    <!--Plugin styles-->
    <!--Page level styles-->
    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.7/css/jquery.dataTables.min.css"/>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
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
</style>
@stop
@section('content')
<a href="{{ route('servicios.create') }}">Nuevo Servicio</a>

<table id="tablaServicios" class="display" width="100%">
    <thead>
        <tr>
            <th>IdServicio</th>
            <th>Nombre</th>
            <th>Acepta Cupos Web</th>
            <th>Nro Cupos Web</th>
            <th>Acciones</th>
        </tr>
    </thead>
    <tbody>
        @foreach($servicios as $s)
        <tr>
            <td>{{ $s->IdServicio }}</td>
            <td>{{ $s->Nombre }}</td>
            <td>{{ $s->AceptaCupoWeb ? 'Sí' : 'No' }}</td>
            <td>{{ $s->NroCuposWeb }}</td>
            <td>
                <a href="{{ route('servicios.edit', $s->IdServicio) }}"
				   title="Editar">
					<i class="fa-solid fa-pen-to-square"></i>
				</a>
            </td>
        </tr>
        @endforeach
    </tbody>
</table>
@stop
@section('footer_scripts')
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script src="https://cdn.datatables.net/1.13.7/js/jquery.dataTables.min.js"></script>

<script>
$(document).ready(function () {
    $('#tablaServicios').DataTable({
        language: {
            url: 'https://cdn.datatables.net/plug-ins/1.13.7/i18n/es-ES.json'
        },
        pageLength: 10,
        lengthMenu: [5, 10, 25, 50],
        order: [[0, 'asc']]
    });
});
</script>
@stop