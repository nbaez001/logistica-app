package com.besoft.siserp.lgtc.util;

public class ConstanteUtil {

	public static final String BD_SCHEMA_LGTC = "ERPLGTC";
	public static final String BD_PCK_LGTC_ADMINISTRACION = "PCK_LGTC_ADMINISTRACION";
	public static final String BD_PCK_LGTC_GENERICO = "PCK_LGTC_GENERICO";
	public static final String BD_PCK_LGTC_MARCA = "PCK_LGTC_MARCA";
	public static final String BD_PCK_LGTC_PRODUCTO = "PCK_LGTC_PRODUCTO";
	public static final String BD_PCK_LGTC_UBIGEO = "PCK_LGTC_UBIGEO";
	public static final String BD_PCK_LGTC_PROVEEDOR = "PCK_LGTC_PROVEEDOR";
	public static final String BD_PCK_LGTC_ALMACEN = "PCK_LGTC_ALMACEN";
	public static final String BD_PCK_LGTC_COMPRA = "PCK_LGTC_COMPRA";
	public static final String BD_PCK_LGTC_INVENTARIO = "PCK_LGTC_INVENTARIO";

	public static final String R_CODIGO = "R_CODIGO";
	public static final String R_MENSAJE = "R_MENSAJE";
	public static final String R_LISTA = "R_LISTA";

	public static final Integer R_COD_EXITO = 0;

	public static final String DD_MM_YYYY = "dd/MM/yyyy";
	public static final String DD_DD_YY = "dd/MM/yy";
	public static final String guion_DDMMYYYY = "dd-MM-yyyy";
	public static final String guion_YYYYMMDD = "yyyy-MM-dd";
	public static final String slashDDMMYYYY = "dd/MM/yyyy";

	public static final String ubicacionSfs = "D:/SISERP/SFS_v1.3/";
	public static final String pathProxy = "http://localhost:3000/";

	public static final String rucEmpresa = "20494506131";
	public static final String nombreEmpresa = "FERRETERIA CENTRO SUR S.A.C";

	public static final char separadorPunto = '.';
	public static final char separadorComa = '.';
	public static final String formato1Decimal = "0.0";
	public static final String formato2Decimal = "0.00";

	// IDS DE ESTADO DE COMPROBANTE
	public static final String REGISTRADO = "1";
	public static final String JSON_GENERADO = "2";
	public static final String XML_GENERADO = "3";
	public static final String XML_CORREGIDO = "4";
	public static final String PDF_GENERADO = "5";
	public static final String ENVIADO_SUNAT = "6";
	public static final String OBSERVADO_SUNAT = "7";

	public static final String NOM_GENERICO = "GENERICO";
	public static final String DESC_GENERICO = "-";
	public static final String MARCA_GENERICO = "GENERICO";
	public static final String COD_MARCA_GENERICO = "GEN";
	// TABLAS MAESTRA
	public static final Integer tablaEstadoComprobanteVenta = 6;

	// TIPO COMPROBANTE O DOCUMENTO
	public static final String factura = "01";
	public static final String boletaVenta = "03";
	public static final String cartaPorteAereo = "06";
	public static final String notaCredito = "07";
	public static final String notaDebito = "08";
	public static final String guiaRemisionRemitente = "09";
	public static final String ticketMaquinaRegistradora = "12";
	public static final String docEmitidoPorBancosFinancieras = "13";
	public static final String reciboServiciosPublicos = "14";
	public static final String boletosEmitidosPorServicioTransporteUrbano = "15";
	public static final String boletoViajeEmitidoEmpresasTransporteInterprovincial = "16";
	public static final String docEmitidosporAFP = "18";
	public static final String comprobanteRetencion = "20";
	public static final String conocimientoEmbarqueServicioTransporteCargaMaritima = "21";
	public static final String certificadoPagoregaliasEmitidasPetroperuSA = "24";
	public static final String guiaRemisionTransportista = "31";
	public static final String docConcecionariosServicioRevisionTecnica = "37";
	public static final String comprobantePercepcion = "40";
	public static final String comprobantePercepcionVentaInterna = "41";
	public static final String boletoCopañiasAviacionTransporteAereo = "43";
	public static final String docEmitidoCentrosEducativosUniversidades = "45";
	public static final String comprobantePafoSEASE = "56";
	public static final String guiaRemisionRemitenteComplementaria = "71";
	public static final String guiaRemisionTransportistaComplementaria = "72";

}
