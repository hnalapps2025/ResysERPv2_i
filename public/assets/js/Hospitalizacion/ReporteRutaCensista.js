var Epicrisis = {
    ValidarBotonClick: 0, //0:consultar,modificar// 1: agregar// 2: admisionar
    Forzar: 0,
    Plugins() {

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

    async ListarAltasSinDiagnosticos(data) {
        Cargando(1)
        oTable_TriajeEmergencia.fnClearTable();
        let token = $('meta[name="csrf-token"]').attr("content");
        await fetch(
            `/hospitalizacion/listarRutaCensista`,
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
                        pacienteFallecidoPDF(resultado)

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
                    width: "15%",
                    data: "Servicio",
                    createdCell: function (td) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "15%",
                    data: "Cama",
                    createdCell: function (td) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "10%",
                    data: "Origen",
                    createdCell: function (td) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "5%",
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
                    width: "10%",
                    data: "FechaUltimaDesocupacion",
                    createdCell: function (td) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "10%",
                    data: "Condicion",
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
            $("#cboTipoReporte").val(0);
            $("#cboServicio").val(0);
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



async function pacienteFallecidoPDF(data) {
    // Obtener el token CSRF de los meta tags
    let token = $('meta[name="csrf-token"]').attr("content");
    try {
        // Realizar la petición POST al servidor
        Cargando(1)
        const response = await fetch(
            "/hospitalizacion/generarPDFRutaCensista",
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


function cargarAltasSinDiagnosticos(){
    const fuenteFinanciamiento  = $("#cboFuenteFinanciamiento").val();
    const fechaInicio           = $("#txtFechaIngreso").val();
    const paciente              = $("#txtPaciente").val();
    const historiaClinica       = $("#txtHistoriaClinica").val();
    const nroCuenta             = $("#txtNroDeCuenta").val();
    const nroCama               = $("#txtNroCama").val();
    const tipoReporte           = $("#cboTipoReporte").val();
    const servicio              = $("#cboServicio").val();
    let data = {};
    
    data.NroHistoriaClinica = parseInt(historiaClinica) ? parseInt(historiaClinica) : 0;;
    data.NroCama = parseInt(nroCama) ? parseInt(nroCama) : 0;
    data.FechaIngreso = fechaInicio;
    data.Paciente = paciente;
    data.FuenteFinanciamiento = parseInt(fuenteFinanciamiento) ? parseInt(fuenteFinanciamiento) : 0;;
    data.NroCuenta = parseInt(nroCuenta) ? parseInt(nroCuenta) : 0;
    data.TipoReporte = parseInt(tipoReporte)
    data.IdServicio = parseInt(servicio) ? parseInt(servicio) : 0;
    Epicrisis.ListarAltasSinDiagnosticos(data);
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

function listarTipoReporte(opcion){
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
                const cboFuenteFinanciamiento = $("#cboTipoReporte");
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

function listarServiciosHospitalizacion(opcion){
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
                const cboFuenteFinanciamiento = $("#cboServicio");
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
    $("#show").hide();
    Epicrisis.Plugins();
    Epicrisis.InitDatablesTriajeEmergencia();


    Epicrisis.InitialCharge();
    Epicrisis.eventos();
    listarFuenteFinanciamiento(27);
    listarTipoReporte(30);
    listarServiciosHospitalizacion(9);
    $("#btnBuscar").on("click", function () {
        if($("#cboTipoReporte").val() == 0 || $("#cboTipoReporte").val() == '' || $("#cboTipoReporte").val() == null){
            toastr.warning("Debe seleccionar el tipo de reporte");
        }
        else{
            cargarAltasSinDiagnosticos();
        }
    });
    
    $("#btnExportarExcel").click(async function () {
        let titulo = "";
        let valor = parseInt($("#cboTipoReporte").val());
        switch(valor){
            case 1:
                titulo = "REPORTE HOSPITALIZADOS CENSISTA 1";
                break;
            case 2: 
                titulo = "REPORTE HOSPITALIZADOS CENSISTA 2";
                break;
            case 3: 
                titulo = "REPORTE DE PACIENTES HOSPITALIZADOS - " + $("#cboServicio option:selected").text();    
                break;
            default:
                titulo = "REPORTE DE PACIENTES HOSPITALIZADOS";    
        }
    
        // ** Crear workbook y hoja de Excel**
        let workbook = new ExcelJS.Workbook();
        let worksheet = workbook.addWorksheet("Hospitalización");
    
        // ** Estilo para el título**
        worksheet.mergeCells("A1:J1"); // Fusionar celdas de A1 a M1
        let tituloCelda = worksheet.getCell("A1");
        tituloCelda.value = titulo;
        tituloCelda.font = { size: 14, bold: true, color: { argb: "FFFFFF" } };
        tituloCelda.alignment = { horizontal: "center", vertical: "middle" };
        tituloCelda.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "4472C4" } }; // Fondo azul

        let headers = [
            "N° Historia","N° Cuenta","Paciente" ,"N° Documento","Edad","Servicio", "Cama", "Origen", "Fecha Ingreso", "Ultima Desocupación","Condición"
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
            "NroHistoriaClinica","CuentaAtencion" ,"Paciente","NroDocumento","Edad","Servicio","Cama","Origen","FechaIngreso","FechaUltimaDesocupacion","Condicion",
        ]; // Asegúrate de que estos nombres coincidan con los de DataTables
        // ** Insertar los datos de la tabla desde la fila 4**
        filas.forEach(row => {
            let rowArray = columnasDeseadas.map(index => row[index]);
            worksheet.addRow(rowArray);

        });
    

        worksheet.columns = [
            { width: 10 },  
            { width: 15 },
            { width: 40 },
            { width: 15 },
            { width: 10 },
            { width: 25 },
            { width: 10 },
            { width: 15 },
            { width: 15 },
            { width: 25 },
            { width: 15 },
        ];


        // ** Guardar y descargar el archivo**
        let buffer = await workbook.xlsx.writeBuffer();
        let blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        let link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "reporte_ruta_censista.xlsx";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    $("#cboTipoReporte").change(function(){
        const valor = $("#cboTipoReporte").val();
        if(valor == 3){
            $("#show").show();
        }
        else{
            $("#show").hide();
            $("#cboServicio").val(0);
            $(".chzn-select").chosen().trigger("chosen:updated");
        }
    })
});
