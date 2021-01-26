package com.besoft.siserp.lgtc.dto.request;

import java.io.Serializable;
import java.util.Date;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class AlmacenEstanteRegistrarRequest implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long idAlmacen;
	private String nombre;
	private Date fecha;
	private Integer flagActivo;
	private Long idUsuarioCrea;
	private Date fecUsuarioCrea;
}
