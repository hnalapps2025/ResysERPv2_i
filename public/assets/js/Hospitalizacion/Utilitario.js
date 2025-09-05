var jqFirmaPeru


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

    idCuentaAtencion: ''

}
var VisorDocumento = {

    IdCuentaAtencion: 0,
    IdAtencion: 0,
    idBtnSelect: '',
}

function getFechaActual() {
    var fecha = new Date();
    var dia = fecha.getDate();
    var mes = parseInt(fecha.getMonth()) + 1;
    var yyy = fecha.getFullYear();
    if (dia < 10) dia = "0" + dia; //agrega cero si el menor de 10
    if (mes < 10) mes = "0" + mes;

    return dia + "/" + mes + "/" + yyy;
}

function AbrirVisorRecetas(datos) {
    console.log("visor Recetas desde consumo",datos)
    //var recetas = datos;
    LimpiarVisorRecetas();
    var tab = CargarDatosRecetas(datos);

    console.log('valor tabbbb  devueltoo',tab);
    console.log("valorr de  tab",tab)
    $('#modalRecetaImprime1').modal('show');
    $(tab).click();
    // this.LimpiarVisorRecetas();
    // if (recetas.length > 0) {
    //     var tab = this.CargarDatosRecetas(recetas);
    //     console.log("datosss tabbbb:".tab);
    //     $('#modalRecetaImprime1').modal('show');
    //     $(tab).click();
    // } else {
    //     toastr.warning('No existen recetas ni ordenes para mostrar.');
    // }
}


async function SeleccionarParametro(idParametro) {
    //var resp = [];
    let datos;
    var data = new FormData();

    data.append('_token', $("meta[name='csrf-token']").attr("content"));
    data.append('IdParametro', idParametro);

    try {
        datos = await
            $.ajax({
                method: "POST",
                url: "/Utilitario/ParametrosSeleccionarPorId",
                data: data,
                dataType: "json",
                cache: false,
                processData: false,
                contentType: false,
            });

        resp = datos.resultado;
    } catch (error) {
        alerta('danger', '', error);
    }
    return resp;
}
function AbrirVisorDocumentos(IdCuentaAtencion,IdAtencion,formatos) {
    
    this.LimpiarVisorDocumentos();
    VisorDocumento.IdCuentaAtencion=IdCuentaAtencion
    VisorDocumento.IdAtencion=IdAtencion

    var tab = this.CargarDatosDocumentos(formatos);
  

    $('#modalDocumentoImprimeEva').modal('show');
    $(tab).click();
    // Admision.InitialCharge()
}

function CargarDatosDocumentos(formatos) {
    var tab = "";
    console.log('formatosss',formatos)
    $(formatos).each(function (i, obj) {
        switch (obj) {
            case 1: tab = "#FUA-A2-Doc,#FUADoc"; break;
            case 2: tab = "#ordenes"; break;

            default: break;
        }
        console.log(tab)
        $(tab).show();

    });
    $("#FichaDoc").show();
    return "#FichaDoc";
    // return tab;
}


function LimpiarVisorDocumentos() {
    VisorDocumento.IdCuentaAtencion = 0;
    VisorDocumento.IdAtencion=0

    $("#FUADoc,#FUA-A2-Doc").hide();
    $("#ordenes").hide();
    // $(".btnDocumento").attr("data-rec", "");
    // $("#ordenes").attr("data-rec", "");
}

function CerrarVisorDocumentos() {
    VisorDocumento.IdCuentaAtencion = 0;
    VisorDocumento.IdAtencion=0
    
    $('#ordenes').removeClass('active'); 
    $('.btnDocumento').removeClass('active');
    $('iframe').attr('src', '');

    $('#modalDocumentoImprimeEva').modal('hide');
}





function VizualizarModalPdf(ruta) {
    $('#frame-pdf').attr('src', ruta);
    $('#pdfModal').modal('show');
}

async function CerrarModalPdf() {
    let ruta = $('#frame-pdf').attr('src');
    console.log(ruta);
    $('#frame-pdf').attr('src', '');

    let formData = new FormData()
    formData.append('_token', $("meta[name='csrf-token']").attr("content"));
    formData.append('ruta', ruta);

    try {
        datos = await $.ajax({
            method: "POST",
            url: "/Utilitario/EliminarArchivo",
            //contentType: "application/json; charset=utf-8",
            data: formData,
            dataType: "json",
            cache: false,
            processData: false,
            contentType: false,
        });

        $('#pdfModal').modal('hide');
    } catch (error) {
        console.log(JSON.stringify(error))
    }
}

function Cargando(estado) {
    if (estado == 1) {
        $.LoadingOverlay("show");
    } else if (estado == 0) {
        $.LoadingOverlay("hide");
    }

}

function alerta(icono, titulo, mensaje) {
    Swal.fire({
        title: titulo,
        text: mensaje,
        icon: icono,
        allowOutsideClick: false,
    });
}

function valida_hora(valor) {
    if (valor.indexOf(":") != -1) {
        var hora = valor.split(":")[0];
        if (parseInt(hora) > 23) {
            $("#HoraInicioAtencion").val("");
            alerta('warning', '', "Hora incorrecta");
        }
    }
}

function FormatearFecha(FechaInicial) {
    var fecha = new Date(FechaInicial);
    var dia = fecha.getDate();
    var mes = parseInt(fecha.getMonth()) + 1;
    var yyy = fecha.getFullYear();
    if (dia < 10)
        dia = '0' + dia; //agrega cero si el menor de 10
    if (mes < 10)
        mes = '0' + mes;
    fechaP = dia + "/" + mes + "/" + yyy;
    return fechaP;
}


function ConvertirFormatoFecha(FechaInicial) {
    var fecha = FechaInicial.split('/')

    return fecha[2] + '-' + fecha[1] + '-' + fecha[0];
}

function isNull(valorEvaluado, valorReemplazo) {
    if (typeof valorEvaluado == 'undefined' || valorEvaluado === null || valorEvaluado === '' || valorEvaluado === '0' || valorEvaluado === 'null') {

        return valorReemplazo;
    } else {
        return valorEvaluado
    }
}

function isEmpty(obj) {

    var isEmpty = false;

    if (typeof obj == 'undefined' || obj === null || obj === '' || obj === '0' || obj === 'null') {

        isEmpty = true;
    }

    if (typeof obj == 'number' && isNaN(obj)) {
        isEmpty = true;
    }

    if (obj instanceof Date && isNaN(Number(obj))) {
        isEmpty = true;
    }

    return isEmpty;

};
//cambios Gerardo
function CargarDatosRecetas(datos) {
    console.log("valor de datos en cargar",datos)
    var tab = "";
    var countPatCli = 0;  
    $(datos).each(function (i, obj) {
        if (obj.IdReceta != 0) {
            console.log("IdPuntoCarga:",obj.IdPuntoCarga);

            switch (obj.IdPuntoCarga) {
                case '22': VisorReceta.idRecetaTomografia = obj.IdReceta; $("#tomografiaRece").attr("data-rec", obj.IdReceta); tab = "#tomografiaRece"; break;
                case '21': VisorReceta.idRecetaRX = obj.IdReceta; $("#rayosRece").attr("data-rec", obj.IdReceta); tab = "#rayosRece"; break;
                case '20': VisorReceta.idRecetaEcoGene = obj.IdReceta; $("#ecoGeneRece").attr("data-rec", obj.IdReceta); tab = "#ecoGeneRece"; break;
                case '23': VisorReceta.idRecetaEcoObs = obj.IdReceta; $("#ecoObstRece").attr("data-rec", obj.IdReceta); tab = "#ecoObstRece"; break;
                case '11': VisorReceta.idRecetaBs = obj.IdReceta; $("#bancoSangreRece").attr("data-rec", obj.IdReceta); tab = "#bancoSangreRece"; break;
                case '3': VisorReceta.idRecetaAnatPat = obj.IdReceta; $("#anatoPatoRece").attr("data-rec", obj.IdReceta); tab = "#anatoPatoRece"; break;
               case '2': 
               
                        if(obj.IdPuntoCargaLab==29){
                            VisorReceta.idRecetaPatCli = obj.IdReceta; $("#patoClinicaRece_Emergencia").attr("data-rec", obj.IdReceta); tab = "#patoClinicaRece_Emergencia"; break;
                           
                        }
                        if(obj.IdPuntoCargaLab==null){
                            VisorReceta.idRecetaPatCli = obj.IdReceta; $("#patoClinicaRece").attr("data-rec", obj.IdReceta); tab = "#patoClinicaRece"; break;


                            
                        }
                  
                
                case '5': VisorReceta.idRecetaFarm = obj.IdReceta; $("#farmaciaRece").attr("data-rec", obj.IdReceta); $("#farmaciaReceA4").attr("data-rec", obj.IdReceta); tab = "#farmaciaRece, #farmaciaReceA4"; break;
                case '12': VisorReceta.idRecetaInterconsulta = obj.IdReceta; $("#interConRece").attr("data-rec", obj.IdReceta); tab = "#interConRece"; break;
                case '1': VisorReceta.idProcedimiento = obj.idOrden; $("#procedimientos").attr("data-rec", obj.idOrden); $("#procedimientos").attr("data-code", obj.idOrdenPago); tab = "#procedimientos"; break;
               
                default: break;
            }
            $(tab).show();
        }
        console.log(tab);

    });
   
    return tab;
}

function LimpiarVisorRecetas() {
    VisorReceta.idRecetaRX = 0;
    VisorReceta.idRecetaPatCli = 0;
    VisorReceta.idRecetaPatCli_Emergencia = 0;

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

    $(".btnRecetaEme").hide();
    $(".btnRecetaEme").attr("data-rec", "");
    $(".btnRecetaEme").attr("data-code", "");
}

function CerrarVisorRecetas() {
    VisorReceta.idRecetaRX = 0;
    VisorReceta.idRecetaPatCli = 0;
    VisorReceta.idRecetaPatCli_Emergencia = 0;
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
    $('.btnRecetaEme').removeClass('active');
    $('iframe').attr('src', '');

    // window.location = '/registro_atencion';
    $('#modalRecetaImprime1').modal('hide');
}


function showHideTabs(idReceta, tab, code) {
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
}

function showHideTabs(idReceta, tab, code) {
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
}

async function imprimirRecetaConFirma(idCuentaAtencion, idRegistro, code, idDoc, tipo) {
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
}

function DevolverTipoReceta(tipo) {
    var nroReceta = '';
    switch (tipo) {
        case 'REC-F': nroReceta = VisorReceta.idRecetaFarm; break;
        case 'REC-PC': nroReceta = VisorReceta.idRecetaPatCli; break;
        case 'REC-PCE': nroReceta = VisorReceta.idRecetaPatCli_Emergencia; break;
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
}

function FirmarReceta(idCuentaAtencion, idReceta) {
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

                $('.btnRecetaEme').click()
            } else {
                console.error('Error al generar el PDF.');
            }
        },
        error: function (error) {
            console.error('Error en la solicitud AJAX:', error);
        }
    });
    // Cargando(0);
}
async function validarNumEvaluaciones() {
    if ($('#tblEvaluacionesEmergencia').DataTable().rows('.selected').count() >= 1) {
        // Deshabilitar los inputs
        $('#ListaOpcionesEval input').attr('readonly', true);
		$('#examenFisico').addClass('opaco');
        $('#motivo').addClass('opaco');
        $('#motivo').attr('readonly', true);
    }
}

function Eventos() {
    $('#btnCerrarRecetas').on('click', function () {
        CerrarVisorRecetas();
    });
    $('#btnCerrarRecetasV2').on('click', function () {
        CerrarVisorRecetas();
    });
    //===================================CARGAR DOCUMENTO X EVALUACION==================================000

    $('#btnCerrarDocumentos').on('click', function () {
        CerrarVisorDocumentos();
    });

    $('.btnDocumento').on('click', async function () {
        var idBtnDocumento = "#" + $(this).attr('id');
        let tipoDocumento = $(idBtnDocumento).attr("data-name");

        VisorDocumento.idBtnSelect = idBtnDocumento;

        $('#ifrmDocumento').attr('src', '');
        $('.btnDocumento').removeClass('active');
        $('#ordenes').removeClass('active');

        $(idBtnDocumento).addClass('active');
        $('#TituloVisorDocumentos').text("");

        let url = "/sa_general/pdf_hoja_rosada" 
        // if(tipoDocumento=="REC-FUA")
        //     url = "/sa_general/pdf_fua_emergencia"
        // else if(tipoDocumento=="ORD")
        //     url = "/sa_general/pdf_orden_emergencia"
        //  if(tipoDocumento=="REC-HR"){
        //     let url = "/sa_general/pdf_hoja_rosada" 
        //  }
            
        // else if(tipoDocumento=="REC-FUA-A2")
        //     url = "/sa_general/pdf_fua_anexo2_emergencia"

            // EvaluacionEmergencia/informes/generarPDF/' + $('#hdnIdAtencion').val() + '?eval=' + objrowTb.IdNumero
            // url = "ws/sa_general/formato_atencion_emergencia/" + VisorDocumento.IdAtencion.toString()

        await $.ajax({
            url: url,
            datatype: "json",
            data: {idCuentaAtencion: VisorDocumento.IdCuentaAtencion,
                    idAtencion: VisorDocumento.IdAtencion},
            method: "get",
            async: false,
            success: function (res) {
                console.log('data', {idCuentaAtencion: VisorDocumento.IdCuentaAtencion,
                    idAtencion: VisorDocumento.IdAtencion});
                console.log('res.resultado', res.resultado);
                console.log('res.mensaje', res.mensaje);
                console.log('res.pdf', res.pdf);
                if(res.resultado==1){
                    let url = 'data:application/pdf;base64,' +res.pdf;
                    $('#ifrmDocumento').attr('src', url);
                }
                else
                    toastr.error(res.mensaje)
            },
            error: function (msg) {
                console.log("Error en generar formato "+idBtnDocumento)
                toastr.error(msg);
            }
        })
    });


    //-----------------------------------------CARGAR RECETA PDF A LA VISTA-----------------------------------------//
    $('.btnRecetaEme').on('click', async function () {
        var idBtnReceta = "#" + $(this).attr('id');
        //var tipoReceta = $(idBtnReceta).attr("data-name");
        var idReceta = $(idBtnReceta).attr("data-rec");

        console.log('idreceta',idReceta);
        console.log('idBtnReceta',idBtnReceta);
        var idCuentaAtencion = VisorReceta.idCuentaAtencion;

        //$('#button-firma').html(`<button class="btn btn-sm glow_button btn-primary" style="color:white;" onclick="VisorReceta.FirmarReceta(${idCuentaAtencion}, ${idReceta})"><i class="fa fa-edit"></i> </button>`)


        // var codeReceta = $(idBtnReceta).attr("data-code");
        // VisorReceta.codeSelect = codeReceta;
        VisorReceta.idBtnSelect = idBtnReceta;

        // $('#btnifrmReceta').hide();               //KHOYOSI                        
        // $('#btnFirmaRecetaPorLote').hide();               //JELGADO                        
        $('#ifrmRecetaEme').attr('src', '');               //KHOYOSI
        $('.btnRecetaEme').removeClass('active');
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

        //let documentoFirmado = await SeleccionarFirmasDigitales(idCuentaAtencion, idRegistro, idTipoServicio, idEvaluacion, tipo)

        // if (documentoFirmado.length > 0) {
        //     // VizualizarModalPdf(documentoFirmado[0].rutaArchivo);
        //     $('#ifrmReceta').attr('src', documentoFirmado[0].rutaArchivo);

        //     // Abre el modal
        //     $('#pdfModal').modal('show');
        //     Cargando(0)
        //     return false;
        // }

        if (idBtnReceta.trim() === '#farmaciaReceA4'){
            
            $.ajax({
                url: '/Recetas/informes/generarPDFA4/' + idReceta,
                method: 'GET',
                success: function (response) {
                    if (response.pdf_url) {
                        // Coloca la URL del PDF en el src del iframe
                        $('#ifrmRecetaEme').attr('src', response.pdf_url);
    
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

            Cargando(0);
       
        }
         else if(idBtnReceta.trim() === '#interConRece'){
           
            $.ajax({
                url: '/hospitalizacion/SolicitudInterconsultaRecetas/' + idReceta,
                method: 'GET',
                success: function (response) {
                    console.log('respuesta interconsulta',response)
                    
                    if (response.pdf_url) {
                        // Coloca la URL del PDF en el src del iframe
                        $('#ifrmRecetaEme').attr('src', response.pdf_url);
                        
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
            Cargando(0);       
          
       
        }else {  
            $.ajax({
                url: '/Recetas/informes/generarPDF/' + idReceta,
                method: 'GET',
                success: function (response) {
                    if (response.pdf_url) {
                        // Coloca la URL del PDF en el src del iframe
                        $('#ifrmRecetaEme').attr('src', response.pdf_url);
    
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
            Cargando(0);        

         }
        


        
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

        // const firma = await Utilitario.SeleccionarFirmaDigitalV2(procedimientos[0].codeProc)   + var idBtnReceta = "#" + $(this).attr('id');
        //var tipoReceta = $(idBtnReceta).attr("data-name");
        $('#ifrmRecetaEme').attr('src', '');

        // let url = PathServerFiles + firma.rutaArchivo
        var idorden = $("#procedimientos").attr("data-rec");
        var idordenPago = $("#procedimientos").attr("data-code");

        $('.btnRecetaEme').removeClass('active');
        $('#citaRecibo').removeClass('active');
        $('#procedimientos').addClass('active');
        // $('#TituloVisorReceta').append("");
        console.log('numero de ordenn pago',idordenPago);
        if (idordenPago !== undefined)
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
                    $('#ifrmRecetaEme').attr('src', res.pdf_url);
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

        $('#ifrmRecetaEme').attr('src', '');

        let text = "";
        var idCuentaAtencion = $("#citaRecibo").attr("data-rec");
        var idordenPago = $("#citaRecibo").attr("data-code");
        console.log("ordenpago", idordenPago, "idCuentaAtencion:", idCuentaAtencion)
        $('.btnRecetaEme').removeClass('active');
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
                $('#ifrmRecetaEme').attr('src', res.pdf_url);
            },
            error: function (msg) {
                toastr.error(msg);
            }
        })
    })
}
//

async function acreditarSis(IdDocIdentidad,DocPaciente){
    let tiene_sis_activo=0;

    await $.ajax({
        url: `/sa_general/consulta_sis?IdDocIdentidad=${IdDocIdentidad}&DocPaciente=${DocPaciente}`,
        datatype: "json",
        type: "get",
        async: false,
        success: function (res) {
            tiene_sis_activo = res.tiene_sis_activo;
        },
        error: function (msg) {
            console.log(msg)
        }
    });

    return tiene_sis_activo
}

async function ProductosFarmaciaConsultaExterna(){

    let datos = [];
    await $.ajax({
        url: `/sa_general/ProductosFarmaciaConsultaExterna`,
        datatype: "json",
        type: "get",
        async: false,
        success: function (res) {
            if(res.resultado==1){
                datos= res.datos 
            }
        },
        error: function (msg) {
            console.log(msg)
            let message = "";
            if(msg['responseJSON']['message'])
                message = msg['responseJSON']['message'];

            toastr.error("Se encontro un error en listar las farmacias de Consulta Externa. ".message,"ERROR");
        }
    });

    return datos
}

$(document).ready(function () {
    /////////////////////////////////EVENTOS PDF MODAL////////////////////////////////////////////////////
    $('#btnCerrarPdfModal').on('click', function () {
        CerrarModalPdf();
    });
    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    //Variable firma digital
    // console.log('jQuery', jQuery)
    jqFirmaPeru = jQuery;

    Eventos();
    //  validarNumEvaluaciones();


});

async function GenerarDocumento (idRegistro, tipo) {
    
    if(tipo == 'CE') {
        let IdAtencion = idRegistro
        await fetch(
            `sa_general/pdf_ficha_atencion_v2?IdAtencion=${IdAtencion}`,
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
    
                    console.log('que fue mano si entro')
                } else {
                    console.error('Error al generar el PDF.');
                }
            });
    }

    if(tipo == 'REC') {
        let idReceta = idRegistro
        $.ajax({
            url: '/Recetas/informes/generarPDF_V2/' + idReceta,
            method: 'GET',
            success: function (response) {
                if (response.pdf_url) {
                    console.log('Se genero la receta en pdf')
                } else {
                    console.error('Error al generar el PDF.');
                }
            },
            error: function (error) {
                console.error('Error en la solicitud AJAX:', error);
            }
        });
    }

    if(tipo == 'FUA') {

        let IdCuentaAtencion = idRegistro

        await fetch(
            `sa_general/pdf_fua_V2?idCuentaAtencion=`+IdCuentaAtencion,
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
                    
                } else {
                    console.error('Error al generar el PDF.');
                }
                
            });
    }

    
    
}

// FIRMA DIGITAL
function signatureInit() {
    // Aqui se puede poner un preload
    alert("PROCESO INICIADO");
    Cargando(1);

}

function signatureOk() {
    // Cancelar el preload
    alert("DOCUMENTO FIRMADO");
    Cargando(0);

}
function signatureCancel() {
    alert("OPERACION CANCELADA");
    Cargando(0);
}

// Funciones del integrador
function sendParam(params) {
    let conf_params = JSON.stringify({
        "param_url":  window.location.origin + "/firma_digital/param.php",
        "param_token": params,
        "document_extension": "pdf"
    })

    let param_base64 = btoa(conf_params);

    console.log(param_base64)

    // var param = "ew0KICJwYXJhbV91cmwiOiAiaHR0cDovL2xvY2FsaG9zdC9maXJtYS9wYXJhbS5waHAiLA0KICJwYXJhbV90b2tlbiI6ICIxNjI2NDc2OTY3MSIsDQogImRvY3VtZW50X2V4dGVuc2lvbiI6ICJwZGYiDQp9"; //Base 64

    var param = param_base64;
    var port = "48596";
    // var port = "50330";
    //FUNCION DE INICIO DE FIRMA DIGITAL
    startSignature(port, param);
}

function sendParamLote(params) {
    let conf_params = JSON.stringify({
        "param_url":  window.location.origin + "/firma_digital/param_lote.php",
        "param_token": params,
        "document_extension": "pdf"
    })

    let param_base64 = btoa(conf_params);

    console.log(param_base64)

    // var param = "ew0KICJwYXJhbV91cmwiOiAiaHR0cDovL2xvY2FsaG9zdC9maXJtYS9wYXJhbS5waHAiLA0KICJwYXJhbV90b2tlbiI6ICIxNjI2NDc2OTY3MSIsDQogImRvY3VtZW50X2V4dGVuc2lvbiI6ICJwZGYiDQp9"; //Base 64

    var param = param_base64;
    var port = "48596";
    // var port = "50330";
    //FUNCION DE INICIO DE FIRMA DIGITAL
    startSignature(port, param);
}


async function SeleccionarFirmasDigitales(idCuentaAtencion, idRegistro, idTipoServicio, idEvaluacion, tipo) {
    //var resp = [];
    let datos;
    var data = new FormData();

    data.append('_token', $("meta[name='csrf-token']").attr("content"));
    data.append('idCuentaAtencion', idCuentaAtencion);
    data.append('idRegistro', idRegistro);
    data.append('idTipoServicio', idTipoServicio);
    data.append('idEvaluacion', idEvaluacion);
    data.append('tipo', tipo);

    try {
        datos = await
            $.ajax({
                method: "POST",
                url: "/Utilitario/SeleccionarFirmasDigitales",
                data: data,
                dataType: "json",
                cache: false,
                processData: false,
                contentType: false,
            });

        resp = datos.resultado;
    } catch (error) {
        alerta('danger', '', error);
    }
    return resp;
}

// END FIRMA DIGITAL