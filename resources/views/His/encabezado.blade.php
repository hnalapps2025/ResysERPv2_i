<table width='100%'>
    <tbody>
        <tr>
            <td colspan='2' style='font-size:8px;font-weight: bold;' width='6%' height='25px'>LOTE</td>
            <td rowspan='4' style='border-collapse: collapse;' width='9%' height='100px'>
                <table style='border-collapse: collapse;' width='100%' height='108px' border='1'>
                    <tbody>
                        <tr>
                            <td style='font-size:8px; text-align: center;' width='100%' height='20%'></td>
                        </tr>
                        <tr>
                            <td style='font-size:8px; text-align: center; font-weight: bold; ' width='100%' height='20%'>{{date('d/m/Y', strtotime($fila['FechaIngreso']))}}
                            </td>
                        </tr>
                        <tr>
                            <td style='font-size:8px; text-align: center; font-weight: bold; ' width='100%' height='20%'>{{date("d/m/Y")}}
                            </td>
                        </tr>
                        <tr>
                            <td style='font-size:8px; text-align: center; font-weight: bold; ' width='100%' height='20%'></td>
                        </tr>
                    </tbody>
                </table>
            </td>
            <td colspan='16' width='65%'></td>
            <td rowspan='3' colspan='4' width='24%'>

                <table style='border-collapse: collapse;' width='100%' height='80px' border='1'>
                    <tbody>
                        <tr>
                            <td style='font-size:8px; text-align: center; font-weight: bold; ' width='100%' height='10%'>FIRMA Y SELLO DE RESPONSABLE</td>
                        </tr>
                        <tr>
                            <td width='100%' height='90%'></td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
        <tr>
            <td colspan='2' style='font-size:8px;' width='6%' height='20px'>FECHA</td>
            <td colspan='16' style='font-size:16px; font-weight: bold; text-align: center;' width='65%'>HOSPITAL NACIONAL ARZOBISPO LOAYZA</td>
        </tr>
        <tr>
            <td colspan='2' style='font-size:6px;' width='6%' height='20px'>FECHA PROCES</td>
            <td colspan='16' style='font-size:14px; text-align: center;' width='65%'>OF. DE ESTADISTICA E INFORMATICA</td>
        </tr>
        <tr>
            <td colspan='2' style='font-size:6px;' width='6%' height='20px'>DNI DIGITADOR</td>
            <td colspan='16' style='font-size:12px; text-align: center;' width='65%'>REGISTRO DIARIO DE ATENCION Y OTRAS ACTIVIDADES DE SALUD</td>
            <td width='3%'></td>
            <td width='3%'></td>
            <td colspan='2' width='21%'>
                <table style='border-collapse: collapse;' width='130px' height='20px' border='1'>
                    <tbody width='100%'>
                        <tr width='100%'>
                            <td colspan='2' style='font-size:8px; text-align: center; font-weight: bold; ' width='100%' height='10%'>TURNO</td>
                        </tr>
                        <tr width='100%'>
                            <td colspan='2' style='font-size:10px; text-align: center;font-weight: bold;' width='100%' height='90%'>{{$fila['IdTipoTurnoRef']==2?'Tarde':'Mañana'}}</td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>
<table border='1' width='100%' style='border-collapse: collapse;'>
    <thead>
        <tr>
            <td style='border-top: white 1px solid; border-bottom: white 1px solid; border-left: white 1px solid ;'></td>
            <td style='font-size:8px; text-align: center; font-weight: bold;'>AÑO</td>
            <td style='font-size:8px; text-align: center; font-weight: bold;'>MES</td>
            <td colspan='6' style='font-size:8px; font-weight: bold; text-align: center;'>NOMBRE DE ESTABLECIMIENTO DE SALUD (PRESS)</td>
            <td colspan='5' style='font-size:8px; text-align: center; font-weight: bold;'>UNIDAD PRODUCTORA DE SERVICIOS (UPSS)</td>
            <td colspan='8' style='font-size:8px; font-weight: bold; text-align: center;'>NOMBRE DE RESPONSABLE DE LA ATENCION</td>
        </tr>
        <tr>
            <td style='border-top: white 1px solid; border-bottom: white 1px solid; border-left: white 1px solid ;' height='14px'></td>
            <td style='font-size:8px; text-align: center;font-weight: bold;'>{{date('Y', strtotime($fila['FechaIngreso']))}}</td>
            <td style='font-size:8px; text-align: center;font-weight: bold;'>{{strftime('%B', strtotime(strtotime($fila['FechaIngreso'])))}}</td>
            <td colspan='6' style='font-size:8px; font-weight: bold; text-align: center;'>HNAL</td>
            <td colspan='5' style='font-size:8px; text-align: center; font-weight: bold;'>{{$fila['Servicio']}}</td>
            <td colspan='8' style='font-size:8px; font-weight: bold; text-align: center;'>{{$fila['Medico']}} - {{$fila['DNI_Medico']}}</td>
        </tr>
        <tr>
            <td rowspan='2' style='border-top: white 1px solid; border-bottom: white 1px solid; border-left: white 1px solid ;'> </td>
            <td rowspan='2' style='font-size:8px; text-align: center; font-weight: bold;'>DIA</td>
            <td style='font-size:8px; text-align: center; font-weight: bold;'>DNI</td>
            <td style='font-size:8px; text-align: center;font-weight: bold;'>FINANC.</td>
            <td style='font-size:7px; text-align: center;font-weight: bold;'>DISTRITO DE PROC.</td>
            <td rowspan='2' style='font-size:8px; text-align: center; font-weight: bold;'>EDAD</td>
            <td rowspan='2' style='font-size:8px; text-align: center; font-weight: bold; writing-mode: vertical-lr; transform: rotate(180deg);'>SEXO</td>
            <td colspan='2' rowspan='2' style='font-size:8px; text-align: center; font-weight: bold;'>PERIMETRO CEFALICO Y ABDOMINAL</td>
            <td colspan='2' rowspan='2' style='font-size:8px; text-align: center; font-weight: bold;'>EVALUACION ANTROPOMETRICA HEMOGLOBINA</td>
            <td rowspan='2' style='font-size:8px; text-align: center; font-weight: bold; writing-mode: vertical-lr; transform: rotate(180deg);'>ESTA</td>
            <td rowspan='2' style='font-size:8px; text-align: center; font-weight: bold; writing-mode: vertical-lr; transform: rotate(180deg);'>SERV.</td>
            <td colspan='2' rowspan='2' style='font-size:8px; text-align: center;'>DIAGNOSTICO MOTIVO DE CONSULTA </BR> Y O ACTIVIDAD DE SALUD</td>
            <td colspan='3' style='font-size:8px; text-align: center; font-weight: bold;'>TIPO DE DIAGNOS</td>
            <td colspan='3' style='font-size:8px; text-align: center; font-weight: bold;'>LAB</td>
            <td rowspan='2' style='font-size:8px; text-align: center; font-weight: bold;'>COD. CIE/CPT</td>
        </tr>

        <tr>
            <td style='font-size:8px; text-align: center; font-weight: bold;'>HISTORIA CLINICA</td>
            <td style='font-size:8px; text-align: center; font-weight: bold;'>ETNIA</td>
            <td style='font-size:8px; text-align: center; font-weight: bold;'>CENTRO POBLADO</td>
            <td style='font-size:8px; text-align: center; font-weight: bold;'>P</td>
            <td style='font-size:8px; text-align: center; font-weight: bold;'>D</td>
            <td style='font-size:8px; text-align: center; font-weight: bold;'>R</td>
            <td style='font-size:8px; text-align: center; font-weight: bold;'>1°</td>
            <td style='font-size:8px; text-align: center; font-weight: bold;'>2°</td>
            <td style='font-size:8px; text-align: center; font-weight: bold;'>3°</td>
        </tr>
    </thead>
    <tbody>
        @foreach($fila["registros"] as $i=>$row)
        <tr style='border-right: white 1px solid ; border-left: white 1px solid;'>
            <td style='font-size:10px; border-right: white 1px solid; border-left: white 1px solid ;font-weight: bold;'>{{$i+1}}</td>
            <td style='font-size:10px; border-right: white 1px solid; border-left: white 1px solid ;font-weight: bold;' colspan='8'>{{$row['Paciente']}}</td>
            <td style='font-size:10px; border-right: white 1px solid; border-left: white 1px solid ;font-weight: bold;' colspan='5'>Fecha Nacimiento: {{date('d/m/Y',strtotime($row['FechaNacimiento']))}}</td>
            <td style='font-size:10px; border-right: white 1px solid; border-left: white 1px solid ;font-weight: bold;' colspan='4'>Fecha Ultimo Hb:___/___/______</td>
            <td style='font-size:10px; border-right: white 1px solid; border-left: white 1px solid ;font-weight: bold;' colspan='4'>FUR:___/___/______</td>
        </tr>

        <tr>
            <td width='2%' rowspan='6' style='font-size:10px; border-top: white 1px solid; border-bottom: white 1px solid; border-left: white 1px solid;'></td>
            <td width='3%' rowspan='6' style='font-size:8px; text-align: center; font-weight: bold;'>{{date('d',strtotime($row['FechaIngreso']))}}</td>
            <td width='7%' rowspan='3' style='font-size:10px; text-align: center;font-weight: bold;'>{{$row['NroDocumento']}}</td>
            <td width='5%' rowspan='3' style='font-size:8px; text-align: center;font-weight: bold;'>{{$row['FuenteFinanciamiento']}}</td>
            <td width='9%' rowspan='3' style='font-size:8px; text-align: center;font-weight: bold;'>{{$row['Distrito']}}</td>
            <td width='6%' rowspan='6' style='font-size:8px; text-align: center;font-weight: bold;'>{{$row['Edad']}} {{$row['TipoEdad']}}</td>
            <td width='1%' rowspan='6' style='font-size:8px; text-align: center; font-weight: bold;'>{{$row['IdTipoSexo']==2?'F':'M'}}</td>
            <td width='3%' rowspan='3' style='font-size:8px; text-align: center; font-weight: bold;'>PC</td>
            <td width='3%' rowspan='3' style='font-size:8px; text-align: center; font-weight: bold;'></td>
            <td width='3%' rowspan='2' style='font-size:8px; text-align: center; font-weight: bold;'>PESO</td>
            <td width='3%' rowspan='2' style='font-size:8px; text-align: center; font-weight: bold;'></td>
            <td width='1%' rowspan='2' style='font-size:8px; text-align: center;font-weight: bold;'>N</td>
            <td width='1%' rowspan='2' style='font-size:8px; text-align: center;font-weight: bold;'>N</td>
            <td width='36%' colspan='2' style='font-size:8px; text-align: center; font-weight: bold;'></td>
            <td width='1%' style='font-size:8px; text-align: center; font-weight: bold;'>P</td>
            <td width='1%' style='font-size:8px; text-align: center; font-weight: bold;'>D</td>
            <td width='1%' style='font-size:8px; text-align: center; font-weight: bold;'>R</td>
            <td width='2%' style='font-size:8px; text-align: center; font-weight: bold;'></td>
            <td width='2%' style='font-size:8px; text-align: center; font-weight: bold;'></td>
            <td width='2%' style='font-size:8px; text-align: center; font-weight: bold;'></td>
            <td width='8%' style='font-size:8px; text-align: center; font-weight: bold;'></td>
        </tr>

        <tr>
            <td colspan='2' style='font-size:8px; text-align: center; font-weight: bold;'></td>
            <td style='font-size:8px; text-align: center; font-weight: bold;'>P</td>
            <td style='font-size:8px; text-align: center; font-weight: bold;'>D</td>
            <td style='font-size:8px; text-align: center; font-weight: bold;'>R</td>
            <td style='font-size:8px; text-align: center; font-weight: bold;'></td>
            <td style='font-size:8px; text-align: center; font-weight: bold;'></td>
            <td style='font-size:8px; text-align: center; font-weight: bold;'></td>
            <td style='font-size:8px; text-align: center; font-weight: bold;'></td>
        </tr>

        <tr>
            <td rowspan='2' style='font-size:8px; text-align: center; font-weight: bold;'>TALLA</td>
            <td rowspan='2' style='font-size:8px; text-align: center; font-weight: bold;'></td>
            <td rowspan='2' style='font-size:8px; text-align: center; font-weight: bold;'>C</td>
            <td rowspan='2' style='font-size:8px; text-align: center; font-weight: bold;'>C</td>
            <td colspan='2' style='font-size:8px; text-align: center; font-weight: bold;'></td>
            <td style='font-size:8px; text-align: center; font-weight: bold;'>P</td>
            <td style='font-size:8px; text-align: center; font-weight: bold;'>D</td>
            <td style='font-size:8px; text-align: center; font-weight: bold;'>R</td>
            <td style='font-size:8px; text-align: center; font-weight: bold;'></td>
            <td style='font-size:8px; text-align: center; font-weight: bold;'></td>
            <td style='font-size:8px; text-align: center; font-weight: bold;'></td>
            <td style='font-size:8px; text-align: center; font-weight: bold;'></td>
        </tr>

        <tr>
            <td rowspan='3' style='font-size:10px; text-align: center;font-weight: bold;'>{{$row['NroHistoriaClinica']}}</td>
            <td rowspan='3' style='font-size:8px; text-align: center;font-weight: bold;'>{{$row['IdEtnia']}}</td>
            <td rowspan='3' style='font-size:8px; text-align: center; font-weight: bold;'></td>
            <td rowspan='3' style='font-size:8px; text-align: center; font-weight: bold;'>PB</td>
            <td rowspan='3' style='font-size:8px; text-align: center; font-weight: bold;'></td>
            <td colspan='2' style='font-size:8px; text-align: center; font-weight: bold;'></td>
            <td style='font-size:8px; text-align: center; font-weight: bold;'>P</td>
            <td style='font-size:8px; text-align: center; font-weight: bold;'>D</td>
            <td style='font-size:8px; text-align: center; font-weight: bold;'>R</td>
            <td style='font-size:8px; text-align: center; font-weight: bold;'></td>
            <td style='font-size:8px; text-align: center; font-weight: bold;'></td>
            <td style='font-size:8px; text-align: center; font-weight: bold;'></td>
            <td style='font-size:8px; text-align: center; font-weight: bold;'></td>
        </tr>

        <tr>
            <td rowspan='2' style='font-size:8px; text-align: center; font-weight: bold;'>Hb.</td>
            <td rowspan='2' style='font-size:8px; text-align: center; font-weight: bold;'></td>
            <td rowspan='2' style='font-size:8px; text-align: center;font-weight: bold;'>R</td>
            <td rowspan='2' style='font-size:8px; text-align: center;font-weight: bold;'>R</td>
            <td colspan='2' style='font-size:8px; text-align: center; font-weight: bold;'></td>
            <td style='font-size:8px; text-align: center; font-weight: bold;'>P</td>
            <td style='font-size:8px; text-align: center; font-weight: bold;'>D</td>
            <td style='font-size:8px; text-align: center; font-weight: bold;'>R</td>
            <td style='font-size:8px; text-align: center; font-weight: bold;'></td>
            <td style='font-size:8px; text-align: center; font-weight: bold;'></td>
            <td style='font-size:8px; text-align: center; font-weight: bold;'></td>
            <td style='font-size:8px; text-align: center; font-weight: bold;'></td>
        </tr>

        <tr>
            <td colspan='2' style='font-size:8px; text-align: center; font-weight: bold;'></td>
            <td style='font-size:8px; text-align: center; font-weight: bold;'>P</td>
            <td style='font-size:8px; text-align: center; font-weight: bold;'>D</td>
            <td style='font-size:8px; text-align: center; font-weight: bold;'>R</td>
            <td style='font-size:8px; text-align: center; font-weight: bold;'></td>
            <td style='font-size:8px; text-align: center; font-weight: bold;'></td>
            <td style='font-size:8px; text-align: center; font-weight: bold;'></td>
            <td style='font-size:8px; text-align: center; font-weight: bold;'></td>
        </tr>
        @endforeach
		@for($j=$i;$j<20;$j++)
			<tr style='border-right: white 1px solid ; border-left: white 1px solid;'>
				<td style='font-size:10px; border-right: white 1px solid; border-left: white 1px solid ;font-weight: bold;'>{{$j+1}}</td>
				<td style='font-size:10px; border-right: white 1px solid; border-left: white 1px solid ;font-weight: bold;'colspan='8'></td>
				<td style='font-size:10px; border-right: white 1px solid; border-left: white 1px solid ;font-weight: bold;'colspan='5'>Fecha Nacimiento:___/___/______</td>
				<td style='font-size:10px; border-right: white 1px solid; border-left: white 1px solid ;font-weight: bold;'colspan='4'>Fecha Ultimo Hb:___/___/______</td>
				<td style='font-size:10px; border-right: white 1px solid; border-left: white 1px solid ;font-weight: bold;'colspan='5'>FUR:___/___/______</td>
				</tr>

				<tr>
				<td width='2%' rowspan='6' style='font-size:10px; border-top: white 1px solid; border-bottom: white 1px solid; border-left: white 1px solid;'></td>
				<td width='3%' rowspan='6' style='font-size:8px; text-align: center; font-weight: bold;'></td>
				<td width='7%' rowspan='3' style='font-size:10px; text-align: center;font-weight: bold;'></td>
				<td width='5%' rowspan='3' style='font-size:8px; text-align: center;font-weight: bold;'></td>
				<td width='9%' rowspan='3' style='font-size:8px; text-align: center;font-weight: bold;'></td>
				<td width='6%' rowspan='6' style='font-size:8px; text-align: center;font-weight: bold;'></td>
				<td width='1%' rowspan='6' style='font-size:8px; text-align: center; font-weight: bold;'></td>
				<td width='3%' rowspan='3' style='font-size:8px; text-align: center; font-weight: bold;'>PC</td>
				<td width='3%' rowspan='3' style='font-size:8px; text-align: center; font-weight: bold;'></td>
				<td width='3%' rowspan='2' style='font-size:8px; text-align: center; font-weight: bold;'>PESO</td>
				<td width='3%' rowspan='2' style='font-size:8px; text-align: center; font-weight: bold;'></td>
				<td width='1%' rowspan='2' style='font-size:8px; text-align: center;font-weight: bold;'>N</td>
				<td width='1%' rowspan='2' style='font-size:8px; text-align: center;font-weight: bold;'>N</td>
				<td width='36%' colspan='2' style='font-size:8px; text-align: center; font-weight: bold;'></td>
				<td width='1%' style='font-size:8px; text-align: center; font-weight: bold;'>P</td>
				<td width='1%' style='font-size:8px; text-align: center; font-weight: bold;'>D</td>
				<td width='1%' style='font-size:8px; text-align: center; font-weight: bold;'>R</td>
				<td width='2%' style='font-size:8px; text-align: center; font-weight: bold;'></td>
				<td width='2%' style='font-size:8px; text-align: center; font-weight: bold;'></td>
				<td width='2%' style='font-size:8px; text-align: center; font-weight: bold;'></td>
				<td width='8%' style='font-size:8px; text-align: center; font-weight: bold;'></td>
				</tr>

				<tr>
				<td colspan='2' style='font-size:8px; text-align: center; font-weight: bold;'></td>
				<td style='font-size:8px; text-align: center; font-weight: bold;'>P</td>
				<td style='font-size:8px; text-align: center; font-weight: bold;'>D</td>
				<td style='font-size:8px; text-align: center; font-weight: bold;'>R</td>
				<td style='font-size:8px; text-align: center; font-weight: bold;'></td>
				<td style='font-size:8px; text-align: center; font-weight: bold;'></td>
				<td style='font-size:8px; text-align: center; font-weight: bold;'></td>
				<td style='font-size:8px; text-align: center; font-weight: bold;'></td>
				</tr>

				<tr>
				<td rowspan='2' style='font-size:8px; text-align: center; font-weight: bold;'>TALLA</td>
				<td rowspan='2' style='font-size:8px; text-align: center; font-weight: bold;'></td>
				<td rowspan='2' style='font-size:8px; text-align: center; font-weight: bold;'>C</td>
				<td rowspan='2' style='font-size:8px; text-align: center; font-weight: bold;'>C</td>
				<td colspan='2' style='font-size:8px; text-align: center; font-weight: bold;'></td>
				<td style='font-size:8px; text-align: center; font-weight: bold;'>P</td>
				<td style='font-size:8px; text-align: center; font-weight: bold;'>D</td>
				<td style='font-size:8px; text-align: center; font-weight: bold;'>R</td>
				<td style='font-size:8px; text-align: center; font-weight: bold;'></td>
				<td style='font-size:8px; text-align: center; font-weight: bold;'></td>
				<td style='font-size:8px; text-align: center; font-weight: bold;'></td>
				<td style='font-size:8px; text-align: center; font-weight: bold;'></td>
				</tr>

				<tr>
				<td rowspan='3'style='font-size:10px; text-align: center;font-weight: bold;'></td>
				<td rowspan='3'style='font-size:8px; text-align: center;font-weight: bold;'></td>
				<td rowspan='3' style='font-size:8px; text-align: center; font-weight: bold;'></td>
				<td rowspan='3' style='font-size:8px; text-align: center; font-weight: bold;'>PB</td>
				<td rowspan='3' style='font-size:8px; text-align: center; font-weight: bold;'></td>
				<td colspan='2' style='font-size:8px; text-align: center; font-weight: bold;'></td>
				<td style='font-size:8px; text-align: center; font-weight: bold;'>P</td>
				<td style='font-size:8px; text-align: center; font-weight: bold;'>D</td>
				<td style='font-size:8px; text-align: center; font-weight: bold;'>R</td>
				<td style='font-size:8px; text-align: center; font-weight: bold;'></td>
				<td style='font-size:8px; text-align: center; font-weight: bold;'></td>
				<td style='font-size:8px; text-align: center; font-weight: bold;'></td>
				<td style='font-size:8px; text-align: center; font-weight: bold;'></td>
				</tr>

				<tr>
				<td rowspan='2' style='font-size:8px; text-align: center; font-weight: bold;'>Hb.</td>
				<td rowspan='2' style='font-size:8px; text-align: center; font-weight: bold;'></td>
				<td rowspan='2' style='font-size:8px; text-align: center;font-weight: bold;'>R</td>
				<td rowspan='2' style='font-size:8px; text-align: center;font-weight: bold;'>R</td>
				<td colspan='2' style='font-size:8px; text-align: center; font-weight: bold;'></td>
				<td style='font-size:8px; text-align: center; font-weight: bold;'>P</td>
				<td style='font-size:8px; text-align: center; font-weight: bold;'>D</td>
				<td style='font-size:8px; text-align: center; font-weight: bold;'>R</td>
				<td style='font-size:8px; text-align: center; font-weight: bold;'></td>
				<td style='font-size:8px; text-align: center; font-weight: bold;'></td>
				<td style='font-size:8px; text-align: center; font-weight: bold;'></td>
				<td style='font-size:8px; text-align: center; font-weight: bold;'></td>
				</tr>

				<tr>
				<td colspan='2' style='font-size:8px; text-align: center; font-weight: bold;'></td>
				<td style='font-size:8px; text-align: center; font-weight: bold;'>P</td>
				<td style='font-size:8px; text-align: center; font-weight: bold;'>D</td>
				<td style='font-size:8px; text-align: center; font-weight: bold;'>R</td>
				<td style='font-size:8px; text-align: center; font-weight: bold;'></td>
				<td style='font-size:8px; text-align: center; font-weight: bold;'></td>
				<td style='font-size:8px; text-align: center; font-weight: bold;'></td>
				<td style='font-size:8px; text-align: center; font-weight: bold;'></td>
			</tr>
		@endfor
    </tbody>
</table>