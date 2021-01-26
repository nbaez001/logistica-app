package com.besoft.siserp.lgtc.dao;

import java.util.List;

import com.besoft.siserp.lgtc.dto.OutResponse;
import com.besoft.siserp.lgtc.dto.request.BuscarMaestraRequest;
import com.besoft.siserp.lgtc.dto.request.MaestraRequest;
import com.besoft.siserp.lgtc.dto.response.MaestraResponse;

public interface GenericDao {

	public OutResponse<List<MaestraResponse>> listarMaestra(BuscarMaestraRequest b);

	public OutResponse registrarMaestra(MaestraRequest m);

	public OutResponse actualizarMaestra(MaestraRequest m);

	public OutResponse eliminarMaestra(MaestraRequest m);

}
