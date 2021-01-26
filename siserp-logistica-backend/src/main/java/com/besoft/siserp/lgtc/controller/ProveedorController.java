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
import com.besoft.siserp.lgtc.service.ProveedorService;

import io.swagger.annotations.Api;

@RestController
@RequestMapping("/proveedor")
@Api(value = "API Proveedor")
public class ProveedorController {

	Logger log = LoggerFactory.getLogger(ProveedorController.class);

	@Autowired
	ProveedorService proveedorService;// HOLA

	@PostMapping("/listarProveedor")
	public OutResponse<List<ProveedorListarResponse>> listarProveedor(@RequestBody ProveedorListarRequest req) {
		log.info("[LISTAR PROVEEDOR][CONTROLLER][INICIO]");
		OutResponse<List<ProveedorListarResponse>> entity = proveedorService.listarProveedor(req);
		log.info("[LISTAR PROVEEDOR][CONTROLLER][FIN]");
		return entity;
	}

	@PostMapping("/registrarProveedorNatural")
	public OutResponse<ProveedorNaturalRegistrarResponse> registrarProveedor(
			@RequestBody ProveedorNaturalRegistrarRequest p) {
		log.info("[REGISTRAR PROVEEDOR NATURAL][CONTROLLER][INICIO]");
		OutResponse<ProveedorNaturalRegistrarResponse> entity = proveedorService.registrarProveedor(p);
		log.info("[REGISTRAR PROVEEDOR NATURAL][CONTROLLER][FIN]");
		return entity;
	}

	@PostMapping("/registrarProveedorJuridico")
	public OutResponse<ProveedorJuridicoRegistrarResponse> registrarProveedorJurid(
			@RequestBody ProveedorJuridicoRegistrarRequest p) {
		log.info("[REGISTRAR PROVEEDOR JURIDICO][CONTROLLER][INICIO]");
		OutResponse<ProveedorJuridicoRegistrarResponse> entity = proveedorService.registrarProveedorJurid(p);
		log.info("[REGISTRAR PROVEEDOR JURIDICO][CONTROLLER][FIN]");
		return entity;
	}

	@PostMapping("/actualizarProveedorNatural")
	public OutResponse<?> actualizarProveedorNatural(@RequestBody ProveedorNaturalModificarRequest p) {
		log.info("[MODIFICAR PROVEEDOR NATURAL][CONTROLLER][INICIO]");
		OutResponse<?> entity = proveedorService.actualizarProveedorNatural(p);
		log.info("[MODIFICAR PROVEEDOR NATURAL][CONTROLLER][FIN]");
		return entity;
	}

	@PostMapping("/actualizarProveedorJuridico")
	public OutResponse<?> actualizarProveedorJuridico(@RequestBody ProveedorJuridicoModificarRequest p) {
		log.info("[MODIFICAR PROVEEDOR JURIDICO][CONTROLLER][INICIO]");
		OutResponse<?> entity = proveedorService.actualizarProveedorJuridico(p);
		log.info("[MODIFICAR PROVEEDOR JURIDICO][CONTROLLER][FIN]");
		return entity;
	}

	@PostMapping("/eliminarProveedor")
	public OutResponse<?> eliminarProveedor(@RequestBody ProveedorEliminarRequest p) {
		log.info("[ELIMINAR PROVEEDOR][CONTROLLER][INICIO]");
		OutResponse<?> entity = proveedorService.eliminarProveedor(p);
		log.info("[ELIMINAR PROVEEDOR][CONTROLLER][FIN]");
		return entity;
	}

	@PostMapping("/registrarRepresentanteLegal")
	public OutResponse<ProveedorJuridRepLegalRegistrarResponse> registrarRepresentante(
			@RequestBody ProveedorJuridRepLegalRegistrarRequest p) {
		log.info("[REGISTRAR REP. LEGAL][CONTROLLER][INICIO]");
		OutResponse<ProveedorJuridRepLegalRegistrarResponse> entity = proveedorService.registrarRepresentante(p);
		log.info("[REGISTRAR REP. LEGAL][CONTROLLER][FIN]");
		return entity;
	}

	@PostMapping("/listarRepresentanteLegal")
	public OutResponse<List<ProveedorJuridRepLegalListarResponse>> listarRepresentante(
			@RequestBody ProveedorJuridRepLegalListarRequest p) {
		log.info("[LISTAR REP. LEGAL][CONTROLLER][INICIO]");
		OutResponse<List<ProveedorJuridRepLegalListarResponse>> entity = proveedorService.listarRepresentante(p);
		log.info("[LISTAR REP. LEGAL][CONTROLLER][FIN]");
		return entity;
	}

	@PostMapping("/obtenerRepresentanteLegal")
	public OutResponse<ProveedorJuridRepLegalBuscarResponse> obtenerRepresentanteLegal(
			@RequestBody ProveedorJuridRepLegalBuscarRequest p) {
		log.info("[MODIFICAR REP. LEGAL][CONTROLLER][INICIO]");
		OutResponse<ProveedorJuridRepLegalBuscarResponse> entity = proveedorService.obtenerRepresentanteLegal(p);
		log.info("[MODIFICAR REP. LEGAL][CONTROLLER][FIN]");
		return entity;
	}

	@PostMapping("/actualizarRepresentanteLegal")
	public OutResponse<?> actualizarRepresentanteLegal(@RequestBody ProveedorJuridRepLegalModificarRequest p) {
		log.info("[ELIMINAR REP. LEGAL][CONTROLLER][INICIO]");
		OutResponse<?> entity = proveedorService.actualizarRepresentante(p);
		log.info("[ELIMINAR REP. LEGAL][CONTROLLER][FIN]");
		return entity;
	}

	@PostMapping("/eliminarRepresentanteLegal")
	public OutResponse<?> eliminarRepresentanteLegal(@RequestBody ProveedorJuridRepLegalEliminarRequest p) {
		log.info("[BUSCAR REP. LEGAL][CONTROLLER][INICIO]");
		OutResponse<?> entity = proveedorService.eliminarRepresentante(p);
		log.info("[BUSCAR REP. LEGAL][CONTROLLER][FIN]");
		return entity;
	}

}
