var personalMedico = [19,
    100,
    101,
    102,
    103,
    104,
    105,
    106,
    107,
    108,
    109,
    110,
    111,
    112,
    113,
    114,
    115,
    116,
    117,
    118,
    119,
    120,
    121,
    122,
    123,
    124,
    125,
    199,
    219,
    220,
    221,
    222,
    223,
    224,
    231,
    232,
    233,
    235,
    236,
    26,
    27,
    35
    ]

var objEspecialidadMedica = {
    idEspecialidad :0,
    idDepartamento : 0,
    especialidad : "",
    departamento : ""
} 

var objAreaEmpleado = {
    idArea :0,
    idSubArea : 0,
    area : "",
    subarea : ""
}
var listDataEspecialidadMedica = [];
var listDataAreaEmpleado = [];

var objRol = {
    idRol :0,
    rol : ""
}

var listDataRol = [];

var objCargo = {
    idTipoCargo : 0,
    cargo: ""
}

var listDataCargo = [];

var fotoEmpleado;

var esMedico = false;
var empleadoID =0;

listDataEmpleados = [];
var objEmpleado = {
    IdEmpleado:0
}



async function listarTipoDocumento(opcion){
    let token = $('meta[name="csrf-token"]').attr("content");
    await fetch("/hospitalizacion/listarCombos", {
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
                const cboNroDocumento = $("#cboNroDocumento");
                resultado.forEach((item) => {
                    // Crear una opción por cada elemento recibido
                    const option = $("<option>")
                        .val(item.codigo) // Establecer el valor de la opción
                        .text(item.valor); // Establecer el texto de la opción
                        cboNroDocumento.append(option); // Agregar la opción al combo
                });
            }
        });

}

async function listarSexo(opcion){
    let token = $('meta[name="csrf-token"]').attr("content");
    await fetch("/hospitalizacion/listarCombos", {
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
                const cboSexo = $("#cboSexo");
                resultado.forEach((item) => {
                    // Crear una opción por cada elemento recibido
                    const option = $("<option>")
                        .val(item.codigo) // Establecer el valor de la opción
                        .text(item.valor); // Establecer el texto de la opción
                        cboSexo.append(option); // Agregar la opción al combo
                });
            }
        });

}

async function listarTipoEmpleado(opcion){
    let token = $('meta[name="csrf-token"]').attr("content");
    await fetch("/hospitalizacion/listarCombos", {
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
                const cboTipoEmpleado = $("#cboTipoEmpleado");
                resultado.forEach((item) => {
                    // Crear una opción por cada elemento recibido
                    const option = $("<option>")
                        .val(item.codigo) // Establecer el valor de la opción
                        .text(item.valor); // Establecer el texto de la opción
                        cboTipoEmpleado.append(option); // Agregar la opción al combo
                });
                $(".chzn-select").chosen().trigger("chosen:updated");
            }
        });

}

async function listarCondicionTrabajo(opcion){
    let token = $('meta[name="csrf-token"]').attr("content");
    await fetch("/hospitalizacion/listarCombos", {
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
                const cboCondicionTrabajo = $("#cboCondicionTrabajo");
                resultado.forEach((item) => {
                    // Crear una opción por cada elemento recibido
                    const option = $("<option>")
                        .val(item.codigo) // Establecer el valor de la opción
                        .text(item.valor); // Establecer el texto de la opción
                        cboCondicionTrabajo.append(option); // Agregar la opción al combo
                });
                $(".chzn-select").chosen().trigger("chosen:updated");
            }
        });

}

async function listarTipoDestacado(opcion){
    let token = $('meta[name="csrf-token"]').attr("content");
    await fetch("/hospitalizacion/listarCombos", {
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
                const cboTipoDestacado = $("#cboTipoDestacado");
                resultado.forEach((item) => {
                    // Crear una opción por cada elemento recibido
                    const option = $("<option>")
                        .val(item.codigo) // Establecer el valor de la opción
                        .text(item.valor); // Establecer el texto de la opción
                        cboTipoDestacado.append(option); // Agregar la opción al combo
                });
            }
        });

}

async function listarDepartamentos(opcion){
    let token = $('meta[name="csrf-token"]').attr("content");
    await fetch("/hospitalizacion/listarCombos", {
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
                const cboDepartamentos = $("#cboDepartamento");
                resultado.forEach((item) => {
                    // Crear una opción por cada elemento recibido
                    const option = $("<option>")
                        .val(item.codigo) // Establecer el valor de la opción
                        .text(item.valor); // Establecer el texto de la opción
                        cboDepartamentos.append(option); // Agregar la opción al combo
                });
                $(".chzn-select").chosen().trigger("chosen:updated");
            }
        });

}

async function listarEspecialidades(opcion,valor){
    let token = $('meta[name="csrf-token"]').attr("content");
    await fetch("/hospitalizacion/listarCombos", {
        method: "POST", // Método HTTP
        headers: {
            "Content-Type": "application/json", // Especifica el tipo de contenido
        },
        body: JSON.stringify({
            Opcion: opcion,
            Codigo: valor,
            _token: token,
        }), // Convierte los parámetros a una cadena JSON
    })
        .then((res) => res.json())
        .catch((error) => console.log(error))
        .then((res) => {
            if (Array.isArray(res.data)) {
                resultado = res.data;
                const cboEspecialidad = $("#cboEspecialidad");
                cboEspecialidad.empty();
                resultado.forEach((item) => {
                    // Crear una opción por cada elemento recibido
                    const option = $("<option>")
                        .val(item.codigo) // Establecer el valor de la opción
                        .text(item.valor); // Establecer el texto de la opción
                        cboEspecialidad.append(option); // Agregar la opción al combo
                });

            }
        });
        $(".chzn-select").chosen().trigger("chosen:updated");    
}

async function listarRoles(opcion){
    let token = $('meta[name="csrf-token"]').attr("content");
    await fetch("/hospitalizacion/listarCombos", {
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
                resultado = res.data;
                const cboRoles = $("#cboRoles");
                cboRoles.empty();
                resultado.forEach((item) => {
                    // Crear una opción por cada elemento recibido
                    const option = $("<option>")
                        .val(item.codigo) // Establecer el valor de la opción
                        .text(item.valor); // Establecer el texto de la opción
                        cboRoles.append(option); // Agregar la opción al combo
                });

            }
        });
        $(".chzn-select").chosen().trigger("chosen:updated");    
}

async function listarCargos(opcion){
    let token = $('meta[name="csrf-token"]').attr("content");
    await fetch("/hospitalizacion/listarCombos", {
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
                resultado = res.data;
                const cboCargos = $("#cboCargos");
                cboCargos.empty();
                resultado.forEach((item) => {
                    // Crear una opción por cada elemento recibido
                    const option = $("<option>")
                        .val(item.codigo) // Establecer el valor de la opción
                        .text(item.valor); // Establecer el texto de la opción
                        cboCargos.append(option); // Agregar la opción al combo
                });

            }
        });
        $(".chzn-select").chosen().trigger("chosen:updated");    
}


async function listarColegiatura(opcion){
    let token = $('meta[name="csrf-token"]').attr("content");
    await fetch("/hospitalizacion/listarCombos", {
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
                resultado = res.data;
                const cboColegiatura = $("#cboColegiatura");
                cboColegiatura.empty();
                resultado.forEach((item) => {
                    // Crear una opción por cada elemento recibido
                    const option = $("<option>")
                        .val(item.codigo) // Establecer el valor de la opción
                        .text(item.valor); // Establecer el texto de la opción
                        cboColegiatura.append(option); // Agregar la opción al combo
                });

            }
        });
        $(".chzn-select").chosen().trigger("chosen:updated");    
}

async function listarArea(opcion){
    let token = $('meta[name="csrf-token"]').attr("content");
    await fetch("/hospitalizacion/listarCombos", {
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
                resultado = res.data;
                const cboArea = $("#cboArea");
                cboArea.empty();
                resultado.forEach((item) => {
                    // Crear una opción por cada elemento recibido
                    const option = $("<option>")
                        .val(item.codigo) // Establecer el valor de la opción
                        .text(item.valor); // Establecer el texto de la opción
                        cboArea.append(option); // Agregar la opción al combo
                });

            }
        });
        $(".chzn-select").chosen().trigger("chosen:updated");    
}

async function listarSubArea(opcion,valor){
    let token = $('meta[name="csrf-token"]').attr("content");
    await fetch("/hospitalizacion/listarCombos", {
        method: "POST", // Método HTTP
        headers: {
            "Content-Type": "application/json", // Especifica el tipo de contenido
        },
        body: JSON.stringify({
            Opcion: opcion,
            Codigo: valor,
            _token: token,
        }), // Convierte los parámetros a una cadena JSON
    })
        .then((res) => res.json())
        .catch((error) => console.log(error))
        .then((res) => {
            if (Array.isArray(res.data)) {
                resultado = res.data;
                const cboSubArea = $("#cboSubArea");
                cboSubArea.empty();
                resultado.forEach((item) => {
                    // Crear una opción por cada elemento recibido
                    const option = $("<option>")
                        .val(item.codigo) // Establecer el valor de la opción
                        .text(item.valor); // Establecer el texto de la opción
                        cboSubArea.append(option); // Agregar la opción al combo
                });

            }
        });
        $(".chzn-select").chosen().trigger("chosen:updated");    
}


var Seguridad = {
    Plugins() {
        $("#txtFechaNacimiento").datepicker({
            todayHighlight: true,
            autoclose: true,
            format: "dd/mm/yyyy", // Asegurar formato correcto
            orientation: "bottom"
        });
    
        // Formatear fecha de hoy
        var fecha = new Date();
        var dia = fecha.getDate();
        var mes = parseInt(fecha.getMonth()) + 1;
        var yyy = fecha.getFullYear();
        if (dia < 10)
            dia = '0' + dia; //agrega cero si el menor de 10
        if (mes < 10)
            mes = '0' + mes
        fechaP = dia + "/" + mes + "/" + yyy;
        fechaHoy = yyy + "-" + mes + "-" + dia;
    
        $("#txtFechaNacimiento").val(fechaP);
    },
    InitialCharge() {
        $('#personalSalud-tab-link').hide();
        $("#txtDNI").prop('disabled', true);

        $("#txtDNI").on("keypress", function (event) {
            // Obtener el código de la tecla presionada
            let charCode = event.which || event.keyCode;
    
            // Permitir teclas de control como backspace y enter
            if (charCode === 8 || charCode === 13 || charCode === 46) {
                return true;
            }
    
            // Permitir solo números (0-9)
            if (charCode < 48 || charCode > 57) {
                event.preventDefault();
                return false;
            }
        });

        $("#txtNroDocumento").on("keypress", function (event) {
            // Obtener el código de la tecla presionada
            let charCode = event.which || event.keyCode;
    
            // Permitir teclas de control como backspace y enter
            if (charCode === 8 || charCode === 13 || charCode === 46) {
                return true;
            }
    
            // Permitir solo números (0-9)
            if (charCode < 48 || charCode > 57) {
                event.preventDefault();
                return false;
            }
        });

    
        $("#txtCodigoPlanilla").on("keypress", function (event) {
            // Obtener el código de la tecla presionada
            let charCode = event.which || event.keyCode;
    
            // Permitir teclas de control como backspace y enter
            if (charCode === 8 || charCode === 13 || charCode === 46) {
                return true;
            }
    
            // Permitir solo números (0-9)
            if (charCode < 48 || charCode > 57) {
                event.preventDefault();
                return false;
            }
        });

        $("#txtColegiatura").on("keypress", function (event) {
            // Obtener el código de la tecla presionada
            let charCode = event.which || event.keyCode;
    
            // Permitir teclas de control como backspace y enter
            if (charCode === 8 || charCode === 13 || charCode === 46) {
                return true;
            }
    
            // Permitir solo números (0-9)
            if (charCode < 48 || charCode > 57) {
                event.preventDefault();
                return false;
            }
        });

        //txtApellidoPaterno
        //txtApellidoMaterno
        //txtNombres
        //

        
        $("#txtApellidoPaterno").on("input", function() {
            $(this).val($(this).val().replace(/[^a-zA-Z\s]/g, "").toUpperCase());
        });

        $("#txtApellidoMaterno").on("input", function() {
            $(this).val($(this).val().replace(/[^a-zA-Z\s]/g, "").toUpperCase());
        });

        $("#txtNombres").on("input", function() {
            $(this).val($(this).val().replace(/[^a-zA-Z\s]/g, "").toUpperCase());
        });

        $("#txtNombre").on("input", function() {
            $(this).val($(this).val().replace(/[^a-zA-Z\s]/g, "").toUpperCase());
        });

        $("#txtApellidoP").on("input", function() {
            $(this).val($(this).val().replace(/[^a-zA-Z\s]/g, "").toUpperCase());
        });

        $("#txtApellidoM").on("input", function() {
            $(this).val($(this).val().replace(/[^a-zA-Z\s]/g, "").toUpperCase());
        });

        listarTipoDocumento(35);
        listarSexo(31);
        listarTipoEmpleado(33);
        listarCondicionTrabajo(32);
        listarTipoDestacado(34);
        listarDepartamentos(43);
        listarRoles(36);
        listarCargos(37);
        listarColegiatura(39);
        listarArea(43);
        $("#btnLimpiar").trigger("click");
    },
    DataTableEmpleados(){

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
                    data: "CodigoPlanilla",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "10%",
                    targets: 2,
                    data: "Usuario",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "10%",
                    targets: 2,
                    data: "ApellidoPaterno",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "10%",
                    targets: 2,
                    data: "ApellidoMaterno",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "10%",
                    targets: 2,
                    data: "Nombres",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "10%",
                    targets: 2,
                    data: "DNI",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "10%",
                    targets: 2,
                    data: "FechaNacimiento",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "10%",
                    targets: 2,
                    data: "AccedeVWeb",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                        if(rowData.AccedeVWeb == 0){
                            $(td).html(
                                '<span class="chip danger">' +
                                'NO' +
                                "</span >"
                            );
                        }
                        else {
                            $(td).html(
                                '<span class="chip success">' +
                                'SI' +
                                "</span >"
                            );
                        }
                    },
                },
                {
                    width: "10%",
                    targets: 2,
                    data: "EsActivo",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                        if(rowData.EsActivo == 0){
                            $(td).html(
                                '<span class="chip danger">' +
                                'CESADO' +
                                "</span >"
                            );
                        }
                        else if(rowData.EsActivo == -1) {
                            $(td).html(
                                '<span class="chip danger">' +
                                'ELIMINADO' +
                                "</span >"
                            );
                        }
                        else {
                            $(td).html(
                                '<span class="chip success">' +
                                'ACTIVO' +
                                "</span >"
                            );
                        }
                    },
                },
                {
                    width: "10%",
                    targets: 2,
                    data: null,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "center");
                        $(td).html(
                            `<button class='btn btn-info' 
                                    data-toggle='tooltip' 
                                    data-placement='top' 
                                    title='Editar'
                                    onclick='Seguridad.editarEmpleado(this)'>
                            <i class='fa fa-pencil'></i>
                            </button>
                            
                            <button class='btn btn-danger' 
                                    data-toggle='tooltip' 
                                    data-placement='top' 
                                    title='Eliminar'
                                    onclick='Seguridad.eliminarEmpleado(this)'>
                            <i class='fa fa-trash'></i>
                            </button>`
                        );
                    },
                }
            ],
        };

        oTable_Empleados = $("#tbEmpleados").dataTable(parms);

    },
    DataTableEspecialidades(){
        DataTableEspecialidades = $("#tblEspecialidades").DataTable({
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
                    width: "55%",
                    targets: 2,
                    data: "departamento",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "35%",
                    targets: 1,
                    data: "especialidad",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "10%",
                    targets: 3,
                    data: null,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "center");
                        $(td).html(
                            `<button class='btn btn-danger' 
                                data-toggle='tooltip' 
                                data-placement='top' 
                                title='Eliminar' 
                                onclick='Seguridad.eliminarEspecialidad(this)'>
                                <i class='fa fa-trash'></i>
                            </button>`
                        );
                    },
                },
            ],
        });
    },
    DataTableAreas(){
        DataTableAreas = $("#tblAreas").DataTable({
            scrollCollapse: true,
            autoWidth: false,
            ordering: false,
            scrollY: '200px',
            scrollCollapse: true,
            data: null,
            destroy: true,
            info: false,
            bFilter: false,
            paging: false,
            responsive: true,
            columns: [
                {
                    width: "55%",
                    targets: 2,
                    data: "area",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "35%",
                    targets: 1,
                    data: "subarea",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "10%",
                    targets: 3,
                    data: null,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "center");
                        $(td).html(
                            `<button class='btn btn-danger' 
                                data-toggle='tooltip' 
                                data-placement='top' 
                                title='Eliminar' 
                                onclick='Seguridad.eliminarArea(this)'>
                                <i class='fa fa-trash'></i>
                            </button>`
                        );
                    },
                },
            ],
        });
    },
    agregarEspecialidad(){
        objEspecialidadMedica.idDepartamento=$("#cboDepartamento").val();
        objEspecialidadMedica.idEspecialidad=$("#cboEspecialidad").val();
        objEspecialidadMedica.departamento=$("#cboDepartamento option:selected").text();
        objEspecialidadMedica.especialidad=$("#cboEspecialidad option:selected").text();

        if($("#cboDepartamento").val() == 0 && $("#cboEspecialidad").val() == 0){
            Swal.fire({
                title: "Seleccione un departamento y una especialidad",
                icon: "warning",
                draggable: true,
            });
        }

        else if (listDataEspecialidadMedica.length === 0) {

            listDataEspecialidadMedica.push(objEspecialidadMedica);
            DataTableEspecialidades.rows.add(listDataEspecialidadMedica).draw();
            // Limpiar formulario
            Seguridad.limpiarEspecialidad();

        } else {
            const especialidadExistente = listDataEspecialidadMedica.some(e => e.especialidad === objEspecialidadMedica.especialidad && e.departamento === objEspecialidadMedica.departamento);

            if (especialidadExistente) {
                Swal.fire({
                    title: "No se puede guardar un especialidad existente",
                    icon: "warning",
                    draggable: true,
                });
            } 
            else {
                // Agregar nuevo diagnóstico
                listDataEspecialidadMedica.push(objEspecialidadMedica);

                // Limpiar la tabla y agregar todos los registros
                DataTableEspecialidades.clear();
                DataTableEspecialidades.rows.add(listDataEspecialidadMedica).draw();

                // Limpiar formulario
                Seguridad.limpiarEspecialidad();
            }
        }
    },
    limpiarEspecialidad(){
        objEspecialidadMedica = {};
        $("#cboEspecialidad").val(0);
        $("#cboDepartamento").val(0);
        $(".chzn-select").chosen().trigger("chosen:updated");
    },
    eliminarEspecialidad(rowData) {
        let $tr = $(rowData).closest('tr');
        let lessData = DataTableEspecialidades.row($tr).data();
        const listFinal=listDataEspecialidadMedica.filter((e)=>e.especialidad.trim() != lessData.especialidad.trim() && e.departamento.trim() != lessData.departamento);
        listDataEspecialidadMedica= listFinal;
        DataTableEspecialidades.row($tr).remove().draw(false);
    },
    DataTableRoles(){
        DataTableRoles = $("#tblRoles").DataTable({
            scrollCollapse: true,
            autoWidth: false,
            ordering: false,
            scrollY: '200px',
            scrollCollapse: true,
            data: null,
            destroy: true,
            info: false,
            bFilter: false,
            paging: false,
            responsive: true,
            columns: [
                {
                    width: "80%",
                    targets: 2,
                    data: "rol",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "10%",
                    targets: 3,
                    data: null,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "center");
                        $(td).html(
                            `<button class='btn btn-danger' 
                                data-toggle='tooltip' 
                                data-placement='top' 
                                title='Eliminar' 
                                onclick='Seguridad.eliminarRoles(this)'>
                                <i class='fa fa-trash'></i>
                            </button>`
                        );
                    },
                },
            ],
        });
    },
    agregarRoles(){
        objRol.idRol=$("#cboRoles").val();
        objRol.rol=$("#cboRoles option:selected").text();
        
        if($("#cboRoles").val() == 0){
            Swal.fire({
                title: "Seleccione un rol",
                icon: "warning",
                draggable: true,
            });
        }
        
        else if (listDataRol.length === 0) {

            listDataRol.push(objRol);
            DataTableRoles.rows.add(listDataRol).draw();
            // Limpiar formulario
            Seguridad.limpiarRoles();

        } else {
            
            lista=$("#tblRoles").dataTable().api(true).rows().data().toArray();
            
            const rolExistente = lista.some(e => e.rol === objRol.rol && e.idRol === objRol.idRol);

            if (rolExistente) {
                Swal.fire({
                    title: "No se puede guardar un rol existente",
                    icon: "warning",
                    draggable: true,
                });
            } 
            else {
                // Agregar nuevo diagnóstico
                listDataRol.push(objRol);

                // Limpiar la tabla y agregar todos los registros
                DataTableRoles.clear();
                DataTableRoles.rows.add(listDataRol).draw();

                // Limpiar formulario
                Seguridad.limpiarRoles();
            }
        }
    },
    limpiarRoles(){
        objRol = {};
        $("#cboRoles").val(0);
        $(".chzn-select").chosen().trigger("chosen:updated");
    },
    eliminarRoles(rowData){
        let $tr = $(rowData).closest('tr');
        let lessData = DataTableRoles.row($tr).data();
        const listFinal=listDataRol.filter((e)=>e.rol.trim() != lessData.rol.trim());
        listDataRol= listFinal;
        DataTableRoles.row($tr).remove().draw(false);
    },
    DataTableCargos(){
        DataTableCargos = $("#tblCargos").DataTable({
            scrollCollapse: true,
            autoWidth: false,
            ordering: false,
            scrollY: '200px',
            scrollCollapse: true,
            data: null,
            destroy: true,
            info: false,
            bFilter: false,
            paging: false,
            responsive: true,
            columns: [
                {
                    width: "80%",
                    targets: 2,
                    data: "cargo",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "10%",
                    targets: 3,
                    data: null,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "center");
                        $(td).html(
                            `<button class='btn btn-danger' 
                                data-toggle='tooltip' 
                                data-placement='top' 
                                title='Eliminar' 
                                onclick='Seguridad.eliminarCargos(this)'>
                                <i class='fa fa-trash'></i>
                            </button>`
                        );
                    },
                },
            ],
        }); 
    },
    agregarCargos(){
        objCargo.idTipoCargo=$("#cboCargos").val();
        objCargo.cargo=$("#cboCargos option:selected").text();

        if($("#cboCargos").val() == 0){
            Swal.fire({
                title: "Seleccione un cargo",
                icon: "warning",
                draggable: true,
            });
        }

        else if (listDataCargo.length === 0) {

            listDataCargo.push(objCargo);
            DataTableCargos.rows.add(listDataCargo).draw();
            // Limpiar formulario
            Seguridad.limpiarCargos();

        } else {
            
            listaCargos=$("#tblCargos").dataTable().api(true).rows().data().toArray()

            const rolExistente = listaCargos.some(e => e.cargo === objCargo.cargo);

            if (rolExistente) {
                Swal.fire({
                    title: "No se puede guardar un rol existente",
                    icon: "warning",
                    draggable: true,
                });
            } 
            else {
                // Agregar nuevo diagnóstico
                listDataCargo.push(objCargo);

                // Limpiar la tabla y agregar todos los registros
                DataTableCargos.clear();
                DataTableCargos.rows.add(listDataCargo).draw();

                // Limpiar formulario
                Seguridad.limpiarCargos();
            }
        }
    },
    limpiarCargos(){
        objCargo = {};
        $("#cboCargos").val(0);
        $(".chzn-select").chosen().trigger("chosen:updated");
    },
    eliminarCargos(rowData){
        /*let $tr = $(rowData).closest('tr');
        let lessData = DataTableCargos.row($tr).data();
        const listFinal=DataTableCargos.filter((e)=>e.cargo.trim() != lessData.cargo.trim());
        listDataCargo= listFinal;
        DataTableCargos.row($tr).remove().draw(false);*/
        let $tr = $(rowData).closest('tr');
        let lessData = DataTableCargos.row($tr).data();
        const listFinal=listDataCargo.filter((e)=>e.cargo.trim() != lessData.cargo.trim());
        listDataCargo= listFinal;
        DataTableCargos.row($tr).remove().draw(false);
    },
    agregarAreas(){
        objAreaEmpleado.idArea=$("#cboArea").val();
        objAreaEmpleado.idSubArea=$("#cboSubArea").val();
        objAreaEmpleado.area=$("#cboArea option:selected").text();
        objAreaEmpleado.subarea=$("#cboSubArea option:selected").text();

        if($("#cboArea").val() == 0 && $("#cboSubArea").val() == 0){
            Swal.fire({
                title: "Seleccione un area y una subarea",
                icon: "warning",
                draggable: true,
            });
        }

        else if (listDataAreaEmpleado.length === 0) {

            listDataAreaEmpleado.push(objAreaEmpleado);
            DataTableAreas.rows.add(listDataAreaEmpleado).draw();
            // Limpiar formulario
            Seguridad.limpiarArea();

        } else {
            const especialidadExistente = listDataAreaEmpleado.some(e => e.area === objAreaEmpleado.area && e.subarea === objAreaEmpleado.subarea);

            if (especialidadExistente) {
                Swal.fire({
                    title: "No se puede guardar un especialidad existente",
                    icon: "warning",
                    draggable: true,
                });
            } 
            else {
                // Agregar nuevo diagnóstico
                listDataAreaEmpleado.push(objAreaEmpleado);

                // Limpiar la tabla y agregar todos los registros
                DataTableAreas.clear();
                DataTableAreas.rows.add(listDataAreaEmpleado).draw();

                // Limpiar formulario
                Seguridad.limpiarArea();
            }
        }
    },
    async ListarEmpleados(data) {
        Cargando(1);
        oTable_Empleados.fnClearTable();
        let token = $('meta[name="csrf-token"]').attr("content");
        await fetch(
            `/seg/listar_empleados`,
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
                        oTable_Empleados.fnAddData(res.data);
                    }
                }
            });
        Cargando(0)    
    },
    limpiarArea(){
        objAreaEmpleado = {};
        $("#cboArea").val(0);
        $("#cboSubArea").val(0);
        $(".chzn-select").chosen().trigger("chosen:updated");
    },
    eliminarArea(rowData) {
        let $tr = $(rowData).closest('tr');
        let lessData = DataTableAreas.row($tr).data();
        const listFinal=listDataAreaEmpleado.filter((e)=>e.area.trim() != lessData.area.trim() && e.subarea.trim() != lessData.subarea);
        listDataAreaEmpleado= listFinal;
        DataTableAreas.row($tr).remove().draw(false);
    },
    eliminarEmpleado(rowData){
        let $tr = $(rowData).closest('tr');
        let empleado = $("#tbEmpleados").DataTable().row($tr).data();
        empleadoID=empleado.IdEmpleado;
        if(empleadoID){
            Swal.fire({
                title: "Desea eliminar el registro?",
                showDenyButton: true,
                confirmButtonText: "SI",
                denyButtonText: `NO`
              }).then((result) => {

                if (result.isConfirmed) {

                  objEmpleado.IdEmpleado=empleadoID
                  listDataEmpleados.push(objEmpleado);
                  empleado.listDataEmpleados=listDataEmpleados;
                  empleado.Accion=3;
                  eliminarUsuario(empleado);
                  buscarEmpleados();
                } else if (result.isDenied) {

                }
              });
        }   
    },
    editarEmpleado(rowData){
        let $tr = $(rowData).closest('tr');
        let empleado = $("#tbEmpleados").DataTable().row($tr).data();
        empleadoID=empleado.IdEmpleado;
        if(empleadoID>0){
            $("#txtCodigoPlanilla").val(empleado.CodigoPlanilla);
            $("#cboNroDocumento").val(empleado.idTipoDocumento);
            $("#txtDNI").val(empleado.DNI);
            $("#txtNombre").val(empleado.Nombres);
            $("#txtApellidoP").val(empleado.ApellidoPaterno);
            $("#txtApellidoM").val(empleado.ApellidoMaterno);
            $("#txtFechaNacimiento").val(empleado.FechaNacimiento);
            $("#cboSexo").val(empleado.IdTipoSexo);
            $("#cboTipoEmpleado").val(empleado.IdTipoEmpleado);
            $("#cboCondicionTrabajo").val(empleado.IdCondicionTrabajo);
            $("#cboTipoDestacado").val(empleado.idTipoDestacado);
            $("#txtUsuario").val(empleado.Usuario);
            $("#txtColegiatura").val(empleado.Colegiatura);
            $("#txtLoteHis").val(empleado.idColegioHIS);
            $("#cboColegiatura").val(empleado.idColegioHIS);
            $("#txtRneFua").val(empleado.rne);
            mostrarImagen(empleado.FotoPerfil);

            if(empleado.clave){
                $("#txtClaveVWeb").val("**********");
            }

            if(empleado.egresado == 1){
                $('#chkEgresado').prop('checked', true);     
            }
            else{
                $('#chkEgresado').prop('checked', false); 
            }

            if(empleado.AccedeVWeb == 1){
                $('#chkAccesoWeb').prop('checked', true);
            }
            else{
                $('#chkAccesoWeb').prop('checked', false);
            }

            if(empleado.EsActivo == 1){
                $('#chkActivo').prop('checked', true);
            }
            else {
                $('#chkActivo').prop('checked', false);
            }

            listarRolesPorEmpleado(empleado.IdEmpleado,41);
            listarCargosPorEmpleados(empleado.IdEmpleado,42);
            listarLaboraPorEmpleados(empleado.IdEmpleado,44);

            $(".chzn-select").chosen().trigger("chosen:updated");
            let valor =$("#cboTipoEmpleado").val();
            if (personalMedico.includes(parseInt(valor))) {
                $('#personalSalud-tab-link').show();
                $("#saludPersonal").show();
                esMedico=true;
    
            } else {
                $('#personalSalud-tab-link').hide();
                $("#saludPersonal").hide();
                esMedico=false;
            }

            $("#modalLabelsuccess").text("Editar Empleado: " +empleado.Nombres+' '+empleado.ApellidoPaterno + ' ' + empleado.ApellidoMaterno);
            $("#modalEmpleados").modal("show");
        }


    }
}

function validarDatos(){

    let fechaNacimiento =$("#txtFechaNacimiento").val();
    if($("#txtCodigoPlanilla").val() == '' || $("#txtCodigoPlanilla").val() == null || $("#txtCodigoPlanilla").val() == undefined){
        toastr.warning("Escriba la planilla","Mensaje de Error - RESYS");
        return false;
    }

    if($("#cboNroDocumento").val() == 0 || $("#cboNroDocumento").val() == null || $("#cboNroDocumento").val() == undefined){
        toastr.warning("Seleccione el tipo de documento","Mensaje de Error - RESYS");
        return false;
    }
    
    if($("#txtDNI").val() == 0 || $("#txtDNI").val() == null || $("#txtDNI").val() == undefined){
        toastr.warning("Escriba el numero de documento","Mensaje de Error - RESYS");
        return false;
    }

    if($("#txtNombre").val() == "" || $("#txtNombre").val() == null || $("#txtNombre").val() == undefined){
        toastr.warning("Escriba el nombre del empleado","Mensaje de Error - RESYS");
        return false;
    }

    if($("#txtApellidoP").val() == "" || $("#txtApellidoP").val() == null || $("#txtApellidoP").val() == undefined){
        toastr.warning("Escriba el apellido paterno del empleado","Mensaje de Error - RESYS");
        return false;
    }

    if($("#txtApellidoM").val() == "" || $("#txtApellidoM").val() == null || $("#txtApellidoM").val() == undefined){
        toastr.warning("Escriba el apellido materno del empleado","Mensaje de Error - RESYS");
        return false;
    }

    if (!esMayorDe18(fechaNacimiento)) {
        toastr.warning("Debe ser mayor de 18 años.","Mensaje de Error - RESYS");
        return false;
    }
    
    if($("#cboSexo").val() == 0 || $("#cboSexo").val() == null || $("#cboSexo").val() == undefined){
        toastr.warning("Seleccione el sexo","Mensaje de Error - RESYS");
        return false;
    }

    if($("#cboTipoEmpleado").val() == 0 || $("#cboTipoEmpleado").val() == null || $("#cboTipoEmpleado").val() == undefined){
        toastr.warning("Seleccione el tipo de empleado","Mensaje de Error - RESYS");
        return false;
    }

    if($("#cboCondicionTrabajo").val() == 0 || $("#cboCondicionTrabajo").val() == null || $("#cboCondicionTrabajo").val() == undefined){
        toastr.warning("Seleccione la condición de trabajo","Mensaje de Error - RESYS");
        return false;
    }

    if($("#cboTipoDestacado").val() == 0 || $("#cboTipoDestacado").val() == null || $("#cboTipoDestacado").val() == undefined){
        toastr.warning("Seleccione el tipo","Mensaje de Error - RESYS");
        return false;
    }

    if($("#txtUsuario").val() == '' || $("#txtUsuario").val() == null || $("#txtUsuario").val() == undefined){
        toastr.warning("Escriba el nombre del usuario","Mensaje de Error - RESYS");
        return false;
    }

    if($("#txtClaveVWeb").val() == '' || $("#txtClaveVWeb").val() == null || $("#txtClaveVWeb").val() == undefined ){
        toastr.warning("Escriba la contraseña","Mensaje de Error - RESYS");
        return false;
    }

    if($("#txtClaveVWeb").val().length < 7){
        toastr.warning("La contraseña debe ser mayor 7 carácteres","Mensaje de Error - RESYS");
        return false;
    }

    /*if(fotoEmpleado === undefined){
        toastr.warning("Debe poner una foto","Mensaje de Error - RESYS");
        return false;
    }*/

    let valor = $("#cboTipoEmpleado").val();
    if (personalMedico.includes(parseInt(valor))) {
        if($("#cboColegiatura").val() == 0 || $("#cboColegiatura").val() == null || $("#cboColegiatura").val() == undefined){
            toastr.warning("Seleccione el tipo de colegiatura","Mensaje de Error - RESYS");
            return false; 
        }
    }
        let formData = new FormData();
        formData.append("CodigoPlanilla", $("#txtCodigoPlanilla").val());
        formData.append("TipoDocumento", $("#cboNroDocumento").val());
        formData.append("NroDocumento", $("#txtDNI").val());
        formData.append("Nombres", $("#txtNombre").val());
        formData.append("ApellidoMaterno", $("#txtApellidoM").val());
        formData.append("ApellidoPaterno", $("#txtApellidoP").val());
        formData.append("FechaNacimiento", $("#txtFechaNacimiento").val());
        formData.append("IdCondicionTrabajo",$("#cboCondicionTrabajo").val())
        formData.append("TipoSexo", $("#cboSexo").val());
        formData.append("IdTipoEmpleado", $("#cboTipoEmpleado").val());
        formData.append("Dni", $("#txtDNI").val());
        formData.append("TipoDestacado", $("#cboTipoDestacado").val());
        formData.append("Usuario", $("#txtUsuario").val());
        formData.append("Clave", $("#txtClaveVWeb").val());
        formData.append("FotoPerfil",fotoEmpleado);
        formData.append("EsWeb",($('#chkAccesoWeb').is(":checked") ? 1 : 0));
        formData.append("listDataRoles",JSON.stringify(listDataRol));
        formData.append("listDataCargos",JSON.stringify(listDataCargo));
        formData.append("listDataAreas",JSON.stringify(listDataAreaEmpleado));
        formData.append("EsActivo",($('#chkActivo').is(":checked") ? 1 : 0));

        if(empleadoID == 0){
            formData.append("IdEmpleado", 0);
            formData.append("Accion",1);
        }
        else{
            formData.append("IdEmpleado", empleadoID);
            formData.append("Accion",2);
        }

        if(esMedico){
            formData.append("EsMedico", esMedico);
            formData.append("Colegiatura", $("#txtColegiatura").val());
            formData.append("loteHis", $("#txtLoteHis").val());
            formData.append("idColegioHIS", $("#cboColegiatura").val());
            formData.append("rne", $("#txtRneFua").val());
            formData.append("egresado", $("#chkEgresado").is(":checked") ? 1 : 0);
            formData.append("listDataEspecialidadMedica",JSON.stringify(listDataEspecialidadMedica));
        }
        
        crearUsuario(formData);
    


}
function esMayorDe18(fechaStr) {
    // Dividir la fecha ingresada (dd/mm/yyyy)
    let partes = fechaStr.split("/");
    if (partes.length !== 3) return false; // Validar formato correcto
    
    let dia = parseInt(partes[0], 10);
    let mes = parseInt(partes[1], 10) - 1; // Restar 1 porque en Date los meses van de 0 a 11
    let anio = parseInt(partes[2], 10);

    // Crear objeto Date con la fecha ingresada
    let fechaNacimiento = new Date(anio, mes, dia);

    // Obtener la fecha actual restando 18 años
    let hoy = new Date();
    let fechaMinima = new Date();
    fechaMinima.setFullYear(hoy.getFullYear() - 18); // Restar 18 años

    // Comparar fechas
    return fechaNacimiento <= fechaMinima;
}

function crearUsuario(formData){
    let token = $('meta[name="csrf-token"]').attr("content");
    fetch("/seg/matenedor_empleados", {
       method: "POST",
       headers: {
        "X-CSRF-TOKEN": token,
        },
       body: formData, 
    })
    .then((res) => res.json())
    .catch((error) => Swal.fire({title: "Se ha encontrado un error: "+error.error,icon: "error"}))
    .then((res) => {
        if (!res) {
            Swal.fire({title: "No se pudo guardar la respuesta", icon: "error"});
        } else if (res.status == 200) {
            Swal.fire({title: res.message, icon: "success"});
            limpiarCampos();
            $("#modalEmpleados").modal("hide");
            buscarEmpleados();
        } else {
            Swal.fire({title: res.message, icon: "error"});
            limpiarCampos();
            //$("#modalEmpleados").modal("show");
        }
    });
}

function eliminarUsuario(data){
    let token = $('meta[name="csrf-token"]').attr("content");
    fetch("/seg/eliminar_empleados", {
       method: "POST", // Método HTTP
       headers: {
           "Content-Type": "application/json", // Especifica el tipo de contenido
       },
       body: JSON.stringify({
           data: data,
           _token: token,
       }), // Convierte los parámetros a una cadena JSON
       
   })
   .then((res) => res.json())
   .catch((error) => Swal.fire({title: "Se ha encontrado un error: "+error.error,icon: "error"}))
   .then((res) => {
       if (!res) {
           Swal.fire({title: "No se pudo guardar la respuesta", icon: "error"});
       } else if (res.status == 200) {
           Swal.fire({title: res.message, icon: "success"});
           limpiarCampos();
       } else {
           Swal.fire({title: res.message, icon: "error"});
           limpiarCampos();
       }
   });
}

function buscarEmpleados(){
    const nroDocumento       = $("#txtNroDocumento").val();
    const apellidoPaterno    = $("#txtApellidoPaterno").val();
    const apellidoMaterno    = $("#txtApellidoMaterno").val();
    const nombres            = $("#txtNombres").val();
    let data = {};

    data.NroDocumento= nroDocumento;
    data.ApellidoPaterno = apellidoPaterno;
    data.ApellidoMaterno = apellidoMaterno;
    data.Nombres = nombres;
    Seguridad.ListarEmpleados(data);
}

function listarRolesPorEmpleado(IdEmpleado,opcion){
    let token = $('meta[name="csrf-token"]').attr("content");
    DataTableRoles.clear().draw();
    return fetch("/hospitalizacion/listarCombos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            Opcion: opcion,
            _token: token,
            Codigo: parseInt(IdEmpleado),
        }),
    })
    .then((res) => res.json()) 
    .then((res) => {
        if (Array.isArray(res.data)) {
            listDataRol = [];
            let result = res.data;
            listDataRol = result;
            DataTableRoles.rows.add(listDataRol).draw();
        }
        return []; 
    })
    .catch((error) => {
        console.log(error);
        return []; 
    });
}

function listarCargosPorEmpleados(IdEmpleado,opcion){
    let token = $('meta[name="csrf-token"]').attr("content");

    return fetch("/hospitalizacion/listarCombos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            Opcion: opcion,
            _token: token,
            Codigo: parseInt(IdEmpleado),
        }),
    })
    .then((res) => res.json()) // Convertir la respuesta a JSON
    .then((res) => {
        if (Array.isArray(res.data)) {
            //return res.data; // Retornar los datos en lugar de asignarlos a una variable global
            listDataCargo=[];
            let result = res.data;
            listDataCargo=result;
            DataTableCargos.rows.add(listDataCargo).draw();
        }
        return []; // Si no hay datos, retornar un array vacío
    })
    .catch((error) => {
        console.log(error);
        return []; // En caso de error, retornar un array vacío para evitar fallos en la ejecución
    });
}

//listarLaboraPorEmpleados
function listarLaboraPorEmpleados(IdEmpleado,opcion){
    let token = $('meta[name="csrf-token"]').attr("content");

    return fetch("/hospitalizacion/listarCombos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            Opcion: opcion,
            _token: token,
            Codigo: parseInt(IdEmpleado),
        }),
    })
    .then((res) => res.json()) // Convertir la respuesta a JSON
    .then((res) => {
        if (Array.isArray(res.data)) {
            //return res.data; // Retornar los datos en lugar de asignarlos a una variable global
            listDataAreaEmpleado=[];
            let result = res.data;
            listDataAreaEmpleado=result;
            DataTableAreas.rows.add(listDataAreaEmpleado).draw();
        }
        return []; // Si no hay datos, retornar un array vacío
    })
    .catch((error) => {
        console.log(error);
        return []; // En caso de error, retornar un array vacío para evitar fallos en la ejecución
    });
}

function limpiarCampos(){
    var fecha = new Date();
    var dia = fecha.getDate();
    var mes = parseInt(fecha.getMonth()) + 1;
    var yyy = fecha.getFullYear();
    if (dia < 10)
        dia = '0' + dia; //agrega cero si el menor de 10
    if (mes < 10)
        mes = '0' + mes
    fechaP = dia + "/" + mes + "/" + yyy;


    $("#txtCodigoPlanilla").val("");
    $("#cboNroDocumento").val(0);
    $("#txtDNI").val("");
    $("#txtNombre").val("");
    $("#txtApellidoP").val("");
    $("#txtApellidoM").val("");
    $("#txtFechaNacimiento").val(fechaP);
    $("#cboSexo").val(0);
    $("#cboTipoEmpleado").val(0);
    $("#cboCondicionTrabajo").val(0);
    $("#cboTipoDestacado").val(0);
    $("#txtUsuario").val("");
    $('#chkAccesoWeb').prop('checked', false);
    $("#txtColegiatura").val("");
    $("#txtLoteHis").val("");
    $("#cboColegiatura").val(0);
    $("#txtRneFua").val("");
    $("#chkEgresado").prop('checked', false);
    $("#txtClaveVWeb").val("");
    listDataRol=[];
    objRol={};
    listDataCargo=[];
    objCargo={};
    listDataEmpleados=[];
    objEmpleado={};
    objAreaEmpleado={};
    listDataAreaEmpleado=[];
    DataTableRoles.row().remove().draw(false);
    DataTableCargos.row().remove().draw(false);
    DataTableAreas.row().remove().draw(false);
    empleadoID=0;
    $(".chzn-select").chosen().trigger("chosen:updated");
}

function mostrarImagen(image){
    document.getElementById("previewImage").src="";
    if(image == null || image == "" || image == undefined){
        document.getElementById("previewImage").src="https://wilsonchamp.com.ar/Diagnostico/images/NoImagen.gif";
    }
    else {
        document.getElementById("previewImage").src="";
        let imageUrl = `/seg/imagenes/${image}`;
        document.getElementById("previewImage").src = imageUrl; 
    }

    $(".preview").show();
}

function listarCampos(){
    $("#txtNroDocumento").val("");
    $("#txtApellidoPaterno").val("");
    $("#txtApellidoMaterno").val("");
    $("#txtNombres").val("");
}

$(document).ready(function () {
    //let claveModificar =false;
    Seguridad.Plugins();
    Seguridad.InitialCharge();
    Seguridad.DataTableEmpleados();
    Seguridad.DataTableEspecialidades();
    Seguridad.DataTableRoles();
    Seguridad.DataTableCargos();
    Seguridad.DataTableAreas();
    buscarEmpleados();

    $("#cboNroDocumento").change(function(){
        let valor = $("#cboNroDocumento").val();
        console.log(valor);
        if(valor == 0 || valor ==11){
            $("#txtDNI").prop('disabled', true);
        }
        else if(valor == 2){
            $("#txtDNI").prop('disabled', false);
            $("#txtDNI").attr('maxlength','20');
        }
        else{
            $("#txtDNI").prop('disabled', false);
            $("#txtDNI").attr('maxlength','8');
        }
    });


    $("#cboDepartamento").change(function(){
        let valor = parseInt($(this).val());
        listarEspecialidades(45,valor);
    });

    $("#btnAgregar").click(function(){
        $("#modalLabelsuccess").text('Registro de empleado');
        $("#modalEmpleados").modal("show");
    });

    $("#btnCerrarModalEmpleados").click(function(){
        $("#modalEmpleados").modal("hide");
        limpiarCampos();
    })

    $('#cboTipoEmpleado').change(function() {
        let tipoEmpleadoId = parseInt($(this).val());

        if (personalMedico.includes(tipoEmpleadoId)) {
            $('#personalSalud-tab-link').show();
            $("#saludPersonal").show();
            esMedico=true;

        } else {
            $('#personalSalud-tab-link').hide();
            $("#saludPersonal").hide();
            esMedico=false;
        }
    });

    $("#cboArea").change(function(){
        let areaId= parseInt($(this).val());
        listarSubArea(45,areaId);
    });

    $("#btnLimpiar").click(function(){
        listarCampos();
        
    });
    $("#fileInput").on("change", function (event) {
        let file = event.target.files[0];
        fotoEmpleado = file;
        let validExtensions = ["image/jpeg", "image/png"];
        let maxSize = 2 * 1024 * 1024; 
        if (file) {
            let fileName = file.name;
            let fileType = file.type;
            let fileSize = file.size;
            $(".file-name").text(fileName);

            if(!validExtensions.includes(fileType)){
                toastr.warning("Solo se permiten imágenes JPG o PNG.","Mensaje de Error - RESYS");
                return false;
            }
            if(fileSize>maxSize){
                toastr.warning("El tamaño máximo permitido es 2MB.","Mensaje de Error - RESYS");
                return false; 
            }
            else{
                var reader = new FileReader();
                reader.onload = function (e) {
                   $("#previewImage").attr("src", e.target.result);
                   $(".preview").show();
                 };
                   reader.readAsDataURL(file);
            }


            } else {
                $(".file-name").text("Ningún archivo seleccionado");
                $(".preview").hide();
            }
    });

    $("#btnVerClave").click(function(){
        let x = document.getElementById("txtClaveVWeb");
        if (x.type === "password") {
          x.type = "text";
        } else {
          x.type = "password";
        }
    });

    $("#btnGuardarEmpleados").click(function(){
        validarDatos();
    });


    $("#btnBuscarEmpleado").click(function(){
        buscarEmpleados();
    });

    $("#btnExportarExcel").click(async function () {
        let titulo ="REPORTE DE USUARIOS - HNAL";
    
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
            "Cod. Planilla", "Usuario", "Apellido Paterno", "Apellido Materno", "Nombres", "Documento",
            "Fecha Nacimiento","Web", "Estado","Fec. Modificación"
        ];
    
        // ** Obtener la tabla HTML**
        let table = $("#tbEmpleados").DataTable();

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
            "CodigoPlanilla", "Usuario", "ApellidoPaterno", "ApellidoMaterno", "Nombres",
            "DNI", "FechaNacimiento", "AccedeVWeb", "EsActivo","FechaModificacion" 
        ]; 
        filas.forEach(row => {
            if(row.FechaModificacion == '1900-01-01'){
                row.FechaModificacion="";
            }

            if(row.AccedeVWeb == 0){
                row.AccedeVWeb = "NO";
            }
            else{
                row.AccedeVWeb = "SI";
            }
            if(row.EsActivo == 0){
                row.EsActivo = "CESADO";
            }
            else if(row.EsActivo == -1){
                row.EsActivo = "ELIMINADO";
            }
            else{
                row.EsActivo = "ACTIVO";
            }
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
            { width: 18 },  // Historia Clini
            { width: 18 },  // Fecha Nacimi
            { width: 13 },  // Fecha Ingreso
            { width: 16 },  // Fecha Ingreso
            { width: 10 },  // Fecha Egreso
            { width: 10 },  // Serv. Actual
            { width: 10 },
            { width: 16}
        ];


        // ** Guardar y descargar el archivo**
        let buffer = await workbook.xlsx.writeBuffer();
        let blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        let link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "reporte_usuarios.xlsx";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
})