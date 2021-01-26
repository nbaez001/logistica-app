package com.besoft.siserp.lgtc.dto.request;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ProductoCargarExcelDetRequest implements Serializable {
	private static final long serialVersionUID = 1L;

	private String marca;
	private Long idtUnidadMedida;
	private String nomUnidadMedida;
	private String codigo;
	private String nombre;
	private String descripcion;
	private Double cantidad;
	private Double precio;
}
