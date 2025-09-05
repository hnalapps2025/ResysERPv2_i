<!DOCTYPE html>
<html>
<head>
    <title>HNAL</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link rel="shortcut icon" href="{{asset('assets/img/logo1.ico')}}"/>
    <!--Global styles -->
    <link type="text/css" rel="stylesheet" href="{{asset('assets/css/components.css')}}" />
    <link type="text/css" rel="stylesheet" href="{{asset('assets/css/custom.css')}}" />
    <!--End of Global styles -->
    <!--Plugin styles-->
    <link type="text/css" rel="stylesheet" href="{{asset('assets/vendors/bootstrapvalidator/css/bootstrapValidator.min.css')}}"/>
    <link type="text/css" rel="stylesheet" href="{{asset('assets/vendors/wow/css/animate.css')}}"/>
    <!--End of Plugin styles-->
    <link type="text/css" rel="stylesheet" href="{{asset('assets/css/pages/login.css')}}"/>
</head>
<body class="login_background">
<div class="container wow fadeInDown" data-wow-duration="1s" data-wow-delay="0.5s">
    <div class="row">
        <div class="col-xl-4 push-xl-4 col-lg-6 push-lg-3 col-md-8 push-md-2 col-sm-8 push-sm-2 col-xs-10 push-xs-1">
            <div class="row">
                <div class="col-lg-12 push-lg-1 col-md-10 push-md-1 col-sm-12 login_image login_section login_section_top">
                    <div class="text-center">
                        <img src="{{asset('assets/img/logow2.png')}}" alt="logo Resys" class="admire_logo">
                        <br>
                        <h3 class="text-bold text-xs-center titulo-login" style="font-size:18px">RESYS ERP</h3>
                        <h4 class="text-gray m-t-10 mb-4" style="font-size:17px; font-family:system-ui">Sistema de Registro Hospitalario del Hospital Arzobispo Loayza</h4>
                    </div>
                    <div class="m-t-15">
                        <form id="login_validator" method="post" action="login">
							@csrf
                            <div class="form-group">
                                <label for="Usuario" class="form-control-label text-gray" style="letter-spacing: 0.25px;">Usuario</label>
                                <div class="input-group">
                                    <input type="text" class="form-control b_r_20" id="Usuario" name="Usuario" placeholder="Ingrese su usuario" autocomplete="off">
                                    <span class="input-group-addon"><i class="fa fa-user text-gray" aria-hidden="true"></i></span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="ClaveVWeb" class="form-control-label text-gray" style="letter-spacing: 0.25px;">Contraseña</label>
                                <div class="input-group">
                                    <input type="password" class="form-control b_r_20" id="ClaveVWeb" name="ClaveVWeb" placeholder="Ingrese su contraseña" autocomplete="off">
                                    <span class="input-group-addon"><i class="fa fa-key text-gray" aria-hidden="true"></i></span>
                                </div>
                            </div>
                            <div class="text-xs-center">
                                <button type="submit" class="btn login_bottom text-white btn-block b_r_20 m-t-35 m-r-20">INGRESAR</button>
                            </div>
                        </form>
						@if($errors->any())
                            <div class="mt-2 alert alert-danger">{{$errors->first()}}</div>
						@endif
                    </div>
                    <div style="margin-top: 45px">
                        <div class="float-xs-left">
                            <small style="color: #afacac;">v4.0000</small>
                        </div>
                        <div class="float-xs-right text-gray">Siguenos en
                            <a class="icon-fb btn ml-2" href="https://www.facebook.com/hospitalloayza/" target="_blank">
                            <i class="fa fa-facebook" aria-hidden="true"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- global js -->
<script type="text/javascript" src="{{asset('assets/js/jquery.min.js')}}"></script>
<script type="text/javascript" src="{{asset('assets/js/tether.min.js')}}"></script>
<script type="text/javascript" src="{{asset('assets/js/bootstrap.min.js')}}"></script>
<!-- end of global js-->
<!--Plugin js-->
<script type="text/javascript" src="{{asset('assets/vendors/bootstrapvalidator/js/bootstrapValidator.min.js')}}"></script>
<script type="text/javascript" src="{{asset('assets/vendors/wow/js/wow.min.js')}}"></script>
<script type="text/javascript" src="{{asset('assets/vendors/jquery.backstretch/js/jquery.backstretch.js')}}"></script>
<!--End of plugin js-->
<script type="text/javascript" src="{{asset('assets/js/pages/login.js')}}"></script>

</body>

</html>