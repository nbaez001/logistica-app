package com.besoft.siserp.lgtc.dto.request;

import java.io.Serializable;
import java.util.Date;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class AlmacenEstanteListarRequest implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long idAlmacen;
	private Date fecInicio;
	private Date fecFin;
	private String nombre;
	private Integer flagActivo;

}
