package com.besoft.siserp.lgtc.dto.request;

import java.io.Serializable;
import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class InventarioModificarCompraDetRequest implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long idDetCompraEstante;
	private Long idEstante;
	private Long idInventario;
	private Long idProducto;
	private Double cantidad;
	private Double precio;
	private List<InventarioCodigoBarraDetModificarRequest> listaCodigoBarra;
	private List<InventarioCodigoBarraDetModificarRequest> listaCodigoBarraElim;

}
