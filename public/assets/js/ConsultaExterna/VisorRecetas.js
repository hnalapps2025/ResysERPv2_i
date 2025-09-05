var idBtnRecetaSelect = '';
var idRecetaSelect = 0;
var tipoRecetaSelect = '';
var flagEstadoCuenta = false;
var tabSelect = '';

var VisorReceta = {

    idRecetaRX: 0,
    idRecetaPatCli: 0,
    idRecetaAnatPat: 0,
    idRecetaBs: 0,
    idRecetaEcoGene: 0,
    idRecetaEcoObs: 0,
    // idRecetaEcoObsProc: 0,
    idRecetaFarm: 0,
    // idRecetaInterconsulta: 0,
    idRecetaTomografia: 0,

    idProcedimiento: 0,


    codeSelect: '',
    idBtnSelect: '',

    idCuentaAtencion: '',

    AbrirVisorRecetas(recetas) {

        this.LimpiarVisorRecetas();
        if (recetas.length > 0) {
            var tab = this.CargarDatosRecetas(recetas);
            $('#modalRecetaImprime').modal('show');
            $(tab).click();
        } else {
            toastr.warning('No existen recetas ni ordenes para mostrar.');
        }
    },

    CargarDatosRecetas(recetas) {
        var tab = "";
        $(recetas).each(function (i, obj) {
            if (obj.IdReceta > 0) {

                switch (obj.IdPuntoCarga) {
                    case 22: VisorReceta.idRecetaTomografia = obj.IdReceta; $("#tomografiaRece").attr("data-rec", obj.IdReceta); tab = "#tomografiaRece"; break;
                    case 21: VisorReceta.idRecetaRX = obj.IdReceta; $("#rayosRece").attr("data-rec", obj.IdReceta); tab = "#rayosRece"; break;
                    case 20: VisorReceta.idRecetaEcoGene = obj.IdReceta; $("#ecoGeneRece").attr("data-rec", obj.IdReceta); tab = "#ecoGeneRece"; break;
                    case 23: VisorReceta.idRecetaEcoObs = obj.IdReceta; $("#ecoObstRece").attr("data-rec", obj.IdReceta); tab = "#ecoObstRece"; break;
                    case 11: VisorReceta.idRecetaBs = obj.IdReceta; $("#bancoSangreRece").attr("data-rec", obj.IdReceta); tab = "#bancoSangreRece"; break;
                    case 3: VisorReceta.idRecetaAnatPat = obj.IdReceta; $("#anatoPatoRece").attr("data-rec", obj.IdReceta); tab = "#anatoPatoRece"; break;
                    case 2: VisorReceta.idRecetaPatCli = obj.IdReceta; $("#patoClinicaRece").attr("data-rec", obj.IdReceta); tab = "#patoClinicaRece"; break;
                    case 5: VisorReceta.idRecetaFarm = obj.IdReceta; $("#farmaciaRece").attr("data-rec", obj.IdReceta); tab = "#farmaciaRece"; break;
                    case 1: VisorReceta.idProcedimiento = obj.IdReceta; $("#procedimientos").attr("data-rec", obj.IdReceta); $("#procedimientos").attr("data-code", obj.IdOrdenPago); tab = "#procedimientos"; break;
                    case "cita": VisorReceta.IdCuentaAtencion_cita = obj.IdReceta; $("#citaRecibo").attr("data-rec", obj.IdReceta); $("#citaRecibo").attr("data-code", obj.IdOrdenPago); tab = "#citaRecibo"; break;
                    default: break;
                }
                $(tab).show();
            }

        });
        return tab;
    },

    LimpiarVisorRecetas() {
        VisorReceta.idRecetaRX = 0;
        VisorReceta.idRecetaPatCli = 0;
        VisorReceta.idRecetaAnatPat = 0;
        VisorReceta.idRecetaBs = 0;
        VisorReceta.idRecetaEcoGene = 0;
        VisorReceta.idRecetaEcoObs = 0;
        // VisorReceta.idRecetaEcoObsProc = 0;
        VisorReceta.idRecetaFarm = 0;
        VisorReceta.idRecetaInterconsulta = 0;
        VisorReceta.idRecetaTomografia = 0;

        VisorReceta.codeSelect = '';
        VisorReceta.idBtnSelect = '';

        $(".btnReceta").hide();
        $(".btnReceta").attr("data-rec", "");
        $(".btnReceta").attr("data-code", "");
    },

    CerrarVisorRecetas() {
        VisorReceta.idRecetaRX = 0;
        VisorReceta.idRecetaPatCli = 0;
        VisorReceta.idRecetaAnatPat = 0;
        VisorReceta.idRecetaBs = 0;
        VisorReceta.idRecetaEcoGene = 0;
        VisorReceta.idRecetaEcoObs = 0;
        // VisorReceta.idRecetaEcoObsProc = 0;
        VisorReceta.idRecetaFarm = 0;
        VisorReceta.idRecetaInterconsulta = 0;
        VisorReceta.idRecetaTomografia = 0;

        idBtnRecetaSelect = '';
        flagEstadoCuenta = false;
        tabSelect = '';

        VisorReceta.codeSelect = '';
        VisorReceta.idBtnSelect = '';

        $("#ImpresionReceta-nav-content .tab-pane").removeClass('active');
        $("#ImpresionReceta-nav-content .tab-pane").removeClass('in');
        $("#ImpresionReceta-nav-content .tab-pane").removeClass('fade');
        $("#ImpresionReceta-nav-content .tab-pane").addClass('fade');
        $('#procedimientos').removeClass('active');
        $('#citaRecibo').removeClass('active');
        $('.btnReceta').removeClass('active');
        $('iframe').attr('src', '');

        window.location = '/registro_atencion';
        $('#modalRecetaImprime').modal('hide');
    },

    ListarDocumentoFirmaDigital: function (idCuentaAtencion) {
        let formData = new FormData();
        formData.append("idCuentaAtencion", idCuentaAtencion)

        return HttpClient.Post('/Utilitario/ListarDocumentoFirmaDigital', formData)
            .then(res => {

                if (res.estado) {
                    if (res.data.table.length > 0) {
                        return res.data.table
                    } else {
                        Cargando(0)
                        return null
                    }
                } else {
                    alerta(3, res.msg)
                    Cargando(0)
                    return null
                }
            })
            .catch(e => {
                alerta(3, 'Error: ' + e)
            })
    },

    /////////////////////////////////////////////////////////////////////
    showHideTabs(idReceta, tab, code) {
        if (idReceta == 0 || typeof idReceta === 'undefined') {
            //$(`a[href="${tab}"]`).closest('li').hide()
            $(tab).hide()
        } else {
            //$(`a[href="${tab}"]`).closest('li').show()            
            $(tab).show()
            tabSelect = tab
            //$(`a[href="${tab}"]`).click();
            //$(`.nav-tabs a[href="${tab}"]`).tab('show');
        }
    },

    async imprimirRecetaConFirma(idCuentaAtencion, idRegistro, code, idDoc, tipo) {
        Cargando(1);
        var url = await "/Atencion/statusAndDownload?area=ConsultaExterna&idCuentaAtencion=" + idCuentaAtencion + "&idRegistro=" + idRegistro + "&code=" + code + "&documentId=" + idDoc + "&tipo=" + tipo;
        //$('#ifrmReporte').attr('src', url);

        var request = new XMLHttpRequest();
        request.responseType = "blob";
        request.open("GET", url);
        request.onload = function () {
            if (this.response.size > 0) {
                var url = window.URL.createObjectURL(this.response);
                var a = document.createElement("a");
                document.body.appendChild(a);
                a.href = url;
                //a.download = this.response.name || "CE-" + $.now()
                a.download = tipo + idCuentaAtencion + "-" + $.now()
                //a.click();


                AbrirVisorDocumento(url, 1);
                if (tipo == 'REC-F') { $("#farmaciaRece-tab").click(); }
                if (tipo == 'REC-RX') { $("#rayosRece-tab").click(); }
                if (tipo == 'REC-EO') { $("#ecoObstRece-tab").click(); }
                if (tipo == 'REC-EOP') { $("#ecoObstProcRece-tab").click(); }
                if (tipo == 'REC-EG') { $("#ecoGeneRece-tab").click(); }
                if (tipo == 'REC-PC') { $("#patoClinicaRece-tab").click(); }
                if (tipo == 'REC-AP') { $("#anatoPatoRece-tab").click(); }
                if (tipo == 'REC-BS') { $("#bancoSangreRece-tab").click(); }
                if (tipo == 'REC-I') { $("#interconsulta-tab").click(); }
                if (tipo == 'REC-T') { $("#tomografiaRece-tab").click(); }
                //ListaAtencionesCE();
            } else {
                alerta(2, "El documento aún no está firmado digitalmente.")
            }
            Cargando(0);
        }
        request.send();
    },

    DevolverTipoReceta(tipo) {
        var nroReceta = '';
        switch (tipo) {
            case 'REC-F': nroReceta = VisorReceta.idRecetaFarm; break;
            case 'REC-PC': nroReceta = VisorReceta.idRecetaPatCli; break;
            case 'REC-AP': nroReceta = VisorReceta.idRecetaAnatPat; break;
            case 'REC-BS': nroReceta = VisorReceta.idRecetaBs; break;
            case 'REC-EG': nroReceta = VisorReceta.idRecetaEcoGene; break;
            case 'REC-EO': nroReceta = VisorReceta.idRecetaEcoObs; break;
            // case 'REC-EOP': nroReceta = VisorReceta.idRecetaEcoObsProc; break;
            case 'REC-RX': nroReceta = VisorReceta.idRecetaRX; break;
            case 'REC-I': nroReceta = VisorReceta.idRecetaInterconsulta; break;
            case 'REC-T': nroReceta = VisorReceta.idRecetaTomografia; break;

            default: break;
        }

        return nroReceta;
    },

    FirmarReceta(idCuentaAtencion, idReceta) {
        console.log('idcuentareceta', idCuentaAtencion)

        //Cargando(1);
        $.ajax({
            url: '/Recetas/informes/generarPDF/' + idReceta,
            method: 'GET',
            success: function (response) {
                if (response.pdf_url) {
                    // let idCuentaAtencion = idCuentaAtencion
                    let idRegistro = idReceta
                    let idTipoServicio = 1
                    let idEvaluacion = 0
                    let tipo = 'REC'
                    let rutaArchivo = window.location.origin + response.pdf_url

                    let param = idCuentaAtencion + '|' + idRegistro + '|' + idTipoServicio + '|' + idEvaluacion + '|' + tipo + '|' + rutaArchivo

                    sendParam(param)

                    $('.btnReceta').click()
                } else {
                    console.error('Error al generar el PDF.');
                }
            },
            error: function (error) {
                console.error('Error en la solicitud AJAX:', error);
            }
        });
        // Cargando(0);
    },

    Eventos() {
        $('#btnCerrarRecetas').on('click', function () {
            VisorReceta.CerrarVisorRecetas();
        });
        $('#btnCerrarRecetasV2').on('click', function () {
            VisorReceta.CerrarVisorRecetas();
        });


        //-----------------------------------------CARGAR RECETA PDF A LA VISTA-----------------------------------------//
        $('.btnReceta').on('click', async function () {
            var idBtnReceta = "#" + $(this).attr('id');
            //var tipoReceta = $(idBtnReceta).attr("data-name");
            var idReceta = $(idBtnReceta).attr("data-rec");

            var idCuentaAtencion = VisorReceta.idCuentaAtencion;

            $('#button-firma').html(`<button class="btn btn-sm glow_button btn-primary" style="color:white;" onclick="VisorReceta.FirmarReceta(${idCuentaAtencion}, ${idReceta})"><i class="fa fa-edit"></i> </button>`)


            // var codeReceta = $(idBtnReceta).attr("data-code");
            // VisorReceta.codeSelect = codeReceta;
            VisorReceta.idBtnSelect = idBtnReceta;

            // $('#btnifrmReceta').hide();               //KHOYOSI                        
            // $('#btnFirmaRecetaPorLote').hide();               //JELGADO                        
            $('#ifrmReceta').attr('src', '');               //KHOYOSI
            $('.btnReceta').removeClass('active');
            $('#procedimientos').removeClass('active'); // jdelgado procedimientos borrar
            $('#citaRecibo').removeClass('active');

            // console.log(idReceta)

            /*const firma = await Utilitario.SeleccionarFirmaDigitalV2(codeReceta)               //KHOYOSI
            if (typeof firma === 'undefined') {
                alerta('2', 'El documento no esta generado, se procedera a generar el documento.')
                const pdf = await Utilitario.GenerarRecetaPdf(Variables.IdCuentaAtencion, idReceta);
                if (pdf) {
                    alerta('1', 'Se generó el documento correctamente.');
                    const recetas = await Ordenes.ListarRecetasCabeceras(Variables.IdCuentaAtencion, Variables.IdTipoFinanciamiento, Variables.IdServicioIngreso, Variables.IdMedico);
                    VisorReceta.CargarDatosRecetas(recetas);
                    $(idBtnReceta).click();
                }
            } else {
                if (firma.statusFirma == 0) {
                    $('#btnifrmReceta').show();
                    $('#btnFirmaRecetaPorLote').show();               //JELGADO  
                    url = PathServerFiles + firma.rutaArchivo;               //KHOYOSI
                } else {
                    //url = PathServerFiles + '/4IdentitySignedFiles' + firma.rutaArchivo;               //KHOYOSI
                    firma.rutaArchivo = firma.rutaArchivo.replace('/UNSIGNED','')
                    url = PathServerFiles + '/SIGNED' + firma.rutaArchivo;               //KHOYOSI
                }*/
            //idRecetaSelect = idReceta;
            //tipoRecetaSelect = tipoReceta;
            $(idBtnReceta).addClass('active');
            //$('#TituloVisorReceta').append("");
            $('#TituloVisorReceta').text("Receta N° " + idReceta);
            // $('#ifrmReceta').attr('src', url);
            // }

            Cargando(1);


            let idRegistro = idReceta
            let idTipoServicio = 1
            let idEvaluacion = 0
            let tipo = 'REC'

            let documentoFirmado = await SeleccionarFirmasDigitales(idCuentaAtencion, idRegistro, idTipoServicio, idEvaluacion, tipo)

            if (documentoFirmado.length > 0) {
                // VizualizarModalPdf(documentoFirmado[0].rutaArchivo);
                $('#ifrmReceta').attr('src', documentoFirmado[0].rutaArchivo);

                // Abre el modal
                $('#pdfModal').modal('show');
                Cargando(0)
                return false;
            }


            $.ajax({
                url: '/Recetas/informes/generarPDF/' + idReceta,
                method: 'GET',
                success: function (response) {
                    if (response.pdf_url) {
                        // Coloca la URL del PDF en el src del iframe
                        $('#ifrmReceta').attr('src', response.pdf_url);

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


            // $.ajax({
            //     url: "/sa_general/pdf_receta",
            //     datatype: "json",
            //     data: {IdReceta: idReceta},
            //     method: "get",
            //     async: false,
            //     success: function (res) {
            //         let url = 'data:application/pdf;base64,' +res.pdf;
            //         $('#ifrmReceta').attr('src', url);
            //     },
            //     error: function (msg) {
            //         toastr.error(msg);
            //     }
            // })
        });

        $("#btnifrmReceta").on("click", async function () {

            Utilitario.TipoArchivoFirmar = 'REC';
            Cargando(1);
            const firma = await Utilitario.ValidarUsuarioFirmaDigital(VisorReceta.codeSelect)               //KHOYOSI            
            if (firma) {
                if (permisoFirmaDigital == 1) { await Utilitario.AbrirServicioFirmaBit4Id(VisorReceta.codeSelect); }
                if (permisoFirmaDigital == 2) { await Utilitario.AbrirServicioFirmaPeru(VisorReceta.codeSelect); }
                //await Utilitario.AbrirServicioFirmaBit4Id(VisorReceta.codeSelect);
            }
            Cargando(0);
        });

        $("#btnifrmRecetaFirmado").on("click", async function () {

            await Utilitario.AbrirDocumentoFirmadoBit4Id(VisorReceta.codeSelect);
        });


        $("#btnFirmaRecetaPorLote").on("click", async function () {

            Cargando(1)
            Utilitario.TipoArchivoFirmar = 'REC';
            const paquete = await Utilitario.CrearPaqueteArchivosRecetas(Variables.IdCuentaAtencion);
            if (!isEmpty(paquete)) {
                //console.log(paquete.data);                
                await Utilitario.AbrirServicioFirmaBit4IdMultiple(paquete.data)
            }
            Cargando(0)
        });

        $('#procedimientos').on('click', async function () { // JDELGADO J0 CAMBIO METODO IMPRESION}

            // let procedimientos = await VisorReceta.ListarDocumentoFirmaDigital(Variables.IdCuentaAtencion)

            // const firma = await Utilitario.SeleccionarFirmaDigitalV2(procedimientos[0].codeProc)             
            $('#ifrmReceta').attr('src', '');
            // let url = PathServerFiles + firma.rutaArchivo
            var idorden = $("#procedimientos").attr("data-rec");
            var idordenPago = $("#procedimientos").attr("data-code");

            $('.btnReceta').removeClass('active');
            $('#citaRecibo').removeClass('active');
            $('#procedimientos').addClass('active');
            // $('#TituloVisorReceta').append("");
            if (idordenPago != 0)
                $('#TituloVisorReceta').text("N° Orden Pago " + idordenPago);
            else
                $('#TituloVisorReceta').text("N° Orden " + idorden);
            // $('#ifrmReceta').attr('src', url);

            $.ajax({
                url: "/sa_general/pdf_orden",
                datatype: "json",
                data: { IdOrden: idorden },
                method: "get",
                async: false,
                success: function (res) {
                    if (res.resultado == 1) {
                        // let url = 'data:application/pdf;base64,' +;
                        $('#ifrmReceta').attr('src', res.pdf_url);
                    }
                    else
                        toastr.warning(res.mensaje, "Aviso")
                },
                error: function (msg) {
                    toastr.error(msg);
                }
            })

            //var objrow = oTable_atenciones.api(true).row($(this).parents("tr")[0]).index();
            //var row = oTable_atenciones.fnGetData(objrow);

            //Cargando(1);
            //const firma = await Utilitario.SeleccionarFirmaDigitalV2(row.codeProc)               //KHOYOSI            
            //if (typeof firma === 'undefined') {
            //    alerta('2', 'El documento no esta generado, Vuelva a guardar la atencion.')

            //} else {
            //    AbrirVisorDocumento(firma.rutaArchivo, 0);
            //}
            //Cargando(0);
        })

        $('#citaRecibo').on('click', async function () {

            $('#ifrmReceta').attr('src', '');

            let text = "";
            var idCuentaAtencion = $("#citaRecibo").attr("data-rec");
            var idordenPago = $("#citaRecibo").attr("data-code");
            console.log("ordenpago", idordenPago, "idCuentaAtencion:", idCuentaAtencion)
            $('.btnReceta').removeClass('active');
            $('#procedimientos').removeClass('active');
            $('#citaRecibo').addClass('active');

            text = "N° Cuenta " + idCuentaAtencion;
            if (idordenPago != 0)
                text += ", N° Orden Pago " + idordenPago;

            $('#TituloVisorReceta').text(text);

            $.ajax({
                url: "/sa_general/pdf_proxima_cita",
                datatype: "json",
                data: { IdCuentaAtencion: idCuentaAtencion },
                method: "get",
                async: false,
                success: function (res) {
                    $('#ifrmReceta').attr('src', res.pdf_url);
                },
                error: function (msg) {
                    toastr.error(msg);
                }
            })
        })
    }
}