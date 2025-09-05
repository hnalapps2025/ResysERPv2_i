const SolicitudOperacion = {
    tabla: null, // Referencia a DataTable

    InicializarTabla: function () {
        if ($.fn.DataTable.isDataTable('#tbSolicitudOperacion')) {
            SolicitudOperacion.tabla.clear().draw();
            return;
        }

        SolicitudOperacion.tabla = $('#tbSolicitudOperacion').DataTable({
            language: {
                url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json'
            },
            pageLength: 10,
            lengthChange: false,
            ordering: false,
            searching: false,
            info: false,
            columns: [
                { data: 'IdOrdenOperatoria' },       // 0
                {
                    data: 'FechaReg',
                    className: 'text-nowrap',
                    render: function (data, type, row) {
                        return data ? moment(data).format('DD/MM/YYYY HH:mm') : '';
                    }
                },                // 1
                { data: 'Cuenta' },                  // 2
                { data: 'NroHistoriaClinica' },      // 3
                { data: 'NroDocumento' },            // 4
                { data: 'ApellidoPaterno' },         // 5
                { data: 'ApellidoMaterno' },         // 6
                { data: 'PrimerNombre' },            // 7
                {
                    data: null,
                    className: 'text-nowrap',
                    render: function (data, type, row) {
                        const sexo = row.sexo?.toLowerCase() ?? '';
                        const paterno = row.ApellidoPaterno ?? '';
                        const materno = row.ApellidoMaterno ?? '';
                        const nombres = row.PrimerNombre ?? '';

                        let icono = '';
                        if (sexo === 'masculino') {
                            icono = '<i class="fa fa-mars" style="color: #00aaff; margin-right: 4px;"></i>'; // celeste
                        } else if (sexo === 'femenino') {
                            icono = '<i class="fa fa-venus" style="color: #ff66b2; margin-right: 4px;"></i>'; // rosado
                        }

                        return `${icono}${paterno} ${materno}, ${nombres}`;
                    }
                }, //8

                { data: 'Estado' },                  // 9
                { data: 'Admitido' },                // 10
                { data: 'IDMEDICO' },                // 11
                { data: 'Medico' },                  // 12
                { data: 'FechaEstimadaQx' },         // 13
                { data: 'TipoFiliacion' },           // 14
                { data: 'nrocuenta' },               // 15
                { data: 'IdTipoServicio' },          // 18
                { data: 'TipoServicioIngreso' },     // 19
                { data: 'IdServicioIngreso' },       // 16
                { data: 'ServicioIngreso' },         // 17

                { data: 'sexo' },                    // 20
                { data: 'Observacion' },             // 21
                {
                    data: null,
                    orderable: false,
                    searchable: false,
                    className: 'text-center',
                    render: function (data, type, row) {
                        return `<a href="#" class="btnReporte" title="Ver reporte">
                                    <i class="fa fa-file-text" style="color: orange; font-size: 16px;"></i>
                                </a>`;
                    }
                },
            ],

            columnDefs: [
                {
                    targets: [5,6,7,11, 13, 14, 15, 16, 18,20,21], // índices de columnas a ocultar
                    visible: false
                }

            ]
        });
    },

    eventos: function () {
        $('#btnBuscar').on('click', function () {
            SolicitudOperacion.buscar();
        });

        $('#btnLimpiar').on('click', function () {
            $('#txtIdOrden, #txtNroDoc, #txtHistoria, #txtApePat, #txtApeMat, #txtFechaInicio, #txtFechaFin').val('');
            if (SolicitudOperacion.tabla) {
                SolicitudOperacion.tabla.clear().draw();
            }
        });
    },

    buscar: function () {
        const filtroFechas = $('#filtroFechas').val();
        let fechaInicio = null;
        let fechaFin = null;

        if (filtroFechas !== 'todos') {
            const dias = parseInt(filtroFechas);
            fechaFin = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss');
            fechaInicio = moment().subtract(dias, 'days').startOf('day').format('YYYY-MM-DD HH:mm:ss');
        }

        const data = {
            IdOrdenOperatoria: $('#txtIdOrden').val(),
            NroDocumento: $('#txtNroDoc').val(),
            NroHistoriaClinica: $('#txtHistoria').val(),
            ApellidoPaterno: $('#txtApePat').val(),
            ApellidoMaterno: $('#txtApeMat').val(),
            FechaInicio: fechaInicio,
            FechaFin: fechaFin
        };

        $.ajax({
            url: '/CQx/busca_OrdenOperatoria',
            type: 'POST',
            data: data,
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            beforeSend: function () {
                if (SolicitudOperacion.tabla) {
                    SolicitudOperacion.tabla.clear().draw();
                }
            },
            success: function (response) {
                if (SolicitudOperacion.tabla) {
                    SolicitudOperacion.tabla.clear().rows.add(response).draw();
                }
            },
            error: function () {
                alert('Ocurrió un error al buscar los datos.');
            }
        });
    }

};

// Inicialización
$(document).ready(function () {
    SolicitudOperacion.InicializarTabla();
    SolicitudOperacion.eventos();
});
