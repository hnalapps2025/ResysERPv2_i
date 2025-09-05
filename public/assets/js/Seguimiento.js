let Seguimiento = {
    IdCuentaAtencionDetalle: 0,
    IniciarScript() {
        Seguimiento.IniciarDataTables();
        //Seguimiento.Eventos();
    },

    IniciarData() {

    },

    IniciarDataTables() {
        Seguimiento.DataTableslaboratorioMovimientosGenerales();
        //Seguimiento.IniciarDataTablesImagenesMovimientos();
        //Seguimiento.IniciarDataTableResultados();
        
    },

    async PacientesSeleccionarPorNroHistoria(NroHistoria) {
        let datos;
        var formData = new FormData();

        formData.append('_token', $("meta[name='csrf-token']").attr("content"));
        formData.append('NroHistoria', NroHistoria);

        try {
            //oTable_OrdenesMedicasGeneralesSegui.fnClearTable();
            //oTable_cuentas.fnClearTable();
            datos = await
                $.ajax({
                    method: "POST",
                    url: "/seguimiento/paciente_nroHistoria?area=ConsultaExterna",
                    //contentType: "application/json; charset=utf-8",
                    data: formData,
                    dataType: "json",
                    cache: false,
                    processData: false,
                    contentType: false,
                });

            console.log('datos paciente', datos);
            if (datos.resultado.length !== 0) {

                await Seguimiento.ListaAtencionesByIdPaciente(datos.resultado[0].IdPaciente);
                await Seguimiento.ListarOrdenesMedicasPorIdPaciente(datos.resultado[0].IdPaciente);
                await Seguimiento.LabMovimientoLaboratorioSeleccionarPorIdPaciente(datos.resultado[0].IdPaciente);
                await Seguimiento.ImagMovimientoImagenesSeleccionarPorIdPaciente(datos.resultado[0].IdPaciente);

                $('#txtNroHistoria').val(datos.resultado[0].NroHistoriaClinica)
                $('#txtNombres').val(datos.resultado[0].ApellidoPaterno + ' ' + datos.resultado[0].ApellidoMaterno + ' ' + datos.resultado[0].PrimerNombre)

                // oTable_cuentas.fnAddData(datos.resultado)
            } else {
                Swal.fire({
                    title: 'Seguimiento',
                    text: "No existe un paciente con este Nro. de Historia.",
                    type: 'warning',
                }).done();
            }
        } catch (error) {
            console.log('danger', '', error);
        }
    },

    async ListaAtencionesByIdPaciente(idPaciente) {
        let datos;
        var formData = new FormData();

        formData.append('_token', $("meta[name='csrf-token']").attr("content"));
        formData.append('IdPaciente', idPaciente);

        try {
            //oTable_OrdenesMedicasGeneralesSegui.fnClearTable();
            oTable_cuentas.fnClearTable();
            datos = await
                $.ajax({
                    method: "POST",
                    url: "/EvaluacionEmergencia/ListaAtencionesByIdPaciente?area=ConsultaExterna",
                    //contentType: "application/json; charset=utf-8",
                    data: formData,
                    dataType: "json",
                    cache: false,
                    processData: false,
                    contentType: false,
                });

            console.log(datos);
            if (datos.resultado.length !== 0) {

                oTable_cuentas.fnAddData(datos.resultado)
            }
        } catch (error) {
            console.log('danger', '', error);
        }
    },

    async ListarDiagnosticosSeguimiento(IdAtencion, IdNumeroEval) {

        let formData = new FormData()

        formData.append('_token', $("meta[name='csrf-token']").attr("content"));

        // formData.append('IdCuentaAtencion', Variables.IdCuentaAtencion);
        formData.append('IdAtencion', IdAtencion);
        formData.append('IdNumero', IdNumeroEval);
        // END Motivo Atención

        try {
            datos = await $.ajax({
                method: "POST",
                url: "/EvaluacionEmergencia/ListarDiagnosticos",
                //contentType: "application/json; charset=utf-8",
                data: formData,
                dataType: "json",
                cache: false,
                processData: false,
                contentType: false,
            });

            //console.log(datos.resultado);
            //DtDiagnosticos.fnAddData(datos.resultado);
            console.log(datos)
            return datos
            // if(datos.resultado.length > 0) {
            //     oTable_diagnosticosSegui.fnAddData(datos.resultado)
            // }

        } catch (error) {
            //console.error(error)
            alerta('error', '', error);
        }

    },

    async ListarEvaluacionEmergenciaDetalleByIdAtencion(IdAtencion, IdNumeroEval) {

        let formData = new FormData()

        formData.append('_token', $("meta[name='csrf-token']").attr("content"));

        // formData.append('IdCuentaAtencion', Variables.IdCuentaAtencion);
        formData.append('IdAtencion', IdAtencion);
        formData.append('IdNumero', IdNumeroEval);
        // END Motivo Atención

        try {
            datos = await $.ajax({
                method: "POST",
                url: "/EvaluacionEmergencia/ListarEvaluacionEmergenciaDetalleByIdAtencion",
                //contentType: "application/json; charset=utf-8",
                data: formData,
                dataType: "json",
                cache: false,
                processData: false,
                contentType: false,
            });

            return datos.resultado

        } catch (error) {
            console.error(error)
            // alerta(3, error);
        }

    },

    async CargarOrdenesMedicasPorIdCuentaAtencion(idCuenta,idtipoServicio) { // KHOYOSI
        //var resp = [];
        let datos;
        var data = new FormData();
        data.append('_token', $("meta[name='csrf-token']").attr("content"));
        data.append('IdCuentaAtencion', idCuenta);
        data.append('IdtipoServicio', idtipoServicio);


        try {
            DTORdenesMedicas.clear().draw();
            //OrdenMedica.Limpiar();
            datos = await
                $.ajax({
                    method: "POST",
                    url: "/Recetas/ListarOrdenesMedicas",
                    data: data,
                    dataType: "json",
                    cache: false,
                    processData: false,
                    contentType: false,
                });
            //console.log(datos);
            return datos
        } catch (error) {
            alerta('error', '', error);
        }

        //return resp;
    },

<<<<<<< HEAD
    CargarRecetaDetalle(data) {
        const receta = [];
        receta.push(data);
=======
    CargarRecetaDetalle(datos) {


        const receta = [];
        receta.push(datos);
        console.log('datos en receta:', receta);
>>>>>>> c43206bf175774a3bfc1e1fc1e2cd58a60d1e406
        OrdenMedica.CargarDatosRecetaDetalle(receta);
    },

    async CargarLaboratorioMovimientos(idCuenta) {
        //var resp = [];
        let datos;
        var data = new FormData();

        data.append('_token', $("meta[name='csrf-token']").attr("content"));
        data.append('idCuentaAtencion', idCuenta);

        try {
            oTable_LaboratorioMovimientosSegui.fnClearTable()
            datos = await
                $.ajax({
                    method: "POST",
                    url: "/Resultados/CargarMovimientosLaboratorio",
                    data: data,
                    dataType: "json",
                    cache: false,
                    processData: false,
                    contentType: false,
                });

            if (!isEmpty(datos.resultado)) {
                if (datos.resultado.length > 0) {
                    oTable_LaboratorioMovimientosSegui.fnAddData(datos.resultado)
                }

            }
        } catch (error) {
            alerta('error', '', error);
        }
        //return resp;
    },

    async ListarOrdenesMedicasPorIdPaciente(idPaciente) {
        //var resp = [];
        let datos;
        var data = new FormData();

        data.append('_token', $("meta[name='csrf-token']").attr("content"));
        data.append('idPaciente', idPaciente);
       // data.append('idTipoServicio', idPaciente);


        try {
            oTable_OrdenesMedicasGeneralesSegui.fnClearTable()
            datos = await
                $.ajax({
                    method: "POST",
                    url: "/Resultados/ListarOrdenesMedicasPorIdPaciente",
                    data: data,
                    dataType: "json",
                    cache: false,
                    processData: false,
                    contentType: false,
                });

            if (!isEmpty(datos.resultado)) {
                if (datos.resultado.length > 0) {
                    oTable_OrdenesMedicasGeneralesSegui.fnAddData(datos.resultado)
                }

            }
        } catch (error) {
            console.error('danger', '', error);
        }
        //return resp;
    },

    async LabMovimientoLaboratorioSeleccionarPorIdPaciente(idPaciente) {
        //var resp = [];
        let datos;
        var data = new FormData();

        data.append('_token', $("meta[name='csrf-token']").attr("content"));
        data.append('idPaciente', idPaciente);

        try {
            oTable_LaboratorioMovimientosGeneralesSegui.fnClearTable()
            datos = await
                $.ajax({
                    method: "POST",
                    url: "/Resultados/LabMovimientoLaboratorioSeleccionarPorIdPaciente",
                    data: data,
                    dataType: "json",
                    cache: false,
                    processData: false,
                    contentType: false,
                });

            if (!isEmpty(datos.resultado)) {
                if (datos.resultado.length > 0) {
                    oTable_LaboratorioMovimientosGeneralesSegui.fnAddData(datos.resultado)
                }

            }
        } catch (error) {
            alerta('danger', '', error);
        }
        //return resp;
    },

    async ImagMovimientoImagenesSeleccionarPorIdPaciente(idPaciente) {
        //var resp = [];
        let datos;
        var data = new FormData();

        data.append('_token', $("meta[name='csrf-token']").attr("content"));
        data.append('idPaciente', idPaciente);

        try {
            oTable_ImagenesMovimientosGeneralesSegui.fnClearTable()
            datos = await
                $.ajax({
                    method: "POST",
                    url: "/Resultados/ImagMovimientoImagenesSeleccionarPorIdPaciente",
                    data: data,
                    dataType: "json",
                    cache: false,
                    processData: false,
                    contentType: false,
                });

            if (!isEmpty(datos.resultado)) {
                if (datos.resultado.length > 0) {
                    oTable_ImagenesMovimientosGeneralesSegui.fnAddData(datos.resultado)
                }

            }
        } catch (error) {
            alerta('danger', '', error);
        }
        //return resp;
    },

    DatablesDiagnosticosSeguimiento() {
        var parms = {
            "scrollY": "145px",
            order: [[0, "desc"]],
            "scrollCollapse": true,
            data: null,
            destroy: true,
            info: false,
            bFilter: false,
            paging: false,
            responsive: true,
            buttons: ['copy', 'csv', 'print'],
            columns: [
                {

                    data: "diagnostico",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                        $(td).html(rowData.codigo + ' ' + rowData.diagnostico)
                    }
                },
                {
                    data: "tipoDiagnostico",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')


                    }
                }


            ]

        }

        var tableWrapper = $('#tblDiagSgui'); // datatable creates the table wrapper by adding with id {your_table_id}_wrapper
        //tableWrapper.find('.dataTables_length select').select2(); // initialize select2 dropdown
        oTable_diagnosticosSegui = $("#tblDiagSgui").dataTable(parms);
    },

    DataTablesEvaluacionSeguimiento() {
        var parms = {
            scrollY: "145px",
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
                    width: "15%",
                    targets: 0,
                    data: "IdNumero",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    width: "85%",
                    targets: 1,
                    data: "Medico",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')

                    }
                }
            ]

        }

        var tableWrapperEmer = $('#tblEvaluacionesEmergenciaSegui'); // datatable creates the table wrapper by adding with id {your_table_id}_wrapper

        oTable_EvaEmerSegui = $("#tblEvaluacionesEmergenciaSegui").dataTable(parms);
    },

    DatablesDiagnosticosEvalSeguimiento() {
        var parms = {
            "scrollY": "145px",
            order: [[0, "desc"]],
            "scrollCollapse": true,
            data: null,
            destroy: true,
            info: false,
            bFilter: false,
            paging: false,
            responsive: true,
            buttons: ['copy', 'csv', 'print'],
            columns: [
                {

                    data: "diagnostico",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                        $(td).html(rowData.codigo + ' - ' + rowData.diagnostico)
                    }
                },
                {
                    data: "tipoDiagnostico",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')


                    }
                }


            ]

        }

        var tableWrapper = $('#tblDiagEvalSgui'); // datatable creates the table wrapper by adding with id {your_table_id}_wrapper
        //tableWrapper.find('.dataTables_length select').select2(); // initialize select2 dropdown
        oTable_diagnosticosEvalSegui = $("#tblDiagEvalSgui").dataTable(parms);
    },

    DataTablesOrdenesMedicas() {
        var parms = {
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
                    width: "8%",
                    targets: 0,
                    data: "IdReceta",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                        if (rowData.idEstado == 2) {
                            $(td).parent().css('color', '#00cc99');
                            $(td).parent().css('font-weight', 'bold');
                        }
                    }
                },
                {
                    width: "18%",
                    targets: 1,
                    data: "PuntoCarga",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                {
                    width: "40%",
                    targets: 2,
                    data: "Medico",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')

                    }
                },
                {
                    width: "14%",
                    targets: 3,
                    data: "FechaRecetaMedica",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')

                    }
                },
                {
                    width: "12%",
                    targets: 4,
                    data: "estadoReceta",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')

                    }
                },
                {
                    width: "8%",
                    targets: 1,
                    data: null,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')

                        // if (rowData.code != '') {
                        //     var btnRuta = "";
                        //     var btnImprime = "";
                        //     var btnImprimeSinF = "";
                        //     if (rowData.statusFirma == 1) {
                        //         btnImprime = ' <button class="ImprimirRecetaSeguiCF btn btn-sm btn-deep-green glow_button"><i class="fa fa-print"></i> </button>';
                        //     } else {
                        //         btnImprimeSinF = '<button class="ImprimirRecetaSeguiSF btn btn-sm btn-deep-orange glow_button"><i class="fa fa-print"></i> </button>';
                        //     }
                        //     $(td).html(btnRuta + " " + btnImprime + " " + btnImprimeSinF);
                        // } else {
                        //     $(td).html('');
                        // }

                        $(td).html('');
                    }
                }
            ]

        }

        var tableWrapperEmer = $('#tblOrdenesMedicasSegui'); // datatable creates the table wrapper by adding with id {your_table_id}_wrapper

        oTable_OrdenesMedicasSegui = $("#tblOrdenesMedicasSegui").dataTable(parms);
    },

    DataTableslaboratorioMovimientos() {
        var parms = {
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
                    width: "8%",
                    targets: 0,
                    data: "IdMovimiento",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                        if (rowData.idEstado == 2) {
                            $(td).parent().css('color', '#00cc99');
                            $(td).parent().css('font-weight', 'bold');
                        }
                    }
                },
                {
                    width: "15%",
                    targets: 1,
                    data: "PuntoCarga",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                //{
                //    width: "10%",
                //    targets: 2,
                //    data: "codigo",
                //    createdCell: function (td, cellData, rowData, row, col) {
                //        $(td).attr('align', 'left')

                //    }
                //},
                {
                    width: "32%",
                    targets: 2,
                    data: "Examen",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')

                    }
                },
                {
                    width: "25%",
                    targets: 3,
                    data: "OrdenaPrueba",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')

                    }
                },
                //{
                //    width: "10%",
                //    targets: 4,
                //    data: "fecha",
                //    createdCell: function (td, cellData, rowData, row, col) {
                //        $(td).attr('align', 'left')

                //    }
                //},
                {
                    width: "12%",
                    targets: 4,
                    data: "FechaResultado",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')

                    }
                },
                //{
                //    width: "5%",
                //    targets: 7,
                //    data: "tieneResultado",
                //    createdCell: function (td, cellData, rowData, row, col) {
                //        $(td).attr('align', 'left')

                //    }
                //},
                {
                    width: "8%",
                    targets: 5,
                    data: null,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')

                        var btnRuta = "";
                        var btnImprime = "";
                        var btnImprimeSinF = "";
                        console.log(rowData.TieneResultado, 'fdfds')
                        if (rowData.TieneResultado == 'SI') {
                            //     if (rowData.tienePdf == 1) {
                            //         if (rowData.code != '') {
                            //             if (rowData.statusFirma == 1) {
                            //                 btnImprime = ' <button class="ImprimirResultadoLabSeguiCF btn btn-sm btn-success glow_button"><i class="fa fa-print"></i> </button>';
                            //             } else {
                            //                 btnImprimeSinF = '<button class="ImprimirResultadoLabSeguiSF btn btn-sm btn-warning glow_button"><i class="fa fa-eye"></i> </button>';
                            //             }
                            //             $(td).html(btnRuta + " " + btnImprime + " " + btnImprimeSinF);
                            //         }
                            //     } else {
                            $(td).html('SI');
                            //     }
                        } else {
                            $(td).html('NO');
                        }
                        // $(td).html('');
                    }
                }
            ]

        }

        var tableWrapperEmer = $('#tblLaboratorioMovimientosSegui'); // datatable creates the table wrapper by adding with id {your_table_id}_wrapper

        oTable_LaboratorioMovimientosSegui = $("#tblLaboratorioMovimientosSegui").dataTable(parms);
    },

    DataTablesImagenesMovimientos() {
        var parms = {
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
                    width: "8%",
                    targets: 0,
                    data: "idMovimiento",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                        if (rowData.idEstado == 2) {
                            $(td).parent().css('color', '#00cc99');
                            $(td).parent().css('font-weight', 'bold');
                        }
                    }
                },
                {
                    width: "15%",
                    targets: 1,
                    data: "puntoCarga",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                //{
                //    width: "10%",
                //    targets: 2,
                //    data: "codigo",
                //    createdCell: function (td, cellData, rowData, row, col) {
                //        $(td).attr('align', 'left')

                //    }
                //},
                {
                    width: "32%",
                    targets: 2,
                    data: "examen",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')

                    }
                },
                {
                    width: "25%",
                    targets: 3,
                    data: "ordenaPrueba",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')

                    }
                },
                //{
                //    width: "10%",
                //    targets: 4,
                //    data: "fecha",
                //    createdCell: function (td, cellData, rowData, row, col) {
                //        $(td).attr('align', 'left')

                //    }
                //},
                {
                    width: "12%",
                    targets: 4,
                    data: "fechaResultado",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')

                    }
                },
                //{
                //    width: "5%",
                //    targets: 7,
                //    data: "tieneResultado",
                //    createdCell: function (td, cellData, rowData, row, col) {
                //        $(td).attr('align', 'left')

                //    }
                //},
                {
                    width: "8%",
                    targets: 5,
                    data: null,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')

                        var btnRuta = "";
                        var btnImprime = "";
                        var btnImprimeSinF = "";
                        if (rowData.tieneResultado == 'SI') {
                            if (rowData.tienePdf == 1) {
                                if (rowData.code != '') {
                                    if (rowData.statusFirma == 1) {
                                        btnImprime = ' <button class="ImprimirResultadoImgSeguiCF btn btn-sm btn-success glow_button"><i class="fa fa-print"></i> </button>';
                                    } else {
                                        btnImprimeSinF = '<button class="ImprimirResultadoImgSeguiSF btn btn-sm btn-warning glow_button"><i class="fa fa-eye"></i> </button>';
                                    }
                                    $(td).html(btnRuta + " " + btnImprime + " " + btnImprimeSinF);
                                }
                            } else {
                                $(td).html('SI');
                            }
                        } else {
                            $(td).html('NO');
                        }

                    }
                }
            ]

        }

        var tableWrapperEmer = $('#tblImagenesMovimientosSegui'); // datatable creates the table wrapper by adding with id {your_table_id}_wrapper

        oTable_ImagenesMovimientosSegui = $("#tblImagenesMovimientosSegui").dataTable(parms);
    },

    DataTablesOrdenesMedicasGenerales() {
        var parms = {
            scrollY: "350px",
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
                    width: "6%",
                    targets: 0,
                    data: "IdCuentaAtencion",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                        if (rowData.idEstado == 2) {
                            $(td).parent().css('color', '#00cc99');
                            $(td).parent().css('font-weight', 'bold');
                        }
                    }
                },
                {
                    width: "15%",
                    targets: 1,
                    data: "Servicio",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                {
                    width: "6%",
                    targets: 2,
                    data: "IdReceta",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    width: "12%",
                    targets: 3,
                    data: "PuntoCarga",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                {
                    width: "36%",
                    targets: 4,
                    data: "Medico",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')

                    }
                },
                {
                    width: "10%",
                    targets: 3,
                    data: "FechaRecetaMedica",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')

                    }
                },
                {
                    width: "9%",
                    targets: 4,
                    data: "estadoReceta",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')

                    }
                },
                {
                    width: "6%",
                    targets: 5,
                    data: null,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                        $(td).html('');
                        // if (rowData.code != '') {
                        //     var btnRuta = "";
                        //     var btnImprime = "";
                        //     var btnImprimeSinF = "";
                        //     if (rowData.statusFirma == 1) {
                        //         btnImprime = ' <button class="ImprimirRecetaGeneralesSeguiCF btn btn-sm btn-deep-green glow_button"><i class="fa fa-print"></i> </button>';
                        //     } else {
                        //         btnImprimeSinF = '<button class="ImprimirRecetaGeneralesSeguiSF btn btn-sm btn-deep-orange glow_button"><i class="fa fa-print"></i> </button>';
                        //     }
                        //     $(td).html(btnRuta + " " + btnImprime + " " + btnImprimeSinF);
                        // } else {
                        //     $(td).html('');
                        // }
                    }
                }
            ]

        }

        var tableWrapperEmer = $('#tblOrdenesMedicasGeneralesSegui'); // datatable creates the table wrapper by adding with id {your_table_id}_wrapper

        oTable_OrdenesMedicasGeneralesSegui = $("#tblOrdenesMedicasGeneralesSegui").dataTable(parms);
    },

    DataTableslaboratorioMovimientosGenerales() {
        var parms = {
            scrollY: "350px",
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
                    width: "6%",
                    targets: 0,
                    data: "idCuentaAtencion",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                        if (rowData.idEstado == 2) {
                            $(td).parent().css('color', '#00cc99');
                            $(td).parent().css('font-weight', 'bold');
                        }
                    }
                },
                {
                    width: "15%",
                    targets: 1,
                    data: "servicio",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                {
                    width: "6%",
                    targets: 2,
                    data: "idMovimiento",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    width: "10%",
                    targets: 3,
                    data: "puntoCarga",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                {
                    width: "27%",
                    targets: 4,
                    data: "examen",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')

                    }
                },
                {
                    width: "20%",
                    targets: 5,
                    data: "ordenaPrueba",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')

                    }
                },
                {
                    width: "10%",
                    targets: 6,
                    data: "fechaResultado",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')

                    }
                },
                {
                    width: "6%",
                    targets: 7,
                    data: null,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')

                        var btnRuta = "";
                        var btnImprime = "";
                        var btnImprimeSinF = "";
                        if (rowData.tieneResultado == 'SI') {
                            if (rowData.tienePdf == 1) {
                                if (rowData.code != '') {
                                    if (rowData.statusFirma == 1) {
                                        btnImprime = ' <button class="ImprimirResultadoLabGeneralesSeguiCF btn btn-sm btn-success glow_button"><i class="fa fa-print"></i> </button>';
                                    } else {
                                        btnImprimeSinF = '<button class="ImprimirResultadoLabGeneralesSeguiSF btn btn-sm btn-warning glow_button"><i class="fa fa-eye"></i> </button>';
                                    }
                                    $(td).html(btnRuta + " " + btnImprime + " " + btnImprimeSinF);
                                }
                            } else {
                                $(td).html('SI');
                            }
                        } else {
                            $(td).html('-');
                        }

                    }
                }
            ]

        }

        var tableWrapperEmer = $('#tblLaboratorioMovimientosGeneralesSegui'); // datatable creates the table wrapper by adding with id {your_table_id}_wrapper

        oTable_LaboratorioMovimientosGeneralesSegui = $("#tblLaboratorioMovimientosGeneralesSegui").dataTable(parms);
    },

    DataTablesImagenesMovimientosGenerales() {
        var parms = {
            scrollY: "350px",
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
                    width: "6%",
                    targets: 0,
                    data: "idCuentaAtencion",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                        if (rowData.idEstado == 2) {
                            $(td).parent().css('color', '#00cc99');
                            $(td).parent().css('font-weight', 'bold');
                        }
                    }
                },
                {
                    width: "15%",
                    targets: 1,
                    data: "servicio",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                {
                    width: "6%",
                    targets: 2,
                    data: "idMovimiento",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    width: "10%",
                    targets: 3,
                    data: "puntoCarga",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                {
                    width: "27%",
                    targets: 4,
                    data: "examen",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')

                    }
                },
                {
                    width: "20%",
                    targets: 5,
                    data: "ordenaPrueba",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')

                    }
                },
                {
                    width: "10%",
                    targets: 6,
                    data: "fechaResultado",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')

                    }
                },
                {
                    width: "6%",
                    targets: 7,
                    data: null,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')

                        var btnRuta = "";
                        var btnImprime = "";
                        var btnImprimeSinF = "";
                        if (rowData.tieneResultado == 'SI') {
                            if (rowData.tienePdf == 1) {
                                if (rowData.code != '') {
                                    if (rowData.statusFirma == 1) {
                                        btnImprime = ' <button class="ImprimirResultadoImgGeneralesSeguiCF btn btn-sm btn-success glow_button"><i class="fa fa-print"></i> </button>';
                                    } else {
                                        btnImprimeSinF = '<button class="ImprimirResultadoImgGeneralesSeguiSF btn btn-sm btn-warning glow_button"><i class="fa fa-eye"></i> </button>';
                                    }
                                    $(td).html(btnRuta + " " + btnImprime + " " + btnImprimeSinF);
                                }
                            } else {
                                $(td).html('SI');
                            }
                        } else {
                            $(td).html('NO');
                        }

                    }
                }
            ]

        }

        var tableWrapperEmer = $('#tblImagenesMovimientosGeneralesSegui'); // datatable creates the table wrapper by adding with id {your_table_id}_wrapper

        oTable_ImagenesMovimientosGeneralesSegui = $("#tblImagenesMovimientosGeneralesSegui").dataTable(parms);
    },

    Events: () => {

        $('.nav-tabs a').on('shown.bs.tab', function (event) {
            oTable_cuentas.fnDraw()
            oTable_diagnosticosEvalSegui.fnDraw()
            oTable_OrdenesMedicasSegui.fnDraw()
            oTable_EvaEmerSegui.fnDraw()
            oTable_LaboratorioMovimientosSegui.fnDraw()
            oTable_ImagenesMovimientosSegui.fnDraw()

            oTable_ImagenesMovimientosGeneralesSegui.fnDraw()
            oTable_LaboratorioMovimientosGeneralesSegui.fnDraw()
            oTable_OrdenesMedicasGeneralesSegui.fnDraw()

            oTable_diagnosticosSegui.fnDraw()
            //console.log("entroooo");
        });

        $("#modalSeguimiento").on("shown.bs.modal", function () {
            oTable_cuentas.fnDraw()
            oTable_diagnosticosEvalSegui.fnDraw()
            oTable_OrdenesMedicasSegui.fnDraw()
            oTable_EvaEmerSegui.fnDraw()
            oTable_LaboratorioMovimientosSegui.fnDraw()
            oTable_ImagenesMovimientosSegui.fnDraw()

            oTable_ImagenesMovimientosGeneralesSegui.fnDraw()
            oTable_LaboratorioMovimientosGeneralesSegui.fnDraw()
            oTable_OrdenesMedicasGeneralesSegui.fnDraw()

            oTable_diagnosticosSegui.fnDraw()

        });

        $("#modalRecetaSegui").on("shown.bs.modal", function () {
            oTable_rayosOrdRes.fnDraw()
            oTable_ecoObsOrdRes.fnDraw()
            oTable_ecoGeneralOrdRes.fnDraw()
            oTable_PatoClinicaOrdRes.fnDraw()
            oTable_anatPatologicaOrdRes.fnDraw()
            oTable_bancoSangreOrdRes.fnDraw()
            oTable_farmaciaOrdes.fnDraw()

        });

        $('#tblOrdenesMedicasGeneralesSegui tbody').on('click', '.ImprimirRecetaGeneralesSeguiSF', async function () {
            var objrow = oTable_OrdenesMedicasGeneralesSegui.row($(this).parents("tr")[0]).index();
            var row = oTable_OrdenesMedicasGeneralesSegui.row(objrow).data();

            console.log(row);
            Cargando(1);
            $.ajax({
                url: '/Recetas/informes/generarPDF/' + row.IdReceta,
                method: 'GET',
                success: function (response) {
                    if (response.pdf_url) {
                        // Coloca la URL del PDF en el src del iframe
                        $('#frame-pdf').attr('src', response.pdf_url);

                        // Abre el modal
                        $('#pdfModal').modal('show');
                    } else {
                        console.error('Error al generar el PDF.');
                    }
                },
                error: function (error) {
                    console.error('Error en la solicitud AJAX:', error);
                }
            });
            Cargando(0);
            /*
            const firma = await Utilitario.SeleccionarFirmaDigitalV2(row.code)
            if (!isEmpty(firma)) {
                AbrirVisorDocumento(firma.rutaArchivo, 0);
                //$('#tblOrdenesMedicas tbody tr').removeClass('selected');
            } else {
                alerta2('warning','','No existe el documento digital.')
            }
            */
        });

        // Buttons
        $("#btnSeguimiento").on('click', async function () {

            $('#txtNroHistoria').val($('#txtHistoria').val())
            $('#txtNombres').val($('#txtPacienteNombre').val())

            $("#SeguimientoCE").hide();
            $("#SeguimnientoEMER").hide();

            await Seguimiento.ListaAtencionesByIdPaciente($('#hdIdPaciente').val())
            await Seguimiento.ListarOrdenesMedicasPorIdPaciente($('#hdIdPaciente').val())
            await Seguimiento.LabMovimientoLaboratorioSeleccionarPorIdPaciente($('#hdIdPaciente').val())
            await Seguimiento.ImagMovimientoImagenesSeleccionarPorIdPaciente($('#hdIdPaciente').val())

            console.log('segui1');
            $('#modalSeguimiento').modal('show')
            console.log('segui2');
        });

        $("#btnCerrarSeguimiento").on('click', function () {
            $('#hdIdCuentaAtencion').val(0);
            // SeguimientoPaciente.limpiaDatos();

            $("#SeguimientoCE").hide();
            $("#SeguimnientoEMER").hide();
            $('#lblDatosAtencionCuenta').html("");
            $('#lblDatosAtencionFechaIngreso').html("");
            $('#lblDatosAtencionServicio').html("");
            $('#lblDatosAtencionTipoServicio').html("");

            $("#modalSeguimiento").modal('hide');
        });

        $('#btnConsultarOrdenMedicaSegui').on('click', async function () {
            var objrowTb = oTable_OrdenesMedicasSegui.api(true).row('.selected').data();
            if (!isEmpty(objrowTb)) {
<<<<<<< HEAD
=======
                console.log('datoss tabala ordenes seguimientos', objrowTb)
>>>>>>> c43206bf175774a3bfc1e1fc1e2cd58a60d1e406
                Seguimiento.CargarRecetaDetalle(objrowTb);
                $("#modalRecetaSegui").modal("show");
            } else {
                alerta('info', 'No se ha seleccionado ninguna receta.');
            }
        });

        $('#btnConsultarOrdenMedicaGeneralesSegui').on('click', async function () {
            var objrowTb = oTable_OrdenesMedicasGeneralesSegui.api(true).row('.selected').data();
            if (!isEmpty(objrowTb)) {
                Seguimiento.CargarRecetaDetalle(objrowTb);
                $("#modalRecetaSegui").modal("show");
            } else {
                alerta2('info', '', 'No se ha seleccionado ninguna receta.');
            }
        });
        $('#btnConsultarResultadoLabGeneralesSegui').on('click', async function () {
            var objrowTb = oTable_LaboratorioMovimientosGeneralesSegui.api(true).row('.selected').data();
            if (!isEmpty(objrowTb)) {
                //Seguimiento.CargarRecetaDetalle(objrowTb);
               // $("#modalRecetaSegui").modal("show");
               console.log('datos gene',objrowTb)
               console.log('ordenes generales',objrowTb.IdMovimiento,objrowTb.IdOrden,objrowTb.IdCuentaAtencion)
                await Resultados.CargarResultadosAP_PDF(objrowTb.IdMovimiento,objrowTb.IdOrden,objrowTb.IdCuentaAtencion);

            } else {
                alerta2('info', '', 'No se ha seleccionado ninguna receta.');
            }
        });
        ///Movimiento Laboratorios Generales
       

        ///7

        $('#btnCerrarRecetaSegui').on('click', function () {
            $('#modalRecetaSegui').modal('hide');
        });

        $('#btnBuscarPaciente').on('click', function () {
            NroHistoriaClinica = $('#txtNroHistoriaBusqueda').val();
            NroDocumento = $('#txtNroDocumentoBusqueda').val();
            NombreCompleto = $('#txtNroNombresBusqueda').val();

            // Validar que al menos uno tenga mínimo 5 caracteres
            if (
                NroHistoriaClinica.length < 5 &&
                NroDocumento.length < 5 &&
                NombreCompleto.length < 5
            ) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Validación',
                    text: 'Debe ingresar al menos 5 caracteres en alguno de los campos de búsqueda.'
                });
                return;
            }

            // Mostrar loader mientras se procesa
            Swal.fire({
                title: 'Buscando pacientes...',
                html: 'Por favor espere...',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            $.ajax({
                url: "/seguimiento/BuscarHCPacientes", 
                type: "POST", 
                data: {
                    NroHistoriaClinica : NroHistoriaClinica ,
                    NroDocumento : NroDocumento  ,
                    NombreCompleto : NombreCompleto 
                },
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') // Incluye el token CSRF
                },
                dataType: "json",
                success: function(response) {
                    Swal.close(); // Ocultar el loader
//dd(response);
                    if (response.resultado === "1" && response.data.length > 0) {
//                        alert('resultado:1 lengt:' + response.data.length);
                        if (response.data.length === 1) {
                            // Solo 1 resultado, llamamos directo
                            Seguimiento.PacientesSeleccionarPorNroHistoria(response.data[0].NroHistoriaClinica);
                        } else {
                            // Más de un resultado, mostrar modal para elegir
                            var html = '<table class="table table-hover">';
                            html += '<thead><tr><th>#</th><th>Nombre Completo</th><th>Nro Historia</th><th>Seleccionar</th></tr></thead><tbody>';
                            $.each(response.data, function(i, paciente) {
                                var nombreCompleto = paciente.ApellidoPaterno + ' ' + paciente.ApellidoMaterno + ' ' + paciente.Nombres;
                                html += '<tr>';
                                html += '<td>' + (i+1) + '</td>';
                                html += '<td>' + nombreCompleto + '</td>';
                                html += '<td>' + paciente.NroHistoriaClinica + '</td>';
                                html += '<td><button class="btn btn-primary btn-sm seleccionar-paciente" data-nrohistoria="' + paciente.NroHistoriaClinica + '">Seleccionar</button></td>';
                                html += '</tr>';
                            });
                            html += '</tbody></table>';

                            $('#modalPacientes .modal-body').html(html);
                            $('#modalPacientes').modal('show');

                            // Asignar evento click a botones seleccionar
                            $('.seleccionar-paciente').off('click').on('click', function() {
                                var nroHistoria = $(this).data('nrohistoria');
                                $('#modalPacientes').modal('hide');
                                Seguimiento.PacientesSeleccionarPorNroHistoria(nroHistoria);
                            });
                        }
                    } else if (response.resultado === "3") {

                        Swal.fire({
                            toast: true,
                            position: 'top-end',
                            icon: 'info',
                            title: 'Sesión expirada. Inicie sesión nuevamente.',
                            showConfirmButton: false,
                            timer: 2000,
                            timerProgressBar: true
                        });
                        
                    } else {
                        
                        Swal.fire({
                            toast: true,
                            position: 'top-end',
                            icon: 'warning',
                            title: 'No se encontraron datos con el número de cuenta.',
                            showConfirmButton: false,
                            timer: 2000,
                            timerProgressBar: true
                        });
                    }
                },
                error: function(xhr, status, error) {
                    Swal.close(); // Ocultar el loader
                    Swal.fire({
                        icon: "error",
                        title: "Error en la búsqueda",
                        text: "Ocurrió un problema al consultar los datos.",
                        confirmButtonText: "OK"
                    });
                }
            });


            //Seguimiento.PacientesSeleccionarPorNroHistoria($('#txtNroHistoriaBusqueda').val());
        });

        // Tables
        $('#tblCuentas tbody').on('click', 'tr', async function () {

            //if ($(this).hasClass('selected')) {
            //    $(this).removeClass('selected');

            //}
            //else {                
            $("#SeguimientoCE").hide();
            $("#SeguimnientoEMER").hide();

            oTable_cuentas.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
            $('.nav-tabs a[href="#diagnosticoCons"]').tab('show');
            var objrow = oTable_cuentas.api(true).row('.selected').data();
            if (!isEmpty(objrow)) {
                $('#lblDatosAtencionCuenta').html("Cuenta: " + objrow.IdCuentaAtencion);
                $('#lblDatosAtencionFechaIngreso').html("Fecha Ing.: " + objrow.fechaIngreso2);
                $('#lblDatosAtencionServicio').html("Servicio: " + objrow.Servicio);
                $('#lblDatosAtencionTipoServicio').html("Tipo Servicio: " + objrow.TipoServicio);

                Seguimiento.IdCuentaAtencionDetalle = objrow.IdCuentaAtencion

                // await Seguimiento.ListarDiagnosticosSeguimiento(0)

                if (objrow.IdTipoServicio == 1 || objrow.IdTipoServicio == 3) {
                    $("#SeguimientoCE").show();

                    $('#btnVerInformeAtencionSF').hide();
                    $('#btnVerInformeAtencionCF').hide();

                    let DxSeguimiento = await Seguimiento.ListarDiagnosticosSeguimiento(objrow.IdAtencion, 0)

                    oTable_diagnosticosSegui.fnClearTable()
                    if (DxSeguimiento.resultado.length > 0) {
                        oTable_diagnosticosSegui.fnAddData(DxSeguimiento.resultado)
                    }

                    $('#txtMotivoConsultaSeg').val(objrow.CitaMotivo);
                    $('#txtExamenClinicoSeg').val(objrow.CitaExamenClinico);
                    $('#txtTratamientoSeg').val(objrow.CitaTratamiento);
                    $('#txtAntecedentesSeg').val(objrow.CitaAntecedente);
                    // if (objrow.statusFirma == 0) {
                    //     $('#btnVerInformeAtencionSF').show();
                    // } else if (objrow.statusFirma == 1) {
                    //     $('#btnVerInformeAtencionCF').show();
                    // }
                    // $('#btnVerInformeAtencionSF').show();
                    // SeguimientoPaciente.listaDiagosticos();
                    // SeguimientoPaciente.llenaOtrosDatos();
                    // await SeguimientoPaciente.CargarOrdenesMedicasPorIdCuentaAtencion(objrow.idCuentaAtencion);
                    // await SeguimientoPaciente.CargarLaboratorioMovimientosPorIdCuentaAtencion(objrow.idCuentaAtencion);
                    // await SeguimientoPaciente.CargarImagenesMovimientosPorIdCuentaAtencion(objrow.idCuentaAtencion);
                    //OrdenesYResultados.limpiarCatalogo();
                    //OrdenesYResultados.listaCabeceraRecetasByIdCuenta(objrow.idCuentaAtencion, 0)

                    let Recetas = await Seguimiento.CargarOrdenesMedicasPorIdCuentaAtencion(objrow.IdCuentaAtencion,3); //HOSPI

                    oTable_OrdenesMedicasSegui.fnClearTable()
                    if (Recetas.resultado.length > 0) {
                        oTable_OrdenesMedicasSegui.fnAddData(Recetas.resultado)
                    }

                    Seguimiento.CargarLaboratorioMovimientos(objrow.IdCuentaAtencion)



                    $('#hdIdCuentaAtencion').val(objrow.idCuentaAtencion);             //KHOYOSI

                }

                if (objrow.IdTipoServicio == 2 || objrow.IdTipoServicio == 4) {
                    $("#SeguimnientoEMER").show();

                    $('#btnVerInformeEvaluacionSF').hide();
                    $('#btnVerInformeEvaluacionCF').hide();

                    let evaluacionDetalle = await Seguimiento.ListarEvaluacionEmergenciaDetalleByIdAtencion(objrow.IdAtencion, 0)

                    oTable_EvaEmerSegui.fnClearTable()
                    if (evaluacionDetalle.length > 0) {
                        oTable_EvaEmerSegui.fnAddData(evaluacionDetalle)
                    }

                    let Recetas = await Seguimiento.CargarOrdenesMedicasPorIdCuentaAtencion(objrow.IdCuentaAtencion,2); //EMERGENCIA

                    oTable_OrdenesMedicasSegui.fnClearTable()
                    if (Recetas.resultado.length > 0) {
                        oTable_OrdenesMedicasSegui.fnAddData(Recetas.resultado)
                    }

                    Seguimiento.CargarLaboratorioMovimientos(objrow.IdCuentaAtencion)

                    // await SeguimientoPaciente.SeleccionarEvaluacionDetalle(objrow.idAtencion, 0);

                    // await SeguimientoPaciente.CargarLaboratorioMovimientosPorIdCuentaAtencion(objrow.idCuentaAtencion);
                    // await SeguimientoPaciente.CargarImagenesMovimientosPorIdCuentaAtencion(objrow.idCuentaAtencion);
                    //await SeguimientoPaciente.listaDiagosticosPorEvaluacion(objrow.idAtencion, objrow.idServicio)
                    $('#hdIdCuentaAtencion').val(objrow.idCuentaAtencion);             //KHOYOSI
                }
                oTable_diagnosticosSegui.fnDraw()
                oTable_diagnosticosEvalSegui.fnDraw()


                // if (isEmpty(objrow.FechaEgreso)) {
                //     alerta('info', '', 'El paciente no ha sido atendido. No existen registros de atencion médica.');
                //     $('#btnVerInformeAtencionSF').hide();
                // }

            }

            //}
        });

        $('#tblEvaluacionesEmergenciaSegui tbody').on('click', 'tr', async function () {
            oTable_EvaEmerSegui.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');

            var objrowTb = oTable_EvaEmerSegui.api(true).row('.selected').data();

            if (!isEmpty(objrowTb)) {
                $('#btnVerInformeEvaluacionSF').hide();
                $('#btnVerInformeEvaluacionCF').hide();
                // if (objrowTb.statusFirma == 0) {
                $('#btnVerInformeEvaluacionSF').show();
                // } else if (objrowTb.statusFirma == 1) {                    
                //     $('#btnVerInformeEvaluacionCF').show();
                // }
                // $('#btnVerInformeEvaluacionSF').show();  

                let DxSeguimiento = await Seguimiento.ListarDiagnosticosSeguimiento(objrowTb.IdAtencion, objrowTb.IdNumero)

                oTable_diagnosticosEvalSegui.fnClearTable()
                if (DxSeguimiento.resultado.length > 0) {
                    oTable_diagnosticosEvalSegui.fnAddData(DxSeguimiento.resultado)
                }



                $('#txtImpresionDxEmerSeg').val(objrowTb.Seguimiento)
                $('#txtPlandeTrabajoEmerSeg').val(objrowTb.PlandeTrabajo)
                $('#txtTratamientoEmerSeg').val(objrowTb.Tratamiento)


                // await SeguimientoPaciente.listaDiagosticosPorEvaluacion(objrowTb.idAtencion, objrowTb.idServicio, objrowTb.idNumero, 8);
                // SeguimientoPaciente.llenaOtrosDatosEval(objrowTb);
            } else {
                swal.fire({
                    title: 'Evaluaciones',
                    text: "No se ha seleccionado ninguna evaluación.",
                    type: 'info',
                    allowOutsideClick: false,
                }).done();
            }
        });

        $('#tblOrdenesMedicasSegui tbody').on('click', 'tr', async function () {
            oTable_OrdenesMedicasSegui.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        });

        $('#tblOrdenesMedicasGeneralesSegui tbody').on('click', 'tr', async function () {
            oTable_OrdenesMedicasGeneralesSegui.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        });
        $('#tblLaboratorioMovimientosGeneralesSegui tbody').on('click', 'tr', async function () {
            oTable_LaboratorioMovimientosGeneralesSegui.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        });

        $('#btnVerInformeEvaluacionSF').on('click', async function () {
            var objrow = oTable_EvaEmerSegui.api(true).row('.selected').data();

            Cargando(1);
            $.ajax({
                url: '/EvaluacionEmergencia/informes/generarPDF/' + objrow.IdAtencion + '?eval=' + objrow.IdNumero,
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
            /*if (isEmpty(objrow)) {
                alerta(2, 'Seleccione una evaluación por favor.');
            } else {
                const firma = await Utilitario.SeleccionarFirmaDigitalV2(objrow.code)
                if (!isEmpty(firma)) {
                    AbrirVisorDocumento(firma.rutaArchivo, 0);
                } else {
                    //alerta2('warning', '', 'El documento digital no está generado.');
                    alerta('2', 'El documento no esta generado, se procedera a generar el documento.');
                    if (objrow.idServicio == 6) {
                        const pdf = await Utilitario.GenerarHojaEvaluacionNeonatal(objrow.idCuentaAtencion, objrow.idEvaluacionDetalle, objrow.idAtencion, objrow.idServicio, objrow.idNumero);
                    } else {
                        const pdf = await Utilitario.GenerarHojaEvaluacionEmergencia(objrow.idCuentaAtencion, objrow.idEvaluacionDetalle, objrow.idAtencion, objrow.idServicio, objrow.idNumero);
                    }                    
                    $('#btnBuscarPaciente').click();
                }
            }*/
            Cargando(0);
        });

    }
}
