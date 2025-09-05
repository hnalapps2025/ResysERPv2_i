var oTable_consumoServAtencion = null;
var oTable_DetalleConsumo = null;
var ConsumoServicio = {
    idOrden: 0,
    idOrdenPago: 0,
    // IdNumEva:0,

    /////////////////////////INICAR SCRIPT//////////////////////////////
    IniciarScript() {
        //ConsumoServicio.plugins();
        //ConsumoServicio.cargaInicial();        
        //ConsumoServicio.initDatables();
        ConsumoServicio.IniciarDataTables();
        ConsumoServicio.Eventos();
    },

    IniciarDataTables() {
        ConsumoServicio.DataTableConsumoServicio();
        ConsumoServicio.DataTableConsumoServicioDetalle();
    },

    // <summary>
    // DATATABLES
    // </summary>
    // INICIALIZA EVENTOS
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    Eventos(){
        $('.nav-tabs a').on('shown.bs.tab', function (event) {
            oTable_consumoServAtencion.columns.adjust().draw();
            oTable_DetalleConsumo.columns.adjust().draw();
            //console.log("entroooo");
        });

        $("#modalConsumoServicio").on("shown.bs.modal", function () {
            oTable_consumoServAtencion.columns.adjust().draw();
            oTable_DetalleConsumo.columns.adjust().draw();
        });  

        $('#tblCSAtencion tbody').on('click', 'tr', function () {

            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTable_consumoServAtencion.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            }
        });     

        $('#tblDetalleConsumo tbody').on('click', 'tr', function () {

            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTable_DetalleConsumo.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            }
        });  

        $('#btnAgregarCSAtencion').on('click', async function () {
            //await ConsumoServicio.IniciarData();
        
            //ConsumoServicio.bloqueoProcedencia();
            //ConsumoServicio.limpiar();
                    
            //$("#txtNroCuentaRegistroCS").val(Variables.IdCuentaAtencion);
            //await ConsumoServicio.listaPorCuenta(Variables.IdCuentaAtencion, 1); // bloquear aqui           
            //$("#txtNroCuentaRegistroCS").attr('disabled', true);
            $("#txtCantidadCpt").val(1);
        
            $('#txtLabCpt').val('')
        
            $('#cbolabCpt').val(-1)
        
            $('#contLabCpt').hide()

            $('#hdIdOrdenServicio').val(0)
            $('#lblConsumoServicio').html(0)
            if ($('#cbolabCpt').val() == 1) {
                $('#contUsaLabCpt').show()
                $('#contRelDx').show()
            } else {
                $('#contUsaLabCpt').hide()
                $('#contRelDx').hide()
            }
        
        
            $('#cbolabCpt').trigger("chosen:updated");
        
            oTable_DetalleConsumo.clear().draw();
            $('#modalConsumoServicio').modal('show');
        });

        $('#btnEliminarCSAtencion').on('click', function () {
            //var objrow = oTable_atencionesEmer.api(true).row('.selected').data();
            //ConsumoServicio.eliminar(objrow.idCuentaAtencion)
            

            var table = $('#tblEvaluacionesHospitalizacion').DataTable();
            let NumeroEval = table.row('.selected').data(); 

            if(NumeroEval==null){
                 NumeroEval = table.rows().count()+1;
            }else{
                NumeroEval=NumeroEval.IdNumero;
            }
            
            var objrowConsumoServ = oTable_consumoServAtencion.row('.selected').data();
        
            console.log('datos CSatenconm',objrowConsumoServ)
            if (isEmpty(objrowConsumoServ)) {
                alert(objrowConsumoServ);
                alerta('info', '', 'Seleccione el procedimiento que desea eliminar.');
                return false;
            }
        
            //if (objrow.idEstadoAtencion == 2) {
            if (Variables.IdEstadoAtencion == 2) {
                alerta('warning', '', 'Verifique el estado de la atencion');
                return false;
            }
            else {
                if (objrowConsumoServ.IdEstadoFacturacion == 1) {
                    Swal.fire({
                        title: 'Eliminar',
                        text: '¿Estas seguro de eliminar la orden Nro. ' + objrowConsumoServ.idOrden + '?',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#EF6F6C',
                        cancelButtonColor: '#5e5e5e',
                        confirmButtonText: 'Eliminar',
                        cancelButtonText: 'Cancelar',
                        allowOutsideClick: false,
                    }).then(async (result) => { 
                        if (result.isConfirmed) {
                            await ConsumoServicio.EliminarOrdenCPT(objrowConsumoServ.idOrden);
                            await ConsumoServicio.CargarOrdenesCPT(Variables.IdCuentaAtencion,NumeroEval);
                        }                  
                    });
                }
                else {
                    alerta('warning', '', 'Esta orden no se puede eliminar, verifique el estado');
                    return false;
                }
            }
        
        });
        $('#tblCSAtencion tbody').on('click', '.ImprimirServicio ', async function () {
            var objrow = oTable_consumoServAtencion.row($(this).parents("tr")[0]).index();
            var row =oTable_consumoServAtencion.row(objrow).data();
            console.log('datosservicioo',row);

            let idCuentaAtencion = Variables.IdCuentaAtencion
            let idRegistro = row.IdReceta
            let idTipoServicio = 0
            let idEvaluacion = 0
            let tipo = 'REC'
            let idorden = row.idOrden;

           // let documentoFirmado = await SeleccionarFirmasDigitales(idCuentaAtencion, idRegistro, idTipoServicio, idEvaluacion, tipo)

           // if(documentoFirmado.length > 0) {
             //   VizualizarModalPdf(documentoFirmado[0].rutaArchivo);
              //  return
            //}
          
                
            $.ajax({
                url: "/sa_general/pdf_orden",
                datatype: "json",
                data: { IdOrden: idorden },
                method: "get",
                async: false,
                success: function (res) {
                    if (res.resultado == 1) {
                        // let url = 'data:application/pdf;base64,' +;
                        $('#frame-pdf').attr('src', res.pdf_url);
                
                        // Abre el modal
                        $('#pdfModal').modal('show');
                    }
                    else
                        toastr.warning(res.mensaje, "Aviso")
                },
                error: function (msg) {
                    toastr.error(msg);
                }
            })


            

          
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
        $(document).on('click', '.editable', function() {
            var $this = $(this);
            var originalValue = $this.text(); 
        
            $this.html('<input type="text" class="form-control form-control-sm"  style=" width: 90%;" value="' + originalValue + '">');
        
            $this.children('input').focus().on('blur', function() {
                var newValue = $(this).val(); 
                if (newValue !== originalValue) {
                    // Update the data source (e.g., using AJAX)
                    $.ajax({
                        url: '/update-quantity', // Replace with your actual URL
                        type: 'POST',
                        data: { 
                            id: rowData.idItem, // Assuming you have an ID for the row
                            quantity: newValue
                        },
                        success: function(response) {
                            // Update the table cell with the new value
                            $this.text(newValue); 
                        },
                        error: function() {
                            // Handle errors (e.g., display an error message)
                            alert('Error updating quantity.');
                            $this.text(originalValue); 
                        }
                    });
                } else {
                    $this.text(originalValue);
                }
            });
        });
        
         $('#btnModificarConsumo').on('click', function () {

            var objrowConsumoServ = oTable_consumoServAtencion.row('.selected').data();

             console.log('a ver',objrowConsumoServ)
           

             if (!isEmpty(objrowConsumoServ)) {
                 console.log('datos de tabla consumo',objrowConsumoServ);

                 ConsumoServicio.CargarServicioDetalle(objrowConsumoServ);
                 $("#txtCantidadCpt").val(1);
        
                    $('#txtLabCpt').val('')
                
                    $('#cbolabCpt').val(-1)
                
                    $('#contLabCpt').hide()
                
                    if ($('#cbolabCpt').val() == 1) {
                        $('#contUsaLabCpt').show()
                        $('#contRelDx').show()
                    } else {
                        $('#contUsaLabCpt').hide()
                        $('#contRelDx').hide()
                    }
                
                
                    $('#cbolabCpt').trigger("chosen:updated");
                
                    //oTable_DetalleConsumo.clear().draw();
                    $('#modalConsumoServicio').modal('show');

             } else {
                 alerta('info','', "Debe Seleccionar el registro");
             }
            /*
             var objrowTb = DTORdenesMedicas.row('.selected').data();
             console.log('ttttt',objrowTb);
             if (!isEmpty(objrowTb)) {
                 if (objrowTb.idEstado == 1) {
                     OrdenMedica.CargarRecetaDetalle(objrowTb);
                     if (objrowTb.IdMedico == Variables.IdMedicoLogeado) {
                         $(".OpcionesOrdenes").show();
                         $("#btnGuardarRecetas").show();
                         $("#modalReceta").modal("show");
                     } else {
                         alerta('warning', '', 'No tiene permiso para modificar una receta de otro médico.');
                     }
                 }
                 else {
                     if (objrowTb.idEstado == 2 && objrowTb.movimiento != "") {
                         alerta('warning', '', 'Esta receta no se puede modificar, ya se encuentra despachada. <br><span class="font-weight-bold">Movim: ' + objrowTb.movimiento + '</span>');
                     } else if (objrowTb.idEstado == 3 && objrowTb.boleta != "") {
                         alerta('warning', '', 'Esta receta no se puede modificar, ya se encuentra con boleta. <br><span class="font-weight-bold">Boleta: ' + objrowTb.boleta + '</span>');
                     } else {
                         alerta('warning', '', 'Esta receta no se puede modificar, verifique el estado');
                     }
                     return false;
                 }  
             } else {
                 alerta('warning', '', 'No se ha seleccionado ninguna receta.');
             }
                 */
            
         });
         


        $('#btnGuardarConsumo').on('click', async function () {
            Cargando(1);
            const aten = await Transferencias.SeleccionarAtencion(Variables.IdAtencion);
            var tipoServicio = null;
            var table  = null;
             if(aten.IdTipoServicio == 3){
                    tipoServicio = 'HOSP';
                    table = $('#tblEvaluacionesHospitalizacion').DataTable();

                }else  if ((aten.IdTipoServicio == 2 || aten.IdTipoServicio == 4)){
                    tipoServicio = 'EMER';
                     table = $('#tblEvaluacionesEmergencia').DataTable();
                }
            console.log('aten',aten);
           
         
            let NumeroEval = table.row('.selected').data(); 

            if(NumeroEval==null){
                 NumeroEval = table.rows().count()+1;
            }else{
                NumeroEval=NumeroEval.IdNumero;
            }
         
            const consumo = await ConsumoServicio.GuardarOrdenCPT(NumeroEval);
            if (consumo.length > 0 || consumo == true) {                
                $("#modalConsumoServicio").modal("hide");

                //console.log(datarec);
                //recetita.find(({ idReceta }) => idReceta > 0).idReceta
                // console.log('loggg',NumeroEval);
                let data=await ConsumoServicio.CargarOrdenesCPT(Variables.IdCuentaAtencion,NumeroEval);

                console.log('seraaa',data);
                //const recetas = await OrdenMedica.SeleccionarRecetasCabeceraPorNroEvaluacion(Variables.IdCuentaAtencion, Variables.IdTipoFinanciamiento, EvaluacionDetalle.IdNumero, EvaluacionDetalle.IdServicio, EvaluacionDetalle.IdMedico);
                // VisorReceta.AbrirVisorRecetas(datarec);
                // AbrirVisorRecetas(data);
            }
            Cargando(0);
        });
                        
        $('#btnCerrarConsumo').on('click', function () {
            $('#modalConsumoServicio').modal('hide');
        });

        $('#btnAgregarPS').on('click', async function () {
            await ConsumoServicio.agregarProdConsumo();
            $("#cboProductoServicio").focus();
        });

        $('#btnEliminarPS').on('click', function () {
            var objselec = oTable_DetalleConsumo.row('.selected').data();
            if (!isEmpty(objselec)) {
                oTable_DetalleConsumo.row('.selected').remove().draw(false);
            } else {
                alerta('info','', "Debe Seleccionar el registro para eliminar.");
            }
        });
    },
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // <summary>
    // DATATABLES
    // </summary>
    // INICIALIZA DATA TABLE
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    DataTableConsumoServicio() {
        oTable_consumoServAtencion = $('#tblCSAtencion').DataTable({
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
                    width: '15%',
                    targets: 0,
                    data: "idOrden",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
    
                        if (rowData.idEstadoFacturacion == 9) {
                            $(td).parent().css('color', '#ef6f6c');
                            $(td).parent().css('font-weight', 'bold');
                        }
                        if (rowData.idEstadoFacturacion == 4) {
                            $(td).parent().css('color', '#00cc99');
                            $(td).parent().css('font-weight', 'bold');
                        }
                    }
                },
                {
                    width: '30%',
                    targets: 1,
                    data: "nombre",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
    
                    }
                },
                {
                    width: '10%',
                    targets: 2,
                    data: "cantidad",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
    
                    }
                },
                {
                    width: "30%",
                    targets: 4, // Columna de "observacion"
                    data: "observacion",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css({
                            'white-space': 'normal',    
                            'word-wrap': 'break-word',  
                            'word-break': 'break-word'  
                        });
                        $(td).attr('align', 'left'); 
                      
                    }
                },
                {
                    width: "8%",
                    targets: 1,
                    data: null,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                        btnImprimeSinF = '<button class="ImprimirServicio btn btn-sm glow_button" style="background:orange;color:white;"><i class="fa fa-print"></i> </button>';
                       // btnImprimeSinF = btnImprimeSinF + ' <button class="FirmarRecetaSF btn btn-sm glow_button btn-primary" style="color:white;"><i class="fa fa-edit"></i> </button>';
                        
                        $(td).html(btnImprimeSinF);

                        /*
                        if (rowData.code != '') {
                            var btnRuta = "";
                            var btnImprime = "";
                            var btnImprimeSinF = "";
                            if (rowData.statusFirma == 1) {
                                btnImprime = ' <button class="ImprimirRecetaCF btn btn-sm btn-deep-green glow_button"><i class="fa fa-print"></i> </button>';
                            } else {                                
                                btnImprimeSinF = '<button class="ImprimirRecetaSF btn btn-sm btn-deep-orange glow_button"><i class="fa fa-print"></i> </button>';
                            }
                            $(td).html(btnRuta + " " + btnImprime + " " + btnImprimeSinF);
                        } else {
                            $(td).html('');
                        }*/
                    }
                }
                /*{
                    width: '10%',
                    targets: 3,
                    data: "labConfHIS",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
    
                    }
                },
                {
                    width: '10%',
                    targets: 4,
                    data: "dx",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
    
                    }
                }*/
            ]
        });
    
    },

    DataTableConsumoServicioDetalle() {
        oTable_DetalleConsumo = $('#tblDetalleConsumo').DataTable({  
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
    
                    visible: false,
                    data: "idProducto",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                {
                    width: '30%',
                    data: "nombre",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
    
                    }
                },
                {
                    data: "cantidad",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
    
                    }
                },
                {
                    width: '60%',
                    data: "observacion",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                        var inputObservacion = '';
                        inputObservacion = '<textarea id="cboObservacionesCpt_' + rowData.idProducto + '" style="width: 80%; height: 80px;" autocomplete="off" placeholder="" class="form-control form-control-sm ">' + rowData.observacion + '</textarea>';
                        $(td).html(inputObservacion);
                    }
                },
                {
                    data: "precio",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
    
                    }
                },
                {
                    data: "total",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
    
                    }
                },
                /*{
                    data: "labConfHIS",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
    
                    }
                },
                {
                    data: "dx",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
    
                    }
                }*/
            ]
        });
        
    },
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // <summary>
    // DATATABLES
    // </summary>
    // INICIALIZA CONSUMO BD
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async GuardarOrdenCPT(NumeroEval) {
        var formData = new FormData();
        let datos;
        let resp = [];
        var objrowConsumoServ = oTable_consumoServAtencion.row('.selected').data();
        console.log('datos de consume de tabla',objrowConsumoServ);
        var ListaOrdenCPT = ConsumoServicio.DevolverOrdenDetalle();

        console.log('datos que me trae',ListaOrdenCPT);
           
        if (ListaOrdenCPT == "<ROOT></ROOT>") {
            alerta('info', '', 'No existe ningún item para registrar en el consumo.');
            return false;
            //return resp;
        }
              
        if($('#hdIdOrdenServicioPago').val() != 0){
            ConsumoServicio.idOrdenPago =   $('#hdIdOrdenServicioPago').val();
        }
        console.log('valor de orden de pago  ConsumoServicio.idOrdenPago', ConsumoServicio.idOrdenPago);
        console.log('valor de orden de pago hdIdOrdenServicioPago', $('#hdIdOrdenServicioPago').val());

        formData.append('_token', $("meta[name='csrf-token']").attr("content"));
               
        formData.append('lstOrdenCPT', ListaOrdenCPT);
        formData.append('idOrden', $('#hdIdOrdenServicio').val());
        formData.append('idOrdenPago', ConsumoServicio.idOrdenPago);        
        formData.append('IdCuentaAtencion', Variables.IdCuentaAtencion); 
        formData.append('IdServicio', Variables.IdServicio);
        formData.append('IdNumEval',NumeroEval);
        formData.append('IdTipoServicio',3); //Hosp

        

    
        //alerta(4, 'Generando recetas, por favor espere.');
        try {
            //Cargando(1);
            datos = await
                $.ajax({
                    method: "POST",
                    url: "/ConsumoServicio/GuardarOrdenCPT",
                    data: formData,
                    dataType: "json",
                    cache: false,
                    processData: false,
                    contentType: false,
                });
            //Cargando(0);
            oTable_DetalleConsumo.clear().draw();
            alerta('success', '', 'El consumo en el servicio se guardo correctamente.')
            //console.log(datos);
            resp = true;
          
        } catch (error) {
            console.error(JSON.stringify(error))
            //Cargando(0);
            alerta('error', '', JSON.stringify(error));
        }
    
        return resp;
    },

    async EliminarOrdenCPT(idOrden) {
        var midata = new FormData();
        midata.append('_token', $("meta[name='csrf-token']").attr("content"));
        midata.append('idOrden', idOrden);

        //Cargando(1);
        $.ajax({
            method: "POST",
            url: "/ConsumoServicio/EliminaOrdenCPT",
            data: midata,
            dataType: "json",
            processData: false,
            contentType: false,
            async: false,
            success: function (datos) {
                //Cargando(0);
                if (datos.resultado) {
                    alerta('success', '', "Se elimino correctamente la orden");
                }
                else {
                    alerta('error', '', datos.mensaje);
                    return false;
                }
            },
            error: function (msg) {
                //Cargando(0);
                alerta('danger', '', "Error al eliminar orden");
            }
        });
    
    },
    async SeleccionarServicioDetalle(idorden, IdCuentaAtencion) {
        
        var resp = false;
        let datos
        var data = new FormData();
        var idPuntoCarga =1;
        data.append('_token', $("meta[name='csrf-token']").attr("content"))
        data.append('IdOrden', idorden);
        data.append('IdCuentaAtencion', IdCuentaAtencion);

        var table = $('#tblEvaluacionesHospitalizacion').DataTable();
        let NumeroEval = table.row('.selected').data(); 

        if(NumeroEval==null){
             NumeroEval = table.rows().count()+1;
        }else{
            NumeroEval=NumeroEval.IdNumero;
        }
        data.append('IdNumEval', NumeroEval);
        data.append('IdTipoServicio', 3);


       
    
        try {
    
            datos = await
                $.ajax({
                    method: "POST",
                    url: "/ConsumoServicio/ListaServicioDetalle",
                    //contentType: "application/json; charset=utf-8",
                    data: data,
                    dataType: "json",
                    cache: false,
                    processData: false,
                    contentType: false,
                });
            console.log('servicio Detalle:', datos);
            switch (idPuntoCarga) {
                case 1:
                    if (!isEmpty(datos.resultado)) {
                        if (datos.resultado.length !== 0) {
                            oTable_DetalleConsumo.rows.add(datos.resultado).draw();
                        }
                    }
                    break;
                         
                
            }
            resp = true;
        } catch (error) {
            resp = false;
            alerta('error','', error);
        }
    
        return resp;
    },

    async CargarOrdenesCPT(idCuenta,NumeroEval) { // KHOYOSI
        let resp = [];
        let datos;
        var data = new FormData();
        data.append('_token', $("meta[name='csrf-token']").attr("content"));        
        data.append('IdCuentaAtencion', idCuenta);
        data.append('IdNumEval', NumeroEval);
        data.append('IdTipoServicio',3)//hosp

        // data.append()
                
        try {
            oTable_consumoServAtencion.clear().draw();
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
                // console.log('datosss  ordenes CPT',datos);
                resp=datos.resultado;
            if (datos.resultado.length > 0) {
                oTable_consumoServAtencion.rows.add(datos.resultado).draw(false);
                console.log(datos.resultado)
                //fnAddData(datos.table);
            }
        } catch (error) {
            alerta('error','', error);
        }

        return resp;
    },

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // <summary>
    // DATATABLES
    // </summary>
    // INICIALIZA METODOS
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    agregarProdConsumo() {
        var objselec = $("#cboProductoServicio").val();
    
        if (ConsumoServicio.existeProd(objselec)) {
    
            alerta('info','', $('#cboProductoServicio option:selected').text() + " ya fue agregado.");
            return false;
        }
        else {      
            lstProductosConsumo = oTable_DetalleConsumo.rows().data();
            console.log('dataTable111111',lstProductosConsumo);          
            if ($('#txtCantidadCpt').val() > 0) {
                precioUnitario = $("#cboProductoServicio option:selected").data("precio");
                var objRow = {
                    idProducto: objselec,
                    nombre: $('#cboProductoServicio option:selected').text(),
                    cantidad: $('#txtCantidadCpt').val(),
                    observacion: $('#cboObservacionesCpt').val(),
                    precio: precioUnitario,
                    total: precioUnitario * $('#txtCantidadCpt').val(),
                    labConfHIS: $('#hdUsaLabs').val() == '1' ? $('#txtLabCpt').val() : $('#cbolabCpt').val(),
                    dx: $('#cboDxCpt').val()
    
                }
                oTable_DetalleConsumo.row.add(objRow).draw(false);
                lstProductosConsumo = oTable_DetalleConsumo.rows().data();
                console.log('dataTable222222',lstProductosConsumo);
    
                //$('#lblTotal').html('Total S/' + ConsumoServicio.calculaTotal())
    
                $('#txtLabCpt').val('')
                $('#cboObservacionesCpt').val('')
                $('#cbolabCpt').val(-1)
                $('#cbolabCpt').trigger("chosen:updated");
            }
            else {
                alerta(2, "Ingrese una cantidad correcta");
                $("#txtCantidadCpt").focus();
                return false;
            }
        }
    },
  
    CargarServicioDetalle(data) {
        const servicio = [];
        servicio.push(data);
        //console.log(receta);
        //OrdenMedica.bloqueByPuntoCarga(data.idReceta, data.idPuntoCarga);
        ConsumoServicio.CargarCabeceraPorPuntoCarga(data);
        ConsumoServicio.CargarDatosServicioCabecera(servicio);           
    },
    
    CargarCabeceraPorPuntoCarga(datos) {
        var labelReceta = '';
        console.log('datos punto carga',datos)
        $('#hdIdOrdenServicio').val(0)
        $('#lblConsumoServicio').html(0)
        $('#cboObservacionesCpt').val('');
        $('#cboObservacionesCpt_').val('');


        
        labelReceta = "(Orden N° " + datos.idOrden + ")";
        //labelReceta = labelReceta + (datos.IdEstadoFacturacion != "" ? "(Estado: " + datos.IdEstadoFacturacion + ") " : "");
       // labelReceta = labelReceta + (datos.movimiento != "" ? "(Movim: " + datos.movimiento + ")" : "");
        //labelReceta = labelReceta + (datos.boleta != "" ? "(Boleta: " + datos.boleta + ")" : "");
    
        switch (parseInt(datos.IdPuntoCarga)) {
            case 1:
                $('#lblConsumoServicio').html(labelReceta);
                $('#hdIdOrdenServicio').val(datos.IdReceta);
                $('#hdIdOrdenServicioPago').val(datos.idOrdenPago);

               
                break;
            case 77:
                $('#lblEcoObs').html(labelReceta);
                $('#hdIdRecetaEcoObs').val(datos.IdReceta);
                $('.nav-tabs a[href="#ecoMedFet"]').tab('show');
                $('[href="#ecoMedFet"]').closest('li').show();
                $('.nav-tabs a[href="#ecoObst"]').tab('show');
                $('[href="#ecoObst"]').closest('li').show();
                break;            
            
        }
    },
    CargarDatosServicioCabecera(datos) {
        console.log('CargarDatosRecetaabecera consumo al servicios datos',datos);
        var labelReceta = "";
        ConsumoServicio.LimpiarConsumoServicios();        
        if (datos.length > 0) {            
            $(datos).each(async function (i, obj) {
                labelReceta = "(Receta N° " + obj.idOrden + ")";
                //labelReceta = labelReceta + (obj.estadoReceta != "" ? "(Estado: " + obj.estadoReceta + ") " : "");
                //labelReceta = labelReceta + (obj.movimiento != "" ? "(Movim: " + obj.movimiento + ")" : "");
                //labelReceta = labelReceta + (obj.boleta != "" ? "(Boleta: " + obj.boleta + ")" : "");
    
                if (obj.IdPuntoCarga == 1) //cpt
                {
                   // $('#lblConsumoServicio').html(obj.idOrden);
                    $('#hdIdOrdenServicio').val(obj.idOrden);
                    await ConsumoServicio.SeleccionarServicioDetalle(obj.idOrden, obj.IdCuentaAtencion)
                    
                }
               
                OrdenMedica.ubicaMedico(obj.idMedicoReceta);
            });
        } else {
            //OrdenMedica.listaFecha();
        }
    
        OrdenesRecetasMedicas = datos;
        //Ordenes.validaActivabtnPaquete();
    },

   

    existeProd(idproducto) {

        lstProductosConsumo = oTable_DetalleConsumo.rows().data();
        if (lstProductosConsumo.length == 0) {
            return false;
        }
    
        for (var i = 0; i < lstProductosConsumo.length; i++) {
            if (lstProductosConsumo[i].idProducto == idproducto) {    
                return true;
            }
        }
    
    },
    LimpiarConsumoServicios() {
        oTable_DetalleConsumo.clear().draw();
    },

    DevolverOrdenDetalle() {
        var html = "";
        dataCS = oTable_DetalleConsumo.rows().data();
        console.log('tabla detalleee',dataCS);
        dataCS.each(function (value, index) {
            var txtFrec = "#txtFrec_" + dataCS[index]["idItem"];
            var txtCant = "#txtCant_" + dataCS[index]["idItem"];  
            var cboDx = "#cboDx_" + dataCS[index]["idItem"]; 
            var obsDx = "#cboObservacionesCpt_"  + dataCS[index]["idProducto"];

            console.log('datos de obervacion',obsDx);
            console.log('datos obervacion 2', $(obsDx).val());
            html += '<FacturacionOrden idProducto="' + dataCS[index]["idProducto"] + '" observacion="' +  $(obsDx).val()  + '" cantidad="' + dataCS[index]["cantidad"] + '" precio="' + dataCS[index]["precio"] + '" total="' + dataCS[index]["total"] + '"></FacturacionOrden>';                    
        });

        var htmlCompleto = '<ROOT>' + html + '</ROOT>'
        
        return htmlCompleto;
    }
}