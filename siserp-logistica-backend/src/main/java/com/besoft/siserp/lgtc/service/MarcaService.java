package com.besoft.siserp.lgtc.service;

import java.util.List;

import com.besoft.siserp.lgtc.dto.OutResponse;
import com.besoft.siserp.lgtc.dto.request.MarcaEliminarRequest;
import com.besoft.siserp.lgtc.dto.request.MarcaListarRequest;
import com.besoft.siserp.lgtc.dto.request.MarcaModificarRequest;
import com.besoft.siserp.lgtc.dto.request.MarcaRegistrarRequest;
import com.besoft.siserp.lgtc.dto.response.MarcaListarResponse;
import com.besoft.siserp.lgtc.dto.response.MarcaRegistrarResponse;

public interface MarcaService {

	public OutResponse<MarcaRegistrarResponse> registrarMarca(MarcaRegistrarRequest c);

	public OutResponse<?> modificarMarca(MarcaModificarRequest c);

	public OutResponse<List<MarcaListarResponse>> listarMarca(MarcaListarRequest c);
	
	public OutResponse<?> eliminarMarca(MarcaEliminarRequest c);
}
