DTORdenesMedicas = null;
let proceso = false;
var OrdenMedica = {
    idRecetaRx: 0,
    idRecetaEcoObs: 0,
    idRecetaEcoGene: 0,
    idRecetaAnaPatologica: 0,
    idRecetaPatoClinica: 0,
    idRecetaBancoSangre: 0,
    idRecetaTomografia: 0,
    idRecetaFarmacia: 0,
    accion: '',
    //recetita: [],
    IniciarScript() {
        $('#txtFechaVigencia').datepicker({
            todayHighlight: true,
            autoclose: true,
            dateFormat: "dd/mm/yy",
            orientation: "bottom"
        });

        OrdenMedica.IniciarDataTables();
        OrdenMedica.Eventos(); 
        OrdenMedica.cargarMedicamentos(11);    
    },

    IniciarData() {

    },

    Limpiar() {
        //$("#btnConsultarOrdenMedica").hide();
        //$("#btnModificarOrdenMedica").hide();
        //$("#btnEliminarOrdenMedica").hide();
        $(".OpcionesRecetas").hide();
        if (OrdenMedica.accion == 'M') {
            $("#btnAgregarOrdenMedica").show();
        }
    },

    IniciarDataTables() {
        OrdenMedica.IniciarDataTablesOrdenesMedicas();
        OrdenMedica.IniciarDataTablesRecetasMedicas();        
        OrdenMedica.IniciarDataTablesInterconsulta();
        OrdenMedica.IniciarDataTablesDiagnosticosInterconsulta();

        OrdenMedica.initDatablesFarmacia()
        OrdenMedica.initDatablesPaquetes()
        OrdenMedica.initDatablesAnatomiaPatologica()
        OrdenMedica.initDatablesParologiaClinica()
        OrdenMedica.initDatablesParologiaClinica_Emer()//Laboratorio Emergencia
        OrdenMedica.initDatablesBancoSangre()
        OrdenMedica.initDatablesEcoObs()
        OrdenMedica.initDatablesEcoObsProc()
        OrdenMedica.initDatablesEcoGeneral()
        OrdenMedica.initDatablesRayos()
        OrdenMedica.initDatablesInterConsulta()
        OrdenMedica.initDatablesTomografia()
        
    },
     cargarMedicamentos(farmaciaId) {
        var farmaciaId = $('#cboFarmacia').val();
            var idAtencion = $("#hdnIdAtencion").val();
            var filtro = $('#chkConStock').is(':checked') ? 1 : 0; 
            var token = $('meta[name="csrf-token"]').attr('content'); 
            
            $('#cboMedicamento').empty().append('<option value="" disabled selected>Seleccione una opción</option>');
        
            if (farmaciaId) {
                $.ajax({
                    url: '/Recetas/listarFarmaciaDetalle', 
                    method: 'POST',
                    data: {
                        idAlmacen: farmaciaId,
                        idAtencion: idAtencion,
                        filtro: filtro, 
                        _token: token 
                    },
                    success: function (response) {
                        console.log('Medicamentos:', response.medicamentos);
                        
                        if (response && response.medicamentos && response.medicamentos.length > 0) {
                            response.medicamentos.forEach(function (medicamento) {
                                const cantidadFormateada = parseFloat(medicamento.cantidad).toFixed(0);
                                $('#cboMedicamento').append(
                                    '<option value="' + medicamento.IdProducto + '" data-precio="' + medicamento.PrecioUnitario + '">' + 
                                    medicamento.Nombre + ' <span style="color: #b8860b; font-weight: bold;">( ' + cantidadFormateada + ' )</span>' +
                                    '</option>'
                                );
                            });
        
                            // Actualizar Chosen
                            $('#cboMedicamento').trigger('chosen:updated');
                        } else {
                            console.error('No hay medicamentos disponibles o estructura incorrecta:', response);
                            alert('No se encontraron medicamentos para esta farmacia.');
                        }
                    },
                    error: function () {
                        alert('Error al obtener los medicamentos. Inténtalo más tarde.');
                    }
                });
            }
    },


    async  consulta_stock(idProducto, idAlmacen) {
        let url  = `/ws/emergencia/consulta_farm_saldo_x_almacen`;
        let data = { idProducto, idAlmacen };

        try {
            let response = await $.ajax({
                method: 'GET',
                url: url,
                data: data
            });

            let obj = JSON.parse(response);
            let { result } = obj;

            result = (result.substring(0,1) === '.') ? ('0' + result) : result;
            let stock = parseInt(result);

            // Pintar en el DOM según el stock
            if (stock <= 0) {
                s_stock.className = "text-danger font-weight-bold";
            } else {
                s_stock.className = "";
            }
            s_stock.innerText = stock;

           
            return stock;

        } catch (error) {
            console.error(error);
            return null;  
        }
    },
       

   
     
    // <summary>
    // DATATABLES
    // </summary>
    // INICIALIZA EVENTOS
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    Eventos() {
        
        
        $('.nav-tabs a').on('shown.bs.tab', function (event) {
            DTORdenesMedicas.columns.adjust().draw();
            DTRecetaFarmacia.columns.adjust().draw();
            DTRecetaAnaPato.columns.adjust().draw();
            DTRecetaBancoSan.columns.adjust().draw();
            DTRecetaEcoGene.columns.adjust().draw();
            DTRecetaEcoObst.columns.adjust().draw();
            DTRecetaPatoCli.columns.adjust().draw();
            DTRecetaPatoCli_Emer.columns.adjust().draw();
            DTRecetaRayosX.columns.adjust().draw();
            DTRecetaTomo.columns.adjust().draw();
            DTRecetaInterconsulta.columns.adjust().draw();
            DTDiagnosticosRecetaMedica.columns.adjust().draw();
            
            //console.log("entroooo");
        });

        $("#modalReceta").on("shown.bs.modal", function () {
            DTORdenesMedicas.columns.adjust().draw();
            DTRecetaFarmacia.columns.adjust().draw();
            DTRecetaAnaPato.columns.adjust().draw();
            DTRecetaBancoSan.columns.adjust().draw();
            DTRecetaEcoGene.columns.adjust().draw();
            DTRecetaEcoObst.columns.adjust().draw();
            DTRecetaPatoCli.columns.adjust().draw();
            DTRecetaPatoCli_Emer.columns.adjust().draw();
            DTRecetaRayosX.columns.adjust().draw();
            DTRecetaTomo.columns.adjust().draw();
            DTRecetaInterconsulta.columns.adjust().draw();
            DTDiagnosticosRecetaMedica.columns.adjust().draw();
            
            OrdenMedica.consulta_stock(cboMedicamento.value, cboFarmacia.value);
        });
      

      
       
        $('#tblCatalogoEcoGene tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                DTRecetaEcoGene.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            }       
        });
        

        
        $('#tblCatalogoEcoObs tbody').on('click', 'tr', function () {        
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                DTRecetaEcoObst.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            }
        });

        $('#tblCatalogoRayos tbody').on('click', 'tr', function () {        
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                DTRecetaRayosX.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            }
        });
        
        $('#tblCatalogoAnaPatologica tbody').on('click', 'tr', function () {        
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                DTRecetaAnaPato.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            }       
        });
        
        $('#tblCatalogoPatoClinica tbody').on('click', 'tr', function () {        
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                DTRecetaPatoCli.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            }      
        });
        ///Examen Emergencia
         $('#tblCatalogoPatoClinica_Emer tbody').on('click', 'tr', function () {        
             if ($(this).hasClass('selected')) {
                 $(this).removeClass('selected');
             }
             else {
                DTRecetaPatoCli_Emer.$('tr.selected').removeClass('selected');
                 $(this).addClass('selected');
             }      
         });
        
        $('#tblCatalogobancoSangre tbody').on('click', 'tr', function () {        
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                DTRecetaBancoSan.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            }                
        });
        
        $('#tblCatalogotomografia tbody').on('click', 'tr', function () {        
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                DTRecetaTomo.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            }      
        });
                
        $('#tblCatalogoFarmacia tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                DTRecetaFarmacia.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            }        
        });

        $('#tblCatalogointerconsultas tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                DTRecetaInterconsulta.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            }
        });
        
        $('#tblOrdenesMedicas tbody').on('click', 'tr', async function () {
            //$("#btnConsultarOrdenMedica").hide();
            //$("#btnModificarOrdenMedica").hide();
            //$("#btnEliminarOrdenMedica").hide();
            $(".OpcionesRecetas").hide();
            $(".OpcionesOrdenes").hide();
            
            
            //if ($(this).hasClass('selected')) {
            //    $(this).removeClass('selected');
            //}
            //else {
            //    DTORdenesMedicas.$('tr.selected').removeClass('selected');
            //    $(this).addClass('selected');
            //}

            DTORdenesMedicas.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');

            if (OrdenMedica.accion == 'M') {
                $("#btnAgregarOrdenMedica").show();
                var objrowTb = DTORdenesMedicas.row('.selected').data();
                if (objrowTb.IdMedico == Variables.IdMedicoLogeado) {
                    $(".OpcionesRecetas").show();
                    $("#btnModificarOrdenMedica").show();
                    $("#btnEliminarOrdenMedica").show();
                }
            }

                        
        });

        $('#btnAgregarOrdenMedica').on('click', function () {
            OrdenMedica.LimpiarOrdenesMedicas();
            OrdenMedica.HabilitarTabsRecetas(); 
               OrdenMedica.ObtenerLaboraEmpleado();   
              var IdMedico = Variables.IdMedicoLogeado;
              
             

            /*OrdenMedica.listaFecha();            
            OrdenMedica.ubicaMedico(OrdenMedica.ObtenerIdMedicoSesion());*/
            OrdenMedica.CargarDiagnosticosInterconsulta();
            $("#txtResumenHistoriaClinica").val($("#txtImpresionDiagnostica").val());
            $('#btnMuestraPaquete').css("visibility", 'visible');
            $(".OpcionesOrdenes").show();
            $("#btnGuardarRecetas").show();
            $('#modalReceta').modal('show');
        });

        $('#btnModificarOrdenMedica').on('click', function () {
            var objrowTb = DTORdenesMedicas.row('.selected').data();
            console.log('ttttt',objrowTb);
            if (!isEmpty(objrowTb)) {
                if (objrowTb.idEstado == 1) {
                    OrdenMedica.CargarRecetaDetalle(objrowTb);
                    if (objrowTb.IdMedico == Variables.IdMedicoLogeado) {
                        $(".OpcionesOrdenes").show();
                        $("#btnGuardarRecetas").show();
                        $("#modalReceta").modal("show");
                        $("#btnMuestraPaqueteFarmacia").show();
                        $("#btnMuestraPaqueteLaboratorio1").show();

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
            
        });

        $('#btnConsultarOrdenMedica').on('click', async function () {
            var objrowTb = DTORdenesMedicas.row('.selected').data();
            if (!isEmpty(objrowTb)) {
                await OrdenMedica.CargarRecetaDetalle(objrowTb);
                //OrdenMedica.ubicaMedico(objrowTb.idMedico);
                $(".OpcionesOrdenes").hide();
                $("#btnGuardarRecetas").hide();
                $("#btnMuestraPaqueteFarmacia").hide();
                $("#btnMuestraPaqueteLaboratorio1").hide();
                $("#modalReceta").modal("show");
                
            } else {
                alerta('warning', '', 'No se ha seleccionado ninguna receta.');
            }           
        });

        $('#btnEliminarOrdenMedica').on('click', function () {
            var objrow = DTORdenesMedicas.row('.selected').data();
            if (!isEmpty(objrow)) {
                if (objrow.idEstado == 1) {
                    Swal.fire({
                        title: 'Eliminar',
                        text: '¿Estas seguro de eliminar la receta Nro. ' + objrow.IdReceta + '?',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#EF6F6C',
                        cancelButtonColor: '#5e5e5e',
                        confirmButtonText: 'Eliminar',
                        cancelButtonText: 'Cancelar',
                        allowOutsideClick: false,
                    }).then(async (result) => { 
                        if (result.isConfirmed) {
                            await OrdenMedica.EliminarOrdenesMedicas(objrow.IdReceta)
                            //await OrdenMedica.CargarOrdenesMedicasPorIdCuentaAtencion(Variables.IdCuentaAtencion);
                            ////////////////////////////////////////////////////////////////////////////////////////////////
                            //await OrdenMedica.CargarOrdenesMedicasPorIdCuentaAtencionPorEvaluacion(Variables.IdCuentaAtencion, Variables.NroEvaluacion);
                            await OrdenMedica.CargarOrdenesMedicasPorIdCuentaAtencionPorEvaluacion(Variables.IdCuentaAtencion, Variables.NroEvaluacion);
                        }                  
                    });
                }
                else {
                    if (objrow.idEstado == 2 && objrow.movimiento != "") {
                        alerta('warning', '', 'Esta receta no se puede eliminar, ya se encuentra despachada. <br><span class="font-weight-bold">Movim: ' + objrow.movimiento + '</span>');
                    } else if (objrow.idEstado == 3 && objrow.boleta != "") {
                        alerta('warning', '', 'Esta receta no se puede eliminar, ya se encuentra con boleta. <br><span class="font-weight-bold">Boleta: ' + objrow.boleta + '</span>');
                    } else {
                        alerta('warning', '', 'Esta receta no se puede eliminar, verifique el estado');
                    }
                    return false;
                }
            } else {
                alerta('warning', '', 'No se ha seleccionado ninguna receta.');
            } 
            
        });

        ////////PAQUETESSSS KDS/////////////////////
        $("#cboPaquetes").on("change", function () {
            Cargando(1);
            var midata = new FormData();
            var idPaquete= $("#cboPaquetes").val();
            if(idPaquete==null){
                idPaquete= 9
            }
            var NroCuenta =  $("#txtNroCuenta").val();
            var almacen =  11;
            console.log('cuenta',NroCuenta);
            var token = $('meta[name="csrf-token"]').attr('content'); 
            midata.append('idPaquete', idPaquete);
            midata.append('NroCuenta', NroCuenta);
            midata.append('almacen', almacen);
            //midata.append('tipo', 0);
            console.log('idPaquete', idPaquete);
            console.log('token', token);
            

            $.ajax({
                method: "POST",
                url: "/Catalogo/FactDetallePaquete?area=Comun",
                data: midata,
                dataType: "json",
                headers: {
                    'X-CSRF-TOKEN': token // Asegúrate de incluir el token en las cabeceras
                },
                processData: false,
                contentType: false,
                async: false,
                success: function (datos) {
                    console.log('datosPaqueteDetalle',datos);
                    Cargando(0);
                    oTable_paquete.fnClearTable();
                    if (datos.resultado.length > 0) {
                        oTable_paquete.fnAddData(datos.resultado)
                    }
                    

                },
                error: function (msg) {
                    Cargando(0);
                    setTimeout(function () {
                        //                    Cargando(0);
                        alerta("ERROR", "Error listar detalle de paquete!", "2");
                    }, 900)
                }
            });

        })
                
        $('#btnGuardarRecetas').on('click', async function () {
            Cargando(1);
             proceso = true
            
            const datarec = await OrdenMedica.GuardarOrdenesMedicas();
            if (datarec.length > 0 || datarec == true) {      

                console.log('datos ordenes guardadass:'.datarec)
                $("#modalReceta").modal("hide"); 
                let resp = await OrdenMedica.CargarOrdenesMedicasPorIdCuentaAtencionPorEvaluacion(Variables.IdCuentaAtencion, EvaluacionEmergencia.IdNumero)
                // let datosss = await OrdenMedica.CargarResultadosLaboratorio();
                // console.log(datosss);
                var evals = DtEvaluaciones.data().count();
                console.log('datos  de  ordenes',resp);
                console.log('evals',evals);
                
                $(resp).each(function(i, obj) {
                    if (obj.IdNumero != evals) {
                        // Añadir la clase 'ImprimirRecetaSF' como deshabilitada y aplicar el estilo directamente
                        $('.ImprimirRecetaSF').css({
                            'background-color': 'gray',
                            'color': 'darkgray',
                            'cursor': 'not-allowed'
                        }).prop('disabled', true);  // También deshabilitar el botón
                    }
                });

            
          
            }  
            Cargando(0);

        });
        $("#btnGuardarEva").on('click', async function () {
            console.log('entro orden Emer');
            var evals = DtEvaluaciones.data().count();
            var dxs = DtDiagnosticos.data().count();
            if (evals == 0 && EvaluacionEmergencia.nuevaEvaluacion == false) {
                alerta('info', '', 'No se ha registrado ninguna evaluación. Por favor registre una evaluación.');
                return;
            } else if (EvaluacionEmergencia.IdNumero == 0) {
                alerta('info', '', 'No se ha seleccionado ninguna evaluación. Por favor seleccione una evaluación.');
                return;
            }

            if (dxs == 0) {
                alerta('info', '', 'No se ha registrado ningun diagnóstico. Por favor registre al menos un diagnóstico.');
                return;
            }
          
            Cargando(1);
             Triaje.GuardarTriajeEmergencia(Variables.IdAtencion, Variables.IdServicio, 0);
            let resp = await OrdenMedica.CargarOrdenesMedicasPorIdCuentaAtencionPorEvaluacion(Variables.IdCuentaAtencion, EvaluacionEmergencia.IdNumero)
            let dat =  await ConsumoServicio.CargarOrdenesCPT(Variables.IdCuentaAtencion,EvaluacionEmergencia.IdNumero);
            // Triaje.GuardarTriajeEmergenciaPorEvaluacion(Variables.IdAtencion, Variables.IdServicio, EvaluacionEmergencia.IdNumero);
            // console.log(resp)
            await EvaluacionEmergencia.GuardarEvaluacionEmergencia();
            await EvaluacionEmergencia.GuardarEvaluacionEmergenciaDetalle();
            await EvaluacionEmergencia.GuardarDiagnosticos();
            $("#tblEvaluacionesEmergencia tbody tr[data-eval=" + EvaluacionEmergencia.IdNumero + "]").click();          //seleccionar la evaluacion
            alerta('success', '', 'La evaluación N° ' + EvaluacionEmergencia.IdNumero + ' se guardó correctamente.');
            Cargando(0);
            
            let dataAll =resp.concat(dat);
            console.log('averrrrr',dataAll);
            let mensaje ='';
            let errorCita= 0;
           if(dataAll.length >0){
               proceso=false
              
               $(dataAll).each(function (i, obj) {
                   console.log('verificarr',obj.IdPuntoCarga);
                   switch (obj.IdPuntoCarga) {
                       
                       case '1': {
                           mensaje += obj.IdOrdenPago !== undefined 
                               ? '<br>N° Orden de Pago para Procedimientos: ' + obj.idOrdenPago 
                               : '<br>N° Orden para Procedimientos: ' + obj.idOrden;
                           break;
                       }
                       case '2': mensaje += '<br>N° Receta para Patológia Clínica: '+obj.IdReceta; break;
                       case '3': mensaje += '<br>N° Receta para Anatomía Patológica: '+obj.IdReceta; break;
                       case '21': mensaje += '<br>N° Receta para Rayos X: '+obj.IdReceta; break;
                       case '5': mensaje += '<br>N° Receta para Farmacia: '+obj.IdReceta; break; 
                       case '11': mensaje += '<br>N° Receta para Banco de Sangre: '+obj.IdReceta; break;
                       case '20': mensaje += '<br>N° Receta para Ecografía General: '+obj.IdReceta; break;
                       case '22': mensaje += '<br>N° Receta para Tomografía: '+obj.IdReceta; break;
                       case '23': mensaje += '<br>N° Receta para Ecografía Obstétrica: '+obj.IdReceta; break;
                       case '12': mensaje += '<br>N° Receta para Interconsulta: '+obj.IdReceta; break;
                       case "cita":{
                           if(obj.resultado==1){
                               mensaje += '<br>Proxima cita: N° Cuenta: '+obj.IdReceta;
                               if(obj.IdOrdenPago!=0)
                                   mensaje += ', N° Orden Pago: '+obj.IdOrdenPago; 
                           }
                           else{
                               mensaje += '<br>Proxima cita: '+obj.mensaje; 
                               errorCita= 1;
                           }
                           break;
                       } 

                       default: break;
                   }
                   
               });
               AbrirVisorRecetas(dataAll);
            }
                Swal.fire({
                icon: 'success',
                title: 'Guardado',
                html: mensaje,
                confirmButtonText: 'Aceptar',
                allowOutsideClick: false,
                allowEscapeKey: false
                })
           
            
            //  AbrirVisorDocumentos(Variables.IdCuentaAtencion,Variables.IdAtencion,1);
            

            // var eval = oTable_EvaEmer.DataTable().data().count();

            // sesion = Utilitario.ValidarSesion();
            // if (sesion) {
            //     if (eval == 0 && EvaluacionEmergencia.nuevaEvaluacion == false) {
            //         alerta(2, "No se ha registrado ninguna evaluación. Por favor registre una evaluación.");
            //     } else {
            //         if (EvaluacionEmergencia.ValidarVariablesEvaluacionEmergencia()) {
            //             Cargando(1);
            //             Triaje.GuardarTriajeHospEmeg(Variables.IdAtencion, Variables.IdServicioEgreso, 0);
            //             const data1 = await EvaluacionEmergencia.GuardarEvaluacionEmergencia();
            //             const data2 = await EvaluacionEmergencia.GuardarExamenFisico();

            //             if (EvaluacionEmergencia.nuevaEvaluacion == true || EvaluacionEmergencia.modificaEvaluacion == true) {
            //                 if (data1 == true && data2 == true) {
            //                     const data3 = await EvaluacionEmergencia.GuardarEvaluacionEmergenciaDetalle();
            //                     if (data3) {
            //                         alerta2('success', 'EMERGENCIA', 'La evaluación se guardó correctamente.');
            //                     }
            //                 }
            //             } else {
            //                 if (EvaluacionEmergencia.modificaCabecera == true) {
            //                     const data4 = EvaluacionEmergencia.ActualizarHojaCabecera();
            //                     if (data4) {
            //                         alerta2('success', 'EMERGENCIA', 'La evaluación se guardó correctamente.');
            //                     }
            //                 }
            //             }
            //             EvaluacionEmergencia.CargarEvaluacion();
            //             //EvaluacionEmergencia.LimpiarModuloEmergencia();
            //             //EvaluacionDetalle.Limpiar();
            //             //AdmisionEmergencia.CerrarModulo();
            //             //ReposicionarVista();
            //             //MostrarAreaLista();
            //             //AdmisionEmergencia.ListarAtenciones();

            //             Cargando(0);
            //         }
            //     }
            // }
        });

        $('#btnCerrarRecetas').on('click', function () {
            OrdenMedica.LimpiarOrdenesMedicas(); 
          // Redirigir usando el dominio actual (sin necesidad de escribirlo)
       // window.location.href = window.location.origin + '/Emergencia/Emergencia/0';


                 
            // $("#modalReceta").modal("hide");
        });
        $('#btnCerrarRecetas').on('click', function () {
            OrdenMedica.LimpiarOrdenesMedicas();            
            // $("#modalRecetaImprime1").modal("hide");
           // Redirigir usando el dominio actual (sin necesidad de escribirlo)
       // window.location.href = window.location.origin + '/Emergencia/Emergencia/0';

        });

        $('#tblOrdenesMedicas tbody').on('click', '.ImprimirRecetaSF', async function () {
            var objrow = DTORdenesMedicas.row($(this).parents("tr")[0]).index();
            var row = DTORdenesMedicas.row(objrow).data();
            console.log(row);

            let idCuentaAtencion = Variables.IdCuentaAtencion
            let idRegistro = row.IdReceta
            let idTipoServicio = 0
            let idEvaluacion = 0
            let tipo = 'REC'

            let documentoFirmado = await SeleccionarFirmasDigitales(idCuentaAtencion, idRegistro, idTipoServicio, idEvaluacion, tipo)

            if(documentoFirmado.length > 0) {
                VizualizarModalPdf(documentoFirmado[0].rutaArchivo);
                return
            }
            if(row.IdPuntoCarga==5){
                Cargando(1);
                $.ajax({
                    url: '/Recetas/informes/generarPDFA4/' + row.IdReceta,
                    method: 'GET',
                    success: function(response) {
                        if (response.pdf_url) {
                            // Coloca la URL del PDF en el src del iframe
                            $('#frame-pdf').attr('src', response.pdf_url);
                
                            // Abre el modal
                            $('#pdfModal').modal('show');
                        } else {
                            console.error('Error al generar el PDF.');
                        }
                    },
                    error: function(error) {
                        console.error('Error en la solicitud AJAX:', error);
                    }
                });
                Cargando(0);

            }else{
                Cargando(1);
                $.ajax({
                    url: '/Recetas/informes/generarPDF/' + row.IdReceta,
                    method: 'GET',
                    success: function(response) {
                        if (response.pdf_url) {
                            // Coloca la URL del PDF en el src del iframe
                            $('#frame-pdf').attr('src', response.pdf_url);
                
                            // Abre el modal
                            $('#pdfModal').modal('show');
                        } else {
                            console.error('Error al generar el PDF.');
                        }
                    },
                    error: function(error) {
                        console.error('Error en la solicitud AJAX:', error);
                    }
                });
                Cargando(0);

            }


          
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
        // $('#procedimientos').on('click', async function () { // JDELGADO J0 CAMBIO METODO IMPRESION}

        //     // let procedimientos = await VisorReceta.ListarDocumentoFirmaDigital(Variables.IdCuentaAtencion)

        //     // const firma = await Utilitario.SeleccionarFirmaDigitalV2(procedimientos[0].codeProc)             
        //     $('#ifrmReceta').attr('src', '');
        //     // let url = PathServerFiles + firma.rutaArchivo
        //     var idorden = $("#procedimientos").attr("data-rec");
        //     var idordenPago = $("#procedimientos").attr("data-code");

        //     $('.btnReceta').removeClass('active');
        //     $('#citaRecibo').removeClass('active');
        //     $('#procedimientos').addClass('active');
        //     // $('#TituloVisorReceta').append("");
        //     if (idordenPago != 0)
        //         $('#TituloVisorReceta').text("N° Orden Pago " + idordenPago);
        //     else
        //         $('#TituloVisorReceta').text("N° Orden " + idorden);
        //     // $('#ifrmReceta').attr('src', url);

        //     $.ajax({
        //         url: "/sa_general/pdf_orden",
        //         datatype: "json",
        //         data: { IdOrden: idorden },
        //         method: "get",
        //         async: false,
        //         success: function (res) {
        //             if (res.resultado == 1) {
        //                 // let url = 'data:application/pdf;base64,' +;
        //                 $('#ifrmReceta').attr('src', res.pdf_url);
        //             }
        //             else
        //                 toastr.warning(res.mensaje, "Aviso")
        //         },
        //         error: function (msg) {
        //             toastr.error(msg);
        //         }
        //     })

        //     //var objrow = oTable_atenciones.api(true).row($(this).parents("tr")[0]).index();
        //     //var row = oTable_atenciones.fnGetData(objrow);

        //     //Cargando(1);
        //     //const firma = await Utilitario.SeleccionarFirmaDigitalV2(row.codeProc)               //KHOYOSI            
        //     //if (typeof firma === 'undefined') {
        //     //    alerta('2', 'El documento no esta generado, Vuelva a guardar la atencion.')

        //     //} else {
        //     //    AbrirVisorDocumento(firma.rutaArchivo, 0);
        //     //}
        //     //Cargando(0);
        // });

        // $('#tblOrdenesMedicas tbody').on('click', '.FirmarRecetaSF', async function () {
        //     var objrow = DTORdenesMedicas.row($(this).parents("tr")[0]).index();
        //     var row = DTORdenesMedicas.row(objrow).data();
        //     console.log(row);
        //     Cargando(1);
        //     $.ajax({
        //         url: '/Recetas/informes/generarPDF/' + row.IdReceta,
        //         method: 'GET',
        //         success: function(response) {
        //             if (response.pdf_url) {

        //                 let idCuentaAtencion = Variables.IdCuentaAtencion
        //                 let idRegistro = row.IdReceta
        //                 let idTipoServicio = 0
        //                 let idEvaluacion = 0
        //                 let tipo = 'REC'
        //                 let rutaArchivo = window.location.origin + response.pdf_url

        //                 let param = idCuentaAtencion + '|' + idRegistro + '|' + idTipoServicio + '|' + idEvaluacion + '|' + tipo + '|' + rutaArchivo

        //                 sendParam(param)
        //             } else {
        //                 console.error('Error al generar el PDF.');
        //             }
        //         },
        //         error: function(error) {
        //             console.error('Error en la solicitud AJAX:', error);
        //         }
        //     });
        //     Cargando(0);
        //     /*
        //     const firma = await Utilitario.SeleccionarFirmaDigitalV2(row.code)
        //     if (!isEmpty(firma)) {
        //         AbrirVisorDocumento(firma.rutaArchivo, 0);
        //         //$('#tblOrdenesMedicas tbody tr').removeClass('selected');
        //     } else {
        //         alerta2('warning','','No existe el documento digital.')
        //     }
        //     */             
        // });
        

        $('#tblOrdenesMedicas tbody').on('click', '.ImprimirRecetaCF', async function () {
            var objrow = DTORdenesMedicas.api(true).row($(this).parents("tr")[0]).index();
            var row = DTORdenesMedicas.fnGetData(objrow);
            await Utilitario.AbrirDocumentoFirmadoBit4Id(row.code);
        });

        //=========================ORDENES==========================================//
        $('#btnAgregaFarmacia').on('click', function () {
            OrdenMedica.agregarProd(5);
        })
       
        
        $('#btnQuitarFarmacia').on('click', function () {
            OrdenMedica.quitarProd(5);
        })
        
        $('#btnAgregabancoSangre').on('click', function () {
            OrdenMedica.agregarProd(11);
        })
        $('#btnQuitarbancoSangre').on('click', function () {
            OrdenMedica.quitarProd(11);
        })
        
        $('#btnAgregatomografia').on('click', function () {
            OrdenMedica.agregarProd(22);
        })
        $('#btnQuitartomografia').on('click', function () {
            OrdenMedica.quitarProd(22);
        })
        // Patologia clinica 
        $('#btnAgregaPatoClinica').on('click', function () {
            OrdenMedica.agregarProd(2);
        })
        $('#btnQuitarPatoClinica').on('click', function () {
            OrdenMedica.quitarProd(2);
        })
        $('#btnAgregaPatoClinica_Emer').on('click', function () {
            OrdenMedica.agregarProd(29); // Lab Emergencia
        })
        $('#btnQuitarPatoClinica_Emer').on('click', function () {
            OrdenMedica.quitarProd(29); // Lab Emergencia
        })
        
        $('#btnAgregaanaPatologica').on('click', function () {
            OrdenMedica.agregarProd(3);
        })
        $('#btnQuitaranaPatologica').on('click', function () {
            OrdenMedica.quitarProd(3);
        })
        
        $('#btnAgregaEcoGene').on('click', function () {
            OrdenMedica.agregarProd(20);
        })
        $('#btnQuitarEcoGene').on('click', function () {
            OrdenMedica.quitarProd(20);
        })
        
        $('#btnAgregaRayosX').on('click', function () {
            OrdenMedica.agregarProd(21);
        })
        $('#btnQuitarRayos').on('click', function () {
            OrdenMedica.quitarProd(21);
        })
        
        $('#btnQuitarEcoObs').on('click', function () {
            OrdenMedica.quitarProd(23);
        })
        $('#btnAgregaEcoObs').on('click', function () {
            OrdenMedica.agregarProd(23);
        })

        $('#btnQuitarinterconsultas').on('click', function () {
            OrdenMedica.quitarProd(12);
        })
        $('#btnAgregainterconsultas').on('click', function () {
            OrdenMedica.agregarProd(12);
        })
                
        $('#btLimpiar').on('click', function () {
            OrdenMedica.limpiarCatalogo();
        })
        
        $('#btnCerrar').on('click', function () {
            $('#modalBusquedaCatalogo').modal('hide');
        })

        $('#cboMedicamento').on('change', function () {
                OrdenMedica.consulta_stock(cboMedicamento.value, cboFarmacia.value);
        })

        $('#cboFarmacia, #chkConStock').on('change', function () {
    
            var farmaciaId = $('#cboFarmacia').val();
            var idAtencion = $("#hdnIdAtencion").val();
            var filtro = $('#chkConStock').is(':checked') ? 1 : 0; 
            var token = $('meta[name="csrf-token"]').attr('content'); 
            
            $('#cboMedicamento').empty().append('<option value="" disabled selected>Seleccione una opción</option>');
        
            if (farmaciaId) {
                $.ajax({
                    url: '/Recetas/listarFarmaciaDetalle', 
                    method: 'POST',
                    data: {
                        idAlmacen: farmaciaId,
                        idAtencion: idAtencion,
                        filtro: filtro, 
                        _token: token 
                    },
                    success: function (response) {
                        console.log('Medicamentos:', response.medicamentos);
                        
                        if (response && response.medicamentos && response.medicamentos.length > 0) {
                            response.medicamentos.forEach(function (medicamento) {
                                const cantidadFormateada = parseFloat(medicamento.cantidad).toFixed(0);
                                $('#cboMedicamento').append(
                                    '<option value="' + medicamento.IdProducto + '" data-precio="' + medicamento.PrecioUnitario + '">' + 
                                    medicamento.Nombre + ' <span style="color: #b8860b; font-weight: bold;">( ' + cantidadFormateada + ' )</span>' +
                                    '</option>'
                                );
                            });
        
                            // Actualizar Chosen
                            $('#cboMedicamento').trigger('chosen:updated');
                        } else {
                            console.error('No hay medicamentos disponibles o estructura incorrecta:', response);
                            alert('No se encontraron medicamentos para esta farmacia.');
                        }
                    },
                    error: function () {
                        alert('Error al obtener los medicamentos. Inténtalo más tarde.');
                    }
                });
            }
        });

        

        //============================ Agregar Paquetes ==============================
        $('#btnGuardarPaquetes').on('click', function () {
            $('#modalPaquete').modal('hide');
            var selectElement = document.getElementById('cboPaquetes');
            var selectedOption = selectElement.options[selectElement.selectedIndex];
            var puntocarga = selectedOption.getAttribute('data-puntocarga');
           

            OrdenMedica.agregarPaqueteDetalle(puntocarga);
            

        })
        


        //Examenesss emergencia
        $('#btnGuardarExamenes').on('click', function () {
            OrdenMedica.obtenerExamenesSeleccionados(29);
            $('#modalExamenes').modal('hide');

           //var idFactPaquete = $('#cboPaquetes').val();
           //OrdenMedica.agregarPaqueteDetalle(idFactPaquete)
            
        })
        $('#btnCerrarExamenes').on('click', function () {
            $('#modalExamenes').modal('hide');
        })

        //Examenes Central
        $('#btnGuardarExamenesCentral').on('click', function () {
            OrdenMedica.obtenerExamenesSeleccionados(2);
            $('#modalExamenesCentral').modal('hide');

           //var idFactPaquete = $('#cboPaquetes').val();
           //OrdenMedica.agregarPaqueteDetalle(idFactPaquete)
            
        })
        $('#btnCerrarExamenesCentral').on('click', function () {
            $('#modalExamenesCentral').modal('hide');
        })

        //Obstetricia
        $('#btnGuardarExamenesEcoGeneral').on('click', function () {
            OrdenMedica.obtenerExamenesSeleccionados(20); //tabla Eco General
            $('#modalExamenEcoGeneral').modal('hide');

           //var idFactPaquete = $('#cboPaquetes').val();
           //OrdenMedica.agregarPaqueteDetalle(idFactPaquete)
            
        })
        $('#btnCerrarExamenesEcoGeneral').on('click', function () {
            $('#modalExamenEcoGeneral').modal('hide');
        })

        //rayosx
        $('#btnGuardarExamenesRayosX').on('click', function () {
            OrdenMedica.obtenerExamenesSeleccionados(21);
            $('#modalExamenRayosX').modal('hide');

           //var idFactPaquete = $('#cboPaquetes').val();
           //OrdenMedica.agregarPaqueteDetalle(idFactPaquete)
            
        })
        $('#btnCerrarExamenesRayosX').on('click', function () {
            $('#modalExamenRayosX').modal('hide');
        })


       
    },
    /*
    async obtenerDatosSeleccionados(puntoCarga) {
        var selectedItems = [];  
    
        $('#contenedorChecks input:checked').each(function() {
            

            
            var idProducto = $(this).data('id');
            var nombre = $(this).data('nombre');
            var precio = $(this).data('precio');
            var cantidad = 1;  
            var total = precio * cantidad;
            var observaciones = "";
            var dx = null;
                             
           
           
            var selectedItem = {
                idItem: idProducto,
                producto: nombre,
                cantidadPedida: cantidad,
                precio: precio,
                total: total,
                observaciones: observaciones,
                dx: dx
            };
    
            console.log('selectedItem', selectedItem);
            selectedItems.push(selectedItem); 
    
           
            DTRecetaPatoCli_Emer.row.add(selectedItem).draw(false);
    
           
            $('#txtCAntidadPatoClinica_Emer').val('1');
        });
    
        
        return selectedItems;
    },
    */
     async obtenerExamenesSeleccionados(puntoCarga) {
        if(puntoCarga == 29){ //Emergencia
            var selectedItems = [];  
            var prodExistente = 0;
   
   
            $('#contenedorChecks input[type="checkbox"]:checked').each(function() {
   
               
             
               if (OrdenMedica.existeProd( $(this).attr('id'), puntoCarga)) {
                   alerta('info', '', $(this).next().find('.toggle__text').text() + " ya fue agregado.");
                  
                    return false
                  }
                  
                 
                   var idProducto = $(this).attr('id');  
                   var nombre = $(this).next().find('.toggle__text').text();  
                   var codigo = $(this).data('codigo'); 
                   var cantidad = 1;
                   var precio = $(this).data('precio'); 
                   var total = precio * cantidad;
                   var observaciones = "";
                   var dx = null;
      
                  
                 
          
               console.log('idProducto',idProducto)
         
                 
                   var selectedItem = {
                       idItem: idProducto,
                       producto: nombre,
                       cantidadPedida: cantidad,
                       precio: precio,
                       total: total ,
                       observaciones: '',
                       dx: null
                   };
          
                   console.log('selectedItem',selectedItem)
                   selectedItems.push(selectedItem); 
                   DTRecetaPatoCli_Emer.row.add(selectedItem).draw(false);
      
   
               
   
               
                $('#txtCAntidadPatoClinica_Emer').val('1');
            });
       
           return selectedItems;
        }
        if(puntoCarga == 2){ //central
            var selectedItems = [];  
            var prodExistente = 0;
   
   
            $('#contenedorChecksCentral input[type="checkbox"]:checked').each(function() {
   
               
             
               if (OrdenMedica.existeProd( $(this).attr('id'), puntoCarga)) {
                   alerta('info', '', $(this).next().find('.toggle__text').text() + " ya fue agregado.");
                  
                    return false
                  }
                  
                 
                   var idProducto = $(this).attr('id');  
                   var nombre = $(this).next().find('.toggle__text').text();  
                   var codigo = $(this).data('codigo'); 
                   var cantidad = 1;
                   var precio = $(this).data('precio'); 
                   var total = precio * cantidad;
                   var observaciones = "";
                   var dx = null;
      
                  
                 
          
               console.log('idProducto',idProducto)
         
                 
                   var selectedItem = {
                       idItem: idProducto,
                       producto: nombre,
                       cantidadPedida: cantidad,
                       precio: precio,
                       total: total ,
                       observaciones: '',
                       dx: null
                   };
          
                   console.log('selectedItem',selectedItem)
                   selectedItems.push(selectedItem); 
                   DTRecetaPatoCli.row.add(selectedItem).draw(false);
      
   
               
   
               
                $('#txtCAntidadPatoClinica').val('1');
            });
       
           return selectedItems;
        }
        if(puntoCarga== 20){ //EcoGeneral
           
            var selectedItems = [];  
            var prodExistente = 0;
            $('#contenedorChecksEcoGeneral input[type="checkbox"]:checked').each(function() {
               if (OrdenMedica.existeProd( $(this).attr('id'), puntoCarga)) {
                   alerta('info', '', $(this).next().find('.toggle__text').text() + " ya fue agregado.");
                  
                    return false
                  }
                   var idProducto = $(this).attr('id');  
                   var nombre = $(this).next().find('.toggle__text').text();  
                   var codigo = $(this).data('codigo'); 
                   var cantidad = 1;
                   var precio = $(this).data('precio'); 
                   var total = precio * cantidad;
                   var observaciones = "";
                   var dx = null;
      
                  
                 
          
               console.log('idProducto',idProducto)
         
                 
                   var selectedItem = {
                       idItem: idProducto,
                       producto: nombre,
                       cantidadPedida: cantidad,
                       precio: precio,
                       total: total ,
                       observaciones: '',
                       dx: null
                   };
          
                   console.log('selectedItem',selectedItem)
                   selectedItems.push(selectedItem); 
                   DTRecetaEcoGene.row.add(selectedItem).draw(false);
                
            });
       
           
           return selectedItems;
        }
        if(puntoCarga== 21){
            var selectedItems = [];  
            var prodExistente = 0;
            $('#contenedorChecksRayosX input[type="checkbox"]:checked').each(function() {
               if (OrdenMedica.existeProd( $(this).attr('id'), puntoCarga)) {
                   alerta('info', '', $(this).next().find('.toggle__text').text() + " ya fue agregado.");
                  
                    return false
                  }
                   var idProducto = $(this).attr('id');  
                   var nombre = $(this).next().find('.toggle__text').text();  
                   var codigo = $(this).data('codigo'); 
                   var cantidad = 1;
                   var precio = $(this).data('precio'); 
                   var total = precio * cantidad;
                   var observaciones = "";
                   var dx = null;
      
                  
                 
          
               console.log('idProducto',idProducto)
         
                 
                   var selectedItem = {
                       idItem: idProducto,
                       producto: nombre,
                       cantidadPedida: cantidad,
                       precio: precio,
                       total: total ,
                       observaciones: '',
                       dx: null
                   };
          
                   console.log('selectedItem',selectedItem)
                   selectedItems.push(selectedItem); 
                   DTRecetaRayosX.row.add(selectedItem).draw(false);
                $('#txtCAntidadRx').val('1');
            });
       
           return selectedItems;
        }
          
            
     },
    async agregarPaqueteDetalle(idFactPaquete) {
        
        var productosNoAgregados = [];


        //Medicamento - Farmacia
        if (idFactPaquete == 5) {
            var objselec = $("#cboMedicamento").val();
    
          
                if ($('#txtCAntidadFarmacia').val() > 0 || $('#b_Cantidad').val() > 0) {
                    oTable_paquete.fnGetData().forEach(function (rowData) {
                        if(rowData.CantidadFarmacia>0){
                              
                            
                            if (OrdenMedica.existeProd(rowData.idProducto, idFactPaquete)) {
                                alerta('info', '', $('#cboMedicamento option:selected').text() + " ya fue agregado.");
                                return false;
                            }
                
                          
                          
                            var idProducto = rowData.idProducto;  
                            var producto = rowData.Descripcion;
                            var cantidad = rowData.Cantidad; 
                            var precioUnitario = parseFloat(rowData.Precio).toFixed(4); 
                            var total = precioUnitario * cantidad;
                            var idDosis = 1;
                            var dosis = 1;
                            var idViaAdministracion = rowData.idViaAdministracion;
                            var viasAdministracion = rowData.vias;
                            var observaciones = "";

                            var objRow = {
                                idItem: idProducto,
                                producto: producto,
                                cantidadPedida: cantidad,
                                precio: precioUnitario,
                                total: total,
                                idDosisRecetada: idDosis,
                                dosis: dosis,
                                idViaAdministracion: idViaAdministracion,
                                vias: viasAdministracion,
                                observaciones: observaciones,
                                dx: null
                            };
                
                           
                            DTRecetaFarmacia.row.add(objRow).draw(false);
                
                        } else {

                            let nuevoMedicamento =  rowData.Cantidad +'-'+rowData.Descripcion;
                            let contenidoActual = $('#txtOtrosMedicamentos').val().trim();
                            let medicamentosSet = new Set(contenidoActual ? contenidoActual.split('\n\n') : []);
                            medicamentosSet.add(nuevoMedicamento);
                            productosNoAgregados = Array.from(medicamentosSet);                
                           
                            $('#txtOtrosMedicamentos').val(Array.from(medicamentosSet).join('\n'));
                           
                        }
                      
                    });

                    if (productosNoAgregados.length > 0) {
                        var listaHTML = `
                            <h2 style="font-family: 'Arial', sans-serif; font-size: 24px; color: #00BFFF; text-align: center;">
                                Productos no añadidos<br>Stock 0
                            </h2>
                            <ul style="list-style-type: none; padding: 0; text-align: center;">
                        `;
                    
                        productosNoAgregados.forEach(function (producto) {
                            listaHTML += `<li style="margin-bottom: 10px; font-size: 18px; color: #333;">* ${producto}</li>`;
                        });
                    
                        listaHTML += `</ul>`; // Cerrar la lista
                    
                        $('#listaProductosNoAgregados').html(listaHTML);
                        $('#modalProductosNoAgregados').modal('show');
                    }
                    $('#txtCAntidadFarmacia').val('1');
                    $('#txtFrecuencia').val('');
                    $('#cboDosis').val(0);
                    $('#cboVia').val(0);
                    
                }
                else {
                    alerta('info', '', "Ingrese una cantidad correcta");
                    $("#txtCAntidadFarmacia").focus();
                    return false;
                }
          
        }
        //Laboratorio
        if (idFactPaquete == 2) {
            var objselec = $("#cboMedicamento").val();
    
          
         
                if ($('#txtCAntidadPatoClinica').val() > 0 || $('#b_Cantidad').val() > 0) {
                    oTable_paquete.fnGetData().forEach(function (rowData) {
                        
                       console.log('Producto',rowData.idProducto);
                       console.log('idFactPaquete',idFactPaquete);
                       
                        if (OrdenMedica.existeProd(rowData.idProducto, 29)) {
                            alerta('info', '',  rowData.Descripcion + " ya fue agregado.");
                            return false;
                        }
                            
                      
                       
                       
                        var cantidad = Math.round(rowData.Cantidad);  
                        var precioUnitario = Math.round(rowData.Precio); 
                        var total =  cantidad * precioUnitario
                        var idProducto = rowData.idProducto;  
                        var producto = rowData.Descripcion; 
                       
                        var idDosis =1;
                        var dosis = 1;
                        var idViaAdministracion = rowData.idViaAdministracion;
                        var viasAdministracion = rowData.vias;
                        var observaciones = "";
                        var objRow = {
                            idItem: idProducto,
                            producto: producto,
                            cantidadPedida: cantidad,
                            precio: precioUnitario,
                            total: total,
                            observaciones:observaciones,
                            dx: null
                        };
                        DTRecetaPatoCli_Emer.row.add(objRow).draw(false);
                    });

                    $('#txtCAntidadPatoClinica_Emer').val('1');  
                }
                else {
                    alerta('info', '', "Ingrese una cantidad correcta");
                    $("#txtCAntidadPatoClinica_Emer").focus();
                    return false;
                }
           
        }
      
        if (idFactPaquete == 3) {
            var objselec = $("#cboMedicamento").val();
    
         
                if ($('#txtCAntidadAPatologica').val() > 0 || $('#b_Cantidad').val() > 0) {
                    oTable_paquete.fnGetData().forEach(function (rowData) {
                   
                        var idProducto = rowData.idProducto;  
                        var producto = rowData.Descripcion; 
                        var cantidad = rowData.Cantidad; 
                        var precioUnitario = rowData.Precio; 
                        var total =precioUnitario * cantidad; 
                        var idDosis =1;
                        var dosis = 1;
                        var idViaAdministracion = rowData.idViaAdministracion;
                        var viasAdministracion = rowData.vias;
                        var observaciones = "";

                
                        var objRow = {
                            idItem: idProducto,
                            producto: producto,
                            cantidadPedida: cantidad,
                            precio: precioUnitario,
                            total: total,
                            observaciones:observaciones,
                            dx: null
                        };
                
                     
                        DTRecetaAnaPato.row.add(objRow).draw(false);
                    });

                   // $('#txtCAntidadAPatologica').val('1');
                  
                   
                }
                else {
                    alerta('info', '', "Ingrese una cantidad correcta");
                    $("#txtCAntidadFarmacia").focus();
                    return false;
                }
           // }
        }
        //Banco Sangre
        if (idFactPaquete == 11) {
            var objselec = $("#cboMedicamento").val();
    
           
                if ($('#txtCAntidadbancoSangre').val() > 0 || $('#b_Cantidad').val() > 0) {
                    oTable_paquete.fnGetData().forEach(function (rowData) {
                        // Aquí accedemos a los datos de cada fila
                        var idProducto = rowData.idProducto; 
                        var producto = rowData.Descripcion; 
                        var cantidad = rowData.Cantidad; 
                        var precioUnitario = rowData.Precio; 
                        var total =precioUnitario * cantidad; 
                        var observaciones = "";

                
                      
                        var objRow = {
                            idItem: idProducto,
                            producto: producto,
                            cantidadPedida: cantidad,
                            precio: precioUnitario,
                            total: total,
                            observaciones:observaciones,
                            dx: null
                        };
                
                        // Agregar el objeto a la tabla DTRecetaFarmacia
                        DTRecetaBancoSan.row.add(objRow).draw(false);
                    });

                    $('#txtCAntidadbancoSangre').val('1');
                    
                    
                }
                else {
                    alerta('info', '', "Ingrese una cantidad correcta");
                    $("#txtCAntidadFarmacia").focus();
                    return false;
                }
           // }
        }
        //Eco.Obstétrica
        if (idFactPaquete == 23) {
            var objselec = $("#cboMedicamento").val();
    
          
                if ($('#txtCAntidadObs').val() > 0 || $('#b_Cantidad').val() > 0) {
                    oTable_paquete.fnGetData().forEach(function (rowData) {
                        var idProducto = rowData.idProducto; 
                        var producto = rowData.Descripcion;
                        var cantidad = rowData.Cantidad; 
                        var precioUnitario = rowData.Precio;
                        var total =precioUnitario * cantidad; 
                        var observaciones = "";

                
                   
                        var objRow = {
                            idItem: idProducto,
                            producto: producto,
                            cantidadPedida: cantidad,
                            precio: precioUnitario,
                            total: total,
                            observaciones:observaciones,
                            dx: null
                        };
                
                       
                        DTRecetaEcoObst.row.add(objRow).draw(false);
                    });

                    $('#txtCAntidadObs').val('1');
                }
                else {
                    alerta('info', '', "Ingrese una cantidad correcta");
                    $("#txtCAntidadFarmacia").focus();
                    return false;
                }
           
        }
        //Eco. General
        if (idFactPaquete == 20) {
            var objselec = $("#cboMedicamento").val();
    
          
                if ($('#txtCAntidadEcoGeneral').val() > 0 || $('#b_Cantidad').val() > 0) {
                    oTable_paquete.fnGetData().forEach(function (rowData) {
                      
                        var idProducto = rowData.idProducto;  
                        var producto = rowData.Descripcion; 
                        var cantidad = rowData.Cantidad;
                        var precioUnitario = rowData.Precio; 
                        var total =precioUnitario * cantidad; 
                        var observaciones = "";
                
                       
                        var objRow = {
                            idItem: idProducto,
                            producto: producto,
                            cantidadPedida: cantidad,
                            precio: precioUnitario,
                            total: total,
                            observaciones:observaciones,
                            dx: null
                        };
                
                        DTRecetaEcoGene.row.add(objRow).draw(false);
                    });

                    $('#txtCAntidadEcoGeneral').val('1');
                }
                else {
                    alerta('info', '', "Ingrese una cantidad correcta");
                    $("#txtCAntidadFarmacia").focus();
                    return false;
                }
           
        }
        //Rayosx 
        if (idFactPaquete == 21) {
            var objselec = $("#cboMedicamento").val();
    
          
                if ($('#txtCAntidadRx').val() > 0 || $('#b_Cantidad').val() > 0) {
                    oTable_paquete.fnGetData().forEach(function (rowData) {
                      
                        var idProducto = rowData.idProducto;  
                        var producto = rowData.Descripcion; 
                        var cantidad = rowData.Cantidad;
                        var precioUnitario = rowData.Precio; 
                        var total =precioUnitario * cantidad; 
                        var observaciones = "";
                
                       
                        var objRow = {
                            idItem: idProducto,
                            producto: producto,
                            cantidadPedida: cantidad,
                            precio: precioUnitario,
                            total: total,
                            observaciones:observaciones,
                            dx: null
                        };
                        DTRecetaRayosX.row.add(objRow).draw(false);
                    });
                    $('#txtCAntidadRx').val('1');
                }
                else {
                    alerta('info', '', "Ingrese una cantidad correcta");
                    $("#txtCAntidadRx").focus();
                    return false;
                }
           
        }
        //Tomografia a
        if (idFactPaquete == 22) {
            var objselec = $("#cboMedicamento").val();
    
         
                if ($('#txtCAntidadtomografia').val() > 0 || $('#b_Cantidad').val() > 0) {
                    oTable_paquete.fnGetData().forEach(function (rowData) {
                        // Aquí accedemos a los datos de cada fila
                        var idProducto = rowData.idProducto;  
                        var producto = rowData.Descripcion; 
                        var cantidad = rowData.Cantidad;
                        var precioUnitario = rowData.Precio; 
                        var total =precioUnitario * cantidad; 
                        var observaciones = "";
                
                       
                        var objRow = {
                            idItem: idProducto,
                            producto: producto,
                            cantidadPedida: cantidad,
                            precio: precioUnitario,
                            total: total,
                            observaciones:observaciones,
                            dx: null
                        };
                
                        DTRecetaTomo.row.add(objRow).draw(false);
                    });

                    $('#txtCAntidadtomografia').val('1');
                }
                else {
                    alerta('info', '', "Ingrese una cantidad correcta");
                    $("#txtCAntidadFarmacia").focus();
                    return false;
                }
           
        }
       

    },
    
    

    async agregarProd(idCatalogo) {
        console.log('agregarProd');
        //////////////////KHOYOSI/////////////////////////////////////
        if ($("#cboMedicoReceta").val() != undefined && ($("#cboMedicoReceta").val() == 0 || $("#cboMedicoReceta").val() == null || $("#cboMedicoReceta").val() == '')) {
            alerta('info', '', "Seleccione el médico que receta.");
            return false;
        }
        /////////////////////////////////////////////////////////////////
        //RayosX
        if (idCatalogo == 21) {
            var objselec = $("#cboRx").val();
            console.log('objselec', objselec);
            if (OrdenMedica.existeProd(objselec, idCatalogo)) {
                alerta('info', '', $('#cboRx option:selected').text() + " ya fue agregado.");
                return false;
            }
            else {
                precioUnitario = $("#cboRx option:selected").data("precio");
                if ($('#txtCAntidadRx').val() > 0 || $('#txtCantidadRx').val() > 0) {
                    var objRow = {
                        idItem: objselec,
                        producto: $('#cboRx option:selected').text(),
                        cantidadPedida: $('#txtCAntidadRx').val(),
                        precio: precioUnitario,
                        total: precioUnitario * $('#txtCAntidadRx').val(),
                        observaciones: '',
                        dx: null
                    }
                    DTRecetaRayosX.row.add(objRow).draw(false);
                }
                else {
                    alerta('info', '', "Ingrese una cantidad correcta");
                    $("#txtCAntidadRx").focus();
                    return false;
                }
            }
        }
        //EcoObs
        if (idCatalogo == 23) {
            var objselec = $("#cboEcoObs").val();

            if (OrdenMedica.existeProd(objselec, idCatalogo)) {
                alerta('info', '', $('#cboEcoObs option:selected').text() + " ya fue agregado.");
                return false;
            }
            else {
                precioUnitario = $("#cboEcoObs option:selected").data("precio");
                if ($('#txtCAntidadObs').val() > 0 || $('#txtCantidadEcoObs').val() > 0) {
                    var objRow = {
                        idItem: objselec,
                        producto: $('#cboEcoObs option:selected').text(),
                        cantidadPedida: $('#txtCAntidadObs').val(),
                        precio: precioUnitario,
                        total: precioUnitario * $('#txtCAntidadObs').val(),
                        observaciones: '',
                        dx: null
                    }
                    DTRecetaEcoObst.row.add(objRow).draw(false);
                }
                else {
                    alerta('info', '', "Ingrese una cantidad correcta");
                    $("#txtCAntidadObs").focus();
                    return false;
                }
            }
        }
        //EcoGeneral
        if (idCatalogo == 20) {
            var objselec = $("#cboecoGene").val();

            if (OrdenMedica.existeProd(objselec, idCatalogo)) {
                alerta('info', '', $('#cboecoGene option:selected').text() + " ya fue agregado.");
                return false;
            }
            else {
                precioUnitario = $("#cboecoGene option:selected").data("precio");
                if ($('#txtCAntidadEcoGeneral').val() > 0 || $('#txtCantidadEcoGen').val() > 0) {
                    var objRow = {
                        idItem: objselec,
                        producto: $('#cboecoGene option:selected').text(),
                        cantidadPedida: $('#txtCAntidadEcoGeneral').val(),
                        precio: precioUnitario,
                        total: precioUnitario * $('#txtCAntidadEcoGeneral').val(),
                        observaciones: '',
                        dx: null
                    }
                    DTRecetaEcoGene.row.add(objRow).draw(false);

                    $('#txtCAntidadEcoGeneral').val('1');
                }
                else {
                    alerta('info', '', "Ingrese una cantidad correcta");
                    $("#txtCAntidadEcoGeneral").focus();
                    return false;
                }
            }
        }
        //AnaPatologica
        if (idCatalogo == 3) {
            var objselec = $("#cboanaPatologica").val();
            if (OrdenMedica.existeProd(objselec, idCatalogo)) {

                alerta('info', '', $('#cboanaPatologica option:selected').text() + " ya fue agregado.");
                return false;
            }
            else {
                if (DTRecetaAnaPato.data().length > 0) {
                    
                alerta('info', '',  " solo puede agregar un procedimiento por orden.");
                return false;
                }
                precioUnitario = $("#cboanaPatologica option:selected").data("precio");
                if ($('#txtCAntidadAPatologica').val() > 0 || $('#txtCantidadAnatPato').val() > 0) {
                    var objRow = {
                        idItem: objselec,
                        producto: $('#cboanaPatologica option:selected').text(),
                        cantidadPedida: $('#txtCAntidadAPatologica').val(),
                        precio: precioUnitario,
                        total: precioUnitario * $('#txtCAntidadAPatologica').val(),
                        observaciones: '',
                        dx: null
                    }
                    DTRecetaAnaPato.row.add(objRow).draw(false);

                    $('#txtCAntidadAPatologica').val('1');
                }
                else {
                    alerta('info', '', "Ingrese una cantidad correcta");
                    $("#txtCAntidadAPatologica").focus();
                    return false;
                }
            }
        }
        //PatoClinica
        if (idCatalogo == 2) {      
                var objselec = $("#cboPatoClinica").val();
            if (OrdenMedica.existeProd(objselec, idCatalogo)) {
                alerta('info', '', $('#cboPatoClinica option:selected').text() + " ya fue agregado.");
                return false;
            }
            else {
                precioUnitario = $("#cboPatoClinica option:selected").data("precio");
                if ($('#txtCAntidadPatoClinica').val() > 0 || $('#txtCantidadPatClinica').val() > 0) {
                    var objRow = {
                        idItem: objselec,
                        producto: $('#cboPatoClinica option:selected').text(),
                        cantidadPedida: $('#txtCAntidadPatoClinica').val(),
                        precio: precioUnitario,
                        total: precioUnitario * $('#txtCAntidadPatoClinica').val(),
                        observaciones: '',
                        dx: null,
                        //lab:2
                    }
                    DTRecetaPatoCli.row.add(objRow).draw(false);
                    

                    $('#txtCAntidadPatoClinica').val('1');
                }
                else {
                    alerta('info', '', "Ingrese una cantidad correcta");
                    $("#txtCAntidadPatoClinica").focus();
                    return false;
                }
            }
        }
         //PAto CLinica_emergecia
        if (idCatalogo == 29) {
            var objselec = $("#cboPatoClinica_Emergencia").val();

            console.log('objecto sleecionado',objselec);
            if (OrdenMedica.existeProd(objselec, 29)) {
                alerta('info', '', $('#cboPatoClinica_Emergencia option:selected').text() + " ya fue agregado.");
                return false;
            }
            else {
                precioUnitario = $("#cboPatoClinica_Emergencia option:selected").data("precio");
                if ($('#txtCAntidadPatoClinica_Emer').val() > 0 || $('#txtCAntidadPatoClinica_Emer').val() > 0) {
                    var objRow = {
                        idItem: objselec,
                        producto: $('#cboPatoClinica_Emergencia option:selected').text(),
                        cantidadPedida: $('#txtCAntidadPatoClinica_Emer').val(),
                        precio: precioUnitario,
                        total: precioUnitario * $('#txtCAntidadPatoClinica_Emer').val(),
                        observaciones: '',
                        dx: null,
                        //lab:2
                    }
                    DTRecetaPatoCli_Emer.row.add(objRow).draw(false);
                    

                    $('#txtCAntidadPatoClinica_Emer').val('1');
                }
                else {
                    alerta('info', '', "Ingrese una cantidad correcta");
                    $("#txtCAntidadPatoClinica_Emer").focus();
                    return false;
                }
            }
        }
        //BancoSangre
        if (idCatalogo == 11) {
            var objselec = $("#cbobancoSangre").val();

            if (OrdenMedica.existeProd(objselec, idCatalogo)) {
                alerta('info', '', $('#cbobancoSangre option:selected').text() + " ya fue agregado.");
                return false;
            }
            else {
                precioUnitario = $("#cbobancoSangre option:selected").data("precio");
                if ($('#txtCAntidadbancoSangre').val() > 0 || $('#txtCantidadBancoSangre').val() > 0) {
                    var objRow = {
                        idItem: objselec,
                        producto: $('#cbobancoSangre option:selected').text(),
                        cantidadPedida: $('#txtCAntidadbancoSangre').val(),
                        precio: precioUnitario,
                        total: precioUnitario * $('#txtCAntidadbancoSangre').val(),
                        observaciones: '',
                        dx: null
                    }
                    DTRecetaBancoSan.row.add(objRow).draw(false);

                    $('#txtCAntidadbancoSangre').val('1');
                }
                else {
                    alerta('info', '', "Ingrese una cantidad correcta");
                    $("#txtCAntidadbancoSangre").focus();
                    return false;
                }
            }
        }
        //Tomografia
        if (idCatalogo == 22) {
            var objselec = $("#cbotomografia").val();

            if (OrdenMedica.existeProd(objselec, idCatalogo)) {
                alerta('info', '', $('#cbotomografia option:selected').text() + " ya fue agregado.");
                return false;
            }
            else {
                precioUnitario = $("#cbotomografia option:selected").data("precio");
                if ($('#txtCAntidadtomografia').val() > 0 || $('#txtCantidadTomografia').val() > 0) {
                    var objRow = {
                        idItem: objselec,
                        producto: $('#cbotomografia option:selected').text(),
                        cantidadPedida: $('#txtCAntidadtomografia').val(),
                        precio: precioUnitario,
                        total: precioUnitario * $('#txtCAntidadtomografia').val(),
                        observaciones: '',
                        dx: null
                    }
                    DTRecetaTomo.row.add(objRow).draw(false);

                    $('#txtCAntidadtomografia').val('1');
                }
                else {
                    alerta('info', '', "Ingrese una cantidad correcta");
                    $("#txtCAntidadtomografia").focus();
                    return false;
                }
            }
        }
        //Interconsultas
        if (idCatalogo == 12) {
            //var objselec = $("#cbointerconsultasCE option:selected").attr("idproducto")
            var objselec = $("#cbointerconsultas").val();

            if (!isEmpty(objselec)) {
                if (OrdenMedica.existeProd(objselec, idCatalogo)) {
                    alerta(2, $('#cbointerconsultas option:selected').text() + " ya fue agregado.");
                    return false;
                }
                else {
                    precioUnitario = $("#cbointerconsultas option:selected").data("precio"); 
                    var objRow = {
                        idItem: objselec,
                        producto: $('#cbointerconsultas option:selected').text(),
                        cantidadPedida: 1,
                        precio: precioUnitario,
                        total: precioUnitario * 1,
                        idEspecialidad: 0,
                        especialidad: '',
                        otraEspecialidad: ''
                        /*idEspecialidad: $('#cboEspecialidades').val(),
                        especialidad: $('#cboEspecialidades option:selected').text(),
                        otraEspecialidad: $('#txtOtrasEspecialidadesInterconsulta').val()*/
                    }
                    DTRecetaInterconsulta.row.add(objRow).draw(false);
                }
            } else {
                alerta(2, 'Seleccione un procedimiento');
            }
        }
        //Medicamento - Farmacia
        if (idCatalogo == 5) {
            var objselec = $("#cboMedicamento").val();
            var productosNoAgregadosFarmacia = [];
           
            let stockProducto =await OrdenMedica.consulta_stock(objselec,cboFarmacia.value);
            let productoStock= $('#cboMedicamento option:selected').text();
            console.log('stockProducto aa',stockProducto);
                if(productoStock == 'Seleccione una opción'){
                    alerta('info', ''," Seleccione un Medicamento.");
                    return false;
                }
    
            if (OrdenMedica.existeProd(objselec, idCatalogo)) {
                alerta('info', '', $('#cboMedicamento option:selected').text() + " ya fue agregado.");
                return false;
            }
            else {
                precioUnitario = $("#cboMedicamento option:selected").data("precio");
               
                if ($('#txtCAntidadFarmacia').val() > 0 || $('#b_Cantidad').val() > 0) {
                   if(stockProducto >0){
                    var objRow = {
                        idItem: objselec,
                        producto: $('#cboMedicamento option:selected').text(),
                        cantidadPedida: $('#txtCAntidadFarmacia').val(),
                        precio: precioUnitario,
                        total: precioUnitario * $('#txtCAntidadFarmacia').val(),
                        //RQ0003 RMOREANO 
                        idDosisRecetada: $('#cboDosis').val(),
                        dosis: $('#cboDosis option:selected').text(),
                        idViaAdministracion: $('#cboVia').val(),
                        vias: $('#cboVia option:selected').text(),
                        observaciones: $('#txtFrecuencia').val(),
                        stock:stockProducto,
                        dx: null
                        //RQ0003 RM
                    }
                    DTRecetaFarmacia.row.add(objRow).draw(false);
                    

                    $('#txtCAntidadFarmacia').val('1');
                    $('#txtFrecuencia').val('');
                    $('#cboDosis').val(0);
                    $('#cboVia').val(0);

                   }else{
                    // var textoActual = $('#txtOtrosMedicamentos').val() + ' cant: ' +$('#txtCAntidadFarmacia').val() ;
                    // var productoSinStock = $('#cboMedicamento option:selected').text();
                    // var nuevoTexto = textoActual ? textoActual + '\n' + productoSinStock : productoSinStock;
                    // $('#txtOtrosMedicamentos').val(nuevoTexto);
                    var productoSinStock = $('#cboMedicamento option:selected').text();
                    var cantidad = $('#txtCAntidadFarmacia').val();
                    var nuevoMedicamento =  cantidad + '-'+productoSinStock ; 

                    var textoActual = $('#txtOtrosMedicamentos').val().trim();

                    
                    var medicamentosSet = new Set(textoActual ? textoActual.split('\n') : []);

                    
                    medicamentosSet.add(nuevoMedicamento);

                   
                    $('#txtOtrosMedicamentos').val(Array.from(medicamentosSet).join('\n'));
                    $('#txtCAntidadFarmacia').val('1');
                    $('#txtFrecuencia').val('');
                    $('#cboDosis').val(0);
                    $('#cboVia').val(0);

                   }
              
                }
                else {
                    alerta('info', '', "Ingrese una cantidad correcta");
                    $("#txtCAntidadFarmacia").focus();
                    return false;
                }
            }
        }
    },
    
    existeProd(idproducto, idCatalogo) {
        //RayosX
        if (idCatalogo == 21) {
            lstProductosRayos = DTRecetaRayosX.rows().data();
            if (lstProductosRayos.length == 0) {
                return false;
            }
            for (var i = 0; i < lstProductosRayos.length; i++) {
                if (lstProductosRayos[i].idItem == idproducto) {
                    return true;
                }
            }
        }
        //EcoObs
        if (idCatalogo == 23) {
            lstProductosEco = DTRecetaEcoObst.rows().data();
            if (lstProductosEco.length == 0) {
                return false;
            }
            for (var i = 0; i < lstProductosEco.length; i++) {
                if (lstProductosEco[i].idItem == idproducto) {
                    return true;
                }
            }
        }
        //EcoGeneral
        if (idCatalogo == 20) {
            lstProductosEcoGeneral = DTRecetaEcoGene.rows().data();
            if (lstProductosEcoGeneral.length == 0) {
                return false;
            }
            for (var i = 0; i < lstProductosEcoGeneral.length; i++) {
                if (lstProductosEcoGeneral[i].idItem == idproducto) {
                    return true;
                }
            }
        }
        //AnaPatologica
        if (idCatalogo == 3) {
            lstProductosAnatomiaPatologica = DTRecetaAnaPato.rows().data();
            if (lstProductosAnatomiaPatologica.length == 0) {
                return false;
            }
            for (var i = 0; i < lstProductosAnatomiaPatologica.length; i++) {
                if (lstProductosAnatomiaPatologica[i].idItem == idproducto) {
                    return true;
                }
            }
        }
        //PatoClinica
        if (idCatalogo == 2) {
            lstProductosPatoClinica = DTRecetaPatoCli.rows().data();
            console.log('listaProductosPatoClinica',lstProductosPatoClinica);
            if (lstProductosPatoClinica.length == 0) {
                return false;
            }
            for (var i = 0; i < lstProductosPatoClinica.length; i++) {
                if (lstProductosPatoClinica[i].idItem == idproducto) {
                    return true;
                }
            }
                
        }
        //PatoClinica Emergencia
        if (idCatalogo == 29) {
           //emergencia
          console.log('ingreso validar prod',idCatalogo)
            lstProductosPatoClinica_Emergencia = DTRecetaPatoCli_Emer.rows().data();
            console.log('lstProductosPatoClinica_Emergencia',lstProductosPatoClinica_Emergencia);
            if (lstProductosPatoClinica_Emergencia.length == 0) {
                return false;
            }
            for (var i = 0; i < lstProductosPatoClinica_Emergencia.length; i++) {
                if (lstProductosPatoClinica_Emergencia[i].idItem == idproducto) {
                    return true;
                }
            }
                
        }
        //BancoSangre
        if (idCatalogo == 11) {
    
            lstProductosbancoSangre = DTRecetaBancoSan.rows().data();
            if (lstProductosbancoSangre.length == 0) {
                return false;
            }
    
            for (var i = 0; i < lstProductosbancoSangre.length; i++) {
                if (lstProductosbancoSangre[i].idItem == idproducto) {
                    return true;
                }
            }
    
        }
        //Tomografia
        if (idCatalogo == 22) {
    
            lstProductostomografia = DTRecetaTomo.rows().data();
            if (lstProductostomografia.length == 0) {
                return false;
            }
    
            for (var i = 0; i < lstProductostomografia.length; i++) {
                if (lstProductostomografia[i].idItem == idproducto) {
                    return true;
                }
            }
    
        }
        //Interconsultas
        if (idCatalogo == 12) {
            lstProductosinterconsulta = DTRecetaInterconsulta.rows().data();
            if (lstProductosinterconsulta.length == 0) {
                return false;
            }
            for (var i = 0; i < lstProductosinterconsulta.length; i++) {
                if (lstProductosinterconsulta[i].idItem == idproducto) {
                    return true;
                }
            }
        }
        //Medicamento - Farmacia
        if (idCatalogo == 5) {
            lstProductosFarmacia = DTRecetaFarmacia.rows().data();
            if (lstProductosFarmacia.length == 0) {
                return false;
            }
            for (var i = 0; i < lstProductosFarmacia.length; i++) {
                if (lstProductosFarmacia[i].idItem == idproducto) {
                    return true;
                }
            }
        }
    
        return false;
    },
     validarFechaVigencia() {
        // Obtener el valor de la fecha en formato dd/mm/yyyy
        let fechaStr = $('#txtFechaVigencia').val();
        
        // Convertir la fecha a formato yyyy-mm-dd
        let partesFecha = fechaStr.split('/');
        let fechaVigencia = new Date(`${partesFecha[2]}-${partesFecha[1]}-${partesFecha[0]}`);
        
        if (isNaN(fechaVigencia.getTime())) {
            alerta('warning', 'Formato de fecha inválido. Usa el formato dd/mm/yyyy.');
            return false; // Retorna false si el formato es inválido
        }
    
        // Fecha de hoy
        let fechaHoy = new Date();
        
        // Fecha límite (hoy + 8 días)
        let fechaLimite = new Date(fechaHoy);
        fechaLimite.setDate(fechaHoy.getDate() + 8);
    
        // Validación
        if (fechaVigencia > fechaLimite) {
            alerta('warning', 'La fecha de vigencia no puede ser mayor a los 8 días a partir de hoy.');
            return false; // Retorna false si la fecha es mayor a la fecha límite
        }
    
        return true; // Retorna true si pasa todas las validaciones
    },
    

    DevolverRecetaDetalle(idCatalogo) {
        console.log('OrdenMedica.js - DevolverRecetaDetalle - idCatalogo', idCatalogo); //PGONZALESC
        
        var lstRecetadetalle = []
        var html = "";
        //html += '[';
        switch (idCatalogo) {
            //RayosX
            case 21:
                dataRx = DTRecetaRayosX.rows().data();
                console.log('datos tabla detalle',dataRx);
                dataRx.each(function (value, index) {
                    var txtFrec = "#txtFrec_" + dataRx[index]["idItem"];
                    var txtCant = "#txtCant_" + dataRx[index]["idItem"];  
                    var cboDx = "#cboDx_" + dataRx[index]["idItem"]; 
                    console.log('valor de txtCant',txtCant );
                    html += '<RecetaDetalle idItem="' + dataRx[index]["idItem"] + '" cantidadPedida="' + $(txtCant).val() + '" precio="' + dataRx[index]["precio"] + '" total="' + $(txtCant).val()*dataRx[index]["precio"] + '" idDosisRecetada="" idViaAdministracion="" observaciones="' + $(txtFrec).val() + '" dx="' + $(cboDx).val() + '"></RecetaDetalle>';                    
                });
                break;
            //EcoObs
            case 23:
                dataEcoObs = DTRecetaEcoObst.rows().data();
                dataEcoObs.each(function (value, index) {
                    var txtFrec = "#txtFrec_" + dataEcoObs[index]["idItem"];
                    var txtCant = "#txtCant_" + dataEcoObs[index]["idItem"];  
                    var cboDx = "#cboDx_" + dataEcoObs[index]["idItem"]; 
                    html += '<RecetaDetalle idItem="' + dataEcoObs[index]["idItem"] + '" cantidadPedida="' + $(txtCant).val() + '" precio="' + dataEcoObs[index]["precio"] + '" total="' + $(txtCant).val()*dataEcoObs[index]["precio"] + '" idDosisRecetada="" idViaAdministracion="" observaciones="' + $(txtFrec).val() + '" dx="' + $(cboDx).val() + '"></RecetaDetalle>';                    
                });
                break;
            //EcoGeneral
            case 20:
                dataEcoGeneral = DTRecetaEcoGene.rows().data();
                dataEcoGeneral.each(function (value, index) {
                    var txtFrec = "#txtFrec_" + dataEcoGeneral[index]["idItem"];
                    var txtCant = "#txtCant_" + dataEcoGeneral[index]["idItem"]; 
                    var cboDx = "#cboDx_" + dataEcoGeneral[index]["idItem"]; 
                    html += '<RecetaDetalle idItem="' + dataEcoGeneral[index]["idItem"] + '" cantidadPedida="' + $(txtCant).val() + '" precio="' + dataEcoGeneral[index]["precio"] + '" total="' + $(txtCant).val()*dataEcoGeneral[index]["precio"] + '" idDosisRecetada="" idViaAdministracion="" observaciones="' + $(txtFrec).val() + '" dx="' + $(cboDx).val() + '"></RecetaDetalle>';                    
                });
                break;
            //AnaPatologica
            case 3:
                dataanatPatologica = DTRecetaAnaPato.rows().data();
                dataanatPatologica.each(function (value, index) {
                    var txtFrec = "#txtFrec_" + dataanatPatologica[index]["idItem"];
                    var txtCant = "#txtCant_" + dataanatPatologica[index]["idItem"];     
                    var cboDx = "#cboDx_" + dataanatPatologica[index]["idItem"]; 
                    html += '<RecetaDetalle idItem="' + dataanatPatologica[index]["idItem"] + '" cantidadPedida="' + $(txtCant).val() + '" precio="' + dataanatPatologica[index]["precio"] + '" total="' + $(txtCant).val()*dataanatPatologica[index]["precio"] + '" idDosisRecetada="" idViaAdministracion="" observaciones="' + $(txtFrec).val() + '" dx="' + $(cboDx).val() + '"></RecetaDetalle>';                    
                });
                break;
            //PatoClinica
            case 2:
                dataPatoClinica = DTRecetaPatoCli.rows().data();
                dataPatoClinica.each(function (value, index) {
                    var txtFrec = "#txtFrec_" + dataPatoClinica[index]["idItem"];
                    var txtCant = "#txtCant_" + dataPatoClinica[index]["idItem"];   
                    var cboDx = "#cboDx_" + dataPatoClinica[index]["idItem"]; 
                    html += '<RecetaDetalle idItem="' + dataPatoClinica[index]["idItem"] + '" cantidadPedida="' + $(txtCant).val() + '" precio="' + dataPatoClinica[index]["precio"] + '" total="' + $(txtCant).val()*dataPatoClinica[index]["precio"] + '" idDosisRecetada="" idViaAdministracion="" observaciones="' + $(txtFrec).val() + '" dx="' + $(cboDx).val() + '"></RecetaDetalle>';                    
                });

                break;

                //PatoClinica-Examen Emergencia
            case 29:
                
                dataPatoClinica_Emergencia = DTRecetaPatoCli_Emer.rows().data();//emergencia Emxamenes
                dataPatoClinica_Emergencia.each(function (value, index) {
                    var txtFrec = "#txtFrec_" + dataPatoClinica_Emergencia[index]["idItem"];
                    var txtCant = "#txtCant_" + dataPatoClinica_Emergencia[index]["idItem"];
                    var cboDx = "#cboDx_" + dataPatoClinica_Emergencia[index]["idItem"];

                    html += '<RecetaDetalle idItem="' + dataPatoClinica_Emergencia[index]["idItem"] + '" cantidadPedida="' + $(txtCant).val() + '" precio="' + dataPatoClinica_Emergencia[index]["precio"] + '" total="' + $(txtCant).val() * dataPatoClinica_Emergencia[index]["precio"] + '" idDosisRecetada="" idViaAdministracion="" observaciones="' + $(txtFrec).val() + '" dx="' + $(cboDx).val() + '"></RecetaDetalle>';
                });
                

                break;
            //BancoSangre
            case 11:
                databancoSangre = DTRecetaBancoSan.rows().data();
                databancoSangre.each(function (value, index) {
                    var txtFrec = "#txtFrec_" + databancoSangre[index]["idItem"];
                    var txtCant = "#txtCant_" + databancoSangre[index]["idItem"]; 
                    var cboDx = "#cboDx_" + databancoSangre[index]["idItem"]; 
                    html += '<RecetaDetalle idItem="' + databancoSangre[index]["idItem"] + '" cantidadPedida="' + $(txtCant).val() + '" precio="' + databancoSangre[index]["precio"] + '" total="' + $(txtCant).val()*databancoSangre[index]["precio"] + '" idDosisRecetada="" idViaAdministracion="" observaciones="' + $(txtFrec).val() + '" dx="' + $(cboDx).val() + '"></RecetaDetalle>';                    
                });
                break
            //Tomografia
            case 22:
                dataTomografia = DTRecetaTomo.rows().data();
                dataTomografia.each(function (value, index) {
                    var txtFrec = "#txtFrec_" + dataTomografia[index]["idItem"];
                    var txtCant = "#txtCant_" + dataTomografia[index]["idItem"];            
                    var cboDx = "#cboDx_" + dataTomografia[index]["idItem"]; 
                    html += '<RecetaDetalle idItem="' + dataTomografia[index]["idItem"] + '" cantidadPedida="' + $(txtCant).val() + '" precio="' + dataTomografia[index]["precio"] + '" total="' + $(txtCant).val()*dataTomografia[index]["precio"] + '" idDosisRecetada="" idViaAdministracion="" observaciones="' + $(txtFrec).val() + '" dx="' + $(cboDx).val() + '"></RecetaDetalle>';                    
                });
                break
            //Interconsultas
            case 12: 
                datainterconsulta = DTRecetaInterconsulta.rows().data();
                datainterconsulta.each(function (value, index) {
                    var txtFrec = "#txtFrec_" + datainterconsulta[index]["idItem"];
                    var txtCant = "#txtCant_" + datainterconsulta[index]["idItem"];   
                    var cboDx = "#cboDx_" + datainterconsulta[index]["idItem"];                   
                    html += '<RecetaDetalle idItem="' + datainterconsulta[index]["idItem"] + '" cantidadPedida="' + 1 + '" precio="' + datainterconsulta[index]["precio"] + '" total="' + 1*datainterconsulta[index]["precio"] + '" idDosisRecetada="" idViaAdministracion="" observaciones="' + "" + '" dx="' + "" + '"></RecetaDetalle>';
                    /*html += '{"idItem":"' + datainterconsulta[index]["idItem"] + '","cantidadPedida":"' + $(txtCant).val() +
                        '","precio":"' + datainterconsulta[index]["precio"] + '","total":"' + datainterconsulta[index]["total"] +
                        '","idEspecialidad":"' + datainterconsulta[index]["idEspecialidad"] + '", "otraEspecialidad":"' + datainterconsulta[index]["otraEspecialidad"] + '"},';     */  //KHOYOSI                    
                });
                break;    
            //Medicamento - Farmacia
            case 5:
                databafarmacia = DTRecetaFarmacia.rows().data();
                let farmacosSinStock = []; 
                console.log('datos tabla farm',databafarmacia);
                databafarmacia.each(function (value, index) {
                    var txtFrec = "#txtFrec_" + databafarmacia[index]["idItem"];
                    var txtCant = "#txtCant_" + databafarmacia[index]["idItem"];          
                    var cboDx = "#cboDx_" + databafarmacia[index]["idItem"];
                     var stock =  databafarmacia[index]["stock"]; 
                    console.log('stock',stock);
                    html += '<RecetaDetalle idItem="' + databafarmacia[index]["idItem"] + '" cantidadPedida="' + $(txtCant).val() + '" precio="' + databafarmacia[index]["precio"] + '" total="' + $(txtCant).val()*databafarmacia[index]["precio"] + '" idDosisRecetada="' + databafarmacia[index]["idDosisRecetada"] + '" idViaAdministracion="' + databafarmacia[index]["idViaAdministracion"] + '" observaciones="' + $(txtFrec).val() + '" dx="' + $(cboDx).val() + '"></RecetaDetalle>';

                });
                break;
        }
        //html += ']';
        //var htmlCompleto = html.replace(",]", "]")
        var htmlCompleto = '<ROOT>' + html + '</ROOT>'
        
        return htmlCompleto;
    },

    

     async  ObtenerLaboraEmpleado() {
        var IdMedico = Variables.IdMedicoLogeado;
        console.log('IdMedico', IdMedico);
        var resp = null;
        var token = $('meta[name="csrf-token"]').attr('content');
    
        try {
          
            let datos =  await $.ajax({
                method: "POST",
                url: "/OrdenMedica/ObtenerLaboraEmpleado",
                data: JSON.stringify({
                    IdMedico: IdMedico
                }),
                dataType: "json", 
                headers: {
                    'X-CSRF-TOKEN': token, 
                    'Content-Type': 'application/json' 
                },
                cache: false
            });
    
          
            if (datos.idLaboraSubArea) {
                resp = datos.idLaboraSubArea; 
                if(resp == 17){
                    $('#cboFarmacia').val(22).trigger('chosen:updated');
                    OrdenMedica.cargarMedicamentos(22); 
                }else{
                    $('#cboFarmacia').val(11).trigger('chosen:updated');
                    
                }

            } else {
                console.log('No se obtuvo el valor idLaboraSubArea');
            }
        } catch (error) {
            alerta(3, error);
        }
    
        return resp;
    },
    async GuardarOrdenesMedicas() {
        var formData = new FormData();
        let datos;
        let resp = [];
        // obtenerDIa = 
        // fechaVigencia =$('#txtFechaVigencia').val();
        
        databafarmacia = DTRecetaFarmacia.rows().data();
             console.log('datos defarmacia', databafarmacia);
        if(OrdenMedica.validarFechaVigencia()){
            var ListaRecetaDetalleRx = OrdenMedica.DevolverRecetaDetalle(21);
        var ListaRecetaDetalleEcobs = OrdenMedica.DevolverRecetaDetalle(23);
        //var ListaRecetaDetalleEcobsProc = OrdenMedica.DevolverRecetaDetalle(24);
        var ListaRecetaDetalleEcoGeneral = OrdenMedica.DevolverRecetaDetalle(20);
        var ListaRecetaDetalleAnatoPatologica = OrdenMedica.DevolverRecetaDetalle(3);
        var ListaRecetaDetallePatalogiaClinica = OrdenMedica.DevolverRecetaDetalle(2);
         var ListaRecetaDetallePatalogiaClinica_Emergencia = OrdenMedica.DevolverRecetaDetalle(29); ///Examen Emergencia
        var ListaRecetaDetalleBancoSangre = OrdenMedica.DevolverRecetaDetalle(11);
        var ListaRecetaDetalleFarmacia = OrdenMedica.DevolverRecetaDetalle(5); 
        console.log('datos Farmacia Detalle',ListaRecetaDetalleFarmacia)       
        var ListaRecetaDetalleTomografia = OrdenMedica.DevolverRecetaDetalle(22); 
        var ListaRecetaDetalleInterconsulta = OrdenMedica.DevolverRecetaDetalle(12);
    
        if (ListaRecetaDetalleRx == "<ROOT></ROOT>" && ListaRecetaDetalleEcobs == "<ROOT></ROOT>" /*&& ListaRecetaDetalleEcobsProc == "<ROOT></ROOT>"*/
        && ListaRecetaDetalleEcoGeneral == "<ROOT></ROOT>" && ListaRecetaDetalleAnatoPatologica == "<ROOT></ROOT>" &&
            ListaRecetaDetallePatalogiaClinica == "<ROOT></ROOT>" &&  ListaRecetaDetallePatalogiaClinica_Emergencia == "<ROOT></ROOT>" &&  ListaRecetaDetalleBancoSangre == "<ROOT></ROOT>" && ListaRecetaDetalleFarmacia == "<ROOT></ROOT>" && ListaRecetaDetalleInterconsulta == "<ROOT></ROOT>" && ListaRecetaDetalleTomografia == "<ROOT></ROOT>") {
            alerta('warning', 'No existe ningún item para registrar en la receta.');
            return false;
            //return resp;
        }
                
        formData.append('_token', $("meta[name='csrf-token']").attr("content"));
        
        //rayos
        formData.append('lstRecetaRx', ListaRecetaDetalleRx);
        formData.append('idRecetaRx', $('#hdIdRecetaRX').val());
        //ecoobst
        formData.append('lstRecetaEcoObs', ListaRecetaDetalleEcobs);
        formData.append('idRecetaEcoObs', $('#hdIdRecetaEcoObs').val());    
        //EcoGeneral
        formData.append('lstRecetaEcoGeneral', ListaRecetaDetalleEcoGeneral);
        formData.append('idRecetaEcoGene', $('#hdIdRecetaEcoGene').val());
        //anatoPatolg
        formData.append('lstRecetaAnatoPatologica', ListaRecetaDetalleAnatoPatologica);
        formData.append('idRecetaAnaPatologica', $('#hdIdRecetaAnaPatologica').val());
        //patogClinica
        formData.append('lstRecetaPatalogiaClinica', ListaRecetaDetallePatalogiaClinica);
        formData.append('idRecetaPatoClinica', $('#hdIdRecetaPatoClinica').val());

         //patogClinica-Emergencia
         formData.append('lstRecetaPatalogiaClinica_Emergencia', ListaRecetaDetallePatalogiaClinica_Emergencia);
         formData.append('idRecetaPatoClinicaEmergencia', $('#hdIdRecetaPatoClinicaEmergencia').val());
         console.log('idRecetaPatoClinicaEmergencia',$('#hdIdRecetaPatoClinicaEmergencia').val());

        //bancoSangre
        formData.append('lstRecetaBancoSangre', ListaRecetaDetalleBancoSangre);
        formData.append('idRecetaBancoSangre', $('#hdIdRecetabancoSangre').val());
        //tomografia
        formData.append('lstRecetaTomografia', ListaRecetaDetalleTomografia); 
        formData.append('idRecetaTomografia', $('#hdIdRecetatomografia').val());
        //Interconsulta
        formData.append('lstRecetaInterconsulta', ListaRecetaDetalleInterconsulta);
        formData.append('idRecetaInterconsulta', $('#hdIdRecetaInterconsulta').val());
        formData.append("ResumenHistoriaClinica", $("#txtResumenHistoriaClinica").val());
        formData.append("MotivoInterconsulta", $("#txtMotivoInterconsulta").val());
        //farmacia
        formData.append('lstRecetaFarmacia', ListaRecetaDetalleFarmacia);
        formData.append('idRecetaFarmacia', $('#hdIdRecetaFarmacia').val());

        formData.append('IdCuentaAtencion', Variables.IdCuentaAtencion);
        console.log('OrdenMedica.js - GuardarOrdenesMedicas - IdCuentaAtencion', Variables.IdCuentaAtencion);
        formData.append('IdMedico', Variables.IdMedicoLogeado);
        console.log('OrdenMedica.js - GuardarOrdenesMedicas - IdMedico', Variables.IdMedicoLogeado);
        
        formData.append('FechaVigencia', $('#txtFechaVigencia').val());
        console.log('OrdenMedica.js - GuardarOrdenesMedicas - FechaVigencia', $('#txtFechaVigencia').val());
        formData.append('IdServicioReceta', Variables.IdServicio);
        console.log('OrdenMedica.js - GuardarOrdenesMedicas - IdServicioReceta', Variables.IdServicio);
        //formData.append('idServicioGeneral', $('#hdIdTipoServicio').val());
        formData.append('NroEvaluacion', EvaluacionEmergencia.IdNumero);
        console.log('OrdenMedica.js - GuardarOrdenesMedicas - NroEvaluacion', EvaluacionEmergencia.IdNumero);
        formData.append('OtrosMedicamentos',$('#txtOtrosMedicamentos').val());
        formData.append('IdTipoServicio',2); // Emergencia

        
      
        // formData.append('NroEvaluacion', Variables.NroEvaluacion);
    
        //alerta(4, 'Generando recetas, por favor espere.');
        try {
            //Cargando(1);
            datos = await
                $.ajax({
                    method: "POST",
                    url: "/Recetas/GuardarReceta",
                    data: formData,
                    dataType: "json",
                    cache: false,
                    processData: false,
                    contentType: false,
                });
            //Cargando(0);
            alerta('success', '', 'Las recetas se guardaron correctamente.')
            console.log('OrdenMedica.js - GuardarOrdenesMedicas - Recetas/GuardarReceta', datos);
            // resp=datos.resultado;
            resp = true;
            /*if (datos.session) {
                if (datos.rpt) {
                    if (datos.msjReceta != "") {
                        //console.log(datos.objRecetas);
                        var objRecetas = datos.objRecetas;
                        var recetas = [
                            { "idPuntoCarga": 21, "idReceta": datos.lrcRx, "code": isEmpty(objRecetas.find(({ idPuntoCarga }) => idPuntoCarga == 21)) ? '' : objRecetas.find(({ idPuntoCarga }) => idPuntoCarga == 21).code },
                            { "idPuntoCarga": 2, "idReceta": datos.lrcPatoClin, "code": isEmpty(objRecetas.find(({ idPuntoCarga }) => idPuntoCarga == 2)) ? '' : objRecetas.find(({ idPuntoCarga }) => idPuntoCarga == 2).code },
                            { "idPuntoCarga": 3, "idReceta": datos.lrcAnaPato, "code": isEmpty(objRecetas.find(({ idPuntoCarga }) => idPuntoCarga == 3)) ? '' : objRecetas.find(({ idPuntoCarga }) => idPuntoCarga == 3).code },
                            { "idPuntoCarga": 11, "idReceta": datos.lrcBancoS, "code": isEmpty(objRecetas.find(({ idPuntoCarga }) => idPuntoCarga == 11)) ? '' : objRecetas.find(({ idPuntoCarga }) => idPuntoCarga == 11).code },
                            { "idPuntoCarga": 20, "idReceta": datos.lrcEcoGene, "code": isEmpty(objRecetas.find(({ idPuntoCarga }) => idPuntoCarga == 20)) ? '' : objRecetas.find(({ idPuntoCarga }) => idPuntoCarga == 20).code },
                            { "idPuntoCarga": 23, "idReceta": datos.lrcEcoObst, "code": isEmpty(objRecetas.find(({ idPuntoCarga }) => idPuntoCarga == 23)) ? '' : objRecetas.find(({ idPuntoCarga }) => idPuntoCarga == 23).code },
                            { "idPuntoCarga": 24, "idReceta": datos.lrcEcoObstProc, "code": isEmpty(objRecetas.find(({ idPuntoCarga }) => idPuntoCarga == 24)) ? '' : objRecetas.find(({ idPuntoCarga }) => idPuntoCarga == 24).code },
                            { "idPuntoCarga": 5, "idReceta": datos.lrcFarmacia, "code": isEmpty(objRecetas.find(({ idPuntoCarga }) => idPuntoCarga == 5)) ? '' : objRecetas.find(({ idPuntoCarga }) => idPuntoCarga == 5).code },
                            { "idPuntoCarga": 22, "idReceta": datos.lrcTomografia, "code": isEmpty(objRecetas.find(({ idPuntoCarga }) => idPuntoCarga == 22)) ? '' : objRecetas.find(({ idPuntoCarga }) => idPuntoCarga == 22).code },
                            
                        ]
                        //VisorReceta.AbrirVisorRecetas(recetas);
    
                        resp = recetas;
    
                        swal({
                            title: 'Recetas',
                            text: datos.msjReceta,
                            type: 'info',
                        }).done();
    
    
                    }
    
                    alerta('1', 'Se  registro correctamente las recetas');
                    return resp;
                }
                else {
                    alerta('2', datos.msjReceta);
                }
            }
            else {
                alert("La sesion ya expiro se volvera a recargar la pagina")
                location.reload();
            }*/
        } catch (error) {
            console.error(JSON.stringify(error))
            //Cargando(0);
            alerta('error', '', JSON.stringify(error));
        }

        }else{
            return false;
        }
        
    
        
    
        return resp;
    },

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // <summary>
    // DATATABLES
    // </summary>
    // INICIALIZA DATA TABLE
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    IniciarDataTablesOrdenesMedicas() {
        DTORdenesMedicas = $('#tblOrdenesMedicas').DataTable({
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
                        if (rowData.IdPuntoCarga == 2 && rowData.IdPuntoCargaLab == 29) {
                            $(td).html("Pat.Clinica Lab. Emergencia");
                        }
                         if(rowData.IdPuntoCarga == 2 && rowData.IdPuntoCargaLab == null)
                        {
                            $(td).html("Pat.Clinica Lab. Central");
                        }
                        
                        

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
                        btnImprimeSinF = '<button class="ImprimirRecetaSF btn btn-sm glow_button" style="background:orange;color:white;"><i class="fa fa-print"></i> </button>';
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
            ]
        });
    },
    IniciarDataTablesPaquetesMedicos() {
        DTORdenesMedicas = $('#tblPaqueteMedico').DataTable({
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
                        btnImprimeSinF = '<button class="ImprimirRecetaSF btn btn-sm glow_button" style="background:orange;color:white;"><i class="fa fa-print"></i> </button>';
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
            ]
        });
    },


    IniciarDataTablesRecetasMedicas() {
        DTRecetaFarmacia = $('#tblCatalogoFarmacia').DataTable({
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
                    width: '0%',
                    targets: 0,
                    visible: false,
                    data: "idItem",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                {
                    width: '35%',
                    targets: 1,
                    data: "producto",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                {
                    width: '10%',
                    targets: 2,
                    data: "cantidadPedida",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left');
                        var inputCantidad = '';
                        inputCantidad = '  <input id="txtCant_' + rowData.idItem + '" value="' + rowData.cantidadPedida + '" style=" width: 80%;" autocomplete="off" placeholder="" class="form-control form-control-sm solo-numero">'
                        $(td).html(inputCantidad);
                    }
                },
                //RQ0003 RMOREANO
                {
                    width: '0%',
                    targets: 3,
                    visible: false,
                    data: "idDosisRecetada",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                {
                    width: '10%',
                    targets: 4,
                    data: "dosis",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                {
                    width: '0%',
                    targets: 5,
                    visible: false,
                    data: "idViaAdministracion",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                {
                    width: '15%',
                    targets: 6,
                    data: "vias",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                {
                    width: '20%',
                    targets: 7,
                    data: "observaciones",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                        var caja = "";
                        if (rowData.observaciones == "") {
                            caja = '  <input id="txtFrec_' + rowData.idItem + '" style=" width: 90%;" autocomplete="off" placeholder="" class="form-control form-control-sm">'
                        } else {
                            caja = '  <input id="txtFrec_' + rowData.idItem + '" value="' + rowData.observaciones + '" style=" width: 90%;" autocomplete="off" placeholder="" class="form-control form-control-sm">'
                        }
                        $(td).html(caja)
                    }
                }
            ]
        });

        var params = {
            "scrollY": "145px",
            "scrollCollapse": true,
            "autoWidth": false,
            data: null,
            destroy: true,
            info: false,
            bFilter: false,
            paging: false,
            responsive: true,
            columns: [
                {
                    width: '0%',
                    targets: 0,
                    visible: false,
                    data: "idItem",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                {
                    width: '70%',
                    targets: 1,
                    data: "producto",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                {
                    width: '10%',
                    targets: 2,
                    data: "cantidadPedida",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                        var inputCantidad = '';
                        inputCantidad = '  <input id="txtCant_' + rowData.idItem + '" value="' + rowData.cantidadPedida + '" style=" width: 80%;" autocomplete="off" placeholder="" class="form-control form-control-sm solo-numero">'
                        $(td).html(inputCantidad);
                    }
                },
                {
                    width: '20%',
                    targets: 7,
                    data: "observaciones",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                        var caja = "";
                        if (rowData.observaciones == "") {
                            caja = '  <input id="txtFrec_' + rowData.idItem + '" style=" width: 90%;" autocomplete="off" placeholder="" class="form-control form-control-sm">'
                        } else {
                            caja = '  <input id="txtFrec_' + rowData.idItem + '" value="' + rowData.observaciones + '" style=" width: 90%;" autocomplete="off" placeholder="" class="form-control form-control-sm">'
                        }
                        $(td).html(caja)
                    }
                }
            ]
        }

        DTRecetaRayosX = $('#tblCatalogoRayos').DataTable(params);
        DTRecetaEcoGene = $('#tblCatalogoEcoGene').DataTable(params);
        DTRecetaEcoObst = $('#tblCatalogoEcoObs').DataTable(params);
        DTRecetaAnaPato = $('#tblCatalogoAnaPatologica').DataTable(params);
        DTRecetaPatoCli = $('#tblCatalogoPatoClinica').DataTable(params);
        DTRecetaPatoCli_Emer = $('#tblCatalogoPatoClinica_Emer').DataTable(params);
        DTRecetaBancoSan = $('#tblCatalogobancoSangre').DataTable(params);
        DTRecetaTomo = $('#tblCatalogotomografia').DataTable(params);
    },

    IniciarDataTablesInterconsulta() {
        DTRecetaInterconsulta = $('#tblCatalogointerconsultas').DataTable({
            "scrollY": "145px",
            "scrollCollapse": true,
            "autoWidth": false,
            data: null,
            destroy: true,
            info: false,
            bFilter: false,
            paging: false,
            responsive: true,
            //scrollY: '40vh',
            //dom: 'Bflr<"table-responsive"t>ip',
            buttons: ['copy', 'csv', 'print'],
            columns: [
                {
                    width: '0%',
                    targets: 0,
                    visible: false,
                    data: "idItem",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                {
                    width: '60%',
                    targets: 1,
                    data: "producto",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                {
                    width: '20%',
                    targets: 2,
                    data: "cantidadPedida",
                    visible: false,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                        var inputCantidad = '';
                        inputCantidad = '  <input id="txtCant_' + rowData.idItem + '" value="' + rowData.cantidadPedida + '" style=" width: 80%;" autocomplete="off" placeholder="" class="form-control form-control-sm solo-numero">'
                        $(td).html(inputCantidad);
                    }
                },
                /*{
                    width: '0%',
                    targets: 3,
                    visible: false,
                    data: "idEspecialidad",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                {
                    width: '20%',
                    targets: 4,
                    data: "especialidad",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                {
                    width: '20%',
                    targets: 5,
                    data: "otraEspecialidad",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },*/
            ]
        });
    
    },

    IniciarDataTablesDiagnosticosInterconsulta() {

        DTDiagnosticosRecetaMedica = $('#tblDiagnosticosRecetaMedica').DataTable({
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
                
                /*{ width: '0%', targets: 0, "data": "iddiagnostico", className: 'ContCenter', "visible": false },
                { width: '0%', targets: 1, "data": "codigoCIEsinPto", className: 'ContCenter', "visible": false },
                { width: '10%', targets: 2, "data": "codigoCIE10", className: 'ContCenter' },
                { width: '80%', targets: 3, "data": "descripcion" },
                { width: '0%', targets: 4, "data": "esActivo", className: 'ContCenter', "visible": false },
                { width: '0%', targets: 5, "data": "fechaInicioVigencia", className: 'ContCenter', "visible": false },
                { width: '0%', targets: 6, "data": "idTipoDiagnostico", className: 'ContCenter', "visible": false },
                { width: '10%', targets: 7, "data": "tipoDiagnostico", className: 'ContCenter', "visible": true },
                { width: '10%', targets: 8, "data": "intrahospitalario", className: 'ContCenter', "visible": false }*/
    
            ]
        });
            
    },
    ////////////////////////DATATABLE/////////////////////////////////////////////////////////
initDatablesFarmacia() {
    var parms = {
        "scrollY": "250px",
        "scrollCollapse": true,
        data: null,
        destroy: true,
        info: false,
        bFilter: false,
        paging: false,
        responsive: true,
        //dom: 'Bflr<"table-responsive"t>ip',
        //buttons: ['copy', 'csv', 'print'],
        columns: [
            {
                visible: false,
                data: "idItem",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'left')

                }
            }
            ,
            {
                data: "producto",
                width: "80%",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'left')

                }
            }
            ,
            {
                data: "cantidadPedida",
                width: "20%",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'left')

                }
            } /*,
            {
                visible: false,
                data: "lab",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'left')

                }
            }*/


        ]

    }

    var tableWrapper = $('#tblCatalogoFarmaciaOrdRes'); // datatable creates the table wrapper by adding with id {your_table_id}_wrapper
    //tableWrapper.find('.dataTables_length select').select2(); // initialize select2 dropdown
    oTable_farmaciaOrdes = $("#tblCatalogoFarmaciaOrdRes").dataTable(parms);
    $('#tblCatalogoFarmaciaOrdRes_length').css('display', 'none')
},
initDatablesPaquetes() {
    var parms = {
        "scrollY": "300px",
        "scrollCollapse": true,
        data: null,
        destroy: true,
        info: false,
        bFilter: false,
        paging: false,
        responsive: true,
        //dom: 'Bflr<"table-responsive"t>ip',
        buttons: ['copy', 'csv', 'print'],
        columns: [
            {
                data: "Especialidad",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'left')
                }
            },
            {
                data: "Codigo",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'left')
                }
            },
            {
                data: "Descripcion",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'left')
                }
            },
            {
                data: "Cantidad",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'left')
                }
            },
            {
                data: "Precio",
                createdCell: function (td, cellData, rowData, row, col) {
                    var formattedValue = parseFloat(cellData).toFixed(2);
                    $(td).text(formattedValue);  
                    $(td).attr('align', 'left')
                }
            },
            {
                data: "Importe",
                createdCell: function (td, cellData, rowData, row, col) {
                    var formattedValue = parseFloat(cellData).toFixed(2);
                    $(td).text(formattedValue);  
                    $(td).attr('align', 'left')
                }
            },
            {
                data: "idPuntoCarga",
                createdCell: function (td, cellData, rowData, row, col) {
                    var roundedValue = Math.round(cellData);
                     $(td).text(roundedValue); 
                    $(td).attr('align', 'left')
                }
            },
            {
                data: "idProducto",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'left')
                }
            },
            {
                data: "idViaAdministracion",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'left')
                }
            },
            {
                data: "vias",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'left')
                }
            },
            {
                data: "CantidadFarmacia",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'left')
                }
            },
            
        ],
        columnDefs: [
            {
                targets: [0,6,7,8,9,10] ,
                visible: false // Oculta la columna
            }
        ]
    }
    var tableWrapper = $('#tblPaqueteDetalle'); // datatable creates the table wrapper by adding with id {your_table_id}_wrapper
    //tableWrapper.find('.tblPaqueteDetalle select').select2(); // initialize select2 dropdown
    oTable_paquete = $("#tblPaqueteDetalle").dataTable(parms);
    $('#tblPaqueteDetalle_length').css('display', 'none')
},
      
initDatablesAnatomiaPatologica() {
    var parms = {
        "scrollY": "250px",
        "scrollCollapse": true,
        data: null,
        destroy: true,
        info: false,
        bFilter: false,
        paging: false,
        responsive: true,
        //scrollY: '40vh',
        //dom: 'Bflr<"table-responsive"t>ip',
        //buttons: ['copy', 'csv', 'print'],
        columns: [

            {
                visible: false,
                data: "idItem",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'left')

                }
            }
            ,
            {
                data: "producto",
                width: "80%",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'left')

                }
            }
            ,
            {
                data: "cantidadPedida",
                width: "20%",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'left')
                    if ((rowData.resultado > 0)) {
                        $(td).parent().css('color', '#347dff');
                        $(td).parent().css('font-weight', 'bold');

                    }
                }
            }
            /*
            ,{
                visible: false,
                data: "lab",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'left')

                }
            }

            */
        ]

    }

    var tableWrapper = $('#tblCatalogoAnaPatologicaOrdRes'); // datatable creates the table wrapper by adding with id {your_table_id}_wrapper
    //tableWrapper.find('.dataTables_length select').select2(); // initialize select2 dropdown
    oTable_anatPatologicaOrdRes = $("#tblCatalogoAnaPatologicaOrdRes").dataTable(parms);
    $('#tblCatalogoAnaPatologicaOrdRes_length').css('display', 'none')

},

initDatablesParologiaClinica() {
    var parms = {
        "scrollY": "250px",
        "scrollCollapse": true,
        data: null,
        destroy: true,
        info: false,
        bFilter: false,
        paging: false,
        responsive: true,
        //scrollY: '40vh',
        //dom: 'Bflr<"table-responsive"t>ip',
        //buttons: ['copy', 'csv', 'print'],
        columns: [

            {
                visible: false,
                data: "idItem",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'left')

                }
            }
            ,
            {
                data: "producto",
                width: "70%",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'left')

                }
            }
            ,
            {
                data: "cantidadPedida",
                width: "20%",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'left')
                    if ((rowData.resultado > 0)) {
                        $(td).parent().css('color', '#347dff');
                        $(td).parent().css('font-weight', 'bold');

                    }

                }
            }
            /*
            ,{
                visible: false,
                data: "lab",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'left')

                }
            }
                */
                

        ]

    }

    var tableWrapper = $('#tblCatalogoPatoClinicaOrdRes'); // datatable creates the table wrapper by adding with id {your_table_id}_wrapper
    //tableWrapper.find('.dataTables_length select').select2(); // initialize select2 dropdown
    oTable_PatoClinicaOrdRes = $("#tblCatalogoPatoClinicaOrdRes").dataTable(parms);
    $('#tblCatalogoPatoClinicaOrdRes_length').css('display', 'none')

},

initDatablesParologiaClinica_Emer() {
    var parms = {
        "scrollY": "250px",
        "scrollCollapse": true,
        data: null,
        destroy: true,
        info: false,
        bFilter: false,
        paging: false,
        responsive: true,
        //scrollY: '40vh',
        //dom: 'Bflr<"table-responsive"t>ip',
        //buttons: ['copy', 'csv', 'print'],
        columns: [

            {
                visible: false,
                data: "idItem",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'left')

                }
            }
            ,
            {
                data: "producto",
                width: "70%",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'left')

                }
            }
            ,
            {
                data: "cantidadPedida",
                width: "20%",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'left')
                    if ((rowData.resultado > 0)) {
                        $(td).parent().css('color', '#347dff');
                        $(td).parent().css('font-weight', 'bold');

                    }

                }
            }

            /*
            ,{
                data: "lab",
                width: "10%",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'left')

                }
            }
                */

        ]

    }

    var tableWrapper = $('#tblCatalogoPatoClinicaEmerOrdRes'); // datatable creates the table wrapper by adding with id {your_table_id}_wrapper
    //tableWrapper.find('.dataTables_length select').select2(); // initialize select2 dropdown
    oTable_PatoClinicaEmerOrdRes = $("#tblCatalogoPatoClinicaEmerOrdRes").dataTable(parms);
    $('#tblCatalogoPatoClinicaEmerOrdRes').css('display', 'none')

},


initDatablesBancoSangre() {
    var parms = {
        "scrollY": "250px",
        "scrollCollapse": true,
        data: null,
        destroy: true,
        info: false,
        bFilter: false,
        paging: false,
        responsive: true,
        //scrollY: '40vh',
        //dom: 'Bflr<"table-responsive"t>ip',
        //buttons: ['copy', 'csv', 'print'],
        columns: [

            {
                visible: false,
                data: "idItem",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'left')

                }
            }
            ,
            {
                data: "producto",
                width: "70%",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'left')

                }
            }
            ,
            {
                data: "cantidadPedida",
                width: "20%",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'left')
                    if ((rowData.resultado > 0)) {
                        $(td).parent().css('color', '#347dff');
                        $(td).parent().css('font-weight', 'bold');

                    }
                }
            }
            /* ,
            {
                data: "Lab",
                width: "10%",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'left')

                }
            }
                */

        ]

    }

    var tableWrapper = $('#tblCatalogobancoSangreOrdRes'); // datatable creates the table wrapper by adding with id {your_table_id}_wrapper
    //tableWrapper.find('.dataTables_length select').select2(); // initialize select2 dropdown
    oTable_bancoSangreOrdRes = $("#tblCatalogobancoSangreOrdRes").dataTable(parms);
    $('#tblCatalogobancoSangreOrdRes_length').css('display', 'none')

},

initDatablesEcoObs() {
    var parms = {
        "scrollY": "250px",
        "scrollCollapse": true,
        data: null,
        destroy: true,
        info: false,
        bFilter: false,
        paging: false,
        responsive: true,
        //scrollY: '40vh',
        //dom: 'Bflr<"table-responsive"t>ip',
        //buttons: ['copy', 'csv', 'print'],
        columns: [

            {
                visible: false,
                data: "idItem",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'left')




                }
            }
            ,
            {
                data: "producto",
                width: "80%",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'left')

                }
            }
            ,
            {
                data: "cantidadPedida",
                width: "20%",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'left')

                    if ((rowData.resultado > 0)) {
                        $(td).parent().css('color', '#347dff');
                        $(td).parent().css('font-weight', 'bold');

                    }

                }
            } 
            /*,
            {
                data: "Lab",
                width: "10%",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'left')

                }
            }
                */

        ]

    }

    var tableWrapper = $('#tblCatalogoecoObstOrdRes'); // datatable creates the table wrapper by adding with id {your_table_id}_wrapper
    //tableWrapper.find('.dataTables_length select').select2(); // initialize select2 dropdown
    oTable_ecoObstOrdRes = $("#tblCatalogoecoObstOrdRes").dataTable(parms);
    $('#tblCatalogoecoObstOrdRes_length').css('display', 'none')

},

initDatablesEcoObsProc() {
    var parms = {
        "scrollY": "250px",
        "scrollCollapse": true,
        data: null,
        destroy: true,
        info: false,
        bFilter: false,
        paging: false,
        responsive: true,
        //scrollY: '40vh',
        //dom: 'Bflr<"table-responsive"t>ip',
        //buttons: ['copy', 'csv', 'print'],
        columns: [

            {
                visible: false,
                data: "idItem",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'left')
                }
            }
            ,
            {
                data: "producto",
                width: "80%",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'left')
                }
            }
            ,
            {
                data: "cantidadPedida",
                width: "20%",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'left')

                    if ((rowData.resultado > 0)) {
                        $(td).parent().css('color', '#347dff');
                        $(td).parent().css('font-weight', 'bold');

                    }

                }
            } 
            /*,
            {
                data: "Lab",
                width: "10%",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'left')

                }
            }
                */

        ]

    }

    var tableWrapper = $('#tblCatalogoEcoObsProcOrdRes'); // datatable creates the table wrapper by adding with id {your_table_id}_wrapper
    //tableWrapper.find('.dataTables_length select').select2(); // initialize select2 dropdown
    oTable_ecoObsProcOrdRes = $("#tblCatalogoEcoObsProcOrdRes").dataTable(parms);
    $('#tblCatalogoEcoObsProcOrdRes_length').css('display', 'none')

},

initDatablesEcoGeneral() {
    var parms = {
        "scrollY": "250px",
        "scrollCollapse": true,
        data: null,
        destroy: true,
        info: false,
        bFilter: false,
        paging: false,
        responsive: true,
        //scrollY: '40vh',
        //dom: 'Bflr<"table-responsive"t>ip',
        //buttons: ['copy', 'csv', 'print'],
        columns: [

            {
                visible: false,
                data: "idItem",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'left')

                }
            }
            ,
            {
                data: "producto",
                width: "80%",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'left')

                }
            }
            ,
            {
                data: "cantidadPedida",
                width: "20%",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'left')
                    if ((rowData.resultado > 0)) {
                        $(td).parent().css('color', '#347dff');
                        $(td).parent().css('font-weight', 'bold');

                    }
                }
            } 
            /*,
            {
                data: "Lab",
                width: "10%",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'left')

                }
            }
                */

        ]

    }

    var tableWrapper = $('#tblCatalogoEcoGeneOrdRes'); // datatable creates the table wrapper by adding with id {your_table_id}_wrapper
    //tableWrapper.find('.dataTables_length select').select2(); // initialize select2 dropdown
    oTable_ecoGeneralOrdRes = $("#tblCatalogoEcoGeneOrdRes").dataTable(parms);
    $('#tblCatalogoEcoGeneOrdRes_length').css('display', 'none')

},

initDatablesRayos() {
    var parms = {
        "scrollY": "250px",
        "scrollCollapse": true,
        data: null,
        destroy: true,
        info: false,
        bFilter: false,
        paging: false,
        responsive: true,
        //scrollY: '40vh',
        //dom: 'Bflr<"table-responsive"t>ip',
        //buttons: ['copy', 'csv', 'print'],
        columns: [

            {
                visible: false,
                data: "idItem",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'left')

                }
            }
            ,
            {
                data: "producto",
                width: "70%",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'left')

                }
            }
            ,
            {
                data: "cantidadPedida",
                width: "20%",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'left')
                    if ((rowData.resultado > 0)) {
                        $(td).parent().css('color', '#347dff');
                        $(td).parent().css('font-weight', 'bold');

                    }
                }
            } 
            /*,
            {
                data: "Lab",
                width: "70%",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'left')

                }
            }*/

        ]

    }

    var tableWrapper = $('#tblCatalogoRayosOrdRes'); // datatable creates the table wrapper by adding with id {your_table_id}_wrapper
    //tableWrapper.find('.dataTables_length select').select2(); // initialize select2 dropdown
    oTable_rayosOrdRes = $("#tblCatalogoRayosOrdRes").dataTable(parms);
    $('#tblCatalogoRayosOrdRes_length').css('display', 'none')

},
initDatablesInterConsulta() {
    var parms = {
        "scrollY": "250px",
        "scrollCollapse": true,
        data: null,
        destroy: true,
        info: false,
        bFilter: false,
        paging: false,
        responsive: true,
        //scrollY: '40vh',
        //dom: 'Bflr<"table-responsive"t>ip',
        //buttons: ['copy', 'csv', 'print'],
        columns: [

            {
                visible: false,
                data: "idItem",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'left')

                }
            }
            ,
            {
                data: "producto",
                width: "70%",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'left')

                }
            }
            ,
            {
                data: "cantidadPedida",
                width: "20%",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'left')
                    if ((rowData.resultado > 0)) {
                        $(td).parent().css('color', '#347dff');
                        $(td).parent().css('font-weight', 'bold');

                    }
                }
            } 
            /*,
            {
                data: "Lab",
                width: "10%",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'left')

                }
            }
                */

        ]

    }

    var tableWrapper = $('#tblCatalogointerconsultaOrdRes'); // datatable creates the table wrapper by adding with id {your_table_id}_wrapper
    //tableWrapper.find('.dataTables_length select').select2(); // initialize select2 dropdown
    oTable_interConsulta = $("#tblCatalogointerconsultaOrdRes").dataTable(parms);
    $('#tblCatalogointerconsultaOrdRes_length').css('display', 'none')

},
initDatablesTomografia() {
    var parms = {
        "scrollY": "250px",
        "scrollCollapse": true,
        data: null,
        destroy: true,
        info: false,
        bFilter: false,
        paging: false,
        responsive: true,
        //scrollY: '40vh',
        //dom: 'Bflr<"table-responsive"t>ip',
        //buttons: ['copy', 'csv', 'print'],
        columns: [

            {
                visible: false,
                data: "idItem",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'left')

                }
            }
            ,
            {
                data: "producto",
                width: "80%",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'left')

                }
            }
            ,
            {
                data: "cantidadPedida",
                width: "20%",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'left')
                    if ((rowData.resultado > 0)) {
                        $(td).parent().css('color', '#347dff');
                        $(td).parent().css('font-weight', 'bold');

                    }
                }
            } 
            /*
            ,
            {
                data: "Lab",
                width: "10%",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'left')

                }
            }*/

        ]

    }

    var tableWrapper = $('#tblCatalogotomografiaOrdRes'); // datatable creates the table wrapper by adding with id {your_table_id}_wrapper
    //tableWrapper.find('.dataTables_length select').select2(); // initialize select2 dropdown
    oTable_tomografia = $("#tblCatalogotomografiaOrdRes").dataTable(parms);
    $('#tblCatalogotomografiaOrdRes_length').css('display', 'none')

},
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // <summary>
    // DATATABLES
    // </summary>
    // INICIALIZA CONSUMO BD
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async CargarOrdenesMedicasPorIdCuentaAtencion(idCuenta) { // KHOYOSI
        //var resp = [];
        let datos;
        var data = new FormData();
        data.append('_token', $("meta[name='csrf-token']").attr("content"));        
        data.append('IdCuentaAtencion', idCuenta);
                
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
            if (datos.resultado.length > 0) {
                DTORdenesMedicas.rows.add(datos.resultado).draw(false);

                //fnAddData(datos.table);
            }
        } catch (error) {
            alerta('error','', error);
        }

        //return resp;
    },

    async CargarOrdenesMedicasPorIdCuentaAtencionPorEvaluacion(idCuenta, nroEvaluacion) { // KHOYOSI
        // var resp = [];
        let resp = [];
        let datos;
        var data = new FormData();
        data.append('_token', $("meta[name='csrf-token']").attr("content"));        
        data.append('IdCuentaAtencion', idCuenta);
        data.append('NroEvaluacion', nroEvaluacion);
        data.append('IdTipoServicio', 2); //Emer


    

                
        try {
            DTORdenesMedicas.clear().draw();
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
                
                resp=datos.resultado;
            if (datos.resultado.length > 0) {
                DTORdenesMedicas.rows.add(datos.resultado).draw(false);
                

                //fnAddData(datos.table);
            }
        } catch (error) {
            alerta('error','', error);
        }

        return resp
    },
   

    async SeleccionarRecetaDetalle(idReceta, idPuntoCarga) {
        var resp = false;
        let datos
        var data = new FormData();
    
        data.append('_token', $("meta[name='csrf-token']").attr("content"))
        data.append('idReceta', idReceta);
        data.append('idPuntoCarga', idPuntoCarga);
    
        try {
    
            datos = await
                $.ajax({
                    method: "POST",
                    url: "/Recetas/ListaRecetaDetalle",
                    //contentType: "application/json; charset=utf-8",
                    data: data,
                    dataType: "json",
                    cache: false,
                    processData: false,
                    contentType: false,
                });
            console.log('OrdenMedica.js - SeleccionarRecetaDetalle - Recetas/ListaRecetaDetalle DATOS:', datos);
            switch (idPuntoCarga) {
                case 21:
                    if (!isEmpty(datos.resultado)) {
                        if (datos.resultado.length !== 0) {
                            DTRecetaRayosX.rows.add(datos.resultado).draw();
                        }
                    }
                    break;
                case 23:
                    if (!isEmpty(datos.resultado)) {
                        if (datos.resultado.length !== 0) {
                            DTRecetaEcoObst.rows.add(datos.resultado).draw();
                        }
                    }
                    break;                
                case 20:
                    if (!isEmpty(datos.resultado)) {
                        if (datos.resultado.length !== 0) {
                            DTRecetaEcoGene.rows.add(datos.resultado).draw();
                        }
                    }
                    break;
                case 2:
                    if (!isEmpty(datos.resultado)) {
                        if (datos.resultado.length !== 0) {
                            if(datos.resultado[0].Laboratorio==1){
                                DTRecetaPatoCli_Emer.rows.add(datos.resultado).draw();
                            }
                           
                            if(datos.resultado[0].Laboratorio== 2  || datos.resultado[0].Categoria == 90 || datos.resultado[0].Categoria == 91
                                || datos.resultado[0].Categoria == 92 || datos.resultado[0].Categoria == 93 || datos.resultado[0].Categoria == 94
                                || datos.resultado[0].Categoria == 95 || datos.resultado[0].Categoria == 96 || datos.resultado[0].Categoria == 97
                             ){
                                DTRecetaPatoCli.rows.add(datos.resultado).draw();
                            }
                          
                        }    
                    }
                    break;
                case 3:
                    if (!isEmpty(datos.resultado)) {
                        if (datos.resultado.length !== 0)
                            DTRecetaAnaPato.rows.add(datos.resultado).draw();
                    }
                    break;
                case 11:
                    if (!isEmpty(datos.resultado)) {
                        if (datos.resultado.length !== 0)
                            DTRecetaBancoSan.rows.add(datos.resultado).draw();
                    }
                    break;
                case 22:
                    if (!isEmpty(datos.resultado)) {
                        if (datos.resultado.length !== 0)
                            DTRecetaTomo.rows.add(datos.resultado).draw();
                    }
                    break;
                case 12:
                    if (!isEmpty(datos.resultado)) {
                        if (datos.resultado.length !== 0)
                            DTRecetaInterconsulta.rows.add(datos.resultado).draw();
                    }
                    break;
                case 5:
                    if (!isEmpty(datos.resultado)) {
                        if (datos.resultado.length !== 0)
                            DTRecetaFarmacia.rows.add(datos.resultado).draw();
                        
                        //else
                            //Ordenes.listaFecha();
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

    async SeleccionarRecetaDetalleCE(idReceta, idPuntoCarga) {
        var resp = false;
        let datos
        var data = new FormData();
    
        data.append('_token', $("meta[name='csrf-token']").attr("content"))
        data.append('idReceta', idReceta);
        data.append('idPuntoCarga', idPuntoCarga);
    
        try {
    
            datos = await
                $.ajax({
                    method: "POST",
                    url: "/Recetas/ListaRecetaDetalle",
                    //contentType: "application/json; charset=utf-8",
                    data: data,
                    dataType: "json",
                    cache: false,
                    processData: false,
                    contentType: false,
                });
            
            switch (idPuntoCarga) {
                case 4:
                    oTableRayosX.fnClearTable()
                    oTableRayosX.fnDraw()
                    if (!isEmpty(datos.resultado)) {
                        if (datos.resultado.length !== 0) {
                            oTableRayosX.fnAddData(datos.resultado)
                        }
                    }
                    break;
                case 21:
                    oTableRayosX.fnClearTable()
                    oTableRayosX.fnDraw()
                    if (!isEmpty(datos.resultado)) {
                        if (datos.resultado.length !== 0) {
                            oTableRayosX.fnAddData(datos.resultado)
                        }
                    }
                    break;
                case 23:
                    if (!isEmpty(datos.resultado)) {
                        oTableEcografiaObstetrica.fnClearTable()
                        oTableEcografiaObstetrica.fnDraw()
                        if (datos.resultado.length !== 0) {
                            oTableEcografiaObstetrica.fnAddData(datos.resultado)
                        }
                    }
                    break;                
                case 20:
                    if (!isEmpty(datos.resultado)) {
                        oTableEcografiaGeneral.fnClearTable()
                        oTableEcografiaGeneral.fnDraw()
                        if (datos.resultado.length !== 0) {
                            oTableEcografiaGeneral.fnAddData(datos.resultado)
                        }
                    }
                    break;
                case 2:
                    oTablePatologiaClinica.fnClearTable()
                    oTablePatologiaClinica.fnDraw()
                    if (!isEmpty(datos.resultado)) {
                        if (datos.resultado.length !== 0) {
                            
                            oTablePatologiaClinica.fnAddData(datos.resultado)
                        }
                    }
                    break;
                case 3:
                    oTableAnatomiaPatologica.fnClearTable()
                    oTableAnatomiaPatologica.fnDraw()
                    if (!isEmpty(datos.resultado)) {
                        if (datos.resultado.length !== 0)
                            oTableAnatomiaPatologica.fnAddData(datos.resultado)
                    }
                    break;
                case 11:
                    oTableBancoSangre.fnClearTable()
                    oTableBancoSangre.fnDraw()
                    if (!isEmpty(datos.resultado)) {
                        if (datos.resultado.length !== 0)
                            oTableBancoSangre.fnAddData(datos.resultado)
                    }
                    break;
                case 22:
                    oTableTomografia.fnClearTable()
                    oTableTomografia.fnDraw()
                    if (!isEmpty(datos.resultado)) {
                        if (datos.resultado.length !== 0)
                            oTableTomografia.fnAddData(datos.resultado)
                    }
                    break;
                case 5:
                    oTableFarmacia.fnClearTable()
                    oTableFarmacia.fnDraw()
                    if (!isEmpty(datos.resultado)) {
                        if (datos.resultado.length !== 0)
                            // DTRecetaFarmacia.rows.add(datos.resultado).draw();
                            oTableFarmacia.fnAddData(datos.resultado)
                        //else
                            //Ordenes.listaFecha();
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

    async EliminarOrdenesMedicas(idReceta) {
        var midata = new FormData();
        midata.append('_token', $("meta[name='csrf-token']").attr("content"))
        midata.append('idReceta', idReceta);
        //midata.append('idServicioGeneral', $('#hdIdTipoServicio').val());
        //Cargando(1);
        $.ajax({
            method: "POST",
            url: "/Recetas/EliminarReceta",
            data: midata,
            dataType: "json",
            processData: false,
            contentType: false,
            async: false,
            success: function (datos) {
                if (datos.resultado) {
                    alerta('success', 'Receta', "Se elimino correctamente la receta Nro. " + idReceta);
                }
                else {
                    alerta('danger', 'Receta', datos.error);
                    return false;
                }
            },
            error: function (msg) {
                //Cargando(0);
                //alerta('3', "Error al eliminar receta");
                alerta('danger', 'Receta', "Error al eliminar receta");
            }
        });
    
    },

    async SeleccionarRecetaDetalleSeguimiento(idReceta, idPuntoCarga) {
        var resp = false;
        let datos
        var data = new FormData();
    
        data.append('_token', $("meta[name='csrf-token']").attr("content"))
        data.append('idReceta', idReceta);
        data.append('idPuntoCarga', idPuntoCarga);

        oTable_rayosOrdRes.fnClearTable()
        oTable_ecoObstOrdRes.fnClearTable()
        oTable_ecoGeneralOrdRes.fnClearTable()
        oTable_PatoClinicaOrdRes.fnClearTable()
        oTable_PatoClinicaEmerOrdRes.fnClearTable()
        oTable_anatPatologicaOrdRes.fnClearTable()
        oTable_bancoSangreOrdRes.fnClearTable()
        oTable_farmaciaOrdes.fnClearTable()
        oTable_tomografia.fnClearTable()
        oTable_interConsulta.fnClearTable()
        
    
        try {
    
            datos = await
                $.ajax({
                    method: "POST",
                    url: "/Recetas/ListaRecetaDetalle",
                    //contentType: "application/json; charset=utf-8",
                    data: data,
                    dataType: "json",
                    cache: false,
                    processData: false,
                    contentType: false,
                });
            console.log('datos en lista receta detalle',datos);
            switch (idPuntoCarga) {
                case 21:
                    if (!isEmpty(datos.resultado)) {
                        if (datos.resultado.length !== 0) {
                            oTable_rayosOrdRes.fnAddData(datos.resultado);
                        }
                    }
                    break;
                case 23:
                    if (!isEmpty(datos.resultado)) {
                        if (datos.resultado.length !== 0) {
                            oTable_ecoObstOrdRes.fnAddData(datos.resultado);
                        }
                    }
                    break;                
                case 20:
                    if (!isEmpty(datos.resultado)) {
                        if (datos.resultado.length !== 0) {
                            oTable_ecoGeneralOrdRes.fnAddData(datos.resultado);
                        }
                    }
                    break;
                case 2:
                    if (!isEmpty(datos.resultado)) {
                        if (datos.resultado.length !== 0) {
                            if(datos.resultado['Laboratorio'] ==1 ){
                                oTable_PatoClinicaEmerOrdRes.fnAddData(datos.resultado);
                            }
                            if(datos.resultado['Laboratorio'] ==2)
                            {
                                oTable_PatoClinicaOrdRes.fnAddData(datos.resultado);
                            }
                        }
                    }
                    break;
                case 3:
                    if (!isEmpty(datos.resultado)) {
                        if (datos.resultado.length !== 0)
                            oTable_anatPatologicaOrdRes.fnAddData(datos.resultado);
                    }
                    break;
                case 11:
                    if (!isEmpty(datos.resultado)) {
                        if (datos.resultado.length !== 0)
                            oTable_bancoSangreOrdRes.fnAddData(datos.resultado);
                    }
                    break;
                case 12:
                    if (!isEmpty(datos.resultado)) {
                        if (datos.resultado.length !== 0)
                            oTable_interConsulta.fnAddData(datos.resultado);
                    }
                    break;
                case 22:
                    if (!isEmpty(datos.resultado)) {
                        if (datos.resultado.length !== 0)
                            oTable_tomografia.fnAddData(datos.resultado);
                    }
                    break;
                case 5:
                    if (!isEmpty(datos.resultado)) {
                        if (datos.resultado.length !== 0)
                            oTable_farmaciaOrdes.fnAddData(datos.resultado);
                        //else
                            //Ordenes.listaFecha();
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

    async ListarCabeceraRecetaByIdCuentaIdServicioIdMedico(idCuenta, idServicio, idMedico) { // KHOYOSI
        //var resp = [];
        let datos;
        var data = new FormData();
        data.append('_token', $("meta[name='csrf-token']").attr("content"));        
        data.append('IdCuentaAtencion', idCuenta);
        data.append('IdServicio', idServicio);
        data.append('IdMedico', idMedico);
                
        try {
            // DTORdenesMedicas.clear().draw();
            //OrdenMedica.Limpiar();
            datos = await
                $.ajax({
                    method: "POST",
                    url: "/Recetas/ListarCabeceraRecetaByIdCuentaIdServicioIdMedico",                    
                    data: data,
                    dataType: "json",
                    cache: false,
                    processData: false,
                    contentType: false,
                });
            
            if (datos.resultado.length > 0) {
                OrdenMedica.CargarDatosRecetaCabeceraCE(datos.resultado)
            }
        } catch (error) {
            alerta('error','', error);
        }

        //return resp;
    },
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // <summary>
    // DATATABLES
    // </summary>
    // INICIALIZA METODOS
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    CargarRecetaDetalle(data) {
        const receta = [];
        receta.push(data);
        //console.log(receta);
        //OrdenMedica.bloqueByPuntoCarga(data.idReceta, data.idPuntoCarga);
        OrdenMedica.CargarCabeceraPorPuntoCarga(data);
        OrdenMedica.CargarDatosRecetaCabecera(receta);           
    },

    CargarCabeceraPorPuntoCarga(datos) {
        console.log('datos punto carga',datos);
        var labelReceta = '';
        $('#hdIdRecetaRX').val(0)
        $('#lblRx').html(0)
    
        $('#hdIdRecetaEcoObs').val(0)
        $('#lblEcoObs').html(0)
    
        $('#hdIdRecetaEcoObsProc').val(0)
        $('#lblEcoObsProc').html(0)
    
        $('#hdIdRecetaEcoGene').val(0)
        $('#lblEcoGene').html(0)
    
        $('#hdIdRecetaPatoClinica').val(0)
        $('#lblPatoClinica').html(0)

        $('#hdIdRecetaPatoClinicaEmergencia').val(0)
        $('#lblPatoClinica_Emergencia').html(0)
    
        $('#hdIdRecetaAnaPatologica').val(0)
        $('#lblanaPatologica').html(0)
    
        $('#hdIdRecetabancoSangre').val(0)
        $('#lblbancoSangre').html(0)
    
        $('#hdIdRecetaFarmacia').val(0)
        $('#lblFarmacia').html(0)
    
        $('#hdIdRecetaInterconsulta').val(0)
        $('#lblInterconsulta').html(0)
    
        $('#hdIdRecetatomografia').val(0)
        $('#lbltomografia').html(0)
        //$('#txtOtrosMedicamentos').val('')

    
        $('[href="#farmacia"]').closest('li').hide();
        $('[href="#ecoObst"]').closest('li').hide();
        $('[href="#ecoObstProc"]').closest('li').hide();
        $('[href="#ecoMedFet"]').closest('li').hide();
        $('[href="#rayos"]').closest('li').hide();
        $('[href="#ecoGene"]').closest('li').hide();
        $('[href="#anatoPato"]').closest('li').hide();
        $('[href="#patoClinica"]').closest('li').hide();
        $('[href="#laboratorio1"]').closest('li').hide();
        $('[href="#laboratorio2"]').closest('li').hide();
        $('[href="#bancoSangre"]').closest('li').hide();
        $('[href="#tomografia"]').closest('li').hide();
        $('[href="#interconsultas"]').closest('li').hide();
    
        labelReceta = "(Receta N° " + datos.IdReceta + ")";
        labelReceta = labelReceta + (datos.estadoReceta != "" ? "(Estado: " + datos.estadoReceta + ") " : "");
        labelReceta = labelReceta + (datos.movimiento != "" ? "(Movim: " + datos.movimiento + ")" : "");
        labelReceta = labelReceta + (datos.boleta != "" ? "(Boleta: " + datos.boleta + ")" : "");
    
        switch (parseInt(datos.IdPuntoCarga)) {
            case 21:
                $('#lblRx').html(labelReceta);
                $('#hdIdRecetaRX').val(datos.IdReceta);
                $('.nav-tabs a[href="#rayos"]').tab('show');
                $('[href="#rayos"]').closest('li').show();
                break;
            case 23:
                $('#lblEcoObs').html(labelReceta);
                $('#hdIdRecetaEcoObs').val(datos.IdReceta);
                $('.nav-tabs a[href="#ecoMedFet"]').tab('show');
                $('[href="#ecoMedFet"]').closest('li').show();
                $('.nav-tabs a[href="#ecoObst"]').tab('show');
                $('[href="#ecoObst"]').closest('li').show();
                break;            
            case 20:
                $('#lblEcoGene').html(labelReceta);
                $('#hdIdRecetaEcoGene').val(datos.IdReceta);
                $('.nav-tabs a[href="#ecoGene"]').tab('show');
                $('[href="#ecoGene"]').closest('li').show();
                break;
            case 2:
                    if(datos.IdPuntoCargaLab==29){
                        $('#lblPatoClinica_Emergencia').html(labelReceta);
                        $('#hdIdRecetaPatoClinicaEmergencia').val(datos.IdReceta);
                        $('.nav-tabs a[href="#patoClinica"]').tab('show');
                        $('.nav-tabs a[href="#laboratorio1"]').tab('show');
                        $('[href="#laboratorio1"]').closest('li').show();
                       break;

                    }
                    
                    if(datos.IdPuntoCargaLab==null){
                        $('#lblPatoClinica').html(labelReceta);
                        $('#hdIdRecetaPatoClinica').val(datos.IdReceta);
                        $('.nav-tabs a[href="#patoClinica"]').tab('show');
                        $('.nav-tabs a[href="#laboratorio2"]').tab('show');
                        $('[href="#patoClinica"]').closest('li').show();
                        break;
                    }
                    break;
               
                  
            case 3:
                $('#lblanaPatologica').html(labelReceta);
                $('#hdIdRecetaAnaPatologica').val(datos.IdReceta);
                $('.nav-tabs a[href="#anatoPato"]').tab('show');
                $('[href="#anatoPato"]').closest('li').show();
                break;
            case 11:
                $('#lblbancoSangre').html(labelReceta);
                $('#hdIdRecetabancoSangre').val(datos.IdReceta);
                $('.nav-tabs a[href="#bancoSangre"]').tab('show');
                $('[href="#bancoSangre"]').closest('li').show();
                break;
            case 22:
                $('#lbltomografia').html(labelReceta);
                $('#hdIdRecetatomografia').val(datos.IdReceta);
                $('.nav-tabs a[href="#tomografia"]').tab('show');
                $('[href="#tomografia"]').closest('li').show();
                break;
            case 12:
                $('#lblInterconsulta').html(labelReceta);
                $('#hdIdRecetaInterconsulta').val(datos.idReceta);
                $('#txtResumenHistoriaClinica').val(datos.ResumenHistoriaClinica);
                $('#txtMotivoInterconsulta').val(datos.MotivoInterconsulta);
                $('.nav-tabs a[href="#interconsultas"]').tab('show');
                $('[href="#interconsultas"]').closest('li').show();
                break;
            case 5:
                $('#lblFarmacia').html(labelReceta);
                $('#hdIdRecetaFarmacia').val(datos.IdReceta);
                $('.nav-tabs a[href="#farmacia"]').tab('show');
                $('[href="#farmacia"]').closest('li').show();
                break;
    
    
        }
    
        
    },

    CargarDatosRecetaCabecera(datos) {
        console.log('CargarDatosRecetaCabecera: Hola',datos);
        var labelReceta = "";
        OrdenMedica.LimpiarOrdenesMedicas();        
        if (datos.length > 0) {            
            $(datos).each(async function (i, obj) {
                labelReceta = "(Receta N° " + obj.IdReceta + ")";
                labelReceta = labelReceta + (obj.estadoReceta != "" ? "(Estado: " + obj.estadoReceta + ") " : "");
                labelReceta = labelReceta + (obj.movimiento != "" ? "(Movim: " + obj.movimiento + ")" : "");
                labelReceta = labelReceta + (obj.boleta != "" ? "(Boleta: " + obj.boleta + ")" : "");
    
                if (obj.IdPuntoCarga == 21) //rx
                {
                    $('#lblRx').html(labelReceta);
                    $('#hdIdRecetaRX').val(obj.IdReceta);
                    await OrdenMedica.SeleccionarRecetaDetalle(obj.IdReceta, 21)
                    if (parseInt(obj.idEstado) === 1) {
                        $('#btnAgregaRayosX').css("visibility", 'visible');
                        $('#btnQuitarRayos').css("visibility", 'visible');
                    }
                    else {
                        $('#btnAgregaRayosX').css("visibility", 'hidden')
                        $('#btnQuitarRayos').css("visibility", 'hidden')
                        //$('#lblRx').html("Receta Nro.: " + obj.idReceta + ' - Estado: Despachada');
                    }
                }
                if (obj.IdPuntoCarga == 23) {//eco obs
                    $('#lblEcoObs').html(labelReceta);
                    $('#hdIdRecetaEcoObs').val(obj.IdReceta);
                    await OrdenMedica.SeleccionarRecetaDetalle(obj.IdReceta, 23)
                    if (parseInt(obj.idEstado) === 1) {
                        $('#btnAgregaEcoObs').css("visibility", 'visible');
                        $('#btnQuitarEcoObs').css("visibility", 'visible');
                    }
                    else {
                        $('#btnAgregaEcoObs').css("visibility", 'hidden')
                        $('#btnQuitarEcoObs').css("visibility", 'hidden')
                        //$('#lblEcoObs').html("Receta Nro.: " + obj.idReceta + ' - Estado: Despachada');
                    }
                }
                if (obj.IdPuntoCarga == 24) {//eco obs proc
                    $('#lblEcoObsProc').html(labelReceta);
                    $('#hdIdRecetaEcoObsProc').val(obj.IdReceta);
                    await OrdenMedica.SeleccionarRecetaDetalle(obj.IdReceta, 24)
                    if (parseInt(obj.idEstado) === 1) {
                        $('#btnAgregaEcoObsProc').css("visibility", 'visible');
                        $('#btnQuitarEcoObsProc').css("visibility", 'visible');
                    }
                    else {
                        $('#btnAgregaEcoObsProc').css("visibility", 'hidden')
                        $('#btnQuitarEcoObsProc').css("visibility", 'hidden')
                        //$('#lblEcoObsProc').html("Receta Nro.: " + obj.idReceta + ' - Estado: Despachada');
                    }
                }
                if (obj.IdPuntoCarga == 20) {//eco gene
                    $('#lblEcoGene').html(labelReceta);
                    $('#hdIdRecetaEcoGene').val(obj.IdReceta);
                    await OrdenMedica.SeleccionarRecetaDetalle(obj.IdReceta, 20)
                    if (parseInt(obj.idEstado) === 1) {
                        $('#btnAgregaEcoGene').css("visibility", 'visible');
                        $('#btnQuitarEcoGene').css("visibility", 'visible');
                    }
                    else {
                        $('#btnAgregaEcoGene').css("visibility", 'hidden')
                        $('#btnQuitarEcoGene').css("visibility", 'hidden')
                        //$('#lblEcoGene').html("Receta Nro.: " + obj.idReceta + ' - Estado: Despachada');
                    }
                }
               
                if (obj.IdPuntoCarga == 2) {//pt clinica

                    if(obj.IdPuntoCargaLab ==29){
                        $('#lblPatoClinica_Emergencia').html(labelReceta);
                        $('#hdIdRecetaPatoClinicaEmergencia').val(obj.IdReceta);
                    }
                    if(obj.Laboratorio == null || obj.Categoria == 99){

                    $('#lblPatoClinica').html(labelReceta);
                    $('#hdIdRecetaPatoClinica').val(obj.IdReceta);
                    }
                    await OrdenMedica.SeleccionarRecetaDetalle(obj.IdReceta, 2)
                  
                    if (parseInt(obj.idEstado) === 1) {
                        $('#btnAgregaPatoClinica').css("visibility", 'visible');
                        $('#btnQuitarPatoClinica').css("visibility", 'visible');
                    }
                    else {
                        $('#btnAgregaPatoClinica').css("visibility", 'hidden')
                        $('#btnQuitarPatoClinica').css("visibility", 'hidden')
                        //$('#lblPatoClinica').html("Receta Nro.: " + obj.idReceta + ' - Estado: Despachada');
                    }
                }
                if (obj.IdPuntoCarga == 3) {//anat patologica
                    $('#lblanaPatologica').html(labelReceta);
                    $('#hdIdRecetaAnaPatologica').val(obj.IdReceta)
                    await OrdenMedica.SeleccionarRecetaDetalle(obj.IdReceta, 3)
                    if (parseInt(obj.idEstado) === 1) {
                        $('#btnAgregaanaPatologica').css("visibility", 'visible');
                        $('#btnQuitaranaPatologica').css("visibility", 'visible');
                    }
                    else {
                        $('#btnAgregaanaPatologica').css("visibility", 'hidden')
                        $('#btnQuitaranaPatologica').css("visibility", 'hidden')
                        //$('#lblanaPatologica').html("Receta Nro.: " + obj.idReceta + ' - Estado: Despachada');
                    }
                }
                if (obj.IdPuntoCarga == 11) {//sangre
                    $('#lblbancoSangre').html(labelReceta);
                    $('#hdIdRecetabancoSangre').val(obj.IdReceta)
                    await OrdenMedica.SeleccionarRecetaDetalle(obj.IdReceta, 11)
    
                    if (parseInt(obj.idEstado) === 1) {
                        $('#btnAgregabancoSangre').css("visibility", 'visible');
                        $('#btnQuitarbancoSangre').css("visibility", 'visible');
                    }
                    else {
                        $('#btnAgregabancoSangre').css("visibility", 'hidden')
                        $('#btnQuitarbancoSangre').css("visibility", 'hidden')
                        //$('#lblbancoSangre').html("Receta Nro.: " + obj.idReceta + ' - Estado: Despachada');
                    }
                }
                if (obj.IdPuntoCarga == 22) {//tomografia jdelgado
                    $('#lbltomografia').html(labelReceta);
                    $('#hdIdRecetatomografia').val(obj.IdReceta)
                    await OrdenMedica.SeleccionarRecetaDetalle(obj.IdReceta, 22)
                    if (parseInt(obj.idEstado) === 1) {
                        $('#btnAgregatomografia').css("visibility", 'visible');
                        $('#btnQuitartomografia').css("visibility", 'visible');
                    }
                    else {
                        $('#btnAgregatomografia').css("visibility", 'hidden')
                        $('#btnQuitartomografia').css("visibility", 'hidden')
                        //$('#lbltomografia').html("Receta Nro.: " + obj.idReceta + ' - Estado: Despachada');
                    }
                }
                if (obj.IdPuntoCarga == 12) {//interconsulta jdelgado
                    $('#lblInterconsulta').html(labelReceta);
                    $('#hdIdRecetaInterconsulta').val(obj.IdReceta)
                    $('#txtResumenHistoriaClinica').val(obj.ResumenHistoriaClinica);
                    $('#txtMotivoInterconsulta').val(obj.MotivoInterconsulta);
                    await OrdenMedica.SeleccionarRecetaDetalle(obj.IdReceta, 12)
                    if (parseInt(obj.idEstado) === 1) {
                        $('#btnAgregainterconsultas').css("visibility", 'visible');
                        $('#btnQuitarinterconsultas').css("visibility", 'visible');
                    }
                    else {
                        $('#btnAgregainterconsultas').css("visibility", 'hidden')
                        $('#btnQuitarinterconsultas').css("visibility", 'hidden')
                        //$('#lbltomografia').html("Receta Nro.: " + obj.idReceta + ' - Estado: Despachada');
                    }
                }
                if (obj.IdPuntoCarga == 5) {//farmacia
                    $('#lblFarmacia').html(labelReceta);
                    $('#hdIdRecetaFarmacia').val(obj.IdReceta)
                    $('#txtOtrosMedicamentos').val(obj.otrosMedicamentos);
                    $("#txtFechaVigencia").datepicker("setDate", obj.fechaVigenciaWeb);
    
                    await OrdenMedica.SeleccionarRecetaDetalle(obj.IdReceta, 5)
                    if (parseInt(obj.idEstado) === 1) {
                        $('#btnAgregaFarmacia').css("visibility", 'visible');
                        $('#btnQuitarFarmacia').css("visibility", 'visible');
                    }
                    else {
                        $('#btnAgregaFarmacia').css("visibility", 'hidden')
                        $('#btnQuitarFarmacia').css("visibility", 'hidden')
                        //$('#lblFarmacia').html("Receta Nro.: " + obj.idReceta + ' - Estado: Despachada');
                    }
                }
                else {
                    //Ordenes.listaFecha();
                }
                OrdenMedica.ubicaMedico(obj.idMedicoReceta);
            });
        } else {
            //OrdenMedica.listaFecha();
        }
    
        OrdenesRecetasMedicas = datos;
        //Ordenes.validaActivabtnPaquete();
    },

    CargarDatosRecetaCabeceraCE(datos) {
        var labelReceta = "";
        OrdenMedica.LimpiarOrdenesMedicasCE();        
        if (datos.length > 0) {            
            $(datos).each(async function (i, obj) {

                labelReceta = "(Receta N° " + obj.IdReceta + ")";
                labelReceta = labelReceta + (obj.estadoReceta != "" ? "(Estado: " + obj.estadoReceta + ") " : "");
                labelReceta = labelReceta + (obj.movimiento != "" ? "(Movim: " + obj.movimiento + ")" : "");
                labelReceta = labelReceta + (obj.boleta != "" ? "(Boleta: " + obj.boleta + ")" : "");
                if (obj.IdPuntoCarga == 4) //rx
                {
                    $('#lblRx').html(labelReceta);
                    $('#hdIdRecetaRX').val(obj.IdReceta);

                    $('#hdIdRecetaRayosX').val(obj.IdReceta);

                    await OrdenMedica.SeleccionarRecetaDetalleCE(obj.IdReceta, 4)
                    if (parseInt(obj.idEstado) === 1) {
                        $('#btnAgregaRayosX').css("visibility", 'visible');
                        $('#btnQuitarRayos').css("visibility", 'visible');
                    }
                    else {
                        $('#btnAgregaRayosX').css("visibility", 'hidden')
                        $('#btnQuitarRayos').css("visibility", 'hidden')
                        //$('#lblRx').html("Receta Nro.: " + obj.idReceta + ' - Estado: Despachada');
                    }
                }
                if (obj.IdPuntoCarga == 21) //rx
                {
                    $('#lblRx').html(labelReceta);
                    $('#hdIdRecetaRX').val(obj.IdReceta);

                    $('#hdIdRecetaRayosX').val(obj.IdReceta);

                    await OrdenMedica.SeleccionarRecetaDetalleCE(obj.IdReceta, 21)
                    if (parseInt(obj.idEstado) === 1) {
                        $('#btnAgregaRayosX').css("visibility", 'visible');
                        $('#btnQuitarRayos').css("visibility", 'visible');
                    }
                    else {
                        $('#btnAgregaRayosX').css("visibility", 'hidden')
                        $('#btnQuitarRayos').css("visibility", 'hidden')
                        //$('#lblRx').html("Receta Nro.: " + obj.idReceta + ' - Estado: Despachada');
                    }
                }
                if (obj.IdPuntoCarga == 23) {//eco obs
                    $('#lblEcoObs').html(labelReceta);
                    $('#hdIdRecetaEcoObs').val(obj.IdReceta);

                    $('#hdIdRecetaEcoObstetrica').val(obj.IdReceta);

                    await OrdenMedica.SeleccionarRecetaDetalleCE(obj.IdReceta, 23)
                    if (parseInt(obj.idEstado) === 1) {
                        $('#btnAgregaEcoObs').css("visibility", 'visible');
                        $('#btnQuitarEcoObs').css("visibility", 'visible');
                    }
                    else {
                        $('#btnAgregaEcoObs').css("visibility", 'hidden')
                        $('#btnQuitarEcoObs').css("visibility", 'hidden')
                        //$('#lblEcoObs').html("Receta Nro.: " + obj.idReceta + ' - Estado: Despachada');
                    }
                }
                if (obj.IdPuntoCarga == 24) {//eco obs proc
                    $('#lblEcoObsProc').html(labelReceta);
                    $('#hdIdRecetaEcoObsProc').val(obj.IdReceta);

                    $('#hdIdRecetaEcoObstetrica').val(obj.IdReceta);

                    await OrdenMedica.SeleccionarRecetaDetalleCE(obj.IdReceta, 24)
                    if (parseInt(obj.idEstado) === 1) {
                        $('#btnAgregaEcoObsProc').css("visibility", 'visible');
                        $('#btnQuitarEcoObsProc').css("visibility", 'visible');
                    }
                    else {
                        $('#btnAgregaEcoObsProc').css("visibility", 'hidden')
                        $('#btnQuitarEcoObsProc').css("visibility", 'hidden')
                        //$('#lblEcoObsProc').html("Receta Nro.: " + obj.idReceta + ' - Estado: Despachada');
                    }
                }
                if (obj.IdPuntoCarga == 20) {//eco gene
                    $('#lblEcoGene').html(labelReceta);
                    $('#hdIdRecetaEcoGene').val(obj.IdReceta);

                    $('#hdIdRecetaEcoGeneral').val(obj.IdReceta);

                    await OrdenMedica.SeleccionarRecetaDetalleCE(obj.IdReceta, 20)
                    if (parseInt(obj.idEstado) === 1) {
                        $('#btnAgregaEcoGene').css("visibility", 'visible');
                        $('#btnQuitarEcoGene').css("visibility", 'visible');
                    }
                    else {
                        $('#btnAgregaEcoGene').css("visibility", 'hidden')
                        $('#btnQuitarEcoGene').css("visibility", 'hidden')
                        //$('#lblEcoGene').html("Receta Nro.: " + obj.idReceta + ' - Estado: Despachada');
                    }
                }
                if (obj.IdPuntoCarga == 2) {//pt clinica
                    $('#lblPatoClinica').html(labelReceta);
                    $('#hdIdRecetaPatoClinica').val(obj.IdReceta);

                    $('#hdIdRecetaPatClinica').val(obj.IdReceta);

                    await OrdenMedica.SeleccionarRecetaDetalleCE(obj.IdReceta, 2)
                    if (parseInt(obj.idEstado) === 1) {
                        $('#btnAgregaPatoClinica').css("visibility", 'visible');
                        $('#btnQuitarPatoClinica').css("visibility", 'visible');
                    }
                    else {
                        $('#btnAgregaPatoClinica').css("visibility", 'hidden')
                        $('#btnQuitarPatoClinica').css("visibility", 'hidden')
                        //$('#lblPatoClinica').html("Receta Nro.: " + obj.idReceta + ' - Estado: Despachada');
                    }
                }
                if (obj.IdPuntoCarga == 3) {//anat patologica
                    $('#lblanaPatologica').html(labelReceta);
                    $('#hdIdRecetaAnaPatologica').val(obj.IdReceta)

                    $('#hdIdRecetaAnatPatologica').val(obj.IdReceta);

                    await OrdenMedica.SeleccionarRecetaDetalleCE(obj.IdReceta, 3)
                    if (parseInt(obj.idEstado) === 1) {
                        $('#btnAgregaanaPatologica').css("visibility", 'visible');
                        $('#btnQuitaranaPatologica').css("visibility", 'visible');
                    }
                    else {
                        $('#btnAgregaanaPatologica').css("visibility", 'hidden')
                        $('#btnQuitaranaPatologica').css("visibility", 'hidden')
                        //$('#lblanaPatologica').html("Receta Nro.: " + obj.idReceta + ' - Estado: Despachada');
                    }
                }
                if (obj.IdPuntoCarga == 11) {//sangre
                    $('#lblbancoSangre').html(labelReceta);
                    $('#hdIdRecetabancoSangre').val(obj.IdReceta)

                    $('#hdIdRecetaBancoSangre').val(obj.IdReceta);

                    await OrdenMedica.SeleccionarRecetaDetalleCE(obj.IdReceta, 11)
    
                    if (parseInt(obj.idEstado) === 1) {
                        $('#btnAgregabancoSangre').css("visibility", 'visible');
                        $('#btnQuitarbancoSangre').css("visibility", 'visible');
                    }
                    else {
                        $('#btnAgregabancoSangre').css("visibility", 'hidden')
                        $('#btnQuitarbancoSangre').css("visibility", 'hidden')
                        //$('#lblbancoSangre').html("Receta Nro.: " + obj.idReceta + ' - Estado: Despachada');
                    }
                }
                if (obj.IdPuntoCarga == 22) {//tomografia jdelgado
                    $('#lbltomografia').html(labelReceta);
                    $('#hdIdRecetatomografia').val(obj.IdReceta)

                    $('#hdIdRecetaTomografia').val(obj.IdReceta)

                    await OrdenMedica.SeleccionarRecetaDetalleCE(obj.IdReceta, 22)
                    if (parseInt(obj.idEstado) === 1) {
                        $('#btnAgregatomografia').css("visibility", 'visible');
                        $('#btnQuitartomografia').css("visibility", 'visible');
                    }
                    else {
                        $('#btnAgregatomografia').css("visibility", 'hidden')
                        $('#btnQuitartomografia').css("visibility", 'hidden')
                        //$('#lbltomografia').html("Receta Nro.: " + obj.idReceta + ' - Estado: Despachada');
                    }
                }
                if (obj.IdPuntoCarga == 5) {//farmacia
                    $('#lblFarmacia').html(labelReceta);
                    $('#hdIdRecetaFarmacia').val(obj.IdReceta)
                    $("#txtFechaVigencia").datepicker("setDate", obj.fechaVigenciaWeb);


                    $('#hdIdRecetaFarmacia').val(obj.IdReceta)

                    await OrdenMedica.SeleccionarRecetaDetalleCE(obj.IdReceta, 5)
                    if (parseInt(obj.idEstado) === 1) {
                        $('#btnAgregaFarmacia').css("visibility", 'visible');
                        $('#btnQuitarFarmacia').css("visibility", 'visible');
                    }
                    else {
                        $('#btnAgregaFarmacia').css("visibility", 'hidden')
                        $('#btnQuitarFarmacia').css("visibility", 'hidden')
                        //$('#lblFarmacia').html("Receta Nro.: " + obj.idReceta + ' - Estado: Despachada');
                    }
                }
                else {
                    //Ordenes.listaFecha();
                }
                OrdenMedica.ubicaMedico(obj.idMedicoReceta);
            });
        } else {
            //OrdenMedica.listaFecha();
        }
    
        OrdenesRecetasMedicas = datos;
        //Ordenes.validaActivabtnPaquete();
    },

    ubicaMedico(valor) {
        $('#cboMedicoReceta').val(valor);
        if (valor > 0) {
            if (isEmpty($('#cboMedicoReceta').val())) {
                $('#cboMedicoReceta').attr('disabled', false);
            } else {
                $('#cboMedicoReceta').attr('disabled', true);
            }
        } else {
            $('#cboMedicoReceta').attr('disabled', false);
        }
        $('.chzn-select').chosen().trigger("chosen:updated");
    },

    HabilitarTabsRecetas(){
        $('[href="#farmacia"]').closest('li').show();
        $('[href="#ecoObst"]').closest('li').show();
        $('[href="#ecoObstProc"]').closest('li').show();
        $('[href="#ecoMedFet"]').closest('li').show();
        $('[href="#rayos"]').closest('li').show();
        $('[href="#ecoGene"]').closest('li').show();
        $('[href="#anatoPato"]').closest('li').show();
        $('[href="#patoClinica"]').closest('li').show();
        $('[href="#laboratorio1"]').closest('li').show();
        $('[href="#laboratorio2"]').closest('li').show();
        $('[href="#bancoSangre"]').closest('li').show();
        $('[href="#tomografia"]').closest('li').show();
        $('[href="#interconsultas"]').closest('li').show();  
    },

    LimpiarOrdenesMedicas() {
        DTRecetaRayosX.clear().draw();
        DTRecetaEcoObst.clear().draw();        
        DTRecetaEcoGene.clear().draw();
        DTRecetaAnaPato.clear().draw();
        DTRecetaBancoSan.clear().draw();
        DTRecetaPatoCli.clear().draw();
        DTRecetaPatoCli_Emer.clear().draw();
        DTRecetaTomo.clear().draw();
        DTRecetaFarmacia.clear().draw();
        DTRecetaInterconsulta.clear().draw();
        //DTDiagnosticosRecetaMedica.clear().draw();
    
        $('#txtCAntidadFarmacia').val(1);
        $('#txtCAntidadRx').val(1);
        $('#txtCAntidadObs').val(1);
        $('#txtCAntidadObsProc').val(1);
        $('#txtCAntidadEcoGeneral').val(1);
        $('#txtCAntidadAPatologica').val(1);
        $('#txtCAntidadPatoClinica').val(1);
        $('#txtCAntidadPatoClinica_Emer').val(1);
        $('#txtCAntidadbancoSangre').val(1);
        $('#txtCAntidadinterconsultas').val(1);
        $('#txtCAntidadtomografia').val(1);
    
        $('#hdIdRecetaRX').val(0)
        $('#lblRx').html(0)
    
        $('#hdIdRecetaEcoObs').val(0)
        $('#lblEcoObs').html(0)
    
        $('#hdIdRecetaEcoObsProc').val(0)
        $('#lblEcoObsProc').html(0)
    
        $('#hdIdRecetaEcoGene').val(0)
        $('#lblEcoGene').html(0)
    
        $('#hdIdRecetaPatoClinica').val(0)
        $('#lblPatoClinica').html(0)

        $('#hdIdRecetaPatoClinicaEmergencia').val(0)
        $('#lblPatoClinica_Emergencia').html(0)
    
        $('#hdIdRecetaAnaPatologica').val(0)
        $('#lblanaPatologica').html(0)
    
        $('#hdIdRecetabancoSangre').val(0)
        $('#lblbancoSangre').html(0)
    
        $('#hdIdRecetaFarmacia').val(0)
        $('#lblFarmacia').html(0)
    
        $('#hdIdRecetaInterconsulta').val(0)
        $('#lblInterconsulta').html(0)
    
        $('#hdIdRecetatomografia').val(0)
        $('#lbltomografia').html(0)
    
        $('#btnAgregaRayosX').css("visibility", 'visible');
        $('#btnQuitarRayos').css("visibility", 'visible');
        $('#btnAgregaEcoObs').css("visibility", 'visible');
        $('#btnQuitarEcoObs').css("visibility", 'visible');
        $('#btnAgregaEcoObsProc').css("visibility", 'visible');
        $('#btnQuitarEcoObsProc').css("visibility", 'visible');
        $('#btnAgregaEcoGene').css("visibility", 'visible');
        $('#btnQuitarEcoGene').css("visibility", 'visible');
        $('#btnAgregaPatoClinica').css("visibility", 'visible');
        $('#btnQuitarPatoClinica').css("visibility", 'visible');
        $('#btnAgregaPatoClinica_Emer').css("visibility", 'visible');
        $('#btnQuitarPatoClinica_Emer').css("visibility", 'visible');
        $('#btnAgregaanaPatologica').css("visibility", 'visible');
        $('#btnQuitaranaPatologica').css("visibility", 'visible');
        $('#btnAgregabancoSangre').css("visibility", 'visible');
        $('#btnQuitarbancoSangre').css("visibility", 'visible');
        $('#btnAgregaFarmacia').css("visibility", 'visible');
        $('#btnQuitarFarmacia').css("visibility", 'visible');
        $('#btnAgregainterconsultas').css("visibility", 'visible');
        $('#btnQuitarinterconsultas').css("visibility", 'visible');
    
        $('#btnAgregatomografia').css("visibility", 'visible');
        $('#btnQuitartomografia').css("visibility", 'visible');
    
        $(`#cboEspecialidades option[value='${0}']`).attr("selected", true);
        $(`#cboTipoAtencion option[value='${0}']`).attr("selected", true);
        $('#txtResumenHistoriaClinica').val('')
        $('#txtMotivoInterconsulta').val('')
        $('#txtOtrosMedicamentos').val('')

           
        //Ordenes.listaFecha();
    },

    LimpiarOrdenesMedicasCE() {
        oTableFarmacia.fnClearTable();

        // DTRecetaRayosX.clear().draw();
        // DTRecetaEcoObst.clear().draw();        
        // DTRecetaEcoGene.clear().draw();
        // DTRecetaAnaPato.clear().draw();
        // DTRecetaBancoSan.clear().draw();
        // DTRecetaPatoCli.clear().draw();
        // DTRecetaTomo.clear().draw();
        // DTRecetaFarmacia.clear().draw();      
    
        $('#txtCAntidadFarmacia').val(1);
        $('#txtCAntidadRx').val(1);
        $('#txtCAntidadObs').val(1);
        $('#txtCAntidadObsProc').val(1);
        $('#txtCAntidadEcoGeneral').val(1);
        $('#txtCAntidadAPatologica').val(1);
        $('#txtCAntidadPatoClinica').val(1);
        $('#txtCAntidadbancoSangre').val(1);
        $('#txtCAntidadinterconsultas').val(1);
        $('#txtCAntidadtomografia').val(1);
    
        $('#hdIdRecetaRX').val(0)
        $('#lblRx').html(0)
    
        $('#hdIdRecetaEcoObs').val(0)
        $('#lblEcoObs').html(0)
    
        $('#hdIdRecetaEcoObsProc').val(0)
        $('#lblEcoObsProc').html(0)
    
        $('#hdIdRecetaEcoGene').val(0)
        $('#lblEcoGene').html(0)
    
        $('#hdIdRecetaPatoClinica').val(0)
        $('#lblPatoClinica').html(0)
    
        $('#hdIdRecetaAnaPatologica').val(0)
        $('#lblanaPatologica').html(0)
    
        $('#hdIdRecetabancoSangre').val(0)
        $('#lblbancoSangre').html(0)
    
        $('#hdIdRecetaFarmacia').val(0)
        $('#lblFarmacia').html(0)
    
        $('#hdIdRecetaInterconsulta').val(0)
        $('#lblInterconsulta').html(0)
    
        $('#hdIdRecetatomografia').val(0)
        $('#lbltomografia').html(0)
    
    
        $('#btnAgregaRayosX').css("visibility", 'visible');
        $('#btnQuitarRayos').css("visibility", 'visible');
        $('#btnAgregaEcoObs').css("visibility", 'visible');
        $('#btnQuitarEcoObs').css("visibility", 'visible');
        $('#btnAgregaEcoObsProc').css("visibility", 'visible');
        $('#btnQuitarEcoObsProc').css("visibility", 'visible');
        $('#btnAgregaEcoGene').css("visibility", 'visible');
        $('#btnQuitarEcoGene').css("visibility", 'visible');
        $('#btnAgregaPatoClinica').css("visibility", 'visible');
        $('#btnAgregaPatoClinica_Emer').css("visibility", 'visible');
        $('#btnQuitarPatoClinica_Emer').css("visibility", 'visible');
        $('#btnQuitarPatoClinica').css("visibility", 'visible');
        $('#btnAgregaanaPatologica').css("visibility", 'visible');
        $('#btnQuitaranaPatologica').css("visibility", 'visible');
        $('#btnAgregabancoSangre').css("visibility", 'visible');
        $('#btnQuitarbancoSangre').css("visibility", 'visible');
        $('#btnAgregaFarmacia').css("visibility", 'visible');
        $('#btnQuitarFarmacia').css("visibility", 'visible');
        $('#btnAgregainterconsultas').css("visibility", 'visible');
        $('#btnQuitarinterconsultas').css("visibility", 'visible');
    
        $('#btnAgregatomografia').css("visibility", 'visible');
        $('#btnQuitartomografia').css("visibility", 'visible');
    
        $(`#cboEspecialidades option[value='${0}']`).attr("selected", true);
        $(`#cboTipoAtencion option[value='${0}']`).attr("selected", true);
        $('#txtResumenHistoriaClinica').val('')
        $('#txtMotivoInterconsulta').val('')
           
        //Ordenes.listaFecha();
    },


    quitarProd(idCatalogo) {
        if (idCatalogo == 21) {
            var objselec = DTRecetaRayosX.row('.selected').data();
            if (!isEmpty(objselec)) {
                DTRecetaRayosX.row('.selected').remove().draw(false);    
            } else {
                alerta("info", "", "Debe Seleccionar el registro para eliminar.");
            }
        }
    
        if (idCatalogo == 23) {
            var objselec = DTRecetaEcoObst.row('.selected').data();
            if (!isEmpty(objselec)) {
                DTRecetaEcoObst.row('.selected').remove().draw(false);    
            } else {
                alerta("info", "", "Debe Seleccionar el registro para eliminar.");
            }
        }
    
        if (idCatalogo == 20) {
            var objselec = DTRecetaEcoGene.row('.selected').data();
            if (!isEmpty(objselec)) {
                DTRecetaEcoGene.row('.selected').remove().draw(false);    
            } else {
                alerta("info", "", "Debe Seleccionar el registro para eliminar.");
            }
        }
    
        if (idCatalogo == 3) {
            var objselec = DTRecetaAnaPato.row('.selected').data();
            if (!isEmpty(objselec)) {
                DTRecetaAnaPato.row('.selected').remove().draw(false);    
            } else {
                alerta("info", "", "Debe Seleccionar el registro para eliminar.");
            }
        }
        if (idCatalogo == 2) {
            var objselec = DTRecetaPatoCli.row('.selected').data();
            if (!isEmpty(objselec)) {
                DTRecetaPatoCli.row('.selected').remove().draw(false);    
            } else {
                alerta("info", "", "Debe Seleccionar el registro para eliminar.");
            }
                
        }
        //Laboratorio Emergencia  =29
        if (idCatalogo == 29) {
           
            var objselec_emergencia = DTRecetaPatoCli_Emer.row('.selected').data();
            if (!isEmpty(objselec_emergencia)) {
                DTRecetaPatoCli_Emer.row('.selected').remove().draw(false);    
            } else {
                alerta("info", "", "Debe Seleccionar el registro para eliminar.");
            }
                
        }
        if (idCatalogo == 11) {
            var objselec = DTRecetaBancoSan.row('.selected').data();
            if (!isEmpty(objselec)) {
                DTRecetaBancoSan.row('.selected').remove().draw(false);    
            } else {
                alerta("info", "", "Debe Seleccionar el registro para eliminar.");
            }
        }
    
        if (idCatalogo == 5) {
            var objselec = DTRecetaFarmacia.row('.selected').data();
            if (!isEmpty(objselec)) {
                DTRecetaFarmacia.row('.selected').remove().draw(false);    
            } else {
                alerta("info", "", "Debe Seleccionar el registro para eliminar.");
            }
        }
        
        if (idCatalogo == 22) {
            var objselec = DTRecetaTomo.row('.selected').data();
            if (!isEmpty(objselec)) {
                DTRecetaTomo.row('.selected').remove().draw(false);    
            } else {
                alerta("info", "", "Debe Seleccionar el registro para eliminar.");
            }
        }

        if (idCatalogo == 12) {
            var objselec = DTRecetaInterconsulta.row('.selected').data();
            if (!isEmpty(objselec)) {
                DTRecetaInterconsulta.row('.selected').remove().draw(false);    
            } else {
                alerta("info", "", "Debe Seleccionar el registro para eliminar.");
            }
        }
    },
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    CargarDatosRecetaDetalle(datos) {
        console.log('datos lleegó a ordemn',datos);
    
        $('#hdIdRecetaRXOrdRes').val(0)
        $('#lblRxOrdRes').html(0)
    
        $('#hdIdRecetaecoObstOrdRes').val(0)
        $('#lblecoObstOrdRes').html(0)
    
        $('#hdIdRecetaEcoObsProcOrdRes').val(0)
        $('#lblEcoObsProcOrdRes').html(0)
    
        $('#hdIdRecetaEcoGeneOrdRes').val(0)
        $('#lblEcoGeneOrdRes').html(0)
    
        $('#hdIdRecetaPatoClinicaOrdRes').val(0)
        $('#lblPatoClinicaOrdRes').html(0)
    
        $('#hdIdRecetaAnaPatologicaOrdRes').val(0)
        $('#lblanaPatologicaOrdRes').html(0)
    
        $('#hdIdRecetabancoSangreOrdRes').val(0)
        $('#lblbancoSangreOrdRes').html(0)
    
        $('#hdIdRecetaFarmaciaOrdRes').val(0)
        $('#lblFarmaciaOrdRes').html(0)
    
        $('[href="#farmaciaOrdRes"]').closest('li').hide();
        $('[href="#ecoObstOrdRes"]').closest('li').hide();
        $('[href="#ecoObstProcOrdRes"]').closest('li').hide();
        $('[href="#ecoMedFetOrdRes"]').closest('li').hide();
        $('[href="#rayosOrdRes"]').closest('li').hide();
        $('[href="#ecoGeneOrdRes"]').closest('li').hide();
        $('[href="#anatoPatoOrdRes"]').closest('li').hide();
        $('[href="#patoClinicaOrdRes"]').closest('li').hide();
        $('[href="#bancoSangreOrdRes"]').closest('li').hide();
        $('[href="#tomografiaOrdRes"]').closest('li').hide();
        $('[href="#interconsultaOrdRes"]').closest('li').hide();
    
        if (!isEmpty(datos)) {//rx
            $(datos).each(function (i, obj) {
                if (obj.IdPuntoCarga == 21) //rx
                {
                    $('.nav-tabs a[href="#rayosOrdRes"]').tab('show');
                    $('#lblRxOrdRes').html("Receta Nro.: " + obj.IdReceta);
                    $('#hdIdRecetaRXOrdRes').val(obj.IdReceta);
                    OrdenMedica.SeleccionarRecetaDetalleSeguimiento(obj.IdReceta, 21)
                    if (obj.idEstado === 1) {
    
                    }
                    else {
                        $('#lblRxOrdRes').html("Receta Nro.: " + obj.IdReceta + ' - Estado: Despachada');
                    }
                }
                if (obj.IdPuntoCarga == 23) {//eco obs
                    $('.nav-tabs a[href="#ecoObstOrdRes"]').tab('show');
                    $('.nav-tabs a[href="#ecoMedFetOrdRes"]').tab('show');
                    $('#lblecoObstOrdRes').html("Receta Nro.: " + obj.IdReceta);
                    $('#hdIdRecetaecoObstOrdRes').val(obj.IdReceta);
                    OrdenMedica.SeleccionarRecetaDetalleSeguimiento(obj.IdReceta, 23)
                    if (obj.idEstado === 1) {
    
                    }
                    else {
    
                        $('#lblecoObstOrdRes').html("Receta Nro.: " + obj.IdReceta + ' - Estado: Despachada');
                    }
                }
                if (obj.IdPuntoCarga == 24) {//eco obs proc
                    $('.nav-tabs a[href="#ecoMedFetOrdRes"]').tab('show');
                    $('.nav-tabs a[href="#ecoObstProcOrdRes"]').tab('show');
                    $('#lblEcoObsProcOrdRes').html("Receta Nro.: " + obj.IdReceta);
                    $('#hdIdRecetaEcoObsProcOrdRes').val(obj.IdReceta);
                    OrdenMedica.SeleccionarRecetaDetalleSeguimiento(obj.IdReceta, 24)
                    if (obj.idEstado === 1) {
    
                    }
                    else {
    
                        $('#lblEcoObsProcOrdRes').html("Receta Nro.: " + obj.IdReceta + ' - Estado: Despachada');
                    }
                }
                if (obj.IdPuntoCarga == 20) {//eco gene
                    $('.nav-tabs a[href="#ecoGeneOrdRes"]').tab('show');
                    $('#lblEcoGeneOrdRes').html("Receta Nro.: " + obj.IdReceta);
                    $('#hdIdRecetaEcoGeneOrdRes').val(obj.IdReceta);
                    OrdenMedica.SeleccionarRecetaDetalleSeguimiento(obj.IdReceta, 20)
                    if (obj.idEstado === 1) {
                    }
                    else {
    
                        $('#lblEcoGeneOrdRes').html("Receta Nro.: " + obj.IdReceta + ' - Estado: Despachada');
                    }
                }
                if (obj.IdPuntoCarga == 2) {//pt clinica
                    $('.nav-tabs a[href="#patoClinicaOrdRes"]').tab('show');
                    $('#lblPatoClinicaOrdRes').html("Receta Nro.: " + obj.IdReceta);
                    $('#hdIdRecetaPatoClinicaOrdRes').val(obj.IdReceta);
                    OrdenMedica.SeleccionarRecetaDetalleSeguimiento(obj.IdReceta, 2)
                    if (obj.idEstado === 1) {
                    }
                    else {
                        $('#lblPatoClinicaOrdRes').html("Receta Nro.: " + obj.IdReceta + ' - Estado: Despachada');
                    }
                }
                if (obj.IdPuntoCarga == 3) {//anat patologica
                    $('.nav-tabs a[href="#anatoPatoOrdRes"]').tab('show');
                    $('#lblanaPatologicaOrdRes').html("Receta Nro.: " + obj.IdReceta);
                    $('#hdIdRecetaAnaPatologicaOrdRes').val(obj.IdReceta)
                    OrdenMedica.SeleccionarRecetaDetalleSeguimiento(obj.IdReceta, 3)
                    if (obj.idEstado === 1) {
    
                    }
                    else {
    
                        $('#lblanaPatologicaOrdRes').html("Receta Nro.: " + obj.IdReceta + ' - Estado: Despachada');
                    }
                }
                if (obj.IdPuntoCarga == 11) {//sangre
                    $('.nav-tabs a[href="#bancoSangreOrdRes"]').tab('show');
                    $('#lblbancoSangreOrdRes').html("Receta Nro.: " + obj.IdReceta);
                    $('#hdIdRecetabancoSangreOrdRes').val(obj.IdReceta)
                    OrdenMedica.SeleccionarRecetaDetalleSeguimiento(obj.IdReceta, 11)
    
                    if (obj.idEstado === 1) {
    
                    }
                    else {
                        $('#lblbancoSangreOrdRes').html("Receta Nro.: " + obj.IdReceta + ' - Estado: Despachada');
                    }
                }
                if (obj.IdPuntoCarga == 5) {//farmacia
                    $('.nav-tabs a[href="#farmaciaOrdRes"]').tab('show');
                    $('#lblFarmaciaOrdRes').html("Receta Nro.: " + obj.IdReceta);
                    $('#hdIdRecetaFarmaciaOrdRes').val(obj.IdReceta)
                    // $('#txtFechaVigencia').val(obj.fechaVigenciaWeb)
                    OrdenMedica.SeleccionarRecetaDetalleSeguimiento(obj.IdReceta, 5)
                    if (obj.idEstado === 1) {
                    }
                    else {
                        $('#lblFarmaciaOrdRes').html("Receta Nro.: " + obj.IdReceta + ' - Estado: Despachada');
                    }
                }
                if (obj.IdPuntoCarga == 12) {//interconsulta
                    $('.nav-tabs a[href="#interconsultaOrdRes"]').tab('show');
                    $('#lblinterconsultaOrdRes').html("Receta Nro.: " + obj.IdReceta);
                    $('#hdIdRecetainterconsultaOrdRes').val(obj.IdReceta)
                    OrdenMedica.SeleccionarRecetaDetalleSeguimiento(obj.IdReceta, 12)
                    if (obj.idEstado === 1) {
                    }
                    else {
                        $('#lblinterconsultaOrdRes').html("Receta Nro.: " + obj.IdReceta + ' - Estado: Generada');
                    }
                }
                if (obj.IdPuntoCarga == 22) {//tomgrafia
                    $('.nav-tabs a[href="#tomografiaOrdRes"]').tab('show');
                    $('#lbltomografiaOrdRes').html("Receta Nro.: " + obj.IdReceta);
                    $('#hdIdRecetatomografiaOrdRes').val(obj.IdReceta)
                    OrdenMedica.SeleccionarRecetaDetalleSeguimiento(obj.IdReceta, 22)
                    if (obj.idEstado === 1) {
                    }
                    else {
                        $('#lbltomografiaOrdRes').html("Receta Nro.: " + obj.IdReceta + ' - Estado: Despachada');
                    }
                }
                
    
    
            });
        }
    },


    CargarDiagnosticosInterconsulta(){
        DTDiagnosticosRecetaMedica.clear().draw();
        let diagnosticos = DtDiagnosticos.rows().data();
        let tableDiagnosticos = []
        console.log('diagggg recetasss',diagnosticos[0]);

        if (!isEmpty(diagnosticos[0])) {
            $(diagnosticos).each((i, obj) => {
                //console.log(i, obj)
                let objRow = {
                    
                    codigo: obj.codigo,
                    diagnostico: obj.diagnostico,
                    // descripcion: obj.descripcion,
                    // esActivo: obj.esActivo,
                    // fechaInicioVigencia: obj.fechaInicioVigencia,
                    // iddiagnostico: obj.idDiagnostico,
                    idTipoDiagnostico: obj.idTipoDiagnostico,
                    //tipoDiagnostico: $('select[name="cboTipoDiagnostico"] option:selected').text()
                    tipoDiagnostico: obj.tipoDiagnostico,
                    // intrahospitalario: obj.intrahospitalario
                }
                tableDiagnosticos.push(objRow)
            });
            DTDiagnosticosRecetaMedica.rows.add(tableDiagnosticos).draw(false);
        }
    }  

}