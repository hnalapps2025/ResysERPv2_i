var Triaje = {
    idAtencion: 0,
    
    IniciarScript() {        
        Triaje.Eventos();
        $("#txtPeso").change();

        
        
    },

    IniciarData() {

    },

    Limpiar() {
        $("#txtPA").val("");
        $("#txtPAD").val("");
        $("#txtT").val("");
        $("#txtFr").val("");
        $("#txtFc").val("");
        $("#txtPeso").val("");
        $("#txtTalla").val("");
        $("#txtImc").val("");        
        $("#txtSO").val("");
        $("#txtFIO2").val(""); 
        $("#txtHemo").val(""); 
    },

    LimpiarPorEvaluacion() {
        $("#txtPAEva").val("");
        $("#txtPADEva").val("");
        $("#txtTEva").val("");
        $("#txtFrEva").val("");
        $("#txtFcEva").val("");
        $("#txtPesoEva").val("");
        $("#txtTallaEva").val("");
        $("#txtImcEva").val("");        
        $("#txtSOEva").val("");
        $("#txtFIO2Eva").val(""); 
        $("#txtHemoEva").val(""); 
    },
    
    // <summary>
    // DATATABLES
    // </summary>
    // INICIALIZA EVENTOS
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    Eventos() {
        $("#txtPA").on("change", function () {
            if (90 > $("#txtPA").val() || $("#txtPA").val() > 140) {
        
                $("#txtPA").css('color', 'red');
            }
            else {
                $("#txtPA").css('color', 'black');
            }
        });
        //JDELGADO J0 CAMBIO FORMULA PRESION PAD
        $("#txtPAD").on("change", function () {
            if (50 > $("#txtPAD").val() || $("#txtPAD").val() > 140) {
        
                $("#txtPAD").css('color', 'red');
            }
            else {
                $("#txtPAD").css('color', 'black');
            }
        });
        
        $("#txtFc").on("change", function () {
            if (50 > $("#txtFc").val() || $("#txtFc").val() > 100) {
        
                $("#txtFc").css('color', 'red');
            }
            else {
                $("#txtFc").css('color', 'black');
            }
        });
        
        $("#txtFr").on("change", function () {
            if (10 > $("#txtFr").val() || $("#txtFr").val() > 20) {
        
                $("#txtFr").css('color', 'red');
            }
            else {
                $("#txtFr").css('color', 'black');
            }
        });
        
        $("#txtT").on("change", function () {
            if (36 > $("#txtT").val() || $("#txtT").val() > 37) {
        
                $("#txtT").css('color', 'red');
            }
            else {
                $("#txtT").css('color', 'black');
            }
        });
        
        $("#txtPeso").on("change", function () {
            if ($("#txtPeso").val() != '' && $("#txtTalla").val() != '') {
                $("#txtTriajeIMC").val(Triaje.CalcularIMC($("#txtPeso").val(), $("#txtTalla").val()));
                $("#txtTriajeIMC").val($("#txtTriajeIMC").val() + ' (' + Triaje.imc($("#txtTriajeIMC").val()) + ')');
            }
        });
        
        $("#txtTalla").on("change", function () {
            if ($("#txtPeso").val() != '' && $("#txtTalla").val() != '') {                
                $("#txtTriajeIMC").val(Triaje.CalcularIMC($("#txtPeso").val(), $("#txtTalla").val()));
                $("#txtTriajeIMC").val($("#txtTriajeIMC").val() + ' (' + Triaje.imc($("#txtTriajeIMC").val()) + ')');
            }
            
        });
                           
        $("#txtSO").on("change", function () {
            if (95 > $("#txtSO").val() || $("#txtSO").val() > 100) {
        
                $("#txtSO").css('color', 'red');
            }
            else {
                $("#txtSO").css('color', 'black');
            }
        });

        ///////////////////////////////////////////////////////////////////////////////////////////
        $("#txtPAEva").on("change", function () {
            if (90 > $("#txtPAEva").val() || $("#txtPAEva").val() > 140) {
        
                $("#txtPAEva").css('color', 'red');
            }
            else {
                $("#txtPAEva").css('color', 'black');
            }
        });
        //JDELGADO J0 CAMBIO FORMULA PRESION PAD
        $("#txtPADEva").on("change", function () {
            if (50 > $("#txtPADEva").val() || $("#txtPADEva").val() > 140) {
        
                $("#txtPADEva").css('color', 'red');
            }
            else {
                $("#txtPADEva").css('color', 'black');
            }
        });
        
        $("#txtFcEva").on("change", function () {
            if (50 > $("#txtFcEva").val() || $("#txtFcEva").val() > 100) {
        
                $("#txtFcEva").css('color', 'red');
            }
            else {
                $("#txtFcEva").css('color', 'black');
            }
        });
        
        $("#txtFrEva").on("change", function () {
            if (10 > $("#txtFrEva").val() || $("#txtFrEva").val() > 20) {
        
                $("#txtFrEva").css('color', 'red');
            }
            else {
                $("#txtFrEva").css('color', 'black');
            }
        });
        
        $("#txtTEva").on("change", function () {
            if (36 > $("#txtTEva").val() || $("#txtTEva").val() > 37) {
        
                $("#txtTEva").css('color', 'red');
            }
            else {
                $("#txtTEva").css('color', 'black');
            }
        });
        
        $("#txtPesoEva").on("change", function () {
            if ($("#txtPesoEva").val() != '' && $("#txtTallaEva").val() != '') {
                $("#txtTriajeIMCEva").val(Triaje.CalcularIMC($("#txtPesoEva").val(), $("#txtTallaEva").val()));
                $("#txtTriajeIMCEva").val($("#txtTriajeIMCEva").val() + ' (' + Triaje.imc($("#txtTriajeIMCEva").val()) + ')');
            }
        });
        
        $("#txtTallaEva").on("change", function () {
            if ($("#txtPesoEva").val() != '' && $("#txtTallaEva").val() != '') {                
                $("#txtTriajeIMCEva").val(Triaje.CalcularIMC($("#txtPesoEva").val(), $("#txtTallaEva").val()));
                $("#txtTriajeIMCEva").val($("#txtTriajeIMCEva").val() + ' (' + Triaje.imc($("#txtTriajeIMCEva").val()) + ')');
            }
            
        });
                           
        $("#txtSOEva").on("change", function () {
            if (95 > $("#txtSOEva").val() || $("#txtSOEva").val() > 100) {
        
                $("#txtSOEva").css('color', 'red');
            }
            else {
                $("#txtSOEva").css('color', 'black');
            }
        });
    },

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // <summary>
    // METDODOS BD
    // </summary>
    // INICIALIZA CONSUMO BD
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async ListarTriajeEmergencia(idAtencion) { // KHOYOSI
        //var resp = [];
        let datos;
        var data = new FormData();
        data.append('_token', $("meta[name='csrf-token']").attr("content"));        
        data.append('IdAtencion', idAtencion);        
                
        try {
            Triaje.Limpiar();
            datos = await
                $.ajax({
                    method: "POST",
                    url: "/Triaje/ListarTriajeEmergencia",                    
                    data: data,
                    dataType: "json",
                    cache: false,
                    processData: false,
                    contentType: false,
                });
                //console.log(datos);
            if (datos.resultado.length > 0) {
                Triaje.CargarTriaje(datos.resultado);
            }
        } catch (error) {
            alerta('error','', error);
        }

        //return resp;
    },

    async ListarTriajeEmergenciaPorEvaluacion(idAtencion, idEvaluacion) { // KHOYOSI
        //var resp = [];
        let datos;
        var data = new FormData();
        data.append('_token', $("meta[name='csrf-token']").attr("content"));        
        data.append('IdAtencion', idAtencion);
        data.append('IdEvaluacion', idEvaluacion);
                
        try {
            Triaje.LimpiarPorEvaluacion();
            datos = await
                $.ajax({
                    method: "POST",
                    url: "/Triaje/ListarTriajeEmergenciaPorEvaluacion",                    
                    data: data,
                    dataType: "json",
                    cache: false,
                    processData: false,
                    contentType: false,
                });
                //console.log(datos);
            if (datos.resultado.length > 0) {
                Triaje.CargarTriajeEvaluacion(datos.resultado[0]);
            }
        } catch (error) {
            alerta('error','', error);
        }

        //return resp;
    },
    
    async GuardarTriajeEmergencia(idAtencion, idServicio, idEvaluacion) {
        var formData = new FormData();
    
        formData.append('_token', $("meta[name='csrf-token']").attr("content"));
        formData.append("IdAtencion", idAtencion);  
        formData.append("IdServicio", idServicio);
        //formData.append("IdNumero", idEvaluacion);              
        presion = $("#txtPA").val() + "/" + $("#txtPAD").val()
        formData.append("TriajePresion", presion);
        formData.append("TriajeTalla", $("#txtTalla").val());
        formData.append("TriajeTemperatura", $("#txtT").val());
        formData.append("TriajePeso", $("#txtPeso").val());        
        formData.append("TriajeFR", $("#txtFr").val());
        formData.append("TriajeFC", $("#txtFc").val());
        formData.append("TriajeSO", $("#txtSO").val());
        formData.append("TriajeFIO2", $("#txtFIO2").val());
        formData.append("Hemoglucosa", $("#txtHemo").val());
        formData.append("MotivoAtencion", $("#txtMotivoAtencion").val());
        formData.append("IdTiempoSintoma", $("#cboTiempoSintoma").val());
        formData.append("TiempoSintoma", $("#txtTiempoSintoma").val());
        formData.append("IdTipoGravedad", $("#cboPrioridad").val());
                            
        try {            
            datos = await
                $.ajax({
                    method: "POST",
                    url: "/Triaje/GuardarTriajeEmergencia",                    
                    data: formData,
                    dataType: "json",
                    cache: false,
                    processData: false,
                    contentType: false,
                });
                //console.log(datos);
            if (datos.resultado.length > 0) {
                Triaje.Limpiar();
            }
        } catch (error) {
            alerta('error','', error);
        }    
    },

    async GuardarTriajeEmergenciaPorEvaluacion(idAtencion, idServicio, idEvaluacion) {
        var formData = new FormData();
    
        formData.append('_token', $("meta[name='csrf-token']").attr("content"));
        formData.append("IdAtencion", idAtencion);  
        formData.append("IdServicio", idServicio);
        formData.append("IdNumero", idEvaluacion);              
        presion = $("#txtPAEva").val() + "/" + $("#txtPADEva").val()
        formData.append("TriajePresion", presion);
        formData.append("TriajeTalla", $("#txtTallaEva").val());
        formData.append("TriajeTemperatura", $("#txtTEva").val());
        formData.append("TriajePeso", $("#txtPesoEva").val());        
        formData.append("TriajeFR", $("#txtFrEva").val());
        formData.append("TriajeFC", $("#txtFcEva").val());
        formData.append("TriajeSO", $("#txtSOEva").val());
        formData.append("TriajeFIO2", $("#txtFIO2Eva").val());
        formData.append("Hemoglucosa", $("#txtHemoEva").val());
                            
        try {            
            datos = await
                $.ajax({
                    method: "POST",
                    url: "/Triaje/GuardarTriajeEmergenciaPorEvaluacion",                    
                    data: formData,
                    dataType: "json",
                    cache: false,
                    processData: false,
                    contentType: false,
                });
                //console.log(datos);
            if (datos.resultado.length > 0) {
                Triaje.Limpiar();
            }
        } catch (error) {
            alerta('error','', error);
        }    
    },
    async GuardarTriajeHospitalizacionPorEvaluacion(idAtencion, idServicio, idEvaluacion) {
        var formData = new FormData();
    
        formData.append('_token', $("meta[name='csrf-token']").attr("content"));
        formData.append("IdAtencion", idAtencion);  
        formData.append("IdServicio", idServicio);
        formData.append("IdNumero", idEvaluacion);              
        presion = $("#txtPAEva").val() + "/" + $("#txtPADEva").val()
        formData.append("TriajePresion", presion);
        formData.append("TriajeTalla", $("#txtTallaEva").val());
        formData.append("TriajeTemperatura", $("#txtTEva").val());
        formData.append("TriajePeso", $("#txtPesoEva").val());        
        formData.append("TriajeFR", $("#txtFrEva").val());
        formData.append("TriajeFC", $("#txtFcEva").val());
        formData.append("TriajeSO", $("#txtSOEva").val());
        formData.append("TriajeFIO2", $("#txtFIO2Eva").val());
        formData.append("Hemoglucosa", $("#txtHemoEva").val());
                            
        try {            
            datos = await
                $.ajax({
                    method: "POST",
                    url: "/Triaje/GuardarTriajehospitalizacionPorEvaluacion",                    
                    data: formData,
                    dataType: "json",
                    cache: false,
                    processData: false,
                    contentType: false,
                });
                //console.log(datos);
            if (datos.resultado.length > 0) {
                Triaje.Limpiar();
            }
        } catch (error) {
            alerta('error','', error);
        }    
    },
    async GuardarTriajeHospitalizacion(idAtencion, idServicio, idEvaluacion) {
        var formData = new FormData();
    
        formData.append('_token', $("meta[name='csrf-token']").attr("content"));
        formData.append("IdAtencion", idAtencion);  
        formData.append("IdServicio", idServicio);
        // formData.append("IdNumero", idEvaluacion);              
        presion = $("#txtPA").val() + "/" + $("#txtPAD").val()
        formData.append("TriajePresion", presion);
        formData.append("TriajeTalla", $("#txtTalla").val());
        formData.append("TriajeTemperatura", $("#txtT").val());
        formData.append("TriajePeso", $("#txtPeso").val());        
        formData.append("TriajeFR", $("#txtFr").val());
        formData.append("TriajeFC", $("#txtFc").val());
        formData.append("TriajeSO", $("#txtSO").val());
        formData.append("TriajeFIO2", $("#txtFIO2").val());
        formData.append("Hemoglucosa", $("#txtHemo").val());
        formData.append("MotivoAtencion", $("#txtMotivoAtencion").val());
        formData.append("IdTiempoSintoma", $("#cboTiempoSintoma").val());
        formData.append("TiempoSintoma", $("#txtTiempoSintoma").val());
        formData.append("IdTipoGravedad", $("#cboPrioridad").val());
                            
        try {            
            datos = await
                $.ajax({
                    method: "POST",
                    url: "/Triaje/GuardarTriajeHospitalizacion",                    
                    data: formData,
                    dataType: "json",
                    cache: false,
                    processData: false,
                    contentType: false,
                });
                //console.log(datos);
            if (datos.resultado.length > 0) {
                Triaje.Limpiar();
            }
        } catch (error) {
            alerta('error','', error);
        }    
    },

    async GuardarTriajeHopitalizacionPorEvaluacion(idAtencion, idServicio, idEvaluacion) {
        var formData = new FormData();
    
        formData.append('_token', $("meta[name='csrf-token']").attr("content"));
        formData.append("IdAtencion", idAtencion);  
        formData.append("IdServicio", idServicio);
        formData.append("IdNumero", idEvaluacion);              
        presion = $("#txtPAEva").val() + "/" + $("#txtPADEva").val()
        formData.append("TriajePresion", presion);
        formData.append("TriajeTalla", $("#txtTallaEva").val());
        formData.append("TriajeTemperatura", $("#txtTEva").val());
        formData.append("TriajePeso", $("#txtPesoEva").val());        
        formData.append("TriajeFR", $("#txtFrEva").val());
        formData.append("TriajeFC", $("#txtFcEva").val());
        formData.append("TriajeSO", $("#txtSOEva").val());
        formData.append("TriajeFIO2", $("#txtFIO2Eva").val());
        formData.append("Hemoglucosa", $("#txtHemoEva").val());
                            
        try {            
            datos = await
                $.ajax({
                    method: "POST",
                    url: "/Triaje/GuardarTriajeHopitalizacionPorEvaluacion",                    
                    data: formData,
                    dataType: "json",
                    cache: false,
                    processData: false,
                    contentType: false,
                });
                //console.log(datos);
            if (datos.resultado.length > 0) {
                Triaje.Limpiar();
            }
        } catch (error) {
            alerta('error','', error);
        }    
    },
          
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // <summary>
    // DATATABLES
    // </summary>
    // INICIALIZA METODOS
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    CargarTriaje(data) {
        $("#txtPA").val(data.TriajePAS);
        $("#txtPAD").val(data.TriajePAD);
        $("#txtT").val(data.TriajeTEM);
        $("#txtFr").val(data.TriajeFR);
        $("#txtFc").val(data.TriajeFC);
        $("#txtPeso").val(data.TriajePeso);
        $("#txtTalla").val(data.TriajeTalla);
        $("#txtTriajeIMC").val(Triaje.CalcularIMC(data.TriajePeso, data.TriajeTalla) + ' (' + Triaje.imc(data.TriajePeso, data.TriajeTalla) + ')');
        $("#txtSO").val(data.TriajeSO);
        $("#txtFIO2").val(data.TriajeFIO2); 
        $("#txtHemo").val(data.Hemoglucotest); 

        $("#cboTiempoSintoma").val(data.IdTiempoSintoma); 
        $("#txtTiempoSintoma").val(data.TiempoSintoma); 
        $("#cboPrioridad").val(data.IdTiposGravedadAtencion); 
        $("#txtMotivoAtencion").val(data.DetalleMotivoEmergencia); 
    },

    CargarTriajeEvaluacion(data) {
        $("#txtPAEva").val(data.TriajePAS);
        $("#txtPADEva").val(data.TriajePAD);
        $("#txtTEva").val(data.TriajeTEM);
        $("#txtFrEva").val(data.TriajeFR);
        $("#txtFcEva").val(data.TriajeFC);
        $("#txtPesoEva").val(data.TriajePeso);
        $("#txtTallaEva").val(data.TriajeTalla);
        $("#txtTriajeIMCEva").val(Triaje.CalcularIMC(data.TriajePeso, data.TriajeTalla) + ' (' + Triaje.imc(data.TriajePeso, data.TriajeTalla) + ')');
        $("#txtSOEva").val(data.TriajeSO);
        $("#txtFIO2Eva").val(data.TriajeFIO2); 
        $("#txtHemoEva").val(data.Hemoglucotest); 
        $("#TriajeEvaCard input[type=text]").change();
    },


    CargarTriajeEvaluacion(data) {

        console.log('aqui que llega', data)
        $("#txtPAEvaluacion").val(data.TriajePAS);
        $("#txtPADEvaluacion").val(data.TriajePAD);
        $("#txtTEvaluacion").val(data.TriajeTEM);
        $("#txtFrEvaluacion").val(data.TriajeFR);
        $("#txtFcEvaluacion").val(data.TriajeFC);
        $("#txtPesoEvaluacion").val(data.TriajePeso);
        $("#txtTallaEvaluacion").val(data.TriajeTalla);
        //$("#txtImc").val(data.Triaje.IMC);        
        $("#txtSOEvaluacion").val(data.TriajeSO);
        $("#txtFIO2Evaluacion").val(data.TriajeFIO2); 
        $("#txtHemoEvaluacion").val(data.Hemoglucotest); 

        $("#cboTiempoSintomaEvaluacion").val(data.IdTiempoSintoma); 
        $("#txtTiempoSintomaEvaluacion").val(data.TiempoSintoma); 
        $("#cboPrioridadEvaluacion").val(data.IdTiposGravedadAtencion); 
        $("#txtMotivoAtencionEvaluacion").val(data.DetalleMotivoEmergencia); 
    },

    CalcularIMC(peso, talla) {
        var imc = peso / (Math.pow((talla / 100), 2))
        imc = Math.round(imc * 100) / 100;                
        return imc
    },

    imc(imc) {
        grado = "";
        if (imc < 18.5) {
            grado = "Bajo peso";
        } else if (imc >= 18.5 && imc <= 24.99) {
            grado = "Peso Normal";
        } else if (imc >= 25 && imc <= 29.99) {
            grado = "Sobrepeso";
        } else if (imc >= 30 && imc <= 34.99) {
            grado = "Obesidad grado I";
        } else if (imc >= 35 && imc <= 39.99) {
            grado = "Obesidad grado II";
        } else if (imc >= 40) {
            grado = "Obesidad grado III";
        }
    
        return grado
    },
    
    
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



}