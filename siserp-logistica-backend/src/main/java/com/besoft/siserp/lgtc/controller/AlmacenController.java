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

import io.swagger.annotations.Api;

@RestController
@RequestMapping("/almacen")
@Api(value = "API Almacen")
public class AlmacenController {

	Logger log = LoggerFactory.getLogger(AlmacenController.class);

	@Autowired
	AlmacenService almacenService;

	@PostMapping("/registrarAlmacen")
	public OutResponse<AlmacenRegistrarResponse> registrarAlmacen(@RequestBody AlmacenRegistrarRequest c) {
		log.info("[REGISTRAR ALMACEN][CONTROLLER][INICIO]");
		OutResponse<AlmacenRegistrarResponse> out = almacenService.registrarAlmacen(c);
		log.info("[REGISTRAR ALMACEN][CONTROLLER][FIN]");
		return out;
	}

	@PostMapping("/modificarAlmacen")
	public OutResponse<?> modificarAlmacen(@RequestBody AlmacenModificarRequest c) {
		log.info("[MODIFICAR ALMACEN][CONTROLLER][INICIO]");
		OutResponse<?> out = almacenService.modificarAlmacen(c);
		log.info("[MODIFICAR ALMACEN][CONTROLLER][FIN]");
		return out;
	}

	@PostMapping("/listarAlmacen")
	public OutResponse<List<AlmacenListarResponse>> listarAlmacen(@RequestBody AlmacenListarRequest c) {
		log.info("[REGISTRAR ALMACEN][CONTROLLER][INICIO]");
		OutResponse<List<AlmacenListarResponse>> out = almacenService.listarAlmacen(c);
		log.info("[REGISTRAR ALMACEN][CONTROLLER][FIN]");
		return out;
	}

	@PostMapping("/eliminarAlmacen")
	public OutResponse<?> eliminarAlmacen(@RequestBody AlmacenEliminarRequest c) {
		log.info("[ELIMINAR ALMACEN][CONTROLLER][INICIO]");
		OutResponse<?> out = almacenService.eliminarAlmacen(c);
		log.info("[ELIMINAR ALMACEN][CONTROLLER][FIN]");
		return out;
	}

	@PostMapping("/registrarEstante")
	public OutResponse<AlmacenEstanteRegistrarResponse> registrarEstante(
			@RequestBody AlmacenEstanteRegistrarRequest c) {
		log.info("[REGISTRAR ESTANTE][CONTROLLER][INICIO]");
		OutResponse<AlmacenEstanteRegistrarResponse> out = almacenService.registrarEstante(c);
		log.info("[REGISTRAR ESTANTE][CONTROLLER][FIN]");
		return out;
	}

	@PostMapping("/modificarEstante")
	public OutResponse<?> modificarEstante(@RequestBody AlmacenEstanteModificarRequest c) {
		log.info("[MODIFICAR ESTANTE][CONTROLLER][INICIO]");
		OutResponse<?> out = almacenService.modificarEstante(c);
		log.info("[MODIFICAR ESTANTE][CONTROLLER][FIN]");
		return out;
	}

	@PostMapping("/listarEstante")
	public OutResponse<List<AlmacenEstanteListarResponse>> listarEstante(@RequestBody AlmacenEstanteListarRequest c) {
		log.info("[REGISTRAR ESTANTE][CONTROLLER][INICIO]");
		OutResponse<List<AlmacenEstanteListarResponse>> out = almacenService.listarEstante(c);
		log.info("[REGISTRAR ESTANTE][CONTROLLER][FIN]");
		return out;
	}

	@PostMapping("/eliminarEstante")
	public OutResponse<?> eliminarEstante(@RequestBody AlmacenEstanteEliminarRequest c) {
		log.info("[ELIMINAR ESTANTE][CONTROLLER][INICIO]");
		OutResponse<?> out = almacenService.eliminarEstante(c);
		log.info("[ELIMINAR ESTANTE][CONTROLLER][FIN]");
		return out;
	}
}
