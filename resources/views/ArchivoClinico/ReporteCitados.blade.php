@extends('layouts/default')

{{-- Page title --}}
@section('title')
    No Devueltas X Ruta
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
	<h1>Citados</h1>
	<div class="form-group row">
		{{html()->label('Fecha','fecha')->class(['form-check-label col-lg-1 text-lg-right'])}}
		{{html()->date('fecha','')->required()->class(['form-control col-lg-2'])}}
		{{html()->label('Serie','rini')->class(['form-check-label col-lg-1 text-lg-right'])}}
		{{html()->number('rini','')->required()->class(['form-control col-lg-1'])}}
		{{html()->number('rfin','')->required()->class(['form-control col-lg-1'])}}
		{{html()->label('Turno','turno')->class(['form-check-label col-lg-1 text-lg-right'])}}
		{{html()->select('Turno',[0=>'Ambos',1=>'Mañana',2=>'Tarde'],0)->required()->class(['form-control col-lg-2'])}}
		<div class="col-lg-1 text-lg-right"><label for="turno" class="control-label">Rechequeo</label></div>
		<div class="col-lg-1"><input type="checkbox" id="rechequeo" name="rechequeo"/></div>
	</div>
	<div class="form-group row">
		<div class="col-lg-12"><input type='submit' class='form-control btn btn-primary'/></div>
	</div>
{{html()->form()->close()}}
    @isset($Tabla)
	<div class="form-group row">
		<div class="col-lg-12"><button onclick="imprimir()" class='form-control btn btn-success'>Imprimir</button></div>
	</div>
	<div id="imprimir">
	{!!$Tabla!!}
	</div>
	@endisset
</div>
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