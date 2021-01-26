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

import com.besoft.siserp.lgtc.dao.ProductoDao;
import com.besoft.siserp.lgtc.dto.OutResponse;
import com.besoft.siserp.lgtc.dto.request.ProductoBuscarRequest;
import com.besoft.siserp.lgtc.dto.request.ProductoCargarExcelRequest;
import com.besoft.siserp.lgtc.dto.request.ProductoEliminarRequest;
import com.besoft.siserp.lgtc.dto.request.ProductoListarRequest;
import com.besoft.siserp.lgtc.dto.request.ProductoModificarRequest;
import com.besoft.siserp.lgtc.dto.request.ProductoRegistrarRequest;
import com.besoft.siserp.lgtc.dto.response.ProductoCargarExcelResponse;
import com.besoft.siserp.lgtc.dto.response.ProductoListarResponse;
import com.besoft.siserp.lgtc.dto.response.ProductoModificarResponse;
import com.besoft.siserp.lgtc.dto.response.ProductoRegistrarResponse;
import com.besoft.siserp.lgtc.dto.response.mapper.ProductoListarResponseMapper;
import com.besoft.siserp.lgtc.util.ConstanteUtil;
import com.besoft.siserp.lgtc.util.DateUtil;
import com.besoft.siserp.lgtc.util.MapUtil;

@Repository
public class ProductoDaoImpl implements ProductoDao {

	Logger log = LoggerFactory.getLogger(ProductoDaoImpl.class);

	@Autowired
	DataSource dataSource;

	@Override
	public OutResponse<List<ProductoListarResponse>> listarProducto(ProductoListarRequest req) {
		log.info("[LISTAR PRODUCTO][DAO][INICIO]");
		OutResponse<List<ProductoListarResponse>> outResponse = new OutResponse<>();

		Integer rCodigo = 0;
		String rMensaje = "";
		try {
			SimpleJdbcCall jdbcCall = new SimpleJdbcCall(dataSource).withSchemaName(ConstanteUtil.BD_SCHEMA_LGTC)
					.withCatalogName(ConstanteUtil.BD_PCK_LGTC_PRODUCTO).withProcedureName("SP_L_PRODUCTO")
					.returningResultSet("R_LISTA", new ProductoListarResponseMapper());

			MapSqlParameterSource in = new MapSqlParameterSource();
			in.addValue("P_FEC_INICIO", DateUtil.slashDDMMYYYY(req.getFecInicio()), Types.VARCHAR);
			in.addValue("P_FEC_FIN", DateUtil.slashDDMMYYYY(req.getFecFin()), Types.VARCHAR);
			in.addValue("P_NOMBRE", req.getNombre(), Types.VARCHAR);
			in.addValue("P_ACTIVO", req.getActivo(), Types.NUMERIC);
			log.info("[LISTAR PRODUCTO][DAO][INPUT PROCEDURE][" + in.toString() + "]");

			Map<String, Object> out = jdbcCall.execute(in);
			log.info("[LISTAR PRODUCTO][DAO][OUTPUT PROCEDURE][" + out.toString() + "]");

			rCodigo = Integer.parseInt(out.get("R_CODIGO").toString());
			rMensaje = out.get("R_MENSAJE").toString();

			if (rCodigo == 0) {// CONSULTA CORRECTA
				log.info("[LISTAR PRODUCTO][DAO][EXITO]");
				List<ProductoListarResponse> lista = (List<ProductoListarResponse>) out.get("R_LISTA");

				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
				outResponse.setObjeto(lista);
			} else {
				log.info("[LISTAR PRODUCTO][DAO][ERROR]");
				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
			}
		} catch (Exception e) {
			log.info("[LISTAR PRODUCTO][DAO][EXCEPCION][" + e.getMessage() + "]");
			outResponse.setRCodigo(500);
			outResponse.setRMensaje(e.getMessage());
			outResponse.setObjeto(null);
		}
		log.info("[LISTAR PRODUCTO][DAO][FIN]");
		return outResponse;
	}

	@Override
	public OutResponse<ProductoRegistrarResponse> registrarProducto(ProductoRegistrarRequest p) {
		log.info("[REGISTRAR PRODUCTO][DAO][INICIO]");
		OutResponse<ProductoRegistrarResponse> outResponse = new OutResponse<>();

		Integer rCodigo = 0;
		String rMensaje = "";
		try {
			SimpleJdbcCall jdbcCall = new SimpleJdbcCall(dataSource).withSchemaName(ConstanteUtil.BD_SCHEMA_LGTC)
					.withCatalogName(ConstanteUtil.BD_PCK_LGTC_PRODUCTO).withProcedureName("SP_I_PRODUCTO");

			MapSqlParameterSource in = new MapSqlParameterSource();
			in.addValue("P_ID_MARCA", p.getIdMarca(), Types.NUMERIC);
			in.addValue("P_NOM_MARCA", p.getNomMarca(), Types.VARCHAR);
			in.addValue("P_IDT_TIPO", p.getIdtTipo(), Types.NUMERIC);
			in.addValue("P_IDT_UNIDAD_MEDIDA", p.getIdtUnidadMedida(), Types.NUMERIC);
			in.addValue("P_CODIGO", p.getCodigo(), Types.VARCHAR);
			in.addValue("P_NOMBRE", p.getNombre(), Types.VARCHAR);
			in.addValue("P_DESCRIPCION", p.getDescripcion(), Types.VARCHAR);
			in.addValue("P_FLAG_ACTIVO", p.getFlagActivo(), Types.NUMERIC);
			in.addValue("P_ID_USUARIO_CREA", p.getIdUsuarioCrea(), Types.NUMERIC);
			in.addValue("P_FEC_USUARIO_CREA", DateUtil.formatDDMMYYYY(p.getFecUsuarioCrea()), Types.VARCHAR);
			log.info("[REGISTRAR PRODUCTO][DAO][INPUT PROCEDURE][" + in.toString() + "]");

			Map<String, Object> out = jdbcCall.execute(in);
			log.info("[REGISTRAR PRODUCTO][DAO][OUTPUT PROCEDURE][" + out.toString() + "]");

			rCodigo = Integer.parseInt(out.get("R_CODIGO").toString());
			rMensaje = out.get("R_MENSAJE").toString();

			if (rCodigo == 0) {// CONSULTA CORRECTA
				log.info("[REGISTRAR PRODUCTO][DAO][EXITO]");
				ProductoRegistrarResponse res = new ProductoRegistrarResponse();
				res.setId(MapUtil.getLong(out.get("R_ID")));
				res.setIdMarca(MapUtil.getLong(out.get("N_ID_MARCA")));

				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
				outResponse.setObjeto(res);
			} else {
				log.info("[REGISTRAR PRODUCTO][DAO][ERROR]");
				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
			}
		} catch (Exception e) {
			log.info("[REGISTRAR PRODUCTO][DAO][EXCEPCION][" + e.getMessage() + "]");
			outResponse.setRCodigo(500);
			outResponse.setRMensaje(e.getMessage());
		}
		log.info("[REGISTRAR PRODUCTO][DAO][FIN]");
		return outResponse;
	}

	@Override
	public OutResponse<ProductoModificarResponse> actualizarProducto(ProductoModificarRequest p) {
		log.info("[MODIFICAR PRODUCTO][DAO][INICIO]");
		OutResponse<ProductoModificarResponse> outResponse = new OutResponse<>();

		Integer rCodigo = 0;
		String rMensaje = "";
		try {
			SimpleJdbcCall jdbcCall = new SimpleJdbcCall(dataSource).withSchemaName(ConstanteUtil.BD_SCHEMA_LGTC)
					.withCatalogName(ConstanteUtil.BD_PCK_LGTC_PRODUCTO).withProcedureName("SP_U_PRODUCTO");

			MapSqlParameterSource in = new MapSqlParameterSource();
			in.addValue("P_ID", p.getId());
			in.addValue("P_ID_MARCA", p.getIdMarca(), Types.NUMERIC);
			in.addValue("P_NOM_MARCA", p.getNomMarca(), Types.VARCHAR);
			in.addValue("P_IDT_TIPO", p.getIdtTipo(), Types.NUMERIC);
			in.addValue("P_IDT_UNIDAD_MEDIDA", p.getIdtUnidadMedida(), Types.NUMERIC);
			in.addValue("P_CODIGO", p.getCodigo(), Types.VARCHAR);
			in.addValue("P_NOMBRE", p.getNombre(), Types.VARCHAR);
			in.addValue("P_DESCRIPCION", p.getDescripcion(), Types.VARCHAR);
			in.addValue("P_FLAG_ACTIVO", p.getFlagActivo(), Types.NUMERIC);
			in.addValue("P_ID_USUARIO_MOD", p.getIdUsuarioMod(), Types.NUMERIC);
			in.addValue("P_FEC_USUARIO_MOD", DateUtil.formatDDMMYYYY(p.getFecUsuarioMod()), Types.VARCHAR);
			log.info("[MODIFICAR PRODUCTO][DAO][INPUT PROCEDURE][" + in.toString() + "]");

			Map<String, Object> out = jdbcCall.execute(in);
			log.info("[MODIFICAR PRODUCTO][DAO][OUTPUT PROCEDURE][" + out.toString() + "]");

			rCodigo = Integer.parseInt(out.get("R_CODIGO").toString());
			rMensaje = out.get("R_MENSAJE").toString();

			if (rCodigo == 0) {// CONSULTA CORRECTA
				log.info("[MODIFICAR PRODUCTO][DAO][EXITO]");
				ProductoModificarResponse res = new ProductoModificarResponse();
				res.setIdMarca(MapUtil.getLong(out.get("P_ID_MARCA")));

				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
				outResponse.setObjeto(res);
			} else {
				log.info("[MODIFICAR PRODUCTO][DAO][ERROR]");
				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
			}
		} catch (Exception e) {
			log.info("[MODIFICAR PRODUCTO][DAO][EXCEPCION][" + e.getMessage() + "]");
			outResponse.setRCodigo(500);
			outResponse.setRMensaje("ERROR INTERNO DE SERVIDOR");
		}
		log.info("[MODIFICAR PRODUCTO][DAO][FIN]");
		return outResponse;
	}

	@Override
	public OutResponse<?> eliminarProducto(ProductoEliminarRequest p) {
		log.info("[ELIMINAR PRODUCTO][DAO][INICIO]");
		OutResponse<?> outResponse = new OutResponse<>();

		Integer rCodigo = 0;
		String rMensaje = "";
		try {
			SimpleJdbcCall jdbcCall = new SimpleJdbcCall(dataSource).withSchemaName(ConstanteUtil.BD_SCHEMA_LGTC)
					.withCatalogName(ConstanteUtil.BD_PCK_LGTC_PRODUCTO).withProcedureName("SP_D_PRODUCTO");

			MapSqlParameterSource in = new MapSqlParameterSource();
			in.addValue("P_ID", p.getId());
			log.info("[ELIMINAR PRODUCTO][DAO][INPUT PROCEDURE][" + in.toString() + "]");

			Map<String, Object> out = jdbcCall.execute(in);
			log.info("[ELIMINAR PRODUCTO][DAO][OUTPUT PROCEDURE][" + out.toString() + "]");

			rCodigo = Integer.parseInt(out.get("R_CODIGO").toString());
			rMensaje = out.get("R_MENSAJE").toString();

			if (rCodigo == 0) {
				log.info("[ELIMINAR PRODUCTO][DAO][EXITO]");
				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
			} else {
				log.info("[ELIMINAR PRODUCTO][DAO][ERROR]");
				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
			}
		} catch (Exception e) {
			log.info("[ELIMINAR PRODUCTO][DAO][EXCEPCION][" + e.getMessage() + "]");
			outResponse.setRCodigo(500);
			outResponse.setRMensaje(e.getMessage());
		}
		log.info("[ELIMINAR PRODUCTO][DAO][FIN]");
		return outResponse;
	}

	@Override
	public OutResponse<List<ProductoListarResponse>> buscarProducto(ProductoBuscarRequest req) {
		log.info("[BUSCAR PRODUCTO][DAO][INICIO]");
		OutResponse<List<ProductoListarResponse>> outResponse = new OutResponse<>();

		Integer rCodigo = 0;
		String rMensaje = "";
		try {
			SimpleJdbcCall jdbcCall = new SimpleJdbcCall(dataSource).withSchemaName(ConstanteUtil.BD_SCHEMA_LGTC)
					.withCatalogName(ConstanteUtil.BD_PCK_LGTC_PRODUCTO).withProcedureName("SP_BUSCAR_PRODUCTO")
					.returningResultSet("R_LISTA", new ProductoListarResponseMapper());

			MapSqlParameterSource in = new MapSqlParameterSource();
			in.addValue("I_CODIGO", req.getCodigo(), Types.VARCHAR);
			in.addValue("I_NOMBRE", req.getNombre(), Types.VARCHAR);
			log.info("[BUSCAR PRODUCTO][DAO][INPUT PROCEDURE][" + in.toString() + "]");

			Map<String, Object> out = jdbcCall.execute(in);
			log.info("[BUSCAR PRODUCTO][DAO][OUTPUT PROCEDURE][" + out.toString() + "]");

			rCodigo = Integer.parseInt(out.get("R_CODIGO").toString());
			rMensaje = out.get("R_MENSAJE").toString();

			if (rCodigo == 0) {// CONSULTA CORRECTA
				log.info("[BUSCAR PRODUCTO][DAO][EXITO]");
				List<ProductoListarResponse> lista = (List<ProductoListarResponse>) out.get("R_LISTA");

				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
				outResponse.setObjeto(lista);
			} else {
				log.info("[BUSCAR PRODUCTO][DAO][ERROR]");
				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
			}
		} catch (Exception e) {
			log.info("[BUSCAR PRODUCTO][DAO][EXCEPCION][" + e.getMessage() + "]");
			outResponse.setRCodigo(500);
			outResponse.setRMensaje(e.getMessage());
		}
		log.info("[BUSCAR PRODUCTO][DAO][FIN]");
		return outResponse;
	}

	@Override
	public OutResponse<ProductoCargarExcelResponse> cargarProductoDesdeExcel(ProductoCargarExcelRequest req,
			String listaProducto) {
		log.info("[CARGAR PRODUCTO DESDE EXCEL][DAO][INICIO]");
		OutResponse<ProductoCargarExcelResponse> outResponse = new OutResponse<>();

		Integer rCodigo = 0;
		String rMensaje = "";
		try {
			SimpleJdbcCall jdbcCall = new SimpleJdbcCall(dataSource).withSchemaName(ConstanteUtil.BD_SCHEMA_LGTC)
					.withCatalogName(ConstanteUtil.BD_PCK_LGTC_PRODUCTO)
					.withProcedureName("SP_I_CARGA_MASIVA_PRODUCTO");

			MapSqlParameterSource in = new MapSqlParameterSource();
			in.addValue("P_IDT_TIPO", req.getIdtTipo(), Types.NUMERIC);
			in.addValue("P_ID_ESTANTE", req.getIdEstante(), Types.NUMERIC);
			in.addValue("P_ID_USUARIO_CREA", req.getIdUsuarioCrea(), Types.NUMERIC);
			in.addValue("P_FEC_USUARIO_CREA", DateUtil.formatDDMMYYYY(req.getFecUsuarioCrea()), Types.VARCHAR);
			in.addValue("P_L_LISTA_PRODUCTO", listaProducto, Types.VARCHAR);
			log.info("[CARGAR PRODUCTO DESDE EXCEL][DAO][INPUT PROCEDURE][" + in.toString() + "]");

			Map<String, Object> out = jdbcCall.execute(in);
			log.info("[CARGAR PRODUCTO DESDE EXCEL][DAO][OUTPUT PROCEDURE][" + out.toString() + "]");

			rCodigo = Integer.parseInt(out.get("R_CODIGO").toString());
			rMensaje = out.get("R_MENSAJE").toString();

			if (rCodigo == 0) {// CONSULTA CORRECTA
				log.info("[CARGAR PRODUCTO DESDE EXCEL][DAO][EXITO]");
				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
			} else {
				log.info("[CARGAR PRODUCTO DESDE EXCEL][DAO][ERROR]");
				ProductoCargarExcelResponse res = new ProductoCargarExcelResponse();
				res.setPosicion(MapUtil.getInt(out.get("R_POSICION")));
				
				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
				outResponse.setObjeto(res);
			}
		} catch (Exception e) {
			log.info("[CARGAR PRODUCTO DESDE EXCEL][DAO][EXCEPCION][" + e.getMessage() + "]");
			outResponse.setRCodigo(500);
			outResponse.setRMensaje(e.getMessage());
		}
		log.info("[CARGAR PRODUCTO DESDE EXCEL][DAO][FIN]");
		return outResponse;
	}

}