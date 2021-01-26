package com.besoft.siserp.lgtc.dao;

import java.util.List;

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

public interface ProductoDao {

	public OutResponse<List<ProductoListarResponse>> listarProducto(ProductoListarRequest req);

	public OutResponse<ProductoRegistrarResponse> registrarProducto(ProductoRegistrarRequest p);

	public OutResponse<ProductoModificarResponse> actualizarProducto(ProductoModificarRequest p);

	public OutResponse<?> eliminarProducto(ProductoEliminarRequest p);

	public OutResponse<List<ProductoListarResponse>> buscarProducto(ProductoBuscarRequest req);

	public OutResponse<ProductoCargarExcelResponse> cargarProductoDesdeExcel(ProductoCargarExcelRequest req,
			String listaProducto);
}
