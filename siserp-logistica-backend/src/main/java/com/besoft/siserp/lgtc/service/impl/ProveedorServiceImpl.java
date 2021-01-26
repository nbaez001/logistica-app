package com.besoft.siserp.lgtc.service.impl;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.besoft.siserp.lgtc.dao.ProveedorDao;
import com.besoft.siserp.lgtc.dto.OutResponse;
import com.besoft.siserp.lgtc.dto.request.ProveedorJuridRepLegalListarRequest;
import com.besoft.siserp.lgtc.dto.request.ProveedorJuridRepLegalModificarRequest;
import com.besoft.siserp.lgtc.dto.request.ProveedorJuridRepLegalEliminarRequest;
import com.besoft.siserp.lgtc.dto.request.ProveedorEliminarRequest;
import com.besoft.siserp.lgtc.dto.request.ProveedorJuridRepLegalBuscarRequest;
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
import com.besoft.siserp.lgtc.dto.request.ProveedorJuridRepLegalRegistrarRequest;
import com.besoft.siserp.lgtc.dto.request.ProveedorJuridicoModificarRequest;
import com.besoft.siserp.lgtc.service.ProveedorService;

@Service
public class ProveedorServiceImpl implements ProveedorService {

	@Autowired
	ProveedorDao proveedorDao;

	Logger log = LoggerFactory.getLogger(ProveedorServiceImpl.class);

	@Override
	public OutResponse<List<ProveedorListarResponse>> listarProveedor(ProveedorListarRequest req) {
		log.info("[LISTAR PROVEEDOR][SERVICE][INICIO]");
		OutResponse<List<ProveedorListarResponse>> out = proveedorDao.listarProveedor(req);
		log.info("[LISTAR PROVEEDOR][SERVICE][FIN]");
		return out;
	}

	@Override
	public OutResponse<ProveedorNaturalRegistrarResponse> registrarProveedor(ProveedorNaturalRegistrarRequest p) {
		log.info("[REGISTRAR PROVEEDOR NATURAL][SERVICE][INICIO]");
		OutResponse<ProveedorNaturalRegistrarResponse> out = proveedorDao.registrarProveedor(p);
		log.info("[REGISTRAR PROVEEDOR NATURAL][SERVICE][FIN]");
		return out;
	}

	@Override
	public OutResponse<ProveedorJuridicoRegistrarResponse> registrarProveedorJurid(
			ProveedorJuridicoRegistrarRequest p) {
		log.info("[REGISTRAR PROVEEDOR JURIDICO][SERVICE][INICIO]");
		OutResponse<ProveedorJuridicoRegistrarResponse> out = proveedorDao.registrarProveedorJurid(p);
		log.info("[REGISTRAR PROVEEDOR JURIDICO][SERVICE][FIN]");
		return out;
	}

	@Override
	public OutResponse<?> actualizarProveedorNatural(ProveedorNaturalModificarRequest p) {
		log.info("[MODIFICAR PROVEEDOR NATURAL][SERVICE][INICIO]");
		OutResponse<?> out = proveedorDao.actualizarProveedorNatural(p);
		log.info("[MODIFICAR PROVEEDOR NATURAL][SERVICE][FIN]");
		return out;
	}

	@Override
	public OutResponse<?> actualizarProveedorJuridico(ProveedorJuridicoModificarRequest p) {
		log.info("[MODIFICAR PROVEEDOR JURIDICO][SERVICE][INICIO]");
		OutResponse<?> out = proveedorDao.actualizarProveedorJuridico(p);
		log.info("[MODIFICAR PROVEEDOR JURIDICO][SERVICE][FIN]");
		return out;
	}

	@Override
	public OutResponse<?> eliminarProveedor(ProveedorEliminarRequest p) {
		log.info("[ELIMINAR PROVEEDOR][SERVICE][INICIO]");
		OutResponse<?> out = proveedorDao.eliminarProveedor(p);
		log.info("[ELIMINAR PROVEEDOR][SERVICE][FIN]");
		return out;
	}

	@Override
	public OutResponse<ProveedorJuridRepLegalRegistrarResponse> registrarRepresentante(
			ProveedorJuridRepLegalRegistrarRequest p) {
		log.info("[REGISTRAR REP. LEGAL][SERVICE][INICIO]");
		OutResponse<ProveedorJuridRepLegalRegistrarResponse> out = proveedorDao.registrarRepresentante(p);
		log.info("[REGISTRAR REP. LEGAL][SERVICE][FIN]");
		return out;
	}

	@Override
	public OutResponse<List<ProveedorJuridRepLegalListarResponse>> listarRepresentante(
			ProveedorJuridRepLegalListarRequest p) {
		log.info("[LISTAR REP. LEGAL][SERVICE][INICIO]");
		OutResponse<List<ProveedorJuridRepLegalListarResponse>> out = proveedorDao.listarRepresentante(p);
		log.info("[LISTAR REP. LEGAL][SERVICE][FIN]");
		return out;
	}

	@Override
	public OutResponse<?> actualizarRepresentante(ProveedorJuridRepLegalModificarRequest p) {
		log.info("[MODIFICAR REP. LEGAL][SERVICE][INICIO]");
		OutResponse<?> out = proveedorDao.actualizarRepresentante(p);
		log.info("[MODIFICAR REP. LEGAL][SERVICE][FIN]");
		return out;
	}

	@Override
	public OutResponse<?> eliminarRepresentante(ProveedorJuridRepLegalEliminarRequest p) {
		log.info("[ELIMINAR REP. LEGAL][SERVICE][INICIO]");
		OutResponse<?> out = proveedorDao.eliminarRepresentante(p);
		log.info("[ELIMINAR REP. LEGAL][SERVICE][FIN]");
		return out;
	}

	@Override
	public OutResponse<ProveedorJuridRepLegalBuscarResponse> obtenerRepresentanteLegal(
			ProveedorJuridRepLegalBuscarRequest p) {
		log.info("[BUSCAR REP. LEGAL][SERVICE][INICIO]");
		OutResponse<ProveedorJuridRepLegalBuscarResponse> out = proveedorDao.obtenerRepresentanteLegal(p);
		log.info("[BUSCAR REP. LEGAL][SERVICE][FIN]");
		return out;
	}

}
