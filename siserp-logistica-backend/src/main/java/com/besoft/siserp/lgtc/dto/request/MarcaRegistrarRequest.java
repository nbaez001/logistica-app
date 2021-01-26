package com.besoft.siserp.lgtc.dto.request;

import java.io.Serializable;
import java.util.Date;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class MarcaRegistrarRequest implements Serializable {
	private static final long serialVersionUID = 1L;

	private String nombre;
	private String codigo;
	private Integer flgActivo;
	private Long idUsuarioCrea;
	private Date fecUsuarioCrea;

}
