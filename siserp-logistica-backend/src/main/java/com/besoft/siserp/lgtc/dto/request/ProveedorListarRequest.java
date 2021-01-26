package com.besoft.siserp.lgtc.dto.request;

import java.io.Serializable;
import java.util.Date;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ProveedorListarRequest implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long idtTipoProveedor;
	private Date fecInicio;
	private Date fecFin;
	private String razonSocial;
	private Integer activo;
}
