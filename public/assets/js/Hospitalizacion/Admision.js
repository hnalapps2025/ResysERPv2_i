

var AdmisionHOSP = {
    ValidarAgregar: 0,
    Forzar: 0,

    Plugins() {
        // $("#txtFechaIngresoBusq").datepicker({
        //     todayHighlight: true,
        //     autoclose: true,
        //     dateFormat: "dd/mm/yy",
        //     orientation: "bottom",
        // });
        // $("#FechaNacimiento").datepicker({
        //     todayHighlight: true,
        //     autoclose: true,
        //     dateFormat: "dd/mm/yy",
        //     orientation: "bottom",
        // });
    },

    InitialCharge() {
        // $("#btnLimpiar").trigger("click");

        // let fecha = new Date();
        // let dia = fecha.getDate();
        // let mes = parseInt(fecha.getMonth()) + 1;
        // let yyy = fecha.getFullYear();
        // if (dia < 10) dia = "0" + dia; //agrega cero si el menor de 10
        // if (mes < 10) mes = "0" + mes;
        // let fechaP = dia + "/" + mes + "/" + yyy;

        // $("#txtFechaIngresoBusq").datepicker("setDate", fechaP);

        // $("#btnBuscar").trigger("click");
        // Admision.toggleRequiredNroDocumento();
    },

    buscapaciente(numero) {
        // jQuery.ajax({
        //     url: "../ws/emergencia/buscar_paciente",
        //     async: false,
        //     dataType: "json",
        //     data: {
        //         NroDocumento: numero,
        //         IdDocIdentidad: $("#IdDocIdentidad").val(),
        //     },
        //     method: "get",
        //     success: function (response) {
        //         console.log(response);
        //         if (response.resultado == 1) {
        //             $("#NroAfiliacionTemp").val("");
        //             $("#IdPaciente").val(response.datos["IdPaciente"]);
        //             $("#paciente_nuevo").val(response.datos["paciente_nuevo"]);
        //             $("#ApellidoPaterno").val(
        //                 response.datos["ApellidoPaterno"]
        //             );
        //             $("#ApellidoMaterno").val(
        //                 response.datos["ApellidoMaterno"]
        //             );
        //             $("#Nombres").val(response.datos["PrimerNombre"]);
        //             $("#FechaNacimiento").val(
        //                 new Date(
        //                     response.datos["FechaNacimiento"] + "T00:00:00"
        //                 ).toLocaleDateString("en-GB")
        //             );
        //             $("#IdTipoSexo").val(response.datos["IdTipoSexo"]);
        //             $("#IdDistritoNacimiento").val(
        //                 response.datos["IdDistritoNacimiento"]
        //             );
        //             $("#IdPaisNacimiento")
        //                 .val(response.datos["IdNacionalidad"])
        //                 .trigger("chosen:updated");
        //             $("#IdEstadoCivil")
        //                 .val(response.datos["IdEstadoCivil"])
        //                 .trigger("chosen:updated");
        //             $("#IdGradoInstruccion")
        //                 .val(response.datos["IdGradoInstruccion"])
        //                 .trigger("chosen:updated");
        //             $("#IdTipoOcupacion")
        //                 .val(response.datos["IdTipoOcupacion"])
        //                 .trigger("chosen:updated");
        //             $("#IdReligion")
        //                 .val(response.datos["IdReligion"])
        //                 .trigger("chosen:updated");
        //             $("#Telefono").val(response.datos["Telefono"]);
        //             $("#DireccionDomicilio").val(
        //                 response.datos["DireccionDomicilio"]
        //             );
        //             $("#IdDistritoDomicilio")
        //                 .val(parseInt(response.datos["UbigeoReniecDomicilio"]))
        //                 .trigger("chosen:updated");
        //             $("#UsoWebReniec").val(response.datos["UsoWebReniec"]);
        //             if (response.tiene_sis == 1) {
        //                 $("#tiene_sis").text("Si tiene SIS");
        //                 $("#IdSiaSis").val(response.data_sis.IdNumReg);
        //                 $("#SisCodigo").val(response.data_sis.Tabla);
        //                 buscaFuenteFinanciamiento(2);
        //             } else {
        //                 $("#tiene_sis").text("No tiene SIS");
        //                 $("#IdSiaSis").val("");
        //                 $("#SisCodigo").val("");
        //                 buscaFuenteFinanciamiento();
        //             }
        //         } else {
        //             alert(response.mensaje);
        //             $("#NroAfiliacionTemp").val("");
        //             if ($("#IdDocIdentidad").val() == "1")
        //                 $("#NroDocumento").val("");
        //             $("#IdPaciente").val("");
        //             $("#paciente_nuevo").val("");
        //             $("#ApellidoPaterno").val("");
        //             $("#ApellidoMaterno").val("");
        //             $("#Nombres").val("");
        //             $("#FechaNacimiento").val("");
        //             $("#IdTipoSexo").val(1);
        //             $("#IdSiaSis").val("");
        //             $("#SisCodigo").val("");
        //             $("#IdDistritoNacimiento").val("");
        //             $("#DireccionDomicilio").val("");
        //             $("#UsoWebReniec").val("");
        //         }
        //     },
        // });
    },

    buscapaciente_por_sistemporal(numero) {
        // jQuery.ajax({
        //     url: "../ws/emergencia/buscar_paciente_por_sistemporal",
        //     async: false,
        //     dataType: "json",
        //     data: {
        //         tipoFormato : "E",
        //         nroContrato : numero
        //     },
        //     method: "get",
        //     success: function (response) {
        //         console.log('Información recopilada');
        //         console.log(response);
        //         if (response.resultado == 1) {
                   
        //             //Paciente encontrado en la BD
        //             if (response.datos["paciente_nuevo"] == '2') {
        //                 // Formatear la fecha de data_sis (yyyymmdd -> dd/mm/yyyy)
        //                 const fecNacimientoSIS = response.data_sis["FecNacimiento"] 
        //                     ? `${response.data_sis["FecNacimiento"].slice(6, 8)}/${response.data_sis["FecNacimiento"].slice(4, 6)}/${response.data_sis["FecNacimiento"].slice(0, 4)}`
        //                     : null;
                        
        //                 // Formatear la fecha de datos (yyyy-mm-dd -> dd/mm/yyyy)
        //                 const fecNacimientoDatos = response.datos["FechaNacimiento"]
        //                     ? response.datos["FechaNacimiento"].split('-').reverse().join('/')
        //                     : null;
                        
        //                 // Ajustar el valor de Género en SIS
        //                 const generoSIS = response.data_sis["Genero"] === "0" ? "2" : response.data_sis["Genero"];
                        
        //                 // Extraer datos
        //                 const nombresSIS = response.data_sis["Nombres"];
        //                 const apePaternoSIS = response.data_sis["ApePaterno"];
        //                 const apeMaternoSIS = response.data_sis["ApeMaterno"];
                        
        //                 const nombresDatos = response.datos["PrimerNombre"];
        //                 const apePaternoDatos = response.datos["ApellidoPaterno"];
        //                 const apeMaternoDatos = response.datos["ApellidoMaterno"];
        //                 const generoDatos = response.datos["IdTipoSexo"];
                        
        //                 // Comparar datos
        //                 const coincide = nombresSIS === nombresDatos &&
        //                     apePaternoSIS === apePaternoDatos &&
        //                     apeMaternoSIS === apeMaternoDatos &&
        //                     generoSIS === generoDatos &&
        //                     fecNacimientoSIS === fecNacimientoDatos;
                        
        //                 if (coincide) {
        //                     // Mostrar solo opción para continuar
        //                     Swal.fire({
        //                         title: 'Paciente encontrado con este número de Filiación Temporal',
        //                         text: 'Los datos coinciden, puedes continuar.',
        //                         icon: 'info',
        //                         confirmButtonText: 'Continuar'
        //                     });
        //                     return;
        //                 }
                        
        //                 // Mostrar Swal si hay diferencias
        //                 Swal.fire({
        //                     title: 'Se encontró un paciente asociado a este número de Filiación Temporal',
        //                     html: `
        //                         <div class="text-left">
        //                             <table class="table table-sm table-bordered mb-3" style="font-size: 0.85rem;">
        //                                 <thead class="table-light">
        //                                     <tr>
        //                                         <th class="text-left">Campo</th>
        //                                         <th class="text-center"><i class="fa fa-database text-primary"></i> Paciente</th>
        //                                         <th class="text-center"><i class="fa fa-cloud text-primary"></i> SIS</th>
        //                                     </tr>
        //                                 </thead>
        //                                 <tbody>
        //                                     <tr>
        //                                         <td class="text-left"><i class="fa fa-user text-secondary"></i> Nombres</td>
        //                                         <td class="${nombresDatos === nombresSIS ? 'text-success' : 'text-danger'}">${nombresDatos}</td>
        //                                         <td class="${nombresDatos === nombresSIS ? 'text-success' : 'text-danger'}">${nombresSIS}</td>
        //                                     </tr>
        //                                     <tr>
        //                                         <td class="text-left"><i class="fa fa-user text-secondary"></i> A. Paterno</td>
        //                                         <td class="${apePaternoDatos === apePaternoSIS ? 'text-success' : 'text-danger'}">${apePaternoDatos}</td>
        //                                         <td class="${apePaternoDatos === apePaternoSIS ? 'text-success' : 'text-danger'}">${apePaternoSIS}</td>
        //                                     </tr>
        //                                     <tr>
        //                                         <td class="text-left"><i class="fa fa-user text-secondary"></i> A. Materno</td>
        //                                         <td class="${apeMaternoDatos === apeMaternoSIS ? 'text-success' : 'text-danger'}">${apeMaternoDatos}</td>
        //                                         <td class="${apeMaternoDatos === apeMaternoSIS ? 'text-success' : 'text-danger'}">${apeMaternoSIS}</td>
        //                                     </tr>
        //                                     <tr>
        //                                         <td class="text-left"><i class="fa fa-venus-mars text-secondary"></i> Género</td>
        //                                         <td class="${generoDatos === generoSIS ? 'text-success' : 'text-danger'}">${generoDatos === "2" ? "Femenino" : "Masculino"}</td>
        //                                         <td class="${generoDatos === generoSIS ? 'text-success' : 'text-danger'}">${generoSIS === "2" ? "Femenino" : "Masculino"}</td>
        //                                     </tr>
        //                                     <tr>
        //                                         <td class="text-left"><i class="fa fa-calendar text-secondary"></i> F. Nac.</td>
        //                                         <td class="${fecNacimientoDatos === fecNacimientoSIS ? 'text-success' : 'text-danger'}">${fecNacimientoDatos}</td>
        //                                         <td class="${fecNacimientoDatos === fecNacimientoSIS ? 'text-success' : 'text-danger'}">${fecNacimientoSIS}</td>
        //                                     </tr>
        //                                 </tbody>
        //                             </table>
        //                             <p class="text-center text-muted" style="font-size: 1.2rem;">¿Deseas confirmar como paciente nuevo o actualizar los datos?</p>
        //                         </div>
        //                     `,
        //                     showDenyButton: true,
        //                     showCancelButton: true,
        //                     confirmButtonText: '<i class="fa fa-user-plus"></i> Confirmar como Paciente Nuevo',
        //                     denyButtonText: '<i class="fa fa-sync"></i> Actualizar Datos',
        //                     cancelButtonText: '<i class="fa fa-times"></i> Cancelar',
        //                     customClass: {
        //                         denyButton: 'swal2-deny swal2-styled swal2-warning',
        //                     },
        //                     icon: 'warning',
        //                 });
        //             }
                    



        //             // IdDocIdentidad
        //             if (!response.datos["IdDocIdentidad"] || response.datos["IdDocIdentidad"].trim() === "") {
        //                 $("#IdDocIdentidad").val("11");
        //                 $("#NroDocumento").val("");
        //             } else {
        //                 $("#IdDocIdentidad").val(response.datos["IdDocIdentidad"]);
        //                 $("#NroDocumento").val(response.datos["NroDocumento"]);
        //             }

        //             $("#IdPaciente").val(response.datos["IdPaciente"]); 
        //             $("#paciente_nuevo").val(response.datos["paciente_nuevo"]); 
        //             $("#ApellidoPaterno").val(
        //                 response.datos["ApellidoPaterno"] // SIS
        //             );
        //             $("#ApellidoMaterno").val(
        //                 response.datos["ApellidoMaterno"] // SIS
        //             );
        //             $("#Nombres").val(response.datos["PrimerNombre"]); // SIS
        //             $("#FechaNacimiento").val( // SIS
        //                 new Date(
        //                     response.datos["FechaNacimiento"] + "T00:00:00"
        //                 ).toLocaleDateString("en-GB")
        //             );
        //             $("#IdTipoSexo").val(response.datos["IdTipoSexo"]); // SIS
        //             $("#IdDistritoNacimiento").val(""); // $("#IdDistritoNacimiento").val( response.datos["IdDistritoNacimiento"] );
        //             $("#IdPaisNacimiento").val("166");// $("#IdPaisNacimiento")
        //             //     .val(response.datos["IdNacionalidad"])
        //             //     .trigger("chosen:updated");
        //             $("#IdEstadoCivil").val("2");// $("#IdEstadoCivil")
        //             //     .val(response.datos["IdEstadoCivil"])
        //             //     .trigger("chosen:updated");
        //             $("#IdGradoInstruccion").val("99");// $("#IdGradoInstruccion")
        //             //     .val(response.datos["IdGradoInstruccion"])
        //             //     .trigger("chosen:updated");
        //             $("#IdTipoOcupacion").val("3");// $("#IdTipoOcupacion")
        //             //     .val(response.datos["IdTipoOcupacion"])
        //             //     .trigger("chosen:updated");
        //             $("#IdReligion").val("6");// $("#IdReligion")
        //             //     .val(response.datos["IdReligion"])
        //             //     .trigger("chosen:updated");          

        //             $("#Telefono").val(""); // $("#Telefono").val(response.datos["Telefono"]);
        //             $("#DireccionDomicilio").val(""); // $("#DireccionDomicilio").val(response.datos["DireccionDomicilio"]);
        //             $("#IdDistritoDomicilio").val("150101");// $("#IdDistritoDomicilio")
        //             //     .val(parseInt(response.datos["UbigeoReniecDomicilio"]))
        //             //     .trigger("chosen:updated");
        //             $("#UsoWebReniec").val(response.datos["UsoWebReniec"]);
        //             Admision.toggleRequiredNroDocumento();
        //             if (response.tiene_sis == 1) {
        //                 $("#tiene_sis").text("Si tiene SIS");
        //                 $("#IdSiaSis").val(response.data_sis.IdNumReg);
        //                 $("#SisCodigo").val(response.data_sis.Tabla);
        //                 $("#h_filiaciontemp").val("2"); // $('#h_filiaciontemp').val('2');
        //                 buscaFuenteFinanciamiento(2);
        //             } else {
        //                 $("#tiene_sis").text("No tiene SIS");
        //                 $("#IdSiaSis").val("");
        //                 $("#SisCodigo").val("");
        //                 $("#h_filiaciontemp").val("0"); // $('#h_filiaciontemp').val('2');
        //                 buscaFuenteFinanciamiento();
        //             }
                    
        //         } else { 
        //             alert(response.mensaje);
        //             // if ($("#IdDocIdentidad").val() == "1")
        //             $("#NroDocumento").val("");
        //             $("#NroAfiliacionTemp").val("");
        //             $("#IdPaciente").val("");
        //             $("#paciente_nuevo").val("");
        //             $("#ApellidoPaterno").val("");
        //             $("#ApellidoMaterno").val("");
        //             $("#Nombres").val("");
        //             $("#FechaNacimiento").val("");
        //             $("#IdTipoSexo").val(1);
        //             $("#IdSiaSis").val("");
        //             $("#SisCodigo").val("");
        //             // $("#IdDistritoNacimiento").val("");
        //             // $("#DireccionDomicilio").val("");
        //             $("#UsoWebReniec").val("");
        //             $("#h_filiaciontemp").val("0"); 
        //             Admision.toggleRequiredNroDocumento(); //IdSiaSis
        //         }
        //     },
        // });
    },

    ListarAdmisionHospitalizacionFiltrar(
        IdCuentaAtencion,
        NroDocumento,
        NroHistoriaClinica,
        apellidoPaterno,
        IdServicio,
        FechaIngreso
    ) {
        oTable_AdmisionHospitalizacion.fnClearTable();

        fetch(
            `/hospitalizacion/ListarAdmisionHospitalizacionFiltrar?IdCuentaAtencion=${IdCuentaAtencion}&NroDocumento=${NroDocumento}&NroHistoriaClinica=${NroHistoriaClinica}&ApellidoPaterno=${apellidoPaterno}&IdServicio=${IdServicio}&FechaIngreso=${FechaIngreso}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
            .then((res) => res.json())
            .catch((error) => console.log(error))
            .then((res) => {
                if (res.resultado == 1) {
                    if (res.data.length > 0) {
                        oTable_AdmisionHospitalizacion.fnAddData(res.data);
                    }
                } else {
                    toastr.error(res.mensaje);
                    if (res.resultado == 3)
                        window.location = "/hospitalizacion/admision";
                }
            });
    },

    listaAdmision(IdAtencion, tipo) {
        // $.ajax({
        //     url:
        //         "/emergencia/AdmisionEmergSeleccionarPorId?IdAtencion=" +
        //         IdAtencion,
        //     datatype: "json",
        //     type: "get",
        //     async: false,
        //     success: function (res) {
        //         if (res.resultado == 1) {
        //             // FuentesFinanciamiento
        //             $("#IdFuenteFinanciamiento").empty();
        //             res.FuentesFinanciamiento.forEach(function (item, i) {
        //                 $("#IdFuenteFinanciamiento").append(
        //                     new Option(
        //                         item.Descripcion,
        //                         item.IdFuenteFinanciamiento
        //                     )
        //                 );
        //             });

        //             // TiposFinanciamiento
        //             $("#IdTipoFinanciamiento").empty();
        //             res.TiposFinanciamiento.forEach(function (item, i) {
        //                 $("#IdTipoFinanciamiento").append(
        //                     new Option(
        //                         item.Descripcion,
        //                         item.IdTipoFinanciamiento
        //                     )
        //                 );
        //             });

        //             if (res.data.IdDocIdentidad == 11) {
        //                 $("#chkNoIdentificado").prop("checked", true);
        //             } else {
        //                 $("#chkNoIdentificado").prop("checked", false);
        //             }

        //             $(".no-identificado").prop("disabled", true);
        //             // $(".no-identificado").prop('required',false);
        //             $("#IdDocIdentidad").val(res.data.IdDocIdentidad);
        //             $("#NroDocumento").val(res.data.NroDocumento);
        //             $("#ApellidoPaterno").val(res.data.ApellidoPaterno);
        //             $("#ApellidoMaterno").val(res.data.ApellidoMaterno);
        //             $("#Nombres").val(res.data.PrimerNombre);
        //             $("#IdTipoSexo").val(res.data.IdTipoSexo);
        //             $("#FechaNacimiento").val(res.data.FechaNacimiento);
        //             $("#IdPaisNacimiento").val(res.data.IdPaisNacimiento);
        //             $("#IdEstadoCivil").val(res.data.IdEstadoCivil);
        //             $("#IdGradoInstruccion").val(res.data.IdGradoInstruccion);
        //             $("#IdTipoOcupacion").val(res.data.IdTipoOcupacion);
        //             $("#IdReligion").val(res.data.IdReligion);
        //             //$("#IdDistritoDomicilio").val(res.data.IdReniec);
        //             $("#IdDistritoDomicilio").val(res.data.IdDistritoDomicilio); //MGAMERO
        //             $("#DireccionDomicilio").val(res.data.DireccionDomicilio);
        //             $("#Telefono").val(res.data.Telefono);
        //             $("#IdFuenteFinanciamiento").val(
        //                 res.data.IdFuenteFinanciamiento
        //             );
        //             $("#IdTipoFinanciamiento").val(
        //                 res.data.IdTipoFinanciamiento
        //             );
        //             $("#IdTiposGravedadAtencion").val(res.data.IdTipoGravedad);
        //             $("#IdOrigenAtencion").val(res.data.IdOrigenAtencion);
        //             $("#IdServicio").val(res.data.IdServicioIngreso);
        //             $("#NombreAcompaniante").val(res.data.NombreAcompaniante);
        //             $("#TelefonoAcompaniante").val(
        //                 res.data.TelefonoAcompaniante
        //             );
        //             //hidden
        //             $("#IdAtencion").val(res.data.IdAtencion); //MGAMERO
        //             $("#IdPaciente").val(res.data.IdPaciente);
        //             $("#paciente_nuevo").val(res.data.paciente_nuevo);
        //             $("#IdSiaSis").val(res.data.IdSiaSis);
        //             $("#SisCodigo").val(res.data.SisCodigo);
        //             $("#IdDistritoNacimiento").val(
        //                 res.data.IdDistritoNacimiento
        //             );
        //             $("#UsoWebReniec").val(res.data.UsoWebReniec);

        //             $(".bloquear-campo").prop("disabled", true);

        //             if (tipo == 2 && res.data.IdDocIdentidad != 11) {
        //                 $("#chkNoIdentificado").prop("disabled", true);
        //             } else {
        //                 $("#chkNoIdentificado").prop("disabled", false);
        //             }

        //             if (
        //                 res.data.IdOrigenAtencion == 21 ||
        //                 res.data.IdOrigenAtencion == 22
        //             ) {
        //                 $("#idestabldestino").val(
        //                     res.data.IdEstablecimientoOrigen
        //                 );
        //                 $("#ipressdestino").val(res.data.CodIpress);
        //                 $("#destino").val(res.data.NombreIpress);
        //                 $("#cboNroReferencia").val(
        //                     res.data.NroReferenciaOrigen
        //                 );
        //             }

        //             $(".chzn-select").trigger("chosen:updated");
        //         } else {
        //             toastr.error("ERROR", res.mensaje);
        //             if (res.resultado == 3) location.reload();
        //         }
        //     },
        //     error: function (msg) {
        //         toastr.error("ERROR", "Error al listar la admisión!");
        //     },
        // });
    },

    InsertaOModificaAdmisionEmergencia(midata) {
        // if ($("#chkNoIdentificado").is(":checked")) {
        //     midata.append("IdDocIdentidad", $("#IdDocIdentidad").val());
        //     midata.append("NroDocumento", $("#NroDocumento").val());
        //     midata.append("ApellidoPaterno", $("#ApellidoPaterno").val());
        //     midata.append("ApellidoMaterno", $("#ApellidoMaterno").val());
        //     midata.append("Nombres", $("#Nombres").val());
        //     midata.append("FechaNacimiento", $("#FechaNacimiento").val());
        //     midata.append("IdGradoInstruccion", $("#IdGradoInstruccion").val());
        //     midata.append("IdTipoOcupacion", $("#IdTipoOcupacion").val());
        //     midata.append("Telefono", $("#Telefono").val());
        //     midata.append("DireccionDomicilio", $("#DireccionDomicilio").val());
        //     midata.append("Forzar", 1);
        // }

        // midata.append("Forzar", Admision.Forzar);
        // midata.append("_token", $('[name="_token"]').val());

        // let url = "/emergencia/CreaAdmisionEmergencia";
        // let title = "Guardado";
        // if (Admision.ValidarAgregar == 0) {
        //     url = "/emergencia/ActualizaAdmisionEmergencia";
        //     title = "Actualizado";
        // }
        // let formatos = [];
        // $.ajax({
        //     url: url,
        //     datatype: "json",
        //     data: midata,
        //     type: "post",
        //     processData: false,
        //     contentType: false,
        //     async: false,
        //     success: function (res) {
        //         if (res.resultado == 1)  {
        //             if ($("#IdFuenteFinanciamiento").val() == 3)
        //                 formatos.push(1);

        //             Admision.LimpiarCampos();

        //             Swal.fire({
        //                 icon: "success",
        //                 title: title,
        //                 html: res.mensaje,
        //                 confirmButtonText: "Aceptar",
        //                 allowOutsideClick: false,
        //                 allowEscapeKey: false,
        //             });
                    
        //             //Refresca nuevamente la tabla
        //             Admision.ListarAdmisionEmergenciaFiltrar(
        //                 $("#txtCuentaBusq").val(),
        //                 $("#txtNroNroDocBusq").val(),
        //                 $("#txtHistoriaBusq").val(),
        //                 $("#txtApPaternoBusq").val(),
        //                 $("#txtServicioBusq").val(),
        //                 $("#txtFechaIngresoBusq").val()
        //             );

        //             $("#modalAdmision").modal("hide");

        //             if (Array.isArray(res.OrdenesPago) && res.OrdenesPago.length > 0) {
        //                 formatos.push(2);
        //             }                  

        //             if (Admision.ValidarAgregar == 1)
        //                 VisorDocumento.AbrirVisorDocumentos(
        //                     res.IdCuentaAtencion,
        //                     res.IdAtencion,
        //                     formatos
        //                 );

        //         } else if (res.resultado == 2) {
        //             Admision.Forzar = 1;

        //             $("#formulario_admision").submit();
        //         } else {
        //             toastr.error("ERROR", res.mensaje);
        //             if (res.resultado == 3) location.reload();
        //         }
        //     },
        //     error: function (msg) {
        //         console.log("error:", msg);
        //         toastr.error("ERROR", "Error en la admision!");
        //     },
        // });
    },

    InitDatablesAdmisionHospitalizacion() {
        var parms = {
            destroy: true,
            bFilter: false,
            order: [[0, "desc"]],
            scrollX: true,
            columns: [
                {
                    width: "5%",
                    data: "IdCuentaAtencion",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "8%",
                    data: "TipoDoc",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "5%",
                    data: "NroDocumento",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "center");
                    },
                },
                {
                    width: "5%",
                    data: "NroHistoriaClinica",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "center");
                    },
                },
                {
                    width: "15%",
                    data: "Paciente",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "10%",
                    data: "FechaIngreso",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "10%",
                    data: "Servicio",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "10%",
                    data: "FuenteFinanciamiento",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "8%",
                    data: null,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css("text-align", "center");
                        var btnImprimeDoc = "";

                        btnImprimeDoc =
                            '<button class="ImprimeDoc btn btn-sm btn-warning glow_button" title="Visualiza Docs" data-toggle="tooltip" style="margin: 2px;"><i class="fa fa-eye"></i> </button>';

                        $(td).html(btnImprimeDoc);
                    },
                },
                {
                    width: "8%",
                    data: null,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).css("text-align", "center");
                        var btnImprimeDoc = "";

                        if (rowData.FuenteFinanciamiento == "SIS") {
                            btnImprimeDoc =
                                '<button class="ImprimeFua btn btn-sm btn-success glow_button" title="Visualiza Docs" data-toggle="tooltip" style="margin: 2px;"><i class="fa fa-file-excel-o"></i> </button>';
                        }

                        $(td).html(btnImprimeDoc);
                    },
                },
            ],
        };

        oTable_AdmisionHospitalizacion = $("#tblAdmisionHospitalizacion").dataTable(
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

    eventos() {

        // $("#NroDocumento").keydown(function (event) {
        //     if (event.key === "Enter") {  // Verifica si la tecla presionada es "Enter"
        //         event.preventDefault(); // Evita el comportamiento predeterminado (ej. envío de formulario)
        
        //         const valor = $(this).val().trim();
        //         const idDocIdentidad = $("#IdDocIdentidad").val();
        
        //         if (valor.length > 7) {
        //             Admision.buscapaciente(valor);
        //         } 
        //         else if (valor.length < 8 && idDocIdentidad == 1) {
        //             toastr.warning("El DNI debe tener 8 dígitos o más");
        //         }
        //     }
        // });

        // $("#NroAfiliacionTemp").keydown(function (event) {
        //     if (event.key === "Enter") {  // Verifica si la tecla presionada es "Enter"
        //         event.preventDefault(); // Evita el comportamiento predeterminado (ej. envío de formulario)
        
        //         const valor = $(this).val().trim();
        
        //         if (valor.length > 7) {
        //             toastr.info("Buscando en el SIS: E-" + valor);
        //             Admision.buscapaciente_por_sistemporal(valor);
        //         } 
        //         else if (valor.length > 0 && valor.length < 8) {
        //             toastr.warning("El Número de Filiación debe tener 8 dígitos o más");
        //         }
        //     }
        // });

        // $("#infoNroAfiliacionTemp").on("click", function () {
        //     Swal.fire({
        //         title: '¿Para qué sirve?',
        //         html: `
        //             <div style="font-size: 0.85rem; text-align: justify;">
        //                 <p class="mt-3">
        //                     Si el paciente cuenta con <strong>Número de Afiliación Temporal</strong> (Ejemplo: <strong>E-XXXXXXXX</strong>), ingrésalo en esta casilla y presiona <strong>Enter</strong> para validar el registro del paciente con <strong>SIS activo</strong>.
        //                 </p>
        //                 <div class="text-center">
        //                     <img src='../assets/img/CapturaNroFiliacion.png' alt="Ejemplo de Afiliación Temporal" class="img-fluid mt-2 rounded">
        //                 </div>
        //                 <p class="mt-3 text-danger fw-bold text-center">
        //                     ⚠️ <strong>Importante:</strong> Si ya verificaste que el paciente <strong>Si tiene SIS</strong>, <u>no es necesario usar esta opción</u>.
        //                 </p>
        //             </div>


        //         `            
        //         ,
        //         icon: 'info',
        //         confirmButtonText: 'Aceptar',
        //         width: '700px' // Aumenta el ancho del Swal
        //     });
        // });

        // $("#tblAdmisionEmergencia tbody").on(
        //     "click",
        //     ".ImprimeDoc",
        //     function () {
        //         var objrow = oTable_AdmisionHospitalizacion
        //             .api(true)
        //             .row($(this).parents("tr")[0])
        //             .index();
        //         var row = oTable_AdmisionHospitalizacion.fnGetData(objrow);
        //         console.log(row);
        //         let formatos = [];
        //         if (row.FuenteFinanciamiento == "SIS") formatos.push(1);
        //         if (row.OrdenesPago != 0) formatos.push(2);

        //         VisorDocumento.AbrirVisorDocumentosEmergencia(
        //             row.IdCuentaAtencion,
        //             row.IdAtencion,
        //             row.IdServicio,
        //             formatos
        //         );
        //     }
        // );

        // $("#tblAdmisionEmergencia tbody").on(
        //     "click",
        //     ".ImprimeFua",
        //     async function () {
        //         var objrow = oTable_AdmisionHospitalizacion
        //             .api(true)
        //             .row($(this).parents("tr")[0])
        //             .index();
        //         var row = oTable_AdmisionHospitalizacion.fnGetData(objrow);
        //         console.log(row);

        //         try {
        //             // Realizar fetch a la URL que devuelve el archivo Excel
        //             const response = await fetch(
        //                 `ws/sa_general/imprime_fua/${row.IdCuentaAtencion}`,
        //                 {
        //                     method: "GET",
        //                     headers: {
        //                         "Content-Type":
        //                             "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        //                     },
        //                 }
        //             );

        //             // Verificar si la respuesta fue exitosa
        //             if (response.ok) {
        //                 // Convertir la respuesta a un blob (archivo binario)
        //                 const blob = await response.blob();

        //                 // Crear un enlace para descargar el archivo
        //                 const url = window.URL.createObjectURL(blob);
        //                 const a = document.createElement("a");
        //                 a.href = url;
        //                 a.download = `fua_${row.IdCuentaAtencion}.xlsx`;
        //                 document.body.appendChild(a);
        //                 a.click();

        //                 // Liberar el objeto URL
        //                 window.URL.revokeObjectURL(url);
        //             } else {
        //                 console.error(
        //                     "Error al descargar el archivo:",
        //                     response.statusText
        //                 );
        //             }
        //         } catch (error) {
        //             console.error("Error en la solicitud:", error);
        //         }
        //     }
        // );

        $("#btnBuscar").on("click", function () {
            if (
                $("#txtCuentaBusq").val() == "" &&
                $("#txtNroNroDocBusq").val() == "" &&
                $("#txtHistoriaBusq").val() == "" &&
                $("#txtApPaternoBusq").val() == "" &&
                $("#txtServicioBusq").val() == "" &&
                $("#txtFechaIngresoBusq").val() == ""
            ) {
                toastr.error("Ingrese al menos un valor para la búsqueda");
                return false;
            }
            AdmisionHOSP.ListarAdmisionHospitalizacionFiltrar(
                $("#txtCuentaBusq").val(),
                $("#txtNroNroDocBusq").val(),
                $("#txtHistoriaBusq").val(),
                $("#txtApPaternoBusq").val(),
                $("#txtServicioBusq").val(),
                $("#txtFechaIngresoBusq").val()
            );
        });

        // $("#btnguardarAdmision").on("click", function () {
        //     if (
        //         Admision.ValidarAgregar == 1 &&
        //         ($("#IdDistritoDomicilio").val() == "" ||
        //             $("#IdDistritoDomicilio").val() == null)
        //     ) {
        //         toastr.warning("El campo Lugar de Procedencia es requerido");
        //         return false;
        //     }
        // });

        // $("#formulario_admision").on("submit", function (e) {
        //     e.preventDefault();

        //     Admision.InsertaOModificaAdmisionEmergencia(new FormData(this));
        // });

        // $("#btnAgregar").on("click", function () {
        //     Admision.LimpiarCampos();

        //     Admision.ValidarAgregar = 1;

        //     $("#btn_getSIS")
        //         .removeClass("disabled") // Remueve la clase de estilo deshabilitado
        //         .removeAttr("aria-disabled") // Elimina el atributo de accesibilidad
        //         .css("pointer-events", "auto"); // Permite nuevamente los clics
        //     $("#btn_buscaFiliacionTemp")
        //         .removeClass("disabled") // Remueve la clase de estilo deshabilitado
        //         .removeAttr("aria-disabled") // Elimina el atributo de accesibilidad
        //         .css("pointer-events", "auto"); // Permite nuevamente los clics
        //     $("#modalAdmision").modal("show");
        // });

        // $("#btnModificar").on("click", function () {
        //     let objRowAdmision = oTable_AdmisionHospitalizacion
        //         .api(true)
        //         .row(".selected")
        //         .data();
        //     Admision.ValidarAgregar = 0;

        //     if (isEmpty(objRowAdmision)) {
        //         toastr.error("Selecciona un registro");
        //         return false;
        //     }

        //     Admision.LimpiarCampos();
        //     Admision.listaAdmision(objRowAdmision.IdAtencion, 2);
        //     $(".modificar-campo").removeAttr("disabled");
        //     $(".modificar-campo")
        //         .removeClass("chosen-disabled")
        //         .prop("disabled", false)
        //         .trigger("chosen:updated");
        //     $("#btn_getSIS")
        //         .addClass("disabled") // Añade una clase para simular el estilo deshabilitado
        //         .attr("aria-disabled", "true") // Añade accesibilidad
        //         .css("pointer-events", "none"); // Evita que se pueda hacer clic
        //     $("#btn_buscaFiliacionTemp")
        //         .addClass("disabled") // Añade una clase para simular el estilo deshabilitado
        //         .attr("aria-disabled", "true") // Añade accesibilidad
        //         .css("pointer-events", "none"); // Evita que se pueda hacer clic
        //     $("#modalAdmision").modal("show");
        // });

        // $("#btnConsultar").on("click", function () {
        //     let objRowAdmision = oTable_AdmisionHospitalizacion
        //         .api(true)
        //         .row(".selected")
        //         .data();

        //     if (isEmpty(objRowAdmision)) {
        //         toastr.error("Selecciona un registro");
        //         return false;
        //     }
        //     Admision.LimpiarCampos();
        //     $("#btnguardarAdmision").hide();

        //     Admision.listaAdmision(objRowAdmision.IdAtencion, 3);

        //     if (
        //         $("#IdOrigenAtencion").val() == 21 ||
        //         $("#IdOrigenAtencion").val() == 22
        //     ) {
        //         $("#destinoReferencia").removeClass("d-none");
        //     }

        //     $("#btn-seleccionarEstablecimiento").hide();
        //     $("#chkNoIdentificado").attr("disabled", true);
        //     $(".chzn-select").trigger("chosen:updated");
        //     $("#btn_getSIS")
        //         .addClass("disabled") // Añade una clase para simular el estilo deshabilitado
        //         .attr("aria-disabled", "true") // Añade accesibilidad
        //         .css("pointer-events", "none"); // Evita que se pueda hacer clic
        //     $("#btn_buscaFiliacionTemp")
        //         .addClass("disabled") // Añade una clase para simular el estilo deshabilitado
        //         .attr("aria-disabled", "true") // Añade accesibilidad
        //         .css("pointer-events", "none"); // Evita que se pueda hacer clic
        //     $("#modalAdmision").modal("show");
        // });

        // $("#btnCerrarModalAdmision").on("click", function () {
        //     $("#modalAdmision").modal("hide");
        // });

        $("#btnLimpiar").on("click", function () {
            $("#txtCuentaBusq").val("");
            $("#txtNroNroDocBusq").val("");
            $("#txtHistoriaBusq").val("");
            $("#txtApPaternoBusq").val("");
            $("#txtFechaIngresoBusq").val(new Date().toISOString().split('T')[0]); //$("#txtFechaIngresoBusq").val("");
            $("#txtServicioBusq").val("");
        });

        // $("#IdOrigenAtencion").on("change", function () {
        //     $("#idestabldestino").val("");
        //     $("#ipressdestino").val("");
        //     $("#destino").val("");
        //     $("#cboNroReferencia").val("");

        //     if ($(this).val() == 21 || $(this).val() == 22) {
        //         $("#destinoReferencia").removeClass("d-none");
        //     } else {
        //         $("#destinoReferencia").addClass("d-none");
        //     }
        // });

        // $("#IdDocIdentidad").on("change", function () {
        //     Admision.toggleRequiredNroDocumento();
        //     $("#NroAfiliacionTemp").val("");
        //     $("#IdEstadoCivil").val("2");
        //     $("#IdTipoSexo").val("1");
        //     $("#IdPaisNacimiento").val("166");
        //     $("#IdDistritoDomicilio").val("150101");
        //     $("#IdOrigenAtencion").val("");
        //     $("#IdTiposGravedadAtencion").val("");
        //     $("#IdGradoInstruccion").val("99");
        //     $("#IdTipoOcupacion").val("3");
        //     $("#IdReligion").val("6");
        //     $("#IdServicio").val("");
        //     $("#tiene_sis").text("");
        //     $("#IdFuenteFinanciamiento").empty();
        //     $("#IdTipoFinanciamiento").empty();
    
        //     //hidden
        //     $("#IdPaciente").val("");
        //     $("#paciente_nuevo").val("");
        //     $("#IdSiaSis").val("");
        //     $("#SisCodigo").val("");
        //     $("#IdDistritoNacimiento").val("");
        //     $("#UsoWebReniec").val("");
    
        //     $("#btn-seleccionarEstablecimiento").show();
        //     $("#d-noneEdadAprox").addClass("d-none");
        //     $("#cEdadAprox").removeClass("col-lg-9");
        //     $("#cEdadAprox").addClass("col-lg-12");
        //     $(".chzn-select").trigger("chosen:updated");
        // });

        // $("#tblAdmisionEmergencia tbody").on("click", "tr", function () {
        //     if ($(this).hasClass("selected")) {
        //         $(this).removeClass("selected");
        //     } else {
        //         oTable_AdmisionHospitalizacion
        //             .$("tr.selected")
        //             .removeClass("selected");
        //         $(this).addClass("selected");
        //     }
        // });

        // $("#EdadAprox").on("input", function () {
        //     let fechaNacimiento = Admision.calcularFechaDeNacimiento(
        //         $(this).val(),
        //         $("#IdTipoEdad").val()
        //     );
        //     $("#FechaNacimiento").val(fechaNacimiento);
        // });

        // $("#IdTipoEdad").on("change", function () {
        //     let fechaNacimiento = Admision.calcularFechaDeNacimiento(
        //         $("#EdadAprox").val(),
        //         $(this).val()
        //     );
        //     $("#FechaNacimiento").val(fechaNacimiento);
        // });

        // $("#chkNoIdentificado").on("change", function () {
        //     let estado = $(this).is(":checked");
        //     $("#NroDocumento").prop("required", !estado);
        //     $("#ApellidoPaterno").prop("required", !estado);
        //     $("#ApellidoMaterno").prop("required", !estado);
        //     $("#Nombres").prop("required", !estado);
        //     $("#FechaNacimiento").prop("required", !estado);
        //     $("#DireccionDomicilio").prop("required", !estado);
        //     $("#EdadAprox").prop("required", estado);
        //     $("#IdTipoEdad").prop("required", estado);
        //     $(".no-identificado").prop("disabled", estado);
        //     if (estado) {
        //         $("#IdDocIdentidad").val("11");
        //         $("#NroDocumento").val("");
        //         $("#NroAfiliacionTemp").val("");
        //         $("#ApellidoPaterno").val("NN");
        //         $("#ApellidoMaterno").val("NN");
        //         $("#Nombres").val("NN");
        //         $("#FechaNacimiento").val("");
        //         $("#IdPaciente").val("");
        //         $("#paciente_nuevo").val("1");
        //         $("#IdTipoSexo").val(1);
        //         $("#IdSiaSis").val("");
        //         $("#SisCodigo").val("");
        //         $("#IdGradoInstruccion").val("99");
        //         $("#IdTipoOcupacion").val("3");
        //         $("#IdDistritoNacimiento").val("");
        //         $("#DireccionDomicilio").val("");
        //         $("#UsoWebReniec").val("1");
        //         $("#IdEstadoCivil").val("");
        //         $("#EdadAprox").val("");
        //         $("#IdTipoEdad").val("");
        //         $("#d-noneEdadAprox").removeClass("d-none");
        //         $("#cEdadAprox").removeClass("col-lg-12");
        //         $("#cEdadAprox").addClass("col-lg-9");
        //         if (Admision.ValidarAgregar != 0) {
        //             buscaFuenteFinanciamiento();
        //             $("#tiene_sis").text("No tiene SIS");
        //         }
        //     } else {
        //         $("#IdDocIdentidad").val("1");
        //         $("#ApellidoPaterno").val("");
        //         $("#ApellidoMaterno").val("");
        //         $("#Nombres").val("");
        //         $("#IdEstadoCivil").val("2");
        //         $("#paciente_nuevo").val("");
        //         $("#tiene_sis").text("");
        //         $("#IdTipoSexo").prop("disabled", estado);
        //         $("#IdPaisNacimiento").prop("disabled", estado);
        //         $("#IdReligion").prop("disabled", estado);
        //         $("#IdDistritoDomicilio").prop("disabled", estado);
        //         $("#d-noneEdadAprox").addClass("d-none");
        //         $("#cEdadAprox").removeClass("col-lg-9");
        //         $("#cEdadAprox").addClass("col-lg-12");
        //     }
        //     $(".chzn-select").trigger("chosen:updated");
        // });
    },

    LimpiarCampos() {
        // $(".bloquear-campo").attr("disabled", false);
        // $("#chkNoIdentificado").attr("checked", false);
        // $("#btnguardarAdmision").show();
        // $("#NroDocumento").attr("required", true);
        // $("#ApellidoPaterno").attr("required", true);
        // $("#ApellidoMaterno").attr("required", true);
        // $("#Nombres").attr("required", true);
        // $("#FechaNacimiento").attr("required", true);
        // $("#DireccionDomicilio").attr("required", true);
        // $(".bloquear-campo").val("");
        // $("#NroAfiliacionTemp").val("");
        // $("#IdDocIdentidad").val("1");
        // $("#IdEstadoCivil").val("2");
        // $("#IdTipoSexo").val("1");
        // $("#IdPaisNacimiento").val("166");
        // $("#IdDistritoDomicilio").val("150101");
        // $("#IdOrigenAtencion").val("");
        // $("#IdTiposGravedadAtencion").val("");
        // $("#IdGradoInstruccion").val("99");
        // $("#IdTipoOcupacion").val("3");
        // $("#IdReligion").val("6");
        // $("#IdServicio").val("");
        // $("#tiene_sis").text("");
        // $("#IdFuenteFinanciamiento").empty();
        // $("#IdTipoFinanciamiento").empty();

        // //hidden
        // $("#IdPaciente").val("");
        // $("#paciente_nuevo").val("");
        // $("#IdSiaSis").val("");
        // $("#SisCodigo").val("");
        // $("#IdDistritoNacimiento").val("");
        // $("#UsoWebReniec").val("");

        // $("#btn-seleccionarEstablecimiento").show();
        // $("#d-noneEdadAprox").addClass("d-none");
        // $("#cEdadAprox").removeClass("col-lg-9");
        // $("#cEdadAprox").addClass("col-lg-12");
        // $(".chzn-select").trigger("chosen:updated");
    },

    toggleRequiredNroDocumento() {
        // if ($("#IdDocIdentidad").val() == "11") {
        //     $("#NroDocumento").prop("required", false).val("");
        // } else {
        //     $("#NroDocumento").prop("required", true);
        // }
    },    

};


$(document).ready(function () {

    AdmisionHOSP.Plugins()
    AdmisionHOSP.InitDatablesAdmisionHospitalizacion()

    AdmisionHOSP.eventos()
    AdmisionHOSP.InitialCharge()

    //VisorDocumento.Eventos();

});



