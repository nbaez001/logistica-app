package com.besoft.siserp.lgtc.service.impl;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.besoft.siserp.lgtc.dao.InventarioDao;
import com.besoft.siserp.lgtc.dto.OutResponse;
import com.besoft.siserp.lgtc.dto.request.InventarioBuscarCompraRequest;
import com.besoft.siserp.lgtc.dto.request.InventarioBuscarInventCompraRequest;
import com.besoft.siserp.lgtc.dto.request.InventarioBuscarXCodigoRequest;
import com.besoft.siserp.lgtc.dto.request.InventarioBuscarXNombreRequest;
import com.besoft.siserp.lgtc.dto.request.InventarioCodigoBarraDetModificarRequest;
import com.besoft.siserp.lgtc.dto.request.InventarioCodigoBarraDetRequest;
import com.besoft.siserp.lgtc.dto.request.InventarioCodigoBarraListarRequest;
import com.besoft.siserp.lgtc.dto.request.InventarioEstanteListarRequest;
import com.besoft.siserp.lgtc.dto.request.InventarioInventariarCompraDetRequest;
import com.besoft.siserp.lgtc.dto.request.InventarioInventariarCompraRequest;
import com.besoft.siserp.lgtc.dto.request.InventarioListarRequest;
import com.besoft.siserp.lgtc.dto.request.InventarioModificarCompraDetRequest;
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
import com.besoft.siserp.lgtc.util.ConstanteUtil;
import com.besoft.siserp.lgtc.util.NumberUtil;

@Service
public class InventarioServiceImpl implements InventarioService {

	Logger log = LoggerFactory.getLogger(InventarioServiceImpl.class);

	@Autowired
	InventarioDao inventarioDao;

	@Override
	public OutResponse<?> inventariarCompra(InventarioInventariarCompraRequest c) {
		log.info("[INVENTARIAR COMPRA][SERVICE][INICIO]");
		OutResponse<?> entity = inventarioDao.inventariarCompra(c, detInventarioCompraToString(c));
		log.info("[INVENTARIAR COMPRA][SERVICE][FIN]");
		return entity;
	}

	@Override
	public OutResponse<List<InventarioUbicarProductoResponse>> buscarUbicacionProducto(
			InventarioUbicarProductoRequest c) {
		log.info("[BUSCAR UBICACION PRODUCTO][SERVICE][INICIO]");
		OutResponse<List<InventarioUbicarProductoResponse>> entity = inventarioDao.buscarUbicacionProducto(c);
		log.info("[BUSCAR UBICACION PRODUCTO][SERVICE][FIN]");
		return entity;
	}

	@Override
	public OutResponse<InventarioBuscarCompraResponse> buscarCompra(InventarioBuscarCompraRequest c) {
		log.info("[BUSCAR COMPRA][SERVICE][INICIO]");
		OutResponse<InventarioBuscarCompraResponse> entity = inventarioDao.buscarCompra(c);
		log.info("[BUSCAR COMPRA][SERVICE][FIN]");
		return entity;
	}

	public String detInventarioCompraToString(InventarioInventariarCompraRequest c) {
		log.info("[INVENTARIAR COMPRA][SERVICE][CONVERSION DETALLE][INICIO]");
		String detInventario = "";
		if (c.getListaDetalleInventario().size() > 0) {
			log.info("[INVENTARIAR COMPRA][SERVICE][CONVERSION DETALLE][CANT:" + c.getListaDetalleInventario().size() + "]");
			for (InventarioInventariarCompraDetRequest rc : c.getListaDetalleInventario()) {
				String codBarras = "";
				if (rc.getListaCodigoBarra().size() > 0) {
					for (InventarioCodigoBarraDetRequest cb : rc.getListaCodigoBarra()) {
						codBarras += cb.getCodigo() + "*";
					}
					codBarras = codBarras.substring(0, codBarras.length() - 1);
				}
				detInventario = detInventario 
						+ ((rc.getIdDetalleCompra() != null) ? rc.getIdDetalleCompra() : "0") + "," 
						+ ((rc.getIdProducto() != null) ? rc.getIdProducto() : "0") + ","
						+ ((rc.getIdEstante() != null) ? rc.getIdEstante() : "0") + ","
						+ ((rc.getCantidad() != null) ? NumberUtil.doubleToString(rc.getCantidad(), ConstanteUtil.separadorPunto, ConstanteUtil.formato1Decimal) : "0.0") + ","
						+ ((rc.getPrecio() != null) ? NumberUtil.doubleToString(rc.getPrecio(), ConstanteUtil.separadorPunto, ConstanteUtil.formato2Decimal) : "0.00") + "," 
						+ codBarras + "|";
			}
			detInventario = detInventario.substring(0, detInventario.length() - 1);
			log.info("[INVENTARIAR COMPRA][SERVICE][CONVERSION DETALLE][" + detInventario + "]");
		} else {
			log.info("[INVENTARIAR COMPRA][SERVICE][CONVERSION DETALLE][CANT:" + c.getListaDetalleInventario().size() + "]");
		}
		return detInventario;
	}

	@Override
	public OutResponse<List<InventarioAlmacenListarResponse>> listarAlmacen() {
		log.info("[LISTAR ALMACEN][SERVICE][INICIO]");
		OutResponse<List<InventarioAlmacenListarResponse>> entity = inventarioDao.listarAlmacen();
		log.info("[LISTAR ALMACEN][SERVICE][FIN]");
		return entity;
	}

	@Override
	public OutResponse<List<InventarioEstanteListarResponse>> listarEstante(InventarioEstanteListarRequest c) {
		log.info("[LISTAR ESTANTE][SERVICE][INICIO]");
		OutResponse<List<InventarioEstanteListarResponse>> entity = inventarioDao.listarEstante(c);
		log.info("[LISTAR ESTANTE][SERVICE][FIN]");
		return entity;
	}

	@Override
	public OutResponse<InventarioBuscarInventCompraResponse> buscarInventarioCompra(
			InventarioBuscarInventCompraRequest c) {
		log.info("[BUSCAR INVENTARIO COMPRA][CONTROLLER][INICIO]");
		OutResponse<InventarioBuscarInventCompraResponse> entity = inventarioDao.buscarInventarioCompra(c);
		log.info("[BUSCAR INVENTARIO COMPRA][CONTROLLER][FIN]");
		return entity;
	}

	@Override
	public OutResponse<List<InventarioCodigoBarraListarResponse>> listaCodigoBarra(
			InventarioCodigoBarraListarRequest c) {
		log.info("[LISTAR CODIGO BARRA][CONTROLLER][INICIO]");
		OutResponse<List<InventarioCodigoBarraListarResponse>> entity = inventarioDao.listaCodigoBarra(c);
		log.info("[LISTAR CODIGO BARRA][CONTROLLER][FIN]");
		return entity;
	}

	@Override
	public OutResponse<?> modificarInventarioCompra(InventarioModificarCompraRequest c) {
		log.info("[MODIFICAR INVENTARIO COMPRA][CONTROLLER][INICIO]");
		OutResponse<?> entity = inventarioDao.modificarInventarioCompra(c,detInventarioCompraModifToString(c));
		log.info("[MODIFICAR INVENTARIO COMPRA][CONTROLLER][FIN]");
		return entity;
	}

	public String detInventarioCompraModifToString(InventarioModificarCompraRequest c) {
		log.info("[MODIFICAR INVENTARIO COMPRA][SERVICE][CONVERSION DETALLE][INICIO]");
		String detInventario = "";
		if (c.getListaDetalleInventario().size() > 0) {
			log.info("[MODIFICAR INVENTARIO COMPRA][SERVICE][CONVERSION DETALLE][CANT:" + c.getListaDetalleInventario().size() + "]");
			for (InventarioModificarCompraDetRequest rc : c.getListaDetalleInventario()) {
				String codBarras = "";
				for(InventarioCodigoBarraDetModificarRequest cbx: rc.getListaCodigoBarraElim()) {
					rc.getListaCodigoBarra().add(cbx);
				}
				
				if (rc.getListaCodigoBarra().size() > 0) {
					for (InventarioCodigoBarraDetModificarRequest cb : rc.getListaCodigoBarra()) {
						codBarras = codBarras 
								+ ((cb.getId() != null) ? cb.getId() : "0") + "#"  
								+ ((cb.getCodigo() != null) ? cb.getCodigo() : "0000000000000") + "#"
								+ ((cb.getFlagActivo() != null) ? cb.getFlagActivo() : "0") + "*";
					}
					codBarras = codBarras.substring(0, codBarras.length() - 1);
				}
				detInventario = detInventario 
						+ ((rc.getIdDetCompraEstante() != null) ? rc.getIdDetCompraEstante() : "0") + ","
						+ ((rc.getIdEstante() != null) ? rc.getIdEstante() : "0") + ","
						+ ((rc.getIdInventario() != null) ? rc.getIdInventario() : "0") + ","
						+ ((rc.getIdProducto() != null) ? rc.getIdProducto() : "0") + ","
						+ ((rc.getCantidad() != null) ? NumberUtil.doubleToString(rc.getCantidad(), ConstanteUtil.separadorPunto, ConstanteUtil.formato1Decimal) : "0.0") + ","
						+ ((rc.getPrecio() != null) ? NumberUtil.doubleToString(rc.getPrecio(), ConstanteUtil.separadorPunto, ConstanteUtil.formato2Decimal) : "0.00") + "," 
						+ codBarras + "|";
			}
			detInventario = detInventario.substring(0, detInventario.length() - 1);
			log.info("[MODIFICAR INVENTARIO COMPRA][SERVICE][CONVERSION DETALLE][" + detInventario + "]");
		} else {
			log.info("[MODIFICAR INVENTARIO COMPRA][SERVICE][CONVERSION DETALLE][CANT:" + c.getListaDetalleInventario().size() + "]");
		}
		return detInventario;
	}

	@Override
	public OutResponse<List<InventarioListarResponse>> listarInventario(InventarioListarRequest c) {
		log.info("[LISTAR INVENTARIO][SERVICE][INICIO]");
		OutResponse<List<InventarioListarResponse>> entity = inventarioDao.listarInventario(c);
		log.info("[LISTAR INVENTARIO][SERVICE][FIN]");
		return entity;
	}

	@Override
	public OutResponse<List<InventarioBuscarResponse>> buscarIventXNombre(InventarioBuscarXNombreRequest c) {
		log.info("[BUSCAR INVENTARIO X NOMBRE][CONTROLLER][INICIO]");
		OutResponse<List<InventarioBuscarResponse>> entity = inventarioDao.buscarIventXNombre(c);
		log.info("[BUSCAR INVENTARIO X NOMBRE][CONTROLLER][FIN]");
		return entity;
	}

	@Override
	public OutResponse<InventarioBuscarResponse> buscarIventXCodigo(InventarioBuscarXCodigoRequest c) {
		log.info("[BUSCAR INVENTARIO X CODIGO][CONTROLLER][INICIO]");
		OutResponse<InventarioBuscarResponse> entity = inventarioDao.buscarIventXCodigo(c);
		log.info("[BUSCAR INVENTARIO X CODIGO][CONTROLLER][FIN]");
		return entity;
	}

}
