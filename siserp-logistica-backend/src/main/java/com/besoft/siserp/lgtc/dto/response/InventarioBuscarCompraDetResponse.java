package com.besoft.siserp.lgtc.dto.response;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class InventarioBuscarCompraDetResponse implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long idDetCompra;
	private Long idCompra;
	private Long idProducto;
	private String nomProducto;
	private Double cantidadPerfecto;
	private Double precioUnitario;
}
