let Auditoria = {

    Plugin: () => {
        $("#txtFechaInicio").datepicker({
            todayHighlight: true,
            autoclose: true,
            orientation: "bottom",
            dateFormat: "dd/mm/yy",
        });
        $("#txtFechaHasta").datepicker({
            todayHighlight: true,
            autoclose: true,
            orientation: "bottom",
            dateFormat: "dd/mm/yy",
        });
    },

    InitialCharge: async() => {
        $("#btnLimpiarFiltro").trigger("click");

        FechaActual= getFechaActual()
        $("#txtFechaInicio").datepicker("setDate", FechaActual);
        $("#txtFechaHasta").datepicker("setDate", FechaActual);

        $("#btnBuscarAtenciones").trigger("click");
    },

    ListaAtencionesParaAuditar: async (
        NroHistoriaClinica,
        IdCuentaAtencion,
        NroDocumento,
        IdMedico,
        FechaInicio,
        FechaHasta,
        IdServicio
    ) => {
        Cargando(1)
        await fetch(
            `/sis/ListaAtencionesParaAuditar?NroHistoriaClinica=${NroHistoriaClinica}&IdCuentaAtencion=${IdCuentaAtencion}&NroDocumento=${NroDocumento}&IdMedico=${IdMedico}&FechaInicio=${FechaInicio}&FechaHasta=${FechaHasta}&IdServicio=${IdServicio}`,
            {
                method: "GET", 
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
            .then((res) => res.json())
            .catch((error) => {
                console.error("Error:", error);
                Cargando(0)
                toastr.error(error,"Error")
            })
            .then((res) => {

                if (res.resultado == 1) {
                    if (res.data.length > 0) {
                        oTable_auditoria.fnAddData(res.data);
                    }
                }
                else if(res.resultado == 3){
                    location.reload();
                }
            });
        Cargando(0)
    },

    InitDatablesAuditoria: () => {
        var parms = {
            ordering: true,
            info: false,
            order:[[2, 'asc']],
            scrollX: true,
            columns: [
                {
                    width: "5%",
                    targets: 0,
                    data: "IdCuentaAtencion",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "center");
                    },
                },
                {
                    width: "5%",
                    targets: 1,
                    data: "NroHistoriaClinica",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "center");
                    },
                },
                {
                    width: "7%",
                    targets: 2,
                    data: "FechaIngreso2",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "center");
                    },
                },
                {
                    width: "20%",
                    targets: 3,
                    data: "Consultorio",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "20%",
                    targets: 4,
                    data: "Medico",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "5%",
                    targets: 5,
                    data: "NroDocumento",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "center");
                    },
                },
                {
                    width: "20%",
                    targets: 6,
                    data: "Paciente",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
            ],
        };

        var tableWrapper = $("#tblAtencionesAuditoria"); // datatable creates the table wrapper by adding with id {your_table_id}_wrapper
        oTable_auditoria = $("#tblAtencionesAuditoria").dataTable(parms);
    },

    Events: () => {
        $("#btnBuscarAtenciones").on("click", async() => {
            oTable_auditoria.fnClearTable();

            if($("#txtFechaInicio").val()!='' && $("#txtFechaHasta").val()==''){
                toastr.error('Si ingresa la fecha de inicio debe ingresar la fecha hasta')
                return false
            }

            if($("#txtFechaInicio").val()=='' && $("#txtFechaHasta").val()!=''){
                toastr.error('Si ingresa la fecha hasta debe ingresar la fecha de inicio')
                return false
            }
            
            await Auditoria.ListaAtencionesParaAuditar(
                $("#txtHistoria").val(),
                $("#txtCuenta").val(),
                $("#txtNroDocumento").val(),
                $("#cboMedicos").val(),
                $("#txtFechaInicio").val(),
                $("#txtFechaHasta").val(),
                $("#cboConsultorio").val()
            );
        });

        $("#CerrarVisorDocumento").on("click", () => {
            $("#visorDocumento").attr("src", "");
            $('#modalVisorDocumento').modal('hide');
        });

        $("#tblAtencionesAuditoria tbody").on("click","tr", async function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTable_auditoria.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            }
        });
        
        $("#btnConsultarAtenciones").on("click", function(){
            var objrow = oTable_auditoria.api(true).row('.selected').data();
            var row = oTable_auditoria.fnGetData(objrow);

            if (isEmpty(objrow)) {
                toastr.error('Selecciona un registro')
                return false
            }
            if(row.IdEstadoCita!=2){
                toastr.error('La cita aun no se encuentra atendida')
                return false
            }
            if(!row.IdCuentaFua){
                toastr.error('No se encontro FUA en la tabla SisFuaAtencion')
                return false
            }
            
            $('#modalVisorDocumento').modal('show')
        })

        $('#modalVisorDocumento').on('show.bs.modal', async function () {
            var objrow = oTable_auditoria.api(true).row($(this).parents("tr")[0]).index();
            var row = oTable_auditoria.fnGetData(objrow);
            console.log(row.IdCuentaFua)
            Cargando(1)

            let idCuentaAtencion = row.IdCuentaAtencion
            let idRegistro = row.IdAtencion
            let idTipoServicio = 1
            let idEvaluacion = 0
            let tipo = 'FUA'

            let documentoFirmado = await SeleccionarFirmasDigitales(idCuentaAtencion, idRegistro, idTipoServicio, idEvaluacion, tipo)

            if(documentoFirmado.length > 0) {
                $('#visorDocumento').attr('src', documentoFirmado[0].rutaArchivo);
            }
            else{
                await fetch(
                    `/sa_general/pdf_fua?idCuentaAtencion=`+row.IdCuentaAtencion,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                )
                    .then((res) => res.json())
                    .catch((error) => toastr.error("Error:", error))
                    .then((res) => {
                        if (res.pdf_url) {
                            $('#visorDocumento').attr('src', res.pdf_url);
                        } else {
                            console.error('Error al generar el PDF.');
                        }
                    });
            }

            tipo = 'CE';

            documentoFirmado = await SeleccionarFirmasDigitales(idCuentaAtencion, idRegistro, idTipoServicio, idEvaluacion, tipo)

            if(documentoFirmado.length > 0) {
                $('#visorDocumento2').attr('src', documentoFirmado[0].rutaArchivo);
            }
            else{
                await fetch(
                    `/sa_general/pdf_ficha_atencion?IdAtencion=${row.IdAtencion}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                )
                    .then((res) => res.json())
                    .catch((error) => toastr.error("Error:", error))
                    .then((res) => {
                        if (res.pdf_url) {
                            $('#visorDocumento2').attr('src', res.pdf_url);
                        } else {
                            console.error('Error al generar el PDF.');
                        }
                    });
            }

            Cargando(0)
		});

        $("#btnLimpiarFiltro").on("click", function(){
            $("#txtHistoria").val("");
            $("#txtCuenta").val("");
            $("#txtNroDocumento").val("");
            $("#cboMedicos").val("0");
            $("#txtFechaInicio").val("");
            $("#txtFechaHasta").val("");
            $("#cboConsultorio").val("0");

            $('.chzn-select').chosen().trigger("chosen:updated");
        })
    },

}
$(document).ready(function() {
    Auditoria.Plugin()
    Auditoria.InitialCharge()

    Auditoria.InitDatablesAuditoria();

    Auditoria.Events()
})
