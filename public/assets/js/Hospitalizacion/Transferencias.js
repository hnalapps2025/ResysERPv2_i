var DTTransferencias = null

var Transferencias = {
    idMedicoSesion: 0,
    idEstanciaHospitalariaActual: 0,
    tipoServicio: '',
    idEspecialidad: 0,
    tieneCama: false,
    idCamaActual: 0,
    idServicioTransferido: 0,
    esObservacionEmergencia: 0,

    async cargaInicial() {
        var fecha = new Date();
        var dia = fecha.getDate();
        var mes = parseInt(fecha.getMonth()) + 1;
        var yyy = fecha.getFullYear();
        if (dia < 10)
            dia = '0' + dia; //agrega cero si el menor de 10
        if (mes < 10)
            mes = '0' + mes
        fechaP = dia + "/" + mes + "/" + yyy

        $('#txtFechaRecepcionTransferencia').datepicker({
            todayHighlight: true,
            autoclose: true,
            dateFormat: "dd/mm/yy",
            orientation: "bottom"
        });

        $('#txtFechaRecepcionTransferencia').datepicker("setDate", moment().toDate().format('dd/mm/yyyy'));

        $.mask.definitions['H'] = '[012]';
        $.mask.definitions['N'] = '[012345]';
        $.mask.definitions['n'] = '[0123456789]';
        $("#txtHoraRecepcionTransferencia").mask("Hn:Nn");

        $('#txtHoraRecepcionTransferencia').val(moment().toDate().format('HH:MM'));

        
        // if ($("#hdIdTipoServicio").val() == '3') {
        //     Transferencias.tipoServicio = 'HOSP';
        // } else if ($("#hdIdTipoServicio").val() == '2' || $("#hdIdTipoServicio").val() == '4') {
        //     Transferencias.tipoServicio = 'EMER';
        // }
        
        // console.log('$("#hdIdTipoServicio").val()',$("#hdIdTipoServicio").val())
        // console.log('$("#hdIdTipoServicio").val()',Transferencias.tipoServicio)
        const aten = await Transferencias.SeleccionarAtencion(Variables.IdAtencion);
        if(aten.IdTipoServicio == 3){
            Transferencias.tipoServicio = 'HOSP';
        }else  if ((aten.IdTipoServicio == 2 || aten.IdTipoServicio == 4)){
            Transferencias.tipoServicio = 'EMER';
        }
        Transferencias.initDatables();
        Transferencias.Eventos();
        //await Transferencias.ListarMedicos();
        await Transferencias.ListarServicios(Transferencias.tipoServicio);
       
       
        Transferencias.esObservacionEmergencia = aten.EsObservacionEmergencia;
        if(aten.llegoAlServicio == 0){
            await Transferencias.CargarTransferenciaRecepcion();
        }

        
     
        // if(aten.conAlta == 1){
        //     validarNumEvaluaciones
        // }
            
    },

    Eventos() {

        $("#btnTransferencia").on('click', async function () {
            console.log('Trans hosp');
            var evals = DtEvaluaciones.data().count();
            var dxs = DtDiagnosticos.data().count();
            
            Transferencias.LimpiarModalTransferencias();
            await Transferencias.CargarTransferencia();     
            
        });
        $('#modalTransferenciasHosp').on('shown.bs.modal', function (event) {            
            DTTransferencias.columns.adjust().draw();            
        });

        $("#btnTransferencia").on('click', async function () {
                 
        });

        $("#btnCerrarTransferencias").on('click', function () {
            //Variables.Limpiar();
            Transferencias.CerrarModalTransferencias();
        });

        $("#btnTransferenciaRecepcion").on('click', async function () {
            //Transferencias.LimpiarModalTransferencias();
            await Transferencias.CargarTransferenciaRecepcion();
        });

        $("#cboServicioRecibeTransferencia").on('change', async function () {
            var idServDest = $("#cboServicioRecibeTransferencia").val();
            await Transferencias.ListarCamasDestinos(idServDest);
        });

        $("#btnGuardarTransferencias").on('click', async function () {


            servicioTransferido = $('#cboServicioRecibeTransferencia').val();
           
            console.log('servicio',servicioTransferido);
           
            const aten = await Transferencias.SeleccionarAtencion(Variables.IdAtencion);
            Transferencias.esObservacionEmergencia = aten.EsObservacionEmergencia;


            if(servicioTransferido ==300 && aten.IdTipoSexo==1 ){
                alerta('info', '', 'No se puede transferir al servicio GINCEOLOGIA');
                return;
            }else if(servicioTransferido ==712 && aten.IdTipoSexo==1){
                alerta('info', '', 'No se puede transferir al servicio OBSTETRICIA');
                return;

            }else if(servicioTransferido ==302 && aten.IdTipoSexo==1){
                alerta('info', '', 'No se puede transferir al servicio OBSTETRICIA');
                return;
            }else if(servicioTransferido ==714 && aten.IdTipoSexo==1){
                alerta('info', '', 'No se puede transferir al servicio OBSTETRICIA');
                return;
            }else if(servicioTransferido ==713 && aten.IdTipoSexo==1){
                alerta('info', '', 'No se puede transferir al servicio OBSTETRICIA');
                return;
               
            }else{
                await Transferencias.ModificarTransferencia();
            }


           
           
               
           
        });


        ///////////////////////CAMBIAR CAMAS/////////////////////////////
        $("#btnGuardarCamaActualTransferencia").on('click', async function () {
            await Transferencias.ModificarCamaActual();
        });

        $("#btnCerrarCamaActualTransferencia").on('click', function () {
            Transferencias.CerrarModalTransferenciasConfirmacion();
        });

        // ///////////////////////RECEPCION CONFIRMACION/////////////////////////////
        $("#btnGuardarTransferenciasConfirmacion").on('click', async function () {

            if (isEmpty($("#cboServicioEsperaTransferencia").val())) {
                alerta('info', '', 'Por favor selecciones el servicio que se asignará al paciente.');
                return false;
            }
        
            if ( Transferencias.tieneCama == true) {
                if (isEmpty($("#cboCamaEsperaTransferencia").val())) {
                    alerta('info', '', 'Por favor seleccione la cama que se asignará al paciente.');
                    return false;
                }
            }
        
            const llegada = await Transferencias.ConfirmarLlegadaAlServicio(Transferencias.idEstanciaHospitalariaActual, $("#cboCamaEsperaTransferencia").val());
            
            if (llegada) {
              
                if (Transferencias.tipoServicio == 'HOSP') {
                    window.location.href = '../HospitalizacionEvaluacion/' + Variables.IdAtencion;
                    // AdmisionHospitalizacion.ListarAtenciones(AdmisionHospitalizacion.tipoBusqueda);
                }
                /*
                if (Transferencias.tipoServicio == 'UCI') {
                    EvaluacionesUCI.ListarAtenciones();
                }*/
                
                // Transferencias.CerrarModalTransferenciasConfirmacion();
                // ReposicionarVista();
            }
        });
        
        $("#btnCerrarTransferenciasConfirmacion").on('click', function () {
            Transferencias.CerrarModalTransferenciasConfirmacion();
            if(Transferencias.tipoServicio == 'HOSP')
            {
                window.location.href = '../hospitalizacion/notaingreso/';
            }
            
          
           
        });

    },
    // async validarNumEvaluaciones(){
    //     var table = $('#tblEvaluacionesEmergencia').DataTable();
    //        let NumeroEval = table.row('.selected').data(); 
    //        if (NumeroEval >= 1) {
              
    //           $('#ListaOpcionesEval input').addClass('opaco'); // Agrega la clase opaco
    //            $('#ListaOpcionesEval input').prop('disabled', true); // Deshabilita los inputs
    //       }

    // },

    async CargarTransferencia() {
        const aten = await Transferencias.SeleccionarAtencion(Variables.IdAtencion);
        Transferencias.idCamaActual = aten.IdCamaActual;
        //if (Transferencias.tipoServicio == 'EMER') {
            //var objrowTb = DTEmergencia.row('.selected').data();
        //}

        /*if (Transferencias.tipoServicio == 'HOSP') {
            var objrowTb = oTable_atencionesHosp.api(true).row('.selected').data();
        }

        if (Transferencias.tipoServicio == 'UCI') {
            var objrowTb = oTable_AtencionesUCI.api(true).row('.selected').data();
        }*/

        /*if (isEmpty(objrowTb)) {
            alerta('info', '', 'Seleccione un registro por favor.');
            return false;
        }*/

        if (aten.idEstadoAtencion == 2) {
            alerta('info', '', 'La cuenta se encuentra cerrada.');
            if (Transferencias.tipoServicio == 'EMER') {                
                return false;
            }            
        }

        // if (aten.fechaEgreso != '' && aten.fechaEgreso != null) {
        //     alerta('info', '', 'El paciente tiene alta médica.');
        //     return false;
        // }

        

        $("#btnGuardarTransferencias").show();
        if (Transferencias.tipoServicio == 'EMER') {
            if (aten.EsObservacionEmergencia == 1) {
                //if (isEmpty(objrowTb.idCamaIngreso)) {
                //    alerta('warning', '', 'El paciente aún no se le asignado cama de ingreso.<br>Por favor realice la recepción.');
                //    return false;
                //}

                if (aten.llegoAlServicio == 0) {
                    alerta('warning', '', 'El paciente aún no llega al servicio.\nPor favor realice la recepción.');
                    $("#btnGuardarTransferencias").hide();
                    //return false;
                }
            } else {
                if (aten.llegoAlServicio == 0) {
                    alerta('warning', '', 'El paciente aún no llega al servicio.\nPor favor realice la recepción.');
                    $("#btnGuardarTransferencias").hide();
                    //return false;
                }
            }
        } /*else if (Transferencias.tipoServicio == 'HOSP' || Transferencias.tipoServicio == 'UCI') {
            $("#CamasActual").show();
            $("#BtnCamaActual").show();

            if (isEmpty(objrowTb.idCamaIngreso)) {
                alerta('warning', '', 'El paciente aún no se le asignado cama de ingreso.<br>Por favor realice la recepción.');
                return false;
            }

            if (objrowTb.llegoAlServicio == 0) {
                alerta('warning', '', 'El paciente aún no llega al servicio.<br>Por favor realice la recepción.');
                $("#btnGuardarTransferencias").hide();
                //return false;
            }            
        }*/

        $("#txtNroCuentaTransferencia").val(aten.IdCuentaAtencion);
        $("#txtHistoriaTransferencia").val(aten.NroHistoriaClinica);
        $("#txtTipoDocumentoTransferencia").val(aten.TipoDocumento);
        $("#txtNroDocumentoTransferencia").val(aten.NroDocumento);
        $("#txtPacienteNombreTransferencia").val((aten.PrimerNombre == null ? '' : aten.PrimerNombre) + ' ' + (aten.SegundoNombre == null ? '' : aten.SegundoNombre) + ' ' + aten.ApellidoPaterno + ' ' + aten.ApellidoMaterno);

        //Variables.Cargar(objrowTb);
        $("#CamasDestino").hide();
        
        Transferencias.idEspecialidad = aten.IdEspecialidad;
        //Transferencias.idMedicoSesion = await Utilitario.ObtenerIdMedicoSesion();
        Transferencias.idMedicoSesion = Variables.IdMedicoLogeado;
        //await Transferencias.ListarMedicos();
        $('#cboMedicoOrdenaTransferencia').val(Transferencias.idMedicoSesion);        
        await Transferencias.ListarTransferencias();
        await Transferencias.ListarCamas(Variables.IdServicio);

        $('#txtFechaRecepcionTransferencia').datepicker("setDate", moment().toDate().format('dd/mm/yyyy'));
        $('#txtHoraRecepcionTransferencia').val(moment().toDate().format('HH:MM'));

        $('.chzn-select').chosen().trigger("chosen:updated");
        $("#modalTransferenciasHosp").modal("show");                       
              
    },

    async CargarTransferenciaRecepcion() {
        console.log('22');
        const aten = await Transferencias.SeleccionarAtencion(Variables.IdAtencion);
        console.log('datos de seleccionar Atencion',aten);
        Transferencias.idCamaActual = aten.IdCamaActual;
        /*if (Transferencias.tipoServicio == 'EMER') {
            var objrowTb = oTable_atencionesEmer.api(true).row('.selected').data();
        }

        if (Transferencias.tipoServicio == 'HOSP') {
            var objrowTb = oTable_atencionesHosp.api(true).row('.selected').data();
        }
        
        if (Transferencias.tipoServicio == 'UCI') {
            var objrowTb = oTable_AtencionesUCI.api(true).row('.selected').data();
        }

        if (isEmpty(objrowTb)) {
            alerta('info', '', 'Seleccione un registro por favor.');
            return false;
        }*/

        if (aten.IdEstadoAtencion == 2) {
            alerta('warning', '', 'La cuenta se encuentra cerrada.');
            if (Transferencias.tipoServicio == 'EMER') {
                return false;
            }
        }

        // if (aten.FechaEgreso != '' && aten.FechaEgreso != null) {
        //     alerta('warning', '', 'El paciente tiene alta médica.');
        //     return false;
        // }

        $("#txtNroCuentaRecepcion").val(aten.IdCuentaAtencion);
        $("#txtHistoriaRecepcion").val(aten.NroHistoriaClinica);
        $("#txtTipoDocumentoRecepcion").val(aten.TipoDocumento);
        $("#txtNroDocumentoRecepcion").val(aten.NroDocumento);
        $("#txtPacienteNombreRecepcion").val((aten.PrimerNombre == null ? '' : aten.PrimerNombre) + ' ' + (aten.SegundoNombre == null ? '' : aten.SegundoNombre) + ' ' + aten.ApellidoPaterno + ' ' + aten.ApellidoMaterno);

        $("#EstanciaServicioActual").show();
        $("#EstanciaServicioPorRecepcionar").show();
        $("#CamasActual").show();
        $("#btnGuardarCamaActualTransferencia").show();
        Transferencias.idEstanciaHospitalariaActual = aten.IdEstanciaHospitalariaActual;
        //Variables.Cargar(objrowTb);

        console.log('Transferencias.tipoServicio', Transferencias.tipoServicio)
        
        if (Transferencias.tipoServicio == 'EMER') {
            if (aten.EsObservacionEmergencia == 1) {
                if (aten.llegoAlServicio == 0) {
                    // await Transferencias.ListarCamasEspera(aten.IdServicioActual, aten.IdPaciente, aten.IdCamaActual);
                    $('#cboServicioEsperaTransferencia').val(Variables.IdServicio);
                    $("#EstanciaServicioActual").hide();
                } else {
                    // await Transferencias.ListarCamas(aten.IdServicioActual);
                    $('#cboServicioActualTransferencia').val(Variables.IdServicio);
                    $("#EstanciaServicioPorRecepcionar").hide();
                }
            } else {
                if (aten.llegoAlServicio == 0) {
                    await Transferencias.ListarCamasEspera(aten.IdServicioActual, aten.IdPaciente, aten.IdCamaActual);
                    $('#cboServicioEsperaTransferencia').val(Variables.IdServicio);
                    $("#CamasEspera").hide();
                    $("#EstanciaServicioActual").hide();
                } else {
                    await Transferencias.ListarCamas(aten.IdServicioActual);
                    $('#cboServicioActualTransferencia').val(Variables.IdServicio);
                    $("#EstanciaServicioPorRecepcionar").hide();
                    $("#CamasActual").hide();
                    $("#btnGuardarCamaActualTransferencia").hide();
                }                
            }   
        } 
        else if (Transferencias.tipoServicio == 'HOSP' || Transferencias.tipoServicio == 'UCI') {
            if (aten.llegoAlServicio == 0) {
                console.log('ddd');
                await Transferencias.ListarCamasEspera(aten.IdServicioActual, aten.IdPaciente, aten.IdCamaActual);
                $('#cboServicioEsperaTransferencia').val(Variables.IdServicio);
                $("#EstanciaServicioActual").hide();
            } else {
                await Transferencias.ListarCamas(aten.IdServicioActual);
                $('#cboServicioActualTransferencia').val(Variables.IdServicio);
                $("#EstanciaServicioPorRecepcionar").hide();
            }                
        }

            
        
        $('.chzn-select').chosen().trigger("chosen:updated");

        $("#modalTransferenciasConfirmacionHosp").modal("show");
    },

    async CargarTransferenciaConfirmacion(datos) {
        Transferencias.idEstanciaHospitalariaActual = datos.idEstanciaHospitalariaActual;
        Transferencias.ListarCamasEspera(datos.idServicioActual, datos.idPaciente, datos.idCamaActual);
        $("#modalTransferenciasConfirmacionHosp").modal("show"); 
    },

    async ModificarTransferencia () {        
        //if ($("#cboServicioActualTransferencia").val() <= 0) {
        //    alerta('info', '', 'Seleccione el Servicio actual');
        //    return false;
        //}
        if ($("#cboMedicoOrdenaTransferencia").val() <= 0) {
            alerta('info', '', 'Seleccione el Médico ordena.');
            return false;
        }
        if ($("#cboServicioRecibeTransferencia").val()  <= 0) {
            alerta('info', '', 'Seleccione el Servicio recibe.');
            return false;
        }
        /*if ($("#cboMedicoRecibeTransferencia").val()  <= 0) {
            alerta('info', '', 'Seleccione el Médico recibe.');
            return false;
        }*/
        if (isEmpty($("#txtFechaRecepcionTransferencia").val())) {
            alerta('info', '', 'Seleccione la Fecha de transferencia.');
            return false;
        }
        if (isEmpty($("#txtHoraRecepcionTransferencia").val())) {
            alerta('info', '', 'Seleccione la Hora de transferencia.');
            return false;
        }

        if (Transferencias.tieneCama) {
            if ($("#cboCamaDestinoTransferencia").val() <= 0) {
                if (Transferencias.tipoServicio == 'EMER') {
                    alerta('info', '', 'Seleccione una Cama destino DISPONIBLE.');
                    return false;
                }                
            }
        }

        Cargando(1);
        const transf = await Transferencias.GuardarTransferencias();
        Cargando(0);
        if (transf) {
            Transferencias.CerrarModalTransferencias();
            if (Transferencias.tipoServicio == 'EMER') {   
                window.location.href = '../Emergencia/Emergencia/' + Variables.IdServicio;
                //window.location.href = '../t_atencion/' + Transferencias.idServicioTransferido;
                //AdmisionEmergencia.ListarAtenciones(AdmisionEmergencia.tipoBusqueda);
                //ReposicionarVista();
            }
            /*if (Transferencias.tipoServicio == 'HOSP') {
                AdmisionHospitalizacion.ListarAtenciones(AdmisionHospitalizacion.tipoBusqueda);
                ReposicionarVista();
            }
            if (Transferencias.tipoServicio == 'UCI') {
                EvaluacionesUCI.ListarAtenciones();
                ReposicionarVista();
            }*/
        }
       
        
    },

    async ModificarCamaActual() {
        var idCama = $('#cboCamaActualTransferencia').val();
        if (idCama > 0) {
            const resp = await Transferencias.GuardarCamaActualPaciente(Transferencias.idEstanciaHospitalariaActual, idCama);
            if (resp) {
                //AdmisionEmergencia.ListarAtenciones();
                //$("#modalTransferencias").modal("hide");
                if (Transferencias.tipoServicio == 'EMER') {
                    window.location.href = '../EvaluacionEmergencia/' + Variables.IdAtencion;
                    //AdmisionEmergencia.ListarAtenciones(AdmisionEmergencia.tipoBusqueda);
                }
                /*if (Transferencias.tipoServicio == 'HOSP') {
                    AdmisionHospitalizacion.ListarAtenciones(AdmisionHospitalizacion.tipoBusqueda);
                }
                if (Transferencias.tipoServicio == 'UCI') {
                    EvaluacionesUCI.ListarAtenciones();
                }*/
                Transferencias.CerrarModalTransferenciasConfirmacion();
                //eposicionarVista();
            }
        } else {
            alerta('warning', '', 'Seleccione una cama DISPONIBLE.');
        }        
    },
        
    CerrarModalTransferencias() {
        Transferencias.LimpiarModalTransferencias();
        $("#modalTransferenciasHosp").modal("hide");
    },

    CerrarModalTransferenciasConfirmacion() {
        Transferencias.idEstanciaHospitalariaActual = 0;
        $("#cboServicioActualTransferencia").val(0);
        $("#cboCamaActualTransferencia").val(0);

        $('#cboServicioEsperaTransferencia').val(0);
        $('#cboCamaEsperaTransferencia').val(0);
        $('.chzn-select').chosen().trigger("chosen:updated");

        $("#modalTransferenciasConfirmacionHosp").modal("hide");
    },

    LimpiarModalTransferencias() {
        DTTransferencias.clear().draw();
        $('#cboMedicoOrdenaTransferencia').val(0);
        $('#cboMedicoRecibeTransferencia').val(0);
        $('#cboServicioRecibeTransferencia').val(0);
        $('.chzn-select').chosen().trigger("chosen:updated");
        //Variables.Limpiar();
    },

    async GuardarCamaActualPaciente(idEstanciaHosp, idCama) {
        let resp = false;
        let datos;
        DTTransferencias.clear().draw();
        var midata = new FormData();

        midata.append('_token', $("meta[name='csrf-token']").attr("content"));
        midata.append('idEstanciaHosp', idEstanciaHosp);
        midata.append('idCama', idCama);

        try {
            Cargando(1);
            datos = await
                $.ajax({
                    method: "POST",
                    url: "/Transferencia/ModificarCamaEstanciaHospitalaria",
                    data: midata,
                    dataType: "json",
                    cache: false,
                    processData: false,
                    contentType: false,
                });
            Cargando(0);
            resp = true;
            alerta('success', '', 'La cama del paciente se guardó correctamente.');
        } catch (error) {
            alerta('danger', '', error);
        }

        return resp;
    },

    async ConfirmarLlegadaAlServicio(idEstanciaHosp, idCama) {
        let resp = false;
        let datos;
        DTTransferencias.clear().draw();
        var midata = new FormData();

        midata.append('_token', $("meta[name='csrf-token']").attr("content"));
        midata.append('idEstanciaHosp', idEstanciaHosp);        
        midata.append('idCama', idCama);

        try {
            Cargando(1);
            datos = await
                $.ajax({
                    method: "POST",
                    url: "/Transferencia/ModificarEstanciaHospitalariaLlegada",
                    data: midata,
                    dataType: "json",
                    cache: false,
                    processData: false,
                    contentType: false,
                });
            Cargando(0);
            resp = true;
            alerta('success', '', 'Se confirmó la llegada del paciente al servicio.');
        } catch (error) {
            alerta('danger', '', error);
        }

        return resp;
    },

    async ListarTransferencias() {
        
        let datos;
        DTTransferencias.clear().draw();
        var midata = new FormData();
        
        midata.append('_token', $("meta[name='csrf-token']").attr("content"));
        midata.append('idAtencion', Variables.IdAtencion);        
        midata.append('secuenciaMayorA', 1);

        try {
            Cargando(1);
            datos = await
            $.ajax({
                method: "POST",
                url: "/Transferencia/ListarTransferencias",
                data: midata,
                dataType: "json",
                cache: false,
                processData: false,
                contentType: false,
            });
            Cargando(0);
            if (datos.resultado.length > 0) {
                DTTransferencias.clear().draw();
                DTTransferencias.rows.add(datos.resultado).draw(false);
            }
        } catch (error) {
            alerta(3, error);
        }
                
    },

    /*async ListarMedicos() {
        var midata = new FormData();
        let datos;
        midata.append('_token', $("meta[name='csrf-token']").attr("content"));
        midata.append('idEspecialidad', Transferencias.idEspecialidad);
        try {
            datos = await
                $.ajax({
                    method: "POST",
                    url: "/Transferencia/ListarMedicosPorFiltro",
                    data: midata,
                    dataType: "json",
                    cache: false,
                    processData: false,
                    contentType: false,
                });

            $('#cboMedicoOrdenaTransferencia').empty();
            $('#cboMedicoRecibeTransferencia').empty();
            $(datos.resultado.table).each(function (i, obj) {
                $('#cboMedicoOrdenaTransferencia').append('<option value="' + obj.idMedico + '">' + obj.apellidoPaterno + ' ' + obj.apellidoMaterno + ' ' + obj.nombres + '</option>');
                $('#cboMedicoRecibeTransferencia').append('<option value="' + obj.idMedico + '">' + obj.apellidoPaterno + ' ' + obj.apellidoMaterno + ' ' + obj.nombres + '</option>');
            });
            $('#cboMedicoOrdenaTransferencia').val(0);
            $('#cboMedicoRecibeTransferencia').val(0);
            $('.chzn-select').chosen().trigger("chosen:updated");
        } catch (error) {
            alerta(3, error);
        }
    },*/

    async ListarServicios(tipoServicio) {
        var midata = new FormData();
        let datos;

        if (tipoServicio == "EMER") {
            filtro = ' (2,4) ORDER BY dbo.TiposServicio.Descripcion,dbo.Servicios.Nombre';
        } else if (tipoServicio = "HOSP") {
            filtro = ' (3) ORDER BY dbo.TiposServicio.Descripcion,dbo.Servicios.Nombre';
        }
        midata.append('_token', $("meta[name='csrf-token']").attr("content"));
        midata.append('filtro', filtro);
        try {
            datos = await
                $.ajax({
                    method: "POST",
                    url: "/Transferencia/ServiciosDelHospitalFiltro",
                    data: midata,
                    dataType: "json",
                    cache: false,
                    processData: false,
                    contentType: false,
                });

                $('#cboServicioRecibeTransferencia').empty();
                $('#cboServicioActualTransferencia').empty();
                $('#cboServicioEsperaTransferencia').empty();
                $(datos.resultado).each(function (i, obj) {
                    $('#cboServicioRecibeTransferencia').append('<option value="' + obj.IdServicio + '">' + obj.DservicioHosp + '</option>');
                    $('#cboServicioActualTransferencia').append('<option value="' + obj.IdServicio + '">' + obj.DservicioHosp + '</option>');
                    $('#cboServicioEsperaTransferencia').append('<option value="' + obj.IdServicio + '">' + obj.DservicioHosp + '</option>');
                });
                $('#cboServicioRecibeTransferencia').val(0);
                $('#cboServicioActualTransferencia').val(0);
                $('#cboServicioEsperaTransferencia').val(0);
                $('.chzn-select').chosen().trigger("chosen:updated");
        } catch (error) {
            alerta(3, error);
        }
    },

    async ListarCamas(idServicio) {
        var midata = new FormData();
        let datos;
        var isDisabled;
          
        midata.append('_token', $("meta[name='csrf-token']").attr("content"));
        midata.append('idServicio', idServicio);
        try {
            datos = await
                $.ajax({
                    method: "POST",
                    url: "/Transferencia/ListarCamasPorServicio",
                    data: midata,
                    dataType: "json",
                    cache: false,
                    processData: false,
                    contentType: false,
                });

            $('#cboCamaActualTransferencia').empty();                
            $(datos.resultado).each(function (i, obj) {
                if (obj.IdPaciente != Variables.IdPaciente) {
                    if (obj.IdCama == -1) {
                        isDisabled = 'disabled'
                    }
                    $('#cboCamaActualTransferencia').append('<option ' + isDisabled + ' value="' + obj.IdCama + '">' + obj.Paciente + '</option>');
                } else {
                    $('#cboCamaActualTransferencia').append('<option ' + isDisabled + ' value="' + Transferencias.idCamaActual + '">' + obj.Paciente + '</option>');
                }
                
                isDisabled = '';
            });
            $('#cboCamaActualTransferencia').val(Transferencias.idCamaActual);
            $('.chzn-select').chosen().trigger("chosen:updated");
        } catch (error) {
            alerta(3, error);
        }
    },

    async ListarCamasEspera(idServicio, idPaciente, idCama) {
        var midata = new FormData();
        let datos;
        var isDisabled;

        midata.append('_token', $("meta[name='csrf-token']").attr("content"));
        midata.append('idServicio', idServicio);
        try {
            datos = await
                $.ajax({
                    method: "POST",
                    url: "/Transferencia/ListarCamasPorServicio",
                    data: midata,
                    dataType: "json",
                    cache: false,
                    processData: false,
                    contentType: false,
                });

            $('#cboCamaEsperaTransferencia').empty();
            if (datos.resultado.length > 0) {
                Transferencias.tieneCama = true;
                $('#CamasEspera').show();
                $(datos.resultado).each(function (i, obj) {
                    if (obj.IdPaciente != idPaciente) {
                        if (obj.idCama == -1) {
                            isDisabled = 'disabled'
                        }
                        $('#cboCamaEsperaTransferencia').append('<option ' + isDisabled + ' value="' + obj.IdCama + '">' + obj.Paciente + '</option>');
                    } else {
                        $('#cboCamaEsperaTransferencia').append('<option ' + isDisabled + ' value="' + idCama + '">' + obj.Paciente + '</option>');                        
                    }                                       
                    isDisabled = '';
                });
                $('#cboCamaEsperaTransferencia').val(idCama);
            } else {
                Transferencias.tieneCama = false;
                $('#CamasEspera').hide();
            }

            
            $('.chzn-select').chosen().trigger("chosen:updated");
        } catch (error) {
            alerta(3, error);
        }
    },

    async ListarCamasDestinos(idServicio) {
        var midata = new FormData();
        let datos;
        var isDisabled;

        midata.append('_token', $("meta[name='csrf-token']").attr("content"));
        midata.append('idServicio', idServicio);
        try {
            datos = await
                $.ajax({
                    method: "POST",
                    url: "/Transferencia/ListarCamasPorServicio",
                    data: midata,
                    dataType: "json",
                    cache: false,
                    processData: false,
                    contentType: false,
                });

            $('#cboCamaDestinoTransferencia').empty();
            //console.log(datos);
            //console.log(datos.lsResultado.length);
            if (datos.resultado.length > 0) {
                Transferencias.tieneCama = true;
                $('#CamasDestino').show();
                $(datos.resultado).each(function (i, obj) {
                    if (obj.IdCama == -1) {
                        isDisabled = 'disabled'
                    }
                    $('#cboCamaDestinoTransferencia').append('<option ' + isDisabled + ' value="' + obj.IdCama + '">' + obj.Paciente + '</option>');
                    isDisabled = '';
                });
                $('#cboCamaDestinoTransferencia').val(0);
            } else {
                Transferencias.tieneCama = false;
                $('#CamasDestino').hide();
            }
            
            $('.chzn-select').chosen().trigger("chosen:updated");
        } catch (error) {
            alerta(3, error);
        }
    },

    async SeleccionarAtencion(idAtencion) {
        var midata = new FormData();
        let datos;
        var resp = null;

        midata.append('_token', $("meta[name='csrf-token']").attr("content"));
        midata.append('IdAtencion', idAtencion);
        try {
            datos = await
                $.ajax({
                    method: "POST",
                    url: "/Transferencia/SeleccionarAtencionHospi",
                    data: midata,
                    dataType: "json",
                    cache: false,
                    processData: false,
                    contentType: false,
                });
                
                resp = datos.resultado[0];
        } catch (error) {
            alerta(3, error);
        }

        return resp;
    },

    async GuardarTransferencias() {
        //Cargando(1);
        var respuesta;
        var resp = false;
        let datos;
        var formData = new FormData();

        formData.append('_token', $("meta[name='csrf-token']").attr("content"));
        formData.append('idAtencion', Variables.IdAtencion);
        formData.append('idPaciente', Variables.IdPaciente);
        formData.append('idMedicoOrden', $('#cboMedicoOrdenaTransferencia').val());
        // formData.append('idMedicoRecibe', $('#cboMedicoRecibeTransferencia').val() == null ? 0 : $('#cboMedicoRecibeTransferencia').val());
        formData.append('fecha', $('#txtFechaRecepcionTransferencia').val());
        formData.append('hora', $('#txtHoraRecepcionTransferencia').val());
        formData.append('idCama', $('#cboCamaDestinoTransferencia').val() == null ? 0 : $('#cboCamaDestinoTransferencia').val());
        formData.append('idServicio', $('#cboServicioRecibeTransferencia').val());

        Transferencias.idServicioTransferido = $('#cboServicioRecibeTransferencia').val();
        
        try {
            datos = await
                $.ajax({
                    method: "POST",
                    url: "/Transferencia/GuardarTransferencias",
                    data: formData,
                    dataType: "json",
                    cache: false,
                    processData: false,
                    contentType: false,
                });

                if (datos.resultado == 1) {
                    resp = true;
                    alerta('success', '', 'La transferencia se guardó correctamente.');

                } else {
                    alerta('error', '', datos.msj)
                }
        } catch (error) {
            //console.error(error)
            alerta('danger', '', error);
        }

        //return datos;
        return resp;
    },

    /// <summary>
    /// DATATABLES
    /// </summary>
    /// INICIALIZA DATA TABLE DE TRANSFERENCIAS
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    initDatables() {       

        DTTransferencias = $("#tblTransferencias").DataTable(
            {
                scrollY: "250px",
                scrollCollapse: true,
                autoWidth: false,
                ordering: false,
                //deferRender: true,
                //scroller: true,
                data: null,
                destroy: true,
                info: false,
                bFilter: false,
                paging: false,
                responsive: true,
                columns: [
                    {
                        width: '10%',
                        targets: 0,
                        data: null,
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).attr('align', 'left')
                            $(td).html(FormatearFecha(rowData.FechaOcupacion));
                        }
                    },              
                    {
                        width: '10%',
                        targets: 1,
                        data: 'HoraOcupacion',
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).attr('align', 'left')                        
                        }
                    },
                    {
                        width: '10%',
                        targets: 2,
                        data: "CodigoCama",
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).attr('align', 'left')
    
                        }
                    },
                    {
                        width: '20%',
                        targets: 3,
                        data: 'NombreServicio',
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).attr('align', 'left')                        
                        }
                    },
                    {
                        width: '25%',
                        targets: 4,
                        data: "NombreMedicoOrigen",
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).attr('align', 'left')
                        }
                    },       
                    {
                        width: '25%',
                        targets: 5,
                        data: "NombreMedico",
                        createdCell: function (td, cellData, rowData, row, col) {
                            $(td).attr('align', 'left')
                        }
                    },  
    
                ]
    
            }
        );


    },
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}

/*
$(document).ready(function () {
    Transferencias.cargaInicial();
});*/