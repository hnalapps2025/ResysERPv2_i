var Paciente = {
    IdCuentaAtencion: 0,
    async ListarPacientes() {

        if ($("#txtApPaternoBusqPaciente").val() != '' || $("#txtApMaternoBusqPaciente").val() != '' || $("#txtDniBusqPaciente").val() != '' || $("#txtNroHistoriaBusqPaciente").val() != '') {

            oTable_Pacientes.fnClearTable();

            let ApellidoPaterno = $("#txtApPaternoBusqPaciente").val();
            let ApellidoMaterno = $("#txtApMaternoBusqPaciente").val();
            let NroDocumento = $("#txtDniBusqPaciente").val();
            let NroHistoriaClinica = $("#txtNroHistoriaBusqPaciente").val();

            try {
                res = await
                    $.ajax({
                        method: "get",
                        url: `/sa_general/PacientesFiltrarTodos?ApellidoPaterno=${ApellidoPaterno}&ApellidoMaterno=${ApellidoMaterno}&NroDocumento=${NroDocumento}&NroHistoriaClinica=${NroHistoriaClinica}`,
                        dataType: "json",
                    });
                    
                if (res.resultado==1) {
                    if (res.data.length > 0) {
                        oTable_Pacientes.fnAddData(res.data);
                    }
                }
            } catch (error) {
                console.error(error)
                toastr.error("Error: "+error);
            }

        } else {
            toastr.error("Ingrese alguno de los campos para realizar la búsqueda de pacientes.")
            return false;
        } 

        return true;            
    },

    InitDataTablePacientes() {
        var parms = {
            "paging": true,
            "ordering": true,
            "info": false,
            "scrollX": true,
            bFilter: false,
            responsive: true,
            columns: [
                {
                    targets: 1,
                    width: '5%',
                    data: "NroHistoriaClinica",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')

                    }
                },
                {
                    targets: 2,
                    width: '10%',
                    data: "ApellidoPaterno",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                    }
                },

                {
                    targets: 3,
                    width: '10%',
                    data: "ApellidoMaterno",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')

                    }
                },
                {
                    targets: 4,
                    width: '10%',
                    data: "PrimerNombre",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')

                    }
                },
                {
                    targets: 5,
                    width: '10%',
                    data: "SegundoNombre",
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')

                    }
                },                
                {
                    targets: 6,
                    width: '5%',
                    data: null,
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).attr('align', 'left')
                        if(rowData.FechaNacimiento)
                            $(td).html(
                                new Date(rowData.FechaNacimiento).toLocaleDateString('es-PE', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric',
                                })
                            );
                    }
                },
                //{
                //    targets: 7,
                //    width: '20%',
                //    data: "tipoServicio",
                //    createdCell: function (td, cellData, rowData, row, col) {
                //        $(td).attr('align', 'left')

                //    }
                //},
                //{
                //    targets: 8,
                //    width: '20%',
                //    data: "servicioIngreso",
                //    createdCell: function (td, cellData, rowData, row, col) {
                //        $(td).attr('align', 'left')

                //    }
                //},
                //{
                //    argets: 9,
                //    width: '5%',
                //    data: "fechaIngreso",
                //    createdCell: function (td, cellData, rowData, row, col) {
                //        $(td).attr('align', 'left')

                //    }
                //},
                //{
                //    argets: 10,
                //    width: '5%',
                //    data: "fechaEgreso",
                //    createdCell: function (td, cellData, rowData, row, col) {
                //        $(td).attr('align', 'left')
                //    }
                //}
            ]
        }
        var tableWrapper = $('#tblPacientes'); // datatable creates the table wrapper by adding with id {your_table_id}_wrapper
        //tableWrapper.find('.dataTables_length select').select2(); // initialize select2 dropdown
        oTable_Pacientes = $("#tblPacientes").dataTable(parms);
    },

    async AgregarCuentaPaciente() {

        var objrow = oTable_Pacientes.api(true).row('.selected').data();

        console.log(objrow)

        if (isEmpty(objrow)) {
            toastr.warning("Debe seleccionar un paciente");
            return false;
        }

        const res = await Paciente.SeleccionarCuentaXIdPaciente(objrow.IdPaciente);

        if (!isEmpty(res)) {
            Paciente.IdCuentaAtencion = res.IdCuentaAtencion;
        } else {
            Paciente.IdCuentaAtencion = 0;
            toastr.warning("No se encontro un N° cuenta para el paciente seleccionado");
        }
        
        $('#txtCuentaTriaje').val(Paciente.IdCuentaAtencion);
        $("#modalBuscarPaciente").modal("hide");
    },

    async SeleccionarCuentaXIdPaciente(idPaciente) {
        resp = null;

        try {
            
            res = await
                $.ajax({
                    method: "get",
                    url: "/sa_general/FacturacionCuentasAtencionSeleccionarPorIdPaciente?IdPaciente="+idPaciente,
                    dataType: "json",
                });
                
            if (!isEmpty(res.data))
                if (res.data.length > 0)                    
                    resp = res.data[0];

        } catch (error) {
            toastr.error('Error: '+ error);
        }

        return resp;
    },

    eventos() {

        $('#btnCancelarPaciente').on('click', function () {
            Paciente.LimpiarBusquedaPacientes();
            $('#modalBuscarPaciente').modal('hide')
        })

        $('#tblPacientes tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
               oTable_Pacientes.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            }
        });

        $('.search2').keypress(function (e) {
            if (e.which == 13) {
                e.preventDefault();
                $("#btnBuscarPacientes").click();
            }
        });

        $('#btnBuscarPacientes').on('click', async function () {
            await Paciente.ListarPacientes();
        });

        $('#btnLimpiarPacientes').on('click', function () {
            Paciente.LimpiarBusquedaPacientes();
        });

        $('#btnAceptarPaciente').on('click', function () {
            Paciente.AgregarCuentaPaciente();
        });

    },

    LimpiarBusquedaPacientes() {
        $(".search2").val("");
        oTable_Pacientes.fnClearTable();
    },
};

$(document).ready(function () {

    Paciente.InitDataTablePacientes()

    Paciente.eventos()

});
