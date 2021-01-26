package com.besoft.siserp.lgtc.service;

import java.util.List;

import org.springframework.web.bind.annotation.RequestBody;

import com.besoft.siserp.lgtc.dto.OutResponse;
import com.besoft.siserp.lgtc.dto.request.ProveedorJuridRepLegalListarRequest;
import com.besoft.siserp.lgtc.dto.request.ProveedorJuridRepLegalModificarRequest;
import com.besoft.siserp.lgtc.dto.request.ProveedorJuridRepLegalEliminarRequest;
import com.besoft.siserp.lgtc.dto.request.ProveedorEliminarRequest;
import com.besoft.siserp.lgtc.dto.request.ProveedorJuridRepLegalBuscarRequest;
import com.besoft.siserp.lgtc.dto.request.ProveedorJuridicoRegistrarRequest;
import com.besoft.siserp.lgtc.dto.request.ProveedorListarRequest;
import com.besoft.siserp.lgtc.dto.request.ProveedorNaturalModificarRequest;
import com.besoft.siserp.lgtc.dto.request.ProveedorNaturalRegistrarRequest;
import com.besoft.siserp.lgtc.dto.response.ProveedorJuridRepLegalBuscarResponse;
import com.besoft.siserp.lgtc.dto.response.ProveedorJuridRepLegalListarResponse;
import com.besoft.siserp.lgtc.dto.response.ProveedorJuridRepLegalRegistrarResponse;
import com.besoft.siserp.lgtc.dto.response.ProveedorJuridicoRegistrarResponse;
import com.besoft.siserp.lgtc.dto.response.ProveedorListarResponse;
import com.besoft.siserp.lgtc.dto.response.ProveedorNaturalRegistrarResponse;
import com.besoft.siserp.lgtc.dto.request.ProveedorJuridRepLegalRegistrarRequest;
import com.besoft.siserp.lgtc.dto.request.ProveedorJuridicoModificarRequest;

public interface ProveedorService {

	public OutResponse<List<ProveedorListarResponse>> listarProveedor(ProveedorListarRequest req);

	public OutResponse<ProveedorNaturalRegistrarResponse> registrarProveedor(ProveedorNaturalRegistrarRequest p);

	public OutResponse<ProveedorJuridicoRegistrarResponse> registrarProveedorJurid(ProveedorJuridicoRegistrarRequest p);

	public OutResponse<?> actualizarProveedorNatural(ProveedorNaturalModificarRequest p);

	public OutResponse<?> actualizarProveedorJuridico(ProveedorJuridicoModificarRequest p);
	
	public OutResponse<?> eliminarProveedor(ProveedorEliminarRequest p);

	public OutResponse<ProveedorJuridRepLegalRegistrarResponse> registrarRepresentante(
			ProveedorJuridRepLegalRegistrarRequest p);

	public OutResponse<List<ProveedorJuridRepLegalListarResponse>> listarRepresentante(
			ProveedorJuridRepLegalListarRequest p);

	public OutResponse<?> actualizarRepresentante(ProveedorJuridRepLegalModificarRequest p);

	public OutResponse<?> eliminarRepresentante(ProveedorJuridRepLegalEliminarRequest p);

	public OutResponse<ProveedorJuridRepLegalBuscarResponse> obtenerRepresentanteLegal(
			ProveedorJuridRepLegalBuscarRequest p);

}
