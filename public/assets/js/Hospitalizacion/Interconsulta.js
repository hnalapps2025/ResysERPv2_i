function obtenerVariables() {
    return {
        IdAtencion: $('#hdnIdAtencion').val(),
        IdCuentaAtencion: $("#hdnIdCuentaAtencion").val(),
        IdPaciente: $("#hdIdPaciente").val(),
        IdMedicoLogeado: $("#hdnIdMedicoLogeado").val(),
        IdUsuarioLogeado: $("#hdnIdUsuarioLogeado").val(),
        NroEvaluacion: 0,
        IdServicio: $("#hdnIdServicio").val(),
        IdCama: $("#hdnIdCama").val(),
        IdTipoFinanciamiento: $("#hdIdTipoFuenteFian").val(),
    };
}

// Uso:
var Variables = obtenerVariables();

var Interconsulta = {
    Plugins() {

    },

    InitialCharge() {

    },

    // ======================================================== Tabla Principal ========================================================
    InitDatablesInterconsultasHospitalizacion() {
        var parms = {
            destroy: true,
            bFilter: true,
            order: [[0, "desc"]],
            ordering: false,
            scrollX: true,
            dom: 'tip', 
            columns: [
                {
                    width: "1%",
                    data: "idReceta",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "center");
                    },
                },
                {
                    width: "5%",
                    data: "FechaRecetaMedica",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "5%",
                    data: "FechaRespuesta",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },                
                {
                    width: "1%",
                    data: "idCuentaAtencion",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "1%",
                    data: "NroHistoriaClinica",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "5%",
                    data: "IdDocIdentidad",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                    visible: false,
                },
                {
                    width: "5%",
                    data: "TipoDoc",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                    visible: false,
                },
                {
                    width: "2%",
                    data: "NroDocumento",
                    render: function (data, type, row) {
                        if (type === "display") {
                            return `${row.TipoDoc || ""} ${data || ""}`;
                        }
                        return data;
                    },
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "12%",
                    data: "ApellidoPaterno",
                    render: function (data, type, row) {
                        if (type === "display") {
                            return `${data || ""} ${
                                row.ApellidoMaterno || ""
                            } ${row.Nombres || ""}`;
                        }
                        return data;
                    },
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "5%",
                    data: "ApellidoMaterno",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                    visible: false,
                },
                {
                    width: "5%",
                    data: "Nombres",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                    visible: false,
                },
                {
                    width: "12%",
                    data: "Medico",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "5%",
                    data: "ServicioEgreso",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                    visible: false,
                },
                {
                    width: "5%",
                    data: "CamaEgreso",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                    visible: false,
                },
                {
                    width: "5%",
                    data: "Especialidad",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "1%",
                    data: "IdPuntoCarga",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                    visible: false,
                },
                {
                    width: "5%",
                    data: "PuntoCarga",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "5%",
                    data: "IdMedico",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                    visible: false,
                },
                {
                    width: "5%",
                    data: "idMedicoReceta",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                    visible: false,
                },
                {
                    width: "5%",
                    data: "IdEmpleado",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                    visible: false,
                },

                {
                    width: "5%",
                    data: "movimiento",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                    visible: false,
                },
                {
                    width: "5%",
                    data: "boleta",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                    visible: false,
                },
                {
                    width: "5%",
                    data: "idEstado",
                    name: "idEstado",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                    visible: false,
                },
                {
                    width: "2%",
                    data: "estadoReceta",
                    render: function (data, type, row) {
                        let estadoColor = "";
                
                        // Si el estado es Pendiente (1), verificar si han pasado más de 24 horas
                        if (row.idEstado == "1") {
                            // Convertir FechaRecetaMedica de "dd/mm/yyyy hh:mm" a Date
                            let [datePart, timePart] = row.FechaRecetaMedica.split(" ");
                            let [day, month, year] = datePart.split("/");
                            let [hours, minutes] = timePart.split(":");
                            let recetaDate = new Date(year, month - 1, day, hours, minutes);
                
                            let ahora = new Date();
                            let diferenciaHoras = (ahora - recetaDate) / (1000 * 60 * 60);
                
                            if (diferenciaHoras > 24) {
                                // Pendiente con más de 24 horas
                                estadoColor = "background-color: #dc3545; color: white;";
                            } else {
                                // Pendiente reciente
                                estadoColor = "background-color: #ffc107; color: black;";
                            }
                        } else {
                            switch (row.idEstado) {
                                case "0":
                                    estadoColor = "background-color: #dc3545; color: white;"; // Anulado
                                    break;
                                case "2":
                                    estadoColor = "background-color: #17a2b8; color: white;"; // Atendido
                                    break;
                                case "3":
                                    estadoColor = "background-color: #28a745; color: white;"; // Con boleta
                                    break;
                                default:
                                    estadoColor = "background-color: #6c757d; color: white;"; // Desconocido
                                    break;
                            }
                        }
                
                        return `<span style="${estadoColor} padding: 5px 10px; border-radius: 5px; display: inline-block; font-size: 12px;">${data}</span>`;
                    },
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "center");
                    },
                },

                { //Solicitud
                    width: "1%",
                    data: null,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "center");
                    },
                    render: function (data, type, row, meta) {
                        let linkPDF = "";
                        switch (row.IdPuntoCarga) {
                            case "12": // Interconsultas
                                linkPDF = `hospitalizacion/SolicitudInterconsulta/${row.idReceta}?PuntoCarga=${row.IdPuntoCarga}&NroIC=${row.idReceta}`;
                                break;
                            case "5": // Farmacia
                                linkPDF = `Recetas/informes/generarPDFA4HOSP/${row.idReceta}`;
                                break;
                            default:
                                linkPDF = `Recetas/informes/generarPDFHOSP/${row.idReceta}`;
                                break;
                        }
                        return `<button class="btn btn-warning btn-sm ver-pdfSolicitud" data-url="/${linkPDF}">
                                        <i class="fa fa-file-pdf-o" aria-hidden="true"></i>
                                        <span class="sr-only">Ver PDF</span>
                                    </button>`;
                    },
                },
                { // Respuesta
                    width: "1%",
                    data: null,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "center");
                    },
                    render: function (data, type, row, meta) {
                        if (row.idEstado != "2") {
                            return ""; // No mostrar nada si no está atendido
                        }

                        let linkPDF = "";
                        switch (row.IdPuntoCarga) {
                            case "12": // Interconsultas
                                linkPDF = `hospitalizacion/RespuestaInterconsulta/${row.idReceta}?PuntoCarga=${row.IdPuntoCarga}&NroIC=${row.idReceta}`;
                                break;
                            case "5": // Farmacia
                                linkPDF = `Recetas/informes/generarPDFA4HOSP/${row.idReceta}`;
                                break;
                            default:
                                linkPDF = `Recetas/informes/generarPDFHOSP/${row.idReceta}`;
                                break;
                        }

                        return `<button class="btn btn-warning btn-sm ver-pdfRespuesta" data-url="/${linkPDF}">
                                    <i class="fa fa-file-pdf-o" aria-hidden="true"></i>
                                    <span class="sr-only">Ver PDF</span>
                                </button>`;
                    },
                },                
            ],
            rowCallback: function (row, data) {
                $(row).css("font-size", "12px");
            },
        };

        oTable_InterconsultasHospitalizacion =
            $("#tbInterconsultas").dataTable(parms);
    },

    ListarInterconsultasHospitalizacionFiltrar(
        NroOrdenMedica,
        NroHistoria,
        NroDocumento,
        Apellidos,
        FechaSolicitud,
        IdEspecialidad
    ) { 
        oTable_InterconsultasHospitalizacion.fnClearTable();
        
        let url = `/hospitalizacion/ListarInterconsultasHospitalizacionFiltrar?NroOrdenMedica=${NroOrdenMedica}&NroHistoria=${NroHistoria}&NroDocumento=${NroDocumento}&Apellidos=${Apellidos}&IdEspecialidad=${IdEspecialidad}`;
    
        if (FechaSolicitud) {
            url += `&FechaSolicitud=${FechaSolicitud}`;
        }
    
        fetch(url)
            .then((res) => res.json())
            .catch((error) => console.error(error))
            .then((res) => {
                if (res.resultado == 1) {
                    if (res.data.length > 0) {
                        oTable_InterconsultasHospitalizacion.fnAddData(res.data);
                    }
                } else {
                    toastr.error(res.mensaje);
                    if (res.resultado == 3) {
                        window.location = "/hospitalizacion/interconsulta";
                    }
                }
            });
    },
    
    LimpiarCampos() {
        $('#txtRecetaBusq').val('');
        $('#txtHistoriaBusq').val('');
        $('#txtNroDocBusq').val('');
        $('#txtApellidosBusq').val('');
        $('#txtFechaSolicitud').val('');
        $('#IdEspecialidad').val('').trigger('chosen:updated');
    },

    eventos() {

        $('#btnLimpiar').on('click', function () {
            Interconsulta.LimpiarCampos();
        });

        $("#btnBuscar").on("click", function () {
            // Validación de campos vacíos
            if (
                $("#txtRecetaBusq").val() == "" &&
                $("#txtHistoriaBusq").val() == "" &&
                $("#txtNroDocBusq").val() == "" &&
                $("#txtApellidosBusq").val() == "" &&
                $("#IdEspecialidad").val() == ""
            ) {
                toastr.error("Ingrese al menos un valor para la búsqueda");
                return false; // Detener la ejecución si no hay datos
            }
        
            // Llamada a la función de búsqueda
            Interconsulta.ListarInterconsultasHospitalizacionFiltrar(
                $("#txtRecetaBusq").val(),
                $("#txtHistoriaBusq").val(),
                $("#txtNroDocBusq").val(),
                $("#txtApellidosBusq").val(),
                $("#txtFechaSolicitud").val(), // Puede estar vacío
                $("#IdEspecialidad").val()
            );
        });

        $('#btnResponderInterconsulta').on('click', function () {
            // Verifica que se haya seleccionado un registro
            var objrow = oTable_InterconsultasHospitalizacion.api(true).row('.selected').data();
            if (isEmpty(objrow)) {
                Utilitario.alerta("info","","Por favor seleccione un registro.");
                return;
            }

            if (Number(objrow.idEstado) > 1) {
                Utilitario.alerta("info", "", "La interconsulta ya ha sido respondida.");
                return;
            }

            RespuestaIC.LimpiarCampos();
            RespuestaIC.buscarCuenta(objrow.idCuentaAtencion);
            RespuestaIC.buscarInterconsulta(objrow.idReceta);
            $("#hdIdSolicitudInterconsulta").val(objrow.idReceta);
            
            $('#modalRespuestaInterconsulta').modal('show').on('shown.bs.modal', function () {
                $.fn.dataTable.tables({ visible: true, api: true }).columns.adjust(); // Ajustar ancho de tablas
            });
        });

        $("#b_descripciondia").autocomplete({
            source: "../ws/proa/buscar_cie10",
            minLength: 3,
            select: function(event, ui) {
                if (ui.item) {
                    $("#b_IdDiagnostico").val(ui.item.id);
                    $("#b_cie10").val(ui.item.CodigoCIE10);
                    $(this).val(ui.item.value);  // Usar $(this) en lugar de llamar el ID nuevamente
                }
            }
        });

        $('#tbInterconsultas tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTable_InterconsultasHospitalizacion.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            }
        });

        // Botón "Pendiente"
        $('#btnPendiente').click(function() {
            //oTable_InterconsultasHospitalizacion.column('name:idEstado').search('1').draw();  // Filtra por estado 1 (Pendiente)
            $('#tbInterconsultas').DataTable().column(22).search('1').draw();

        });

        // Botón "Atendido"
        $('#btnAtendido').click(function() {
            //oTable_InterconsultasHospitalizacion.column('name:idEstado').search('2').draw();  // Filtra por estado 2 (Atendido)
            $('#tbInterconsultas').DataTable().column(22).search('2').draw();
        });

        // Botón "Todos"
        $('#btnTodos').click(function() {
            //oTable_InterconsultasHospitalizacion.column('name:idEstado').search('').draw();  // Muestra todos los datos
            $('#tbInterconsultas').DataTable().column(22).search('').draw();
        });

        $('#btnGroupEstados button').click(function () {
            // Reset de todos los botones y quitar subrayado
            $('#btnGroupEstados button').removeClass('active').css({ borderBottom: '3px solid #b7b4b4' }).css({ backgroundColor: '', color: '' });
        
            // Establecer el color y subrayado del botón activo
            var color = $(this).css('background-color');
            if ($(this).attr('id') === 'btnTodos') {
                $(this).addClass('active').css({ backgroundColor: 'black', color: 'white', borderBottom: '3px solid black' });
            } else if ($(this).attr('id') === 'btnPendiente') {
                $(this).addClass('active').css({ backgroundColor: '#ffc107', color: 'black', borderBottom: '3px solid #ffc107' });
            } else if ($(this).attr('id') === 'btnAtendido') {
                $(this).addClass('active').css({ backgroundColor: '#17a2b8', color: 'white', borderBottom: '3px solid #17a2b8' });
            }
        });
        
    },
};

// -------------------
// Eventos de botones dinámicos
// -------------------


// Visualizar el PDF Solicitud Interconsulta
$(document).on("click", ".ver-pdfSolicitud", function () {

    let apiUrl = $(this).attr("data-url");
    let urlObj = new URL(apiUrl, window.location.origin); // Para poder usar URLSearchParams con URLs relativas
    let puntoCarga = urlObj.searchParams.get("PuntoCarga");
    let NroIC = urlObj.searchParams.get("NroIC");

    // 📌 Si PuntoCarga es 12, mostrar el PDF directamente
    if (puntoCarga === "12") {
        console.log("Mostrando PDF directamente:", apiUrl.split("?")[0]);
        // Modificar el título del modal
        $("#modalPDF .modal-title").text("Solicitud de Interconsulta N° " + NroIC);
        $("#modalPDF .modal-body").html(`
            <iframe src="${apiUrl.split("?")[0]}" width="100%" height="100%" style="border: none;"></iframe>
        `);
        $("#modalPDF").modal("show");
        return; // Terminar ejecución aquí
    }
});

// Visualizar el PDF Respuesta Interconsulta
$(document).on("click", ".ver-pdfRespuesta", function () {
    let apiUrl = $(this).attr("data-url");
    let urlObj = new URL(apiUrl, window.location.origin); // Para poder usar URLSearchParams con URLs relativas
    let puntoCarga = urlObj.searchParams.get("PuntoCarga");
    let NroIC = urlObj.searchParams.get("NroIC");
    // 📌 Si PuntoCarga es 12, mostrar el PDF directamente
    if (puntoCarga === "12") {
        console.log("Mostrando PDF directamente:", apiUrl.split("?")[0]);
        // Modificar el título del modal
        $("#modalPDF .modal-title").text("Respuesta de Interconsulta N° " + NroIC);
        $("#modalPDF .modal-body").html(`
            <iframe src="${apiUrl.split("?")[0]}" width="100%" height="100%" style="border: none;"></iframe>
        `);
        $("#modalPDF").modal("show");
        return; // Terminar ejecución aquí
    }
});

// Modal Respuesta IC
var RespuestaIC = {
    Plugins() {

    },

    InitialCharge() {

    },

    LimpiarCampos() {
        // Botón
        $("#ver-pdfSolicitud-IC").attr("data-url", ``);

        // Limpiar inputs de texto
        $('#txtNroCuenta').val('');
        $('#txtNombrePaciente').val('');
        $('#txtDocumento').val('');
        $('#txtNroHC').val('');
        $('#txtFteFinanciamento').val('');
        $('#txtServicioActual').val('');

        // Limpiar textareas
        $('#txtHallazgos').val('');
        $('#txtRecomendaciones').val('');
        $('#txtApreciacion').val('');

        // Limpiar campos ocultos
        $('#idTipoServicio').val('');
        $('#hdnIdAtencion').val('');
        $('#hdnIdCuentaAtencion').val('');
        $('#hdnIdMedicoLogeado').val('');
        $('#hdnIdUsuarioLogeado').val('');
        $('#hdnIdServicio').val('');
        $('#hdnIdCama').val('');
        $('#hdIdTipoFuenteFian').val('');
        $('#hdIdPaciente').val('');
        $('#b_IdDiagnostico').val('');
        $('#b_cie10').val('');
        $('#hdIdRecetaInterconsulta').val('');
        $('#hdIdSolicitudInterconsulta').val('');
        
        // Limpiar input de diagnóstico buscado
        $('#b_descripciondia').val('');

        // Restablecer selects al índice 0 (sin borrar sus opciones)
       // $('#cboMedicoReceta').prop('selectedIndex', 0).trigger('change');
        $('#cboEspecialidadDestino').prop('selectedIndex', 0).trigger('change');
        $('#b_idtipodiagnostico').prop('selectedIndex', 0).trigger('change');

        // Limpiar contenido dinámico
        $('#div_dx').html('');
        $('#tblDiagnosticosRecetaMedica tbody').empty();

        // Resetear texto de etiquetas si deseas
        $('#lblInterconsulta').text('Desarrollo de la Interconsulta');
    },

    eventos() { 
        $("#btnGuardarIC").on("click", function () {
            if (RespuestaIC.validarAntesDeGuardar()) {
                console.log("Formulario validado correctamente");

                // Armar arrays de diagnósticos
                let l_IdDiagnostico = $("input[name='l_IdDiagnostico[]']").map(function () {
                    return $(this).val();
                }).get();

                let l_idtipodiagnostico = $("input[name='l_idtipodiagnostico[]']").map(function () {
                    return $(this).val();
                }).get();

                $.ajax({
                    url: "/hospitalizacion/respuesta_interconsultaHosp",
                    type: "POST",
                    data: {
                        idSolicitudInterconsulta: $("#hdIdSolicitudInterconsulta").val(),
                        idMedicoRespuesta: $("#hdnIdMedicoLogeado").val(),
                        DescripcionHallazgos: $("#txtHallazgos").val().trim(),
                        l_IdDiagnostico: l_IdDiagnostico,
                        l_idtipodiagnostico: l_idtipodiagnostico,
                        RecomendacionesSugerencias: $("#txtRecomendaciones").val().trim(),
                        ApreciacionEspecialidad: $("#txtApreciacion").val().trim(),
                        Observaciones: '',
                        guardar: 'Guardar'
                    },
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    success: function (resp) {
                        // mostrar pdf interconsulta - INICIO
                        let NroIC = $("#hdIdSolicitudInterconsulta").val();
                        let apiUrl = `/hospitalizacion/RespuestaInterconsulta/${NroIC}?PuntoCarga=12&NroIC=${NroIC}`;
                        $("#modalPDF .modal-title").text("Respuesta de Interconsulta N° " + NroIC); // Modificar el título del modal
                        $("#modalPDF .modal-body").html(`
                            <iframe src="${apiUrl.split("?")[0]}" width="100%" height="100%" style="border: none;"></iframe>
                        `);

                        // mostrar alerta ANTES del PDF
                        Utilitario.alerta("success", "Guardado", "Se ha guardado correctamente.");

                        // mostrar el modal con el PDF
                        $("#modalPDF").modal("show");

                        // ocultar modal de respuesta
                        $("#modalRespuestaInterconsulta").modal("hide");

                        // recargar datos
                        $("#btnBuscar").click(); //Traer nuevos registros
                    },
                    error: function () {
                        Utilitario.alerta("error", "Error", "Ocurrió un error al guardar.");
                    }
                });
            }
        });

        $(".auto-expand").on("input", RespuestaIC.ajustarAltura);

    },

    validarAntesDeGuardar() {
        if ($("#txtHallazgos").val().trim() === "") {
            Utilitario.alerta("info", "", "Debe ingresar los hallazgos.");
            return false;
        }
        if ($("#div_dx").find("input[name='l_IdDiagnostico[]']").length === 0) {
            Utilitario.alerta("info", "", "Debe agregar al menos un diagnóstico.");
            return false;
        }
        if ($("#txtRecomendaciones").val().trim() === "") {
            Utilitario.alerta("info", "", "Debe ingresar las recomendaciones.");
            return false;
        }
        if ($("#txtApreciacion").val().trim() === "") {
            Utilitario.alerta("info", "", "Debe ingresar la apreciación.");
            return false;
        }
        return true; // todo validado correctamente
    },

    
    buscarCuenta(idCuentaAtencion) {
        let nroCuenta = idCuentaAtencion;

        if (nroCuenta === "") {
            Swal.fire({
                icon: "warning",
                title: "Campo vacío",
                text: "Por favor, ingrese un número de cuenta.",
                confirmButtonText: "OK"
            });
            return;
        }

        $.ajax({
            url: "/hospitalizacion/buscarCuenta", 
            type: "POST", 
            data: {
                txtNroCuenta: nroCuenta
            },
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') // Incluye el token CSRF
            },
            dataType: "json",
            success: function(response) {



                if (response.resultado === "1" && response.data.length > 0) {
                    let paciente = response.data[0];

                    // if (Number(paciente["IdEstadoCuenta"]) > 1) {
                    //     Swal.fire({
                    //         toast: true,
                    //         position: 'top-end',
                    //         icon: 'warning',
                    //         title: 'Cuenta denegada.\nEstado: ' + paciente["EstadoCuenta"],
                    //         showConfirmButton: false,
                    //         timer: 2000,
                    //         timerProgressBar: true
                    //     });
                    //     return;
                    // }

                    $("#txtNroCuenta").val(idCuentaAtencion);
                    $("#txtNombrePaciente").val(`${paciente["Apellido Paterno"]} ${paciente["Apellido Materno"]}, ${paciente["Nombres"]} (${paciente["Edad"]} años)`);
                    $("#txtDocumento").val(`${paciente["TipoDocumento"]} ${paciente["NroDocumento"]}`);
                    $("#txtNroHC").val(`${paciente["NroHistoriaClinica"]}`);
                    $("#txtFteFinanciamento").val(`${paciente["Seguro"]}`);
                    $("#txtServicioActual").val(`${paciente["Servicio"]} (Cama: ${paciente["CAMA"]})`);              
                    
                    //Datos Ocultos
                    $("#hdnIdAtencion").val(`${paciente["IdAtencion"]}`);
                    $("#hdnIdCuentaAtencion").val(`${paciente["Cuenta"]}`);
                    $("#hdnIdServicio").val(`${paciente["IdServicio"]}`);
                    $("#hdnIdCama").val(`${paciente["IdCama"]}`);
                    $("#hdnIdMedicoLogeado").val($("#cboMedicoReceta").val());

                    // Agregar Dx a la Tabla
                    let $tablaDiagnosticos = $("#tblDiagnosticosRecetaMedica tbody");
                    $tablaDiagnosticos.empty();
                    if (response.diagnosticos.length > 0) {
                        response.diagnosticos.forEach(diagnostico => {
                            let fila = `
                                <tr>
                                    <td align="center" class="bg-white text-dark form-control-sm">${diagnostico.CIE10}</td>
                                    <td class="bg-white text-dark form-control-sm">${diagnostico.Descripcion}</td>
                                    <td align="center" class="bg-white text-dark form-control-sm">${diagnostico.ClasificacionDx}</td>
                                </tr>
                            `;
                            $tablaDiagnosticos.append(fila);
                        });
                    } else {
                        $tablaDiagnosticos.append(`<tr><td colspan="3" align="center">No hay diagnósticos</td></tr>`);
                    }

                    // Swal.fire({
                    //     toast: true,
                    //     position: 'top-end',
                    //     icon: 'success',
                    //     title: 'Dato del paciente encontrado.\nEstado: ' + paciente["EstadoCuenta"],
                    //     showConfirmButton: false,
                    //     timer: 2000,
                    //     timerProgressBar: true
                    // });

                } else if (response.resultado === "3") {
                    //OrdenMedicaHOSP.LimpiarDatosPaciente();
                    Swal.fire({
                        toast: true,
                        position: 'top-end',
                        icon: 'info',
                        title: 'Sesión expirada. Inicie sesión nuevamente.',
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true
                    });
                    
                } else {
                    //OrdenMedicaHOSP.LimpiarDatosPaciente();
                    Swal.fire({
                        toast: true,
                        position: 'top-end',
                        icon: 'warning',
                        title: 'No se encontraron datos con el número de cuenta.',
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true
                    });
                }
            },
            error: function(xhr, status, error) {
                Swal.fire({
                    icon: "error",
                    title: "Error en la búsqueda",
                    text: "Ocurrió un problema al consultar los datos.",
                    confirmButtonText: "OK"
                });
            }
        });
    },

    buscarInterconsulta(nroIC) {
        let idSolicitudInterconsulta = nroIC;

        if (idSolicitudInterconsulta === "") {
            Swal.fire({
                icon: "warning",
                title: "Campo vacío",
                text: "Por favor, ingrese un número de interconsulta.",
                confirmButtonText: "OK"
            });
            return;
        }

        $.ajax({
            url: "/hospitalizacion/buscarInterconsulta", 
            type: "POST", 
            data: {
                idSolicitudInterconsulta: idSolicitudInterconsulta
            },
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') // Incluye el token CSRF
            },
            dataType: "json",
            success: function(response) {

                if (response.resultado === "1" && response.data.length > 0) {
                    let ic = response.data[0];
                    
                    // Combos
                    //$('#cboEspecialidadDestino').val(ic["idEspecialidadDestino"]).trigger('change');
                    $('#cboEspecialidadDestino').val(ic["idEspecialidadDestino"]).trigger("chosen:updated");

                    // PDF
                    //linkPDF = `hospitalizacion/SolicitudInterconsulta/${idSolicitudInterconsulta}?PuntoCarga=12?NroIC=${idSolicitudInterconsulta}`;
                    linkPDF = `hospitalizacion/SolicitudInterconsulta/${idSolicitudInterconsulta}?PuntoCarga=12&NroIC=${idSolicitudInterconsulta}`;
                    $("#ver-pdfSolicitud-IC").attr("data-url", `/${linkPDF}`);

                    // $("#txtNroCuenta").val(idCuentaAtencion); 
                    // $("#txtNombrePaciente").val(`${ic["Apellido Paterno"]} ${ic["Apellido Materno"]}, ${ic["Nombres"]} (${ic["Edad"]} años)`);
                    // $("#txtDocumento").val(`${ic["TipoDocumento"]} ${ic["NroDocumento"]}`);
                    // $("#txtNroHC").val(`${ic["NroHistoriaClinica"]}`);
                    // $("#txtFteFinanciamento").val(`${ic["Seguro"]}`);
                    // $("#txtServicioActual").val(`${ic["Servicio"]} (Cama: ${ic["CAMA"]})`);              
                    
                    // //Datos Ocultos
                    // $("#hdnIdAtencion").val(`${ic["IdAtencion"]}`);
                    // $("#hdnIdCuentaAtencion").val(`${ic["Cuenta"]}`);
                    // $("#hdnIdServicio").val(`${ic["IdServicio"]}`);
                    // $("#hdnIdCama").val(`${ic["IdCama"]}`);
                    // $("#hdnIdMedicoLogeado").val($("#cboMedicoReceta").val());

                    // // Agregar Dx a la Tabla
                    // let $tablaDiagnosticos = $("#tblDiagnosticosRecetaMedica tbody");
                    // $tablaDiagnosticos.empty();
                    // if (response.diagnosticos.length > 0) {
                    //     response.diagnosticos.forEach(diagnostico => {
                    //         let fila = `
                    //             <tr>
                    //                 <td align="center" class="bg-white text-dark form-control-sm">${diagnostico.CIE10}</td>
                    //                 <td class="bg-white text-dark form-control-sm">${diagnostico.Descripcion}</td>
                    //                 <td align="center" class="bg-white text-dark form-control-sm">${diagnostico.ClasificacionDx}</td>
                    //             </tr>
                    //         `;
                    //         $tablaDiagnosticos.append(fila);
                    //     });
                    // } else {
                    //     $tablaDiagnosticos.append(`<tr><td colspan="3" align="center">No hay diagnósticos</td></tr>`);
                    // }

                    // Swal.fire({
                    //     toast: true,
                    //     position: 'top-end',
                    //     icon: 'success',
                    //     title: 'Dato del paciente encontrado.\nEstado: ' + paciente["EstadoCuenta"],
                    //     showConfirmButton: false,
                    //     timer: 2000,
                    //     timerProgressBar: true
                    // });

                } else if (response.resultado === "3") {
                    //OrdenMedicaHOSP.LimpiarDatosPaciente();
                    Swal.fire({
                        toast: true,
                        position: 'top-end',
                        icon: 'info',
                        title: 'Sesión expirada. Inicie sesión nuevamente.',
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true
                    });
                    
                } else {
                    //OrdenMedicaHOSP.LimpiarDatosPaciente();
                    Swal.fire({
                        toast: true,
                        position: 'top-end',
                        icon: 'warning',
                        title: 'No se encontraron datos con el número de cuenta.',
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true
                    });
                }



            },
            error: function(xhr, status, error) {
                Swal.fire({
                    icon: "error",
                    title: "Error en la búsqueda",
                    text: "Ocurrió un problema al consultar los datos.",
                    confirmButtonText: "OK"
                });
            }
        });
    },

    ad() {
        let idDiagnostico = $("#b_IdDiagnostico").val();
    
        if (
            idDiagnostico === null ||
            idDiagnostico.length === 0 ||
            $("#b_idtipodiagnostico").val().length === 0
        ) {
            Utilitario.alerta("info","","Ingrese datos correctos de diagnóstico");
        } else {
            // Verificar si ya existe el ID en los inputs ocultos
            let yaExiste = false;
            $("input[name='l_IdDiagnostico[]']").each(function () {
                if ($(this).val() === idDiagnostico) {
                    yaExiste = true;
                    return false; // break loop
                }
            });
    
            if (yaExiste) {
                Utilitario.alerta("info","","Este diagnóstico ya fue agregado.");
                return;
            }
    
            // Si no existe, agregar el diagnóstico
            $("#div_dx").append(
                '<div class="row mx-0 d-flex justify-content-center align-items-center"> \
                    <div class="col-lg-1 pr-0"><input type="hidden" name="l_IdDiagnostico[]" value="' + idDiagnostico + '"/><input type="text" name="l_cie10[]" class="form-control form-control-sm" value="' + $("#b_cie10").val().trim() + '" disabled /></div> \
                    <div class="col-lg-7 px-0"><input type="text" name="l_descripciondia[]" class="form-control form-control-sm" value="' + $("#b_descripciondia").val().trim() + '" disabled /></div> \
                    <div class="col-lg-2 px-0"><input type="hidden" name="l_idtipodiagnostico[]" value="' + $("#b_idtipodiagnostico").val().trim() + '"/><input type="text" name="l_tipodiagnostico[]" class="form-control form-control-sm" value="' + $("#b_idtipodiagnostico option:selected").html() + '" disabled /></div> \
                    <div class="col-lg-1 pl-0"><input type="button" value="Eliminar" class="elimina_d form-control btn btn-sm btn-danger"/></div>\
                </div>'
            );
    
            // Limpiar campos
            $("#b_IdDiagnostico").val("");
            $("#b_cie10").val("");
            $("#b_descripciondia").val("");
            $("#b_iddiagnostico").val("");
            $("#b_masdetdia").val("");
        }
    },
    
    ajustarAltura() {
        $(".auto-expand").each(function () {
            this.style.height = "auto"; // Resetear para obtener altura real
            this.style.height = this.scrollHeight + "px"; // Ajustar al contenido
        });
    },
    

};

// -------------------
// Eventos de botones dinámicos de RespuestaIC
// -------------------

$(document).on("click", ".elimina_d", function () {
    $(this).closest(".col-lg-1").parent().remove();
});

var Utilitario = {
    alerta(icono, titulo, mensaje) {
        Swal.fire({
            title: titulo,
            text: mensaje,
            icon: icono,
            allowOutsideClick: false,
            // customClass: {
            //     popup: 'swal-zindex'
            // }
        });
    },

    Cargando(estado) {
        if (estado == 1) {
            $.LoadingOverlay("show");
        } else if (estado == 0) {
            $.LoadingOverlay("hide");
        }
    
    }

}

$(document).ready(function () {
    Interconsulta.Plugins();
    Interconsulta.InitDatablesInterconsultasHospitalizacion();
    Interconsulta.InitialCharge();
    Interconsulta.eventos();
    //Interconsulta.ajustarAltura();
    //Interconsulta.IniciarDataTables();

    RespuestaIC.eventos();
})