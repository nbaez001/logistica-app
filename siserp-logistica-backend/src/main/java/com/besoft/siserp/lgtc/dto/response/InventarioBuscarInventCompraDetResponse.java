package com.besoft.siserp.lgtc.dto.response;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class InventarioBuscarInventCompraDetResponse implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long idDetCompraEstante;
	private Long idProducto;
	private String nomProducto;
	private Long idInventario;
	private Long idEstante;
	private String nomEstante;
	private Long idAlmacen;
	private String nomAlmacen;
	private Double cantidadPerfecto;
	private Double precioUnitario;
	private Double precio;
}
