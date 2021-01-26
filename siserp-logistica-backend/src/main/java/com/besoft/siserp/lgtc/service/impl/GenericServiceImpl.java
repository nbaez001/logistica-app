package com.besoft.siserp.lgtc.service.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.besoft.siserp.lgtc.dao.GenericDao;
import com.besoft.siserp.lgtc.dto.OutResponse;
import com.besoft.siserp.lgtc.dto.request.BuscarMaestraRequest;
import com.besoft.siserp.lgtc.dto.request.MaestraRequest;
import com.besoft.siserp.lgtc.service.GenericService;

@Service
public class GenericServiceImpl implements GenericService {

	Logger log = LoggerFactory.getLogger(GenericServiceImpl.class);

	@Autowired
	GenericDao genericDao;

	@Override
	public OutResponse listarMaestra(BuscarMaestraRequest b) {
		log.info("[LISTAR MAESTRA][SERVICE][INICIO]");
		OutResponse out = genericDao.listarMaestra(b);
		log.info("[LISTAR MAESTRA][SERVICE][FIN]");
		return out;
	}

	@Override
	public OutResponse registrarMaestra(MaestraRequest m) {
		log.info("[REGISTRAR MAESTRA][SERVICE][INICIO]");
		OutResponse out = genericDao.registrarMaestra(m);
		log.info("[REGISTRAR MAESTRA][SERVICE][FIN]");
		return out;
	}

	@Override
	public OutResponse actualizarMaestra(MaestraRequest m) {
		log.info("[MODIFICAR MAESTRA][SERVICE][INICIO]");
		OutResponse out = genericDao.actualizarMaestra(m);
		log.info("[MODIFICAR MAESTRA][SERVICE][FIN]");
		return out;
	}

	@Override
	public OutResponse eliminarMaestra(MaestraRequest m) {
		log.info("[ELIMINAR MAESTRA][SERVICE][INICIO]");
		OutResponse out = genericDao.eliminarMaestra(m);
		log.info("[ELIMINAR MAESTRA][SERVICE][FIN]");
		return out;
	}

}