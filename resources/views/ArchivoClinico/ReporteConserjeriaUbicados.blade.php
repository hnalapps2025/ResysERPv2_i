@extends('layouts/default')

{{-- Page title --}}
@section('title')
    Conserjeria Ubicados
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
<h4>Reporte Conserjeria Ubicados</h4>
	<div class="form-group">
		{{ html()->form('POST')->open() }}
		{{html()->hidden('n_ruta','Ambos')->id('n_ruta')}}
		<div class="form-group row m-12">
			{{html()->label('Fecha','fecha')->class(['col-lg-2'])}}
			{{html()->date('fecha','')->required()->class(['form-control col-lg-2'])}}
			{{html()->label('Turno','turno')->class(['col-lg-2'])}}
			{{html()->select('turno',[0=>'Ambos',1=>'Mañana',2=>'Tarde'],0)->required()->class(['form-control col-lg-2'])->attribute('onchange', 'cargarRutas(this.value)')}}
			{{html()->label('Ruta','ruta')->class(['col-lg-2'])}}
			{{html()->select('ruta',$ListaRutas,0)->id('ruta')->required()->class(['form-control col-lg-2'])->attribute('onchange', 'cargarEspecialidad(this.value)')}}
		</div>
		<div class="form-group row m-12">
			{{html()->label('Especialidad','especialidad')->class(['col-lg-2'])}}
			{{html()->select('especialidad',$ListaEspecialidades,0)->id('especialidad')->required()->class(['form-control col-lg-2'])->attribute('onchange', 'cargarServicios(this.value)')}}
			{{html()->label('Servicio','servicio')->class(['col-lg-2'])}}
			{{html()->select('servicio',$ListaServicios,0)->id('servicio')->required()->class(['form-control col-lg-2'])}}
			<input type="submit" name="accion" id="Buscar" value="Buscar" class="form-control btn btn-primary col-lg-4"/>
		</div>		
		{{html()->form()->close()}}
	</div>
@stop
@section('footer_scripts')
<!--Plugin scripts-->

<!--Page level scripts-->
<script type="text/javascript">
const listaRutas = @json($ListaTurnos);
const ListaEspecialidadesBD = @json($ListaEspecialidadesBD);
const ListaServiciosBD = @json($ListaServiciosBD);
function cargarRutas(turno) {
    let ruta = document.getElementById('ruta');
	document.getElementById('n_ruta').value=document.getElementById('turno').options[document.getElementById('turno').selectedIndex].text;
    ruta.innerHTML = '<option value="0">Todos</option>';
    listaRutas.forEach(function(item) {
        if (turno == 0 || item.IdTipoTurnoRef == turno) {
            ruta.add(new Option(item.Nombre, item.IdRuta));
        }
    });
}
function cargarEspecialidad(IdRuta) {
    let especialidad = document.getElementById('especialidad');
    especialidad.innerHTML = '<option value="0">Todos</option>';
    ListaEspecialidadesBD.forEach(function(item) {
        if (IdRuta == 0 || item.IdRuta == IdRuta) {
            especialidad.add(new Option(item.Nombre, item.IdEspecialidad));
        }
    });
}
function cargarServicios(IdEspecialidad) {
    let servicio = document.getElementById('servicio');
    servicio.innerHTML = '<option value="0">Todos</option>';
    ListaServiciosBD.forEach(function(item) {
        if (IdEspecialidad == 0 || item.IdEspecialidad == IdEspecialidad) {
            servicio.add(new Option(item.Nombre, item.IdServicio));
        }
    });
}
</script>
<!-- end page level scripts -->
@stop