package com.besoft.siserp.lgtc.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.besoft.siserp.lgtc.dto.OutResponse;
import com.besoft.siserp.lgtc.dto.request.UbigeoDistritoListarRequest;
import com.besoft.siserp.lgtc.dto.request.UbigeoDistritoListarXUbigeoRequest;
import com.besoft.siserp.lgtc.dto.request.UbigeoProvinciaListarRequest;
import com.besoft.siserp.lgtc.dto.request.UbigeoProvinciaListarXUbigeoRequest;
import com.besoft.siserp.lgtc.dto.response.UbigeoDepartamentoListarResponse;
import com.besoft.siserp.lgtc.dto.response.UbigeoDistritoListarResponse;
import com.besoft.siserp.lgtc.dto.response.UbigeoProvinciaListarResponse;
import com.besoft.siserp.lgtc.service.UbigeoService;

import io.swagger.annotations.Api;

@RestController
@RequestMapping("/ubigeo")
@Api(value = "API Ubigeo")
public class UbigeoController {
	Logger log = LoggerFactory.getLogger(UbigeoController.class);

	@Autowired
	UbigeoService ubigeoService;

	@PostMapping("/listarDepartamento")
	public OutResponse<List<UbigeoDepartamentoListarResponse>> listarDepartamento() {
		log.info("[LISTAR DEPARTAMENTO][CONTROLLER][INICIO]");
		OutResponse<List<UbigeoDepartamentoListarResponse>> out = ubigeoService.listarDepartamento();
		log.info("[LISTAR DEPARTAMENTO][CONTROLLER][FIN]");
		return out;
	}

	@PostMapping("/listarProvincia")
	public OutResponse<List<UbigeoProvinciaListarResponse>> listarProvincia(@RequestBody UbigeoProvinciaListarRequest req) {
		log.info("[LISTAR PROVINCIA][CONTROLLER][INICIO]");
		OutResponse<List<UbigeoProvinciaListarResponse>> out = ubigeoService.listarProvincia(req);
		log.info("[LISTAR PROVINCIA][CONTROLLER][FIN]");
		return out;
	}

	@PostMapping("/listarDistrito")
	public OutResponse<List<UbigeoDistritoListarResponse>> listarDistrito(@RequestBody UbigeoDistritoListarRequest req) {
		log.info("[LISTAR DISTRITO][CONTROLLER][INICIO]");
		OutResponse<List<UbigeoDistritoListarResponse>> out = ubigeoService.listarDistrito(req);
		log.info("[LISTAR DISTRITO][CONTROLLER][FIN]");
		return out;
	}
	
	@PostMapping("/listarProvinciaXUbigeo")
	public OutResponse<List<UbigeoProvinciaListarResponse>> listarProvinciaXUbigeo(@RequestBody UbigeoProvinciaListarXUbigeoRequest req) {
		log.info("[LISTAR PROVINCIA X UBIGEO][CONTROLLER][INICIO]");
		OutResponse<List<UbigeoProvinciaListarResponse>> out = ubigeoService.listarProvinciaXUbigeo(req);
		log.info("[LISTAR PROVINCIA X UBIGEO][CONTROLLER][FIN]");
		return out;
	}

	@PostMapping("/listarDistritoXUbigeo")
	public OutResponse<List<UbigeoDistritoListarResponse>> listarDistritoXUbigeo(@RequestBody UbigeoDistritoListarXUbigeoRequest req) {
		log.info("[LISTAR DISTRITO X UBIGEO][CONTROLLER][INICIO]");
		OutResponse<List<UbigeoDistritoListarResponse>> out = ubigeoService.listarDistritoXUbigeo(req);
		log.info("[LISTAR DISTRITO X UBIGEO][CONTROLLER][FIN]");
		return out;
	}
}
