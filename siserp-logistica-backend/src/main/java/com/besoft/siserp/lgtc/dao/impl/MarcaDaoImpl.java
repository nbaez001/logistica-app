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

import com.besoft.siserp.lgtc.dao.MarcaDao;
import com.besoft.siserp.lgtc.dto.OutResponse;
import com.besoft.siserp.lgtc.dto.request.MarcaEliminarRequest;
import com.besoft.siserp.lgtc.dto.request.MarcaListarRequest;
import com.besoft.siserp.lgtc.dto.request.MarcaModificarRequest;
import com.besoft.siserp.lgtc.dto.request.MarcaRegistrarRequest;
import com.besoft.siserp.lgtc.dto.response.MarcaListarResponse;
import com.besoft.siserp.lgtc.dto.response.MarcaRegistrarResponse;
import com.besoft.siserp.lgtc.dto.response.mapper.MarcaListarResponseMapper;
import com.besoft.siserp.lgtc.util.ConstanteUtil;
import com.besoft.siserp.lgtc.util.DateUtil;
import com.besoft.siserp.lgtc.util.MapUtil;

@Repository
public class MarcaDaoImpl implements MarcaDao {

	Logger log = LoggerFactory.getLogger(MarcaDaoImpl.class);

	@Autowired
	DataSource dataSource;

	@Override
	public OutResponse<MarcaRegistrarResponse> registrarMarca(MarcaRegistrarRequest c) {
		log.info("[REGISTRAR MARCA][DAO][INICIO]");
		OutResponse<MarcaRegistrarResponse> outResponse = new OutResponse<>();

		Integer rCodigo = 0;
		String rMensaje = "";
		try {
			SimpleJdbcCall jdbcCall = new SimpleJdbcCall(dataSource).withSchemaName(ConstanteUtil.BD_SCHEMA_LGTC)
					.withCatalogName(ConstanteUtil.BD_PCK_LGTC_MARCA).withProcedureName("SP_I_MARCA");

			MapSqlParameterSource in = new MapSqlParameterSource();
			in.addValue("P_NOMBRE", c.getNombre(), Types.VARCHAR);
			in.addValue("P_CODIGO", c.getCodigo(), Types.VARCHAR);
			in.addValue("P_FLG_ACTIVO", c.getFlgActivo(), Types.NUMERIC);
			in.addValue("P_ID_USUARIO_CREA", c.getIdUsuarioCrea(), Types.NUMERIC);
			in.addValue("P_FEC_USUARIO_CREA", DateUtil.slashDDMMYYYY(c.getFecUsuarioCrea()), Types.VARCHAR);
			log.info("[REGISTRAR MARCA][DAO][INPUT PROCEDURE][" + in.toString() + "]");

			Map<String, Object> out = jdbcCall.execute(in);
			log.info("[REGISTRAR MARCA][DAO][OUTPUT PROCEDURE][" + out.toString() + "]");

			rCodigo = Integer.parseInt(out.get("R_CODIGO").toString());
			rMensaje = out.get("R_MENSAJE").toString();

			if (rCodigo == 0) {// CONSULTA CORRECTA
				log.info("[REGISTRAR MARCA][DAO][EXITO]");
				MarcaRegistrarResponse res = new MarcaRegistrarResponse();
				res.setId(MapUtil.getLong(out.get("R_ID")));

				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
				outResponse.setObjeto(res);
			} else {
				log.info("[REGISTRAR MARCA][DAO][ERROR]");
				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
			}
		} catch (Exception e) {
			log.info("[REGISTRAR MARCA][DAO][EXCEPCION][" + e.getMessage() + "]");
			outResponse.setRCodigo(500);
			outResponse.setRMensaje(e.getMessage());
			outResponse.setObjeto(null);
		}
		log.info("[REGISTRAR MARCA][DAO][FIN]");
		return outResponse;
	}

	@Override
	public OutResponse<?> modificarMarca(MarcaModificarRequest c) {
		log.info("[MODIFICAR MARCA][DAO][INICIO]");
		OutResponse<?> outResponse = new OutResponse<>();

		Integer rCodigo = 0;
		String rMensaje = "";
		try {
			SimpleJdbcCall jdbcCall = new SimpleJdbcCall(dataSource).withSchemaName(ConstanteUtil.BD_SCHEMA_LGTC)
					.withCatalogName(ConstanteUtil.BD_PCK_LGTC_MARCA).withProcedureName("SP_U_MARCA");

			MapSqlParameterSource in = new MapSqlParameterSource();
			in.addValue("P_ID", c.getId(), Types.NUMERIC);
			in.addValue("P_NOMBRE", c.getNombre(), Types.VARCHAR);
			in.addValue("P_CODIGO", c.getCodigo(), Types.VARCHAR);
			in.addValue("P_FLG_ACTIVO", c.getFlgActivo(), Types.NUMERIC);
			in.addValue("P_ID_USUARIO_MOD", c.getIdUsuarioMod(), Types.NUMERIC);
			in.addValue("P_FEC_USUARIO_MOD", DateUtil.slashDDMMYYYY(c.getFecUsuarioMod()), Types.VARCHAR);
			log.info("[MODIFICAR MARCA][DAO][INPUT PROCEDURE][" + in.toString() + "]");

			Map<String, Object> out = jdbcCall.execute(in);
			log.info("[MODIFICAR MARCA][DAO][OUTPUT PROCEDURE][" + out.toString() + "]");

			rCodigo = Integer.parseInt(out.get("R_CODIGO").toString());
			rMensaje = out.get("R_MENSAJE").toString();

			if (rCodigo == 0) {// CONSULTA CORRECTA
				log.info("[MODIFICAR MARCA][DAO][EXITO]");

				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
			} else {
				log.info("[MODIFICAR MARCA][DAO][ERROR]");
				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
			}
		} catch (Exception e) {
			log.info("[MODIFICAR MARCA][DAO][EXCEPCION][" + e.getMessage() + "]");
			outResponse.setRCodigo(500);
			outResponse.setRMensaje(e.getMessage());
			outResponse.setObjeto(null);
		}
		log.info("[MODIFICAR MARCA][DAO][FIN]");
		return outResponse;
	}

	@Override
	public OutResponse<List<MarcaListarResponse>> listarMarca(MarcaListarRequest r) {
		log.info("[LISTAR MARCA][DAO][INICIO]");
		OutResponse<List<MarcaListarResponse>> outResponse = new OutResponse<>();

		Integer rCodigo = 0;
		String rMensaje = "";
		try {
			SimpleJdbcCall jdbcCall = new SimpleJdbcCall(dataSource).withSchemaName(ConstanteUtil.BD_SCHEMA_LGTC)
					.withCatalogName(ConstanteUtil.BD_PCK_LGTC_MARCA).withProcedureName("SP_L_MARCA")
					.returningResultSet("R_LISTA", new MarcaListarResponseMapper());

			MapSqlParameterSource in = new MapSqlParameterSource();
			in.addValue("P_FEC_INICIO",  DateUtil.slashDDMMYYYY(r.getFecInicio()) , Types.VARCHAR);
			in.addValue("P_FEC_FIN", DateUtil.slashDDMMYYYY(r.getFecFin()), Types.VARCHAR);
			in.addValue("P_NOMBRE", r.getNombre(), Types.VARCHAR);
			in.addValue("P_ACTIVO", r.getActivo(), Types.NUMERIC);
			log.info("[LISTAR MARCA][DAO][INPUT PROCEDURE][" + in.toString() + "]");

			Map<String, Object> out = jdbcCall.execute(in);
			log.info("[LISTAR MARCA][DAO][OUTPUT PROCEDURE][" + out.toString() + "]");

			rCodigo = Integer.parseInt(out.get("R_CODIGO").toString());
			rMensaje = out.get("R_MENSAJE").toString();

			if (rCodigo == 0) {// CONSULTA CORRECTA
				log.info("[LISTAR MARCA][DAO][EXITO]");
				List<MarcaListarResponse> res = (List<MarcaListarResponse>) out.get("R_LISTA");
				outResponse.setObjeto(res);

				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
			} else {
				log.info("[LISTAR MARCA][DAO][ERROR]");
				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
			}
		} catch (Exception e) {
			log.info("[LISTAR MARCA][DAO][EXCEPCION][" + e.getMessage() + "]");
			outResponse.setRCodigo(500);
			outResponse.setRMensaje(e.getMessage());
		}
		log.info("[LISTAR MARCA][DAO][FIN]");
		return outResponse;
	}

	@Override
	public OutResponse<?> eliminarMarca(MarcaEliminarRequest r) {
		log.info("[ELIMINAR MARCA][DAO][INICIO]");
		OutResponse<?> outResponse = new OutResponse<>();

		Integer rCodigo = 0;
		String rMensaje = "";
		try {
			SimpleJdbcCall jdbcCall = new SimpleJdbcCall(dataSource).withSchemaName(ConstanteUtil.BD_SCHEMA_LGTC)
					.withCatalogName(ConstanteUtil.BD_PCK_LGTC_MARCA).withProcedureName("SP_D_MARCA");

			MapSqlParameterSource in = new MapSqlParameterSource();
			in.addValue("P_ID", r.getId(), Types.NUMERIC);
			log.info("[ELIMINAR MARCA][DAO][INPUT PROCEDURE][" + in.toString() + "]");

			Map<String, Object> out = jdbcCall.execute(in);
			log.info("[ELIMINAR MARCA][DAO][OUTPUT PROCEDURE][" + out.toString() + "]");

			rCodigo = Integer.parseInt(out.get("R_CODIGO").toString());
			rMensaje = out.get("R_MENSAJE").toString();

			if (rCodigo == 0) {// CONSULTA CORRECTA
				log.info("[ELIMINAR MARCA][DAO][EXITO]");
				
				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
			} else {
				log.info("[ELIMINAR MARCA][DAO][ERROR]");
				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
			}
		} catch (Exception e) {
			log.info("[ELIMINAR MARCA][DAO][EXCEPCION][" + e.getMessage() + "]");
			outResponse.setRCodigo(500);
			outResponse.setRMensaje(e.getMessage());
		}
		log.info("[ELIMINAR MARCA][DAO][FIN]");
		return outResponse;
	}

}
