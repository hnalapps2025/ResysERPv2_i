@extends('layouts/default')

{{-- Page title --}}
@section('title')
    HIS Diario
    @parent
@stop
{{-- page level styles --}}
@section('header_styles')
    <!--Plugin styles-->
    <link type="text/css" rel="stylesheet" href="{{asset('assets/vendors/bootstrapvalidator/css/bootstrapValidator.min.css')}}"/>
<!--page level styles-->
    <link type="text/css" rel="stylesheet" href="{{asset('assets/css/pages/wizards.css')}}"/>
    <!--End of page styles-->
@stop
@section('content')
@if($errors->any())
<h4>{{$errors->first()}}</h4>
@endif
<div class="container-fluid py-4 mx-4">
<form method="post">
@csrf
	<div class="form-group row">
		<div class="col-12">
			<h1>Busqueda HIS</h1>
		</div>
	</div>
	<div class="form-group row">
		<div class="col-lg-2 text-lg-right"><label for="fecha" class="control-label">Fecha</label></div>
		<div class="col-lg-2"><input type="date" name="fecha" id="fecha" class="form-control required" required/></div>
		<div class="col-lg-8"><input type="submit" name="guardar" id="guardar" value="Buscar" class="btn btn-success form-control required"/></div>
	</div>	
</form>
@isset($datos)
<div class="form-group row">
	<input type="button" name="imprimir" id="imprimir" value="Imprimir" class="btn btn-warning form-control" onclick="imprimir()"/>
</div>
<div id="div_imprimir">
{!!$datos!!}
</div>
@endisset
<a href="/ServicioSocial/listar_atenciones" class="form-control btn btn-info" role="button">Listar Atenciones</a>
</div>

<div id="cargando" style="position:absolute;top:0;left:0;width:100%;height:100%;display:none;background:red;z-index:100000;opacity:0.6;">
	<div style="position:absolute;top:50%;left: 50%; font-size:40px">Espere...Estamos Realizando la Peticion</div>
</div>
@stop
@section('footer_scripts')
<!--Plugin scripts-->
<script type="text/javascript" src="{{asset('assets/vendors/bootstrapvalidator/js/bootstrapValidator.min.js')}}"></script>
<script type="text/javascript" src="{{asset('assets/vendors/twitter-bootstrap-wizard/js/jquery.bootstrap.wizard.min.js')}}"></script>
<!--End of plugin scripts-->
<!--Page level scripts-->
<script type="text/javascript">
function imprimir()
{
	var printContents = document.getElementById('div_imprimir').innerHTML;
    w = window.open();
    w.document.write(printContents);
    w.document.close(); // necessary for IE >= 10
    w.focus(); // necessary for IE >= 10
	setTimeout(function() {
		w.print();
		w.close();
	},200);
}
</script>
<!-- end page level scripts -->
@stop