var objDiagnosticoIngreso = {
    idDiagnostico: 0,
    codigo: "",
    diagnostico: "",
    idTipoDiagnostico: 0,
    tipoDiagnostico: "",
    idClasificacionDx: 0,
    idServicioActual : 0
};


var objDiagnosticoMuerteFetal = {
    idDiagnostico: 0,
    codigo: "",
    diagnostico: "",
    idTipoDiagnostico: 0,
    tipoDiagnostico: "",
    idClasificacionDx: 0,
    idServicioActual : 0
}

var objDiagnosticoMuerte = {
    idDiagnostico: 0,
    codigo: "",
    diagnostico: "",
    idTipoDiagnostico: 0,
    tipoDiagnostico: "",
    idClasificacionDx: 0,
    idServicioActual : 0
}

var objDiagnosticoComplicacion = {
    idDiagnostico: 0,
    codigo: "",
    diagnostico: "",
    idTipoDiagnostico: 0,
    tipoDiagnostico: "",
    idClasificacionDx: 0,
    idServicioActual : 0
}

var listDataDiagnositoIngreso = [];
var listDataDiagnosticoMuerte = [];
var listDataDiagnosticoMuerteFetal = [];
var listDataDiagnosticoComplicacion = [];
var idcamaActual ="";
var Transferencias = {
    idCamaActual: 0,
    idTipoServicio:0,
    tipoServicio:'HOSP',
    ListarTransferencias :0,
    esObservacionEmergencia:"",
    idServicioTransferido :"",
    idEstanciaHospitalariaActual: 0

} ;

var objMedicamentoIngreso = {
    idProducto: 0,
    producto: "",
    idDosis: 0,
    dosis: "",
    idVias: 0,
    vias: "",
    frecuencia: "",
    idPuntoCarga : 0,
    idServicioActual : 0,
    idCuentaAtencion : 0,
    cantidadPedida : 0,
    precio : 0
};


var idAtencion = 0;
var idServicioActual = 0;
var registroMedicamento=[];
var idCuentaAtencion=0;
var idPaciente = 0;
<<<<<<< HEAD
var Transferencias = {
    idCamaActual: 0,
    ListarTransferencias :0

} ;
=======
var DTEvaInfHosp  = null;

>>>>>>> c43206bf175774a3bfc1e1fc1e2cd58a60d1e406

var listDiagnosticoEgreso = [];
var listFilaAltaMedica = [];


var fechaCierre ="";


var medicoID = 0;

var Epicrisis = {
    ValidarBotonClick: 0, //0:consultar,modificar
    tipoServicio: "HOSP",
    idEspecialidad:0,
    Forzar: 0,
    IdAtencion : 0,
    IdServicioEgreso : 0,
    selectedRow:null,
    Plugins() {
        $('#dxMortalidad-tab-link').hide();
        
        $("#txtFechaEgreso").datepicker({
            todayHighlight: true,
            autoclose: true,
            dateFormat: "yy-mm-dd",
            orientation: "bottom",
        });

        $("#txtFechaInicioAtencion").datepicker({
            todayHighlight: true,
            autoclose: true,
            dateFormat: "yy-mm-dd",
            orientation: "bottom",
        });

        $("#txtFechaAtencionFinBuscar1").datepicker({
            todayHighlight: true,
            autoclose: true,
            dateFormat: "yy-mm-dd",
            orientation: "bottom",
        });

        $("#txtFechaTransferencia").datepicker({
            todayHighlight: true,
            autoclose: true,
            dateFormat: "yy-mm-dd",
            orientation: "bottom",
        });

        $("#txtFechaTransferencia").datepicker({
            todayHighlight: true,
            autoclose: true,
            dateFormat: "yy-mm-dd",
            orientation: "bottom",
        });

        $("#txtHoraAltaMedica").inputmask("hh:mm", {
            placeholder: "HH:MM", 
            insertMode: false, 
            showMaskOnHover: false,
            alias: "datetime",
            hourFormat: 12
           }
        );



        $("#txtHoraAltaAdm").inputmask("hh:mm", {
            placeholder: "HH:MM", 
            insertMode: false, 
            showMaskOnHover: false,
            alias: "datetime",
            hourFormat: 12
           }
        );

        $("#txtFechaAltaAdm").datepicker({
            todayHighlight: true,
            autoclose: true,
            dateFormat: "yy-mm-dd",
            orientation: "bottom",
        });
<<<<<<< HEAD
        $('#txtFechaRecepcionTransferencia').datepicker({
            todayHighlight: true,
            autoclose: true,
            dateFormat: "dd/mm/yy",
            orientation: "bottom"
        });

      
        
=======

 
>>>>>>> c43206bf175774a3bfc1e1fc1e2cd58a60d1e406
        

        var fecha = new Date();
        var dia = fecha.getDate();
        var mes = parseInt(fecha.getMonth()) + 1;
        var yyy = fecha.getFullYear();
        if (dia < 10)
            dia = '0' + dia; //agrega cero si el menor de 10
        if (mes < 10)
            mes = '0' + mes
        fechaP = dia + "/" + mes + "/" + yyy;
        fechaHoy = yyy + "-" + mes + "-" + dia

        var hora = fecha.getHours();
        var min = fecha.getMinutes();

        // Agregar ceros si es menor de 10
        if (hora < 10) hora = '0' + hora;
        if (min < 10) min = '0' + min;

        var horaP = hora + ":" + min;


        //$('#txtFechaAlta').val(fechaP);        

        var hora = fecha.getHours();
        var min = fecha.getMinutes();
        if (hora < 10)
            hora = '0' + hora;
        if (min < 10)
            min = '0' + min
        horaP = hora + ':' + min;
        $("#txtFechaInicioAtencion").val(fechaHoy);
        $("#txtFechaAtencionFinBuscar1").val(fechaHoy);
<<<<<<< HEAD
        $("#txtHoraAlta").val(horaP); 
        $("#txtFechaEgreso").val(fechaHoy);
        $("#txtFechaRecepcionTransferencia").val(fechaHoy);
        $("#txtHoraRecepcionTransferencia").val(fechaHoy);
        $("#txtFechaAlta").val(fechaHoy);
=======
        $("#txtHoraRecepcionTransferencia").val(horaP);
        $("#txtFechaEgreso").val(fechaHoy);
        $("#txtFechaRecepcionTransferencia").val(fechaHoy);
        $("#txtHoraRecepcionTransferencia").val(horaP);
        $("#txtFechaRecepcionTransferencia").val(fechaHoy);
>>>>>>> c43206bf175774a3bfc1e1fc1e2cd58a60d1e406
        $("#txtFechaAltaAdm").val(fechaHoy);
        $("#txtHoraAltaAdm").val(horaP);
        $("#txtFechaAlta").val(fechaHoy);
        $("#txtHoraAlta").val(horaP);
        $('#regionReferencia').hide();
    },

    InitialCharge() {
        $("#btnLimpiar").trigger("click");
        let fechaP = Epicrisis.RetornarFechaActual();
        $("#txtFechaTriajeBusq").datepicker("setDate", fechaP);
        $("#btnBuscar").trigger("click");
    
    },

    RetornarFechaActual() {
        let fecha = new Date();
        let dia = fecha.getDate();
        let mes = parseInt(fecha.getMonth()) + 1;
        let yyy = fecha.getFullYear();
        if (dia < 10) dia = "0" + dia; //agrega cero si el menor de 10
        if (mes < 10) mes = "0" + mes;
        let fechaP = dia + "/" + mes + "/" + yyy;
        return fechaP;
    },
    CerrarModalTransferencias() {
        Epicrisis.LimpiarModalTransferencias();
        $("#modalTransferenciasHosp").modal("hide");
    },
    async ListarCamas(idServicio) {
        var midata = new FormData();
        let datos;
        var isDisabled;
          
        midata.append('_token', $("meta[name='csrf-token']").attr("content"));
        midata.append('idServicio', idServicio);
        try {
            datos = await
                $.ajax({
                    method: "POST",
                    url: "/Transferencia/ListarCamasPorServicio",
                    data: midata,
                    dataType: "json",
                    cache: false,
                    processData: false,
                    contentType: false,
                });

            $('#cboCamaActualTransferencia').empty();                
            // $(datos.resultado).each(function (i, obj) {
            //     if (obj.IdPaciente != Variables.IdPaciente) {
            //         if (obj.IdCama == -1) {
            //             isDisabled = 'disabled'
            //         }
            //         $('#cboCamaActualTransferencia').append('<option ' + isDisabled + ' value="' + obj.IdCama + '">' + obj.Paciente + '</option>');
            //     } else {
            //         $('#cboCamaActualTransferencia').append('<option ' + isDisabled + ' value="' + Transferencias.idCamaActual + '">' + obj.Paciente + '</option>');
            //     }
                
            //     isDisabled = '';
            // });
            // $('#cboCamaActualTransferencia').val(Transferencias.idCamaActual);
            $('.chzn-select').chosen().trigger("chosen:updated");
        } catch (error) {
            alerta(3, error);
        }
    },
    
    async ListarTransferencias() {
        
        let datos;
        DTTransferencias.clear().draw();
        var midata = new FormData();
        
        midata.append('_token', $("meta[name='csrf-token']").attr("content"));
        midata.append('idAtencion', listFilaAltaMedica.IdAtencion);        
        midata.append('secuenciaMayorA', 1);

        try {
            Cargando(1);
            datos = await
            $.ajax({
                method: "POST",
                url: "/Transferencia/ListarTransferencias",
                data: midata,
                dataType: "json",
                cache: false,
                processData: false,
                contentType: false,
            });
            Cargando(0);
            if (datos.resultado.length > 0) {
                DTTransferencias.clear().draw();
                DTTransferencias.rows.add(datos.resultado).draw(false);
            }
        } catch (error) {
            alerta(3, error);
        }
                
    },

    //================TRANSFERENCIAS======================================//
    LimpiarModalTransferencias() {
        DTTransferencias.clear().draw();
        $('#cboMedicoOrdenaTransferencia').val(0);
        $('#cboMedicoRecibeTransferencia').val(0);
        $('#cboServicioRecibeTransferencia').val(0);
        $('.chzn-select').chosen().trigger("chosen:updated");
        //Variables.Limpiar();
    },
    async ListarTransferencias() {
        
        let datos;
        DTTransferencias.clear().draw();
        var midata = new FormData();
        
        midata.append('_token', $("meta[name='csrf-token']").attr("content"));
        midata.append('idAtencion', listFilaAltaMedica.IdAtencion);        
        midata.append('secuenciaMayorA', 1);

        try {
            Cargando(1);
            datos = await
            $.ajax({
                method: "POST",
                url: "/Transferencia/ListarTransferencias",
                data: midata,
                dataType: "json",
                cache: false,
                processData: false,
                contentType: false,
            });
            Cargando(0);
            if (datos.resultado.length > 0) {
                DTTransferencias.clear().draw();
                DTTransferencias.rows.add(datos.resultado).draw(false);
            }
        } catch (error) {
            alerta(3, error);
        }
                
    },
    async GuardarTransferencias() {
        //Cargando(1);
        var respuesta;
        var resp = false;
        let datos;
        var formData = new FormData();

        formData.append('_token', $("meta[name='csrf-token']").attr("content"));
        formData.append('idAtencion',listFilaAltaMedica.IdAtencion);
        formData.append('idPaciente', listFilaAltaMedica.IdPaciente);
        formData.append('idMedicoOrden', $('#cboMedicoEgresoTransferencia').val());
        console.log( $('#cboMedicoEgresoTransferencia').val());
        // formData.append('idMedicoRecibe', $('#cboMedicoRecibeTransferencia').val() == null ? 0 : $('#cboMedicoRecibeTransferencia').val());
        formData.append('fecha', $('#txtFechaRecepcionTransferencia').val());
        formData.append('hora', $('#txtHoraRecepcionTransferencia').val());
        formData.append('idCama', $('#cboCamaDestinoTransferencia').val() == null ? 0 : $('#cboCamaDestinoTransferencia').val());
        formData.append('idServicio', $('#cboServicioRecibeTransferencia').val());

        Transferencias.idServicioTransferido = $('#cboServicioRecibeTransferencia').val();
        
        try {
            datos = await
                $.ajax({
                    method: "POST",
                    url: "/Transferencia/GuardarTransferencias",
                    data: formData,
                    dataType: "json",
                    cache: false,
                    processData: false,
                    contentType: false,
                });

                if (datos.resultado == 1) {
                    resp = true;
                    alerta('success', '', 'La transferencia se guardó correctamente.');

                } else {
                    alerta('error', '', datos.msj)
                }
        } catch (error) {
            //console.error(error)
            alerta('danger', '', error);
        }

        //return datos;
        return resp;
    },


    async SeleccionarAtencion(idAtencion) {
        console.log('idAtencion',idAtencion);
        var midata = new FormData();
        let datos;
        var resp = null;

        midata.append('_token', $("meta[name='csrf-token']").attr("content"));
        midata.append('IdAtencion', idAtencion);
        try {
            datos = await
                $.ajax({
                    method: "POST",
                    url: "/Transferencia/SeleccionarAtencionHospi",
                    data: midata,
                    dataType: "json",
                    cache: false,
                    processData: false,
                    contentType: false,
                });
                
                resp = datos.resultado[0];
        } catch (error) {
            alerta(3, error);
        }

        return resp;
    },
    async ListarServicios() {
        var midata = new FormData();
        let datos;

       
        filtro = ' (3) ORDER BY dbo.TiposServicio.Descripcion,dbo.Servicios.Nombre';
        midata.append('_token', $("meta[name='csrf-token']").attr("content"));
        midata.append('filtro', filtro);
        try {
            datos = await
                $.ajax({
                    method: "POST",
                    url: "/Transferencia/ServiciosDelHospitalFiltro",
                    data: midata,
                    dataType: "json",
                    cache: false,
                    processData: false,
                    contentType: false,
                });

                $('#cboServicioRecibeTransferencia').empty();
                $('#cboServicioActualTransferencia').empty();
                $('#cboServicioEsperaTransferencia').empty();
                $(datos.resultado).each(function (i, obj) {
                    $('#cboServicioRecibeTransferencia').append('<option value="' + obj.IdServicio + '">' + obj.DservicioHosp + '</option>');
                    $('#cboServicioActualTransferencia').append('<option value="' + obj.IdServicio + '">' + obj.DservicioHosp + '</option>');
                    $('#cboServicioEsperaTransferencia').append('<option value="' + obj.IdServicio + '">' + obj.DservicioHosp + '</option>');
                });
                $('#cboServicioRecibeTransferencia').val(0);
                $('#cboServicioActualTransferencia').val(0);
                $('#cboServicioEsperaTransferencia').val(0);
                $('.chzn-select').chosen().trigger("chosen:updated");
        } catch (error) {
            alerta(3, error);
        }
    },
    async ListarServiciosRecepcion() {
        var midata = new FormData();
        let datos;

       
        filtro = ' (3) ORDER BY dbo.TiposServicio.Descripcion,dbo.Servicios.Nombre';
        midata.append('_token', $("meta[name='csrf-token']").attr("content"));
        midata.append('filtro', filtro);
        try {
            datos = await
                $.ajax({
                    method: "POST",
                    url: "/Transferencia/ServiciosDelHospitalFiltro",
                    data: midata,
                    dataType: "json",
                    cache: false,
                    processData: false,
                    contentType: false,
                });

                $('#cboServicioRecibeTransferencia1').empty();
                $('#cboServicioActualTransferencia').empty();
                $('#cboServicioEsperaTransferencia').empty();
                $(datos.resultado).each(function (i, obj) {
                    $('#cboServicioRecibeTransferencia1').append('<option value="' + obj.IdServicio + '">' + obj.DservicioHosp + '</option>');
                    $('#cboServicioActualTransferencia').append('<option value="' + obj.IdServicio + '">' + obj.DservicioHosp + '</option>');
                    $('#cboServicioEsperaTransferencia').append('<option value="' + obj.IdServicio + '">' + obj.DservicioHosp + '</option>');
                });
                $('#cboServicioRecibeTransferencia1').val(0);
                $('#cboServicioActualTransferencia').val(0);
                $('#cboServicioEsperaTransferencia').val(0);
                $('#cboServicioRecibeTransferencia1').val(listFilaAltaMedica.IdServicioActual);
                $('#cboServicioActualTransferencia').val(listFilaAltaMedica.IdServicioActual);
                $('#cboServicioEsperaTransferencia').val(listFilaAltaMedica.IdServicioActual);

                $('.chzn-select').chosen().trigger("chosen:updated");
        } catch (error) {
            alerta(3, error);
        }
    },
    // async  CargarMedicos() {
    //     const select = $("#cboMedicoEgresoTransferencia");
    
    //     if (select.length === 0) {
    //         console.warn("Elemento #cboMedicoEgresoTransferencia no encontrado.");
    //         return;
    //     }
    
    //     select.empty().append('<option value="">Seleccione un médico</option>');
    
    //     try {
    //         const datos = await $.ajax({
    //             method: "POST",
    //             url: "/Transferencia/ListarMedicos",
    //             data: { _token: $("meta[name='csrf-token']").attr("content") },
    //             dataType: "json"
    //         });
    
    //         const idMedicoLogeado = parseInt(datos.idMedicoLogeado, 10);
    //         const medicos = datos.medicos;
    
    //         console.log("idMedicoLogeado:", idMedicoLogeado);
    //         console.log("medicos:", medicos);
    
    //         medicos.forEach(medico => {
    //             const idMedico = parseInt(medico.IdMedico, 10);
                
    //             const option = $("<option>")
    //                 .val(medico.IdMedico)
    //                 .text(medico.Medico);
    
    //             if (idMedico === 4685) {
    //                 option.prop("selected", true);
    //             }
    
    //             select.append(option);
    //         });
    
    //         select.trigger("chosen:updated");
    
    //     } catch (error) {
    //         console.error("Error cargando médicos:", error);
    //         Swal.fire("Error", "No se pudieron cargar los médicos", "error");
    //     }
    // },
     async GuardarCamaActualPaciente(idEstanciaHosp, idCama) {
        let resp = false;
        let datos;
        var midata = new FormData();
        midata.append('_token', $("meta[name='csrf-token']").attr("content"));
        midata.append('idEstanciaHosp', idEstanciaHosp);
        midata.append('idCama', idCama);

        try {
            //Cargando(1);
            datos = await
                $.ajax({
                    method: "POST",
                    url: "/Camas/ModificarCamaEstanciaHospitalaria?area=Comun",
                    data: midata,
                    dataType: "json",
                    cache: false,
                    processData: false,
                    contentType: false,
                });
                console.log('datos',datos)
            //Cargando(0);
            resp = true;
           // alerta2('success', '', 'La cama del paciente se guardó correctamente.');
           /*
            if (datos.resultado =='0') {  
                resp = true;
                alerta2('success', '', 'La cama del paciente se guardó correctamente.');
                
            }
                */
        } catch (error) {
            console.log('no se pudo actualizar la cama');
        }

        return resp;
    },
    async ModificarCamaActual() {
        var idCama = $('#cboCamaActualTransferencia').val();
        if (idCama > 0) {
            const resp = await Epicrisis.GuardarCamaActualPaciente(Transferencias.idEstanciaHospitalariaActual, idCama);
            console.log('resp',resp)
            if (resp) {
                //AdmisionEmergencia.ListarAtenciones();
                //$("#modalTransferencias").modal("hide");
                // if (Transferencias.tipoServicio == 'EMER') {
                //     AdmisionEmergencia.ListarAtenciones(AdmisionEmergencia.tipoBusqueda);
                // }
               
                
                if (Transferencias.tipoServicio == 'HOSP') {
                    // AdmisionHospitalizacion.ListarAtenciones(AdmisionHospitalizacion.tipoBusqueda);
                    alerta('success', '', 'Se actualizó la cama correctamente');
                    cargarEpicrisis();
                    Epicrisis.CerrarModalCambiarCama();
                }
                    
                // if (Transferencias.tipoServicio == 'UCI') {
                //     EvaluacionesUCI.ListarAtenciones();
                // }
               
               // alerta2('succes', '', 'Los cambios se guardaron con èxito.');
                
               
            }
        } else {
            alerta('warning', '', 'Seleccione una cama disponible.');
        }        
    },
    async SeleccionarEvaluacionDetalle(idAtencion, idServicio) {

        try {
            let datos;
            DTEvaInfHosp.clear().draw();
            var midata = new FormData();
            midata.append('_token', $("meta[name='csrf-token']").attr("content"));
            midata.append('idAtencion', idAtencion);
            midata.append('idServicio', idServicio);
            var dataEvaluacionDetalle = [];

            Cargando(1);
            datos = await
                $.ajax({
                    method: "POST",
                    url: "/EvaluacionHospitalizacion/SeleccionarEvaluacionDetalle",
                    data: midata,
                    dataType: "json",
                    cache: false,
                    processData: false,
                    contentType: false,
                });
            Cargando(0);
            if (datos.resultado.length > 0) {
                dataEvaluacionDetalle = datos.resultado;
                console.log('dataEvaluacionDetalle',dataEvaluacionDetalle)
                DTEvaInfHosp.rows.add(dataEvaluacionDetalle).draw(false);                
            }
            else {
                dataEvaluacionDetalle = [];
            }
            //DTEvaInfHosp.columns.adjust().draw();
        } catch (error) {
            Cargando(0);
            alerta('error','', error);
        }
        
        return dataEvaluacionDetalle;       
    },
    async ListarCamas(idServicio) {
        var midata = new FormData();
        let datos;
        var isDisabled;
          
        midata.append('_token', $("meta[name='csrf-token']").attr("content"));
        midata.append('idServicio', idServicio);
        try {
            datos = await
                $.ajax({
                    method: "POST",
                    url: "/Transferencia/ListarCamasPorServicio",
                    data: midata,
                    dataType: "json",
                    cache: false,
                    processData: false,
                    contentType: false,
                });

                console.log('datos',datos)
            $('#cboCamaActualTransferencia').empty();                
            $(datos.resultado).each(function (i, obj) {
                if (obj.IdPaciente != listFilaAltaMedica.IdPaciente) {
                    if (obj.IdCama == -1) {
                        isDisabled = 'disabled'
                    }
                    $('#cboCamaActualTransferencia').append('<option ' + isDisabled + ' value="' + obj.IdCama + '">' + obj.Paciente + '</option>');
                } else {
                    $('#cboCamaActualTransferencia').append('<option ' + isDisabled + ' value="' + Transferencias.idCamaActual + '">' + obj.Paciente + '</option>');
                }
                
                isDisabled = '';
            });
            $('#cboCamaActualTransferencia').val(Transferencias.idCamaActual);
            $('.chzn-select').chosen().trigger("chosen:updated");
        } catch (error) {
            alerta(3, error);
        }
    },
    async ListarCamasEspera(idServicio, idPaciente, idCama) {
        var midata = new FormData();
        let datos;
        var isDisabled;

        midata.append('_token', $("meta[name='csrf-token']").attr("content"));
        midata.append('idServicio', idServicio);
        try {
            datos = await
                $.ajax({
                    method: "POST",
                    url: "/Transferencia/ListarCamasPorServicio",
                    data: midata,
                    dataType: "json",
                    cache: false,
                    processData: false,
                    contentType: false,
                });

            $('#cboCamaEsperaTransferencia').empty();
            if (datos.resultado.length > 0) {
                Transferencias.tieneCama = true;
                $('#CamasEspera').show();
                $(datos.resultado).each(function (i, obj) {
                    if (obj.IdPaciente != idPaciente) {
                        if (obj.idCama == -1) {
                            isDisabled = 'disabled'
                        }
                        $('#cboCamaEsperaTransferencia').append('<option ' + isDisabled + ' value="' + obj.IdCama + '">' + obj.Paciente + '</option>');
                    } else {
                        $('#cboCamaEsperaTransferencia').append('<option ' + isDisabled + ' value="' + idCama + '">' + obj.Paciente + '</option>');                        
                    }                                       
                    isDisabled = '';
                });
                $('#cboCamaEsperaTransferencia').val(idCama);
            } else {
                Transferencias.tieneCama = false;
                $('#CamasEspera').hide();
            }

            
            $('.chzn-select').chosen().trigger("chosen:updated");
        } catch (error) {
            alerta(3, error);
        }
    },

    async ListarCamasDestinos(idServicio) {
        var midata = new FormData();
        let datos;
        var isDisabled;

        midata.append('_token', $("meta[name='csrf-token']").attr("content"));
        midata.append('idServicio', idServicio);
        try {
            datos = await
                $.ajax({
                    method: "POST",
                    url: "/Transferencia/ListarCamasPorServicio",
                    data: midata,
                    dataType: "json",
                    cache: false,
                    processData: false,
                    contentType: false,
                });

            $('#cboCamaDestinoTransferencia').empty();
                console.log(datos);
            //console.log(datos.lsResultado.length);
            // if (datos.resultado.length > 0) {
            //     Transferencias.tieneCama = true;
            //     $('#CamasDestino').show();
            //     $(datos.resultado).each(function (i, obj) {
            //         if (obj.IdCama == -1) {
            //             isDisabled = 'disabled';
            //         }
            //         $('#cboCamaDestinoTransferencia').append('<option ' + isDisabled + ' value="' + obj.IdCama + '">' + obj.Paciente + '</option>');
            //         isDisabled = '';
            //     });
            //     $('#cboCamaDestinoTransferencia').val(0);
            // } else {
            //     Transferencias.tieneCama = false;
            //     $('#CamasDestino').hide();
            // }
            
            $('.chzn-select').chosen().trigger("chosen:updated");
        } catch (error) {
            alerta(3, error);
        }
    },

    async CargarTransferencia() {

        // const aten = await Transferencias.SeleccionarAtencion(Variables.IdAtencion);
        const aten = await Epicrisis.SeleccionarAtencion(listFilaAltaMedica.IdAtencion);
        // cons medico = await Epicrisis.Medicos();

        console.log('aten', aten);
        Transferencias.idCamaActual = aten.IdCamaActual;
        Transferencias.idTipoServicio = aten.IdTipoServicio;
        if(Transferencias.idTipoServicio == 3){
            Transferencias.tipoServicio = 'HOSP';
        }
        

        //if (Transferencias.tipoServicio == 'EMER') {
        //var objrowTb = DTEmergencia.row('.selected').data();
        //}

        // if (Transferencias.tipoServicio == 'HOSP') {
        //     var objrowTb = oTable_atencionesHosp.api(true).row('.selected').data();
        // }

        if (Transferencias.tipoServicio == 'UCI') {
            var objrowTb = oTable_AtencionesUCI.api(true).row('.selected').data();
        }

        /*if (isEmpty(objrowTb)) {
            alerta('info', '', 'Seleccione un registro por favor.');
            return false;
        }*/

        if (aten.idEstadoAtencion == 2) {
            alerta('info', '', 'La cuenta se encuentra cerrada.');
            return false;
            // if (Transferencias.tipoServicio == 'EMER') {
            //     return false;
            // }
        }

        // if (aten.fechaEgreso != '' && aten.fechaEgreso != null) {
        //     alerta('info', '', 'El paciente tiene alta médica.');
        //     return false;
        // }



        $("#btnGuardarTransferenciasHosp").show();
        if (Transferencias.tipoServicio == 'EMER') {
            if (aten.EsObservacionEmergencia == 1) {
                //if (isEmpty(objrowTb.idCamaIngreso)) {
                //    alerta('warning', '', 'El paciente aún no se le asignado cama de ingreso.<br>Por favor realice la recepción.');
                //    return false;
                //}

                if (aten.llegoAlServicio == 0) {
                    alerta('warning', '', 'El paciente aún no llega al servicio.\nPor favor realice la recepción.');
                    $("#btnGuardarTransferenciasHosp").hide();
                    //return false;
                }
            } else {
                if (aten.llegoAlServicio == 0) {
                    alerta('warning', '', 'El paciente aún no llega al servicio.\nPor favor realice la recepción.');
                    $("#btnGuardarTransferenciasHosp").hide();
                    //return false;
                }
            }
        } else if (Transferencias.tipoServicio == 'HOSP' || Transferencias.tipoServicio == 'UCI') {
            // $("#CamasActual").show();
            // $("#BtnCamaActual").show();

            /*
            if (isEmpty(objrowTb.idCamaIngreso)) {
                alerta('warning', '', 'El paciente aún no se le asignó cama de ingreso.<br>Por favor realice la recepción.');
                return false;
            }

            if (objrowTb.llegoAlServicio == 0) {
                alerta('warning', '', 'El paciente aún no llega al servicio.<br>Por favor realice la recepción.');
                $("#btnGuardarTransferenciasHosp").hide();
                //return false;
            }       
                */     
        }

        $("#txtNroCuentaTransferencia").val(aten.IdCuentaAtencion);
        $("#txtHistoriaTransferencia").val(aten.NroHistoriaClinica);
        $("#txtTipoDocumentoTransferencia").val(aten.TipoDocumento);
        $("#txtNroDocumentoTransferencia").val(aten.NroDocumento);
        $("#txtPacienteNombreTransferencia").val((aten.PrimerNombre == null ? '' : aten.PrimerNombre) + ' ' + (aten.SegundoNombre == null ? '' : aten.SegundoNombre) + ' ' + aten.ApellidoPaterno + ' ' + aten.ApellidoMaterno);

        //Variables.Cargar(objrowTb);
        $("#CamasDestino").hide();

        Transferencias.idEspecialidad = aten.IdEspecialidad;
        //Transferencias.idMedicoSesion = await Utilitario.ObtenerIdMedicoSesion();
        // Transferencias.idMedicoSesion = Variables.IdMedicoLogeado;
        //await Transferencias.ListarMedicos();
        $('#cboMedicoOrdenaTransferencia').val(Transferencias.idMedicoSesion);
        await Epicrisis.ListarTransferencias();
        // await Epicrisis.ListarCamas(listFilaAltaMedica.IdServicioActual);

        $('.chzn-select').chosen().trigger("chosen:updated");

        $("#modalTransferenciasHosp").modal("show");

    },
    //================ RECEPCION DE CAMAS EPICRISIS============================================

    async ConfirmarLlegadaAlServicio(idEstanciaHosp, idCama) {
        let resp = false;
        let datos;
        DTTransferencias.clear().draw();
        var midata = new FormData();

        midata.append('_token', $("meta[name='csrf-token']").attr("content"));
        midata.append('idEstanciaHosp', idEstanciaHosp);        
        midata.append('idCama', idCama);

        try {
            Cargando(1);
            datos = await
                $.ajax({
                    method: "POST",
                    url: "/Transferencia/ModificarEstanciaHospitalariaLlegada",
                    data: midata,
                    dataType: "json",
                    cache: false,
                    processData: false,
                    contentType: false,
                });
            Cargando(0);
            resp = true;
            alerta('success', '', 'Se confirmó la llegada del paciente al servicio.');
        } catch (error) {
            alerta('danger', '', error);
        }

        return resp;
    },

    // ==========================================================================
    
  

    CerrarModalTransferencias() {
        Epicrisis.LimpiarModalTransferencias();
        $("#modalTransferenciasHosp").modal("hide");
    },
    CerrarModalCambiarCama() {
        Epicrisis.LimpiarModalRecepcionCama();
        $("#modalRecepcionCama").modal("hide");
    },
    CerrarModalConfirmacionLlegada() {
        Epicrisis.LimpiarModalRecepcionCama();
        $("#modalTransferenciasConfirmacionHosp").modal("hide");
    },
    abrirModalInformeEvaluacion() {
        
        $.fn.dataTable.tables({ visible: true, api: true }).columns.adjust();
        $("#modalInformeEvaluacionHospi").modal("show");
    },
    async CargarOrdenesInterconsultaPorIdCuentaAtencionPorEvaluacion(idCuenta, nroEvaluacion,IdAtencion) { 
        // var resp = [];
        let resp = [];
        let datos;
        var data = new FormData();
        data.append('_token', $("meta[name='csrf-token']").attr("content"));        
        data.append('IdCuentaAtencion', idCuenta);
        data.append('NroEvaluacion', nroEvaluacion);
        data.append('IdAtencion', IdAtencion);

        data.append('IdTipoServicio', 3); // HOsp


        console.log('IdCuentaAtencion', idCuenta);
        console.log('NroEvaluacion', nroEvaluacion);
        console.log('IdAtencion', IdAtencion);
     
        try {
            //DTORdenesMedicas.clear().draw();
            //OrdenMedica.Limpiar();
            datos = await
                $.ajax({
                    method: "POST",
                    url: "/Recetas/ListarOrdenesInterconsultaMedicasPorEvaluacion",                    
                    data: data,
                    dataType: "json",
                    cache: false,
                    processData: false,
                    contentType: false,
                });
                console.log('Recetas/ListarOrdenesInterconsultaMedicasPorEvaluacion', datos);
                
                resp=datos.resultado;
          
        } catch (error) {
            alerta('error','', error);
        }

        return resp
    },

    async CargarOrdenesCPT(idCuenta) {
        //var resp = [];
        let datos;
        var data = new FormData();
        data.append('_token', $("meta[name='csrf-token']").attr("content"));        
        data.append('IdCuentaAtencion', idCuenta);
                
        try {
            //OrdenMedica.Limpiar();
            datos = await
                $.ajax({
                    method: "POST",
                    url: "/ConsumoServicio/ListarOrdenesCPT",                    
                    data: data,
                    dataType: "json",
                    cache: false,
                    processData: false,
                    contentType: false,
                });
                //console.log(datos);
                return datos.resultado;
           
        } catch (error) {
            alerta('error','', error);
        }

        //return resp;
    },

    async CargarOrdenesMedicasPorIdCuentaAtencionPorEvaluacion(idCuenta, nroEvaluacion){
        let resp = [];
        let datos;
        var data = new FormData();
        data.append('_token', $("meta[name='csrf-token']").attr("content"));        
        data.append('IdCuentaAtencion', idCuenta);
        data.append('NroEvaluacion', nroEvaluacion);
        data.append('IdTipoServicio', 3); // HOsp


        console.log('IdCuentaAtencion', idCuenta);
        console.log('NroEvaluacion', nroEvaluacion);
        

                
        try {
            //OrdenMedica.Limpiar();
            datos = await
                $.ajax({
                    method: "POST",
                    url: "/Recetas/ListarOrdenesMedicasPorEvaluacion",                    
                    data: data,
                    dataType: "json",
                    cache: false,
                    processData: false,
                    contentType: false,
                });
                console.log('Recetas/ListarOrdenesMedicasPorEvaluacion', datos);
                return datos.resultado;
              
        } catch (error) {
            alerta('error','', error);
        }

        return resp
        
    },
    async CargarTransferenciaRecepcion() {
        
        const aten = await Epicrisis.SeleccionarAtencion(listFilaAltaMedica.IdAtencion);
        console.log('datos de seleccionar Atencion',aten);
        Transferencias.idCamaActual = aten.IdCamaActual;
        
        /*if (Transferencias.tipoServicio == 'EMER') {
            var objrowTb = oTable_atencionesEmer.api(true).row('.selected').data();
        }

        if (Transferencias.tipoServicio == 'HOSP') {
            var objrowTb = oTable_atencionesHosp.api(true).row('.selected').data();
        }
        
        if (Transferencias.tipoServicio == 'UCI') {
            var objrowTb = oTable_AtencionesUCI.api(true).row('.selected').data();
        }

        if (isEmpty(objrowTb)) {
            alerta('info', '', 'Seleccione un registro por favor.');
            return false;
        }*/

        if (aten.IdEstadoAtencion == 2) {
            alerta('warning', '', 'La cuenta se encuentra cerrada.');
            if (Transferencias.tipoServicio == 'EMER') {
                return false;
            }
        }

        // if (aten.FechaEgreso != '' && aten.FechaEgreso != null) {
        //     alerta('warning', '', 'El paciente tiene alta médica.');
        //     return false;
        // }

        $("#txtNroCuentaRecepcion").val(aten.IdCuentaAtencion);
        $("#txtHistoriaRecepcion").val(aten.NroHistoriaClinica);
        $("#txtTipoDocumentoRecepcion").val(aten.TipoDocumento);
        $("#txtNroDocumentoRecepcion").val(aten.NroDocumento);
        $("#txtPacienteNombreRecepcion").val((aten.PrimerNombre == null ? '' : aten.PrimerNombre) + ' ' + (aten.SegundoNombre == null ? '' : aten.SegundoNombre) + ' ' + aten.ApellidoPaterno + ' ' + aten.ApellidoMaterno);

        $("#EstanciaServicioActual").show();
        $("#EstanciaServicioPorRecepcionar").show();
        $("#CamasActual").show();
        $("#btnGuardarCamaActualTransferencia").show();
        Transferencias.idEstanciaHospitalariaActual = aten.IdEstanciaHospitalariaActual;
        //Variables.Cargar(objrowTb);

        console.log('Transferencias.tipoServicio', Transferencias.tipoServicio)
        
        if (Transferencias.tipoServicio == 'EMER') {
            if (aten.EsObservacionEmergencia == 1) {
                if (aten.llegoAlServicio == 0) {
                    await Epicrisis.ListarCamasEspera(aten.IdServicioActual, aten.IdPaciente, aten.IdCamaActual);
                    $('#cboServicioEsperaTransferencia').val(listFilaAltaMedica.IdServicio);
                    $("#EstanciaServicioActual").hide();
                } else {
                    await Epicrisis.ListarCamas(aten.IdServicioActual);
                    $('#cboServicioActualTransferencia').val(listFilaAltaMedica.IdServicio);
                    $("#EstanciaServicioPorRecepcionar").hide();
                }
            } else {
                if (aten.llegoAlServicio == 0) {
                    await Epicrisis.ListarCamasEspera(aten.IdServicioActual, aten.IdPaciente, aten.IdCamaActual);
                    $('#cboServicioEsperaTransferencia').val(listFilaAltaMedica.IdServicio);
                    $("#CamasEspera").hide();
                    $("#EstanciaServicioActual").hide();
                } else {
                    await Epicrisis.ListarCamas(aten.IdServicioActual);
                    $('#cboServicioActualTransferencia').val(listFilaAltaMedica.IdServicio);
                    $("#EstanciaServicioPorRecepcionar").hide();
                    $("#CamasActual").hide();
                    $("#btnGuardarCamaActualTransferencia").hide();
                }                
            }   
        } 
        else if (Transferencias.tipoServicio == 'HOSP' || Transferencias.tipoServicio == 'UCI') {
            if (aten.llegoAlServicio == 0) {
                console.log('444');
                await Epicrisis.ListarCamasEspera(aten.IdServicioActual, aten.IdPaciente, aten.IdCamaActual);
                $('#cboServicioRecibeTransferencia1').val(aten.IdServicioActual);
                $("#EstanciaServicioActual").hide();
                //$("#modalTransferenciasConfirmacionHosp").modal("show");
            } else {
                console.log('555');
                console.log('aten.IdServicioActual',aten.IdServicioActual)
                await Epicrisis.ListarCamas(aten.IdServicioActual);
                $('#cboServicioActualTransferencia').val(aten.IdServicioActual);
                $("#EstanciaServicioPorRecepcionar").hide();
                //$("#modalRecepcionCama").modal("show");
            }                
        }

        $('.chzn-select').chosen().trigger("chosen:updated");
            
        
       

        $("#modalRecepcionCama").modal("show");
        
    },
    async ModificarTransferencia() {        
        // if ($("#cboServicioRecibeTransferencia").val() <= 0) {
        //    alerta('info', '', 'Seleccione el Servicio ');
        //    return false;
        // }
        // if ($("#cboMedicoOrdenaTransferencia").val() <= 0) {
        //     alerta('info', '', 'Seleccione el Médico ordena.');
        //     return false;
        // }
        // if ($("#cboServicioRecibeTransferencia").val()  <= 0) {
        //     alerta('info', '', 'Seleccione el Servicio recibe.');
        //     return false;
        // }
        // /*if ($("#cboMedicoRecibeTransferencia").val()  <= 0) {
        //     alerta('info', '', 'Seleccione el Médico recibe.');
        //     return false;
        // }*/
        // if (isEmpty($("#txtFechaRecepcionTransferencia").val())) {
        //     alerta('info', '', 'Seleccione la Fecha de transferencia.');
        //     return false;
        // }
        // if (isEmpty($("#txtHoraRecepcionTransferencia").val())) {
        //     alerta('info', '', 'Seleccione la Hora de transferencia.');
        //     return false;
        // }

        /*
        if (Transferencias.tieneCama) {
            if ($("#cboCamaDestinoTransferencia").val() <= 0) {
                // if (Transferencias.tipoServicio == 'EMER') {
                    alerta('info', '', 'Seleccione una Cama destino DISPONIBLE.');
                    return false;
                // }                
            }
        }
            */

        Cargando(1);
        const transf = await Epicrisis.GuardarTransferencias();
        Cargando(0);
        if (transf) {
            Epicrisis.CerrarModalTransferencias();
            window.location.reload();
            // if (Transferencias.tipoServicio == 'EMER') {   
            //     window.location.href = '../hospitalizacion/notaingreso/' ;
            //     //window.location.href = '../t_atencion/' + Transferencias.idServicioTransferido;
            //     //AdmisionEmergencia.ListarAtenciones(AdmisionEmergencia.tipoBusqueda);
            //     //ReposicionarVista();
            // }
            /*if (Transferencias.tipoServicio == 'HOSP') {
                AdmisionHospitalizacion.ListarAtenciones(AdmisionHospitalizacion.tipoBusqueda);
                ReposicionarVista();
            }
            if (Transferencias.tipoServicio == 'UCI') {
                EvaluacionesUCI.ListarAtenciones();
                ReposicionarVista();
            }*/
        }
       
        
    },
     ListarEpicrisisHospitalizacion(data) {
        Cargando(1)
        oTable_Hospitalizacion.fnClearTable();
        let token = $('meta[name="csrf-token"]').attr("content");
         fetch(
            `/hospitalizacion/listarEpicrisis`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    _token: token,
                    data: data,
                }),
            }
        )
            .then((res) => res.json())
            .catch((error) => console.log(error))
            .then((res) => {
                if (res.resultado == 1) {
                    if (res.data.length > 0) {
                        oTable_Hospitalizacion.fnAddData(res.data);
                        const tabla = $('#tblEpicrisis').DataTable()
                        const datos = tabla.rows().data();                        
                        datos.each(function(valor,index) {
<<<<<<< HEAD
                            if(valor.CantEvaluacion >0){
=======
                            /*
                            if (parseInt(valor.CantEvaluacion, 10) === 0) { 
>>>>>>> c43206bf175774a3bfc1e1fc1e2cd58a60d1e406
                                $('#tblEpicrisis').DataTable().row(index).nodes().to$().css({
                                    'color': '#347dff',
                                    'font-weight': 'bold'
                                });
                            }
                                */

                           
                            tabla.draw(false);
                           // Cargando(0); 
                        });

                    }
                }
                else {
                    toastr.error(res.mensaje,"MENSAJE DE ERROR RESYS");
                }

            });
         Cargando(0);       
    },

    InitDatablesTriajeHospitalizacion() {
        var parms = {
            destroy: true,
            bFilter: false,
            searching : true,
            order: [[0, "desc"]],
            scrollX: true,
            createdRow: function (row, data) {
                if(data.CantEvaluacion > 0) {
                    $(row).css({ 
                        'color': '#347dff', 
                        'font-weight': 'bold'
                    });

                   
                }
                if (data.llegoAlServicio == 0 && (data.CantTransf == 1  ) &&( (data.IdCamaActual == null )) ) {
                    $(row).css({
                       'color': '#000000',
                        'font-weight': 'bold'
                    });
                }
                if ((data.CantTransf > 1) && (data.IdCamaActual == 0  )) {
                    $(row).css({
                        'color': '##8e24aa',  
                        'font-weight': 'bold'
                    });
                }
               
                if (data.FechaAlta != null && data.HoraAlta != null ) {
                    $(row).css({
                      'color': '#66bb6a',
                    'font-weight': 'bold'
                    });
                }

                
            },
            columns: [
                {
                    width: "5%",
                    data: "IdCuentaAtencion",
                    createdCell: function (td) {
                        $(td).attr("style", "left");
                    },
                },
                {
                    width: "5%",
                    data: "NroDocumento",
                    createdCell: function (td) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "15%",
                    data: "Paciente",
                    createdCell: function (td) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "5%",
                    data: "NroHistoriaClinica",
                    createdCell: function (td) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "10%",
                    data: "FechaNacimiento",
                    createdCell: function (td) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "10%",
                    data: "FechaIngreso",
                    createdCell: function (td) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "10%",
                    data: "FechaEgreso",
                    createdCell: function (td) {
                        $(td).attr("align", "left");
                    },
                },
               
                {
                    width: "15%",
                    data: "ServicioActual",
                    createdCell: function (td) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "5%",
                    data: "Descripcion",
                    createdCell: function (td) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "3%",
                    data: "NumeroCama",
                    createdCell: function (td) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "8%",
                    data: "Fua",
                    createdCell: function (td) {
                        $(td).attr("align", "left");
                    },
                },
                {
<<<<<<< HEAD
                    visible: false,
=======
>>>>>>> c43206bf175774a3bfc1e1fc1e2cd58a60d1e406
                    width: "8%",
                    data: "CantEvaluacion",
                    createdCell: function (td) {
                        $(td).attr("align", "left");
                        
                    },
                },
<<<<<<< HEAD
                
                {
                    with: "10%",
=======
                {
                    width: "10%",
                    targets: 3,
>>>>>>> c43206bf175774a3bfc1e1fc1e2cd58a60d1e406
                    data: null,
                    createdCell: function (td, cellData, rowData, row, col) {
                            $(td).attr("align", "center");
                        //     $(td).html(
                        //         `<button class='btn btn-warning' 
                        // data-toggle='tooltip' 
                        // data-placement='top' 
                        // title='Imprimir Receta' 
                        // class='btnInformeEvaHosp' >
                        // <i class='fa fa-cloud-download'></i>
                        // </button>`
                        //     );
                        if (rowData.CantEvaluacion > 0) {
                            var btnRuta = "";
                            btnRuta = ' <button class="btnInformeEvaluacionHosp btn btn-sm glow_button" data-toggle="tooltip" style="background:#71a8ed; color:white;"><i class="fa fa-print"></i> </button>';
                            $(td).html(btnRuta);
                        } else {
                            $(td).html('');
                        }
                    },
                    
                },
                {
                    width: "10%",
                    targets: 3,
                    data: null,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "center");
                    if (rowData.FechaAlta) {
                        var btnRuta = "";
                        btnRuta = `<button type="button" class="btnVerEpicrisis btn btn-sm glow_button" data-toggle="tooltip" data-placement="bottom" title="Ver Epicrisis" style="background:#003e9b; color:white;"><i class="fa fa-list-alt"></i> </button>`;
                        $(td).html(btnRuta);
                    } else {
                        $(td).html('');
                    }
                    },
                },
                {
                    width: "10%",
                    targets: 3,
                    data: null,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "center");
                    if (rowData.FechaAlta) {
                        var btnRuta = "";
                        btnRuta = `<button type="button" class="btnVerPapeletaAlta btn btn-sm glow_button" data-toggle="tooltip" data-placement="bottom" title="Ver Papeleta Alta" style="background:#ff5236; color:white;"><i class="fa fa-print"></i> </button>`;
                        $(td).html(btnRuta);
                    } else {
                        $(td).html('');
                    }
                    },
                },
                {
                    width: "10%",
                    targets: 3,
                    data: null,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "center");
                    if (rowData.FechaAlta) {
                        var btnRuta = "";
                        btnRuta = `<button type="button" class="btnVerIndicacionesPacienteAlta btn btn-sm glow_button" data-toggle="tooltip" data-placement="bottom" title="Ver Indicaciones para Pacientes de Alta" style="background:#b19300; color:white;"><i class="fa fa-print"></i> </button>`;
                        $(td).html(btnRuta);
                    } else {
                        $(td).html('');
                    }
                    },
                },
            ],
        };

        oTable_Hospitalizacion = $("#tblEpicrisis").dataTable(parms);
    },
     DataTableInformeEvaluacion() {       
        DTEvaInfHosp = $("#tblInformeEvaluacionesHospitalizacion").DataTable({
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
                },
                 {
                    width: "30%",
                    targets: 1,
                    data: null,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                       
                        if(rowData.CSERV != 0 && rowData.RECETA != 0){
                            var btnImprimeRece =""
                            btnImprimeRece = '<button class="btnInformeRecetasHosp btn btn-sm btn-warning glow_button" title="Visualiza Atencion" data-toggle="tooltip"><i class="fa fa-eye"></i> </button>';
                            $(td).html(btnImprimeRece);
                        }else{
                            $(td).html('');
                        }

                        /*if (rowData.code != '') {
                            var btnRuta = "";
                            var btnImprime = "";
                            var btnImprimeSinF = "";
                            if (rowData.statusFirma == 1) {
                                btnImprime = ' <button class="ImprimirEvalCF btn btn-sm btn-success glow_button" title="Imprime Atención Firmada" data-toggle="tooltip"><i class="fa fa-print"></i> </button>';
                            } else {
                                btnRuta = '<button class="btn btn-sm btn-info btnFirmaCE FirmarEvalSF" title="Firmar Atención" data-toggle="tooltip" style="margin: 2px;"> <i class="fa fa-pencil"></i></button>';
                                btnImprimeSinF = '<button class="btnInformeRecetasHosp btn btn-sm btn-warning glow_button" title="Visualiza Atencion" data-toggle="tooltip"><i class="fa fa-eye"></i> </button>';
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
    DataTableDiagnosticos() {
        DtDiagnosticos = $("#tblDiagnosticos").DataTable({
            scrollY: "460px",
            scrollCollapse: true,
            autoWidth: false,
            ordering: false,
            data: null,
            destroy: true,
            info: false,
            bFilter: false,
            paging: false,
            responsive: true,
            columns: [
                {
                    width: "15%",
                    targets: 0,
                    data: "codigo",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "center");
                    },
                },
                {
                    width: "55%",
                    targets: 1,
                    data: "diagnostico",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "20%",
                    targets: 2,
                    data: "tipoDiagnostico",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "10%",
                    targets: 3,
                    data: null,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "center");
                        $(td).html(
                            `<button class='btn btn-danger' 
                    data-toggle='tooltip' 
                    data-placement='top' 
                    title='Eliminar' 
                    onclick='Epicrisis.eliminarDiagnostico(this)'>
                <i class='fa fa-trash'></i>
            </button>`
                        );
                    },
                },
            ],
        });
    },
    DataTableDiagnosticosMuerte() {
        DtDiagnosticosMuerte = $("#tblDiagnosticosMuerte").DataTable({
            scrollY: "460px",
            scrollCollapse: true,
            autoWidth: false,
            ordering: false,
            data: null,
            destroy: true,
            info: false,
            bFilter: false,
            paging: false,
            responsive: true,
            columns: [
                {
                    width: "15%",
                    targets: 0,
                    data: "codigo",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "center");
                    },
                },
                {
                    width: "55%",
                    targets: 1,
                    data: "diagnostico",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "20%",
                    targets: 2,
                    data: "tipoDiagnostico",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "10%",
                    targets: 3,
                    data: null,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "center");
                        $(td).html(
                            `<button class='btn btn-danger' 
                    data-toggle='tooltip' 
                    data-placement='top' 
                    title='Eliminar' 
                    onclick='Epicrisis.eliminarDiagnostico(this)'>
                <i class='fa fa-trash'></i>
            </button>`
                        );
                    },
                },
            ],
        });
    },
    initDatablesTransferencias() {       

        DTTransferencias = $("#tblTransferencias_hosp").DataTable(
            {
                scrollY: "250px",
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
                        width: '10%',
                        targets: 0,
                        data: null,
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).attr('align', 'left')
                            $(td).html(FormatearFecha(rowData.FechaOcupacion));
                        }
                    },              
                    {
                        width: '10%',
                        targets: 1,
                        data: 'HoraOcupacion',
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).attr('align', 'left')                        
                        }
                    },
                    {
                        width: '10%',
                        targets: 2,
                        data: "CodigoCama",
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).attr('align', 'left')
    
                        }
                    },
                    {
                        width: '20%',
                        targets: 3,
                        data: 'NombreServicio',
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).attr('align', 'left')                        
                        }
                    },
                    {
                        width: '25%',
                        targets: 4,
                        data: "NombreMedicoOrigen",
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).attr('align', 'left')
                        }
                    },       
                    {
                        width: '25%',
                        targets: 5,
                        data: "NombreMedico",
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).attr('align', 'left')
                        }
                    },  
    
                ]
    
            }
        );


    },
    DataTableDiagnosticosMuerteFetal() {
        DtDiagnosticosMuerteFetal = $("#tblDiagnosticosMuerteFetal").DataTable({
            scrollY: "460px",
            scrollCollapse: true,
            autoWidth: false,
            ordering: false,
            data: null,
            destroy: true,
            info: false,
            bFilter: false,
            paging: false,
            responsive: true,
            columns: [
                {
                    width: "15%",
                    targets: 0,
                    data: "codigo",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "center");
                    },
                },
                {
                    width: "55%",
                    targets: 1,
                    data: "diagnostico",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "20%",
                    targets: 2,
                    data: "tipoDiagnostico",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "10%",
                    targets: 3,
                    data: null,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "center");
                        $(td).html(
                            `<button class='btn btn-danger' 
                    data-toggle='tooltip' 
                    data-placement='top' 
                    title='Eliminar' 
                    onclick='Epicrisis.eliminarDiagnosticoMuerteFetal(this)'>
                <i class='fa fa-trash'></i>
            </button>`
                        );
                    },
                },
            ],
        });
    },
    DataTableDiagnosticosComplicaciones() {
        DtDiagnosticosComplicacion = $("#tblDiagnosticosComplicacion").DataTable({
            scrollY: "460px",
            scrollCollapse: true,
            autoWidth: false,
            ordering: false,
            data: null,
            destroy: true,
            info: false,
            bFilter: false,
            paging: false,
            responsive: true,
            columns: [
                {
                    width: "15%",
                    targets: 0,
                    data: "codigo",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "center");
                    },
                },
                {
                    width: "55%",
                    targets: 1,
                    data: "diagnostico",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "20%",
                    targets: 2,
                    data: "tipoDiagnostico",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "10%",
                    targets: 3,
                    data: null,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "center");
                        $(td).html(
                            `<button class='btn btn-danger' 
                    data-toggle='tooltip' 
                    data-placement='top' 
                    title='Eliminar' 
                    onclick='Epicrisis.eliminarDiagnostico(this)'>
                <i class='fa fa-trash'></i>
            </button>`
                        );
                    },
                },
            ],
        });
    },
    initDatablesTransferencias() {       

        DTTransferencias = $("#tblTransferencias_hosp").DataTable(
            {
                scrollY: "250px",
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
                        width: '10%',
                        targets: 0,
                        data: null,
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).attr('align', 'left')
                            $(td).html(FormatearFecha(rowData.FechaOcupacion));
                        }
                    },              
                    {
                        width: '10%',
                        targets: 1,
                        data: 'HoraOcupacion',
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).attr('align', 'left')                        
                        }
                    },
                    {
                        width: '10%',
                        targets: 2,
                        data: "CodigoCama",
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).attr('align', 'left')
    
                        }
                    },
                    {
                        width: '20%',
                        targets: 3,
                        data: 'NombreServicio',
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).attr('align', 'left')                        
                        }
                    },
                    {
                        width: '25%',
                        targets: 4,
                        data: "NombreMedicoOrigen",
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).attr('align', 'left')
                        }
                    },       
                    {
                        width: '25%',
                        targets: 5,
                        data: "NombreMedico",
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).attr('align', 'left')
                        }
                    },  
    
                ]
    
            }
        );


    },
    eventos() {
        $(".search").keypress(function (e) {
            if (e.which == 13) {
                e.preventDefault();
                $(".search").blur();
                $("#btnBuscarAtencionesEmergencia").click();
            }
        });

        $("#IdDocIdentidad").on("change", function () {
            if ($(this).val() == 1) {
                $("#DocPaciente").attr("maxlength", 10);
                $("#DocPaciente").val(
                    document.getElementById("DocPaciente").value.substring(0, 8)
                );
            } else $("#DocPaciente").attr("maxlength", 20);
        });

        $("#chkTodoTriajeBusq").on("click", function () {
            if ($("#chkTodoTriajeBusq").is(":checked")) {
            } else {
                let fechaP = Epicrisis.RetornarFechaActual();
                $("#txtFechaTriajeBusq").datepicker("setDate", fechaP);
            }
        });

        $("#btnBuscarCuentaPaciente").on("click", function () {
            Epicrisis.LimpiarCampos();
            $("#modalBuscarPaciente").modal("show");
        });


        $("#btnAgregar").on("click", function () {
            Epicrisis.LimpiarCampos();
            Epicrisis.ValidarBotonClick = 1;

            $(".admision").hide();
            $(".RegistroTriajeContenedor").show();
            $("#modalLabel_modalAltaMedica").text("Registro de Triaje");
            $(".RegistroAdmisionContenedor").hide();

            $("#modalAltaMedicaHospitalizacion").modal("show");
        });


        $("#btnCerrarModalAltaMedica").on("click", function () {
            //$("#modalAltaMedicaHospitalizacion").modal("hide");
            //Epicrisis.LimpiarCampos();
            $("#step3").show();
            let $modal = $("#modalAltaMedicaHospitalizacion");
            if (!$modal.hasClass("show")) return; // Si ya está oculto, no hacer nada
            
            $modal.modal("hide");
            Epicrisis.LimpiarCampos();
            $("#step3").show();
            cargarEpicrisis();
        });

        $("#btnGuardarEpicrisis").on("click",function(){


            if(fechaCierre == null || fechaCierre == ''){
                console.log($("#cmbEpisodioClinico").val());
                if($("#cmbEpisodioClinico").val() !== 0 && $('#chkCierreEpisodioHosp').is(":checked") == 0 && $('#chkCierreEpisodioHosp').is(":checked")== 0){
                    if($('#chkNuevoEpisodioHosp').is(":checked")== 0){
                        Swal.fire({
                            title: "Debe elegir el nuevo episodio",
                            icon: "warning",
                            draggable: true,
                            timer: 1500
                        });
                        return false;
                    }
    
                    if($('#chkCierreEpisodioHosp').is(":checked")== 0){
                        Swal.fire({
                            title: "Debe cerra el episodio",
                            icon: "warning",
                            draggable: true,
                            timer: 1500
                        });
                        return false;
                    }
                }

            }

            if(listDataDiagnositoIngreso.length === 0){
                toastr.warning("Debe seleccionar al menos un diagnostico","Mensaje de error - RESYS");
                return false;
            }

            if(medicoID == 0){
                toastr.error("Para modificar el registro debe ser personal médico","Mensaje de error - RESYS");
                return false;  
            }

            const epicrisis = {};
            epicrisis.idCuentaAtencion=idCuentaAtencion;
            epicrisis.idAtencion=idAtencion;
            epicrisis.listDataDiagnositoIngreso = listDataDiagnositoIngreso;
            epicrisis.accion=2;
            epicrisis.idCondicionAlta = $("#cboCondicionAlta").val();
            epicrisis.idDestinoAtencion = $("#cboDestinoAlta").val();
            /*if(epicrisis.idDestinoAtencion == 34){
                epicrisis.fechaAltaAdministrativa = $("#txtFechaAltaAdm").val();
                epicrisis.horaAltaAdministrativa = $("#txtHoraAltaAdm").val();
            }
            else {*/
            epicrisis.fechaAltaAdministrativa = null;
            epicrisis.horaAltaAdministrativa = null;
            //}
            epicrisis.idTipoAlta = $("#cboTipoAlta").val();
            epicrisis.idMedicoEgreso = $("#cboMedicoEgreso").val();
            epicrisis.esNecropsia = $('input[name="esNecropsia"]:checked').val() || 0;
            epicrisis.idTipoReferenciaOrigen =$("#cboTipoReferenciaAM").val();
            epicrisis.idEstablecimientoOrigen =$("#cboEstabMinsaReferenciaAM").val();
            epicrisis.nuevoEpisodio=($('#chkNuevoEpisodioHosp').is(":checked") ? 1 : 0);
            epicrisis.cierreEpisodio=($('#chkCierreEpisodioHosp').is(":checked") ? 1 : 0);
            epicrisis.listDataDiagnosticoComplicacion = listDataDiagnosticoComplicacion;
            epicrisis.listDataDiagnosticoMuerteFetal = listDataDiagnosticoMuerteFetal;
            epicrisis.listDataDiagnosticoMuerte = listDataDiagnosticoMuerte;
            epicrisis.episodioHistorico =$("#cmbEpisodioClinico").val() ?? 0;        
            epicrisis.fechaAlta = $("#txtFechaAlta").val();
            epicrisis.horaAlta = $("#txtHoraAlta").val();
            epicrisis.dieta = $("#txtDieta").val();
            epicrisis.actividadFisica = $("#txtActividadFisica").val();
            epicrisis.otros=$("#txtOtros").val();
            crearEpicrisisIngreso(epicrisis);
        });
        ///==============================ASIGNAR CAMA ==========================================================
        $("#btnTransferenciaRecepcion").on('click', async function () {
            if (listFilaAltaMedica.length != 0) {
                // Epicrisis.LimpiarModalTransferencias();
                // CargarMedicoTransferencia(19);
                // console.log(medicoID);
                //  listarMedicoEgreso(19);

              
                 await Epicrisis.ListarServiciosRecepcion();
                 await Epicrisis.CargarTransferenciaRecepcion();
                // await Epicrisis.CargarTransferencia();
              
            }
            else {
                Swal.fire({
                    title: "Debe seleccionar una fila",
                    icon: "warning",
                    draggable: true,
                    timer: 1500
                });
            }
            

        });

        
        $("#btnCerrarCamaActualTransferencia").on('click', function () {
            //Variables.Limpiar();
            Epicrisis.CerrarModalCambiarCama();
        });
        $("#btnCerrarTransferenciasConfirmacion").on('click', function () {
            //Variables.Limpiar();
            Epicrisis.CerrarModalCambiarCama();
        });
        $("#btnCerrarTransferenciasConfirmacion").on('click', function () {
            //Variables.Limpiar();
            Epicrisis.CerrarModalConfirmacionLlegada();
        });
        ///====================================================================================================

        
          // ///////////////////////RECEPCION CONFIRMACION/////////////////////////////
          $("#btnGuardarTransferenciasConfirmacion").on('click', async function () {

            if (isEmpty($("#cboServicioEsperaTransferencia").val())) {
                alerta('info', '', 'Por favor selecciones el servicio que se asignará al paciente.');
                return false;
            }
        
            if ( Transferencias.tieneCama == true) {
                if (isEmpty($("#cboCamaEsperaTransferencia").val())) {
                    alerta('info', '', 'Por favor seleccione la cama que se asignará al paciente.');
                    return false;
                }
            }
        
            const llegada = await Epicrisis.ConfirmarLlegadaAlServicio(Transferencias.idEstanciaHospitalariaActual, $("#cboCamaEsperaTransferencia").val());
            
            if (llegada) {
              
                if (Transferencias.tipoServicio == 'HOSP') {
                    //window.location.href = '../HospitalizacionEvaluacion/' + Variables.IdAtencion;
                    Epicrisis.CerrarModalCambiarCama();
                    cargarEpicrisis();
                    // AdmisionHospitalizacion.ListarAtenciones(AdmisionHospitalizacion.tipoBusqueda);
                }
                /*
                if (Transferencias.tipoServicio == 'UCI') {
                    EvaluacionesUCI.ListarAtenciones();
                }*/
                
                // Transferencias.CerrarModalTransferenciasConfirmacion();
                // ReposicionarVista();
            }
        });
        ///////========================= FIN RECEPCION CONFIRMACION ========================================
        //================================= TRANSFERENCIAS=========================================================//
      
        $("#btnTransferencia_Hosp").on('click', async function () {
            if (listFilaAltaMedica.length != 0) {
                Epicrisis.LimpiarModalTransferencias();
                CargarMedicoTransferencia(19);
                console.log(medicoID);
                // listarMedicoEgreso(19);


                await Epicrisis.ListarServicios();
                await Epicrisis.CargarTransferencia();

            }
            else {
                Swal.fire({
                    title: "Debe seleccionar una fila",
                    icon: "warning",
                    draggable: true,
                    timer: 1500
                });
            }
            

        });

        $('#modalTransferenciasHosp').on('shown.bs.modal', function (event) {            
            DTTransferencias.columns.adjust().draw();            
        });

        $("#btnCerrarTransferencias").on('click', function () {
            //Variables.Limpiar();
            Epicrisis.CerrarModalTransferencias();
        });

      

        $("#cboServicioRecibeTransferencia").on('change', async function () {
            var idServDest = $("#cboServicioRecibeTransferencia").val();
            console.log('servicio que recibe',idServDest);
             await Epicrisis.ListarCamasDestinos(idServDest);
        });

        $("#btnGuardarTransferenciasHosp").on('click', async function () {


            servicioTransferido = $('#cboServicioRecibeTransferencia').val();
            if(servicioTransferido){
                const aten = await Epicrisis.SeleccionarAtencion(listFilaAltaMedica.IdAtencion);
                Transferencias.esObservacionEmergencia = aten.EsObservacionEmergencia;
                await Epicrisis.ModificarTransferencia();
    

            }else{
                Swal.fire({
                    title: "Seleccionar Servicio  que Recibe",
                    icon: "warning",
                    draggable: true,
                    timer: 1500
                });
            }
           
          
          
           

        });
       

        //================================= =========================================================//

        /// ============== INFORME  EVALUACION HOSPITALIZACION =========================================

        $('#tblEpicrisis tbody').on('click', '.btnInformeEvaluacionHosp', async function () {        
            
            var table = $('#tblEpicrisis').DataTable();  
            var tr = $(this).closest('tr');  
            var rowData = table.row(tr).data();  
        
            if (rowData) {
                
                await Epicrisis.SeleccionarEvaluacionDetalle(rowData.IdAtencion, 0);
                $("#modalInformeEvaluacionHospi").modal("show");
            } else {
                console.error('No se encontraron datos en la fila seleccionada.');
            }
        });

     
      
        $("#btnCerrarInformeEvaluacionHospi").on('click', function () {
            Epicrisis.IdAtencion = 0;
            Epicrisis.IdServicioEgreso = 0;
            $("#modalInformeEvaluacionHospi").modal("hide");
        });

        $('#tblInformeEvaluacionesHospitalizacion tbody').on('click', '.ImprimirEvalSF', async function () {            
           
            var table = $('#tblInformeEvaluacionesHospitalizacion').DataTable();  
            var tr = $(this).closest('tr');  
            var row = table.row(tr).data();  
            console.log(row);
            Cargando(1);
            $.ajax({
                url: '/EvaluacionHospitalizacion/informes/generarPDF/' + row.IdAtencion + '?eval=' + row.IdNumero,
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
        $('#tblInformeEvaluacionesHospitalizacion tbody').on('click', '.btnInformeRecetasHosp', async function () {            
           
            var table = $('#tblInformeEvaluacionesHospitalizacion').DataTable();  
            var tr = $(this).closest('tr');  
            var row = table.row(tr).data();  

            var table2 = $('#tblInformeEvaluacionesHospitalizacion').DataTable();  
            var tr2 = $(this).closest('tr');  
            var row2 = table.row(tr2).data();  
            console.log('adadaasd',row2);
            console.log('row.IdCuentaAtencion',row.IdCuentaAtencion)
            console.log(' row.IdNumero', row.IdNumero)
            let resp = await Epicrisis.CargarOrdenesMedicasPorIdCuentaAtencionPorEvaluacion(row.IdCuentaAtencion, row.IdNumero) || [];
            let dat = await Epicrisis.CargarOrdenesCPT(row.IdCuentaAtencion, row.IdNumero) || [];
            let interconsulta = await Epicrisis.CargarOrdenesInterconsultaPorIdCuentaAtencionPorEvaluacion(row.IdCuentaAtencion, row.IdNumero, row2.IdAtencion) || [];
            
            console.log('interconsulta', interconsulta);
            console.log('dat', dat);
            
            // Validar si hay algún dato antes de continuar
            let dataAll = [].concat(resp, dat, interconsulta);
            
            if (dataAll.length > 0 || interconsulta.length > 0) {
               
                console.log('dataAll', dataAll);
                AbrirVisorRecetas(dataAll);
            } else {
                console.warn("No se encontraron órdenes médicas, CPT ni interconsultas.");
                // Aquí puedes mostrar un mensaje al usuario si deseas
            }

          
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


    
        // =============================================================================================
        $("#btnLimpiar").on("click", function () {
            $("#txtNroDeCuenta").val("");
            $("#txtHistoriaClinica").val("");
            $("#txtNroDNI").val("");
        });

        $("#tblEpicrisis tbody").on("click", "tr", function () {
            let table = $("#tblEpicrisis").DataTable();
            listFilaAltaMedica = [];
            if ($(this).hasClass("selected")) {
                $(this).removeClass("selected");
            } else {
                oTable_Hospitalizacion
                    .$("tr.selected")
                    .removeClass("selected");
                $(this).addClass("selected");
            }
            // Epicrisis.selectedRow = table.row(this).data(); // Guarda la fila seleccionada
           

            let rowData = table.row(this).data();
            listFilaAltaMedica = rowData;
        });

        $("#btnBuscar").click();
        $(".nav-tabs a").on("shown.bs.tab", function (event) {
            DtDiagnosticos.columns.adjust().draw();
        });
    },
    LimpiarCampos() {
        $("#b_IdDiagnostico").val(0);
        $("#b_cie10").val(0);
        $("#b_descripciondia").val("");
        $("#cboTipoDiagnostico").val(0);
        $("#cboTipoDiagnosticoComplicacion").val(0);
        $("#cboTipoDiagnosticoMuerte").val(0);
        $("#cboTipoDiagnosticoMuerteFetal").val(0);
        $("#txtAnamnesis").val("");
        $("#cboFarmacia").val(0);
        $("#cboMedicamento").val(0);
        $("#txtCantidadFarmacia").val(0);
        $("#cboDosis").val(0);
        $("#cboVia").val(0);
        $("#txtExamenClinico").val("");
        $("#txtFrecuencia").val("");
        $("#txtEvolucion").val("");
        $("#txtExamenesAuxiliares").val("");
        $("#txtIdDiagnostico").val("");
        listDataDiagnositoIngreso=[];
        listDataDiagnosticoComplicacion=[];
        listDataDiagnosticoMuerte=[];
        listDataDiagnosticoMuerteFetal=[];
        idAtencion=0;
        idCuentaAtencion=0;
        idServicioActual=0;
        Epicrisis.limpiarCamposDiagnosticos();
        $(".chzn-select").chosen().trigger("chosen:updated");
        fechaCierre ="";
    },

    agregarDiagnostico() {
        objDiagnosticoIngreso.codigo = $("#b_cie10").val().trim();
        objDiagnosticoIngreso.diagnostico = $("#b_descripciondia").val();
        objDiagnosticoIngreso.tipoDiagnostico = $(
            "#cboTipoDiagnostico option:selected"
        ).text();
        objDiagnosticoIngreso.idTipoDiagnostico = $("#cboTipoDiagnostico").val();
        objDiagnosticoIngreso.idDiagnostico = $("#b_IdDiagnostico").val();
        objDiagnosticoIngreso.idClasificacionDx = 7;
        objDiagnosticoIngreso.idCuentaAtencion = idCuentaAtencion;
        objDiagnosticoIngreso.idServicioActual = idServicioActual
        objDiagnosticoIngreso.idAtencion = idAtencion;
        console.log(objDiagnosticoIngreso);
        if (listDataDiagnositoIngreso.length === 0) {
            if($("#cboTipoDiagnostico").val()== 0){
                Swal.fire({
                    title: "Debe seleccionar el tipo de diagnostico",
                    icon: "warning",
                    draggable: true,
                });
            }
            else{
                listDataDiagnositoIngreso.push(objDiagnosticoIngreso);
                DtDiagnosticos.rows.add(listDataDiagnositoIngreso).draw();
                // Limpiar formulario
                Epicrisis.limpiarCamposDiagnosticos();
            }

        } else {
        
            const diagnosticoExistente = listDataDiagnositoIngreso.some(e => e.codigo === objDiagnosticoIngreso.codigo);

            if (diagnosticoExistente) {
                Swal.fire({
                    title: "No se puede guardar un diagnóstico existente",
                    icon: "warning",
                    draggable: true,
                });
            } 

            else if ($("#cboTipoDiagnostico").val() == 0) {
                Swal.fire({
                    title: "Debe seleccionar el tipo de diagnostico",
                    icon: "warning",
                    draggable: true,
                });
            }
            else {
                // Agregar nuevo diagnóstico
                listDataDiagnositoIngreso.push(objDiagnosticoIngreso);

                // Limpiar la tabla y agregar todos los registros
                DtDiagnosticos.clear();
                DtDiagnosticos.rows.add(listDataDiagnositoIngreso).draw();

                // Limpiar formulario
                Epicrisis.limpiarCamposDiagnosticos();
            }
        }
    },
    agregarDiagnosticoComplicacion() {
        objDiagnosticoComplicacion.codigo = $("#b_cie10Complicacion").val().trim();
        objDiagnosticoComplicacion.diagnostico = $("#b_descripciondiaComplicacion").val();
        objDiagnosticoComplicacion.tipoDiagnostico = $("#txtServicioActualEpicrisis").val();
        objDiagnosticoComplicacion.idTipoDiagnostico = 302;
        objDiagnosticoComplicacion.idDiagnostico = $("#b_IdDiagnosticoComplicacion").val();
        objDiagnosticoComplicacion.idClasificacionDx = 4;
        objDiagnosticoComplicacion.idCuentaAtencion = idCuentaAtencion;
        objDiagnosticoComplicacion.idServicioActual = idServicioActual
        objDiagnosticoComplicacion.idAtencion = idAtencion;
        if (listDataDiagnosticoComplicacion.length === 0) {
            if($("#cboTipoDiagnosticoComplicacion").val()== 0){
                Swal.fire({
                    title: "Debe seleccionar el tipo de diagnostico",
                    icon: "warning",
                    draggable: true,
                });
            }
            else{
                listDataDiagnosticoComplicacion.push(objDiagnosticoComplicacion);
                DtDiagnosticosComplicacion.rows.add(listDataDiagnosticoComplicacion).draw();
                // Limpiar formulario
                Epicrisis.limpiarCamposDiagnosticosComplicacion();
            }

        } else {
            const diagnosticoExistente = listDataDiagnosticoComplicacion.some(e => e.codigo === objDiagnosticoComplicacion.codigo);

            if (diagnosticoExistente) {
                Swal.fire({
                    title: "No se puede guardar un diagnóstico existente",
                    icon: "warning",
                    draggable: true,
                });
            } 

            else if ($("#cboTipoDiagnosticoComplicacion").val() == 0) {
                Swal.fire({
                    title: "Debe seleccionar el tipo de diagnostico",
                    icon: "warning",
                    draggable: true,
                });
            }
            else {
                // Agregar nuevo diagnóstico
                listDataDiagnosticoComplicacion.push(objDiagnosticoComplicacion);

                // Limpiar la tabla y agregar todos los registros
                DtDiagnosticosComplicacion.clear();
                DtDiagnosticosComplicacion.rows.add(listDataDiagnosticoComplicacion).draw();

                // Limpiar formulario
                Epicrisis.limpiarCamposDiagnosticosComplicacion();
            }
        }
    },
    agregarDiagnosticoMuerteFetal() {
        objDiagnosticoMuerteFetal.codigo = $("#b_cie10MuerteFetal").val().trim();
        objDiagnosticoMuerteFetal.diagnostico = $("#b_descripciondiaMuerteFetal").val();
        objDiagnosticoMuerteFetal.tipoDiagnostico = $(
            "#cboTipoDiagnosticoMuerteFetal option:selected"
        ).text();
        objDiagnosticoMuerteFetal.idTipoDiagnostico = $("#cboTipoDiagnosticoMuerteFetal").val();
        objDiagnosticoMuerteFetal.idDiagnostico = $("#b_IdDiagnosticoMuerteFetal").val();
        objDiagnosticoMuerteFetal.idClasificacionDx = 7;
        objDiagnosticoMuerteFetal.idCuentaAtencion = idCuentaAtencion;
        objDiagnosticoMuerteFetal.idServicioActual = idServicioActual
        objDiagnosticoMuerteFetal.idAtencion = idAtencion;
        if (listDataDiagnosticoMuerteFetal.length === 0) {
            if($("#cboTipoDiagnosticoMuerteFetal").val()== 0){
                Swal.fire({
                    title: "Debe seleccionar el tipo de diagnostico",
                    icon: "warning",
                    draggable: true,
                });
            }
            else{
                listDataDiagnosticoMuerteFetal.push(objDiagnosticoMuerteFetal);
                DtDiagnosticosMuerteFetal.rows.add(listDataDiagnosticoMuerteFetal).draw();
                // Limpiar formulario
                Epicrisis.limpiarCamposDiagnosticosMuerteFetal();
            }

        } else {
        
            const diagnosticoExistente = listDataDiagnosticoMuerteFetal.some(e => e.codigo === objDiagnosticoMuerteFetal.codigo);

            if (diagnosticoExistente) {
                Swal.fire({
                    title: "No se puede guardar un diagnóstico existente",
                    icon: "warning",
                    draggable: true,
                });
            } 

            else if ($("#cboTipoDiagnosticoMuerteFetal").val() == 0) {
                Swal.fire({
                    title: "Debe seleccionar el tipo de diagnostico",
                    icon: "warning",
                    draggable: true,
                });
            }
            else {
                // Agregar nuevo diagnóstico
                listDataDiagnosticoMuerteFetal.push(objDiagnosticoMuerteFetal);

                // Limpiar la tabla y agregar todos los registros
                DtDiagnosticosMuerteFetal.clear();
                DtDiagnosticosMuerteFetal.rows.add(listDataDiagnosticoMuerteFetal).draw();

                // Limpiar formulario
                Epicrisis.limpiarCamposDiagnosticosMuerteFetal();
            }
        }
    },
    agregarDiagnosticoMuerte() {
        objDiagnosticoMuerte.codigo = $("#b_cie10Muerte").val().trim();
        objDiagnosticoMuerte.diagnostico = $("#b_descripciondiaMuerte").val();
        objDiagnosticoMuerte.tipoDiagnostico = $(
            "#cboTipoDiagnosticoMuerte option:selected"
        ).text();
        objDiagnosticoMuerte.idTipoDiagnostico = $("#cboTipoDiagnosticoMuerte").val();
        objDiagnosticoMuerte.idDiagnostico = $("#b_IdDiagnosticoMuerte").val();
        objDiagnosticoMuerte.idClasificacionDx = 7;
        objDiagnosticoMuerte.idCuentaAtencion = idCuentaAtencion;
        objDiagnosticoMuerte.idServicioActual = idServicioActual
        objDiagnosticoMuerte.idAtencion = idAtencion;
        if (listDataDiagnosticoMuerte.length === 0) {
            if($("#cboTipoDiagnosticoMuerte").val()== 0){
                Swal.fire({
                    title: "Debe seleccionar el tipo de diagnostico",
                    icon: "warning",
                    draggable: true,
                });
            }
            else{
                listDataDiagnosticoMuerte.push(objDiagnosticoMuerte);
                DtDiagnosticosMuerte.rows.add(listDataDiagnosticoMuerte).draw();
                // Limpiar formulario
                Epicrisis.limpiarCamposDiagnosticosMuerte();
            }

        } else {
        
            const diagnosticoExistente = listDataDiagnosticoMuerte.some(e => e.codigo === objDiagnosticoMuerte.codigo);

            if (diagnosticoExistente) {
                Swal.fire({
                    title: "No se puede guardar un diagnóstico existente",
                    icon: "warning",
                    draggable: true,
                });
            } 

            else if ($("#cboTipoDiagnosticoMuerte").val() == 0) {
                Swal.fire({
                    title: "Debe seleccionar el tipo de diagnostico",
                    icon: "warning",
                    draggable: true,
                });
            }
            else {
                // Agregar nuevo diagnóstico
                listDataDiagnosticoMuerte.push(objDiagnosticoMuerte);

                // Limpiar la tabla y agregar todos los registros
                DtDiagnosticosMuerte.clear();
                DtDiagnosticosMuerte.rows.add(listDataDiagnosticoMuerte).draw();

                // Limpiar formulario
                Epicrisis.limpiarCamposDiagnosticosMuerte();
            }
        }
    },
    LimpiarModalTransferencias() {
        DTTransferencias.clear().draw();
        $('#cboMedicoOrdenaTransferencia').val(0);
        $('#cboMedicoRecibeTransferencia').val(0);
        $('#cboServicioRecibeTransferencia').val(0);
        $('.chzn-select').chosen().trigger("chosen:updated");
        //Variables.Limpiar();
    },
<<<<<<< HEAD
=======
    LimpiarModalRecepcionCama() {
        // DTTransferencias.clear().draw();
        // $('#cboMedicoOrdenaTransferencia').val(0);
        // $('#cboMedicoRecibeTransferencia').val(0);
        // $('#cboServicioRecibeTransferencia').val(0);
        // $('.chzn-select').chosen().trigger("chosen:updated");
        //Variables.Limpiar();
    },
>>>>>>> c43206bf175774a3bfc1e1fc1e2cd58a60d1e406
    
    limpiarCamposDiagnosticos(){
        objDiagnosticoIngreso = {};
        $("#b_cie10").val("");
        $("#b_descripciondia").val("");
        $("#cboTipoDiagnostico").val(0);
        $(".chzn-select").chosen().trigger("chosen:updated");
    },
    limpiarCamposDiagnosticosMuerteFetal(){
        objDiagnosticoMuerteFetal = {};
        $("#b_cie10MuerteFetal").val("");
        $("#b_descripciondiaMuerteFetal").val("");
        $("#cboTipoDiagnosticoMuerteFetal").val(0);
        $(".chzn-select").chosen().trigger("chosen:updated");
    },
    limpiarCamposDiagnosticosComplicacion(){
        objDiagnosticoComplicacion = {};
        $("#b_cie10Complicacion").val("");
        $("#b_descripciondiaComplicacion").val("");
        $("#cboTipoDiagnosticoComplicacion").val(0);
        $(".chzn-select").chosen().trigger("chosen:updated");
    },
    limpiarCamposDiagnosticosMuerte(){
        objDiagnosticoMuerte = {};
        $("#b_cie10Muerte").val("");
        $("#b_descripciondiaMuerte").val("");
        $("#cboTipoDiagnosticoMuerte").val(0);
        $(".chzn-select").chosen().trigger("chosen:updated");
    },
    eliminarDiagnostico(rowData) {
        let $tr = $(rowData).closest('tr');
        let lessData = DtDiagnosticos.row($tr).data();
        const listFinal=listDataDiagnositoIngreso.filter((e)=>e.codigo.trim() != lessData.codigo.trim());
        listDataDiagnositoIngreso= listFinal;
        DtDiagnosticos.row($tr).remove().draw(false);
    },
    eliminarDiagnosticoComplicacion(rowData) {
        let $tr = $(rowData).closest('tr');
        let lessData = DtDiagnosticosComplicacion.row($tr).data();
        const listFinal=listDataDiagnosticoComplicacion.filter((e)=>e.codigo.trim() != lessData.codigo.trim());
        listDataDiagnosticoComplicacion= listFinal;
        DtDiagnosticosComplicacion.row($tr).remove().draw(false);
    },
    eliminarDiagnosticoMuerteFetal(rowData) {
        let $tr = $(rowData).closest('tr');
        let lessData = DtDiagnosticosMuerteFetal.row($tr).data();
        const listFinal=listDataDiagnosticoMuerteFetal.filter((e)=>e.codigo.trim() != lessData.codigo.trim());
        listDataDiagnosticoMuerteFetal= listFinal;
        DtDiagnosticosMuerteFetal.row($tr).remove().draw(false);
    },
    eliminarDiagnosticoMuerte(rowData) {
        let $tr = $(rowData).closest('tr');
        let lessData = DtDiagnosticosMuerte.row($tr).data();
        const listFinal=listDataDiagnosticoMuerte.filter((e)=>e.codigo.trim() != lessData.codigo.trim());
        listDataDiagnosticoMuerte= listFinal;
        DtDiagnosticosMuerte.row($tr).remove().draw(false);
    },
<<<<<<< HEAD
    // async Medicos(idAtencion) {
    //     console.log('idAtencion',idAtencion);
    //     var midata = new FormData();
    //     let datos;
    //     var resp = null;

    //     midata.append('_token', $("meta[name='csrf-token']").attr("content"));
    //     midata.append('IdAtencion', idAtencion);
    //     try {
    //         datos = await
    //             $.ajax({
    //                 method: "POST",
    //                 url: "/Transferencia/SeleccionarAtencion",
    //                 data: midata,
    //                 dataType: "json",
    //                 cache: false,
    //                 processData: false,
    //                 contentType: false,
    //             });
                
    //             resp = datos.resultado[0];
    //     } catch (error) {
    //         alerta(3, error);
    //     }

    //     return resp;
    // },
    async SeleccionarAtencion(idAtencion) {
        console.log('idAtencion',idAtencion);
        var midata = new FormData();
        let datos;
        var resp = null;

        midata.append('_token', $("meta[name='csrf-token']").attr("content"));
        midata.append('IdAtencion', idAtencion);
        try {
            datos = await
                $.ajax({
                    method: "POST",
                    url: "/Transferencia/SeleccionarAtencion",
                    data: midata,
                    dataType: "json",
                    cache: false,
                    processData: false,
                    contentType: false,
                });
                
                resp = datos.resultado[0];
        } catch (error) {
            alerta(3, error);
        }

        return resp;
    },
    async CargarTransferencia() {

        // const aten = await Transferencias.SeleccionarAtencion(Variables.IdAtencion);
        const aten = await Epicrisis.SeleccionarAtencion(listFilaAltaMedica.IdAtencion);
        // cons medico = await Epicrisis.Medicos();

        console.log('aten', aten);
        Transferencias.idCamaActual = aten.IdCamaActual;
        //if (Transferencias.tipoServicio == 'EMER') {
        //var objrowTb = DTEmergencia.row('.selected').data();
        //}

        /*if (Transferencias.tipoServicio == 'HOSP') {
            var objrowTb = oTable_atencionesHosp.api(true).row('.selected').data();
        }

        if (Transferencias.tipoServicio == 'UCI') {
            var objrowTb = oTable_AtencionesUCI.api(true).row('.selected').data();
        }*/

        /*if (isEmpty(objrowTb)) {
            alerta('info', '', 'Seleccione un registro por favor.');
            return false;
        }*/

        if (aten.idEstadoAtencion == 2) {
            alerta('info', '', 'La cuenta se encuentra cerrada.');
            return;
            // if (Transferencias.tipoServicio == 'EMER') {
            //     return false;
            // }
        }

        // if (aten.fechaEgreso != '' && aten.fechaEgreso != null) {
        //     alerta('info', '', 'El paciente tiene alta médica.');
        //     return false;
        // }



        $("#btnGuardarTransferencias").show();
        if (Transferencias.tipoServicio == 'EMER') {
            if (aten.EsObservacionEmergencia == 1) {
                //if (isEmpty(objrowTb.idCamaIngreso)) {
                //    alerta('warning', '', 'El paciente aún no se le asignado cama de ingreso.<br>Por favor realice la recepción.');
                //    return false;
                //}

                if (aten.llegoAlServicio == 0) {
                    alerta('warning', '', 'El paciente aún no llega al servicio.\nPor favor realice la recepción.');
                    $("#btnGuardarTransferencias").hide();
                    //return false;
                }
            } else {
                if (aten.llegoAlServicio == 0) {
                    alerta('warning', '', 'El paciente aún no llega al servicio.\nPor favor realice la recepción.');
                    $("#btnGuardarTransferencias").hide();
                    //return false;
                }
            }
        } /*else if (Transferencias.tipoServicio == 'HOSP' || Transferencias.tipoServicio == 'UCI') {
            $("#CamasActual").show();
            $("#BtnCamaActual").show();

            if (isEmpty(objrowTb.idCamaIngreso)) {
                alerta('warning', '', 'El paciente aún no se le asignado cama de ingreso.<br>Por favor realice la recepción.');
                return false;
            }

            if (objrowTb.llegoAlServicio == 0) {
                alerta('warning', '', 'El paciente aún no llega al servicio.<br>Por favor realice la recepción.');
                $("#btnGuardarTransferencias").hide();
                //return false;
            }            
        }*/

        $("#txtNroCuentaTransferencia").val(aten.IdCuentaAtencion);
        $("#txtHistoriaTransferencia").val(aten.NroHistoriaClinica);
        $("#txtTipoDocumentoTransferencia").val(aten.TipoDocumento);
        $("#txtNroDocumentoTransferencia").val(aten.NroDocumento);
        $("#txtPacienteNombreTransferencia").val((aten.PrimerNombre == null ? '' : aten.PrimerNombre) + ' ' + (aten.SegundoNombre == null ? '' : aten.SegundoNombre) + ' ' + aten.ApellidoPaterno + ' ' + aten.ApellidoMaterno);

        //Variables.Cargar(objrowTb);
        $("#CamasDestino").hide();

        Transferencias.idEspecialidad = aten.IdEspecialidad;
        //Transferencias.idMedicoSesion = await Utilitario.ObtenerIdMedicoSesion();
        // Transferencias.idMedicoSesion = Variables.IdMedicoLogeado;
        //await Transferencias.ListarMedicos();
        $('#cboMedicoOrdenaTransferencia').val(Transferencias.idMedicoSesion);
        await Epicrisis.ListarTransferencias();
        // await Epicrisis.ListarCamas(listFilaAltaMedica.IdServicioActual);

        $('.chzn-select').chosen().trigger("chosen:updated");

        $("#modalTransferenciasHosp").modal("show");

=======

    imprimirRecetas(row){
        console.log(row);
>>>>>>> c43206bf175774a3bfc1e1fc1e2cd58a60d1e406
    }
};


async function listarPacienteDiagnosticosIngresos(opcion,idAtencion){
    let token = $('meta[name="csrf-token"]').attr("content");
    await fetch("/hospitalizacion/listarCombos",{
        method: "POST",
        headers : {
            "Content-type" : "application/json",
        },
        body : JSON.stringify({
            Opcion : opcion,
            Codigo : idAtencion,
            _token : token
        })
    })
        .then((res) => res.json())
        .catch((error) => console.log(error))
        .then((res)=>{
            if(Array.isArray(res.data)){
                const resultado = res.data;
                listDataDiagnositoIngreso = resultado;
                listDataDiagnositoIngreso.forEach(e=>{
                    e.idAtencion = idAtencion
                })
                DtDiagnosticos.clear();
                DtDiagnosticos.rows.add(resultado).draw();
            }
        })
}

async function listarEpisodio(opcion,idCuentaAtencion){
    let token = $('meta[name="csrf-token"]').attr("content");
    await fetch("/hospitalizacion/listarCombos",{
        method: "POST",
        headers : {
            "Content-type" : "application/json",
        },
        body : JSON.stringify({
            Opcion : opcion,
            Codigo : idCuentaAtencion,
            _token : token
        })
    })
        .then((res) => res.json())
        .catch((error) => console.log(error))
        .then((res)=>{
            if(Array.isArray(res.data)){
                const resultado = res.data;
                if(resultado.length == 0){
                    fechaCierre="";
                }
                const cboTipoDiagnotico = $("#cmbEpisodioClinico");
                resultado.forEach((item) => {
                    // Crear una opción por cada elemento recibido
                    const option = $("<option>")
                        .val(item.codigo) // Establecer el valor de la opción
                        .text(item.valor); // Establecer el texto de la opción
                    cboTipoDiagnotico.append(option); // Agregar la opción al combo
                });
                $(".chzn-select").chosen().trigger("chosen:updated");
            }
        })
}

async function descargarPapeletaAlta(data) {
    // Obtener el token CSRF de los meta tags
    try {
        Cargando(1)
        // Realizar la petición POST al servidor
        let token = $('meta[name="csrf-token"]').attr("content");
        data.listDiagnosticoEgreso = await listarDiagnosticoEgresoPorAtencion(12, data.IdAtencion);
        data.listProcedimiento =  await listarProcedimiento(13,data.IdCuentaAtencion);
        console.log(data.IdAtencion);
        console.log(data.IdCuentaAtencion);
        const response = await fetch(
            "/hospitalizacion/generarPDFPapeletaEgreso",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": token,
                },
                body: JSON.stringify({
                    _token: token,
                    paciente: data,
                }),
            }
        );

        // Verificar si la respuesta es un PDF
        if (response.headers.get("content-type").includes("application/pdf")) {
            // Convertir la respuesta a blob
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            document.getElementById("pdfViewer").src = url;
            $("#step1").hide();
            $("#step2").show();
            $("#step3").hide();
            $("#modalAltaMedicaHospitalizacion").modal("show");

        } else {
            // Si no es PDF, manejar como JSON (probablemente un error)
            const data = await response.json();
            if (data.error) {
                console.error("Error:", data.error);
            }
        }
        Cargando(0);
    } catch (error) {
        console.error("Error al descargar el PDF:", error);
    }
}

async function descargarIndicacionesPacientesAlta(data) {
    // Obtener el token CSRF de los meta tags
    try {
        Cargando(1)
        // Realizar la petición POST al servidor
        let token = $('meta[name="csrf-token"]').attr("content");
        data.listDiagnosticoEgreso = await listarDiagnosticoEgresoPorAtencion(12, data.IdAtencion);
        data.listMedicamento = await listarProcedimiento(11,data.IdCuentaAtencion);
        console.log(data.IdAtencion);
        console.log(data.IdCuentaAtencion);
        const response = await fetch(
            "/hospitalizacion/generarPDFIndicacionesPacientesAlta",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": token,
                },
                body: JSON.stringify({
                    _token: token,
                    paciente: data,
                }),
            }
        );

        // Verificar si la respuesta es un PDF
        if (response.headers.get("content-type").includes("application/pdf")) {
            // Convertir la respuesta a blob
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            document.getElementById("pdfViewer").src = url;
            $("#step1").hide();
            $("#step2").show();
            $("#step3").hide();
            $("#modalAltaMedicaHospitalizacion").modal("show");

        } else {
            // Si no es PDF, manejar como JSON (probablemente un error)
            const data = await response.json();
            if (data.error) {
                console.error("Error:", data.error);
            }
        }
        Cargando(0);
    } catch (error) {
        console.error("Error al descargar el PDF:", error);
    }
}

async function descargarPacienteEpicrisis(data) {
    // Obtener el token CSRF de los meta tags
    try {
        Cargando(1)
        // Realizar la petición POST al servidor
        let token = $('meta[name="csrf-token"]').attr("content");
        data.listDataDiagnosticoIngreso = await listarDiagnosticoEgresoPorAtencion(50, data.IdAtencion);
        data.listDiagnosticoEgreso =  await listarDiagnosticoEgresoPorAtencion(12, data.IdAtencion);
        data.listProcedimiento =  await listarProcedimiento(13,data.IdCuentaAtencion);
        data.listMedicamento = await listarProcedimiento(11,data.IdCuentaAtencion);
        const response = await fetch(
            "/hospitalizacion/generarPDFPacienteEpicrisis",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": token,
                },
                body: JSON.stringify({
                    _token: token,
                    paciente: data,
                }),
            }
        );

        // Verificar si la respuesta es un PDF
        if (response.headers.get("content-type").includes("application/pdf")) {
            // Convertir la respuesta a blob
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            document.getElementById("pdfViewer").src = url;
            $("#step1").hide();
            $("#step2").show();
            $("#step3").hide();
            $("#modalAltaMedicaHospitalizacion").modal("show");

        } else {
            // Si no es PDF, manejar como JSON (probablemente un error)
            const data = await response.json();
            if (data.error) {
                console.error("Error:", data.error);
            }
        }
        Cargando(0);
    } catch (error) {
        console.error("Error al descargar el PDF:", error);
    }
}

async function ListarCombos(opcion, codigo) {
    let token = $('meta[name="csrf-token"]').attr("content");
    await fetch("/hospitalizacion/listarCombos", {
        method: "POST", // Método HTTP
        headers: {
            "Content-Type": "application/json", // Especifica el tipo de contenido
        },
        body: JSON.stringify({
            Opcion: opcion,
            Codigo: codigo,
            _token: token,
        }), // Convierte los parámetros a una cadena JSON
    })
        .then((res) => res.json())
        .catch((error) => console.log(error))
        .then((res) => {
            if (Array.isArray(res.data)) {
                const resultado = res.data;
                const cboTipoDiagnotico = $("#cboTipoDiagnostico");
                resultado.forEach((item) => {
                    // Crear una opción por cada elemento recibido
                    const option = $("<option>")
                        .val(item.codigo) // Establecer el valor de la opción
                        .text(item.valor); // Establecer el texto de la opción
                    cboTipoDiagnotico.append(option); // Agregar la opción al combo
                });
                $(".chzn-select").chosen().trigger("chosen:updated");
            }
        });
}


async function listarDestino(opcion) {
    let token = $('meta[name="csrf-token"]').attr("content");
    await fetch("/hospitalizacion/listarCombos", {
        method: "POST", // Método HTTP
        headers: {
            "Content-Type": "application/json", // Especifica el tipo de contenido
        },
        body: JSON.stringify({
            Opcion: opcion,
            _token: token,
        }), // Convierte los parámetros a una cadena JSON
    })
        .then((res) => res.json())
        .catch((error) => console.log(error))
        .then((res) => {
            if (Array.isArray(res.data)) {
                const resultado = res.data;
                const cboTipoDiagnotico = $("#cboDestinoAlta");
                resultado.forEach((item) => {
                    // Crear una opción por cada elemento recibido
                    const option = $("<option>")
                        .val(item.codigo) // Establecer el valor de la opción
                        .text(item.valor); // Establecer el texto de la opción
                    cboTipoDiagnotico.append(option); // Agregar la opción al combo
                });
                $(".chzn-select").chosen().trigger("chosen:updated");
            }
        });
}

async function listarCondicionAlta(opcion) {
    let token = $('meta[name="csrf-token"]').attr("content");
    await fetch("/hospitalizacion/listarCombos", {
        method: "POST", // Método HTTP
        headers: {
            "Content-Type": "application/json", // Especifica el tipo de contenido
        },
        body: JSON.stringify({
            Opcion: opcion,
            _token: token,
        }), // Convierte los parámetros a una cadena JSON
    })
        .then((res) => res.json())
        .catch((error) => console.log(error))
        .then((res) => {
            if (Array.isArray(res.data)) {
                const resultado = res.data;
                const cboTipoDiagnotico = $("#cboCondicionAlta");
                resultado.forEach((item) => {
                    // Crear una opción por cada elemento recibido
                    const option = $("<option>")
                        .val(item.codigo) // Establecer el valor de la opción
                        .text(item.valor); // Establecer el texto de la opción
                    cboTipoDiagnotico.append(option); // Agregar la opción al combo
                });
                $(".chzn-select").chosen().trigger("chosen:updated");
            }
        });
}

async function listarTipoAlta(opcion) {
    let token = $('meta[name="csrf-token"]').attr("content");
    await fetch("/hospitalizacion/listarCombos", {
        method: "POST", // Método HTTP
        headers: {
            "Content-Type": "application/json", // Especifica el tipo de contenido
        },
        body: JSON.stringify({
            Opcion: opcion,
            _token: token,
        }), // Convierte los parámetros a una cadena JSON
    })
        .then((res) => res.json())
        .catch((error) => console.log(error))
        .then((res) => {
            if (Array.isArray(res.data)) {
                const resultado = res.data;
                const cboTipoDiagnotico = $("#cboTipoAlta");
                resultado.forEach((item) => {
                    // Crear una opción por cada elemento recibido
                    const option = $("<option>")
                        .val(item.codigo) // Establecer el valor de la opción
                        .text(item.valor); // Establecer el texto de la opción
                    cboTipoDiagnotico.append(option); // Agregar la opción al combo
                });
                $(".chzn-select").chosen().trigger("chosen:updated");
            }
        });
}

async function listarMedicoEgreso(opcion) {
    let token = $('meta[name="csrf-token"]').attr("content");
    await fetch("/hospitalizacion/listarCombos", {
        method: "POST", // Método HTTP
        headers: {
            "Content-Type": "application/json", // Especifica el tipo de contenido
        },
        body: JSON.stringify({
            Opcion: opcion,
            _token: token,
        }), // Convierte los parámetros a una cadena JSON
    })
        .then((res) => res.json())
        .catch((error) => console.log(error))
        .then((res) => {
            if (Array.isArray(res.data)) {
                const resultado = res.data;
                const cboTipoDiagnotico = $("#cboMedicoEgreso");
                resultado.forEach((item) => {
                    // Crear una opción por cada elemento recibido
                    const option = $("<option>")
                        .val(item.codigo) // Establecer el valor de la opción
                        .text(item.valor); // Establecer el texto de la opción
                    cboTipoDiagnotico.append(option); // Agregar la opción al combo
                });
                $(".chzn-select").chosen().trigger("chosen:updated");
            }
        });
}
async function CargarMedicoTransferencia(opcion) {
    let token = $('meta[name="csrf-token"]').attr("content");
    await fetch("/hospitalizacion/listarCombos", {
        method: "POST", // Método HTTP
        headers: {
            "Content-Type": "application/json", // Especifica el tipo de contenido
        },
        body: JSON.stringify({
            Opcion: opcion,
            _token: token,
        }), // Convierte los parámetros a una cadena JSON
    })
        .then((res) => res.json())
        .catch((error) => console.log(error))
        .then((res) => {
            if (Array.isArray(res.data)) {

                
                const resultado = res.data;
                console.log(resultado);
                const cboTipoDiagnotico = $("#cboMedicoEgresoTransferencia");
               

                resultado.forEach((item) => {
                    // Crear una opción por cada elemento recibido
                    const option = $("<option>")
                        .val(item.codigo) // Establecer el valor de la opción
                        .text(item.valor); // Establecer el texto de la opción
                    cboTipoDiagnotico.append(option); // Agregar la opción al combo

                    cboTipoDiagnotico.val(medicoID);
                });
                $(".chzn-select").chosen().trigger("chosen:updated");
            }
        });
}


async function listarTiposReferencia(opcion) {
    let token = $('meta[name="csrf-token"]').attr("content");
    await fetch("/hospitalizacion/listarCombos", {
        method: "POST", // Método HTTP
        headers: {
            "Content-Type": "application/json", // Especifica el tipo de contenido
        },
        body: JSON.stringify({
            Opcion: opcion,
            _token: token,
        }), // Convierte los parámetros a una cadena JSON
    })
        .then((res) => res.json())
        .catch((error) => console.log(error))
        .then((res) => {
            if (Array.isArray(res.data)) {
                const resultado = res.data;
                const cboTipoDiagnotico = $("#cboTipoReferenciaAM");
                resultado.forEach((item) => {
                    // Crear una opción por cada elemento recibido
                    const option = $("<option>")
                        .val(item.codigo) // Establecer el valor de la opción
                        .text(item.valor); // Establecer el texto de la opción
                    cboTipoDiagnotico.append(option); // Agregar la opción al combo
                });
                $(".chzn-select").chosen().trigger("chosen:updated");
            }
        });
}

async function listarEstablecimientos(opcion) {
    let token = $('meta[name="csrf-token"]').attr("content");
    await fetch("/hospitalizacion/listarCombos", {
        method: "POST", // Método HTTP
        headers: {
            "Content-Type": "application/json", // Especifica el tipo de contenido
        },
        body: JSON.stringify({
            Opcion: opcion,
            _token: token,
        }), // Convierte los parámetros a una cadena JSON
    })
        .then((res) => res.json())
        .catch((error) => console.log(error))
        .then((res) => {
            if (Array.isArray(res.data)) {
                const resultado = res.data;
                const cboTipoDiagnotico = $("#cboEstabMinsaReferenciaAM");
                resultado.forEach((item) => {
                    // Crear una opción por cada elemento recibido
                    const option = $("<option>")
                        .val(item.codigo) // Establecer el valor de la opción
                        .text(item.valor); // Establecer el texto de la opción
                    cboTipoDiagnotico.append(option); // Agregar la opción al combo
                });
                $(".chzn-select").chosen().trigger("chosen:updated");
            }
        });
}

async function listarServiciosHospitlizacion(opcion){
    let token = $('meta[name="csrf-token"]').attr("content");
    await fetch("/hospitalizacion/listarCombos", {
        method: "POST", // Método HTTP
        headers: {
            "Content-Type": "application/json", // Especifica el tipo de contenido
        },
        body: JSON.stringify({
            Opcion: opcion,
            _token: token,
        }), // Convierte los parámetros a una cadena JSON
    })
        .then((res) => res.json())
        .catch((error) => console.log(error))
        .then((res) => {
            if (Array.isArray(res.data)) {
                const resultado = res.data;
                const cboServicio = $("#cboServicio");
                const cboServicioTraslado = $("#cboServicioTraslado");
                resultado.forEach((item) => {
                    // Crear una opción por cada elemento recibido
                    const option = $("<option>")
                        .val(item.codigo) // Establecer el valor de la opción
                        .text(item.valor); // Establecer el texto de la opción
                        cboServicio.append(option); // Agregar la opción al combo
                    const option2 = $("<option>")
                            .val(item.codigo) // Establecer el valor de la opción
                            .text(item.valor); // Establecer el texto de la opción
                        cboServicioTraslado.append(option2);
                        //cboServicioTransferido.append(option);
                });
            }
        });

}

async function listarCombosDiagnostico(opcion, codigo) {
    let token = $('meta[name="csrf-token"]').attr("content");
    await fetch("/hospitalizacion/listarCombos", {
        method: "POST", // Método HTTP
        headers: {
            "Content-Type": "application/json", // Especifica el tipo de contenido
        },
        body: JSON.stringify({
            Opcion: opcion,
            Codigo: codigo,
            _token: token,
        }), // Convierte los parámetros a una cadena JSON
    })
        .then((res) => res.json())
        .catch((error) => console.log(error))
        .then((res) => {
            if (Array.isArray(res.data)) {
                const resultado = res.data;
                completarDescripcion(resultado);
            }
        });
}


function listarDiagnosticoEgresoPorAtencion(opcion, codigo) {
    let token = $('meta[name="csrf-token"]').attr("content");

    return fetch("/hospitalizacion/listarCombos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            Opcion: opcion,
            _token: token,
            Codigo: parseInt(codigo),
        }),
    })
    .then((res) => res.json()) // Convertir la respuesta a JSON
    .then((res) => {
        if (Array.isArray(res.data)) {
            return res.data; // Retornar los datos en lugar de asignarlos a una variable global
        }
        return []; // Si no hay datos, retornar un array vacío
    })
    .catch((error) => {
        console.log(error);
        return []; // En caso de error, retornar un array vacío para evitar fallos en la ejecución
    });
}

function listarProcedimiento(opcion,codigo){
    let token = $('meta[name="csrf-token"]').attr("content");
    return fetch("/hospitalizacion/listarCombos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            Opcion: opcion,
            _token: token,
            Codigo: parseInt(codigo),
        }),
    })
    .then((res) => res.json()) // Convertir la respuesta a JSON
    .then((res) => {
        if (Array.isArray(res.data)) {
            return res.data; // Retornar los datos en lugar de asignarlos a una variable global
        }
        return []; // Si no hay datos, retornar un array vacío
    })
    .catch((error) => {
        console.log(error);
        return []; // En caso de error, retornar un array vacío para evitar fallos en la ejecución
    });  
}


function completarDescripcion(resultado) {
    const resp = resultado.map((item) => ({
        label: item.descripcion, // Lo que se muestra en el dropdown
        codigoCIE10: item.codigoCIE10, // Lo que se coloca en el input cuando seleccionas
        IdDiagnostico: item.IdDiagnostico, // ID del diagnóstico
        idTipoDiagnostico : item.idTipoDiagnostico
    }));

    $("#b_descripciondia").autocomplete({
        source: resp,
        minLength: 3,
        select: function (event, ui) {
            $("#b_IdDiagnostico").val(ui.item.IdDiagnostico);
            $("#b_cie10").val(ui.item.codigoCIE10);
            $("#b_descripciondia").val(ui.item.label);
            $("#txtIdDiagnostico").val(ui.item.idTipoDiagnostico);
        },
    });

    $("#b_descripciondia").autocomplete("widget").css("z-index", "9999");

}

function completarDescripcionMuerte(resultado){
    const resp = resultado.map((item) => ({
        label: item.descripcion, // Lo que se muestra en el dropdown
        codigoCIE10: item.codigoCIE10, // Lo que se coloca en el input cuando seleccionas
        IdDiagnostico: item.IdDiagnostico, // ID del diagnóstico
        idTipoDiagnostico : item.idTipoDiagnostico
    }));

    $("#b_descripciondiaMuerte").autocomplete({
        source: resp,
        minLength: 3,
        select: function (event, ui) {
            $("#b_IdDiagnosticoMuerte").val(ui.item.IdDiagnostico);
            $("#b_cie10Muerte").val(ui.item.codigoCIE10);
            $("#b_descripciondiaMuerte").val(ui.item.label);
            $("#txtIdDiagnosticoMuerte").val(ui.item.idTipoDiagnostico);
        },
    });

    $("#b_descripciondiaMuerte").autocomplete("widget").css("z-index", "9999");
}

async function listarMedicamentos(opcion, codigo) {
    let token = $('meta[name="csrf-token"]').attr("content");
    await fetch("/hospitalizacion/listarMedicamento", {
        method: "POST", // Método HTTP
        headers: {
            "Content-Type": "application/json", // Especifica el tipo de contenido
        },
        body: JSON.stringify({
            Opcion: opcion,
            Codigo: parseInt(codigo),
            _token: token,
        }), // Convierte los parámetros a una cadena JSON
    })
        .then((res) => res.json())
        .catch((error) => console.log(error))
        .then((res) => {
            if (Array.isArray(res.data)) {
                registroMedicamento = [];
                const resultado = res.data;
                registroMedicamento = resultado;
                const cboMedicamento = $("#cboMedicamento");
                cboMedicamento.empty();
                resultado.forEach((item) => {
                    // Crear una opción por cada elemento recibido
                    const option = $("<option>")
                        .val(item.IdProducto) // Establecer el valor de la opción
                        .text(item.Nombre); // Establecer el texto de la opción
                    cboMedicamento.append(option); // Agregar la opción al combo
                });
                $(".chzn-select").chosen().trigger("chosen:updated");
            }
        });
}




 function crearEpicrisisIngreso(epicrisis){
    let token = $('meta[name="csrf-token"]').attr("content");
     fetch("/hospitalizacion/mantenedorEpicrisis", {
        method: "POST", // Método HTTP
        headers: {
            "Content-Type": "application/json", // Especifica el tipo de contenido
        },
        body: JSON.stringify({
            data: epicrisis,
            _token: token,
        }), // Convierte los parámetros a una cadena JSON
    })
        .then((res) => res.json())
        .catch((error) => Swal.fire({title: "Se ha encontrado un error"+error,icon: "error",draggable: true}))
        .then((res) => {

            if(res == undefined){
                Swal.fire({
                    title: "No se pudo guardar sin respuesta"+res,
                    icon: "error",
                    draggable: true,
                    timer: 2500
                });
            }
            else {
                if(res.status == 200){
                    Swal.fire({
                        title: res.message,
                        icon: "success",
                        draggable: true,
                        timer: 1500
                    });
                    Epicrisis.LimpiarCampos();
                    //if($("#txtFechaAlta").val().length !=0 && $("#txtHoraAlta").val().length){
                        //listFilaAltaMedica.FechaEgreso=$("#txtFechaAlta").val() + " : "+ $("#txtHoraAlta").val();
                        //descargarPapeletaAlta(listFilaAltaMedica);
                    //}
                    $("#modalAltaMedicaHospitalizacion").modal("hide");
                    cargarEpicrisis();
                }
                else {
                    Swal.fire({
                        title: res.message,
                        icon: "error",
                        draggable: true,
                        timer: 1500
                    });
                    Epicrisis.LimpiarCampos();
                    $("#modalAltaMedicaHospitalizacion").modal("hide");

                }
            }

        });
}

function RevertirAlta(epicrisis){
    let token = $('meta[name="csrf-token"]').attr("content");
     fetch("/hospitalizacion/eliminarAltaMedicaHospitalizacion", {
        method: "POST", // Método HTTP
        headers: {
            "Content-Type": "application/json", // Especifica el tipo de contenido
        },
        body: JSON.stringify({
            data: epicrisis,
            _token: token,
        }), // Convierte los parámetros a una cadena JSON
    })
        .then((res) => res.json())
        .catch((error) => Swal.fire({title: "Se ha encontrado un error"+error,icon: "error",draggable: true}))
        .then((res) => {

            if(res == undefined){
                Swal.fire({
                    title: "No se pudo guardar sin respuesta"+res,
                    icon: "error",
                    draggable: true,
                    timer: 2500
                });
            }
            else {
                if(res.status == 200){
                    Swal.fire({
                        title: res.message,
                        icon: "success",
                        draggable: true,
                        timer: 1500
                    });
                    Epicrisis.LimpiarCampos();
                    $("#modalRevertirAlta").modal("hide");
                    cargarEpicrisis();
                }
                else {
                    Swal.fire({
                        title: res.message,
                        icon: "error",
                        draggable: true,
                        timer: 1500
                    });
                    Epicrisis.LimpiarCampos();
                    $("#modalRevertirAlta").modal("hide");

                }
            }

        });
}

function cargarEpicrisis(){
    const nroDeCuenta        = $("#txtNroDeCuenta").val();
    const nroHistoriaClinica = $("#txtHistoriaClinica").val();
    const nroDni             = $("#txtNroDNI").val();
    const servicio           = $("#cboServicio").val();
    const fechaInicio        = $("#txtFechaEgreso").val();
    const fechaFin           = $("#txtFechaAtencionFinBuscar1").val();

    let data = {};

    data.nroDeCuenta= parseInt(nroDeCuenta) ? parseInt(nroDeCuenta) : 0;
    data.nroHistoriaClinica = parseInt(nroHistoriaClinica) ? parseInt(nroHistoriaClinica) : 0;
    data.nroDni = parseInt(nroDni) ? parseInt(nroDni) : 0;
    data.servicio = parseInt(servicio) ? parseInt(servicio) : 0;
    data.fechaInicio = fechaInicio;
    data.fechaFin = fechaFin;

    Epicrisis.ListarEpicrisisHospitalizacion(data);
}

async function listarDiagnosticoComplicaciones(option){
    let token = $('meta[name="csrf-token"]').attr("content");
    await fetch("/hospitalizacion/listarCombos", {
        method: "POST", // Método HTTP
        headers: {
            "Content-Type": "application/json", // Especifica el tipo de contenido
        },
        body: JSON.stringify({
            Opcion: option,
            _token: token,
        }), // Convierte los parámetros a una cadena JSON
    })
        .then((res) => res.json())
        .catch((error) => console.log(error))
        .then((res) => {
            if (Array.isArray(res.data)) {
                const resultado = res.data;
                const resp = resultado.map((item) => ({
                label: item.descripcion, // Lo que se muestra en el dropdown
                codigoCIE10: item.codigoCIE10, // Lo que se coloca en el input cuando seleccionas
                IdDiagnostico: item.IdDiagnostico, // ID del diagnóstico
                idTipoDiagnostico : item.idTipoDiagnostico
                }));
                $("#b_descripciondiaComplicacion").autocomplete({
                    source: resp,
                    minLength: 3,
                    select: function (event, ui) {
                        $("#b_IdDiagnosticoComplicacion").val(ui.item.IdDiagnostico);
                        $("#b_cie10Complicacion").val(ui.item.codigoCIE10);
                        $("#b_descripciondiaComplicacion").val(ui.item.label);
                        $("#txtIdDiagnosticoComplicacion").val(ui.item.idTipoDiagnostico);
                    },
                });
            
                $("#b_descripciondiaComplicacion").autocomplete("widget").css("z-index", "9999");

                //completarDescripcionMuerte(resultado);
            }
        });
}

async function listarComboMuerteFetal(opcion) {
    let token = $('meta[name="csrf-token"]').attr("content");
    await fetch("/hospitalizacion/listarCombos", {
        method: "POST", // Método HTTP
        headers: {
            "Content-Type": "application/json", // Especifica el tipo de contenido
        },
        body: JSON.stringify({
            Opcion: opcion,
            _token: token,
        }), // Convierte los parámetros a una cadena JSON
    })
        .then((res) => res.json())
        .catch((error) => console.log(error))
        .then((res) => {
            if (Array.isArray(res.data)) {
                const resultado = res.data;
                const cboTipoDiagnotico = $("#cboTipoDiagnosticoMuerteFetal");
                resultado.forEach((item) => {
                    // Crear una opción por cada elemento recibido
                    const option = $("<option>")
                        .val(item.codigo) // Establecer el valor de la opción
                        .text(item.valor); // Establecer el texto de la opción
                    cboTipoDiagnotico.append(option); // Agregar la opción al combo
                });
                $(".chzn-select").chosen().trigger("chosen:updated");
            }
        });
}

//listarDiagnosticoEgreso

async function listarDiagnosticoEgreso(option){
    let token = $('meta[name="csrf-token"]').attr("content");
    await fetch("/hospitalizacion/listarCombos", {
        method: "POST", // Método HTTP
        headers: {
            "Content-Type": "application/json", // Especifica el tipo de contenido
        },
        body: JSON.stringify({
            Opcion: option,
            _token: token,
        }), // Convierte los parámetros a una cadena JSON
    })
        .then((res) => res.json())
        .catch((error) => console.log(error))
        .then((res) => {
            if (Array.isArray(res.data)) {
                const resultado = res.data;
                const resp = resultado.map((item) => ({
                label: item.descripcion, // Lo que se muestra en el dropdown
                codigoCIE10: item.codigoCIE10, // Lo que se coloca en el input cuando seleccionas
                IdDiagnostico: item.IdDiagnostico, // ID del diagnóstico
                idTipoDiagnostico : item.idTipoDiagnostico
                }));
                $("#b_descripciondia").autocomplete({
                    source: resp,
                    minLength: 3,
                    select: function (event, ui) {
                        console.log(ui.item);
                        $("#b_IdDiagnostico").val(ui.item.IdDiagnostico);
                        $("#b_cie10").val(ui.item.codigoCIE10);
                        $("#b_descripciondia").val(ui.item.label);
                        $("#txtIdDiagnostico").val(ui.item.idTipoDiagnostico);
                    },
                });
            
                $("#b_descripciondia").autocomplete("widget").css("z-index", "9999");
            }
        });
}

async function listarDiagnosticoMuerteFetal(option){
    let token = $('meta[name="csrf-token"]').attr("content");
    await fetch("/hospitalizacion/listarCombos", {
        method: "POST", // Método HTTP
        headers: {
            "Content-Type": "application/json", // Especifica el tipo de contenido
        },
        body: JSON.stringify({
            Opcion: option,
            _token: token,
        }), // Convierte los parámetros a una cadena JSON
    })
        .then((res) => res.json())
        .catch((error) => console.log(error))
        .then((res) => {
            if (Array.isArray(res.data)) {
                const resultado = res.data;
                const resp = resultado.map((item) => ({
                label: item.descripcion, // Lo que se muestra en el dropdown
                codigoCIE10: item.codigoCIE10, // Lo que se coloca en el input cuando seleccionas
                IdDiagnostico: item.IdDiagnostico, // ID del diagnóstico
                idTipoDiagnostico : item.idTipoDiagnostico
                }));
                $("#b_descripciondiaMuerteFetal").autocomplete({
                    source: resp,
                    minLength: 3,
                    select: function (event, ui) {
                        $("#b_IdDiagnosticoMuerteFetal").val(ui.item.IdDiagnostico);
                        $("#b_cie10MuerteFetal").val(ui.item.codigoCIE10);
                        $("#b_descripciondiaMuerteFetal").val(ui.item.label);
                        $("#txtIdDiagnosticoMuerteFetal").val(ui.item.idTipoDiagnostico);
                    },
                });
            
                $("#b_descripciondiaMuerteFetal").autocomplete("widget").css("z-index", "9999");
            }
        });
}

async function listarComboMuerte(opcion) {
    let token = $('meta[name="csrf-token"]').attr("content");
    await fetch("/hospitalizacion/listarCombos", {
        method: "POST", // Método HTTP
        headers: {
            "Content-Type": "application/json", // Especifica el tipo de contenido
        },
        body: JSON.stringify({
            Opcion: opcion,
            _token: token,
        }), // Convierte los parámetros a una cadena JSON
    })
        .then((res) => res.json())
        .catch((error) => console.log(error))
        .then((res) => {
            if (Array.isArray(res.data)) {
                const resultado = res.data;
                const cboTipoDiagnotico = $("#cboTipoDiagnosticoMuerte");
                resultado.forEach((item) => {
                    // Crear una opción por cada elemento recibido
                    const option = $("<option>")
                        .val(item.codigo) // Establecer el valor de la opción
                        .text(item.valor); // Establecer el texto de la opción
                    cboTipoDiagnotico.append(option); // Agregar la opción al combo
                });
                $(".chzn-select").chosen().trigger("chosen:updated");
            }
        });
}

async function listarDiagnosticoMuerte(option){
    let token = $('meta[name="csrf-token"]').attr("content");
    await fetch("/hospitalizacion/listarCombos", {
        method: "POST", // Método HTTP
        headers: {
            "Content-Type": "application/json", // Especifica el tipo de contenido
        },
        body: JSON.stringify({
            Opcion: option,
            _token: token,
        }), // Convierte los parámetros a una cadena JSON
    })
        .then((res) => res.json())
        .catch((error) => console.log(error))
        .then((res) => {
            if (Array.isArray(res.data)) {
                const resultado = res.data;
                const resp = resultado.map((item) => ({
                label: item.descripcion, // Lo que se muestra en el dropdown
                codigoCIE10: item.codigoCIE10, // Lo que se coloca en el input cuando seleccionas
                IdDiagnostico: item.IdDiagnostico, // ID del diagnóstico
                idTipoDiagnostico : item.idTipoDiagnostico
                }));
                $("#b_descripciondiaMuerte").autocomplete({
                    source: resp,
                    minLength: 3,
                    select: function (event, ui) {
                        $("#b_IdDiagnosticoMuerte").val(ui.item.IdDiagnostico);
                        $("#b_cie10Muerte").val(ui.item.codigoCIE10);
                        $("#b_descripciondiaMuerte").val(ui.item.label);
                        $("#txtIdDiagnosticoMuerte").val(ui.item.idTipoDiagnostico);
                    },
                });
            
                $("#b_descripciondiaMuerte").autocomplete("widget").css("z-index", "9999");
            }
        });
}

$(document).ready(function () {
    medicoID = $("#medicoID").val();
    Epicrisis.Plugins();
    Epicrisis.InitDatablesTriajeHospitalizacion();
    Epicrisis.initDatablesTransferencias();
    Epicrisis.InitialCharge();
    Epicrisis.DataTableDiagnosticos();
    Epicrisis.DataTableInformeEvaluacion();
    Epicrisis.DataTableDiagnosticosComplicaciones();
    Epicrisis.DataTableDiagnosticosMuerteFetal();
    Epicrisis.initDatablesTransferencias();
    Epicrisis.DataTableDiagnosticosMuerte();
    Epicrisis.eventos();
    ListarCombos(2);
    listarServiciosHospitlizacion(9);
    listarDestino(16);
    listarTipoAlta(17);
    listarCondicionAlta(18);
    listarMedicoEgreso(19);
    // CargarMedicoTransferencia(19);

    listarTiposReferencia(20);
    listarEstablecimientos(21);
    listarDiagnosticoComplicaciones(23);
    listarComboMuerteFetal(24);
    listarDiagnosticoEgreso(25);
    listarDiagnosticoMuerteFetal(25);
    listarComboMuerte(26);
    listarDiagnosticoMuerte(25);
    $('#modalInformeEvaluacionHospi').on('shown.bs.modal', function (event) {            
        DTEvaInfHosp.columns.adjust().draw();            
    });
    $("#txtHistoriaClinica").on("keypress", function (event) {
        // Obtener el código de la tecla presionada
        let charCode = event.which || event.keyCode;

        // Permitir teclas de control como backspace y enter
        if (charCode === 8 || charCode === 13 || charCode === 46) {
            return true;
        }

        // Permitir solo números (0-9)
        if (charCode < 48 || charCode > 57) {
            event.preventDefault();
            return false;
        }
    });

    $("#txtNroDeCuenta").on("keypress", function (event) {
        // Obtener el código de la tecla presionada
        let charCode = event.which || event.keyCode;

        // Permitir teclas de control como backspace y enter
        if (charCode === 8 || charCode === 13 || charCode === 46) {
            return true;
        }

        // Permitir solo números (0-9)
        if (charCode < 48 || charCode > 57) {
            event.preventDefault();
            return false;
        }
    });

    $("#txtNroDNI").on("keypress", function (event) {
        // Obtener el código de la tecla presionada
        let charCode = event.which || event.keyCode;

        // Permitir teclas de control como backspace y enter
        if (charCode === 8 || charCode === 13 || charCode === 46) {
            return true;
        }

        // Permitir solo números (0-9)
        if (charCode < 48 || charCode > 57) {
            event.preventDefault();
            return false;
        }
    });

    $("#btnBuscar").on("click", function () {
        /*if (
            $("#txtNroDeCuenta").val() ==
            "" 
        ) {
            toastr.error("Ingrese al menos un valor para la búsqueda");
            return false;
        }*/

        cargarEpicrisis();
        
    });
    
    $("#btnModificarAtenciones_hosp").on("click", async function () {
            $("#modulo").html("");

            listFilaAltaMedica
            console.log('333',listFilaAltaMedica);
            if(listFilaAltaMedica.length != 0){
                console.log('listFilaAltaMedica',listFilaAltaMedica)
                        if(listFilaAltaMedica.FechaAlta !== null){
                            Swal.fire({
                                title: "Registro con Alta Médica",
                                icon: "warning",
                                draggable: true,
                                timer: 1500
                            });
                            return false;
                        }else{
                            window.location = "../../HospitalizacionEvaluacion/"+listFilaAltaMedica.IdAtencion;

                        }
                    
            }else{
                        Swal.fire({
                            title: "Debe seleccionar una fila",
                            icon: "warning",
                            draggable: true,
                            timer: 1500
                        });
                    }
        });

<<<<<<< HEAD
        //====TRANSFERENCIAS================================
        $("#btnTransferencia_Hosp").on('click', async function () {
            if (listFilaAltaMedica.length != 0) {
                Epicrisis.LimpiarModalTransferencias();
                await Epicrisis.CargarTransferencia();

            }
            else {
                Swal.fire({
                    title: "Debe seleccionar una fila",
                    icon: "warning",
                    draggable: true,
                    timer: 1500
                });
            }
            




        });


        // $('#modalTransferenciasHosp').on('shown.bs.modal', function (event) {
        //     DTTransferencias.columns.adjust().draw();
        // });



        $("#btnCerrarTransferencias").on('click', function () {
            //Variables.Limpiar();
            Epicrisis.CerrarModalTransferencias();
        });

        $("#btnTransferenciaRecepcion").on('click', async function () {
            Epicrisis.LimpiarModalTransferencias();
            await Transferencias.CargarTransferenciaRecepcion();
        });

        $("#cboServicioRecibeTransferencia").on('change', async function () {
            var idServDest = $("#cboServicioRecibeTransferencia").val();
            await Epicrisis.ListarCamasDestinos(idServDest);
        });

=======
        $("#btnConsultarAtenciones").on("click", async function () {
            $("#modulo").html("");

            if(listFilaAltaMedica.length != 0){
                console.log('listFilaAltaMedica',listFilaAltaMedica)
                       if(listFilaAltaMedica.IdCamaActual == null  || listFilaAltaMedica.IdCamaActual == 0 ){
                        Swal.fire({
                            title: "El Paciente aún no se ha Recepcionado!",
                            icon: "warning",
                            draggable: true,
                            timer: 1500
                        });
                       }else{
                        window.location = "../../HospitalizacionEvaluacion/" + listFilaAltaMedica.IdAtencion + "?modo=consultar";

                       }

                    
            }else{
                        Swal.fire({
                            title: "Debe seleccionar una fila",
                            icon: "warning",
                            draggable: true,
                            timer: 1500
                        });
                    }
        });

          ///////////////////////CAMBIAR CAMAS/////////////////////////////
        $("#btnGuardarCamaActualTransferencia").on('click', async function () {
            console.log('1')
            await Epicrisis.ModificarCamaActual();
        });

        /////////////////////////////////////////////////

        //====TRANSFERENCIAS================================
       

        
>>>>>>> c43206bf175774a3bfc1e1fc1e2cd58a60d1e406
        //============ FIN TRANSFERENCIAS ==============
       

    $("#btnAltaMedica").on("click", function () {
        $("#step1").show();
        $("#step2").hide();
        if(listFilaAltaMedica.length == 0){
            Swal.fire({
                title: "Debe seleccionar una fila para ingresar",
                icon: "warning",
                draggable: true,
                timer: 1500
            });
        }
        else{
            idAtencion=0;
            idServicioActual=0;
            idCuentaAtencion=0;
            idPaciente = 0;
            let resultado = listFilaAltaMedica;
            idAtencion=resultado.IdAtencion;
            idServicioActual = resultado.IdServicioActual;
            idCuentaAtencion = resultado.IdCuentaAtencion;
            idPaciente = resultado.IdPaciente;
            fechaCierre = resultado.FechaCierre
            $("#fechaAdm").hide();
            $("#horaAdm").hide();
            if (idAtencion>0) {
                listarPacienteDiagnosticosIngresos(10,idAtencion);
                listarEpisodio(22,idPaciente);
                $("#txtNroCuenta")
                    .val(resultado.IdCuentaAtencion)
                    .prop("disabled", true);
                $("#txtPacienteEpicrisis")
                    .val(resultado.Paciente)
                    .prop("disabled", true);
                $("#txtNroCamaEpicrisis")
                    .val(resultado.NumeroCama)
                    .prop("disabled", true);
                $("#txtServicioActualEpicrisis")
                    .val(resultado.ServicioActual)
                    .prop("disabled", true);
                $("#txtDocumentoPaciente")
                    .val(resultado.NroDocumento)
                    .prop("disabled", true);
                $("#txtNroCuentaPaciente")
                    .val(resultado.IdCuentaAtencion)
                    .prop("disabled", true);
                $("#txtNroHistoriaPaciente")
                    .val(resultado.NroHistoriaClinica)
                    .prop("disabled", true);
                $("#txtAnamnesis")
                    .val(resultado.anamnesis);
                $("#txtExamenClinico")
                    .val(resultado.examenClinico)
                $("#txtExamenesAuxiliares")
                    .val(resultado.examenesAuxiliares);
                $("#txtEvolucion")
                    .val(resultado.evolucion);
                $("#cboDestinoAlta")
                    .val(resultado.IdDestinoAtencion);
                $("#cboTipoAlta")
                    .val(resultado.IdTipoAlta);   
                $("#cboCondicionAlta")
                    .val(resultado.IdCondicionAlta);
                $("#cboMedicoEgreso")
                    .val(medicoID);
                $("#cboTipoReferenciaAM")
                    .val(resultado.IdEstablecimientoOrigen)  
                $("#cboEstabMinsaReferenciaAM")
                    .val(resultado.IdTipoReferenciaOrigen);
                $("#txtDieta")
                    .val(resultado.Dieta)
                $("#txtActividadFisica")
                    .val(resultado.ActividadFisica);  
                $("#txtOtros")
                    .val(resultado.Otros);        
                if(resultado.FechaAlta != null){
                    $("#txtFechaAlta").val(resultado.FechaAlta);
                }   
                if(resultado.HoraAlta != null){
                    $("#txtHoraAlta").val(resultado.HoraAlta);
                }
                if(resultado.FechaEgresoAdministrativo != null){
                    $("#txtFechaAltaAdm").val(resultado.FechaEgresoAdministrativo);
                }   
                if(resultado.HoraEgresoAdministrativo != null){
                    $("#txtHoraAltaAdm").val(resultado.HoraEgresoAdministrativo);
                }    
                if(resultado.TieneNecropsia == 1){
                    $('#chkNecropsia').prop('checked', true);
                }
                else{
                    $('#chkNecropsia').prop('checked', false);
                }    
            }
            $('#cboDestinoAlta').trigger('change');
            $("#modalAltaMedicaHospitalizacion").modal("show");
        }        
    });
    // $("#btnTransferencia_Hosp").on("click", function () {

    //     if(listFilaAltaMedica.length == 0){
    //         Swal.fire({
    //             title: "Debe seleccionar una fila para ingresar",
    //             icon: "warning",
    //             draggable: true,
    //             timer: 1500
    //         });
    //     }
    //     else{
    //         Epicrisis.LimpiarModalTransferencias();
    //         await Epicrisis.CargarTransferencia();

    //         $("#modalTransferenciasHosp").modal("show");
    //     }        
    // });


    $("#cboTipoDiagnostico").on("change", function () {
        const valorSeleccionado = $(this).val();
        //listarCombosDiagnostico(3, valorSeleccionado);
    });

    $("#cboTipoDiagnosticoMuerte").on("change", function () {
        const valorSeleccionado = $(this).val();
    });

    $("#cboTipoDiagnosticoMuerteFetal").on("change", function () {
        const valorSeleccionado = $(this).val();
        //listarCombosDiagnosticoMuerte(15, valorSeleccionado);
    });



    $('#cboDestinoAlta').change(function() {
        console.log(listFilaAltaMedica);
        var destinoAtencionId = $(this).val();
        var valorTipoAlta = 0;
        var valorCondicionAlta = 0;
        let titulo="";
        $('#fechaAdm').hide();
        $("#horaAdm").hide();
        $('#regionReferencia').hide();
        if (destinoAtencionId == 21)
            valorTipoAlta = 6;
        if (destinoAtencionId == 22)
            valorTipoAlta = 5;
        if (destinoAtencionId == 31) {
            valorTipoAlta = 4;
            $('#regionReferencia').show();
            titulo ="Referencia";
            document.getElementById("TituloCardRefCon").innerHTML = titulo;
        }
        if(destinoAtencionId == 32){
            $('#regionReferencia').show();
            titulo ="Contrareferencia";
            document.getElementById("TituloCardRefCon").innerHTML = titulo;
        }
        if (destinoAtencionId == 33 || destinoAtencionId == 35) {
            valorTipoAlta = 3;
            valorCondicionAlta = 4;
        }
        if (destinoAtencionId == 34 || destinoAtencionId == 69 ){
            //$('#fechaAdm').show();
            //$("#horaAdm").show();
            valorTipoAlta=listFilaAltaMedica.IdTipoAlta;
            valorCondicionAlta=listFilaAltaMedica.IdCondicionAlta;
        }
            
        if(destinoAtencionId == 30){
            valorTipoAlta = 1;
            valorCondicionAlta = 2;
        }
        $('#cboTipoAlta').val(valorTipoAlta).trigger('chosen:updated');
        $('#cboCondicionAlta').val(valorCondicionAlta).trigger('chosen:updated');

        $('#cboCondicionAlta').change();
    });

    $('#cboCondicionAlta').change(function() {
        var tipoCondicionId = $(this).val();

        if (tipoCondicionId == 4) {
            $('#dxMortalidad-tab-link').show();
            //AltaMedica.DataTableDiagnosticosMortalidad();
        } else {
            // DtDiagnosticosMortalidad = null;
            //$('#tblDiagnosticosMortalidad').DataTable().clear().draw();
            $('#dxMortalidad-tab-link').hide();
        }

    });

    $('#tblEpicrisis tbody').on('click', '.btnVerEpicrisis',function () {        
            
        var table = $('#tblEpicrisis').DataTable();  
        var tr = $(this).closest('tr');  
        var rowData = table.row(tr).data();  
    
        if (rowData) {
            descargarPacienteEpicrisis(rowData);
        } else {
            console.error('No se encontraron datos en la fila seleccionada.');
        }
    });

    $('#tblEpicrisis tbody').on('click', '.btnVerPapeletaAlta',function () {        
            
        var table = $('#tblEpicrisis').DataTable();  
        var tr = $(this).closest('tr');  
        var rowData = table.row(tr).data();  
    
        if (rowData) {
            rowData.FechaEgreso = rowData.FechaAlta;
            descargarPapeletaAlta(rowData);

            //await Epicrisis.SeleccionarEvaluacionDetalle(rowData.IdAtencion, 0);
            //$("#modalInformeEvaluacionHospi").modal("show");
        } else {
            console.error('No se encontraron datos en la fila seleccionada.');
        }
    });

    $('#tblEpicrisis tbody').on('click', '.btnVerIndicacionesPacienteAlta',function () {        
            
        var table = $('#tblEpicrisis').DataTable();  
        var tr = $(this).closest('tr');  
        var rowData = table.row(tr).data();  
    
        if (rowData) {
            rowData.FechaEgreso = rowData.FechaAlta;
            descargarIndicacionesPacientesAlta(rowData);

            //await Epicrisis.SeleccionarEvaluacionDetalle(rowData.IdAtencion, 0);
            //$("#modalInformeEvaluacionHospi").modal("show");
        } else {
            console.error('No se encontraron datos en la fila seleccionada.');
        }
    });


    $("#btnExportarExcel").click(async function () {
        let titulo =
            "REPORTE DE HOSPITALIZACIÓN DEL " +
            $("#txtFechaEgreso").val() +
            " AL " +
            $("#txtFechaAtencionFinBuscar1").val();
    
        // ** Crear workbook y hoja de Excel**
        let workbook = new ExcelJS.Workbook();
        let worksheet = workbook.addWorksheet("Hospitalización");
    
        // ** Estilo para el título**
        worksheet.mergeCells("A1:M1"); // Fusionar celdas de A1 a M1
        let tituloCelda = worksheet.getCell("A1");
        tituloCelda.value = titulo;
        tituloCelda.font = { size: 14, bold: true, color: { argb: "FFFFFF" } };
        tituloCelda.alignment = { horizontal: "center", vertical: "middle" };
        tituloCelda.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "4472C4" } }; // Fondo azul

        let headers = [
            "N° Cuenta", "N° Doc", "Paciente", "Historia Clinica", "Fecha Nacimiento", "Fecha Ingreso",
            "Fecha Egreso","Fecha Evaluacion", "Serv. Actual", "Plan", "Tipo Numeración","Cama", "Fua"
        ];
    
        // ** Obtener la tabla HTML**
        let table = $("#tblEpicrisis").DataTable();

        let filas = table.rows().data().toArray(); // Solo filas del cuerpo
        //let headers = Array.from(tabla.querySelectorAll("thead th")).map(th => th.innerText.trim());
    
        // ** Insertar una fila vacía después del título**
        worksheet.addRow([]);
        // ** Insertar encabezados en la fila 3 con estilos**
        let headerRow = worksheet.addRow(headers);
        headerRow.eachCell(cell => {
            cell.font = { bold: true, color: { argb: "000000" } }; // Negrita y texto negro
            cell.alignment = { horizontal: "center", vertical: "middle" };
            cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "D9E1F2" } }; // Fondo celeste
            cell.border = { top: { style: "thin" }, bottom: { style: "thin" } };
        });
    

        let columnasDeseadas = [
            "IdCuentaAtencion", "NroDocumento", "Paciente", "NroHistoriaClinica", "FechaNacimiento",
            "FechaIngreso", "FechaEgreso", "FechaEvaluacion", "ServicioActual",
            "Descripcion", "TipoNumeracion","IdCamaEgreso", "Fua" 
        ]; // Asegúrate de que estos nombres coincidan con los de DataTables
        // ** Insertar los datos de la tabla desde la fila 4**
        filas.forEach(row => {
            let rowArray = columnasDeseadas.map(index => row[index]);
            worksheet.addRow(rowArray);
            /*let rowArray = Object.values(row); // Convierte objeto a arreglo
            console.log(worksheet);
            worksheet.addRow(rowArray);*/

        });
    
        // ** Ajustar ancho de columnas manualmente (para evitar anchos excesivos)**
        //worksheet.columns = headers.map(() => ({ width: 30 })); // Establece un ancho fijo de 15
    
        worksheet.columns = [
            { width: 10 },  // N° Cuenta
            { width: 12 },  // N° Doc
            { width: 40 },  // Paciente
            { width: 15 },  // Historia Clini
            { width: 15 },  // Fecha Nacimi
            { width: 20 },  // Fecha Ingreso
            { width: 20 },  // Fecha Ingreso
            { width: 20 },  // Fecha Egreso
            { width: 25 },  // Serv. Actual
            { width: 8 },   // Plan
            { width: 12 },  // Tipo Numeración
            { width: 8 },   // Cama
            { width: 10 },  // Fua
        ];


        // ** Guardar y descargar el archivo**
        let buffer = await workbook.xlsx.writeBuffer();
        let blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        let link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "reporte_hospitalizacion.xlsx";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    $("#btnRevertirAlta").on("click", function () {

        if(listFilaAltaMedica.length == 0){
            Swal.fire({
                title: "Debe seleccionar una fila para ingresar",
                icon: "warning",
                draggable: true,
                timer: 1500
            });
        }
        else{
            idAtencion=0;
            idServicioActual=0;
            idCuentaAtencion=0;
            idPaciente = 0;
            let resultado = listFilaAltaMedica;
            idAtencion=resultado.IdAtencion;
            idServicioActual = resultado.IdServicioActual;
            idCuentaAtencion = resultado.IdCuentaAtencion;
            idPaciente = resultado.IdPaciente;

            if (idAtencion>0) {
                $("#txtNroCuentaRevertirAlta")
                    .val(resultado.IdCuentaAtencion)
                    .prop("disabled", true);
                $("#txtPacienteRevertirAlta")
                    .val(resultado.Paciente)
                    .prop("disabled", true);
                $("#txtNroDocumentoRevertirAlta")
                    .val(resultado.NroDocumento)
                    .prop("disabled", true);
                $("#txtNroHistoriaClinicaRevertirAlta")
                    .val(resultado.NroHistoriaClinica)
                    .prop("disabled", true); 
                $("#txtEdadRevertirAlta")
                    .val(resultado.Edad)
                    .prop("disabled", true);        
            }
            $("#modalRevertirAlta").modal("show");
        }        
    });

    $("#btnCerrarModalRevertirAlta").on("click",function(){
        let $modal = $("#modalRevertirAlta");
        if (!$modal.hasClass("show")) return; // Si ya está oculto, no hacer nada
        
        $modal.modal("hide");
        $modal.on("hidden.bs.modal", function () {
            Epicrisis.LimpiarCampos();
        });
    });

    $("#btnGuardarModalRevertirAlta").on("click", function(){

        if(medicoID == 0){
            toastr.error("Para modificar el registro debe ser personal médico","Mensaje de error - RESYS");
            return false;  
        }

        const epicrisis = {};
        epicrisis.IdAtencion=idAtencion;idAtencion
        epicrisis.IdCuentaAtencion=idCuentaAtencion;
        epicrisis.Motivo = $("#txtMotivoRevertirAlta").val();
        RevertirAlta(epicrisis);
    });
    
    
});
