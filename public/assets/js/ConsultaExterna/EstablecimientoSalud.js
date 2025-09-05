var EstablecimientoSalud = {
    opcionEst: '',

    IniciarScript() {
        EstablecimientoSalud.Eventos();
        EstablecimientoSalud.IniciarData();
        EstablecimientoSalud.InitDataTable();        
    },

    async IniciarData() {
        await EstablecimientoSalud.ListaDepartamentos();
    },

    
    Eventos() {
        $('#btnEstablecimientoDestino').on('click', function () {
            if ($("#cboDestino").val() == 12 || $("#cboDestino").val() == 13){
                EstablecimientoSalud.LimpiarBusquedaEstablecimiento();
                // EstablecimientoSalud.opcionEst = 'DR';
                $('#modalEstablecimientosBuscar').modal('show')

            } else {
                toastr.error('El destino de atencion no coincide para una busqueda de establecimientos.')
            }
        });

        $("#cboDestino").on('change', function() {

			$('#idestabldestino').val('');
			$('#ipressdestino').val('');
			$('#destino').val('');
			$('#cboNroReferencia').val('');

			$('#cboReferencia').prop('disabled', true);
			$('#cboNroReferencia').prop('disabled', true);

			if ($(this).val() == 12 || $(this).val() == 13){
                $("label[for='cboReferencia']").text('Referencia destino');

                if($(this).val() == 13)
                    $("label[for='cboReferencia']").text('Contrareferencia destino');

				$('#cboReferencia').prop('disabled', false);
				$('#cboNroReferencia').prop('disabled', false);
			}
			$('.chzn-select').chosen().trigger("chosen:updated");
		});

        // $('#btnEstablecimientoDestinoCR').on('click', function () {
        //     EstablecimientoSalud.LimpiarBusquedaEstablecimiento();
        //     EstablecimientoSalud.opcionEst = 'DCR';
        //     $('#modalEstablecimientosBuscar').modal('show')
        // });

        // $('#btnCerraEstablecimientoBuscar').on('click', function () {
        //     EstablecimientoSalud.LimpiarBusquedaEstablecimiento();
        //     $('#modalEstablecimientosBuscar').modal('hide')
        // });

        $('#cmbdepEstbuscar').on('change', function () {
            $('#cmbprovEstBuscar').empty();
            $('#cmbdistEstBuscar').empty();
            EstablecimientoSalud.ListaProvincias();
        });
        $('#cmbprovEstBuscar').on('change', function () {
            $('#cmbdistEstBuscar').empty();
            EstablecimientoSalud.ListaDistrito();
        });
        $('#btnCerraEstablecimientoBuscar').on('click', function () {
            oTable_EstSalud.fnClearTable();
            $('#modalEstablecimientosBuscar').modal('hide')
        });

        $('#btnBuscarEstablecimiento').on('click', function () {
            EstablecimientoSalud.BuscarEstablecimiento();
        });
        $('#btnLimpiarBusquedaEstablecimiento').on('click', function () {
            EstablecimientoSalud.LimpiarBusquedaEstablecimiento();
        });
    },

    InitDataTable() {
        var parms = {
            "paging": true,
            "ordering": true,
            "info": false,
            "scrollX": true,
            columns: [
                {
                    width: '5%',
                    targets: 0,
                    data: "codigo",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                {
                    width: '25%',
                    targets: 0,
                    data: "Nombre",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                {
                    width: '15%',
                    targets: 1,
                    data: "Distrito",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')

                    }
                },
                {
                    width: '15%',
                    targets: 2,
                    data: "Provincia",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')

                    }
                }
                ,
                {
                    width: '15%',
                    targets: 3,
                    data: "Departamento",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')

                    }
                }
                ,
                {
                    width: '10%',
                    targets: 4,
                    data: null,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css('text-align', 'center')

                        btnSeleccionar = '<button class="btn btn-success" title="Seleccionar" onclick="EstablecimientoSalud.SeleccionarEstablecimiento(' + rowData.IdEstablecimiento + ',\'' + rowData.codigo + '\',\'' + rowData.Nombre + '\')" data-toggle="tooltip" ><i class="fa fa-hand-o-up"></i> </button>';

                        $(td).html(btnSeleccionar);


                    }
                }


            ]

        }

        var tableWrapper = $('#tblEstSalud'); // datatable creates the table wrapper by adding with id {your_table_id}_wrapper
        //tableWrapper.find('.dataTables_length select').select2(); // initialize select2 dropdown
        oTable_EstSalud = $("#tblEstSalud").dataTable(parms);

    },

    // async EstablecimientosSaludTodos() {
    //     $.ajax({
    //         url: "/Utilitario/EstablecimientosSeleccionarTodos",
    //         datatype: "json",
    //         type: "get",
    //         processData: false,
    //         contentType: false,
    //         async: false,
    //         success: function (datos) {

    //             $('#cboOrigen').empty();
    //             if (datos.session) {
    //                 //console.log(datos.lsEstab.table);
    //                 $(datos.lsEstab.table).each(function (i, obj) {
    //                     $('#cboOrigen').append('<option  value="' + obj.idEstablecimiento + '">' + obj.nombre + '</option>');
    //                 });

    //                 $('.chzn-select').chosen().trigger("chosen:updated");
    //             }
    //             else {
    //                 location.reload();
    //             }
    //         },
    //         error: function (msg) {
    //             setTimeout(function () {
    //                 //                    Cargando(0);
    //                 alerta("ERROR", "Error al listar grados de instruccion!", "2");
    //             }, 900)
    //         }
    //     });
    // },

    async ListaDepartamentos() {

        $.ajax({
            url: "/ce/ListaDepartamentos",
            datatype: "json",
            type: "get",
            processData: false,
            contentType: false,
            async: false,
            success: function (res) {

                $('#cmbdepEstbuscar').empty();
                if (res.resultado == 1){
                    $(res.data).each(function (i, obj) {
                        $('#cmbdepEstbuscar').append('<option  value="' + obj.IdDepartamento + '">' + obj.Nombre + '</option>');
                    });

                    $('.chzn-select').chosen().trigger("chosen:updated");
                    $('#cmbdepEstbuscar').val(15);
                    EstablecimientoSalud.ListaProvincias();
                }
            },
            error: function (msg) {
                console.error(msg);
            }
        });
    },

    async ListaProvincias() {
        var midata = new FormData();
        midata.append('IdDepartamento', $('#cmbdepEstbuscar').val());
        midata.append('_token',$('[name="_token"]').val());
        $.ajax({
            url: "/ce/ListaProvinciasByDepartamentos",
            data: midata,
            datatype: "json",
            type: "post",
            processData: false,
            contentType: false,
            async: false,
            success: function (res) {

                $('#cmbprovEstBuscar').empty();
                if (res.resultado == 1) {
                    $(res.data).each(function (i, obj) {
                        $('#cmbprovEstBuscar').append('<option  value="' + obj.IdProvincia + '">' + obj.Nombre + '</option>');
                    });
                    $('#cmbprovEstBuscar').val("");
                    $('#cmbdistEstBuscar').val("");
                    $('.chzn-select').chosen().trigger("chosen:updated");
                }
            },
            error: function (msg) {
                console.error(msg);
            }
        });
    },

    async ListaDistrito() {
        var midata = new FormData();
        midata.append('IdDProvincia', $('#cmbprovEstBuscar').val());
        midata.append('_token',$('[name="_token"]').val());
        $.ajax({
            url: "/ce/ListaDistritosByProvincia",
            data: midata,
            datatype: "json",
            type: "post",
            processData: false,
            contentType: false,
            async: false,
            success: function (res) {

                $('#cmbdistEstBuscar').empty();
                if (res.resultado == 1) {
                    $(res.data).each(function (i, obj) {
                        $('#cmbdistEstBuscar').append('<option  value="' + obj.IdDistrito + '">' + obj.Nombre + '</option>');
                    });
                    $('#cmbdistEstBuscar').val("");
                    $('.chzn-select').chosen().trigger("chosen:updated");
                }
            },
            error: function (msg) {
                console.error(msg);
            }
        });
    },

    async BuscarEstablecimiento() {
        var codigo = $('#codigoEstBuscar').val();
        var nombre = $('#nombreEstBuscar').val();
        var departamento = $('#cmbdepEstbuscar').val();
        var provincia = $('#cmbprovEstBuscar').val();
        var distrito = $('#cmbdistEstBuscar').val();

        var filtro = "WHERE Departamentos.IdDepartamento = " + departamento;

        if (provincia != null)
            filtro = filtro + " AND Provincias.IdProvincia = " + provincia
        if (distrito != null)
            filtro = filtro + " AND Establecimientos.IdDistrito = " + distrito
        if (codigo != "")
            filtro = filtro + " AND Establecimientos.Codigo = '" + codigo + "'"
        if (nombre != "")
            filtro = filtro + " AND Establecimientos.Nombre LIKE '%" + nombre + "%'"

        
        oTable_EstSalud.fnClearTable();
        //alert($('#cboConsultorio>option:selected').attr("prog"));
        var midata = new FormData();
        midata.append('filtro', filtro);
        midata.append('_token',$('[name="_token"]').val());
        $.ajax({
            method: "POST",
            url: "/ce/EstablecimientosFiltrar",
            data: midata,
            dataType: "json",
            processData: false,
            contentType: false,
            async: false,
            success: function (res) {
                

                if (res.resultado == 1) {

                    if (res.data.length > 0) {
                        oTable_EstSalud.fnAddData(res.data);
                    }
                }
            },
        })
    
    },

    SeleccionarEstablecimiento(id, codigo, nombre) {
        // console.log(EstablecimientoSalud.opcionEst);

        // if (EstablecimientoSalud.opcionEst == 'OR') {
        //     $('#ipressorigen').val(codigo);
        //     $('#origen').val(nombre);
        //     Referencias.ListarUPServiciosOrigen(codigo);
        // }
        // if (EstablecimientoSalud.opcionEst == 'DR') {
            $('#idestabldestino').val(id);
            $('#ipressdestino').val(codigo);
            $('#destino').val(nombre);
            // Referencias.ListarUPServiciosDestino(codigo);
        // }
        // if (EstablecimientoSalud.opcionEst == 'OCR') {
        //     $('#ipressorigenCR').val(codigo);
        //     $('#origenCR').val(nombre);
        //     Referencias.ListarUPServiciosOrigen(codigo);
        // }
        // if (EstablecimientoSalud.opcionEst == 'DCR') {
        //     $('#idestabldestino').val(id);
        //     $('#ipressdestinoCR').val(codigo);
        //     $('#destinoCR').val(nombre);
        //     Referencias.ListarUPServiciosDestino(codigo);
        // }
        // EstablecimientoSalud.opcionEst = '';


        oTable_EstSalud.fnClearTable();
        EstablecimientoSalud.LimpiarBusquedaEstablecimiento();

        $('#modalEstablecimientosBuscar').modal('hide');
    },

    LimpiarBusquedaEstablecimiento() {
        $('#codigoEstBuscar').val("");
        $('#nombreEstBuscar').val("");
        $('#cmbdepEstbuscar').val(15);
        $('#cmbprovEstBuscar').val("");
        $('#cmbdistEstBuscar').val("");
        $('#cmbprovEstBuscar').empty();
        $('#cmbdistEstBuscar').empty();
        EstablecimientoSalud.ListaProvincias();
    }


}