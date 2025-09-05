var idBtnRecetaSelect = '';
var idRecetaSelect = 0;
var tipoRecetaSelect = '';
var flagEstadoCuenta = false;
var tabSelect = '';

var VisorDocumento = {

    IdCuentaAtencion: 0,
    IdAtencion: 0,

    AbrirVisorDocumentos(IdCuentaAtencion,IdAtencion,formatos) {
        this.LimpiarVisorDocumentos();
        VisorDocumento.IdCuentaAtencion=IdCuentaAtencion
        VisorDocumento.IdAtencion=IdAtencion

        var tab = this.CargarDatosDocumentos(formatos);
        $('#modalDocumentoImprime').modal('show');
        $(tab).click();
        // Admision.InitialCharge()
    },

    CargarDatosDocumentos(formatos) {
        var tab = "";
        console.log(formatos)
        $(formatos).each(function (i, obj) {
            switch (obj) {
                case 1: tab = "#FUADoc,#FUA-A2-Doc"; break;
                case 2: tab = "#ordenes"; break;

                default: break;
            }
            console.log(tab)
            $(tab).show();

        });
        $("#BrazaleteDoc").show();
        return "#BrazaleteDoc";
        // return tab;
    },

    LimpiarVisorDocumentos() {
        VisorDocumento.IdCuentaAtencion = 0;
        VisorDocumento.IdAtencion=0

        $("#FUADoc,#FUA-A2-Doc").hide();
        $("#ordenes").hide();
        // $(".btnDocumento").attr("data-rec", "");
        // $("#ordenes").attr("data-rec", "");
    },

    CerrarVisorDocumentos() {
        VisorDocumento.IdCuentaAtencion = 0;
        VisorDocumento.IdAtencion=0
        
        $('#ordenes').removeClass('active'); 
        $('.btnDocumento').removeClass('active');
        $('iframe').attr('src', '');

        $('#modalDocumentoImprime').modal('hide');
    },

    Eventos() {
        $('#btnCerrarDocumentos').on('click', function () {
            VisorDocumento.CerrarVisorDocumentos();
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

            let url = "/sa_general/pdf_brazalete"
            if(tipoDocumento=="REC-FUA")
                url = "/sa_general/pdf_fua_emergencia"
            else if(tipoDocumento=="ORD")
                url = "/sa_general/pdf_orden_emergencia"
            else if(tipoDocumento=="REC-HR")
                url = "/sa_general/pdf_hoja_rosada"
            else if(tipoDocumento=="REC-FUA-A2")
                url = "/sa_general/pdf_fua_anexo2_emergencia"

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

        $('#ordenes').on('click', async function () { 

            $('#ifrmDocumento').attr('src', '');

            $('.btnDocumento').removeClass('active');
            $('#ordenes').addClass('active');
            
            $.ajax({
                url: "/sa_general/pdf_orden_emergencia",
                datatype: "json",
                data: {idCuentaAtencion: VisorDocumento.IdCuentaAtencion},
                method: "get",
                async: false,
                success: function (res) {
                    if(res.resultado==1){
                        $('#TituloVisorDocumentos').text("N° Orden Pago "+res.idordenPagos);
                        let url = 'data:application/pdf;base64,' +res.pdf;
                        $('#ifrmDocumento').attr('src', url);
                    }
                    else
                        location.reload();
                },
                error: function (msg) {
                    console.log(msg)
                    toastr.error(msg);
                }
            })
        })

    }
}