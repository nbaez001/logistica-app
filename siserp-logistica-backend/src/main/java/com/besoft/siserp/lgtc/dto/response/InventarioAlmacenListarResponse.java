package com.besoft.siserp.lgtc.dto.response;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class InventarioAlmacenListarResponse implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	private String nombre;
}