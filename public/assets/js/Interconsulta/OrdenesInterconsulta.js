var OrdenInterconsulta = {
    idOrden: 0,
    idOrdenPago: 0,
    idCuentaAtencion: 0,
    idReceta: 0,

    Init() {    
        OrdenInterconsulta.IniciarPlugins();
        var fecha = new Date()
        var dia = fecha.getDate()
        var mes = parseInt(fecha.getMonth()) + 1
        var yyy = fecha.getFullYear()
        if (dia < 10)
            dia = '0' + dia //agrega cero si el menor de 10
        if (mes < 10)
            mes = '0' + mes
        fechaP = dia + "/" + mes + "/" + yyy

        $('#txtFechaAtencionBuscar').datepicker("setDate", moment().toDate().format('dd/mm/yyyy'));
        $('#txtFechaAtencionFinBuscar').datepicker("setDate", moment().toDate().format('dd/mm/yyyy')); 
    },

    IniciarPlugins() {
        $('#txtFechaAtencionBuscar, #txtFechaAtencionFinBuscar').datepicker({
            todayHighlight: true,
            autoclose: true,
            dateFormat: "dd/mm/yy",
            orientation: "bottom"
        });

        $.mask.definitions['H'] = '[012]';
        $.mask.definitions['N'] = '[012345]';
        $.mask.definitions['n'] = '[0123456789]';
        $("#HoraInicioAtencion").mask("Hn:Nn");

        $(".chzn-select").chosen();
        //$("#btnGuardarEva").hide();
    },

    IniciarDataTableInterconsultas() {
        DTInterconsultas = $('#tblAtencionInterconsulta').DataTable({
            paging : false,
            ordering : false,
            info : false,
            searching : false,
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
                    data: "Paciente",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')                        
                    }
                },
                {
                    width: '5%',
                    targets: 2,
                    data: "NroHistoria",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')

                    }
                },                 
                {
                    width: '6%',
                    targets: 3,
                    data: null,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                        $(td).html(isNull(rowData.FechaRegistro, ''));
                    }
                },                          
                {
                    width: '10%',
                    targets: 4,
                    data: "ServicioReceta",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')

                    }
                },
                {
                    width: '6%',
                    targets: 5,
                    data: "TipoPlan",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')

                    }
                },
                {
                    width: '5%',
                    targets: 6,
                    data: null,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center')

                        /*if (rowData.CantEvaluacion > 0) {
                            var btnRuta = "";
                            btnRuta = ' <button class="btnInformeEvaluacion btn btn-sm glow_button" data-toggle="tooltip" style="background:#71a8ed; color:white;"><i class="fa fa-print"></i> </button>';
                            $(td).html(btnRuta);
                        } else {
                            $(td).html('');
                        }
                        */
                    }
                },
            ]
        });
    },


    IniciarDataTablesDiagnosticosInterconsulta() {

        DTDiagnosticosInterconsulta = $('#tblDiagnosticosInter').DataTable({
            destroy: true,
            data: null,
            info: false,
            bFilter: false,
            scrollY: '70vh',
            "autoWidth": false,
            scrollCollapse: true,
            bLengthChange: false,
            bPaginate: false,
            buttons: [],
            columns: [
                {
                    width: "15%",
                    targets: 0,
                    data: "codigo",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    width: "55%",
                    targets: 1,
                    data: "diagnostico",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')

                    }
                },
                {
                    width: "20%",
                    targets: 2,
                    data: "tipoDiagnostico",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')

                    }
                },                    
            ]
        });
            
    },
    

    Eventos() {
        $("#modalOrdenInterconsulta").on("shown.bs.modal", function () {
            DTDiagnosticosInterconsulta.columns.adjust().draw();            
        });

        $('#btnBuscarInterconsultas').on('click', function () {
            
            if ($('#txtFechaAtencionBuscar').val() == "") {
                alerta('info', '', 'Ingrese la fecha inicio.');
                return false;
            }

            if ($('#txtFechaAtencionFinBuscar').val() == "") {
                alerta('info', '', 'Ingrese la fecha fin.');
                return false;
            }
            /*
            if (isEmpty($('#cboServicioEmergenciaBuscar').val())) {
                alerta('info', '', 'Seleccione un servicio.');
                return false;
            }*/

            OrdenInterconsulta.ListarInterconsultas();
            //ReposicionarVista();
        });

        $('#btnLimpiarFiltro').on('click', function () {            
            $(".search").val("");
            $('#txtFechaAtencionBuscar').datepicker("setDate", moment().toDate().format('dd/mm/yyyy'));
            $('#txtFechaAtencionFinBuscar').datepicker("setDate", moment().toDate().format('dd/mm/yyyy')); 
        });

        $('#tblAtencionInterconsulta tbody').on('click', 'tr', function () {
            DTInterconsultas.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');

            var objrowTb = DTInterconsultas.row('.selected').data();            
        });

        $('#btnAgregarAtenciones').on('click', async function () {
            OrdenInterconsulta.LimpiarModal();
            $("#modalOrdenInterconsulta").modal("show");
        });

        $('#btnModificarAtenciones').on('click', async function () {
            var objrowTb = DTInterconsultas.row('.selected').data();

            if (!isEmpty(objrowTb)) {
                OrdenInterconsulta.LimpiarModal();
                OrdenInterconsulta.CargarDatosInterconsulta(objrowTb);
                $("#modalOrdenInterconsulta").modal("show");
            } else {
                alerta('info', '', 'No se ha seleccionado ningun registro.');                
            }
        });

        $('#btnConsultarAtenciones').on('click', async function () {
            var objrowTb = DTInterconsultas.row('.selected').data();

            if (!isEmpty(objrowTb)) {
                OrdenInterconsulta.LimpiarModal();
                OrdenInterconsulta.CargarDatosInterconsulta(objrowTb);
                $("#btnGuardarOrdenInterconsulta").hide();
                $("#txtRespuestaInter").attr('disabled', 'disabled');
                $("#modalOrdenInterconsulta").modal("show");
            } else {
                alerta('info', '', 'No se ha seleccionado ningun registro.');                
            }            
        });

        $('#btnEliminarAtenciones').on('click', async function () {
            var objrowTb = DTInterconsultas.row('.selected').data();

            if (!isEmpty(objrowTb)) {
                Swal.fire({
                    title: 'Eliminar',
                    text: '¿Estas seguro de eliminar la interconsulta Nro. ' + objrowTb.IdInterconsulta + '?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#EF6F6C',
                    cancelButtonColor: '#5e5e5e',
                    confirmButtonText: 'Eliminar',
                    cancelButtonText: 'Cancelar',
                    allowOutsideClick: false,
                }).then(async (result) => { 
                    if (result.isConfirmed) {
                        //await OrdenMedica.EliminarOrdenesMedicas(objrow.IdReceta)                       
                        
                    }                  
                });
            } else {
                alerta('info', '', 'No se ha seleccionado ningun registro.');                
            }   
        });

        $('#btnBuscarRecetaInterconsulta').on('click', async function () {
            Cargando(1);
            let nroReceta = $("#txtNroRecetaInter").val();
            OrdenInterconsulta.LimpiarModal();
            if(nroReceta > 0) {
                await OrdenInterconsulta.BuscarRecetaInterconsulta(nroReceta);
            } else {
                alerta('info', '', 'Por favor ingrese un numero de orden válido.');
            }
            Cargando(0);
        });

        $('#txtNroRecetaInter').keypress(function (e) {
            if (e.which == 13) {
                e.preventDefault();
                $("#txtNroRecetaInter").blur();
                $("#btnBuscarRecetaInterconsulta").click();
            }
        });

        $('#btnGuardarOrdenInterconsulta').on('click', async function () {
            Cargando(1);
            await OrdenInterconsulta.GuardarOrdenInterconsulta();
            Cargando(0);
        });

        $('#btnCerrarOrdenInterconsulta').on('click', async function () {
            OrdenInterconsulta.LimpiarModal();
            $("#modalOrdenInterconsulta").modal("hide");
        });

    },

    ListarInterconsultas() {
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
        midata.append('fechaFin', fechaFin); 
        //midata.append('idServicio', $('#cboServicioEmergenciaBuscar').val());        
        var dataAtenciones = {};

        DTInterconsultas.clear().draw();
        $.ajax({
            method: "POST",
            url: "/Interconsulta/ListarInterconsultas",            
            data: midata,
            dataType: "json",
            processData: false,
            contentType: false,
            success: function (datos) {
                Cargando(0);
                if (datos.resultado.length > 0) {
                    dataAtenciones = datos.resultado;
                    DTInterconsultas.rows.add(dataAtenciones).draw(false);
                }
                else {
                    dataAtenciones = {};
                }
            }
        })
    },

    async GuardarOrdenInterconsulta() {
        var formData = new FormData();
        let datos;
        let resp = [];
       
        let respuestaInter = $("#txtRespuestaInter").val();

        if (OrdenInterconsulta.idCuentaAtencion == 0) {
            alerta('info', '', 'Por favor ingrese una orden de interconsulta.');
            return false;
            //return resp;
        }

        if (respuestaInter == "" || respuestaInter == null) {
            alerta('info', '', 'Por favor registre la respuesta a la solicitud de interconsulta.');
            return false;
            //return resp;
        }
                
        formData.append('_token', $("meta[name='csrf-token']").attr("content"));
              
        
        formData.append('idOrden', OrdenInterconsulta.idOrden);
        formData.append('idOrdenPago', OrdenInterconsulta.idOrdenPago);        
        formData.append('IdCuentaAtencion', OrdenInterconsulta.idCuentaAtencion); 
        formData.append('IdReceta', OrdenInterconsulta.idReceta); 
        formData.append('Respuesta', respuestaInter);
    
        //alerta(4, 'Generando recetas, por favor espere.');
        try {
            //Cargando(1);
            datos = await
                $.ajax({
                    method: "POST",
                    url: "/Interconsulta/GuardarOrdenInterconsulta",
                    data: formData,
                    dataType: "json",
                    cache: false,
                    processData: false,
                    contentType: false,
                });
            //Cargando(0);            
            alerta('success', '', 'La atención de interconsulta se guardo correctamente.')
            OrdenInterconsulta.LimpiarModal();
            $("#modalOrdenInterconsulta").modal("hide");
            $("#btnBuscarInterconsultas").click();
            //console.log(datos);
            resp = true;
          
        } catch (error) {
            console.error(JSON.stringify(error))
            //Cargando(0);
            alerta('error', '', JSON.stringify(error));
        }
    
        return resp;
    },

    async BuscarRecetaInterconsulta(IdReceta) {

        let formData = new FormData()

        formData.append('_token', $("meta[name='csrf-token']").attr("content"));

        // formData.append('IdCuentaAtencion', Variables.IdCuentaAtencion);
        formData.append('IdReceta', IdReceta);
        // END Motivo Atención

        try {
            datos = await $.ajax({
                method: "POST",
                url: "/Interconsulta/SeleccionarRecetaMedica",
                //contentType: "application/json; charset=utf-8",
                data: formData,
                dataType: "json",
                cache: false,
                processData: false,
                contentType: false,
            });
            
            if (datos.resultado.length > 0) {
                OrdenInterconsulta.CargarDatosRecetaInterconsulta(datos.resultado)
            } else {
                alerta('info', '', 'La orden médica no existe.');
            }
           

        } catch (error) {
            //console.error(error)
            alerta('error', '', error);
        }

    },

    CargarDatosRecetaInterconsulta(datos) {
        $(datos).each(async function (i, obj) {
            if(obj.IdPuntoCarga == 12) {
                if(obj.idEstado == 1) {
                    OrdenInterconsulta.idCuentaAtencion = obj.NroCuenta;
                    OrdenInterconsulta.idReceta = obj.idReceta;
                    $("#txtNroRecetaInter").val(obj.idReceta);
                    $("#txtNroCuentaInter").val(obj.NroCuenta);
                    $("#txtNroHistoriaInter").val(obj.NroHistoria);
                    $("#txtPacienteInter").val(obj.Paciente);
                    $("#txtTipoServicioInter").val(obj.TipoServicioReceta);
                    $("#txtServicioInter").val(obj.ServicioReceta);
                    $("#txtMedicoSolicitanteInter").val(obj.Medico);
                    $("#txtResumenHistoriaClinicaInter").val(obj.resumenHistoriaClinica);
                    $("#txtMotivoInterconsultaInter").val(obj.motivoInterconsulta);   

                    OrdenInterconsulta.ListarDiagnosticos(obj.IdAtencion, obj.IdNumero);                 
                } else {
                    if(obj.idEstado == 2) {
                        alerta('info', '', 'La orden de interconsulta ya se encuentra registrada.');
                    }
                    if(obj.idEstado == 9) {
                        alerta('info', '', 'La orden de interconsulta ya se encuentra anulada.');
                    }
                }
            } else {
                alerta('info', '', 'La orden médica no es de interconsulta.');
                return;
            }
        });
    },

    CargarDatosInterconsulta(obj) {
        //$(datos).each(async function (i, obj) {
            if(obj.IdPuntoCarga == 12) {
                $("#contentNroReceta").hide();
                OrdenInterconsulta.idCuentaAtencion = obj.NroCuenta;
                OrdenInterconsulta.idReceta = obj.idReceta;
                OrdenInterconsulta.idOrden = obj.IdOrden;
                OrdenInterconsulta.idOrdenPago = obj.IdOrdenPago;
                $("#txtNroRecetaInter").val(obj.idReceta);
                $("#txtNroCuentaInter").val(obj.NroCuenta);
                $("#txtNroHistoriaInter").val(obj.NroHistoria);
                $("#txtPacienteInter").val(obj.Paciente);
                $("#txtTipoServicioInter").val(obj.TipoServicioReceta);
                $("#txtServicioInter").val(obj.ServicioReceta);
                $("#txtMedicoSolicitanteInter").val(obj.Medico);
                $("#txtResumenHistoriaClinicaInter").val(obj.resumenHistoriaClinica);
                $("#txtMotivoInterconsultaInter").val(obj.Motivo);   
                $("#txtRespuestaInter").val(obj.Respuesta);   

                OrdenInterconsulta.ListarDiagnosticos(obj.IdAtencion, obj.IdNumero);                 
                            
                if(obj.IdEstadoOrden == 4) {
                    $("#btnGuardarOrdenInterconsulta").hide();
                    $("#txtRespuestaInter").attr('disabled', 'disabled');
                    alerta('info', '', 'La orden de interconsulta ya se encuentra pagada.');
                }
                if(obj.IdEstadoOrden == 9) {
                    $("#btnGuardarOrdenInterconsulta").hide();
                    $("#txtRespuestaInter").attr('disabled', 'disabled');
                    alerta('info', '', 'La orden de interconsulta ya se encuentra anulada.');
                }
                
            } else {
                alerta('info', '', 'La orden médica no es de interconsulta.');
                return;
            }
        //});
    },

    async ListarDiagnosticos(IdAtencion, IdNumeroEval) {

        let formData = new FormData()

        formData.append('_token', $("meta[name='csrf-token']").attr("content"));

        // formData.append('IdCuentaAtencion', Variables.IdCuentaAtencion);
        formData.append('IdAtencion', IdAtencion);
        formData.append('IdNumero', IdNumeroEval);
        // END Motivo Atención

        try {
            datos = await $.ajax({
                method: "POST",
                url: "/Interconsulta/ListarDiagnosticos",
                //contentType: "application/json; charset=utf-8",
                data: formData,
                dataType: "json",
                cache: false,
                processData: false,
                contentType: false,
            });
            
            /////////Diagnosticos para Recetas Medicas//////////////
            DTDiagnosticosInterconsulta.clear().draw();
            DTDiagnosticosInterconsulta.rows.add(datos.resultado).draw(false);

        } catch (error) {
            //console.error(error)
            alerta('error', '', error);
        }

    },

    LimpiarModal(){
        $(".campo").val("");
        OrdenInterconsulta.idOrden = 0;
        OrdenInterconsulta.idOrdenPago = 0;
        OrdenInterconsulta.idCuentaAtencion = 0;
        OrdenInterconsulta.idReceta = 0;

        DTDiagnosticosInterconsulta.clear().draw();
        
        $("#contentNroReceta").show();
        $("#txtRespuestaInter").removeAttr("disabled");
        $("#btnGuardarOrdenInterconsulta").show();
    },

}


$(document).ready(function () {
    OrdenInterconsulta.Init();
    //OrdenInterconsulta.IniciarPlugins();
    OrdenInterconsulta.IniciarDataTableInterconsultas();
    OrdenInterconsulta.IniciarDataTablesDiagnosticosInterconsulta();
    OrdenInterconsulta.Eventos();
});