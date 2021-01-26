package com.besoft.siserp.lgtc.dto.response;

import java.io.Serializable;

import lombok.Getter;
import lombok.ToString;
import lombok.Setter;

@Getter
@Setter
@ToString
public class CompraProductoBuscarResponse implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	private String codigo;
	private String nombre;
}
