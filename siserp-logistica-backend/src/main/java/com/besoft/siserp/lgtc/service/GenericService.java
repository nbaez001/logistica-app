package com.besoft.siserp.lgtc.service;

import com.besoft.siserp.lgtc.dto.OutResponse;
import com.besoft.siserp.lgtc.dto.request.BuscarMaestraRequest;
import com.besoft.siserp.lgtc.dto.request.MaestraRequest;

public interface GenericService {

	public OutResponse listarMaestra(BuscarMaestraRequest b);

	public OutResponse registrarMaestra(MaestraRequest m);

	public OutResponse actualizarMaestra(MaestraRequest m);

	public OutResponse eliminarMaestra(MaestraRequest m);
}
