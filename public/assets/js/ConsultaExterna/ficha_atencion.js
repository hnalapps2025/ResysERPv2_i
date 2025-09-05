let FichaAtencion = {
    listaEpisodios: [{}],

    totalProgramacion: 0,
    totalCupos: 0,
    ProductosFarmaciaConsultaExterna:[],

    Plugin: () => {
        
    },

    InitialCharge: async () => {
        const url = window.location.search;
        const urlParametro = new URLSearchParams(url);
        const IdCuentaAtencion = urlParametro.get("IdCuentaAtencion");

        $('#IdCuentaAtencion').val(IdCuentaAtencion)

        VisorReceta.idCuentaAtencion = IdCuentaAtencion;

        if(IdCuentaAtencion) {
            buscapaciente(IdCuentaAtencion)
        }

        $('#cboDestino').on('change', function () {
            $('#cboProgramacion').empty();
            $('#cboCupo').empty();
            $('#cboProgramacion').append('<option value="-1" selected disabled>-----Seleccione-----</option>').trigger("chosen:updated")
            $('#cboCupo').append('<option value="-1" selected disabled>-----Seleccione-----</option>').trigger("chosen:updated")
            
            if($('#cboDestino').val() == '60'){
                const url = 'ce/BuscarProgramacionXIdAtencion';
				const data = {};
				data.IdAtencion = $("#idAtencion").val();
				$.ajax({
                    method: 'GET',
					url: url,
					data: data,
					success: function(resp) {
                        let obj = JSON.parse(resp);
						const {filas, resultado, mensaje} = obj;

                        FichaAtencion.totalProgramacion = filas.length

						filas.forEach(function(item,i) {
                            FichaAtencion.appendToChosen('#cboProgramacion', item.IdProgramacion, item.Fecha+' '+item.Nombre);
						});

                        $('#cboProgramacion').prop( "disabled", false );
                        $('#cboCupo').prop( "disabled", false );
                        $('.chzn-select').chosen().trigger("chosen:updated")
					}
				});
			} else {
				$('#cboProgramacion').val('-1');
				$('#cboProgramacion').prop( "disabled", true ).trigger("chosen:updated");
				$('#cboCupo').val('-1');
				$('#cboCupo').prop( "disabled", true ).trigger("chosen:updated");
			}
        });

        $('#cboProgramacion').on('change', function () {
            $('#cboCupo').empty();
            $('#cboCupo').append('<option value="-1" selected disabled>-----Seleccione-----</option>').trigger("chosen:updated")
            const url = 'ce/BuscarCuposXIdProgramacion';
			const data = {};
			data.IdProgramacion = $('#cboProgramacion').val();
			$.ajax({
				method: 'GET',
				url: url,
				data: data,
				success: function(resp) {
					let obj = JSON.parse(resp);
					const {filas, resultado, mensaje} = obj;

                    FichaAtencion.totalCupos = filas.length

					filas.forEach(function(item,i) {
						FichaAtencion.appendToChosen('#cboCupo', item.Cupo, item.Valor);
					});
                    $('.chzn-select').chosen().trigger("chosen:updated")
				}
			});
        });

        $('#cboEpisodio').on('change', function () {
            var fecha = null
            var episodio = 0
            var idAtencion = $("#cboEpisodio option:selected").attr("atencion");
            episodio = $('#cboEpisodio').val()
            $('#chkNuevo').prop('checked', false)
            $('#chkCierre').prop('checked', false)

            $(FichaAtencion.listaEpisodios.data).each(function (i, obj) {

                if (obj.idEpisodio == episodio) {
                    if (obj.FechaCierre=="__/__/_____") {
                        $('#chkCierre').prop('checked', false)
                    }
                    else {
                        $('#chkCierre').prop('checked', true)
                    }
                }
                if (obj.IdAtencion == idAtencion) {
                    $('#chkNuevo').prop('checked', true)
                }
            });
        })
        
        if ($("#txtPeso").val() != '' && $("#txtTalla").val() != '') {
            $("#txtTriajeIMC").val(Triaje.CalcularIMC($("#txtPeso").val(), $("#txtTalla").val()));
            $("#txtTriajeIMC").val($("#txtTriajeIMC").val() + ' (' + Triaje.imc($("#txtTriajeIMC").val()) + ')');
        }
        else{
            $("#txtTriajeIMC").val("Sin Datos")
        }

        FichaAtencion.ProductosFarmaciaConsultaExterna= await ProductosFarmaciaConsultaExterna();
        FichaAtencion.ListarProductosFarmaciaConsultaExterna(0)
        await OrdenMedica.ListarCabeceraRecetaByIdCuentaIdServicioIdMedico(IdCuentaAtencion, $('#hdIdServicioIngreso').val(), $('#hdIdMedicoIngreso').val())
    },

    ListarProductosFarmaciaConsultaExterna(SoloConStock){
        $('#b_idproducto').empty();
        $('#b_idproducto').append('<option value="0" selected disabled>Seleccione un Medicamento</option>')

        if(FichaAtencion.ProductosFarmaciaConsultaExterna.length>0){
            if(SoloConStock==1){
                FichaAtencion.ProductosFarmaciaConsultaExterna.forEach(function(item,i) {
                    if(item.cantidad>0)
                        $("#b_idproducto").append(
                            `<option value="${item.IdProducto}" cantidad="${item.cantidad}">${item.Nombre}</option>`
                        );
                });
            }
            else{
                FichaAtencion.ProductosFarmaciaConsultaExterna.forEach(function(item,i) {
                    $("#b_idproducto").append(
                        `<option value="${item.IdProducto}" cantidad="${item.cantidad}">${item.Nombre}</option>`
                    );
                });
            }
        }
        $(".chzn-select").chosen().trigger("chosen:updated");
    },

    ListarHistorialPaciente: (idAtencion) => {
        fetch(`ce/historial_paciente?IdAtencion=${idAtencion}`, {
            method: "GET", // or 'PUT'
            //   body: JSON.stringify(data), // data can be `string` or {object}!
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .catch((error) => toastr.error("Error:", error))
            .then((res) => {

                oTableHistorialAtenciones.fnClearTable();
                oTableHistorialDiagnosticos.fnClearTable();
                oTableHistorialLaboratorio.fnClearTable();
                oTableHistorialMedicamento.fnClearTable();

                if (res.resultado == 1) {
                    if(res.historial_atenciones.length>0)
                        oTableHistorialAtenciones.fnAddData(
                            res.historial_atenciones
                        );
                    if(res.historial_diagnosticos.length>0)
                        oTableHistorialDiagnosticos.fnAddData(
                            res.historial_diagnosticos
                        );
                    if(res.historial_laboratorio.length>0){
                        res.historial_laboratorio.forEach(el => {
                            el['Resultado'] = el['Resultado'].replace(/(?:\r\n|\r|\n)/g, '<br>');
                            el['Resultado'] = el['Resultado'].replace(/ /g, '&nbsp;');
                        });
                        oTableHistorialLaboratorio.fnAddData(
                            res.historial_laboratorio
                        );
                    }
                    if(res.historial_medicamentos.length>0)
                        oTableHistorialMedicamento.fnAddData(
                            res.historial_medicamentos
                        );
                }
            });
    },

    HistorialPacienteByIdAtencion: (idAtencion) => {

        oTableHistorialDiagnosticos.fnClearTable();
                oTableHistorialLaboratorio.fnClearTable();
                oTableHistorialMedicamento.fnClearTable();

        fetch(`ce/historial_paciente_by_id_atencion?IdAtencion=${idAtencion}`, {
            method: "GET", // or 'PUT'
            //   body: JSON.stringify(data), // data can be `string` or {object}!
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .catch((error) => toastr.error("Error:", error))
            .then((res) => {

                oTableHistorialDiagnosticos.fnClearTable();
                oTableHistorialLaboratorio.fnClearTable();
                oTableHistorialMedicamento.fnClearTable();

                if (res.resultado == 1) {
                   
                    if(res.historial_diagnosticos.length>0)
                        oTableHistorialDiagnosticos.fnAddData(
                            res.historial_diagnosticos
                        );
                    if(res.historial_laboratorio.length>0){
                        res.historial_laboratorio.forEach(el => {
                            el['Resultado'] = el['Resultado'].replace(/(?:\r\n|\r|\n)/g, '<br>');
                            el['Resultado'] = el['Resultado'].replace(/ /g, '&nbsp;');
                        });
                        oTableHistorialLaboratorio.fnAddData(
                            res.historial_laboratorio
                        );
                    }
                    if(res.historial_medicamentos.length>0)
                        oTableHistorialMedicamento.fnAddData(
                            res.historial_medicamentos
                        );
                }
            });
    },

    ListaEpisodiosByPaciente: (idPaciente) => {
        var midata = new FormData();
        midata.append('idPaciente', idPaciente)
        midata.append('_token',$('[name="_token"]').val());
        $.ajax({
            url: "ce/ListaEpisodiosByPaciente",
            datatype: "json",
            data: midata,
            type: "post",
            processData: false,
            contentType: false,
            async: false,
            success: function (res) {
                var nroEpisodio = 0
                var fecha = "__/__/_____"
                $('#cboEpisodio').empty();
                $('#cboEpisodio').append('<option value="0" disabled>-----Seleccione-----</option>')

                $(res.data).each(function (i, obj) {
                    obj.FechaApertura=obj.FechaApertura?(new Date(obj.FechaApertura).toLocaleDateString('es-PE')):"__/__/_____";
                    obj.FechaCierre=obj.FechaCierre?(new Date(obj.FechaCierre).toLocaleDateString('es-PE')):"__/__/_____";
                    $('#cboEpisodio').append('<option atencion="' + obj.IdAtencion + '" value="' + obj.idEpisodio + '"> N°. ' + obj.idEpisodio + ' -  Fech. Apertura: ' + obj.FechaApertura +
                        // ' -  Diagnostico: ' + obj.diagnosticoWeb +
                        ' -  FechaCierre: ' + obj.FechaCierre +
                        // ' -  Servicio ' + obj.servicioGeneralweb + '</option>')
                        ' -  Servicio ' + obj.ServIng + '</option>')

                    if (obj.IdAtencion == $('#idAtencion').val()) {
                        nroEpisodio = obj.idEpisodio;
                        $('#chkNuevo').prop('checked', true)
                        fecha = obj.FechaCierre;
                    }

                });

                if (fecha=="__/__/_____") {
                    $('#chkCierre').prop('checked', false)
                }
                else {
                    $('#chkCierre').prop('checked', true)
                }
                $('#cboEpisodio').val(nroEpisodio);
                $('.chzn-select').chosen().trigger("chosen:updated")
                FichaAtencion.listaEpisodios = res
            },
            error: function (msg) {
                toastr.error(msg);
            }
        })
    },

    InitDatablesHistorialAtenciones: () => {
        let parms = {
            scrollY: "250px",
            scrollCollapse: true,
            autoWidth: false,
            data: null,
            destroy: true,
            info: true,
            bFilter: true,
            paging: true,
            responsive: true,
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
                    data: "FechaIngreso",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "5%",
                    targets: 2,
                    data: "HoraIngreso",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "50%",
                    targets: 3,
                    data: "Descripcion",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "10%",
                    targets: 3,
                    data: "ServicioIngreso",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "10%",
                    targets: 3,
                    data: "ServicioEgreso",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "15%",
                    targets: 3,
                    data: "MedicoIngreso",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
            ],
        };

        var tableWrapper = $("#tblHistorialAtenciones"); // datatable creates the table wrapper by adding with id {your_table_id}_wrapper
        oTableHistorialAtenciones = $("#tblHistorialAtenciones").dataTable(
            parms
        );
    },

    DatablesCuenta() {
        var parms = {
            scrollY: '550px',
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
                    visible: false,
                    data: "IdCuentaAtencion",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                {
                    data: null,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                        $(td).html("<b>Cuenta: " + rowData.IdCuentaAtencion + "</b><br> Fecha Ing.: " + rowData.fechaIngreso2 + "<br> Servicio: " + rowData.Servicio + "<br><b> Tipo Ser.: " + rowData.TipoServicio + "</b>")

                        if (!isEmpty(rowData.fechaEgreso)) {
                            $(td).parent().css('color', '#347dff');
                            $(td).parent().css('font-weight', 'bold');
                        }

                        if (rowData.estadoCuenta == 0) {
                            $(td).parent().css('color', 'red');
                            $(td).parent().css('font-weight', 'bold');
                        }

                    }
                }


            ]

        }

        var tableWrapper = $('#tblCuentas'); // datatable creates the table wrapper by adding with id {your_table_id}_wrapper
        //tableWrapper.find('.dataTables_length select').select2(); // initialize select2 dropdown
        oTable_cuentas = $("#tblCuentas").dataTable(parms);

    },

    InitDatablesHistorialDiagnosticos: () => {
        let parms = {
            scrollY: "250px",
            scrollCollapse: true,
            autoWidth: false,
            data: null,
            destroy: true,
            info: true,
            bFilter: true,
            paging: true,
            responsive: true,
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
                    data: "FechaIngreso",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "5%",
                    targets: 2,
                    data: "codigoCIEsinPto",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "50%",
                    targets: 3,
                    data: "Descripcion",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "10%",
                    targets: 3,
                    data: "SubClasificacion",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
            ],
        };

        var tableWrapper = $("#tblHistorialDiagnosticos"); // datatable creates the table wrapper by adding with id {your_table_id}_wrapper
        oTableHistorialDiagnosticos = $("#tblHistorialDiagnosticos").dataTable(
            parms
        );
    },

    InitDatablesHistorialLaboratorio: () => {
        let parms = {
            scrollY: "250px",
            scrollCollapse: true,
            autoWidth: false,
            data: null,
            destroy: true,
            info: true,
            bFilter: true,
            paging: true,
            responsive: true,
            columns: [
                {
                    width: "5%",
                    targets: 0,
                    data: "Fecha",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "50%",
                    targets: 1,
                    data: "Resultado",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
            ],
        };

        var tableWrapper = $("#tblHistorialLaboratorio"); // datatable creates the table wrapper by adding with id {your_table_id}_wrapper
        oTableHistorialLaboratorio = $("#tblHistorialLaboratorio").dataTable(
            parms
        );
    },

    InitDatablesHistorialMedicamento: () => {
        let parms = {
            scrollY: "250px",
            scrollCollapse: true,
            autoWidth: false,
            data: null,
            destroy: true,
            info: true,
            bFilter: true,
            paging: true,
            responsive: true,
            columns: [
                {
                    width: "5%",
                    targets: 0,
                    data: "Fecha",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "5%",
                    targets: 1,
                    data: "MovNumero",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "5%",
                    targets: 2,
                    data: "idproducto",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "5%",
                    targets: 3,
                    data: "codigo",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "30%",
                    targets: 3,
                    data: "nombre",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "10%",
                    targets: 3,
                    data: "cantidad",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "10%",
                    targets: 3,
                    data: "Tipo",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
            ],
        };

        var tableWrapper = $("#tblHistorialMedicamento"); // datatable creates the table wrapper by adding with id {your_table_id}_wrapper
        oTableHistorialMedicamento = $("#tblHistorialMedicamento").dataTable(
            parms
        );
    },

    InitDatablesFarmacia: () => {
        let parms = {
            scrollY: "145px",
            scrollCollapse: true,
            autoWidth: false,
            data: null,
            destroy: true,
            info: false,
            bFilter: false,
            paging: false,
            responsive: true,
            columns: [
                {
                    width: "5%",
                    targets: 0,
                    data: "idItem",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "center");
                        $(td).attr("style", "display: none;");
                        var inputs = '';
                        inputs = rowData.idItem+'<input type="hidden" name="b_idproducto[]" value="' + rowData.idItem + '">'+
                            '<input type="hidden" name="b_Cantidad[]" value="' + rowData.cantidad + '">'+
                            '<input type="hidden" name="b_Dosis[]" value="' + rowData.dosis + '">'+
                            '<input type="hidden" name="b_Via[]" value="' + rowData.idVia + '">'+
                            '<input type="hidden" name="b_Frecuencia[]" value="' + rowData.frecuencia + '">'
                        $(td).html(inputs);
                    },
                },
                {
                    width: "30%",
                    targets: 1,
                    data: "descripcion",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "8%",
                    targets: 2,
                    data: "cantidad",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "center");
                    },
                },
                {
                    width: "10%",
                    targets: 3,
                    data: "dosis",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "center");
                    },
                },
                {
                    width: "8%",
                    targets: 4,
                    data: "idVia",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "center");
                        $(td).attr("style", "display: none;");
                    },
                },
                {
                    width: "10%",
                    targets: 5,
                    data: "via",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "center");
                    },
                },
                {
                    width: "10%",
                    targets: 6,
                    data: "frecuencia",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "center");
                    },
                },
            ],
        };

        var tableWrapper = $("#tblFarmacia"); // datatable creates the table wrapper by adding with id {your_table_id}_wrapper
        oTableFarmacia = $("#tblFarmacia").dataTable(parms);
    },

    InitDatablesRayosX: () => {
        let parms = {
            scrollY: "145px",
            scrollCollapse: true,
            autoWidth: false,
            data: null,
            destroy: true,
            info: false,
            bFilter: false,
            paging: false,
            responsive: true,
            columns: [
                {
                    width: "5%",
                    targets: 0,
                    data: "idProducto",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "center");
                        $(td).attr("style", "display: none;");
                        var inputs = '';
                        inputs = rowData.idProducto+'<input type="hidden" name="txtIdProductoRx[]" value="' + rowData.idProducto + '">'+
                            '<input type="hidden" name="txtCantidadRx[]" value="' + rowData.cantidad + '">'+
                            '<input type="hidden" name="txtObservacionRx[]" value="' + rowData.observacion + '">'
                        $(td).html(inputs);
                    },
                },
                {
                    width: "30%",
                    targets: 1,
                    data: "descripcion",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "8%",
                    targets: 2,
                    data: "cantidad",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "center");
                    },
                },
                {
                    width: "30%",
                    targets: 3,
                    data: "observacion",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
            ],
        };

        var tableWrapper = $("#tblRayosX"); // datatable creates the table wrapper by adding with id {your_table_id}_wrapper
        oTableRayosX = $("#tblRayosX").dataTable(parms);
    },

    InitDatablesEcografiaObstetrica: () => {
        let parms = {
            scrollY: "145px",
            scrollCollapse: true,
            autoWidth: false,
            data: null,
            destroy: true,
            info: false,
            bFilter: false,
            paging: false,
            responsive: true,
            columns: [
                {
                    width: "5%",
                    targets: 0,
                    data: "idProducto",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                        $(td).attr("style", "display: none;");
                        var inputs = '';
                        inputs = rowData.idProducto+'<input type="hidden" name="txtIdProductoEcoObs[]" value="' + rowData.idProducto + '">'+
                            '<input type="hidden" name="txtCantidadEcoObs[]" value="' + rowData.cantidad + '">'+
                            '<input type="hidden" name="txtObservacionEcoObs[]" value="' + rowData.observacion + '">'
                        $(td).html(inputs);
                    },
                },
                {
                    width: "30%",
                    targets: 1,
                    data: "descripcion",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "8%",
                    targets: 2,
                    data: "cantidad",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "30%",
                    targets: 3,
                    data: "observacion",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
            ],
        };

        var tableWrapper = $("#tblEcografiaObstetrica"); // datatable creates the table wrapper by adding with id {your_table_id}_wrapper
        oTableEcografiaObstetrica = $("#tblEcografiaObstetrica").dataTable(
            parms
        );
    },

    InitDatablesEcografiaGeneral: () => {
        let parms = {
            scrollY: "145px",
            scrollCollapse: true,
            autoWidth: false,
            data: null,
            destroy: true,
            info: false,
            bFilter: false,
            paging: false,
            responsive: true,
            columns: [
                {
                    width: "5%",
                    targets: 0,
                    data: "idProducto",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                        $(td).attr("style", "display: none;");
                        var inputs = '';
                        inputs = rowData.idProducto+'<input type="hidden" name="txtIdProductoEcoGen[]" value="' + rowData.idProducto + '">'+
                            '<input type="hidden" name="txtCantidadEcoGen[]" value="' + rowData.cantidad + '">'+
                            '<input type="hidden" name="txtObservacionEcoGen[]" value="' + rowData.observacion + '">'
                        $(td).html(inputs);
                    },
                },
                {
                    width: "30%",
                    targets: 1,
                    data: "descripcion",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "8%",
                    targets: 2,
                    data: "cantidad",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "30%",
                    targets: 3,
                    data: "observacion",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
            ],
        };

        var tableWrapper = $("#tblEcografiaGeneral"); // datatable creates the table wrapper by adding with id {your_table_id}_wrapper
        oTableEcografiaGeneral = $("#tblEcografiaGeneral").dataTable(parms);
    },

    InitDatablesTomografia: () => {
        let parms = {
            scrollY: "145px",
            scrollCollapse: true,
            autoWidth: false,
            data: null,
            destroy: true,
            info: false,
            bFilter: false,
            paging: false,
            responsive: true,
            columns: [
                {
                    width: "5%",
                    targets: 0,
                    data: "idProducto",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                        $(td).attr("style", "display: none;");
                        var inputs = '';
                        inputs = rowData.idProducto+'<input type="hidden" name="txtIdProductoTomografia[]" value="' + rowData.idProducto + '">'+
                            '<input type="hidden" name="txtCantidadTomografia[]" value="' + rowData.cantidad + '">'+
                            '<input type="hidden" name="txtObservacionTomografia[]" value="' + rowData.observacion + '">'
                        $(td).html(inputs);
                    },
                },
                {
                    width: "30%",
                    targets: 1,
                    data: "descripcion",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "8%",
                    targets: 2,
                    data: "cantidad",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "30%",
                    targets: 3,
                    data: "observacion",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
            ],
        };

        var tableWrapper = $("#tblTomografia"); // datatable creates the table wrapper by adding with id {your_table_id}_wrapper
        oTableTomografia = $("#tblTomografia").dataTable(parms);
    },

    InitDatablesPatologiaClinica: () => {
        let parms = {
            scrollY: "145px",
            scrollCollapse: true,
            autoWidth: false,
            data: null,
            destroy: true,
            info: false,
            bFilter: false,
            paging: false,
            responsive: true,
            columns: [
                {
                    width: "5%",
                    targets: 0,
                    data: "idProducto",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                        $(td).attr("style", "display: none;");
                        var inputs = '';
                        inputs = rowData.idProducto+'<input type="hidden" name="txtIdProductoPatClinica[]" value="' + rowData.idProducto + '">'+
                            '<input type="hidden" name="txtCantidadPatClinica[]" value="' + rowData.cantidad + '">'+
                            '<input type="hidden" name="txtObservacionPatClinica[]" value="' + rowData.observacion + '">'
                        $(td).html(inputs);
                    },
                },
                {
                    width: "30%",
                    targets: 1,
                    data: "descripcion",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "8%",
                    targets: 2,
                    data: "cantidad",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "30%",
                    targets: 3,
                    data: "observacion",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
            ],
        };

        //var tableWrapper = $('#tblPatologiaClinica'); // datatable creates the table wrapper by adding with id {your_table_id}_wrapper
        oTablePatologiaClinica = $("#tblPatologiaClinica").dataTable(parms);
    },

    InitDatablesAnatomiaPatologica: () => {
        let parms = {
            scrollY: "145px",
            scrollCollapse: true,
            autoWidth: false,
            data: null,
            destroy: true,
            info: false,
            bFilter: false,
            paging: false,
            responsive: true,
            columns: [
                {
                    width: "5%",
                    targets: 0,
                    data: "idProducto",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                        $(td).attr("style", "display: none;");
                        var inputs = '';
                        inputs = rowData.idProducto+'<input type="hidden" name="txtIdProductoAnatPato[]" value="' + rowData.idProducto + '">'+
                            '<input type="hidden" name="txtCantidadAnatPato[]" value="' + rowData.cantidad + '">'+
                            '<input type="hidden" name="txtObservacionAnatPato[]" value="' + rowData.observacion + '">'
                        $(td).html(inputs);
                    },
                },
                {
                    width: "30%",
                    targets: 1,
                    data: "descripcion",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "8%",
                    targets: 2,
                    data: "cantidad",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "30%",
                    targets: 3,
                    data: "observacion",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
            ],
        };

        //var tableWrapper = $('#tblAnatomiaPatologica'); // datatable creates the table wrapper by adding with id {your_table_id}_wrapper
        oTableAnatomiaPatologica = $("#tblAnatomiaPatologica").dataTable(parms);
    },

    InitDatablesBancoSangre: () => {
        let parms = {
            scrollY: "145px",
            scrollCollapse: true,
            autoWidth: false,
            data: null,
            destroy: true,
            info: false,
            bFilter: false,
            paging: false,
            responsive: true,
            columns: [
                {
                    width: "5%",
                    targets: 0,
                    data: "idProducto",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                        $(td).attr("style", "display: none;");
                        var inputs = '';
                        inputs = rowData.idProducto+'<input type="hidden" name="txtIdProductoBancoSangre[]" value="' + rowData.idProducto + '">'+
                            '<input type="hidden" name="txtCantidadBancoSangre[]" value="' + rowData.cantidad + '">'+
                            '<input type="hidden" name="txtObservacionBancoSangre[]" value="' + rowData.observacion + '">'
                        $(td).html(inputs);
                    },
                },
                {
                    width: "30%",
                    targets: 1,
                    data: "descripcion",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "8%",
                    targets: 2,
                    data: "cantidad",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "30%",
                    targets: 3,
                    data: "observacion",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
            ],
        };

        //var tableWrapper = $('#tblBancoSangre'); // datatable creates the table wrapper by adding with id {your_table_id}_wrapper
        oTableBancoSangre = $("#tblBancoSangre").dataTable(parms);
    },

    InitDatablesLabHis: () => {
        let parms = {
            scrollY: "145px",
            scrollCollapse: true,
            autoWidth: false,
            data: null,
            destroy: true,
            info: false,
            bFilter: false,
            paging: false,
            responsive: true,
            columns: [
                {
                    width: "5%",
                    targets: 0,
                    data: "idLab",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "30%",
                    targets: 1,
                    data: "labHis",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
            ],
        };

        //var tableWrapper = $('#tblBancoSangre'); // datatable creates the table wrapper by adding with id {your_table_id}_wrapper
        oTableLabHis = $("#tblLabHis").dataTable(parms);
    },

    InitDatablesLabHisCPT: () => {
        let parms = {
            scrollY: "145px",
            scrollCollapse: true,
            autoWidth: false,
            data: null,
            destroy: true,
            info: false,
            bFilter: false,
            paging: false,
            responsive: true,
            columns: [
                {
                    width: "5%",
                    targets: 0,
                    data: "idLab",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "30%",
                    targets: 1,
                    data: "labHis",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
            ],
        };

        //var tableWrapper = $('#tblBancoSangre'); // datatable creates the table wrapper by adding with id {your_table_id}_wrapper
        oTableLabHisCPT = $("#tblLabHisCPT").dataTable(parms);
    },

    AgregarProcedimientoFarmacia: (
        oTable,
        idItem,
        itemDescripcion,
        cantidad,
        Dosis,
        IdVia,
        Via,
        Frecuencia
    ) => {
        var objRow = {
            idItem: idItem,
            descripcion: itemDescripcion,
            cantidad: cantidad,
            dosis: Dosis,
            idVia: IdVia,
            via: Via,
            frecuencia: Frecuencia
        };
        oTable.api(true).row.add(objRow).draw(false);
    },
    AgregarProcedimiento: (
        oTable,
        idItem,
        itemDescripcion,
        cantidad,
        observacion
    ) => {
        var objRow = {
            idProducto: idItem,
            descripcion: itemDescripcion,
            cantidad: cantidad,
            observacion: observacion,
        };
        oTable.api(true).row.add(objRow).draw(false);
    },

    QuitarProcedimiento: (oTable) => {
        var objselec = oTable.api(true).row(".selected").data();
        if (!isEmpty(objselec)) {
            oTable.api(true).row(".selected").remove().draw(false);
        } else {
            toastr.error("Debe Seleccionar el registro para eliminar.");
        }
    },
    
    ExisteLab() {
        lstLab = oTableLabHis.api(true).rows().data();

        for (var i = 0; i < lstLab.length; i++) {
            if (lstLab[i].idLab == $("#cboLabHis").val()) {
                return true;
            }
        }

        return false;
    },

    appendToChosen(idNameElement, id, value){
		// $(idNameElement).empty();
		$(idNameElement).append("<option value='"+id+"'>"+value+"</option>");
	},

    Events: () => {

        $("#chkConStock").on("change", ()=>{
            let estado= $("#chkConStock").is(':checked');
            let SoloConStock= 0;

            $("#b_stock").text("-");
            if(estado){
                SoloConStock= 1;
            }
            else{
                SoloConStock= 0;
            }

            FichaAtencion.ListarProductosFarmaciaConsultaExterna(SoloConStock)
        })

        $("#b_idproducto").on("change", () => {
            let cantidad = $("#b_idproducto>option:selected").attr("cantidad");
            console.log(cantidad);
            $("#b_stock").text(cantidad)
            if(cantidad <= 0)
                b_stock.className = "text-danger font-weight-bold";
            else
                b_stock.className = "";
        })
        
        $("#cboLabHis").on("change", () => {
            if ($("#cboLabHis").val() != 0) {

                if(oTableLabHis.api(true).data().length == 3) {
                    toastr.error('Solo se pueden agregar hasta 3 labs')
                    return false
                }

                if(FichaAtencion.ExisteLab()) {
                    toastr.error('Ya existe un item con la misma descripcion')
                    return false
                }

                var objRow = {
                    idLab: $("#cboLabHis").val(),
                    labHis: $("#cboLabHis option:selected").text(),
                };
                oTableLabHis.api(true).row.add(objRow).draw(false);
            }
        });
        $("#cboLabHisCPT").on("change", () => {
            if ($("#cboLabHisCPT").val() != 0) {

                if(oTableLabHisCPT.api(true).data().length == 3) {
                    toastr.error('Solo se pueden agregar hasta 3 labs')
                    return false
                }

                var objRow = {
                    idLab: $("#cboLabHisCPT").val(),
                    labHis: $("#cboLabHisCPT option:selected").text(),
                };
                oTableLabHisCPT.api(true).row.add(objRow).draw(false);
            }
        });

        $("#btnEliminarLabDiag").on("click", () => {
            FichaAtencion.QuitarProcedimiento(oTableLabHis)
        });

        $("#btnEliminarLabProc").on("click", () => {
            FichaAtencion.QuitarProcedimiento(oTableLabHisCPT)
        });

        $("#f_btnAgregaFarmacia").on("click", () => {
            if ($("#b_idproducto").val() === null || 
                $("#b_idproducto").val().length == 0 ||
                $("#b_Cantidad").val().length == 0 
                )
                toastr.error('Ingrese datos correctos de medicamentos')
            else{
                let medicamentodoble=0;
                $("#tblFarmacia tbody td:first-child").each(function () {
                    if($(this).text()==$("#b_idproducto").val()){
                        toastr.error('El medicamento ya fue ingresado')
                        medicamentodoble=1;
                        return false;
                    }
                });
                
                if(medicamentodoble==0){
                    FichaAtencion.AgregarProcedimientoFarmacia(
                        oTableFarmacia,
                        $("#b_idproducto").val(),
                        $("#b_idproducto option:selected").text(),
                        $("#b_Cantidad").val(),
                        $("#b_Dosis").val(),
                        $("#b_Via").val(),
                        $("#b_Via option:selected").text(),
                        $("#b_Frecuencia").val()
                    );
                    
                    $("#b_idproducto").val('0'),
                    $("#b_Cantidad").val('1'),
                    $("#b_Dosis").val('1'),
                    $("#b_Via").val('1'),
                    $("#b_Frecuencia").val(''),
                    $(".chzn-select").chosen().trigger("chosen:updated")
                    $("#b_stock").text('-')
                }
            }
        });

        $("#f_btnAgregaRayosX").on("click", () => {
            if ($("#txtIdProductoRx").val() === null || 
                $("#txtIdProductoRx").val().length == 0 ||
                $("#txtCantidadRx").val().length == 0 
                )
                toastr.error('Ingrese datos correctos')
            else{
                let validarProcDoble=0;
                $("#tblRayosX tbody td:first-child").each(function () {
                    if($(this).text()==$("#txtIdProductoRx").val()){
                        toastr.error('El procedimiento ya fue ingresado')
                        validarProcDoble=1;
                        return false;
                    }
                });
                if(validarProcDoble==0){
                    FichaAtencion.AgregarProcedimiento(
                        oTableRayosX,
                        $("#txtIdProductoRx").val(),
                        $("#cboRx").val(),
                        $("#txtCantidadRx").val(),
                        $("#txtObservacionRx").val()
                    );

                    $("#txtIdProductoRx").val(''),
                    $("#cboRx").val(''),
                    $("#txtCantidadRx").val('1'),
                    $("#txtObservacionRx").val('')
                }
            }
        });

        $("#btnAgregarCSAtencion").on("click", async function () {
            $("#modalConsumoServicio").modal("show");
        });

        $("#f_btnAgregaEcoObs").on("click", () => {
            if ($("#txtIdProductoEcoObs").val() === null || 
                $("#txtIdProductoEcoObs").val().length == 0 ||
                $("#txtCantidadEcoObs").val().length == 0 
                )
                toastr.error('Ingrese datos correctos')
            else{
                let validarProcDoble=0;
                $("#tblEcografiaObstetrica tbody td:first-child").each(function () {
                    if($(this).text()==$("#txtIdProductoEcoObs").val()){
                        toastr.error('El procedimiento ya fue ingresado')
                        validarProcDoble=1;
                        return false;
                    }
                });
                if(validarProcDoble==0){
                    FichaAtencion.AgregarProcedimiento(
                        oTableEcografiaObstetrica,
                        $("#txtIdProductoEcoObs").val(),
                        $("#cboEcoObs").val(),
                        $("#txtCantidadEcoObs").val(),
                        $("#txtObservacionEcoObs").val()
                    );

                    $("#txtIdProductoEcoObs").val(''),
                    $("#cboEcoObs").val(''),
                    $("#txtCantidadEcoObs").val('1'),
                    $("#txtObservacionEcoObs").val('')
                }
            }
        });
        $("#f_btnAgregaEcoGen").on("click", () => {
            if ($("#txtIdProductoEcoGen").val() === null || 
                $("#txtIdProductoEcoGen").val().length == 0 ||
                $("#txtCantidadEcoGen").val().length == 0 
                )
                toastr.error('Ingrese datos correctos')
            else{
                let validarProcDoble=0;
                $("#tblEcografiaGeneral tbody td:first-child").each(function () {
                    if($(this).text()==$("#txtIdProductoEcoGen").val()){
                        toastr.error('El procedimiento ya fue ingresado')
                        validarProcDoble=1;
                        return false;
                    }
                });
                if(validarProcDoble==0){
                    FichaAtencion.AgregarProcedimiento(
                        oTableEcografiaGeneral,
                        $("#txtIdProductoEcoGen").val(),
                        $("#cboEcoGen").val(),
                        $("#txtCantidadEcoGen").val(),
                        $("#txtObservacionEcoGen").val()
                    );
                    
                    $("#txtIdProductoEcoGen").val(''),
                    $("#cboEcoGen").val(''),
                    $("#txtCantidadEcoGen").val('1'),
                    $("#txtObservacionEcoGen").val('')
                }
            }
        });
        $("#f_btnAgregaTomografia").on("click", () => {
            if ($("#txtIdProductoTomografia").val() === null || 
                $("#txtIdProductoTomografia").val().length == 0 ||
                $("#txtCantidadTomografia").val().length == 0 
                )
                toastr.error('Ingrese datos correctos')
            else{
                let validarProcDoble=0;
                $("#tblTomografia tbody td:first-child").each(function () {
                    if($(this).text()==$("#txtIdProductoTomografia").val()){
                        toastr.error('El procedimiento ya fue ingresado')
                        validarProcDoble=1;
                        return false;
                    }
                });
                if(validarProcDoble==0){
                    FichaAtencion.AgregarProcedimiento(
                        oTableTomografia,
                        $("#txtIdProductoTomografia").val(),
                        $("#cboTomografia").val(),
                        $("#txtCantidadTomografia").val(),
                        $("#txtObservacionTomografia").val()
                    );
                    
                    $("#txtIdProductoTomografia").val(''),
                    $("#cboTomografia").val(''),
                    $("#txtCantidadTomografia").val('1'),
                    $("#txtObservacionTomografia").val('')
                }
            }
        });
        $("#f_btnAgregaPatClinica").on("click", () => {
            if ($("#txtIdProductoPatClinica").val() === null || 
                $("#txtIdProductoPatClinica").val().length == 0 ||
                $("#txtCantidadPatClinica").val().length == 0 
                )
                toastr.error('Ingrese datos correctos')
            else{
                let validarProcDoble=0;
                $("#tblPatologiaClinica tbody td:first-child").each(function () {
                    if($(this).text()==$("#txtIdProductoPatClinica").val()){
                        toastr.error('El procedimiento ya fue ingresado')
                        validarProcDoble=1;
                        return false;
                    }
                });
                if(validarProcDoble==0){
                    FichaAtencion.AgregarProcedimiento(
                        oTablePatologiaClinica,
                        $("#txtIdProductoPatClinica").val(),
                        $("#cboPatologiaClinica").val(),
                        $("#txtCantidadPatClinica").val(),
                        $("#txtObservacionPatClinica").val()
                    );
                    
                    $("#txtIdProductoPatClinica").val(''),
                    $("#cboPatologiaClinica").val(''),
                    $("#txtCantidadPatClinica").val('1'),
                    $("#txtObservacionPatClinica").val('')
                }
            }
        });
        $("#f_btnAgregaAnatPato").on("click", () => {
            if ($("#txtIdProductoAnatPato").val() === null || 
                $("#txtIdProductoAnatPato").val().length == 0 ||
                $("#txtCantidadAnatPato").val().length == 0 
                )
                toastr.error('Ingrese datos correctos')
            else{
                let validarProcDoble=0;
                $("#tblAnatomiaPatologica tbody td:first-child").each(function () {
                    if($(this).text()==$("#txtIdProductoAnatPato").val()){
                        toastr.error('El procedimiento ya fue ingresado')
                        validarProcDoble=1;
                        return false;
                    }
                });
                if(validarProcDoble==0){
                    FichaAtencion.AgregarProcedimiento(
                        oTableAnatomiaPatologica,
                        $("#txtIdProductoAnatPato").val(),
                        $("#cboAnatPato").val(),
                        $("#txtCantidadAnatPato").val(),
                        $("#txtObservacionAnatPato").val()
                    );
                    
                    $("#txtIdProductoAnatPato").val(''),
                    $("#cboAnatPato").val(''),
                    $("#txtCantidadAnatPato").val('1'),
                    $("#txtObservacionAnatPato").val('')
                }
            }
        });
        $("#f_btnAgregaBancoSangre").on("click", () => {
            if ($("#txtIdProductoBancoSangre").val() === null || 
                $("#txtIdProductoBancoSangre").val().length == 0 ||
                $("#txtCantidadBancoSangre").val().length == 0 
                )
                toastr.error('Ingrese datos correctos')
            else{
                let validarProcDoble=0;
                $("#tblBancoSangre tbody td:first-child").each(function () {
                    if($(this).text()==$("#txtIdProductoBancoSangre").val()){
                        toastr.error('El procedimiento ya fue ingresado')
                        validarProcDoble=1;
                        return false;
                    }
                });
                if(validarProcDoble==0){
                    FichaAtencion.AgregarProcedimiento(
                        oTableBancoSangre,
                        $("#txtIdProductoBancoSangre").val(),
                        $("#cboBancoSangre").val(),
                        $("#txtCantidadBancoSangre").val(),
                        $("#txtObservacionBancoSangre").val()
                    );
                    
                    $("#txtIdProductoBancoSangre").val(''),
                    $("#cboBancoSangre").val(''),
                    $("#txtCantidadBancoSangre").val('1'),
                    $("#txtObservacionBancoSangre").val('')
                }
            }
        });

        $("#f_btnQuitarFarmacia").on("click", () => {
            FichaAtencion.QuitarProcedimiento(oTableFarmacia);
        });
        $("#f_btnQuitarRayosX").on("click", () => {
            FichaAtencion.QuitarProcedimiento(oTableRayosX);
        });
        $("#f_btnQuitarEcoObs").on("click", () => {
            FichaAtencion.QuitarProcedimiento(oTableEcografiaObstetrica);
        });
        $("#f_btnQuitarEcoGen").on("click", () => {
            FichaAtencion.QuitarProcedimiento(oTableEcografiaGeneral);
        });
        $("#f_btnQuitarTomografia").on("click", () => {
            FichaAtencion.QuitarProcedimiento(oTableTomografia);
        });
        $("#f_btnQuitarPatClinica").on("click", () => {
            FichaAtencion.QuitarProcedimiento(oTablePatologiaClinica);
        });
        $("#f_btnQuitarAnatPato").on("click", () => {
            FichaAtencion.QuitarProcedimiento(oTableAnatomiaPatologica);
        });
        $("#f_btnQuitarBancoSangre").on("click", () => {
            FichaAtencion.QuitarProcedimiento(oTableBancoSangre);
        });
        
        $("#tblLabHis tbody").on("click", "tr", function () {
            if ($(this).hasClass("selected")) {
                $(this).removeClass("selected");
            } else {
                oTableLabHis.$("tr.selected").removeClass("selected");
                $(this).addClass("selected");
            }
        });

        $("#tblLabHisCPT tbody").on("click", "tr", function () {
            if ($(this).hasClass("selected")) {
                $(this).removeClass("selected");
            } else {
                oTableLabHisCPT.$("tr.selected").removeClass("selected");
                $(this).addClass("selected");
            }
        });


        $("#tblHistorialAtenciones tbody").on("click", "tr", function () {
            oTableHistorialAtenciones.$("tr.selected").removeClass("selected");
            $(this).addClass("selected");

            let historialAtencion = oTableHistorialAtenciones.api(true).row('.selected').data()

            FichaAtencion.HistorialPacienteByIdAtencion(historialAtencion.IdAtencion)
        });

        $("#tblFarmacia tbody").on("click", "tr", function () {
            if ($(this).hasClass("selected")) {
                $(this).removeClass("selected");
            } else {
                oTableFarmacia.$("tr.selected").removeClass("selected");
                $(this).addClass("selected");
            }
        });

        $("#tblRayosX tbody").on("click", "tr", function () {
            if ($(this).hasClass("selected")) {
                $(this).removeClass("selected");
            } else {
                oTableRayosX.$("tr.selected").removeClass("selected");
                $(this).addClass("selected");
            }
        });
        $("#tblEcografiaObstetrica tbody").on("click", "tr", function () {
            if ($(this).hasClass("selected")) {
                $(this).removeClass("selected");
            } else {
                oTableEcografiaObstetrica
                    .$("tr.selected")
                    .removeClass("selected");
                $(this).addClass("selected");
            }
        });
        $("#tblEcografiaGeneral tbody").on("click", "tr", function () {
            if ($(this).hasClass("selected")) {
                $(this).removeClass("selected");
            } else {
                oTableEcografiaGeneral.$("tr.selected").removeClass("selected");
                $(this).addClass("selected");
            }
        });
        $("#tblTomografia tbody").on("click", "tr", function () {
            if ($(this).hasClass("selected")) {
                $(this).removeClass("selected");
            } else {
                oTableTomografia.$("tr.selected").removeClass("selected");
                $(this).addClass("selected");
            }
        });
        $("#tblPatologiaClinica tbody").on("click", "tr", function () {
            if ($(this).hasClass("selected")) {
                $(this).removeClass("selected");
            } else {
                oTablePatologiaClinica.$("tr.selected").removeClass("selected");
                $(this).addClass("selected");
            }
        });
        $("#tblAnatomiaPatologica tbody").on("click", "tr", function () {
            if ($(this).hasClass("selected")) {
                $(this).removeClass("selected");
            } else {
                oTableAnatomiaPatologica
                    .$("tr.selected")
                    .removeClass("selected");
                $(this).addClass("selected");
            }
        });
        $("#tblBancoSangre tbody").on("click", "tr", function () {
            if ($(this).hasClass("selected")) {
                $(this).removeClass("selected");
            } else {
                oTableBancoSangre.$("tr.selected").removeClass("selected");
                $(this).addClass("selected");
            }
        });

        $("#ordenes-tab").on("click", () => {
            setTimeout(() => {
                oTableFarmacia.fnDraw();
            }, 500);
        });

        $("#RayosX-tab").on("click", () => {
            setTimeout(() => {
                oTableRayosX.fnDraw();
            }, 500);
        });
        $("#EcoObstetrica-tab").on("click", () => {
            setTimeout(() => {
                oTableEcografiaObstetrica.fnDraw();
            }, 500);
        });
        $("#EcoGeneral-tab").on("click", () => {
            setTimeout(() => {
                oTableEcografiaGeneral.fnDraw();
            }, 500);
        });
        $("#Tomografia-tab").on("click", () => {
            setTimeout(() => {
                oTableTomografia.fnDraw();
            }, 500);
        });
        $("#PatClinica-tab").on("click", () => {
            setTimeout(() => {
                oTablePatologiaClinica.fnDraw();
            }, 500);
        });
        $("#AnatPatologica-tab").on("click", () => {
            setTimeout(() => {
                oTableAnatomiaPatologica.fnDraw();
            }, 500);
        });
        $("#BancoSangre-tab").on("click", () => {
            setTimeout(() => {
                oTableBancoSangre.fnDraw();
            }, 500);
        });


        $("#btnCancelarAtencion").on("click", () => {
            Cargando(1)
            setTimeout(() => {
                window.location='/registro_atencion'; 
                Cargando(0)
            }, 500);
        });

		$('#formulario_atencion').on('submit', async function(e) {
			e.preventDefault();
			let campoInvalidoEncontrado = false;
			// Verificación de campos obligatorios generales
			/*if ($("#txtMotivoConsulta").val().length == 0) {
				$('.nav-tabs a[href="#Atencion"]').tab("show");
				toastr.error("Debe ingresar datos correctos para la atención.");
				campoInvalidoEncontrado = true;
			}*/
			if (!campoInvalidoEncontrado) {
			  //if ($("input[name='l_IdDiagnostico[]']").length == 0) {
				if ($("input[name='l_IdDiagnostico[]']").length == 0 && $("#hdIdEspecialidadMedico").val() != 6) {// Regla para otros servicios menos : 6 es infectología
					$('.nav-tabs a[href="#diagnosticos"]').tab("show");
					toastr.error("Debe ingresar al menos un diagnóstico.");
					setTimeout(() => {
						$("#b_descripciondia").focus();
					}, 200);
					return;
				}
				if ($("#hdIdEspecialidadMedico").val() == 6 && $("input[name='l_IdDiagnostico[]']").length == 0 && $("input[name='l_IdProcedimiento[]']").length == 0) {// 6 es infectología
					$('.nav-tabs a[href="#diagnosticos"]').tab("show");
					toastr.error("Es necesario ingresar al menos un diagnóstico o un procedimiento.");
					setTimeout(() => {
						$("#b_descripciondia").focus();
					}, 200);
					return;
				}
				if ($("#cboDestino").val() == 60) {
					if (
						$("#cboProgramacion").val() != null &&
						$("#cboCupo").val() == null
					) {
						$('.nav-tabs a[href="#destinoAtencion"]').tab(
							"show"
						);
						toastr.error(
							'Tiene que asignar un cupo disponible para el destino "Citado - Consulta Externa".'
						);
						return;
					}
				}

				if (
					$("#cboEpisodio").val() == null &&
					$("#chkNuevo").prop("checked") == false
				) {
					$('.nav-tabs a[href="#destinoAtencion"]').tab("show");
					toastr.error(
						"Si no ingresa un episodio debe colocar Nuevo episodio."
					);
					return;
				} else {
					// logica para el guardado
					Cargando(1);
					var formData = new FormData(this);
					formData.append("_token", $('[name="_token"]').val());
					await $.ajax({
						url: "ficha_atencion",
						datatype: "json",
						data: formData,
						type: "post",
						processData: false,
						contentType: false,
						async: false,
						success: function (res) {
							console.log(res);
							if (res.resultado == 1) {
								let mensaje = "";
								let recetas = JSON.parse(res.mensaje);
								let errorCita = 0;

								if (recetas && recetas.length > 0) {
									$(recetas).each(function (i, obj) {
										switch (obj.IdPuntoCarga) {
											case 1: {
												obj.IdOrdenPago != 0
													? (mensaje +=
														  "<br>N° Orden de Pago para Procedimientos: " +
														  obj.IdOrdenPago)
													: (mensaje +=
														  "<br>N° Orden para Procedimientos: " +
														  obj.IdReceta);
												break;
											}
											case 2:
												mensaje +=
													"<br>N° Receta para Patológia Clínica: " +
													obj.IdReceta;
												break;
											case 3:
												mensaje +=
													"<br>N° Receta para Anatomía Patológica: " +
													obj.IdReceta;
												break;
											case 21:
												mensaje +=
													"<br>N° Receta para Rayos X: " +
													obj.IdReceta;
												break;
											case 5:
												mensaje +=
													"<br>N° Receta para Farmacia: " +
													obj.IdReceta;
												break;
											case 11:
												mensaje +=
													"<br>N° Receta para Banco de Sangre: " +
													obj.IdReceta;
												break;
											case 20:
												mensaje +=
													"<br>N° Receta para Ecografía General: " +
													obj.IdReceta;
												break;
											case 22:
												mensaje +=
													"<br>N° Receta para Tomografía: " +
													obj.IdReceta;
												break;
											case 23:
												mensaje +=
													"<br>N° Receta para Ecografía Obstétrica: " +
													obj.IdReceta;
												break;
											case 12:
												mensaje +=
													"<br>N° Receta para Interconsulta: " +
													obj.IdReceta;
												break;
											case "cita": {
												if (obj.resultado == 1) {
													mensaje +=
														"<br>Proxima cita: N° Cuenta: " +
														obj.IdReceta;
													if (
														obj.IdOrdenPago != 0
													)
														mensaje +=
															", N° Orden Pago: " +
															obj.IdOrdenPago;
												} else {
													mensaje +=
														"<br>Proxima cita: " +
														obj.mensaje;
													errorCita = 1;
												}
												break;
											}

                                            default: break;
                                        }
                                    });

                                    if(recetas.length==1 && errorCita !=1){
                                        VisorReceta.AbrirVisorRecetas(recetas);
                                    }
                                    else if(recetas.length>1)
                                        VisorReceta.AbrirVisorRecetas(recetas);

                                }

                                GenerarDocumento($('#idAtencion').val(), 'CE')
                                GenerarDocumento($('#IdCuentaAtencion').val(), 'FUA')

                                Swal.fire({
                                    icon: 'success',
                                    title: 'Guardado',
                                    html: mensaje,
                                    confirmButtonText: 'Aceptar',
                                    allowOutsideClick: false,
                                    allowEscapeKey: false
                                })
                                    .then((result) => {
                                        if (result.isConfirmed) {
                                            if(!recetas || (recetas.length==0) || (recetas.length==1 && errorCita ==1))
                                                window.location='/registro_atencion'; 
                                        }
                                    });
                            }
                            else{
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Ups...',
                                    text: res.mensaje,
                                    confirmButtonText: 'Aceptar',
                                    allowOutsideClick: false,
                                    allowEscapeKey: false
                                })
                            }
                        },
                        error: function (msg) {
                            console.error(msg);
                            toastr.error("Error al guardar la atencion",msg)
                        }
                    })
                    Cargando(0)
                }
            }
		});

		// $('#formulario_atencion').on('submit', function(e) {
		// 	e.preventDefault();
		// });

    },

    Init: () => {
        FichaAtencion.Plugin();
        FichaAtencion.InitialCharge();

        

        FichaAtencion.DatablesCuenta();

        FichaAtencion.InitDatablesHistorialAtenciones();
        FichaAtencion.InitDatablesHistorialDiagnosticos();
        FichaAtencion.InitDatablesHistorialLaboratorio();
        FichaAtencion.InitDatablesHistorialMedicamento();

        FichaAtencion.InitDatablesFarmacia();
        FichaAtencion.InitDatablesRayosX();
        FichaAtencion.InitDatablesEcografiaObstetrica();
        FichaAtencion.InitDatablesEcografiaGeneral();
        FichaAtencion.InitDatablesTomografia();
        FichaAtencion.InitDatablesPatologiaClinica();
        FichaAtencion.InitDatablesAnatomiaPatologica();
        FichaAtencion.InitDatablesBancoSangre();

        FichaAtencion.InitDatablesLabHis();
        FichaAtencion.InitDatablesLabHisCPT();

        FichaAtencion.Events();
    },
};
