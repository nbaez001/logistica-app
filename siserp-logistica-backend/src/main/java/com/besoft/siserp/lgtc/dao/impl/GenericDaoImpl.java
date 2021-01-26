package com.besoft.siserp.lgtc.dao.impl;

import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.simple.SimpleJdbcCall;
import org.springframework.stereotype.Repository;

import com.besoft.siserp.lgtc.dao.GenericDao;
import com.besoft.siserp.lgtc.dto.OutResponse;
import com.besoft.siserp.lgtc.dto.request.BuscarMaestraRequest;
import com.besoft.siserp.lgtc.dto.request.MaestraRequest;
import com.besoft.siserp.lgtc.dto.response.MaestraResponse;
import com.besoft.siserp.lgtc.dto.response.mapper.MaestraResponseMapper;
import com.besoft.siserp.lgtc.util.ConstanteUtil;
import com.besoft.siserp.lgtc.util.DateUtil;

@Repository
public class GenericDaoImpl implements GenericDao {

	Logger log = LoggerFactory.getLogger(GenericDaoImpl.class);
	
	@Autowired
	DataSource dataSource;

	@Override
	public OutResponse<List<MaestraResponse>> listarMaestra(BuscarMaestraRequest b) {
		log.info("[LISTAR PRODUCTO][DAO][INICIO]");
		OutResponse<List<MaestraResponse>> outResponse = new OutResponse<>();

		List<MaestraResponse> lista = new ArrayList<>();
		Integer rCodigo = 0;
		String rMensaje = "";
		try {
			SimpleJdbcCall jdbcCall = new SimpleJdbcCall(dataSource).withSchemaName(ConstanteUtil.BD_SCHEMA_LGTC)
					.withCatalogName(ConstanteUtil.BD_PCK_LGTC_ADMINISTRACION).withProcedureName("SP_L_MAESTRA")
					.returningResultSet("R_LISTA", new MaestraResponseMapper());

			MapSqlParameterSource in = new MapSqlParameterSource();
			in.addValue("D_FEC_INICIO", DateUtil.formatDDMMYYYY(b.getFecInicio()), Types.VARCHAR);
			in.addValue("D_FEC_FIN", DateUtil.formatDDMMYYYY(b.getFecFin()), Types.VARCHAR);
			in.addValue("N_ID_MAESTRA", b.getIdMaestra(), Types.NUMERIC);
			in.addValue("N_ID_TABLA", b.getIdTabla(), Types.NUMERIC);
			log.info("[LISTAR PRODUCTO][DAO][INPUT PROCEDURE][" + in.toString() + "]");

			Map<String, Object> out = jdbcCall.execute(in);
			log.info("[LISTAR PRODUCTO][DAO][OUTPUT PROCEDURE][" + out.toString() + "]");

			rCodigo = Integer.parseInt(out.get("R_CODIGO").toString());
			rMensaje = out.get("R_MENSAJE").toString();

			if (rCodigo == ConstanteUtil.R_COD_EXITO) {// CONSULTA CORRECTA
				log.info("[LISTAR PRODUCTO][DAO][EXITO]");
				lista = (List<MaestraResponse>) out.get("R_LISTA");
			} else {
				log.info("[LISTAR PRODUCTO][DAO][ERROR]");
				lista = null;
			}
			outResponse.setRCodigo(rCodigo);
			outResponse.setRMensaje(rMensaje);
			outResponse.setObjeto(lista);
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
	public OutResponse registrarMaestra(MaestraRequest m) {
		log.info("[LISTAR PRODUCTO][DAO][INICIO]");
		OutResponse outResponse = new OutResponse();

		Integer rCodigo = 0;
		String rMensaje = "";

		Long id = 0L;
		try {
			SimpleJdbcCall jdbcCall = new SimpleJdbcCall(dataSource).withSchemaName(ConstanteUtil.BD_SCHEMA_LGTC)
					.withCatalogName(ConstanteUtil.BD_PCK_LGTC_ADMINISTRACION).withProcedureName("SP_I_MAESTRA");

			MapSqlParameterSource in = new MapSqlParameterSource();
			in.addValue("N_ID_MAESTRA", m.getIdMaestra(), Types.NUMERIC);
			in.addValue("N_ID_TABLA", m.getIdTabla(), Types.NUMERIC);
			in.addValue("N_ID_ITEM", m.getIdItem(), Types.NUMERIC);
			in.addValue("N_ORDEN", m.getOrden(), Types.NUMERIC);
			in.addValue("V_CODIGO", m.getCodigo(), Types.VARCHAR);
			in.addValue("V_NOMBRE", m.getNombre(), Types.VARCHAR);
			in.addValue("V_VALOR", m.getValor(), Types.VARCHAR);
			in.addValue("V_DESCRIPCION", m.getDescripcion(), Types.VARCHAR);
			in.addValue("N_FLAG_ACTIVO", m.getFlagActivo(), Types.NUMERIC);
			in.addValue("N_ID_USUARIO_CREA", m.getIdUsuarioCrea(), Types.NUMERIC);
			in.addValue("D_FEC_USUARIO_CREA", DateUtil.formatDDMMYYYY(m.getFecUsuarioCrea()), Types.VARCHAR);
			log.info("[LISTAR PRODUCTO][DAO][INPUT PROCEDURE][" + in.toString() + "]");

			Map<String, Object> out = jdbcCall.execute(in);
			log.info("[LISTAR PRODUCTO][DAO][OUTPUT PROCEDURE][" + out.toString() + "]");

			rCodigo = Integer.parseInt(out.get("R_CODIGO").toString());
			rMensaje = out.get("R_MENSAJE").toString();

			if (rCodigo == ConstanteUtil.R_COD_EXITO) {// CONSULTA CORRECTA
				log.info("[LISTAR PRODUCTO][DAO][EXITO]");
				id = Long.parseLong(out.get("R_ID").toString());

				m.setId(id);
			} else {
				log.info("[LISTAR PRODUCTO][DAO][ERROR]");
				m = null;
			}
			outResponse.setRCodigo(rCodigo);
			outResponse.setRMensaje(rMensaje);
			outResponse.setObjeto(m);
		} catch (Exception e) {
			log.info("[LISTAR PRODUCTO][DAO][EXCEPCION][" + e.getMessage() + "]");
			outResponse.setRCodigo(500);
			outResponse.setRMensaje("ERROR INTERNO DE SERVIDOR");
			outResponse.setObjeto(null);
		}
		log.info("[LISTAR PRODUCTO][DAO][FIN]");
		return outResponse;
	}

	@Override
	public OutResponse actualizarMaestra(MaestraRequest m) {
		log.info("[LISTAR PRODUCTO][DAO][INICIO]");
		OutResponse outResponse = new OutResponse();

		Integer rCodigo = 0;
		String rMensaje = "";
		try {
			SimpleJdbcCall jdbcCall = new SimpleJdbcCall(dataSource).withSchemaName(ConstanteUtil.BD_SCHEMA_LGTC)
					.withCatalogName(ConstanteUtil.BD_PCK_LGTC_ADMINISTRACION).withProcedureName("SP_U_MAESTRA");

			MapSqlParameterSource in = new MapSqlParameterSource();
			in.addValue("N_ID", m.getId(), Types.NUMERIC); // estoy inicializando los in de ariba
			in.addValue("N_ID_MAESTRA", m.getIdMaestra(), Types.NUMERIC);
			in.addValue("N_ID_TABLA", m.getIdTabla(), Types.NUMERIC);
			in.addValue("N_ID_ITEM", m.getIdItem(), Types.NUMERIC);
			in.addValue("N_ORDEN", m.getOrden(), Types.NUMERIC);
			in.addValue("V_CODIGO", m.getCodigo(), Types.VARCHAR);
			in.addValue("V_NOMBRE", m.getNombre(), Types.VARCHAR);
			in.addValue("V_VALOR", m.getValor(), Types.VARCHAR);
			in.addValue("V_DESCRIPCION", m.getDescripcion(), Types.VARCHAR);
			in.addValue("N_FLAG_ACTIVO", m.getFlagActivo(), Types.NUMERIC);
			in.addValue("N_ID_USUARIO_MOD", m.getIdUsuarioMod(), Types.NUMERIC);
			in.addValue("D_FEC_USUARIO_MOD", DateUtil.formatDDMMYYYY(m.getFecUsuarioMod()), Types.VARCHAR);
			log.info("[LISTAR PRODUCTO][DAO][INPUT PROCEDURE][" + in.toString() + "]");

			Map<String, Object> out = jdbcCall.execute(in);
			log.info("[LISTAR PRODUCTO][DAO][OUTPUT PROCEDURE][" + out.toString() + "]");

			rCodigo = Integer.parseInt(out.get("R_CODIGO").toString());
			rMensaje = out.get("R_MENSAJE").toString();

			if (rCodigo == ConstanteUtil.R_COD_EXITO) {// CONSULTA CORRECTA
				log.info("[LISTAR PRODUCTO][DAO][EXITO]");

			} else {
				log.info("[LISTAR PRODUCTO][DAO][ERROR]");
				m = null;
			}
			outResponse.setRCodigo(rCodigo);
			outResponse.setRMensaje(rMensaje);
			outResponse.setObjeto(m);
		} catch (Exception e) {
			log.info("[LISTAR PRODUCTO][DAO][EXCEPCION][" + e.getMessage() + "]");
			outResponse.setRCodigo(500);
			outResponse.setRMensaje("ERROR INTERNO DE SERVIDOR");
			outResponse.setObjeto(null);
		}
		log.info("[LISTAR PRODUCTO][DAO][FIN]");
		return outResponse;
	}

	@Override
	public OutResponse eliminarMaestra(MaestraRequest m) {
		log.info("[LISTAR PRODUCTO][DAO][INICIO]");
		OutResponse outResponse = new OutResponse();

		Integer rCodigo = 0;
		String rMensaje = "";
		try {
			SimpleJdbcCall jdbcCall = new SimpleJdbcCall(dataSource).withSchemaName(ConstanteUtil.BD_SCHEMA_LGTC)
					.withCatalogName(ConstanteUtil.BD_PCK_LGTC_ADMINISTRACION).withProcedureName("SP_D_MAESTRA");

			MapSqlParameterSource in = new MapSqlParameterSource();
			in.addValue("N_ID", m.getId());
			log.info("[LISTAR PRODUCTO][DAO][INPUT PROCEDURE][" + in.toString() + "]");

			Map<String, Object> out = jdbcCall.execute(in);
			log.info("[LISTAR PRODUCTO][DAO][OUTPUT PROCEDURE][" + out.toString() + "]");

			rCodigo = Integer.parseInt(out.get("R_CODIGO").toString());
			rMensaje = out.get("R_MENSAJE").toString();

			if (rCodigo == ConstanteUtil.R_COD_EXITO) {// CONSULTA CORRECTA
				log.info("[LISTAR PRODUCTO][DAO][EXITO]");

			} else {
				log.info("[LISTAR PRODUCTO][DAO][ERROR]");
				m = null;
			}
			outResponse.setRCodigo(rCodigo);
			outResponse.setRMensaje(rMensaje);
			outResponse.setObjeto(m);
		} catch (Exception e) {
			log.info("[LISTAR PRODUCTO][DAO][EXCEPCION][" + e.getMessage() + "]");
			outResponse.setRCodigo(500);
			outResponse.setRMensaje("ERROR INTERNO DE SERVIDOR");
			outResponse.setObjeto(null);
		}
		log.info("[LISTAR PRODUCTO][DAO][FIN]");
		return outResponse;
	}

}
