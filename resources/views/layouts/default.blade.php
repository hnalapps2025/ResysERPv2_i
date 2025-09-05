<!doctype html>
<html class="no-js" lang="es" translate="no">

<head>
    <meta charset="UTF-8">
    <title>@section('title') | ReSYS
        @show
    </title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="shortcut icon" href="{{asset('assets/img/logo1.ico')}}" />
    <!-- global styles-->
    <link type="text/css" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.7.14/css/bootstrap-datetimepicker.min.css" integrity="sha512-cOGz9gyEibwgs1MVDCcfmQv6mPyUkfvrV9TsRbTuOA12SQnLzBROihf6/jK57u0YxzlxosBFunSt4V75K6azMw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/chosen/1.6.2/chosen.min.css" integrity="sha512-PJgWibuYF/cMnyirKd2FbfPGeRSyGjiVMHngeNM1J28FU8ZaxToaOLmaIZp0fQJfG+th3hfaccn5jQwCIevB6w==" crossorigin="anonymous" referrerpolicy="no-referrer" />

    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.7/css/jquery.dataTables.css" />

    <link type="text/css" rel="stylesheet" href="{{asset('assets/css/components.css')}}" />
    <link type="text/css" rel="stylesheet" href="{{asset('assets/css/custom.css')}}" />
    <link type="text/css" rel="stylesheet" href="{{asset('css/jquery-ui.css')}}" />
    <link type="text/css" rel="stylesheet" href="{{asset('css/trirand/ui.jqgrid.css')}}" />
    <link type="text/css" rel="stylesheet" href="#" id="skin_change" />
    <script type="text/javascript" src="{{asset('assets/js/components.js')}}"></script>
    <script type="text/javascript" src="{{asset('assets/js/jquery-ui.min.js')}}"></script>
    <script type="text/javascript" src="{{asset('assets/js/i18n/grid.locale-es.js')}}"></script>
    <script type="text/javascript" src="{{asset('assets/js/jquery.jqGrid.min.js')}}"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Fredericka+the+Great&display=swap" rel="stylesheet">
    <!-- end of global styles-->
    @yield('header_styles')
    <style>
        .notifications .dropdown-menu:before {
            border-bottom-color: white;
        }

        #menu>li.active {
            background-color: #3d6682 !important;
        }

        #menu li.active ul li.active>a {
            background-color: #5e90b3 !important;
        }

        .nav-link {
            padding: 12px 30px;
            border-radius: 0 !important;
        }

        .border {
            border: 1px solid #ddd !important;
        }

        .p-1 {
            padding: 1rem 1rem !important;
        }

        .card-header {
            background-color: #fff !important;
        }
    </style>
</head>

<body>
    <div class="bg-dark" id="wrap">
        <div id="top">
            <!-- .navbar -->
            <nav class="navbar navbar-static-top">
                <div class="container-fluid m-0">
                    <a class="navbar-brand float-left" href="/principal">
                        <h3 style="font-size:20px;margin-bottom: 0;"><b>
                                <img src="{{asset('assets/img/logo1.ico')}}" class="admin_img" alt="logo">
                                ReSYS</b></h3>
                    </a>
                    <div class="menu">
                        <span class="toggle-left" id="menu-toggle">
                            <i class="fa fa-bars"></i>
                        </span>
                    </div>
                    <div class="topnav dropdown-menu-right float-right">
                        {{--<div class="btn-group hidden-md-up small_device_search" data-toggle="modal"
                         data-target="#search_modal">
                        <i class="fa fa-search text-primary"></i>
                    </div>
                    <div class="btn-group">
                        <div class="notifications no-bg">
                            <a class="btn btn-default btn-sm messages" data-toggle="dropdown" id="messages_section"> <i
                                        class="fa fa-envelope-o fa-1x"></i>
                                <span class="tag tag-pill tag-warning notifications_tag_top">8</span>
                            </a>
                            <div class="dropdown-menu drop_box_align" role="menu" id="messages_dropdown">
                                <div class="popover-title">You have 8 Messages</div>
                                <div id="messages">
                                    <div class="data">
                                        <div class="col-xs-2">
                                            <img src="{{asset('assets/img/mailbox_imgs/5.jpg')}}"
                        class="message-img avatar rounded-circle"
                        alt="avatar1">
                    </div>
                    <div class="col-xs-10 message-data"><strong>hally</strong>
                        sent you an image.
                        <br>
                        <small>add to timeline</small>
                    </div>
                </div>
                <div class="data">
                    <div class="col-xs-2">
                        <img src="{{asset('assets/img/mailbox_imgs/8.jpg')}}" class="message-img avatar rounded-circle" alt="avatar1">
                    </div>
                    <div class="col-xs-10 message-data"><strong>Meri</strong>
                        invitation for party.
                        <br>
                        <small>add to timeline</small>
                    </div>
                </div>
                <div class="data">
                    <div class="col-xs-2">
                        <img src="{{asset('assets/img/mailbox_imgs/7.jpg')}}" class="message-img avatar rounded-circle" alt="avatar1">
                    </div>
                    <div class="col-xs-10 message-data">
                        <strong>Remo</strong>
                        meeting details .
                        <br>
                        <small>add to timeline</small>
                    </div>
                </div>
                <div class="data">
                    <div class="col-xs-2">
                        <img src="{{asset('assets/img/mailbox_imgs/6.jpg')}}" class="message-img avatar rounded-circle" alt="avatar1">
                    </div>
                    <div class="col-xs-10 message-data">
                        <strong>David</strong>
                        upcoming events list.
                        <br>
                        <small>add to timeline</small>
                    </div>
                </div>
                <div class="data">
                    <div class="col-xs-2">
                        <img src="{{asset('assets/img/mailbox_imgs/5.jpg')}}" class="message-img avatar rounded-circle" alt="avatar1">
                    </div>
                    <div class="col-xs-10 message-data"><strong>hally</strong>
                        sent you an image.
                        <br>
                        <small>add to timeline</small>
                    </div>
                </div>
                <div class="data">
                    <div class="col-xs-2">
                        <img src="{{asset('assets/img/mailbox_imgs/8.jpg')}}" class="message-img avatar rounded-circle" alt="avatar1">
                    </div>
                    <div class="col-xs-10 message-data"><strong>Meri</strong>
                        invitation for party.
                        <br>
                        <small>add to timeline</small>
                    </div>
                </div>
                <div class="data">
                    <div class="col-xs-2">
                        <img src="{{asset('assets/img/mailbox_imgs/7.jpg')}}" class="message-img avatar rounded-circle" alt="avatar1">
                    </div>
                    <div class="col-xs-10 message-data">
                        <strong>Remo</strong>
                        meeting details .
                        <br>
                        <small>add to timeline</small>
                    </div>
                </div>
                <div class="data">
                    <div class="col-xs-2">
                        <img src="{{asset('assets/img/mailbox_imgs/6.jpg')}}" class="message-img avatar rounded-circle" alt="avatar1">
                    </div>
                    <div class="col-xs-10 message-data">
                        <strong>David</strong>
                        upcoming events list.
                        <br>
                        <small>add to timeline</small>
                    </div>
                </div>
        </div>
        <div class="popover-footer">
            <a href="mail_inbox" class="text-white">Inbox</a>
        </div>
    </div>
    </div>
    </div>
    <div class="btn-group">
        <div class="notifications messages no-bg">
            <a class="btn btn-default btn-sm" data-toggle="dropdown" id="notifications_section"> <i class="fa fa-bell-o"></i>
                <span class="tag tag-pill tag-danger notifications_tag_top">9</span>
            </a>
            <div class="dropdown-menu drop_box_align" role="menu" id="notifications_dropdown">
                <div class="popover-title">You have 9 Notifications</div>
                <div id="notifications">
                    <div class="data">
                        <div class="col-xs-2">
                            <img src="{{asset('assets/img/mailbox_imgs/1.jpg')}}" class="message-img avatar rounded-circle" alt="avatar1">
                        </div>
                        <div class="col-xs-10 message-data">
                            <i class="fa fa-clock-o"></i>
                            <strong>Remo</strong>
                            sent you an image
                            <br>
                            <small class="primary_txt">just now.</small>
                            <br>
                        </div>
                    </div>
                    <div class="data">
                        <div class="col-xs-2">
                            <img src="{{asset('assets/img/mailbox_imgs/2.jpg')}}" class="message-img avatar rounded-circle" alt="avatar1">
                        </div>
                        <div class="col-xs-10 message-data">
                            <i class="fa fa-clock-o"></i>
                            <strong>clay</strong>
                            business propasals
                            <br>
                            <small class="primary_txt">20min Back.</small>
                            <br>
                        </div>
                    </div>
                    <div class="data">
                        <div class="col-xs-2">
                            <img src="{{asset('assets/img/mailbox_imgs/3.jpg')}}" class="message-img avatar rounded-circle" alt="avatar1">
                        </div>
                        <div class="col-xs-10 message-data">
                            <i class="fa fa-clock-o"></i>
                            <strong>John</strong>
                            meeting at Ritz
                            <br>
                            <small class="primary_txt">2hrs Back.</small>
                            <br>
                        </div>
                    </div>
                    <div class="data">
                        <div class="col-xs-2">
                            <img src="{{asset('assets/img/mailbox_imgs/6.jpg')}}" class="message-img avatar rounded-circle" alt="avatar1">
                        </div>
                        <div class="col-xs-10 message-data">
                            <i class="fa fa-clock-o"></i>
                            <strong>Luicy</strong>
                            Request Invitation
                            <br>
                            <small class="primary_txt">Yesterday.</small>
                            <br>
                        </div>
                    </div>
                    <div class="data">
                        <div class="col-xs-2">
                            <img src="{{asset('assets/img/mailbox_imgs/1.jpg')}}" class="message-img avatar rounded-circle" alt="avatar1">
                        </div>
                        <div class="col-xs-10 message-data">
                            <i class="fa fa-clock-o"></i>
                            <strong>Remo</strong>
                            sent you an image
                            <br>
                            <small class="primary_txt">just now.</small>
                            <br>
                        </div>
                    </div>
                    <div class="data">
                        <div class="col-xs-2">
                            <img src="{{asset('assets/img/mailbox_imgs/2.jpg')}}" class="message-img avatar rounded-circle" alt="avatar1">
                        </div>
                        <div class="col-xs-10 message-data">
                            <i class="fa fa-clock-o"></i>
                            <strong>clay</strong>
                            business propasals
                            <br>
                            <small class="primary_txt">20min Back.</small>
                            <br>
                        </div>
                    </div>
                    <div class="data">
                        <div class="col-xs-2">
                            <img src="{{asset('assets/img/mailbox_imgs/3.jpg')}}" class="message-img avatar rounded-circle" alt="avatar1">
                        </div>
                        <div class="col-xs-10 message-data">
                            <i class="fa fa-clock-o"></i>
                            <strong>John</strong>
                            meeting at Ritz
                            <br>
                            <small class="primary_txt">2hrs Back.</small>
                            <br>
                        </div>
                    </div>
                    <div class="data">
                        <div class="col-xs-2">
                            <img src="{{asset('assets/img/mailbox_imgs/6.jpg')}}" class="message-img avatar rounded-circle" alt="avatar1">
                        </div>
                        <div class="col-xs-10 message-data">
                            <i class="fa fa-clock-o"></i>
                            <strong>Luicy</strong>
                            Request Invitation
                            <br>
                            <small class="primary_txt">Yesterday.</small>
                            <br>
                        </div>
                    </div>
                    <div class="data">
                        <div class="col-xs-2">
                            <img src="{{asset('assets/img/mailbox_imgs/1.jpg')}}" class="message-img avatar rounded-circle" alt="avatar1">
                        </div>
                        <div class="col-xs-10 message-data">
                            <i class="fa fa-clock-o"></i>
                            <strong>Remo</strong>
                            sent you an image
                            <br>
                            <small class="primary_txt">just now.</small>
                            <br>
                        </div>
                    </div>
                </div>

                <div class="popover-footer">
                    <a href="#" class="text-white">View All</a>
                </div>
            </div>
        </div>
    </div>
    <div class="btn-group">
        <div class="notifications request_section no-bg">
            <a class="btn btn-default btn-sm messages" id="request_btn"> <i class="fa fa-sliders" aria-hidden="true"></i>
            </a>
        </div>
    </div>--}}

    <div class="btn-group">
        <div class="notifications no-bg"> <!--messages messages  -->
            <a class="btn btn-default btn-sm" data-toggle="dropdown" id="notifications_section">
                <i class="fa fa-question-circle fa-lg text-primary" aria-hidden="true"></i>
            </a>
            <div class="dropdown-menu admire_admin pb-1">
                <a class="dropdown-item p-2" href="{{asset('emergencia/tutoriales')}}">
                    <i class="fa fa-video-camera" aria-hidden="true"></i>&nbsp;
                    Tutoriales Emergencia
                </a>
            </div>
        </div>
    </div>

    <div class="btn-group">
        <div class="user-settings no-bg">
            <button type="button" class="btn btn-default no-bg micheal_btn" data-toggle="dropdown">
                <img src="{{asset('assets/img/user_med.png')}}" class="admin_img2 img-thumbnail rounded-circle avatar-img" alt="avatar"> <strong class="ml-1 mr-2" style="font-size: 16px">{{ucwords(strtolower(session('name')))}}</strong>
                <span class="fa fa-sort-down white_bg"></span>
            </button>
            <div class="dropdown-menu admire_admin pb-1">
                <a class="dropdown-item title" href="#">
                    Configuración</a>
                <a class="dropdown-item p-2" href="{{asset('cambiar_contrasena')}}">
                    <i class="fa fa-user"></i>&nbsp;
                    Cambiar Contraseña
                </a>
                <a class="dropdown-item p-2" href="{{asset('logout')}}"><i class="fa fa-sign-out"></i>&nbsp;
                    Cerrar Sesión</a>
            </div>
        </div>
    </div>

    </div>
    {{--<div class="top_search_box float-right hidden-sm-down">
                    <form class="header_input_search float-xs-right">
                        <input type="text" placeholder="Search" name="search">
                        <button type="submit">
                            <span class="font-icon-search"></span>
                        </button>
                        <div class="overlay"></div>
                    </form>
                </div>--}}
    </div>
    <!-- /.container-fluid -->
    </nav>
    <!-- /.navbar -->
    <!-- /.head -->
    </div>
    <!-- /#top -->
    <div class="wrapper">
        <div id="left">
            <div class="menu_scroll">
                <div class="left_media">
                    <div class="media user-media bg-dark dker">
                        <div class="user-media-toggleHover">
                            <span class="fa fa-user"></span>
                        </div>
                        <div class="user-wrapper bg-dark">
                            <a class="user-link" href="/principal">
                                <img class="media-object img-thumbnail user-img rounded-circle admin_img3" alt="Logo de Usuario" src="{{asset('assets/img/user_med.png')}}">
                                <p class="user-info menu_hide" style="font-size: 16px"><b>{{ucwords(strtolower(session('name')))}}</b></p>
                            </a>
                        </div>
                    </div>
                    <hr />
                </div>
                <ul id="menu">
                    <li class="dropdown_menu">
                        <a href="javascript:;">
                            <i class="fa fa-stethoscope fa-lg text-center ml-1" style="width: 20px" aria-hidden="true"></i>
                            <span class="link-title menu_hide">Consulta Externa</span>
                            <span class="fa arrow menu_hide"></span>
                        </a>
                        <ul class="sub-menu">
                            <li>
                                <a href="{{asset('/ConsultaExterna/FUAMasivo')}}">
                                    <i class="fa fa-stethoscope"></i>
                                    &nbsp;FUA Masivo
                                </a>
                            </li>
                        </ul>
					</li>
					<li class="dropdown_menu">
                        <a href="javascript:;">
                            <i class="fa fa-stethoscope fa-lg text-center ml-1" style="width: 20px" aria-hidden="true"></i>
                            <span class="link-title menu_hide">Archivo Clinico</span>
                            <span class="fa arrow menu_hide"></span>
                        </a>
                        <ul class="sub-menu">
                            <li>
                                <a href="{{asset('ArchivoClinico/ConsultaMovimientoHistoria')}}">
                                    <i class="fa fa-stethoscope"></i>
                                    &nbsp;Movimiento Historia
                                </a>
                            </li>
							<li>
                                <a href="{{asset('ArchivoClinico/SalidaHistoria')}}">
                                    <i class="fa fa-stethoscope"></i>
                                    &nbsp;Salida Historia
                                </a>
                            </li>
							<li>
                                <a href="{{asset('ArchivoClinico/RetornoHistoria')}}">
                                    <i class="fa fa-stethoscope"></i>
                                    &nbsp;Retorno Historia
                                </a>
                            </li>
							<li>
                                <a href="{{asset('ArchivoClinico/NoDevueltasXServicio')}}">
                                    <i class="fa fa-stethoscope"></i>
                                    &nbsp;HC No Devueltas X Servicio
                                </a>
                            </li>
							<li>
                                <a href="{{asset('ArchivoClinico/NoDevueltasXSerie')}}">
                                    <i class="fa fa-stethoscope"></i>
                                    &nbsp;HC No Devueltas X Serie
                                </a>
                            </li>
							<li>
                                <a href="{{asset('ArchivoClinico/NoDevueltasXRuta')}}">
                                    <i class="fa fa-stethoscope"></i>
                                    &nbsp;HC No Devueltas X Ruta
                                </a>
                            </li>
							<li>
                                <a href="{{asset('ArchivoClinico/ReporteCitados')}}">
                                    <i class="fa fa-stethoscope"></i>
                                    &nbsp;Reporte Citados
                                </a>
                            </li>
                        </ul>
					</li>
                </ul>
                <!-- /#menu -->
            </div>
        </div>
        <!-- /#left -->

        <div id="content" class="bg-container" style="min-height: 500px;">
            <!-- Content -->
            @yield('content')
            <!-- Content end -->
        </div>
        <div class="modal fade" id="search_modal" tabindex="-1" role="dialog" aria-hidden="true">
            <form>
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <div class="input-group search_bar_small">
                            <input type="text" class="form-control" placeholder="Search..." name="search">
                            <span class="input-group-btn">
                                <button class="btn btn-secondary" type="submit"><i class="fa fa-search"></i></button>
                            </span>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
    <!-- /#content -->
    @include('layouts.right_sidebar')

    </div>
    <!-- /#wrap -->
    <!-- global scripts-->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.0/xlsx.full.min.js"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.4/moment-with-locales.min.js" integrity="sha512-42PE0rd+wZ2hNXftlM78BSehIGzezNeQuzihiBCvUEB3CVxHvsShF86wBWwQORNxNINlBPuq7rG4WWhNiTVHFg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.7.14/js/bootstrap-datetimepicker.min.js" integrity="sha512-PDFb+YK2iaqtG4XelS5upP1/tFSmLUVJ/BVL8ToREQjsuXC5tyqEfAQV7Ca7s8b7RLHptOmTJak9jxlA2H9xQA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/chosen/1.6.2/chosen.jquery.min.js" integrity="sha512-QDFkCUyzB5IRy3BahmTctuO/sx2f9TvD9YOR5YRvtSnQ68gYJrh3oW6hSO1wUKHS3uZFzsQ3DQx6Fc1fXe/aNA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>


    <script type="text/javascript" src="{{asset('assets/js/custom.js')}}"></script>
    <script src="https://cdn.datatables.net/1.13.7/js/jquery.dataTables.js"></script>

    <script>
        function isEmpty(obj) {

            var isEmpty = false;

            if (typeof obj == 'undefined' || obj === null || obj === '' || obj === '0' || obj === 'null') {

                isEmpty = true;
            }

            if (typeof obj == 'number' && isNaN(obj)) {
                isEmpty = true;
            }

            if (obj instanceof Date && isNaN(Number(obj))) {
                isEmpty = true;
            }

            return isEmpty;

        };

        $.extend(true, $.fn.dataTable.defaults, {
            "searching": true,
            "ordering": true,

            scrollCollapse: true,

            language: {
                "decimal": "",
                "emptyTable": "No hay información",
                "info": "Mostrando _START_ a _END_ de _TOTAL_ registros",
                "infoEmpty": "Mostrando 0 to 0 of 0 registros",
                "infoFiltered": "(Filtrado de _MAX_ total registros)",
                "infoPostFix": "",
                "thousands": ",",
                "lengthMenu": "", //"Mostrar _MENU_ registros",
                "loadingRecords": "Cargando...",
                "processing": "Procesando...",
                "search": "Buscar:",
                "zeroRecords": "Sin resultados encontrados",
                "paginate": {
                    "first": "Primero",
                    "last": "Ultimo",
                    "next": "Siguiente",
                    "previous": "Anterior"
                }
            }
        });
    </script>
    <!-- end of global scripts-->
    <!-- page level js -->
    @yield('footer_scripts')
    <!-- end page level js -->
</body>

</html>