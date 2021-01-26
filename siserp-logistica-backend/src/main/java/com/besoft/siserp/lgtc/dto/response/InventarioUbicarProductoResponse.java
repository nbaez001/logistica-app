package com.besoft.siserp.lgtc.dto.response;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class InventarioUbicarProductoResponse implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long idProducto;
	private Long idEstante;
	private String nomEstante;
	private Long idAlmacen;
	private String nomAlmacen;
	private Double cantidad;
	private Double precio;
	private Integer flagActivo;

}
