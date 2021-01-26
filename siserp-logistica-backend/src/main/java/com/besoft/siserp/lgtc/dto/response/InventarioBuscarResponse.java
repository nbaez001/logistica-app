package com.besoft.siserp.lgtc.dto.response;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class InventarioBuscarResponse implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	private Integer idtUnidadMedida;
	private String nomUnidadMedida;
	private String codUnidadMedida;
	private String codProducto;
	private String nombre;
	private Double cantidad;
	private Double precio;
}
