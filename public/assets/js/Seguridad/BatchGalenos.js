
var Seguridad = {
    InitialCharge() {
        $("#btnLimpiar").trigger("click");
        $("#txtFechaModificacion").datepicker({
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
        fechaP = dia + "/" + mes + "/" + yyy;
        fechaHoy = yyy + "-" + mes + "-" + dia

        $("#txtFechaModificacion").val(fechaHoy);
    },
    DataTableBatch(){

        var parms = {
            destroy: true,
            bFilter: false,
            searching : true,
            ordering: true,
            scrollX: true,
            columns: [
                {
                    width: "10%",
                    targets: 2,
                    data: "Dispositivo",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "10%",
                    targets: 2,
                    data: "VersionGalenos",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "10%",
                    targets: 2,
                    data: "FechaActualizacion",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                }
            ],
        };

        o_Table_Batch = $("#tbBatch").dataTable(parms);

    },
    async ListarBatch(data) {
        Cargando(1);
        o_Table_Batch.fnClearTable();
        let token = $('meta[name="csrf-token"]').attr("content");
        await fetch(
            `/seg/listar_batch`,
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
            .catch((error) => console.log(error))
            .then((res) => {
                if (res.resultado == 1) {
                    if (res.data.length > 0) {
                        o_Table_Batch.fnAddData(res.data);
                    }
                }
            });
        Cargando(0)    
    },
    LimpiarCampos(){
        $("#txtDispositivos").val("");
    }
}

function buscarBatch(){
    const dispositivo  = $("#txtDispositivos").val();
    const fechaModificacion = $("#txtFechaModificacion").val();
    let data = {};

    data.Dispositivos= dispositivo;
    data.FechaModificacion = fechaModificacion;
    Seguridad.ListarBatch(data);
}

$(document).ready(function () {
    Seguridad.InitialCharge();
    Seguridad.DataTableBatch();
    buscarBatch();

    $("#btnBuscarBatch").click(function(){
        buscarBatch();
    });

    $("#btnExportarExcel").click(async function () {
        let titulo ="REPORTE DE DISPOSITIVOS Y VERSIONES DE GALENOS";
    
        // ** Crear workbook y hoja de Excel**
        let workbook = new ExcelJS.Workbook();
        let worksheet = workbook.addWorksheet("Seguridad");
    
        // ** Estilo para el título**
        worksheet.mergeCells("A1:J1"); // Fusionar celdas de A1 a M1
        let tituloCelda = worksheet.getCell("A1");
        tituloCelda.value = titulo;
        tituloCelda.font = { size: 14, bold: true, color: { argb: "FFFFFF" } };
        tituloCelda.alignment = { horizontal: "center", vertical: "middle" };
        tituloCelda.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "4472C4" } }; // Fondo azul

        let headers = [
            "Dispositivo", "Version", "Fecha Actualizacion"
        ];
    
        // ** Obtener la tabla HTML**
        let table = $("#tbBatch").DataTable();

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
            "Dispositivo", "VersionGalenos", "FechaActualizacion" 
        ]; 

        filas.forEach(row => {
            let rowArray = columnasDeseadas.map(index => row[index]);
            worksheet.addRow(rowArray);
            /*let rowArray = Object.values(row); // Convierte objeto a arreglo
            console.log(worksheet);
            worksheet.addRow(rowArray);*/

        });
        workbook.creator = 'HNAL- RESYS'; 
        workbook.created = new Date();
    
        // ** Ajustar ancho de columnas manualmente (para evitar anchos excesivos)**
        //worksheet.columns = headers.map(() => ({ width: 30 })); // Establece un ancho fijo de 15
    
        worksheet.columns = [
            { width: 13 },  // N° Cuenta
            { width: 13 },  // N° Doc
            { width: 18 },  // Paciente
        ];


        // ** Guardar y descargar el archivo**
        let buffer = await workbook.xlsx.writeBuffer();
        let blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        let link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "reporte_batch_galenos.xlsx";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    $("#btnLimpiar").on("click", function () {
        Seguridad.LimpiarCampos();
    });
})