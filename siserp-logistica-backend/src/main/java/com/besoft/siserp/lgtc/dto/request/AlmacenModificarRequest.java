package com.besoft.siserp.lgtc.dto.request;

import lombok.Setter;

import java.io.Serializable;
import java.util.Date;

import lombok.ToString;
import lombok.Getter;

@Getter
@Setter
@ToString
public class AlmacenModificarRequest implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	private String nombre;
	private String descripcion;
	private Date fecha;
	private Integer flagActivo;
	private Long idUsuarioMod;
	private Date fecUsuarioMod;
}
