package com.besoft.siserp.lgtc.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.besoft.siserp.lgtc.dto.OutResponse;
import com.besoft.siserp.lgtc.dto.request.BuscarMaestraRequest;
import com.besoft.siserp.lgtc.dto.request.MaestraRequest;
import com.besoft.siserp.lgtc.service.GenericService;

import io.swagger.annotations.Api;

@RestController
@RequestMapping("/generic")
@Api(value = "API Generico")
public class GenericController {

	Logger log = LoggerFactory.getLogger(GenericController.class);

	@Autowired
	GenericService genericService;// HOLA

	@PostMapping("/listarMaestra")
	public OutResponse listarMaestra(@RequestBody BuscarMaestraRequest b) {
		log.info("[LISTAR MAESTRA][CONTROLLER][INICIO]");
		OutResponse entity = genericService.listarMaestra(b);
		log.info("[LISTAR MAESTRA][CONTROLLER][FIN]");
		return entity;
	}

	@PostMapping("/registrarMaestra")
	public OutResponse registrarMaestra(@RequestBody MaestraRequest m) {
		log.info("[REGISTRAR MAESTRA][CONTROLLER][INICIO]");
		OutResponse entity = genericService.registrarMaestra(m);
		log.info("[REGISTRAR MAESTRA][CONTROLLER][FIN]");
		return entity;
	}

	@PostMapping("/actualizarMaestra")
	public OutResponse actualizarMaestra(@RequestBody MaestraRequest m) {
		log.info("[MODIFICAR MAESTRA][CONTROLLER][INICIO]");
		OutResponse entity = genericService.actualizarMaestra(m);
		log.info("[MODIFICAR MAESTRA][CONTROLLER][FIN]");
		return entity;
	}

	@PostMapping("/eliminarMaestra")
	public OutResponse eliminarMaestra(@RequestBody MaestraRequest m) {
		log.info("[ELIMINAR MAESTRA][CONTROLLER][INICIO]");
		OutResponse entity = genericService.eliminarMaestra(m);
		log.info("[ELIMINAR MAESTRA][CONTROLLER][FIN]");
		return entity;
	}
}
