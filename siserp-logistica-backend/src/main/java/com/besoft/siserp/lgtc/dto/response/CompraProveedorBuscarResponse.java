package com.besoft.siserp.lgtc.dto.response;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CompraProveedorBuscarResponse implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	private String nombre;
	private String nroDocumento;
	private Long tipDocumento;
}
