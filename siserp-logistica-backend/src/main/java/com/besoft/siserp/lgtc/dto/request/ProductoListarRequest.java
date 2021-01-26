package com.besoft.siserp.lgtc.dto.request;

import java.io.Serializable;
import java.util.Date;

import lombok.Getter;
import lombok.ToString;
import lombok.Setter;

@Getter
@Setter
@ToString
public class ProductoListarRequest implements Serializable{
	private static final long serialVersionUID = 1L;

	private Date fecInicio;
	private Date fecFin;
	private String nombre;
	private Integer activo;

}
