var DTEmergencia = null;
var DTEvaInfEmer = null;

var Emergencia = {
    IdAtencion: 0,
    IdServicioEgreso: 0,
    accion: '',
    permisoFua: '',
    tipoBusqueda: 0,
    

    async  CargaInicial() {
        // Obtener la fecha actual
        var fechaHoy = new Date();
        var diaHoy = fechaHoy.getDate();
        var mesHoy = fechaHoy.getMonth() + 1; // Los meses en JavaScript empiezan en 0
        var anioHoy = fechaHoy.getFullYear();
    
        // Formatear fecha actual (agregar ceros si es necesario)
        if (diaHoy < 10) diaHoy = '0' + diaHoy;
        if (mesHoy < 10) mesHoy = '0' + mesHoy;
    
        var fechaP = `${diaHoy}/${mesHoy}/${anioHoy}`; // Fecha actual en formato DD/MM/YYYY
    
        // Calcular la fecha de hace dos días
        var fechaPasada = new Date();
        fechaPasada.setDate(fechaPasada.getDate() - 2);
    
        var diaPasado = fechaPasada.getDate();
        var mesPasado = fechaPasada.getMonth() + 1; // Ajustar el mes
        var anioPasado = fechaPasada.getFullYear(); // El año se ajustará automáticamente
    
        if (diaPasado < 10) diaPasado = '0' + diaPasado;
        if (mesPasado < 10) mesPasado = '0' + mesPasado;
    
        var fechaSemanaPasada = `${diaPasado}/${mesPasado}/${anioPasado}`;
    
        // Configurar los campos de fecha con los valores calculados
        $('#txtFechaAtencionBuscar').datepicker("setDate", fechaSemanaPasada);
        $('#txtFechaAtencionFinBuscar').datepicker("setDate", fechaP);
    
        // Simular clic en el botón para buscar datos después de un segundo
        setTimeout(function () {
            $("#btnBuscarAtencionesEmergencia").click();
        }, 1000);
    },
    


    plugins() {
        $(".hide_search").chosen({ disable_search_threshold: 10 });
        $(".chzn-select").chosen({ allow_single_deselect: false });
        $(".chzn-select-deselect,#select2_sample").chosen();
        $('.chzn-select').chosen().trigger("chosen:updated");

        $('#txtFechaAtencionBuscar, #txtFechaAtencionFinBuscar').datepicker({
            todayHighlight: true,
            autoclose: true,
            dateFormat: "dd/mm/yy",
            orientation: "bottom"
        });
    },

    /// <summary>
    /// EVENTOS
    /// </summary>
    /// Carga los eventos que se encargan de la interaccion y acciones en las vistas para el módulo
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    Eventos() {  
        $('#modalInformeEvaluacion').on('shown.bs.modal', function (event) {            
            DTEvaInfEmer.columns.adjust().draw();            
        });
        

        $('#tblAtencionEmer tbody').on('click', 'tr', function () {
            DTEmergencia.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');

            var objrowTb = DTEmergencia.row('.selected').data();
            //console.log(objrowTb);       //IdAtencion
            /*var pos = DTEmergencia.row($(this)).index();
            var row = DTEmergencia.fnGetData(pos);*/
        });

        // fecha  Kds
             // Inicializar los selectores de fecha
            $("#minDate").datepicker({
                dateFormat: 'yy-mm-dd'
            });
            $("#maxDate").datepicker({
                dateFormat: 'yy-mm-dd'
            });

             // Agregar eventos de filtrado por fecha
            $.fn.dataTable.ext.search.push(
                function(settings, data, dataIndex) {
                    var min = $('#minDate').val() ? new Date($('#minDate').val()) : null;
                    var max = $('#maxDate').val() ? new Date($('#maxDate').val()) : null;
                    var date = new Date(data[3]); // Asumiendo que la fecha está en la columna 3 (índice 2)

                    // Comprobar si la fecha está dentro del rango
                    if (
                        (min === null && max === null) ||
                        (min === null && date <= max) ||
                        (max === null && date >= min) ||
                        (date >= min && date <= max)
                    ) {
                        return true;
                    }
                    return false;
                }
            );

  

    // Redibujar el DataTable cuando se cambie la fecha
    $('#minDate, #maxDate').on('change', function() {
        table.draw();
    });
        $('.search').keypress(function (e) {
            if (e.which == 13) {
                e.preventDefault();
                $('.search').blur();
                $("#btnBuscarAtencionesEmergencia").click();
            }
        });

        $('#cboServicioEmergenciaBuscar').on('change', function (e) {
            e.preventDefault();
            $('.search').blur();
            $("#btnBuscarAtencionesEmergencia").click();
        });

        $('#btnBuscarAtencionesEmergencia').on('click', function () {
            //$('#lblMedicoProgramado').html('');
            if ($('#txtFechaAtencionBuscar').val() == "") {
                alerta('info', '', 'Ingrese la fecha de ingreso.');
                return false;
            }
            if (isEmpty($('#cboServicioEmergenciaBuscar').val())) {
                alerta('info', '', 'Seleccione un servicio.');
                return false;
            }

            Emergencia.tipoBusqueda = 1;
            Emergencia.ListarAtenciones(Emergencia.tipoBusqueda);
            //ReposicionarVista();
        });

       

      

        // $("#tblEpicrisis tbody").on("click", "tr", function () {
        //     let table = $("#tblEpicrisis").DataTable();
        //     listFilaAltaMedica = [];
        //     if ($(this).hasClass("selected")) {
        //         $(this).removeClass("selected");
        //     } else {
        //         oTable_TriajeEmergencia
        //             .$("tr.selected")
        //             .removeClass("selected");
        //         $(this).addClass("selected");
        //     }

        //     let rowData = table.row(this).data();
        //     listFilaAltaMedica = rowData;
        //     console.log(listFilaAltaMedica);
        // });

        $('#tblAtencionEmer tbody').on('click', '.btnInformeEvaluacion', async function () {        
            var objrow = DTEmergencia.row($(this).parents("tr")[0]).index();
            //console.log(objrow);
            var row = DTEmergencia.row(objrow).data();

            Emergencia.IdAtencion = row.IdAtencion;
            Emergencia.IdServicioEgreso = row.IdServicioEgreso;
            //await AdmisionEmergencia.SeleccionarEvaluacionDetalle(AdmisionEmergencia.IdAtencion, AdmisionEmergencia.IdServicioEgreso);
            await Emergencia.SeleccionarEvaluacionDetalle(Emergencia.IdAtencion, 0);
            
            $("#modalInformeEvaluacion").modal("show");
        });

        $("#btnCerrarInformeEvaluacion").on('click', function () {
            Emergencia.IdAtencion = 0;
            Emergencia.IdServicioEgreso = 0;
            $("#modalInformeEvaluacion").modal("hide");
        });

        $('#tblInformeEvaluacionesEmergencia tbody').on('click', '.ImprimirEvalSF', async function () {            
            var objrow = DTEvaInfEmer.row($(this).parents("tr")[0]).index();
            var row = DTEvaInfEmer.row(objrow).data();
            //console.log(row);
            Cargando(1);
            $.ajax({
                url: '/EvaluacionEmergencia/informes/generarPDF/' + row.IdAtencion + '?eval=' + row.IdNumero,
                method: 'GET',
                success: function (response) {
                    if (response.pdf_url) {
                        VizualizarModalPdf(response.pdf_url);
                        // Coloca la URL del PDF en el src del iframe
                        //$('#frame-pdf').attr('src', response.pdf_url);

                        // Abre el modal
                        //$('#pdfModal').modal('show');
                    } else {
                        console.error('Error al generar el PDF.');
                    }
                },
                error: function (error) {
                    console.error('Error en la solicitud AJAX:', error);
                }
            });
            /*if (isEmpty(row)) {
                alerta(2, 'Seleccione una evaluación por favor.');
            } else {
                const firma = await Utilitario.SeleccionarFirmaDigitalV2(row.code)
                if (isEmpty(firma)) {
                    alerta('2', 'El documento no esta generado, se procedera a generar el documento.')
                    const pdf = await Utilitario.GenerarHojaEvaluacionNeonatal(row.idCuentaAtencion, row.idEvaluacionDetalle, row.idAtencion, row.idServicio, row.idNumero);

                    if (pdf) {
                        alerta('1', 'Se generó el documento correctamente.')
                        $("#btnBuscarAtenciones").click();
                    } else {
                        alerta('2', 'El documento no ha podido ser generado por falta de información. Por favor modifique y guarde la atención nuevamente.')
                    }
                } else {
                    AbrirVisorDocumento(firma.rutaArchivo, 0);
                }
            }*/
            Cargando(0);
        });


    },

     /// <summary>
    /// DATATABLE
    /// </summary>
    /// Carga los datatables 
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    DataTableEmergencia() {
        DTEmergencia = $('#tblAtencionEmer').DataTable({
           
            paging : true,
            ordering : false,
            info : false,
            searching : true,
            scrollX : true,
            scrollY: '45vh', 
            columns: [
                {
                    width: '5%',
                    targets: 0,
                    data: "IdCuentaAtencion",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                {
                    width: '15%',
                    targets: 1,
                    data: null,
                    createdCell: function (td, cellData, rowData, row, col) {
                        let ApellidoPaterno= rowData.ApellidoPaterno?rowData.ApellidoPaterno:'NN';
                        let ApellidoMaterno= rowData.ApellidoMaterno?rowData.ApellidoMaterno:'NN';
                        let PrimerNombre= rowData.PrimerNombre?rowData.PrimerNombre:'NN';
                        let SegundoNombre= '';
                        $(td).attr('align', 'left')
                        $(td).html(ApellidoPaterno.toUpperCase() + ' ' + ApellidoMaterno.toUpperCase() + ' ' + PrimerNombre.toUpperCase() + ' ' + SegundoNombre.toUpperCase());
                    }
                },
                {
                    width: '5%',
                    targets: 2,
                    data: "NroHistoriaClinica",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')

                    }
                },
                /*{
                    width: '5%',
                    targets: 3,
                    data: null,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                        //$(td).html(FormatearFecha(rowData.fecNacim));     //reemplazado por edad
                        //if (rowData.edadEnAnio >= 0) {
                        //    $(td).html(rowData.edadEnAnio + ' A');
                        //} else if (rowData.edadEnMes >= 0) {
                        //    $(td).html(rowData.edadEnMes + ' M');
                        //} else if (rowData.edadEnDia >= 0) {
                        //    $(td).html(rowData.edadEnDia + ' D');
                        //}
                        $(td).html('--');
                    }
                },
                {
                    width: '5%',
                    targets: 4,
                    data: "TipoPaciente",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')

                    }
                },*/
                {
                    width: '5%',
                    targets: 5,
                    data: null,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                        $(td).html(rowData.TipoGravedad);
                        if(rowData.TipoGravedad == ''){
                            $(td).css('background-color', '#545454');
                            $(td).css('color', 'white');
                        }
                        else if(rowData.TipoGravedad == 'Prioridad I'){
                            $(td).css('background-color', '#cc0000');
                            $(td).css('color', 'white');
                        }
                        else if(rowData.TipoGravedad == 'Prioridad II'){
                            $(td).css('background-color', '#ff8000');
                            $(td).css('color', 'white');
                        }
                        else if(rowData.TipoGravedad == 'Prioridad III'){
                            $(td).css('background-color', '#fffc5c');
                            $(td).css('color', 'black');
                        }
                        else{
                            $(td).css('background-color', '#008f39');
                            $(td).css('color', 'white');
                        }
                    }
                },
                {
                    width: '6%',
                    targets: 6,
                    data: null,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                        $(td).html(isNull(rowData.FechaIngreso, '') + ' ' + isNull(rowData.HoraIngreso, ''));
                    }
                },
                {
                    width: '6%',
                    targets: 7,
                    data: 'FechaPrimeraEvaluacion',
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                        
                    }
                },
                {
                    width: '6%',
                    targets: 8,
                    data: null,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                        $(td).html(isNull(rowData.FechaEgreso, '') + ' ' + isNull(rowData.HoraEgreso, ''));
                    }
                },
                /*{
                    width: '6%',
                    targets: 9,
                    data: null,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                        $(td).html(isNull(rowData.FechaEgresoAdministrativo, ''));
                    }
                },*/
                {
                    width: '10%',
                    targets: 10,
                    data: "ServicioActual",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')

                    }
                },
                {
                    width: '6%',
                    targets: 11,
                    data: "Plan",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')

                    }
                },
                {
                    width: '5%',
                    targets: 12,
                    data: "CantEvaluacion",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                        if (rowData.CantEvaluacion > 0) {
                            $(td).parent().css('color', '#347dff');
                            $(td).parent().css('font-weight', 'bold');
                        }

                        if (rowData.IdEstadoFacturacion == 12) {
                            $(td).parent().css('color', '#8e24aa');
                            $(td).parent().css('font-weight', 'bold');
                        }

                        if (rowData.ConAlta == 1) {
                            $(td).parent().css('color', '#00ad15');
                            $(td).parent().css('font-weight', 'bold');
                        }
                    }
                },
                {
                    width: '5%',
                    targets: 13,
                    data: null,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center')

                        if (rowData.CantEvaluacion > 0) {
                            var btnRuta = "";
                            btnRuta = ' <button class="btnInformeEvaluacion btn btn-sm glow_button" data-toggle="tooltip" style="background:#71a8ed; color:white;"><i class="fa fa-print"></i> </button>';
                            $(td).html(btnRuta);
                        } else {
                            $(td).html('');
                        }
                        
                    }
                },
            ]
        });
    },

    DataTableInformeEvaluacion() {       
        DTEvaInfEmer = $("#tblInformeEvaluacionesEmergencia").DataTable({
            scrollY: "200px",
            scrollCollapse: true,
            autoWidth: false,
            ordering: false,
            //deferRender: true,
            //scroller: true,
            data: null,
            destroy: true,
            info: false,
            bFilter: false,
            paging: false,
            responsive: true,
            columns: [
                {
                    width: "10%",
                    targets: 0,
                    data: "IdNumero",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                        $(td).html("<span data-evaluacion=" + rowData.IdNumero + ">" + rowData.IdNumero + "</span>");
                    }
                },
                {
                    width: "60%",
                    targets: 1,
                    data: "Medico",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')

                    }
                },
                {
                    width: "30%",
                    targets: 1,
                    data: null,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                        btnImprimeSinF = '<button class="ImprimirEvalSF btn btn-sm btn-warning glow_button" title="Visualiza Atencion" data-toggle="tooltip"><i class="fa fa-eye"></i> </button>';
                        $(td).html(btnImprimeSinF);

                        /*if (rowData.code != '') {
                            var btnRuta = "";
                            var btnImprime = "";
                            var btnImprimeSinF = "";
                            if (rowData.statusFirma == 1) {
                                btnImprime = ' <button class="ImprimirEvalCF btn btn-sm btn-success glow_button" title="Imprime Atención Firmada" data-toggle="tooltip"><i class="fa fa-print"></i> </button>';
                            } else {
                                btnRuta = '<button class="btn btn-sm btn-info btnFirmaCE FirmarEvalSF" title="Firmar Atención" data-toggle="tooltip" style="margin: 2px;"> <i class="fa fa-pencil"></i></button>';
                                btnImprimeSinF = '<button class="ImprimirEvalSF btn btn-sm btn-warning glow_button" title="Visualiza Atencion" data-toggle="tooltip"><i class="fa fa-eye"></i> </button>';
                            }
                            $(td).html(btnRuta + " " + btnImprime + " " + btnImprimeSinF);
                        } else {
                            $(td).html('');
                        }    */                                            
                    }
                }
            ]
        });
    },

    /// <summary>
    /// METODOS
    /// </summary>
    /// Lista de metodos que se encargan de realizar consultas
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ListarAtenciones(tipoBusqueda) {
        Cargando(1);
        //console.log("F1");
        
        var midata = new FormData();
        
        var fecha = $('#txtFechaAtencionBuscar').val();
        var fechaFin = $('#txtFechaAtencionFinBuscar').val(); // JDELGADOPM
        if ($('#txtNroCuentaBuscar').val() != '' || $('#txtNroDniBuscar').val() != '' || $('#txtNroHistoriaBuscar').val() != '' || $('#txtApPaternoBuscar').val() != '') {
            fecha = '';
            fechaFin = ''; // JDELGADOPM
        }

        midata.append('_token', $("meta[name='csrf-token']").attr("content"));
        midata.append('idCuenta', $('#txtNroCuentaBuscar').val());
        midata.append('dni', $('#txtNroDniBuscar').val());
        midata.append('historia', $('#txtNroHistoriaBuscar').val());
        midata.append('apPaterno', $('#txtApPaternoBuscar').val());
        midata.append('fecha', fecha);
        midata.append('fechaFin', fechaFin); // JDELGADOPM
        midata.append('idServicio', $('#cboServicioEmergenciaBuscar').val());
        midata.append('tipoBusqueda', tipoBusqueda); // KHOYOSI
        var dataAtenciones = {};

        DTEmergencia.clear().draw();
        $.ajax({
            method: "POST",
            url: "/Emergencia/ListarAtencionesEmergencia",            
            data: midata,
            dataType: "json",
            processData: false,
            contentType: false,
            success: function (datos) {
                console.log('datos tabla',datos.resultado);
                Cargando(0);
                if (datos.resultado.length > 0) {
                   
                    
                    dataAtenciones = datos.resultado;
                    DTEmergencia.rows.add(dataAtenciones).draw(false);
                }
                else {
                    dataAtenciones = {};
                }
            }
        })
    },

    async SeleccionarEvaluacionDetalle(idAtencion, idServicio) {

        try {
            let datos;
            DTEvaInfEmer.clear().draw();
            var midata = new FormData();
            midata.append('_token', $("meta[name='csrf-token']").attr("content"));
            midata.append('idAtencion', idAtencion);
            midata.append('idServicio', idServicio);
            var dataEvaluacionDetalle = [];

            Cargando(1);
            datos = await
                $.ajax({
                    method: "POST",
                    url: "/EvaluacionEmergencia/SeleccionarEvaluacionDetalle",
                    data: midata,
                    dataType: "json",
                    cache: false,
                    processData: false,
                    contentType: false,
                });
            Cargando(0);
            if (datos.resultado.length > 0) {
                dataEvaluacionDetalle = datos.resultado;
                DTEvaInfEmer.rows.add(dataEvaluacionDetalle).draw(false);                
            }
            else {
                dataEvaluacionDetalle = [];
            }
            //DTEvaInfEmer.columns.adjust().draw();
        } catch (error) {
            Cargando(0);
            alerta('error','', error);
        }
        
        return dataEvaluacionDetalle;       
    },

}

$( document ).ready(function() {
    Emergencia.plugins();
    Emergencia.CargaInicial();
    Emergencia.DataTableEmergencia();
    Emergencia.DataTableInformeEvaluacion();
    Emergencia.Eventos();
    $('.chzn-select').chosen({
        width: '100%'
    });
});