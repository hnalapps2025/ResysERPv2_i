

var Triaje = {
    Plugins() {
        $('#txtFechaTriajeBusq').datepicker({
            todayHighlight: true,
            autoclose: true,
            dateFormat: "dd/mm/yy",
            orientation: "bottom"
        })
    },
    CargaInicial() {
        let fechaActual = getFechaActual()
        
        $("#txtFechaTriajeBusq").datepicker("setDate", fechaActual);
    },

    ListarAtencionesCEFiltrarPorPaciente(nroHistoriaClinica,apellidoPaterno,apellidoMaterno,primerNombre,dni,idCuentaAtencion,lcFechaTriaje) {
        
        oTable_TriajeCE.fnClearTable()
        let lcFechaTriaje1 = '';
        let lcFechaTriaje2 = '';

        if(lcFechaTriaje!=''){
            const [dd,mm,aa] = lcFechaTriaje.split('/');
            lcFechaTriaje1 = aa+mm+dd+' 00:00:00';
            lcFechaTriaje2 = aa+mm+dd+' 23:59:59';
        }
        fetch(
            `/ce/AtencionesCEFiltrarPorPaciente?nroHistoriaClinica=${nroHistoriaClinica}&apellidoPaterno=${apellidoPaterno}&apellidoMaterno=${apellidoMaterno}&primerNombre=${primerNombre}&NroDocumento=${dni}&idCuentaAtencion=${idCuentaAtencion}&lcFechaTriaje=${lcFechaTriaje}&lcFechaTriaje1=${lcFechaTriaje1}&lcFechaTriaje2=${lcFechaTriaje2}`,
            {
                method: "GET", // or 'PUT'
                // body: JSON.stringify(data), // data can be `string` or {object}!
                // body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
            .then((res) => res.json())
            .catch((error) => toastr.error("Error:", error))
            .then((res) => {

                if (res.resultado == 1) {
                    if (res.data.length > 0) {
                        oTable_TriajeCE.fnAddData(res.data);
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
                $("#txtSO").val("");       //KHOYOSI               

                Cargando(0);
            })
            .catch(e => {
                alerta("ERROR", "Error guardar triaje! " + e, "2");
                Cargando(0);
            })
    },

    InsertaTriajeCE(midata) {
        // var midata = new FormData();
        presion = $("#txtPA").val() + "/" + $("#txtPAD").val()

        midata.append("TriajePresion", presion);
        midata.append('_token',$('[name="_token"]').val());
        // midata.append("TriajeTemperatura", $("#txtT").val());
        // midata.append("TriajeFrecRespiratoria", $("#txtFr").val());
        // midata.append("TriajeFrecCardiaca", $("#txtFc").val());
        // midata.append("TriajePeso", $("#txtPeso").val());
        // midata.append("TriajeTalla", $("#txtTalla").val());
        // midata.append("TriajePerimCefalico", $("#txtPC").val());
        // midata.append("TriajeSaturacionOxigeno", $("#txtSO").val());
        // midata.append("TriajePerimAbdominal", $("#txtPAbdo").val());
        // midata.append("TriajePulso", $("#txtPulso").val());
        // midata.append("idAtencion", $("#txtIdAtencionTriaje").val());

        // midata.append("NroHistoriaClinica", $("#txtNroHistoriaTriaje").val());
        // midata.append("CitaIdServicio", $("#txtIdservicioTriaje").val());
        // midata.append("CitaFecha", $("#txtCitaFechaTriaje").val());

        $.ajax({
            url: "/ce/atencionesCEAgregar",
            datatype: "json",
            data: midata,
            type: "post",
            processData: false,
            contentType: false,
            async: false,
            success: function (res) {
                if(res.resultado==1){
                    Triaje.LimpiarCampos()
    
                    toastr.success(res.mensaje)
    
                    $('#modalTriaje').modal('hide')
                }
                else{
                    toastr.error("ERROR", res.mensaje);
                }

            },
            error: function (msg) {
                console.log("error:",msg)
                toastr.error("ERROR", "Error al guardar triaje!");
            }
        });
    },
    
    ListaAtencionByIdCuentaAtencion(tipo) {

        $.ajax({
            url: "/ce/atencionesSelecionarPorCuenta?IdCuentaAtencion="+$('#txtCuentaTriaje').val(),
            datatype: "json",
            type: "get",
            async: false,
            success: function (res) {
                atencion = res.data[0]

                $('#txtNombrePaciente').val(`H.C ${atencion.NroHistoriaClinica} - ${atencion.ApellidoPaterno} ${atencion.ApellidoMaterno} ${atencion.PrimerNombre} (Edad: ${atencion.Edad} ${atencion.tedad})`)
                $('#txtDatosCuenta').val(`F.Ing: ${atencion.dFechaIngreso} - ${atencion.desServicio} - IAFA ${atencion.dTipoFinanciamiento}`)
                
                $('#txtIdAtencionTriaje').val(atencion.IdAtencion)
                $('#txtNroHistoriaTriaje').val(atencion.NroHistoriaClinica)
                $('#txtIdservicioTriaje').val(atencion.IdServicioIngreso)
                $('#txtCitaFechaTriaje').val(atencion.FechaIngreso)
                $('#txtEdadTriaje').val(atencion.Edad)

                $.ajax({
                    url: "/ce/atencionesCESeleccionarPorId?IdAtencion="+atencion.IdAtencion,
                    datatype: "json",
                    type: "get",
                    async: false,
                    success: function (res) {
                        if (res.data.length > 0) {
                            if((tipo == 1 || tipo == 2)){
                                let mensaje=null
                                if(tipo == 1)
                                    mensaje="El triaje ya fue registrado para esta atención";
                                if (tipo == 2 &&res.data[0].IdEstadoCita==2)
                                    mensaje="La cita ya fue atendida, ya no puede modificarla desde Triaje"
                                if(mensaje){
                                    $('.bloquear-campo').attr('disabled', true)
                                    $('#btnguardarTriaje').hide()
                                    toastr.error(mensaje)
                                }
                            }
                        }   
                    },
                    error: function (msg) {
                        console.log(msg)
                        toastr.error("ERROR: Error listar datos atencion!");
                    }
                })
            },
            error: function (msg) {
                console.log(msg)
                toastr.error("ERROR: Error listar datos atencion!");
            }
        });
    },

    listaTriaje(idAtencion) {

        $.ajax({
            url: "/ce/atencionesCESeleccionarPorId?IdAtencion="+idAtencion,
            datatype: "json",
            type: "get",
            async: false,
            success: function (res) {
                $("#txtPulso").val("");
                $("#txtPA").val("");
                $("#txtT").val("");
                $("#txtFr").val("");
                $("#txtFc").val("");
                $("#txtPeso").val("");
                $("#txtTalla").val("");
                $("#txtImc").val("");
                $("#txtPAD").val("");
                $("#txtPC").val("");
                $("#txtPAbdo").val("");
                $("#txtSO").val("");
                $("#txtHb").val("");

                if(res.resultado==1){
                    if (res.data.length > 0) {
                        presionAr = res.data[0].TriajePresion
    
                        if (!(presionAr == null)) {
                            presionSep = presionAr.split("/");
    
                            $("#txtPA").val(presionSep[0]);
                            $("#txtPAD").val(presionSep[1]);
                        }
                        else {
                            $("#txtPA").val("");
                            $("#txtPAD").val("");
                        }
    
                        $("#txtT").val(res.data[0].TriajeTemperatura);
    
    
                        if (res.data[0].TriajeFrecRespiratoria == 0) {
                            $("#txtFr").val("");
                        }
                        else {
                            $("#txtFr").val(res.data[0].TriajeFrecRespiratoria);
                        }
    
                        if (res.data[0].triajeFrecCardiaca == 0) {
                            $("#txtFc").val("");
                        }
                        else {
                            $("#txtFc").val(res.data[0].TriajeFrecCardiaca);
                        }

                        $("#txtPulso").val(res.data[0].TriajePulso);
                        $("#txtPeso").val(res.data[0].TriajePeso);
                        $("#txtTalla").val(res.data[0].TriajeTalla);
                        
                        $("#txtPC").val(res.data[0].TriajePerimCefalico);
                        
                        $("#txtSO").val(res.data[0].TriajeSaturaOxigeno);
                        $("#txtPAbdo").val(res.data[0].TriajePerimAbdominal);

                        $("#txtHb").val(res.data[0].TriajeHb);
    
                        //$("#txtImc").val(Triaje.calculaImc($("#txtPeso").val(), $("#txtTalla").val())) // cambio calculo imc
                        // $("#txtImc").val(Triaje.calculaImc($("#txtPesoPregesta").val(), $("#txtTalla").val()))
                        // $("#txtImcDes").val(Triaje.imc($("#txtImc").val()))
                        //txtPesoPregesta
    
                        Triaje.validarRango();
                    }
                }
                else{
                    console.log(msg)
                    toastr.error("ERROR", "Error listar triaje!");
                }
            },
            error: function (msg) {
                console.log(msg)
                toastr.error("ERROR", "Error listar triaje!");
            }
        });
    },

    listaTriajeEmgHosp(idAtencion, idServicio, idNumero) {
        
        var midata = new FormData();
        midata.append('idAtencion', idAtencion);
        midata.append('idServicio', idServicio);
        midata.append('idNumero', idNumero);
        $.ajax({
            url: "/Atencion/ListaTriajeEmgHosp?area=ConsultaExterna",
            datatype: "json",
            data: midata,
            type: "post",
            processData: false,
            contentType: false,
            async: false,
            success: function (res) {
                $("#txtPA").val("");
                $("#txtT").val("");
                $("#txtFr").val("");
                $("#txtFc").val("");
                $("#txtPeso").val("");
                $("#txtTalla").val("");
                $("#txtImc").val("");
                $("#txtTriajeIMC").val("");
                $("#txtPAD").val("");
                $("#txtHb").val("");
                if (res.table.length > 0) {
                    presionAr = res.table[0].triajePresion

                    if (!(presionAr == null)) {
                        presionSep = presionAr.split("/");

                        $("#txtPA").val(presionSep[0]);
                        $("#txtPAD").val(presionSep[1]);
                    }
                    else {
                        $("#txtPA").val("");
                        $("#txtPAD").val("");
                    }


                    $("#txtT").val(res.table[0].triajeTemperatura);


                    if (res.table[0].triajeFrecuenciaRespiratoria == 0) {
                        $("#txtFr").val("");
                    }
                    else {
                        $("#txtFr").val(res.table[0].triajeFrecuenciaRespiratoria);
                    }

                    if (res.table[0].triajeFrecuenciaCardiaca == 0) {
                        $("#txtFc").val("");
                    }
                    else {
                        $("#txtFc").val(res.table[0].triajeFrecuenciaCardiaca);
                    }

                    $("#txtPeso").val(res.table[0].triajePeso);
                    $("#txtTalla").val(res.table[0].triajeTalla);


                    if ($("#txtPeso").val() != '' && $("#txtTalla").val() != '') {
                        $("#txtTriajeIMC").val(Triaje.CalcularIMC($("#txtPeso").val(), $("#txtTalla").val()));
                        $("#txtTriajeIMC").val($("#txtTriajeIMC").val() + ' (' + Triaje.imc($("#txtTriajeIMC").val()) + ')');
                    }

                    $("#txtSO").val(res.table[0].triajeSaturacionOxigeno);

                    //$("#txtImc").val(Triaje.calculaImc($("#txtPeso").val(), $("#txtTalla").val())) // cambio calculo imc
                    $("#txtImc").val(Triaje.calculaImc($("#txtPesoPregesta").val(), $("#txtTalla").val()))
                    $("#txtImcDes").val(Triaje.imc($("#txtImc").val()))
                    //txtPesoPregesta

                    Triaje.validarRango();
                }
                
            },
            error: function (msg) {
                alerta("ERROR", "Error listar triaje!", "2");
            }
        });
    },

    listaTriajeInterconsulta(idAtencion) {
        var midata = new FormData();
        midata.append('idAtencion', idAtencion);

        $.ajax({
            url: "/Atencion/ListaTriajeInterconsulta?area=ConsultaExterna",
            datatype: "json",
            data: midata,
            type: "post",
            processData: false,
            contentType: false,
            async: false,
            success: function (datos) {
                $("#txtPA").val("");
                $("#txtT").val("");
                $("#txtFr").val("");
                $("#txtFc").val("");
                $("#txtPeso").val("");
                $("#txtTalla").val("");
                $("#txtImc").val("");
                $("#txtPAD").val("");
                $("#txtPC").val("");
                $("#txtSO").val("");       //KHOYOSI
                $("#txtHb").val("");
                if (datos.table.length > 0) {
                    presionAr = datos.table[0].triajePresion

                    if (!(presionAr == null)) {
                        presionSep = presionAr.split("/");

                        $("#txtPA").val(presionSep[0]);
                        $("#txtPAD").val(presionSep[1]);
                    }
                    else {
                        $("#txtPA").val("");
                        $("#txtPAD").val("");
                    }


                    $("#txtT").val(datos.table[0].triajeTemperatura);


                    if (datos.table[0].triajeFrecRespiratoria == 0) {
                        $("#txtFr").val("");
                    }
                    else {
                        $("#txtFr").val(datos.table[0].triajeFrecRespiratoria);
                    }

                    if (datos.table[0].triajeFrecCardiaca == 0) {
                        $("#txtFc").val("");
                    }
                    else {
                        $("#txtFc").val(datos.table[0].triajeFrecCardiaca);
                    }

                    $("#txtPeso").val(datos.table[0].triajePeso);
                    $("#txtTalla").val(datos.table[0].triajeTalla);
                    $("#txtPC").val(datos.table[0].triajePerimCefalico);

                    $("#txtSO").val(datos.table[0].triajeSaturacionOxigeno);     //KHOYOSI

                    //$("#txtImc").val(Triaje.calculaImc($("#txtPeso").val(), $("#txtTalla").val())) // cambio calculo imc
                    $("#txtImc").val(Triaje.calculaImc($("#txtPesoPregesta").val(), $("#txtTalla").val()))
                    $("#txtImcDes").val(Triaje.imc($("#txtImc").val()))
                    //txtPesoPregesta

                    Triaje.validarRango();
                }

            },
            error: function (msg) {
                alerta("ERROR", "Error listar triaje!", "2");
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
        }
        else {
            imc = imc
        }

        return imc
    },

    CalcularIMC(peso, talla) {

        var imc = peso / (Math.pow((talla / 100), 2))
        imc = Math.round(imc * 100) / 100;
                
        return imc
    },

    InitDatablesTriajeCE() {

        var parms = {
            destroy: true,
            responsive: true,
            bFilter: false,
            paging: false,
            columns: [
                {
                    data: "IdCuentaAtencion",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                {
                    data: "NroHistoriaClinica",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                {
                    data: "ApellidoPaterno",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                {
                    data: "ApellidoMaterno",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                {
                    data: "PrimerNombre",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                {
                    data: "TriajeFecha",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                {
                    data: "Consultorio",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                {
                    data: "FechaCita",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                }
            ]
        }

        //tableWrapper.find('.dataTables_length select').select2(); // initialize select2 dropdown
        oTable_TriajeCE = $("#tblTriajeCE").dataTable(parms);
    },

    eventos() {

        $('#btnBuscarCuentaPaciente').on('click', function () {
            Triaje.LimpiarCampos()
            $('#modalBuscarPaciente').modal('show')
        })
        
        $("#txtPA").on("change", function () {
            if (90 > $("#txtPA").val() || $("#txtPA").val() > 140) {

                $("#txtPA").css('color', 'red');
            }
            else {
                $("#txtPA").css('color', 'black');
            }
        });
        //JDELGADO J0 CAMBIO FORMULA PRESION PAD
        $("#txtPAD").on("change", function () {
            if (50 > $("#txtPAD").val() || $("#txtPAD").val() > 140) {

                $("#txtPAD").css('color', 'red');
            }
            else {
                $("#txtPAD").css('color', 'black');
            }
        });

        $("#txtFc").on("change", function () {
            if (60 > $("#txtFc").val() || $("#txtFc").val() > 90) {

                $("#txtFc").css('color', 'red');
            }
            else {
                $("#txtFc").css('color', 'black');
            }
        });

        $("#txtFr").on("change", function () {
            if (12 > $("#txtFr").val() || $("#txtFr").val() > 20) {

                $("#txtFr").css('color', 'red');
            }
            else {
                $("#txtFr").css('color', 'black');
            }
        });

        $("#txtT").on("change", function () {
            if (36 > $("#txtT").val() || $("#txtT").val() > 37) {

                $("#txtT").css('color', 'red');
            }
            else {
                $("#txtT").css('color', 'black');
            }
        });

        $("#txtPeso,#txtTalla").on("input", function () {
            if ($("#txtPeso").val() != '' && $("#txtTalla").val() != '') {
                $("#txtTriajeIMC").val(Triaje.CalcularIMC($("#txtPeso").val(), $("#txtTalla").val()));
                $("#txtTriajeIMC").val($("#txtTriajeIMC").val() + ' (' + Triaje.imc($("#txtTriajeIMC").val()) + ')');
            }
            else{
                $("#txtTriajeIMC").val("Sin Datos");
            }
        });
        
        $("#txtSO").on("change", function () {
            if (95 > $("#txtSO").val() || $("#txtSO").val() > 100) {

                $("#txtSO").css('color', 'red');
            }
            else {
                $("#txtSO").css('color', 'black');
            }
        });
        
        $('#btnBuscar').on('click', function () {
            
            if ($('#txtNroCuentaBusq').val() == '' && $('#txtNroDniBusq').val() == '' && $('#txtNroHistoriaBusq').val() == '' && $('#txtApPaternoBusq').val() == '' && $('#txtApMaternoBusq').val() == '' && $('#txtFechaTriajeBusq').val() == '') {
                toastr.error('Ingrese al menos un valor para la búsqueda')
                return false
            }
            Triaje.ListarAtencionesCEFiltrarPorPaciente($("#txtNroHistoriaBusq").val(),$("#txtApPaternoBusq").val(),$("#txtApMaternoBusq").val(),'',$("#txtNroDniBusq").val(),$("#txtNroCuentaBusq").val(),$("#txtFechaTriajeBusq").val())
        })

        $('#btnBuscarDatosPaciente').on('click', function () {
            if ($('#txtCuentaTriaje').val() == '') {
                toastr.error("Ingresa el numero de cuenta")
                return false;
            }
            Triaje.ListaAtencionByIdCuentaAtencion(1)
        })

        // $('#btnguardarTriaje').on('click', function () {
        $('#formulario_triaje').on('submit', function (e) {
            e.preventDefault();
            if ($('#txtIdAtencionTriaje').val() == '') {
                toastr.error("Debe ingresar la cuenta")
                $('#txtCuentaTriaje').focus()
                return false
            }
            if ($('#txtPeso').val() == '') {
                toastr.error("El Peso es obligatorio")
                $('#txtPeso').focus()
                return false
            }
            if ($('#txtTalla').val() == '') {
                toastr.error("La Talla es obligatoria")
                $('#txtTalla').focus()
                return false
            }

            Triaje.InsertaTriajeCE(new FormData(this))
        })

        $('#btnAgregar').on('click', function () {
            Triaje.LimpiarCampos()
            $('#btnBuscarDatosPaciente').attr('disabled', false)
            $('#btnBuscarCuentaPaciente').attr('disabled', false)
            $('#modalTriaje').modal('show')
        })

        $('#btnModificar').on('click', function () {
            let objRowTriaje = oTable_TriajeCE.api(true).row('.selected').data()
            
            if (isEmpty(objRowTriaje)) {
                toastr.error('Selecciona un registro')
                return false
            }
            Triaje.LimpiarCampos()
            
            $('#txtCuentaTriaje').attr('disabled', true)
            $('#btnBuscarDatosPaciente').attr('disabled', true)
            $('#btnBuscarCuentaPaciente').attr('disabled', true)
            
            $('#txtCuentaTriaje').val(objRowTriaje.IdCuentaAtencion)
            Triaje.ListaAtencionByIdCuentaAtencion(2)
            Triaje.listaTriaje(objRowTriaje.idAtencion)

            $('#modalTriaje').modal('show')
        })

        $('#btnConsultar').on('click', function () {
            let objRowTriaje = oTable_TriajeCE.api(true).row('.selected').data()

            if (isEmpty(objRowTriaje)) {
                toastr.error('Selecciona un registro')
                return false
            }

            Triaje.LimpiarCampos()
            $('#btnBuscarDatosPaciente').attr('disabled', true)
            $('#btnBuscarCuentaPaciente').attr('disabled', true)
            $('.bloquear-campo').attr('disabled', true)
            $('#btnguardarTriaje').hide()

            $('#txtCuentaTriaje').val(objRowTriaje.IdCuentaAtencion)
            Triaje.ListaAtencionByIdCuentaAtencion(3)
            Triaje.listaTriaje(objRowTriaje.idAtencion)

            $('#modalTriaje').modal('show')
        })

        $('#btnCerrarModalTriaje').on('click', function () {
            $('#modalTriaje').modal('hide')
        })

        $('#btnLimpiar').on('click', function () {
            $('#txtNroCuentaBusq').val('')
            $('#txtNroDniBusq').val('')
            $('#txtNroHistoriaBusq').val('')
            $('#txtApPaternoBusq').val('')
            $('#txtApMaternoBusq').val('')
            $('#txtFechaTriajeBusq').val('')
        })

        $('#tblTriajeCE tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTable_TriajeCE.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            }
        })

        $("#btnBuscar").click();

    },
    imc(imc) {
        grado = "";
        if (imc < 18.5) {
            grado = "Bajo peso";
        } else if (imc >= 18.5 && imc <= 24.99) {
            grado = "Peso Normal";
        } else if (imc >= 25 && imc <= 29.99) {
            grado = "Sobrepeso";
        } else if (imc >= 30 && imc <= 34.99) {
            grado = "Obesidad grado I";
        } else if (imc >= 35 && imc <= 39.99) {
            grado = "Obesidad grado II";
        } else if (imc >= 40) {
            grado = "Obesidad grado III";
        }

        return grado
    },
    
    validarRango() {
        if (90 > $("#txtPA").val() || $("#txtPA").val() > 140) {

            $("#txtPA").css('color', 'red');
        }
        else {
            $("#txtPA").css('color', 'black');
        }

        if (50 > $("#txtPAD").val() || $("#txtPAD").val() > 140) {

            $("#txtPAD").css('color', 'red');
        }
        else {
            $("#txtPAD").css('color', 'black');
        }

        if (60 > $("#txtFc").val() || $("#txtFc").val() > 90) {

            $("#txtFc").css('color', 'red');
        }
        else {
            $("#txtFc").css('color', 'black');
        }

        if (12 > $("#txtFr").val() || $("#txtFr").val() > 20) {

            $("#txtFr").css('color', 'red');
        }
        else {
            $("#txtFr").css('color', 'black');
        }

        if (36 > $("#txtT").val() || $("#txtT").val() > 37) {

            $("#txtT").css('color', 'red');
        }
        else {
            $("#txtT").css('color', 'black');
        }

        if (95 > $("#txtSO").val() || $("#txtSO").val() > 100) {

            $("#txtSO").css('color', 'red');
        }
        else {
            $("#txtSO").css('color', 'black');
        }
    },
    
    LimpiarCampos() {
        $('.bloquear-campo').attr('disabled', false)
        $('#btnguardarTriaje').show()

        $('#txtNombrePaciente').val('')
        $('#txtDatosCuenta').val('')
        $('#txtIdAtencionTriaje').val('')
        $('#txtNroHistoriaTriaje').val('')
        $('#txtIdservicioTriaje').val('')
        $('#txtCitaFechaTriaje').val('')
        $('#txtEdadTriaje').val('')

        $('#txtCuentaTriaje').val('')
        $('#txtNombrePaciente').val('')
        $('#txtDatosCuenta').val('')

        $("#txtPulso").val("");
        $("#txtPA").val("");
        $("#txtT").val("");
        $("#txtFr").val("");
        $("#txtFc").val("");
        $("#txtPeso").val("");
        $("#txtTalla").val("");
        $("#txtImc").val("");
        $("#txtPAD").val("");
        $("#txtPC").val("");
        $("#txtPAbdo").val("");
        $("#txtSO").val("");
        $("#txtHb").val("");
    },

    
};

$(document).ready(function () {

    Triaje.Plugins()
    Triaje.CargaInicial()

    Triaje.InitDatablesTriajeCE()

    Triaje.eventos()

});


