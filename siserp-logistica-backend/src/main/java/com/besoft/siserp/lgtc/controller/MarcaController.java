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
import com.besoft.siserp.lgtc.dto.request.MarcaEliminarRequest;
import com.besoft.siserp.lgtc.dto.request.MarcaListarRequest;
import com.besoft.siserp.lgtc.dto.request.MarcaModificarRequest;
import com.besoft.siserp.lgtc.dto.request.MarcaRegistrarRequest;
import com.besoft.siserp.lgtc.dto.response.MarcaListarResponse;
import com.besoft.siserp.lgtc.dto.response.MarcaRegistrarResponse;
import com.besoft.siserp.lgtc.service.MarcaService;

import io.swagger.annotations.Api;

@RestController
@RequestMapping("/marca")
@Api(value = "API Marca")
public class MarcaController {

	Logger log = LoggerFactory.getLogger(MarcaController.class);

	@Autowired
	MarcaService marcaService;

	@PostMapping("/registrarMarca")
	public OutResponse<MarcaRegistrarResponse> registrarMarca(@RequestBody MarcaRegistrarRequest c) {
		log.info("[REGISTRAR MARCA][CONTROLLER][INICIO]");
		OutResponse<MarcaRegistrarResponse> out = marcaService.registrarMarca(c);
		log.info("[REGISTRAR MARCA][CONTROLLER][FIN]");
		return out;
	}

	@PostMapping("/modificarMarca")
	public OutResponse<?> modificarMarca(@RequestBody MarcaModificarRequest c) {
		log.info("[MODIFICAR MARCA][CONTROLLER][INICIO]");
		OutResponse<?> out = marcaService.modificarMarca(c);
		log.info("[MODIFICAR MARCA][CONTROLLER][FIN]");
		return out;
	}

	@PostMapping("/listarMarca")
	public OutResponse<List<MarcaListarResponse>> listarMarca(@RequestBody MarcaListarRequest c) {
		log.info("[REGISTRAR MARCA][CONTROLLER][INICIO]");
		OutResponse<List<MarcaListarResponse>> out = marcaService.listarMarca(c);
		log.info("[REGISTRAR MARCA][CONTROLLER][FIN]");
		return out;
	}
	
	@PostMapping("/eliminarMarca")
	public OutResponse<?> eliminarMarca(@RequestBody MarcaEliminarRequest c) {
		log.info("[ELIMINAR MARCA][CONTROLLER][INICIO]");
		OutResponse<?> out = marcaService.eliminarMarca(c);
		log.info("[ELIMINAR MARCA][CONTROLLER][FIN]");
		return out;
	}
}
