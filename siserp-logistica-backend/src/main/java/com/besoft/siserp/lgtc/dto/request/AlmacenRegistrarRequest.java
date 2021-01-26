package com.besoft.siserp.lgtc.dto.request;

import java.io.Serializable;
import java.util.Date;

import lombok.Getter;
import lombok.ToString;
import lombok.Setter;

@Getter
@Setter
@ToString
public class AlmacenRegistrarRequest implements Serializable {
	private static final long serialVersionUID = 1L;

	private String nombre;
	private String descripcion;
	private Date fecha;
	private Integer flagActivo;
	private Long idUsuarioCrea;
	private Date fecUsuarioCrea;
}
