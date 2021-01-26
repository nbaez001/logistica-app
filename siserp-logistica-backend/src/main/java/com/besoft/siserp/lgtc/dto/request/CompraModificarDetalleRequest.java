package com.besoft.siserp.lgtc.dto.request;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CompraModificarDetalleRequest implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	private Long idProducto;
	private Double cantidad;
	private Double cantidadPerfecto;
	private Double cantidadDaniado;
	private Double precioUnitario;
	private Double subTotal;
	private Integer flagActivo;

}
