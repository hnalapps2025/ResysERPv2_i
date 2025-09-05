var DtDiagnosticos = null
var DtEvaluaciones = null

var Diagnosticos = {
    idDiagnostico: 0,
    codigo: '',
    diagnostico: '',
    idTipoDiagnostico: 0,
    tipoDiagnostico: '',
    nroEvaluacion: 0,
    idServicio: 0
}

var Variables = {
    IdAtencion: $('#hdnIdAtencion').val(),
    IdCuentaAtencion: $("#hdnIdCuentaAtencion").val(),
    IdPaciente: $("#hdIdPaciente").val(),
    IdMedicoLogeado: $("#hdnIdMedicoLogeado").val(),
    IdUsuarioLogeado: $("#hdnIdUsuarioLogeado").val(),
    NroEvaluacion: 0,
    IdTipoServicio:$("#hdnIdtipoServicio").val(),
    IdServicio: $("#hdnIdServicio").val(),
    IdTipoFinanciamiento: $("#hdIdTipoFuenteFian").val(),
}

var EvaluacionHospitalizacion = {
    IdAtencion: 0,
    cont_dx: 0,
    IdNumero: 0,
    nuevaEvaluacion: false,

    Init() {
        var fecha = new Date()
        var dia = fecha.getDate()
        var mes = parseInt(fecha.getMonth()) + 1
        var yyy = fecha.getFullYear()
        if (dia < 10)
            dia = '0' + dia //agrega cero si el menor de 10
        if (mes < 10)
            mes = '0' + mes
        fechaP = dia + "/" + mes + "/" + yyy
    },

    IniciarPlugins() {
        $('#FechaInicioAtencion, #txtFechaFUR').datepicker({
            todayHighlight: true,
            autoclose: true,
            dateFormat: "dd/mm/yy",
            orientation: "bottom"
        });
        $('#FechaInicioAtencion, #txtFechaFUE').datepicker({
            todayHighlight: true,
            autoclose: true,
            dateFormat: "dd/mm/yy",
            orientation: "bottom"
        });

        $('#FechaInicioAtencion, #txtFechaFPP').datepicker({
            todayHighlight: true,
            autoclose: true,
            dateFormat: "dd/mm/yy",
            orientation: "bottom"
        });



        $.mask.definitions['H'] = '[012]';
        $.mask.definitions['N'] = '[012345]';
        $.mask.definitions['n'] = '[0123456789]';
        $("#HoraInicioAtencion").mask("Hn:Nn");

        $(".chzn-select").chosen();
        $("#btnGuardarEva").hide();
    },
   
   


    async listaCabPaquetes(tipo) {
        //var midata = new FormData();

        var descripcion = "";

        var token = $('meta[name="csrf-token"]').attr('content');

        console.log('tipo', tipo)
        console.log('descripcion', descripcion)

        console.log('Datos a enviar:', { tipo: tipo, descripcion: descripcion });

        $.ajax({
            method: "post",
            url: "/Catalogo/FactCatalogoPaqueteXtipoPaquete?area=Comun",
            data: JSON.stringify({
                tipo: tipo,
                descripcion: ""
            }),
            dataType: "json",
            contentType: "application/json",
            headers: {
                'X-CSRF-TOKEN': token
            },
            success: function (datos) {
                console.log('datos Pquetessss', datos);
                $('#cboPaquetes').empty();
                $(datos.resultado).each(function (i, obj) {
                    $('#cboPaquetes').append('<option value="' + obj.idFactPaquete + '" data-codigo="' + obj.Codigo + '" data-puntoCarga="' + obj.idPuntoCarga + '">' + obj.Descripcion + '</option>');
                });

                $('.chzn-select').chosen().trigger("chosen:updated");
                $("#cboPaquetes").change();
                //}
            },
            error: function (msg) {
                setTimeout(function () {

                    alerta("ERROR", "Error listar paquetes!", "2");
                }, 900)
            }
        });
    },
    async listaExamenObstetricia(tipo) {
        var descripcion = "";
        var token = $('meta[name="csrf-token"]').attr('content');

        console.log('tipo', tipo);
        console.log('descripcion', descripcion);

        console.log('Datos a enviar:', { tipo: tipo, descripcion: descripcion });

        $.ajax({
            method: "post",
            url: "/Catalogo/listaExameneLabCentral?area=Comun",
            data: JSON.stringify({
                tipo: tipo,
                descripcion: ""
            }),
            dataType: "json",
            contentType: "application/json",
            headers: {
                'X-CSRF-TOKEN': token
            },
            success: function (datos) {
                console.log('datos Obstretricia', datos);


                $('#contenedorChecksEcoGeneral').empty();


                var examenesPorCategoria = {
                    "ECOGRAFIA ABDOMINAL": [],
                    "ECOGRAFIA-VARIOS": []

                };


                $(datos.resultado).each(function (i, obj) {
                    switch (obj.Categoria) {
                        case '8':
                            examenesPorCategoria["ECOGRAFIA ABDOMINAL"].push(obj);
                            break;
                        case '9':
                            examenesPorCategoria["ECOGRAFIA-VARIOS"].push(obj);
                            break;

                    }
                });


                var column1Html = '<div class="col-md-6">';
                var column2Html = '<div class="col-md-6">';

                // Columna 1: 
                column1Html += EvaluacionHospitalizacion.generateExamenObstetriciaHtml("ECOGRAFIA ABDOMINAL", examenesPorCategoria["ECOGRAFIA ABDOMINAL"]);
                column1Html += '</div>';

                // Columna 2: 
                column2Html += EvaluacionHospitalizacion.generateExamenObstetriciaHtml("ECOGRAFIA-VARIOS", examenesPorCategoria["ECOGRAFIA-VARIOS"]);
                column2Html += '</div>';


                $('#contenedorChecksEcoGeneral').append(column1Html);
                $('#contenedorChecksEcoGeneral').append(column2Html);
            },
            error: function (msg) {
                setTimeout(function () {
                    alerta("ERROR", "Error listar Examen Central!", "2");
                }, 900);
            }
        });

    },
    generateExamenObstetriciaHtml(categoria, examenes) {
        var html = '';
        if (examenes && examenes.length > 0) {
            html += `<h5 class="category-title">${categoria}</h5>`;
            $(examenes).each(function (i, obj) {
                html += `
                <div class="check__toggle">
                    <label class="toggle">
                        <input class="toggle__input campo" type="checkbox" id="${obj.IdProducto}" data-codigo="${obj.Codigo}" data-precio="${obj.PrecioUnitario}" data-labotario="${obj.Laboratorio}">
                        <span class="toggle__label mr-2">
                            <i class="fa fa-flask icono-toggle" style="width: 50px; text-align:center;"></i>
                            <span class="toggle__text">${obj.Nombre}</span>
                        </span>
                    </label>
                </div>
            `;
            });
        }
        return html;
    },
    async listaExamenRayosX(tipo) {
        var descripcion = "";
        var token = $('meta[name="csrf-token"]').attr('content');

        console.log('tipo', tipo);
        console.log('descripcion', descripcion);

        console.log('Datos a enviar:', { tipo: tipo, descripcion: descripcion });

        $.ajax({
            method: "post",
            url: "/Catalogo/listaExameneLabCentral?area=Comun",
            data: JSON.stringify({
                tipo: tipo,
                descripcion: ""
            }),
            dataType: "json",
            contentType: "application/json",
            headers: {
                'X-CSRF-TOKEN': token
            },
            success: function (datos) {
                console.log('datos RAYOSX', datos);


                $('#contenedorChecksRayosX').empty();


                var examenesPorCategoria = {
                    "RADIOGRAFIA APARATO DIGESTIVO": [],
                    "RADIOGRAFIA CABEZA Y CUELLO": [],
                    "RADIOGRAFIA COLUMNA Y PELVIS": [],
                    "RADIOGRAFIA EXTREMIDADES": [],
                    "RADIOGRAFIA PROCDIMIENTOS ESPECIALES INVASIVOS": [],
                    "RADIOGRAFIA DE TORAX": [],
                    "RADIOGRAFIA - VARIOS": []
                };


                $(datos.resultado).each(function (i, obj) {
                    switch (obj.Categoria) {
                        case '10':
                            examenesPorCategoria["RADIOGRAFIA APARATO DIGESTIVO"].push(obj);
                            break;
                        case '11':
                            examenesPorCategoria["RADIOGRAFIA CABEZA Y CUELLO"].push(obj);
                            break;
                        case '12':
                            examenesPorCategoria["RADIOGRAFIA COLUMNA Y PELVIS"].push(obj);
                            break;
                        case '13':
                            examenesPorCategoria["RADIOGRAFIA EXTREMIDADES"].push(obj);
                            break;
                        case '14':
                            examenesPorCategoria["RADIOGRAFIA PROCDIMIENTOS ESPECIALES INVASIVOS"].push(obj);
                            break;
                        case '15':
                            examenesPorCategoria["RADIOGRAFIA DE TORAX"].push(obj);
                            break;
                        case '16':
                            examenesPorCategoria["RADIOGRAFIA - VARIOS"].push(obj);
                            break;
                    }
                });
                console.log('examenesPorCategoria', examenesPorCategoria)


                var column1Html = '<div class="col-md-6">';
                var column2Html = '<div class="col-md-6">';

                // Columna 1: 
                column1Html += EvaluacionHospitalizacion.generateExamenRayosXHtml("RADIOGRAFIA APARATO DIGESTIVO", examenesPorCategoria["RADIOGRAFIA APARATO DIGESTIVO"]);
                column1Html += EvaluacionHospitalizacion.generateExamenRayosXHtml("RADIOGRAFIA CABEZA Y CUELLO", examenesPorCategoria["RADIOGRAFIA CABEZA Y CUELLO"]);
                column1Html += EvaluacionHospitalizacion.generateExamenRayosXHtml("RADIOGRAFIA COLUMNA Y PELVIS", examenesPorCategoria["RADIOGRAFIA COLUMNA Y PELVIS"]);
                column1Html += '</div>';

                // Columna 2: 
                column2Html += EvaluacionHospitalizacion.generateExamenRayosXHtml("RADIOGRAFIA EXTREMIDADES", examenesPorCategoria["RADIOGRAFIA EXTREMIDADES"]);
                column2Html += EvaluacionHospitalizacion.generateExamenRayosXHtml("RADIOGRAFIA PROCDIMIENTOS ESPECIALES INVASIVOS", examenesPorCategoria["RADIOGRAFIA PROCDIMIENTOS ESPECIALES INVASIVOS"]);
                column2Html += EvaluacionHospitalizacion.generateExamenRayosXHtml("RADIOGRAFIA DE TORAX", examenesPorCategoria["RADIOGRAFIA DE TORAX"]);
                column2Html += EvaluacionHospitalizacion.generateExamenRayosXHtml("RADIOGRAFIA - VARIOS", examenesPorCategoria["RADIOGRAFIA - VARIOS"]);
                column2Html += '</div>';


                $('#contenedorChecksRayosX').append(column1Html);
                $('#contenedorChecksRayosX').append(column2Html);
            },
            error: function (msg) {
                setTimeout(function () {
                    alerta("ERROR", "Error listar Examen Central!", "2");
                }, 900);
            }
        });

    },
    generateExamenRayosXHtml(categoria, examenes) {
        var html = '';
        if (examenes && examenes.length > 0) {
            html += `<h5 class="category-title">${categoria}</h5>`;
            $(examenes).each(function (i, obj) {
                html += `
                    <div class="check__toggle">
                        <label class="toggle">
                            <input class="toggle__input campo" type="checkbox" id="${obj.IdProducto}" data-codigo="${obj.Codigo}" data-precio="${obj.PrecioUnitario}" data-labotario="${obj.Laboratorio}">
                            <span class="toggle__label mr-2">
                                <i class="fa fa-flask icono-toggle" style="width: 50px; text-align:center;"></i>
                                <span class="toggle__text">${obj.Nombre}</span>
                            </span>
                        </label>
                    </div>
                `;
            });
        }
        return html;
    },

    async listaExameneLabEmergencia(tipo) {
        var descripcion = "";
        var token = $('meta[name="csrf-token"]').attr('content');

        console.log('tipo', tipo);
        console.log('descripcion', descripcion);

        console.log('Datos a enviar:', { tipo: tipo, descripcion: descripcion });

        $.ajax({
            method: "post",
            url: "/Catalogo/listaExameneLabCentral?area=Comun",
            data: JSON.stringify({
                tipo: tipo,
                descripcion: ""
            }),
            dataType: "json",
            contentType: "application/json",
            headers: {
                'X-CSRF-TOKEN': token
            },
            success: function (datos) {
                console.log('datos Pquetessss', datos);

                $('#contenedorChecks').empty();

                var examenesPorCategoria = {
                    "EXÁMENES HEMATOLÓGICOS": [],
                    "EXÁMENES BIOQUÍMICOS": [],
                    "EXÁMENES INMUNOLÓGICOS": [],
                    "EXÁMENES DE ORINA": [],
                    "EXÁMENES EN LÍQUIDOS": [],
                    "EXÁMENES MICROBIOLÓGICOS - HECES": [],
                    "LABORATORIO - UCI": []
                };
                /*
               
                $(datos.resultado).each(function (i, obj) {
                    switch(obj.Categoria) {
                        case '1':
                            examenesPorCategoria["EXÁMENES HEMATOLÓGICOS"].push(obj);
                            break;
                        case '2':
                            examenesPorCategoria["EXÁMENES BIOQUÍMICOS"].push(obj);
                            break;
                        case '3':
                            examenesPorCategoria["EXÁMENES INMUNOLÓGICOS"].push(obj);
                            break;
                        case '4':
                            examenesPorCategoria["EXÁMENES DE ORINA"].push(obj);
                            break;
                        case '5':
                            examenesPorCategoria["EXÁMENES EN LÍQUIDOS"].push(obj);
                            break;
                        case '6':
                            examenesPorCategoria["EXÁMENES MICROBIOLÓGICOS - HECES"].push(obj);
                            break;
                        case '7':
                            examenesPorCategoria["LABORATORIO - UCI"].push(obj);
                            break;
                    }
                });
                */
                $(datos.resultado).each(function (i, obj) {
                    if (obj && obj.Categoria) {
                        let categoria = obj.Categoria;


                        if (categoria == 1 || categoria == 90 || categoria == 91) {
                            examenesPorCategoria["EXÁMENES HEMATOLÓGICOS"].push(obj);
                        }
                        if (categoria == 2 || categoria == 92) {
                            examenesPorCategoria["EXÁMENES BIOQUÍMICOS"].push(obj);
                        }
                        if (categoria == 3 || categoria == 93 || categoria == 94 || categoria == 95) {
                            examenesPorCategoria["EXÁMENES INMUNOLÓGICOS"].push(obj);
                        }
                        if (categoria == 4) {
                            examenesPorCategoria["EXÁMENES DE ORINA"].push(obj);
                        }
                        if (categoria == 5 || categoria == 96) {
                            examenesPorCategoria["EXÁMENES EN LÍQUIDOS"].push(obj);
                        }
                        if (categoria == 6 || categoria == 97) {
                            examenesPorCategoria["EXÁMENES MICROBIOLÓGICOS - HECES"].push(obj);
                        }
                        if (categoria == 7 || categoria == 98) {
                            examenesPorCategoria["LABORATORIO - UCI"].push(obj);
                        }
                    }

                });


                console.log('examenesPorCategoria', examenesPorCategoria);
                function ordenarPorCodigo(examenes, ordenCodigos) {
                    return examenes.sort(function (a, b) {
                        const indiceA = ordenCodigos.indexOf(a.CodAntiguo);
                        const indiceB = ordenCodigos.indexOf(b.CodAntiguo);

                        if (indiceA === -1) return 1;
                        if (indiceB === -1) return -1;

                        return indiceA - indiceB;
                    });
                }

                // Orden para EXÁMENES HEMATOLÓGICOS
                const ordenCodigosHematologicos = [
                    "202.20.021", "202.20.022", "202.20.004", "202.21.006", "202.21.009",
                    "202.21.003", "202.20.023", "202.21.005", "202.21.007", "202.21.001",
                    "202.20.008"
                ];

                // Orden para EXÁMENES BIOQUÍMICOS
                const ordenCodigosBioquimicos = [
                    "202.10.031", "202.10.047", "202.10.018", "202.10.006", "202.10.041",
                    "202.10.043", "202.10.044", "202.10.025", "202.10.020", "202.10.017",
                    "202.10.010", "202.10.002", "202.10.028", "202.10.022", "202.10.040"
                ];
                //ordeCodigosInmunologicos
                const ordenCodigosInmunologicos = [
                    "202.30.098", "202.30.022", "202.30.097", "202.30.095", "202.30.074", "202.30.075"
                    , "202.30.055", "202.30.002"

                ];

                // Orden para EXAMEN DE ORINA
                const ordeCodigosOrina = [
                    "202.70.001", "202.70.002", "202.70.003"

                ];
                //liquidos
                const ordenCodigosLiquidos = [
                    "202.40.035", "202.40.005", "202.40.008"

                ];
                //HECES
                const ordenCodigosMicrobiologico = [
                    "202.40.025", "202.40.017", "202.40.011", "202.40.009", "202.40.019", "202.40.026"
                    , "202.40.034"

                ];

                //
                const ordenCodigoUCI = [
                    "202.60.017"
                ];



                // Ordenar los exámenes para cada categoría con el arreglo de códigos correspondiente
                examenesPorCategoria["EXÁMENES HEMATOLÓGICOS"] = ordenarPorCodigo(examenesPorCategoria["EXÁMENES HEMATOLÓGICOS"], ordenCodigosHematologicos);
                examenesPorCategoria["EXÁMENES BIOQUÍMICOS"] = ordenarPorCodigo(examenesPorCategoria["EXÁMENES BIOQUÍMICOS"], ordenCodigosBioquimicos);
                examenesPorCategoria["EXÁMENES INMUNOLÓGICOS"] = ordenarPorCodigo(examenesPorCategoria["EXÁMENES INMUNOLÓGICOS"], ordenCodigosInmunologicos);
                examenesPorCategoria["EXÁMENES DE ORINA"] = ordenarPorCodigo(examenesPorCategoria["EXÁMENES DE ORINA"], ordeCodigosOrina);
                examenesPorCategoria["EXÁMENES EN LÍQUIDOS"] = ordenarPorCodigo(examenesPorCategoria["EXÁMENES EN LÍQUIDOS"], ordenCodigosLiquidos);
                examenesPorCategoria["EXÁMENES MICROBIOLÓGICOS - HECES"] = ordenarPorCodigo(examenesPorCategoria["EXÁMENES MICROBIOLÓGICOS - HECES"], ordenCodigosMicrobiologico);
                examenesPorCategoria["LABORATORIO - UCI"] = ordenarPorCodigo(examenesPorCategoria["LABORATORIO - UCI"], ordenCodigoUCI);


                var column1Html = '<div class="col-md-6">';
                var column2Html = '<div class="col-md-6">';

                column1Html += EvaluacionHospitalizacion.generateExamensHtml("EXÁMENES HEMATOLÓGICOS", examenesPorCategoria["EXÁMENES HEMATOLÓGICOS"]);
                column1Html += EvaluacionHospitalizacion.generateExamensHtml("EXÁMENES BIOQUÍMICOS", examenesPorCategoria["EXÁMENES BIOQUÍMICOS"]);
                column1Html += '</div>'; // Cerrar columna 1

                column2Html += EvaluacionHospitalizacion.generateExamensHtml("EXÁMENES INMUNOLÓGICOS", examenesPorCategoria["EXÁMENES INMUNOLÓGICOS"]);
                column2Html += EvaluacionHospitalizacion.generateExamensHtml("EXÁMENES DE ORINA", examenesPorCategoria["EXÁMENES DE ORINA"]);
                column2Html += EvaluacionHospitalizacion.generateExamensHtml("EXÁMENES EN LÍQUIDOS", examenesPorCategoria["EXÁMENES EN LÍQUIDOS"]);
                column2Html += EvaluacionHospitalizacion.generateExamensHtml("EXÁMENES MICROBIOLÓGICOS - HECES", examenesPorCategoria["EXÁMENES MICROBIOLÓGICOS - HECES"]);
                column2Html += EvaluacionHospitalizacion.generateExamensHtml("LABORATORIO - UCI", examenesPorCategoria["LABORATORIO - UCI"]);
                column2Html += '</div>'; // Cerrar columna 2

                // Agregar las columnas al contenedor
                $('#contenedorChecks').append(column1Html);
                $('#contenedorChecks').append(column2Html);
            },
            error: function (msg) {
                setTimeout(function () {
                    alerta("ERROR", "Error listar Examen Central!", "2");
                }, 900);
            }
        });
    },
    generateExamensHtml(categoria, examenes) {
        var html = '';
        if (examenes && examenes.length > 0) {
            html += `<h5 class="category-title">${categoria}</h5>`;
            $(examenes).each(function (i, obj) {
                html += `
                        <div class="check__toggle m-0">
                            <label class="toggle">
                                <input class="toggle__input campo" type="checkbox" id="${obj.IdProducto}" data-codigo="${obj.Codigo}" data-precio="${obj.PrecioUnitario}" data-labotario="${obj.Laboratorio}">
                                <span class="toggle__label mr-2">
                                      <i class="fa fa-flask icono-toggle" style="width: 50px; text-align:center;"></i>
                                    <span class="toggle__text">${obj.Nombre} 
                                   
    
                                </span>
                            </label>
                        </div>
                    `;
            });
        }
        return html;
    },

    async listaExameneLabCentral(tipo) {
        var descripcion = "";
        var token = $('meta[name="csrf-token"]').attr('content');

        console.log('tipo', tipo);
        console.log('descripcion', descripcion);

        console.log('Datos a enviar:', { tipo: tipo, descripcion: descripcion });

        $.ajax({
            method: "post",
            url: "/Catalogo/listaExameneLabCentral?area=Comun",
            data: JSON.stringify({
                tipo: tipo,
                descripcion: ""
            }),
            dataType: "json",
            contentType: "application/json",
            headers: {
                'X-CSRF-TOKEN': token
            },
            success: function (datos) {
                console.log('datos EXAMEBES CENTRALLLLL', datos);

                $('#contenedorChecksCentral').empty();

                var examenesPorCategoria = {
                    "BIOQUIMICA": [],
                    "BIOQUIMICA ORINA": [],
                    "BIOQUIMICA FERTILIDAD": [],

                    "HEMATOLOGIA": [],
                    "HEMOSTASIA Y TROMBOSIS": [],
                    "INMUNOL HORMONAS": [],

                    "INMUNOLO. HEPATICA": [],
                    "MARCAD. ONCOLOGICOS": [],
                    "INMUNOLOGIA": [],
                    "MICROBIOLOGIA": [],
                    "BANCO DE SANGRE": [],
                    "LABORATORIO - UCI": []
                };

                $(datos.resultado).each(function (i, obj) {
                    if (obj && obj.Categoria) {
                        let categoria = obj.Categoria;


                        if (categoria == 20 || categoria == 92) {
                            examenesPorCategoria["BIOQUIMICA"].push(obj);
                        }
                        if (categoria == 21) {
                            examenesPorCategoria["BIOQUIMICA ORINA"].push(obj);
                        }
                        if (categoria == 22) {
                            examenesPorCategoria["BIOQUIMICA FERTILIDAD"].push(obj);
                        }
                        if (categoria == 23 || categoria == 90) {
                            examenesPorCategoria["HEMATOLOGIA"].push(obj);
                        }
                        if (categoria.includes('24') || categoria.includes('91')) {
                            examenesPorCategoria["HEMOSTASIA Y TROMBOSIS"].push(obj);
                        }
                        if (categoria.includes('25') || categoria.includes('95')) {
                            examenesPorCategoria["INMUNOL HORMONAS"].push(obj);
                        }
                        if (categoria.includes('26') || categoria.includes('94')) {
                            examenesPorCategoria["INMUNOLO. HEPATICA"].push(obj);
                        }
                        if (categoria.includes('27') || categoria.includes('95')) {
                            examenesPorCategoria["MARCAD. ONCOLOGICOS"].push(obj);
                        }
                        if (categoria.includes('28') || categoria == 93) {
                            examenesPorCategoria["INMUNOLOGIA"].push(obj);
                        }
                        if (categoria.includes('29') || categoria.includes('96') || categoria.includes('97')) {
                            examenesPorCategoria["MICROBIOLOGIA"].push(obj);
                        }
                        if (categoria.includes('30')) {
                            examenesPorCategoria["BANCO DE SANGRE"].push(obj);
                        }
                        if (categoria.includes('31') || categoria.includes('98')) {
                            examenesPorCategoria["LABORATORIO - UCI"].push(obj);
                        }
                    }


                });

                console.log('examens cntral', examenesPorCategoria);
                // Función para ordenar los exámenes según los códigos
                function ordenarPorCodigo(examenes, ordenCodigos) {
                    return examenes.sort(function (a, b) {
                        const indiceA = ordenCodigos.indexOf(a.CodAntiguo);
                        const indiceB = ordenCodigos.indexOf(b.CodAntiguo);

                        if (indiceA === -1) return 1;
                        if (indiceB === -1) return -1;

                        return indiceA - indiceB;
                    });
                }

                // Orden para BIOQUIMICA
                const ordenCodigosBioquimica = [
                    "202.10.031", "202.10.029", "202.10.030", "202.10.042", "202.10.033", "202.10.047", "202.10.018",
                    "202.10.021", "202.10.013", "202.10.011", "202.10.012", "202.10.014", "202.10.046", "202.10.006",
                    "202.10.043", "202.10.044", "202.10.025", "202.10.027", "202.10.041", "202.10.001", "202.10.034",
                    "202.10.045", "202.10.008", "202.10.026", "202.10.039", "202.10.002", "202.10.038", "202.10.017",
                    "202.10.010", "202.10.020", "202.10.022", "202.10.028", "202.10.003", "202.10.023", "202.10.040",
                    "202.10.005", "202.10.019", "202.10.048", "202.10.004", "202.10.015", "202.10.016", "202.10.035",
                    "202.10.036", "202.10.037", "202.10.049", "202.10.007", "202.10.024"
                ];

                // Orden para BIOQUIMICA ORINA 21
                const ordenCodigosBioquimicaOrina = [
                    "202.11.009", "202.11.013", "202.11.012", "202.11.008", "202.11.001",
                    "202.11.014", "202.11.004", "202.11.003", "202.11.002", "202.11.010",
                    "202.11.005", "202.11.006", "202.11.007"
                ];

                // Orden para BIOQUIMICA FERTILIDAD 22
                const ordenCodigosBioquimicaFertilidad = [
                    "202.12.002"
                ];

                // Orden para HEMATOLOGIA 23
                const ordenCodigosHematologia = [
                    "202.20.010", "202.20.021", "202.20.004", "202.20.007", "202.20.016",
                    "202.20.019", "202.20.020", "202.20.003", "202.20.011", "202.20.002",
                    "202.20.009", "202.20.005", "202.20.006", "202.20.018", "202.20.017",
                    "202.20.001", "202.20.013", "202.20.014", "202.20.015", "202.20.008"
                ];

                // Orden para HEMOSTASIA Y TROMBOSIS   24
                const ordenCodigosHemostasia = [
                    "202.21.006", "202.21.009", "202.21.003", "202.21.008", "202.21.001",
                    "202.21.004", "202.21.002", "202.21.010", "202.21.005", "202.21.007"
                ];

                // Orden para INMUNOL HORMONAS  25
                const ordenCodigosInmunolHormonas = [
                    "202.30.094", "202.30.086", "202.30.090", "202.30.087", "202.30.096",
                    "202.30.099", "202.30.047", "202.30.048", "202.30.052", "202.30.076",
                    "202.30.077", "202.30.068", "202.30.089", "202.30.072", "202.30.066",
                    "202.30.083", "202.30.014", "202.30.015", "202.30.055", "202.30.073",
                    "202.30.039", "202.30.040", "202.30.020"
                ];

                // Orden para INMUNOLOGIA  26
                const ordenCodigosInmunologiaHepatica = [
                    "202.30.022", "202.30.023", "202.30.003", "202.30.004", "202.30.021", "202.30.006",
                    "202.30.007", "202.30.008", "202.30.009", "202.30.049"


                ];

                // Orden para MARCAD. ONCOLOGICOS 27
                const ordenCodigosOncologicos = [
                    "202.30.001", "202.30.031", "202.30.035", "202.30.036", "202.30.043",
                    "202.30.044", "202.30.045", "202.30.046", "202.30.055", "202.30.080", "202.30.081", "202.30.082", "202.30.102"

                ];



                //Orden  pINMUNOLOGÍA 28
                const ordenCodigosInmunologia = [
                    "202.30.002", "202.30.098", "202.30.097", "202.30.025", "202.30.026", "202.30.027",
                    "202.30.029", "202.30.030", "202.30.028", "202.30.028", "202.30.064", "202.30.088",
                    "202.30.100", "202.30.051", "202.30.050", "202.30.067", "202.30.071", "202.30.091",
                    "202.30.069", "202.30.078", "202.30.058", "202.30.053", "202.30.013", "202.30.011",
                    "202.30.012", "202.30.016", "202.30.092", "202.30.093", "202.30.084", "202.30.085",
                    "202.30.037", "202.30.038", "202.30.059", "202.30.060", "202.30.061", "202.30.062",
                    "202.30.063", "202.30.095", "202.30.074", "202.30.075", "202.30.070", "202.30.005",
                    "202.30.010", "202.30.017", "202.30.018", "202.30.019", "202.30.020", "202.30.024",
                    "202.30.032", "202.30.033", "202.30.034", "202.30.041", "202.30.042", "202.30.065",
                    "202.30.101", "202.30.056", "202.30.057", "202.30.054", "202.30.079"


                ];
                // Orden para MICROBIOLOGIA 29
                const ordenCodigosMicrobiologia = [
                    "202.40.034", "202.40.006", "202.40.002", "202.40.019", "202.40.020", "202.40.022",
                    "202.40.001", "202.40.010", "202.40.009", "202.40.027", "202.40.028", "202.40.030",
                    "202.40.029", "202.40.031", "202.40.023", "202.40.024", "202.40.033", "202.40.003",
                    "202.40.026", "202.40.005", "202.40.025", "202.40.032", "202.40.021", "202.40.004",
                    "202.40.007", "202.40.008", "202.40.012", "202.40.013", "202.40.014", "202.40.015",
                    "202.40.016", "202.40.017", "202.40.018", "202.40.011"
                ];

                // Orden para BANCO DE SANGRE 30
                const ordenCodigosBancoSangre = [
                    "202.50.001", "202.50.002", "202.50.003", "202.50.004", "202.50.005", "202.50.006",
                    "202.50.007", "202.50.008", "202.50.010", "202.50.011", "202.50.012", "202.50.013",
                    "202.50.014", "202.50.015", "202.50.016", "202.50.017", "202.50.018", "202.50.019",
                    "202.50.020"
                ];

                // Orden para LABORATORIO - UCI
                const ordenCodigosUCI = [
                    "202.60.017", "202.60.018"
                ];

                // Ordenar los exámenes para cada categoría
                examenesPorCategoria["BIOQUIMICA"] = ordenarPorCodigo(examenesPorCategoria["BIOQUIMICA"], ordenCodigosBioquimica);
                examenesPorCategoria["BIOQUIMICA ORINA"] = ordenarPorCodigo(examenesPorCategoria["BIOQUIMICA ORINA"], ordenCodigosBioquimicaOrina);
                examenesPorCategoria["BIOQUIMICA FERTILIDAD"] = ordenarPorCodigo(examenesPorCategoria["BIOQUIMICA FERTILIDAD"], ordenCodigosBioquimicaFertilidad);
                examenesPorCategoria["HEMATOLOGIA"] = ordenarPorCodigo(examenesPorCategoria["HEMATOLOGIA"], ordenCodigosHematologia);
                examenesPorCategoria["HEMOSTASIA Y TROMBOSIS"] = ordenarPorCodigo(examenesPorCategoria["HEMOSTASIA Y TROMBOSIS"], ordenCodigosHemostasia);
                examenesPorCategoria["INMUNOL HORMONAS"] = ordenarPorCodigo(examenesPorCategoria["INMUNOL HORMONAS"], ordenCodigosInmunolHormonas);
                examenesPorCategoria["INMUNOLO. HEPATICA"] = ordenarPorCodigo(examenesPorCategoria["INMUNOLO. HEPATICA"], ordenCodigosInmunologiaHepatica);
                examenesPorCategoria["MARCAD. ONCOLOGICOS"] = ordenarPorCodigo(examenesPorCategoria["MARCAD. ONCOLOGICOS"], ordenCodigosOncologicos);
                examenesPorCategoria["INMUNOLOGIA"] = ordenarPorCodigo(examenesPorCategoria["INMUNOLOGIA"], ordenCodigosInmunologia);
                examenesPorCategoria["MICROBIOLOGIA"] = ordenarPorCodigo(examenesPorCategoria["MICROBIOLOGIA"], ordenCodigosMicrobiologia);
                examenesPorCategoria["BANCO DE SANGRE"] = ordenarPorCodigo(examenesPorCategoria["BANCO DE SANGRE"], ordenCodigosBancoSangre);
                examenesPorCategoria["LABORATORIO - UCI"] = ordenarPorCodigo(examenesPorCategoria["LABORATORIO - UCI"], ordenCodigosUCI);

                var column1Html = '<div class="col-md-6">';
                var column2Html = '<div class="col-md-6">';

                column1Html += EvaluacionHospitalizacion.generateExamensCentralHtml("BIOQUIMICA", examenesPorCategoria["BIOQUIMICA"]);
                column1Html += EvaluacionHospitalizacion.generateExamensCentralHtml("BIOQUIMICA ORINA", examenesPorCategoria["BIOQUIMICA ORINA"]);
                column1Html += EvaluacionHospitalizacion.generateExamensCentralHtml("BIOQUIMICA FERTILIDAD", examenesPorCategoria["BIOQUIMICA FERTILIDAD"]);
                column1Html += EvaluacionHospitalizacion.generateExamensCentralHtml("HEMATOLOGIA", examenesPorCategoria["HEMATOLOGIA"]);
                column1Html += EvaluacionHospitalizacion.generateExamensCentralHtml("HEMOSTASIA Y TROMBOSIS", examenesPorCategoria["HEMOSTASIA Y TROMBOSIS"]);
                column1Html += EvaluacionHospitalizacion.generateExamensCentralHtml("INMUNOL HORMONAS", examenesPorCategoria["INMUNOL HORMONAS"]);
                column1Html += '</div>';


                column2Html += EvaluacionHospitalizacion.generateExamensCentralHtml("INMUNOLO. HEPATICA", examenesPorCategoria["INMUNOLO. HEPATICA"]);
                column2Html += EvaluacionHospitalizacion.generateExamensCentralHtml("MARCAD. ONCOLOGICOS", examenesPorCategoria["MARCAD. ONCOLOGICOS"]);
                column2Html += EvaluacionHospitalizacion.generateExamensCentralHtml("INMUNOLOGIA", examenesPorCategoria["INMUNOLOGIA"]);
                column2Html += EvaluacionHospitalizacion.generateExamensCentralHtml("MICROBIOLOGIA", examenesPorCategoria["MICROBIOLOGIA"]);
                column2Html += EvaluacionHospitalizacion.generateExamensCentralHtml("BANCO DE SANGRE", examenesPorCategoria["BANCO DE SANGRE"]);
                column2Html += EvaluacionHospitalizacion.generateExamensCentralHtml("LABORATORIO - UCI", examenesPorCategoria["LABORATORIO - UCI"]);
                column2Html += '</div>';

                // Agregar las columnas al contenedor
                $('#contenedorChecksCentral').append(column1Html);
                $('#contenedorChecksCentral').append(column2Html);
            },
            error: function (msg) {
                setTimeout(function () {
                    alerta("ERROR", "Error listar Examen Central!", "2");
                }, 900);
            }
        });
    },

    generateExamensCentralHtml(categoria, examenes) {
        var html = '';
        if (examenes && examenes.length > 0) {
            html += `<h5 class="category-title">${categoria}</h5>`;
            $(examenes).each(function (i, obj) {
                html += `
                        <div class="check__toggle m-0">
                            <label class="toggle">
                                <input class="toggle__input campo" type="checkbox" id="${obj.IdProducto}" data-codigo="${obj.Codigo}" data-precio="${obj.PrecioUnitario}" data-labotario="${obj.Laboratorio}">
                                <span class="toggle__label mr-2">
                                      <i class="fa fa-flask icono-toggle" style="width: 50px; text-align:center;"></i>
                                    <span class="toggle__text">${obj.Nombre} 
                                   
    
                                </span>
                            </label>
                        </div>
                    `;
            });
        }
        return html;
    },







    async GuardarEvaluacionHospitalizacion() {

        let formData = new FormData()

        formData.append('_token', $("meta[name='csrf-token']").attr("content"));

        formData.append('IdAtencion', $('#hdnIdAtencion').val());
        formData.append('idServicio', $('#hdnIdServicio').val());

        // Motivo Atención

        // formData.append('IdTiempoSintoma', $('#cboTiempoSintoma').val());
        // formData.append('TiempoSintoma', $('#txtTiempoSintoma').val());
        // formData.append('MotivoAtencion', $('#txtMotivoAtencion').val());

        // formData.append('Prioridad', $('#cboPrioridad').val());
        // formData.append('Glasgow', $('#txtGlasgow').val());

/*
    // Campos del examen físico
    formData.append('fecha_hora_examen', $('#fechaHoraExamen').val());
    formData.append('presion_sistolica', $('#pa_sistolica').val());
    formData.append('presion_diastolica', $('#pa_diastolica').val());
    formData.append('frecuencia_respiratoria', $('#fr').val());
    formData.append('frecuencia_cardiaca', $('#fc').val());
    formData.append('temperatura', $('#temperatura').val());
    formData.append('temperatura_tipo', $("input[name='temperatura_tipo']:checked").val()); // oral / axilar

    formData.append('peso', $('#peso').val());
    formData.append('talla', $('#talla').val());
    formData.append('imc', $('#imc').val());
    formData.append('perimetro_abdominal', $('#perimetro_abdominal').val());

    // Examen General
    formData.append('edad_aparente', $('#edad_aparente').val());
    formData.append('estado_general', $('#estado_general').val());
    formData.append('signos_llama_atencion', $('#signos_llama_atencion').val());
    formData.append('piel_anexos', $('#piel_anexos').val());
    formData.append('llenado_capilar', $('#llenado_capilar').val());
    formData.append('tejido_subcutaneo', $('#tejido_subcutaneo').val());
    formData.append('sistema_osteoarticular', $('#sistema_osteoarticular').val());
    formData.append('linfadenopatia', $('#linfadenopatia').val());

    // Ejemplo de signos regionales (checkbox múltiples)
    formData.append('reflujo_hepatoyugular', $('#reflujo_hepatoyugular').is(":checked") ? 1 : 0);
    formData.append('ingurgitacion_yugular', $('#ingurgitacion_yugular').is(":checked") ? 1 : 0);

 */

        //// Signos y Síntomas
        formData.append('Dolor', $('#chkDolor').is(":checked") ? 1 : 0);
        formData.append('Convulsiones', $('#chkConvulsion').is(":checked") ? 1 : 0);
        formData.append('Fiebre', $('#chkFiebre').is(":checked") ? 1 : 0);
        formData.append('Vomitos', $('#chkVomitos').is(":checked") ? 1 : 0);
        formData.append('ContraccionesU', $('#chkContraccionUterina').is(":checked") ? 1 : 0);

        // formData.append('Diarrea', $('#chkDiarrea').is(":checked") ? 1 : 0);

        // formData.append('Hemorragia', $('#chkHemorragia').is(":checked") ? 1 : 0);

        // formData.append('DificultadRespiratoria', $('#chkDificultadRespiratoria').is(":checked") ? 1 : 0);
        // formData.append('DistensionAbdominal', $('#chkDistensionAbdominal').is(":checked") ? 1 : 0);
        // formData.append('Cianosis', $('#chkCianosis').is(":checked") ? 1 : 0);
        // formData.append('MalOlorOmbligo', $('#chkMalOlorOmbligo').is(":checked") ? 1 : 0);
        // formData.append('Ictericia', $('#chkIctericia').is(":checked") ? 1 : 0);

        formData.append('SangradoV', $('#chkSangradoV').is(":checked") ? 1 : 0);
        formData.append('PerdidaLA', $('#chkPerdidaLA').is(":checked") ? 1 : 0);
        formData.append('AusenciaMF', $('#chkAusenciaMF').is(":checked") ? 1 : 0);
        formData.append('SintomasU', $('#chkSintomasU').is(":checked") ? 1 : 0);
        formData.append('FlujoV', $('#chkFlujoVaginal').is(":checked") ? 1 : 0);
        formData.append('Tumoracion', $('#chkTumoracion').is(":checked") ? 1 : 0);
        formData.append('AlteracionesM', $('#chkAlteracionesM').is(":checked") ? 1 : 0);
        formData.append('DisMovFetales', $('#chkDismMovFetal').is(":checked") ? 1 : 0);
        formData.append('Otros', $('#chkOtrosSintomas').is(":checked") ? 1 : 0);
        formData.append('OtrosSintomas', $('#txtOtroSintomas').val());

        // Motivo Atencion
        formData.append('ApetitoIngreso', $('#txtApetitoIngreso').val());
        formData.append('SedIngreso', $('#txtSedIngreso').val());
        formData.append('OrinaIngreso', $('#txtOrinaIngreso').val());
        // formData.append('ApetitoIngreso', $('#txtApetitoIngreso').val());
        formData.append('DeposicionesIngreso', $('#txtDeposicionesIngreso').val());
        formData.append('SeunioIngreso', $('#txtSeunioIngreso').val());

        formData.append('EnfermedadA', $('#txtEnfermedadActual').val());
        formData.append('Relato', $('#txtRelato').val());
        formData.append('ExamenCli', $('#txtExamenCli').val());
        formData.append('ExamenAux', $('#txtExamenAux').val());
        formData.append('Evolucion', $('#txtEvolucion').val());




        //////ANTECEDENTES
        // formData.append('Mrc', $('#txtMRC').val());
        formData.append('FechaUR', $('#txtFechaFUR').val());
        formData.append('FechaUE', $('#txtFechaFUE').val());
        formData.append('FechaPP', $('#txtFechaFPP').val());


        formData.append('EGsemanas', $('#txtEGsemanas').val());
        formData.append('EGdias', $('#txtEGdias').val());
        formData.append('CPNveces', $('#txtCPNveces').val());
        formData.append('GMotiA', $('#txtG').val());
        formData.append('PMotiA', $('#txtP').val());
        formData.append('Pin', $('#txtPin').val());
        formData.append('DeltaPeso', $('#txtDeltaPeso').val());
        formData.append('LMadPulmonar', $('input:radio[name=rdbPulmonar]:checked').val() == undefined ? '' : $('input:radio[name=rdbPulmonar]:checked').val());
        formData.append('DMadPulmonar', $('#txtMadPulmonar').val());
        formData.append('LEstadoGeneral', $('input:radio[name=rdbCervical]:checked').val() == undefined ? '' : $('input:radio[name=rdbCervical]:checked').val());
        formData.append('DMadCervical', $('#txtMadCervical').val());
        formData.append('LMadCervical', $('input:radio[name=rdbCervical]:checked').val() == undefined ? '' : $('input:radio[name=rdbCervical]:checked').val());

        formData.append('AntecedentesMedicos', $('#txtAntecedentesMedicos').val());
        formData.append('Ram', $('#txtRam').val());
        formData.append('LTransfucion', $('input:radio[name=rdbTransfucion]:checked').val() == undefined ? '' : $('input:radio[name=rdbEstGS]:checked').val());
        formData.append('AntecedentesQuirurgico', $('#txtAntecedentesQuirurgico').val());

        //antecedentes Personales
        formData.append('LTbcPerso', $('input:radio[name=rdbTbcPerso]:checked').val() == undefined ? '' : $('input:radio[name=rdbTbcPerso]:checked').val());
        formData.append('DTbcPerso', $('#txtTbcPerso').val());

        formData.append('LHtaPerso', $('input:radio[name=rdbHtaPerso]:checked').val() == undefined ? '' : $('input:radio[name=rdbHtaPerso]:checked').val());
        formData.append('DHtaPerso', $('#txtHtaPerso').val());

        formData.append('LVIHPerso', $('input:radio[name=rdbVIHPerso]:checked').val() == undefined ? '' : $('input:radio[name=rdbVIHPerso]:checked').val());
        formData.append('DVIHPerso', $('#txtVIHPerso').val());

        formData.append('LCirugiaMayorPerso', $('input:radio[name=rdbCirugiaMayorPerso]:checked').val() == undefined ? '' : $('input:radio[name=rdbCirugiaMayorPerso]:checked').val());
        formData.append('DCirugiaMayorPerso', $('#txtCirugiaMayorPerso').val());

        formData.append('LVacunaPreviaPerso', $('input:radio[name=rdbVacunaPreviaPerso]:checked').val() == undefined ? '' : $('input:radio[name=rdbVacunaPreviaPerso]:checked').val());
        formData.append('DVacunaPreviaPerso', $('#txtVacunaPreviaPerso').val());
        //
        formData.append('LDiabetesPerso', $('input:radio[name=rdbDiabetesPerso]:checked').val() == undefined ? '' : $('input:radio[name=rdbDiabetesPerso]:checked').val());
        formData.append('DDiabetesPerso', $('#txtDiabetesPerso').val());

        formData.append('LPreEclampsiaPerso', $('input:radio[name=rdbPreEclampsiaPerso]:checked').val() == undefined ? '' : $('input:radio[name=rdbPreEclampsiaPerso]:checked').val());
        formData.append('DPreEclampsiaPerso', $('#txtPreEclampsiaPerso').val());

        formData.append('LAlergiaPerso', $('input:radio[name=rdbAlergiaPerso]:checked').val() == undefined ? '' : $('input:radio[name=rdbAlergiaPerso]:checked').val());
        formData.append('DAlergiaPerso', $('#txtAlergiaPerso').val());

        formData.append('LViolenciaPerso', $('input:radio[name=rdbViolenciaPerso]:checked').val() == undefined ? '' : $('input:radio[name=rdbViolenciaPerso]:checked').val());
        formData.append('DViolenciaPerso', $('#txtViolenciaPerso').val());

        formData.append('LOtrosPerso', $('input:radio[name=rdbOtrosPerso]:checked').val() == undefined ? '' : $('input:radio[name=rdbOtrosPerso]:checked').val());
        formData.append('DOtros', $('#txtOtros').val());


        //// Examen Físico
        formData.append('LEstadoGeneral', $('input:radio[name=rdbEstGS]:checked').val() == undefined ? '' : $('input:radio[name=rdbEstGS]:checked').val());
        formData.append('DEstadoGeneral', $('#txtEstdGeneSens').val());
        formData.append('DEdemas', $('#txtEdemas').val());

        formData.append('LAparatoCV', $('input:radio[name=rdbCard]:checked').val() == undefined ? '' : $('input:radio[name=rdbCard]:checked').val());
        formData.append('DAparatoCV', $('#txtCardVas').val());
        formData.append('DReflejos', $('#txtReflejos').val());

        formData.append('LAbdomen', $('input:radio[name=rdbAbdomen]:checked').val() == undefined ? '' : $('input:radio[name=rdbAbdomen]:checked').val());
        formData.append('DAbdomen', $('#txtAbdomenNormal').val());

        formData.append('LAparatoR', $('input:radio[name=rdbAptResp]:checked').val() == undefined ? '' : $('input:radio[name=rdbAptResp]:checked').val());
        formData.append('DAparatoR', $('#txtbAptResp').val());

        formData.append('LAparatoU', $('input:radio[name=rdbAptUrin]:checked').val() == undefined ? '' : $('input:radio[name=rdbAptUrin]:checked').val());
        formData.append('DAparatoU', $('#txtbAptUrin').val());

        formData.append('LExtremidades', $('input:radio[name=rdbExtrem]:checked').val() == undefined ? '' : $('input:radio[name=rdbExtrem]:checked').val());
        formData.append('DExtremidades', $('#txtExtrem').val());

        formData.append('LNeurologico', $('input:radio[name=rdbNeurologico]:checked').val() == undefined ? '' : $('input:radio[name=rdbNeurologico]:checked').val());
        formData.append('DNeurologico', $('#txtNeurologico').val());

        formData.append('LPiel', $('input:radio[name=rdbPiel]:checked').val() == undefined ? '' : $('input:radio[name=rdbPiel]:checked').val());
        formData.append('DPiel', $('#txtPiel').val());
        formData.append('Otros_Examenfisico', $('#txtOtros_ExamenFisico').val());

        // END Motivo Atención

        try {
            datos = await $.ajax({
                method: "POST",
                url: "/EvaluacionHospitalizacion/GuardarEvaluacion",
                //contentType: "application/json; charset=utf-8",
                data: formData,
                dataType: "json",
                cache: false,
                processData: false,
                contentType: false,
            });

            console.log('algo grabo', datos)

            // if (datos.session) {

            //     console.log('algo grabo', datos)

            //     if (datos.estado) {
            //         resp = true;
            //         //alerta(1, 'El examen gíneco obstetra se guardó correctamente.')

            //     } else {
            //         Cargando(0);
            //         alerta(2, datos.msj);
            //     }
            // }
            // else {
            //     Cargando(0);
            //     alert("La sesion ya expiro se volvera a recargar la pagina")
            //     location.reload();
            // }
        } catch (error) {
            console.error(error)
            // alerta(3, error);
        }

    },

    async GuardarEvaluacionHospitalizacionDetalle() {

        if (EvaluacionHospitalizacion.IdNumero == 0) {
            return false;
        }

        let formData = new FormData()

        formData.append('_token', $("meta[name='csrf-token']").attr("content"));

        // formData.append('IdCuentaAtencion', Variables.IdCuentaAtencion);
        formData.append('IdAtencion', $('#hdnIdAtencion').val());
        formData.append('IdNumero', EvaluacionHospitalizacion.IdNumero);
        formData.append('Seguimiento', $('#txtImpresionDiagnostica').val());
        formData.append('Tratamiento', $('#txtTratamiento').val());
        // formData.append('IdUsuario', isEmpty(objrowTb2) ? 0 : objrowTb2.idUsuario);
        formData.append('fecha', $('#FechaInicioAtencion').val());
        formData.append('PlandeTrabajo', $('#txtPlanTrabajo').val());
        formData.append("IdServicio", $('#hdnIdServicio').val());
        formData.append('HoraInicioAtencion', $('#HoraInicioAtencion').val());




        // formData.append('idCuentaAtencion', Variables.IdCuentaAtencion);

        // formData.append("idMedico", EvaluacionDetalle.IdMedico);

        // END Motivo Atención

        try {
            datos = await $.ajax({
                method: "POST",
                url: "/EvaluacionHospitalizacion/GuardarEvaluacionHospitalizacionDetalle",
                //contentType: "application/json; charset=utf-8",
                data: formData,
                dataType: "json",
                cache: false,
                processData: false,
                contentType: false,
            });

            let evaluacionDetalle = await EvaluacionHospitalizacion.ListarEvaluacionHospitalizacionDetalleByIdAtencion($('#hdnIdAtencion').val(), 0)

            DtEvaluaciones.clear().draw();
            if (evaluacionDetalle.length > 0) {
                DtEvaluaciones.rows.add(evaluacionDetalle).draw();
            }


            // if (datos.session) {

            //     console.log('algo grabo', datos)

            //     if (datos.estado) {
            //         resp = true;
            //         //alerta(1, 'El examen gíneco obstetra se guardó correctamente.')

            //     } else {
            //         Cargando(0);
            //         alerta(2, datos.msj);
            //     }
            // }
            // else {
            //     Cargando(0);
            //     alert("La sesion ya expiro se volvera a recargar la pagina")
            //     location.reload();
            // }
        } catch (error) {
            console.error(error)
            // alerta(3, error);
        }

    },

    async GuardarDiagnosticos() {

        let formData = new FormData()

        formData.append('_token', $("meta[name='csrf-token']").attr("content"));

        formData.append('IdAtencion', $('#hdnIdAtencion').val());
        formData.append('IdNumero', EvaluacionHospitalizacion.IdNumero);
        formData.append("IdServicio", $('#hdnIdServicio').val());
        formData.append('Diagnosticos', EvaluacionHospitalizacion.ObtenerDiagnosticos());


        // END Motivo Atención

        try {
            datos = await $.ajax({
                method: "POST",
                url: "/EvaluacionHospitalizacion/GuardarDiagnosticos",
                //contentType: "application/json; charset=utf-8",
                data: formData,
                dataType: "json",
                cache: false,
                processData: false,
                contentType: false,
            });

        } catch (error) {
            console.error(error)
        }

    },

    async ListarEvaluacionHospitalizacionDetalleByIdAtencion(IdAtencion, IdNumeroEval) {

        let formData = new FormData()

        formData.append('_token', $("meta[name='csrf-token']").attr("content"));

        // formData.append('IdCuentaAtencion', Variables.IdCuentaAtencion);
        formData.append('IdAtencion', IdAtencion);
        formData.append('IdNumero', IdNumeroEval);
        // END Motivo Atención

        try {
            datos = await $.ajax({
                method: "POST",
                url: "/EvaluacionHospitalizacion/ListarEvaluacionHospitalizacionDetalleByIdAtencion",
                //contentType: "application/json; charset=utf-8",
                data: formData,
                dataType: "json",
                cache: false,
                processData: false,
                contentType: false,
            });

            return datos.resultado

        } catch (error) {
            console.error(error)
            // alerta(3, error);
        }

    },

    async ListarDiagnosticos(IdNumeroEval) {
        let formData = new FormData()

        formData.append('_token', $("meta[name='csrf-token']").attr("content"));

        // formData.append('IdCuentaAtencion', Variables.IdCuentaAtencion);
        formData.append('IdAtencion', $('#hdnIdAtencion').val());
        formData.append('IdNumero', IdNumeroEval);
        // END Motivo Atención

        try {
            datos = await $.ajax({
                method: "POST",
                url: "/EvaluacionHospitalizacion/ListarDiagnosticos",
                //contentType: "application/json; charset=utf-8",
                data: formData,
                dataType: "json",
                cache: false,
                processData: false,
                contentType: false,
            });

            console.log('datos.resultado', datos.resultado); //PGONZALESC
            //DtDiagnosticos.fnAddData(datos.resultado);
            DtDiagnosticos.clear().draw();
            DtDiagnosticos.rows.add(datos.resultado).draw(false);

            /////////Diagnosticos para Recetas Medicas//////////////
            DTDiagnosticosRecetaMedica.clear().draw();
            DTDiagnosticosRecetaMedica.rows.add(datos.resultado).draw(false);

        } catch (error) {
            //console.error(error)
            alerta('error', '', error);
        }

    },



    async CargarDatosEvaluacionDetalle() {
        var objrowTb = DtEvaluaciones.row('.selected').data();
        $("#BadgeEvaluacion").removeClass("alerta-success");
        $("#BadgeEvaluacion").addClass("alerta-primary");
        $("#lblNumeroEvaluacion").html("Evaluación N° " + objrowTb.IdNumero);

        EvaluacionHospitalizacion.IdNumero = objrowTb.IdNumero;
        Variables.NroEvaluacion = objrowTb.IdNumero;
        
        EvaluacionHospitalizacion.nuevaEvaluacion = false;

        Cargando(1);
        await Triaje.ListarTriajeEmergenciaPorEvaluacion($('#hdnIdAtencion').val(), objrowTb.IdNumero)
        let evaluacionDetalle = await EvaluacionHospitalizacion.ListarEvaluacionHospitalizacionDetalleByIdAtencion($('#hdnIdAtencion').val(), objrowTb.IdNumero)
        console.log('evaluacionDetalle', evaluacionDetalle);
        await EvaluacionHospitalizacion.ListarDiagnosticos(objrowTb.IdNumero);
        //await OrdenMedica.CargarOrdenesMedicasPorIdCuentaAtencion(Variables.IdCuentaAtencion);
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        let datosOrdenes = await OrdenMedica.CargarOrdenesMedicasPorIdCuentaAtencionPorEvaluacion(Variables.IdCuentaAtencion, Variables.NroEvaluacion);
        let datosInter =await OrdenMedica.CargarOrdenesInterconsultaPorIdCuentaAtencionPorEvaluacion(Variables.IdCuentaAtencion, EvaluacionHospitalizacion.IdNumero,Variables.IdAtencion)
        //await OrdenMedica.CargarOrdenesMedicasPorIdCuentaAtencionPorEvaluacion(Variables.IdCuentaAtencion, EvaluacionHospitalizacion.IdNumero);
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        await ConsumoServicio.CargarOrdenesCPT(Variables.IdCuentaAtencion, objrowTb.IdNumero);
        await Resultados.CargarLaboratorioMovimientos(Variables.IdCuentaAtencion, Variables.NroEvaluacion);
        // await Resultados.CargarLaboratorioMovimientos( $("#hdIdPaciente").val()) // kds

        // await Triaje.ListarTriajeEvaluacionHospitalizacion($('#hdnIdAtencion').val(), objrowTb.IdNumero)

        $('#txtImpresionDiagnostica').val(evaluacionDetalle[0].Seguimiento)
        $('#txtTratamiento').val(evaluacionDetalle[0].Tratamiento)
        $('#txtPlanTrabajo').val(evaluacionDetalle[0].PlandeTrabajo)

        $("#txtPesoEvaluacion").change();

        //$('#FechaInicioAtencion').val(evaluacionDetalle[0].fechaAtencion)

        //$('#FechaInicioAtencion').datepicker('setStartDate', moment(moment(ConvertirFormatoFecha(evaluacionDetalle[0].fechaAtencion)).toDate()).toDate().format('dd/mm/yyyy'));
        //$('#FechaInicioAtencion').datepicker('setEndDate', moment().toDate());
        $('#FechaInicioAtencion').datepicker("setDate", evaluacionDetalle[0].fechaAtencion)

        $('#HoraInicioAtencion').val(evaluacionDetalle[0].HoraInicioAtencion)
        //cargar ordenes
        resp = Array.isArray(datosOrdenes) ? datosOrdenes : [];
        resp1 = Array.isArray(datosInter) ? datosInter : [];

        let datosTotales = [];

      
        if (resp.length > 0 && resp1.length > 0) {
            datosTotales = resp.concat(resp1);
        } else if (resp.length > 0) {
            datosTotales = resp;
        } else if (resp1.length > 0) {
            datosTotales = resp1;
        }

        
        if (datosTotales.length > 0) {
            DTORdenesMedicas.clear(); 
            DTORdenesMedicas.rows.add(datosTotales).draw(false);
        } else {
           
            DTORdenesMedicas.clear().draw(false);
            console.log("No se encontraron datos en ninguna de las respuestas.");
        }

        Cargando(0);

        if (evaluacionDetalle[0].EstadoTransferencia == 2) {
            $("#btnGuardarEva").hide();
            $(".btnEliminarDiagnostico").addClass('d-none');
            $("#btnAgregarCSAtencion").addClass('d-none');
            $("#btnEliminarCSAtencion").addClass('d-none');
            $("#btnAgregarOrdenMedica").addClass('d-none');
            $("#btnConsultarOrdenMedica").addClass('d-none');
            $("#btnModificarOrdenMedica").addClass('d-none');
            $("#btnEliminarOrdenMedica").addClass('d-none');
            $("#btnConsultarResultadoLab").addClass('d-none');
            $("#EvaluacionHospitalizacionAgregarDiagnostico").addClass('d-none');
        }
        if (evaluacionDetalle[0].IdUsuario == Variables.IdUsuarioLogeado && evaluacionDetalle[0].EstadoTransferencia != 2) {
            $("#btnGuardarEva").show();
            $(".btnEliminarDiagnostico").removeClass('d-none');
            $("#btnAgregarCSAtencion").removeClass('d-none');
            $("#btnEliminarCSAtencion").removeClass('d-none');
            $("#btnAgregarOrdenMedica").removeClass('d-none');
            $("#btnConsultarOrdenMedica").removeClass('d-none');
            $("#btnModificarOrdenMedica").removeClass('d-none');
            $("#btnEliminarOrdenMedica").removeClass('d-none');
            $("#btnConsultarResultadoLab").removeClass('d-none');
            $("#EvaluacionHospitalizacionAgregarDiagnostico").removeClass('d-none');
        }
        if (evaluacionDetalle[0].IdTipoAlta != null && evaluacionDetalle[0].IdCondicionAlta != null) {
            $("#btnGuardarEva").hide();
            $(".btnEliminarDiagnostico").addClass('d-none');
            $("#btnAgregarCSAtencion").addClass('d-none');
            $("#btnEliminarCSAtencion").addClass('d-none');
            $("#btnAgregarOrdenMedica").addClass('d-none');
            $("#btnConsultarOrdenMedica").addClass('d-none');
            $("#btnModificarOrdenMedica").addClass('d-none');
            $("#btnEliminarOrdenMedica").addClass('d-none');
            $("#btnConsultarResultadoLab").addClass('d-none');
            $("#EvaluacionHospitalizacionAgregarDiagnostico").addClass('d-none');
        }

        //console.log('evaluacionDetalle', evaluacionDetalle)
    },

    Eventos() {
        
       

        // Buttons
        /////////////////////////GUARDAR Y CANCELAR EVALUACION////////////////////////
        // $("#btnGuardarEva").on('click', async function () {
        //     var evals = DtEvaluaciones.data().count();
        //     var dxs = DtDiagnosticos.data().count();
        //     if (evals == 0 && EvaluacionHospitalizacion.nuevaEvaluacion == false) {
        //         alerta('info', '', 'No se ha registrado ninguna evaluación. Por favor registre una evaluación.');
        //         return;
        //     } else if (EvaluacionHospitalizacion.IdNumero == 0) {
        //         alerta('info', '', 'No se ha seleccionado ninguna evaluación. Por favor seleccione una evaluación.');
        //         return;
        //     }

        //     if (dxs == 0) {
        //         alerta('info', '', 'No se ha registrado ningun diagnóstico. Por favor registre al menos un diagnóstico.');
        //         return;
        //     }
        //     console.log('evals', evals);
        //     console.log('dxs', dxs);
        //     console.log('EvaluacionHospitalizacion.IdNumero', EvaluacionHospitalizacion.IdNumero);

        //     Cargando(1);
        //     Triaje.GuardarTriajeEmergencia(Variables.IdAtencion, Variables.IdServicio, 0);
        //     // Triaje.GuardarTriajeEmergenciaPorEvaluacion(Variables.IdAtencion, Variables.IdServicio, EvaluacionHospitalizacion.IdNumero);
        //     await EvaluacionHospitalizacion.GuardarEvaluacionHospitalizacion();
        //     await EvaluacionHospitalizacion.GuardarEvaluacionHospitalizacionDetalle();
        //     await EvaluacionHospitalizacion.GuardarDiagnosticos();
        //     $("#tblEvaluacionesHospitalizacion tbody tr[data-eval=" + EvaluacionHospitalizacion.IdNumero + "]").click();          //seleccionar la evaluacion
        //     alerta('success', '', 'La evaluación N° ' + EvaluacionHospitalizacion.IdNumero + ' se guardó correctamente.');
        //     Cargando(0);
        //     // VisorDocumento.AbrirVisorDocumentos(1,1,'dd');
        //     // var eval = oTable_EvaEmer.DataTable().data().count();

        //     // sesion = Utilitario.ValidarSesion();
        //     // if (sesion) {
        //     //     if (eval == 0 && EvaluacionHospitalizacion.nuevaEvaluacion == false) {
        //     //         alerta(2, "No se ha registrado ninguna evaluación. Por favor registre una evaluación.");
        //     //     } else {
        //     //         if (EvaluacionHospitalizacion.ValidarVariablesEvaluacionHospitalizacion()) {
        //     //             Cargando(1);
        //     //             Triaje.GuardarTriajeHospEmeg(Variables.IdAtencion, Variables.IdServicioEgreso, 0);
        //     //             const data1 = await EvaluacionHospitalizacion.GuardarEvaluacionHospitalizacion();
        //     //             const data2 = await EvaluacionHospitalizacion.GuardarExamenFisico();

        //     //             if (EvaluacionHospitalizacion.nuevaEvaluacion == true || EvaluacionHospitalizacion.modificaEvaluacion == true) {
        //     //                 if (data1 == true && data2 == true) {
        //     //                     const data3 = await EvaluacionHospitalizacion.GuardarEvaluacionHospitalizacionDetalle();
        //     //                     if (data3) {
        //     //                         alerta2('success', 'EMERGENCIA', 'La evaluación se guardó correctamente.');
        //     //                     }
        //     //                 }
        //     //             } else {
        //     //                 if (EvaluacionHospitalizacion.modificaCabecera == true) {
        //     //                     const data4 = EvaluacionHospitalizacion.ActualizarHojaCabecera();
        //     //                     if (data4) {
        //     //                         alerta2('success', 'EMERGENCIA', 'La evaluación se guardó correctamente.');
        //     //                     }
        //     //                 }
        //     //             }
        //     //             EvaluacionHospitalizacion.CargarEvaluacion();
        //     //             //EvaluacionHospitalizacion.LimpiarModuloEmergencia();
        //     //             //EvaluacionDetalle.Limpiar();
        //     //             //AdmisionEmergencia.CerrarModulo();
        //     //             //ReposicionarVista();
        //     //             //MostrarAreaLista();
        //     //             //AdmisionEmergencia.ListarAtenciones();

        //     //             Cargando(0);
        //     //         }
        //     //     }
        //     // }
        // });

        $("#btnCancelarEva").on('click', async function () {
            Swal.fire({
                title: 'Aviso',
                text: '¿Estas seguro de salir de la evaluación?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#6c7cef',
                cancelButtonColor: '#5e5e5e',
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar',
                allowOutsideClick: false,
            }).then(async (result) => {
                if (result.isConfirmed) {
                    window.location.href = '../hospitalizacion/notaingreso/';
                    //window.history.back();
                }
            });
        });
        $("#btnInicioHosp").on('click', async function () {
            Swal.fire({
                title: 'Aviso',
                text: '¿Estas seguro de salir de la evaluación?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#6c7cef',
                cancelButtonColor: '#5e5e5e',
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar',
                allowOutsideClick: false,
            }).then(async (result) => {
                if (result.isConfirmed) {
<<<<<<< HEAD
                    window.location.href = '../../hospitalizacion/notaingreso/';
=======
                    window.location.href = '../hospitalizacion/notaingreso';
>>>>>>> c43206bf175774a3bfc1e1fc1e2cd58a60d1e406
                    //window.history.back();
                }
            });
        });


        // function validarNumEvaluaciones(){
        //     var table = $('#tblEvaluacionesHospitalizacion').DataTable();
        //     let NumeroEval = table.row('.selected').data(); 
        //     if(NumeroEval>=1){
        //         $('#ListaOpcionesEval input').attr('readonly', true);
        //     }

        // }


        $("#btnNuevoRegistro").on('click', async function () {
            console.log('333');
            var table = $('#tblEvaluacionesHospitalizacion').DataTable();
            let NumeroEval = table.row('.selected').data();

            if (NumeroEval == null) {
                NumeroEval = table.rows().count() + 1;
            } else {
                NumeroEval = NumeroEval.IdNumero;
            }

            if (Variables.IdMedicoLogeado == 0) {
                alerta('info', '', 'Usted no es médico para realizar una evaluación.');
                return;
            }

            if (Variables.IdMedicoLogeado > 0) {
                EvaluacionHospitalizacion.LimpiarVistaModuloEvaluacionDetalle();

                EvaluacionHospitalizacion.IdNumero = DtEvaluaciones.data().toArray().length + 1

                $("#BadgeEvaluacion").removeClass("alerta-primary");
                $("#BadgeEvaluacion").addClass("alerta-success");
                $("#CardEva").addClass("bg-blue");

                $("#lblNumeroEvaluacion").html("Evaluación N° " + EvaluacionHospitalizacion.IdNumero.toString());
                $("#lblTipoEvaluacion").html("Nueva Evaluación");

                $('#FechaInicioAtencion').attr('readonly', 'readonly');
                //$('#FechaInicioAtencion').datepicker('setStartDate', moment(moment(ConvertirFormatoFecha(Variables.FechaIngreso)).toDate()).toDate().format('dd/mm/yyyy'));
                //$('#FechaInicioAtencion').datepicker('setEndDate', moment().toDate());
                $('#FechaInicioAtencion').datepicker("setDate", moment().toDate().format('dd/mm/yyyy'));

                $('#HoraInicioAtencion').val(moment().toDate().format('HH:MM'));

                DtEvaluaciones.$('tr.selected').removeClass('selected');

                EvaluacionHospitalizacion.nuevaEvaluacion = true;

                $("#btnGuardarEva").show();

                //EvaluacionHospitalizacion.DesbloquearOpcionesModificacion();
                ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                //var table = new DataTable('#tblOrdenesMedicas'); //PGONZALESC
                //table.clear().draw(); //PGONZALESC
                /*
                DTORdenesMedicas.columns.adjust().draw();
                DTRecetaFarmacia.columns.adjust().draw();
                DTRecetaAnaPato.columns.adjust().draw();
                DTRecetaBancoSan.columns.adjust().draw();
                DTRecetaEcoGene.columns.adjust().draw();
                DTRecetaEcoObst.columns.adjust().draw();
                DTRecetaPatoCli.columns.adjust().draw();
                DTRecetaRayosX.columns.adjust().draw();
                DTRecetaTomo.columns.adjust().draw();
                DTRecetaInterconsulta.columns.adjust().draw();
                */
                await OrdenMedica.LimpiarOrdenesMedicas();
                await ConsumoServicio.CargarOrdenesCPT(Variables.IdCuentaAtencion, EvaluacionHospitalizacion.IdNumero);
                await EvaluacionHospitalizacion.ListarDiagnosticos(EvaluacionHospitalizacion.IdNumero); //PGONZALESC
                let resp1 = await OrdenMedica.CargarOrdenesInterconsultaPorIdCuentaAtencionPorEvaluacion(Variables.IdCuentaAtencion, EvaluacionHospitalizacion.IdNumero,Variables.IdAtencion)

              
               let = resp= await OrdenMedica.CargarOrdenesMedicasPorIdCuentaAtencionPorEvaluacion(Variables.IdCuentaAtencion, EvaluacionHospitalizacion.IdNumero);

                let datosTotales = [];

              
                if (resp.length > 0 && resp1.length > 0) {
                    datosTotales = resp.concat(resp1);
                } else if (resp.length > 0) {
                    datosTotales = resp;
                } else if (resp1.length > 0) {
                    datosTotales = resp1;
                }

                
                if (datosTotales.length > 0) {
                    DTORdenesMedicas.clear(); 
                    DTORdenesMedicas.rows.add(datosTotales).draw(false);
                }
                alerta('info', '', 'Paciente iniciara la Evaluación N° ' + EvaluacionHospitalizacion.IdNumero);

                $("#evaluaciones-tab").click();
            }

            $(".btnEliminarDiagnostico").removeClass('d-none');
            $("#btnAgregarCSAtencion").removeClass('d-none');
            $("#btnEliminarCSAtencion").removeClass('d-none');
            $("#btnAgregarOrdenMedica").removeClass('d-none');
            $("#btnConsultarOrdenMedica").removeClass('d-none');
            $("#btnModificarOrdenMedica").removeClass('d-none');
            $("#btnEliminarOrdenMedica").removeClass('d-none');
            $("#btnConsultarResultadoLab").removeClass('d-none');
            $("#EvaluacionHospitalizacionAgregarDiagnostico").removeClass('d-none');
            return;
            Cargando(1);
            var eval = oTable_EvaEmer.DataTable().data().count();

            EvaluacionDetalle.IdMedico = Utilitario.ObtenerIdMedicoSesion();
            EvaluacionDetalle.IdServicio = Variables.IdServicioEgreso;
            EvaluacionDetalle.IdNumero = eval + 1;

            if (EvaluacionDetalle.IdMedico > 0) {
                EvaluacionHospitalizacion.LimpiarVistaModuloEvaluacionDetalle();
                EvaluacionHospitalizacion.DesbloquearOpcionesModificacion();

                $("#BadgeEvaluacion .msc-hotline-icon").addClass("bg-success");
                $("#CardEva").addClass("bg-blue");

                $("#lblNumeroEvaluacion").html("Evaluación N° " + (eval + 1));
                $("#lblTipoEvaluacion").html("Nueva Evaluación");


                $('#FechaInicioAtencion').attr('readonly', 'readonly');
                $('#FechaInicioAtencion').datepicker('setStartDate', moment(moment(ConvertirFormatoFecha(Variables.FechaIngreso)).toDate()).toDate().format('dd/mm/yyyy'));
                $('#FechaInicioAtencion').datepicker('setEndDate', moment().toDate());
                $('#FechaInicioAtencion').datepicker("setDate", moment().toDate().format('dd/mm/yyyy'));

                $('#HoraInicioAtencion').val(moment().toDate().format('HH:MM'));

                EvaluacionHospitalizacion.nuevaEvaluacion = true;
                EvaluacionHospitalizacion.modificaEvaluacion = false;
                EvaluacionHospitalizacion.modificaCabecera = false;
                //EvaluacionHospitalizacion.idMedico = Utilitario.ObtenerIdMedicoSesion();

                swal({
                    title: 'Evaluaciones',
                    text: "Paciente iniciara la Evaluación N° " + (eval + 1),
                    type: 'info',
                    allowOutsideClick: false,
                }).done();

                $("#evaluaciones-tab").click();
            } else {
                swal({
                    title: 'Evaluaciones',
                    text: "Usted no tiene rol de médico para realizar una evaluación",
                    type: 'warning',
                    allowOutsideClick: false,
                }).done();
            }

            Cargando(0);
        });

        $('#ImprimirEvalEmerSF').on('click', async function () {

            var objrowTb = DtEvaluaciones.row('.selected').data();

            // let evaluacionDetalle = await EvaluacionHospitalizacion.ListarEvaluacionHospitalizacionDetalleByIdAtencion(objrowTb.IdNumero)

            let idCuentaAtencion = $('#txtNroCuenta').val()
            let idRegistro = $('#hdnIdAtencion').val()
            let idTipoServicio = 2
            let idEvaluacion = objrowTb.IdNumero
            let tipo = 'EVA-EMER'

            let documentoFirmado = await SeleccionarFirmasDigitales(idCuentaAtencion, idRegistro, idTipoServicio, idEvaluacion, tipo)

            if (documentoFirmado.length > 0) {
                VizualizarModalPdf(documentoFirmado[0].rutaArchivo);
            } else {
                $.ajax({
                    url: '/EvaluacionHospitalizacion/informes/generarPDF/' + $('#hdnIdAtencion').val() + '?eval=' + objrowTb.IdNumero,
                    method: 'GET',
                    success: function (response) {
                        if (response.pdf_url) {
                            VizualizarModalPdf(response.pdf_url);
                            // Coloca la URL del PDF en el src del iframe
                            //$('#frame-pdf').attr('src', response.pdf_url);

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
            }



            // var objrow = oTable_EvaEmer.api(true).row('.selected').data();

            // Cargando(1);
            // if (isEmpty(objrow)) {
            //     alerta(2, 'Seleccione una evaluación por favor.');
            // } else {
            //     const firma = await Utilitario.SeleccionarFirmaDigitalV2(objrow.code)
            //     if (isEmpty(firma)) {
            //         alerta('2', 'El documento no esta generado, se procedera a generar el documento.')
            //         const pdf = await Utilitario.GenerarHojaEvaluacionNeonatal(objrow.idCuentaAtencion, objrow.idEvaluacionDetalle, objrow.idAtencion, objrow.idServicio, objrow.idNumero);

            //         if (pdf) {
            //             alerta('1', 'Se generó el documento correctamente.')
            //             $("#btnBuscarAtenciones").click();
            //         } else {
            //             alerta('2', 'El documento no ha podido ser generado por falta de información. Por favor modifique y guarde la atención nuevamente.')
            //         }
            //     } else {
            //         AbrirVisorDocumento(firma.rutaArchivo, 0);
            //     }
            // }
            // Cargando(0);
        });

        $('#FirmarEvalEmerSF').on('click', async function () {

            var objrowTb = DtEvaluaciones.row('.selected').data();

            // let evaluacionDetalle = await EvaluacionHospitalizacion.ListarEvaluacionHospitalizacionDetalleByIdAtencion(objrowTb.IdNumero)

            $.ajax({
                url: '/EvaluacionHospitalizacion/informes/generarPDF/' + $('#hdnIdAtencion').val() + '?eval=' + objrowTb.IdNumero,
                method: 'GET',
                success: function (response) {
                    if (response.pdf_url) {

                        let idCuentaAtencion = $('#txtNroCuenta').val()
                        let idRegistro = $('#hdnIdAtencion').val()
                        let idTipoServicio = 2
                        let idEvaluacion = objrowTb.IdNumero
                        let tipo = 'EVA-EMER'
                        let rutaArchivo = window.location.origin + response.pdf_url

                        let param = idCuentaAtencion + '|' + idRegistro + '|' + idTipoServicio + '|' + idEvaluacion + '|' + tipo + '|' + rutaArchivo

                        sendParam(param)
                        // VizualizarModalPdf(response.pdf_url);
                        // // Coloca la URL del PDF en el src del iframe
                        // //$('#frame-pdf').attr('src', response.pdf_url);

                        // // Abre el modal
                        // //$('#pdfModal').modal('show');
                    } else {
                        console.error('Error al generar el PDF.');
                    }
                },
                error: function (error) {
                    console.error('Error en la solicitud AJAX:', error);
                }
            });

            // var objrow = oTable_EvaEmer.api(true).row('.selected').data();

            // Cargando(1);
            // if (isEmpty(objrow)) {
            //     alerta(2, 'Seleccione una evaluación por favor.');
            // } else {
            //     const firma = await Utilitario.SeleccionarFirmaDigitalV2(objrow.code)
            //     if (isEmpty(firma)) {
            //         alerta('2', 'El documento no esta generado, se procedera a generar el documento.')
            //         const pdf = await Utilitario.GenerarHojaEvaluacionNeonatal(objrow.idCuentaAtencion, objrow.idEvaluacionDetalle, objrow.idAtencion, objrow.idServicio, objrow.idNumero);

            //         if (pdf) {
            //             alerta('1', 'Se generó el documento correctamente.')
            //             $("#btnBuscarAtenciones").click();
            //         } else {
            //             alerta('2', 'El documento no ha podido ser generado por falta de información. Por favor modifique y guarde la atención nuevamente.')
            //         }
            //     } else {
            //         AbrirVisorDocumento(firma.rutaArchivo, 0);
            //     }
            // }
            // Cargando(0);
        });

        // Tables
        $('#tblEvaluacionesHospitalizacion tbody').on('click', 'tr', async function () {
            // EvaluacionHospitalizacion.LimpiarVistaModuloEvaluacionDetalle();
            // EvaluacionHospitalizacion.BloquearOpcionesModificacion();

            DtEvaluaciones.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');

            var objrowTb = DtEvaluaciones.row('.selected').data();
<<<<<<< HEAD
           
=======
            console.log('datosss de la tablaaa', objrowTb);
>>>>>>> c43206bf175774a3bfc1e1fc1e2cd58a60d1e406

            if (!isEmpty(objrowTb)) {
                EvaluacionHospitalizacion.CargarDatosEvaluacionDetalle(objrowTb);

                // if (EvaluacionDetalle.IdNumero > 0) {
                //     //await EvaluacionHospitalizacion.CargarDatosEvaluacionDetalle(Variables.IdAtencion, Variables.IdServicioEgreso, EvaluacionHospitalizacion.nroEvaluacion);                    
                //     await EvaluacionHospitalizacion.CargarDatosEvaluacionDetalle(EvaluacionDetalle.IdAtencion, EvaluacionDetalle.IdServicio, EvaluacionDetalle.IdNumero);
                // }
                $("#evaluaciones-tab").click();
            } else {
                alerta('info', '', 'No se ha seleccionado ninguna evaluación.')
                /*swal({
                    title: 'Evaluaciones',
                    text: "No se ha seleccionado ninguna evaluación.",
                    type: 'info',
                    allowOutsideClick: false,
                }).done();*/
            }
        });
        $("#b_descripciondia").autocomplete({
            source: "../ws/ce/buscar_cie10",
            minLength: 3,
            select: function (event, ui) {
                /*$("#b_IdDiagnostico").val(ui.item.id);
                $("#b_cie10").val(ui.item.CodigoCIE10);
                $("#b_descripciondia").val(ui.item.value);*/
                Diagnosticos.idDiagnostico = ui.item.id;
                Diagnosticos.codigo = ui.item.CodigoCIE10;
                Diagnosticos.diagnostico = ui.item.value;
                Diagnosticos.idTipoDiagnostico = $("#cboTipoDiagnostico").val();
                Diagnosticos.tipoDiagnostico = $("#cboTipoDiagnostico option:selected").text();
            }
        });

        

        $('#tblDiagnosticos tbody').on('click', '.btnEliminarDiagnostico', function () {
            DtDiagnosticos.row($(this).parents("tr")).remove().draw(false);
        });

        $("#cboTipoDiagnostico").on('change', function () {
            Diagnosticos.idTipoDiagnostico = $("#cboTipoDiagnostico").val();
            Diagnosticos.tipoDiagnostico = $("#cboTipoDiagnostico option:selected").text();
        });

        $("#cboTipoPaciente").on('change', function () {
            $("#motivo-tab").click();
            if ($("#cboTipoPaciente").val() == 2) {
                $("#examenObstetrico-tab").hide();
                $("#examenTactoVaginal-tab").hide();
            } else if ($("#cboTipoPaciente").val() == 1) {
                $("#examenObstetrico-tab").show();
                $("#examenTactoVaginal-tab").show();
            }
        });

        $('#chkOtrosSintomas').on('click', function () {
            if ($('#chkOtrosSintomas').is(":checked")) {
                $("#txtOtroSintomas").show();
            } else {
                $("#txtOtroSintomas").val("");
                $("#txtOtroSintomas").hide();
            }

            //console.log("Entro Card Opciones");
        });


        $("#txtFechaFUR").on('change', function () {
            //$('#txtFechaFPP').datepicker("setDate", Utilitario.DevuelveFechaPosibleParto($("#txtFechaFUR").val()));
            //$("#txtFechaFPP").val(Utilitario.DevuelveFechaPosibleParto($("#txtFechaFUR").val()));
            //$("#txtEGsemanas").val(Utilitario.DevuelveEdadGestacional($("#txtFechaFUR").val()));
            //$("#txtEGdias").val(Utilitario.DevuelveDiasEdadGestacional($("#txtFechaFUR").val()));
        });

        $("#chkConFUR").on('click', function () {
            if ($('#chkConFUR').is(":checked")) {
                $("#txtFechaFUR").attr("disabled", true);
                $("#txtFechaFUR").val('');
            } else {
                $("#txtFechaFUR").attr("disabled", false);
            }

            $("#txtFechaFPP").val('');
            $("#txtEGsemanas").val('');
            $("#txtEGsemanas").val('');
        });

        $("#chkConFUE").on('click', function () {
            if ($('#chkConFUE').is(":checked")) {
                $("#txtFechaFUE").attr("disabled", true);
                $("#txtFechaFUE").val('');
            } else {
                $("#txtFechaFUE").attr("disabled", false);
            }

            $("#txtFechaFPP").val('');
            $("#txtEGsemanas").val('');
            $("#txtEGsemanas").val('');
        });

        $("#txtFechaECO").on("change", function () {
            var edadGestacional = null;
            if ($("#txtFechaECO").val() != '' && esFormatoFecha($("#txtFechaECO").val()) && $("#txtSemEco").val() != '' && $("#txtDiasEco").val() != '') {
                edadGestacional = Utilitario.CalcularEdadGestacional(Variables.FechaIngreso, $("#txtFechaECO").val(), $("#txtSemEco").val(), $("#txtDiasEco").val());
                $("#txtEGsemanas").val(edadGestacional.cantSemanas);
                $("#txtEGdias").val(edadGestacional.cantDias);
            }
        });

        $("#txtSemEco").on("change", function () {
            if ($("#txtFechaECO").val() != '' && esFormatoFecha($("#txtFechaECO").val()) && $("#txtSemEco").val() != '' && $("#txtDiasEco").val() != '') {
                edadGestacional = Utilitario.CalcularEdadGestacional(Variables.FechaIngreso, $("#txtFechaECO").val(), $("#txtSemEco").val(), $("#txtDiasEco").val());
                $("#txtEGsemanas").val(edadGestacional.cantSemanas);
                $("#txtEGdias").val(edadGestacional.cantDias);
            }
        });

        $("#txtDiasEco").on("change", function () {
            if ($("#txtFechaECO").val() != '' && esFormatoFecha($("#txtFechaECO").val()) && $("#txtSemEco").val() != '' && $("#txtDiasEco").val() != '') {
                edadGestacional = Utilitario.CalcularEdadGestacional(Variables.FechaIngreso, $("#txtFechaECO").val(), $("#txtSemEco").val(), $("#txtDiasEco").val());
                $("#txtEGsemanas").val(edadGestacional.cantSemanas);
                $("#txtEGdias").val(edadGestacional.cantDias);
            }
        });

        $(".rdbTactoVaginal").on('click', function () {
            if ($('input:radio[name=rdbTactoVaginal]:checked').val() == 1) {
                EvaluacionHospitalizacion.BloqueoDiferido(1);
            } else if ($('input:radio[name=rdbTactoVaginal]:checked').val() == 0) {
                EvaluacionHospitalizacion.BloqueoDiferido(0);
            }
        });

        $(".rdbMembranaRota").on('click', function () {
            if ($('input:radio[name=rdbMembranaRota]:checked').val() == 1) {
                EvaluacionHospitalizacion.ValidaMembranaRotas(1);
            } else if ($('input:radio[name=rdbMembranaRota]:checked').val() == 0) {
                EvaluacionHospitalizacion.ValidaMembranaRotas(0);
            }
        });

        $("#cboTipoEmbrazo").on('change', function () {

            /*$("#CardFetoUnico input[type=text]").val("");
            $("#CardFetoUnico input[type=radio]").prop('checked', false);
            $("#CardFetoUnico input[type=text]").attr("disabled", true);
            $("#CardFetoUnico input[type=radio]").attr("disabled", true);
        
            $("#CardFetoMultiple input[type=text]").val("");
            $("#CardFetoMultiple input[type=text]").attr("disabled", true);
            */
            $('input:radio[name=rdbSituacion][value=5]').attr('checked', true);
            $('input:radio[name=rdbSituacion2][value=5]').attr('checked', true);
            $('input:radio[name=rdbSituacion3][value=5]').attr('checked', true);

            $('input:radio[name=rdbPosicion][value=5]').attr('checked', true);
            $('input:radio[name=rdbPosicion2][value=5]').attr('checked', true);
            $('input:radio[name=rdbPosicion3][value=5]').attr('checked', true);

            $('input:radio[name=rdbPresentacion][value=5]').attr('checked', true);
            $('input:radio[name=rdbPresentacion2][value=5]').attr('checked', true);
            $('input:radio[name=rdbPresentacion3][value=5]').attr('checked', true);

            $("#CardFetoUnico input[type=text]").attr("disabled", false);

            $("#CardFetoMultiple input[type=text]").attr("disabled", false);

            $("#nav-tab-TipoEmbarazo").show();
            $("#nav-feto01-tab").show();
            $("#nav-feto02-tab").show();
            $("#nav-feto03-tab").show();

            $("#tab-tabContent-TipoEmbarazo").show();
            $('#nav-tab-TipoEmbarazo a[href="#nav-feto01"]').tab('show');
            if ($("#cboTipoEmbrazo").val() == 1) {
                $("#nav-feto02-tab").hide();
                $("#nav-feto03-tab").hide();

                $("#MovimientosFetales").show();
                //$("#CardFetoUnico").show();
                //$("#CardFetoMultiple").hide();
            }
            else {
                if ($("#cboTipoEmbrazo").val() == 2) {
                    $("#MovimientosFetales").hide();
                    //$("#CardFetoMultiple").show();
                    //$("#CardFetoUnico").hide();
                } else {
                    $("#nav-tab-TipoEmbarazo").hide();
                    $("#tab-tabContent-TipoEmbarazo").hide();
                    //$("#nav-feto01-tab").hide();
                    //$("#nav-feto02-tab").hide();
                    //$("#nav-feto03-tab").hide();

                    //$("#CardFetoUnico").hide();
                    //$("#CardFetoMultiple").hide();
                }
            }
        });

        $('.OpcionEvalEmer').on('click', function () {
            EvaluacionHospitalizacion.nuevaEvaluacion = false;
            EvaluacionHospitalizacion.modificaEvaluacion = false;
            EvaluacionHospitalizacion.modificaCabecera = false;

            $("#FirmarEvalEmer").show();
            $("#ImprimirEvalEmerCF").show();
            $("#ImprimirEvalEmerSF").show();

            $("#CardEva").removeClass("bg-blue");
            $('#tblEvaluacionesHospitalizacion tbody').find('tr').removeClass("selected");

            $("#btnGuardarEva").hide();

            //$("#FirmarEvalEmer").attr("href", "");  (COMNETADO POR KHOYOSI - FIRMA ANTERIOR)

            ///////////COMENTADO POR KHOYOSI////////////////
            /*if (AdmisionEmergencia.accion == 'M') {
                if (EvaluacionHospitalizacion.idMedicoPrimeraEvaluacion > 0) {
                    if (EvaluacionHospitalizacion.idMedicoPrimeraEvaluacion == Utilitario.ObtenerIdMedicoSesion()) {
                        EvaluacionHospitalizacion.modificaCabecera = true;
                        EvaluacionHospitalizacion.DesbloquearCabecera();
                        $("#btnGuardarEva").show();
                    } else {
                        EvaluacionHospitalizacion.modificaCabecera = false;
                        EvaluacionHospitalizacion.BloquearCabecera();
                        $("#btnGuardarEva").hide();
                    }
                } else {
                    $("#btnGuardarEva").hide();
                }
            } else {
                if (AdmisionEmergencia.accion == 'C') {
                    $("#btnGuardarEva").hide();
                }
            }*/
            ///////////COMENTADO POR KHOYOSI////////////////
            //$("#btnGuardarEva").hide();

            //console.log("Entro Card Opciones");

            $('.chzn-select').chosen().trigger("chosen:updated");
        });

        /////////////////////////AGREGAR NUEVO EVALUACION////////////////////////////////////


        $('.nav-tabs a').on('shown.bs.tab', function (event) {
            DtDiagnosticos.columns.adjust().draw();
            //console.log("entroooo");
        });

        ////////////////////////////FIRMA DIGITAL///////////////////////////////////////

        $('#FirmarEvalEmer').on('click', async function () {
            var objrowTb = oTable_EvaEmer.api(true).row('.selected').data();

            if (isEmpty(objrowTb)) {
                alerta(2, 'Seleccione una evaluación por favor.')
                return false
            }

            Cargando(1);
            Utilitario.TipoArchivoFirmar = 'EMER-EVA-DET';
            const paquete = await Utilitario.CrearPaqueteArchivos(Variables.IdCuentaAtencion, EvaluacionNeonatal.nroEvaluacion, Variables.IdServicioIngreso);
            if (!isEmpty(paquete)) {
                //console.log(paquete.data);                
                await Utilitario.AbrirServicioFirmaBit4IdMultiple(paquete.data)
            }
            Cargando(0);
        });

        $('#ImprimirEvalEmerCF').on('click', async function () {
            var objrowTb = oTable_EvaEmer.api(true).row('.selected').data();
            Cargando(1);
            if (isEmpty(objrowTb)) {
                alerta(2, 'Seleccione una evaluación por favor.');
            } else {
                await Utilitario.AbrirDocumentoFirmadoBit4Id(objrowTb.code);
            }
            Cargando(0);
        });
        ///////////////////////////////////////////////////////////////////////////////////////


        /////////////////////////////////EVENTOS VISOR RECETAS////////////////////////////////////////////////////
        $('#btnVisorRecetasEmer').on('click', async function () {
            var row = oTable_EvaEmer.api(true).row('.selected').data();
            //console.log(row);
            if (typeof row === 'undefined') {
                alerta(2, "Seleccione una evaluación por favor.");
            } else {
                //const recetas = await Ordenes.SeleccionarRecetasCabeceraPorNroEvaluacion(Variables.IdCuentaAtencion, Variables.IdTipoFinanciamiento, EvaluacionHospitalizacion.nroEvaluacion, Variables.IdServicioIngreso, Variables.IdMedico);
                const recetas = await Ordenes.SeleccionarRecetasCabeceraPorNroEvaluacion(Variables.IdCuentaAtencion, Variables.IdTipoFinanciamiento, EvaluacionDetalle.IdNumero, EvaluacionDetalle.IdServicio, EvaluacionDetalle.IdMedico);
                VisorReceta.AbrirVisorRecetas(recetas);
            }
        });
        //////////////////////////////////////////////////////////////////////////////////////////////////////////


        $("#cboTipoEmbrazo").change();


        // $("#btnAltaMedica1").on('click', async function () {
        //     // var evals = DtEvaluaciones.data().count();
        //     // var dxs = DtDiagnosticos.data().count();
        //     // console.log('evals',evals);
        //     // console.log('dxs',dxs);
        //    /*
        //     if (evals == 0 && EvaluacionHospitalizacion.nuevaEvaluacion == false) {
        //         // alerta('info', '', 'No se ha registrado ninguna evaluación. Por favor registre una evaluación.');
        //         // return;
        //         $('#modalAltaMedica').modal('show');
        //     } else   {
        //         $('#modalAltaMedica').modal('show');
        //     }
        //         */
        //     $('#modalAltaMedica').modal('show');



        // });
        $("#btnAltaMedicaRev").on('click', async function () {
            $('#modalRevertirAlta').modal('show');
        });

        $("#btnCerrarAltaMedica").on('click', async function () {
            $('#modalAltaMedica').modal('hide');
        });

        $("#btnCerrarAltaMedicaRev").on('click', async function () {
            $('#modalRevertirAlta').modal('hide');
        });

        $('#btnCerrarPaquete').on('click', function () {
            $('#modalPaquete').modal('hide');

        })

        // Paquetescambio a prod
        $('#btnMuestraPaqueteFarmacia').on('click', async function () {

            $('#modalLabelsuccess').text('SETS');
            $('#cboPaquetes').text('SETS');
            $('#modalPaquete').modal('show');
            await EvaluacionHospitalizacion.listaCabPaquetes(5);



        })

        $('#btnMuestraPaqueteRayos').on('click', async function () {


            await EvaluacionHospitalizacion.listaCabPaquetes(5);
            $('#modalPaquete').modal('show');


        })
        $('#btnMuestraPaqueteLaboratorio1').on('click', async function () {


            await EvaluacionHospitalizacion.listaCabPaquetes(2);
            $('#modalPaquete').modal('show');


        })
        $('#btnMuestraPaqueteLaboratorio2').on('click', async function () {


            await EvaluacionHospitalizacion.listaCabPaquetes(2);
            $('#modalPaquete').modal('show');


        })
        $('#btnMuestraPaqueteBancoSangre').on('click', async function () {


            await EvaluacionHospitalizacion.listaCabPaquetes(5);
            $('#modalPaquete').modal('show');


        })
        $('#btnMuestraPaqueteAnaPatologica').on('click', async function () {


            await EvaluacionHospitalizacion.listaCabPaquetes(5);
            $('#modalPaquete').modal('show');


        })
        $('#btnMuestraPaqueteRayosEcoObstetrica').on('click', async function () {


            await EvaluacionHospitalizacion.listaCabPaquetes(5);
            $('#modalPaquete').modal('show');


        })
        $('#btnMuestraPaqueteEcoGeneral').on('click', async function () {


            await EvaluacionHospitalizacion.listaCabPaquetes(5);
            $('#modalPaquete').modal('show');


        })
        $('#btnMuestraPaqueteTomografia').on('click', async function () {


            await EvaluacionHospitalizacion.listaCabPaquetes(5);
            $('#modalPaquete').modal('show');


        })

        //Examenes
        //Emergencia
        $('#btnMostrarExamenPatoClinica').on('click', async function () {
            await EvaluacionHospitalizacion.listaExameneLabEmergencia(1);
            $('#modalExamenes').modal('show');
            // $('#modalExamenes2').modal('show');


        })
        $('#btnCerrarExamenes').on('click', async function () {

            $('#modalExamenes').modal('hide');

        })
        //central
        $('#btnMostrarExamenCentral').on('click', async function () {
            await EvaluacionHospitalizacion.listaExameneLabCentral(0);
            $('#modalExamenesCentral').modal('show');
            // $('#modalExamenes2').modal('show');


        })
        $('#btnCerrarExamenesCentral').on('click', async function () {

            $('#modalExamenesCentral').modal('hide');

        })
        //EcoGeneral

        $('#btnMostrarExamenEcoGeneral').on('click', async function () {
            await EvaluacionHospitalizacion.listaExamenObstetricia(0);
            $('#modalExamenEcoGeneral').modal('show');
            // $('#modalExamenes2').modal('show');


        })
        $('#btnCerrarExamenesEcoGeneral').on('click', async function () {

            $('#modalExamenEcoGeneral').modal('hide');

        })

        //Rx
        $('#btnMostrarExamenRayos').on('click', async function () {

            await EvaluacionHospitalizacion.listaExamenRayosX(0);
            $('#modalExamenRayosX').modal('show');
            // $('#modalExamenes2').modal('show');


        })
        $('#btnCerrarExamenesRayosX').on('click', async function () {
            $('#modalExamenRayosX').modal('hide');

        })


    },

    /////////////////////////////////////////////////////////DATATBLE///////////////////////////////////////////////////////////////
    DataTableDiagnosticos() {
        DtDiagnosticos = $('#tblDiagnosticos').DataTable({
            scrollY: "200px",
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
                {
                    width: "10%",
                    targets: 3,
                    data: null,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                        $(td).html("<button  id='btnEliminarDiagnostico' class='btn btn-danger btnEliminarDiagnostico'>ELIMINAR</button>")
                    }
                }
            ]
        });
    },

    DataTableEvaluaciones() {
        //DtEvaluaciones = new DataTable('#tblDiagnosticos');
        DtEvaluaciones = $('#tblEvaluacionesHospitalizacion').DataTable({
            scrollY: "145px",
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
                    width: "15%",
                    targets: 0,
                    data: "IdNumero",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                        $(td).parent().attr('data-eval', rowData.IdNumero)
                    }
                },
                {
                    width: "85%",
                    targets: 1,
                    data: "Medico",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')

                    }
                }
            ]
        });
    },

    DatablesCuenta() {
        var parms = {
            scrollY: '550px',
            order: [[0, "desc"]],
            "scrollCollapse": true,
            data: null,
            destroy: true,
            info: false,
            bFilter: false,
            paging: false,
            responsive: true,
            buttons: ['copy', 'csv', 'print'],
            columns: [
                {
                    visible: false,
                    data: "IdCuentaAtencion",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                {
                    data: null,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                        $(td).html("<b>Cuenta: " + rowData.IdCuentaAtencion + "</b><br> Fecha Ing.: " + rowData.fechaIngreso2 + "<br> Servicio: " + rowData.Servicio + "<br><b> Tipo Ser.: " + rowData.TipoServicio + "</b>")

                        if (!isEmpty(rowData.fechaEgreso)) {
                            $(td).parent().css('color', '#347dff');
                            $(td).parent().css('font-weight', 'bold');
                        }

                        if (rowData.estadoCuenta == 0) {
                            $(td).parent().css('color', 'red');
                            $(td).parent().css('font-weight', 'bold');
                        }

                    }
                }


            ]

        }

        var tableWrapper = $('#tblCuentas'); // datatable creates the table wrapper by adding with id {your_table_id}_wrapper
        //tableWrapper.find('.dataTables_length select').select2(); // initialize select2 dropdown
        oTable_cuentas = $("#tblCuentas").dataTable(parms);

    },

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    AgregarDiagnostico() {
        if (EvaluacionHospitalizacion.ExisteDiagnosticos()) {
            Swal.fire({
                icon: 'info',
                title: 'El diagnostico ya fue agregado.',
                showConfirmButton: false,
                timer: 1500,
            }).then((result) => {

            });
        } else {
            if (Diagnosticos.idDiagnostico > 0) {
                EvaluacionHospitalizacion.cont_dx++;
                console.log('Diagnosticos',Diagnosticos)
                DtDiagnosticos.row.add(Diagnosticos).draw(false);

                Diagnosticos = {
                    idDiagnostico: 0,
                    codigo: '',
                    diagnostico: '',
                    idTipoDiagnostico: 0,
                    tipoDiagnostico: '',
                    nroEvaluacion: 0,
                    idServicio: 0
                }

                $("#b_descripciondia").val("");
            } else {
                Swal.fire({
                    icon: 'info',
                    title: 'Seleccione un diagnóstico.',
                    showConfirmButton: false,
                    timer: 1500,
                }).then((result) => {

                });
            }
        }
        /*
        div_dx.classList.remove("d-none");
        if ($("#b_IdDiagnostico").val() === null || $("#b_IdDiagnostico").val().length == 0 || $("#b_idtipodiagnostico")
            .val().length == 0)
            alert("Ingrese datos correctos de diagnostico");
        else {
            $("#div_dx").after('<div class="form-group row px-3"> \
                                        <div class="col-lg-2"><input type="hidden" name="l_IdDiagnostico[]" value="' + $("#b_IdDiagnostico")
            .val() +
                '"/><input type="text" name="l_cie10[]" value="' + $("#b_cie10").val().trim() + '" class="form-control" disabled /></div> \
                                        <div class="col-lg-6"><input type="text" name="l_descripciondia[]" value="' + $("#b_descripciondia").val()
                .trim() + '" class="form-control" disabled /></div> \
                                        <div class="col-lg-2"><input type="hidden" name="l_idtipodiagnostico[]" value="' + $(
                    "#b_idtipodiagnostico")
                .val().trim() + '"/><input type="text" name="l_tipodiagnostico[]" value="' + $(
                    "#b_idtipodiagnostico option:selected").html() + '" class="form-control" disabled /></div> \
                                        <div class="col-lg-2"><input type="button" value="Eliminar" class="elimina_d form-control btn btn-danger"/></div>\
                                    </div>');
            $("#b_IdDiagnostico").val("");
            $("#b_cie10").val("");
            $("#b_descripciondia").val("");
            $("#b_iddiagnostico").val("");
        }*/
    },

    ExisteDiagnosticos() {
        lstDiagnosticos = DtDiagnosticos.rows().data();
        for (var i = 0; i < lstDiagnosticos.length; i++) {
            if (lstDiagnosticos[i].idDiagnostico == Diagnosticos.idDiagnostico) {
                return true;
            }
        }

        return false;
    },

    ObtenerDiagnosticos() {
        lstDiagnosticos = DtDiagnosticos.rows().data();
        diagnosticos = '';
        for (var i = 0; i < lstDiagnosticos.length; i++) {
            diagnosticos = diagnosticos + $('#hdnIdAtencion').val() + '@';                //IdAtencion
            diagnosticos = diagnosticos + 1 + '@';                                        //IdClasificacionDx
            diagnosticos = diagnosticos + lstDiagnosticos[i].idDiagnostico + '@';         //IdDiagnostico
            diagnosticos = diagnosticos + lstDiagnosticos[i].idTipoDiagnostico + '@';         //IdSubclasificacionDx
            diagnosticos = diagnosticos + 0 + '@';                                        //LabCOnfHIS
            diagnosticos = diagnosticos + 0 + '@';                                        //GrupoHIS
            diagnosticos = diagnosticos + 0 + '@';                                        //SUbGrupoHIS
            diagnosticos = diagnosticos + $('#hdnIdServicio').val() + '@';               //IdServicio
            diagnosticos = diagnosticos + EvaluacionHospitalizacion.IdNumero + '@';            //IdEvaluacion
            diagnosticos = diagnosticos + '|';
        }

        /*var lstDiagnostico = DtDiagnosticos.rows().data();
        lstDiagnostico = lstDiagnostico.toArray();*/

        return diagnosticos;
    },

    LimpiarVistaModuloEvaluacionDetalle() {
        $("#evaluaciones input[type=text]").val("");
        $("#evaluaciones textarea").val("");
        $("#evaluaciones input[type=checkbox]").prop('checked', false);

        //$("#evaluaciones input[type=date]").val("");
        //$("#evaluaciones #examenFisico input[type=radio].default").prop('checked', true);
        //$("#evaluaciones #antecedentesGenerales input[type=radio]").prop('checked', false);
        //$("#evaluaciones #antecedentesGenerales .chzn-select").val("");

        $("#lblNumeroEvaluacion").html("");
        $("#lblTipoEvaluacion").html("");

        $("#BadgeEvaluacion .msc-hotline").removeClass("bg-green");
        $("#BadgeEvaluacion .msc-hotline-icon").removeClass("bg-success");

        $("#BadgeEvaluacion .msc-hotline").removeClass("bg-blue");
        $("#BadgeEvaluacion .msc-hotline-icon").removeClass("bg-info");

        //Ordenes.ubicaFarmacia(8);
        //Ordenes.limpiarCatalogoV2();
        //Diagnosticos.LimpiarDiagnosticosAtencion();
        DtDiagnosticos.clear().draw();

        //oTable_EvaEmer.$('tr.selected').removeClass('selected');    
    },

}

$(document).ready(function () {

    Triaje.IniciarScript();
    EvaluacionHospitalizacion.Eventos();
    EvaluacionHospitalizacion.IniciarPlugins();

    EvaluacionHospitalizacion.DataTableDiagnosticos();
    EvaluacionHospitalizacion.DataTableEvaluaciones();
    EvaluacionHospitalizacion.DatablesCuenta();

    Seguimiento.DatablesDiagnosticosSeguimiento();
    Seguimiento.DataTablesEvaluacionSeguimiento();
    Seguimiento.DatablesDiagnosticosEvalSeguimiento();
    Seguimiento.DataTablesOrdenesMedicas();

    Seguimiento.DataTableslaboratorioMovimientos();
    Seguimiento.DataTablesImagenesMovimientos();

    Seguimiento.DataTablesOrdenesMedicasGenerales();
    Seguimiento.DataTableslaboratorioMovimientosGenerales();
    Seguimiento.DataTablesImagenesMovimientosGenerales();

    Seguimiento.Events();

    OrdenMedica.IniciarScript();
    OrdenMedica.accion = "M";
    ConsumoServicio.IniciarScript();
    Resultados.IniciarScript();

    Transferencias.tipoServicio = 'EMER';
    // Transferencias.tipoServicio = 'HOSP';
    Transferencias.cargaInicial();
    // VisorDocumento.Eventos();
    //AltaMedica.IniciarScript();
});