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

import com.besoft.siserp.lgtc.dao.AlmacenDao;
import com.besoft.siserp.lgtc.dto.OutResponse;
import com.besoft.siserp.lgtc.dto.request.AlmacenEliminarRequest;
import com.besoft.siserp.lgtc.dto.request.AlmacenEstanteEliminarRequest;
import com.besoft.siserp.lgtc.dto.request.AlmacenEstanteListarRequest;
import com.besoft.siserp.lgtc.dto.request.AlmacenEstanteModificarRequest;
import com.besoft.siserp.lgtc.dto.request.AlmacenEstanteRegistrarRequest;
import com.besoft.siserp.lgtc.dto.request.AlmacenListarRequest;
import com.besoft.siserp.lgtc.dto.request.AlmacenModificarRequest;
import com.besoft.siserp.lgtc.dto.request.AlmacenRegistrarRequest;
import com.besoft.siserp.lgtc.dto.response.AlmacenEstanteListarResponse;
import com.besoft.siserp.lgtc.dto.response.AlmacenEstanteRegistrarResponse;
import com.besoft.siserp.lgtc.dto.response.AlmacenListarResponse;
import com.besoft.siserp.lgtc.dto.response.AlmacenRegistrarResponse;
import com.besoft.siserp.lgtc.dto.response.mapper.AlmacenEstanteListarResponseMapper;
import com.besoft.siserp.lgtc.dto.response.mapper.AlmacenListarResponseMapper;
import com.besoft.siserp.lgtc.util.ConstanteUtil;
import com.besoft.siserp.lgtc.util.DateUtil;
import com.besoft.siserp.lgtc.util.MapUtil;

@Repository
public class AlmacenDaoImpl implements AlmacenDao {

	Logger log = LoggerFactory.getLogger(AlmacenDaoImpl.class);

	@Autowired
	DataSource dataSource;

	@Override
	public OutResponse<AlmacenRegistrarResponse> registrarAlmacen(AlmacenRegistrarRequest c) {
		log.info("[REGISTRAR ALMACEN][DAO][INICIO]");
		OutResponse<AlmacenRegistrarResponse> outResponse = new OutResponse<>();

		Integer rCodigo = 0;
		String rMensaje = "";
		try {
			SimpleJdbcCall jdbcCall = new SimpleJdbcCall(dataSource).withSchemaName(ConstanteUtil.BD_SCHEMA_LGTC)
					.withCatalogName(ConstanteUtil.BD_PCK_LGTC_ALMACEN).withProcedureName("SP_I_ALMACEN");

			MapSqlParameterSource in = new MapSqlParameterSource();
			in.addValue("P_NOMBRE", c.getNombre(), Types.VARCHAR);
			in.addValue("P_DESCRIPCION", c.getDescripcion(), Types.VARCHAR);
			in.addValue("P_FECHA", DateUtil.slashDDMMYYYY(c.getFecha()), Types.VARCHAR);
			in.addValue("P_FLAG_ACTIVO", c.getFlagActivo(), Types.NUMERIC);
			in.addValue("P_ID_USUARIO_CREA", c.getIdUsuarioCrea(), Types.NUMERIC);
			in.addValue("P_FEC_USUARIO_CREA", DateUtil.slashDDMMYYYY(c.getFecUsuarioCrea()), Types.VARCHAR);
			log.info("[REGISTRAR ALMACEN][DAO][INPUT PROCEDURE][" + in.toString() + "]");

			Map<String, Object> out = jdbcCall.execute(in);
			log.info("[REGISTRAR ALMACEN][DAO][OUTPUT PROCEDURE][" + out.toString() + "]");

			rCodigo = Integer.parseInt(out.get("R_CODIGO").toString());
			rMensaje = out.get("R_MENSAJE").toString();

			if (rCodigo == 0) {// CONSULTA CORRECTA
				log.info("[REGISTRAR ALMACEN][DAO][EXITO]");
				AlmacenRegistrarResponse res = new AlmacenRegistrarResponse();
				res.setId(MapUtil.getLong(out.get("R_ID")));
				res.setCodAlmacen(MapUtil.getString(out.get("R_COD_ALMACEN")));

				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
				outResponse.setObjeto(res);
			} else {
				log.info("[REGISTRAR ALMACEN][DAO][ERROR]");
				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
			}
		} catch (Exception e) {
			log.info("[REGISTRAR ALMACEN][DAO][EXCEPCION][" + e.getMessage() + "]");
			outResponse.setRCodigo(500);
			outResponse.setRMensaje(e.getMessage());
			outResponse.setObjeto(null);
		}
		log.info("[REGISTRAR ALMACEN][DAO][FIN]");
		return outResponse;
	}

	@Override
	public OutResponse<?> modificarAlmacen(AlmacenModificarRequest c) {
		log.info("[MODIFICAR ALMACEN][DAO][INICIO]");
		OutResponse<?> outResponse = new OutResponse<>();

		Integer rCodigo = 0;
		String rMensaje = "";
		try {
			SimpleJdbcCall jdbcCall = new SimpleJdbcCall(dataSource).withSchemaName(ConstanteUtil.BD_SCHEMA_LGTC)
					.withCatalogName(ConstanteUtil.BD_PCK_LGTC_ALMACEN).withProcedureName("SP_U_ALMACEN");

			MapSqlParameterSource in = new MapSqlParameterSource();
			in.addValue("P_ID", c.getId(), Types.NUMERIC);
			in.addValue("P_NOMBRE", c.getNombre(), Types.VARCHAR);
			in.addValue("P_DESCRIPCION", c.getDescripcion(), Types.VARCHAR);
			in.addValue("P_FECHA", DateUtil.slashDDMMYYYY(c.getFecha()), Types.VARCHAR);
			in.addValue("P_FLAG_ACTIVO", c.getFlagActivo(), Types.NUMERIC);
			in.addValue("P_ID_USUARIO_MOD", c.getIdUsuarioMod(), Types.NUMERIC);
			in.addValue("P_FEC_USUARIO_MOD", DateUtil.slashDDMMYYYY(c.getFecUsuarioMod()), Types.VARCHAR);
			log.info("[MODIFICAR ALMACEN][DAO][INPUT PROCEDURE][" + in.toString() + "]");

			Map<String, Object> out = jdbcCall.execute(in);
			log.info("[MODIFICAR ALMACEN][DAO][OUTPUT PROCEDURE][" + out.toString() + "]");

			rCodigo = Integer.parseInt(out.get("R_CODIGO").toString());
			rMensaje = out.get("R_MENSAJE").toString();

			if (rCodigo == 0) {// CONSULTA CORRECTA
				log.info("[MODIFICAR ALMACEN][DAO][EXITO]");

				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
			} else {
				log.info("[MODIFICAR ALMACEN][DAO][ERROR]");
				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
			}
		} catch (Exception e) {
			log.info("[MODIFICAR ALMACEN][DAO][EXCEPCION][" + e.getMessage() + "]");
			outResponse.setRCodigo(500);
			outResponse.setRMensaje(e.getMessage());
			outResponse.setObjeto(null);
		}
		log.info("[MODIFICAR ALMACEN][DAO][FIN]");
		return outResponse;
	}

	@Override
	public OutResponse<List<AlmacenListarResponse>> listarAlmacen(AlmacenListarRequest r) {
		log.info("[LISTAR ALMACEN][DAO][INICIO]");
		OutResponse<List<AlmacenListarResponse>> outResponse = new OutResponse<>();

		Integer rCodigo = 0;
		String rMensaje = "";
		try {
			SimpleJdbcCall jdbcCall = new SimpleJdbcCall(dataSource).withSchemaName(ConstanteUtil.BD_SCHEMA_LGTC)
					.withCatalogName(ConstanteUtil.BD_PCK_LGTC_ALMACEN).withProcedureName("SP_L_ALMACEN")
					.returningResultSet("R_LISTA", new AlmacenListarResponseMapper());

			MapSqlParameterSource in = new MapSqlParameterSource();
			in.addValue("P_FEC_INICIO", DateUtil.slashDDMMYYYY(r.getFecInicio()), Types.VARCHAR);
			in.addValue("P_FEC_FIN", DateUtil.slashDDMMYYYY(r.getFecFin()), Types.VARCHAR);
			in.addValue("P_NOMBRE", r.getNombre(), Types.VARCHAR);
			in.addValue("P_FLAG_ACTIVO", r.getFlagActivo(), Types.NUMERIC);
			log.info("[LISTAR ALMACEN][DAO][INPUT PROCEDURE][" + in.toString() + "]");

			Map<String, Object> out = jdbcCall.execute(in);
			log.info("[LISTAR ALMACEN][DAO][OUTPUT PROCEDURE][" + out.toString() + "]");

			rCodigo = Integer.parseInt(out.get("R_CODIGO").toString());
			rMensaje = out.get("R_MENSAJE").toString();

			if (rCodigo == 0) {// CONSULTA CORRECTA
				log.info("[LISTAR ALMACEN][DAO][EXITO]");
				List<AlmacenListarResponse> res = (List<AlmacenListarResponse>) out.get("R_LISTA");
				outResponse.setObjeto(res);

				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
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
	public OutResponse<?> eliminarAlmacen(AlmacenEliminarRequest r) {
		log.info("[ELIMINAR ALMACEN][DAO][INICIO]");
		OutResponse<?> outResponse = new OutResponse<>();

		Integer rCodigo = 0;
		String rMensaje = "";
		try {
			SimpleJdbcCall jdbcCall = new SimpleJdbcCall(dataSource).withSchemaName(ConstanteUtil.BD_SCHEMA_LGTC)
					.withCatalogName(ConstanteUtil.BD_PCK_LGTC_ALMACEN).withProcedureName("SP_D_ALMACEN");

			MapSqlParameterSource in = new MapSqlParameterSource();
			in.addValue("P_ID", r.getId(), Types.NUMERIC);
			log.info("[ELIMINAR ALMACEN][DAO][INPUT PROCEDURE][" + in.toString() + "]");

			Map<String, Object> out = jdbcCall.execute(in);
			log.info("[ELIMINAR ALMACEN][DAO][OUTPUT PROCEDURE][" + out.toString() + "]");

			rCodigo = Integer.parseInt(out.get("R_CODIGO").toString());
			rMensaje = out.get("R_MENSAJE").toString();

			if (rCodigo == 0) {// CONSULTA CORRECTA
				log.info("[ELIMINAR ALMACEN][DAO][EXITO]");

				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
			} else {
				log.info("[ELIMINAR ALMACEN][DAO][ERROR]");
				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
			}
		} catch (Exception e) {
			log.info("[ELIMINAR ALMACEN][DAO][EXCEPCION][" + e.getMessage() + "]");
			outResponse.setRCodigo(500);
			outResponse.setRMensaje(e.getMessage());
		}
		log.info("[ELIMINAR ALMACEN][DAO][FIN]");
		return outResponse;
	}

	@Override
	public OutResponse<AlmacenEstanteRegistrarResponse> registrarEstante(AlmacenEstanteRegistrarRequest c) {
		log.info("[REGISTRAR ESTANTE][DAO][INICIO]");
		OutResponse<AlmacenEstanteRegistrarResponse> outResponse = new OutResponse<>();

		Integer rCodigo = 0;
		String rMensaje = "";
		try {
			SimpleJdbcCall jdbcCall = new SimpleJdbcCall(dataSource).withSchemaName(ConstanteUtil.BD_SCHEMA_LGTC)
					.withCatalogName(ConstanteUtil.BD_PCK_LGTC_ALMACEN).withProcedureName("SP_I_ESTANTE");

			MapSqlParameterSource in = new MapSqlParameterSource();
			in.addValue("P_ID_ALMACEN", c.getIdAlmacen(), Types.NUMERIC);
			in.addValue("P_NOMBRE", c.getNombre(), Types.VARCHAR);
			in.addValue("P_FECHA", DateUtil.slashDDMMYYYY(c.getFecha()), Types.VARCHAR);
			in.addValue("P_FLAG_ACTIVO", c.getFlagActivo(), Types.NUMERIC);
			in.addValue("P_ID_USUARIO_CREA", c.getIdUsuarioCrea(), Types.NUMERIC);
			in.addValue("P_FEC_USUARIO_CREA", DateUtil.slashDDMMYYYY(c.getFecUsuarioCrea()), Types.VARCHAR);
			log.info("[REGISTRAR ESTANTE][DAO][INPUT PROCEDURE][" + in.toString() + "]");

			Map<String, Object> out = jdbcCall.execute(in);
			log.info("[REGISTRAR ESTANTE][DAO][OUTPUT PROCEDURE][" + out.toString() + "]");

			rCodigo = Integer.parseInt(out.get("R_CODIGO").toString());
			rMensaje = out.get("R_MENSAJE").toString();

			if (rCodigo == 0) {// CONSULTA CORRECTA
				log.info("[REGISTRAR ESTANTE][DAO][EXITO]");
				AlmacenEstanteRegistrarResponse res = new AlmacenEstanteRegistrarResponse();
				res.setId(MapUtil.getLong(out.get("R_ID")));
				res.setCodEstante(MapUtil.getString(out.get("R_COD_ESTANTE")));

				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
				outResponse.setObjeto(res);
			} else {
				log.info("[REGISTRAR ESTANTE][DAO][ERROR]");
				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
			}
		} catch (Exception e) {
			log.info("[REGISTRAR ESTANTE][DAO][EXCEPCION][" + e.getMessage() + "]");
			outResponse.setRCodigo(500);
			outResponse.setRMensaje(e.getMessage());
			outResponse.setObjeto(null);
		}
		log.info("[REGISTRAR ESTANTE][DAO][FIN]");
		return outResponse;
	}

	@Override
	public OutResponse<?> modificarEstante(AlmacenEstanteModificarRequest c) {
		log.info("[MODIFICAR ESTANTE][DAO][INICIO]");
		OutResponse<?> outResponse = new OutResponse<>();

		Integer rCodigo = 0;
		String rMensaje = "";
		try {
			SimpleJdbcCall jdbcCall = new SimpleJdbcCall(dataSource).withSchemaName(ConstanteUtil.BD_SCHEMA_LGTC)
					.withCatalogName(ConstanteUtil.BD_PCK_LGTC_ALMACEN).withProcedureName("SP_U_ESTANTE");

			MapSqlParameterSource in = new MapSqlParameterSource();
			in.addValue("P_ID", c.getId(), Types.NUMERIC);
			in.addValue("P_NOMBRE", c.getNombre(), Types.VARCHAR);
			in.addValue("P_FECHA", DateUtil.slashDDMMYYYY(c.getFecha()), Types.VARCHAR);
			in.addValue("P_FLAG_ACTIVO", c.getFlagActivo(), Types.NUMERIC);
			in.addValue("P_ID_USUARIO_MOD", c.getIdUsuarioMod(), Types.NUMERIC);
			in.addValue("P_FEC_USUARIO_MOD", DateUtil.slashDDMMYYYY(c.getFecUsuarioMod()), Types.VARCHAR);
			log.info("[MODIFICAR ESTANTE][DAO][INPUT PROCEDURE][" + in.toString() + "]");

			Map<String, Object> out = jdbcCall.execute(in);
			log.info("[MODIFICAR ESTANTE][DAO][OUTPUT PROCEDURE][" + out.toString() + "]");

			rCodigo = Integer.parseInt(out.get("R_CODIGO").toString());
			rMensaje = out.get("R_MENSAJE").toString();

			if (rCodigo == 0) {// CONSULTA CORRECTA
				log.info("[MODIFICAR ESTANTE][DAO][EXITO]");

				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
			} else {
				log.info("[MODIFICAR ESTANTE][DAO][ERROR]");
				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
			}
		} catch (Exception e) {
			log.info("[MODIFICAR ESTANTE][DAO][EXCEPCION][" + e.getMessage() + "]");
			outResponse.setRCodigo(500);
			outResponse.setRMensaje(e.getMessage());
			outResponse.setObjeto(null);
		}
		log.info("[MODIFICAR ESTANTE][DAO][FIN]");
		return outResponse;
	}

	@Override
	public OutResponse<List<AlmacenEstanteListarResponse>> listarEstante(AlmacenEstanteListarRequest r) {
		log.info("[LISTAR ESTANTE][DAO][INICIO]");
		OutResponse<List<AlmacenEstanteListarResponse>> outResponse = new OutResponse<>();

		Integer rCodigo = 0;
		String rMensaje = "";
		try {
			SimpleJdbcCall jdbcCall = new SimpleJdbcCall(dataSource).withSchemaName(ConstanteUtil.BD_SCHEMA_LGTC)
					.withCatalogName(ConstanteUtil.BD_PCK_LGTC_ALMACEN).withProcedureName("SP_L_ESTANTE")
					.returningResultSet("R_LISTA", new AlmacenEstanteListarResponseMapper());

			MapSqlParameterSource in = new MapSqlParameterSource();
			in.addValue("P_ID_ALMACEN", r.getIdAlmacen(), Types.NUMERIC);
			in.addValue("P_FEC_INICIO", DateUtil.slashDDMMYYYY(r.getFecInicio()), Types.VARCHAR);
			in.addValue("P_FEC_FIN", DateUtil.slashDDMMYYYY(r.getFecFin()), Types.VARCHAR);
			in.addValue("P_NOMBRE", r.getNombre(), Types.VARCHAR);
			in.addValue("P_FLAG_ACTIVO", r.getFlagActivo(), Types.NUMERIC);
			log.info("[LISTAR ESTANTE][DAO][INPUT PROCEDURE][" + in.toString() + "]");

			Map<String, Object> out = jdbcCall.execute(in);
			log.info("[LISTAR ESTANTE][DAO][OUTPUT PROCEDURE][" + out.toString() + "]");

			rCodigo = Integer.parseInt(out.get("R_CODIGO").toString());
			rMensaje = out.get("R_MENSAJE").toString();

			if (rCodigo == 0) {// CONSULTA CORRECTA
				log.info("[LISTAR ESTANTE][DAO][EXITO]");
				List<AlmacenEstanteListarResponse> res = (List<AlmacenEstanteListarResponse>) out.get("R_LISTA");
				outResponse.setObjeto(res);

				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
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
	public OutResponse<?> eliminarEstante(AlmacenEstanteEliminarRequest r) {
		log.info("[ELIMINAR ESTANTE][DAO][INICIO]");
		OutResponse<?> outResponse = new OutResponse<>();

		Integer rCodigo = 0;
		String rMensaje = "";
		try {
			SimpleJdbcCall jdbcCall = new SimpleJdbcCall(dataSource).withSchemaName(ConstanteUtil.BD_SCHEMA_LGTC)
					.withCatalogName(ConstanteUtil.BD_PCK_LGTC_ALMACEN).withProcedureName("SP_D_ESTANTE");

			MapSqlParameterSource in = new MapSqlParameterSource();
			in.addValue("P_ID", r.getId(), Types.NUMERIC);
			log.info("[ELIMINAR ESTANTE][DAO][INPUT PROCEDURE][" + in.toString() + "]");

			Map<String, Object> out = jdbcCall.execute(in);
			log.info("[ELIMINAR ESTANTE][DAO][OUTPUT PROCEDURE][" + out.toString() + "]");

			rCodigo = Integer.parseInt(out.get("R_CODIGO").toString());
			rMensaje = out.get("R_MENSAJE").toString();

			if (rCodigo == 0) {// CONSULTA CORRECTA
				log.info("[ELIMINAR ESTANTE][DAO][EXITO]");

				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
			} else {
				log.info("[ELIMINAR ESTANTE][DAO][ERROR]");
				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
			}
		} catch (Exception e) {
			log.info("[ELIMINAR ESTANTE][DAO][EXCEPCION][" + e.getMessage() + "]");
			outResponse.setRCodigo(500);
			outResponse.setRMensaje(e.getMessage());
		}
		log.info("[ELIMINAR ESTANTE][DAO][FIN]");
		return outResponse;
	}
}
