DTLaboratorioMovimientos = null;
DTImagenesMovimientos = null;
DTresultadosExamenes = null;

var Resultados = {
    IniciarScript() {
        Resultados.IniciarDataTables();
        Resultados.Eventos();
    },

    IniciarData() {

    },

    IniciarDataTables() {
        Resultados.IniciarDataTableslaboratorioMovimientos();
        Resultados.IniciarDataTablesImagenesMovimientos();
        Resultados.IniciarDataTableResultados();
        
    },

    Limpiar() {

    },

    // <summary>
    // DATATABLES
    // </summary>
    // INICIALIZA EVENTOS
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    Eventos() {
        $('.nav-tabs a').on('shown.bs.tab', function (event) {
            DTLaboratorioMovimientos.columns.adjust().draw();
            DTImagenesMovimientos.columns.adjust().draw();            
        });
        $('#hdIdPaciente').val()
        

        // Resultados.CargarLaboratorioMovimientos( $('#hdIdPaciente').val());
        $('#btnCerrarResultadoLabImg').on('click', function () {
            Resultados.Limpiar();
            $('#modalResultadosLabImg').modal('hide');
        });

        //---------------------------------LABORATORIO--------------------------------------------//
        $('#tblLaboratorioMovimientos tbody').on('click', 'tr', async function () {           
            DTLaboratorioMovimientos.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        });

        $('#btnConsultarResultadoLab').on('click', async function () {
            var objrowTb = DTLaboratorioMovimientos.row('.selected').data();
            if (!isEmpty(objrowTb)) {
               await Resultados.CargarResultadosAP_PDF(objrowTb.idMovimiento,objrowTb.idOrden,objrowTb.idCuentaAtencion);
            } else {
                alerta('warning', '', 'No se ha seleccionado ninguna receta.');
            }
        });
                
        $('#tblLaboratorioMovimientos tbody').on('click', '.ImprimirResultadoLabSF', async function () {
            var objrow = DTLaboratorioMovimientos.row($(this).parents("tr")[0]).index();
            var row = DTLaboratorioMovimientos.fnGetData(objrow);

            Cargando(1);
            const firma = await Utilitario.SeleccionarFirmaDigitalV2(row.code)
            if (!isEmpty(firma)) {
                AbrirVisorDocumento(firma.rutaArchivo, 0);
            } else {
                alerta('warning', '', 'No existe el documento digital.')
            }
            Cargando(0);
        });

        $('#tblLaboratorioMovimientos tbody').on('click', '.ImprimirResultadoLabCF', async function () {
            var objrow = DTLaboratorioMovimientos.row($(this).parents("tr")[0]).index();
            var row = DTLaboratorioMovimientos.fnGetData(objrow);
            await Utilitario.AbrirDocumentoFirmadoBit4Id(row.code);
        });

        //----------------------------------IMAGENOLOGÍA------------------------------------------------//
        /*$('#tblImagenesMovimientos tbody').on('click', 'tr', async function () {
            DTImagenesMovimientos.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        });

        $('#btnConsultarResultadoImg').on('click', async function () {
            var objrowTb = DTImagenesMovimientos.row('.selected').data();
            if (!isEmpty(objrowTb)) {
                await Resultados.CargarResultadosImagenesLaboratorio(objrowTb.idProducto, objrowTb.idOrden, 'IMG');
            } else {
                alerta('warning', '', 'No se ha seleccionado ninguna receta.');
            }
        });

        $('#tblImagenesMovimientos tbody').on('click', '.ImprimirResultadoImgSF', async function () {
            var objrow = DTImagenesMovimientos.row($(this).parents("tr")[0]).index();
            var row = DTImagenesMovimientos.fnGetData(objrow);

            Cargando(1);
            const firma = await Utilitario.SeleccionarFirmaDigitalV2(row.code)
            if (!isEmpty(firma)) {
                AbrirVisorDocumento(firma.rutaArchivo, 0);
            } else {
                alerta('warning', '', 'No existe el documento digital.')
            }
            Cargando(0);
        });

        $('#tblImagenesMovimientos tbody').on('click', '.ImprimirResultadoImgCF', async function () {
            var objrow = DTImagenesMovimientos.row($(this).parents("tr")[0]).index();
            var row = DTImagenesMovimientos.fnGetData(objrow);
            await Utilitario.AbrirDocumentoFirmadoBit4Id(row.code);
        });*/
    },
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // <summary>
    // DATATABLES
    // </summary>
    // INICIALIZA DATA TABLE
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    IniciarDataTableslaboratorioMovimientos() {        
        DTLaboratorioMovimientos = $("#tblLaboratorioMovimientos").DataTable({
            scrollY: "250px",
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
                {
                    width: "12%",
                    targets: 4,
                    data: "fechaResultado",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')

                    }
                },
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
                            $(td).html('SI');
                            /*if (rowData.tienePdf == 1) {
                                if (rowData.code != '') {
                                    if (rowData.statusFirma == 1) {
                                        btnImprime = ' <button class="ImprimirResultadoLabCF btn btn-sm btn-success glow_button"><i class="fa fa-print"></i> </button>';
                                    } else {
                                        btnImprimeSinF = '<button class="ImprimirResultadoLabSF btn btn-sm btn-warning glow_button"><i class="fa fa-eye"></i> </button>';
                                    }
                                    $(td).html(btnRuta + " " + btnImprime + " " + btnImprimeSinF);
                                }
                            } else {
                                $(td).html('SI');
                            }   */
                        } else {
                            $(td).html('-');
                        }
                        
                    }
                }
            ]
        });
        
    },

    IniciarDataTablesImagenesMovimientos() {
        DTImagenesMovimientos = $("#tblImagenesMovimientos").DataTable({
            scrollY: "250px",
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
                {
                    width: "12%",
                    targets: 4,
                    data: "fechaResultado",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')

                    }
                },                
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
                                        btnImprime = ' <button class="ImprimirResultadoImgCF btn btn-sm btn-success glow_button"><i class="fa fa-print"></i> </button>';
                                    } else {
                                        btnImprimeSinF = '<button class="ImprimirResultadoImgSF btn btn-sm btn-warning glow_button"><i class="fa fa-eye"></i> </button>';
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
        });
               
    },

    IniciarDataTableResultados() {
        DTresultadosExamenes = $("#tblResultadosExamenes").dataTable({
            "scrollY": "440px",
            "scrollCollapse": true,
            "targets": 'no-sort',
            "bSort": false,
            destroy: true,
            info: false,
            bFilter: false,
            paging: false,
            responsive: true,
        });
        
        //$('#tblResultadosExamenes_length').css('display', 'none');
        //$('#tblResultadosExamenes').DataTable().columns.adjust();

    },

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // <summary>
    // DATATABLES
    // </summary>
    // INICIALIZA CONSUMO BD
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    async CargarLaboratorioMovimientos(IdCuentaAtencion,NumEvaluacion) { 
        // var resp = [];
        let datos;
        var data = new FormData();

        data.append('_token', $("meta[name='csrf-token']").attr("content"));
        data.append('IdCuentaAtencion', IdCuentaAtencion);
        // data.append('NumEvaluacion', NumEvaluacion);


        try {
            DTLaboratorioMovimientos.clear().draw();
            datos = await
                $.ajax({
                    method: "POST",
                    url: "/Resultados/CargarMovimientosLaboratorioHosp",
                    data: data,
                    dataType: "json",
                    cache: false,
                    processData: false,
                    contentType: false,
                });

                console.log( 'datos de resultados',datos )
            if (!isEmpty(datos.resultado)) {
                DTLaboratorioMovimientos.rows.add(datos.resultado).draw(false);
                return datos;
            }
        } catch (error) {
            alerta('danger','', error);
        }
        //return resp;
    },
    async CargarResultadosAP_PDF(Idmovimiento,IdOrden,idCuentaAtencion) { 
        // var resp = [];
        let datos;
        var data = new FormData();

        data.append('_token', $("meta[name='csrf-token']").attr("content"));
        data.append('Idmovimiento', Idmovimiento);
        data.append('IdOrden', IdOrden);
        data.append('idCuentaAtencion', idCuentaAtencion);
        try {
            datos = await
                $.ajax({
                    method: "POST",
                    url: "/Resultados/CargarResultadosAP_PDF",
                    data: data,
                    dataType: "json",
                    cache: false,
                    processData: false,
                    contentType: false,
                });

                console.log('datos de resultados AP PDF',datos )
              
                 if (datos) {
                    if(datos.resultado == 2){
                        toastr.warning(datos.mensaje, "Aviso")
                    }else{
                        $('#frame-pdf').attr('src', datos.pdf_url);
                         $('#pdfModal').modal('show');
                    }
                  
                  
                 }
                    else {
                     toastr.warning(res.mensaje, "Aviso")
                  }
           }catch (error) {
            alerta('danger','', error);
        }
        
    },
    

    /*async CargarImagenesMovimientosPorIdCuentaAtencion(idCuenta) {
        //var resp = [];
        let datos;
        var data = new FormData();

        data.append('idCuentaAtencion', idCuenta);

        try {
            DTImagenesMovimientos.clear().draw();
            datos = await
                $.ajax({
                    method: "POST",
                    url: "/ImagenesResultados/ListarMovimientosPorCuenta?area=Imagenes",
                    data: data,
                    dataType: "json",
                    cache: false,
                    processData: false,
                    contentType: false,
                });

            if (!isEmpty(datos.resultado)) {
                DTImagenesMovimientos.rows.add(datos.resultado).draw(false);
            }
        } catch (error) {
            alerta('danger','', error);
        }
        //return resp;
    },*/

    async CargarResultadosImagenesLaboratorio(idProducto, idOrden, tipo) {        
        var hmltTabla = "";
        var data = new FormData();

        data.append('_token', $("meta[name='csrf-token']").attr("content"));
        data.append('idOrden', idOrden);
        data.append('idProducto', idProducto);        
        data.append('tipo', tipo);

        try {
            DTresultadosExamenes.clear().draw();
            $('#lblNombreExamen').html("");
            $('#tbodyResultados').html("");
            datos = await
                $.ajax({
                    method: "POST",
                    url: "/Resultados/CargarResultadosLabImg",
                    data: data,
                    dataType: "json",
                    cache: false,
                    processData: false,
                    contentType: false,
                });
                            
            if (!isEmpty(datos.resultado)) {
                var resultados = datos.resultado;
                var idGrupoRes = 0
                var idItemRes = 0
                resultados.forEach(function (valor) {
                    $('#lblNombreExamen').html(valor.producto);
                    if (valor.idGrupo != idGrupoRes) {
                        idGrupoRes = valor.idGrupo;                        
                        hmltTabla = hmltTabla + "<tr style='background-color: #d3e4f5;font-weight:bold'><td colspan='3'><b>" + valor.grupo + "</b> </td></tr>";
                    }

                    if(valor.idItem != idItemRes){
                        idItemRes = valor.idItem;                        
                        hmltTabla = hmltTabla + "<tr><td>" + valor.item + " </td><td>" + valor.valor + "</td><td>" + valor.valorReferencial + "</td></tr>";
                    }      
                    //$('#txtObserOrdRes').val(valor.obseraciones + '\n' + valor.conclusiones);
                });
                $('#tbodyResultados').html(hmltTabla);
                //$('#tblResultadosExamenes').DataTable().columns.adjust();
                $('#modalResultadosLabImg').modal('show');

            } else {
                alerta('info', '', 'No existen resultados para el examen seleccionado.');
            }
        } catch (error) {
            alerta('danger','', error);
        }
                
    },

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    
}