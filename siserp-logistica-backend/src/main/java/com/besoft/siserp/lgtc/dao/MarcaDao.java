package com.besoft.siserp.lgtc.dao;

import java.util.List;

import com.besoft.siserp.lgtc.dto.OutResponse;
import com.besoft.siserp.lgtc.dto.request.MarcaEliminarRequest;
import com.besoft.siserp.lgtc.dto.request.MarcaListarRequest;
import com.besoft.siserp.lgtc.dto.request.MarcaModificarRequest;
import com.besoft.siserp.lgtc.dto.request.MarcaRegistrarRequest;
import com.besoft.siserp.lgtc.dto.response.MarcaListarResponse;
import com.besoft.siserp.lgtc.dto.response.MarcaRegistrarResponse;

public interface MarcaDao {

	public OutResponse<MarcaRegistrarResponse> registrarMarca(MarcaRegistrarRequest r);
	
	public OutResponse<?> modificarMarca(MarcaModificarRequest r);
	
	public OutResponse<List<MarcaListarResponse>> listarMarca(MarcaListarRequest r);
	
	public OutResponse<?> eliminarMarca(MarcaEliminarRequest r);
}
