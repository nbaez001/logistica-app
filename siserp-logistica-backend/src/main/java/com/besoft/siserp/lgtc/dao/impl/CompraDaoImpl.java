package com.besoft.siserp.lgtc.dao.impl;

import java.sql.Types;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Repository;

import com.besoft.siserp.lgtc.dao.CompraDao;
import com.besoft.siserp.lgtc.dto.OutResponse;
import com.besoft.siserp.lgtc.dto.request.CompraBuscarRequest;
import com.besoft.siserp.lgtc.dto.request.CompraEliminarRequest;
import com.besoft.siserp.lgtc.dto.request.CompraListarRequest;
import com.besoft.siserp.lgtc.dto.request.CompraModificarRequest;
import com.besoft.siserp.lgtc.dto.request.CompraProductoBuscarRequest;
import com.besoft.siserp.lgtc.dto.request.CompraProveedorBuscarRequest;
import com.besoft.siserp.lgtc.dto.request.CompraRegistrarRequest;
import com.besoft.siserp.lgtc.dto.response.CompraBuscarDetalleListarResponse;
import com.besoft.siserp.lgtc.dto.response.CompraBuscarReponse;
import com.besoft.siserp.lgtc.dto.response.CompraListarResponse;
import com.besoft.siserp.lgtc.dto.response.CompraProductoBuscarResponse;
import com.besoft.siserp.lgtc.dto.response.CompraProveedorBuscarResponse;
import com.besoft.siserp.lgtc.dto.response.CompraRegistrarResponse;
import com.besoft.siserp.lgtc.dto.response.mapper.CompraBuscarDetalleListarResponseMapper;
import com.besoft.siserp.lgtc.dto.response.mapper.CompraListarResponseMapper;
import com.besoft.siserp.lgtc.dto.response.mapper.CompraProductoBuscarResponseMapper;
import com.besoft.siserp.lgtc.dto.response.mapper.CompraProveedorBuscarResponseMapper;
import com.besoft.siserp.lgtc.util.ConstanteUtil;
import com.besoft.siserp.lgtc.util.DateUtil;
import com.besoft.siserp.lgtc.util.MapUtil;

@Repository
public class CompraDaoImpl implements CompraDao {

	Logger log = LoggerFactory.getLogger(CompraDaoImpl.class);

	@Autowired
	DataSource dataSource;

	@Override
	public OutResponse<CompraRegistrarResponse> registrarCompra(CompraRegistrarRequest c, String detalleCompra) {
		log.info("[REGISTRAR COMPRA][DAO][INICIO]");
		OutResponse<CompraRegistrarResponse> outResponse = new OutResponse<>();

		Integer rCodigo = 0;
		String rMensaje = "";
		try {
			SimpleJdbcCall jdbcCall = new SimpleJdbcCall(dataSource).withSchemaName(ConstanteUtil.BD_SCHEMA_LGTC)
					.withCatalogName(ConstanteUtil.BD_PCK_LGTC_COMPRA).withProcedureName("SP_I_COMPRA");

			MapSqlParameterSource in = new MapSqlParameterSource();
			in.addValue("P_ID_PROVEEDOR", c.getIdProveedor(), Types.NUMERIC);
			in.addValue("P_IDT_ESTADO_COMPRA", c.getIdtEstadoCompra(), Types.NUMERIC);
			in.addValue("P_IDT_TIPO_COMPROBANTE", c.getIdtTipoComprobante(), Types.NUMERIC);
			in.addValue("P_MONTO_TOTAL", c.getMontoTotal(), Types.DECIMAL);
			in.addValue("P_SERIE_COMPROBANTE", c.getSerieComprobante(), Types.VARCHAR);
			in.addValue("P_NRO_COMPROBANTE", c.getNroComprobante(), Types.VARCHAR);
			in.addValue("P_NRO_ORDEN_COMPRA", c.getNroOrdenCompra(), Types.VARCHAR);
			in.addValue("P_OBSERVACION", c.getObservacion(), Types.VARCHAR);
			in.addValue("P_FECHA", DateUtil.slashDDMMYYYY(c.getFecha()), Types.VARCHAR);
			in.addValue("P_FLAG_ACTIVO", c.getFlagActivo(), Types.NUMERIC);
			in.addValue("P_ID_USUARIO_CREA", c.getIdUsuarioCrea(), Types.NUMERIC);
			in.addValue("P_FEC_USUARIO_CREA", DateUtil.formatDDMMYYYY(c.getFecUsuarioCrea()), Types.VARCHAR);
			in.addValue("P_L_DETALLE_COMPRA", detalleCompra, Types.VARCHAR);

			in.addValue("P_NOM_PROVEEDOR", c.getNomProveedor(), Types.VARCHAR);
			in.addValue("P_TIP_DOC_PROVEDOR", c.getTipDocProveedor(), Types.NUMERIC);
			in.addValue("P_NRO_DOC_PROVEEDOR", c.getNroDocProveedor(), Types.VARCHAR);
			log.info("[REGISTRAR COMPRA][DAO][INPUT PROCEDURE][" + in.toString() + "]");

			Map<String, Object> out = jdbcCall.execute(in);
			log.info("[REGISTRAR COMPRA][DAO][OUTPUT PROCEDURE][" + out.toString() + "]");

			rCodigo = Integer.parseInt(out.get("R_CODIGO").toString());
			rMensaje = out.get("R_MENSAJE").toString();

			if (rCodigo == ConstanteUtil.R_COD_EXITO) {// CONSULTA CORRECTA
				log.info("[REGISTRAR COMPRA][DAO][EXITO]");
				CompraRegistrarResponse res = new CompraRegistrarResponse();
				res.setId(MapUtil.getLong(out.get("R_ID")));
				res.setIdProveedor(MapUtil.getLong(out.get("P_ID_PROVEEDOR")));
				res.setCodCompra(MapUtil.getString(out.get("R_COD_COMPRA")));

				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
				outResponse.setObjeto(res);
			} else {
				log.info("[REGISTRAR COMPRA][DAO][ERROR]");
				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
			}
		} catch (Exception e) {
			log.info("[REGISTRAR COMPRA][DAO][EXCEPCION][" + e.getMessage() + "]");
			outResponse.setRCodigo(500);
			outResponse.setRMensaje(e.getMessage());
		}
		log.info("[REGISTRAR COMPRA][DAO][FIN]");
		return outResponse;
	}

	@Override
	public OutResponse<?> modificarCompra(CompraModificarRequest c, String detalleCompra) {
		log.info("[MODIFICAR COMPRA][DAO][INICIO]");
		OutResponse<?> outResponse = new OutResponse<>();

		Integer rCodigo = 0;
		String rMensaje = "";
		try {
			SimpleJdbcCall jdbcCall = new SimpleJdbcCall(dataSource).withSchemaName(ConstanteUtil.BD_SCHEMA_LGTC)
					.withCatalogName(ConstanteUtil.BD_PCK_LGTC_COMPRA).withProcedureName("SP_U_COMPRA");

			MapSqlParameterSource in = new MapSqlParameterSource();
			in.addValue("P_ID", c.getId(), Types.NUMERIC);
			in.addValue("P_ID_PROVEEDOR", c.getIdProveedor(), Types.NUMERIC);
			in.addValue("P_IDT_TIPO_COMPROBANTE", c.getIdtTipoComprobante(), Types.NUMERIC);
			in.addValue("P_MONTO_TOTAL", c.getMontoTotal(), Types.DECIMAL);
			in.addValue("P_SERIE_COMPROBANTE", c.getSerieComprobante(), Types.VARCHAR);
			in.addValue("P_NRO_COMPROBANTE", c.getNroComprobante(), Types.VARCHAR);
			in.addValue("P_NRO_ORDEN_COMPRA", c.getNroOrdenCompra(), Types.VARCHAR);
			in.addValue("P_OBSERVACION", c.getObservacion(), Types.VARCHAR);
			in.addValue("P_FECHA", DateUtil.slashDDMMYYYY(c.getFecha()), Types.VARCHAR);
			in.addValue("P_ID_USUARIO_MOD", c.getIdUsuarioMod(), Types.NUMERIC);
			in.addValue("P_FEC_USUARIO_MOD", DateUtil.formatDDMMYYYY(c.getFecUsuarioMod()), Types.VARCHAR);

			in.addValue("P_L_DETALLE_COMPRA", detalleCompra, Types.VARCHAR);

			in.addValue("P_NOM_PROVEEDOR", c.getNomProveedor(), Types.VARCHAR);
			in.addValue("P_TIP_DOC_PROVEDOR", c.getTipDocProveedor(), Types.NUMERIC);
			in.addValue("P_NRO_DOC_PROVEEDOR", c.getNroDocProveedor(), Types.VARCHAR);
			log.info("[MODIFICAR COMPRA][DAO][INPUT PROCEDURE][" + in.toString() + "]");

			Map<String, Object> out = jdbcCall.execute(in);
			log.info("[MODIFICAR COMPRA][DAO][OUTPUT PROCEDURE][" + out.toString() + "]");

			rCodigo = Integer.parseInt(out.get("R_CODIGO").toString());
			rMensaje = out.get("R_MENSAJE").toString();

			if (rCodigo == ConstanteUtil.R_COD_EXITO) {// CONSULTA CORRECTA
				log.info("[MODIFICAR COMPRA][DAO][EXITO]");

				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
			} else {
				log.info("[MODIFICAR COMPRA][DAO][ERROR]");
				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
			}
		} catch (Exception e) {
			log.info("[MODIFICAR COMPRA][DAO][EXCEPCION][" + e.getMessage() + "]");
			outResponse.setRCodigo(500);
			outResponse.setRMensaje(e.getMessage());
		}
		log.info("[MODIFICAR COMPRA][DAO][FIN]");
		return outResponse;
	}

	@Override
	public OutResponse<List<CompraListarResponse>> listarCompra(CompraListarRequest req) {
		log.info("[LISTAR COMPRA][DAO][INICIO]");
		OutResponse<List<CompraListarResponse>> outResponse = new OutResponse<>();

		Integer rCodigo = 0;
		String rMensaje = "";
		try {
			SimpleJdbcCall jdbcCall = new SimpleJdbcCall(dataSource).withSchemaName(ConstanteUtil.BD_SCHEMA_LGTC)
					.withCatalogName(ConstanteUtil.BD_PCK_LGTC_COMPRA).withProcedureName("SP_L_COMPRA")
					.returningResultSet("R_LISTA", new CompraListarResponseMapper());

			MapSqlParameterSource in = new MapSqlParameterSource();
			in.addValue("P_FEC_INICIO", DateUtil.slashDDMMYYYY(req.getFecInicio()), Types.VARCHAR);
			in.addValue("P_FEC_FIN", DateUtil.slashDDMMYYYY(req.getFecFin()), Types.VARCHAR);
			in.addValue("P_IDT_ESTADO_COMPRA", req.getIdtEstadoCompra(), Types.NUMERIC);
			in.addValue("P_FLAG_ACTIVO", req.getFlagActivo(), Types.NUMERIC);
			log.info("[LISTAR COMPRA][DAO][INPUT PROCEDURE][" + in.toString() + "]");

			Map<String, Object> out = jdbcCall.execute(in);
			log.info("[LISTAR COMPRA][DAO][OUTPUT PROCEDURE][" + out.toString() + "]");

			rCodigo = Integer.parseInt(out.get("R_CODIGO").toString());
			rMensaje = out.get("R_MENSAJE").toString();

			if (rCodigo == ConstanteUtil.R_COD_EXITO) {// CONSULTA CORRECTA
				log.info("[LISTAR COMPRA][DAO][EXITO]");
				List<CompraListarResponse> res = (List<CompraListarResponse>) out.get("R_LISTA");

				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
				outResponse.setObjeto(res);
			} else {
				log.info("[LISTAR COMPRA][DAO][ERROR]");
				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
			}
		} catch (Exception e) {
			log.info("[LISTAR COMPRA][DAO][EXCEPCION][" + e.getMessage() + "]");
			outResponse.setRCodigo(500);
			outResponse.setRMensaje(e.getMessage());
		}
		log.info("[LISTAR COMPRA][DAO][FIN]");
		return outResponse;
	}

	@Override
	public OutResponse<?> eliminarCompra(CompraEliminarRequest c) {
		log.info("[ELIMINAR COMPRA][DAO][INICIO]");
		OutResponse<?> outResponse = new OutResponse<>();

		Integer rCodigo = 0;
		String rMensaje = "";
		try {
			SimpleJdbcCall jdbcCall = new SimpleJdbcCall(dataSource).withSchemaName(ConstanteUtil.BD_SCHEMA_LGTC)
					.withCatalogName(ConstanteUtil.BD_PCK_LGTC_COMPRA).withProcedureName("SP_D_COMPRA");

			MapSqlParameterSource in = new MapSqlParameterSource();
			in.addValue("P_ID", c.getId(), Types.NUMERIC);
			log.info("[ELIMINAR COMPRA][DAO][INPUT PROCEDURE][" + in.toString() + "]");

			Map<String, Object> out = jdbcCall.execute(in);
			log.info("[ELIMINAR COMPRA][DAO][OUTPUT PROCEDURE][" + out.toString() + "]");

			rCodigo = Integer.parseInt(out.get("R_CODIGO").toString());
			rMensaje = out.get("R_MENSAJE").toString();

			if (rCodigo == ConstanteUtil.R_COD_EXITO) {// CONSULTA CORRECTA
				log.info("[ELIMINAR COMPRA][DAO][EXITO]");
				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
			} else {
				log.info("[ELIMINAR COMPRA][DAO][ERROR]");
				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
			}
		} catch (Exception e) {
			log.info("[ELIMINAR COMPRA][DAO][EXCEPCION][" + e.getMessage() + "]");
			outResponse.setRCodigo(500);
			outResponse.setRMensaje(e.getMessage());
		}
		log.info("[ELIMINAR COMPRA][DAO][FIN]");
		return outResponse;
	}

	@Override
	public OutResponse<CompraBuscarReponse> buscarCompra(CompraBuscarRequest req) {
		log.info("[BUSCAR COMPRA][DAO][INICIO]");
		OutResponse<CompraBuscarReponse> outResponse = new OutResponse<>();

		Integer rCodigo = 0;
		String rMensaje = "";
		try {
			SimpleJdbcCall jdbcCall = new SimpleJdbcCall(dataSource).withSchemaName(ConstanteUtil.BD_SCHEMA_LGTC)
					.withCatalogName(ConstanteUtil.BD_PCK_LGTC_COMPRA).withProcedureName("SP_S_BUSCAR_COMPRA")
					.returningResultSet("R_LISTA", new CompraBuscarDetalleListarResponseMapper());

			MapSqlParameterSource in = new MapSqlParameterSource();
			in.addValue("P_ID", req.getId(), Types.NUMERIC);
			log.info("[BUSCAR COMPRA][DAO][INPUT PROCEDURE][" + in.toString() + "]");

			Map<String, Object> out = jdbcCall.execute(in);
			log.info("[BUSCAR COMPRA][DAO][OUTPUT PROCEDURE][" + out.toString() + "]");

			rCodigo = Integer.parseInt(out.get("R_CODIGO").toString());
			rMensaje = out.get("R_MENSAJE").toString();

			if (rCodigo == ConstanteUtil.R_COD_EXITO) {// CONSULTA CORRECTA
				log.info("[BUSCAR COMPRA][DAO][EXITO]");
				CompraBuscarReponse res = new CompraBuscarReponse();
				res.setIdProveedor(MapUtil.getLong(out.get("R_ID_PROVEEDOR")));
				res.setNomProveedor(MapUtil.getString(out.get("R_NOM_PROVEEDOR")));
				res.setTipDocProveedor(MapUtil.getLong(out.get("R_TIP_DOC_PROVEDOR")));
				res.setNroDocProveedor(MapUtil.getString(out.get("R_NRO_DOC_PROVEEDOR")));
				res.setIdtTipoComprobante(MapUtil.getLong(out.get("R_IDT_TIPO_COMPROBANTE")));
				res.setMontoTotal(MapUtil.getDouble(out.get("R_MONTO_TOTAL")));
				res.setSerieComprobante(MapUtil.getString(out.get("R_SERIE_COMPROBANTE")));
				res.setNroComprobante(MapUtil.getString(out.get("R_NRO_COMPROBANTE")));
				res.setNroOrdenCompra(MapUtil.getString(out.get("R_NRO_ORDEN_COMPRA")));
				res.setObservacion(MapUtil.getString(out.get("R_OBSERVACION")));
				res.setFecha(MapUtil.getDate(out.get("R_FECHA"), ConstanteUtil.guion_DDMMYYYY));

				List<CompraBuscarDetalleListarResponse> resDet = (List<CompraBuscarDetalleListarResponse>) out
						.get("R_LISTA");
				res.setListaDetalleCompra(resDet);

				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
				outResponse.setObjeto(res);
			} else {
				log.info("[BUSCAR COMPRA][DAO][ERROR]");
				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
			}
		} catch (Exception e) {
			log.info("[BUSCAR COMPRA][DAO][EXCEPCION][" + e.getMessage() + "]");
			outResponse.setRCodigo(500);
			outResponse.setRMensaje(e.getMessage());
		}
		log.info("[BUSCAR COMPRA][DAO][FIN]");
		return outResponse;
	}

	@Override
	public OutResponse<List<CompraProveedorBuscarResponse>> buscarProveedor(CompraProveedorBuscarRequest req) {
		log.info("[PROVEEDOR BUSCAR][DAO][INICIO]");
		OutResponse<List<CompraProveedorBuscarResponse>> outResponse = new OutResponse<>();

		Integer rCodigo = 0;
		String rMensaje = "";
		try {
			SimpleJdbcCall jdbcCall = new SimpleJdbcCall(dataSource).withSchemaName(ConstanteUtil.BD_SCHEMA_LGTC)
					.withCatalogName(ConstanteUtil.BD_PCK_LGTC_COMPRA).withProcedureName("SP_L_BUSCAR_PROVEEDOR")
					.returningResultSet("R_LISTA", new CompraProveedorBuscarResponseMapper());

			MapSqlParameterSource in = new MapSqlParameterSource();
			in.addValue("P_NOM_PROVEEDOR", req.getNomProveedor(), Types.VARCHAR);
			in.addValue("P_NRO_DOC_PROVEEDOR", req.getNroDocProveedor(), Types.VARCHAR);
			log.info("[PROVEEDOR BUSCAR][DAO][INPUT PROCEDURE][" + in.toString() + "]");

			Map<String, Object> out = jdbcCall.execute(in);
			log.info("[PROVEEDOR BUSCAR][DAO][OUTPUT PROCEDURE][" + out.toString() + "]");

			rCodigo = Integer.parseInt(out.get("R_CODIGO").toString());
			rMensaje = out.get("R_MENSAJE").toString();

			if (rCodigo == ConstanteUtil.R_COD_EXITO) {// CONSULTA CORRECTA
				log.info("[PROVEEDOR BUSCAR][DAO][EXITO]");
				List<CompraProveedorBuscarResponse> res = (List<CompraProveedorBuscarResponse>) out.get("R_LISTA");

				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
				outResponse.setObjeto(res);
			} else {
				log.info("[PROVEEDOR BUSCAR][DAO][ERROR]");
				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
			}
		} catch (Exception e) {
			log.info("[PROVEEDOR BUSCAR][DAO][EXCEPCION][" + e.getMessage() + "]");
			outResponse.setRCodigo(500);
			outResponse.setRMensaje(e.getMessage());
		}
		log.info("[PROVEEDOR BUSCAR][DAO][FIN]");
		return outResponse;
	}

	@Override
	public OutResponse<List<CompraProductoBuscarResponse>> buscarProducto(CompraProductoBuscarRequest req) {
		log.info("[PRODUCTO BUSCAR][DAO][INICIO]");
		OutResponse<List<CompraProductoBuscarResponse>> outResponse = new OutResponse<>();

		Integer rCodigo = 0;
		String rMensaje = "";
		try {
			SimpleJdbcCall jdbcCall = new SimpleJdbcCall(dataSource).withSchemaName(ConstanteUtil.BD_SCHEMA_LGTC)
					.withCatalogName(ConstanteUtil.BD_PCK_LGTC_COMPRA).withProcedureName("SP_L_BUSCAR_PRODUCTO")
					.returningResultSet("R_LISTA", new CompraProductoBuscarResponseMapper());

			MapSqlParameterSource in = new MapSqlParameterSource();
			in.addValue("P_COD_PRODUCTO", req.getCodProducto(), Types.VARCHAR);
			in.addValue("P_NOM_PRODUCTO", req.getNomProducto(), Types.VARCHAR);
			log.info("[PRODUCTO BUSCAR][DAO][INPUT PROCEDURE][" + in.toString() + "]");

			Map<String, Object> out = jdbcCall.execute(in);
			log.info("[PRODUCTO BUSCAR][DAO][OUTPUT PROCEDURE][" + out.toString() + "]");

			rCodigo = Integer.parseInt(out.get("R_CODIGO").toString());
			rMensaje = out.get("R_MENSAJE").toString();

			if (rCodigo == ConstanteUtil.R_COD_EXITO) {// CONSULTA CORRECTA
				log.info("[PRODUCTO BUSCAR][DAO][EXITO]");
				List<CompraProductoBuscarResponse> res = (List<CompraProductoBuscarResponse>) out.get("R_LISTA");

				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
				outResponse.setObjeto(res);
			} else {
				log.info("[PRODUCTO BUSCAR][DAO][ERROR]");
				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
			}
		} catch (Exception e) {
			log.info("[PRODUCTO BUSCAR][DAO][EXCEPCION][" + e.getMessage() + "]");
			outResponse.setRCodigo(500);
			outResponse.setRMensaje(e.getMessage());
		}
		log.info("[PRODUCTO BUSCAR][DAO][FIN]");
		return outResponse;
	}

}