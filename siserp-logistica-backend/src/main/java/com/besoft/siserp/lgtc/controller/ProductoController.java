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
import com.besoft.siserp.lgtc.dto.request.ProductoBuscarRequest;
import com.besoft.siserp.lgtc.dto.request.ProductoCargarExcelRequest;
import com.besoft.siserp.lgtc.dto.request.ProductoEliminarRequest;
import com.besoft.siserp.lgtc.dto.request.ProductoListarRequest;
import com.besoft.siserp.lgtc.dto.request.ProductoModificarRequest;
import com.besoft.siserp.lgtc.dto.request.ProductoRegistrarRequest;
import com.besoft.siserp.lgtc.dto.response.ProductoCargarExcelResponse;
import com.besoft.siserp.lgtc.dto.response.ProductoListarResponse;
import com.besoft.siserp.lgtc.dto.response.ProductoModificarResponse;
import com.besoft.siserp.lgtc.dto.response.ProductoRegistrarResponse;
import com.besoft.siserp.lgtc.service.ProductoService;

import io.swagger.annotations.Api;

@RestController
@RequestMapping("/producto")
@Api(value = "API Producto")
public class ProductoController {

	Logger log = LoggerFactory.getLogger(MarcaController.class);

	@Autowired
	ProductoService productoService;

	@PostMapping("/listarProducto")
	public OutResponse<List<ProductoListarResponse>> listarProducto(@RequestBody ProductoListarRequest req) {
		log.info("[LISTAR PRODUCTO][CONTROLLER][INICIO]");
		OutResponse<List<ProductoListarResponse>> entity = productoService.listarProducto(req);
		log.info("[LISTAR PRODUCTO][CONTROLLER][FIN]");
		return entity;
	}

	@PostMapping("/registrarProducto")
	public OutResponse<ProductoRegistrarResponse> registrarProducto(@RequestBody ProductoRegistrarRequest p) {
		log.info("[REGISTRAR PRODUCTO][CONTROLLER][INICIO]");
		OutResponse<ProductoRegistrarResponse> entity = productoService.registrarProducto(p);
		log.info("[REGISTRAR PRODUCTO][CONTROLLER][FIN]");
		return entity;
	}

	@PostMapping("/actualizarProducto")
	public OutResponse<ProductoModificarResponse> actualizarProducto(@RequestBody ProductoModificarRequest p) {
		log.info("[MODIFICAR PRODUCTO][CONTROLLER][INICIO]");
		OutResponse<ProductoModificarResponse> entity = productoService.actualizarProducto(p);
		log.info("[MODIFICAR PRODUCTO][CONTROLLER][FIN]");
		return entity;
	}

	@PostMapping("/eliminarProducto")
	public OutResponse<?> eliminarProducto(@RequestBody ProductoEliminarRequest p) {
		log.info("[ELIMINAR PRODUCTO][CONTROLLER][INICIO]");
		OutResponse<?> entity = productoService.eliminarProducto(p);
		log.info("[ELIMINAR PRODUCTO][CONTROLLER][FIN]");
		return entity;
	}

	@PostMapping("/buscarProducto")
	public OutResponse<List<ProductoListarResponse>> buscarProducto(@RequestBody ProductoBuscarRequest p) {
		log.info("[BUSCAR PRODUCTO][CONTROLLER][INICIO]");
		OutResponse<List<ProductoListarResponse>> entity = productoService.buscarProducto(p);
		log.info("[BUSCAR PRODUCTO][CONTROLLER][FIN]");
		return entity;
	}

	@PostMapping("/cargarProductoDesdeExcel")
	public OutResponse<ProductoCargarExcelResponse> cargarProductoDesdeExcel(
			@RequestBody ProductoCargarExcelRequest req) {
		log.info("[CARGAR PRODUCTO DESDE EXCEL][CONTROLLER][INICIO]");
		OutResponse<ProductoCargarExcelResponse> entity = productoService.cargarProductoDesdeExcel(req);
		log.info("[CARGAR PRODUCTO DESDE EXCEL][CONTROLLER][FIN]");
		return entity;
	}

}
