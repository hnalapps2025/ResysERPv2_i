<?php
namespace App;

use Illuminate\Support\Facades\DB;

class RS_Fua
{
	public static function ObtieneCabeceraFua($IdCuentaAtencion)
	{
		$resultado=false;
		$mensaje=null;
		$datos=null;
		$filas=DB::select("SELECT Atenciones.idCuentaAtencion,
									 SIGH_EXTERNA.dbo.SisFuaAtencion.FuaDisa,
									 SIGH_EXTERNA.dbo.SisFuaAtencion.FuaLote,
									 SIGH_EXTERNA.dbo.SisFuaAtencion.FuaNumero,
									 SIGH_EXTERNA.dbo.SisFuaAtencion.EstablecimientoCodigoRenaes,
									 EstablecimientosO.Nombre AS Establecimiento, 
									 SIGH_EXTERNA.dbo.SisFuaAtencion.FuaPersonalQatiende,
									 SIGH_EXTERNA.dbo.SisFuaAtencion.FuaCodOferFlexible,
									 SIGH_EXTERNA.dbo.SisFuaAtencion.FuaAtencionLugar,
									 Pacientes.ApellidoPaterno, 
									 Pacientes.ApellidoMaterno,
									 RTRIM(LTRIM(Pacientes.PrimerNombre + ' ' + ISNULL(Pacientes.SegundoNombre, '') + ' ' + ISNULL(Pacientes.TercerNombre, ''))) AS Nombres,
									 Pacientes.NroDocumento, 
									 TiposDocIdentidad.CodigoSIS,
									 TiposDocIdentidad.Descripcion TipoDocIdentidad,
									 Pacientes.NroHistoriaClinica,
									 Pacientes.IdTipoSexo,
									 --Pacientes.IdEtnia,
									 HIS_tabetnia.desetni IdEtnia,
									 CONVERT(DATE, Pacientes.FechaNacimiento) AS FechaNacimiento,
									 Atenciones.IdTipoServicio, 
									 SIGH_EXTERNA.dbo.SisFiliaciones.AfiliacionDisa,
									 SIGH_EXTERNA.dbo.SisFiliaciones.AfiliacionTipoFormato,
									 SIGH_EXTERNA.dbo.SisFiliaciones.AfiliacionNroFormato,
									 CONVERT(DATE, Atenciones.FechaIngreso) AS FechaIngreso,
									 Atenciones.HoraIngreso,
									 Servicios.codigoServicioFUA,
									 AtencionesDatosAdicionales.FuaCodigoPrestacion,
									 AtencionesDatosAdicionales.IdEstablecimientoOrigen,
									 Establecimientos.Codigo as CodRenaesRef, 
									 Establecimientos.Nombre as NomEstablecimientoReferencia,
									 AtencionesDatosAdicionales.NroReferenciaOrigen,
									 Empleados.ApellidoPaterno+' '+Empleados.ApellidoMaterno+' '+Empleados.Nombres AS Medico,
									 Empleados.DNI AS DNIMedico,
									 Medicos.Colegiatura,
									 Medicos.rne,
									 cast(Medicos.IdColegioHIS as INT) IdColegioHIS,
									 (select TiposEmpleado.Descripcion from TiposEmpleado where IdTipoEmpleado = Empleados.IdTipoEmpleado) Especialidad,
									 (select SIGHAL_Especialidad.esConsultorio
									  from SIGHAL_Especialidad
									  inner join SIGHAL_Especialidad_detalle
									  on SIGHAL_Especialidad_detalle.id_esp = SIGHAL_Especialidad.id_esp
									  inner join Especialidades
									  on Especialidades.IdEspecialidad = SIGHAL_Especialidad_detalle.idEspecialidad
									  inner join Servicios
									  on Servicios.IdEspecialidad = Especialidades.IdEspecialidad
									  where Servicios.IdServicio = Atenciones.IdServicioIngreso) esConsultorio
							  FROM SIGH_EXTERNA.dbo.SisFuaAtencion
							  INNER JOIN Atenciones
							  ON SIGH_EXTERNA.dbo.SisFuaAtencion.idCuentaAtencion = Atenciones.IdCuentaAtencion
							  INNER JOIN Servicios
							  ON Atenciones.IdServicioIngreso = Servicios.IdServicio
							  INNER JOIN Pacientes
							  ON Atenciones.IdPaciente = Pacientes.IdPaciente
							  INNER JOIN TiposDocIdentidad
							  ON Pacientes.IdDocIdentidad = TiposDocIdentidad.IdDocIdentidad
							  INNER JOIN AtencionesDatosAdicionales
							  ON Atenciones.IdAtencion = AtencionesDatosAdicionales.idAtencion
							  INNER JOIN SIGH_EXTERNA.dbo.SisFiliaciones
							  ON AtencionesDatosAdicionales.IdSiaSis = SIGH_EXTERNA.dbo.SisFiliaciones.idSiasis
							  AND AtencionesDatosAdicionales.SisCodigo = SIGH_EXTERNA.dbo.SisFiliaciones.Codigo COLLATE Modern_Spanish_CI_AS
							  LEFT OUTER JOIN Establecimientos
							  ON AtencionesDatosAdicionales.IdEstablecimientoOrigen = Establecimientos.IdEstablecimiento
							  INNER JOIN Establecimientos as EstablecimientosO
							  on SIGH_EXTERNA.dbo.SisFuaAtencion.EstablecimientoCodigoRenaes='000'+EstablecimientosO.Codigo COLLATE SQL_Latin1_General_CP1_CI_AS
							  INNER JOIN Medicos 
							  ON ISNULL(Atenciones.IdMedicoEgreso,Atenciones.IdMedicoIngreso)=Medicos.IdMedico
							  INNER JOIN Empleados
							  ON Medicos.IdEmpleado = Empleados.IdEmpleado
							  INNER JOIN HIS_tabetnia ON HIS_tabetnia.codetni = Pacientes.IdEtnia
							  WHERE (SIGH_EXTERNA.dbo.SisFuaAtencion.idCuentaAtencion =?)
							  --AND Servicios.idServicio NOT IN (195,208,210,211,212,213,441,758,436,437,438,440,442,443,444,759,439,445)
							  ",[$IdCuentaAtencion]);
		$cont=count($filas);
		if($cont==1)
		{
			$datos=$filas[0];
			$resultado=true;
		}
		elseif($cont==0)
			$mensaje='No Existe Registro de Atencion';
		else
			$mensaje='Duplicidad de registro de Atencion';
		return ['resultado'=>$resultado,'mensaje'=>$mensaje,'datos'=>$datos];
	}
	public static function GeneraHojaFua($fua,&$spreadsheet,$HojaOrigen) {
		$resultado=false;
		$mensaje=null;
		$idCuentaAtencion=$fua->IdCuentaAtencion;
		$medicamentos=DB::select("SELECT FactCatalogoBienesInsumos.Codigo,
		                                 FactCatalogoBienesInsumos.Nombre,
										 SUM(farmMovimientoDetalle.Cantidad) AS Cantidad
								  FROM farmMovimientoVentas
								  INNER JOIN farmMovimiento
								  ON farmMovimientoVentas.movNumero = farmMovimiento.MovNumero
								  AND farmMovimientoVentas.movTipo = farmMovimiento.MovTipo
								  INNER JOIN farmMovimientoDetalle
								  --ON farmMovimiento.MovNumero = farmMovimientoDetalle.MovNumero
								  --AND farmMovimiento.MovTipo = farmMovimientoDetalle.MovTipo
								  ON farmMovimiento.MovNumero COLLATE DATABASE_DEFAULT= farmMovimientoDetalle.MovNumero COLLATE DATABASE_DEFAULT 
								  AND farmMovimiento.MovTipo COLLATE DATABASE_DEFAULT= farmMovimientoDetalle.MovTipo COLLATE DATABASE_DEFAULT
								  INNER JOIN FactCatalogoBienesInsumos
								  ON farmMovimientoDetalle.idProducto = FactCatalogoBienesInsumos.IdProducto
								  WHERE (farmMovimiento.idEstadoMovimiento = 1)
								  AND (farmMovimientoVentas.idCuentaAtencion =?)
								  AND (FactCatalogoBienesInsumos.TipoProducto=0)
								  GROUP BY FactCatalogoBienesInsumos.Codigo, FactCatalogoBienesInsumos.Nombre",[$idCuentaAtencion]);
		$insumos=DB::select("SELECT FactCatalogoBienesInsumos.Codigo,
		                            FactCatalogoBienesInsumos.Nombre,
									SUM(farmMovimientoDetalle.Cantidad) AS Cantidad
							 FROM farmMovimientoVentas
							 INNER JOIN farmMovimiento
							 ON farmMovimientoVentas.movNumero = farmMovimiento.MovNumero
							 AND farmMovimientoVentas.movTipo = farmMovimiento.MovTipo
							 INNER JOIN farmMovimientoDetalle
							 --ON farmMovimiento.MovNumero = farmMovimientoDetalle.MovNumero
							 --AND farmMovimiento.MovTipo = farmMovimientoDetalle.MovTipo
							 ON farmMovimiento.MovNumero COLLATE DATABASE_DEFAULT= farmMovimientoDetalle.MovNumero COLLATE DATABASE_DEFAULT 
							 AND farmMovimiento.MovTipo COLLATE DATABASE_DEFAULT= farmMovimientoDetalle.MovTipo COLLATE DATABASE_DEFAULT
							 INNER JOIN FactCatalogoBienesInsumos
							 ON farmMovimientoDetalle.idProducto = FactCatalogoBienesInsumos.IdProducto
							 WHERE (farmMovimiento.idEstadoMovimiento = 1)
							 AND (farmMovimientoVentas.idCuentaAtencion =?)
							 AND (FactCatalogoBienesInsumos.TipoProducto=1)
							 GROUP BY FactCatalogoBienesInsumos.Codigo, FactCatalogoBienesInsumos.Nombre",[$idCuentaAtencion]);
		$diagnosticos=DB::select("SELECT Diagnosticos.Descripcion,
		                                 Diagnosticos.codigoCIEsinPto,
										 SubclasificacionDiagnosticos.Codigo as Tipo
								  FROM AtencionesDiagnosticos
								  INNER JOIN Diagnosticos
								  ON AtencionesDiagnosticos.IdDiagnostico = Diagnosticos.IdDiagnostico
								  INNER JOIN Atenciones
								  ON AtencionesDiagnosticos.IdAtencion = Atenciones.IdAtencion
								  INNER JOIN SubclasificacionDiagnosticos
								  ON AtencionesDiagnosticos.IdSubclasificacionDx = SubclasificacionDiagnosticos.IdSubclasificacionDx
								  WHERE (SubclasificacionDiagnosticos.Codigo IN ('P', 'D', 'R'))
								  AND (Atenciones.IdCuentaAtencion =?)",[$idCuentaAtencion]);
		$procedimientos1=DB::select("SELECT FactCatalogoServicios.Nombre,
		                                    FactCatalogoServicios.Codigo,
											COUNT(*) AS Cantidad
									 FROM FactOrdenServicio
									 INNER JOIN FacturacionServicioDespacho
									 ON FactOrdenServicio.IdOrden = FacturacionServicioDespacho.idOrden
									 INNER JOIN FactCatalogoServicios
									 ON FactCatalogoServicios.IdProducto = FacturacionServicioDespacho.IdProducto
									 WHERE (FactOrdenServicio.IdCuentaAtencion =?)
									 AND (FactOrdenServicio.IdEstadoFacturacion <> 9)
									 GROUP BY FactCatalogoServicios.Nombre, FactCatalogoServicios.Codigo",[$idCuentaAtencion]);
		self::ClonaHojaExcel($spreadsheet,$HojaOrigen,"id".$idCuentaAtencion);
		$worksheet=$spreadsheet->setActiveSheetIndexByName("id".$idCuentaAtencion);
		$worksheet->getCell("BF2")->setValue("Fe.Em.: ".date('d/m/Y H:i',time()));
		$worksheet->getCell("BF3")->setValue("Cta: ".$idCuentaAtencion);
		$worksheet->getCell("R7")->setValue($fua->FuaDisa);
		$worksheet->getCell("X7")->setValue($fua->FuaLote);
		$worksheet->getCell("AB7")->setValue($fua->FuaNumero);
		$worksheet->getCell("A13")->setValue($fua->EstablecimientoCodigoRenaes);
		$worksheet->getCell("T13")->setValue($fua->Establecimiento);
		if($fua->FuaPersonalQatiende==1) $worksheet->getCell("F16")->setValue("X");
		if($fua->FuaPersonalQatiende==2) $worksheet->getCell("F18")->setValue("X");
		if($fua->FuaPersonalQatiende==3) $worksheet->getCell("F19")->setValue("X");
		if($fua->FuaPersonalQatiende==3) $worksheet->getCell("I18")->setValue($fua->FuaCodOferFlexible);
		if($fua->FuaAtencionLugar==1) $worksheet->getCell("AA16")->setValue("X");
		if($fua->FuaAtencionLugar==2) $worksheet->getCell("AA18")->setValue("X");
		if($fua->IdEstablecimientoOrigen!=null)
		{
			$worksheet->getCell("AJ18")->setValue("X");
			$worksheet->getCell("AM18")->setValue($fua->CodRenaesRef);
			$worksheet->getCell("AU18")->setValue($fua->NomEstablecimientoReferencia);
			$worksheet->getCell("BJ18")->setValue($fua->NroReferenciaOrigen);
		}
		else
			if($fua->IdTipoServicio==1||$fua->IdTipoServicio==3)
				$worksheet->getCell("AJ16")->setValue("X");
			else
				$worksheet->getCell("AJ19")->setValue("X");
		//$worksheet->getCell("A25")->setValue($fua->CodigoSIS);
		$worksheet->getCell("A25")->setValue($fua->TipoDocIdentidad);
		$worksheet->getCell("C25")->setValue($fua->NroDocumento);
		$worksheet->getCell("Q25")->setValue($fua->AfiliacionDisa);
		$worksheet->getCell("W25")->setValue($fua->AfiliacionTipoFormato);
		$worksheet->getCell("Z25")->setValue($fua->AfiliacionNroFormato);
		$worksheet->getCell("A28")->setValue($fua->ApellidoPaterno);
		$worksheet->getCell("AK28")->setValue($fua->ApellidoMaterno);
		$worksheet->getCell("A31")->setValue($fua->Nombres);
		if($fua->IdTipoSexo==1)$worksheet->getCell("E35")->setValue("X"); else $worksheet->getCell("E36")->setValue("X");
		$worksheet->getCell("AR35")->setValue($fua->NroHistoriaClinica);
		$worksheet->getCell("BF35")->setValue($fua->IdEtnia);
		$worksheet->getCell("R38")->setValue(date('d',strtotime($fua->FechaNacimiento)));
		$worksheet->getCell("Y38")->setValue(date('m',strtotime($fua->FechaNacimiento)));
		$worksheet->getCell("AE38")->setValue(date('Y',strtotime($fua->FechaNacimiento)));
		$worksheet->getCell("P53")->setValue($fua->HoraIngreso);
		$worksheet->getCell("W53")->setValue($fua->codigoServicioFUA);
		if($fua->esConsultorio == '0')
			$worksheet->getCell("AC53")->setValue(" ");
		else
			$worksheet->getCell("AC53")->setValue($fua->FuaCodigoPrestacion);
		$worksheet->getCell("A54")->setValue(date('d',strtotime($fua->FechaIngreso)));
		$worksheet->getCell("C54")->setValue(date('m',strtotime($fua->FechaIngreso)));
		$worksheet->getCell("G54")->setValue(date('Y',strtotime($fua->FechaIngreso)));
		$worksheet->getCell("A104")->setValue($fua->DNIMedico);
		$worksheet->getCell("O104")->setValue($fua->Medico);
		$worksheet->getCell("BF104")->setValue($fua->Colegiatura);
		$worksheet->getCell("AR127")->setValue($fua->FuaDisa);
		$worksheet->getCell("AX127")->setValue($fua->FuaLote);
		$worksheet->getCell("BD127")->setValue($fua->FuaNumero);
		$worksheet->getCell("BA106")->setValue($fua->rne);
		$worksheet->getCell("O106")->setValue($fua->IdColegioHIS);
		$worksheet->getCell("Z106")->setValue($fua->Especialidad);
		
		//Diagnosticos
		for($i=0;$i<=5;$i++)
		{
			$fila=96+$i;
			if(isset($diagnosticos[$i]))
			{
				$worksheet->getCell("B$fila")->setValue($diagnosticos[$i]->Descripcion);
				if($diagnosticos[$i]->Tipo=="P")$worksheet->getCell("AO$fila")->setValue("X");
				if($diagnosticos[$i]->Tipo=="D")$worksheet->getCell("AQ$fila")->setValue("X");
				if($diagnosticos[$i]->Tipo=="R")$worksheet->getCell("AT$fila")->setValue("X");
				$worksheet->getCell("AX$fila")->setValue($diagnosticos[$i]->codigoCIEsinPto);
			}
		}
		//Medicamentos
		for($i=0;$i<=12;$i++)
		{
			$fila=132+$i;
			$worksheet->getRowDimension($fila)->setVisible(true);
			if(isset($medicamentos[2*$i]))
			{
				$worksheet->getCell("A$fila")->setValue($medicamentos[2*$i]->Codigo);
				$worksheet->getCell("C$fila")->setValue($medicamentos[2*$i]->Nombre);
				$worksheet->getCell("AB$fila")->setValue($medicamentos[2*$i]->Cantidad);
				$worksheet->getCell("AF$fila")->setValue($medicamentos[2*$i]->Cantidad);
				if(isset($diagnosticos[0]))$worksheet->getCell("AI$fila")->setValue($diagnosticos[0]->codigoCIEsinPto);
			}
			if(isset($medicamentos[2*$i+1]))
			{
				$worksheet->getCell("AL$fila")->setValue($medicamentos[2*$i+1]->Codigo);
				$worksheet->getCell("AP$fila")->setValue($medicamentos[2*$i+1]->Nombre);
				$worksheet->getCell("BI$fila")->setValue($medicamentos[2*$i+1]->Cantidad);
				$worksheet->getCell("BK$fila")->setValue($medicamentos[2*$i+1]->Cantidad);
				if(isset($diagnosticos[0]))$worksheet->getCell("BL$fila")->setValue($diagnosticos[0]->codigoCIEsinPto);
			}
		}
		//Insumos
		for($i=0;$i<=12;$i++)
		{
			$fila=160+$i;
			$worksheet->getRowDimension($fila)->setVisible(true);
			if(isset($insumos[2*$i]))
			{
				$worksheet->getCell("A$fila")->setValue($insumos[2*$i]->Codigo);
				$worksheet->getCell("C$fila")->setValue($insumos[2*$i]->Nombre);
				$worksheet->getCell("AB$fila")->setValue($insumos[2*$i]->Cantidad);
				$worksheet->getCell("AF$fila")->setValue($insumos[2*$i]->Cantidad);
				if(isset($diagnosticos[0]))$worksheet->getCell("AI$fila")->setValue($diagnosticos[0]->codigoCIEsinPto);
			}
			if(isset($insumos[2*$i+1]))
			{
				$worksheet->getCell("AL$fila")->setValue($insumos[2*$i+1]->Codigo);
				$worksheet->getCell("AP$fila")->setValue($insumos[2*$i+1]->Nombre);
				$worksheet->getCell("BI$fila")->setValue($insumos[2*$i+1]->Cantidad);
				$worksheet->getCell("BK$fila")->setValue($insumos[2*$i+1]->Cantidad);
				if(isset($diagnosticos[0]))$worksheet->getCell("BL$fila")->setValue($diagnosticos[0]->codigoCIEsinPto);
			}
		}
		//Procedimientos 1
		for($i=0;$i<=12;$i++)
		{
			$fila=188+$i;
			$worksheet->getRowDimension($fila)->setVisible(true);
			if(isset($procedimientos1[2*$i]))
			{
				$worksheet->getCell("A$fila")->setValue($procedimientos1[2*$i]->Codigo);
				$worksheet->getCell("C$fila")->setValue($procedimientos1[2*$i]->Nombre);
				$worksheet->getCell("V$fila")->setValue($procedimientos1[2*$i]->Cantidad);
				$worksheet->getCell("AB$fila")->setValue($procedimientos1[2*$i]->Cantidad);
				if(isset($diagnosticos[0]))$worksheet->getCell("AF$fila")->setValue($diagnosticos[0]->codigoCIEsinPto);
			}
			if(isset($procedimientos1[2*$i+1]))
			{
				$worksheet->getCell("AL$fila")->setValue($procedimientos1[2*$i+1]->Codigo);
				$worksheet->getCell("AP$fila")->setValue($procedimientos1[2*$i+1]->Nombre);
				$worksheet->getCell("BE$fila")->setValue($procedimientos1[2*$i+1]->Cantidad);
				$worksheet->getCell("BI$fila")->setValue($procedimientos1[2*$i+1]->Cantidad);
				if(isset($diagnosticos[0]))$worksheet->getCell("BK$fila")->setValue($diagnosticos[0]->codigoCIEsinPto);
			}
		}
	}
	public static function ClonaHojaExcel(&$spreadsheet,$HojaOrigen,$HojaDestino) {
		$clonedWorksheet=clone $spreadsheet->getSheetByName($HojaOrigen);
		$clonedWorksheet->setTitle($HojaDestino);
		$spreadsheet->addSheet($clonedWorksheet);
	}
}