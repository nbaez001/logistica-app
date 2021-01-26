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
import com.besoft.siserp.lgtc.dto.request.CompraBuscarRequest;
import com.besoft.siserp.lgtc.dto.request.CompraEliminarRequest;
import com.besoft.siserp.lgtc.dto.request.CompraListarRequest;
import com.besoft.siserp.lgtc.dto.request.CompraModificarRequest;
import com.besoft.siserp.lgtc.dto.request.CompraProductoBuscarRequest;
import com.besoft.siserp.lgtc.dto.request.CompraProveedorBuscarRequest;
import com.besoft.siserp.lgtc.dto.request.CompraRegistrarRequest;
import com.besoft.siserp.lgtc.dto.response.CompraBuscarReponse;
import com.besoft.siserp.lgtc.dto.response.CompraListarResponse;
import com.besoft.siserp.lgtc.dto.response.CompraProductoBuscarResponse;
import com.besoft.siserp.lgtc.dto.response.CompraProveedorBuscarResponse;
import com.besoft.siserp.lgtc.dto.response.CompraRegistrarResponse;
import com.besoft.siserp.lgtc.service.CompraService;

import io.swagger.annotations.Api;

@RestController
@RequestMapping("/compra")
@Api(value = "API Compra")
public class CompraController {

	Logger log = LoggerFactory.getLogger(CompraController.class);

	@Autowired
	CompraService compraService;

	@PostMapping("/registrarCompra")
	public OutResponse<CompraRegistrarResponse> registrarCompra(@RequestBody CompraRegistrarRequest c) {
		log.info("[REGISTRAR COMPRA][CONTROLLER][INICIO]");
		OutResponse<CompraRegistrarResponse> entity = compraService.registrarCompra(c);
		log.info("[REGISTRAR COMPRA][CONTROLLER][FIN]");
		return entity;
	}

	@PostMapping("/modificarCompra")
	public OutResponse<?> modificarCompra(@RequestBody CompraModificarRequest c) {
		log.info("[MODIFICAR COMPRA][CONTROLLER][INICIO]");
		OutResponse<?> entity = compraService.modificarCompra(c);
		log.info("[MODIFICAR COMPRA][CONTROLLER][FIN]");
		return entity;
	}

	@PostMapping("/listarCompra")
	public OutResponse<List<CompraListarResponse>> listarCompra(@RequestBody CompraListarRequest req) {
		log.info("[LISTAR COMPRA][CONTROLLER][INICIO]");
		OutResponse<List<CompraListarResponse>> entity = compraService.listarCompra(req);
		log.info("[LISTAR COMPRA][CONTROLLER][INICIO]");
		return entity;
	}

	@PostMapping("/eliminarCompra")
	public OutResponse<?> eliminarCompra(@RequestBody CompraEliminarRequest c) {
		log.info("[ELIMINAR COMPRA][CONTROLLER][INICIO]");
		OutResponse<?> entity = compraService.eliminarCompra(c);
		log.info("[ELIMINAR COMPRA][CONTROLLER][INICIO]");
		return entity;
	}

	@PostMapping("/buscarCompra")
	public OutResponse<CompraBuscarReponse> buscarCompra(@RequestBody CompraBuscarRequest req) {
		log.info("[BUSCAR COMPRA][CONTROLLER][INICIO]");
		OutResponse<CompraBuscarReponse> entity = compraService.buscarCompra(req);
		log.info("[BUSCAR COMPRA][CONTROLLER][INICIO]");
		return entity;
	}

	@PostMapping("/buscarProveedor")
	public OutResponse<List<CompraProveedorBuscarResponse>> buscarProveedor(
			@RequestBody CompraProveedorBuscarRequest req) {
		log.info("[BUSCAR PROVEEDOR][CONTROLLER][INICIO]");
		OutResponse<List<CompraProveedorBuscarResponse>> entity = compraService.buscarProveedor(req);
		log.info("[BUSCAR PROVEEDOR][CONTROLLER][FIN]");
		return entity;
	}

	@PostMapping("/buscarProducto")
	public OutResponse<List<CompraProductoBuscarResponse>> buscarProducto(
			@RequestBody CompraProductoBuscarRequest req) {
		log.info("[BUSCAR PRODUCTO][CONTROLLER][INICIO]");
		OutResponse<List<CompraProductoBuscarResponse>> entity = compraService.buscarProducto(req);
		log.info("[BUSCAR PRODUCTO][CONTROLLER][FIN]");
		return entity;
	}

}