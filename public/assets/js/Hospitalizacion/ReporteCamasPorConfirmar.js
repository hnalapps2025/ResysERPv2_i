var Epicrisis = {
    ValidarBotonClick: 0, //0:consultar,modificar// 1: agregar// 2: admisionar
    Forzar: 0,
    Plugins() {

        $("#txtFechaIngreso").datepicker({
            todayHighlight: true,
            autoclose: true,
            dateFormat: "yy-mm-dd",
            orientation: "bottom",
        });

        $("#txtFechaInicioAtencion").datepicker({
            todayHighlight: true,
            autoclose: true,
            dateFormat: "yy-mm-dd",
            orientation: "bottom",
        });

        $("#txtFechaAtencionFinBuscar").datepicker({
            todayHighlight: true,
            autoclose: true,
            dateFormat: "yy-mm-dd",
            orientation: "bottom",
        });

        $("#txtFechaTransferencia").datepicker({
            todayHighlight: true,
            autoclose: true,
            dateFormat: "yy-mm-dd",
            orientation: "bottom",
        });

        var fecha = new Date();
        var dia = fecha.getDate();
        var mes = parseInt(fecha.getMonth()) + 1;
        var yyy = fecha.getFullYear();
        if (dia < 10)
            dia = '0' + dia; //agrega cero si el menor de 10
        if (mes < 10)
            mes = '0' + mes
        fechaP = dia + "/" + mes + "/" + yyy
        fechaHoy = yyy + "-" + mes + "-" + dia

        //$('#txtFechaAlta').val(fechaP);        

        $('#txtFechaHoraIngreso').datepicker({
            todayHighlight: true,
            autoclose: true,
            orientation: "bottom"
        });

        $('#txtFechaHoraEgreso').datepicker({
            todayHighlight: true,
            autoclose: true,
            orientation: "bottom"
        });



        var hora = fecha.getHours();
        var min = fecha.getMinutes();
        if (hora < 10)
            hora = '0' + hora;
        if (min < 10)
            min = '0' + min
        horaP = hora + ':' + min;
        $('#txtFechaHoraIngreso').val(fechaP+horaP);
        $('#txtFechaHoraEgreso').val(fechaP+horaP);
        $("#txtFechaInicioAtencion").val(fechaHoy);
        $("#txtFechaAtencionFinBuscar").val(fechaHoy);
        $('#txtFechaIngreso').val(fechaHoy);

        $("#txtFechaHoraIngreso").inputmask({
            alias: "datetime",
            inputFormat: "HH:MM"
        });

        $("#txtFechaHoraEgreso").inputmask({
            alias: "datetime",
            inputFormat: "HH:MM"
        });
    },

    InitialCharge() {
        $("#btnLimpiar").trigger("click");
        let fechaP = Epicrisis.RetornarFechaActual();

        $("#txtFechaTriajeBusq").datepicker("setDate", fechaP);
    },

    RetornarFechaActual() {
        let fecha = new Date();
        let dia = fecha.getDate();
        let mes = parseInt(fecha.getMonth()) + 1;
        let yyy = fecha.getFullYear();
        if (dia < 10) dia = "0" + dia; //agrega cero si el menor de 10
        if (mes < 10) mes = "0" + mes;
        let fechaP = dia + "/" + mes + "/" + yyy;
        return fechaP;
    },

    async ListarHospitalizadosCamasPorConfirmar(data) {
        Cargando(1)
        oTable_TriajeEmergencia.fnClearTable();
        let token = $('meta[name="csrf-token"]').attr("content");
        await fetch(
            `/hospitalizacion/listarHospitalizadosCamasPorConfirmar`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    _token: token,
                    data: data,
                }),
            }
        )
            .then((res) => res.json())
            .catch((error) =>Swal.fire({title: "Se ha encontrado un error"+error,icon: "error",draggable: true}))
            .then((res) => {
                if (res.resultado == 1) {
                    if (res.data.length > 0) {
                        let resultado = res.data;
                        oTable_TriajeEmergencia.fnAddData(res.data);
                        pacienteHospitalizadoPorServicioPDF(resultado)

                    }
                }
            });

            Cargando(0);
    },

    InitDatablesTriajeEmergencia() {
        var parms = {
            destroy: true,
            bFilter: false,
            searching : true,
            order: [[0, "desc"]],
            scrollX: true,
            columns: [
                {
                    width: "10%",
                    data: "NroHistoriaClinica",
                    createdCell: function (td) {
                        $(td).attr("style", "left");
                    },
                },
                {
                    width: "15%",
                    data: "Paciente",
                    createdCell: function (td) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "10%",
                    data: "Cama",
                    createdCell: function (td) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "5%",
                    data: "Origen",
                    createdCell: function (td) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "10%",
                    data: "Edad",
                    createdCell: function (td) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "10%",
                    data: "FechaIngreso",
                    createdCell: function (td) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "15%",
                    data: "Observacion",
                    createdCell: function (td) {
                        $(td).attr("align", "left");
                    },
                }
            ],
        };

        oTable_TriajeEmergencia = $("#tblHospitalizadosCamaPorConfirmar").dataTable(parms);
    },
    eventos() {
        $(".search").keypress(function (e) {
            if (e.which == 13) {
                e.preventDefault();
                $(".search").blur();
            }
        });

        $("#IdDocIdentidad").on("change", function () {
            if ($(this).val() == 1) {
                $("#DocPaciente").attr("maxlength", 10);
                $("#DocPaciente").val(
                    document.getElementById("DocPaciente").value.substring(0, 8)
                );
            } else $("#DocPaciente").attr("maxlength", 20);
        });

        $("#chkTodoTriajeBusq").on("click", function () {
            if ($("#chkTodoTriajeBusq").is(":checked")) {
            } else {
                let fechaP = Epicrisis.RetornarFechaActual();
                $("#txtFechaTriajeBusq").datepicker("setDate", fechaP);
            }
        });

        $("#formulario_triaje").on("submit", function (e) {
            e.preventDefault();
            if (
                $("#paciente_nuevo").val() == 1 &&
                Epicrisis.Forzar == 0 &&
                Epicrisis.ValidarDoc == 0
            ) {
                return false;
            }
        });

        $("#btnLimpiar").on("click", function () {
            $("#txtNroDeCuenta").val("");
            $("#txtNroCama").val("");
            $("#txtHistoriaClinica").val("");
            $("#txtPaciente").val("");
            $("#cboFuenteFinanciamiento").val(0);

            $(".chzn-select").chosen().trigger("chosen:updated");
        });

        $("#tblHospitalizadosCamaPorConfirmar tbody").on("click", "tr", function () {
            if ($(this).hasClass("selected")) {
                $(this).removeClass("selected");
            } else {
                oTable_TriajeEmergencia
                    .$("tr.selected")
                    .removeClass("selected");
                $(this).addClass("selected");
            }
        });
        $(".nav-tabs a").on("shown.bs.tab", function (event) {
            DtDiagnosticos.columns.adjust().draw();
        });
    }
};



async function pacienteHospitalizadoPorServicioPDF(data) {
    // Obtener el token CSRF de los meta tags
    let token = $('meta[name="csrf-token"]').attr("content");
    try {
        // Realizar la petición POST al servidor
        Cargando(1)
        const response = await fetch(
            "/hospitalizacion/generarPDFPacienteHospitizadoCamasPorConfirmar",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": token,
                },
                body: JSON.stringify({
                    _token: token,
                    paciente: data,
                }),
            }
        );

        // Verificar si la respuesta es un PDF
        if (response.headers.get("content-type").includes("application/pdf")) {
            // Convertir la respuesta a blob
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            document.getElementById("pdfViewer").src = url;
            Cargando(0)
            // Crear un enlace temporal y activar la descarga
            /*const a = document.createElement("a");
            a.href = url;
            a.download = "reporte_hospitalizados_por_servicio.pdf";
            document.body.appendChild(a);
            a.click();

            // Limpieza de recursos
            window.URL.revokeObjectURL(url);
            a.remove();*/
        } else {
            // Si no es PDF, manejar como JSON (probablemente un error)
            const data = await response.json();
            if (data.error) {
                console.error("Error:", data.error);
            }
        }
    } catch (error) {
        console.error("Error al descargar el PDF:", error);
    }
}


function cargarHospitalizadosPorCamasPorConfirmar(){
    const fuenteFinanciamiento  = $("#cboFuenteFinanciamiento").val();
    const fechaInicio           = $("#txtFechaIngreso").val();
    const paciente              = $("#txtPaciente").val();
    const historiaClinica       = $("#txtHistoriaClinica").val();
    const nroCuenta             = $("#txtNroDeCuenta").val();
    const nroCama               = $("#txtNroCama").val();

    let data = {};
    
    data.NroHistoriaClinica = historiaClinica ? historiaClinica : 0 ;
    data.NroCama = nroCama ? nroCama : 0;
    data.FechaIngreso = fechaInicio;
    data.Paciente = paciente;
    data.FuenteFinanciamiento = fuenteFinanciamiento;
    data.NroCuenta = nroCuenta ? nroCuenta :0;

    Epicrisis.ListarHospitalizadosCamasPorConfirmar(data);
}

function listarFuenteFinanciamiento(opcion){
    let token = $('meta[name="csrf-token"]').attr("content");
    fetch("/hospitalizacion/listarCombos", {
        method: "POST", // Método HTTP
        headers: {
            "Content-Type": "application/json", // Especifica el tipo de contenido
        },
        body: JSON.stringify({
            Opcion: opcion,
            _token: token,
        }), // Convierte los parámetros a una cadena JSON
    })
        .then((res) => res.json())
        .catch((error) => console.log(error))
        .then((res) => {
            if (Array.isArray(res.data)) {
                const resultado = res.data;
                const cboFuenteFinanciamiento = $("#cboFuenteFinanciamiento");
                resultado.forEach((item) => {
                    // Crear una opción por cada elemento recibido
                    const option = $("<option>")
                        .val(item.codigo) // Establecer el valor de la opción
                        .text(item.valor); // Establecer el texto de la opción
                        cboFuenteFinanciamiento.append(option); // Agregar la opción al combo
                        //cboServicioTransferido.append(option);
                });
                $(".chzn-select").chosen().trigger("chosen:updated");
            }
        });

}



$(document).ready(function () {
    Epicrisis.Plugins();
    Epicrisis.InitDatablesTriajeEmergencia();

    Epicrisis.InitialCharge();
    Epicrisis.eventos();
    listarFuenteFinanciamiento(27);
    $("#btnBuscar").on("click", function () {

        if($("#txtFechaIngreso").val().length ===0){
            toastr.warning("Debe seleccionar una fecha correcta","Mensaje de Error - RESYS");
            return false;
        }
        else {
            cargarHospitalizadosPorCamasPorConfirmar();
        }

    });
    
    $("#btnExportarExcel").click(async function () {
        let titulo =
            "REPORTE DE HOSPITALIZADOS PACIENTES CAMAS POR CONFIRMAR FECHA " +
            $("#txtFechaIngreso").val();
    
        // ** Crear workbook y hoja de Excel**
        let workbook = new ExcelJS.Workbook();
        let worksheet = workbook.addWorksheet("Hospitalización");
    
        // ** Estilo para el título**
        worksheet.mergeCells("A1:K1"); // Fusionar celdas de A1 a M1
        let tituloCelda = worksheet.getCell("A1");
        tituloCelda.value = titulo;
        tituloCelda.font = { size: 14, bold: true, color: { argb: "FFFFFF" } };
        tituloCelda.alignment = { horizontal: "center", vertical: "middle" };
        tituloCelda.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "4472C4" } }; // Fondo azul

        let headers = [
            "N° Historia","N° Cuenta" ,"Paciente","N° Documento","Edad","Servicio","Cama","Origen","Fecha Ingreso", "Observacion", "Fuente Finaciamiento"
        ];
    
        // ** Obtener la tabla HTML**
        let table = $("#tblHospitalizadosCamaPorConfirmar").DataTable();

        let filas = table.rows().data().toArray(); // Solo filas del cuerpo
        //let headers = Array.from(tabla.querySelectorAll("thead th")).map(th => th.innerText.trim());
    
        // ** Insertar una fila vacía después del título**
        worksheet.addRow([]);
        // ** Insertar encabezados en la fila 3 con estilos**
        let headerRow = worksheet.addRow(headers);
        headerRow.eachCell(cell => {
            cell.font = { bold: true, color: { argb: "000000" } }; // Negrita y texto negro
            cell.alignment = { horizontal: "center", vertical: "middle" };
            cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "D9E1F2" } }; // Fondo celeste
            cell.border = { top: { style: "thin" }, bottom: { style: "thin" } };
        });
    

        let columnasDeseadas = [
            "NroHistoriaClinica","CuentaAtencion" ,"Paciente","NroDocumento","Edad","Servicio","Cama","Origen","FechaIngreso","Observacion","TipoFinanciamiento"
        ]; // Asegúrate de que estos nombres coincidan con los de DataTables
        // ** Insertar los datos de la tabla desde la fila 4**
        filas.forEach(row => {
            let rowArray = columnasDeseadas.map(index => row[index]);
            worksheet.addRow(rowArray);
            /*let rowArray = Object.values(row); // Convierte objeto a arreglo
            console.log(worksheet);
            worksheet.addRow(rowArray);*/

        });
    
        // ** Ajustar ancho de columnas manualmente (para evitar anchos excesivos)**
        //worksheet.columns = headers.map(() => ({ width: 30 })); // Establece un ancho fijo de 15
    
        worksheet.columns = [
            { width: 10 },  
            { width: 10 },
            { width: 40 },
            { width: 10 },
            { width: 5 },
            { width: 35 },
            { width: 5 },
            { width: 10 },
            { width: 15 },
            { width: 15 },
            { width: 25 }
        ];


        // ** Guardar y descargar el archivo**
        let buffer = await workbook.xlsx.writeBuffer();
        let blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        let link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "reporte_hospitalizados_camas_por_corfirmar.xlsx";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});
