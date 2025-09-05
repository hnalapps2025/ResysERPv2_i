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


var OrdenMedica = {
    idRecetaRx: 0,
    idRecetaEcoObs: 0,
    idRecetaEcoGene: 0,
    idRecetaAnaPatologica: 0,
    idRecetaPatoClinica: 0,
    idRecetaBancoSangre: 0,
    idRecetaTomografia: 0,
    idRecetaFarmacia: 0,
    accion: "",
    //recetita: [],
    IniciarScript() {
        // $("#txtFechaVigencia").datepicker({
        //     todayHighlight: true,
        //     autoclose: true,
        //     dateFormat: "dd/mm/yy",
        //     orientation: "bottom",
        //     zindex: 9999,
        // });
        //OrdenMedicaHOSP.cargarMedicamentos(19);
        //$("cboFarmacia").val(19).trigger("chosen:updated");
    },

    async obtenerExamenesSeleccionados(puntoCarga) {
        if (puntoCarga == 29) {
            //Emergencia
            var selectedItems = [];
            var prodExistente = 0;

            $('#contenedorChecks input[type="checkbox"]:checked').each(
                function () {
                    if (
                        OrdenMedica.existeProd($(this).attr("id"), puntoCarga)
                    ) {
                        alerta(
                            "info",
                            "",
                            $(this).next().find(".toggle__text").text() +
                                " ya fue agregado."
                        );

                        return false;
                    }

                    var idProducto = $(this).attr("id");
                    var nombre = $(this).next().find(".toggle__text").text();
                    var codigo = $(this).data("codigo");
                    var cantidad = 1;
                    var precio = $(this).data("precio");
                    var total = precio * cantidad;
                    var observaciones = "";
                    var dx = null;

                    console.log("idProducto", idProducto);

                    var selectedItem = {
                        idItem: idProducto,
                        producto: nombre,
                        cantidadPedida: cantidad,
                        precio: precio,
                        total: total,
                        observaciones: "",
                        dx: null,
                    };

                    console.log("selectedItem", selectedItem);
                    selectedItems.push(selectedItem);
                    DTRecetaPatoCli_Emer.row.add(selectedItem).draw(false);

                    $("#txtCAntidadPatoClinica_Emer").val("1");
                }
            );

            return selectedItems;
        }
        if (puntoCarga == 2) {
            //central
            var selectedItems = [];
            var prodExistente = 0;

            $('#contenedorChecksCentral input[type="checkbox"]:checked').each(
                function () {
                    if (
                        OrdenMedica.existeProd($(this).attr("id"), puntoCarga)
                    ) {
                        alerta(
                            "info",
                            "",
                            $(this).next().find(".toggle__text").text() +
                                " ya fue agregado."
                        );

                        return false;
                    }

                    var idProducto = $(this).attr("id");
                    var nombre = $(this).next().find(".toggle__text").text();
                    var codigo = $(this).data("codigo");
                    var cantidad = 1;
                    var precio = $(this).data("precio");
                    var total = precio * cantidad;
                    var observaciones = "";
                    var dx = null;

                    console.log("idProducto", idProducto);

                    var selectedItem = {
                        idItem: idProducto,
                        producto: nombre,
                        cantidadPedida: cantidad,
                        precio: precio,
                        total: total,
                        observaciones: "",
                        dx: null,
                    };

                    console.log("selectedItem", selectedItem);
                    selectedItems.push(selectedItem);
                    DTRecetaPatoCli.row.add(selectedItem).draw(false);

                    $("#txtCAntidadPatoClinica").val("1");
                }
            );

            return selectedItems;
        }
        if (puntoCarga == 20) {
            //EcoGeneral

            var selectedItems = [];
            var prodExistente = 0;
            $(
                '#contenedorChecksEcoGeneral input[type="checkbox"]:checked'
            ).each(function () {
                if (OrdenMedica.existeProd($(this).attr("id"), puntoCarga)) {
                    alerta(
                        "info",
                        "",
                        $(this).next().find(".toggle__text").text() +
                            " ya fue agregado."
                    );

                    return false;
                }
                var idProducto = $(this).attr("id");
                var nombre = $(this).next().find(".toggle__text").text();
                var codigo = $(this).data("codigo");
                var cantidad = 1;
                var precio = $(this).data("precio");
                var total = precio * cantidad;
                var observaciones = "";
                var dx = null;

                console.log("idProducto", idProducto);

                var selectedItem = {
                    idItem: idProducto,
                    producto: nombre,
                    cantidadPedida: cantidad,
                    precio: precio,
                    total: total,
                    observaciones: "",
                    dx: null,
                };

                console.log("selectedItem", selectedItem);
                selectedItems.push(selectedItem);
                DTRecetaEcoGene.row.add(selectedItem).draw(false);
            });

            return selectedItems;
        }
        if (puntoCarga == 21) {
            var selectedItems = [];
            var prodExistente = 0;
            $('#contenedorChecksRayosX input[type="checkbox"]:checked').each(
                function () {
                    if (
                        OrdenMedica.existeProd($(this).attr("id"), puntoCarga)
                    ) {
                        alerta(
                            "info",
                            "",
                            $(this).next().find(".toggle__text").text() +
                                " ya fue agregado."
                        );

                        return false;
                    }
                    var idProducto = $(this).attr("id");
                    var nombre = $(this).next().find(".toggle__text").text();
                    var codigo = $(this).data("codigo");
                    var cantidad = 1;
                    var precio = $(this).data("precio");
                    var total = precio * cantidad;
                    var observaciones = "";
                    var dx = null;

                    console.log("idProducto", idProducto);

                    var selectedItem = {
                        idItem: idProducto,
                        producto: nombre,
                        cantidadPedida: cantidad,
                        precio: precio,
                        total: total,
                        observaciones: "",
                        dx: null,
                    };

                    console.log("selectedItem", selectedItem);
                    selectedItems.push(selectedItem);
                    DTRecetaRayosX.row.add(selectedItem).draw(false);
                    $("#txtCAntidadRx").val("1");
                }
            );

            return selectedItems;
        }
    },

    async agregarProd(idCatalogo) {
        console.log("agregarProd");
        if (
            $("#cboMedicoReceta").val() != undefined &&
            ($("#cboMedicoReceta").val() == 0 ||
                $("#cboMedicoReceta").val() == null ||
                $("#cboMedicoReceta").val() == "")
        ) {
            OrdenMedica.alerta("info", "", "Seleccione el médico que receta.");
            return false;
        }
        /////////////////////////////////////////////////////////////////
        //RayosX
        if (idCatalogo == 21) {
            var objselec = $("#cboRx").val();

            if (!objselec || objselec === "") {
                OrdenMedica.alerta("info", "", "Seleccione una Examen válido.");
                return false;
            }

            console.log("objselec", objselec);
            if (OrdenMedica.existeProd(objselec, idCatalogo)) {
                OrdenMedica.alerta(
                    "info",
                    "",
                    $("#cboRx option:selected").text() + " ya fue agregado."
                );
                return false;
            } else {
                precioUnitario = $("#cboRx option:selected").data("precio");
                if (
                    $("#txtCAntidadRx").val() > 0 ||
                    $("#txtCantidadRx").val() > 0
                ) {
                    var objRow = {
                        idItem: objselec,
                        producto: $("#cboRx option:selected").text(),
                        cantidadPedida: $("#txtCAntidadRx").val(),
                        precio: precioUnitario,
                        total: precioUnitario * $("#txtCAntidadRx").val(),
                        observaciones: "",
                        dx: null,
                    };
                    DTRecetaRayosX.row.add(objRow).draw(false);
                } else {
                    OrdenMedica.alerta(
                        "info",
                        "",
                        "Ingrese una cantidad correcta"
                    );
                    $("#txtCAntidadRx").focus();
                    return false;
                }
            }
        }
        //EcoObs
        if (idCatalogo == 23) {
            var objselec = $("#cboEcoObs").val();

            if (!objselec || objselec === "") {
                OrdenMedica.alerta("info", "", "Seleccione una Examen válido.");
                return false;
            }

            if (OrdenMedica.existeProd(objselec, idCatalogo)) {
                OrdenMedica.alerta(
                    "info",
                    "",
                    $("#cboEcoObs option:selected").text() + " ya fue agregado."
                );
                return false;
            } else {
                precioUnitario = $("#cboEcoObs option:selected").data("precio");
                if (
                    $("#txtCAntidadObs").val() > 0 ||
                    $("#txtCantidadEcoObs").val() > 0
                ) {
                    var objRow = {
                        idItem: objselec,
                        producto: $("#cboEcoObs option:selected").text(),
                        cantidadPedida: $("#txtCAntidadObs").val(),
                        precio: precioUnitario,
                        total: precioUnitario * $("#txtCAntidadObs").val(),
                        observaciones: "",
                        dx: null,
                    };
                    DTRecetaEcoObst.row.add(objRow).draw(false);
                } else {
                    OrdenMedica.alerta(
                        "info",
                        "",
                        "Ingrese una cantidad correcta"
                    );
                    $("#txtCAntidadObs").focus();
                    return false;
                }
            }
        }
        //EcoGeneral
        if (idCatalogo == 20) {
            var objselec = $("#cboecoGene").val();

            if (!objselec || objselec === "") {
                OrdenMedica.alerta("info", "", "Seleccione una Examen válido.");
                return false;
            }

            if (OrdenMedica.existeProd(objselec, idCatalogo)) {
                OrdenMedica.alerta(
                    "info",
                    "",
                    $("#cboecoGene option:selected").text() +
                        " ya fue agregado."
                );
                return false;
            } else {
                precioUnitario = $("#cboecoGene option:selected").data(
                    "precio"
                );
                if (
                    $("#txtCAntidadEcoGeneral").val() > 0 ||
                    $("#txtCantidadEcoGen").val() > 0
                ) {
                    var objRow = {
                        idItem: objselec,
                        producto: $("#cboecoGene option:selected").text(),
                        cantidadPedida: $("#txtCAntidadEcoGeneral").val(),
                        precio: precioUnitario,
                        total:
                            precioUnitario * $("#txtCAntidadEcoGeneral").val(),
                        observaciones: "",
                        dx: null,
                    };
                    DTRecetaEcoGene.row.add(objRow).draw(false);

                    $("#txtCAntidadEcoGeneral").val("1");
                } else {
                    OrdenMedica.alerta(
                        "info",
                        "",
                        "Ingrese una cantidad correcta"
                    );
                    $("#txtCAntidadEcoGeneral").focus();
                    return false;
                }
            }
        }
        //AnaPatologica
        if (idCatalogo == 3) {
            var objselec = $("#cboanaPatologica").val();

            if (!objselec || objselec === "") {
                OrdenMedica.alerta("info", "", "Seleccione una Examen válido.");
                return false;
            }

            if (OrdenMedica.existeProd(objselec, idCatalogo)) {
                OrdenMedica.alerta(
                    "info",
                    "",
                    $("#cboanaPatologica option:selected").text() +
                        " ya fue agregado."
                );
                return false;
            } else {
                precioUnitario = $("#cboanaPatologica option:selected").data(
                    "precio"
                );
                if (
                    $("#txtCAntidadAPatologica").val() > 0 ||
                    $("#txtCantidadAnatPato").val() > 0
                ) {
                    var objRow = {
                        idItem: objselec,
                        producto: $("#cboanaPatologica option:selected").text(),
                        cantidadPedida: $("#txtCAntidadAPatologica").val(),
                        precio: precioUnitario,
                        total:
                            precioUnitario * $("#txtCAntidadAPatologica").val(),
                        observaciones: "",
                        dx: null,
                    };
                    DTRecetaAnaPato.row.add(objRow).draw(false);

                    $("#txtCAntidadAPatologica").val("1");
                } else {
                    OrdenMedica.alerta(
                        "info",
                        "",
                        "Ingrese una cantidad correcta"
                    );
                    $("#txtCAntidadAPatologica").focus();
                    return false;
                }
            }
        }
        //PatoClinica
        if (idCatalogo == 2) {
            var objselec = $("#cboPatoClinica").val();

            if (!objselec || objselec === "") {
                OrdenMedica.alerta("info", "", "Seleccione una Exámen válido.");
                return false;
            }

            if (OrdenMedica.existeProd(objselec, idCatalogo)) {
                OrdenMedica.alerta(
                    "info",
                    "",
                    $("#cboPatoClinica option:selected").text() +
                        " ya fue agregado."
                );
                return false;
            } else {
                precioUnitario = $("#cboPatoClinica option:selected").data(
                    "precio"
                );
                if (
                    $("#txtCAntidadPatoClinica").val() > 0 ||
                    $("#txtCantidadPatClinica").val() > 0
                ) {
                    var objRow = {
                        idItem: objselec,
                        producto: $("#cboPatoClinica option:selected").text(),
                        cantidadPedida: $("#txtCAntidadPatoClinica").val(),
                        precio: precioUnitario,
                        total:
                            precioUnitario * $("#txtCAntidadPatoClinica").val(),
                        observaciones: "",
                        dx: null,
                        //lab:2
                    };
                    DTRecetaPatoCli.row.add(objRow).draw(false);

                    $("#txtCAntidadPatoClinica").val("1");
                } else {
                    OrdenMedica.alerta(
                        "info",
                        "",
                        "Ingrese una cantidad correcta"
                    );
                    $("#txtCAntidadPatoClinica").focus();
                    return false;
                }
            }
        }
        //PAto CLinica_emergecia
        if (idCatalogo == 29) {
            var objselec = $("#cboPatoClinica_Emergencia").val();

            console.log("objecto sleecionado", objselec);
            if (OrdenMedica.existeProd(objselec, 29)) {
                OrdenMedica.alerta(
                    "info",
                    "",
                    $("#cboPatoClinica_Emergencia option:selected").text() +
                        " ya fue agregado."
                );
                return false;
            } else {
                precioUnitario = $(
                    "#cboPatoClinica_Emergencia option:selected"
                ).data("precio");
                if (
                    $("#txtCAntidadPatoClinica_Emer").val() > 0 ||
                    $("#txtCAntidadPatoClinica_Emer").val() > 0
                ) {
                    var objRow = {
                        idItem: objselec,
                        producto: $(
                            "#cboPatoClinica_Emergencia option:selected"
                        ).text(),
                        cantidadPedida: $("#txtCAntidadPatoClinica_Emer").val(),
                        precio: precioUnitario,
                        total:
                            precioUnitario *
                            $("#txtCAntidadPatoClinica_Emer").val(),
                        observaciones: "",
                        dx: null,
                        //lab:2
                    };
                    DTRecetaPatoCli_Emer.row.add(objRow).draw(false);

                    $("#txtCAntidadPatoClinica_Emer").val("1");
                } else {
                    OrdenMedica.alerta(
                        "info",
                        "",
                        "Ingrese una cantidad correcta"
                    );
                    $("#txtCAntidadPatoClinica_Emer").focus();
                    return false;
                }
            }
        }
        //BancoSangre
        if (idCatalogo == 11) {
            var objselec = $("#cbobancoSangre").val();

            if (!objselec || objselec === "") {
                OrdenMedica.alerta("info", "", "Seleccione una Examen válido.");
                return false;
            }

            if (OrdenMedica.existeProd(objselec, idCatalogo)) {
                OrdenMedica.alerta(
                    "info",
                    "",
                    $("#cbobancoSangre option:selected").text() +
                        " ya fue agregado."
                );
                return false;
            } else {
                precioUnitario = $("#cbobancoSangre option:selected").data(
                    "precio"
                );
                if (
                    $("#txtCAntidadbancoSangre").val() > 0 ||
                    $("#txtCantidadBancoSangre").val() > 0
                ) {
                    var objRow = {
                        idItem: objselec,
                        producto: $("#cbobancoSangre option:selected").text(),
                        cantidadPedida: $("#txtCAntidadbancoSangre").val(),
                        precio: precioUnitario,
                        total:
                            precioUnitario * $("#txtCAntidadbancoSangre").val(),
                        observaciones: "",
                        dx: null,
                    };
                    DTRecetaBancoSan.row.add(objRow).draw(false);

                    $("#txtCAntidadbancoSangre").val("1");
                } else {
                    OrdenMedica.alerta(
                        "info",
                        "",
                        "Ingrese una cantidad correcta"
                    );
                    $("#txtCAntidadbancoSangre").focus();
                    return false;
                }
            }
        }
        //Tomografia
        if (idCatalogo == 22) {
            var objselec = $("#cbotomografia").val();

            if (!objselec || objselec === "") {
                OrdenMedica.alerta("info", "", "Seleccione una Examen válido.");
                return false;
            }

            if (OrdenMedica.existeProd(objselec, idCatalogo)) {
                OrdenMedica.alerta(
                    "info",
                    "",
                    $("#cbotomografia option:selected").text() +
                        " ya fue agregado."
                );
                return false;
            } else {
                precioUnitario = $("#cbotomografia option:selected").data(
                    "precio"
                );
                if (
                    $("#txtCAntidadtomografia").val() > 0 ||
                    $("#txtCantidadTomografia").val() > 0
                ) {
                    var objRow = {
                        idItem: objselec,
                        producto: $("#cbotomografia option:selected").text(),
                        cantidadPedida: $("#txtCAntidadtomografia").val(),
                        precio: precioUnitario,
                        total:
                            precioUnitario * $("#txtCAntidadtomografia").val(),
                        observaciones: "",
                        dx: null,
                    };
                    DTRecetaTomo.row.add(objRow).draw(false);

                    $("#txtCAntidadtomografia").val("1");
                } else {
                    OrdenMedica.alerta(
                        "info",
                        "",
                        "Ingrese una cantidad correcta"
                    );
                    $("#txtCAntidadtomografia").focus();
                    return false;
                }
            }
        }

        // Interconsultas
        if (idCatalogo == 12) {
            var objselec = $("#cbointerconsultas").val();

            if (!objselec || objselec === "") {
                OrdenMedica.alerta("info", "", "Seleccione una Interconsulta válida.");
                return false;
            }

            if (!isEmpty(objselec)) {
                if (OrdenMedica.existeProd(objselec, idCatalogo)) {
                    OrdenMedica.alerta(
                        2,
                        $("#cbointerconsultas option:selected").text() +
                            " ya fue agregado."
                    );
                    return false;
                } else {
                    // Obtener valores y validarlos
                    var resumenHistoriaClinica = $("#txtResumenHistoriaClinica")
                        .val()
                        .trim();
                    var motivoInterconsulta = $("#txtMotivoInterconsulta")
                        .val()
                        .trim();
                    var dxDescripcion = $("input[name='l_cie10[]']")
                        .map(function () {
                            return $(this).val().trim();
                        })
                        .get()
                        .filter((value) => value !== ""); // Filtrar vacíos

                    // Validación
                    if (resumenHistoriaClinica === "") {
                        OrdenMedica.alerta(
                            2,
                            "Debe ingresar el Resumen de Historia Clínica."
                        );
                        return false;
                    }
                    if (motivoInterconsulta === "") {
                        OrdenMedica.alerta(
                            2,
                            "Debe ingresar el Motivo de Interconsulta."
                        );
                        return false;
                    }
                    if (dxDescripcion.length === 0) {
                        OrdenMedica.alerta(
                            2,
                            "Debe ingresar al menos un Diagnóstico."
                        );
                        return false;
                    }

                    // Obtener más valores
                    var precioUnitario = $(
                        "#cbointerconsultas option:selected"
                    ).data("precio");
                    var objRow = {
                        idItem: objselec,
                        producto: $(
                            "#cbointerconsultas option:selected"
                        ).text(),
                        cantidadPedida: 1,
                        precio: precioUnitario,
                        resumenHistoriaClinica: resumenHistoriaClinica,
                        motivoInterconsulta: motivoInterconsulta,
                        dxDescripcion: dxDescripcion,
                        dx: $("input[name='l_IdDiagnostico[]']")
                            .map(function () {
                                return $(this).val();
                            })
                            .get(),
                        tiposDx: $("input[name='l_idtipodiagnostico[]']")
                            .map(function () {
                                return $(this).val();
                            })
                            .get(),
                    };

                    // Agregar a la tabla y limpiar campos
                    DTRecetaInterconsulta.row.add(objRow).draw(false);
                    $(
                        "#txtResumenHistoriaClinica, #txtMotivoInterconsulta"
                    ).val("");
                    OrdenMedicaHOSP.ajustarAltura();
                    $("#div_dx").empty();
                }
            } else {
                OrdenMedica.alerta(2, "Seleccione un procedimiento");
            }
        }

        //Medicamento - Farmacia
        if (idCatalogo == 5) {



            var objselec = $("#cboMedicamento").val();
            var productosNoAgregadosFarmacia = [];
           
            let stockProducto =await OrdenMedica.consulta_stock(objselec,cboFarmacia.value);
            let productoStock= $('#cboMedicamento option:selected').text();
            console.log('stockProducto aa',stockProducto);
                //if(productoStock == 'Seleccione una opción'){
                if (!objselec || objselec === "" || productoStock === 'Seleccione una opción') {    
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

                    // $("#cboDosis").val($("#cboDosis option").eq(1).val()).trigger("change");
                    // $("#cboVia").val($("#cboVia option").eq(1).val()).trigger("change");
                    $("#cboDosis").val("0").trigger("change");
                    $("#cboVia").val("0").trigger("change");
                    

                   }else{
                    var productoSinStock = $('#cboMedicamento option:selected').text();
                    var cantidad = $('#txtCAntidadFarmacia').val();
                    var nuevoMedicamento =  cantidad + '-'+productoSinStock ; 
                    var textoActual = $('#txtOtrosMedicamentos').val().trim();
                    var medicamentosSet = new Set(textoActual ? textoActual.split('\n') : []);
                    medicamentosSet.add(nuevoMedicamento);
                    $('#txtOtrosMedicamentos').val(Array.from(medicamentosSet).join('\n'));
                    $('#txtCAntidadFarmacia').val('1');
                    $('#txtFrecuencia').val('');

                    // $("#cboDosis").val($("#cboDosis option").eq(1).val()).trigger("change");
                    // $("#cboVia").val($("#cboVia option").eq(1).val()).trigger("change");
                    $("#cboDosis").val("0").trigger("change");
                    $("#cboVia").val("0").trigger("change");
                    

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
            console.log("listaProductosPatoClinica", lstProductosPatoClinica);
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
            console.log("ingreso validar prod", idCatalogo);
            lstProductosPatoClinica_Emergencia =
                DTRecetaPatoCli_Emer.rows().data();
            console.log(
                "lstProductosPatoClinica_Emergencia",
                lstProductosPatoClinica_Emergencia
            );
            if (lstProductosPatoClinica_Emergencia.length == 0) {
                return false;
            }
            for (
                var i = 0;
                i < lstProductosPatoClinica_Emergencia.length;
                i++
            ) {
                if (
                    lstProductosPatoClinica_Emergencia[i].idItem == idproducto
                ) {
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

    IniciarDataTablesOrdenesMedicas() {
        DTORdenesMedicas = $("#tblOrdenesMedicas").DataTable({
            destroy: true,
            bFilter: true,
            order: [[0, "desc"]],
            ordering: false,
            scrollX: true,
            dom: "tip",
            lengthChange: false,
            columns: [
                {
                    width: "8%",
                    targets: 0,
                    data: "IdReceta",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "center");
                        if (rowData.idEstado == 2) {
                            $(td).parent().css("color", "#00cc99");
                            $(td).parent().css("font-weight", "bold");
                        }
                    },
                },
                {
                    width: "18%",
                    targets: 1,
                    data: "PuntoCarga",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                        if (
                            rowData.IdPuntoCarga == 2 &&
                            rowData.IdPuntoCargaLab == 29
                        ) {
                            $(td).html("Pat.Clinica Lab. Emergencia");
                        }
                        if (
                            rowData.IdPuntoCarga == 2 &&
                            rowData.IdPuntoCargaLab == null
                        ) {
                            $(td).html("Pat.Clinica Lab. Central");
                        }
                    },
                },
                {
                    width: "40%",
                    targets: 2,
                    data: "Medico",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "14%",
                    targets: 3,
                    data: "FechaRecetaMedica",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "12%",
                    targets: 4,
                    data: "estadoReceta",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "8%",
                    targets: 1,
                    data: null,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "center");
                        btnImprimeSinF =
                            '<button class="ImprimirRecetaSF btn btn-sm glow_button" style="background:orange;color:white;"><i class="fa fa-print"></i> </button>';
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
                    },
                },
            ],
        });
    },

    IniciarDataTablesRecetasMedicas() {
        DTRecetaFarmacia = $("#tblCatalogoFarmacia").DataTable({
            scrollY: "250px",
            scrollCollapse: true,
            autoWidth: true,
            ordering: false,
            data: null,
            destroy: true,
            info: false,
            bFilter: false,
            paging: false,
            responsive: true,
            columns: [
                {
                    width: "0%",
                    targets: 0,
                    visible: false,
                    data: "idItem",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "35%",
                    targets: 1,
                    data: "producto",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "10%",
                    targets: 2,
                    data: "cantidadPedida",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                        var inputCantidad = "";
                        inputCantidad =
                            '  <input id="txtCant_' +
                            rowData.idItem +
                            '" value="' +
                            rowData.cantidadPedida +
                            '" style=" width: 80%;" autocomplete="off" placeholder="" class="form-control form-control-sm solo-numero">';
                        $(td).html(inputCantidad);
                    },
                },
                //RQ0003 RMOREANO
                {
                    width: "0%",
                    targets: 3,
                    visible: false,
                    data: "idDosisRecetada",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "10%",
                    targets: 4,
                    data: "dosis",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "0%",
                    targets: 5,
                    visible: false,
                    data: "idViaAdministracion",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "15%",
                    targets: 6,
                    data: "vias",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "20%",
                    targets: 7,
                    data: "observaciones",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                        var caja = "";
                        if (rowData.observaciones == "") {
                            caja =
                                '  <input id="txtFrec_' +
                                rowData.idItem +
                                '" style=" width: 90%;" autocomplete="off" placeholder="" class="form-control form-control-sm">';
                        } else {
                            caja =
                                '  <input id="txtFrec_' +
                                rowData.idItem +
                                '" value="' +
                                rowData.observaciones +
                                '" style=" width: 90%;" autocomplete="off" placeholder="" class="form-control form-control-sm">';
                        }
                        $(td).html(caja);
                    },
                },
            ],
        });

        var params = {
            scrollY: "145px",
            scrollCollapse: true,
            autoWidth: true,
            data: null,
            destroy: true,
            info: false,
            bFilter: false,
            paging: false,
            responsive: true,
            columns: [
                {
                    width: "0%",
                    targets: 0,
                    visible: false,
                    data: "idItem",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "70%",
                    targets: 1,
                    data: "producto",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "10%",
                    targets: 2,
                    data: "cantidadPedida",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                        var inputCantidad = "";
                        inputCantidad =
                            '  <input id="txtCant_' +
                            rowData.idItem +
                            '" value="' +
                            rowData.cantidadPedida +
                            '" style=" width: 80%;" autocomplete="off" placeholder="" class="form-control form-control-sm solo-numero">';
                        $(td).html(inputCantidad);
                    },
                },
                {
                    width: "20%",
                    targets: 7,
                    data: "observaciones",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                        var caja = "";
                        if (rowData.observaciones == "") {
                            caja =
                                '  <input id="txtFrec_' +
                                rowData.idItem +
                                '" style=" width: 90%;" autocomplete="off" placeholder="" class="form-control form-control-sm">';
                        } else {
                            caja =
                                '  <input id="txtFrec_' +
                                rowData.idItem +
                                '" value="' +
                                rowData.observaciones +
                                '" style=" width: 90%;" autocomplete="off" placeholder="" class="form-control form-control-sm">';
                        }
                        $(td).html(caja);
                    },
                },
            ],
        };

        DTRecetaRayosX = $("#tblCatalogoRayos").DataTable(params);
        DTRecetaEcoGene = $("#tblCatalogoEcoGene").DataTable(params);
        DTRecetaEcoObst = $("#tblCatalogoEcoObs").DataTable(params);
        DTRecetaAnaPato = $("#tblCatalogoAnaPatologica").DataTable(params);
        DTRecetaPatoCli = $("#tblCatalogoPatoClinica").DataTable(params);
        DTRecetaPatoCli_Emer = $("#tblCatalogoPatoClinica_Emer").DataTable(
            params
        );
        DTRecetaBancoSan = $("#tblCatalogobancoSangre").DataTable(params);
        DTRecetaTomo = $("#tblCatalogotomografia").DataTable(params);
    },

    IniciarDataTablesInterconsulta() {
        DTRecetaInterconsulta = $("#tblCatalogointerconsultas").DataTable({
            scrollY: "145px",
            scrollCollapse: true,
            autoWidth: true,
            data: null,
            destroy: true,
            info: false,
            bFilter: false,
            paging: false,
            responsive: true,
            //scrollY: '40vh',
            //dom: 'Bflr<"table-responsive"t>ip',
            buttons: ["copy", "csv", "print"],
            columns: [
                {
                    width: "0%",
                    targets: 0,
                    visible: false,
                    data: "idItem",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "60%",
                    targets: 1,
                    data: "producto",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "20%",
                    targets: 2,
                    data: "cantidadPedida",
                    visible: false,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                        var inputCantidad = "";
                        inputCantidad =
                            '  <input id="txtCant_' +
                            rowData.idItem +
                            '" value="' +
                            rowData.cantidadPedida +
                            '" style=" width: 80%;" autocomplete="off" placeholder="" class="form-control form-control-sm solo-numero">';
                        $(td).html(inputCantidad);
                    },
                },

                {
                    width: "60%",
                    targets: 3,
                    data: "resumenHistoriaClinica",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "60%",
                    targets: 4,
                    data: "motivoInterconsulta",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "60%",
                    targets: 5,
                    data: "dxDescripcion",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "60%",
                    targets: 6,
                    visible: false,
                    data: "dx",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "60%",
                    targets: 7,
                    visible: false,
                    data: "tiposDx",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
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
            ],
        });
    },

    IniciarDataTablesDiagnosticosInterconsulta() {
        DTDiagnosticosRecetaMedica = $(
            "#tblDiagnosticosRecetaMedica"
        ).DataTable({
            destroy: true,
            data: null,
            info: false,
            bFilter: false,
            scrollY: "70vh",
            autoWidth: true,
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
                        $(td).attr("align", "center");
                    },
                },
                {
                    width: "55%",
                    targets: 1,
                    data: "diagnostico",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "20%",
                    targets: 2,
                    data: "tipoDiagnostico",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
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
            ],
        });
    },
    ////////////////////////DATATABLE/////////////////////////////////////////////////////////
    initDatablesFarmacia() {
        var parms = {
            scrollY: "250px",
            scrollCollapse: true,
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
                        $(td).attr("align", "left");
                    },
                },
                {
                    data: "producto",
                    width: "80%",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    data: "cantidadPedida",
                    width: "20%",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                } /*,
            {
                visible: false,
                data: "lab",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'left')

                }
            }*/,
            ],
        };

        var tableWrapper = $("#tblCatalogoFarmaciaOrdRes"); // datatable creates the table wrapper by adding with id {your_table_id}_wrapper
        oTable_farmaciaOrdes = $("#tblCatalogoFarmaciaOrdRes").dataTable(parms);
        $("#tblCatalogoFarmaciaOrdRes_length").css("display", "none");
    },
    initDatablesPaquetes() {
        var parms = {
            scrollY: "300px",
            scrollCollapse: true,
            data: null,
            destroy: true,
            info: false,
            bFilter: false,
            paging: false,
            responsive: true,
            //dom: 'Bflr<"table-responsive"t>ip',
            buttons: ["copy", "csv", "print"],
            columns: [
                {
                    data: "Especialidad",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    data: "Codigo",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    data: "Descripcion",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    data: "Cantidad",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    data: "Precio",
                    createdCell: function (td, cellData, rowData, row, col) {
                        var formattedValue = parseFloat(cellData).toFixed(2);
                        $(td).text(formattedValue);
                        $(td).attr("align", "left");
                    },
                },
                {
                    data: "Importe",
                    createdCell: function (td, cellData, rowData, row, col) {
                        var formattedValue = parseFloat(cellData).toFixed(2);
                        $(td).text(formattedValue);
                        $(td).attr("align", "left");
                    },
                },
                {
                    data: "idPuntoCarga",
                    createdCell: function (td, cellData, rowData, row, col) {
                        var roundedValue = Math.round(cellData);
                        $(td).text(roundedValue);
                        $(td).attr("align", "left");
                    },
                },
                {
                    data: "idProducto",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    data: "idViaAdministracion",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    data: "vias",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    data: "CantidadFarmacia",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
            ],
            columnDefs: [
                {
                    targets: [0, 6, 7, 8, 9, 10],
                    visible: false, // Oculta la columna
                },
            ],
        };
        var tableWrapper = $("#tblPaqueteDetalle"); // datatable creates the table wrapper by adding with id {your_table_id}_wrapper
        oTable_paquete = $("#tblPaqueteDetalle").dataTable(parms);
        $("#tblPaqueteDetalle_length").css("display", "none");
    },

    initDatablesAnatomiaPatologica() {
        var parms = {
            scrollY: "250px",
            scrollCollapse: true,
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
                        $(td).attr("align", "left");
                    },
                },
                {
                    data: "producto",
                    width: "80%",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    data: "cantidadPedida",
                    width: "20%",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                        if (rowData.resultado > 0) {
                            $(td).parent().css("color", "#347dff");
                            $(td).parent().css("font-weight", "bold");
                        }
                    },
                },
                /*
            ,{
                visible: false,
                data: "lab",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'left')

                }
            }

            */
            ],
        };

        var tableWrapper = $("#tblCatalogoAnaPatologicaOrdRes"); // datatable creates the table wrapper by adding with id {your_table_id}_wrapper
        oTable_anatPatologicaOrdRes = $(
            "#tblCatalogoAnaPatologicaOrdRes"
        ).dataTable(parms);
        $("#tblCatalogoAnaPatologicaOrdRes_length").css("display", "none");
    },

    initDatablesParologiaClinica() {
        var parms = {
            scrollY: "250px",
            scrollCollapse: true,
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
                        $(td).attr("align", "left");
                    },
                },
                {
                    data: "producto",
                    width: "70%",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    data: "cantidadPedida",
                    width: "20%",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                        if (rowData.resultado > 0) {
                            $(td).parent().css("color", "#347dff");
                            $(td).parent().css("font-weight", "bold");
                        }
                    },
                },
                /*
            ,{
                visible: false,
                data: "lab",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'left')

                }
            }
                */
            ],
        };

        var tableWrapper = $("#tblCatalogoPatoClinicaOrdRes"); // datatable creates the table wrapper by adding with id {your_table_id}_wrapper
        oTable_PatoClinicaOrdRes = $("#tblCatalogoPatoClinicaOrdRes").dataTable(
            parms
        );
        $("#tblCatalogoPatoClinicaOrdRes_length").css("display", "none");
    },

    initDatablesParologiaClinica_Emer() {
        var parms = {
            scrollY: "250px",
            scrollCollapse: true,
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
                        $(td).attr("align", "left");
                    },
                },
                {
                    data: "producto",
                    width: "70%",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    data: "cantidadPedida",
                    width: "20%",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                        if (rowData.resultado > 0) {
                            $(td).parent().css("color", "#347dff");
                            $(td).parent().css("font-weight", "bold");
                        }
                    },
                },

                /*
            ,{
                data: "lab",
                width: "10%",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'left')

                }
            }
                */
            ],
        };

        var tableWrapper = $("#tblCatalogoPatoClinicaEmerOrdRes"); // datatable creates the table wrapper by adding with id {your_table_id}_wrapper
        oTable_PatoClinicaEmerOrdRes = $(
            "#tblCatalogoPatoClinicaEmerOrdRes"
        ).dataTable(parms);
        $("#tblCatalogoPatoClinicaEmerOrdRes").css("display", "none");
    },

    initDatablesBancoSangre() {
        var parms = {
            scrollY: "250px",
            scrollCollapse: true,
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
                        $(td).attr("align", "left");
                    },
                },
                {
                    data: "producto",
                    width: "70%",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    data: "cantidadPedida",
                    width: "20%",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                        if (rowData.resultado > 0) {
                            $(td).parent().css("color", "#347dff");
                            $(td).parent().css("font-weight", "bold");
                        }
                    },
                },
                /* ,
            {
                data: "Lab",
                width: "10%",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'left')

                }
            }
                */
            ],
        };

        var tableWrapper = $("#tblCatalogobancoSangreOrdRes"); // datatable creates the table wrapper by adding with id {your_table_id}_wrapper
        oTable_bancoSangreOrdRes = $("#tblCatalogobancoSangreOrdRes").dataTable(
            parms
        );
        $("#tblCatalogobancoSangreOrdRes_length").css("display", "none");
    },

    initDatablesEcoObs() {
        var parms = {
            scrollY: "250px",
            scrollCollapse: true,
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
                        $(td).attr("align", "left");
                    },
                },
                {
                    data: "producto",
                    width: "80%",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    data: "cantidadPedida",
                    width: "20%",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");

                        if (rowData.resultado > 0) {
                            $(td).parent().css("color", "#347dff");
                            $(td).parent().css("font-weight", "bold");
                        }
                    },
                },
                /*,
            {
                data: "Lab",
                width: "10%",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'left')

                }
            }
                */
            ],
        };

        var tableWrapper = $("#tblCatalogoecoObstOrdRes"); // datatable creates the table wrapper by adding with id {your_table_id}_wrapper
        oTable_ecoObstOrdRes = $("#tblCatalogoecoObstOrdRes").dataTable(parms);
        $("#tblCatalogoecoObstOrdRes_length").css("display", "none");
    },

    initDatablesEcoObsProc() {
        var parms = {
            scrollY: "250px",
            scrollCollapse: true,
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
                        $(td).attr("align", "left");
                    },
                },
                {
                    data: "producto",
                    width: "80%",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    data: "cantidadPedida",
                    width: "20%",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");

                        if (rowData.resultado > 0) {
                            $(td).parent().css("color", "#347dff");
                            $(td).parent().css("font-weight", "bold");
                        }
                    },
                },
                /*,
            {
                data: "Lab",
                width: "10%",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'left')

                }
            }
                */
            ],
        };

        var tableWrapper = $("#tblCatalogoEcoObsProcOrdRes"); // datatable creates the table wrapper by adding with id {your_table_id}_wrapper
        oTable_ecoObsProcOrdRes = $("#tblCatalogoEcoObsProcOrdRes").dataTable(
            parms
        );
        $("#tblCatalogoEcoObsProcOrdRes_length").css("display", "none");
    },

    initDatablesEcoGeneral() {
        var parms = {
            scrollY: "250px",
            scrollCollapse: true,
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
                        $(td).attr("align", "left");
                    },
                },
                {
                    data: "producto",
                    width: "80%",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    data: "cantidadPedida",
                    width: "20%",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                        if (rowData.resultado > 0) {
                            $(td).parent().css("color", "#347dff");
                            $(td).parent().css("font-weight", "bold");
                        }
                    },
                },
                /*,
            {
                data: "Lab",
                width: "10%",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'left')

                }
            }
                */
            ],
        };

        var tableWrapper = $("#tblCatalogoEcoGeneOrdRes"); // datatable creates the table wrapper by adding with id {your_table_id}_wrapper
        oTable_ecoGeneralOrdRes = $("#tblCatalogoEcoGeneOrdRes").dataTable(
            parms
        );
        $("#tblCatalogoEcoGeneOrdRes_length").css("display", "none");
    },

    initDatablesRayos() {
        var parms = {
            scrollY: "250px",
            scrollCollapse: true,
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
                        $(td).attr("align", "left");
                    },
                },
                {
                    data: "producto",
                    width: "70%",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    data: "cantidadPedida",
                    width: "20%",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                        if (rowData.resultado > 0) {
                            $(td).parent().css("color", "#347dff");
                            $(td).parent().css("font-weight", "bold");
                        }
                    },
                },
                /*,
            {
                data: "Lab",
                width: "70%",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'left')

                }
            }*/
            ],
        };

        var tableWrapper = $("#tblCatalogoRayosOrdRes"); // datatable creates the table wrapper by adding with id {your_table_id}_wrapper
        oTable_rayosOrdRes = $("#tblCatalogoRayosOrdRes").dataTable(parms);
        $("#tblCatalogoRayosOrdRes_length").css("display", "none");
    },
    initDatablesInterConsulta() {
        var parms = {
            scrollY: "250px",
            scrollCollapse: true,
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
                        $(td).attr("align", "left");
                    },
                },
                {
                    data: "producto",
                    width: "70%",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    data: "cantidadPedida",
                    width: "20%",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                        if (rowData.resultado > 0) {
                            $(td).parent().css("color", "#347dff");
                            $(td).parent().css("font-weight", "bold");
                        }
                    },
                },
                /*,
            {
                data: "Lab",
                width: "10%",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'left')

                }
            }
                */
            ],
        };

        var tableWrapper = $("#tblCatalogointerconsultaOrdRes"); // datatable creates the table wrapper by adding with id {your_table_id}_wrapper
        oTable_interConsulta = $("#tblCatalogointerconsultaOrdRes").dataTable(
            parms
        );
        $("#tblCatalogointerconsultaOrdRes_length").css("display", "none");
    },
    initDatablesTomografia() {
        var parms = {
            scrollY: "250px",
            scrollCollapse: true,
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
                        $(td).attr("align", "left");
                    },
                },
                {
                    data: "producto",
                    width: "80%",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    data: "cantidadPedida",
                    width: "20%",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                        if (rowData.resultado > 0) {
                            $(td).parent().css("color", "#347dff");
                            $(td).parent().css("font-weight", "bold");
                        }
                    },
                },
                /*
            ,
            {
                data: "Lab",
                width: "10%",
                createdCell: function (td, cellData, rowData, row, col) {
                    $(td).attr('align', 'left')

                }
            }*/
            ],
        };

        var tableWrapper = $("#tblCatalogotomografiaOrdRes"); // datatable creates the table wrapper by adding with id {your_table_id}_wrapper
        oTable_tomografia = $("#tblCatalogotomografiaOrdRes").dataTable(parms);
        $("#tblCatalogotomografiaOrdRes_length").css("display", "none");
    },

    async GuardarOrdenesMedicas() {
        var formData = new FormData();
        let datos;
        let resp = [];
        // obtenerDIa =
        // fechaVigencia =$('#txtFechaVigencia').val();

        databafarmacia = DTRecetaFarmacia.rows().data();
        console.log("datos defarmacia", databafarmacia);
        if (OrdenMedica.validarFechaVigencia()) {
            var ListaRecetaDetalleRx = OrdenMedica.DevolverRecetaDetalle(21);
            var ListaRecetaDetalleEcobs = OrdenMedica.DevolverRecetaDetalle(23);
            //var ListaRecetaDetalleEcobsProc = OrdenMedica.DevolverRecetaDetalle(24);
            var ListaRecetaDetalleEcoGeneral =
                OrdenMedica.DevolverRecetaDetalle(20);
            var ListaRecetaDetalleAnatoPatologica =
                OrdenMedica.DevolverRecetaDetalle(3);
            var ListaRecetaDetallePatalogiaClinica =
                OrdenMedica.DevolverRecetaDetalle(2);
            var ListaRecetaDetallePatalogiaClinica_Emergencia =
                OrdenMedica.DevolverRecetaDetalle(29); ///Examen Emergencia
            var ListaRecetaDetalleBancoSangre =
                OrdenMedica.DevolverRecetaDetalle(11);
            var ListaRecetaDetalleFarmacia =
                OrdenMedica.DevolverRecetaDetalle(5);
            console.log("datos Farmacia Detalle", ListaRecetaDetalleFarmacia);
            var ListaRecetaDetalleTomografia =
                OrdenMedica.DevolverRecetaDetalle(22);
            var ListaRecetaDetalleInterconsulta =
                OrdenMedica.DevolverRecetaDetalle(12);

            if (
                ListaRecetaDetalleRx == "<ROOT></ROOT>" &&
                ListaRecetaDetalleEcobs ==
                    "<ROOT></ROOT>" /*&& ListaRecetaDetalleEcobsProc == "<ROOT></ROOT>"*/ &&
                ListaRecetaDetalleEcoGeneral == "<ROOT></ROOT>" &&
                ListaRecetaDetalleAnatoPatologica == "<ROOT></ROOT>" &&
                ListaRecetaDetallePatalogiaClinica == "<ROOT></ROOT>" &&
                ListaRecetaDetallePatalogiaClinica_Emergencia ==
                    "<ROOT></ROOT>" &&
                ListaRecetaDetalleBancoSangre == "<ROOT></ROOT>" &&
                ListaRecetaDetalleFarmacia == "<ROOT></ROOT>" &&
                ListaRecetaDetalleInterconsulta == "<ROOT></ROOT>" &&
                ListaRecetaDetalleTomografia == "<ROOT></ROOT>"
            ) {
                alerta(
                    "warning",
                    "No existe ningún item para registrar en la receta."
                );
                return false;
                //return resp;
            }

            formData.append(
                "_token",
                $("meta[name='csrf-token']").attr("content")
            );

            //rayos
            formData.append("lstRecetaRx", ListaRecetaDetalleRx);
            formData.append("idRecetaRx", $("#hdIdRecetaRX").val());
            //ecoobst
            formData.append("lstRecetaEcoObs", ListaRecetaDetalleEcobs);
            formData.append("idRecetaEcoObs", $("#hdIdRecetaEcoObs").val());
            //EcoGeneral
            formData.append(
                "lstRecetaEcoGeneral",
                ListaRecetaDetalleEcoGeneral
            );
            formData.append("idRecetaEcoGene", $("#hdIdRecetaEcoGene").val());
            //anatoPatolg
            formData.append(
                "lstRecetaAnatoPatologica",
                ListaRecetaDetalleAnatoPatologica
            );
            formData.append(
                "idRecetaAnaPatologica",
                $("#hdIdRecetaAnaPatologica").val()
            );
            //patogClinica
            formData.append(
                "lstRecetaPatalogiaClinica",
                ListaRecetaDetallePatalogiaClinica
            );
            formData.append(
                "idRecetaPatoClinica",
                $("#hdIdRecetaPatoClinica").val()
            );

            //patogClinica-Emergencia
            formData.append(
                "lstRecetaPatalogiaClinica_Emergencia",
                ListaRecetaDetallePatalogiaClinica_Emergencia
            );
            formData.append(
                "idRecetaPatoClinicaEmergencia",
                $("#hdIdRecetaPatoClinicaEmergencia").val()
            );
            console.log(
                "idRecetaPatoClinicaEmergencia",
                $("#hdIdRecetaPatoClinicaEmergencia").val()
            );

            //bancoSangre
            formData.append(
                "lstRecetaBancoSangre",
                ListaRecetaDetalleBancoSangre
            );
            formData.append(
                "idRecetaBancoSangre",
                $("#hdIdRecetabancoSangre").val()
            );
            //tomografia
            formData.append(
                "lstRecetaTomografia",
                ListaRecetaDetalleTomografia
            );
            formData.append(
                "idRecetaTomografia",
                $("#hdIdRecetatomografia").val()
            );
            //Interconsulta
            formData.append(
                "lstRecetaInterconsulta",
                ListaRecetaDetalleInterconsulta
            );
            formData.append(
                "idRecetaInterconsulta",
                $("#hdIdRecetaInterconsulta").val()
            );
            formData.append(
                "ResumenHistoriaClinica",
                $("#txtResumenHistoriaClinica").val()
            );
            formData.append(
                "MotivoInterconsulta",
                $("#txtMotivoInterconsulta").val()
            );
            //farmacia
            formData.append("lstRecetaFarmacia", ListaRecetaDetalleFarmacia);
            formData.append("idRecetaFarmacia", $("#hdIdRecetaFarmacia").val());

            formData.append("IdCuentaAtencion", Variables.IdCuentaAtencion);
            console.log(
                "OrdenMedica.js - GuardarOrdenesMedicas - IdCuentaAtencion",
                Variables.IdCuentaAtencion
            );
            formData.append("IdAtencion", Variables.IdAtencion);
            console.log(
                "OrdenMedica.js - GuardarOrdenesMedicas - IdAtencion",
                Variables.IdAtencion
            );
            formData.append("IdMedico", Variables.IdMedicoLogeado);
            console.log(
                "OrdenMedica.js - GuardarOrdenesMedicas - IdMedico",
                Variables.IdMedicoLogeado
            );

            formData.append("FechaVigencia", $("#txtFechaVigencia").val());
            console.log(
                "OrdenMedica.js - GuardarOrdenesMedicas - FechaVigencia",
                $("#txtFechaVigencia").val()
            );
            formData.append("IdServicioReceta", Variables.IdServicio);
            console.log(
                "OrdenMedica.js - GuardarOrdenesMedicas - IdServicioReceta",
                Variables.IdServicio
            );
            formData.append("IdCama", Variables.IdCama);
            console.log(
                "OrdenMedica.js - GuardarOrdenesMedicas - IdCama",
                Variables.IdCama
            );
            //formData.append('idServicioGeneral', $('#hdIdTipoServicio').val());
            //alert(EvaluacionHospitalizacion.IdNumero);
            formData.append(
                "NroEvaluacion",
                0 //EvaluacionHospitalizacion.IdNumero
            );
            //alert(EvaluacionHospitalizacion.IdNumero);
            console.log(
                "OrdenMedica.js - GuardarOrdenesMedicas - NroEvaluacion",
                0 //EvaluacionHospitalizacion.IdNumero
            );
            formData.append('OtrosMedicamentos',$('#txtOtrosMedicamentos').val());
            formData.append('IdTipoServicio', 3); // HOSP
            try {
                //Cargando(1);
                datos = await $.ajax({
                    method: "POST",
                    url: "/Recetas/GuardarRecetaHOSP",
                    data: formData,
                    dataType: "json",
                    cache: false,
                    processData: false,
                    contentType: false,
                });
                //Cargando(0);
                alerta(
                    "success",
                    "",
                    "Las Ordenes Médicas se guardaron correctamente."
                );
                console.log(
                    "OrdenMedicaHO.js - GuardarOrdenesMedicas - Recetas/GuardarRecetaHOSP",
                    datos
                );
                resp = datos;
            } catch (error) {
                console.error(JSON.stringify(error));
                //Cargando(0);
                alerta("error", "", JSON.stringify(error));
            }
        } else {
            return false;
        }

        return resp;
    },

    async CargarOrdenesMedicasPorIdCuentaAtencionPorEvaluacion(
        idCuenta,
        nroEvaluacion
    ) {
        // KHOYOSI
        // var resp = [];
        let resp = [];
        let datos;
        var data = new FormData();
        data.append("_token", $("meta[name='csrf-token']").attr("content"));
        data.append("IdCuentaAtencion", idCuenta);
        data.append("NroEvaluacion", nroEvaluacion);

        console.log("IdCuentaAtencion", idCuenta);
        console.log("NroEvaluacion", nroEvaluacion);

        try {
            DTORdenesMedicas.clear().draw();
            //OrdenMedica.Limpiar();
            datos = await $.ajax({
                method: "POST",
                url: "/Recetas/ListarOrdenesMedicasHOSP",
                data: data,
                dataType: "json",
                cache: false,
                processData: false,
                contentType: false,
            });
            console.log("Recetas/ListarOrdenesMedicasHOSP", datos);

            resp = datos.resultado;
            if (datos.resultado.length > 0) {
                DTORdenesMedicas.rows.add(datos.resultado).draw(false);

                //fnAddData(datos.table);
            }
        } catch (error) {
            alerta("error", "", error);
        }

        return resp;
    },

    async CargarOrdenesMedicasPorIdCuentaAtencion(idCuenta) {
        // KHOYOSI
        //var resp = [];
        let datos;
        var data = new FormData();
        data.append("_token", $("meta[name='csrf-token']").attr("content"));
        data.append("IdCuentaAtencion", idCuenta);

        try {
            DTORdenesMedicas.clear().draw();
            //OrdenMedica.Limpiar();
            datos = await $.ajax({
                method: "POST",
                url: "/Recetas/ListarOrdenesMedicasHOSP",
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
            alerta("error", "", error);
        }

        //return resp;
    },

    alerta(icono, titulo, mensaje) {
        Swal.fire({
            title: titulo,
            text: mensaje,
            icon: icono,
            allowOutsideClick: false,
        });
    },

    IniciarDataTables() {
        OrdenMedica.IniciarDataTablesOrdenesMedicas();
        OrdenMedica.IniciarDataTablesRecetasMedicas();
        OrdenMedica.IniciarDataTablesInterconsulta();
        OrdenMedica.IniciarDataTablesDiagnosticosInterconsulta();

        OrdenMedica.initDatablesFarmacia();
        OrdenMedica.initDatablesPaquetes();
        OrdenMedica.initDatablesAnatomiaPatologica();
        OrdenMedica.initDatablesParologiaClinica();
        OrdenMedica.initDatablesParologiaClinica_Emer(); //Laboratorio Emergencia
        OrdenMedica.initDatablesBancoSangre();
        OrdenMedica.initDatablesEcoObs();
        OrdenMedica.initDatablesEcoObsProc();
        OrdenMedica.initDatablesEcoGeneral();
        OrdenMedica.initDatablesRayos();
        OrdenMedica.initDatablesInterConsulta();
        OrdenMedica.initDatablesTomografia();
    },

    async ObtenerLaboraEmpleado() {
        var IdMedico = Variables.IdMedicoLogeado;
        console.log("IdMedico", IdMedico);
        var resp = null;
        var token = $('meta[name="csrf-token"]').attr("content");

        try {
            let datos = await $.ajax({
                method: "POST",
                url: "/OrdenMedica/ObtenerLaboraEmpleadoHOSP",
                data: JSON.stringify({
                    IdMedico: IdMedico,
                }),
                dataType: "json",
                headers: {
                    "X-CSRF-TOKEN": token,
                    "Content-Type": "application/json",
                },
                cache: false,
            });

            if (datos.idLaboraSubArea) {
                resp = datos.idLaboraSubArea;
                console.log("averrr", resp);
                if (resp == 17) {
                    //$("#cboFarmacia").val(22).trigger("chosen:updated");
                    $("#cboFarmacia").val(22).trigger("change");
                    //OrdenMedicaHOSP.cargarMedicamentos(22);
                } else {
//                    $("#cboFarmacia").val(11).trigger("chosen:updated");
                    $("#cboFarmacia").val(11).trigger("change");
                }
            } else {
                console.log("No se obtuvo el valor idLaboraSubArea");
            }
        } catch (error) {
            OrdenMedica.alerta(3, error);
        }

        return resp;
    },

    async consulta_stock(idProducto, idAlmacen) {
        let url = `/ws/emergencia/consulta_farm_saldo_x_almacen`;
        let data = { idProducto, idAlmacen };

        try {
            let response = await $.ajax({
                method: "GET",
                url: url,
                data: data,
            });

            let obj = JSON.parse(response);
            let { result } = obj;

            result = result.substring(0, 1) === "." ? "0" + result : result;
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

    validarFechaVigencia() {
        // Obtener el valor de la fecha en formato dd/mm/yyyy
        let fechaStr = $("#txtFechaVigencia").val();

        // Convertir la fecha a formato yyyy-mm-dd
        let partesFecha = fechaStr.split("/");
        let fechaVigencia = new Date(
            `${partesFecha[2]}-${partesFecha[1]}-${partesFecha[0]}`
        );

        if (isNaN(fechaVigencia.getTime())) {
            alerta(
                "warning",
                "Formato de fecha inválido. Usa el formato dd/mm/yyyy."
            );
            return false; // Retorna false si el formato es inválido
        }

        // Fecha de hoy
        let fechaHoy = new Date();

        // Fecha límite (hoy + 8 días)
        let fechaLimite = new Date(fechaHoy);
        fechaLimite.setDate(fechaHoy.getDate() + 8);

        // Validación
        if (fechaVigencia > fechaLimite) {
            alerta(
                "warning",
                "La fecha de vigencia no puede ser mayor a los 8 días a partir de hoy."
            );
            return false; // Retorna false si la fecha es mayor a la fecha límite
        }

        return true; // Retorna true si pasa todas las validaciones
    },

    escapeHTML(str) {
        // Para recuperar los saltos de línea
        return String(str)
            .replace(/&/g, "&amp;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/\n/g, "&#10;"); // Escapar salto de línea para HTML/XML
    },

    DevolverRecetaDetalle(idCatalogo) {
        console.log(
            "OrdenMedica.js - DevolverRecetaDetalle - idCatalogo",
            idCatalogo
        ); //PGONZALESC
        //dataPatoClinica_Central = DTRecetaPatoCli.rows().data();//Central
        // console.log('datosssss patoclinica',dataPatoClinica_Central);
        var lstRecetadetalle = [];
        var html = "";
        //html += '[';
        switch (idCatalogo) {
            //RayosX
            case 21:
                dataRx = DTRecetaRayosX.rows().data();
                console.log("datos tabla detalle", dataRx);
                dataRx.each(function (value, index) {
                    var txtFrec = "#txtFrec_" + dataRx[index]["idItem"];
                    var txtCant = "#txtCant_" + dataRx[index]["idItem"];
                    var cboDx = "#cboDx_" + dataRx[index]["idItem"];
                    console.log("valor de txtCant", txtCant);
                    html +=
                        '<RecetaDetalle idItem="' +
                        dataRx[index]["idItem"] +
                        '" cantidadPedida="' +
                        $(txtCant).val() +
                        '" precio="' +
                        dataRx[index]["precio"] +
                        '" total="' +
                        $(txtCant).val() * dataRx[index]["precio"] +
                        '" idDosisRecetada="" idViaAdministracion="" observaciones="' +
                        $(txtFrec).val() +
                        '" dx="' +
                        $(cboDx).val() +
                        '"></RecetaDetalle>';
                });
                break;
            //EcoObs
            case 23:
                dataEcoObs = DTRecetaEcoObst.rows().data();
                dataEcoObs.each(function (value, index) {
                    var txtFrec = "#txtFrec_" + dataEcoObs[index]["idItem"];
                    var txtCant = "#txtCant_" + dataEcoObs[index]["idItem"];
                    var cboDx = "#cboDx_" + dataEcoObs[index]["idItem"];
                    html +=
                        '<RecetaDetalle idItem="' +
                        dataEcoObs[index]["idItem"] +
                        '" cantidadPedida="' +
                        $(txtCant).val() +
                        '" precio="' +
                        dataEcoObs[index]["precio"] +
                        '" total="' +
                        $(txtCant).val() * dataEcoObs[index]["precio"] +
                        '" idDosisRecetada="" idViaAdministracion="" observaciones="' +
                        $(txtFrec).val() +
                        '" dx="' +
                        $(cboDx).val() +
                        '"></RecetaDetalle>';
                });
                break;
            //EcoGeneral
            case 20:
                dataEcoGeneral = DTRecetaEcoGene.rows().data();
                dataEcoGeneral.each(function (value, index) {
                    var txtFrec = "#txtFrec_" + dataEcoGeneral[index]["idItem"];
                    var txtCant = "#txtCant_" + dataEcoGeneral[index]["idItem"];
                    var cboDx = "#cboDx_" + dataEcoGeneral[index]["idItem"];
                    html +=
                        '<RecetaDetalle idItem="' +
                        dataEcoGeneral[index]["idItem"] +
                        '" cantidadPedida="' +
                        $(txtCant).val() +
                        '" precio="' +
                        dataEcoGeneral[index]["precio"] +
                        '" total="' +
                        $(txtCant).val() * dataEcoGeneral[index]["precio"] +
                        '" idDosisRecetada="" idViaAdministracion="" observaciones="' +
                        $(txtFrec).val() +
                        '" dx="' +
                        $(cboDx).val() +
                        '"></RecetaDetalle>';
                });
                break;
            //AnaPatologica
            case 3:
                dataanatPatologica = DTRecetaAnaPato.rows().data();
                dataanatPatologica.each(function (value, index) {
                    var txtFrec =
                        "#txtFrec_" + dataanatPatologica[index]["idItem"];
                    var txtCant =
                        "#txtCant_" + dataanatPatologica[index]["idItem"];
                    var cboDx = "#cboDx_" + dataanatPatologica[index]["idItem"];
                    html +=
                        '<RecetaDetalle idItem="' +
                        dataanatPatologica[index]["idItem"] +
                        '" cantidadPedida="' +
                        $(txtCant).val() +
                        '" precio="' +
                        dataanatPatologica[index]["precio"] +
                        '" total="' +
                        $(txtCant).val() * dataanatPatologica[index]["precio"] +
                        '" idDosisRecetada="" idViaAdministracion="" observaciones="' +
                        $(txtFrec).val() +
                        '" dx="' +
                        $(cboDx).val() +
                        '"></RecetaDetalle>';
                });
                break;
            //PatoClinica
            case 2:
                dataPatoClinica = DTRecetaPatoCli.rows().data();
                dataPatoClinica.each(function (value, index) {
                    var txtFrec =
                        "#txtFrec_" + dataPatoClinica[index]["idItem"];
                    var txtCant =
                        "#txtCant_" + dataPatoClinica[index]["idItem"];
                    var cboDx = "#cboDx_" + dataPatoClinica[index]["idItem"];
                    html +=
                        '<RecetaDetalle idItem="' +
                        dataPatoClinica[index]["idItem"] +
                        '" cantidadPedida="' +
                        $(txtCant).val() +
                        '" precio="' +
                        dataPatoClinica[index]["precio"] +
                        '" total="' +
                        $(txtCant).val() * dataPatoClinica[index]["precio"] +
                        '" idDosisRecetada="" idViaAdministracion="" observaciones="' +
                        $(txtFrec).val() +
                        '" dx="' +
                        $(cboDx).val() +
                        '"></RecetaDetalle>';
                });

                break;

            //PatoClinica-Examen Emergencia
            case 29:
                dataPatoClinica_Emergencia = DTRecetaPatoCli_Emer.rows().data(); //emergencia Emxamenes
                dataPatoClinica_Emergencia.each(function (value, index) {
                    var txtFrec =
                        "#txtFrec_" +
                        dataPatoClinica_Emergencia[index]["idItem"];
                    var txtCant =
                        "#txtCant_" +
                        dataPatoClinica_Emergencia[index]["idItem"];
                    var cboDx =
                        "#cboDx_" + dataPatoClinica_Emergencia[index]["idItem"];

                    html +=
                        '<RecetaDetalle idItem="' +
                        dataPatoClinica_Emergencia[index]["idItem"] +
                        '" cantidadPedida="' +
                        $(txtCant).val() +
                        '" precio="' +
                        dataPatoClinica_Emergencia[index]["precio"] +
                        '" total="' +
                        $(txtCant).val() *
                            dataPatoClinica_Emergencia[index]["precio"] +
                        '" idDosisRecetada="" idViaAdministracion="" observaciones="' +
                        $(txtFrec).val() +
                        '" dx="' +
                        $(cboDx).val() +
                        '"></RecetaDetalle>';
                });

                break;
            //BancoSangre
            case 11:
                databancoSangre = DTRecetaBancoSan.rows().data();
                databancoSangre.each(function (value, index) {
                    var txtFrec =
                        "#txtFrec_" + databancoSangre[index]["idItem"];
                    var txtCant =
                        "#txtCant_" + databancoSangre[index]["idItem"];
                    var cboDx = "#cboDx_" + databancoSangre[index]["idItem"];
                    html +=
                        '<RecetaDetalle idItem="' +
                        databancoSangre[index]["idItem"] +
                        '" cantidadPedida="' +
                        $(txtCant).val() +
                        '" precio="' +
                        databancoSangre[index]["precio"] +
                        '" total="' +
                        $(txtCant).val() * databancoSangre[index]["precio"] +
                        '" idDosisRecetada="" idViaAdministracion="" observaciones="' +
                        $(txtFrec).val() +
                        '" dx="' +
                        $(cboDx).val() +
                        '"></RecetaDetalle>';
                });
                break;
            //Tomografia
            case 22:
                dataTomografia = DTRecetaTomo.rows().data();
                dataTomografia.each(function (value, index) {
                    var txtFrec = "#txtFrec_" + dataTomografia[index]["idItem"];
                    var txtCant = "#txtCant_" + dataTomografia[index]["idItem"];
                    var cboDx = "#cboDx_" + dataTomografia[index]["idItem"];
                    html +=
                        '<RecetaDetalle idItem="' +
                        dataTomografia[index]["idItem"] +
                        '" cantidadPedida="' +
                        $(txtCant).val() +
                        '" precio="' +
                        dataTomografia[index]["precio"] +
                        '" total="' +
                        $(txtCant).val() * dataTomografia[index]["precio"] +
                        '" idDosisRecetada="" idViaAdministracion="" observaciones="' +
                        $(txtFrec).val() +
                        '" dx="' +
                        $(cboDx).val() +
                        '"></RecetaDetalle>';
                });
                break;
            //Interconsultas
            case 12:
                datainterconsulta = DTRecetaInterconsulta.rows().data();
                console.log('datainterconsulta',datainterconsulta)
                datainterconsulta.each(function (value, index) {
                    var txtFrec =
                        "#txtFrec_" + datainterconsulta[index]["idItem"];
                    var txtCant =
                        "#txtCant_" + datainterconsulta[index]["idItem"];
                    var cboDx = "#cboDx_" + datainterconsulta[index]["idItem"];
                    html +=
                        '<RecetaDetalle idItem="' +
                        datainterconsulta[index]["idItem"] +
                        '" cantidadPedida="' +
                        1 +
                        '" precio="' +
                        datainterconsulta[index]["precio"] +
                        '" total="' +
                        1 * datainterconsulta[index]["precio"] +
                        '" idDosisRecetada="" idViaAdministracion="" observaciones="' +
                        "" +
                        '" dx="' +
                        datainterconsulta[index]["dx"] +
                        '" resumenHistoriaClinica="' +
                        OrdenMedica.escapeHTML(
                            datainterconsulta[index]["resumenHistoriaClinica"]
                        ) +
                        '" motivoInterconsulta="' +
                        OrdenMedica.escapeHTML(
                            datainterconsulta[index]["motivoInterconsulta"]
                        ) +
                        '" tiposDx="' +
                        datainterconsulta[index]["tiposDx"] +
                        '"></RecetaDetalle>';
                    /*html += '{"idItem":"' + datainterconsulta[index]["idItem"] + '","cantidadPedida":"' + $(txtCant).val() +
                        '","precio":"' + datainterconsulta[index]["precio"] + '","total":"' + datainterconsulta[index]["total"] +
                        '","idEspecialidad":"' + datainterconsulta[index]["idEspecialidad"] + '", "otraEspecialidad":"' + datainterconsulta[index]["otraEspecialidad"] + '"},';     */ //KHOYOSI
                });
                break;
            //Medicamento - Farmacia
            case 5:
                databafarmacia = DTRecetaFarmacia.rows().data();
                databafarmacia.each(function (value, index) {
                    var txtFrec = "#txtFrec_" + databafarmacia[index]["idItem"];
                    var txtCant = "#txtCant_" + databafarmacia[index]["idItem"];
                    var cboDx = "#cboDx_" + databafarmacia[index]["idItem"];
                    html +=
                        '<RecetaDetalle idItem="' +
                        databafarmacia[index]["idItem"] +
                        '" cantidadPedida="' +
                        $(txtCant).val() +
                        '" precio="' +
                        databafarmacia[index]["precio"] +
                        '" total="' +
                        $(txtCant).val() * databafarmacia[index]["precio"] +
                        '" idDosisRecetada="' +
                        databafarmacia[index]["idDosisRecetada"] +
                        '" idViaAdministracion="' +
                        databafarmacia[index]["idViaAdministracion"] +
                        '" observaciones="' +
                        $(txtFrec).val() +
                        '" dx="' +
                        $(cboDx).val() +
                        '"></RecetaDetalle>';
                });
                break;
        }
        //html += ']';
        //var htmlCompleto = html.replace(",]", "]")
        var htmlCompleto = "<ROOT>" + html + "</ROOT>";

        return htmlCompleto;
    },

    async EliminarOrdenesMedicas(idReceta) {
        var midata = new FormData();
        midata.append("_token", $("meta[name='csrf-token']").attr("content"));
        midata.append("idReceta", idReceta);
        //midata.append('idServicioGeneral', $('#hdIdTipoServicio').val());
        //Cargando(1);
        $.ajax({
            method: "POST",
            url: "/Recetas/EliminarRecetaHosp",
            data: midata,
            dataType: "json",
            processData: false,
            contentType: false,
            async: false,
            success: function (datos) {
                if (datos.resultado) {
                    alerta(
                        "success",
                        "Receta",
                        "Se elimino correctamente la receta Nro. " + idReceta
                    );
                    $("#btnBuscar").click();
                } else {
                    alerta("danger", "Receta", datos.error);
                    return false;
                }
            },
            error: function (msg) {
                //Cargando(0);
                //alerta('3', "Error al eliminar receta");
                alerta("danger", "Receta", "Error al eliminar receta");
            },
        });
    },

    async EliminarInterconsulta(idReceta) {
        var midata = new FormData();
        midata.append("_token", $("meta[name='csrf-token']").attr("content"));
        midata.append("idReceta", idReceta);
        //midata.append('idServicioGeneral', $('#hdIdTipoServicio').val());
        //Cargando(1);
        $.ajax({
            method: "POST",
            url: "/hospitalizacion/EliminarInterconsultaHosp",
            data: midata,
            dataType: "json",
            processData: false,
            contentType: false,
            async: false,
            success: function (datos) {
                if (datos.resultado) {
                    alerta(
                        "success",
                        "Interconsulta",
                        "Se elimino correctamente la Interconsulta Nro. " +
                            idReceta
                    );
                    $("#btnBuscar").click();
                } else {
                    alerta("danger", "Interconsulta", datos.error);
                    return false;
                }
            },
            error: function (msg) {
                //Cargando(0);
                //alerta('3', "Error al eliminar receta");
                alerta(
                    "danger",
                    "Hospitalización",
                    "Error al eliminar Interconsulta"
                );
            },
        });
    },
};

var OrdenMedicaHOSP = {
    ValidarAgregar: 0,
    Forzar: 0,

    Plugins() {

    },

    InitialCharge() {
        $("#btnLimpiar").trigger("click");

    },

    buscapaciente(numero) {

    },

    buscapaciente_por_sistemporal(numero) {
 
    },

    ListarOrdenMedicaHospitalizacionFiltrar(
        NroOrdenMedica,
        NroCuenta,
        NroDocumento,
        NroHistoria,
        Apellidos,
        RangoDias,
        PuntoCarga
    ) {
        oTable_OrdenMedicaHospitalizacion.fnClearTable();
        fetch(
            `/hospitalizacion/ListarOrdenMedicaHospitalizacionFiltrar?NroOrdenMedica=${NroOrdenMedica}&NroCuenta=${NroCuenta}&NroDocumento=${NroDocumento}&NroHistoria=${NroHistoria}&Apellidos=${Apellidos}&RangoDias=${RangoDias}&PuntoCarga=${PuntoCarga}`)
                .then((res) => res.json())
                .catch((error) => console.log(error))
                .then((res) => {
                    if (res.resultado == 1) {
                        if (res.data.length > 0) {
                            oTable_OrdenMedicaHospitalizacion.fnAddData(res.data);
                            //oTable_OrdenMedicaHospitalizacion.draw();
                        }
                    } else {
                        toastr.error(res.mensaje);
                        if (res.resultado == 3) window.location = "/hospitalizacion/orden_medica";
                    }
                });
            
    },

    listaOrdenMedica(IdAtencion, tipo) {
 
    },

    InsertaOModificaAdmisionEmergencia(midata) {
 
    },

    InitDatablesOrdenMedicaHospitalizacion() {
        var parms = {
            destroy: true,
            bFilter: true,
            order: [[0, "desc"]],
            ordering: false,
            scrollX: true,
            dom: 'tip', 
            columns: [
                {
                    width: "2%",
                    data: "idReceta",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "2%",
                    data: "FechaRecetaMedica",
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
                    visible: false
                },
                {
                    width: "5%",
                    data: "TipoDoc",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                    visible: false
                },                
                {
                    width: "2%",
                    data: "NroDocumento",
                    render: function(data, type, row) {
                        if (type === 'display') {
                            return `${row.TipoDoc || ''} ${data || ''}`;
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
                    render: function(data, type, row) {
                        if (type === 'display') {
                            return `${data || ''} ${row.ApellidoMaterno || ''} ${row.Nombres || ''}`;
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
                    visible: false
                },
                {
                    width: "5%",
                    data: "Nombres",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                    visible: false
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
                    visible: false
                },  
                {
                    width: "5%",
                    data: "CamaEgreso",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                    visible: false
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
                    visible: false
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
                    visible: false
                },  
                {
                    width: "5%",
                    data: "idMedicoReceta",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                    visible: false
                },                                               
                {
                    width: "5%",
                    data: "IdEmpleado",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                    visible: false
                },

                {
                    width: "5%",
                    data: "movimiento",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                    visible: false
                },
                {
                    width: "5%",
                    data: "boleta",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                    visible: false
                },    
                {
                    width: "5%",
                    data: "idEstado",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                    visible: false
                },    
                {
                    width: "2%",
                    data: "estadoReceta",
                    render: function (data, type, row) {
                        let estadoColor = "";
                        //let estadoTexto = data;
                        switch (row.idEstado) {
                            case "0":
                                estadoColor = "background-color: #dc3545; color: white;"; // Rojo para "Anulado"
                                break;
                            case "1":
                                estadoColor = "background-color: #ffc107; color: black;"; // Amarillo para "Registrado"
                                break;
                            case "2":
                                estadoColor = "background-color: #17a2b8; color: white;"; // Azul para "Despachado"
                                break;
                            case "3":
                                estadoColor = "background-color: #28a745; color: white;"; // Verde para "Con Boleta"
                                break;
                            default:
                                estadoColor = "background-color: #6c757d; color: white;"; // Gris para desconocidos
                                break;
                        }
                            return `<span style="${estadoColor} padding: 5px 10px; border-radius: 5px; display: inline-block; font-size: 12px;">${data}</span>`;
                        
                    },
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "center");
                    },
                },
                                                                                   
                {
                    width: "1%",
                    data: null,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "center");
                    },
                    render: function (data, type, row, meta) {
                        let linkPDF = '' ;
                        switch (row.IdPuntoCarga) {
                            case "12": // Interconsultas
                                linkPDF = `hospitalizacion/SolicitudInterconsulta/${row.idReceta}?PuntoCarga=${row.IdPuntoCarga}`;
                                break;
                            case "5": // Farmacia
                                linkPDF = `Recetas/informes/generarPDFA4HOSP/${row.idReceta}`;
                                break;    
                            default:
                                linkPDF = `Recetas/informes/generarPDFHOSP/${row.idReceta}`;
                                break;
                        }
                        return `<button class="btn btn-warning btn-sm ver-pdf" data-url="/${linkPDF}">
                                        <i class="fa fa-file-pdf-o" aria-hidden="true"></i>
                                    </button>`;
                    }
                        
                },
            ],
            rowCallback: function(row, data) {
                $(row).css('font-size', '12px');
            },
        };

        oTable_OrdenMedicaHospitalizacion = $("#tbOrdenMedica").dataTable(
            parms
        );
    },

    calcularFechaDeNacimiento(edad, tipoedad) {
        // var fechaActual = "";
        // if (edad != "" && tipoedad != null) {
        //     fechaActual = new Date();
        //     if (tipoedad == 3) {
        //         fechaActual.setDate(fechaActual.getDate() - edad);
        //     } else if (tipoedad == 2) {
        //         fechaActual.setMonth(fechaActual.getMonth() - edad);
        //     } else if (tipoedad == 1) {
        //         fechaActual.setFullYear(fechaActual.getFullYear() - edad);
        //     }
        //     fechaActual = fechaActual.toLocaleDateString("en-GB");
        // }
        // return fechaActual;
    },

     buscarCuenta() {
        let nroCuenta = $("#txtNroCuenta").val().trim();

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
                    OrdenMedicaHOSP.LimpiarDatosPaciente();
                    if (Number(paciente["LlegoAlServicio"]) == 0) {
                        Swal.fire({
                            icon: 'warning',
                            title: '¡Atención!',
                            html: paciente["Apellido Paterno"] + ' ' + paciente["Apellido Materno"] + ', ' + paciente["Nombres"] + 
                                  ' aún no ha confirmado su llegada al servicio.<br><strong>Por favor, realizar la confirmación en Admisión lo antes posible.</strong>',
                            confirmButtonText: 'Entendido',
                            allowOutsideClick: false,
                            allowEscapeKey: false
                        });
                        return;
                        
                    }
                    if (Number(paciente["IdEstadoCuenta"]) > 1) {
                        Swal.fire({
                            toast: true,
                            position: 'top-end',
                            icon: 'warning',
                            title: 'Cuenta denegada.\nEstado: ' + paciente["EstadoCuenta"],
                            showConfirmButton: false,
                            timer: 2000,
                            timerProgressBar: true
                        });
                        return;
                    }

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
                    $("#hdnIdMedicoLogeado").val( $("#cboMedicoReceta").val() );

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

                    //Trae Medicamentos
                    $("#cboFarmacia").val("19").trigger("change");

                    Swal.fire({
                        toast: true,
                        position: 'top-end',
                        icon: 'success',
                        title: 'Dato del paciente encontrado.\nEstado: ' + paciente["EstadoCuenta"],
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true
                    });

                } else if (response.resultado === "3") {
                    OrdenMedicaHOSP.LimpiarDatosPaciente();
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
                    OrdenMedicaHOSP.LimpiarDatosPaciente();
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

    LimpiarDatosPaciente() {
        // Limpiar Datos del paciente - Modal
        $("#txtNombrePaciente, #txtDocumento, #txtNroHC, #txtFteFinanciamento, #txtServicioActual").val("");
        // Datos ocultos
        $("#idTipoServicio, #hdnIdAtencion, #hdnIdCuentaAtencion, #hdnIdMedicoLogeado, #hdnIdUsuarioLogeado, #hdnIdServicio, #hdnIdCama, #hdIdTipoFuenteFian, #hdIdPaciente").val("");
        //Limpiar Tabla Dx
        $("#tblDiagnosticosRecetaMedica tbody").empty();
    },


    LimpiarModalOrdenMedica() {
        // ===================== FARMACIA =====================
        $("#cboFarmacia").val("19").trigger("change");
        $("#cboMedicamento").val("").trigger("change");
        $("#s_stock").text("0");
        $("#chkConStock").prop("checked", false);
        $("#txtCAntidadFarmacia").val("");

        $("#txtFrecuencia").val("");
        DTRecetaFarmacia.clear().draw(false);
        $("#txtOtrosMedicamentos").val("");

        // $("#cboDosis").prop('selectedIndex', 1).trigger("change");
        // $("#cboVia").prop('selectedIndex', 1).trigger("change");        
        // $("#cboDosis").val($("#cboDosis option").eq(1).val()).trigger("change");
        // $("#cboVia").val($("#cboVia option").eq(1).val()).trigger("change");
        $("#cboDosis").val("0").trigger("change");
        $("#cboVia").val("0").trigger("change");
        
        
        // ===================== LABORATORIO =====================
        //$("#cboLab").val("").trigger("chosen:updated");
        $("#cboLab").val("").trigger("change");
        $("#txtCAntidadLab").val("");
        DTRecetaPatoCli.clear().draw(false);
        DTRecetaPatoCli_Emer.clear().draw(false);
    
        // ===================== ANATOMÍA PATOLÓGICA =====================
        //$("#cboAnatomiaPatologica").val("").trigger("chosen:updated");
        $("#cboAnatomiaPatologica").val("").trigger("change");
        $("#txtCAntidadAnatomia").val("");
        DTRecetaAnaPato.clear().draw(false);

        // ===================== BANCO DE SANGRE =====================
//        $("#cboBancoSangre").val("").trigger("chosen:updated");
        $("#cboBancoSangre").val("").trigger("change");
        $("#txtCAntidadBanco").val("");
        //$("#tblCatalogoBancoSangre tbody").empty();
        DTRecetaBancoSan.clear().draw(false);
    
        // ===================== ECOGRAFÍA OBSTÉTRICA =====================
//        $("#cboEcoObstetrica").val("").trigger("chosen:updated");
        $("#cboEcoObstetrica").val("").trigger("change");
        $("#txtCAntidadEcoObs").val("");
        DTRecetaEcoObst.clear().draw(false);
    
        // ===================== ECOGRAFÍA GENERAL =====================
//        $("#cboEcoGeneral").val("").trigger("chosen:updated");
        $("#cboEcoGeneral").val("").trigger("change");
        $("#txtCAntidadEcoGen").val("");
        DTRecetaEcoGene.clear().draw(false);
    
        // ===================== RAYOS X =====================
//        $("#cboRx").val("").trigger("chosen:updated");
        $("#cboRx").val("").trigger("change");
        $("#txtCAntidadRx").val("");
        //$("#tblCatalogoRayos tbody").empty();
        DTRecetaRayosX.clear().draw(false);    
        // ===================== TOMOGRAFÍA =====================
//        $("#cboTomografia").val("").trigger("chosen:updated");
        $("#cboTomografia").val("").trigger("change");
        $("#txtCAntidadTomo").val("");
        //$("#tblCatalogoTomografia tbody").empty();
        DTRecetaTomo.clear().draw(false);
        // ===================== INTERCONSULTAS =====================
        $("#txtResumenHistoriaClinica").val("");
        $("#txtMotivoInterconsulta").val("");
        $("#b_descripciondia").val("");
        $("#div_dx").empty();
        //$("#tblCatalogointerconsultas tbody").empty();
        DTRecetaInterconsulta.clear().draw(false);

    },

    eventos() {

        //Camas - INICIO 
        $('#modalCamas').on('show.bs.modal', function () {
            cargarServicios();
        });
        
        function cargarServicios() {
            $('#contenedorServicios').show().html('<p class="text-muted">Cargando servicios...</p>');
            $('#contenedorCamas').hide();
            $('#tituloModalCamas').text('Seleccionar Servicio');
        
            $.ajax({
                url: '/hospitalizacion/obtieneservicios',
                method: 'POST',
                data: {
                    idTipoServicio: 3,
                    _token: $('meta[name="csrf-token"]').attr('content')
                },
                success: function (data) {
                    if (!data.length) {
                        $('#contenedorServicios').html('<p class="text-danger">No se encontraron servicios.</p>');
                        return;
                    }
        
                    // Agrupar servicios por la primera letra
                    const grupos = {};
                    data.forEach(servicio => {
                        const letra = servicio.Nombre.trim().charAt(0).toUpperCase();
                        if (!grupos[letra]) {
                            grupos[letra] = [];
                        }
                        grupos[letra].push(servicio);
                    });
        
                    // Generar HTML por grupos
                    let html = '';
                    const letrasOrdenadas = Object.keys(grupos).sort();
        
                    letrasOrdenadas.forEach(letra => {
                        html += `
                        <div class="d-flex justify-content-center align-items-center text-muted my-3">
                            <div class="flex-grow-1 w-100">
                                <hr class="m-0">
                            </div>
                            <h6 class="mx-3 mb-0 small font-weight-bold text-uppercase">${letra}</h6>
                            <div class="flex-grow-1 w-100">
                                <hr class="m-0"">
                            </div>
                        </div>                       
                        
                        <div class="row">`;
        
                        grupos[letra].forEach(servicio => {
                            html += `
                                <div class="col-6 col-sm-6 col-md-6 col-lg-3 mb-3">
                                <button class="btn btn-servicio-custom servicio-btn"
                                        data-id="${servicio.IdServicio}"
                                        data-nombre="${servicio.Nombre.trim()}">
                                    <div class="d-flex w-100 align-items-center justify-content-between">
                                    
                                    <!-- Ícono -->
                                    <div class="d-flex align-items-center justify-content-center" style="width: 30px;">
                                        <i class="fa fa-hospital-o fa-lg text-primary"></i>
                                    </div>
                                    
                                    <!-- Texto centrado -->
                                    <div class="flex-grow-1 text-center">
                                        <strong class="d-block text-dark">${servicio.Nombre.trim()}</strong>
                                        <small class="text-muted">${servicio.TipoServicio.trim()}</small>
                                    </div>

                                    <!-- Espacio en blanco del mismo ancho que el ícono -->
                                    <div style="width: 30px;"></div>

                                    </div>
                                </button>
                                </div>
                                `;
                        });
        
                        html += '</div>'; // Cierra el grupo de filas
                    });
        
                    $('#contenedorServicios').html(html);
                },
                error: function () {
                    $('#contenedorServicios').html('<p class="text-danger">Error al cargar los servicios.</p>');
                }
            });
        }
        
        
        // Al hacer clic en un servicio, cargar camas
        $(document).on('click', '.servicio-btn', function () {
            const servicioId = $(this).data('id');
            const servicioNombre = $(this).data('nombre');
        
            $('#tituloModalCamas').text(`Camas de ${servicioNombre}`);
            $('#contenedorServicios').hide();
            $('#contenedorCamas').show();
            $('#listaCamas').html('<p class="text-muted">Cargando camas...</p>');
        
            $.ajax({
            url: '/hospitalizacion/obtenercamas',
            method: 'POST',
            data: {
                IdServicioPropietario: servicioId,
                _token: $('meta[name="csrf-token"]').attr('content')
            },
            success: function (response) {
                if (!response.length) {
                $('#listaCamas').html('<p class="text-warning">No se encontraron camas.</p>');
                return;
                }
        
                let html = '<div class="row">';
                response.forEach(cama => {
                    const claseEstado = obtenerClaseEstadoPersonalizado(cama);
                    const textoEstado = cama.Estado || '—';
                
                    html += `
                    <div class="col-6 col-sm-4 col-md-3 col-lg-2 mb-3">
                        <div class="card text-center cama-card ${claseEstado} h-100" data-idcuenta="${cama.idcuentaatencion || ''}">
                            <div class="card-body p-2">
                                <i class="fa fa-bed fa-2x mb-2"></i>
                                <h6 class="card-title mb-1">Cama ${cama.Codigo}</h6>
                                <p class="mb-0"><small>${textoEstado}</small></p>
                                <p class="mb-0"><small>${cama.nrohistoriaclinica ? 'HC: ' + cama.nrohistoriaclinica : '—'}</small></p>
                                <p class="mb-0"><small>${cama.idcuentaatencion ? 'Cuenta: ' + cama.idcuentaatencion : cama.IdEstadoCama === '3' ? '<b>ALTA ADMINISTRATIVA PENDIENTE</b>' : '—'}</small></p>
                                <p class="mb-0"><small>${(cama.apellidoPaterno || '')} ${(cama.apellidoMaterno || '')} ${(cama.primernombre || '')}</small></p>
                            </div>
                        </div>
                    </div>`;
                });
                
                
                html += '</div>';
        
                $('#listaCamas').html(html);
            },
            error: function () {
                $('#listaCamas').html('<p class="text-danger">Error al obtener las camas.</p>');
            }
            });
        });

        $(document).on('click', '.cama-card', function () {
            const idCuenta = $(this).data('idcuenta');
        
            if (idCuenta) {
                const $input = $('#txtNroCuenta');
                $input.val(idCuenta).focus();
                $('#modalCamas').modal('hide');
                OrdenMedicaHOSP.buscarCuenta();
            }
        });
        
        function obtenerClaseEstadoPersonalizado(cama) {
            const idEstado = Number(cama.IdEstadoCama);
        
            if (idEstado === 3 && !cama.idcuentaatencion) {
                return 'estado-ocupada-2';
            }
        
            switch (idEstado) {
                case 1: return 'estado-disponible';
                case 2: return 'estado-reservada';
                case 3: return 'estado-ocupada';
                case 4: return 'estado-limpieza';
                case 5: return 'estado-reparacion';
                default: return 'estado-inhabilitada';
            }
        }
        
        // Botón para volver a la lista de servicios
        $('#btnVolverServicios').on('click', function () {
            cargarServicios();
        });
        
    
        //Camas - FIN

        $("#btnBuscar").on("click", function () {
            // Validar que al menos un campo esté lleno, incluidos los filtros
            const hayTextoBusqueda =
                $("#txtRecetaBusq").val() ||
                $("#txtNroCuentaBusq").val() ||
                $("#txtNroDocBusq").val() ||
                $("#txtHistoriaBusq").val() ||
                $("#txtApellidosBusq").val();
        
            const tieneFiltroFecha = $("#filtroFechas").val() !== "";
            const tienePuntoCarga = $("#filtroPuntoCarga").val() !== "";
        
            if (!hayTextoBusqueda && !tieneFiltroFecha && !tienePuntoCarga) {
                toastr.error("Ingrese al menos un valor para la búsqueda");
                return false;
            }
        
            OrdenMedicaHOSP.ListarOrdenMedicaHospitalizacionFiltrar(
                $("#txtRecetaBusq").val(),
                $("#txtNroCuentaBusq").val(),
                $("#txtNroDocBusq").val(),
                $("#txtHistoriaBusq").val(),
                $("#txtApellidosBusq").val(),
                $("#filtroFechas").val(),     // siempre válido
                $("#filtroPuntoCarga").val()  // opcional
            );
        });
       
        $("#txtNroCuenta").keydown(function(event) {
            if (event.key === "Enter") {
                event.preventDefault(); // Evita el comportamiento por defecto
                OrdenMedicaHOSP.buscarCuenta();
            }
        });

        // $("#b_descripciondia").autocomplete({
        //     source: "../ws/proa/buscar_cie10",
        //     minLength: 1,
        //     select: function(event, ui) {
        //         event = event || window.event;  // Forzar un evento válido
        //         if (ui.item) {
        //             $("#b_IdDiagnostico").val(ui.item.id);
        //             $("#b_cie10").val(ui.item.CodigoCIE10);
        //             $("#b_descripciondia").val(ui.item.value);
        //         }
        //     }
        // });

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
        
         
        // Ejecutar en el input y al cargar
        $(".auto-expand").on("input", OrdenMedicaHOSP.ajustarAltura);

        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            $.fn.dataTable.tables({ visible: true, api: true }).columns.adjust();
        });

        $("#btnLimpiar").on("click", function () {
            $("#txtRecetaBusq").val("");
            $("#txtNroCuentaBusq").val("");
            $("#txtNroDocBusq").val("");
            $("#txtHistoriaBusq").val("");
            $("#txtApellidosBusq").val("");
            $("#filtroFechas").val("3"); // Valor por defecto
            $("#filtroPuntoCarga").val(""); // 'Todos'
        });
        

        $('#btnAgregarOrdenMedica').on('click', function () {
            OrdenMedicaHOSP.LimpiarOrdenesMedicas();
            OrdenMedicaHOSP.HabilitarTabsRecetas(); 
            OrdenMedica.ObtenerLaboraEmpleado();
            OrdenMedicaHOSP.ajustarAltura()
              var IdMedico = Variables.IdMedicoLogeado;
            /*OrdenMedicaHOSP.listaFecha();            
            OrdenMedicaHOSP.ubicaMedico(OrdenMedicaHOSP.ObtenerIdMedicoSesion());*/
            OrdenMedicaHOSP.CargarDiagnosticosInterconsulta();
            $("#txtResumenHistoriaClinica").val($("#txtImpresionDiagnostica").val());
            $('#btnMuestraPaquete').css("visibility", 'visible');
            $(".OpcionesOrdenes").show();
            $("#btnGuardarRecetas").show();
            // $('#modalReceta').modal('show');
            // //Ajustar ancho de tablas
            // $.fn.dataTable.tables({ visible: true, api: true }).columns.adjust();
            $("#txtNroCuenta").val("");


            $("#cboFarmacia").val(19).trigger("change");

            //$('#cboMedicamento').empty().append('<option value="" disabled selected>Sin resultados</option>');
            $('#cboMedicamento').empty().append('<option></option>').val(null).trigger('change');


           OrdenMedicaHOSP.LimpiarDatosPaciente(); // Limpiar Modal
           OrdenMedicaHOSP.LimpiarModalOrdenMedica(); // Limpiar Modal Orden Médica

            $('#modalReceta').modal('show').on('shown.bs.modal', function () {
                $.fn.dataTable.tables({ visible: true, api: true }).columns.adjust(); // Ajustar ancho de tablas
            });

        });

        // $('#cboFarmacia').on('change', function () {
        //     var farmaciaId = $(this).val();
        //     var atencionId = $("#hdnIdAtencion").val();
        //     if (atencionId === null || atencionId === undefined || atencionId === "") {
        //         OrdenMedica.alerta(
        //             "info",
        //             "",
        //             "Busca un paciente antes de buscar medicamentos."
        //         );
        //         return;
        //     }
        //     OrdenMedicaHOSP.cargarMedicamentos(farmaciaId, atencionId);
        // });

        $('#cboFarmacia, #chkConStock').on('change', function () {
            var farmaciaId = $('#cboFarmacia').val();
            var idAtencion = $("#hdnIdAtencion").val();
            var filtro = $('#chkConStock').is(':checked') ? 1 : 0;
            var token = $('meta[name="csrf-token"]').attr('content');
        
            if (!idAtencion) {
                OrdenMedica.alerta("info", "", "Busca un paciente antes de buscar medicamentos.");
                return;
            }
        
            var $select = $('#cboMedicamento');
            //$select.empty().append('<option value="" disabled selected>Sin resultados</option>');
            $select.select2({
                dropdownParent: $('#modalReceta'),
                placeholder: 'Seleccione un medicamento',
                allowClear: true,
                language: {
                  noResults: function() {
                    return "Sin resultados";
                  }
                }
              });
              
        
            if (farmaciaId) {
                $.ajax({
                    url: '/Recetas/listarFarmaciaDetalleHOSP',
                    method: 'POST',
                    data: {
                        idAlmacen: farmaciaId,
                        idAtencion: idAtencion,
                        filtro: filtro,
                        _token: token
                    },
                    success: function (response) {
                        $select.empty();
        
                        if (response && response.medicamentos && response.medicamentos.length > 0) {
                            $select.append('<option></option>'); // para permitir placeholder
                            response.medicamentos.forEach(function (medicamento) {
                                $select.append(
                                    '<option value="' + medicamento.IdProducto + '" data-precio="' + medicamento.PrecioUnitario + '">' +
                                    medicamento.Nombre +
                                    '</option>'
                                );
                            });
                        } else {
                            //$select.append('<option value="" disabled selected>No se encontraron medicamentos</option>');
                            $select.select2({
                                dropdownParent: $('#modalReceta'),
                                placeholder: 'Seleccione un medicamento',
                                language: {
                                  noResults: function () {
                                    return "No se encontraron medicamentos";
                                  }
                                }
                              });                              
                        }
        
                        // 🔄 Notificar a Select2 que actualice
                        //$select.val(null).trigger('change');
                    },
                    error: function () {
                        alert('Error al obtener los medicamentos. Inténtalo más tarde.');
                    }
                });
            }
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

        $('#btnGuardarRecetas').on('click', async function () {
            Cargando(1);
             proceso = true
             Variables = obtenerVariables();

             if (!Variables.IdAtencion?.trim() || !Variables.IdCuentaAtencion?.trim() ) { // || !Variables.IdPaciente?.trim()
                console.log('Falta información, no se puede guardar.');
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'warning',
                    title: 'Por favor, busca un paciente antes de generar la orden médica.',
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true
                });
                Cargando(0);
                return;
            }  

            const datarec = await OrdenMedica.GuardarOrdenesMedicas();

            if (datarec?.resultado === true) {
                console.log('datos ordenes guardadas: ', datarec);

                $("#modalReceta").modal("hide");
                $("#contenedorBotonesPDF").empty();

                let primerPDF = null;

                const recetas = Array.isArray(datarec.RecetasId) ? datarec.RecetasId : [];

                const ordenBotones = [
                    { index: "08", label: "Rayos X" },
                    { index: "06", label: "Eco. Obstétrica" },
                    { index: "07", label: "Eco. General" },
                    { index: "04", label: "Anat. Patológica" },
                    { index: "03", label: "Lab. Central" },
                    { index: "02", label: "Lab. Emergencia" },
                    { index: "05", label: "Banco Sangre" },
                    { index: "09", label: "Tomografía" },
                    { index: "01", label: "Farmacia" }
                ];

                // Combinamos receta con su tipo y label
                const recetasConInfo = recetas
                    .map((id, idx) => {
                        if (!id || id === 0) return null;

                        const boton = ordenBotones[idx];
                        return boton ? { id, tipo: boton.index, label: boton.label } : null;
                    })
                    .filter(Boolean);

                // Ordenamos por tipo/index (que son strings tipo "01", "02", etc.)
                recetasConInfo.sort((a, b) => a.tipo.localeCompare(b.tipo));

                // Ahora generamos los botones en orden
                recetasConInfo.forEach(({ id, tipo, label }) => {
                    const isFarmacia = tipo === "01";

                    const linkPDF = isFarmacia
                        ? `/Recetas/informes/generarPDFA4HOSP/${id}`
                        : `/Recetas/informes/generarPDFHOSP/${id}`;

                    if (!primerPDF) primerPDF = linkPDF;

                    const btn = `<button class="btn btn-outline-primary btn-block text-left mb-2" onclick="OrdenMedicaHOSP.verPDF('${linkPDF}')">
                                    ${label} #${id}
                                </button>`;
                    $("#contenedorBotonesPDF").append(btn);
                });

                // Interconsultas
                if (Array.isArray(datarec.InterconsultasId)) {
                    datarec.InterconsultasId.forEach((idObj) => {
                        let id = idObj.idReceta || idObj;
                        let puntoCarga = idObj.IdPuntoCarga || 12;

                        if (!id || id === 0) return;

                        const linkPDF = `/hospitalizacion/SolicitudInterconsulta/${id}?PuntoCarga=${puntoCarga}`;
                        if (!primerPDF) primerPDF = linkPDF;

                        const btn = `<button class="btn btn-success btn-block text-left mb-2" onclick="OrdenMedicaHOSP.verPDF('${linkPDF}')">
                                        Interconsulta #${id}
                                    </button>`;
                        $("#contenedorBotonesPDF").append(btn);
                    });
                }

                if (primerPDF) {
                    OrdenMedicaHOSP.verPDF(primerPDF);
                }
                $("#btnLimpiar").trigger("click"); //Limpiar Campos de búsqueda
                $("#btnBuscar").click(); //Traer nuevos registros
                $("#modalPDFRecetas").modal("show");
            }

            
            


            Cargando(0);
        });

        $('#tbOrdenMedica tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTable_OrdenMedicaHospitalizacion.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            }
        });

        // Botón "Pendiente"
        $('#btnRegistrado').click(function() {
            //oTable_InterconsultasHospitalizacion.column('name:idEstado').search('1').draw();  // Filtra por estado 1 (Pendiente)
            $('#tbOrdenMedica').DataTable().column(21).search('1').draw();

        });

        // Botón "Atendido"
        $('#btnAtendido').click(function() {
            //oTable_InterconsultasHospitalizacion.column('name:idEstado').search('2').draw();  // Filtra por estado 2 (Atendido)
            $('#tbOrdenMedica').DataTable().column(21).search('2').draw();
        });

        // Botón "Atendido"
        $('#btnConBoleta').click(function() {
            //oTable_InterconsultasHospitalizacion.column('name:idEstado').search('2').draw();  // Filtra por estado 2 (Atendido)
            $('#tbOrdenMedica').DataTable().column(21).search('3').draw();
        });

        // Botón "Todos"
        $('#btnTodos').click(function() {
            //oTable_InterconsultasHospitalizacion.column('name:idEstado').search('').draw();  // Muestra todos los datos
            $('#tbOrdenMedica').DataTable().column(21).search('').draw();
        });

        $('#btnGroupEstados button').click(function () {
            // Reset de todos los botones y quitar subrayado
            $('#btnGroupEstados button').removeClass('active').css({ borderBottom: '3px solid #b7b4b4' }).css({ backgroundColor: '', color: '' });
        
            // Establecer el color y subrayado del botón activo
            var color = $(this).css('background-color');
            if ($(this).attr('id') === 'btnTodos') {
                $(this).addClass('active').css({ backgroundColor: 'black', color: 'white', borderBottom: '3px solid black' });
            } else if ($(this).attr('id') === 'btnRegistrado') {
                $(this).addClass('active').css({ backgroundColor: '#ffc107', color: 'black', borderBottom: '3px solid #ffc107' });
            } else if ($(this).attr('id') === 'btnAtendido') {
                $(this).addClass('active').css({ backgroundColor: '#17a2b8', color: 'white', borderBottom: '3px solid #17a2b8' });
            } else if ($(this).attr('id') === 'btnConBoleta') {
                $(this).addClass('active').css({ backgroundColor: '#28a745', color: 'white', borderBottom: '3px solid #28a745' });
            }
        });

        $('#btnEliminarOrdenMedica').on('click', function () {
            //Ordenes.accion = 'E';
            var objrow = oTable_OrdenMedicaHospitalizacion.api(true).row('.selected').data();

            if (isEmpty(objrow)) {
                OrdenMedica.alerta(
                    "info",
                    "",
                    "Por favor seleccione un registro."
                );
                return;
            }

            // No permite eliminar órdenes que no son del médico
            var hdnIdMedicoLogeado_with = $('#hdnIdMedicoLogeado_with').val();
            if (hdnIdMedicoLogeado_with != '0' && (objrow.IdMedico != hdnIdMedicoLogeado_with)) {
                OrdenMedica.alerta(
                    "info",
                    "",
                    "No puedes eliminar la Orden Médica porque no eres el médico que la registró."
                );
                return;
            }

            //---------------------------------------------------------------------------
            if (objrow.IdPuntoCarga == '12') {
                //if (objrow.estadoReceta > 0) {
                if (Number(objrow.idEstado) > 1) {
                    OrdenMedica.alerta(
                        "info",
                        "",
                        "No es posible eliminar la Orden Médica porque la interconsulta asociada ya ha sido atendida."
                    );
                    return;
                } else if (objrow.idEstado == '1') {
                    Swal.fire({
                        title: 'Eliminar',
                        text: '¿Estás seguro de eliminar la Interconsulta #' + objrow.idReceta + '?',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#4fb7fe',
                        cancelButtonColor: '#EF6F6C',
                        confirmButtonText: 'Aceptar',
                        cancelButtonText: 'Cancelar'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            //OrdenMedica.EliminarOrdenesMedicas(objrow.idReceta);
                            OrdenMedica.EliminarInterconsulta(objrow.idReceta);
                            //$("#btnBuscar").click();
                        }
                    });
                }
            }

            //---------------------------------------------------------------------------
            //OrdenMedica.alerta('warning', '', 'estadoInterconsulta: ' + objrow.idEstado);

            if (objrow.IdPuntoCarga !='12') {
                if (objrow.idEstado == '1') {
                    Swal.fire({
                        title: 'Eliminar',
                        text: '¿Estás seguro de eliminar la receta?',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#4fb7fe',
                        cancelButtonColor: '#EF6F6C',
                        confirmButtonText: 'Aceptar',
                        cancelButtonText: 'Cancelar'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            OrdenMedica.EliminarOrdenesMedicas(objrow.idReceta);
                            //$("#btnBuscar").click();
                        }
                    });
                }            
                else {
                    if (objrow.idEstado == '2' ) {
                        OrdenMedica.alerta('warning', '', 'Esta Orden Médica no se puede eliminar, ya se encuentra despachada.');
                    } else if (objrow.idEstado == 3 ) {
                        OrdenMedica.alerta('warning', '', 'Esta Orden Médica no se puede eliminar, ya se encuentra con boleta.');
                    } else {
                        OrdenMedica.alerta('warning', '', 'Esta Orden Médica no se puede eliminar, verifique el estado');
                    }                
                    return false;
                }
            }
           
        });

        // Laboratorio Central
        $('#btnMostrarExamenCentral').on('click', async function () {
            await EvaluacionHospitalizacion.listaExameneLabCentral(0);
            $('#modalExamenesCentral').modal('show');
        })
        $('#btnCerrarExamenesCentral').on('click', async function () {
            $('#modalExamenesCentral').modal('hide');
        })
        
        $('#btnGuardarExamenesCentral').on('click', function () {
            OrdenMedica.obtenerExamenesSeleccionados(2);
            $('#modalExamenesCentral').modal('hide');      
            $('#modalReceta').css({
                'overflow-y': 'auto',
                'overflow-x': 'hidden'
            });
        })

        //EcoGeneral
        $('#btnMostrarExamenEcoGeneral').on('click', async function () {
            await EvaluacionHospitalizacion.listaExamenObstetricia(0);
            $('#modalExamenEcoGeneral').modal('show');
        })
        $('#btnCerrarExamenesEcoGeneral').on('click', async function () {
            $('#modalExamenEcoGeneral').modal('hide');
        })
        $('#btnGuardarExamenesEcoGeneral').on('click', function () {
            OrdenMedica.obtenerExamenesSeleccionados(20); //tabla Eco General
            $('#modalExamenEcoGeneral').modal('hide');
        })
        //Rx
        $('#btnMostrarExamenRayos').on('click', async function () {
            await EvaluacionHospitalizacion.listaExamenRayosX(0);
            $('#modalExamenRayosX').modal('show');
        })
        $('#btnCerrarExamenesRayosX').on('click', async function () {
            $('#modalExamenRayosX').modal('hide');
        })
        $('#btnGuardarExamenesRayosX').on('click', function () {
            OrdenMedica.obtenerExamenesSeleccionados(21);
            $('#modalExamenRayosX').modal('hide');
        })



    },

    verPDF(url, tipo = null) {
        // Remover clase activa de todos los botones
        document.querySelectorAll('#contenedorBotonesPDF button').forEach(btn => {
            btn.classList.remove('btn-active');
        });
    
        // Agregar clase activa al botón actual
        const botones = document.querySelectorAll(`#contenedorBotonesPDF button`);
        botones.forEach(btn => {
            if (btn.getAttribute('onclick')?.includes(url)) {
                btn.classList.add('btn-active');
            }
        });
    
        // 📌 Si es Interconsulta (tipo 12), cargar directamente en iframe
        if (url.includes("SolicitudInterconsulta")) {
            const pdfUrl = window.location.origin + "/" + url;
            document.getElementById('iframePDF').src = pdfUrl;
            return;
        }
    
        // 📌 Para los demás, llamar al API
        $.get(url, function (response) {
            if (response.pdf_url) {
                const pdfUrl = window.location.origin + response.pdf_url;
                document.getElementById('iframePDF').src = pdfUrl;
            } else {
                alert("No se pudo obtener la URL del PDF.");
            }
        }).fail(function () {
            alert("Error al obtener el PDF.");
        });
    },
    
    

    LimpiarCampos() {

    },

    toggleRequiredNroDocumento() {

    },   
    LimpiarOrdenesMedicas(){

    },
    HabilitarTabsRecetas(){

    },

    CargarDiagnosticosInterconsulta(){

    },

    
    ajustarAltura() {
        $(".auto-expand").each(function () {
            this.style.height = "auto"; // Resetear para obtener altura real
            this.style.height = this.scrollHeight + "px"; // Ajustar al contenido
        });
    },

	ad() {
		if ($("#b_IdDiagnostico").val() === null || $("#b_IdDiagnostico").val().length == 0 || $("#b_idtipodiagnostico").val().length == 0)
			OrdenMedica.alerta("info", "", "Ingrese datos correctos de diagnóstico.");
		else {
			$("#div_dx").append('<div class="row mx-0 d-flex justify-content-center align-items-center"> \
								<div class="col-12 col-sm-1 col-md-1 col-lg-1 pr-0"><input type="hidden" name="l_IdDiagnostico[]" value="' + $("#b_IdDiagnostico").val() + '"/><input type="text" name="l_cie10[]" class="form-control form-control form-control-sm" value="' + $("#b_cie10").val().trim() + '" disabled /></div> \
								<div class="col-12 col-sm-8 col-md-8 col-lg-7 px-0"><input type="text" name="l_descripciondia[]" class="form-control form-control-sm" value="' + $("#b_descripciondia").val().trim() + '" disabled /></div> \
								<div class="col-12 col-sm-1 col-md-1 col-lg-2 px-0"><input type="hidden" name="l_idtipodiagnostico[]" value="' + $("#b_idtipodiagnostico").val().trim() + '"/><input type="text" name="l_tipodiagnostico[]" class="form-control form-control form-control-sm" value="' + $("#b_idtipodiagnostico option:selected").html() + '" disabled /></div> \
								<div class="col-12 col-sm-1 col-md-1 col-lg-1 pl-0"><input type="button" value="Eliminar" class="elimina_d form-control btn btn-sm btn-danger"/></div> \
                                \
							    </div>');
			$("#b_IdDiagnostico").val("");
			$("#b_cie10").val("");
			$("#b_descripciondia").val("");
			$("#b_iddiagnostico").val("");
			$("#b_masdetdia").val("");
		}
	},
    
};


$(document).ready(function () {

    OrdenMedicaHOSP.Plugins();
    OrdenMedicaHOSP.InitDatablesOrdenMedicaHospitalizacion();

    OrdenMedicaHOSP.eventos();
    OrdenMedicaHOSP.InitialCharge();

    OrdenMedicaHOSP.ajustarAltura();
    //VisorDocumento.Eventos();
    OrdenMedica.IniciarDataTables();
    OrdenMedica.IniciarScript();

    $("#btnBuscar").click(); //Buscar por defecto 3 dias


    // $('.select2').select2({
    //     placeholder: "Seleccione una opción",
    //     allowClear: true,
    //     width: '100%',
    //     minimumResultsForSearch: 0 // ← Esto fuerza el buscador incluso con pocas opciones
    // });
    
    // $('select.tom-select').each(function() {
    //     new TomSelect(this, {
    //         placeholder: $(this).data('placeholder') || 'Seleccione una opción',
    //         allowEmptyOption: true
    //     });
    // });
    // $('#cboMedicamento').select2({
    //     placeholder: "Seleccione una opción",
    //     allowClear: true,
    //     width: '100%',
    //     minimumResultsForSearch: 0
    // });
    
    
    // $('#cboFarmacia').select2({
    //     placeholder: "Seleccione una opción",
    //     allowClear: true,
    //     width: '100%',
    //     minimumResultsForSearch: 0
    //   });


    

})



$(document).on("click", ".elimina_d", function () {
    $(this).closest(".col-lg-1").parent().remove();
});

$(document).on("click", ".ver-pdf", function () {
    let apiUrl = $(this).data("url"); // Obtener la URL de la API o del PDF
    console.log("Consultando API:", apiUrl);

    // Extraer el parámetro "PuntoCarga" si existe
    let urlParams = new URLSearchParams(apiUrl.split("?")[1]);
    let puntoCarga = urlParams.get("PuntoCarga");

    // 📌 Si PuntoCarga es 12, mostrar el PDF directamente
    if (puntoCarga === "12") {
        console.log("Mostrando PDF directamente:", apiUrl.split("?")[0]);

        $("#modalPDF .modal-body").html(`
            <iframe src="${apiUrl.split("?")[0]}" width="100%" height="100%" style="border: none;  "></iframe>
        `);
        $("#modalPDF").modal("show");

        return; // Terminar ejecución aquí
    }

    // 📌 Si no es 12, hacer la petición AJAX para obtener la URL del PDF
    $.get(apiUrl, function (response) {
        console.log("Respuesta de la API:", response);

        if (response.pdf_url) {
            let pdfUrl = window.location.origin + response.pdf_url; // Convertir a URL absoluta
            console.log("PDF URL final:", pdfUrl);

            $("#modalPDF .modal-body").html(`
                <iframe src="${pdfUrl}" width="100%" height="100%" style="border: none;"></iframe>
            `);
            $("#modalPDF").modal("show");
        } else {
            alert("No se pudo obtener la URL del PDF.");
        }
    }).fail(function () {
        alert("Error al obtener el PDF.");
    });
});



let zIndexBase = 1040;

$(document).on('show.bs.modal', '.modal', function () {
    let $modal = $(this);
    let modalZIndex = zIndexBase + (10 * $('.modal:visible').length);
    let backdropZIndex = modalZIndex - 1;

    $modal.css('z-index', modalZIndex);

    setTimeout(function () {
        $('.modal-backdrop:not(.modal-stack)').first().css('z-index', backdropZIndex).addClass('modal-stack');
    }, 0);

    // Inicializar solo los selects dentro del modal actual, y solo si no están inicializados
    
    $modal.find('select.select2').each(function () {
        if (!$(this).hasClass('select2-hidden-accessible')) {
            $(this).select2({
                //dropdownParent: $modal,
                dropdownParent: $(this).closest('.modal'),
                placeholder: "Seleccione una opción",
                allowClear: true,
                width: '100%',
                minimumResultsForSearch: 5
            });
        }
    });

});

// $(document).on('scroll', '.modal', function () {
//     // Reubicar los dropdowns de Select2 al hacer scroll
//     $('.select2-container--open').each(function () {
//         let $select = $(this).prev('select');
//         if ($select.length) {
//             $select.select2('close');
//             setTimeout(() => $select.select2('open'), 10); // pequeña pausa
//         }
//     });
// });



// $(document).on('hidden.bs.modal', '.modal', function () {
//     if ($('.modal.show').length > 0) {
//         $('body').addClass('modal-open').css({
//             'overflow-y': 'auto',
//             'overflow-x': 'hidden'
//         });
//     }
// });


// Limpiar el contenido cuando se cierre el modal
$("#modalPDF").on("hidden.bs.modal", function () {
    $("#modalPDF .modal-body").html("");
});






;



