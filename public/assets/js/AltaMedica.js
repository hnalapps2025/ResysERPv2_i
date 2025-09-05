/* EGRESO */
var DtDiagnosticosEgreso = null
var DiagnosticosEgreso = {
    idDiagnostico: 0,
    codigo: '',
    diagnostico: '',
    idTipoDiagnostico: 0,
    tipoDiagnostico: '',
    nroEvaluacion: 0,
    idServicio: 0
}

var cargoDxEgreso = false;
var cargoDxCom = false;
var cargoDxMuerteFetal = false;
var cargoDxMortalidad = false;

var valorDiferenciaHorasGeneral = null;

var lIdDxPrincipal = 0
var lIdCausaBasica = 0
var lIdCausaIntermedia = 0
var lIdCausaFinal = 0
var lIdDxIngreso = 0

var DtDiagnosticosCom = null
var DiagnosticosCom = {
    idDiagnostico: 0,
    codigo: '',
    diagnostico: '',
    idServicio: 0,
    tipoServicio: '',
    nroEvaluacion: 0,
}

var DtNacimientos = null
var Nacimientos = {
    idCondicion: 0,
    condicion: '',
    idSexo: 0,
    sexo: '',
    peso: 0,
    talla: 0,
    edad: 0,
    fechaNac: '',
    horaNac: '',
    apgar1: 0,
    apgar5: 0,
    nOrdenParto: 0,
    nHijo: 0,
    fechaClampage: '',
    horaClampage: '',
    idTipoDocIdentidad: 0,
    tipoDocIdentidad: '',
    nDocumento: '',
    datoForm: 0,
}

var DtDiagnosticosMuerteFetal = null
var DiagnosticosMuerteFetal = {
    idDiagnostico: 0,
    codigo: '',
    diagnostico: '',
    idTipoDiagnostico: 0,
    tipoDiagnostico: '',
    nroEvaluacion: 0,
    idServicio: 0
}

var DtDiagnosticosMortalidad = null
var DiagnosticosMortalidad = {
    idDiagnostico: 0,
    codigo: '',
    diagnostico: '',
    idTipoDiagnostico: 0,
    tipoDiagnostico: '',
    nroEvaluacion: 0,
    idServicio: 0
}

/* FIN EGRESO */

var AltaMedica = {

    Init() {},

    IniciarPlugins() {
        $('#estabMinsa').show();
        $('#estabNoMinsa').hide();
        $('#tab4').hide();
        $('#fechaAltaAdm').hide();
        $('#regionReferencia').hide();
        $('#ServicioHosp').hide();
        $('#MedicoRecibeHosp').hide();


        $('#divSeleccionEpisodioOculto').hide();
        $('#cboTipoReferenciaAM').val(0).trigger('chosen:updated');
        $('#cboEstabMinsaReferenciaAM').val(0).trigger('chosen:updated');
        $('#cboEstabNoMinsaReferenciaAM').val(0).trigger('chosen:updated');

        var miModal = document.getElementById('modalAltaMedica');
        // Agrega un event listener para el evento show.bs.modal
        /*miModal.addEventListener('show.bs.modal', function() {
            AltaMedica.CargarDatosAltaMedica();
            $('#tab1').removeClass('active');
            $('#tab2').removeClass('active');
            $('#tab3').removeClass('active');
            $('#tab4').removeClass('active');
            $('#myTabs li:first-child a').addClass('active');
            $('#content1').addClass('show active');
            $('#content2').removeClass('show active');
            $('#content3').removeClass('show active');
            $('#content4').removeClass('show active');

            $('#cboCondicionNacAM').val(0).trigger('chosen:updated');
            $('#cboTipoSexoNacAM').val(0).trigger('chosen:updated');
            $('#cboTipoDocIdentidadNacAM').val(0).trigger('chosen:updated');

            cargoDxEgreso = false;
            cargoDxCom = false;
            cargoDxMuerteFetal = false;
            cargoDxMortalidad = false;
        });*/

        $('#txtFechaAM').datepicker({
            todayHighlight: true,
            autoclose: true,
            dateFormat: "dd/mm/yy",
            orientation: "bottom"
        });

        $.mask.definitions['H'] = '[012]';
        $.mask.definitions['N'] = '[012345]';
        $.mask.definitions['n'] = '[0123456789]';
        $("#txtHoraAM").mask("Hn:Nn");

    },

    Eventos() {
        $('#modalAltaMedica').on('shown.bs.modal', function (event) {     
            AltaMedica.CargarDatosAltaMedica();
            $('#tab1').removeClass('active');
            $('#tab2').removeClass('active');
            $('#tab3').removeClass('active');
            $('#tab4').removeClass('active');
            $('#myTabs li:first-child a').addClass('active');
            $('#content1').addClass('show active');
            $('#content2').removeClass('show active');
            $('#content3').removeClass('show active');
            $('#content4').removeClass('show active');

            $('#cboCondicionNacAM').val(0).trigger('chosen:updated');
            $('#cboTipoSexoNacAM').val(0).trigger('chosen:updated');
            $('#cboTipoDocIdentidadNacAM').val(0).trigger('chosen:updated');

            cargoDxEgreso = false;
            cargoDxCom = false;
            cargoDxMuerteFetal = false;
            cargoDxMortalidad = false;

            //--------------------------------------------------//       
            DtDiagnosticosEgreso.columns.adjust().draw();
            DtDiagnosticosCom.columns.adjust().draw();
            DtNacimientos.columns.adjust().draw();
            DtDiagnosticosMuerteFetal.columns.adjust().draw();
            DtDiagnosticosMortalidad.columns.adjust().draw();            
        });

        $('#modalAltaMedica .nav-tabs a').on('shown.bs.tab', function (event) {
            DtDiagnosticosEgreso.columns.adjust().draw();
            DtDiagnosticosCom.columns.adjust().draw();
            DtNacimientos.columns.adjust().draw();
            DtDiagnosticosMuerteFetal.columns.adjust().draw();
            DtDiagnosticosMortalidad.columns.adjust().draw();
        });

        $('#myTabs a.nav-link').click(function(e) {
            var tabId = $(this).attr('id');
            if (tabId == 'tab2' && !cargoDxCom) {
                AltaMedica.DataTableDiagnosticosCom();
                cargoDxCom = true;
            }
            if (tabId == 'tab3' && !cargoDxMuerteFetal) {
                AltaMedica.DataTableDiagnosticosMuerteFetal();
                AltaMedica.DataTableNacimientos();
                cacargoDxMuerteFetalrgoDxCom = true;
            }
            if (tabId == 'tab4' && !cargoDxMortalidad) {
                AltaMedica.DataTableDiagnosticosMortalidad();
                cargoDxMortalidad = true;
            }

        });


        $('#cboTipoReferenciaAM').change(function() {
            var tipoReferenciaId = $(this).val();
            if (tipoReferenciaId == 1) {
                $('#estabMinsa').show();
                $('#estabNoMinsa').hide();
            } else {
                $('#estabMinsa').hide();
                $('#estabNoMinsa').show();
            }
        });

        $('#cboEpisodioAtencionEmer').change(function() {
            var valEpisodio = $(this).val();
            $('#cboEpisodioAtencionEmerHide').val(valEpisodio).trigger('chosen:updated');

            if ($("#cboEpisodioAtencionEmerHide option:selected").text() == "" || $("#cboEpisodioAtencionEmerHide option:selected").text() == null) {
                $('#chkNuevoEpisodioEmer').prop('checked', true);
            }
        });

        $('#cboDestinoAtencionAM').change(function() {
            var destinoAtencionId = $(this).val();
            console.log(destinoAtencionId);
            var valorTipoAlta = 0;
            var valorCondicionAlta = 0;
            if (destinoAtencionId == 21)
                valorTipoAlta = 6;
            $('#ServicioHosp').show();
            // $('#MedicoRecibeHosp').show();
            
            if (destinoAtencionId == 20)
                
            $('#ServicioHosp').hide();
            
            if (destinoAtencionId == 22)
                valorTipoAlta = 5;
            
            if (destinoAtencionId == 23 || destinoAtencionId == 24) {
                valorTipoAlta = 4;
                $('#regionReferencia').show();
                $('#ServicioHosp').hide();
                // $('#MedicoRecibeHosp').hide();
            }
            if (destinoAtencionId == 25 || destinoAtencionId == 27) {
                valorTipoAlta = 3;
                valorCondicionAlta = 4;
                $('#ServicioHosp').hide();
                // $('#MedicoRecibeHosp').hide();
            }
            $('#fechaAltaAdm').hide();
            if (destinoAtencionId == 26 || destinoAtencionId == 55 || destinoAtencionId == 65)
                $('#fechaAltaAdm').show();

            $('#cboTipoAM').val(valorTipoAlta).trigger('chosen:updated');
            $('#cboTipoCondicionAM').val(valorCondicionAlta).trigger('chosen:updated');

            $('#cboTipoCondicionAM').change();
        });

        $('#cboTipoCondicionAM').change(function() {
            var tipoCondicionId = $(this).val();

            if (tipoCondicionId == 4) {
                $('#tab4').show();
                AltaMedica.DataTableDiagnosticosMortalidad();
            } else {
                // DtDiagnosticosMortalidad = null;
                $('#tblDiagnosticosMortalidad').DataTable().clear().draw();
                $('#tab4').hide();
            }

        });

        // Buttons

        $("#btnGuardarAltaMedica").on('click', async function() {
            Cargando(1);
            var validadReglas1 = await AltaMedica.ValidarReglas();
            
            if (validadReglas1) {
                
                if (AltaMedica.valorDiferenciaHorasGeneral > 28 * 24) {
                    Swal.fire({
                        icon: 'question',
                        title: '¡El intervalo entre la fecha de ingreso y egreso es mayor que la estancia máxima! ¿Desea continuar?',
                        showCancelButton: true,
                        confirmButtonText: 'Sí',
                        cancelButtonText: 'No',
                    }).then((result) => {
                        if (result.isConfirmed) {

                            let DiagnosticoInfeccionAlIngreso = AltaMedica.DiagnosticosInfeccionClasificacionPorAtencion($('#hdnIdAtencion').val(), 2, 1);
                          
                            if (DiagnosticoInfeccionAlIngreso.length == 0) {
                               
                                var tieneDiagnosticoInfeccionEgreso = false;
                                let DiagnosticosInfeccion = AltaMedica.DiagnosticosInfeccion();
                                var lstDiagnosticos = DtDiagnosticosEgreso.rows().data();
                                for (let i = 0; i < DiagnosticosInfeccion.length; i++) {
                                    for (let j = 0; j < lstDiagnosticos.length; j++) {
                                        if (DiagnosticosInfeccion[i].IdDiagnostico == lstDiagnosticos[j].idDiagnostico)
                                            tieneDiagnosticoInfeccionEgreso = true;
                                    }
                                }
                                console.log(tieneDiagnosticoInfeccionEgreso);
                                if (tieneDiagnosticoInfeccionEgreso) {

                                    Swal.fire({
                                        icon: 'question',
                                        title: 'Los diagnósticos muestran la existencia de infección intrahospitalaria, ¿Es correcto?',
                                        showCancelButton: true,
                                        confirmButtonText: 'Sí',
                                        cancelButtonText: 'No',
                                    }).then((result) => {
                                        // if (result.isConfirmed) {
                                            AltaMedica.GuardarAltaMedica();
                                        // } else if (result.dismiss === Swal.DismissReason.cancel) {
                                        //     console.log('El usuario hizo clic en "No" o cerró el diálogo infrvvion');
                                        // }
                                    });

                                } else {
                                    AltaMedica.GuardarAltaMedica();
                                }

                            } else {
                                AltaMedica.GuardarAltaMedica();
                            }
                        } else if (result.dismiss === Swal.DismissReason.cancel) {
                            console.log('El usuario hizo clic en "No" o cerró el diálogo');
                        }
                    });
                } else {
                    let DiagnosticoInfeccionAlIngreso = await AltaMedica.DiagnosticosInfeccionClasificacionPorAtencion($('#hdnIdAtencion').val(), 2, 1);
                    console.log(DiagnosticoInfeccionAlIngreso.length);
                    if (DiagnosticoInfeccionAlIngreso.length == 0) {
                        var tieneDiagnosticoInfeccionEgreso = false;
                        let DiagnosticosInfeccion = await AltaMedica.DiagnosticosInfeccion();
                        var lstDiagnosticos = DtDiagnosticosEgreso.rows().data();
                        for (let i = 0; i < DiagnosticosInfeccion.length; i++) {
                            for (let j = 0; j < lstDiagnosticos.length; j++) {
                                console.log(DiagnosticosInfeccion[i].IdDiagnostico);
                                console.log(lstDiagnosticos[j].idDiagnostico);
                                if (DiagnosticosInfeccion[i].IdDiagnostico == lstDiagnosticos[j].idDiagnostico)
                                    tieneDiagnosticoInfeccionEgreso = true;
                            }
                        }
                        if (tieneDiagnosticoInfeccionEgreso) {

                            Swal.fire({
                                icon: 'question',
                                title: 'Los diagnósticos muestran la existencia de infección intrahospitalaria, ¿Es correcto?',
                                showCancelButton: true,
                                confirmButtonText: 'Sí',
                                cancelButtonText: 'No',
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    AltaMedica.GuardarAltaMedica();
                                } else if (result.dismiss === Swal.DismissReason.cancel) {
                                    console.log('El usuario hizo clic en "No" o cerró el diálogo infrvvion');
                                }
                            });

                        } else
                            AltaMedica.GuardarAltaMedica();
                    } else
                        AltaMedica.GuardarAltaMedica();

                }

            }

            // EvaluacionEmergencia.GuardarEvaluacionEmergencia();
            // EvaluacionEmergencia.GuardarEvaluacionEmergenciaDetalle();
            // EvaluacionEmergencia.GuardarDiagnosticos();

            Cargando(0);
        });


        /*ALTA MEDICA */
        $("#b_descripciondiaE").autocomplete({
            source: "../ws/ce/buscar_cie10",
            minLength: 3,
            select: function(event, ui2) {
                console.log(ui2.item.value);
                $("#b_IdDiagnosticoE").val(ui2.item.id);
                $("#b_cie10E").val(ui2.item.CodigoCIE10);
                $("#b_descripciondiaE").val(ui2.item.value);
                DiagnosticosEgreso.idDiagnostico = ui2.item.id;
                DiagnosticosEgreso.codigo = ui2.item.CodigoCIE10;
                DiagnosticosEgreso.diagnostico = ui2.item.value;
                console.log(ui2.item.value);
                DiagnosticosEgreso.idTipoDiagnostico = $("#cboTipoDiagnosticoAM").val();
                DiagnosticosEgreso.tipoDiagnostico = $("#cboTipoDiagnosticoAM option:selected").text();
            }
        });

        $('#tblDiagnosticosEgreso tbody').on('click', '.btnEliminarDiagnosticoE', function() {
            DtDiagnosticosEgreso.row($(this).parents("tr")).remove().draw(false);
        });

        $("#cboTipoDiagnosticoAM").on('change', function() {
            DiagnosticosEgreso.idTipoDiagnostico = $("#cboTipoDiagnosticoAM").val();
            DiagnosticosEgreso.tipoDiagnostico = $("#cboTipoDiagnosticoAM option:selected").text();
        });

        $("#b_descripciondiaCom").autocomplete({
            source: "../ws/ce/buscar_cie10",
            minLength: 3,
            select: function(event, ui) {
                $("#b_IdDiagnosticoCom").val(ui.item.id);
                $("#b_cie10Com").val(ui.item.CodigoCIE10);
                $("#b_descripciondiaCom").val(ui.item.value);
                DiagnosticosCom.idDiagnostico = ui.item.id;
                DiagnosticosCom.codigo = ui.item.CodigoCIE10;
                DiagnosticosCom.diagnostico = ui.item.value;
                DiagnosticosCom.tipoServicio = $("#txtDescServicioEgreso").val();
            }
        });

        $('#tblDiagnosticosCom tbody').on('click', '.btnEliminarDiagnosticoCom', function() {
            DtDiagnosticosCom.row($(this).parents("tr")).remove().draw(false);
        });

        $("#cboCondicionNacAM").on('change', function() {
            Nacimientos.idCondicion = $("#cboCondicionNacAM").val();
            Nacimientos.condicion = $("#cboCondicionNacAM option:selected").text();
        });

        $("#cboTipoSexoNacAM").on('change', function() {
            Nacimientos.idSexo = $("#cboTipoSexoNacAM").val();
            Nacimientos.sexo = $("#cboTipoSexoNacAM option:selected").text();
        });

        $("#cboTipoDocIdentidadNacAM").on('change', function() {
            Nacimientos.idTipoDocIdentidad = $("#cboTipoDocIdentidadNacAM").val();
            Nacimientos.tipoDocIdentidad = $("#cboTipoDocIdentidadNacAM option:selected").text();
        });

        $('#tblNacimientos tbody').on('click', '.btnEliminarNac', function() {
            DtNacimientos.row($(this).parents("tr")).remove().draw(false);
        });


        $("#b_descripciondiaMF").autocomplete({
            source: "../ws/ce/buscar_cie10",
            minLength: 3,
            select: function(event, ui) {
                $("#b_IdDiagnosticoMF").val(ui.item.id);
                $("#b_cie10MF").val(ui.item.CodigoCIE10);
                $("#b_descripciondiaMF").val(ui.item.value);
                DiagnosticosMuerteFetal.idDiagnostico = ui.item.id;
                DiagnosticosMuerteFetal.codigo = ui.item.CodigoCIE10;
                DiagnosticosMuerteFetal.diagnostico = ui.item.value;
                DiagnosticosMuerteFetal.idTipoDiagnostico = $("#cboTipoDiagnosticoMuerteFetal").val();
                DiagnosticosMuerteFetal.tipoDiagnostico = $("#cboTipoDiagnosticoMuerteFetal option:selected").text();
            }
        });

        $('#tblDiagnosticosMuerteFetal tbody').on('click', '.btnEliminarDiagnosticoMF', function() {
            DtDiagnosticosMuerteFetal.row($(this).parents("tr")).remove().draw(false);
        });

        $("#cboTipoDiagnosticoMuerteFetal").on('change', function() {
            DiagnosticosMuerteFetal.idTipoDiagnostico = $("#cboTipoDiagnosticoMuerteFetal").val();
            DiagnosticosMuerteFetal.tipoDiagnostico = $("#cboTipoDiagnosticoMuerteFetal option:selected").text();
        });


        $("#b_descripciondiaM").autocomplete({
            source: "../ws/ce/buscar_cie10",
            minLength: 3,
            select: function(event, ui) {
                $("#b_IdDiagnosticoM").val(ui.item.id);
                $("#b_cie10M").val(ui.item.CodigoCIE10);
                $("#b_descripciondiaM").val(ui.item.value);
                DiagnosticosMortalidad.idDiagnostico = ui.item.id;
                DiagnosticosMortalidad.codigo = ui.item.CodigoCIE10;
                DiagnosticosMortalidad.diagnostico = ui.item.value;
                DiagnosticosMortalidad.idTipoDiagnostico = $("#cboTipoDiagnosticoMortalidad").val();
                DiagnosticosMortalidad.tipoDiagnostico = $("#cboTipoDiagnosticoMortalidad option:selected").text();
            }
        });

        $('#tblDiagnosticosMortalidad tbody').on('click', '.btnEliminarDiagnosticoM', function() {
            DtDiagnosticosMortalidad.row($(this).parents("tr")).remove().draw(false);
        });

        $("#cboTipoDiagnosticoMortalidad").on('change', function() {
            DiagnosticosMortalidad.idTipoDiagnostico = $("#cboTipoDiagnosticoMortalidad").val();
            DiagnosticosMortalidad.tipoDiagnostico = $("#cboTipoDiagnosticoMortalidad option:selected").text();
        });

        /*FIN ALTA MEDICA */

        ///////////////////////////////////////////////////////////////////////////////////////

        $("#btnCancelarAltaMedica").on('click', function() {
            swal({
                title: 'CERRAR',
                text: "¿Esta seguro de cerrar el alta medica?",
                type: 'question',
                allowOutsideClick: false,
                showCancelButton: true,
                confirmButtonColor: '#4fb7fe',
                cancelButtonColor: '#6c6c6c',
                confirmButtonText: 'Si',
                cancelButtonText: 'No',
            }).then(function() {}, function(dimiss) {});
        });
        //--------------------------------------------------------------//
    },

    /////////////////////////////////////////////////////////DATATBLE///////////////////////////////////////////////////////////////

    DataTableDiagnosticosEgreso() {
        DtDiagnosticosEgreso = $('#tblDiagnosticosEgreso').DataTable({
            scrollY: "200px",
            scrollCollapse: true,
            autoWidth: false,
            ordering: false,
            data: null,
            destroy: true,
            info: false,
            bFilter: false,
            paging: false,
            responsive: true,
            columns: [{
                    width: "15%",
                    targets: 0,
                    data: "codigo",
                    createdCell: function(td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    width: "0%",
                    targets: 1,
                    data: "idDiagnostico",
                    createdCell: function(td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')

                    }
                },
                {
                    width: "55%",
                    targets: 1,
                    data: "diagnostico",
                    createdCell: function(td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')

                    }
                },
                {
                    width: "5%",
                    targets: 1,
                    data: "idTipoDiagnostico",
                    createdCell: function(td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')

                    }
                },
                {
                    width: "20%",
                    targets: 2,
                    data: "tipoDiagnostico",
                    createdCell: function(td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')

                    }
                },
                {
                    width: "10%",
                    targets: 3,
                    data: null,
                    createdCell: function(td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                        $(td).html("<button class='btn btn-danger btnEliminarDiagnosticoE'>ELIMINAR</button>")
                    }
                }
            ]
        });
    },

    DataTableDiagnosticosCom() {
        DtDiagnosticosCom = $('#tblDiagnosticosCom').DataTable({
            scrollY: "200px",
            scrollCollapse: true,
            autoWidth: false,
            ordering: false,
            data: null,
            destroy: true,
            info: false,
            bFilter: false,
            paging: false,
            responsive: true,
            columns: [{
                    width: "15%",
                    targets: 0,
                    data: "codigo",
                    createdCell: function(td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    width: "0%",
                    targets: 1,
                    data: "idDiagnostico",
                    createdCell: function(td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')

                    }
                },
                {
                    width: "55%",
                    targets: 1,
                    data: "diagnostico",
                    createdCell: function(td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')

                    }
                },
                {
                    width: "20%",
                    targets: 2,
                    data: "tipoServicio",
                    createdCell: function(td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')

                    }
                },
                {
                    width: "10%",
                    targets: 3,
                    data: null,
                    createdCell: function(td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                        $(td).html("<button class='btn btn-danger btnEliminarDiagnosticoCom'>ELIMINAR</button>")
                    }
                }
            ]
        });
    },

    DataTableNacimientos() {
        DtNacimientos = $('#tblNacimientos').DataTable({
            scrollY: "200px",
            scrollCollapse: true,
            autoWidth: false,
            ordering: false,
            data: null,
            destroy: true,
            info: false,
            bFilter: false,
            paging: false,
            responsive: true,
            columns: [{
                    width: "15%",
                    targets: 0,
                    data: "fechaNac",
                    createdCell: function(td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    width: "15%",
                    targets: 0,
                    data: "horaNac",
                    createdCell: function(td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    width: "10%",
                    targets: 1,
                    data: "edad",
                    createdCell: function(td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')

                    }
                },
                {
                    width: "10%",
                    targets: 1,
                    data: "talla",
                    createdCell: function(td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')

                    }
                },
                {
                    width: "10%",
                    targets: 1,
                    data: "peso",
                    createdCell: function(td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')

                    }
                },
                {
                    width: "0%",
                    targets: 1,
                    data: "idCondicion",
                    createdCell: function(td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')

                    }
                },
                {
                    width: "10%",
                    targets: 1,
                    data: "condicion",
                    createdCell: function(td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')

                    }
                },
                {
                    width: "0%",
                    targets: 1,
                    data: "idSexo",
                    createdCell: function(td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')

                    }
                },
                {
                    width: "10%",
                    targets: 1,
                    data: "sexo",
                    createdCell: function(td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')

                    }
                },
                {
                    width: "10%",
                    targets: 1,
                    data: "apgar1",
                    createdCell: function(td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')

                    }
                },
                {
                    width: "10%",
                    targets: 1,
                    data: "apgar5",
                    createdCell: function(td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')

                    }
                },
                {
                    width: "10%",
                    targets: 1,
                    data: "fechaClampage",
                    createdCell: function(td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')

                    }
                },
                {
                    width: "10%",
                    targets: 1,
                    data: "horaClampage",
                    createdCell: function(td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')

                    }
                },
                {
                    width: "10%",
                    targets: 1,
                    data: "nOrdenParto",
                    createdCell: function(td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')

                    }
                },
                {
                    width: "10%",
                    targets: 1,
                    data: "nHijo",
                    createdCell: function(td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')

                    }
                },
                {
                    width: "10%",
                    targets: 1,
                    data: "tipoDocIdentidad",
                    createdCell: function(td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')

                    }
                },
                {
                    width: "10%",
                    targets: 2,
                    data: "nDocumento",
                    createdCell: function(td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')

                    }
                },
                {
                    width: "10%",
                    targets: 3,
                    data: null,
                    createdCell: function(td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                        $(td).html("<button class='btn btn-danger btnEliminarNac'>ELIMINAR</button>")
                    }
                }

            ]
        });
    },

    DataTableDiagnosticosMuerteFetal() {
        DtDiagnosticosMuerteFetal = $('#tblDiagnosticosMuerteFetal').DataTable({
            scrollY: "200px",
            scrollCollapse: true,
            autoWidth: false,
            ordering: false,
            data: null,
            destroy: true,
            info: false,
            bFilter: false,
            paging: false,
            responsive: true,
            columns: [{
                    width: "15%",
                    targets: 0,
                    data: "codigo",
                    createdCell: function(td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    width: "0%",
                    targets: 1,
                    data: "idDiagnostico",
                    createdCell: function(td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')

                    }
                },
                {
                    width: "55%",
                    targets: 1,
                    data: "diagnostico",
                    createdCell: function(td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')

                    }
                },
                {
                    width: "5%",
                    targets: 1,
                    data: "idTipoDiagnostico",
                    createdCell: function(td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')

                    }
                },
                {
                    width: "20%",
                    targets: 2,
                    data: "tipoDiagnostico",
                    createdCell: function(td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')

                    }
                },
                {
                    width: "10%",
                    targets: 3,
                    data: null,
                    createdCell: function(td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                        $(td).html("<button class='btn btn-danger btnEliminarDiagnosticoMF'>ELIMINAR</button>")
                    }
                }
            ]
        });
    },

    DataTableDiagnosticosMortalidad() {
        DtDiagnosticosMortalidad = $('#tblDiagnosticosMortalidad').DataTable({
            scrollY: "200px",
            scrollCollapse: true,
            autoWidth: false,
            ordering: false,
            data: null,
            destroy: true,
            info: false,
            bFilter: false,
            paging: false,
            responsive: true,
            columns: [{
                    width: "15%",
                    targets: 0,
                    data: "codigo",
                    createdCell: function(td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    width: "0%",
                    targets: 1,
                    data: "idDiagnostico",
                    createdCell: function(td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')

                    }
                },
                {
                    width: "55%",
                    targets: 1,
                    data: "diagnostico",
                    createdCell: function(td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')

                    }
                },
                {
                    width: "5%",
                    targets: 1,
                    data: "idTipoDiagnostico",
                    createdCell: function(td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')

                    }
                },
                {
                    width: "20%",
                    targets: 2,
                    data: "tipoDiagnostico",
                    createdCell: function(td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')

                    }
                },
                {
                    width: "10%",
                    targets: 3,
                    data: null,
                    createdCell: function(td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                        $(td).html("<button class='btn btn-danger btnEliminarDiagnosticoM'>ELIMINAR</button>")
                    }
                }
            ]
        });
    },

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /*ALTA MEDICA*/
    AgregarDiagnosticoEgreso() {
        if (AltaMedica.ExisteDiagnosticosEgreso()) {
            /*Swal.fire({
                icon: 'info',
                title: 'El diagnostico ya fue agregado.',
                showConfirmButton: false,
                timer: 1500,
            }).then((result) => {

            });*/
            alerta('info', '', 'El diagnostico ya fue agregado.');
        } else {
            if (DiagnosticosEgreso.idDiagnostico > 0) {
                AltaMedica.cont_dx++;
                DtDiagnosticosEgreso.row.add(DiagnosticosEgreso).draw(false);

                DiagnosticosEgreso = {
                    idDiagnostico: 0,
                    codigo: '',
                    diagnostico: '',
                    idTipoDiagnostico: 0,
                    tipoDiagnostico: '',
                    nroEvaluacion: 0,
                    idServicio: 0
                }

                $("#b_descripciondiaE").val("");
            } else {
                /*Swal.fire({
                    icon: 'info',
                    title: 'Seleccione un diagnóstico.',
                    showConfirmButton: false,
                    timer: 1500,
                }).then((result) => {});*/
                alerta('info', '', 'Seleccione un diagnóstico.');
            }
        }
    },

    ExisteDiagnosticosEgreso() {
        lstDiagnosticos = DtDiagnosticosEgreso.rows().data();
        for (var i = 0; i < lstDiagnosticos.length; i++) {
            if (lstDiagnosticos[i].idDiagnostico == DiagnosticosEgreso.idDiagnostico) {
                return true;
            }
        }

        return false;
    },


    AgregarDiagnosticoCom() {
        if (AltaMedica.ExisteDiagnosticosCom()) {
            /*Swal.fire({
                icon: 'info',
                title: 'El diagnostico ya fue agregado.',
                showConfirmButton: false,
                timer: 1500,
            }).then((result) => {

            });*/
            alerta('info', '', 'El diagnostico ya fue agregado.');
        } else {
            if (DiagnosticosCom.idDiagnostico > 0) {
                AltaMedica.cont_dx++;
                DtDiagnosticosCom.row.add(DiagnosticosCom).draw(false);

                DiagnosticosCom = {
                    idDiagnostico: 0,
                    codigo: '',
                    diagnostico: '',
                    idServicio: 0,
                    tipoServicio: '',
                    nroEvaluacion: 0
                }

                $("#b_descripciondiaCom").val("");
            } else {
                /*Swal.fire({
                    icon: 'info',
                    title: 'Seleccione un diagnóstico.',
                    showConfirmButton: false,
                    timer: 1500,
                }).then((result) => {});*/
                alerta('info', '', 'Seleccione un diagnóstico.');
            }
        }
    },

    ExisteDiagnosticosCom() {
        lstDiagnosticos = DtDiagnosticosCom.rows().data();
        for (var i = 0; i < lstDiagnosticos.length; i++) {
            if (lstDiagnosticos[i].idDiagnostico == DiagnosticosCom.idDiagnostico) {
                return true;
            }
        }

        return false;
    },

    AgregarNacimientos() {
        if (!AltaMedica.NacimientoCorrecto()) {} else {
            Nacimientos = {
                idCondicion: $('#cboCondicionNacAM').val(),
                condicion: $("#cboCondicionNacAM option:selected").text(),
                idSexo: $('#cboTipoSexoNacAM').val(),
                sexo: $("#cboTipoSexoNacAM option:selected").text(),
                peso: $('#txtPesoNacAM').val(),
                talla: $('#txtTallaNacAM').val(),
                edad: $('#txtEdadNacAM').val(),
                fechaNac: AltaMedica.formatearFechaGuardar($('#txtFechaNacAM').val()),
                horaNac: $('#txtHoraNacAM').val(),
                // fechaHoraNac: $('#txtFechaNacAM').val() + ' ' + $('#txtHoraNacAM').val(),
                apgar1: $('#txtApgar1NacAM').val(),
                apgar5: $('#txtApgar5NacAM').val(),
                nOrdenParto: $('#txtNOrdenPartoNacAM').val(),
                nHijo: $('#txtNroHijoNacAM').val(),
                fechaClampage: AltaMedica.formatearFechaGuardar($('#txtFechaClampageNacAM').val()),
                horaClampage: $('#txtHoraClampageNacAM').val(),
                // fechaHoraClampage: $('#txtFechaClampageNacAM').val() + ' ' + $('#txtHoraClampageNacAM').val(),
                idTipoDocIdentidad: $('#cboTipoDocIdentidadNacAM').val(),
                tipoDocIdentidad: $("#cboTipoDocIdentidadNacAM option:selected").text(),
                nDocumento: $('#txtNDocumentoNacAM').val(),
                datoForm: 1,
            }

            DtNacimientos.row.add(Nacimientos).draw(false);

            Nacimientos = {
                idCondicion: 0,
                condicion: '',
                idSexo: 0,
                sexo: '',
                peso: 0,
                talla: 0,
                edad: 0,
                fechaNac: '',
                horaNac: '',
                // fechaHoraNac: '',
                apgar1: 0,
                apgar5: 0,
                nOrdenParto: 0,
                nHijo: 0,
                fechaClampage: '',
                horaClampage: '',
                // fechaHoraClampage: '',
                idTipoDocIdentidad: 0,
                tipoDocIdentidad: '',
                nDocumento: '',
                datoForm: 0
            }

            $("#cboCondicionNacAM").val(0);
            $("#cboTipoSexoNacAM").val(0);
            $("#cboTipoDocIdentidadNacAM").val(0);

            $("#txtPesoNacAM").val('');
            $("#txtTallaNacAM").val('');
            $("#txtEdadNacAM").val('');
            $("#txtFechaNacAM").val('');
            $("#txtHoraNacAM").val('');

            $("#txtApgar1NacAM").val('');
            $("#txtApgar5NacAM").val('');

            $("#txtNOrdenPartoNacAM").val('');
            $("#txtNroHijoNacAM").val('');

            $("#txtFechaClampageNacAM").val('');
            $("#txtHoraClampageNacAM").val('');

            $("#txtNDocumentoNacAM").val('');
        }
    },

    formatearFecha(fechaOriginal) {
        var partes = fechaOriginal.split('-');
        var fechaConvertida = partes[2] + '/' + partes[1] + '/' + partes[0];
        return fechaConvertida;
    },

    formatearFechaGuardar(fechaOriginal) {
        var partes = fechaOriginal.split('-');
        var fechaConvertida = partes[0] + '-' + partes[2] + '-' + partes[1];
        return fechaConvertida;
    },

    NacimientoCorrecto() {

        if ($('#cboCondicionNacAM').val() == 0 || $('#cboCondicionNacAM').val() == null) {
            /*Swal.fire({
                icon: 'info',
                title: 'Ingrese la condición.',
                showConfirmButton: false,
                timer: 1500,
            }).then((result) => {});*/
            alerta('info', '', 'Ingrese la condición.');
            return false;
        }

        if ($('#cboTipoSexoNacAM').val() == 0 || $('#cboTipoSexoNacAM').val() == null) {
            /*Swal.fire({
                icon: 'info',
                title: 'Ingrese el sexo.',
                showConfirmButton: false,
                timer: 1500,
            }).then((result) => {});*/
            alerta('info', '', 'Ingrese el sexo.');
            return false;
        }

        if ($('#cboTipoDocIdentidadNacAM').val() == 0 || $('#cboTipoDocIdentidadNacAM').val() == null) {
            /*Swal.fire({
                icon: 'info',
                title: 'Ingrese el tipo de documento de identidad.',
                showConfirmButton: false,
                timer: 1500,
            }).then((result) => {});*/
            alerta('info', '', 'Ingrese el tipo de documento de identidad.');
            return false;
        }

        var valor = $('#txtPesoNacAM').val();
        if (valor === "" || isNaN(valor) || !Number.isInteger(Number(valor))) {
            /*Swal.fire({
                icon: 'info',
                title: 'Ingrese el Peso en gramos.',
                showConfirmButton: false,
                timer: 1500,
            }).then((result) => {});*/
            alerta('info', '', 'Ingrese el Peso en gramos.');
            return false;
        }

        valor = $('#txtTallaNacAM').val();
        if (valor === "" || isNaN(valor) || !Number.isInteger(Number(valor))) {
            /*Swal.fire({
                icon: 'info',
                title: 'Ingrese la talla en cm',
                showConfirmButton: false,
                timer: 1500,
            }).then((result) => {});*/
            alerta('info', '', 'Ingrese la talla en cm.');
            return false;
        }

        valor = $('#txtEdadNacAM').val();
        if (valor === "" || isNaN(valor) || !Number.isInteger(Number(valor))) {
            /*Swal.fire({
                icon: 'info',
                title: 'Ingrese la edad en semanas.',
                showConfirmButton: false,
                timer: 1500,
            }).then((result) => {});*/
            alerta('info', '', 'Ingrese la edad en semanas.');
            return false;
        }


        valor = $('#txtApgar1NacAM').val();
        if (valor === "" || isNaN(valor) || !Number.isInteger(Number(valor))) {
            /*Swal.fire({
                icon: 'info',
                title: 'Ingrese el Apgar 1.',
                showConfirmButton: false,
                timer: 1500,
            }).then((result) => {});*/
            alerta('info', '', 'Ingrese el Apgar 1.');
            return false;
        }

        valor = $('#txtApgar5NacAM').val();
        if (valor === "" || isNaN(valor) || !Number.isInteger(Number(valor))) {
            /*Swal.fire({
                icon: 'info',
                title: 'Ingrese el Apgar 5.',
                showConfirmButton: false,
                timer: 1500,
            }).then((result) => {});*/
            alerta('info', '', 'Ingrese el Apgar 5.');
            return false;
        }

        valor = $('#txtNOrdenPartoNacAM').val();
        if (valor === "" || isNaN(valor) || !Number.isInteger(Number(valor))) {
            /*Swal.fire({
                icon: 'info',
                title: 'Ingrese el número de orden de parto.',
                showConfirmButton: false,
                timer: 1500,
            }).then((result) => {});*/
            alerta('info', '', 'Ingrese el número de orden de parto.');
            return false;
        }

        valor = $('#txtNroHijoNacAM').val();
        if (valor === "" || isNaN(valor) || !Number.isInteger(Number(valor))) {
            /*Swal.fire({
                icon: 'info',
                title: 'Ingrese el número de orden de hijo.',
                showConfirmButton: false,
                timer: 1500,
            }).then((result) => {});*/
            alerta('info', '', 'Ingrese el número de orden de hijo.');
            return false;
        }

        valor = $('#txtNDocumentoNacAM').val();
        if (valor === "" || isNaN(valor)) {
            /*Swal.fire({
                icon: 'info',
                title: 'Ingrese el número de documento de identidad.',
                showConfirmButton: false,
                timer: 1500,
            }).then((result) => {});*/
            alerta('info', '', 'Ingrese el número de documento de identidad.');
            return false;
        }

        var regexFecha = /^\d{4}-\d{2}-\d{2}$/;
        valor = $('#txtFechaNacAM').val();
        if (valor === "" || !regexFecha.test(valor)) {
            /*Swal.fire({
                icon: 'info',
                title: 'Ingrese una fecha de nacimiento correcta.',
                showConfirmButton: false,
                timer: 1500,
            }).then((result) => {});*/
            alerta('info', '', 'Ingrese una fecha de nacimiento correcta.');
            return false;
        }

        var regexHora = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
        valor = $('#txtHoraNacAM').val();
        if (valor === "" || !regexHora.test(valor)) {
            /*Swal.fire({
                icon: 'info',
                title: 'Ingrese una hora de nacimiento correcta.',
                showConfirmButton: false,
                timer: 1500,
            }).then((result) => {});*/
            alerta('info', '', 'Ingrese una hora de nacimiento correcta.');
            return false;
        }

        valor = $('#txtFechaClampageNacAM').val();
        if (valor === "" || !regexFecha.test(valor)) {
            /*Swal.fire({
                icon: 'info',
                title: 'Ingrese una fecha de clampage correcta.',
                showConfirmButton: false,
                timer: 1500,
            }).then((result) => {});*/
            alerta('info', '', 'Ingrese una fecha de clampage correcta.');
            return false;
        }

        valor = $('#txtHoraClampageNacAM').val();
        if (valor === "" || !regexHora.test(valor)) {
           /* Swal.fire({
                icon: 'info',
                title: 'Ingrese una hora de clampage correcta.',
                showConfirmButton: false,
                timer: 1500,
            }).then((result) => {});*/
            alerta('info', '', 'Ingrese una hora de clampage correcta.');
            return false;
        }

        var fechaHoraNac = $('#txtFechaNacAM').val();
        var nroHijo = $('#txtNroHijoNacAM').val();
        // fechaHoraClampage: $('#txtFechaClampageNacAM').val(),

        lstNacimiento = DtNacimientos.rows().data();
        for (var i = 0; i < lstNacimiento.length; i++) {
            if (lstNacimiento[i].fechaNac == fechaHoraNac && lstNacimiento[i].nHijo == nroHijo) {
                /*Swal.fire({
                    icon: 'info',
                    title: 'El número de hijo ya fue ingresado.',
                    showConfirmButton: false,
                    timer: 1500,
                }).then((result) => {});*/
                alerta('info', '', 'El número de hijo ya fue ingresado.');
                return false;
            }
        }

        return true;
    },

    AgregarDiagnosticoMuerteFetal() {
        if (AltaMedica.ExisteDiagnosticosMuerteFetal()) {

            /*Swal.fire({
                icon: 'info',
                title: 'El diagnostico ya fue agregado.',
                showConfirmButton: false,
                timer: 1500,
            }).then((result) => {});*/
            alerta('info', '', 'El diagnostico ya fue agregado.');

        } else {

            if (DiagnosticosMuerteFetal.idDiagnostico > 0) {
                DtDiagnosticosMuerteFetal.row.add(DiagnosticosMuerteFetal).draw(false);

                DiagnosticosMuerteFetal = {
                    idDiagnostico: 0,
                    codigo: '',
                    diagnostico: '',
                    idTipoDiagnostico: 0,
                    tipoDiagnostico: '',
                    nroEvaluacion: 0,
                    idServicio: 0
                }

                $("#b_descripciondiaMF").val("");
            } else {
                /*Swal.fire({
                    icon: 'info',
                    title: 'Seleccione un diagnóstico.',
                    showConfirmButton: false,
                    timer: 1500,
                }).then((result) => {});*/
                alerta('info', '', 'Seleccione un diagnóstico.');
            }
        }
    },

    ExisteDiagnosticosMuerteFetal() {
        lstDiagnosticos = DtDiagnosticosMuerteFetal.rows().data();
        for (var i = 0; i < lstDiagnosticos.length; i++) {
            if (lstDiagnosticos[i].idDiagnostico == DiagnosticosMuerteFetal.idDiagnostico) {
                return true;
            }
        }

        return false;
    },

    AgregarDiagnosticoMortalidad() {
        if (AltaMedica.ExisteDiagnosticosMortalidad()) {
            /*Swal.fire({
                icon: 'info',
                title: 'El diagnostico ya fue agregado.',
                showConfirmButton: false,
                timer: 1500,
            }).then((result) => {

            });*/
            alerta('info', '', 'El diagnostico ya fue agregado.');
        } else {
            if (DiagnosticosMortalidad.idDiagnostico > 0) {
                DtDiagnosticosMortalidad.row.add(DiagnosticosMortalidad).draw(false);

                DiagnosticosMortalidad = {
                    idDiagnostico: 0,
                    codigo: '',
                    diagnostico: '',
                    idTipoDiagnostico: 0,
                    tipoDiagnostico: '',
                    nroEvaluacion: 0,
                    idServicio: 0
                }

                $("#b_descripciondiaM").val("");
            } else {
                /*Swal.fire({
                    icon: 'info',
                    title: 'Seleccione un diagnóstico.',
                    showConfirmButton: false,
                    timer: 1500,
                }).then((result) => {});*/
                alerta('info', '', 'Seleccione un diagnóstico.');
            }
        }
    },

    ExisteDiagnosticosMortalidad() {
        lstDiagnosticos = DtDiagnosticosMortalidad.rows().data();
        for (var i = 0; i < lstDiagnosticos.length; i++) {
            if (lstDiagnosticos[i].idDiagnostico == DiagnosticosMortalidad.idDiagnostico) {
                return true;
            }
        }

        return false;
    },

    ObtenerDiagnosticos() {
        var lstDiagnosticos = DtDiagnosticosEgreso.rows().data();
        for (var i = 0; i < lstDiagnosticos.length; i++) {
            if (lstDiagnosticos[i].idTipoDiagnostico == 301)
                lIdDxPrincipal = lstDiagnosticos[i].idDiagnostico;
        }
        var lstDiagnosticosM = DtDiagnosticosMortalidad.rows().data();
        for (var i = 0; i < lstDiagnosticosM.length; i++) {
            if (lstDiagnosticosM[i].idTipoDiagnostico == 303)
                lIdCausaFinal = lstDiagnosticosM[i].idDiagnostico;
            if (lstDiagnosticosM[i].idTipoDiagnostico == 304)
                lIdCausaIntermedia = lstDiagnosticosM[i].idDiagnostico;
            if (lstDiagnosticosM[i].idTipoDiagnostico == 305)
                lIdCausaBasica = lstDiagnosticosM[i].idDiagnostico;
            if (lstDiagnosticosM[i].idTipoDiagnostico == 0)
                lIdDxIngreso = lstDiagnosticosM[i].idDiagnostico;
        }
    },

    async ValidarReglas() {
        var valor = $('#cboDestinoAtencionAM').val();
        var DestinoAtencion = 0;
        if (valor == 0 || valor == null) {
            /*Swal.fire({
                icon: 'info',
                title: 'Por favor debe registrar el tipo de alta.',
                showConfirmButton: false,
                timer: 1500,
            }).then((result) => {});*/
            alerta('info', '', 'Por favor debe registrar el tipo de alta.');
            return false;
        }

        DestinoAtencion = parseInt(valor);
        var DestinoAntecionChequeaEnPartos = false;
        if (DestinoAtencion == 65 || DestinoAtencion == 20 || DestinoAtencion == 30 || DestinoAtencion == 52 || DestinoAtencion == 68)
            DestinoAntecionChequeaEnPartos = true

        var regexFecha = /^\d{2}\/\d{2}\/\d{4}$/;
        valor = $('#txtFechaAM').val();
        if (valor === "" || !regexFecha.test(valor)) {
            /*Swal.fire({
                icon: 'info',
                title: 'Por favor debe registrar la fecha de alta correcta.',
                showConfirmButton: false,
                timer: 1500,
            }).then((result) => {});*/
            alerta('info', '', 'Por favor debe registrar la fecha de alta correcta.');
            return false;
        }

        var regexHora = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;
        valor = $('#txtHoraAM').val();
        if (valor === "" || !regexHora.test(valor)) {
            /*Swal.fire({
                icon: 'info',
                title: 'Por favor debe registrar una hora de alta correcta.',
                showConfirmButton: false,
                timer: 1500,
            }).then((result) => {});*/
            alerta('info', '', 'Por favor debe registrar una hora de alta correcta.');
            return false;
        }

        if ($('#cmbMedicoEgresoAM').val() == 0 || $('#cmbMedicoEgresoAM').val() == null) {
            /*Swal.fire({
                icon: 'info',
                title: 'Por favor debe registrar el Médico del Alta.',
                showConfirmButton: false,
                timer: 1500,
            }).then((result) => {});*/
            alerta('info', '', 'Por favor debe registrar el Médico del Alta.');
            return false;
        }
        var valorAlta = $('#cboDestinoAtencionAM').val();
        

        if(valorAlta==21){

            const aten = await Transferencias.SeleccionarAtencion($('#hdnIdAtencion').val());

            console.log('aten',aten);
            console.log("$('#cboServicioRecibe').val()",$('#cboServicioRecibe').val());
            if($('#cboServicioRecibe').val() == 336 && aten.IdTipoSexo== '1' ){

                alerta('info', '', 'No se puede transferir al servicio GINECOLOGIA');
               return false;
            }
            
             if($('#cboServicioRecibe').val() == 697 && aten.IdTipoSexo=='1'){
                alerta('info', '', 'No se puede transferir al servicio GINCEOLOGIA');
               return false;

            }
             if($('#cboServicioRecibe').val() == 332 && aten.IdTipoSexo=='1'){
                alerta('info', '', 'No se puede transferir al servicio GINCEOLOGIA');
               return false;
            }
             if($('#cboServicioRecibe').val() == 734 && aten.IdTipoSexo=='1'){
                alerta('info', '', 'No se puede transferir al servicio OBSTETRICIA');
               return false;
            }
             if($('#cboServicioRecibe').val() == 334 && aten.IdTipoSexo=='1'){
                alerta('info', '', 'No se puede transferir al servicio OBSTETRICIA');
               return false;
               
            }
          
    
            if ($('#cboServicioRecibe').val() == 0 || $('#cboServicioRecibe').val() == null) {

                alerta('info', '', 'Por favor debe elegir eL SERVICIO QUE RECIBE.');
                return false;
            }


          
        }
        

        if ($('#cboTipoAM').val() == 0 || $('#cboTipoAM').val() == null) {
            /*Swal.fire({
                icon: 'info',
                title: 'Por favor debe registrar el tipo de alta.',
                showConfirmButton: false,
                timer: 1500,
            }).then((result) => {});*/
            alerta('info', '', 'Por favor debe registrar el tipo de alta.');
            return false;
        }

        if ($('#cboTipoCondicionAM').val() == 0 || $('#cboTipoCondicionAM').val() == null) {
            /*Swal.fire({
                icon: 'info',
                title: 'Por favor debe elegir la CONDICION DE ALTA.',
                showConfirmButton: false,
                timer: 1500,
            }).then((result) => {});*/
            alerta('info', '', 'Por favor debe elegir la CONDICION DE ALTA.');
            return false;
        }
        
        if ($('#cboTipoAM').val() == 0 || $('#cboTipoAM').val() == null) {
            /*Swal.fire({
                icon: 'info',
                title: 'Por favor debe elegir el tipo DE ALTA.',
                showConfirmButton: false,
                timer: 1500,
            }).then((result) => {});*/
            alerta('info', '', 'Por favor debe elegir el tipo DE ALTA.');
            return false;
        }


        AltaMedica.ObtenerDiagnosticos();

        var sghHospitalizacion = 3
        let parametro324 = await AltaMedica.ParametrosSeleccionarPorId(324);
        let atenciomes = await AltaMedica.AtencionesSeleccionarPorId($('#hdnIdAtencion').val());
        var dateEgresoString = $('#txtFechaAM').val().substring(6, 10) + '-' + $('#txtFechaAM').val().substring(3, 5) + '-' + $('#txtFechaAM').val().substring(0, 2) ;
        var fechaEgresoCompleto = dateEgresoString + ' ' + $('#txtHoraAM').val();
        var dateString = atenciomes[0].FechaIngreso.substring(0, 10);        
        var fechaIngresoCompleto = dateString + ' ' + atenciomes[0].HoraIngreso;
        var dateFechaEgresoCompleto = new Date(fechaEgresoCompleto);
        var dateFechaIngresoCompleto = new Date(fechaIngresoCompleto);
        // Calcular la diferencia en milisegundos
        var diferenciaEnMilisegundos = Math.abs(dateFechaEgresoCompleto - dateFechaIngresoCompleto);
        // Convertir la diferencia a horas
        var diferenciaEnHoras = diferenciaEnMilisegundos / (1000 * 60 * 60); // 1000 milisegundos * 60 segundos * 60 minutos
        var valorParametro324 = parseFloat(parametro324[0].ValorTexto);
        var valorDiferenciaHoras = parseFloat(diferenciaEnHoras);
        AltaMedica.valorDiferenciaHorasGeneral = valorDiferenciaHoras;

        if ($('#idTipoServicio').val() != sghHospitalizacion) {
            if (valorDiferenciaHoras > valorParametro324) {
                /*Swal.fire({
                    icon: 'info',
                    title: 'En Emergencia, la FECHA DE EGRESO no  puede pasar de ' + parametro324[0].ValorTexto + ' horas',
                    showConfirmButton: false,
                    timer: 1500,
                }).then((result) => {});*/
                alerta('info', '', 'En Emergencia, la FECHA DE EGRESO no puede pasar de ' + parametro324[0].ValorTexto + ' horas');
                return false;
            }
        }
       
        if (dateFechaEgresoCompleto < dateFechaIngresoCompleto) {
            /*Swal.fire({
                icon: 'info',
                title: 'La fecha de EGRESO MEDICO no puede ser menor que la fecha de INGRESO',
                showConfirmButton: false,
                timer: 1500,
            }).then((result) => {});*/            
            alerta('info', '', 'La fecha de EGRESO MEDICO no puede ser menor que la fecha de INGRESO');
            return false;
        }

        // var destinoAtencionId = $('#cboDestinoAtencionAM').val();
        console.log(DestinoAtencion);
        if (DestinoAtencion == 26 || DestinoAtencion == 55 || DestinoAtencion == 65) {
            valor = $('#txtFechaAAdm').val();
            if (valor === "" || !regexFecha.test(valor)) {
                /*Swal.fire({
                    icon: 'info',
                    title: 'Por favor debe registrar la fecha de alta administrativa correcta.',
                    showConfirmButton: false,
                    timer: 1500,
                }).then((result) => {});*/
                alerta('info', '', 'Por favor debe registrar la fecha de alta administrativa correcta.');
                return false;
            }

            valor = $('#txtHoraAAdm').val();
            if (valor === "" || !regexHora.test(valor)) {
                /*Swal.fire({
                    icon: 'info',
                    title: 'Por favor debe registrar una hora de alta administrativa correcta.',
                    showConfirmButton: false,
                    timer: 1500,
                }).then((result) => {});*/
                alerta('info', '', 'Por favor debe registrar una hora de alta administrativa correcta.');
                return false;
            }

            var fechaEgresoAdmCompleto = $('#txtFechaAAdm').val() + ' ' + $('#txtHoraAAdm').val();
            var dateFechaEgresoAdmCompleto = new Date(fechaEgresoAdmCompleto);
            if (dateFechaEgresoAdmCompleto < dateFechaEgresoCompleto) {
                /*Swal.fire({
                    icon: 'info',
                    title: 'La fecha de egreso administrativo no puede ser menor que la fecha de egreso médico',
                    showConfirmButton: false,
                    timer: 1500,
                }).then((result) => {});*/
                alerta('info', '', 'La fecha de egreso administrativo no puede ser menor que la fecha de egreso médico.');
                return false;
            }
        }

        if ($('#cboTipoCondicionAM').val() == 4) {

            if (lIdCausaFinal == 0) {
                var lstDiagnosticos = DtDiagnosticosMortalidad.rows().data();
                if (lstDiagnosticos.length == 0) {
                    /*Swal.fire({
                        icon: 'info',
                        title: 'La condición del paciente indica PACIENTE FALLECIDO, Por favor ingreso de DIAGNOSTICO -> CAUSA FINAL (ficha 3.4)',
                        showConfirmButton: false,
                        timer: 1500,
                    }).then((result) => {});*/
                    alerta('info', '', 'La condición del paciente indica PACIENTE FALLECIDO, Por favor ingreso de DIAGNOSTICO -> CAUSA FINAL (ficha 3.4).');
                    return false;
                }
            }

            if (lIdCausaBasica == 0) {
                if (lIdCausaIntermedia != 0) {
                    /*Swal.fire({
                        icon: 'info',
                        title: 'Por favor antes de llenar la causa intermedia debe llenar la causa básica.',
                        showConfirmButton: false,
                        timer: 1500,
                    }).then((result) => {});*/
                    alerta('info', '', 'Por favor antes de llenar la causa intermedia debe llenar la causa básica.');
                    return false;
                }
            }

        } else {
            if (lIdDxPrincipal == 0) {
                /*Swal.fire({
                    icon: 'info',
                    title: 'Por favor debe llenar DIAGNOSTICO -> PRINCIPAL.',
                    showConfirmButton: false,
                    timer: 1500,
                }).then((result) => {});*/
                alerta('info', '', 'Por favor debe llenar DIAGNOSTICO -> PRINCIPAL.');
                return false;
            }
        }

        var tieneDiagnosticoParto = false;
        if (DestinoAntecionChequeaEnPartos) {
            let DiagnosticosSoloPartos = await AltaMedica.DiagnosticosSoloPartosSeleccionarTodos();
            var lstDiagnosticos = DtDiagnosticosEgreso.rows().data();
            for (let i = 0; i < DiagnosticosSoloPartos.length; i++) {
                for (let j = 0; j < lstDiagnosticos.length; j++) {
                    if (DiagnosticosSoloPartos[i].IdDiagnostico == lstDiagnosticos[j].idDiagnostico)
                        tieneDiagnosticoParto = true;
                }
            }
            console.log(tieneDiagnosticoParto);
            if (tieneDiagnosticoParto) {
                var lstNacimientos = DtNacimientos.rows().data();
                if (lstNacimientos.length == 0) {
                    /*Swal.fire({
                        icon: 'info',
                        title: 'La paciente tubo Dx de PARTO, por favor debe registrar cada Nacimiento (Ficha 3.3)',
                        showConfirmButton: false,
                        timer: 1500,
                    }).then((result) => {});*/
                    alerta('info', '', 'La paciente tubo Dx de PARTO, por favor debe registrar cada Nacimiento (Ficha 3.3)');
                    return false;
                }
            }
        }

        if (DestinoAtencion == 23 || DestinoAtencion == 24) {
            if ($('#cboTipoReferenciaAM').val() == 0 || $('#cboTipoReferenciaAM').val() == null) {
                /*Swal.fire({
                    icon: 'info',
                    title: 'Debe elejir el tipo de referencia.',
                    showConfirmButton: false,
                    timer: 1500,
                }).then((result) => {});*/
                alerta('info', '', 'Debe elejir el tipo de referencia.');
                return false;
            }

            if ($('#cboTipoReferenciaAM').val() == 1) {
                if ($('#cboEstabMinsaReferenciaAM').val() == 0 || $('#cboEstabMinsaReferenciaAM').val() == null) {
                    /*Swal.fire({
                        icon: 'info',
                        title: 'Debe elejir el ESTABLEC.REFERIDO.',
                        showConfirmButton: false,
                        timer: 1500,
                    }).then((result) => {});*/
                    alerta('info', '', 'Debe elejir el ESTABLEC.REFERIDO.');
                    return false;
                }
            } else {
                if ($('#cboEstabNoMinsaReferenciaAM').val() == 0 || $('#cboEstabNoMinsaReferenciaAM').val() == null) {
                    /*Swal.fire({
                        icon: 'info',
                        title: 'Debe elejir el ESTABLEC.REFERIDO.',
                        showConfirmButton: false,
                        timer: 1500,
                    }).then((result) => {});*/
                    alerta('info', '', 'Debe elejir el ESTABLEC.REFERIDO.');
                    return false;
                }
            }

        }

        if ($('#cboEpisodioAtencionEmerHide').val() == '' || $('#cboEpisodioAtencionEmerHide').val() == null) {

            if (!$('#chkNuevoEpisodioEmer').prop('checked')) {
                /*Swal.fire({
                    icon: 'info',
                    title: 'Debe elejir el nuevo episodio.',
                    showConfirmButton: false,
                    timer: 1500,
                }).then((result) => {});*/
                alerta('info', '', 'Debe elejir el nuevo episodio.');
                return false;
            }

        }


        return true;
    },

    async ParametrosSeleccionarPorId(IdParametro) {
        let formData = new FormData()
        formData.append('_token', $("meta[name='csrf-token']").attr("content"));
        formData.append('IdParametro', IdParametro);
        try {
            datos = await $.ajax({
                method: "POST",
                url: "/AltaMedica/ParametrosSeleccionarPorId",
                data: formData,
                dataType: "json",
                cache: false,
                processData: false,
                contentType: false,
            });
            return datos.resultado
        } catch (error) {
            console.log(error)
        }
    },

    async AtencionesSeleccionarPorId(IdAtencion) {
        let formData = new FormData()
        formData.append('_token', $("meta[name='csrf-token']").attr("content"));
        formData.append('IdAtencion', IdAtencion);
        try {
            datos = await $.ajax({
                method: "POST",
                url: "/AltaMedica/AtencionesSeleccionarPorId",
                data: formData,
                dataType: "json",
                cache: false,
                processData: false,
                contentType: false,
            });
            return datos.resultado
        } catch (error) {
            console.log(error)
        }
    },

    async DiagnosticosSoloPartosSeleccionarTodos() {
        let formData = new FormData()
        formData.append('_token', $("meta[name='csrf-token']").attr("content"));
        try {
            datos = await $.ajax({
                method: "POST",
                url: "/AltaMedica/DiagnosticosSoloPartosSeleccionarTodos",
                data: formData,
                dataType: "json",
                cache: false,
                processData: false,
                contentType: false,
            });
            return datos.resultado
        } catch (error) {
            console.log(error)
        }
    },

    async DiagnosticosInfeccion() {
        let formData = new FormData()
        formData.append('_token', $("meta[name='csrf-token']").attr("content"));
        try {
            datos = await $.ajax({
                method: "POST",
                url: "/AltaMedica/DiagnosticosInfeccion",
                data: formData,
                dataType: "json",
                cache: false,
                processData: false,
                contentType: false,
            });
            return datos.resultado
        } catch (error) {
            console.log(error)
        }
    },

    async DiagnosticosInfeccionClasificacionPorAtencion(IdAtencion, IdClasificacionDx) {
        let formData = new FormData()
        formData.append('_token', $("meta[name='csrf-token']").attr("content"));
        formData.append('IdAtencion', IdAtencion);
        formData.append('IdClasificacionDx', IdClasificacionDx);
        formData.append('EsInfeccion', 1);
        try {
            datos = await $.ajax({
                method: "POST",
                url: "/AltaMedica/DiagnosticosClasificacionPorAtencion",
                data: formData,
                dataType: "json",
                cache: false,
                processData: false,
                contentType: false,
            });
            return datos.resultado
        } catch (error) {
            console.log(error)
        }
    },

    async DiagnosticosClasificacionPorAtencion(IdAtencion, IdClasificacionDx) {
        let formData = new FormData()
        formData.append('_token', $("meta[name='csrf-token']").attr("content"));
        formData.append('IdAtencion', IdAtencion);
        formData.append('IdClasificacionDx', IdClasificacionDx);
        formData.append('EsInfeccion', 0);
        try {
            datos = await $.ajax({
                method: "POST",
                url: "/AltaMedica/DiagnosticosClasificacionPorAtencion",
                data: formData,
                dataType: "json",
                cache: false,
                processData: false,
                contentType: false,
            });
            return datos.resultado
        } catch (error) {
            console.log(error)
        }
    },

    async DiagnosticosAltaMedicaDeEvaluacion(IdAtencion, IdClasificacionDx) {
        let formData = new FormData()
        formData.append('_token', $("meta[name='csrf-token']").attr("content"));
        formData.append('IdAtencion', IdAtencion);
        formData.append('IdClasificacionDx', IdClasificacionDx);
        try {
            datos = await $.ajax({
                method: "POST",
                url: "/AltaMedica/DiagnosticosAltaMedicaDeEvaluacion",
                data: formData,
                dataType: "json",
                cache: false,
                processData: false,
                contentType: false,
            });
            return datos.resultado
        } catch (error) {
            console.log(error)
        }
    },

    async AtencionNacimientoPorAtencion(IdAtencion) {
        let formData = new FormData()
        formData.append('_token', $("meta[name='csrf-token']").attr("content"));
        formData.append('IdAtencion', IdAtencion);
        try {
            datos = await $.ajax({
                method: "POST",
                url: "/AltaMedica/AtencionNacimientoPorAtencion",
                data: formData,
                dataType: "json",
                cache: false,
                processData: false,
                contentType: false,
            });
            return datos.resultado
        } catch (error) {
            console.log(error)
        }
    },



    async GuardarAltaMedica() {
<<<<<<< HEAD
=======
            await AltaMedica.GuardarDiagnosticos();
            await AltaMedica.GuardarNacimientosAltaMedica();
       
>>>>>>> c43206bf175774a3bfc1e1fc1e2cd58a60d1e406
        let formData = new FormData()

        formData.append('_token', $("meta[name='csrf-token']").attr("content"));

        formData.append('IdDestinoAtencion', $('#cboDestinoAtencionAM').val());
        formData.append('IdTipoAlta', $('#cboTipoAM').val());
        formData.append('IdServicioEgreso', $('#idServicioEgreso').val());
        formData.append('IdServicioDestinoHosp', $('#cboServicioRecibe').val());
        formData.append('IdMedicoAsignadoHosp', $('#cmbMedicoEgresoAM').val());
        formData.append('IdCamaEgreso', $('#idCamaEgreso').val());
        formData.append('HoraEgreso', $('#txtHoraAM').val());
        formData.append('FechaEgreso', $('#txtFechaAM').val());
        formData.append('IdCondicionAlta', $('#cboTipoCondicionAM').val());
        formData.append('IdMedicoEgreso', $('#cmbMedicoEgresoAM').val());
        formData.append('FechaEgresoAdministrativo', $('#txtFechaAAdm').val());
        formData.append('HoraEgresoAdministrativo', $('#txtHoraAAdm').val());

        var IdTipoReferenciaDestino = 0;
        if ($('#cboTipoReferenciaAM').val() != null)
            IdTipoReferenciaDestino = Number($('#cboTipoReferenciaAM').val());

        formData.append('IdTipoReferenciaDestino', IdTipoReferenciaDestino);

        var IdEstablecimientoDestino = 0;
        var NroRerernciaAM = '';

        if (IdTipoReferenciaDestino == 1) {
            IdEstablecimientoDestino = $('#cboEstabMinsaReferenciaAM').val();
            NroRerernciaAM = $('#txtNroRerernciaAM').val();
        }
        if (IdTipoReferenciaDestino == 2) {
            IdEstablecimientoDestino = $('#cboEstabNoMinsaReferenciaAM').val();
            NroRerernciaAM = $('#txtNroRerernciaAM').val();
        }

        console.log(IdTipoReferenciaDestino);
        console.log(IdEstablecimientoDestino);
        formData.append('IdEstablecimientoDestino', IdEstablecimientoDestino);
        formData.append('NroReferenciaDestino', NroRerernciaAM);

        var NroEpisodioHistorico = 0;
        if ($('#cboEpisodioAtencionEmer').val() != null)
            NroEpisodioHistorico = Number($('#cboEpisodioAtencionEmer').val());

        formData.append('NroEpisodioHistorico', NroEpisodioHistorico);
        formData.append('EsNuevoEpisodio', $('#chkNuevoEpisodioEmer').is(":checked") ? 1 : 0);
        formData.append('EsCierreEpisodio', $('#chkCierreEpisodioEmer').is(":checked") ? 1 : 0);

        formData.append('IdAtencion', $('#hdnIdAtencion').val());
        formData.append('NombrePc', 'HNAL-PC');

        
        console.log(formData);

        try {
            datos = await $.ajax({
                method: "POST",
                url: "/AltaMedica/GuardarAltaMedica",
                //contentType: "application/json; charset=utf-8",
                data: formData,
                dataType: "json",
                cache: false,
                processData: false,
                contentType: false,
            });

            // await AltaMedica.GuardarDiagnosticos();
            // await AltaMedica.GuardarNacimientosAltaMedica();

            alerta('success', '', 'Se registro el alta medica')
            $('#modalAltaMedica').modal('hide');
            location.reload();

        } catch (error) {
            console.log(error)
        }

    },

    ObtenerDiagnosticosGuardar() {
        lstDiagnosticos = DtDiagnosticosEgreso.rows().data();
        diagnosticos = '';
        for (var i = 0; i < lstDiagnosticos.length; i++) {
            diagnosticos = diagnosticos + $('#hdnIdAtencion').val() + '@'; //IdAtencion
            diagnosticos = diagnosticos + 3 + '@'; //IdClasificacionDx (3 = Egreso hospitalizacion u Obs. emergencia)
            diagnosticos = diagnosticos + lstDiagnosticos[i].idDiagnostico + '@'; //IdDiagnostico
            diagnosticos = diagnosticos + lstDiagnosticos[i].idTipoDiagnostico + '@'; //IdSubclasificacionDx
            diagnosticos = diagnosticos + 0 + '@'; //LabCOnfHIS
            diagnosticos = diagnosticos + 0 + '@'; //GrupoHIS
            diagnosticos = diagnosticos + 0 + '@'; //SUbGrupoHIS
            diagnosticos = diagnosticos + $('#idServicioEgreso').val() + '@'; //IdServicio
            diagnosticos = diagnosticos + 0 + '@'; //0 -> Alta Medica
            diagnosticos = diagnosticos + '|';
        }

        lstDiagnosticosCom = DtDiagnosticosCom.rows().data();
        for (var i = 0; i < lstDiagnosticosCom.length; i++) {
            diagnosticos = diagnosticos + $('#hdnIdAtencion').val() + '@'; //IdAtencion
            diagnosticos = diagnosticos + 6 + '@'; //IdClasificacionDx (6 = Complicaciones hospitalizacion o emergencia)
            diagnosticos = diagnosticos + lstDiagnosticosCom[i].idDiagnostico + '@'; //IdDiagnostico
            diagnosticos = diagnosticos + 102 + '@'; //IdSubclasificacionDx
            diagnosticos = diagnosticos + 0 + '@'; //LabCOnfHIS
            diagnosticos = diagnosticos + 0 + '@'; //GrupoHIS
            diagnosticos = diagnosticos + 0 + '@'; //SUbGrupoHIS
            diagnosticos = diagnosticos + $('#idServicioEgreso').val() + '@'; //IdServicio
            diagnosticos = diagnosticos + 0 + '@'; //0 -> Alta Medica
            diagnosticos = diagnosticos + '|';
        }

        lstDiagnosticosMF = DtDiagnosticosMuerteFetal.rows().data();
        for (var i = 0; i < lstDiagnosticosMF.length; i++) {
            diagnosticos = diagnosticos + $('#hdnIdAtencion').val() + '@'; //IdAtencion
            diagnosticos = diagnosticos + 5 + '@'; //IdClasificacionDx (5 =Muerte fetal/perinatal hosp o emergencia)
            diagnosticos = diagnosticos + lstDiagnosticosMF[i].idDiagnostico + '@'; //IdDiagnostico
            diagnosticos = diagnosticos + lstDiagnosticosMF[i].idTipoDiagnostico + '@'; //IdSubclasificacionDx
            diagnosticos = diagnosticos + 0 + '@'; //LabCOnfHIS
            diagnosticos = diagnosticos + 0 + '@'; //GrupoHIS
            diagnosticos = diagnosticos + 0 + '@'; //SUbGrupoHIS
            diagnosticos = diagnosticos + $('#idServicioEgreso').val() + '@'; //IdServicio
            diagnosticos = diagnosticos + 0 + '@'; //0 -> Alta Medica
            diagnosticos = diagnosticos + '|';
        }

        lstDiagnosticosMort = DtDiagnosticosMortalidad.rows().data();
        for (var i = 0; i < lstDiagnosticosMort.length; i++) {
            diagnosticos = diagnosticos + $('#hdnIdAtencion').val() + '@'; //IdAtencion
            diagnosticos = diagnosticos + 4 + '@'; //IdClasificacionDx (4 = Mortalidad hospitalizacion o emergencia)
            diagnosticos = diagnosticos + lstDiagnosticosMort[i].idDiagnostico + '@'; //IdDiagnostico
            diagnosticos = diagnosticos + lstDiagnosticosMort[i].idTipoDiagnostico + '@'; //IdSubclasificacionDx
            diagnosticos = diagnosticos + 0 + '@'; //LabCOnfHIS
            diagnosticos = diagnosticos + 0 + '@'; //GrupoHIS
            diagnosticos = diagnosticos + 0 + '@'; //SUbGrupoHIS
            diagnosticos = diagnosticos + $('#idServicioEgreso').val() + '@'; //IdServicio
            diagnosticos = diagnosticos + 0 + '@'; //0 -> Alta Medica
            diagnosticos = diagnosticos + '|';
        }

        return diagnosticos;
    },


    ObtenerNacimientosGuardar() {

        lstNacimientos = DtNacimientos.rows().data();
        nacimientos = '';
        for (var i = 0; i < lstNacimientos.length; i++) {
            console.log(lstNacimientos[i])
            console.log(lstNacimientos[i].idSexo)
                // if (lstNacimientos[i].datoForm == undefined)
                //     nacimientos = nacimientos + lstNacimientos[i].fechaHoraNac + '@'; //IdAtencion
                // else {
                //     if (lstNacimientos[i].datoForm == 1)

            //     else
            //         nacimientos = nacimientos + lstNacimientos[i].fechaHoraNac + '@'; //IdAtencion
            // }
            nacimientos = nacimientos + lstNacimientos[i].fechaNac + '@'; //IdAtencion
            nacimientos = nacimientos + lstNacimientos[i].horaNac + '@'; //IdAtencion
            nacimientos = nacimientos + (lstNacimientos[i].edad == null ? 0 : lstNacimientos[i].edad) + '@'; //
            nacimientos = nacimientos + (lstNacimientos[i].talla == null ? 0 : lstNacimientos[i].talla) + '@'; //
            nacimientos = nacimientos + (lstNacimientos[i].peso == null ? 0 : lstNacimientos[i].peso) + '@'; //
            nacimientos = nacimientos + (lstNacimientos[i].idSexo == null ? 1 : lstNacimientos[i].idSexo) + '@'; //
            nacimientos = nacimientos + (lstNacimientos[i].idCondicion == null ? 1 : lstNacimientos[i].idCondicion) + '@'; //
            nacimientos = nacimientos + (lstNacimientos[i].apgar1 == null ? 0 : lstNacimientos[i].apgar1) + '@'; //
            nacimientos = nacimientos + (lstNacimientos[i].apgar5 == null ? 0 : lstNacimientos[i].apgar5) + '@'; //

            // if (lstNacimientos[i].datoForm == undefined)
            //     nacimientos = nacimientos + lstNacimientos[i].fechaHoraClampage + '@'; //IdAtencion
            // else {
            //     if (lstNacimientos[i].datoForm == 1)
            //         nacimientos = nacimientos + lstNacimientos[i].fechaClampage + ' ' + lstNacimientos[i].horaClampage + '@'; //IdAtencion
            //     else
            //         nacimientos = nacimientos + lstNacimientos[i].fechaHoraClampage + '@'; //IdAtencion
            // }
            nacimientos = nacimientos + lstNacimientos[i].fechaClampage + '@'; //IdAtencion
            nacimientos = nacimientos + lstNacimientos[i].horaClampage + '@';
            nacimientos = nacimientos + (lstNacimientos[i].nOrdenParto == null ? 0 : lstNacimientos[i].nOrdenParto) + '@'; //
            nacimientos = nacimientos + (lstNacimientos[i].nHijo == null ? 0 : lstNacimientos[i].nHijo) + '@'; //
            nacimientos = nacimientos + (lstNacimientos[i].nDocumento == null ? 0 : lstNacimientos[i].nDocumento) + '@'; //
            nacimientos = nacimientos + (lstNacimientos[i].idTipoDocIdentidad == null ? 0 : lstNacimientos[i].idTipoDocIdentidad) + '@'; //


            nacimientos = nacimientos + '|';
        }
        console.log(nacimientos)
        return nacimientos;
    },
    // async InserDiagnosticos(){

    //     await AltaMedica.GuardarDiagnosticos();
    //     await AltaMedica.GuardarNacimientosAltaMedica();
    // },


    async GuardarDiagnosticos() {

        let formData = new FormData()
        formData.append('_token', $("meta[name='csrf-token']").attr("content"));
        formData.append('IdAtencion', $('#hdnIdAtencion').val());
        formData.append('IdNumero', 0);
        formData.append("IdServicio", $('#idServicioEgreso').val());
        formData.append('Diagnosticos', AltaMedica.ObtenerDiagnosticosGuardar());

        console.log(formData);
        // END Motivo Atención

        try {
            datos = await $.ajax({
                method: "POST",
                url: "/AltaMedica/GuardarDiagnosticosAltaMedica",
                //contentType: "application/json; charset=utf-8",
                data: formData,
                dataType: "json",
                cache: false,
                processData: false,
                contentType: false,
            });

        } catch (error) {
            console.log(error)
        }

    },

    async GuardarNacimientosAltaMedica() {

        let formData = new FormData()
        formData.append('_token', $("meta[name='csrf-token']").attr("content"));
        formData.append('IdAtencion', $('#hdnIdAtencion').val());
        formData.append('Nacimientos', AltaMedica.ObtenerNacimientosGuardar());

        console.log(formData);
        // END Motivo Atención

        try {
            datos = await $.ajax({
                method: "POST",
                url: "/AltaMedica/GuardarNacimientosAltaMedica",
                //contentType: "application/json; charset=utf-8",
                data: formData,
                dataType: "json",
                cache: false,
                processData: false,
                contentType: false,
            });

        } catch (error) {
            console.log(error)
        }

    },



    async CargarDatosAltaMedica() {

        Cargando(1);

        let datosAltaMedica = await AltaMedica.ObtenerDatosAltaMedica();

        if(datosAltaMedica.length > 0){
            $('#cboDestinoAtencionAM').val(datosAltaMedica[0].IdDestinoAtencion).trigger('chosen:updated');
            $('#cboTipoAM').val(datosAltaMedica[0].IdTipoAlta).trigger('chosen:updated');

            $('#idTipoServicio').val(datosAltaMedica[0].IdTipoServicio).trigger('chosen:updated');
            $('#idServicioEgreso').val(datosAltaMedica[0].IdServicioEgreso).trigger('chosen:updated');
            $('#txtCodServicioEgreso').val(datosAltaMedica[0].CodigoServicio).trigger('chosen:updated');
            $('#txtDescServicioEgreso').val(datosAltaMedica[0].Servicio).trigger('chosen:updated');

            var fechaEgreso = datosAltaMedica[0].FechaEgreso;
            var fechaFormateada = fechaEgreso.split("/").reverse().join("-");
            //$('#txtFechaAM').val(fechaFormateada);
            $('#txtFechaAM').datepicker("setDate", datosAltaMedica[0].FechaEgreso);

            $('#txtHoraAM').val(datosAltaMedica[0].HoraEgreso).trigger('chosen:updated');
            $('#cboTipoCondicionAM').val(datosAltaMedica[0].IdCondicionAlta).trigger('chosen:updated');
            $('#cmbMedicoEgresoAM').val(datosAltaMedica[0].IdMedicoEgreso).trigger('chosen:updated');

            var destinoAtencionId = Number(datosAltaMedica[0].IdDestinoAtencion);
            if (destinoAtencionId == 26 || destinoAtencionId == 55 || destinoAtencionId == 65) {
                if (datosAltaMedica[0].FechaEgresoAdministrativo != null) {
                    var FechaEgresoAdministrativo = datosAltaMedica[0].FechaEgresoAdministrativo;
                    var fechaEgresadoAdmFormateada = FechaEgresoAdministrativo.split("/").reverse().join("-");
                    $('#txtFechaAAdm').val(fechaEgresadoAdmFormateada);
                }
                if (datosAltaMedica[0].txtHoraAAdm != null) {
                    var HoraEgresoAdministrativo = datosAltaMedica[0].HoraEgresoAdministrativo;
                    $('#txtHoraAAdm').val(HoraEgresoAdministrativo);
                }
            }

            if (destinoAtencionId == 23 || destinoAtencionId == 24) {
                // valorTipoAlta = 4;
                $('#regionReferencia').show();
                $('#cboTipoReferenciaAM').val(datosAltaMedica[0].IdTipoReferenciaDestino).trigger('chosen:updated');
                if (datosAltaMedica[0].IdTipoReferenciaDestino == 1)
                    $('#cboEstabMinsaReferenciaAM').val(datosAltaMedica[0].IdEstablecimientoDestino).trigger('chosen:updated');
                if (datosAltaMedica[0].IdTipoReferenciaDestino == 2)
                    $('#cboEstabNoMinsaReferenciaAM').val(datosAltaMedica[0].IdEstablecimientoNoMinsaDestino).trigger('chosen:updated');

                $('#txtNroRerernciaAM').val(datosAltaMedica[0].NroReferenciaDestino).trigger('chosen:updated');

                if (datosAltaMedica[0].IdTipoReferenciaDestino == 1) {
                    $('#estabMinsa').show();
                    $('#estabNoMinsa').hide();
                }
                if (datosAltaMedica[0].IdTipoReferenciaDestino == 2) {
                    $('#estabNoMinsa').show();
                    $('#estabMinsa').hide();
                }

            } else {
                $('#regionReferencia').hide();
            }

            $('#cboEpisodioAtencionEmer').val(datosAltaMedica[0].IdEpisodio).trigger('chosen:updated');
            $('#cboEpisodioAtencionEmerHide').val(datosAltaMedica[0].IdEpisodio).trigger('chosen:updated');

            if (datosAltaMedica[0].IdCondicionAlta = 4)
                $('#tab4').show();
            else
                $('#tab4').hide();

            var resDxEgreso = await AltaMedica.DiagnosticosClasificacionPorAtencion($('#hdnIdAtencion').val(), 3);
            DtDiagnosticosEgreso.clear().draw();
            DtDiagnosticosEgreso.rows.add(resDxEgreso).draw(false);

            var resDxMortal = await AltaMedica.DiagnosticosClasificacionPorAtencion($('#hdnIdAtencion').val(), 4);
            DtDiagnosticosMortalidad.clear().draw();
            DtDiagnosticosMortalidad.rows.add(resDxMortal).draw(false);

            var resDxMuerteFetal = await AltaMedica.DiagnosticosClasificacionPorAtencion($('#hdnIdAtencion').val(), 5);
            DtDiagnosticosMuerteFetal.clear().draw();
            DtDiagnosticosMuerteFetal.rows.add(resDxMuerteFetal).draw(false);

            var resDxComp = await AltaMedica.DiagnosticosClasificacionPorAtencion($('#hdnIdAtencion').val(), 6);
            DtDiagnosticosCom.clear().draw();
            DtDiagnosticosCom.rows.add(resDxComp).draw(false);

            var atenNac = await AltaMedica.AtencionNacimientoPorAtencion($('#hdnIdAtencion').val());
            DtNacimientos.clear().draw();
            DtNacimientos.rows.add(atenNac).draw(false);
            var lstNacimientos = DtNacimientos.rows().data();
            for (let i = 0; i < lstNacimientos.length; i++) {
                console.log(lstNacimientos[i])
            }
            // await OrdenMedica.CargarOrdenesMedicasPorIdCuentaAtencion(Variables.IdCuentaAtencion);
        } else {
            $('#txtFechaAM').datepicker("setDate", moment().toDate().format('dd/mm/yyyy'));
            $('#txtHoraAM').val(moment().toDate().format('HH:mm'));

            var resDxEgreso = await AltaMedica.DiagnosticosAltaMedicaDeEvaluacion($('#hdnIdAtencion').val(), 3);
            DtDiagnosticosEgreso.clear().draw();
            DtDiagnosticosEgreso.rows.add(resDxEgreso).draw(false);
        }

        

        Cargando(0);
    },

    async ObtenerDatosAltaMedica() {
        let formData = new FormData()
        formData.append('_token', $("meta[name='csrf-token']").attr("content"));
        formData.append('IdAtencion', $('#hdnIdAtencion').val());

        try {
            datos = await $.ajax({
                method: "POST",
                url: "/AltaMedica/ObtenerDatosAltaMedica",
                data: formData,
                dataType: "json",
                cache: false,
                processData: false,
                contentType: false,
            });

            return datos.resultado

        } catch (error) {
            console.log(error)
        }
    },

}

$(document).ready(function() {
    AltaMedica.IniciarPlugins();    
    AltaMedica.DataTableDiagnosticosEgreso();
    AltaMedica.DataTableDiagnosticosCom();
    AltaMedica.DataTableNacimientos();
    AltaMedica.DataTableDiagnosticosMuerteFetal();
    AltaMedica.DataTableDiagnosticosMortalidad();
    AltaMedica.Eventos();
});