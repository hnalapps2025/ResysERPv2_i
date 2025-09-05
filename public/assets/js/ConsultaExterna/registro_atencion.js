let RegistroAtencion = {

    Plugin: () => {
        $("#txtFechaAtencion").datepicker({
            todayHighlight: true,
            autoclose: true,
            orientation: "bottom",
            dateFormat: "dd/mm/yy",
        });
    },

    InitialCharge: () => {
        FechaActual = getFechaActual()
        $("#txtFechaAtencion").datepicker("setDate", FechaActual);

        RegistroAtencion.ListaProgramacionByFecha($("#txtFechaAtencion").val());
    },


    ListaProgramacionByFecha: (Fecha) => {
        fetch(`ce/ListaProgramacionByFecha?Fecha=${Fecha}`, {
            method: "GET", // or 'PUT'
            //   body: JSON.stringify(data), // data can be `string` or {object}!
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .catch((error) => console.error("Error:", error))
            .then((res) => {

                $("#cboConsultorio").empty();
                if (res.resultado == 1) {

                    if ($('#hdIdMedico').val() == 0) {
                        $(res.Consultorios).each(function (i, obj) {
                            // $("#cboConsultroio").append(new Option(obj.nombreServicio, obj.valor));

                            $("#cboConsultorio").append(
                                '<option prog="' +
                                obj.IdProgramacion +
                                '" med="' +
                                obj.IdMedico +
                                '" idEmpleado="' +
                                obj.IdEmpleado +
                                '" idEspecialidad="' +
                                obj.IdEspecialidad +
                                '"  value="' +
                                obj.valor +
                                '">' +
                                obj.nombreServicio +
                                "</option>"
                            );
                        });
                    } else {
                        $(res.Consultorios).each(function (i, obj) {
                            // $("#cboConsultroio").append(new Option(obj.nombreServicio, obj.valor));
                            if ($('#hdIdMedico').val() == obj.IdMedico) {
                                $("#cboConsultorio").append(
                                    '<option prog="' +
                                    obj.IdProgramacion +
                                    '" med="' +
                                    obj.IdMedico +
                                    '" idEmpleado="' +
                                    obj.IdEmpleado +
                                    '" idEspecialidad="' +
                                    obj.IdEspecialidad +
                                    '"  value="' +
                                    obj.valor +
                                    '">' +
                                    obj.nombreServicio +
                                    "</option>"
                                );
                            }
                        });
                    }
                }
                else {
                    toastr.error(res.mensaje)
                }
                $(".chzn-select").chosen().trigger("chosen:updated");
            });
    },

    ListaAtencionesCE: async (
        fechaAtencion,
        idServicio,
        idUsuario,
        idProgramacion
    ) => {
        let data = {
            fechaAtencion: fechaAtencion,
            idServicio: idServicio,
            idUsuario: idUsuario,
            idProgramacion: idProgramacion,
        };
        Cargando(1)
        await fetch(
            `ce/ListaAtencionesCE?fechaAtencion=${fechaAtencion}&idServicio=${idServicio}&idUsuario=${idUsuario}&idProgramacion=${idProgramacion}`,
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
            .catch((error) => { console.error("Error:", error); Cargando(0) })
            .then((res) => {

                if (res.resultado == 1) {
                    if (res.data.length > 0) {
                        oTable_atenciones.fnAddData(res.data);
                    }
                }

                // $(".chzn-select").chosen().trigger("chosen:updated");
            });
        Cargando(0)
    },

    InitDatablesAtenciones: () => {
        var parms = {
            paging: false,
            ordering: true,
            info: false,
            scrollX: true,
            columns: [
                {
                    width: "5%",
                    targets: 0,
                    data: "IdCuentaAtencion",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "5%",
                    targets: 1,
                    data: "HoraInicio",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "18%",
                    targets: 5,
                    data: null,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                        $(td).html(
                            rowData.ApellidoPaterno +
                            " " +
                            rowData.ApellidoMaterno +
                            " " +
                            rowData.nombres
                        );
                    },
                },
                {
                    width: "5%",
                    targets: 6,
                    data: "NroHistoriaClinica",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "5%",
                    targets: 7,
                    data: "Telefono",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "6%",
                    targets: 8,
                    data: "planA",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                        if (!isEmpty(rowData.FechaEgreso)) {
                            $(td).parent().css("color", "#347dff");
                            $(td).parent().css("font-weight", "bold");
                        }
                    },
                },
                {
                    width: "7%",
                    targets: 9,
                    data: null,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                        //KHOYOSI
                        if (rowData.estadoCita == "Separada") {
                            $(td).html(
                                '<span class="chip orange">' +
                                rowData.estadoCita +
                                "</span >"
                            );
                        }
                        if (rowData.estadoCita == "Atendido") {
                            $(td).html(
                                '<span class="chip success">' +
                                rowData.estadoCita +
                                "</span >"
                            );
                        }
                        if (rowData.estadoCita == "Pagada") {
                            $(td).html(
                                '<span class="chip blue">' +
                                rowData.estadoCita +
                                "</span >"
                            );
                        }
                        if (rowData.estadoCita == "Vencida (No pagada)") {
                            $(td).html(
                                '<span class="chip secondary">' +
                                rowData.estadoCita +
                                "</span >"
                            );
                        }
                    },
                },
                {
                    width: '8%',
                    targets: 11,
                    data: null,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center')
                        if (!isEmpty(rowData.FechaEgreso)) {
                            var btnRuta = "";
                            var btnImprime = "";
                            var btnImprimeSinF = "";
                            //var rutaBit4Id = "";
                            btnImprimeSinF = '<button class="ImprimeInformeSF btn btn-sm btn-warning glow_button" title="Visualiza Atencion" data-toggle="tooltip" style="margin: 2px;"><i class="fa fa-eye"></i> </button>';

                            btnImprimeSinF = btnImprimeSinF + ' <button class="FirmaInformeSF btn btn-sm btn-primary glow_button" title="Firma Ficha de Atencion" data-toggle="tooltip" style="margin: 2px;"><i class="fa fa-pencil"></i> </button>';


                            // if (rowData.code != '0') {
                            //     if (rowData.statusFirma == 1) {
                            //         btnImprimeSinF = "";
                            //         btnImprime = ' <button class="btn btn-sm btn-success glow_button ImprimeInformeCF" title="Imprime Atención Firmada" data-toggle="tooltip" style="margin: 2px;"><i class="fa fa-print"></i> </button>';
                            //     } else {
                            //         btnRuta = '<button class="btn btn-sm btn-info btnFirmaCE FirmarInformeSF" title="Firmar Atención" data-toggle="tooltip" style="margin: 2px;"> <i class="fa fa-pencil"></i></button>';
                            //     }
                            // }


                            $(td).html(btnRuta + " " + btnImprime + " " + btnImprimeSinF);
                        }
                        else {
                            $(td).html('');
                        }
                    }
                },
                {
                    width: '8%',
                    targets: 15,
                    data: null,
                    createdCell: async function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center')
                        if (!isEmpty(rowData.FechaEgreso)) {

                            var btnRuta = "";
                            var btnImprime = "";
                            var btnImprimeSinF = "";
                            if (rowData.IdCuentaFua > 0) {
                                btnImprimeSinF = '<button class="ImprimeFuaSF btn btn-sm btn-warning glow_button" title="Visualiza FUA" data-toggle="tooltip" style="margin: 2px;"><i class="fa fa-eye"></i> </button>';

                                btnImprimeSinF = btnImprimeSinF + ' <button class="FirmaFuaSF btn btn-sm btn-primary glow_button" title="Firma FUA" data-toggle="tooltip" style="margin: 2px;"><i class="fa fa-pencil"></i> </button>';

                                //const permisoFua = await PermisoGeneral.SeleccionarPermisoGeneral("FUA");
                                // if (AtencionMedica.permisoFua == '1' && rowData.codeFua != '0') {
                                //     if (rowData.statusFirmaFua == 1) {
                                //         btnImprimeSinF = "";
                                //         btnImprime = ' <button class="btn btn-sm btn-success glow_button ImprimeFuaCF" title="Imprime FUA Firmada" data-toggle="tooltip" style="margin: 2px;"><i class="fa fa-print"></i> </button>';
                                //     } else {
                                //         btnRuta = '<button class="btn btn-sm btn-info btnFirmaCE FirmarFuaSF" title="Firmar FUA" data-toggle="tooltip" style="margin: 2px;"> <i class="fa fa-pencil"></i></button>';
                                //     }
                                // }
                            }

                            $(td).html(btnRuta + " " + btnImprime + " " + btnImprimeSinF);
                        }
                        else {
                            $(td).html('');
                        }

                    }
                },
                {
                    width: "5%",
                    targets: 10,
                    data: null,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "center");

                        $(td).html(
                            '<button class="btnAtenderPaciente btn btn-sm btn-primary glow_button" title="Atender Paciente" data-toggle="tooltip" style="margin: 2px;"><i class="fa fa-address-card"></i> </button>'
                        );
                    },
                },
            ],
        };

        var tableWrapper = $("#tblAtencion"); // datatable creates the table wrapper by adding with id {your_table_id}_wrapper
        //tableWrapper.find('.dataTables_length select').select2(); // initialize select2 dropdown
        oTable_atenciones = $("#tblAtencion").dataTable(parms);
    },

    Events: () => {
        $("#btnBuscarAtenciones").on("click", async () => {
            oTable_atenciones.fnClearTable();

            await RegistroAtencion.ListaAtencionesCE(
                $("#txtFechaAtencion").val(),
                $("#cboConsultorio").val(),
                0,
                $("#cboConsultorio>option:selected").attr("prog")
            );
        });

        $("#CerrarVisorDocumento").on("click", () => {
            $("#visorDocumento").attr("src", "");
            $('#modalVisorDocumento').modal('hide');
        });

        $("#txtFechaAtencion").on("change", () => {
            RegistroAtencion.ListaProgramacionByFecha(
                $("#txtFechaAtencion").val()
            );
        });

        $("#tblAtencion tbody").on(
            "click",
            ".btnAtenderPaciente",
            async function () {
                var objrow = oTable_atenciones
                    .api(true)
                    .row($(this).parents("tr")[0])
                    .index();
                var row = oTable_atenciones.fnGetData(objrow);
                console.log(row)
                Cargando(1)
                if (row.IdEstadoCita == '2' && FechaActual == row.FechaIngreso2) {
                    window.location.href = `ficha_atencion?IdAtencion=${row.IdAtencion}&IdCuentaAtencion=${row.IdCuentaAtencion}`;       //NRODRIGUEZH
                    Cargando(0)
                    return false
                }


                if (row.IdTipoFinanciamiento == '1' && row.IdEstadoCita != '4' && row.IdEstadoCita != '2' && row.esConsultorio == 1) {
                    toastr.warning("El paciente particular no pago, debe realizar el pago antes de iniciar con la atención.")
                    Cargando(0)
                    return false
<<<<<<< HEAD

                }
=======
                
                } 
                // if (row.IdServicioIngreso == 272) {
                //     window.location.href = `ficha_atencion_pediatria?IdAtencion=${row.IdAtencion}&IdCuentaAtencion=${row.IdCuentaAtencion}`;       
                   
                // }else{
                //     window.location.href = `ficha_atencion?IdAtencion=${row.IdAtencion}&IdCuentaAtencion=${row.IdCuentaAtencion}`;       //NRODRIGUEZH
                // }
>>>>>>> c43206bf175774a3bfc1e1fc1e2cd58a60d1e406
                // if(row.IdEstadoCita != '2' && (FechaActual<row.FechaIngreso2 || FechaActual>row.FechaIngreso2)){
                //     toastr.warning("No puede realizar la atención fuera de la fecha citada")
                //     Cargando(0)
                // return false

                // }
                // if(row.IdEstadoCita == '2' && FechaActual>row.FechaIngreso2){
                //     toastr.warning("No puede modificar la atención después de la fecha citada")
                //     Cargando(0)
                // return false

                // }

                if (row.IdTipoFinanciamiento == '2') {
                    let sisValidado = await acreditarSis(row.IdDocIdentidad, row.NroDocumento);
                    if (sisValidado == 0) {
                        toastr.warning("El paciente " + row.ApellidoPaterno + " " + row.ApellidoMaterno + " " + row.nombres + " tiene problemas con su SIS, debe acercarse a la oficina de Seguros.");
                        Cargando(0)
                        return false
                    }
                }

                window.location.href = `ficha_atencion?IdAtencion=${row.IdAtencion}&IdCuentaAtencion=${row.IdCuentaAtencion}`;       //NRODRIGUEZH

              
            }
        );
        $('#tblAtencion tbody').on('click', '.ImprimeInformeSF', async function () {
            var objrow = oTable_atenciones.api(true).row($(this).parents("tr")[0]).index();
            var row = oTable_atenciones.fnGetData(objrow);

            let idCuentaAtencion = row.IdCuentaAtencion
            let idRegistro = row.IdAtencion
            let idTipoServicio = 1
            let idEvaluacion = 0
            let tipo = 'CE'

            let documentoFirmado = await SeleccionarFirmasDigitales(idCuentaAtencion, idRegistro, idTipoServicio, idEvaluacion, tipo)

            if (documentoFirmado.length > 0) {
                VizualizarModalPdf(documentoFirmado[0].rutaArchivo);
                return false;
            }

            fetch(
                `sa_general/pdf_ficha_atencion?IdAtencion=${row.IdAtencion}`,
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
                    if (res.pdf_url) {
                        VizualizarModalPdf(res.pdf_url);
                        // Coloca la URL del PDF en el src del iframe
                        //$('#frame-pdf').attr('src', response.pdf_url);

                        // Abre el modal
                        //$('#pdfModal').modal('show');
                    } else {
                        console.error('Error al generar el PDF.');
                    }
                    // if (res.pdf) {
                    //     let url = 'data:application/pdf;base64,' +res.pdf;
                    //     $("#visorDocumento").attr("src", url);
                    //     $('#modalVisorDocumento').modal('show');
                    // }
                    // else
                    //     toastr.error("Faltan datos que completar en la atención para generar la Ficha de Atención");
                });
        });

        $('#tblAtencion tbody').on('click', '.FirmaInformeSF', async function () {
            var objrow = oTable_atenciones.api(true).row($(this).parents("tr")[0]).index();
            var row = oTable_atenciones.fnGetData(objrow);

            let idCuentaAtencion = row.IdCuentaAtencion
            let idRegistro = row.IdAtencion
            let idTipoServicio = 1
            let idEvaluacion = 0
            let tipo = 'CE'

            let documentoFirmado = await SeleccionarFirmasDigitales(idCuentaAtencion, idRegistro, idTipoServicio, idEvaluacion, tipo)

            let rutaArchivo = documentoFirmado[0].rutaArchivo


            let param = idCuentaAtencion + '|' + idRegistro + '|' + idTipoServicio + '|' + idEvaluacion + '|' + tipo + '|' + rutaArchivo

            sendParam(param)
            // console.log('row', row)
            // fetch(
            //     `sa_general/pdf_ficha_atencion?IdAtencion=${row.IdAtencion}`,
            //     {
            //         method: "GET", // or 'PUT'
            //         // body: JSON.stringify(data), // data can be `string` or {object}!
            //         // body: JSON.stringify(data),
            //         headers: {
            //             "Content-Type": "application/json",
            //         },
            //     }
            // )
            //     .then((res) => res.json())
            //     .catch((error) => toastr.error("Error:", error))
            //     .then((res) => {
            //         if (res.pdf_url) {
            //             let idCuentaAtencion = row.IdCuentaAtencion
            //             let idRegistro = row.IdAtencion
            //             let idTipoServicio = 1
            //             let idEvaluacion = 0
            //             let tipo = 'CE'
            //             let rutaArchivo = window.location.origin + res.pdf_url

            //             let param = idCuentaAtencion + '|' + idRegistro + '|' + idTipoServicio + '|' + idEvaluacion + '|' + tipo + '|' + rutaArchivo

            //             sendParam(param)
            //         }
            //         // if (res.pdf) {
            //         //     let url = 'data:application/pdf;base64,' +res.pdf;
            //         //     $("#visorDocumento").attr("src", url);
            //         //     $('#modalVisorDocumento').modal('show');
            //         // }
            //         else
            //             toastr.error("Faltan datos que completar en la atención para generar la Ficha de Atención");
            //     });
        });




        $('#btnDescargaHISSF').on('click', async function () {
            // var programacion = $('#cboConsultorio>option:selected').attr("prog");
            // const data = await AtencionMedica.GeneraParteDiario(programacion);
            var fecha = $('#txtFechaAtencion').val();
            const [dd, mm, aa] = fecha.split('/');
            Cargando(1)
            await fetch(
                `sa_general/pdf_his?Fecha=` + aa + '-' + mm + '-' + dd,
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
                        let url = 'data:application/pdf;base64,' + res.pdf;
                        $("#visorDocumento").attr("src", url);
                        $('#modalVisorDocumento').modal('show');
                    }
                    else {
                        toastr.error(res.mensaje);
                        if (res.resultado == 3)
                            location.reload()
                    }
                });
            // if (data != '0') {
            // alerta(1, 'La hoja HIS se genero correctamente.');
            // const firma = await Utilitario.SeleccionarFirmaDigitalV2(data);

            // if (typeof firma === 'undefined') {
            // toastr.error('Hubo un error al cargar el documento del HIS Diario.')
            // } else {
            // 
            // }
            // } else {
            //     toastr.error('Hubo un error al generar el HIS Diario.')
            // }
            Cargando(0)
        });

        $('#tblAtencion tbody').on('click', '.ImprimeFuaSF', async function () {
            var objrow = oTable_atenciones.api(true).row($(this).parents("tr")[0]).index();
            var row = oTable_atenciones.fnGetData(objrow);

            let idCuentaAtencion = row.IdCuentaAtencion
            let idRegistro = row.IdCuentaAtencion
            let idTipoServicio = 1
            let idEvaluacion = 0
            let tipo = 'FUA'

            let documentoFirmado = await SeleccionarFirmasDigitales(idCuentaAtencion, idRegistro, idTipoServicio, idEvaluacion, tipo)

            if (documentoFirmado.length > 0) {
                VizualizarModalPdf(documentoFirmado[0].rutaArchivo);
                return false;
            }

            Cargando(1)
            await fetch(
                `sa_general/pdf_fua?idCuentaAtencion=` + row.IdCuentaAtencion,
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
                    if (res.pdf_url) {
                        VizualizarModalPdf(res.pdf_url);
                        // Coloca la URL del PDF en el src del iframe
                        //$('#frame-pdf').attr('src', response.pdf_url);

                        // Abre el modal
                        //$('#pdfModal').modal('show');
                    } else {
                        console.error('Error al generar el PDF.');
                    }
                    // if (res.pdf) {
                    //     let url = 'data:application/pdf;base64,' +res.pdf;
                    //     $("#visorDocumento").attr("src", url);
                    //     $('#modalVisorDocumento').modal('show');
                    // }
                    // else
                    //     toastr.error(res.mensaje);
                });

            Cargando(0)
            // const firma = await Utilitario.SeleccionarFirmaDigitalV2(row.codeFua)               //KHOYOSI            
            // if (typeof firma === 'undefined') {
            //     alerta('2', 'El documento no esta generado, se procedera a generar el documento.')
            //     const pdf = await Utilitario.GenerarFuaPdf(row.idCuentaAtencion, row.idCuentaAtencion);

            //     if (pdf) {
            //         alerta('1', 'Se generó el documento correctamente.')
            //         $("#btnBuscarAtenciones").click();
            //     } else {
            //         alerta('2', 'El documento no ha podido ser generado por falta de información. Por favor modifique y guarde la atención nuevamente.')
            //     }
            // } else {
            //     AbrirVisorDocumento(firma.rutaArchivo, 0);
            // }
            // Cargando(0);

        });

        $('#tblAtencion tbody').on('click', '.FirmaFuaSF', async function () {
            var objrow = oTable_atenciones.api(true).row($(this).parents("tr")[0]).index();
            var row = oTable_atenciones.fnGetData(objrow);
            Cargando(1)
            await fetch(
                `sa_general/pdf_fua?idCuentaAtencion=` + row.IdCuentaAtencion,
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
                    if (res.pdf_url) {
                        let idCuentaAtencion = row.IdCuentaAtencion
                        let idRegistro = row.IdCuentaAtencion
                        let idTipoServicio = 1
                        let idEvaluacion = 0
                        let tipo = 'FUA'
                        let rutaArchivo = window.location.origin + res.pdf_url

                        let param = idCuentaAtencion + '|' + idRegistro + '|' + idTipoServicio + '|' + idEvaluacion + '|' + tipo + '|' + rutaArchivo

                        sendParam(param)
                    }
                    // if (res.pdf) {
                    //     let url = 'data:application/pdf;base64,' +res.pdf;
                    //     $("#visorDocumento").attr("src", url);
                    //     $('#modalVisorDocumento').modal('show');
                    // }
                    else
                        toastr.error("Faltan datos que completar en la atención para generar la Ficha de Atención");
                });

            Cargando(0)
            // const firma = await Utilitario.SeleccionarFirmaDigitalV2(row.codeFua)               //KHOYOSI            
            // if (typeof firma === 'undefined') {
            //     alerta('2', 'El documento no esta generado, se procedera a generar el documento.')
            //     const pdf = await Utilitario.GenerarFuaPdf(row.idCuentaAtencion, row.idCuentaAtencion);

            //     if (pdf) {
            //         alerta('1', 'Se generó el documento correctamente.')
            //         $("#btnBuscarAtenciones").click();
            //     } else {
            //         alerta('2', 'El documento no ha podido ser generado por falta de información. Por favor modifique y guarde la atención nuevamente.')
            //     }
            // } else {
            //     AbrirVisorDocumento(firma.rutaArchivo, 0);
            // }
            // Cargando(0);

        });


        $('#btnFirmarLote').on('click', async function () {

            let atenciones = oTable_atenciones.api(true).data().toArray()

            let cuentasAtencion = ''

            for (let objAten of atenciones) {
                cuentasAtencion = cuentasAtencion + objAten.IdCuentaAtencion + '|'
            }

            console.log(cuentasAtencion)

            let formData = new FormData()
            formData.append('cuentasAtencion', cuentasAtencion)
            formData.append('_token',$('[name="_token"]').val());

            $.ajax({
                url: "Utilitario/FirmaArchivosLote",
                datatype: "json",
                data: formData,
                type: "post",
                processData: false,
                contentType: false,
                async: false,
                success: function (res) {
                    
                    let rutaArchivo = res
                    let param = 'idCuentaAtencion' + '|' + 'idRegistro' + '|' + 'idTipoServicio' + '|' + 'idEvaluacion' + '|' + 'tipo' + '|' + rutaArchivo

                    sendParamLote(res)
                    console.log(res)
                    
                },
                error: function (msg) {
                    console.error(msg);
                    toastr.error("Error al guardar la atencion",msg)
                }
            })

            
            // var programacion = $('#cboConsultorio>option:selected').attr("prog");
            // const data = await AtencionMedica.GeneraParteDiario(programacion);

            // "http://192.168.36.121:8001//?idCuentaAtencion='.$idCuentaAtencion.'&idRegistro='.$idRegistro.'&idTipoServicio='.$idTipoServicio.'&idEvaluacion='.$idEvaluacion.'&tipo='.$tipo.'",

            // Cargando(1)

            

            Cargando(0)
        });



    },

    Init: () => {
        RegistroAtencion.Plugin()
        RegistroAtencion.InitialCharge()

        RegistroAtencion.InitDatablesAtenciones();

        RegistroAtencion.Events()
    },
}
