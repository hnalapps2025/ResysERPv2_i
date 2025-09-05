var objRolesPermisos = {
    idGrupo :0,
    idItem : 0,
    grupo : "",
    item : "",
    agregar :0,
    eliminar:0,
    consultar:0,
    modificar:0
} 

var listDataRolesPermisos = [];
var objRol = {
    idRol :0,
    rol : ""
}

var listDataRol = [];

var objCargo = {
    idTipoCargo : 0,
    cargo: ""
}

var rolID =0;

listDataPermiso = [];
var objPermiso = {
    idPermiso:0,
    permiso:""
};

var listDataReporte = [];
var objReporte = {
    idReporte:0,
    reporte:""
}



async function listarModulos(opcion){
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
                const cboModulos = $("#cboModulos");
                cboModulos.empty(); // Limpia solo una vez
                let grupos = {}; // Objeto para almacenar los grupos con su código
            
                resultado.forEach((item) => {
                    if (!grupos[item.idGrupo]) {
                        grupos[item.idGrupo] = {
                            nombre: item.grupo, // Nombre del grupo
                            opciones: [],
                        };
                    }
                    grupos[item.idGrupo].opciones.push(item);
                });
            
                // Crear los optgroups y agregar opciones
                Object.entries(grupos)
                    .sort(([, a], [, b]) => a.nombre.localeCompare(b.nombre))
                    .forEach(([idGrupo, grupo]) => {
                    let optgroup = $("<optgroup>")
                        .attr("label", grupo.nombre)
                        .attr("data-id-grupo", idGrupo); // Agregar ID del grupo
            
                    grupo.opciones.forEach((item) => {
                        let option = $("<option>")
                            .val(item.codigo) // Código del ítem
                            .attr("data-id-grupo", idGrupo) // Guardar ID del grupo en cada opción
                            .text(item.valor); // Texto visible
            
                        optgroup.append(option);
                    });
            
                    cboModulos.append(optgroup); // Agregar el grupo al select
                });
            
                $(".chzn-select").chosen().trigger("chosen:updated"); // Actualizar chosen-select
            }
            
            
        });
        $(".chzn-select").chosen().trigger("chosen:updated");    
}


async function listarPermisos(opcion){
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
                const cboPermisos = $("#cboPermisos");
                cboPermisos.empty();
                resultado.forEach((item) => {
                    // Crear una opción por cada elemento recibido
                    const option = $("<option>")
                        .val(item.codigo) // Establecer el valor de la opción
                        .text(item.valor); // Establecer el texto de la opción
                        cboPermisos.append(option); // Agregar la opción al combo
                });

            }
        });
        $(".chzn-select").chosen().trigger("chosen:updated");    
}

async function listarReportes(opcion){
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
            // Clear existing options
            $('#cboReportes').empty();
            
            // Add default option
            $('#cboReportes').append('<option value="">Seleccione un reporte</option>');
            
            // Group the data by MODULO
            var groupedByModule = {};
            $.each(resultado, function(index, item) {
                if (!groupedByModule[item.MODULO]) {
                    groupedByModule[item.MODULO] = [];
                }
                groupedByModule[item.MODULO].push(item);
            });
            
            // Add options with optgroups for each module
            $.each(groupedByModule, function(moduleName, items) {
                var optgroup = $('<optgroup>').attr('label', moduleName);
                
                $.each(items, function(index, item) {
                    optgroup.append(
                        $('<option>')
                            .attr('value', item.idReporte)
                            .attr('data-menu', item.id_MenuReporte)
                            .text(item.Reporte)
                    );
                });
                
                $('#cboReportes').append(optgroup);
            });
            
            // If you're using the chosen plugin, refresh it
            $('#cboReportes').trigger("chosen:updated");
            }
            
            
        });

}


function crearRolPermiso(data){
    let token = $('meta[name="csrf-token"]').attr("content");
    fetch("/seg/mantenedor_permisos", {
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
           Rol.limpiarCampos();
           $("#modalEmpleados").modal("hide");   
           buscarRoles();
       } else {
           Swal.fire({title: res.message, icon: "error"});
       }

   });
}


var Rol = {

    InitialCharge() {
        listarModulos(41);
        listarPermisos(44);
        listarReportes(45);
        $("#btnLimpiar").trigger("click");
    },
    DataTablePermisos(){
        DataTablePermisos = $("#tblPermisos").DataTable({
            scrollCollapse: true,
            autoWidth: false,
            ordering: true,
            data: null,
            destroy: true,
            info: false,
            bFilter: false,
            paging: false,
            responsive: true,
            paging: true,
            columns: [
                {
                    width: "55%",
                    targets: 2,
                    data: "permiso",
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
                                onclick='Rol.eliminarPermiso(this)'>
                                <i class='fa fa-trash'></i>
                            </button>`
                        );
                    },
                },
            ],
        });
    },
    DataTableRolesPermisos(){
        DataTableRolesPermisos = $("#tblModulos").DataTable({
            autoWidth: false,
            ordering: true,
            data: null,
            destroy: true,
            info: false,
            bFilter: false,
            paging: false,
            responsive: true,
            paging: true,
            columns: [
                {
                    width: "35%",
                    targets: 1,
                    data: "item",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "left");
                    },
                },
                {
                    width: "15%",
                    targets: 2,
                    data: "grupo",
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
                        var checkboxHtml = `<div class="form-group">
                                              <div class="check__toggle text-sm-center">
                                                <label class="toggle">
                                                  <input class="toggle__input" type="checkbox" id="chkAgregar" ${cellData.agregar == 1 ? 'checked' : ''}>
                                                  <span class="toggle__label mr-2"></span>
                                                </label> 
                                              </div>
                                            </div>`;
                
                        // Limpia el contenido actual de la celda y agrega el checkbox
                        $(td).empty().html(checkboxHtml);
                    },
                },
                {
                    width: "10%",
                    targets: 4,
                    data: null,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "center");

                        var checkbox = $(`<div class="form-group">
                                                <div class="check__toggle text-sm-center">
                                                    <label class="toggle"><input class="toggle__input" type="checkbox" id="chkModificar" ${cellData.modificar == 1 ? 'checked' : ''}>
                                                        <span class="toggle__label mr-2">
                                                        </span>
                                                    </label> 
                                                </div>
                                            </div>`);
                        if (cellData === true) {
                            checkbox.prop('checked', true);
                        }
                        else{
                            checkbox.prop('checked', false);
                        }

                        // Limpia el contenido actual de la celda y agrega el checkbox
                        $(td).empty().append(checkbox);
                    },
                },
                {
                    width: "10%",
                    targets: 5,
                    data: null,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "center");

                        var checkbox = $(`<div class="form-group">
                                                <div class="check__toggle text-sm-center">
                                                    <label class="toggle"><input class="toggle__input" type="checkbox" id="chkConsultar" ${cellData.consultar == 1 ? 'checked' : ''}>
                                                        <span class="toggle__label mr-2">
                                                        </span>
                                                    </label> 
                                                </div>
                                            </div>`);
                        if (cellData === true) {
                            checkbox.prop('checked', true);
                        }
                        else{
                            checkbox.prop('checked', false);
                        }

                        // Limpia el contenido actual de la celda y agrega el checkbox
                        $(td).empty().append(checkbox);
                    },
                },
                {
                    width: "10%",
                    targets: 6,
                    data: null,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "center");

                        var checkbox = $(`<div class="form-group">
                                                <div class="check__toggle text-sm-center">
                                                    <label class="toggle"><input class="toggle__input" type="checkbox" id="chkEliminar" ${cellData.eliminar == 1 ? 'checked' : ''}>
                                                        <span class="toggle__label mr-2">
                                                        </span>
                                                    </label> 
                                                </div>
                                            </div>`);
                        if (cellData === true) {
                            checkbox.prop('checked', true);
                        }
                        else{
                            checkbox.prop('checked', false);
                        }

                        // Limpia el contenido actual de la celda y agrega el checkbox
                        $(td).empty().append(checkbox);
                    },
                },
                {
                    width: "10%",
                    targets: 7,
                    data: null,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr("align", "center");
                        $(td).html(
                            `<button class='btn btn-danger' 
                                data-toggle='tooltip' 
                                data-placement='top' 
                                title='Eliminar' 
                                onclick='Rol.eliminarRolPermisos(this)'>
                                <i class='fa fa-trash'></i>
                            </button>`
                        );
                    },
                },
            ],
        });
    },
    DataTableReportes(){
        DataTableReportes = $("#tblReportes").DataTable({
            scrollCollapse: true,
            autoWidth: false,
            ordering: true,
            data: null,
            destroy: true,
            info: false,
            bFilter: false,
            paging: true,
            responsive: true,
            columns: [
                {
                    width: "55%",
                    targets: 2,
                    data: "reporte",
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
                                onclick='Rol.eliminarReporte(this)'>
                                <i class='fa fa-trash'></i>
                            </button>`
                        );
                    },
                },
            ],
        });
    },
    
    DataTableRoles(){

        var parms = {
            destroy: true,
            bFilter: false,
            ordering: true,
            scrollX: true,
            autoWidth: false,
            searching:true,
            columns: [
                {
                    width: "80%",
                    targets: 2,
                    data: "Nombre",
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
                            `
                                <button class='btn btn-warning' 
                                data-toggle='tooltip' 
                                data-placement='top' 
                                title='Editar' 
                                onclick='Rol.editarRol(this)'>
                                <i class='fa fa-pencil'></i>
                                 </button>

                                 <button class='btn btn-danger' 
                data-toggle='tooltip' 
                data-placement='top' 
                title='Eliminar' 
                onclick='Rol.eliminarRol(this)'>
                <i class='fa fa-trash'></i>
            </button>
                            `
                        );
                    },
                },
            ],
        };

        oTable_Roles = $("#tbRoles").dataTable(parms);
    },
    agregarRoles(){
        
        if($("#cboModulos").val() == 0){
            Swal.fire({
                title: "Seleccione un rol",
                icon: "warning",
                draggable: true,
            });
        }
        
        else if (listDataRolesPermisos.length === 0) {


            objRolesPermisos.agregar=($('#chkAgregar').is(":checked") ? 1 : 0);
            objRolesPermisos.modificar=($('#chkModificar').is(":checked") ? 1 : 0);
            objRolesPermisos.consultar=($('#chkConsultar').is(":checked") ? 1 : 0);
            objRolesPermisos.eliminar=($('#chkEliminar').is(":checked") ? 1 : 0);
            listDataRolesPermisos.push(objRolesPermisos);
            DataTableRolesPermisos.rows.add(listDataRolesPermisos).draw();
            Rol.limpiarRoles();

        } else {
            
            lista=$("#tblModulos").dataTable().api(true).rows().data().toArray();
            
            const rolExistente = lista.some(e => e.idItem === objRolesPermisos.idItem && e.idGrupo === objRolesPermisos.idGrupo);

            if (rolExistente) {
                Swal.fire({
                    title: "No se puede guardar un rol existente",
                    icon: "warning",
                    draggable: true,
                });
            } 
            else {
                // Agregar nuevo diagnóstico
                objRolesPermisos.agregar=($('#chkAgregar').is(":checked") ? 1 : 0);
                objRolesPermisos.modificar=($('#chkModificar').is(":checked") ? 1 : 0);
                objRolesPermisos.consultar=($('#chkConsultar').is(":checked") ? 1 : 0);
                objRolesPermisos.eliminar=($('#chkEliminar').is(":checked") ? 1 : 0);
                listDataRolesPermisos.push(objRolesPermisos);
                // Limpiar la tabla y agregar todos los registros
                DataTableRolesPermisos.clear();
                DataTableRolesPermisos.rows.add(listDataRolesPermisos).draw();

                // Limpiar formulario
                Rol.limpiarRoles();
            }
        }
    },
    agregarPermisos(){
        objPermiso.idPermiso=$("#cboPermisos").val();
        objPermiso.permiso=$("#cboPermisos option:selected").text();
        if($("#cboPermisos").val() == 0){
            Swal.fire({
                title: "Seleccione un permiso",
                icon: "warning",
                draggable: true,
            });
        }
        else if (listDataPermiso.length === 0) {

            listDataPermiso.push(objPermiso);
            DataTablePermisos.rows.add(listDataPermiso).draw();
            // Limpiar formulario
            Rol.limpiarPermisos();

        }
        
        else {
            const especialidadExistente = listDataPermiso.some(e => e.idPermiso === objPermiso.idPermiso);

            if (especialidadExistente) {
                Swal.fire({
                    title: "No se puede guardar un especialidad existente",
                    icon: "warning",
                    draggable: true,
                });
            } 
            else {
                // Agregar nuevo diagnóstico
                listDataPermiso.push(objPermiso);

                // Limpiar la tabla y agregar todos los registros
                DataTablePermisos.clear();
                DataTablePermisos.rows.add(listDataPermiso).draw();

                // Limpiar formulario
                Rol.limpiarPermisos();
            }
        }
    },
    eliminarPermiso(rowData){
        let $tr = $(rowData).closest('tr');
        let lessData = DataTablePermisos.row($tr).data();
        const listFinal=listDataPermiso.filter((e)=>e.permiso.trim() != lessData.permiso.trim());
        listDataPermiso= listFinal;
        DataTablePermisos.row($tr).remove().draw(false);
    },
    limpiarPermisos(){
        objPermiso = {};
        $("#cboPermisos").val(0);
        $(".chzn-select").chosen().trigger("chosen:updated");
    },
    limpiarRoles(){
        //objRolesPermisos = {};
        //listDataRolesPermisos=[];
        $("#cboModulos").val(0);
        $(".chzn-select").chosen().trigger("chosen:updated");
    },
    limpiarCampos(){
        objRolesPermisos = {};
        listDataRolesPermisos=[];
        objPermiso = {};
        listDataPermiso = [];
        objReporte ={};
        listDataReporte=[];
        $("#txtRol").val("");
        $("#cboModulos").val(0);
        $("#cboPermisos").val(0);
        $("#cboReportes").val(0);
        DataTableRolesPermisos.rows().remove().draw(false);
        DataTablePermisos.rows().remove().draw(false);
        DataTableReportes.rows().remove().draw(false);
        $(".chzn-select").chosen().trigger("chosen:updated");
    },
    eliminarRol(rowData){
        let $tr = $(rowData).closest('tr');
        let rol = $("#tbRoles").DataTable().row($tr).data();
        Swal.fire({
            title: "Desea eliminar el rol?",
            showCancelButton: true,
            icon: "warning",
            confirmButtonText: "Si",
            cancelButtonText: `Cancelar`,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33"
          }).then((result) => {
            if (result.isConfirmed) {
              let obj = {};
              obj.IdRol = rol.IdRol;
              console.log(obj.IdRol);
              //eliminarRoles(obj);  
              //Swal.fire("MENSAJE DE CONFIRMARCIÓN - RESYS", "Registro modificado correctamente", "success");
            }
          });
    },
    async ListarRolesPermisos(data) {
        Cargando(1)
        oTable_Roles.fnClearTable();
        $("#tbRoles").DataTable().clear().draw();
        let token = $('meta[name="csrf-token"]').attr("content");
        await fetch(
            `/seg/listar_roles_permisos`,
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
                        oTable_Roles.fnAddData(res.data);
                    }
                }
                else{
                    toastr.error(res.mensaje,"Mensaje de Error - RESYS")
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
    eliminarRolPermisos(rowData) {
        let $tr = $(rowData).closest('tr');
        let lessData = DataTableRolesPermisos.row($tr).data();
        const listFinal=listDataRolesPermisos.filter((e)=>e.idGrupo.trim() != lessData.idGrupo.trim() && e.idItem.trim() != lessData.idItem.trim());
        listDataRolesPermisos= listFinal;
        DataTableRolesPermisos.row($tr).remove().draw(false);
    },
    editarRol(rowData){
        let $tr = $(rowData).closest('tr');
        let rol = $("#tbRoles").DataTable().row($tr).data();
        rolID=rol.IdRol;
        if(rolID>0){

            $("#modalLabelsuccess").text("Editar Rol: " +rol.Nombre);
            $("#txtRol").val(rol.Nombre);
            obtenerRol(42,rolID);
            obtenerPermiso(48,rolID);
            obtenerReporte(49,rolID);
            $("#modalEmpleados").modal("show");
        }


    },
    eliminarRol(rowData){
        let $tr = $(rowData).closest('tr');
        let roles = $("#tbRoles").DataTable().row($tr).data();
        let obj = {};
        obj.rolID = roles.IdRol;
        obj.Accion = 3;
        if(obj.rolID){
            Swal.fire({
                title: "Desea eliminar el registro?",
                icon: "question",
                showDenyButton: true,
                confirmButtonText: "SI",
                denyButtonText: `NO`
              }).then((result) => {
                if (result.isConfirmed) {
                    eliminarRoles(obj);
                } else if (result.isDenied) {
                }
              });
        }   
    },
    agregarReportes(){
        objReporte.idReporte=$("#cboReportes").val();
        objReporte.reporte=$("#cboReportes option:selected").text();
        if($("#cboReportes").val() == 0){
            Swal.fire({
                title: "Seleccione un reporte",
                icon: "warning",
                draggable: true,
            });
        }
        else if (listDataReporte.length === 0) {

            listDataReporte.push(objReporte);
            console.log(DataTableReportes);
            DataTableReportes.rows.add(listDataReporte).draw();
            // Limpiar formulario
            Rol.limpiarReportes();

        }
        
        else {
            const especialidadExistente = listDataReporte.some(e => e.idReporte === objReporte.idReporte);

            if (especialidadExistente) {
                Swal.fire({
                    title: "No se puede guardar un especialidad existente",
                    icon: "warning",
                    draggable: true,
                });
            } 
            else {
                // Agregar nuevo diagnóstico
                listDataReporte.push(objReporte);

                // Limpiar la tabla y agregar todos los registros
                DataTableReportes.clear();
                DataTableReportes.rows.add(listDataReporte).draw();

                // Limpiar formulario
                Rol.limpiarReportes();
            }
        }
    },
    limpiarReportes(){
        objReporte={};
        $("#cboReportes").val(0);
        $(".chzn-select").chosen().trigger("chosen:updated");
    }
}


function eliminarRoles(data){
    let token = $('meta[name="csrf-token"]').attr("content");
    fetch("/seg/eliminar_roles_permisos", {
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
           //limpiarCampos();
       } else {
           Swal.fire({title: res.message, icon: "error"});
           //limpiarCampos();
       }
   });
}


function obtenerRol(opcion,idRol){
    DataTableRolesPermisos.clear().draw();
    let token = $('meta[name="csrf-token"]').attr("content");
    return fetch("/hospitalizacion/listarCombos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            Opcion: opcion,
            _token: token,
            Codigo: parseInt(idRol),
        }),
    })
    .then((res) => res.json()) 
    .then((res) => {
        if (Array.isArray(res.data)) {
            listDataRolesPermisos = [];
            let result = res.data;
            listDataRolesPermisos=result;
            DataTableRolesPermisos.rows.add(listDataRolesPermisos).draw();
        }
        return []; 
    })
    .catch((error) => {
        console.log(error);
        return []; 
    });
}

function obtenerPermiso(opcion,idRol){
    DataTablePermisos.clear().draw();
    let token = $('meta[name="csrf-token"]').attr("content");
    return fetch("/hospitalizacion/listarCombos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            Opcion: opcion,
            _token: token,
            Codigo: parseInt(idRol),
        }),
    })
    .then((res) => res.json()) 
    .then((res) => {
        if (Array.isArray(res.data)) {
            listDataPermiso = [];
            let result = res.data;
            listDataPermiso=result;
            DataTablePermisos.rows.add(listDataPermiso).draw();
        }
        return []; 
    })
    .catch((error) => {
        console.log(error);
        return []; 
    });
}


function obtenerReporte(opcion,idRol){
    DataTableReportes.clear().draw();
    let token = $('meta[name="csrf-token"]').attr("content");
    return fetch("/hospitalizacion/listarCombos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            Opcion: opcion,
            _token: token,
            Codigo: parseInt(idRol),
        }),
    })
    .then((res) => res.json()) 
    .then((res) => {
        if (Array.isArray(res.data)) {
            listDataReporte = [];
            let result = res.data;
            listDataReporte=result;
            DataTableReportes.rows.add(listDataReporte).draw();
        }
        return []; 
    })
    .catch((error) => {
        console.log(error);
        return []; 
    });
}

function validarDatos(){

    if($("#txtRol").val() == '' || $("#txtRol").val() == null || $("#txtRol").val() == undefined){
        toastr.warning("Escriba el nombre del rol","Mensaje de Error - RESYS");
        return false;
    }

    if(listDataRolesPermisos == [] || listDataRolesPermisos == null || listDataRolesPermisos == undefined){
        toastr.warning("Debe seleccionar un rol","Mensaje de Error - RESYS");
        return false;
    }
}

function buscarRoles(){
    const rol  = $("#txtRoles").val();
    let data = {};

    data.Rol= rol;
    Rol.ListarRolesPermisos(data);
}

function listarRolesPorEmpleado(IdEmpleado,opcion){
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
    .then((res) => res.json()) 
    .then((res) => {
        if (Array.isArray(res.data)) {
            let result = res.data;
            listDataRol=result;
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
            let result = res.data;
        }
        return []; // Si no hay datos, retornar un array vacío
    })
    .catch((error) => {
        console.log(error);
        return []; // En caso de error, retornar un array vacío para evitar fallos en la ejecución
    });
}

$(document).ready(function () {
    Rol.InitialCharge();
    Rol.DataTableRoles();
    Rol.DataTablePermisos();
    Rol.DataTableRolesPermisos();
    Rol.DataTableReportes();
    buscarRoles();
    $("#btnAgregar").click(function(){
        $("#modalLabelsuccess").text('Registro de rol');
        $("#modalEmpleados").modal("show");
    });
    
    document.querySelectorAll('#tblModulos input[type="checkbox"]').forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
          // Identificar la fila y el permiso
          const fila = this.closest('tr');
          const indice = fila.rowIndex - 1; // Ajustar por la fila de encabezado
          
          // Obtener información de la fila
          const submodulo = fila.cells[0].textContent.trim();
          const modulo = fila.cells[1].textContent.trim();
          
          // Determinar qué tipo de permiso es según la columna
          let tipoPermiso;
          const celdaIndex = Array.from(fila.cells).indexOf(this.closest('td'));
          
          switch (celdaIndex) {
            case 2: tipoPermiso = 'agregar'; break;
            case 3: tipoPermiso = 'modificar'; break;
            case 4: tipoPermiso = 'consultar'; break;
            case 5: tipoPermiso = 'eliminar'; break;
          }
          
          // Buscar si ya existe en la lista
          let rolExistente = listDataRolesPermisos.find(rol => 
            rol.grupo === modulo && rol.item === submodulo
          );
          
          // Si no existe, crear nuevo objeto
          if (!rolExistente) {
            rolExistente = {
              idGrupo: $("#cboModulos").val(), // ID del módulo seleccionado
              idItem: indice,
              grupo: modulo,
              item: submodulo,
              agregar: 0,
              modificar: 0,
              consultar: this.checked ? 1 : 0,
              eliminar: 0
            };
            listDataRolesPermisos.push(rolExistente);
          }
          
          // Actualizar el permiso específico
          rolExistente[tipoPermiso] = this.checked ? 1 : 0;
          
          // Actualizar también el objeto actual
          objRolesPermisos = {...rolExistente};
        });
      });

    $("#btnGuardarRol").click(function(){

        validarDatos();

        const checkboxesSeleccionados = [];
    
        document.querySelectorAll('#tblModulos tr').forEach(function(fila, indice) {
          if (indice === 0) return; // Saltar la fila de encabezado
          let j = (indice-1);
          const submodulo = fila.cells[0].textContent.trim();
          const modulo = fila.cells[1].textContent.trim();

          // Obtener el estado de los checkboxes en esta fila
          const agregarChecked = fila.querySelector('td:nth-child(3) input[type="checkbox"]').checked;
          const modificarChecked = fila.querySelector('td:nth-child(4) input[type="checkbox"]').checked;
          const consultarChecked = fila.querySelector('td:nth-child(5) input[type="checkbox"]').checked;
          const eliminarChecked = fila.querySelector('td:nth-child(6) input[type="checkbox"]').checked;
          
          // Solo agregar si al menos un checkbox está marcado
          if (agregarChecked || modificarChecked || consultarChecked || eliminarChecked) {
            checkboxesSeleccionados.push({
              idGrupo: 0,
              idItem: 0,
              grupo: modulo,
              item: submodulo,
              agregar: agregarChecked ? 1 : 0,
              modificar: modificarChecked ? 1 : 0,
              consultar: consultarChecked ? 1 : 0,
              eliminar: eliminarChecked ? 1 : 0
            });
          }
        });
        
        // Actualizar la lista de permisos

        if (checkboxesSeleccionados.length > 0) {
          // Verificar si hay roles duplicados antes de guardar
          const rolDuplicado = checkboxesSeleccionados.some(rol => {
            return listDataRolesPermisos.some(existente => 
              existente.idItem === rol.idItem && existente.idGrupo === rol.idGrupo && existente !== rol
            );
          });
          
          if (rolDuplicado) {
            Swal.fire({
              title: "No se puede guardar un rol existente",
              icon: "warning",
              draggable: true,
            });
          } else {
            // Actualizar la lista global
            //listDataRolesPermisos = checkboxesSeleccionados;
            
            listDataRolesPermisos.forEach(e=>{
                checkboxesSeleccionados.forEach(it=>{
                    if(e.grupo == it.grupo && e.item == it.item){
                        e.eliminar=it.eliminar
                        e.agregar=it.agregar
                        e.consultar=it.consultar
                        e.modificar=it.modificar
                    }
                })
            });

            // Actualizar la tabla DataTable
            DataTableRolesPermisos.clear();
            DataTableRolesPermisos.rows.add(listDataRolesPermisos).draw();
            
            if(rolID==0){
                obj = {};
                obj.Rol=$("#txtRol").val();
                obj.listDataRolesPermisos=listDataRolesPermisos;
                obj.listDataPermiso=listDataPermiso;
                obj.listDataReporte=listDataReporte;
                obj.Accion=1;
                obj.IdRol=0;
                console.log(obj);
                //crearRolPermiso(obj);
            }
            else{
                obj = {};
                obj.Rol=$("#txtRol").val();
                obj.listDataRolesPermisos=listDataRolesPermisos;
                obj.listDataPermiso=listDataPermiso;
                obj.listDataReporte=listDataReporte;
                obj.Accion=2;
                obj.IdRol=rolID;
                console.log(obj);
                crearRolPermiso(obj);
            }


          }
        } else {
          Swal.fire({
            title: "Seleccione al menos un permiso",
            icon: "warning",
            draggable: true,
          });
        }
    });

    $("#btnCerrarModalEmpleados").click(function(){
        $("#modalEmpleados").modal("hide");
        Rol.limpiarCampos();
    })


    $("#cboModulos").on("change", function () {
        let selectedOption = $(this).find("option:selected");
    
        let idGrupo = selectedOption.closest("optgroup").attr("data-id-grupo"); // ID del grupo
        let nombreGrupo = selectedOption.closest("optgroup").attr("label"); // Nombre del grupo
        let idItem = selectedOption.val(); // Código del ítem
        let valorItem = $("#cboModulos option:selected").text() // Texto del ítem
        
        objRolesPermisos = {};

        objRolesPermisos.idGrupo = idGrupo;
        objRolesPermisos.idItem = idItem;
        objRolesPermisos.grupo = nombreGrupo;
        objRolesPermisos.item = valorItem;
    });

    $("#btnLimpiar").click(function(){
        $("#txtRoles").val("");
    });

    $("#btnBuscarRol").click(function(){
        buscarRoles();
    });
})