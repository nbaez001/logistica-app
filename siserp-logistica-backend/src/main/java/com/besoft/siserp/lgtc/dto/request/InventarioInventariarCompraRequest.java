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
public class InventarioInventariarCompraRequest implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long idCompra;
	private Long idtEstadoCompra;
	private Long idUsuarioCrea;
	private Date fecUsuarioCrea;
	private List<InventarioInventariarCompraDetRequest> listaDetalleInventario;
}
