package com.besoft.siserp.lgtc.dao;

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

public interface AlmacenDao {

	public OutResponse<AlmacenRegistrarResponse> registrarAlmacen(AlmacenRegistrarRequest r);

	public OutResponse<?> modificarAlmacen(AlmacenModificarRequest r);

	public OutResponse<List<AlmacenListarResponse>> listarAlmacen(AlmacenListarRequest r);

	public OutResponse<?> eliminarAlmacen(AlmacenEliminarRequest r);

	public OutResponse<AlmacenEstanteRegistrarResponse> registrarEstante(AlmacenEstanteRegistrarRequest r);

	public OutResponse<?> modificarEstante(AlmacenEstanteModificarRequest r);

	public OutResponse<List<AlmacenEstanteListarResponse>> listarEstante(AlmacenEstanteListarRequest r);

	public OutResponse<?> eliminarEstante(AlmacenEstanteEliminarRequest r);
}
