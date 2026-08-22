@extends('layouts/default')

{{-- Page title --}}
@section('title')
    Cambiar Contraseña
    @parent
@stop
{{-- page level styles --}}
@section('header_styles')
    <!--Plugin styles-->
    <link type="text/css" rel="stylesheet" href="{{asset('assets/vendors/inputlimiter/css/jquery.inputlimiter.css')}}"/>
    <link type="text/css" rel="stylesheet" href="{{asset('assets/vendors/chosen/css/chosen.css')}}"/>
    <link type="text/css" rel="stylesheet" href="{{asset('assets/vendors/bootstrap-colorpicker/css/bootstrap-colorpicker.min.css')}}"/>
    <link type="text/css" rel="stylesheet" href="{{asset('assets/vendors/jquery-tagsinput/css/jquery.tagsinput.css')}}"/>
    <link type="text/css" rel="stylesheet" href="{{asset('assets/vendors/daterangepicker/css/daterangepicker.css')}}"/>
    <link type="text/css" rel="stylesheet" href="{{asset('assets/vendors/datepicker/css/bootstrap-datepicker.min.css')}}"/>
    <link type="text/css" rel="stylesheet" href="{{asset('assets/vendors/bootstrap-timepicker/css/bootstrap-timepicker.min.css')}}"/>
    <link type="text/css" rel="stylesheet" href="{{asset('assets/vendors/bootstrap-switch/css/bootstrap-switch.min.css')}}"/>
    <link type="text/css" rel="stylesheet" href="{{asset('assets/vendors/jasny-bootstrap/css/jasny-bootstrap.min.css')}}"/>
    <link type="text/css" rel="stylesheet" href="{{asset('assets/vendors/fileinput/css/fileinput.min.css')}}"/>
    <link type="text/css" rel="stylesheet" href="{{asset('assets/vendors/multiselect/css/multi-select.css')}}"/>
    <!--Page level styles-->
    <link type="text/css" rel="stylesheet" href="{{asset('assets/css/pages/form_elements.css')}}"/>
@stop
@section('content')
@if(isset($Error)&&strlen($Error)>0)
    <h1>{{$Error}}</h1>
@endif
<form method="post">
@csrf
<div class="form-group">	
	<div class="form-group row">
		<div class="col-lg-4 text-lg-right"><label for="usuario" class="control-label">Usuario</label></div>
		<div class="col-lg-8"><input type="text" name="usuario" id="usuario" class="form-control required" readonly value="{{auth()->user()->Usuario}}"/></div>
	</div>
	<div class="form-group row">
		<div class="col-lg-4 text-lg-right"><label for="clave_a" class="control-label">Clave Antigua</label></div>
		<div class="col-lg-8"><input type="password" name="clave_a" id="clave_a" class="form-control required" required /></div>
	</div>
	<div class="form-group row">
		<div class="col-lg-4 text-lg-right"><label for="clave_n" class="control-label">Clave Nueva</label></div>
		<div class="col-lg-8"><input type="password" name="clave_n" id="clave_n" class="form-control required" required /></div>
	</div>
	<div class="form-group row">
		<div class="col-lg-4 text-lg-right"><label for="clave_rn" class="control-label">Repite Clave Nueva</label></div>
		<div class="col-lg-8"><input type="password" name="clave_rn" id="clave_rn" class="form-control required" required /></div>
	</div>
	<input type="submit" name="guardar" id="guardar" value="Guardar" class="form-control required"/>
</div>
</form>
<div id="cargando" style="position:absolute;top:0;left:0;width:100%;height:100%;display:none;background:red;z-index:100000;opacity:0.6;">
	<div style="position:absolute;top:50%;left: 50%; font-size:40px">Espere...Estamos Realizando la Peticion</div>
</div>
@stop
@section('footer_scripts')
<!--Plugin scripts-->
<!--Page level scripts-->
<script type="text/javascript">
</script>
<!-- end page level scripts -->
@stop