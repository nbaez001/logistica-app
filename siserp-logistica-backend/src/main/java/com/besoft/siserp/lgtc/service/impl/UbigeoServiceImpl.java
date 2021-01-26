package com.besoft.siserp.lgtc.service.impl;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.besoft.siserp.lgtc.dao.UbigeoDao;
import com.besoft.siserp.lgtc.dto.OutResponse;
import com.besoft.siserp.lgtc.dto.request.UbigeoDistritoListarRequest;
import com.besoft.siserp.lgtc.dto.request.UbigeoDistritoListarXUbigeoRequest;
import com.besoft.siserp.lgtc.dto.request.UbigeoProvinciaListarRequest;
import com.besoft.siserp.lgtc.dto.request.UbigeoProvinciaListarXUbigeoRequest;
import com.besoft.siserp.lgtc.dto.response.UbigeoDepartamentoListarResponse;
import com.besoft.siserp.lgtc.dto.response.UbigeoDistritoListarResponse;
import com.besoft.siserp.lgtc.dto.response.UbigeoProvinciaListarResponse;
import com.besoft.siserp.lgtc.service.UbigeoService;

@Service
public class UbigeoServiceImpl implements UbigeoService {

	Logger log = LoggerFactory.getLogger(UbigeoServiceImpl.class);

	@Autowired
	UbigeoDao ubigeoDao;

	@Override
	public OutResponse<List<UbigeoDepartamentoListarResponse>> listarDepartamento() {
		log.info("[LISTAR DEPARTAMENTO][SERVICE][INICIO]");
		OutResponse<List<UbigeoDepartamentoListarResponse>> out = ubigeoDao.listarDepartamento();
		log.info("[LISTAR DEPARTAMENTO][SERVICE][FIN]");
		return out;
	}

	@Override
	public OutResponse<List<UbigeoProvinciaListarResponse>> listarProvincia(UbigeoProvinciaListarRequest req) {
		log.info("[LISTAR PROVINCIA][SERVICE][INICIO]");
		OutResponse<List<UbigeoProvinciaListarResponse>> out = ubigeoDao.listarProvincia(req);
		log.info("[LISTAR PROVINCIA][SERVICE][FIN]");
		return out;
	}

	@Override
	public OutResponse<List<UbigeoDistritoListarResponse>> listarDistrito(UbigeoDistritoListarRequest req) {
		log.info("[LISTAR DISTRITO][SERVICE][INICIO]");
		OutResponse<List<UbigeoDistritoListarResponse>> out = ubigeoDao.listarDistrito(req);
		log.info("[LISTAR DISTRITO][SERVICE][FIN]");
		return out;
	}

	@Override
	public OutResponse<List<UbigeoProvinciaListarResponse>> listarProvinciaXUbigeo(
			UbigeoProvinciaListarXUbigeoRequest req) {
		log.info("[LISTAR PROVINCIA X UBIGEO][SERVICE][INICIO]");
		OutResponse<List<UbigeoProvinciaListarResponse>> out = ubigeoDao.listarProvinciaXUbigeo(req);
		log.info("[LISTAR PROVINCIA X UBIGEO][SERVICE][FIN]");
		return out;
	}

	@Override
	public OutResponse<List<UbigeoDistritoListarResponse>> listarDistritoXUbigeo(
			UbigeoDistritoListarXUbigeoRequest req) {
		log.info("[LISTAR DISTRITO X UBIGEO][SERVICE][INICIO]");
		OutResponse<List<UbigeoDistritoListarResponse>> out = ubigeoDao.listarDistritoXUbigeo(req);
		log.info("[LISTAR DISTRITO X UBIGEO][SERVICE][FIN]");
		return out;
	}

}
