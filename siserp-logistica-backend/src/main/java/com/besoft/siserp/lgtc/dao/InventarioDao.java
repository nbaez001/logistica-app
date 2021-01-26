package com.besoft.siserp.lgtc.dao;

import java.util.List;

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

public interface InventarioDao {

	public OutResponse<?> inventariarCompra(InventarioInventariarCompraRequest c, String detalleInventario);

	public OutResponse<List<InventarioUbicarProductoResponse>> buscarUbicacionProducto(
			InventarioUbicarProductoRequest c);

	public OutResponse<InventarioBuscarCompraResponse> buscarCompra(InventarioBuscarCompraRequest c);

	public OutResponse<List<InventarioAlmacenListarResponse>> listarAlmacen();

	public OutResponse<List<InventarioEstanteListarResponse>> listarEstante(InventarioEstanteListarRequest c);

	public OutResponse<InventarioBuscarInventCompraResponse> buscarInventarioCompra(
			InventarioBuscarInventCompraRequest c);

	public OutResponse<List<InventarioCodigoBarraListarResponse>> listaCodigoBarra(
			InventarioCodigoBarraListarRequest c);

	public OutResponse<?> modificarInventarioCompra(InventarioModificarCompraRequest c, String detalleInventario);

	public OutResponse<List<InventarioListarResponse>> listarInventario(InventarioListarRequest c);

	public OutResponse<List<InventarioBuscarResponse>> buscarIventXNombre(InventarioBuscarXNombreRequest c);

	public OutResponse<InventarioBuscarResponse> buscarIventXCodigo(InventarioBuscarXCodigoRequest c);
}
