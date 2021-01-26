package com.besoft.siserp.lgtc.service;

import java.util.List;

import com.besoft.siserp.lgtc.dto.OutResponse;
import com.besoft.siserp.lgtc.dto.request.AlmacenEliminarRequest;
import com.besoft.siserp.lgtc.dto.request.AlmacenEstanteEliminarRequest;
import com.besoft.siserp.lgtc.dto.request.AlmacenEstanteListarRequest;
import com.besoft.siserp.lgtc.dto.request.AlmacenEstanteModificarRequest;
import com.besoft.siserp.lgtc.dto.request.AlmacenEstanteRegistrarRequest;
import com.besoft.siserp.lgtc.dto.request.AlmacenListarRequest;
import com.besoft.siserp.lgtc.dto.request.AlmacenModificarRequest;
import com.besoft.siserp.lgtc.dto.request.AlmacenRegistrarRequest;
import com.besoft.siserp.lgtc.dto.response.AlmacenEstanteListarResponse;
import com.besoft.siserp.lgtc.dto.response.AlmacenEstanteRegistrarResponse;
import com.besoft.siserp.lgtc.dto.response.AlmacenListarResponse;
import com.besoft.siserp.lgtc.dto.response.AlmacenRegistrarResponse;

public interface AlmacenService {

	public OutResponse<AlmacenRegistrarResponse> registrarAlmacen(AlmacenRegistrarRequest c);

	public OutResponse<?> modificarAlmacen(AlmacenModificarRequest c);

	public OutResponse<List<AlmacenListarResponse>> listarAlmacen(AlmacenListarRequest c);

	public OutResponse<?> eliminarAlmacen(AlmacenEliminarRequest c);

	public OutResponse<AlmacenEstanteRegistrarResponse> registrarEstante(AlmacenEstanteRegistrarRequest c);

	public OutResponse<?> modificarEstante(AlmacenEstanteModificarRequest c);

	public OutResponse<List<AlmacenEstanteListarResponse>> listarEstante(AlmacenEstanteListarRequest c);

	public OutResponse<?> eliminarEstante(AlmacenEstanteEliminarRequest c);
}
