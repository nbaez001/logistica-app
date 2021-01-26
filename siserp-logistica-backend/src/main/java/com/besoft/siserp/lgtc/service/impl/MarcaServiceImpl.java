package com.besoft.siserp.lgtc.service.impl;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.besoft.siserp.lgtc.dao.MarcaDao;
import com.besoft.siserp.lgtc.dto.OutResponse;
import com.besoft.siserp.lgtc.dto.request.MarcaEliminarRequest;
import com.besoft.siserp.lgtc.dto.request.MarcaListarRequest;
import com.besoft.siserp.lgtc.dto.request.MarcaModificarRequest;
import com.besoft.siserp.lgtc.dto.request.MarcaRegistrarRequest;
import com.besoft.siserp.lgtc.dto.response.MarcaListarResponse;
import com.besoft.siserp.lgtc.dto.response.MarcaRegistrarResponse;
import com.besoft.siserp.lgtc.service.MarcaService;

@Service
public class MarcaServiceImpl implements MarcaService {

	Logger log = LoggerFactory.getLogger(MarcaServiceImpl.class);

	@Autowired
	MarcaDao marcaDao;

	@Override
	public OutResponse<MarcaRegistrarResponse> registrarMarca(MarcaRegistrarRequest c) {
		log.info("[REGISTRAR MARCA][SERVICE][INICIO]");
		OutResponse<MarcaRegistrarResponse> out = marcaDao.registrarMarca(c);
		log.info("[REGISTRAR MARCA][SERVICE][FIN]");
		return out;
	}

	@Override
	public OutResponse<?> modificarMarca(MarcaModificarRequest c) {
		log.info("[MODIFICAR MARCA][SERVICE][INICIO]");
		OutResponse<?> out = marcaDao.modificarMarca(c);
		log.info("[MODIFICAR MARCA][SERVICE][FIN]");
		return out;
	}

	@Override
	public OutResponse<List<MarcaListarResponse>> listarMarca(MarcaListarRequest c) {
		log.info("[LISTAR MARCA][SERVICE][INICIO]");
		OutResponse<List<MarcaListarResponse>> out = marcaDao.listarMarca(c);
		log.info("[LISTAR MARCA][SERVICE][FIN]");
		return out;
	}

	@Override
	public OutResponse<?> eliminarMarca(MarcaEliminarRequest c) {
		log.info("[ELIMINAR MARCA][SERVICE][INICIO]");
		OutResponse<?> out = marcaDao.eliminarMarca(c);
		log.info("[ELIMINAR MARCA][SERVICE][FIN]");
		return out;
	}

}
