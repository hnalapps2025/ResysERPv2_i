@extends('layouts/default')

{{-- Page title --}}
@section('title')
    Ficha Social
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
			<h1>Ficha Social</h1>
		</div>
	</div>
	<div class="form-group row">
		<div class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
			<label for="dni" class="font-weight-bold">Documento Identidad</label>
			<div class="input-group mb-3">
				<div class="input-group-prepend">
					{{ html()->select('IdDocIdentidad')->options($TiposDocIdentidad)->value($FichaSocial->IdDocIdentidad)->id('IdDocIdentidad')->class('form-control')->style('width:100%') }}
				</div>
				{{ html()->text('NroDocumento')->value($FichaSocial->NroDocumento)->class('form-control')->id('NroDocumento')->attribute('required') }}
			</div>
		</div>
	</div>
	<div class="form-group row">
		<div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
			<label for="paciente" class="font-weight-bold">Paciente</label>
			<div class="row">
				<div class="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
					{{ html()->text('ApellidoPaterno')->value($FichaSocial->ApellidoPaterno)->class('form-control')->id('ApellidoPaterno')->placeholder('Apellido Paterno')->attribute('required') }}
				</div>
				<div class="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
					{{ html()->text('ApellidoMaterno')->value($FichaSocial->ApellidoMaterno)->class('form-control')->id('ApellidoMaterno')->placeholder('Apellido Materno')->attribute('required') }}
				</div>
				<div class="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
					{{ html()->text('Nombres')->value($FichaSocial->PrimerNombre)->class('form-control')->id('Nombres')->placeholder('Nombres')->attribute('required') }}
				</div>
			</div>
		</div>
	</div>
	<div class="form-group row">
		<div class="col-12 col-sm-2 col-md-2 col-lg-2 col-xl-2">
			<label for="FechaNacimiento" class="font-weight-bold">Fecha Nacimiento</label>
			{{ html()->date('FechaNacimiento')->value($FichaSocial->FechaNacimiento)->class('form-control')->id('FechaNacimiento')->attribute('required') }}
		</div>
		<div class="col-12 col-sm-2 col-md-2 col-lg-2 col-xl-2">
			<label for="IdTipoSexo" class="font-weight-bold">Sexo</label>
			{{ html()->select('IdTipoSexo')->options([1 => 'Masculino', 2 => 'Femenino'])->value($FichaSocial->IdTipoSexo)->id('IdTipoSexo')->class('form-control') }}
		</div>
		<div class="col-12 col-sm-2 col-md-2 col-lg-2 col-xl-2">
			<label for="IdEstadoCivil" class="font-weight-bold">Estado Civil</label>
			{{ html()->select('IdEstadoCivil')->options($EstadoCivil)->value($FichaSocial->IdEstadoCivil)->id('IdEstadoCivil')->class('form-control chzn-select')->attribute('required') }}
		</div>
		<div class="col-12 col-sm-2 col-md-2 col-lg-2 col-xl-2">
			<label for="IdGradoInstruccion" class="font-weight-bold">Grado Instrucción</label>
			{{ html()->select('IdGradoInstruccion')->options($GradoInstruccion)->value($FichaSocial->IdGradoInstruccion)->id('IdGradoInstruccion')->class('form-control chzn-select')->attribute('required') }}
		</div>
		<div class="col-12 col-sm-2 col-md-2 col-lg-2 col-xl-2">
			<label for="IdEtnia" class="font-weight-bold">Etnia</label>
			{{ html()->select('IdEtnia')->options($Etnias)->value($FichaSocial->IdEtnia)->id('IdEtnia')->class('form-control chzn-select')->attribute('required') }}
		</div>
		<div class="col-12 col-sm-2 col-md-2 col-lg-2 col-xl-2">
			<label for="IdIdioma" class="font-weight-bold">Idioma</label>
			{{ html()->select('IdIdioma')->options($Idiomas)->value($FichaSocial->IdIdioma)->id('IdIdioma')->class('form-control chzn-select') }}
		</div>
	</div>
	<div class="form-group row">		
		<div class="col-12 col-sm-2 col-md-2 col-lg-2 col-xl-2">
			<label for="IdTipoOcupacion" class="font-weight-bold">Ocupación</label>
			{{ html()->select('IdTipoOcupacion')->options($Ocupaciones)->value($FichaSocial->IdTipoOcupacion)->id('IdTipoOcupacion')->class('form-control chzn-select')->attribute('required') }}
		</div>
		<div class="col-12 col-sm-2 col-md-2 col-lg-2 col-xl-2">
			<label for="IdReligion" class="font-weight-bold">Religion</label>
			{{ html()->select('IdReligion')->options($Religiones)->value($FichaSocial->IdReligion)->id('IdReligion')->class('form-control chzn-select') }}
		</div>
		<div class="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
			<label for="Telefono" class="font-weight-bold">Telefono</label>
			{{ html()->text('Telefono')->value($FichaSocial->Telefono)->class('form-control')->id('Telefono') }}
		</div>
		<div class="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
			<label for="IdPaisNacimiento" class="font-weight-bold">Pais</label>
			{{ html()->select('IdPaisNacimiento')->options($Paises)->value($FichaSocial->IdPaisNacimiento)->id('IdPaisNacimiento')->class('form-control chzn-select')->attribute('required') }}
		</div>
	</div>	
	<div class="form-group row">
		<div class="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
			<label for="IdDistritoNacimiento" class="font-weight-bold">Distrito Nacimiento</label>
			<div class="input-group mb-3">
				{{ html()->select('IdDistritoNacimiento')->options($Distritos)->value($FichaSocial->IdDistritoNacimiento)->id('IdDistritoNacimiento')->class('form-control chzn-select')->attribute('required') }}
			</div>
		</div>
		<div class="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
			<label for="IdDistritoDomicilio" class="font-weight-bold">Distrito Domicilio</label>
			<div class="input-group mb-3">
				{{ html()->select('IdDistritoDomicilio')->options($Distritos)->value($FichaSocial->IdDistritoDomicilio)->id('IdDistritoDomicilio')->class('form-control chzn-select')->attribute('required') }}
			</div>
		</div>
		<div class="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
			<label for="DireccionDomicilio" class="font-weight-bold">Direccion Procedencia</label>
			<div class="input-group mb-3">
				{{ html()->text('DireccionDomicilio')->value($FichaSocial->DireccionDomicilio)->class('form-control')->id('DireccionDomicilio')->attribute('required') }}
			</div>
		</div>		
	</div>
	<div class="form-group row">		
		<div class="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
			<label for="IdServicio" class="font-weight-bold">Servicio</label>
			{{ html()->select('IdServicio')->options($Servicios)->value($FichaSocial->IdServicioIngreso)->id('IdServicio')->class('form-control')->attribute('required') }}
		</div>
		<div class="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
			<label for="IdFuenteFinanciamiento" class="font-weight-bold" id="tiene_sis"></label>
			<div class="input-group mb-3">
			</div>
		</div>
	</div>
	<div class="form-group row">
		<div class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
			<label for="NombreAcompaniante" class="font-weight-bold">Acompañante</label>
			{{ html()->text('NombreAcompaniante')->value($FichaSocial->NombreAcompaniante)->class('form-control')->id('NombreAcompaniante') }}
		</div>
		<div class="col-12 col-sm-3 col-md-3 col-lg-3 col-xl-3">
			<label for="TelefonoAcompaniante" class="font-weight-bold">Telf. Acompañante</label>
			{{ html()->text('TelefonoAcompaniante')->value($FichaSocial->TelefonoAcompaniante)->class('form-control')->id('TelefonoAcompaniante') }}
		</div>
	</div>
	<div class="form-group row">
		<div class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
			<label for="ClasificacionSocioEconomica" class="font-weight-bold">Clasificacion SocioEconomica</label>
			{{ html()->select('ClasificacionSocioEconomica')->options(['1' => 'Pobre Extremo', '2' => 'Pobre', '3' => 'No Pobre'])->value($FichaSocial->ClasificacionSocioEconomica)->id('ClasificacionSocioEconomica')->class('form-control')->attribute('required') }}
		</div>
	</div>
	<input type="submit" name="guardar" id="guardar" value="Actualizar" class="btn btn-success form-control required"/>
</form>
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
	
</script>
<!-- end page level scripts -->
@stop