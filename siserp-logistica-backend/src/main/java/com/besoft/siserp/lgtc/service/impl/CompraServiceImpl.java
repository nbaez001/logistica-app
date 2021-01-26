package com.besoft.siserp.lgtc.service.impl;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.besoft.siserp.lgtc.dao.CompraDao;
import com.besoft.siserp.lgtc.dto.OutResponse;
import com.besoft.siserp.lgtc.dto.request.CompraBuscarRequest;
import com.besoft.siserp.lgtc.dto.request.CompraEliminarRequest;
import com.besoft.siserp.lgtc.dto.request.CompraListarRequest;
import com.besoft.siserp.lgtc.dto.request.CompraModificarDetalleRequest;
import com.besoft.siserp.lgtc.dto.request.CompraModificarRequest;
import com.besoft.siserp.lgtc.dto.request.CompraProductoBuscarRequest;
import com.besoft.siserp.lgtc.dto.request.CompraProveedorBuscarRequest;
import com.besoft.siserp.lgtc.dto.request.CompraRegistrarDetalleRequest;
import com.besoft.siserp.lgtc.dto.request.CompraRegistrarRequest;
import com.besoft.siserp.lgtc.dto.response.CompraBuscarReponse;
import com.besoft.siserp.lgtc.dto.response.CompraListarResponse;
import com.besoft.siserp.lgtc.dto.response.CompraProductoBuscarResponse;
import com.besoft.siserp.lgtc.dto.response.CompraProveedorBuscarResponse;
import com.besoft.siserp.lgtc.dto.response.CompraRegistrarResponse;
import com.besoft.siserp.lgtc.service.CompraService;
import com.besoft.siserp.lgtc.util.ConstanteUtil;
import com.besoft.siserp.lgtc.util.NumberUtil;

@Service
public class CompraServiceImpl implements CompraService {

	Logger log = LoggerFactory.getLogger(CompraServiceImpl.class);

	@Autowired
	CompraDao compraDao;

	@Override
	public OutResponse<CompraRegistrarResponse> registrarCompra(CompraRegistrarRequest c) {
		log.info("[REGISTRAR COMPRA][SERVICE][INICIO]");
		OutResponse<CompraRegistrarResponse> entity = compraDao.registrarCompra(c, detCompraRegistrarToString(c));
		log.info("[REGISTRAR COMPRA][SERVICE][FIN]");
		return entity;
	}

	@Override
	public OutResponse<?> modificarCompra(CompraModificarRequest c) {
		log.info("[MODIFICAR COMPRA][SERVICE][INICIO]");
		OutResponse<?> entity = compraDao.modificarCompra(c, detCompraModificarToString(c));
		log.info("[MODIFICAR COMPRA][SERVICE][FIN]");
		return entity;
	}

	@Override
	public OutResponse<List<CompraListarResponse>> listarCompra(CompraListarRequest req) {
		log.info("[LISTAR COMPRA][SERVICE][INICIO]");
		OutResponse<List<CompraListarResponse>> entity = compraDao.listarCompra(req);
		log.info("[LISTAR COMPRA][SERVICE][INICIO]");
		return entity;
	}

	@Override
	public OutResponse<?> eliminarCompra(CompraEliminarRequest c) {
		log.info("[ELIMINAR COMPRA][SERVICE][INICIO]");
		OutResponse<?> entity = compraDao.eliminarCompra(c);
		log.info("[ELIMINAR COMPRA][SERVICE][INICIO]");
		return entity;
	}

	@Override
	public OutResponse<CompraBuscarReponse> buscarCompra(CompraBuscarRequest req) {
		log.info("[BUSCAR COMPRA][SERVICE][INICIO]");
		OutResponse<CompraBuscarReponse> entity = compraDao.buscarCompra(req);
		log.info("[BUSCAR COMPRA][SERVICE][FIN]");
		return entity;
	}

	@Override
	public OutResponse<List<CompraProveedorBuscarResponse>> buscarProveedor(CompraProveedorBuscarRequest req) {
		log.info("[BUSCAR PROVEEDOR][SERVICE][INICIO]");
		OutResponse<List<CompraProveedorBuscarResponse>> entity = compraDao.buscarProveedor(req);
		log.info("[BUSCAR PROVEEDOR][SERVICE][FIN]");
		return entity;
	}

	@Override
	public OutResponse<List<CompraProductoBuscarResponse>> buscarProducto(CompraProductoBuscarRequest req) {
		log.info("[BUSCAR PRODUCTO][SERVICE][INICIO]");
		OutResponse<List<CompraProductoBuscarResponse>> entity = compraDao.buscarProducto(req);
		log.info("[BUSCAR PRODUCTO][SERVICE][FIN]");
		return entity;
	}
	
	public String detCompraRegistrarToString(CompraRegistrarRequest c) {
		log.info("[REGISTRAR COMPRA][SERVICE][CONVERSION DETALLE][INICIO]");
		String detCompra = "";
		if (c.getListaDetalleCompra().size() > 0) {
			log.info("[REGISTRAR COMPRA][SERVICE][CONVERSION DETALLE][CANT:"+ c.getListaDetalleCompra().size() +"]");
			for (CompraRegistrarDetalleRequest rc : c.getListaDetalleCompra()) {
				detCompra = detCompra 
						+ ((rc.getIdProducto() != null) ? rc.getIdProducto() : "0") + ","
						+ ((rc.getCantidad() != null) ? NumberUtil.doubleToString(rc.getCantidad(), ConstanteUtil.separadorPunto, ConstanteUtil.formato1Decimal) : "0.0") + ","
						+ ((rc.getCantidadPerfecto() != null) ? NumberUtil.doubleToString(rc.getCantidadPerfecto(), ConstanteUtil.separadorPunto, ConstanteUtil.formato1Decimal) : "0.0") + ","
						+ ((rc.getCantidadDaniado() != null) ? NumberUtil.doubleToString(rc.getCantidadDaniado(), ConstanteUtil.separadorPunto, ConstanteUtil.formato1Decimal) : "0.0") + ","
						+ ((rc.getPrecioUnitario() != null) ? NumberUtil.doubleToString(rc.getPrecioUnitario(), ConstanteUtil.separadorPunto, ConstanteUtil.formato2Decimal) : "0.00") + ","
						+ ((rc.getSubTotal() != null) ? NumberUtil.doubleToString(rc.getSubTotal(), ConstanteUtil.separadorPunto, ConstanteUtil.formato2Decimal)  : "0.00") + "|";

			}
			detCompra = detCompra.substring(0, detCompra.length() - 1);
			log.info("[REGISTRAR COMPRA][SERVICE][CONVERSION DETALLE][" + detCompra + "]");
		}else {
			log.info("[REGISTRAR COMPRA][SERVICE][CONVERSION DETALLE][CANT:"+ c.getListaDetalleCompra().size() +"]");
		}
		return detCompra;
	}
	
	public String detCompraModificarToString(CompraModificarRequest c) {
		log.info("[MODIFICAR COMPRA][SERVICE][CONVERSION DETALLE][INICIO]");
		String detCompra = "";
		if (c.getListaDetalleCompra().size() > 0) {
			log.info("[MODIFICAR COMPRA][SERVICE][CONVERSION DETALLE][CANT:"+ c.getListaDetalleCompra().size() +"]");
			for (CompraModificarDetalleRequest rc : c.getListaDetalleCompra()) {
				detCompra = detCompra 
						+ ((rc.getId() != null) ? rc.getId() : "0") + ","
						+ ((rc.getIdProducto() != null) ? rc.getIdProducto() : "0") + ","
						+ ((rc.getCantidad() != null) ? NumberUtil.doubleToString(rc.getCantidad(), ConstanteUtil.separadorPunto, ConstanteUtil.formato1Decimal) : "0.0") + ","
						+ ((rc.getCantidadPerfecto() != null) ? NumberUtil.doubleToString(rc.getCantidadPerfecto(), ConstanteUtil.separadorPunto, ConstanteUtil.formato1Decimal) : "0.0") + ","
						+ ((rc.getCantidadDaniado() != null) ? NumberUtil.doubleToString(rc.getCantidadDaniado(), ConstanteUtil.separadorPunto, ConstanteUtil.formato1Decimal) : "0.0") + ","
						+ ((rc.getPrecioUnitario() != null) ? NumberUtil.doubleToString(rc.getPrecioUnitario(), ConstanteUtil.separadorPunto, ConstanteUtil.formato2Decimal) : "0.00") + ","
						+ ((rc.getSubTotal() != null) ? NumberUtil.doubleToString(rc.getSubTotal(), ConstanteUtil.separadorPunto, ConstanteUtil.formato2Decimal)  : "0.00") + ","
						+ ((rc.getFlagActivo() != null) ? rc.getFlagActivo() : "0") + "|";
			}
			detCompra = detCompra.substring(0, detCompra.length() - 1);
			log.info("[MODIFICAR COMPRA][SERVICE][CONVERSION DETALLE][" + detCompra + "]");
		}else {
			log.info("[MODIFICAR COMPRA][SERVICE][CONVERSION DETALLE][CANT:"+ c.getListaDetalleCompra().size() +"]");
		}
		return detCompra;
	}

}