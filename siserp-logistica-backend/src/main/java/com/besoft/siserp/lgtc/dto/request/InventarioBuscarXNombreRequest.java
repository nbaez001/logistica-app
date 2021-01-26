package com.besoft.siserp.lgtc.dto.request;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class InventarioBuscarXNombreRequest implements Serializable {
	private static final long serialVersionUID = 1L;

	private String nombre;
}
