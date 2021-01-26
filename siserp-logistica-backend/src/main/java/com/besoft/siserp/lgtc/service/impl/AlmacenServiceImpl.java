package com.besoft.siserp.lgtc.service.impl;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
import com.besoft.siserp.lgtc.service.AlmacenService;

@Service
public class AlmacenServiceImpl implements AlmacenService {

	Logger log = LoggerFactory.getLogger(AlmacenServiceImpl.class);

	@Autowired
	AlmacenDao almacenDao;

	@Override
	public OutResponse<AlmacenRegistrarResponse> registrarAlmacen(AlmacenRegistrarRequest c) {
		log.info("[REGISTRAR ALMACEN][SERVICE][INICIO]");
		OutResponse<AlmacenRegistrarResponse> out = almacenDao.registrarAlmacen(c);
		log.info("[REGISTRAR ALMACEN][SERVICE][FIN]");
		return out;
	}

	@Override
	public OutResponse<?> modificarAlmacen(AlmacenModificarRequest c) {
		log.info("[MODIFICAR ALMACEN][SERVICE][INICIO]");
		OutResponse<?> out = almacenDao.modificarAlmacen(c);
		log.info("[MODIFICAR ALMACEN][SERVICE][FIN]");
		return out;
	}

	@Override
	public OutResponse<List<AlmacenListarResponse>> listarAlmacen(AlmacenListarRequest c) {
		log.info("[LISTAR ALMACEN][SERVICE][INICIO]");
		OutResponse<List<AlmacenListarResponse>> out = almacenDao.listarAlmacen(c);
		log.info("[LISTAR ALMACEN][SERVICE][FIN]");
		return out;
	}

	@Override
	public OutResponse<?> eliminarAlmacen(AlmacenEliminarRequest c) {
		log.info("[ELIMINAR ALMACEN][SERVICE][INICIO]");
		OutResponse<?> out = almacenDao.eliminarAlmacen(c);
		log.info("[ELIMINAR ALMACEN][SERVICE][FIN]");
		return out;
	}

	@Override
	public OutResponse<AlmacenEstanteRegistrarResponse> registrarEstante(AlmacenEstanteRegistrarRequest c) {
		log.info("[REGISTRAR ESTANTE][SERVICE][INICIO]");
		OutResponse<AlmacenEstanteRegistrarResponse> out = almacenDao.registrarEstante(c);
		log.info("[REGISTRAR ESTANTE][SERVICE][FIN]");
		return out;
	}

	@Override
	public OutResponse<?> modificarEstante(AlmacenEstanteModificarRequest c) {
		log.info("[MODIFICAR ESTANTE][SERVICE][INICIO]");
		OutResponse<?> out = almacenDao.modificarEstante(c);
		log.info("[MODIFICAR ESTANTE][SERVICE][FIN]");
		return out;
	}

	@Override
	public OutResponse<List<AlmacenEstanteListarResponse>> listarEstante(AlmacenEstanteListarRequest c) {
		log.info("[LISTAR ESTANTE][SERVICE][INICIO]");
		OutResponse<List<AlmacenEstanteListarResponse>> out = almacenDao.listarEstante(c);
		log.info("[LISTAR ESTANTE][SERVICE][FIN]");
		return out;
	}

	@Override
	public OutResponse<?> eliminarEstante(AlmacenEstanteEliminarRequest c) {
		log.info("[ELIMINAR ESTANTE][SERVICE][INICIO]");
		OutResponse<?> out = almacenDao.eliminarEstante(c);
		log.info("[ELIMINAR ESTANTE][SERVICE][FIN]");
		return out;
	}
}
