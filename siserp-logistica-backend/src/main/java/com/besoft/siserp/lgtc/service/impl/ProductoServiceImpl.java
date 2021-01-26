package com.besoft.siserp.lgtc.service.impl;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.besoft.siserp.lgtc.dao.ProductoDao;
import com.besoft.siserp.lgtc.dto.OutResponse;
import com.besoft.siserp.lgtc.dto.request.ProductoBuscarRequest;
import com.besoft.siserp.lgtc.dto.request.ProductoCargarExcelDetRequest;
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
import com.besoft.siserp.lgtc.util.ConstanteUtil;
import com.besoft.siserp.lgtc.util.NumberUtil;

@Service
public class ProductoServiceImpl implements ProductoService {

	Logger log = LoggerFactory.getLogger(ProductoServiceImpl.class);

	@Autowired
	ProductoDao productoDao;

	@Override
	public OutResponse<List<ProductoListarResponse>> listarProducto(ProductoListarRequest req) {
		log.info("[LISTAR PRODUCTO][SERVICE][INICIO]");
		OutResponse<List<ProductoListarResponse>> out = productoDao.listarProducto(req);
		log.info("[LISTAR PRODUCTO][SERVICE][FIN]");
		return out;
	}

	@Override
	public OutResponse<ProductoRegistrarResponse> registrarProducto(ProductoRegistrarRequest p) {
		log.info("[REGISTRAR PRODUCTO][SERVICE][INICIO]");
		OutResponse<ProductoRegistrarResponse> out = productoDao.registrarProducto(p);
		log.info("[REGISTRAR PRODUCTO][SERVICE][FIN]");
		return out;
	}

	@Override
	public OutResponse<ProductoModificarResponse> actualizarProducto(ProductoModificarRequest p) {
		log.info("[MODIFICAR PRODUCTO][SERVICE][INICIO]");
		OutResponse<ProductoModificarResponse> out = productoDao.actualizarProducto(p);
		log.info("[MODIFICAR PRODUCTO][SERVICE][FIN]");
		return out;
	}

	@Override
	public OutResponse<?> eliminarProducto(ProductoEliminarRequest p) {
		log.info("[ELIMINAR PRODUCTO][SERVICE][INICIO]");
		OutResponse<?> out = productoDao.eliminarProducto(p);
		log.info("[ELIMINAR PRODUCTO][SERVICE][FIN]");
		return out;
	}

	@Override
	public OutResponse<List<ProductoListarResponse>> buscarProducto(ProductoBuscarRequest req) {
		log.info("[BUSCAR PRODUCTO][SERVICE][INICIO]");
		OutResponse<List<ProductoListarResponse>> out = productoDao.buscarProducto(req);
		log.info("[BUSCAR PRODUCTO][SERVICE][FIN]");
		return out;
	}

	@Override
	public OutResponse<ProductoCargarExcelResponse> cargarProductoDesdeExcel(ProductoCargarExcelRequest req) {
		log.info("[CARGAR PRODUCTO DESDE EXCEL][SERVICE][INICIO]");
		OutResponse<ProductoCargarExcelResponse> entity = productoDao.cargarProductoDesdeExcel(req, listaProductosToString(req));
		log.info("[CARGAR PRODUCTO DESDE EXCEL][SERVICE][FIN]");
		return entity;
//		OutResponse<List<ProductoCargarExcelResponse>> out = new OutResponse<>();
//		List<ProductoCargarExcelResponse> lista = new ArrayList<>();
//		try {
//			// HSSFWorkbook wb = new HSSFWorkbook(new FileInputStream("data.xls"));
//			HSSFWorkbook wb = new HSSFWorkbook(file.getInputStream());
//			HSSFSheet sheet = wb.getSheetAt(0);
//
//			int rows = sheet.getLastRowNum();
//			for (int i = 1; i < rows; ++i) {
//				HSSFRow row = sheet.getRow(i);
//
//				Integer id = ExcelUtil.getInt(row.getCell(0));
//				String marca = ExcelUtil.getString(row.getCell(1));
//				Long idtUnidadMedida = ExcelUtil.getLong(row.getCell(2));
//				String codigo = ExcelUtil.getString(row.getCell(4));
//				String nombre = ExcelUtil.getString(row.getCell(5));
//				String descripcion = ExcelUtil.getString(row.getCell(6));
//				Double cantidad = ExcelUtil.getDouble(row.getCell(7));
//				Double precio = ExcelUtil.getDouble(row.getCell(8));
//
//				ProductoCargarExcelResponse res = new ProductoCargarExcelResponse();
//				res.setPosicion(i);
//				res.setError(nombre + "  " + marca);
//				lista.add(res);
//			}
//			out.setObjeto(lista);
//			out.setRCodigo(0);
//			out.setRMensaje("EXITO");
//		} catch (Exception e) {
//			out.setRCodigo(1);
//			out.setRMensaje(e.getMessage());
//		}
//
//		return out;
	}
	
	public String listaProductosToString(ProductoCargarExcelRequest c) {
		log.info("[CARGAR PRODUCTO DESDE EXCEL][SERVICE][CONVERSION DETALLE][INICIO]");
		String listaProducto = "";
		if (c.getListaProducto().size() > 0) {
			log.info("[CARGAR PRODUCTO DESDE EXCEL][SERVICE][CONVERSION DETALLE][CANT:" + c.getListaProducto().size() + "]");
			for (ProductoCargarExcelDetRequest rc : c.getListaProducto()) {
				listaProducto = listaProducto 
						+ ((rc.getMarca() != null) ? rc.getMarca() : ConstanteUtil.MARCA_GENERICO) + "," 
						+ ((rc.getIdtUnidadMedida() != null) ? rc.getIdtUnidadMedida() : "0") + ","
						+ ((rc.getCodigo() != null) ? rc.getCodigo() : ConstanteUtil.MARCA_GENERICO) + ","
						+ ((rc.getNombre() != null) ? rc.getNombre() : ConstanteUtil.NOM_GENERICO) + ","
						+ ((rc.getDescripcion() != null) ? rc.getDescripcion() : ConstanteUtil.DESC_GENERICO) + ","
						+ ((rc.getCantidad() != null) ? NumberUtil.doubleToString(rc.getCantidad(), ConstanteUtil.separadorPunto, ConstanteUtil.formato1Decimal) : "0.0") + ","
						+ ((rc.getPrecio() != null) ? NumberUtil.doubleToString(rc.getPrecio(), ConstanteUtil.separadorPunto, ConstanteUtil.formato2Decimal) : "0.00") + "|";
			}
			listaProducto = listaProducto.substring(0, listaProducto.length() - 1);
			log.info("[CARGAR PRODUCTO DESDE EXCEL][SERVICE][CONVERSION DETALLE][" + listaProducto + "]");
		} else {
			log.info("[CARGAR PRODUCTO DESDE EXCEL][SERVICE][CONVERSION DETALLE][CANT:" + c.getListaProducto().size() + "]");
		}
		return listaProducto;
	}

}
