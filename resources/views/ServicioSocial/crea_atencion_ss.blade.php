@extends('layouts/default')

{{-- Page title --}}
@section('title')
    Crea Atencion
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
{{ html()->hidden('IdPaciente',null,array('id'=>'IdPaciente')) }}
{{ html()->hidden('paciente_nuevo',null,array('id'=>'paciente_nuevo')) }}
{{ html()->hidden('IdSiaSis',null,array('id'=>'IdSiaSis')) }}
{{ html()->hidden('SisCodigo',null,array('id'=>'SisCodigo')) }}
{{ html()->hidden('UsoWebReniec',null,array('id'=>'UsoWebReniec')) }}
{{ html()->hidden('sis',null,array('id'=>'sis')) }}
@csrf
	<div class="form-group row">
		<div class="col-12">
			<h1>Nueva Atención</h1>
		</div>
	</div>
	<div class="form-group row">
		<div class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
			<label for="dni" class="font-weight-bold">Documento Identidad</label>
			<div class="input-group mb-3">
				<div class="input-group-prepend">
					{{ html()->select('IdDocIdentidad')->options($TiposDocIdentidad)->value(null)->id('IdDocIdentidad')->class('form-control')->style('width:100%')}}
				</div>
				{{ html()->text('NroDocumento')->id('NroDocumento')->class('form-control')->required()->attribute('onchange', 'buscar_paciente(this.value)')}}
			</div>
		</div>
	</div>
	<div class="form-group row">
		<div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
			<label for="paciente" class="font-weight-bold">Paciente</label>
			<div class="row">
				<div class="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
					{{ html()->text('ApellidoPaterno')->class('form-control')->id('ApellidoPaterno')->placeholder('Apellido Paterno')->attribute('required') }}
				</div>
				<div class="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
					{{ html()->text('ApellidoMaterno')->class('form-control')->id('ApellidoMaterno')->placeholder('Apellido Materno')->attribute('required') }}
				</div>
				<div class="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
					{{ html()->text('Nombres')->class('form-control')->id('Nombres')->placeholder('Nombres')->attribute('required') }}
				</div>
			</div>
		</div>
	</div>
	<div class="form-group row">
		<div class="col-12 col-sm-2 col-md-2 col-lg-2 col-xl-2">
			<label for="FechaNacimiento" class="font-weight-bold">Fecha Nacimiento</label>
			{{ html()->date('FechaNacimiento')->class('form-control')->id('FechaNacimiento')->attribute('required') }}
		</div>
		<div class="col-12 col-sm-2 col-md-2 col-lg-2 col-xl-2">
			<label for="IdTipoSexo" class="font-weight-bold">Sexo</label>
			{{ html()->select('IdTipoSexo')->options([1 => 'Masculino', 2 => 'Femenino'])->id('IdTipoSexo')->class('form-control') }}
		</div>
		<div class="col-12 col-sm-2 col-md-2 col-lg-2 col-xl-2">
			<label for="IdEstadoCivil" class="font-weight-bold">Estado Civil</label>
			{{ html()->select('IdEstadoCivil')->options($EstadoCivil)->value(2)->id('IdEstadoCivil')->class('form-control chzn-select')->attribute('required') }}
		</div>
		<div class="col-12 col-sm-2 col-md-2 col-lg-2 col-xl-2">
			<label for="IdGradoInstruccion" class="font-weight-bold">Grado Instrucción</label>
			{{ html()->select('IdGradoInstruccion')->options($GradoInstruccion)->value(99)->id('IdGradoInstruccion')->class('form-control chzn-select')->attribute('required') }}
		</div>
		<div class="col-12 col-sm-2 col-md-2 col-lg-2 col-xl-2">
			<label for="IdEtnia" class="font-weight-bold">Etnia</label>
			{{ html()->select('IdEtnia')->options($Etnias)->value(80)->id('IdEtnia')->class('form-control chzn-select')->attribute('required') }}
		</div>
		<div class="col-12 col-sm-2 col-md-2 col-lg-2 col-xl-2">
			<label for="IdIdioma" class="font-weight-bold">Idioma</label>
			{{ html()->select('IdIdioma')->options($Idiomas)->value(101)->id('IdIdioma')->class('form-control chzn-select') }}
		</div>
	</div>
	<div class="form-group row">		
		<div class="col-12 col-sm-2 col-md-2 col-lg-2 col-xl-2">
			<label for="IdTipoOcupacion" class="font-weight-bold">Ocupación</label>
			{{ html()->select('IdTipoOcupacion')->options($Ocupaciones)->value(3)->id('IdTipoOcupacion')->class('form-control chzn-select')->attribute('required') }}
		</div>
		<div class="col-12 col-sm-2 col-md-2 col-lg-2 col-xl-2">
			<label for="IdReligion" class="font-weight-bold">Religion</label>
			{{ html()->select('IdReligion')->options($Religiones)->value(6)->id('IdReligion')->class('form-control chzn-select') }}
		</div>
		<div class="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
			<label for="Telefono" class="font-weight-bold">Telefono</label>
			{{ html()->text('Telefono')->class('form-control')->id('Telefono') }}
		</div>
		<div class="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
			<label for="IdPaisNacimiento" class="font-weight-bold">Pais</label>
			{{ html()->select('IdPaisNacimiento')->options($Paises)->value(166)->id('IdPaisNacimiento')->class('form-control chzn-select')->attribute('required') }}
		</div>
	</div>	
	<div class="form-group row">
		<div class="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
			<label for="IdDistritoNacimiento" class="font-weight-bold">Distrito Nacimiento</label>
			<div class="input-group mb-3">
				{{ html()->select('IdDistritoNacimiento')->options($Distritos)->value(140101)->id('IdDistritoNacimiento')->class('form-control chzn-select')->attribute('required') }}
			</div>
		</div>
		<div class="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
			<label for="IdDistritoDomicilio" class="font-weight-bold">Distrito Domicilio</label>
			<div class="input-group mb-3">
				{{ html()->select('IdDistritoDomicilio')->options($Distritos)->value(140101)->id('IdDistritoDomicilio')->class('form-control chzn-select')->attribute('required') }}
			</div>
		</div>
		<div class="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
			<label for="DireccionDomicilio" class="font-weight-bold">Direccion Procedencia</label>
			<div class="input-group mb-3">
				{{ html()->text('DireccionDomicilio')->class('form-control')->id('DireccionDomicilio')->attribute('required') }}
			</div>
		</div>		
	</div>
	<div class="form-group row">		
		<div class="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4">
			<label for="IdServicio" class="font-weight-bold">Servicio</label>
			{{ html()->select('IdServicio')->options($Servicios)->value(null)->id('IdServicio')->class('form-control')->attribute('required') }}
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
			{{ html()->text('NombreAcompaniante')->class('form-control')->id('NombreAcompaniante') }}
		</div>
		<div class="col-12 col-sm-3 col-md-3 col-lg-3 col-xl-3">
			<label for="TelefonoAcompaniante" class="font-weight-bold">Telf. Acompañante</label>
			{{ html()->text('TelefonoAcompaniante')->class('form-control')->id('TelefonoAcompaniante') }}
		</div>
	</div>
	<div class="form-group row">
		<div class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
			<label for="ClasificacionSocioEconomica" class="font-weight-bold">Clasificacion SocioEconomica</label>
			{{ html()->select('ClasificacionSocioEconomica')->options(['' => 'Seleccione', '1' => 'Pobre Extremo', '2' => 'Pobre', '3' => 'No Pobre'])->value(null)->id('ClasificacionSocioEconomica')->class('form-control')->attribute('required') }}
		</div>
	</div>
	<input type="submit" name="guardar" id="guardar" value="Guardar" class="btn btn-success form-control required"/>
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
	function buscar_paciente(numero)
	{
		jQuery.ajax({
			url:"buscar_paciente",
			async:false,
			dataType:'json',
			data:{NroDocumento:numero,IdDocIdentidad:$("#IdDocIdentidad").val(),_token:'{{csrf_token()}}'},
			method:"post",
			success:function(response)
			{
				if(response.resultado==1)
				{
					$("#IdPaciente").val(response.datos["IdPaciente"]);
					$("#paciente_nuevo").val(response.datos["paciente_nuevo"]);
					$("#ApellidoPaterno").val(response.datos["ApellidoPaterno"]);
					$("#ApellidoMaterno").val(response.datos["ApellidoMaterno"]);
					$("#Nombres").val(response.datos["PrimerNombre"]);
					$("#FechaNacimiento").val(response.datos["FechaNacimiento"]);
					$("#IdTipoSexo").val(response.datos["IdTipoSexo"]);
					$("#IdDistritoNacimiento").val(response.datos["IdDistritoNacimiento"]);
					$("#IdPaisNacimiento").val(response.datos["IdPaisNacimiento"]).trigger('chosen:updated');
					$("#IdEstadoCivil").val(response.datos["IdEstadoCivil"]).trigger('chosen:updated');
					$("#IdGradoInstruccion").val(response.datos["IdGradoInstruccion"]).trigger('chosen:updated');
					$("#IdTipoOcupacion").val(response.datos["IdTipoOcupacion"]).trigger('chosen:updated');
					$("#IdReligion").val(response.datos["IdReligion"]).trigger('chosen:updated');
					$("#Telefono").val(response.datos["Telefono"]);
					$("#DireccionDomicilio").val(response.datos["DireccionDomicilio"]);
					$("#IdDistritoDomicilio").val(parseInt(response.datos["IdDistritoDomicilio"])).trigger('chosen:updated');
					$("#UsoWebReniec").val(response.datos["UsoWebReniec"]);
					if(response.datos.datos_sis.resultado)
					{
						$("#tiene_sis").text("Si tiene SIS");
						$("#sis").val(1);
						$("#IdSiaSis").val(response.datos.datos_sis.datos.IdNumReg);
						$("#SisCodigo").val(response.datos.datos_sis.datos.Tabla);
					}
					else
					{
						$("#tiene_sis").text("No tiene SIS");
						$("#sis").val(2);
						$("#IdSiaSis").val('');
						$("#SisCodigo").val('');
					}
				}
				else
				{
					alert(response.mensaje);
					if($("#IdDocIdentidad").val()=='1')$("#NroDocumento").val('');
					$("#IdPaciente").val('');
					$("#paciente_nuevo").val('');
					$("#ApellidoPaterno").val('');
					$("#ApellidoMaterno").val('');
					$("#Nombres").val('');
					$("#FechaNacimiento").val('');
					$("#IdTipoSexo").val(1);
					$("#IdSiaSis").val('');
					$("#SisCodigo").val('');
					$("#IdDistritoNacimiento").val('');
					$("#DireccionDomicilio").val('');
					$("#UsoWebReniec").val('');
				}
			}
		});
	}
</script>
<!-- end page level scripts -->
@stop