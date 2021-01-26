package com.besoft.siserp.lgtc.dto.request;

import java.io.Serializable;

import lombok.ToString;

import lombok.Setter;

import lombok.Getter;

@Getter
@Setter
@ToString
public class InventarioBuscarXCodigoRequest implements Serializable {
	private static final long serialVersionUID = 1L;

	private String codigoBarra;
}
