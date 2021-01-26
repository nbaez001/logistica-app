package com.besoft.siserp.lgtc.dao;

import java.util.List;

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

public interface CompraDao {

	public OutResponse<CompraRegistrarResponse> registrarCompra(CompraRegistrarRequest c, String detalleCompra);

	public OutResponse<?> modificarCompra(CompraModificarRequest c, String detalleCompra);

	public OutResponse<List<CompraListarResponse>> listarCompra(CompraListarRequest req);

	public OutResponse<?> eliminarCompra(CompraEliminarRequest c);

	public OutResponse<CompraBuscarReponse> buscarCompra(CompraBuscarRequest req);

	public OutResponse<List<CompraProveedorBuscarResponse>> buscarProveedor(CompraProveedorBuscarRequest req);

	public OutResponse<List<CompraProductoBuscarResponse>> buscarProducto(CompraProductoBuscarRequest req);
}
