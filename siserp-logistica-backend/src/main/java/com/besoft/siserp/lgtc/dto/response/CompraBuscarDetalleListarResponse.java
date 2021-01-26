package com.besoft.siserp.lgtc.dto.response;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CompraBuscarDetalleListarResponse implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	private Long idCompra;
	private Long idProducto;
	private String nomProducto;
	private Double cantidad;
	private Double cantidadPerfecto;
	private Double cantidadDaniado;
	private Double precioUnitario;
	private Double subTotal;
	private Integer flagActivo;

}
