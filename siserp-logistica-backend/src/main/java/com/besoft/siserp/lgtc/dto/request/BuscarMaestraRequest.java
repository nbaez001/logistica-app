package com.besoft.siserp.lgtc.dto.request;

import java.io.Serializable;
import java.util.Date;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class BuscarMaestraRequest implements Serializable {

	private static final long serialVersionUID = 1L;

	private Date fecInicio;
	private Date fecFin;
	private Long idMaestra;
	private Integer idTabla;

}
