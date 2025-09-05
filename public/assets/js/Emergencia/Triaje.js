var Triaje = {
    ValidarBotonClick: 0, //0:consultar,modificar// 1: agregar// 2: admisionar
    Forzar: 0,
    ValidarDoc: 0, // 0: valida con la reniec // 1: no valida con la reniec porque valida con duplicidad

    Plugins() {
        $('#txtFechaTriajeBusq').datepicker({
            todayHighlight: true,
            autoclose: true,
            dateFormat: "dd/mm/yy",
            orientation: "bottom"
        });
        $('#FechaNacimiento').datepicker({
            todayHighlight: true,
            autoclose: true,
            dateFormat: "dd/mm/yy",
            orientation: "bottom"
        })
    },

    InitialCharge() {
        $("#btnLimpiar").trigger('click');
        let fechaP = Triaje.RetornarFechaActual();

        $("#txtFechaTriajeBusq").datepicker("setDate", fechaP);
        $("#btnBuscar").trigger('click');
    },

    RetornarFechaActual(){
        let fecha = new Date();
        let dia = fecha.getDate();
        let mes = parseInt(fecha.getMonth()) + 1;
        let yyy = fecha.getFullYear();
        if (dia < 10) dia = "0" + dia; //agrega cero si el menor de 10
        if (mes < 10) mes = "0" + mes;
        let fechaP = dia + "/" + mes + "/" + yyy;
        return  fechaP;
    },

    async ListarTriajeEmergenciaFiltrar(NroDocumento, apellidoPaterno, apellidoMaterno, IdServicio, Prioridad, FechaTriaje) {

        oTable_TriajeEmergencia.fnClearTable()

        await fetch(
                `/emergencia/ListarTriajeEmergenciaFiltrar?NroDocumento=${NroDocumento}&apellidoPaterno=${apellidoPaterno}&apellidoMaterno=${apellidoMaterno}&IdServicio=${IdServicio}&Prioridad=${Prioridad}&FechaTriaje=${FechaTriaje}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((res) => res.json())
            .catch((error) => console.log(error))
            .then((res) => {
                oTable_TriajeEmergencia.fnClearTable()
                if (res.resultado == 1) {
                    if (res.data.length > 0) {
                        oTable_TriajeEmergencia.fnAddData(res.data);
                    }
                }
            });
    },

    GuardarTriajeHospEmeg(idAtencion, idServicio, idEvaluacion) {
        var formData = new FormData();

        presion = $("#txtPA").val() + "/" + $("#txtPAD").val()
        formData.append("TriajePresion", presion);
        formData.append("TriajeTemperatura", $("#txtT").val());
        formData.append("TriajeFrecRespiratoria", $("#txtFr").val());
        formData.append("TriajeFrecCardiaca", $("#txtFc").val());
        formData.append("TriajePeso", $("#txtPeso").val());
        formData.append("TriajeTalla", $("#txtTalla").val());
        formData.append("TriajeSaturacionOxigeno", $("#txtSO").val());

        formData.append("idServicio", idServicio);
        formData.append("idNumero", idEvaluacion);
        formData.append("idAtencion", idAtencion);

        Cargando(1);

        HttpClient.Post('/Atencion/ModificarTriajeEmgHosp?area=ConsultaExterna', formData)
            .then((res) => {
                $("#txtPA").val("");
                $("#txtT").val("");
                $("#txtFr").val("");
                $("#txtFc").val("");
                $("#txtPeso").val("");
                $("#txtTalla").val("");
                $("#txtImc").val("");
                $("#txtPAD").val("");
                $("#txtPC").val("");
                $("#txtSO").val("");

                Cargando(0);
            })
            .catch(e => {
                alerta("ERROR", "Error guardar triaje! " + e, "2");
                Cargando(0);
            })
    },

    async buscapaciente(IdDocIdentidad, NroDocumento) {
        jQuery.ajax({
            url: "/ws/emergencia/buscar_paciente_triaje",
            async: false,
            dataType: 'json',
            data: { IdDocIdentidad: IdDocIdentidad, NroDocumento: NroDocumento },
            method: "get",
            success: function(res) {
                if (res.resultado == 1) {
                    $("#paciente_nuevo").val(res.datos["paciente_nuevo"]);
                    $("#IdPacienteTriaje").val(res.datos["IdpacienteTriaje"]);
                    $("#IdPaciente").val(res.datos["IdPaciente"]);
                    $("#ApellidoPaterno").val(res.datos["ApellidoPaterno"]);
                    $("#ApellidoPaterno_text").val(res.datos["ApellidoPaterno"]);
                    $("#ApellidoMaterno").val(res.datos["ApellidoMaterno"]);
                    $("#ApellidoMaterno_text").val(res.datos["ApellidoMaterno"]);
                    $("#Nombres").val(res.datos["PrimerNombre"]);
                    $("#Nombres_text").val(res.datos["PrimerNombre"]);
                    $("#FechaNacimiento").val((new Date(res.datos["FechaNacimiento"] + "T00:00:00")).toLocaleDateString('en-GB'));
                    $("#FechaNacimiento_text").val((new Date(res.datos["FechaNacimiento"] + "T00:00:00")).toLocaleDateString('en-GB'));
                    $("#IdTipoSexo").val(res.datos["IdTipoSexo"]);
                    $("#IdPaisNacimiento").val(res.datos["IdNacionalidad"]);
                    $("#UbigeoReniecNacimiento").val(res.datos["UbigeoReniecNacimiento"]);
                    $("#UbigeoReniecDomicilio").val(res.datos["UbigeoReniecDomicilio"]);
                    $("#DireccionDomicilio").val(res.datos["DireccionDomicilio"]);
                    $("#UsoWebReniec").val(res.datos["UsoWebReniec"]);
                    $("#Telefono").val(res.datos["Telefono"]);
                    $("#IdEstadoCivil").val(res.datos["IdEstadoCivil"]);
                    $("#IdReligion").val(res.datos["IdReligion"]);
                    if(parseInt(res.datos["NroHistoriaClinica"]) > 0){
                        $("#lblNroHistoria").show();
                        $("#lblNroHistoria").removeClass();
                        $("#lblNroHistoria").addClass("chip primary");
                        $("#lblNroHistoria").html("HC: " + res.datos["NroHistoriaClinica"]);
                    } else {
                        $("#lblNroHistoria").show();
                        $("#lblNroHistoria").removeClass();
                        $("#lblNroHistoria").addClass("chip secondary");
                        $("#lblNroHistoria").html("HC: Sin Historia");
                    }
                } else {
                    toastr.error(res.mensaje);
                    $("#paciente_nuevo").val('1');

                    if (IdDocIdentidad == 1) {
                        $("#DocPaciente").val('');
                        //$("#DocPaciente_text").val('');
                    }
                }
            }
        });
    },

    async seleccionaPaciente(IdPaciente) {
        jQuery.ajax({
            url: "/ws/emergencia/seleccionar_paciente_triaje",
            async: false,
            dataType: 'json',
            data: { IdPaciente: IdPaciente },
            method: "get",
            success: function(res) {
                if (res.resultado == 1) {
                    $("#paciente_nuevo").val(res.datos["paciente_nuevo"]);
                    $("#IdPacienteTriaje").val(res.datos["IdpacienteTriaje"]);
                    $("#IdPaciente").val(res.datos["IdPaciente"]);
                    $("#ApellidoPaterno").val(res.datos["ApellidoPaterno"]);
                    $("#ApellidoPaterno_text").val(res.datos["ApellidoPaterno"]);
                    $("#ApellidoMaterno").val(res.datos["ApellidoMaterno"]);
                    $("#ApellidoMaterno_text").val(res.datos["ApellidoMaterno"]);
                    $("#Nombres").val(res.datos["PrimerNombre"]);
                    $("#Nombres_text").val(res.datos["PrimerNombre"]);
                    $("#FechaNacimiento").val((new Date(res.datos["FechaNacimiento"] + "T00:00:00")).toLocaleDateString('en-GB'));
                    $("#FechaNacimiento_text").val((new Date(res.datos["FechaNacimiento"] + "T00:00:00")).toLocaleDateString('en-GB'));
                    $("#IdTipoSexo").val(res.datos["IdTipoSexo"]);
                    $("#IdPaisNacimiento").val(res.datos["IdNacionalidad"]);
                    $("#UbigeoReniecNacimiento").val(res.datos["UbigeoReniecNacimiento"]);
                    $("#UbigeoReniecDomicilio").val(res.datos["UbigeoReniecDomicilio"]);
                    $("#DireccionDomicilio").val(res.datos["DireccionDomicilio"]);
                    $("#UsoWebReniec").val(res.datos["UsoWebReniec"]);
                    $("#Telefono").val(res.datos["Telefono"]);
                    $("#IdEstadoCivil").val(res.datos["IdEstadoCivil"]);
                    $("#IdReligion").val(res.datos["IdReligion"]);
                    if(parseInt(res.datos["NroHistoriaClinica"]) > 0){
                        $("#lblNroHistoria").show();
                        $("#lblNroHistoria").removeClass();
                        $("#lblNroHistoria").addClass("chip primary");
                        $("#lblNroHistoria").html("HC: " + res.datos["NroHistoriaClinica"]);
                    } else {
                        $("#lblNroHistoria").show();
                        $("#lblNroHistoria").removeClass();
                        $("#lblNroHistoria").addClass("chip secondary");
                        $("#lblNroHistoria").html("HC: Sin Historia");
                    }
                } else {
                    toastr.error(res.mensaje);
                    $("#paciente_nuevo").val('1');

                    if (IdDocIdentidad == 1) {
                        $("#DocPaciente").val('');
                        //$("#DocPaciente_text").val('');
                    }  
                }
            }
        });
    },

    InsertaOModificaOAdmisionaTriajeEmergencia(midata, idForm) {
        presion = $("#txtPA").val() + "/" + $("#txtPAD").val()

        if ($("#chkNoIdentificado").is(":checked")) {
            midata.append("nn", 1);
            midata.append("IdDocIdentidad", '11');
            // midata.append("paciente_nuevo", 1);
        } else {
            midata.append("nn", 0);
        }
        
        midata.append("Forzar", Triaje.Forzar);
        midata.append("TriajePA", presion);
        midata.append('_token', $('[name="_token"]').val());
    
        // Seleccionamos la URL según la acción
        console.log('contenido de formulario',midata);
        let url = '/emergencia/rs_actualiza_triaje_emergencia';
        if (Triaje.ValidarBotonClick === 1) {
            url = '/emergencia/rs_crea_triaje_emergencia';
        } else if (Triaje.ValidarBotonClick === 2) {
            url = '/emergencia/CreaAdmisionDesdeTriaje';
        }
    
        // Realizamos la solicitud AJAX con async: true
        $.ajax({
            url: url,
            datatype: "json",
            data: midata,
            type: "post",
            processData: false,
            contentType: false,
            async: false,
            success: function(res) {
                console.log('frecuencia pacie',res);
                if (res.resultado == 1) {
                    Triaje.LimpiarCampos();
                    toastr.success(res.mensaje);
                    let fechaPrimerDia = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
                    .toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
            
                    if(res.FrecPaciente >=4){
                        Swal.fire({
                            title: 'Alert',
                            html: 'El Paciente tiene <b>' + res.FrecPaciente + '</b> atenciones desde <br>'+fechaPrimerDia+'</br>.',
                            icon: 'warning',
                            confirmButtonText: 'Aceptar'
                        });

                    }
                    if (Triaje.ValidarBotonClick == 2) {
                        let formatos = res.IdTipoFinanciamiento == 2 ? [1] : [2];
                        VisorDocumento.AbrirVisorDocumentos(res.IdCuentaAtencion, res.IdAtencion, formatos);
                    }
                    $('.bloquear-campo').attr('readonly', false); //PGONZALESC
                    $('#modalTriaje').modal('hide')
                    Triaje.InitialCharge()
<<<<<<< HEAD
                } else {
                    // if (res.resultado == 5) {           //POsible duplicidad de datos
                    //     Triaje.DuplicidadPacienteModal(idForm)
                    //     return false;
                    // } else {
                    //     toastr.error("ERROR", res.mensaje);
                    //     if (res.resultado == 3)
                    //         location.reload();
                    // }             
=======
                } else{
                    if(res.resultado == 2){
                       if(res.mensaje == 'Posible duplicidad de Datos. Si desea guardar envie el parametro Forzar=1.'){
                           Triaje.Forzar = 1;
                         $('#formulario_triaje').submit()
                         return false;
                       }
                      
                        toastr.error(res.mensaje)
					}
>>>>>>> c43206bf175774a3bfc1e1fc1e2cd58a60d1e406
                }
            },
            error: function(msg) {
                console.log("error:", msg)
                let message = "";
                if(msg['responseJSON']['message'])
                    message = msg['responseJSON']['message'];
                let text_error = "Error al guardar triaje! "
                if (Triaje.ValidarBotonClick == 2)
                    text_error = "Error al guardar admisión! "

                toastr.error(text_error+message,"ERROR");
            }
        });
    },

    EliminarTriaje(IdTriajeEmergencia) {
        $.ajax({
            url: "/emergencia/EliminarTriaje?IdTriajeEmergencia=" + IdTriajeEmergencia,
            datatype: "json",
            type: "get",
            async: false,
            success: function(res) {
                if (res.resultado == 1) {
                    toastr.success(res.mensaje);
                    Triaje.InitialCharge()
                } else {
                    toastr.error(res.mensaje);
                    if (res.resultado == 3)
                        location.reload();
                }
            },
            error: function(msg) {
                let message = "";
                if(msg['responseJSON']['message'])
                    message = msg['responseJSON']['message'];
                console.log(msg)
                toastr.error("ERROR", "Error al eliminar el triaje! "+message);
            }
        });
    },

    BuscarSiEstaHospitalizado(IdPaciente) {
        $.ajax({
            url: "/emergencia/BuscarSiEstaHospitalizado?IdPaciente=" + IdPaciente,
            datatype: "json",
            type: "get",
            async: false,
            success: function(res) {
                if (res.resultado == 1) {                    
                    if(res.data[0].resultado == 1){
                        $("#btnguardarTriaje").hide();
                        var mensaje = res.data[0].mensaje.split('<br>');
                        if(res.data[0].tipoAccion == 0){                            
                            
                            alerta("warning","", mensaje[0] + '\n' + mensaje[1] + '\n' + mensaje[2]);
                        } else if(res.data[0].tipoAccion == 1 && res.data[0].idTipoServicio == 1){
                            Swal.fire({
                                title: "",
                                text: mensaje[0] + '\n' + mensaje[1] + '\n' + mensaje[2],
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#ccc",
                                confirmButtonText: "Confirmar"
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    Triaje.CerrarCuenta(res.data[0].idCuentaAtencion);
                                    Triaje.LimpiarCampos();
                                    $("#modalTriaje").modal("hide");
                                }
                            });
                        } else if(res.data[0].tipoAccion == 1 && (res.data[0].idTipoServicio == 2 || res.data[0].idTipoServicio == 4)){
                            Swal.fire({
                                title: "",
                                text: mensaje[0] + '\n' + mensaje[1] + '\n' + mensaje[2],
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#ccc",
                                confirmButtonText: "Confirmar"
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    $("#btnguardarTriaje").show();
                                }
                            });
                        }
                       
                    }
                    return true
                } else {
                    toastr.error(res.mensaje);
                    if (res.resultado == 3)
                        location.reload();
                }
            },
            error: function(msg) {
                console.log(msg)
                toastr.error("ERROR", "Error al eliminar el triaje!");
            }
        });
    },

    CerrarCuenta(idCuenta){
        console.log('idcuenta',idCuenta);
        $.ajax({
            url: "/emergencia/CerrarCuentaAtencion?IdCuenta=" + idCuenta,
            datatype: "json",
            type: "get",
            async: false,
            success: function(res) {
                if (res.resultado == 1) {                    
                    alerta("success", "", "La cuenta " + idCuenta + " se ha cerrado correctamente.");                    
                } else {
                    toastr.error(res.mensaje);
                    if (res.resultado == 3)
                        location.reload();
                }
            },
            error: function(msg) {
                console.log(msg)
                toastr.error("ERROR", "Error al eliminar el triaje!");
            }
        });
    },

    listaTriaje(IdTriajeEmergencia, tipo) {

        $.ajax({
            url: "/emergencia/TriajeEmergSeleccionarPorId?IdTriajeEmergencia=" + IdTriajeEmergencia + "&Admisionar=" + Triaje.ValidarBotonClick,
            datatype: "json",
            type: "get",
            async: false,
            success: function(res) {
                if (res.resultado == 1) {
                    $("#IdEstadoCivil").val(res.data.IdEstadoCivil);
                    $("#IdReligion").val(res.data.IdReligion);
                    $("#IdGradoInstruccion").val(res.data.IdGradoInstruccion);
                    $("#IdTipoOcupacion").val(res.data.IdTipoOcupacion);
                    $("#Telefono").val(res.data.Telefono);
                    $("#DireccionDomicilio").val(res.data.DireccionDomicilio);
                    $("#tiene_sis").text(res.data.tiene_sis);
                    //cuando se presiona admisionar
                    if (res.data.tiene_sis == "Si tiene SIS") {
                        buscaFuenteFinanciamiento(2);
                    } else {
                        buscaFuenteFinanciamiento();
                    }

                    let TriajePA = res.data.TriajePA
                    if (!(TriajePA == null)) {
                        presionSep = TriajePA.split("/");

                        $("#txtPA").val(presionSep[0]);
                        $("#txtPAD").val(presionSep[1]);
                    } else {
                        $("#txtPA").val("");
                        $("#txtPAD").val("");
                    }

                    $("#TriajeTEM").val(res.data.TriajeTEM);

                    if (res.data.TriajeFR == 0) {
                        $("#TriajeFR").val("");
                    } else {
                        $("#TriajeFR").val(res.data.TriajeFR);
                    }

                    if (res.data.TriajeFC == 0) {
                        $("#TriajeFC").val("");
                    } else {
                        $("#TriajeFC").val(res.data.TriajeFC);
                    }
                    console.log(res.data.IdDocIdentidad,'gfdfg')
                    if (res.data.NroDocumento == null) {
                        $("#chkNoIdentificado").prop('checked', true);
                    } else {
                        $("#chkNoIdentificado").prop('checked', false);
                    }

                    $(".no-identificado").attr('disabled', true);
                    $(".no-identificado").prop('required', false);

                    $("#TriajeFIO2").val(res.data.TriajeFIO2);
                    $("#Hemoglucotest").val(res.data.Hemoglucotest);
                    $("#TriajeSAT").val(res.data.TriajeSAT);

                    $("#IdDocIdentidad").val(res.data.IdDocIdentidad);
                    //$("#IdDocIdentidad_text").val(res.data.IdDocIdentidad);
                    $("#DocPaciente").val(res.data.NroDocumento);
                    //$("#DocPaciente_text").val(res.data.NroDocumento);
                    $("#ApellidoPaterno").val(res.data.ApellidoPaterno);
                    $("#ApellidoPaterno_text").val(res.data.ApellidoPaterno);
                    $("#ApellidoMaterno").val(res.data.ApellidoMaterno);
                    $("#ApellidoMaterno_text").val(res.data.ApellidoMaterno);
                    $("#Nombres").val(res.data.PrimerNombre);
                    $("#Nombres_text").val(res.data.PrimerNombre);
                    $("#FechaNacimiento").val(res.data.FechaNacimiento);
                    $("#FechaNacimiento_text").val(res.data.FechaNacimiento);
                    $("#IdTipoSexo").val(res.data.IdTipoSexo);
                    $("#IdPaisNacimiento").val(res.data.IdNacionalidad);
                    $("#IdMotivoAtencionEmergencia").val(res.data.IdMotivoAtencionEmergencia);
                    $("#DetalleMotivoEmergencia").val(res.data.DetalleMotivoEmergencia);
                    $("#IdTiposGravedadAtencion").val(res.data.IdTiposGravedadAtencion);
                    $("#TiempoSintoma").val(res.data.TiempoSintoma);
                    $("#IdTiempoSintoma").val(res.data.IdTiempoSintoma);
                    $("#IdServicio").val(res.data.IdServicio);

                    //hidden
                    $("#IdTriajeEmergencia").val(res.data.IdTriajeEmergencia);
                    $("#IdPacienteTriaje").val(res.data.IdPacienteTriaje);
                    $("#UbigeoReniecDomicilio").val(res.data.UbigeoReniecDomicilio);
                    $("#UsoWebReniec").val(res.data.UsoWebReniec);
                    $('#IdPaciente').val(res.data.IdPaciente);
                        // Triaje.validarRango();
                    
                    if(res.data.IdPaciente > 0){
                        $('#paciente_nuevo').val(2);
                    } else {
                        $('#paciente_nuevo').val(1);
                    }

                    if ((tipo == 2 && res.data.NroDocumento != null)) {
                        $("#chkNoIdentificado").prop('disabled', true);
                    }

                    $(".chzn-select").trigger("chosen:updated");
                } else {
                    toastr.error("ERROR", res.mensaje);
                    if (res.resultado == 3)
                        location.reload();
                }
            },
            error: function(msg) {
                toastr.error("ERROR", "Error listar triaje!");
            }
        });
    },

    calculaImc(peso, talla) {

        peso = peso = "" ? 0 : peso
        talla = talla = "" ? 0 : talla

        m = talla * 0.01
        imc = peso / (m * m)
            //imc = peso / (1000)
        imc = Math.round(imc);
        if (isNaN(imc) || (imc == "Infinity")) {
            imc = 0
        } else {
            imc = imc
        }

        return imc
    },

    CalcularIMC(peso, talla) {

        var imc = peso / (Math.pow((talla / 100), 2))
        imc = Math.round(imc * 100) / 100;

        return imc
    },

    InitDatablesTriajeEmergencia() {
        var parms = {
            destroy: true,
            bFilter: false,
            order: [
                [0, 'desc']
            ],
            scrollX: true,
            columns: [{
                    width: "5%",
                    data: "IdTriajeEmergencia",
                    createdCell: function(td, cellData, rowData, row, col) {
                        $(td).attr('style', 'display:none')
                    }
                },
                {
                    width: "5%",
                    data: "NroDocumento",
                    createdCell: function(td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                {
                    width: "15%",
                    data: "Paciente",
                    createdCell: function(td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                {
                    width: "20%",
                    data: "MotivoAtencion",
                    createdCell: function(td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                {
                    width: "10%",
                    data: "dFechaTriaje",
                    createdCell: function(td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                {
                    width: "10%",
                    data: "Servicio",
                    createdCell: function(td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                {
                    width: "15%",
                    data: null,
                    createdCell: function(td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                        if (rowData.IdTipoGravedad == "4") {
                            $(td).html(
                                '<span class="chip orange">' +
                                rowData.Prioridad +
                                "</span >"
                            );
                        }
                        if (rowData.IdTipoGravedad == "2") {
                            $(td).html(
                                '<span class="chip success">' +
                                rowData.Prioridad +
                                "</span >"
                            );
                        }
                        if (rowData.IdTipoGravedad == "3") {
                            $(td).html(
                                '<span class="chip yellow">' +
                                rowData.Prioridad +
                                "</span >"
                            );
                        }
                        if (rowData.IdTipoGravedad == "5") {
                            $(td).html(
                                '<span class="chip danger">' +
                                rowData.Prioridad +
                                "</span >"
                            );
                        }
                        if (rowData.IdTipoGravedad == "6" || rowData.IdTipoGravedad == "1") {
                            $(td).html(
                                '<span class="chip secondary">' +
                                rowData.Prioridad +
                                "</span >"
                            );
                        }
                    }
                },
                {
                    width: "8%",
                    data: "TiempoEstancia",
                    createdCell: function(td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                }
            ]
        }

        oTable_TriajeEmergencia = $("#tblTriajeEmergencia").dataTable(parms);
    },

    InitDataTablePacientes() {
        var parms = {
            "paging": true,
            "ordering": true,
            "info": false,
            bFilter: false,
            responsive: true,
            autoWidth: true,
            columns: [{
                    targets: 1,
                    width: '5%',
                    data: "TipoDoc",
                    createdCell: function(td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')

                    }
                },
                {
                    targets: 1,
                    width: '5%',
                    data: "NroDocumento",
                    createdCell: function(td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')

                    }
                },
                {
                    targets: 2,
                    width: '10%',
                    data: "ApellidoPaterno",
                    createdCell: function(td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },

                {
                    targets: 3,
                    width: '10%',
                    data: "ApellidoMaterno",
                    createdCell: function(td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')

                    }
                },
                {
                    targets: 4,
                    width: '10%',
                    data: "PrimerNombre",
                    createdCell: function(td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')

                    }
                },
            ]
        }
        oTable_DuplicidadPacientes = $("#tblDuplicidadPacientes").dataTable(parms);
    },
    InitDataTableObservacionPaciente() {
        var parms = {
            "paging": false,
            "ordering": true,
            "info": false,
            bFilter: false,
            responsive: true,
            autoWidth: true,
            columns: [
				{
                    targets: 1,
                    width: '20%',
                    data: "Paciente",
                    createdCell: function(td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                {
                    targets: 1,
                    width: '5%',
                    data: "NroDocumento",
                    createdCell: function(td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                {
                    targets: 2,
                    width: '10%',
                    data: "NroHistoriaClinica",
                    createdCell: function(td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                {
                    targets: 3,
                    width: '10%',
                    data: "TriajeObserv",
                    createdCell: function(td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                {
                    targets: 3,
                    width: '5%',
                    data: "Hemoglucotest",
                    createdCell: function(td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                {
                    targets: 3,
                    width: '5%',
                    data: "FechaTriaje",
                    createdCell: function(td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                
            ]
        }
        oTable_ObservacionTriaje= $("#tblObservacionPacientes").dataTable(parms);
    },

    DuplicidadPacienteModal(id) {
        oTable_DuplicidadPacientes.fnClearTable();

        $.ajax({
            url: "/emergencia/DuplicidadPaciente?IdDocIdentidad=" + $("#IdDocIdentidad").val() +
                "&NroDocumento=" + $("#DocPaciente").val() +
                "&ApellidoPaterno=" + $("#ApellidoPaterno").val() +
                "&ApellidoMaterno=" + $("#ApellidoMaterno").val() +
                "&Nombres=" + $("#Nombres").val() +
                "&FechaNacimiento=" + $("#FechaNacimiento").val(),
            datatype: "json",
            type: "get",
            async: false,
            success: function(res) {
                console.log('res.resultado', res.resultado);
                console.log('res.mensaje', res.mensaje);
                if (res.resultado == 1) {
                    toastr.warning(res.mensaje);
                    $('#modalDuplicidadPaciente').modal('show')
                    oTable_DuplicidadPacientes.fnAddData(res.data);
                } else if (res.resultado == 2) {
                    Triaje.Forzar = 1;

                    $(id).submit()
                } else if (res.resultado == 3) {
                    toastr.error(res.mensaje);
                    location.reload();
                }
            },
            error: function(msg) {
                console.log(msg)
                toastr.error("ERROR", "Error al consultar lista de pacientes con duplicidad!");
            }
        });
    },

    AgregarDuplicidadPaciente() {

        var objrow = oTable_DuplicidadPacientes.api(true).row('.selected').data();

        if (isEmpty(objrow)) {
            toastr.warning("Debe seleccionar un paciente");
            return false;
        }
        Triaje.ValidarDoc = 1;

        $('#IdDocIdentidad').val(objrow.IdDocIdentidad);
        //$('#IdDocIdentidad_text').val(objrow.IdDocIdentidad);
        $('#DocPaciente').val(objrow.NroDocumento);
        //$('#DocPaciente_text').val(objrow.NroDocumento);
        $('#ApellidoPaterno').val(objrow.ApellidoPaterno);
        $('#ApellidoPaterno_text').val(objrow.ApellidoPaterno);
        $('#ApellidoMaterno').val(objrow.ApellidoMaterno);
        $('#ApellidoMaterno_text').val(objrow.ApellidoMaterno);
        $('#Nombres').val(objrow.PrimerNombre);
        $('#Nombres_text').val(objrow.PrimerNombre);
        $('#FechaNacimiento').val(objrow.FechNacimiento);
        $('#FechaNacimiento_text').val(objrow.FechNacimiento);
        $('#IdTipoSexo').val(objrow.IdTipoSexo);
        $('#IdPaisNacimiento').val(objrow.IdNacionalidad);
        $('#IdEstadoCivil').val(objrow.IdEstadoCivil);
        $('#UbigeoReniecDomicilio').val(objrow.UbigeoReniecDomicilio);
        $('#DireccionDomicilio').val(objrow.DireccionDomicilio);
        $('#Telefono').val(objrow.Telefono);
        $('#IdReligion').val(objrow.IdReligion);
        $('#paciente_nuevo').val(2);
        $('#UsoWebReniec').val(objrow.UsoWebReniec);
        $('#IdPacienteTriaje').val(objrow.IdpacienteTriaje);
        $('#IdPaciente').val(objrow.IdPaciente);
        $('#UbigeoReniecNacimiento').val(objrow.UbigeoReniecNacimiento);
        $('#UsoWebReniec').val(objrow.UsoWebReniec);

        Triaje.seleccionaPaciente($("#IdPaciente").val());

        $(".chzn-select").trigger("chosen:updated");
        $("#modalDuplicidadPaciente").modal("hide");
    },

    eventos() {
        $('.search').keypress(function (e) {
            if (e.which == 13) {
                e.preventDefault();
                $('.search').blur();
                $("#btnBuscarAtencionesEmergencia").click();
            }
        });

        $("#DocPaciente").blur(function() {
            if ($(this).val().trim().length > 7 && Triaje.ValidarDoc == 0)
                Triaje.buscapaciente($("#IdDocIdentidad").val(), $(this).val());
        });

        $("#IdDocIdentidad").on("change", function(){
            if($(this).val()==1){
                $("#DocPaciente").attr("maxlength",8)
                //$("#DocPaciente_text").attr("maxlength",8)
                $("#DocPaciente").val(document.getElementById("DocPaciente").value.substring(0,8))
                //$("#DocPaciente_text").val(document.getElementById("DocPaciente_text").value.substring(0,8))
            }
            else
                $("#DocPaciente").attr("maxlength",20)
        })

        $('#chkTodoTriajeBusq').on('click', function() {
            if($('#chkTodoTriajeBusq').is(':checked')){
                $("#txtServicioBusq").val('');
                $("#txtPrioridadBusq").val('');
                $("#txtFechaTriajeBusq").val('');
            } else {
                let fechaP = Triaje.RetornarFechaActual();
                $("#txtFechaTriajeBusq").datepicker("setDate", fechaP);
            }
        })

        $('#btnBuscarCuentaPaciente').on('click', function() {
            Triaje.LimpiarCampos()
            $('#modalBuscarPaciente').modal('show')
        })

        $("#txtPA").on("change", function() {
            if (90 > $(this).val() || $(this).val() > 140) {

                $(this).css('color', 'red');
            } else {
                $(this).css('color', 'black');
            }
        });

        $("#txtPAD").on("change", function() {
            if (50 > $(this).val() || $(this).val() > 140) {

                $(this).css('color', 'red');
            } else {
                $(this).css('color', 'black');
            }
        });

        $("#TriajeFC").on("change", function() {
            if (60 > $(this).val() || $(this).val() > 90) {

                $(this).css('color', 'red');
            } else {
                $(this).css('color', 'black');
            }
        });

        $("#TriajeFR").on("change", function() {
            if (12 > $(this).val() || $(this).val() > 20) {

                $(this).css('color', 'red');
            } else {
                $(this).css('color', 'black');
            }
        });

        $("#TriajeTEM").on("input", function() {
            if ($("#TriajeTEM").val().length>1 && (36 > $(this).val() || $(this).val() > 37)) {
                let valorTemIni = "36 - 37(°C)"
                let valorTem= "FIEBRE!!"
                if(36 > $(this).val())
                    valorTem= "HIPOTERMIA!!"
                $("#valorTriajeTEM").text(valorTemIni+ " - "+valorTem)
                $(this).css('color', 'red');
            }
            else {
                $(this).css('color', 'black');
                $("#valorTriajeTEM").text("36 - 37(°C)")
            }
        });

        $("#TriajeSAT").on("change", function() {
            if (95 > $(this).val() || $(this).val() > 100) {

                $(this).css('color', 'red');
            } else {
                $(this).css('color', 'black');
            }
        });

        $('#btnBuscar').on('click', function() {
            if ($('#txtNroNroDocBusq').val() == '' && $('#txtApPaternoBusq').val() == '' && $('#txtApMaternoBusq').val() == '' && $('#txtServicioBusq').val() == '' && $('#txtPrioridadBusq').val() == '' && $('#txtFechaTriajeBusq').val() == '') {
                toastr.error('Ingrese al menos un valor para la búsqueda')
                return false
            }
            Triaje.ListarTriajeEmergenciaFiltrar($("#txtNroNroDocBusq").val(), $("#txtApPaternoBusq").val(), $("#txtApMaternoBusq").val(), $("#txtServicioBusq").val(), $("#txtPrioridadBusq").val(), $("#txtFechaTriajeBusq").val())
        })
<<<<<<< HEAD
=======
        $('#btnHistorialObserv').on('click', function (e) {
            e.preventDefault(); 
            oTable_ObservacionTriaje.fnClearTable();
          let idpaciente=$('#IdPaciente').val();
          console.log('idpaciente',idpaciente);
            $.ajax({
                url: "/Triaje/HistorialObservaciones",
                dataType: "json",
                data: {
                    idPaciente:idpaciente
                },
                type: "post",
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                success: function(res) {
                    console.log('frecuencia pacie',res);
                    if(res.data && res.data.length > 0){ 
                        $('#modalObservacionTriaje').modal('show')
                        oTable_ObservacionTriaje.fnAddData(res.data);
                    }else{
                        alerta("Warning", "NO SE ENCONTRARON DATOS " , );
                    }
                
                },
                error: function(msg) {
                    let message = msg?.responseJSON?.message || '';
                    let textError = Triaje.ValidarBotonClick === 2 ? "Error al guardar admisión! " : "Error al guardar triaje! ";
                    toastr.error(textError + message, "ERROR");
                }
            });
        });
        
>>>>>>> c43206bf175774a3bfc1e1fc1e2cd58a60d1e406

        // $('#btnguardarTriaje').on('click', function () {
        $('#formulario_triaje').on('submit', function(e) {
            e.preventDefault();
<<<<<<< HEAD
            if ($('#paciente_nuevo').val() == 1 && Triaje.Forzar == 0 && Triaje.ValidarDoc == 0) {
=======
            if($('#paciente_nuevo').val()==1 && Triaje.Forzar==0 && Triaje.ValidarDoc==0) {
>>>>>>> c43206bf175774a3bfc1e1fc1e2cd58a60d1e406
                Triaje.DuplicidadPacienteModal('#formulario_triaje')

                return false;
            }
            // Triaje.ValidarPacienteFrecuente()

            const formData = new FormData(this);
            try {
                // Verifica si hay que actualizar datos del paciente
                if ($('#h_ActualizarDatosPaciente').val() === '1') {
                    // Espera a que se complete la actualización de los datos del paciente
                    Triaje.actualizarDatosPacienteSIS(formData);
                }
        
                // Si todo salió bien, ejecuta la siguiente función
                Triaje.InsertaOModificaOAdmisionaTriajeEmergencia(formData, '#formulario_triaje');
        
                // Opcional: Mensaje de éxito general
               
            } catch (error) {
                // Manejo de errores
                console.error('Error en el proceso:', error);
                Swal.fire('Error', 'Ocurrió un error durante el proceso.', 'error');
            }
        });

        $('#btnAgregar').on('click', function() {
            Triaje.LimpiarCampos()
            Triaje.ValidarBotonClick = 1;

            $('.admision').hide()
            $('.RegistroTriajeContenedor').show()
            $("#modalLabel_modalTriaje").text("Registro de Triaje")
            $('.RegistroAdmisionContenedor').hide()

            $('#modalTriaje').modal('show')
        })

        $('#btnModificar').on('click', function() {
            Triaje.ValidarBotonClick = 0;
            let objRowTriaje = oTable_TriajeEmergencia.api(true).row('.selected').data()

            if (isEmpty(objRowTriaje)) {
                toastr.error('Selecciona un registro')
                return false
            }
            Triaje.LimpiarCampos()

            $('.admision').hide()
            $('.RegistroTriajeContenedor').show()
            $('.RegistroAdmisionContenedor').hide()
            $("#modalLabel_modalTriaje").text("Registro de Triaje")
                // $('.no-identificado').attr('disabled', true)
            $('.bloquear-campo').attr('disabled', false)

            Triaje.listaTriaje(objRowTriaje.IdTriajeEmergencia, 2)

            $('#modalTriaje').modal('show')
        })

        $('#btnConsultar').on('click', function() {
            let objRowTriaje = oTable_TriajeEmergencia.api(true).row('.selected').data()

            if (isEmpty(objRowTriaje)) {
                toastr.error('Selecciona un registro')
                return false
            }
            Triaje.LimpiarCampos()

            $('.admision').hide()
            $('.RegistroTriajeContenedor').show()
            $("#modalLabel_modalTriaje").text("Registro de Triaje")
            $('.RegistroAdmisionContenedor').hide()
            $('#btnguardarTriaje').hide()

            Triaje.listaTriaje(objRowTriaje.IdTriajeEmergencia, 3)

            $('.bloquear-campo').attr('disabled', true)
            $('#modalTriaje').modal('show')
        })

        $('#btnEliminar').on('click', function() {
            let objRowTriaje = oTable_TriajeEmergencia.api(true).row('.selected').data()

            if (isEmpty(objRowTriaje)) {
                toastr.error('Selecciona un registro')
                return false
            }

            Swal.fire({
                title: "¿Estás seguro?",
                text: "Se eliminará el triaje!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#ccc",
                confirmButtonText: "Confirmar"
            }).then((res) => {
                if (res.isConfirmed) {

                    Triaje.EliminarTriaje(objRowTriaje.IdTriajeEmergencia)
                }
            });
        })

        $('#btnAdmisionar').on('click', function() {
            let objRowTriaje = oTable_TriajeEmergencia.api(true).row('.selected').data()

            if (isEmpty(objRowTriaje)) {
                toastr.error('Selecciona un registro')
                return false
            }
            Triaje.LimpiarCampos()

            Triaje.ValidarBotonClick = 2;
            
            $("#ServicioAdmision").text(objRowTriaje.Servicio)
            Triaje.listaTriaje(objRowTriaje.IdTriajeEmergencia, 2);

            Triaje.BuscarSiEstaHospitalizado($("#IdPaciente").val());

            $('.admision').show()
            $("#modalLabel_modalTriaje").text("Registro de Admisión")
            $('.RegistroTriajeContenedor').hide()
            $('.RegistroAdmisionContenedor').show()
            $('.bloquear-campo').attr('readonly', true)
            $('.admision-required').attr('required', true)

            $('#modalTriaje').modal('show')
        })

        $('#btnCerrarModalTriaje').on('click', function() {
            $('#modalTriaje').modal('hide')
        })
        
      

        $('#modalObservacionTriaje').on('click', function (e) {
            e.preventDefault();
            $('#modalObservacionTriaje').modal('hide');
            
        });
        $('#btnLimpiar').on('click', function() {
            $('#txtNroNroDocBusq').val('')
            $('#txtApPaternoBusq').val('')
            $('#txtApMaternoBusq').val('')
            $('#txtFechaTriajeBusq').val('')
            $('#txtServicioBusq').val('')
            $('#txtPrioridadBusq').val('')
            let fechaP = Triaje.RetornarFechaActual();
            $("#txtFechaTriajeBusq").datepicker("setDate", fechaP);
        })

        $('#btnAceptarDuplicidadPaciente').on('click', function() {
            Triaje.AgregarDuplicidadPaciente();
        });

        $('#btnCancelarDuplicidadPaciente').on('click', function() {
            oTable_DuplicidadPacientes.fnClearTable();
            Triaje.Forzar = 1;
            $('#paciente_nuevo').val(1);
            $('#modalDuplicidadPaciente').modal('hide')
        })

        $('#tblDuplicidadPacientes tbody').on('click', 'tr', function() {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            } else {
                oTable_DuplicidadPacientes.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            }
        });

        $('#tblTriajeEmergencia tbody').on('click', 'tr', function() {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            } else {
                oTable_TriajeEmergencia.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            }
        })

        $('#chkNoIdentificado').on('change', function() {
            let estado = $(this).is(':checked');

            $("#DocPaciente").prop('required', !estado);
            $("#ApellidoPaterno").prop('required', !estado);
            $("#ApellidoMaterno").prop('required', !estado);
            $("#Nombres").prop('required', !estado);
            $("#FechaNacimiento").prop('required', !estado);

            $(".no-identificado").prop('disabled', estado);

            if (estado) {
                $("#IdDocIdentidad").val('11');
                //$("#IdDocIdentidad_text").val('11');
                $("#DocPaciente").val('');
                //$("#DocPaciente_text").val('');
                $("#ApellidoPaterno").val('NN');
                $("#ApellidoPaterno_text").val('NN');
                $("#ApellidoMaterno").val('NN');
                $("#ApellidoMaterno_text").val('NN');
                $("#Nombres").val('NN');
                $("#Nombres_text").val('NN');
                $("#FechaNacimiento").val('');
                $("#FechaNacimiento_text").val('');
                $("#IdTipoSexo").val('1');
                $("#IdPaisNacimiento").val('166');
                $("#IdPaciente").val('');
            } else {
                $("#IdDocIdentidad").val('1');
                //$("#IdDocIdentidad_text").val('1');
                $("#ApellidoPaterno").val('');
                $("#ApellidoPaterno_text").val('');
                $("#ApellidoMaterno").val('');
                $("#ApellidoMaterno_text").val('');
                $("#Nombres").val('');
                $("#Nombres_text").val('');
                $("#IdTipoSexo").val('1');
                $("#IdPaisNacimiento").val('166');
            }

            $(".chzn-select").trigger("chosen:updated");
        });

        $("#IdOrigenAtencion").on("change", function(){
            $('#idestabldestino').val('');
			$('#ipressdestino').val('');
			$('#destino').val('');
			$('#cboNroReferencia').val('');

            if($(this).val()==21 || $(this).val()==22){
                $("#destinoReferencia").removeClass("d-none")
            }
            else{
                $("#destinoReferencia").addClass("d-none")
            }

            if($(this).val()==57 ){
                $("#OtrosOrigenes").removeClass("d-none")
            }else{
                $("#OtrosOrigenes").addClass("d-none")
            }

        })

        // $('#btnEstablecimientoDestino').on('click', function () {
        //     EstablecimientoSalud.LimpiarBusquedaEstablecimiento();
        //     $('#modalEstablecimientosBuscar').modal('show')

        // });

        $("#btnBuscar").click();

    },


    LimpiarCampos() {
        $('.bloquear-campo').attr('disabled', false)
        $('.admision-required').attr('required', false)
        $('#chkNoIdentificado').attr('checked', false).attr('disabled', false)
        $('#btnguardarTriaje').show()

        $('#IdDocIdentidad').val('1')
        //$('#IdDocIdentidad_text').val('1')
        $('#DocPaciente').val('')
        //$('#DocPaciente_text').val('')
        $('#chkNoIdentificado').val('')
        $('#ApellidoPaterno').val('')
        $('#ApellidoPaterno_text').val('')
        $('#ApellidoMaterno').val('')
        $('#ApellidoMaterno_text').val('')
        $('#Nombres').val('')
        $('#Nombres_text').val('')
        $('#FechaNacimiento').val('')
        $('#FechaNacimiento_text').val('')
        $('#IdTipoSexo').val('1')
        $('#IdPaisNacimiento').val('166')
        $('#IdMotivoAtencionEmergencia').val('1')
        $('#DetalleMotivoEmergencia').val('')
        $('#IdTiposGravedadAtencion').val('2')
        $('#TiempoSintoma').val('')
        $('#IdTiempoSintoma').val('1')
        $('#IdServicio').val('301')

        $("#TriajeFR").val("");
        $("#TriajeTEM").val("");
        $("#txtPA").val("");
        $("#txtPAD").val("");
        $("#Hemoglucotest").val("");
        $("#TriajeFC").val("");
        $("#TriajeFIO2").val("");
        $("#TriajeSAT").val("");
        //hidden
        $("#IdTriajeEmergencia").val("");
        $("#IdPacienteTriaje").val("");
        $("#IdPaciente").val("");
        $("#paciente_nuevo").val("");
        $("#UsoWebReniec").val("");
        $("#UbigeoReniecNacimiento").val("");
        $("#UbigeoReniecDomicilio").val("");
        $("#DireccionDomicilio").val("");
        $("#Telefono").val("");
        $("#IdEstadoCivil").val("");
        $("#IdReligion").val("");

        $("#OtrosOrigen").val("");

        $("#IdOrigenAtencion").val("");
        $("#IdFuenteFinanciamiento").val("");
        $("#IdTipoFinanciamiento").val("");
        $("#NombreAcompaniante").val("");
        $("#TelefonoAcompaniante").val("");
        $("#valorTriajeTEM").text("36 - 37(°C)")

        $(".chzn-select").trigger("chosen:updated");
        Triaje.Forzar = 0;
        Triaje.ValidarDoc = 0;

        $("#lblNroHistoria").hide();
    },


};


$(document).ready(function() {

    Triaje.Plugins()
    Triaje.InitDatablesTriajeEmergencia()

    Triaje.InitialCharge()
    Triaje.eventos()
    Triaje.InitDataTablePacientes()
    Triaje.InitDataTableObservacionPaciente()


    $("#btnBuscar").trigger('click');

    EstablecimientoSalud.IniciarScript();

    VisorDocumento.Eventos();
});