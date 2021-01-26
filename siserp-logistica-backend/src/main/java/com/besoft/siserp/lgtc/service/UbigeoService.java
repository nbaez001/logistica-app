package com.besoft.siserp.lgtc.service;

import java.util.List;

import com.besoft.siserp.lgtc.dto.OutResponse;
import com.besoft.siserp.lgtc.dto.request.UbigeoDistritoListarRequest;
import com.besoft.siserp.lgtc.dto.request.UbigeoDistritoListarXUbigeoRequest;
import com.besoft.siserp.lgtc.dto.request.UbigeoProvinciaListarRequest;
import com.besoft.siserp.lgtc.dto.request.UbigeoProvinciaListarXUbigeoRequest;
import com.besoft.siserp.lgtc.dto.response.UbigeoDepartamentoListarResponse;
import com.besoft.siserp.lgtc.dto.response.UbigeoDistritoListarResponse;
import com.besoft.siserp.lgtc.dto.response.UbigeoProvinciaListarResponse;

public interface UbigeoService {

	public OutResponse<List<UbigeoDepartamentoListarResponse>> listarDepartamento();

	public OutResponse<List<UbigeoProvinciaListarResponse>> listarProvincia(UbigeoProvinciaListarRequest req);

	public OutResponse<List<UbigeoDistritoListarResponse>> listarDistrito(UbigeoDistritoListarRequest req);

	public OutResponse<List<UbigeoProvinciaListarResponse>> listarProvinciaXUbigeo(UbigeoProvinciaListarXUbigeoRequest req);

	public OutResponse<List<UbigeoDistritoListarResponse>> listarDistritoXUbigeo(UbigeoDistritoListarXUbigeoRequest req);
}
