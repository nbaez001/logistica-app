package com.besoft.siserp.lgtc.dto.request;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class InventarioCodigoBarraDetModificarRequest implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	private String codigo;
	private Integer flagActivo;
}
