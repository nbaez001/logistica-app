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

import com.besoft.siserp.lgtc.dao.ProveedorDao;
import com.besoft.siserp.lgtc.dto.OutResponse;
import com.besoft.siserp.lgtc.dto.request.ProveedorEliminarRequest;
import com.besoft.siserp.lgtc.dto.request.ProveedorJuridRepLegalBuscarRequest;
import com.besoft.siserp.lgtc.dto.request.ProveedorJuridRepLegalEliminarRequest;
import com.besoft.siserp.lgtc.dto.request.ProveedorJuridRepLegalListarRequest;
import com.besoft.siserp.lgtc.dto.request.ProveedorJuridRepLegalModificarRequest;
import com.besoft.siserp.lgtc.dto.request.ProveedorJuridRepLegalRegistrarRequest;
import com.besoft.siserp.lgtc.dto.request.ProveedorJuridicoModificarRequest;
import com.besoft.siserp.lgtc.dto.request.ProveedorJuridicoRegistrarRequest;
import com.besoft.siserp.lgtc.dto.request.ProveedorListarRequest;
import com.besoft.siserp.lgtc.dto.request.ProveedorNaturalModificarRequest;
import com.besoft.siserp.lgtc.dto.request.ProveedorNaturalRegistrarRequest;
import com.besoft.siserp.lgtc.dto.response.ProveedorJuridRepLegalBuscarResponse;
import com.besoft.siserp.lgtc.dto.response.ProveedorJuridRepLegalListarResponse;
import com.besoft.siserp.lgtc.dto.response.ProveedorJuridRepLegalRegistrarResponse;
import com.besoft.siserp.lgtc.dto.response.ProveedorJuridicoRegistrarResponse;
import com.besoft.siserp.lgtc.dto.response.ProveedorListarResponse;
import com.besoft.siserp.lgtc.dto.response.ProveedorNaturalRegistrarResponse;
import com.besoft.siserp.lgtc.dto.response.mapper.ProveedorListarResponseMapper;
import com.besoft.siserp.lgtc.dto.response.mapper.RepresentanteLegalResponseMapper;
import com.besoft.siserp.lgtc.util.ConstanteUtil;
import com.besoft.siserp.lgtc.util.DateUtil;
import com.besoft.siserp.lgtc.util.MapUtil;

@Repository
public class ProveedorDaoImpl implements ProveedorDao {

	Logger log = LoggerFactory.getLogger(ProveedorDaoImpl.class);

	@Autowired
	DataSource dataSource;

	@Override
	public OutResponse<List<ProveedorListarResponse>> listarProveedor(ProveedorListarRequest req) {
		log.info("[LISTAR PROVEEDOR][DAO][INICIO]");
		OutResponse<List<ProveedorListarResponse>> outResponse = new OutResponse<>();

		Integer rCodigo = 0;
		String rMensaje = "";
		try {
			SimpleJdbcCall jdbcCall = new SimpleJdbcCall(dataSource).withSchemaName(ConstanteUtil.BD_SCHEMA_LGTC)
					.withCatalogName(ConstanteUtil.BD_PCK_LGTC_PROVEEDOR).withProcedureName("SP_L_PROVEEDOR")
					.returningResultSet("R_LISTA", new ProveedorListarResponseMapper());

			MapSqlParameterSource in = new MapSqlParameterSource();
			in.addValue("P_IDT_TIPO_PROVEEDOR", req.getIdtTipoProveedor(), Types.NUMERIC);
			in.addValue("P_FEC_INICIO", DateUtil.slashDDMMYYYY(req.getFecInicio()), Types.VARCHAR);
			in.addValue("P_FEC_FIN", DateUtil.slashDDMMYYYY(req.getFecFin()), Types.VARCHAR);
			in.addValue("P_RAZON_SOCIAL", req.getRazonSocial(), Types.VARCHAR);
			in.addValue("P_ACTIVO", req.getActivo(), Types.NUMERIC);
			log.info("[LISTAR PROVEEDOR][DAO][INPUT PROCEDURE][" + in.toString() + "]");

			Map<String, Object> out = jdbcCall.execute(in);
			log.info("[LISTAR PROVEEDOR][DAO][OUTPUT PROCEDURE][" + out.toString() + "]");

			rCodigo = Integer.parseInt(out.get("R_CODIGO").toString());
			rMensaje = out.get("R_MENSAJE").toString();

			if (rCodigo == ConstanteUtil.R_COD_EXITO) {
				log.info("[LISTAR PROVEEDOR][DAO][EXITO]");
				List<ProveedorListarResponse> lista = (List<ProveedorListarResponse>) out.get("R_LISTA");

				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
				outResponse.setObjeto(lista);
			} else {
				log.info("[LISTAR PROVEEDOR][DAO][ERROR]");
				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
			}
		} catch (Exception e) {
			log.info("[LISTAR PROVEEDOR][DAO][EXCEPCION][" + e.getMessage() + "]");
			outResponse.setRCodigo(500);
			outResponse.setRMensaje(e.getMessage());
		}
		log.info("[LISTAR PROVEEDOR][DAO][FIN]");
		return outResponse;
	}

	@Override
	public OutResponse<ProveedorNaturalRegistrarResponse> registrarProveedor(ProveedorNaturalRegistrarRequest p) {
		log.info("[REGISTRAR PROVEEDOR NATURAL][DAO][INICIO]");
		OutResponse<ProveedorNaturalRegistrarResponse> outResponse = new OutResponse<>();

		Integer rCodigo = 0;
		String rMensaje = "";
		try {
			SimpleJdbcCall jdbcCall = new SimpleJdbcCall(dataSource).withSchemaName(ConstanteUtil.BD_SCHEMA_LGTC)
					.withCatalogName(ConstanteUtil.BD_PCK_LGTC_PROVEEDOR).withProcedureName("SP_I_PROVEEDOR_NATURAL");

			MapSqlParameterSource in = new MapSqlParameterSource();
			in.addValue("P_IDT_TIPO_PROVEEDOR", p.getIdtTipoProveedor(), Types.NUMERIC);
			in.addValue("P_CODIGO", p.getCodigo(), Types.VARCHAR);
			in.addValue("P_OBSERVACION", p.getObservacion(), Types.VARCHAR);
			in.addValue("P_ID_USUARIO_CREA", p.getIdUsuarioCrea(), Types.NUMERIC);
			in.addValue("P_FLAG_ACTIVO", p.getFlagActivo(), Types.NUMERIC);
			in.addValue("P_FEC_USUARIO_CREA", DateUtil.formatDDMMYYYY(p.getFecUsuarioCrea()), Types.VARCHAR);
			in.addValue("P_COD_UBIGEO", p.getCodUbigeo(), Types.VARCHAR);
			in.addValue("P_IDT_GENERO", p.getIdtGenero(), Types.NUMERIC);
			in.addValue("P_IDT_ESTADO_CIVIL", p.getIdtEstadoCivil(), Types.NUMERIC);
			in.addValue("P_IDT_TIPO_DOCUMENTO", p.getIdtTipoDocumento(), Types.NUMERIC);
			in.addValue("P_NRO_DOCUMENTO", p.getNroDocumento(), Types.VARCHAR);
			in.addValue("P_NOMBRE", p.getNombre(), Types.VARCHAR);
			in.addValue("P_APELLIDO_PAT", p.getApellidoPat(), Types.VARCHAR);
			in.addValue("P_APELLIDO_MAT", p.getApellidoMat(), Types.VARCHAR);
			in.addValue("P_TELEFONO", p.getTelefono(), Types.VARCHAR);
			in.addValue("P_DIRECCION", p.getDireccion(), Types.VARCHAR);
			in.addValue("P_EMAIL", p.getEmail(), Types.VARCHAR);
			in.addValue("P_FEC_NACIMIENTO", DateUtil.formatDDMMYYYY(p.getFecNacimiento()), Types.VARCHAR);
			log.info("[REGISTRAR PROVEEDOR NATURAL][DAO][INPUT PROCEDURE][" + in.toString() + "]");

			Map<String, Object> out = jdbcCall.execute(in);
			log.info("[REGISTRAR PROVEEDOR NATURAL][DAO][OUTPUT PROCEDURE][" + out.toString() + "]");

			rCodigo = Integer.parseInt(out.get("R_CODIGO").toString());
			rMensaje = out.get("R_MENSAJE").toString();

			if (rCodigo == ConstanteUtil.R_COD_EXITO) {
				log.info("[REGISTRAR PROVEEDOR NATURAL][DAO][EXITO]");
				ProveedorNaturalRegistrarResponse res = new ProveedorNaturalRegistrarResponse();
				res.setIdProveedor(MapUtil.getLong(out.get("R_ID_PROVEEDOR")));
				res.setCodigo(MapUtil.getString(out.get("P_CODIGO")));

				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
				outResponse.setObjeto(res);
			} else {
				log.info("[REGISTRAR PROVEEDOR NATURAL][DAO][ERROR]");
				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
			}
		} catch (Exception e) {
			log.info("[REGISTRAR PROVEEDOR NATURAL][DAO][EXCEPCION][" + e.getMessage() + "]");
			outResponse.setRCodigo(500);
			outResponse.setRMensaje("ERROR INTERNO DE SERVIDOR");
		}
		log.info("[REGISTRAR PROVEEDOR NATURAL][DAO][FIN]");
		return outResponse;
	}

	@Override
	public OutResponse<ProveedorJuridicoRegistrarResponse> registrarProveedorJurid(
			ProveedorJuridicoRegistrarRequest p) {
		log.info("[REGISTRAR PROVEEDOR JURIDICO][DAO][INICIO]");
		OutResponse<ProveedorJuridicoRegistrarResponse> outResponse = new OutResponse<>();

		Integer rCodigo = 0;
		String rMensaje = "";
		try {
			SimpleJdbcCall jdbcCall = new SimpleJdbcCall(dataSource).withSchemaName(ConstanteUtil.BD_SCHEMA_LGTC)
					.withCatalogName(ConstanteUtil.BD_PCK_LGTC_PROVEEDOR).withProcedureName("SP_I_PROVEEDOR_JURIDICO");

			MapSqlParameterSource in = new MapSqlParameterSource();
			in.addValue("P_IDT_TIPO_PROVEEDOR", p.getIdtTipoProveedor(), Types.NUMERIC);
			in.addValue("P_CODIGO", p.getCodigo(), Types.VARCHAR);
			in.addValue("P_OBSERVACION", p.getObservacion(), Types.VARCHAR);
			in.addValue("P_FLAG_ACTIVO", p.getFlagActivo(), Types.NUMERIC);
			in.addValue("P_ID_USUARIO_CREA", p.getIdUsuarioCrea(), Types.NUMERIC);
			in.addValue("P_FEC_USUARIO_CREA", DateUtil.formatDDMMYYYY(p.getFecUsuarioCrea()), Types.VARCHAR);
			in.addValue("P_COD_UBIGEO", p.getCodUbigeo(), Types.VARCHAR);
			in.addValue("P_IDT_TIPO_DOCUMENTO", p.getIdtTipoDocumento(), Types.NUMERIC);
			in.addValue("P_NRO_DOCUMENTO", p.getNroDocumento(), Types.VARCHAR);
			in.addValue("P_RAZON_SOCIAL", p.getRazonSocial(), Types.VARCHAR);
			in.addValue("P_NOMBRE_COMERCIAL", p.getNombreComercial(), Types.VARCHAR);
			in.addValue("P_GIRO_NEGOCIO", p.getGiroNegocio(), Types.VARCHAR);
			in.addValue("P_TELEFONO", p.getTelefono(), Types.VARCHAR);
			in.addValue("P_DIRECCION", p.getDireccion(), Types.VARCHAR);
			in.addValue("P_EMAIL", p.getEmail(), Types.VARCHAR);
			in.addValue("P_FEC_FUNDACION", DateUtil.formatDDMMYYYY(p.getFecfundacion()), Types.VARCHAR);
			log.info("[REGISTRAR PROVEEDOR JURIDICO][DAO][INPUT PROCEDURE][" + in.toString() + "]");

			Map<String, Object> out = jdbcCall.execute(in);
			log.info("[REGISTRAR PROVEEDOR JURIDICO][DAO][OUTPUT PROCEDURE][" + out.toString() + "]");

			rCodigo = Integer.parseInt(out.get("R_CODIGO").toString());
			rMensaje = out.get("R_MENSAJE").toString();

			if (rCodigo == ConstanteUtil.R_COD_EXITO) {
				log.info("[REGISTRAR PROVEEDOR JURIDICO][DAO][EXITO]");
				ProveedorJuridicoRegistrarResponse res = new ProveedorJuridicoRegistrarResponse();
				res.setIdProveedor(MapUtil.getLong(out.get("R_ID_PROVEEDOR")));
				res.setCodigo(MapUtil.getString(out.get("P_CODIGO")));

				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
				outResponse.setObjeto(res);
			} else {
				log.info("[REGISTRAR PROVEEDOR JURIDICO][DAO][ERROR]");
				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
			}
		} catch (Exception e) {
			log.info("[REGISTRAR PROVEEDOR JURIDICO][DAO][EXCEPCION][" + e.getMessage() + "]");
			outResponse.setRCodigo(500);
			outResponse.setRMensaje(e.getMessage());
		}
		log.info("[REGISTRAR PROVEEDOR JURIDICO][DAO][FIN]");
		return outResponse;
	}

	@Override
	public OutResponse<?> actualizarProveedorNatural(ProveedorNaturalModificarRequest p) {
		log.info("[MODIFICAR PROVEEDOR NATURAL][DAO][INICIO]");
		OutResponse<?> outResponse = new OutResponse<>();

		Integer rCodigo = 0;
		String rMensaje = "";
		try {
			SimpleJdbcCall jdbcCall = new SimpleJdbcCall(dataSource).withSchemaName(ConstanteUtil.BD_SCHEMA_LGTC)
					.withCatalogName(ConstanteUtil.BD_PCK_LGTC_PROVEEDOR).withProcedureName("SP_U_PROVEEDOR_NATURAL");

			MapSqlParameterSource in = new MapSqlParameterSource();
			in.addValue("P_ID_PROVEEDOR", p.getIdProveedor(), Types.NUMERIC);
			in.addValue("P_OBSERVACION", p.getObservacion(), Types.VARCHAR);
			in.addValue("P_FLAG_ACTIVO", p.getFlagActivo(), Types.NUMERIC);
			in.addValue("P_ID_USUARIO_MOD", p.getIdUsuarioMod(), Types.NUMERIC);
			in.addValue("P_FEC_USUARIO_MOD", DateUtil.formatDDMMYYYY(p.getFecUsuarioMod()), Types.VARCHAR);
			in.addValue("P_COD_UBIGEO", p.getCodUbigeo(), Types.VARCHAR);
			in.addValue("P_IDT_GENERO", p.getIdtGenero(), Types.NUMERIC);
			in.addValue("P_IDT_ESTADO_CIVIL", p.getIdtEstadoCivil(), Types.NUMERIC);
			in.addValue("P_IDT_TIPO_DOCUMENTO", p.getIdtTipoDocumento(), Types.NUMERIC);
			in.addValue("P_NRO_DOCUMENTO", p.getNroDocumento(), Types.VARCHAR);
			in.addValue("P_NOMBRE", p.getNombre(), Types.VARCHAR);
			in.addValue("P_APELLIDO_PAT", p.getApellidoPat(), Types.VARCHAR);
			in.addValue("P_APELLIDO_MAT", p.getApellidoMat(), Types.VARCHAR);
			in.addValue("P_TELEFONO", p.getTelefono(), Types.VARCHAR);
			in.addValue("P_DIRECCION", p.getDireccion(), Types.VARCHAR);
			in.addValue("P_EMAIL", p.getEmail(), Types.VARCHAR);
			in.addValue("P_FEC_NACIMIENTO", DateUtil.formatDDMMYYYY(p.getFecNacimiento()), Types.VARCHAR);
			log.info("[MODIFICAR PROVEEDOR NATURAL][DAO][INPUT PROCEDURE][" + in.toString() + "]");

			Map<String, Object> out = jdbcCall.execute(in);
			log.info("[MODIFICAR PROVEEDOR NATURAL][DAO][OUTPUT PROCEDURE][" + out.toString() + "]");

			rCodigo = Integer.parseInt(out.get("R_CODIGO").toString());
			rMensaje = out.get("R_MENSAJE").toString();
			if (rCodigo == ConstanteUtil.R_COD_EXITO) {
				log.info("[MODIFICAR PROVEEDOR NATURAL][DAO][EXITO]");
				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
			} else {
				log.info("[MODIFICAR PROVEEDOR NATURAL][DAO][ERROR]");
				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
			}
		} catch (Exception e) {
			log.info("[MODIFICAR PROVEEDOR NATURAL][DAO][EXCEPCION][" + e.getMessage() + "]");
			outResponse.setRCodigo(500);
			outResponse.setRMensaje("ERROR INTERNO DE SERVIDOR");
		}
		log.info("[MODIFICAR PROVEEDOR NATURAL][DAO][FIN]");
		return outResponse;

	}

	@Override
	public OutResponse<?> actualizarProveedorJuridico(ProveedorJuridicoModificarRequest p) {
		log.info("[MODIFICAR PROVEEDOR JURIDICO][DAO][INICIO]");
		OutResponse<?> outResponse = new OutResponse<>();

		Integer rCodigo = 0;
		String rMensaje = "";
		try {
			SimpleJdbcCall jdbcCall = new SimpleJdbcCall(dataSource).withSchemaName(ConstanteUtil.BD_SCHEMA_LGTC)
					.withCatalogName(ConstanteUtil.BD_PCK_LGTC_PROVEEDOR).withProcedureName("SP_U_PROVEEDOR_JURIDICO");

			MapSqlParameterSource in = new MapSqlParameterSource();
			in.addValue("P_ID_PROVEEDOR", p.getIdProveedor(), Types.NUMERIC);
			in.addValue("P_OBSERVACION", p.getObservacion(), Types.VARCHAR);
			in.addValue("P_FLAG_ACTIVO", p.getFlagActivo(), Types.NUMERIC);
			in.addValue("P_ID_USUARIO_MOD", p.getIdUsuarioMod(), Types.NUMERIC);
			in.addValue("P_FEC_USUARIO_MOD", DateUtil.formatDDMMYYYY(p.getFecUsuarioMod()), Types.VARCHAR);
			in.addValue("P_COD_UBIGEO", p.getCodUbigeo(), Types.VARCHAR);
			in.addValue("P_IDT_TIPO_DOCUMENTO", p.getIdtTipoDocumento(), Types.NUMERIC);
			in.addValue("P_NRO_DOCUMENTO", p.getNroDocumento(), Types.VARCHAR);
			in.addValue("P_RAZON_SOCIAL", p.getRazonSocial(), Types.VARCHAR);
			in.addValue("P_NOMBRE_COMERCIAL", p.getNombreComercial(), Types.VARCHAR);
			in.addValue("P_GIRO_NEGOCIO", p.getGiroNegocio(), Types.VARCHAR);
			in.addValue("P_TELEFONO", p.getTelefono(), Types.VARCHAR);
			in.addValue("P_DIRECCION", p.getDireccion(), Types.VARCHAR);
			in.addValue("P_EMAIL", p.getEmail(), Types.VARCHAR);
			in.addValue("P_FEC_FUNDACION", DateUtil.formatDDMMYYYY(p.getFecFundacion()), Types.VARCHAR);
			log.info("[MODIFICAR PROVEEDOR JURIDICO][DAO][INPUT PROCEDURE][" + in.toString() + "]");

			Map<String, Object> out = jdbcCall.execute(in);
			log.info("[MODIFICAR PROVEEDOR JURIDICO][DAO][OUTPUT PROCEDURE][" + out.toString() + "]");

			rCodigo = Integer.parseInt(out.get("R_CODIGO").toString());
			rMensaje = out.get("R_MENSAJE").toString();

			if (rCodigo == ConstanteUtil.R_COD_EXITO) {
				log.info("[MODIFICAR PROVEEDOR JURIDICO][DAO][EXITO]");
				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
			} else {
				log.info("[MODIFICAR PROVEEDOR JURIDICO][DAO][ERROR]");
				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
			}
		} catch (Exception e) {
			log.info("[MODIFICAR PROVEEDOR JURIDICO][DAO][EXCEPCION][" + e.getMessage() + "]");
			outResponse.setRCodigo(500);
			outResponse.setRMensaje(e.getMessage());
		}
		log.info("[MODIFICAR PROVEEDOR JURIDICO][DAO][FIN]");
		return outResponse;
	}

	@Override
	public OutResponse<?> eliminarProveedor(ProveedorEliminarRequest p) {
		log.info("[ELIMINAR PROVEEDOR][DAO][INICIO]");
		OutResponse<?> outResponse = new OutResponse<>();

		Integer rCodigo = 0;
		String rMensaje = "";
		try {
			SimpleJdbcCall jdbcCall = new SimpleJdbcCall(dataSource).withSchemaName(ConstanteUtil.BD_SCHEMA_LGTC)
					.withCatalogName(ConstanteUtil.BD_PCK_LGTC_PROVEEDOR).withProcedureName("SP_D_PROVEEDOR");

			MapSqlParameterSource in = new MapSqlParameterSource();
			in.addValue("P_ID", p.getId(), Types.NUMERIC);
			in.addValue("P_ID_USUARIO_MOD", p.getIdUsuarioMod(), Types.NUMERIC);
			in.addValue("P_FEC_USUARIO_MOD", DateUtil.formatDDMMYYYY(p.getFecUsuarioMod()), Types.VARCHAR);
			log.info("[ELIMINAR PROVEEDOR][DAO][INPUT PROCEDURE][" + in.toString() + "]");

			Map<String, Object> out = jdbcCall.execute(in);
			log.info("[ELIMINAR PROVEEDOR][DAO][OUTPUT PROCEDURE][" + out.toString() + "]");

			rCodigo = Integer.parseInt(out.get("R_CODIGO").toString());
			rMensaje = out.get("R_MENSAJE").toString();

			if (rCodigo == ConstanteUtil.R_COD_EXITO) {
				log.info("[ELIMINAR PROVEEDOR][DAO][EXITO]");
				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
			} else {
				log.info("[ELIMINAR PROVEEDOR][DAO][ERROR]");
				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
			}
		} catch (Exception e) {
			log.info("[ELIMINAR PROVEEDOR][DAO][EXCEPCION][" + e.getMessage() + "]");
			outResponse.setRCodigo(500);
			outResponse.setRMensaje(e.getMessage());
		}
		log.info("[ELIMINAR PROVEEDOR][DAO][FIN]");
		return outResponse;
	}

	@Override
	public OutResponse<ProveedorJuridRepLegalRegistrarResponse> registrarRepresentante(
			ProveedorJuridRepLegalRegistrarRequest p) {
		log.info("[REGISTRAR REP. LEGAL][DAO][INICIO]");
		OutResponse<ProveedorJuridRepLegalRegistrarResponse> outResponse = new OutResponse<>();

		Integer rCodigo = 0;
		String rMensaje = "";
		ProveedorJuridRepLegalListarResponse rl = new ProveedorJuridRepLegalListarResponse();
		try {
			SimpleJdbcCall jdbcCall = new SimpleJdbcCall(dataSource).withSchemaName(ConstanteUtil.BD_SCHEMA_LGTC)
					.withCatalogName(ConstanteUtil.BD_PCK_LGTC_PROVEEDOR).withProcedureName("SP_I_REPRESENTANTE_LEGAL");

			MapSqlParameterSource in = new MapSqlParameterSource();
			in.addValue("P_ID_PROVEEDOR", p.getIdProveedor(), Types.NUMERIC);
			in.addValue("P_COD_UBIGEO", p.getCodUbigeo(), Types.VARCHAR);
			in.addValue("P_IDT_GENERO", p.getIdtGenero(), Types.NUMERIC);
			in.addValue("P_IDT_ESTADO_CIVIL", p.getIdtEstadoCivil(), Types.NUMERIC);
			in.addValue("P_IDT_TIPO_DOCUMENTO", p.getIdtTipoDocumento(), Types.NUMERIC);
			in.addValue("P_NRO_DOCUMENTO", p.getNroDocumento(), Types.VARCHAR);
			in.addValue("P_NOMBRE", p.getNombre(), Types.VARCHAR);
			in.addValue("P_APELLIDO_PAT", p.getApellidoPat(), Types.VARCHAR);
			in.addValue("P_APELLIDO_MAT", p.getApellidoMat(), Types.VARCHAR);
			in.addValue("P_DIRECCION", p.getDireccion(), Types.VARCHAR);
			in.addValue("P_FEC_NACIMIENTO", DateUtil.formatDDMMYYYY(p.getFecNacimiento()), Types.VARCHAR);
			in.addValue("P_CARGO", p.getCargo(), Types.VARCHAR);
			in.addValue("P_TELEFONO", p.getTelefono(), Types.VARCHAR);
			in.addValue("P_EMAIL", p.getEmail(), Types.VARCHAR);
			in.addValue("P_FLAG_ACTIVO", p.getFlagActivo(), Types.NUMERIC);
			in.addValue("P_ID_USUARIO_CREA", p.getIdUsuarioCrea(), Types.NUMERIC);
			in.addValue("P_FEC_USUARIO_CREA", DateUtil.formatDDMMYYYY(p.getFecUsuarioCrea()), Types.VARCHAR);
			log.info("[REGISTRAR REP. LEGAL][DAO][INPUT PROCEDURE][" + in.toString() + "]");

			Map<String, Object> out = jdbcCall.execute(in);
			log.info("[REGISTRAR REP. LEGAL][DAO][OUTPUT PROCEDURE][" + out.toString() + "]");

			rCodigo = Integer.parseInt(out.get("R_CODIGO").toString());
			rMensaje = out.get("R_MENSAJE").toString();

			if (rCodigo == ConstanteUtil.R_COD_EXITO) {// CONSULTA CORRECTA
				log.info("[REGISTRAR REP. LEGAL][DAO][EXITO]");
				ProveedorJuridRepLegalRegistrarResponse res = new ProveedorJuridRepLegalRegistrarResponse();
				res.setId(MapUtil.getLong(out.get("R_ID")));

				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
				outResponse.setObjeto(res);
			} else {
				log.info("[REGISTRAR REP. LEGAL][DAO][ERROR]");
				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
			}
		} catch (Exception e) {
			log.info("[REGISTRAR REP. LEGAL][DAO][EXCEPCION][" + e.getMessage() + "]");
			outResponse.setRCodigo(500);
			outResponse.setRMensaje(e.getMessage());
		}
		log.info("[REGISTRAR REP. LEGAL][DAO][FIN]");
		return outResponse;
	}

	@Override
	public OutResponse<?> actualizarRepresentante(ProveedorJuridRepLegalModificarRequest p) {
		log.info("[MODIFICAR REP. LEGAL][DAO][INICIO]");
		OutResponse<?> outResponse = new OutResponse<>();

		Integer rCodigo = 0;
		String rMensaje = "";

		try {
			SimpleJdbcCall jdbcCall = new SimpleJdbcCall(dataSource).withSchemaName(ConstanteUtil.BD_SCHEMA_LGTC)
					.withCatalogName(ConstanteUtil.BD_PCK_LGTC_PROVEEDOR).withProcedureName("SP_U_REPRESENTANTE_LEGAL");

			MapSqlParameterSource in = new MapSqlParameterSource();
			in.addValue("P_ID", p.getId(), Types.NUMERIC);
			in.addValue("P_COD_UBIGEO", p.getCodUbigeo(), Types.VARCHAR);
			in.addValue("P_IDT_GENERO", p.getIdtGenero(), Types.NUMERIC);
			in.addValue("P_IDT_ESTADO_CIVIL", p.getIdtEstadoCivil(), Types.NUMERIC);
			in.addValue("P_IDT_TIPO_DOCUMENTO", p.getIdtTipoDocumento(), Types.NUMERIC);
			in.addValue("P_NRO_DOCUMENTO", p.getNroDocumento(), Types.VARCHAR);
			in.addValue("P_NOMBRE", p.getNombre(), Types.VARCHAR);
			in.addValue("P_APELLIDO_PAT", p.getApellidoPat(), Types.VARCHAR);
			in.addValue("P_APELLIDO_MAT", p.getApellidoMat(), Types.VARCHAR);
			in.addValue("P_DIRECCION", p.getDireccion(), Types.VARCHAR);
			in.addValue("P_FEC_NACIMIENTO", DateUtil.formatDDMMYYYY(p.getFecNacimiento()), Types.VARCHAR);
			in.addValue("P_CARGO", p.getCargo(), Types.VARCHAR);
			in.addValue("P_TELEFONO", p.getTelefono(), Types.VARCHAR);
			in.addValue("P_EMAIL", p.getEmail(), Types.VARCHAR);
			in.addValue("P_FLAG_ACTIVO", p.getFlagActivo(), Types.NUMERIC);
			in.addValue("P_ID_USUARIO_MOD", p.getIdUsuarioMod(), Types.NUMERIC);
			in.addValue("P_FEC_USUARIO_MOD", DateUtil.formatDDMMYYYY(p.getFecUsuarioMod()), Types.VARCHAR);
			log.info("[MODIFICAR REP. LEGAL][DAO][INPUT PROCEDURE][" + in.toString() + "]");

			Map<String, Object> out = jdbcCall.execute(in);
			log.info("[MODIFICAR REP. LEGAL][DAO][OUTPUT PROCEDURE][" + out.toString() + "]");

			rCodigo = Integer.parseInt(out.get("R_CODIGO").toString());
			rMensaje = out.get("R_MENSAJE").toString();

			if (rCodigo == ConstanteUtil.R_COD_EXITO) {// CONSULTA CORRECTA
				log.info("[MODIFICAR REP. LEGAL][DAO][EXITO]");
				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
			} else {
				log.info("[MODIFICAR REP. LEGAL][DAO][ERROR]");
				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
			}
		} catch (Exception e) {
			log.info("[MODIFICAR REP. LEGAL][DAO][EXCEPCION][" + e.getMessage() + "]");
			outResponse.setRCodigo(500);
			outResponse.setRMensaje(e.getMessage());
		}
		log.info("[MODIFICAR REP. LEGAL][DAO][FIN]");
		return outResponse;
	}

	@Override
	public OutResponse<List<ProveedorJuridRepLegalListarResponse>> listarRepresentante(
			ProveedorJuridRepLegalListarRequest p) {
		log.info("[LISTAR REP. LEGAL][DAO][INICIO]");
		OutResponse<List<ProveedorJuridRepLegalListarResponse>> outResponse = new OutResponse<>();

		Integer rCodigo = 0;
		String rMensaje = "";
		try {
			SimpleJdbcCall jdbcCall = new SimpleJdbcCall(dataSource).withSchemaName(ConstanteUtil.BD_SCHEMA_LGTC)
					.withCatalogName(ConstanteUtil.BD_PCK_LGTC_PROVEEDOR).withProcedureName("SP_L_REPRESENTANTE_LEGAL")
					.returningResultSet("R_LISTA", new RepresentanteLegalResponseMapper());

			MapSqlParameterSource in = new MapSqlParameterSource();
			in.addValue("P_ID_PROVEEDOR", p.getIdProveedor(), Types.NUMERIC);
			log.info("[LISTAR REP. LEGAL][DAO][INPUT PROCEDURE][" + in.toString() + "]");

			Map<String, Object> out = jdbcCall.execute(in);
			log.info("[LISTAR REP. LEGAL][DAO][OUTPUT PROCEDURE][" + out.toString() + "]");

			rCodigo = Integer.parseInt(out.get("R_CODIGO").toString());
			rMensaje = out.get("R_MENSAJE").toString();

			if (rCodigo == ConstanteUtil.R_COD_EXITO) {// CONSULTA CORRECTA
				log.info("[LISTAR REP. LEGAL][DAO][EXITO]");
				List<ProveedorJuridRepLegalListarResponse> lista = (List<ProveedorJuridRepLegalListarResponse>) out
						.get("R_LISTA");

				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
				outResponse.setObjeto(lista);
			} else {
				log.info("[LISTAR REP. LEGAL][DAO][ERROR]");
				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
			}
		} catch (Exception e) {
			log.info("[LISTAR REP. LEGAL][DAO][EXCEPCION][" + e.getMessage() + "]");
			outResponse.setRCodigo(500);
			outResponse.setRMensaje(e.getMessage());
		}
		log.info("[LISTAR REP. LEGAL][DAO][FIN]");
		return outResponse;
	}

	@Override
	public OutResponse<ProveedorJuridRepLegalBuscarResponse> obtenerRepresentanteLegal(
			ProveedorJuridRepLegalBuscarRequest p) {
		log.info("[BUSCAR REP. LEGAL][DAO][INICIO]");
		OutResponse<ProveedorJuridRepLegalBuscarResponse> outResponse = new OutResponse<>();

		Integer rCodigo = 0;
		String rMensaje = "";
		try {
			SimpleJdbcCall jdbcCall = new SimpleJdbcCall(dataSource).withSchemaName(ConstanteUtil.BD_SCHEMA_LGTC)
					.withCatalogName(ConstanteUtil.BD_PCK_LGTC_PROVEEDOR).withProcedureName("SP_S_REPRESENTANTE_LEGAL");

			MapSqlParameterSource in = new MapSqlParameterSource();
			in.addValue("P_ID", p.getId());
			log.info("[BUSCAR REP. LEGAL][DAO][INPUT PROCEDURE][" + in.toString() + "]");

			Map<String, Object> out = jdbcCall.execute(in);
			log.info("[BUSCAR REP. LEGAL][DAO][OUTPUT PROCEDURE][" + out.toString() + "]");

			rCodigo = Integer.parseInt(out.get("R_CODIGO").toString());
			rMensaje = out.get("R_MENSAJE").toString();

			if (rCodigo == ConstanteUtil.R_COD_EXITO) {// CONSULTA CORRECTA
				log.info("[BUSCAR REP. LEGAL][DAO][EXITO]");
				ProveedorJuridRepLegalBuscarResponse res = new ProveedorJuridRepLegalBuscarResponse();

				res.setId(p.getId());
				res.setIdProveedor(MapUtil.getLong(out.get("R_ID_PROVEEDOR")));
				res.setIdtGenero(MapUtil.getLong(out.get("R_IDT_GENERO")));
				res.setIdtEstadoCivil(MapUtil.getLong(out.get("R_IDT_ESTADO_CIVIL")));
				res.setIdtTipoDocumento(MapUtil.getLong(out.get("R_IDT_TIPO_DOCUMENTO")));
				res.setNroDocumento(MapUtil.getString(out.get("R_NRO_DOCUMENTO")));
				res.setNombre(MapUtil.getString(out.get("R_NOMBRE")));
				res.setApellidoPat(MapUtil.getString(out.get("R_APELLIDO_PAT")));
				res.setApellidoMat(MapUtil.getString(out.get("R_APELLIDO_MAT")));
				res.setDireccion(MapUtil.getString(out.get("R_DIRECCION")));
				res.setFecNacimiento(DateUtil.parseDDMMYYYY(MapUtil.getString(out.get("R_FEC_NACIMIENTO"))));
				res.setCargo(MapUtil.getString(out.get("R_CARGO")));
				res.setTelefono(MapUtil.getString(out.get("R_TELEFONO")));
				res.setEmail(MapUtil.getString(out.get("R_EMAIL")));
				res.setFlagActivo(MapUtil.getInt(out.get("R_FLAG_ACTIVO")));
				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
				outResponse.setObjeto(res);
			} else {
				log.info("[BUSCAR REP. LEGAL][DAO][ERROR]");
				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
			}
		} catch (Exception e) {
			log.info("[BUSCAR REP. LEGAL][DAO][EXCEPCION][" + e.getMessage() + "]");
			outResponse.setRCodigo(500);
			outResponse.setRMensaje(e.getMessage());
		}
		log.info("[BUSCAR REP. LEGAL][DAO][FIN]");
		return outResponse;
	}

	@Override
	public OutResponse<?> eliminarRepresentante(ProveedorJuridRepLegalEliminarRequest p) {
		log.info("[ELIMINAR REP. LEGAL][DAO][INICIO]");
		OutResponse<?> outResponse = new OutResponse<>();

		Integer rCodigo = 0;
		String rMensaje = "";
		try {
			SimpleJdbcCall jdbcCall = new SimpleJdbcCall(dataSource).withSchemaName(ConstanteUtil.BD_SCHEMA_LGTC)
					.withCatalogName(ConstanteUtil.BD_PCK_LGTC_PROVEEDOR).withProcedureName("SP_D_REPRESENTANTE_LEGAL");

			MapSqlParameterSource in = new MapSqlParameterSource();
			in.addValue("P_ID", p.getId());
			log.info("[ELIMINAR REP. LEGAL][DAO][INPUT PROCEDURE][" + in.toString() + "]");

			Map<String, Object> out = jdbcCall.execute(in);
			log.info("[ELIMINAR REP. LEGAL][DAO][OUTPUT PROCEDURE][" + out.toString() + "]");

			rCodigo = Integer.parseInt(out.get("R_CODIGO").toString());
			rMensaje = out.get("R_MENSAJE").toString();

			if (rCodigo == ConstanteUtil.R_COD_EXITO) {// CONSULTA CORRECTA
				log.info("[ELIMINAR REP. LEGAL][DAO][EXITO]");
				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
			} else {
				log.info("[ELIMINAR REP. LEGAL][DAO][ERROR]");
				outResponse.setRCodigo(rCodigo);
				outResponse.setRMensaje(rMensaje);
			}
		} catch (Exception e) {
			log.info("[ELIMINAR REP. LEGAL][DAO][EXCEPCION][" + e.getMessage() + "]");
			outResponse.setRCodigo(500);
			outResponse.setRMensaje(e.getMessage());
		}
		log.info("[ELIMINAR REP. LEGAL][DAO][FIN]");
		return outResponse;
	}

}
