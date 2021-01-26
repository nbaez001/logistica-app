package com.besoft.siserp.lgtc.dto.request;

import java.io.Serializable;

import lombok.Getter;
import lombok.ToString;
import lombok.Setter;

@Getter
@Setter
@ToString
public class InventarioEstanteListarRequest implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long idAlmacen;
}
