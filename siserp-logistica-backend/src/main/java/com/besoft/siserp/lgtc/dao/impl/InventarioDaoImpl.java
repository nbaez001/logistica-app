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

import com.besoft.siserp.lgtc.dao.InventarioDao;
import com.besoft.siserp.lgtc.dto.OutResponse;
import com.besoft.siserp.lgtc.dto.request.InventarioBuscarCompraRequest;
import com.besoft.siserp.lgtc.dto.request.InventarioBuscarInventCompraRequest;
import com.besoft.siserp.lgtc.dto.request.InventarioBuscarXCodigoRequest;
import com.besoft.siserp.lgtc.dto.request.InventarioBuscarXNombreRequest;
import com.besoft.siserp.lgtc.dto.request.InventarioCodigoBarraListarRequest;
import com.besoft.siserp.lgtc.dto.request.InventarioEstanteListarRequest;
import com.besoft.siserp.lgtc.dto.request.InventarioInventariarCompraRequest;
import com.besoft.siserp.lgtc.dto.request.InventarioListarRequest;
import com.besoft.siserp.lgtc.dto.request.InventarioModificarCompraRequest;
import com.besoft.siserp.lgtc.dto.request.InventarioUbicarProductoRequest;
import com.besoft.siserp.lgtc.dto.response.InventarioAlmacenListarResponse;
import com.besoft.siserp.lgtc.dto.response.InventarioBuscarCompraDetResponse;
import com.besoft.siserp.lgtc.dto.response.InventarioBuscarCompraResponse;
import com.besoft.siserp.lgtc.dto.response.InventarioBuscarInventCompraDetResponse;
import com.besoft.siserp.lgtc.dto.response.InventarioBuscarInventCompraResponse;
import com.besoft.siserp.lgtc.dto.response.InventarioBuscarResponse;
import com.besoft.siserp.lgtc.dto.response.InventarioCodigoBarraListarResponse;
import com.besoft.siserp.lgtc.dto.response.InventarioEstanteListarResponse;
import com.besoft.siserp.lgtc.dto.response.InventarioListarResponse;
import com.besoft.siserp.lgtc.dto.response.InventarioUbicarProductoResponse;
import com.besoft.siserp.lgtc.dto.response.ProductoListarResponse;
import com.besoft.siserp.lgtc.dto.response.mapper.CompraBuscarDetalleListarResponseMapper;
import com.besoft.siserp.lgtc.dto.response.mapper.InventarioAlmacenListarResponseMapper;
import com.besoft.siserp.lgtc.dto.response.mapper.InventarioBuscarInventCompraDetResponseMapper;
import com.besoft.siserp.lgtc.dto.response.mapper.InventarioBuscarResponseMapper;
import com.besoft.siserp.lgtc.dto.response.mapper.InventarioCodigoBarraListarResponseMapper;
import com.besoft.siserp.lgtc.dto.response.mapper.InventarioEstanteListarResponseMapper;
import com.besoft.siserp.lgtc.dto.response.mapper.InventarioListarResponseMapper;
import com.besoft.siserp.lgtc.dto.response.mapper.InventarioUbicarProductoResponseMapper;
import com.besoft.siserp.lgtc.dto.response.mapper.ProductoListarResponseMapper;
import com.besoft.siserp.lgtc.util.ConstanteUtil;
import com.besoft.siserp.lgtc.util.DateUtil;
import com.besoft.siserp.lgtc.util.MapUtil;

@Repository
public class InventarioDaoImpl implements InventarioDao {

	Logger log = LoggerFactory.getLogger(InventarioDaoImpl.class);

	@Autowired
	DataSource dataSource;

	@Override
	public OutResponse<?> inventariarCompra(InventarioInventariarCompraRequest c, String detalleInventario) {
		log.info("[INVENTARIAR COMPRA][DAO][INICIO]");
		OutResponse<?> outResponse = new OutResponse<>();

		Integer rCodigo = 0;
		String rMensaje = "";
		try {
			SimpleJdbcCall jdbcCall = new SimpleJdbcCall(dataSource).withSchemaName(ConstanteUtil.BD_SCHEMA_LGTC)
					.withCatalogName(ConstanteUtil.BD_PCK_LGTC_INVENTARIO).withProcedureName("SP_I_INVENTARIAR_COMPRA");

			MapSqlParameterSource in = new MapSqlParameterSource();
			in.addValue("P_ID_COMPRA", c.getIdCompra(), Types.NUMERIC);
			in.addValue("P_IDT_ESTADO_COMPRA", c.getIdtEstadoCompra(), Types.NUMERIC);
			in.addValue("P_ID_USUARIO_CREA", c.getIdUsuarioCrea(), Types.NUMERIC);
			in.addValue("P_FEC_USUARIO_CREA", DateUtil.slashDDMMYYYY(c.getFecUsuarioCrea()), Types.VARCHAR);
			in.addValue("P_L_DET_INVENTARIO", detalleInventario, Types.VARCHAR);

			log.info("[INVENTARIAR COMPRA][DAO][INPUT PROCEDURE][" + in.toString() + "]");

			Map<String, Object> out = jdbcCall.execute(in);
			log.info("[INVENTARIAR COMPRA][DAO][OUTPUT PROCEDURE][" + out.toString() + "]");

			rCodigo = Integer.parseInt(out.get("R_CODIGO").toString());
			rMensaje = out.get("R_MENSAJE").toString();

			if (rCodigo == ConstanteUtil.R_COD_EXITO) {// CONSULTA CORRECTA
				log.info("[INVENTARIAR COMPRA][DAO][EXITO]");
				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
			} else {
				log.info("[INVENTARIAR COMPRA][DAO][ERROR]");
				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
			}
		} catch (Exception e) {
			log.info("[INVENTARIAR COMPRA][DAO][EXCEPCION][" + e.getMessage() + "]");
			outResponse.setRCodigo(500);
			outResponse.setRMensaje(e.getMessage());
		}
		log.info("[INVENTARIAR COMPRA][DAO][FIN]");
		return outResponse;
	}

	@Override
	public OutResponse<List<InventarioUbicarProductoResponse>> buscarUbicacionProducto(
			InventarioUbicarProductoRequest c) {
		log.info("[BUSCAR UBICACION PRODUCTO][DAO][INICIO]");
		OutResponse<List<InventarioUbicarProductoResponse>> outResponse = new OutResponse<>();

		Integer rCodigo = 0;
		String rMensaje = "";
		try {
			SimpleJdbcCall jdbcCall = new SimpleJdbcCall(dataSource).withSchemaName(ConstanteUtil.BD_SCHEMA_LGTC)
					.withCatalogName(ConstanteUtil.BD_PCK_LGTC_INVENTARIO).withProcedureName("SP_L_UBIC_PRODUCTO")
					.returningResultSet("R_LISTA", new InventarioUbicarProductoResponseMapper());

			MapSqlParameterSource in = new MapSqlParameterSource();
			in.addValue("P_ID_PRODUCTO", c.getIdProducto(), Types.NUMERIC);
			log.info("[BUSCAR UBICACION PRODUCTO][DAO][INPUT PROCEDURE][" + in.toString() + "]");

			Map<String, Object> out = jdbcCall.execute(in);
			log.info("[BUSCAR UBICACION PRODUCTO][DAO][OUTPUT PROCEDURE][" + out.toString() + "]");

			rCodigo = Integer.parseInt(out.get("R_CODIGO").toString());
			rMensaje = out.get("R_MENSAJE").toString();

			if (rCodigo == ConstanteUtil.R_COD_EXITO) {// CONSULTA CORRECTA
				log.info("[BUSCAR UBICACION PRODUCTO][DAO][EXITO]");
				List<InventarioUbicarProductoResponse> lista = (List<InventarioUbicarProductoResponse>) out
						.get("R_LISTA");

				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
				outResponse.setObjeto(lista);
			} else {
				log.info("[BUSCAR UBICACION PRODUCTO][DAO][ERROR]");
				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
			}
		} catch (Exception e) {
			log.info("[BUSCAR UBICACION PRODUCTO][DAO][EXCEPCION][" + e.getMessage() + "]");
			outResponse.setRCodigo(500);
			outResponse.setRMensaje(e.getMessage());
		}
		log.info("[BUSCAR UBICACION PRODUCTO][DAO][FIN]");
		return outResponse;
	}

	@Override
	public OutResponse<InventarioBuscarCompraResponse> buscarCompra(InventarioBuscarCompraRequest c) {
		log.info("[BUSCAR COMPRA][DAO][INICIO]");
		OutResponse<InventarioBuscarCompraResponse> outResponse = new OutResponse<>();

		Integer rCodigo = 0;
		String rMensaje = "";
		try {
			SimpleJdbcCall jdbcCall = new SimpleJdbcCall(dataSource).withSchemaName(ConstanteUtil.BD_SCHEMA_LGTC)
					.withCatalogName(ConstanteUtil.BD_PCK_LGTC_INVENTARIO).withProcedureName("SP_S_BUSCAR_COMPRA")
					.returningResultSet("R_LISTA", new CompraBuscarDetalleListarResponseMapper());

			MapSqlParameterSource in = new MapSqlParameterSource();
			in.addValue("P_ID_COMPRA", c.getIdCompra(), Types.NUMERIC);
			log.info("[BUSCAR COMPRA][DAO][INPUT PROCEDURE][" + in.toString() + "]");

			Map<String, Object> out = jdbcCall.execute(in);
			log.info("[BUSCAR COMPRA][DAO][OUTPUT PROCEDURE][" + out.toString() + "]");

			rCodigo = Integer.parseInt(out.get("R_CODIGO").toString());
			rMensaje = out.get("R_MENSAJE").toString();

			if (rCodigo == ConstanteUtil.R_COD_EXITO) {// CONSULTA CORRECTA
				log.info("[BUSCAR COMPRA][DAO][EXITO]");
				InventarioBuscarCompraResponse res = new InventarioBuscarCompraResponse();
				res.setCodCompra(MapUtil.getString(out.get("R_COD_COMPRA")));
				res.setNomProveedor(MapUtil.getString(out.get("R_NOM_PROVEEDOR")));
				res.setTipDocProveedor(MapUtil.getLong(out.get("R_TIP_DOC_PROVEDOR")));
				res.setNroDocProveedor(MapUtil.getString(out.get("R_NRO_DOC_PROVEEDOR")));
				res.setMontoTotal(MapUtil.getDouble(out.get("R_MONTO_TOTAL")));
				res.setObservacion(MapUtil.getString(out.get("R_OBSERVACION")));

				List<InventarioBuscarCompraDetResponse> resDet = (List<InventarioBuscarCompraDetResponse>) out
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
	public OutResponse<List<InventarioAlmacenListarResponse>> listarAlmacen() {
		log.info("[LISTAR ALMACEN][DAO][INICIO]");
		OutResponse<List<InventarioAlmacenListarResponse>> outResponse = new OutResponse<>();

		Integer rCodigo = 0;
		String rMensaje = "";
		try {
			SimpleJdbcCall jdbcCall = new SimpleJdbcCall(dataSource).withSchemaName(ConstanteUtil.BD_SCHEMA_LGTC)
					.withCatalogName(ConstanteUtil.BD_PCK_LGTC_INVENTARIO).withProcedureName("SP_L_ALMACEN")
					.returningResultSet("R_LISTA", new InventarioAlmacenListarResponseMapper());

			MapSqlParameterSource in = new MapSqlParameterSource();
			log.info("[LISTAR ALMACEN][DAO][INPUT PROCEDURE][" + in.toString() + "]");

			Map<String, Object> out = jdbcCall.execute(in);
			log.info("[LISTAR ALMACEN][DAO][OUTPUT PROCEDURE][" + out.toString() + "]");

			rCodigo = Integer.parseInt(out.get("R_CODIGO").toString());
			rMensaje = out.get("R_MENSAJE").toString();

			if (rCodigo == ConstanteUtil.R_COD_EXITO) {// CONSULTA CORRECTA
				log.info("[LISTAR ALMACEN][DAO][EXITO]");
				List<InventarioAlmacenListarResponse> lista = (List<InventarioAlmacenListarResponse>) out
						.get("R_LISTA");

				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
				outResponse.setObjeto(lista);
			} else {
				log.info("[LISTAR ALMACEN][DAO][ERROR]");
				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
			}
		} catch (Exception e) {
			log.info("[LISTAR ALMACEN][DAO][EXCEPCION][" + e.getMessage() + "]");
			outResponse.setRCodigo(500);
			outResponse.setRMensaje(e.getMessage());
		}
		log.info("[LISTAR ALMACEN][DAO][FIN]");
		return outResponse;
	}

	@Override
	public OutResponse<List<InventarioEstanteListarResponse>> listarEstante(InventarioEstanteListarRequest c) {
		log.info("[LISTAR ESTANTE][DAO][INICIO]");
		OutResponse<List<InventarioEstanteListarResponse>> outResponse = new OutResponse<>();

		Integer rCodigo = 0;
		String rMensaje = "";
		try {
			SimpleJdbcCall jdbcCall = new SimpleJdbcCall(dataSource).withSchemaName(ConstanteUtil.BD_SCHEMA_LGTC)
					.withCatalogName(ConstanteUtil.BD_PCK_LGTC_INVENTARIO).withProcedureName("SP_L_ESTANTE")
					.returningResultSet("R_LISTA", new InventarioEstanteListarResponseMapper());

			MapSqlParameterSource in = new MapSqlParameterSource();
			in.addValue("P_ID_ALMACEN", c.getIdAlmacen(), Types.NUMERIC);
			log.info("[LISTAR ESTANTE][DAO][INPUT PROCEDURE][" + in.toString() + "]");

			Map<String, Object> out = jdbcCall.execute(in);
			log.info("[LISTAR ESTANTE][DAO][OUTPUT PROCEDURE][" + out.toString() + "]");

			rCodigo = Integer.parseInt(out.get("R_CODIGO").toString());
			rMensaje = out.get("R_MENSAJE").toString();

			if (rCodigo == ConstanteUtil.R_COD_EXITO) {// CONSULTA CORRECTA
				log.info("[LISTAR ESTANTE][DAO][EXITO]");
				List<InventarioEstanteListarResponse> lista = (List<InventarioEstanteListarResponse>) out
						.get("R_LISTA");

				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
				outResponse.setObjeto(lista);
			} else {
				log.info("[LISTAR ESTANTE][DAO][ERROR]");
				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
			}
		} catch (Exception e) {
			log.info("[LISTAR ESTANTE][DAO][EXCEPCION][" + e.getMessage() + "]");
			outResponse.setRCodigo(500);
			outResponse.setRMensaje(e.getMessage());
		}
		log.info("[LISTAR ESTANTE][DAO][FIN]");
		return outResponse;
	}

	@Override
	public OutResponse<InventarioBuscarInventCompraResponse> buscarInventarioCompra(
			InventarioBuscarInventCompraRequest c) {
		log.info("[BUSCAR INVENTARIO COMPRA][DAO][INICIO]");
		OutResponse<InventarioBuscarInventCompraResponse> outResponse = new OutResponse<>();

		Integer rCodigo = 0;
		String rMensaje = "";
		try {
			SimpleJdbcCall jdbcCall = new SimpleJdbcCall(dataSource).withSchemaName(ConstanteUtil.BD_SCHEMA_LGTC)
					.withCatalogName(ConstanteUtil.BD_PCK_LGTC_INVENTARIO)
					.withProcedureName("SP_S_BUSCAR_INVENT_COMPRA")
					.returningResultSet("R_LISTA", new InventarioBuscarInventCompraDetResponseMapper());

			MapSqlParameterSource in = new MapSqlParameterSource();
			in.addValue("P_ID_COMPRA", c.getIdCompra(), Types.NUMERIC);
			log.info("[BUSCAR INVENTARIO COMPRA][DAO][INPUT PROCEDURE][" + in.toString() + "]");

			Map<String, Object> out = jdbcCall.execute(in);
			log.info("[BUSCAR INVENTARIO COMPRA][DAO][OUTPUT PROCEDURE][" + out.toString() + "]");

			rCodigo = Integer.parseInt(out.get("R_CODIGO").toString());
			rMensaje = out.get("R_MENSAJE").toString();

			if (rCodigo == ConstanteUtil.R_COD_EXITO) {// CONSULTA CORRECTA
				log.info("[BUSCAR INVENTARIO COMPRA][DAO][EXITO]");
				InventarioBuscarInventCompraResponse res = new InventarioBuscarInventCompraResponse();
				res.setCodCompra(MapUtil.getString(out.get("R_COD_COMPRA")));
				res.setNomProveedor(MapUtil.getString(out.get("R_NOM_PROVEEDOR")));
				res.setTipDocProveedor(MapUtil.getLong(out.get("R_TIP_DOC_PROVEDOR")));
				res.setNroDocProveedor(MapUtil.getString(out.get("R_NRO_DOC_PROVEEDOR")));
				res.setMontoTotal(MapUtil.getDouble(out.get("R_MONTO_TOTAL")));
				res.setObservacion(MapUtil.getString(out.get("R_OBSERVACION")));

				List<InventarioBuscarInventCompraDetResponse> resDet = (List<InventarioBuscarInventCompraDetResponse>) out
						.get("R_LISTA");
				res.setListaDetalleCompra(resDet);

				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
				outResponse.setObjeto(res);
			} else {
				log.info("[BUSCAR INVENTARIO COMPRA][DAO][ERROR]");
				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
			}
		} catch (Exception e) {
			log.info("[BUSCAR INVENTARIO COMPRA][DAO][EXCEPCION][" + e.getMessage() + "]");
			outResponse.setRCodigo(500);
			outResponse.setRMensaje(e.getMessage());
		}
		log.info("[BUSCAR INVENTARIO COMPRA][DAO][FIN]");
		return outResponse;
	}

	@Override
	public OutResponse<List<InventarioCodigoBarraListarResponse>> listaCodigoBarra(
			InventarioCodigoBarraListarRequest c) {
		log.info("[LISTAR CODIGO BARRA][DAO][INICIO]");
		OutResponse<List<InventarioCodigoBarraListarResponse>> outResponse = new OutResponse<>();

		Integer rCodigo = 0;
		String rMensaje = "";
		try {
			SimpleJdbcCall jdbcCall = new SimpleJdbcCall(dataSource).withSchemaName(ConstanteUtil.BD_SCHEMA_LGTC)
					.withCatalogName(ConstanteUtil.BD_PCK_LGTC_INVENTARIO).withProcedureName("SP_L_CODIGO_BARRA")
					.returningResultSet("R_LISTA", new InventarioCodigoBarraListarResponseMapper());

			MapSqlParameterSource in = new MapSqlParameterSource();
			in.addValue("P_ID_DET_COMPRA_ESTANTE", c.getIdDetCompraEstante(), Types.NUMERIC);
			log.info("[LISTAR CODIGO BARRA][DAO][INPUT PROCEDURE][" + in.toString() + "]");

			Map<String, Object> out = jdbcCall.execute(in);
			log.info("[LISTAR CODIGO BARRA][DAO][OUTPUT PROCEDURE][" + out.toString() + "]");

			rCodigo = Integer.parseInt(out.get("R_CODIGO").toString());
			rMensaje = out.get("R_MENSAJE").toString();

			if (rCodigo == ConstanteUtil.R_COD_EXITO) {// CONSULTA CORRECTA
				log.info("[LISTAR CODIGO BARRA][DAO][EXITO]");

				List<InventarioCodigoBarraListarResponse> res = (List<InventarioCodigoBarraListarResponse>) out
						.get("R_LISTA");

				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
				outResponse.setObjeto(res);
			} else {
				log.info("[LISTAR CODIGO BARRA][DAO][ERROR]");
				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
			}
		} catch (Exception e) {
			log.info("[LISTAR CODIGO BARRA][DAO][EXCEPCION][" + e.getMessage() + "]");
			outResponse.setRCodigo(500);
			outResponse.setRMensaje(e.getMessage());
		}
		log.info("[LISTAR CODIGO BARRA][DAO][FIN]");
		return outResponse;
	}

	@Override
	public OutResponse<?> modificarInventarioCompra(InventarioModificarCompraRequest c, String detalleInventario) {
		log.info("[MODIFICAR INVENTARIO COMPRA][DAO][INICIO]");
		OutResponse<?> outResponse = new OutResponse<>();

		Integer rCodigo = 0;
		String rMensaje = "";
		try {
			SimpleJdbcCall jdbcCall = new SimpleJdbcCall(dataSource).withSchemaName(ConstanteUtil.BD_SCHEMA_LGTC)
					.withCatalogName(ConstanteUtil.BD_PCK_LGTC_INVENTARIO).withProcedureName("SP_U_INVENTARIO_COMPRA");

			MapSqlParameterSource in = new MapSqlParameterSource();
			in.addValue("P_ID_USUARIO_MOD", c.getIdUsuarioMod(), Types.NUMERIC);
			in.addValue("P_FEC_USUARIO_MOD", DateUtil.slashDDMMYYYY(c.getFecUsuarioMod()), Types.VARCHAR);
			in.addValue("P_L_DET_INVENTARIO", detalleInventario, Types.VARCHAR);
			log.info("[MODIFICAR INVENTARIO COMPRA][DAO][INPUT PROCEDURE][" + in.toString() + "]");

			Map<String, Object> out = jdbcCall.execute(in);
			log.info("[MODIFICAR INVENTARIO COMPRA][DAO][OUTPUT PROCEDURE][" + out.toString() + "]");

			rCodigo = Integer.parseInt(out.get("R_CODIGO").toString());
			rMensaje = out.get("R_MENSAJE").toString();

			if (rCodigo == ConstanteUtil.R_COD_EXITO) {// CONSULTA CORRECTA
				log.info("[MODIFICAR INVENTARIO COMPRA][DAO][EXITO]");
				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
			} else {
				log.info("[MODIFICAR INVENTARIO COMPRA][DAO][ERROR]");
				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
			}
		} catch (Exception e) {
			log.info("[MODIFICAR INVENTARIO COMPRA][DAO][EXCEPCION][" + e.getMessage() + "]");
			outResponse.setRCodigo(500);
			outResponse.setRMensaje(e.getMessage());
		}
		log.info("[MODIFICAR INVENTARIO COMPRA][DAO][FIN]");
		return outResponse;
	}

	@Override
	public OutResponse<List<InventarioListarResponse>> listarInventario(InventarioListarRequest c) {
		log.info("[LISTAR INVENTARIO][DAO][INICIO]");
		OutResponse<List<InventarioListarResponse>> outResponse = new OutResponse<>();

		Integer rCodigo = 0;
		String rMensaje = "";
		try {
			SimpleJdbcCall jdbcCall = new SimpleJdbcCall(dataSource).withSchemaName(ConstanteUtil.BD_SCHEMA_LGTC)
					.withCatalogName(ConstanteUtil.BD_PCK_LGTC_INVENTARIO).withProcedureName("SP_L_INVENTARIO")
					.returningResultSet("R_LISTA", new InventarioListarResponseMapper());

			MapSqlParameterSource in = new MapSqlParameterSource();
			in.addValue("P_FEC_INICIO", DateUtil.slashDDMMYYYY(c.getFecInicio()), Types.VARCHAR);
			in.addValue("P_FEC_FIN", DateUtil.slashDDMMYYYY(c.getFecFin()), Types.VARCHAR);
			in.addValue("P_NOMBRE", c.getNombre(), Types.VARCHAR);
			in.addValue("P_ACTIVO", c.getActivo(), Types.NUMERIC);
			log.info("[LISTAR INVENTARIO][DAO][INPUT PROCEDURE][" + in.toString() + "]");

			Map<String, Object> out = jdbcCall.execute(in);
			log.info("[LISTAR INVENTARIO][DAO][OUTPUT PROCEDURE][" + out.toString() + "]");

			rCodigo = Integer.parseInt(out.get("R_CODIGO").toString());
			rMensaje = out.get("R_MENSAJE").toString();

			if (rCodigo == 0) {// CONSULTA CORRECTA
				log.info("[LISTAR INVENTARIO][DAO][EXITO]");
				List<InventarioListarResponse> lista = (List<InventarioListarResponse>) out.get("R_LISTA");

				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
				outResponse.setObjeto(lista);
			} else {
				log.info("[LISTAR INVENTARIO][DAO][ERROR]");
				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
			}
		} catch (Exception e) {
			log.info("[LISTAR INVENTARIO][DAO][EXCEPCION][" + e.getMessage() + "]");
			outResponse.setRCodigo(500);
			outResponse.setRMensaje(e.getMessage());
			outResponse.setObjeto(null);
		}
		log.info("[LISTAR INVENTARIO][DAO][FIN]");
		return outResponse;
	}

	@Override
	public OutResponse<List<InventarioBuscarResponse>> buscarIventXNombre(InventarioBuscarXNombreRequest c) {
		log.info("[BUSCAR INVENTARIO X NOMBRE][DAO][INICIO]");
		OutResponse<List<InventarioBuscarResponse>> outResponse = new OutResponse<>();

		Integer rCodigo = 0;
		String rMensaje = "";
		try {
			SimpleJdbcCall jdbcCall = new SimpleJdbcCall(dataSource).withSchemaName(ConstanteUtil.BD_SCHEMA_LGTC)
					.withCatalogName(ConstanteUtil.BD_PCK_LGTC_INVENTARIO)
					.withProcedureName("SP_S_BUSCAR_INVENT_X_NOMBRE")
					.returningResultSet("R_LISTA", new InventarioBuscarResponseMapper());

			MapSqlParameterSource in = new MapSqlParameterSource();
			in.addValue("P_NOMBRE", c.getNombre(), Types.VARCHAR);
			log.info("[BUSCAR INVENTARIO X NOMBRE][DAO][INPUT PROCEDURE][" + in.toString() + "]");

			Map<String, Object> out = jdbcCall.execute(in);
			log.info("[BUSCAR INVENTARIO X NOMBRE][DAO][OUTPUT PROCEDURE][" + out.toString() + "]");

			rCodigo = Integer.parseInt(out.get("R_CODIGO").toString());
			rMensaje = out.get("R_MENSAJE").toString();

			if (rCodigo == ConstanteUtil.R_COD_EXITO) {// CONSULTA CORRECTA
				log.info("[BUSCAR INVENTARIO X NOMBRE][DAO][EXITO]");
				List<InventarioBuscarResponse> lista = (List<InventarioBuscarResponse>) out.get("R_LISTA");

				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
				outResponse.setObjeto(lista);
			} else {
				log.info("[BUSCAR INVENTARIO X NOMBRE][DAO][ERROR]");
				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
			}
		} catch (Exception e) {
			log.info("[BUSCAR INVENTARIO X NOMBRE][DAO][EXCEPCION][" + e.getMessage() + "]");
			outResponse.setRCodigo(500);
			outResponse.setRMensaje(e.getMessage());
		}
		log.info("[BUSCAR INVENTARIO X NOMBRE][DAO][FIN]");
		return outResponse;
	}

	@Override
	public OutResponse<InventarioBuscarResponse> buscarIventXCodigo(InventarioBuscarXCodigoRequest c) {
		log.info("[BUSCAR INVENTARIO X CODIGO][DAO][INICIO]");
		OutResponse<InventarioBuscarResponse> outResponse = new OutResponse<>();

		Integer rCodigo = 0;
		String rMensaje = "";
		try {
			SimpleJdbcCall jdbcCall = new SimpleJdbcCall(dataSource).withSchemaName(ConstanteUtil.BD_SCHEMA_LGTC)
					.withCatalogName(ConstanteUtil.BD_PCK_LGTC_INVENTARIO)
					.withProcedureName("SP_S_BUSCAR_INVENT_X_CODIGO");

			MapSqlParameterSource in = new MapSqlParameterSource();
			in.addValue("P_CODIGO_BARRA", c.getCodigoBarra(), Types.VARCHAR);
			log.info("[BUSCAR INVENTARIO X CODIGO][DAO][INPUT PROCEDURE][" + in.toString() + "]");

			Map<String, Object> out = jdbcCall.execute(in);
			log.info("[BUSCAR INVENTARIO X CODIGO][DAO][OUTPUT PROCEDURE][" + out.toString() + "]");

			rCodigo = Integer.parseInt(out.get("R_CODIGO").toString());
			rMensaje = out.get("R_MENSAJE").toString();

			if (rCodigo == ConstanteUtil.R_COD_EXITO) {// CONSULTA CORRECTA
				log.info("[BUSCAR INVENTARIO X CODIGO][DAO][EXITO]");
				InventarioBuscarResponse p = new InventarioBuscarResponse();
				p.setId(MapUtil.getLong(out.get("ID")));
				p.setIdtUnidadMedida(MapUtil.getInt(out.get("IDT_UNIDAD_MEDIDA")));
				p.setNomUnidadMedida(MapUtil.getString(out.get("NOM_UNIDAD_MEDIDA")));
				p.setCodUnidadMedida(MapUtil.getString(out.get("COD_UNIDAD_MEDIDA")));
				p.setCodProducto(MapUtil.getString(out.get("COD_PRODUCTO")));
				p.setNombre(MapUtil.getString(out.get("NOMBRE")));
				p.setCantidad(MapUtil.getDouble(out.get("CANTIDAD")));
				p.setPrecio(MapUtil.getDouble(out.get("PRECIO")));

				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
				outResponse.setObjeto(p);
			} else {
				log.info("[BUSCAR INVENTARIO X CODIGO][DAO][ERROR]");
				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
			}
		} catch (Exception e) {
			log.info("[BUSCAR INVENTARIO X CODIGO][DAO][EXCEPCION][" + e.getMessage() + "]");
			outResponse.setRCodigo(500);
			outResponse.setRMensaje(e.getMessage());
		}
		log.info("[BUSCAR INVENTARIO X CODIGO][DAO][FIN]");
		return outResponse;
	}

}
