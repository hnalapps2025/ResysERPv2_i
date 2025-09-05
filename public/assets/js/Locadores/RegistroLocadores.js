

var Locadores = {
    ValidarBotonClick: 0, //0: consultar movimiento // 1: agregar locador // 
    // 2: agregar movimiento // 3: modificar movimiento // 4: agregar periodo //
    // 5: modificar locador // 6: consultar locador // 7: modificar periodo 
    // 8: consultar periodo
    roles: 1, //1: oea // 2: oepe //3: logistica// 4: economia
    TieneReemplazo: 0,

    Plugins() {
        $('#txtFechaInicioBusq, #txtFechaFinBusq, #FechaInicio, #FechaFin, #FechaInicioReemplazo, #FechaFinReemplazo, #FechaRecepcionOEPE, #FechaRecepcionLogistica, #FechaRecepcionEconomia, #FechaFinReemplazo, #FechaGiradoReemplzConsulta, #FechaDevengadoReemplzConsulta,#FechaInicioPeriodoMasivo,#FechaTerminoPeriodoMasivo,#FechaTerminoPrest,#FechaTerminoPrestReemplzConsulta')
        .datepicker({
            todayHighlight: true,
            autoclose: true,
            dateFormat: "dd/mm/yy",
            orientation: "bottom"
        });
    },

    InitialCharge () {
        $("#btnLimpiar").trigger('click');
        
        // let fecha = new Date();
        // let dia = fecha.getDate();
        // let mes = parseInt(fecha.getMonth()) + 1;
        // let yyy = fecha.getFullYear();
        // if (dia < 10) dia = "0" + dia;
        // if (mes < 10) mes = "0" + mes;
        // let fechaP = dia + "/" + mes + "/" + yyy;
        
        // $("#txtFechaInicioBusq").datepicker("setDate", "01/"+ mes + "/" + yyy);
        // $("#txtFechaFinBusq").datepicker("setDate", fechaP);
        // $("#txtNombresBusq").val("to")
        $("#btnBuscar").trigger('click');
    },

    async ListarLocadoresFiltrar(FechaInicio,FechaFin,NroOrdenServicio,Nombres,AreaUsuaria,Unidad,NroDocumento,SinTermino) {

        oTable_Locadores.fnClearTable()
        oTable_ListaPeriodosDetalle.fnClearTable()
        oTable_ListaMovimientosDetalle.fnClearTable()

        Locadores.Cargando();
        await
        fetch(
            `/locadores/ListarLocadoresFiltrar?FechaInicio=${FechaInicio}&FechaFin=${FechaFin}&NroOrdenServicio=${NroOrdenServicio}&Nombres=${Nombres}&AreaUsuaria=${AreaUsuaria}&Unidad=${Unidad}&NroDocumento=${NroDocumento}&SinTermino=${SinTermino}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
            .then((res) => res.json())
            .catch((error) => {
                Swal.close();
                console.log(error)
                toastr.error(error,"ERROR")
            })
            .then((res) => {
                
                if (res.resultado == 1) {
                    if (res.data.length > 0) {
                        oTable_Locadores.fnAddData(res.data);
                        
                    }
                }
                else{
                    toastr.error(res.mensaje,"ERROR");
                    if(res.resultado==3)
                        location.reload();
                }
            });

        Swal.close();
    },

    async ListarLocadorPorId(IdLocador) {

        await
        fetch(
            `/locadores/ListarLocadorPorId?IdLocador=${IdLocador}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
            .then((res) => res.json())
            .catch((error) => {
                console.log(error)
                toastr.error(error,"ERROR")
            })
            .then((res) => {
                
                if (res.resultado == 1) {
                    // if(Locadores.ValidarBotonClick == 5 || Locadores.ValidarBotonClick == 6){

                        $('#txt_Ruc').val(res.data.Ruc)
                        $('#txt_IdDocIdentidad').val(res.data.IdDocIdentidad)
                        $('#txt_NroDocumento').val(res.data.NroDocumento)
                        $('#txt_Nombres').val(res.data.Nombres)
                    // }
                    // else{

                    //     $('#Ruc').val(res.data.Ruc)
                    //     $('#IdDocIdentidad').val(res.data.IdDocIdentidad)
                    //     $('#NroDocumento').val(res.data.NroDocumento)
                    //     $('#Nombres').val(res.data.Nombres)
                    //     $('#Perfil').val(res.data.Perfil)
                    //     $('#FormacionAcademica').val(res.data.FormacionAcademica)
                    // }
                    
                }
                else{
                    toastr.error(res.mensaje,"ERROR");
                    if(res.resultado==3)
                        location.reload();
                }
            });

    },

    async ListarUnidades(id,AreaUsuaria){

        $(id).empty();
        $(id).append('<option value="" selected>Seleccione</option>').trigger("chosen:updated")
        
        await
        $.ajax({
            url: `/locadores/buscarUnidad?AreaUsuaria=${AreaUsuaria}`,
            datatype: "json",
            type: "get",
            async: false,
            success: function(res) {
                
                res.data.forEach(function(item) {
                    $(id).append(`<option value="${item.codigo}">${item.Descripcion}</option>`);
                });

                $('.chzn-select').chosen().trigger("chosen:updated")
            }
        });

    },

    async FormLocadores(data) {
        Locadores.Cargando();

        if ($("#chkReemplazo").is(":checked")&& !($("#chkReemplazo").is(":disabled"))){
            data.append("chkReemplazo", 1);
        } else {
            data.append("chkReemplazo", 0);
        }

        data.append('_token',$('[name="_token"]').val());
        
        let url='/locadores/rs_agrega_movimiento'
        if(Locadores.ValidarBotonClick==1)
            url='/locadores/rs_crea_registro_locador'
        if(Locadores.ValidarBotonClick==3)
            url='/locadores/rs_modifica_movimiento'
        if(Locadores.ValidarBotonClick==4)
            url='/locadores/rs_agrega_periodo'
        if(Locadores.ValidarBotonClick==5)
            url='/locadores/rs_modifica_locador'
        if(Locadores.ValidarBotonClick==7)
            url='/locadores/rs_modifica_periodo'
        console.log(url)
        await
        $.ajax({
            url: url,
            datatype: "json",
            data: data,
            type: "post",
            processData: false,
            contentType: false,
            async: false,
            success: function (res) {
                
                if(res.resultado==1){
    
                    toastr.success(res.mensaje)
                    
                    $('#modalRegistroLocadores').modal('hide')
                    if(Locadores.ValidarBotonClick==2 || Locadores.ValidarBotonClick==3){
                        Locadores.ListarDetalleMovimientos($("#IdPeriodo").val());
                    }
                    else if(Locadores.ValidarBotonClick==4 || Locadores.ValidarBotonClick==7){
                        Locadores.ListarPeriodos($("#IdLocador").val());
                        oTable_ListaMovimientosDetalle.fnClearTable();
                    }
                    else{
                        Locadores.InitialCharge()
                        oTable_ListaPeriodosDetalle.fnClearTable();
                        oTable_ListaMovimientosDetalle.fnClearTable();
                    }
                }
                else{
                    toastr.error(res.mensaje,"ERROR");
                    if(Locadores.ValidarBotonClick==2){
                        Locadores.ListarDetalleMovimientos($("#IdMovimiento").val());
                    }
                    if(res.resultado==3)
                        location.reload();
                }

            },
            error: function (msg) {
                console.log("error:",msg)
                Swal.close();
                message = "";
                if(msg['responseJSON']['message'])
                    message = msg['responseJSON']['message'];
                toastr.error(`Error al guardar el registro! ${message}`,"ERROR");
            }
        });

        Swal.close();
    },

    async FormPeriodoMasivo(data) {
        Locadores.Cargando();

        const IdLocadorMasivo = new Array();
        
        $(".listaLocadores td input[type=checkbox]").each(function(){
            if ($(this).is(":checked")) {
                const [text, id] = this.id.split("_")
                IdLocadorMasivo.push(id);
            }
        });
        
        if(IdLocadorMasivo.length==0){
            Swal.close();
            toastr.warning("Debe seleccionar al menos un locador","Aviso")
            return
        }
        let IdLocadoresConCheck = JSON.stringify(IdLocadorMasivo)

        data.append('IdLocador',IdLocadoresConCheck);
        data.append('_token',$('[name="_token"]').val());

        await
        $.ajax({
            url: '/locadores/rs_agrega_periodo_masivo',
            datatype: "json",
            data: data,
            type: "post",
            processData: false,
            contentType: false,
            async: false,
            success: function (res) {
                console.log(res)
                if(res.resultado==1){
                    
                    $('#modalPeriodoMasivo').modal('hide')
                    toastr.success(res.mensaje)
                }
                else{
                    toastr.error(res.mensaje, "ERROR");

                    if(res.resultado==3)
                        location.reload();
                }

            },
            error: function (msg) {
                console.log("error:",msg)
                Swal.close();
                message = "";
                if(msg['responseJSON']['message'])
                    message = msg['responseJSON']['message'];
                toastr.error(`Error al crear los periodos! ${message}`, "ERROR");
            }
        });

        Swal.close();
    },

    async ExportarReporte(AreaUsuaria,Unidad,Mes,Anio,IdLocador,SinTermino) {
        Locadores.Cargando();
        
        console.log(IdLocador);
        location.href=`/locadores/exportarDatos?AreaUsuaria=${AreaUsuaria}
            &Unidad=${Unidad}&Mes=${Mes}&Anio=${Anio}&IdLocador=${IdLocador}&SinTermino=${SinTermino}`;

        $('#modalExportar').modal('hide')
        /*await
        $.ajax({
            url: "/locadores/exportarDatos",
            datatype: "json",
            data: data,
            type: "post",
            processData: false,
            contentType: false,
            async: false,
            success: function (res) {
                
                if(res.resultado==1){
    
                    toastr.success(res.mensaje)
                }
                else{
                    toastr.error("ERROR1", res.mensaje);
                    
                    if(res.resultado==3)
                        location.reload();
                }

            },
            error: function (msg) {
                console.log("error:",msg)
                Swal.close();
                message = "";

                if(msg['responseJSON']['message'])
                    message = msg['responseJSON']['message'];
                toastr.error("ERROR2", `Error al exportar! ${message}`);
            }
        });*/

        Swal.close();

    },

    async EliminarRegistro(IdRegistro,Motivo,registro){
        Locadores.Cargando();

        let url= ""
        if(registro==1)
        url=`/locadores/EliminarLocador?IdLocador=${IdRegistro}&Motivo=${Motivo}`
        if(registro==2)
        url=`/locadores/EliminarPeriodo?IdPeriodo=${IdRegistro}&Motivo=${Motivo}`
        if(registro==3)
        url=`/locadores/EliminarMovimiento?IdMovimiento=${IdRegistro}&Motivo=${Motivo}`

        await 
        $.ajax({
            url: url,
            datatype: "json",
            type: "get",
            async: false,
            success: function (res) {
                if(res.resultado==1){
                    toastr.success(res.mensaje);
                    
                    oTable_Locadores.fnClearTable();
                    oTable_ListaPeriodosDetalle.fnClearTable();
                    oTable_ListaMovimientosDetalle.fnClearTable();
                    Locadores.InitialCharge()
                }
                else{
                    toastr.error(res.mensaje,"ERROR");
                    if(res.resultado==3)
                        location.reload();
                }
            },
            error: function (msg) {
                console.log(msg)
                toastr.error("Error al eliminar el registro!","ERROR");
            }
        });

        Swal.close();
    },

    async buscarUltimoDestino(IdPeriodo,IdRol){

        let resultado= 1;
        let area = 0;

        await 
        fetch(
            `/locadores/buscarUltimoDestino?IdPeriodo=${IdPeriodo}&IdRol=${IdRol}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
            .then((res) =>res.json())
            .then((res) => {
                if (res.resultado == 1) {
                    resultado = 1;
                    area= res.area;
                }
                else{
                    toastr.warning(res.mensaje)
                    resultado = 2;
                }
            })
            .catch((error) => {
                toastr.error(error,"ERROR")
                resultado = 2;
            });
        
        return [resultado,area];
    },

    async buscarIdLocador(
        IdDocIdentidad,
        NroDocumento,
        IdLocador,
        Nombres,
        Ruc,
        FormacionAcademica,
        Perfil,
        AreaUsuaria,
        Unidad,
        Concepto,
        TipoServicio,
        Ff,
        Ppr,
        MontoAprMensual
        ){
        
        await
        $.ajax({
            url: `/locadores/buscarIdLocador?IdDocIdentidad=${IdDocIdentidad}&NroDocumento=${NroDocumento}`,
            datatype: "json",
            type: "get",
            async: false,
            success: function (res) {
                
                if(res.resultado==3){
                    toastr.error(mensaje,"ERROR");
                    location.reload();
                }
                else{
                    
                    $(IdLocador).val(res.data.IdLocador);
                    $(Nombres).val(res.data.Nombres);
                    $(Ruc).val(res.data.Ruc);
                    $(FormacionAcademica).val(res.data.FormacionAcademica);
                    $(Perfil).val(res.data.Perfil);
                    $(AreaUsuaria).val(res.data.AreaUsuaria);
                    $(Unidad).val(res.data.Unidad);
                    $(Concepto).val(res.data.Concepto);
                    $(TipoServicio).val(res.data.TipoServicio);
                    $(Ff).val(res.data.Ff);
                    $(Ppr).val(res.data.Ppr);
                    $(MontoAprMensual).val(res.data.MontoAprMensual);

                    $(".chzn-select").trigger("chosen:updated");
                }

            },
            error: function (msg) {
                console.log(msg)
                toastr.error("Error listar locador!","ERROR");
            }
        });
    },

    async ListarMovimientoReemplazo(IdPeriodo) {

        await
        $.ajax({
            url: `/locadores/ListarMovimientoPorArea?IdPeriodo=${IdPeriodo}`,
            datatype: "json",
            type: "get",
            async: false,
            success: function (res) {
                if(res.resultado==1){

                    /*if(Area==1){    // OEA

                        $("#AreaDestinoOEAReemplzConsulta").val(res.data.AreaDestino);
                        $("#AreaUsuariaReemplzConsulta").val(res.data.AreaUsuaria);
                        $("#UnidadReemplzConsulta").val(res.data.Unidad);
                        $("#ConceptoReemplzConsulta").val(res.data.Concepto);
                        $("#TipoServicioReemplzConsulta").val(res.data.TipoServicio);*/
                        $("#IdDocIdentidadReemplzConsulta").val(res.data.IdDocIdentidad);
                        $("#NroDocumentoReemplzConsulta").val(res.data.NroDocumento);
                        $("#NombresReemplzConsulta").val(res.data.Nombres);
                        $("#RucReemplzConsulta").val(res.data.Ruc);
                        $("#FormacionAcademicaReemplzConsulta").val(res.data.FormacionAcademica);
                        $("#PerfilReemplzConsulta").val(res.data.Perfil);
                        $("#FechaInicioReemplzConsulta").val(res.data.FechaInicio);
                        $("#FechaFinReemplzConsulta").val(res.data.FechaFin);
                        $("#PeriodoReemplzConsulta").val(res.data.Periodo);
                        $("#PeriodoDescReemplzConsulta").val(res.data.PeriodoDesc);
                        /*$("#FfReemplzConsulta").val(res.data.Ff);
                        $("#PprReemplzConsulta").val(res.data.Ppr);
                        $("#MontoAprMensualReemplzConsulta").val(res.data.MontoAprMensual);
                        $("#ObservacionesOEAReemplzConsulta").val(res.data.Observaciones);

                        let FechaRegistroOEAReemplzConsulta = res.data.FechaRegistro
                        if(FechaRegistroOEAReemplzConsulta == null){
                            $("#FechaRegistroOEAReemplzConsulta").text("");
                        }
                        else{
                            $("#FechaRegistroOEAReemplzConsulta").text(FechaRegistroOEAReemplzConsulta);
                        }
                    }

                    if(Area==2){    // OEPE
                        let FechaRegistroOEPEReemplzConsulta = res.data.FechaRegistro
                        if(FechaRegistroOEPEReemplzConsulta == null){
                            $("#FechaRegistroOEPEReemplzConsulta").text("");
                        }
                        else{
                            $("#FechaRegistroOEPEReemplzConsulta").text(FechaRegistroOEPEReemplzConsulta);
                        }

                        $("#MarcoPresupuestalReemplzConsulta").val(res.data.MarcoPresupuestal);
                        $("#DispositivoAltaReemplzConsulta").val(res.data.DispositivoAlta);
                        $("#NroCertificacionOEPEReemplzConsulta").val(res.data.NroCertificacion);
                        $("#FechaRecepcionOEPEReemplzConsulta").val(res.data.FechaRecepcion);
                        $("#ObservacionesOEPEReemplzConsulta").val(res.data.Observaciones);
                    }

                    if(Area==3){    // Logistica
                        let FechaRegistroLogisticaReemplzConsulta = res.data.FechaRegistro
                        if(FechaRegistroLogisticaReemplzConsulta == null){
                            $("#FechaRegistroLogisticaReemplzConsulta").text("");
                        }
                        else{
                            $("#FechaRegistroLogisticaReemplzConsulta").text(FechaRegistroLogisticaReemplzConsulta);
                        }

                        $("#NroCertificacionLogisticaReemplzConsulta").val(res.data.NroCertificacion);
                        $("#FechaRecepcionLogisticaReemplzConsulta").val(res.data.FechaRecepcion);
                        $("#NroOrdenServicioReemplzConsulta").val(res.data.NroOrdenServicio);
                        $("#NroSiafReemplzConsulta").val(res.data.NroSiaf);
                        $("#ObservacionesLogisticaReemplzConsulta").val(res.data.Observaciones);
                    }
                    if(Area==4){    // Economia
                        $("#FechaRecepcionEconomiaReemplzConsulta").val(res.data.FechaRecepcion);
                        $("#ObservacionesEconomiaReemplzConsulta").val(res.data.Observaciones);
                        
                        if(res.Meses.length>0){
                            res.Meses.forEach((el,i) => {
                                if(i==0){

                                    $("#MesReemplzConsulta").val(el.Mes);
                                    $("#DevengadoReemplzConsulta").val(el.Devengado);
                                    $("#GiradoReemplzConsulta").val(el.Girado);
                                }
                                else{

                                    let div_dinamico = ".div-nuevomes-reemplazo"
                                    if ($(div_dinamico).length == 0)
                                        div_dinamico = "#div-mes-reemplazo"
                                    
                                    $(div_dinamico).last().after(`
                                        <div class="row mt-1 div-nuevomes-reemplazo">
                                            <div class="col-lg-2">
                                                <div class="input-group input-group-sm">
                                                    <select class="form-control bloquear-campo-economia" id="MesReemplzConsulta_${i}">
                                                        <option value="">Seleccione el Mes</option>
                                                        <option value="1">Enero</option>
                                                        <option value="2">Febrero</option>
                                                        <option value="3">Marzo</option>
                                                        <option value="4">Abril</option>
                                                        <option value="5">Mayo</option>
                                                        <option value="6">Junio</option>
                                                        <option value="7">Julio</option>
                                                        <option value="8">Agosto</option>
                                                        <option value="9">Setiembre</option>
                                                        <option value="10">Octubre</option>
                                                        <option value="11">Noviembre</option>
                                                        <option value="12">Diciembre</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-lg-2">
                                                <div class="input-group input-group-sm">
                                                    <input type="text" class="form-control bloquear-campo-economia" id="DevengadoReemplzConsulta" value=${el.Devengado} autocomplete="off" maxlength="9">
                                                </div>
                                            </div>
                                            <div class="col-lg-2">
                                                <div class="input-group-sm">
                                                    <input type="date" class="form-control bloquear-campo-economia" id="FechaDevengadoReemplzConsulta" autocomplete="off" maxlength="10">
                                                </div>
                                            </div>
                                            <div class="col-lg-2">
                                                <div class="input-group input-group-sm">
                                                    <input type="text" class="form-control bloquear-campo-economia" id="GiradoReemplzConsulta" value=${el.Girado} autocomplete="off" maxlength="9">
                                                </div>
                                            </div>
                                            <div class="col-lg-2">
                                                <div class="input-group-sm">
                                                    <input type="date" class="form-control bloquear-campo-economia" id="FechaGiradoReemplzConsulta" autocomplete="off" maxlength="10">
                                                </div>
                                            </div>
                                            <div class="col-lg-2">
                                                <button id="btnQuitarFila" type="button" class="btn btn-sm btn-danger" style="width: 37px;">
                                                    <i class="fa fa-trash" style="width: 20px; text-align:center;"></i>
                                                </button>
                                            </div>
                                        </div>
                                    `)

                                    $("#MesReemplzConsulta_"+i).val(el.Mes);
                                }
                            });

                        }
                    }*/

                    $(".chzn-select").trigger("chosen:updated");
                }
                else{
                    toastr.error(res.mensaje,"ERROR");
                    if(res.resultado==3)
                        location.reload();
                }
            },
            error: function (msg) {
                console.log(msg)
                toastr.error("Error listar locador!","ERROR");
            }
        });

    },

    async ListarPeriodos(IdLocador) {
        Locadores.Cargando();
        $("#IdLocador").val(IdLocador);

        oTable_ListaPeriodosDetalle.fnClearTable();
        
        await fetch(
            `/locadores/ListarPeriodosPorIdLocador?IdLocador=${IdLocador}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
            .then((res) =>res.json())
            .then((res) => {
                if (res.resultado == 1) {
                    if (res.data.length > 0) {
                        oTable_ListaPeriodosDetalle.fnAddData(res.data);
                    }
                }
                else{
                    toastr.error(mensaje,"ERROR")
                }
            })
            .catch((error) => {
                Swal.close();
                toastr.error(error,"ERROR")
            });

        Swal.close();
    },

    async ListarDetallePeriodo(IdPeriodo) {
        
        await fetch(
            `/locadores/ListarPeriodosPorIdPeriodo?IdPeriodo=${IdPeriodo}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
            .then((res) =>res.json())
            .then((res) => {
                
                if (res.resultado == 1) {
                    let IdPeriodoReemplz = res.data.IdPeriodoReemplz

                    $("#FormacionAcademica").val(res.data.FormacionAcademica);
                    $("#Perfil").val(res.data.Perfil);

                    $("#FechaInicio").val(res.data.FechaInicio);
                    $("#FechaFin").val(res.data.FechaFin);
                    $("#Periodo").val(res.data.Periodo);
                    $("#PeriodoDesc").val(res.data.PeriodoDesc);

                    if (IdPeriodoReemplz == null) {
                        $("#chkReemplazo").prop('checked',false);
                    }
                    else {
                        $("#chkReemplazo").prop('checked',true)
                        .prop('disabled', true)
                    }

                    if(Locadores.ValidarBotonClick ==8 && !(IdPeriodoReemplz ==null)){
                        Locadores.LimpiarCamposReemplazo()

                        Locadores.ListarMovimientoReemplazo(IdPeriodoReemplz)
                        $('#nav-LocadorReemplazo').removeClass('d-none');
                        $('.LocadorReemplazoContenedor').show()
                        $('.PeriodoReemplazoContenedor').show()
                        // $('.RegistroReemplazoOEAContenedor').show()
                    }
                }
                else{
                    toastr.error(mensaje,"ERROR")
                }
            })
            .catch((error) => {
                toastr.error(error,"ERROR")
            });

    },

    async ListarDetalleMovimientos(IdPeriodo) {
        Locadores.Cargando();
        
        oTable_ListaMovimientosDetalle.fnClearTable();
        
        await fetch(
            `/locadores/ListarMovimientosPorId?IdPeriodo=${IdPeriodo}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
            .then((res) =>res.json())
            .then((res) => {
                if (res.resultado == 1) {
                    if (res.data.length > 0) {
                        oTable_ListaMovimientosDetalle.fnAddData(res.data);
                    }
                }
                else{
                    toastr.error(mensaje,"ERROR")
                }
            })
            .catch((error) => {
                toastr.error(error,"ERROR")
            });

        Swal.close();
    },

    ListarMovimientosPorId: async (IdPeriodo)=>{
        Locadores.Cargando();

        await
        fetch(
            `/locadores/ListarMovimientosPorId?IdPeriodo=${IdPeriodo}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
            .then((res) =>res.json())
            .then((res) => {
                if (res.resultado == 1) {
                    if (res.data.length > 0) {
                        return res.data;
                    }
                    else {
                        return null
                    }
                }
                else{
                    return null
                }
            })
            .catch((error) => { toastr.error(error,"ERROR"); return null });

        Swal.close();
    },

    async ListarMovimientoPorArea(IdMovimiento,Area) {

        await
        $.ajax({
            url: `/locadores/ListarMovimientoPorArea?IdMovimiento=${IdMovimiento}&Area=${Area}`,
            datatype: "json",
            type: "get",
            async: false,
            success: function (res) {
                if(res.resultado==1){
                    // $("#IdPeriodo").val(res.data.IdPeriodo);
                    $("#IdMovimiento").val(IdMovimiento);
                    // let IdPeriodoReemplz = res.data.IdPeriodoReemplz

                    if(Area==1){    // OEA
                        $('.RegistroOEAContenedor').show()
                        // Locadores.ListarUnidades("#Unidad",res.data.AreaUsuaria)

                        $("#AreaDestinoOEA").val(res.data.AreaDestino);
                        $("#AreaUsuaria").val(res.data.AreaUsuaria);
                        $("#Unidad").val(res.data.Unidad);
                        $("#Concepto").val(res.data.Concepto);
                        $("#TipoServicio").val(res.data.TipoServicio);
                        $("#Ff").val(res.data.Ff);
                        $("#Ppr").val(res.data.Ppr);
                        $("#MontoAprMensual").val(res.data.MontoAprMensual);
                        $("#ObservacionesOEA").val(res.data.Observaciones);
                        
                        let FechaRegistroOEA = res.data.FechaRegistro
                        if(FechaRegistroOEA == null){
                            $("#FechaRegistroOEA").text("");
                        }
                        else{
                            $("#FechaRegistroOEA").text(FechaRegistroOEA);
                        }

                        // if (IdPeriodoReemplz == null) {
                        //     $("#chkReemplazo").attr('checked',false);
                        // }
                        // else {
                        //     $("#chkReemplazo").attr('checked',true)
                        //     $("#chkReemplazo").attr('disabled', true)
                        // }

                        if ( res.data.FechaRecepcion != null) {
                            $("#FechaRecepcionOEA").val(res.data.FechaRecepcion);
                            $("#FechaRecepcionOEA").removeClass('d-none');
                        }

                        $("#FechaRecepcionOEPE").val(res.data.FechaRecepcion);

                        // if(Locadores.ValidarBotonClick ==0 && !(IdPeriodoReemplz ==null)){
                        //     Locadores.LimpiarCamposReemplazo()

                        //     Locadores.ListarMovimientoReemplazo(IdPeriodoReemplz,Area)
                        //     $('#nav-LocadorReemplazo').removeClass('d-none');
                        //     $('.RegistroReemplazoOEAContenedor').show()
                        // }
                    }
                    if(Area==2){    // OEPE
                        $('.RegistroOEPEContenedor').show()

                        let FechaRegistroOEPE = res.data.FechaRegistro
                        if(FechaRegistroOEPE == null){
                            $("#FechaRegistroOEPE").text("");
                        }
                        else{
                            $("#FechaRegistroOEPE").text(FechaRegistroOEPE);
                        }
                        $("#AreaDestinoOEPE").val(res.data.AreaDestino);
                        $("#MarcoPresupuestal").val(res.data.MarcoPresupuestal);
                        $("#DispositivoAlta").val(res.data.DispositivoAlta);
                        $("#NroCertificacionOEPE").val(res.data.NroCertificacion);
                        $("#FechaRecepcionOEPE").val(res.data.FechaRecepcion);
                        $("#ObservacionesOEPE").val(res.data.Observaciones);

                        /*if(Locadores.ValidarBotonClick ==0 && !(IdRegistroReemplz ==null)){
                            Locadores.LimpiarCamposReemplazo()
                            
                            Locadores.ListarMovimientoReemplazo(IdRegistroReemplz)
                            $('#nav-LocadorReemplazo').removeClass('d-none');
                            $('.RegistroReemplzConsultaOEPEContenedor').show()
                        }*/
                    }
                    if(Area==3){    // Logistica
                        $('.RegistroLogisticaContenedor').show()

                        let FechaRegistroLogistica = res.data.FechaRegistro
                        if(FechaRegistroLogistica == null){
                            $("#FechaRegistroLogistica").text("");
                        }
                        else{
                            $("#FechaRegistroLogistica").text(FechaRegistroLogistica);
                        }
                        $("#AreaDestinoLogistica").val(res.data.AreaDestino);
                        $("#MontoCertificacionLogistica").val(res.data.MontoCertificacion);
                        $("#NroCertificacionLogistica").val(res.data.NroCertificacion);
                        $("#FechaRecepcionLogistica").val(res.data.FechaRecepcion);
                        $("#NroOrdenServicio").val(res.data.NroOrdenServicio);
                        $("#NroSiaf").val(res.data.NroSiaf);
                        $("#Rebaja").val(res.data.Rebaja);
                        $("#ObservacionesLogistica").val(res.data.Observaciones);

                        /*if(Locadores.ValidarBotonClick ==0 && !(IdRegistroReemplz ==null)){
                            Locadores.LimpiarCamposReemplazo()
                            
                            Locadores.ListarMovimientoReemplazo(IdRegistroReemplz)
                            $('#nav-LocadorReemplazo').removeClass('d-none');
                            $('.RegistroReemplzConsultaLogisticaContenedor').show()
                        }*/
                    }
                    if(Area==4){    // Economia
                        $('.RegistroEconomiaContenedor').show()

                        let FechaRegistroEconomia = res.data.FechaRegistro
                        if(FechaRegistroEconomia == null){
                            $("#FechaRegistroEconomia").text("");
                        }
                        else{
                            $("#FechaRegistroEconomia").text(FechaRegistroEconomia);
                        }
                        $("#FechaRecepcionEconomia").val(res.data.FechaRecepcion);
                        $("#ObservacionesEconomia").val(res.data.Observaciones);
                        $("#AreaDestinoEconomia").val(res.data.AreaDestino);
                        
                        if(res.Meses.length>0){
                            res.Meses.forEach((el,i) => {
                                if(i==0){

                                    $("#Mes").val(el.Mes);
                                    $("#Devengado").val(el.Devengado);
                                    $("#Anio").val(el.Anio);
                                    $("#Girado").val(el.Girado);
                                    $("#FechaDevengado").val(el.FechaDevengado);
                                    $("#FechaGirado").val(el.FechaGirado);
                                }
                                else{

                                    let div_dinamico = ".div-nuevomes"
                                    if ($(div_dinamico).length == 0)
                                        div_dinamico = "#div-mes"
                                    
                                    $(div_dinamico).last().after(`
                                        <div class="row mt-1 div-nuevomes">
                                            <div class="col-lg-11">
                                                <div class="row">
                                                    <div class="col-lg-2">
                                                        <div class="input-group input-group-sm">
                                                            <select class="form-control bloquear-campo-economia" id="Mes_${i}" name="Mes[]" required>
                                                                <option value="">Seleccione</option>
                                                                <option value="1">Enero</option>
                                                                <option value="2">Febrero</option>
                                                                <option value="3">Marzo</option>
                                                                <option value="4">Abril</option>
                                                                <option value="5">Mayo</option>
                                                                <option value="6">Junio</option>
                                                                <option value="7">Julio</option>
                                                                <option value="8">Agosto</option>
                                                                <option value="9">Setiembre</option>
                                                                <option value="10">Octubre</option>
                                                                <option value="11">Noviembre</option>
                                                                <option value="12">Diciembre</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-2">
                                                        <div class="input-group input-group-sm">
                                                            <input type="text" class="form-control bloquear-campo-economia" id="Anio_${i}" name="Anio[]" autocomplete="off" maxlength="4" onkeypress='return event.charCode >= 48 && event.charCode <= 57' value="${(new Date()).getFullYear()}" required>
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-2">
                                                        <div class="input-group input-group-sm">
                                                            <input type="text" class="form-control bloquear-campo-economia" id="Devengado_${i}" name="Devengado[]" autocomplete="off" maxlength="9" placeholder="0.00" onkeypress="if ( isNaN( this.value + String.fromCharCode(event.charCode) )) return false;">
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-2">
                                                        <div class="input-group-sm">
                                                            <input type="date" class="form-control bloquear-campo-economia" id="FechaDevengado_${i}" name="FechaDevengado[]" autocomplete="off">
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-2">
                                                        <div class="input-group input-group-sm">
                                                            <input type="text" class="form-control bloquear-campo-economia" id="Girado_${i}" name="Girado[]" autocomplete="off" maxlength="9" placeholder="0.00" onkeypress="if ( isNaN( this.value + String.fromCharCode(event.charCode) )) return false;">
                                                        </div>
                                                    </div>
                                                    <div class="col-lg-2">
                                                        <div class="input-group-sm">
                                                            <input type="date" class="form-control bloquear-campo-economia" id="FechaGirado_${i}" name="FechaGirado[]" autocomplete="off" maxlength="10">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-1">
                                                <button id="btnQuitarFila" type="button" class="btn btn-sm btn-danger" style="width: 37px;">
                                                    <i class="fa fa-trash" style="width: 20px; text-align:center;"></i>
                                                </button>
                                            </div>
                                        </div>
                                    `)

                                    $("#Mes_"+i).val(el.Mes);
                                    $("#Anio_"+i).val(el.Anio);
                                    $("#Devengado_"+i).val(el.Devengado);
                                    $("#FechaDevengado_"+i).val(el.FechaDevengado);
                                    $("#Girado_"+i).val(el.Girado);
                                    $("#FechaGirado_"+i).val(el.FechaGirado);
                                }
                            });

                        }

                        /*if(Locadores.ValidarBotonClick ==0 && !(IdRegistroReemplz ==null)){
                            Locadores.LimpiarCamposReemplazo()
                            
                            Locadores.ListarMovimientoReemplazo(IdRegistroReemplz)
                            $('#nav-LocadorReemplazo').removeClass('d-none');
                            $('.RegistroReemplzConsultaEconomiaContenedor').show()
                        }*/
                    }

                    $("#inputFechaFin").removeClass("d-none");
                    $(".chzn-select").trigger("chosen:updated");
                }
                else{
                    toastr.error(res.mensaje,"ERROR");
                    if(res.resultado==3)
                        location.reload();
                }
            },
            error: function (msg) {
                console.log(msg)
                toastr.error("Error listar locador!","ERROR");
            }
        });

    },

    async ListarSegundoMovimientoPorArea(IdPeriodo,Area) {

        await
        $.ajax({
            url: `/locadores/ListarSegundoMovimientoPorArea?IdPeriodo=${IdPeriodo}&Area=${Area}`,
            datatype: "json",
            type: "get",
            async: false,
            success: function (res) {
                
                if(res.resultado==1){
                    let IdPeriodoReemplz = res.data.IdPeriodoReemplz

                    if(Area==1){    // OEA
                        $('.RegistroOEAContenedor').show()
                        
                        $('#input-FechaRecepcionOEA').removeClass('d-none');
                        // Locadores.ListarUnidades("#Unidad",res.data.AreaUsuaria)

                        $("#AreaUsuaria").val(res.data.AreaUsuaria);
                        $("#Unidad").val(res.data.Unidad);
                        $("#Concepto").val(res.data.Concepto);
                        $("#TipoServicio").val(res.data.TipoServicio);
                        $("#Ff").val(res.data.Ff);
                        $("#Ppr").val(res.data.Ppr);
                        $("#MontoAprMensual").val(res.data.MontoAprMensual);

                        if (IdPeriodoReemplz == null) {
                            $("#chkReemplazo").attr('checked',false);
                        }
                        else {
                            $("#chkReemplazo").attr('checked',true)
                            $("#chkReemplazo").attr('disabled', true)
                        }

                        if(Locadores.ValidarBotonClick ==0 && !(IdPeriodoReemplz ==null)){
                            Locadores.LimpiarCamposReemplazo()

                            Locadores.ListarMovimientoReemplazo(IdPeriodoReemplz,Area)
                            $('#nav-LocadorReemplazo').removeClass('d-none');
                            $('.RegistroReemplazoOEAContenedor').show()
                        }
                    }
                    if(Area==2){    // OEPE
                        $('.RegistroOEPEContenedor').show()

                        $("#MarcoPresupuestal").val(res.data.MarcoPresupuestal);
                        $("#DispositivoAlta").val(res.data.DispositivoAlta);
                        $("#NroCertificacionOEPE").val(res.data.NroCertificacion);

                        /*if(Locadores.ValidarBotonClick ==0 && !(IdRegistroReemplz ==null)){
                            Locadores.LimpiarCamposReemplazo()
                            
                            Locadores.ListarMovimientoReemplazo(IdRegistroReemplz)
                            $('#nav-LocadorReemplazo').removeClass('d-none');
                            $('.RegistroReemplzConsultaOEPEContenedor').show()
                        }*/
                    }
                    if(Area==3){    // Logistica
                        $('.RegistroLogisticaContenedor').show()

                        $("#MontoCertificacionLogistica").val(res.data.MontoCertificacion);
                        $("#NroCertificacionLogistica").val(res.data.NroCertificacion);
                        $("#NroOrdenServicio").val(res.data.NroOrdenServicio);
                        $("#NroSiaf").val(res.data.NroSiaf);
                        $("#Rebaja").val(res.data.Rebaja);

                        /*if(Locadores.ValidarBotonClick ==0 && !(IdRegistroReemplz ==null)){
                            Locadores.LimpiarCamposReemplazo()
                            
                            Locadores.ListarMovimientoReemplazo(IdRegistroReemplz)
                            $('#nav-LocadorReemplazo').removeClass('d-none');
                            $('.RegistroReemplzConsultaLogisticaContenedor').show()
                        }*/
                    }
                    if(Area==4){    // Economia
                        $('.RegistroEconomiaContenedor').show()
                        
                        if(res.Meses.length>0){
                            res.Meses.forEach((el,i) => {
                                if(i==0){

                                    $("#Devengado").val(el.Devengado);
                                    $("#Girado").val(el.Girado);
                                }
                            });
                        }
                    }

                    $("#inputFechaFin").removeClass("d-none");
                    $(".chzn-select").trigger("chosen:updated");
                }
                else{
                    if(res.resultado==3)
                        location.reload();
                }
            },
            error: function (msg) {
                console.log(msg)
                toastr.error("Error al listar locador!","ERROR");
            }
        });

    },

    InitDatablesLocadores() {
        var parms = {
            destroy: true,
            bFilter: false,
            order: [[2, 'asc']],
            scrollX: true,
            columns: [
                {
                    width: "5%",
                    data: "IdLocador",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('style', 'display:none')
                    }
                },
                {
                    width: "15%",
                    data: "NroDocumento",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                {
                    width: "15%",
                    data: "Nombres",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                {
                    width: "20%",
                    data: "AreaUsuariaDesc",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                {
                    width: "10%",
                    data: "FechaFin",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                        let fecha = new Date();
                        let dia = fecha.getDate();
                        let mes = parseInt(fecha.getMonth()) + 1;
                        let yyy = fecha.getFullYear();
                        if (dia < 10) dia = "0" + dia;
                        if (mes < 10) mes = "0" + mes;
                        let fechaP = dia + "/" + mes + "/" + yyy;

                        // if (rowData.FechaFin<=fechaP&&rowData.FechaFin!=null) {
                        //     $(td).parent().css("color", "#F81C1C");
                        //     $(td).parent().css("font-weight", "bold");
                        // }
                    }
                },
                {
                    width: "5%",
                    data: "NroOrdenServicio",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                {
                    width: "10%",
                    data: "Ubicacion",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                }
            ]
        }

        oTable_Locadores = $("#tblLocadores").dataTable(parms);
    },

    InitDatablesListaPeriodosDetalle: () => {
        var parms = {
            "paging": false,
            "bFilter": false,
            order: [[0, 'desc']],
            "info": false,
            "scrollX": true,
            columns: [
                {
                    width: '5%',
                    targets: 0,
                    data: "Indice",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    width: '5%',
                    targets: 1,
                    data: "Descripcion",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                        if (rowData.Activo==0) {
                            $(td).parent().css("background-color", "#F81C1C");
                            $(td).parent().css("color", "white");
                        }
                    }
                },
                {
                    width: '5%',
                    targets: 1,
                    data: "FechaInicio",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                },
                {
                    width: '5%',
                    targets: 2,
                    data: "FechaFin",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'center')
                    }
                }
            ]

        }

        oTable_ListaPeriodosDetalle = $("#tblListadoPeriodosDetalle").dataTable(parms);
    },

    InitDatablesListaMovimientosDetalle: () => {
        var parms = {
            "paging": false,
            "bFilter": false,
            order: [[0, 'asc']],
            "info": false,
            "scrollX": true,
            columns: [
                {
                    width: '5%',
                    targets: 0,
                    data: "Indice",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                        if (rowData.activo==0) {
                            $(td).parent().css("background-color", "#F81C1C");
                            $(td).parent().css("color", "white");
                        }
                    }
                },
                {
                    width: '5%',
                    targets: 1,
                    data: "AreaEmisorDesc",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                {
                    width: '5%',
                    targets: 2,
                    data: "AreaDestinoDesc",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                {
                    width: '5%',
                    targets: 3,
                    data: "FechaRecepcion",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                {
                    width: '20%',
                    targets: 5,
                    data: "Observaciones",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },
                {
                   width: '10%',
                   targets: 6,
                   data: "FechaRegistro",
                   createdCell: function (td, cellData, rowData, row, col) {
                       $(td).attr('align', 'left')
                   }
                }
            ]

        }

        oTable_ListaMovimientosDetalle = $("#tblListadoMovimientosDetalle").dataTable(parms);
    },

    async listasLocadores(Nombres,AreaUsuaria,Unidad,SinTermino){
        $('.locadoresPeriodoMasivo tbody tr').addClass("d-none");
        
        await $.ajax({
            url: `/locadores/listarLocadores?${Nombres}${AreaUsuaria}${Unidad}${SinTermino}`,
            datatype: "json",
            type: "get",
            async: false,
            success: function (res) {
                if(res.resultado==1){
                    if(res.datos&&res.datos.length>0){
                        res.datos.forEach(dato =>{
                            $('.locadoresPeriodoMasivo tbody #idlocador_'+dato['idlocador']).removeClass("d-none")
                        });
                        $("#cantidadPeriodoMasivo").text(res.datos.length)
                    }
                    else{
                        $("#cantidadPeriodoMasivo").text("0")
                    }
                }
                else{
                    toastr.warning(res.mensaje,"Aviso");
                    if(res.resultado==3)
                        location.reload();
                }

            },
            error: function (msg) {
                console.log("error:",msg)
                Swal.close();
                message = "";

                if(msg['responseJSON']['message'])
                    message = msg['responseJSON']['message'];
                toastr.error(`Error al listar locadores! ${message}`,"ERROR");
            }
        })
    },

    FiltrarCheckLocadores(filtroCheck){
        $('.locadoresPeriodoMasivo tbody tr').removeClass("d-none");

        if(filtroCheck==2){
            $(".listaLocadores").addClass("d-none");
            $(".listaLocadores td input[type=checkbox]:checked").each(function(){
                const [text, id] = this.id.split("_")
                $(`#idlocador_${id}`).removeClass("d-none");
            });
        }
        else if(filtroCheck==3){
            $(".listaLocadores td input[type=checkbox]:checked").each(function(){
                const [text, id] = this.id.split("_")
                $(`#idlocador_${id}`).addClass("d-none");
            });
        } 

        $("#cantidadPeriodoMasivo").text($(".listaLocadores").length-$(".listaLocadores.d-none").length)
    },

    eventos() {
        $(document).on('click', '.input-group-addon', function(){
            let idIconFecha = $(this).parent().find("input[type=text]").attr("id");
            
            $("#"+idIconFecha).focus();
        });

        $('#btnBuscar').on('click', async function() {

            // if ($('#txtFechaInicioBusq').val() == '' && $('#txtFechaFinBusq').val() == '' && $('#txtNroOrdenServicioBusq').val() == '' && $('#txtNombresBusq').val() == '' && $('#txtAreaUsuariaBusq').val() == '' && $('#txtUnidadBusq').val() == '') {
            //     toastr.error('Ingrese al menos un valor para la búsqueda')
            //     return false
            // }
            if (($('#txtFechaInicioBusq').val() != '' && $('#txtFechaFinBusq').val() == '')||($('#txtFechaInicioBusq').val() == '' && $('#txtFechaFinBusq').val() != '')){
                if ($('#txtFechaInicioBusq').val() == ''){
                    toastr.warning('Debe ingresar la Fecha de Inicio')
                }
                if ($('#txtFechaFinBusq').val() == ''){
                    toastr.warning('Debe ingresar la Fecha de Fin')
                }
                return false
            }
            if ($('#txtFechaInicioBusq').val() > $('#txtFechaFinBusq').val()){
                toastr.warning('La decha de fin debe ser igual o mayor a la fecha de inicio')
                return false
            }

            await Locadores.ListarLocadoresFiltrar($('#txtFechaInicioBusq').val(),$('#txtFechaFinBusq').val(),$("#txtNroOrdenServicioBusq").val(),$("#txtNombresBusq").val(),$("#txtAreaUsuariaBusq").val(),$("#txtUnidadBusq").val(),$("#txtNroDocumentoBusq").val(),$("#txtchkLocadoresSinTermino").is(":checked")?1:0)
        })

        $('#formulario_locadores').on('submit', async function (e) {
            e.preventDefault();

            await Locadores.FormLocadores(new FormData(this))
        })

        $('#formulario_periodo_masivo').on('submit', async function (e) {
            e.preventDefault();

            if($("#FechaInicioPeriodoMasivo").val()>$("#FechaTerminoPeriodoMasivo").val()){
                toastr.warning("La fecha de inicio no puede ser mayor a la fecha final del periodo")
                return false;
            }

            await Locadores.FormPeriodoMasivo(new FormData(this))
        })

        $('#btnAgregarLocador').on('click', function () {
            Locadores.LimpiarCamposLocadores()
            Locadores.ValidarBotonClick = 1;

            $('.LocadorContenedor').show()
            $('.PeriodoContenedor').show()
            $('.RegistroOEAContenedor').show()

            $('#txt_IdDocIdentidad').attr('required', true)
            $('#txt_NroDocumento').attr('required', true)
            $('#txt_Nombres').attr('required', true)
            
            $('#FormacionAcademica').attr('required', true)
            $('#Perfil').attr('required', true)
            $('#Periodo').attr('required', true)
            $('#PeriodoDesc').attr('required', true)

            $('#Concepto').attr('required', true)
            $('#TipoServicio').attr('required', true)
            $('#AreaDestinoOEA').attr('required', true)

            $('#modalRegistroLocadores').modal('show')
        })

        $('#btnModificarLocador').on('click', async function () {
            let objRowLocadores = oTable_Locadores.api(true).row('.selected').data()
            
            if (isEmpty(objRowLocadores)) {
                toastr.error('Selecciona un Locador',"ERROR")
                return false
            }
            
            Locadores.LimpiarCamposLocadores()
            Locadores.ValidarBotonClick = 5;

            $('#IdLocador').val(objRowLocadores.IdLocador)
            $('#txt_IdDocIdentidad').attr('required', true)
            $('#txt_NroDocumento').attr('required', true)
            $('#txt_Nombres').attr('required', true)
            
            await Locadores.ListarLocadorPorId(objRowLocadores.IdLocador)
            
            $('.LocadorContenedor').show()
            $('#modalRegistroLocadores').modal('show')
        })

        $('#btnConsultarLocador').on('click', async function () {
            let objRowLocadores = oTable_Locadores.api(true).row('.selected').data()
            
            if (isEmpty(objRowLocadores)) {
                toastr.error('Selecciona un Locador',"ERROR")
                return false
            }

            Locadores.LimpiarCamposLocadores()
            Locadores.ValidarBotonClick = 6;
            
            await Locadores.ListarLocadorPorId(objRowLocadores.IdLocador)
            
            $('#modalRegistroLocadores .form-control').attr('disabled', true)
            $(".chzn-select").trigger("chosen:updated");
            $('#btnguardarLocador').hide()
            $('.LocadorContenedor').show()
            $('#modalRegistroLocadores').modal('show')
        })

        $('#btnEliminarLocador').on('click', async function () {
            let objRowLocadores = oTable_Locadores.api(true).row('.selected').data()
            
            if (isEmpty(objRowLocadores)) {
                toastr.error('Selecciona un Locador',"ERROR")
                return false
            }
            
            Swal.fire({
                title: "¿Estás seguro?",
                text: "Se eliminará el Locador!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#ccc",
                confirmButtonText: "Confirmar"
            }).then(async (res) => {
                if (res.isConfirmed) {
                    const { value: text } = await Swal.fire({
                        input: "textarea",
                        inputLabel: "Motivo",
                        inputPlaceholder: "Ingrese el motivo...",
                        inputAttributes: {
                          "aria-label": "Ingrese el motivo...",
                          "maxlength": "300"
                        },
                        showCancelButton: true
                      });
                      
                      if (text.trim().length>0) {
                        await Locadores.EliminarRegistro(objRowLocadores.IdLocador,text,1)
                      }
                      else {
                        toastr.error("Ingrese un motivo correcto y vuelva a intentarlo","ERROR")
                      }
                }
            });
        })

        $('#btnAgregarPeriodo').on('click', async function () {
            let objRowLocadores = oTable_Locadores.api(true).row('.selected').data()
            if (isEmpty(objRowLocadores)) {
                toastr.error('Para agregar un periodo, debe seleccionar un Locador de la tabla "Listado de Locadores".',"ERROR")
                return false
            }

            Locadores.LimpiarCamposLocadores()
            Locadores.ValidarBotonClick = 4;
            
            await Locadores.ListarLocadorPorId(objRowLocadores.IdLocador)
            await Locadores.buscarIdLocador(
                objRowLocadores.IdDocIdentidad,
                objRowLocadores.NroDocumento,
                "#IdLocador",
                "#Nombres",
                "#Ruc",
                "#FormacionAcademica",
                "#Perfil",
                "#AreaUsuaria",
                "#Unidad",
                "#Concepto",
                "#TipoServicio",
                "#Ff",
                "#Ppr",
                "#MontoAprMensual"
                )

            $('#IdLocador').val(objRowLocadores.IdLocador)
            $('.PeriodoContenedor').show()
            $('.RegistroOEAContenedor').show()

            $('#FormacionAcademica').attr('required', true)
            $('#Perfil').attr('required', true)
            $('#Periodo').attr('required', true)
            $('#PeriodoDesc').attr('required', true)

            $('#Concepto').attr('required', true)
            $('#TipoServicio').attr('required', true)
            $('#AreaDestinoOEA').attr('required', true)

            $('#modalRegistroLocadores').modal('show')
        })

        $('#btnModificarPeriodo').on('click', async function () {
            let objRowPeriodos = oTable_ListaPeriodosDetalle.api(true).row('.selected').data()
            
            if (isEmpty(objRowPeriodos)) {
                toastr.error('Selecciona un Periodo',"ERROR")
                return false
            }
            
            Locadores.LimpiarCamposLocadores()
            Locadores.ValidarBotonClick = 7;
            
            $('#IdPeriodo').val(objRowPeriodos.IdPeriodo)
            $('#IdLocador').val(objRowPeriodos.IdLocador)
            $('#FormacionAcademica').attr('required', true)
            $('#Perfil').attr('required', true)
            $('#Periodo').attr('required', true)
            $('#PeriodoDesc').attr('required', true)
            
            await Locadores.ListarDetallePeriodo(objRowPeriodos.IdPeriodo)

            $('#tiene-reemplazo').removeClass('d-none');
            $('.PeriodoContenedor').show()
            $('#modalRegistroLocadores').modal('show')
        })

        $('#btnConsultarPeriodo').on('click', async function () {
            let objRowPeriodos = oTable_ListaPeriodosDetalle.api(true).row('.selected').data()
            
            if (isEmpty(objRowPeriodos)) {
                toastr.error('Selecciona un Periodo',"ERROR")
                return false
            }
            
            Locadores.LimpiarCamposLocadores()
            Locadores.ValidarBotonClick = 8;
            
            await Locadores.ListarDetallePeriodo(objRowPeriodos.IdPeriodo)

            $('#tiene-reemplazo').removeClass('d-none');
            $('#chkReemplazo').attr('disabled', true),
            
            $('#btnguardarLocador').hide()
            $('#modalRegistroLocadores .form-control').attr('disabled', true)
            $(".chzn-select").trigger("chosen:updated");
            $('.PeriodoContenedor').show()
            $('#modalRegistroLocadores').modal('show')
        })

        $('#btnEliminarPeriodo').on('click', async function () {
            let objRowPeriodos = oTable_ListaPeriodosDetalle.api(true).row('.selected').data()
            
            if (isEmpty(objRowPeriodos)) {
                toastr.error('Selecciona un Periodo',"ERROR")
                return false
            }

            if (objRowPeriodos.Activo ==0) {
                toastr.error('El Periodo ya se encuentra anulado',"ERROR")
                return false
            }
            
            Swal.fire({
                title: "¿Estás seguro?",
                text: "Se anulará el Periodo!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#ccc",
                confirmButtonText: "Confirmar"
            }).then(async (res) => {
                if (res.isConfirmed) {
                    const { value: text } = await Swal.fire({
                        input: "textarea",
                        inputLabel: "Motivo",
                        inputPlaceholder: "Ingrese el motivo...",
                        inputAttributes: {
                          "aria-label": "Ingrese el motivo...",
                          "maxlength": "300"
                        },
                        showCancelButton: true
                      });
                      
                      if (text.trim().length>0) {
                        await Locadores.EliminarRegistro(objRowPeriodos.IdPeriodo,text,2)
                      }
                      else {
                        toastr.error("Ingrese un motivo correcto y vuelva a intentarlo","ERROR")
                      }
                }
            });
        })

        $('#btnAgregarMovimiento').on('click', async function () {
            let objRowPeriodos = oTable_ListaPeriodosDetalle.api(true).row('.selected').data()
            
            if (isEmpty(objRowPeriodos)) {
                toastr.error('Selecciona el periodo para agregar un movimiento',"ERROR")
                return false
            }

            let IdRol = $("#IdRol").val();
            
            const [res,area] = await Locadores.buscarUltimoDestino(objRowPeriodos.IdPeriodo, IdRol)

            if(res == 2){
                await Locadores.ListarDetalleMovimientos(objRowPeriodos.IdPeriodo);
                return false;
            }
            
            Locadores.LimpiarCamposLocadores()

            $("#Anio").val((new Date()).getFullYear());
            await Locadores.ListarSegundoMovimientoPorArea(objRowPeriodos.IdPeriodo, area)
            
            $("#IdPeriodo").val(objRowPeriodos.IdPeriodo);
            if(IdRol==217){
                $('.RegistroOEAContenedor').show()
                $('#FechaRecepcionOEA').attr('required', true)
                $('#Concepto').attr('required', true)
                $('#TipoServicio').attr('required', true)
                $('#Periodo').attr('required', true)
                $('#AreaDestinoOEA').attr('required', true)
            }
            else if(IdRol==219){
                $('.RegistroOEPEContenedor').show()
                $('#FechaRecepcionOEPE').attr('required', true)
                $('#NroCertificacionOEPE').attr('required', true)
                $('#MarcoPresupuestal').attr('required', true)
                $('#DispositivoAlta').attr('required', true)
                $('#AreaDestinoOEPE').attr('required', true)
            }
            else if(IdRol==220){
                $('.RegistroLogisticaContenedor').show()
                $('#FechaRecepcionLogistica').attr('required', true)
                $("#MontoCertificacionLogistica").attr('required', true)
                $('#NroCertificacionLogistica').attr('required', true)
                $('#NroOrdenServicio').attr('required', true)
                $('#NroSiaf').attr('required', true)
                $('#AreaDestinoLogistica').attr('required', true)
            }
            else if(IdRol==221){
                $('#btnEconomia').removeClass('d-none');
                $('#FechaRecepcionEconomia').attr('required', true)
                $('#Mes').attr('required', true)
                $('#Anio').attr('required', true)
                $('.RegistroEconomiaContenedor').show()
            }
            else{
                toastr.error("No tiene un área definida para el rol que presenta","ERROR")
                return false
            }
            Locadores.ValidarBotonClick = 2;
            
            $('#modalRegistroLocadores').modal('show')
        })
        
        $('#btnModificarMovimiento').on('click', async function () {
            let objRowMovimientos = oTable_ListaMovimientosDetalle.api(true).row('.selected').data()
            
            if (isEmpty(objRowMovimientos)) {
                toastr.error('Selecciona un Movimiento',"ERROR")
                return false
            }
            
            let IdRol = $("#IdRol").val();
            if(objRowMovimientos.IdRolEmisor!==IdRol){
                toastr.warning('Solo puede modificar un movimiento de su misma área')
                return false
            }

            Locadores.LimpiarCamposLocadores()
            Locadores.ValidarBotonClick = 3;
            
            await Locadores.ListarMovimientoPorArea(objRowMovimientos.IdMovimiento,objRowMovimientos.AreaEmisor)
            
            let fechaActual = new Date();
            $("#IdPeriodo").val(objRowMovimientos.IdPeriodo);
            if(IdRol==217){
                $('#input-FechaRegistroOEA').removeClass('d-none');
                
                $('#Concepto').attr('required', true)
                $('#TipoServicio').attr('required', true)
                $('#AreaDestinoOEA').attr('required', true)
                
                if(!(objRowMovimientos.FechaDeRegistro>=fechaActual.toJSON())){
                    $('#AreaDestinoOEA').attr('disabled',true)
                }
            }
            else if(IdRol==219){
                $('#input-FechaRegistroOEPE').removeClass('d-none');

                $('#FechaRecepcionOEPE').attr('required', true)
                $('#NroCertificacionOEPE').attr('required', true)
                $('#MarcoPresupuestal').attr('required', true)
                $('#DispositivoAlta').attr('required', true)
                $('#AreaDestinoOEPE').attr('required', true)

                if(!(objRowMovimientos.FechaDeRegistro>=fechaActual.toJSON())){
                    $('#AreaDestinoOEPE').attr('disabled',true)
                }
            }
            else if(IdRol==220){
                $('#input-FechaRegistroLogistica').removeClass('d-none');

                $('#FechaRecepcionLogistica').attr('required', true)
                $("#MontoCertificacionLogistica").attr('required', true);
                $('#NroCertificacionLogistica').attr('required', true)
                $('#NroOrdenServicio').attr('required', true)
                $('#NroSiaf').attr('required', true)
                $('#AreaDestinoLogistica').attr('required', true)

                if(!(objRowMovimientos.FechaDeRegistro>=fechaActual.toJSON())){
                    $('#AreaDestinoLogistica').attr('disabled',true)
                }
            }
            else if(IdRol==221){
                // $('#input-FechaRegistroEconomia').removeClass('d-none');
                $('#btnEconomia').removeClass('d-none');

                if(!(objRowMovimientos.FechaDeRegistro>=fechaActual.toJSON())){
                    $('#AreaDestinoEconomia').attr('disabled',true)
                }

                $('#FechaRecepcionEconomia').attr('required', true)
                $('#Mes').attr('required', true)
                $('#Anio').attr('required', true)
            }
            else{
                toastr.error("No tiene un área definida para el rol que presenta","ERROR")
                return false
            }
            
            $('#modalRegistroLocadores').modal('show')
        })

        $('#btnConsultarMovimiento').on('click', async function () {
            let objRowMovimientos = oTable_ListaMovimientosDetalle.api(true).row('.selected').data()
            
            if (isEmpty(objRowMovimientos)) {
                toastr.error('Selecciona un Movimiento',"ERROR")
                return false
            }
            Locadores.LimpiarCamposLocadores()
            Locadores.ValidarBotonClick =0
            
            $('#input-FechaRegistroOEA, #input-FechaRegistroOEPE, #input-FechaRegistroLogistica, #input-FechaRegistroEconomia').removeClass('d-none');
            $('#btnguardarLocador').hide()
            
            await Locadores.ListarMovimientoPorArea(objRowMovimientos.IdMovimiento,objRowMovimientos.AreaEmisor)
            
            $('#modalRegistroLocadores .form-control').attr('disabled', true)
            $(".chzn-select").trigger("chosen:updated");

            $('#modalRegistroLocadores').modal('show')
        })

        $('#btnEliminarMovimiento').on('click', async function () {
            let objRowMovimientos = oTable_ListaMovimientosDetalle.api(true).row('.selected').data()
            
            if (isEmpty(objRowMovimientos)) {
                toastr.error('Selecciona un Movimiento',"ERROR")
                return false
            }

            if (objRowMovimientos.activo==0) {
                toastr.error('El Movimiento ya se encuentra anulado',"ERROR")
                return false
            }
            
            Swal.fire({
                title: "¿Estás seguro?",
                text: "Se anulará el Movimiento!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#ccc",
                confirmButtonText: "Confirmar"
            }).then(async (res) => {
                if (res.isConfirmed) {
                    const { value: text } = await Swal.fire({
                        input: "textarea",
                        inputLabel: "Motivo",
                        inputPlaceholder: "Ingrese el motivo...",
                        inputAttributes: {
                          "aria-label": "Ingrese el motivo...",
                          "maxlength": "300"
                        },
                        showCancelButton: true
                      });
                      
                      if (text.trim().length>0) {
                        await Locadores.EliminarRegistro(objRowMovimientos.IdMovimiento,text,3)
                      }
                      else {
                        toastr.error("Ingrese un motivo correcto y vuelva a intentarlo","ERROR")
                      }
                }
            });
        })

        $('#btnCerrarModalLocador').on('click', function () {
            $('#modalRegistroLocadores').modal('hide')
        })

        $('#btnLimpiar').on('click', function () {
            $('#txtFechaInicioBusq').val('')
            $('#txtFechaFinBusq').val('')
            $('#txtNroOrdenServicioBusq').val('')
            $('#txtNombresBusq').val('')
            $('#txtAreaUsuariaBusq').val('')
            $('#txtUnidadBusq').val('')
            $('#txtNroDocumentoBusq').val('')
            $("#txtchkLocadoresSinTermino").prop("checked",false)

            $(".chzn-select").trigger("chosen:updated");
        })

        $('#btnLimpiarReporte').on('click', function () {
            $('#AreaUsuariaReport').val('')
            $('#UnidadReport').val('')
            $('#MesReport').val('')
            $('#AnioReport').val('')
            $('#LocadorReport').val('')
            $("#chkLocadoresSinTerminoReport").prop("checked",false)

            $(".chzn-select").trigger("chosen:updated");
        })

        $('#btnExportar').on('click', function () {
            Locadores.LimpiarCamposReporte()

            $('#modalExportar').modal('show')
        })

        $('#btnCerrarModalExportar').on('click', function () {
            $('#modalExportar').modal('hide')
        })

        $('#btnPeriodosMasivo').on('click', async function () {
            Locadores.LimpiarCamposPeriodosMasivo()

            let resultado = 2;

            await $.ajax({
                url: "/locadores/listarLocadores",
                datatype: "json",
                type: "get",
                async: false,
                success: function (res) {
                    resultado = res.resultado;
                    if(res.resultado==1){
                        if(res.datos && res.datos.length>0){
                            res.datos.forEach(dato =>{
                                $('.locadoresPeriodoMasivo tbody').append(
                                    '<tr id="idlocador_'+dato['idlocador']+'" class="listaLocadores">\
                                        <td class="d-flex">\
                                            <input type="checkbox" id="nombresLocador_'+dato['idlocador']+'" class="m-2 listaNombresLocadores" />\
                                            <input type="hidden" name="IdLocador[]" value='+dato['idlocador']+'>\
                                            <div class="locadores_click d-block align-items-center" style="width: 100%; padding: 6px 0">'+dato['nombres']+
                                        '</div></td>\
                                    </tr>'
                                );
                            });
                            $("#cantidadPeriodoMasivo").text(res.datos.length)
                        }
                        else{
                            $("#cantidadPeriodoMasivo").text("0")
                        }
                    }
                    else{
                        toastr.error(res.mensaje,"ERROR");
                        
                        if(res.resultado==3)
                            location.reload();
                    }

                },
                error: function (msg) {
                    console.log("error:",msg)
                    Swal.close();
                    message = "";

                    if(msg['responseJSON']['message'])
                        message = msg['responseJSON']['message'];
                    toastr.warning( `Error al listar locadores! ${message}`,"Aviso");
                }
            })

            if(resultado==1)
                $('#modalPeriodoMasivo').modal('show')
        })

        // $("#NombresPeriodoMasivo").on("input", async function() {
        //     $("#chkPeriodoMasivo").prop("checked", false)
        //     console.log($("#chkLocadoresSinTermino").is(":checked"))
        //     // $("#chkLocadoresSinTermino").prop("checked",false)
        //     await Locadores.listasLocadores(`Nombres=${$(this).val()}`,`&AreaUsuaria=${$("#AreaUsuariaPeriodoMasivo").val()}`,`&Unidad=${$("#UnidadPeriodoMasivo").val()}`,`&SinTermino=${$("#chkLocadoresSinTermino").is(":checked")?1:0}`)
        // })

        $("#buscarLocadorPeriodoMasivo").on("click", async function(){
            $("#chkPeriodoMasivo").prop("checked", false)
            $("#filtrarLocador").val(1)
            await Locadores.listasLocadores(`Nombres=${$("#NombresPeriodoMasivo").val()}`,`&AreaUsuaria=${$("#AreaUsuariaPeriodoMasivo").val()}`,`&Unidad=${$("#UnidadPeriodoMasivo").val()}`,`&SinTermino=${$("#chkLocadoresSinTermino").is(":checked")?1:0}`)
        })

        $("#limpiarBusqPeriodoMasivo").on("click", function(){
            $("#AreaUsuariaPeriodoMasivo").val("");
            $("#UnidadPeriodoMasivo").val("");
            $("#NombresPeriodoMasivo").val("");
            $("#filtrarLocador").val("1");
            $("#chkPeriodoMasivo").prop("checked",false);
            $("#cantidadPeriodoMasivo").text("")
            $("#chkLocadoresSinTermino").prop("checked",false)

            $(".chzn-select").trigger("chosen:updated");
        })

        // $("#chkLocadoresSinTermino").on("change", function(){
        //     $("#NombresPeriodoMasivo").val("");
        //     $("#chkPeriodoMasivo").prop("checked", false)
        //     let estado=$(this).is(':checked');

        //     $.ajax({
        //         url: `/locadores/buscarLocadoresSinFechaTermino`,
        //         datatype: "json",
        //         type: "get",
        //         async: false,
        //         success: function(res) {
        //             if(res.data&& res.data.length>0){
        //                 res.data.forEach(function(item) {
        //                     if(estado)
        //                         $("#idlocador_"+item.idlocador).addClass("d-none")
        //                     else
        //                         $("#idlocador_"+item.idlocador).removeClass("d-none")
        //                 });

        //                 $("#cantidadPeriodoMasivo").text($(".listaLocadores").length-$(".listaLocadores.d-none").length)
        //             }
        //             else{
        //                 $("#cantidadPeriodoMasivo").text("0")
        //             }
        //         }
        //     });
        // })

        $('#chkPeriodoMasivo').on('change', function () {
            let estado=$(this).is(':checked');

            $(".listaLocadores td input[type=checkbox]").each(function(){
                const[text, id] = this.id.split("_");

                if(!$("#idlocador_"+id).hasClass("d-none")){
                    $("#nombresLocador_"+id).prop("checked",estado)
                }
            })

            $("#cantidadPeriodoMasivo").text($(".listaLocadores").length-$(".listaLocadores.d-none").length)
        })

        $(".locadoresPeriodoMasivo tbody").on("click", ".listaNombresLocadores", function(){
            $("#chkPeriodoMasivo").prop("checked", false)
            $("#cantidadPeriodoMasivo").text($(".listaLocadores").length-$(".listaLocadores.d-none").length)
            // Locadores.FiltrarCheckLocadores($("#filtrarLocador").val())
        })
        
        $("#filtrarLocador").on("change", function(){

            $("#chkPeriodoMasivo").prop("checked", false)
            Locadores.FiltrarCheckLocadores($(this).val())
        })

        $(".locadoresPeriodoMasivo tbody").on("click", ".locadores_click",function(){
            const [text, id] = $(this).parent().parent()[0].id.split("_");

            if ($(`#nombresLocador_${id}`).is(":checked")) {
                $(`#nombresLocador_${id}`).prop("checked",false);
                $(`#nombresLocador_${id}`).attr("name","");
            }
            else{
                $(`#nombresLocador_${id}`).prop("checked",true);
            }
            
            $("#chkPeriodoMasivo").prop("checked", false)
            $("#cantidadPeriodoMasivo").text($(".listaLocadores").length-$(".listaLocadores.d-none").length)
            // Locadores.FiltrarCheckLocadores($("#filtrarLocador").val())
        })

        $('#btnCerrarModalPeriodoMasivo').on('click', function () {
            $('#modalPeriodoMasivo').modal('hide')
        })

        $('#formulario_reporte').on('submit', async function (e) {
            e.preventDefault();

            await Locadores.ExportarReporte($("#AreaUsuariaReport").val(),
                $("#UnidadReport").val(), $("#MesReport").val(), $("#AnioReport").val(),
                $("#LocadorReport").val(),$("#chkLocadoresSinTerminoReport").is(":checked")?1:0)
        })

        $('#tblLocadores tbody').on('click', 'tr', async function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTable_Locadores.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                let objRowLocadores = oTable_Locadores.api(true).row('.selected').data()
                if(objRowLocadores){
                    
                    await Locadores.ListarPeriodos(objRowLocadores.IdLocador);
                    oTable_ListaMovimientosDetalle.fnClearTable();
                }
                else{
                    toastr.warning("Seleccione un registro válido", "Alerta");
                }
            }
        })

        $('#tblListadoPeriodosDetalle tbody').on('click', 'tr', async function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTable_ListaPeriodosDetalle.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');

                let objRowPeriodos = oTable_ListaPeriodosDetalle.api(true).row('.selected').data()
                if(objRowPeriodos){
                    await Locadores.ListarDetalleMovimientos(objRowPeriodos.IdPeriodo);
                }
                else{
                    toastr.warning("Seleccione un registro válido", "Alerta");
                }
            }
        })
        
        $('#tblListadoMovimientosDetalle tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                oTable_ListaMovimientosDetalle.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            }
        })

        $('#btnAgregaMes').on('click', function () {
            //si div existe
            let div_dinamico = ".div-nuevomes"
            if ($(div_dinamico).length == 0){
                div_dinamico = "#div-mes"
            }
            
            if($(div_dinamico).length>8){
                toastr.warning("Se alcanzó el máximo de 10 meses")
                return false
            }
            else{
                $(div_dinamico).last().after(`
                    <div class="row mt-1 div-nuevomes">
                        <div class="col-lg-11">
                            <div class="row">
                                <div class="col-lg-2">
                                    <div class="input-group input-group-sm">
                                        <select class="form-control bloquear-campo-economia" id="Mes" name="Mes[]" required>
                                            <option value="" selected>Seleccione</option>
                                            <option value="1">Enero</option>
                                            <option value="2">Febrero</option>
                                            <option value="3">Marzo</option>
                                            <option value="4">Abril</option>
                                            <option value="5">Mayo</option>
                                            <option value="6">Junio</option>
                                            <option value="7">Julio</option>
                                            <option value="8">Agosto</option>
                                            <option value="9">Setiembre</option>
                                            <option value="10">Octubre</option>
                                            <option value="11">Noviembre</option>
                                            <option value="12">Diciembre</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg-2">
                                    <div class="input-group input-group-sm">
                                        <input type="text" class="form-control bloquear-campo-economia" id="Anio" name="Anio[]" autocomplete="off" maxlength="4" onkeypress='return event.charCode >= 48 && event.charCode <= 57' value="${(new Date()).getFullYear()}" required>
                                    </div>
                                </div>
                                <div class="col-lg-2">
                                    <div class="input-group input-group-sm">
                                        <input type="text" class="form-control bloquear-campo-economia" id="Devengado" name="Devengado[]" autocomplete="off" maxlength="9" placeholder="0.00" onkeypress="if ( isNaN( this.value + String.fromCharCode(event.charCode) )) return false;">
                                    </div>
                                </div>
                                <div class="col-lg-2">
                                    <div class="input-group-sm">
                                        <input type="date" class="form-control bloquear-campo-economia" id="FechaDevengado" name="FechaDevengado[]" autocomplete="off" maxlength="10">
                                    </div>
                                </div>
                                <div class="col-lg-2">
                                    <div class="input-group input-group-sm">
                                        <input type="text" class="form-control bloquear-campo-economia" id="Girado" name="Girado[]" autocomplete="off" maxlength="9" placeholder="0.00" onkeypress="if ( isNaN( this.value + String.fromCharCode(event.charCode) )) return false;">
                                    </div>
                                </div>
                                <div class="col-lg-2">
                                    <div class="input-group-sm">
                                        <input type="date" class="form-control bloquear-campo-economia fecha_economia" id="FechaGirado" name="FechaGirado[]" autocomplete="off" maxlength="10">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-1">
                            <button id="btnQuitarFila" type="button" class="btn btn-sm btn-danger" style="width: 37px;">
                                <i class="fa fa-trash" style="width: 20px; text-align:center;"></i>
                            </button>
                        </div>
                    </div>
                `)
            }
        })

        $(document).on('click', '#btnQuitarFila', function(){  
            if(Locadores.ValidarBotonClick==0){
                toastr.warning("Esta en modo consulta")
                return false
            }
            $(this).parent().parent().remove();
        });

        /*$('#AreaUsuaria ,#AreaUsuariaReemplazo').on('change',async function() {
            let id = '#Unidad'
            
            if($(this).attr("id") == 'AreaUsuariaReemplazo'){
                id = '#UnidadReemplazo'
            }

            let AreaUsuaria = $(this).val();
            await Locadores.ListarUnidades(id,AreaUsuaria)

        })*/

        $('#IdDocIdentidadReemplazo').on('change',async function() {
            let IdDocIdentidadReemplazo = $("#IdDocIdentidadReemplazo").val()
            let NroDocumentoReemplazo = $("#NroDocumentoReemplazo").val()

            if(IdDocIdentidadReemplazo>0 && NroDocumentoReemplazo.trim().length>7){

                await Locadores.buscarIdLocador(
                    IdDocIdentidadReemplazo,
                    NroDocumentoReemplazo,
                    "#IdLocadorReemplazo",
                    "#NombresReemplazo",
                    "#RucReemplazo",
                    "#FormacionAcademicaReemplazo",
                    "#PerfilReemplazo",
                    "#AreaUsuariaReemplazo",
                    "#UnidadReemplazo",
                    "#ConceptoReemplazo",
                    "#TipoServicioReemplazo",
                    "#FfReemplazo",
                    "#PprReemplazo",
                    "#MontoAprMensualReemplazo"
                )
            }

        })

        $('#NroDocumentoReemplazo').on('input',async function() {
            let IdDocIdentidadReemplazo = $("#IdDocIdentidadReemplazo").val()
            let NroDocumentoReemplazo = $("#NroDocumentoReemplazo").val()

            if(IdDocIdentidadReemplazo>0 && NroDocumentoReemplazo.trim().length>7){
                
                await Locadores.buscarIdLocador(
                    IdDocIdentidadReemplazo,
                    NroDocumentoReemplazo,
                    "#IdLocadorReemplazo",
                    "#NombresReemplazo",
                    "#RucReemplazo",
                    "#FormacionAcademicaReemplazo",
                    "#PerfilReemplazo",
                    "#AreaUsuariaReemplazo",
                    "#UnidadReemplazo",
                    "#ConceptoReemplazo",
                    "#TipoServicioReemplazo",
                    "#FfReemplazo",
                    "#PprReemplazo",
                    "#MontoAprMensualReemplazo"
                )
            }

        })

        $('#IdDocIdentidad ,#IdDocIdentidadReemplazo, #txt_IdDocIdentidad').on('change',function() {
            let id = '#NroDocumento'
            
            if($(this).attr("id") == 'IdDocIdentidadReemplazo'){
                id = '#NroDocumentoReemplazo'
            }
            else if($(this).attr("id") == 'txt_IdDocIdentidad'){
                id = '#txt_NroDocumento'
            }

            if($(this).val()==1){
                $(id).attr("maxlength",8)
                $(id).val($(id).val().slice(0,8))
            }
            else
                $(id).attr("maxlength",12)
        })

        $('#chkReemplazo').on('change',function() {
            let estado=$(this).is(':checked');
            
            if(estado) {
                Locadores.TieneReemplazo=1;
                $('.LocadorContenedorReemplazoContenedor').show();
                $('.PeriodoContenedorReemplazoContenedor').show();
                $('.RegistroOEAReemplazoContenedor').show();

                $('#IdDocIdentidadReemplazo').attr('required', true)
                $('#NroDocumentoReemplazo').attr('required', true)
                $('#NombresReemplazo').attr('required', true)

                $('#FormacionAcademicaReemplazo').attr('required', true)
                $('#PerfilReemplazo').attr('required', true)
                $('#PeriodoReemplazo').attr('required', true)
                $("#PeriodoDescReemplazo").attr('required', true)

                $("#ConceptoReemplazo").attr('required', true)
                $("#TipoServicioReemplazo").attr('required', true)
                $("#AreaDestinoOEAReemplazo").attr('required', true)
            }
            else{
                Locadores.TieneReemplazo=0;
                $('.LocadorContenedorReemplazoContenedor').hide();
                $('.PeriodoContenedorReemplazoContenedor').hide();
                $('.RegistroOEAReemplazoContenedor').hide();
                
                $('#IdDocIdentidadReemplazo').attr('required', false)
                $('#NroDocumentoReemplazo').attr('required', false)
                $('#PeriodoReemplazo').attr('required', false)

                $('#FormacionAcademicaReemplazo').attr('required', false)
                $('#PerfilReemplazo').attr('required', false)
                $('#PeriodoReemplazo').attr('required', false)
                $("#PeriodoDescReemplazo").attr('required', false)

                $("#ConceptoReemplazo").attr('required', false)
                $("#TipoServicioReemplazo").attr('required', false)
                $("#AreaDestinoOEAReemplazo").attr('required', false)
            }

            $(".chzn-select").trigger("chosen:updated");
        });

    },

    async Cargando(){
        let timerInterval;

        await Swal.fire({
            title: 'Espere un momento...', 
            allowOutsideClick: false,
            allowEscapeKey: false,
            didOpen: async() => {
                swal.showLoading();
            },
            willClose: () => {
                clearInterval(timerInterval);
            }
        })
    },

    LimpiarCamposPeriodosMasivo(){
        $('#AreaUsuariaPeriodoMasivo').val('')
        $('#UnidadPeriodoMasivo').val('')
        $('#NombresPeriodoMasivo').val('')
        $('#chkPeriodoMasivo').prop("checked",false)
        $('#filtrarLocador').val('1')
        $('#FechaInicioPeriodoMasivo').val('')
        $('#FechaTerminoPeriodoMasivo').val('')
        $('#periodoPeriodoMasivo').val('')
        $('#obsPeriodoPeriodoMasivo').val('')
        $('#destinoPeriodoMasivo').val('')
        $('#obsMovimientoPeriodoMasivo').val('')
        $(".listaLocadores").remove();
        $("#chkLocadoresSinTermino").prop("checked",false)

        $(".chzn-select").trigger("chosen:updated");
    },

    LimpiarCamposReporte(){
        $('#AreaUsuariaReport').val('')
        $('#UnidadReport').val('')
        $('#MesReport').val('')
        $('#AnioReport').val('')
        $('#LocadorReport').val('')
        $('#chkLocadoresSinTerminoReport').prop("checked",false)

        $(".chzn-select").trigger("chosen:updated");
    },
    
    LimpiarCamposLocadores() {
        $('#modalRegistroLocadores .form-control').attr('disabled', false)
        $('#modalRegistroLocadores .form-control').attr('required', false)
        $('#chkReemplazo').prop('disabled', false)
        $("#chkReemplazo").prop('checked',false);
        
        $('#IdPeriodo').val('')
        $('#IdLocador').val('')
        $('#IdMovimiento').val('')
        //Locador
        $('#txt_IdDocIdentidad').val(1)
        $('#txt_NroDocumento').val('')
        $('#txt_Nombres').val('')
        $('#txt_Ruc').val('')
        //Periodo
        $('#Perfil').val('')
        $('#FormacionAcademica').val('')
        $("#Periodo").val("");
        $("#PeriodoDesc").val("");
        $('#FechaInicio').val('')
        $('#FechaFin').val('')
        $('#FechaTerminoPrest').val('')
        //OEA
        $("#FechaRegistroOEA").text("");
        $('#AreaUsuaria').val('')
        $('#Unidad').val('')
        $('#Concepto').val('')
        $('#TipoServicio').val('')
        $('#Ff').val('')
        $('#Ppr').val('')
        $('#MontoAprMensual').val('')
        $('#AreaDestinoOEA').val('')
        $('#ObservacionesOEA').val('')
        //OEA-Reemplazo
        $('#FechaInicioReemplazo').val('')
        $('#AreaUsuariaReemplazo').val('')
        $('#UnidadReemplazo').val('')
        $('#ConceptoReemplazo').val('')
        $('#TipoServicioReemplazo').val('')
        $('#RucReemplazo').val('')
        $('#IdDocIdentidadReemplazo').val(1)
        $('#NroDocumentoReemplazo').val('')
        $('#PerfilReemplazo').val('')
        $('#FormacionAcademicaReemplazo').val('')
        $('#NombresReemplazo').val('')
        $('#FechaFinReemplazo').val('')
        $('#FfReemplazo').val('')
        $('#PprReemplazo').val('')
        $('#MontoAprMensualReemplazo').val('')
        $("#PeriodoReemplazo").val("");
        $("#PeriodoDescReemplazo").val("");
        $('#ObservacionesOEAReemplazo').val('')
        //OEPE
        $("#FechaRegistroOEPE").text("");
        $("#MarcoPresupuestal").val("");
        $("#DispositivoAlta").val("");
        $("#NroCertificacionOEPE").val("");
        $("#FechaRecepcionOEPE").val("");
        $("#AreaDestinoOEPE").val("");
        $("#ObservacionesOEPE").val("");
        //Logistica
        $("#FechaRegistroLogistica").text("");
        $("#MontoCertificacionLogistica").val("");
        $("#NroCertificacionLogistica").val("");
        $("#FechaRecepcionLogistica").val("");
        $("#NroOrdenServicio").val("");
        $("#NroSiaf").val("");
        $("#Rebaja").val("");
        $("#AreaDestinoLogistica").val("");
        $("#ObservacionesLogistica").val("");
        //Economia
        $("#FechaRegistroEconomia").text("");
        $("#FechaRecepcionEconomia").val("");
        $("#AreaDestinoEconomia").val("");
        $("#Mes").val("");
        $("#Anio").val("");
        $("#Devengado").val("");
        $("#FechaDevengado").val("");
        $("#Girado").val("");
        $("#FechaGirado").val("");
        $("#ObservacionesEconomia").val("");
        
        $(".div-nuevomes").remove();

        $('#DatosLocador-tab').click()
        $('#btnguardarLocador').show()
        $("#inputFechaFin").addClass("d-none");
        $('#tiene-reemplazo').addClass('d-none');
        $('#nav-LocadorReemplazo').addClass('d-none');
        $('#btnEconomia').addClass('d-none');
        $('#input-FechaRecepcionOEA').addClass('d-none');
        $('#input-FechaRegistroOEA').addClass('d-none');
        $('#input-FechaRegistroOEPE').addClass('d-none');
        $('#input-FechaRegistroLogistica').addClass('d-none');
        $('#input-FechaRegistroEconomia').addClass('d-none');
        $('.RegistroOEAContenedor').hide()
        $('.LocadorContenedorReemplazoContenedor').hide()
        $('.PeriodoContenedorReemplazoContenedor').hide()
        $('.RegistroOEAReemplazoContenedor').hide()
        $('.RegistroOEPEContenedor').hide()
        $('.RegistroLogisticaContenedor').hide()
        $('.RegistroEconomiaContenedor').hide()
        $('.LocadorContenedor').hide()
        $('.PeriodoContenedor').hide()
        
        Locadores.ValidarBotonClick = 0;
        Locadores.TieneReemplazo = 0;

        $(".chzn-select").trigger("chosen:updated");
    },

    LimpiarCamposReemplazo() {
        //OEA
        $("#FechaRegistroOEAReemplzConsulta").text("");
        $('#FechaInicioReemplazo').val('')
        $('#AreaUsuariaReemplzConsulta').val('')
        $('#UnidadReemplzConsulta').val('')
        $('#ConceptoReemplzConsulta').val('')
        $('#TipoServicioReemplzConsulta').val('')
        $('#RucReemplzConsulta').val('')
        $('#IdDocIdentidadReemplzConsulta').val('1')
        $('#NroDocumentoReemplzConsulta').val('')
        $('#PerfilReemplzConsulta').val('')
        $('#FormacionAcademicaReemplzConsulta').val('')
        $('#NombresReemplzConsulta').val('')
        $('#FechaFinReemplzConsulta').val('')
        $('#FechaTerminoPrestReemplzConsulta').val('')
        $('#FfReemplzConsulta').val('')
        $('#PprReemplzConsulta').val('')
        $('#MontoAprMensualReemplzConsulta').val('')
        $("#PeriodoReemplzConsulta").val("");
        $("#PeriodoDescReemplzConsulta").val("");
        $('#ObservacionesOEAReemplzConsulta').val('')
        //OEPE
        $("#FechaRegistroOEPEReemplzConsulta").text("");
        $("#MarcoPresupuestalReemplzConsulta").val("");
        $("#DispositivoAltaReemplzConsulta").val("");
        $("#NroCertificacionOEPEReemplzConsulta").val("");
        $("#FechaRecepcionOEPEReemplzConsulta").val("");
        $("#ObservacionesOEPEReemplzConsulta").val("");
        //Logistica
        $("#FechaRegistroLogisticaReemplzConsulta").text("");
        $("#NroCertificacionLogisticaReemplzConsulta").val("");
        $("#FechaRecepcionLogisticaReemplzConsulta").val("");
        $("#NroOrdenServicioReemplzConsulta").val("");
        $("#NroSiafReemplzConsulta").val("");
        $("#ObservacionesLogisticaReemplzConsulta").val("");
        //Economia
        $("#FechaRegistroEconomiaReemplzConsulta").text("");
        $("#FechaRecepcionEconomiaReemplzConsulta").val("");
        $("#MesReemplzConsulta").val("");
        $("#DevengadoReemplzConsulta").val("");
        $("#GiradoReemplzConsulta").val("");
        $("#ObservacionesEconomiaReemplzConsulta").val("");
        $(".div-nuevomes-reemplazo").remove();

        $('.RegistroReemplazoOEAContenedor').hide()
        $('.RegistroReemplzConsultaOEPEContenedor').hide()
        $('.RegistroReemplzConsultaLogisticaContenedor').hide()
        $('.RegistroReemplzConsultaEconomiaContenedor').hide()

        $(".chzn-select").trigger("chosen:updated");
    },

};

$(document).ready(function () {

    Locadores.Plugins()
    Locadores.InitDatablesLocadores()
    Locadores.InitDatablesListaPeriodosDetalle()
    Locadores.InitDatablesListaMovimientosDetalle()
    
    Locadores.eventos()
    Locadores.InitialCharge()

});


