@extends('layouts/default')

{{-- Page title --}}
@section('title')
	{{$titulo}}
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
<div class="container mt-4">
    @if($errors->any())
        <h4 class="text-danger">{{$errors->first()}}</h4>
    @endif

    <div class="card">
        <div class="card-body">
            {!! $grid !!}
        </div>
    </div>
</div>
@stop
@section('footer_scripts')
<!--Plugin scripts-->
<!--End of plugin scripts-->
<!--Page level scripts-->
<!-- end page level scripts -->
@stop