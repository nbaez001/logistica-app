package com.besoft.siserp.lgtc.dto.request;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class InventarioModificarCompraRequest implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long idUsuarioMod;
	private Date fecUsuarioMod;
	private List<InventarioModificarCompraDetRequest> listaDetalleInventario;

}
