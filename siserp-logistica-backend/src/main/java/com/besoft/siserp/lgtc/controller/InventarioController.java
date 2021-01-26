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
import com.besoft.siserp.lgtc.dto.request.InventarioBuscarCompraRequest;
import com.besoft.siserp.lgtc.dto.request.InventarioBuscarInventCompraRequest;
import com.besoft.siserp.lgtc.dto.request.InventarioBuscarXCodigoRequest;
import com.besoft.siserp.lgtc.dto.request.InventarioBuscarXNombreRequest;
import com.besoft.siserp.lgtc.dto.request.InventarioCodigoBarraListarRequest;
import com.besoft.siserp.lgtc.dto.request.InventarioEstanteListarRequest;
import com.besoft.siserp.lgtc.dto.request.InventarioInventariarCompraRequest;
import com.besoft.siserp.lgtc.dto.request.InventarioListarRequest;
import com.besoft.siserp.lgtc.dto.request.InventarioModificarCompraRequest;
import com.besoft.siserp.lgtc.dto.request.InventarioUbicarProductoRequest;
import com.besoft.siserp.lgtc.dto.response.InventarioAlmacenListarResponse;
import com.besoft.siserp.lgtc.dto.response.InventarioBuscarCompraResponse;
import com.besoft.siserp.lgtc.dto.response.InventarioBuscarInventCompraResponse;
import com.besoft.siserp.lgtc.dto.response.InventarioBuscarResponse;
import com.besoft.siserp.lgtc.dto.response.InventarioCodigoBarraListarResponse;
import com.besoft.siserp.lgtc.dto.response.InventarioEstanteListarResponse;
import com.besoft.siserp.lgtc.dto.response.InventarioListarResponse;
import com.besoft.siserp.lgtc.dto.response.InventarioUbicarProductoResponse;
import com.besoft.siserp.lgtc.service.InventarioService;

import io.swagger.annotations.Api;

@RestController
@RequestMapping("/inventario")
@Api(value = "API Inventario")
public class InventarioController {

	Logger log = LoggerFactory.getLogger(InventarioController.class);

	@Autowired
	InventarioService inventarioService;

	@PostMapping("/inventariarCompra")
	public OutResponse<?> inventariarCompra(@RequestBody InventarioInventariarCompraRequest c) {
		log.info("[INVENTARIAR COMPRA][CONTROLLER][INICIO]");
		OutResponse<?> entity = inventarioService.inventariarCompra(c);
		log.info("[INVENTARIAR COMPRA][CONTROLLER][FIN]");
		return entity;
	}

	@PostMapping("/buscarUbicacionProducto")
	public OutResponse<List<InventarioUbicarProductoResponse>> buscarUbicacionProducto(
			@RequestBody InventarioUbicarProductoRequest c) {
		log.info("[BUSCAR UBICACION PRODUCTO][CONTROLLER][INICIO]");
		OutResponse<List<InventarioUbicarProductoResponse>> entity = inventarioService.buscarUbicacionProducto(c);
		log.info("[BUSCAR UBICACION PRODUCTO][CONTROLLER][FIN]");
		return entity;
	}

	@PostMapping("/buscarCompra")
	public OutResponse<InventarioBuscarCompraResponse> buscarCompra(@RequestBody InventarioBuscarCompraRequest c) {
		log.info("[BUSCAR COMPRA][CONTROLLER][INICIO]");
		OutResponse<InventarioBuscarCompraResponse> entity = inventarioService.buscarCompra(c);
		log.info("[BUSCAR COMPRA][CONTROLLER][FIN]");
		return entity;
	}

	@PostMapping("/listarAlmacen")
	public OutResponse<List<InventarioAlmacenListarResponse>> listarAlmacen() {
		log.info("[LISTAR ALMACEN][CONTROLLER][INICIO]");
		OutResponse<List<InventarioAlmacenListarResponse>> entity = inventarioService.listarAlmacen();
		log.info("[LISTAR ALMACEN][CONTROLLER][FIN]");
		return entity;
	}

	@PostMapping("/listarEstante")
	public OutResponse<List<InventarioEstanteListarResponse>> listarEstante(
			@RequestBody InventarioEstanteListarRequest c) {
		log.info("[LISTAR ESTANTE][CONTROLLER][INICIO]");
		OutResponse<List<InventarioEstanteListarResponse>> entity = inventarioService.listarEstante(c);
		log.info("[LISTAR ESTANTE][CONTROLLER][FIN]");
		return entity;
	}

	@PostMapping("/buscarInventarioCompra")
	public OutResponse<InventarioBuscarInventCompraResponse> buscarInventarioCompra(
			@RequestBody InventarioBuscarInventCompraRequest c) {
		log.info("[BUSCAR INVENTARIO COMPRA][CONTROLLER][INICIO]");
		OutResponse<InventarioBuscarInventCompraResponse> entity = inventarioService.buscarInventarioCompra(c);
		log.info("[BUSCAR INVENTARIO COMPRA][CONTROLLER][FIN]");
		return entity;
	}

	@PostMapping("/listaCodigoBarra")
	public OutResponse<List<InventarioCodigoBarraListarResponse>> listaCodigoBarra(
			@RequestBody InventarioCodigoBarraListarRequest c) {
		log.info("[LISTAR CODIGO BARRA][CONTROLLER][INICIO]");
		OutResponse<List<InventarioCodigoBarraListarResponse>> entity = inventarioService.listaCodigoBarra(c);
		log.info("[LISTAR CODIGO BARRA][CONTROLLER][FIN]");
		return entity;
	}

	@PostMapping("/modificarInventarioCompra")
	public OutResponse<?> modificarInventarioCompra(@RequestBody InventarioModificarCompraRequest c) {
		log.info("[MODIFICAR INVENTARIO COMPRA][CONTROLLER][INICIO]");
		OutResponse<?> entity = inventarioService.modificarInventarioCompra(c);
		log.info("[MODIFICAR INVENTARIO COMPRA][CONTROLLER][FIN]");
		return entity;
	}

	@PostMapping("/listarInventario")
	public OutResponse<List<InventarioListarResponse>> listarInventario(@RequestBody InventarioListarRequest c) {
		log.info("[LISTAR INVENTARIO][CONTROLLER][INICIO]");
		OutResponse<List<InventarioListarResponse>> entity = inventarioService.listarInventario(c);
		log.info("[LISTAR INVENTARIO][CONTROLLER][FIN]");
		return entity;
	}

	@PostMapping("/buscarIventXNombre")
	public OutResponse<List<InventarioBuscarResponse>> buscarIventXNombre(@RequestBody InventarioBuscarXNombreRequest c) {
		log.info("[BUSCAR INVENTARIO X NOMBRE][CONTROLLER][INICIO]");
		OutResponse<List<InventarioBuscarResponse>> entity = inventarioService.buscarIventXNombre(c);
		log.info("[BUSCAR INVENTARIO X NOMBRE][CONTROLLER][FIN]");
		return entity;
	}

	@PostMapping("/buscarIventXCodigo")
	public OutResponse<InventarioBuscarResponse> buscarIventXCodigo(@RequestBody InventarioBuscarXCodigoRequest c) {
		log.info("[BUSCAR INVENTARIO X CODIGO][CONTROLLER][INICIO]");
		OutResponse<InventarioBuscarResponse> entity = inventarioService.buscarIventXCodigo(c);
		log.info("[BUSCAR INVENTARIO X CODIGO][CONTROLLER][FIN]");
		return entity;
	}
}
