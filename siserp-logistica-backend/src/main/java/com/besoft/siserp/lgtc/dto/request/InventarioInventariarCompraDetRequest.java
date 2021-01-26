package com.besoft.siserp.lgtc.dto.request;

import java.io.Serializable;
import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class InventarioInventariarCompraDetRequest implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long idDetalleCompra;
	private Long idProducto;
	private Long idEstante;
	private Double cantidad;
	private Double precio;
	private List<InventarioCodigoBarraDetRequest> listaCodigoBarra;
}
