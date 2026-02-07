@extends('layouts/default')

{{-- Page title --}}
@section('title')
    Actualiza Servicio
    @parent
@stop
{{-- page level styles --}}
@section('header_styles')
    <!--Plugin styles-->
    <!--Page level styles-->
    <link type="text/css" rel="stylesheet" href="{{asset('assets/css/pages/form_elements.css')}}"/>	
@stop
@section('content')
<div class="container mt-4">
    <div class="row justify-content-center">
        <div class="col-12 col-md-8 col-lg-6">

            <h4 class="mb-3">Actualizar Servicio</h4>

            @error('NroCuposWeb')
                <div class="alert alert-danger">
                    {{ $message }}
                </div>
            @enderror

            <form method="POST"
                  action="{{ isset($servicio) ? route('servicios.update',$servicio->IdServicio) : route('servicios.store') }}">
                @csrf
                @isset($servicio) @method('PUT') @endisset

                {{-- Nombre --}}
                <div class="mb-3">
                    <label class="form-label">Nombre</label>
                    <input type="text"
                           name="Nombre"
                           class="form-control"
                           value="{{ old('Nombre', $servicio->Nombre ?? '') }}"
                           placeholder="Nombre">
                </div>

                {{-- Checkbox --}}
                <div class="form-check mb-3">
                    <input type="hidden" name="AceptaCupoWeb" value="0">

                    <input class="form-check-input"
                           type="checkbox"
                           id="AceptaCupoWebChk"
                           name="AceptaCupoWebChk"
                           value="1"
                           {{ (isset($servicio) && $servicio->AceptaCupoWeb == 1) ? 'checked' : '' }}>

                    <label class="form-check-label" for="AceptaCupoWebChk">
                        Acepta Cupo Web
                    </label>
                </div>

                {{-- Cupos --}}
                <div class="mb-3" id="cupos">
                    <label class="form-label">Nro Cupos Web</label>
                    <input type="number"
                           name="NroCuposWeb"
                           class="form-control"
                           value="{{ old('NroCuposWeb', $servicio->NroCuposWeb ?? '') }}"
                           placeholder="Nro Cupos Web">
                </div>

                {{-- Botones --}}
                <div class="d-flex justify-content-between">
                    <a href="{{ route('servicios.index') }}" class="btn btn-secondary">
                        Volver
                    </a>
                    <button type="submit" class="btn btn-primary">
                        Guardar
                    </button>
                </div>

            </form>
        </div>
    </div>
</div>
@stop

@section('footer_scripts')
<!--Plugin scripts-->

<!--Page level scripts-->
<script type="text/javascript">
const chk = document.querySelector('input[name="AceptaCupoWebChk"]');
    const cupos = document.getElementById('cupos');

    function toggleCupos() {
        cupos.style.display = chk.checked ? 'block' : 'none';
    }

    chk.addEventListener('change', toggleCupos);
    toggleCupos();
</script>
<!-- end page level scripts -->
@stop