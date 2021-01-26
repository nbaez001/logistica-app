package com.besoft.siserp.lgtc.dto.response;

import java.io.Serializable;
import java.util.Date;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class MaestraResponse implements Serializable {

	private static final long serialVersionUID = 1L;

	private Long id;
	private Long idMaestra;
	private Integer idTabla;
	private Integer idItem;
	private Integer orden;
	private String codigo;
	private String nombre;
	private String valor;
	private String descripcion;
	private Integer flagActivo;
	private Long idUsuarioCrea;
	private Date fecUsuarioCrea;
	private Long idUsuarioMod;
	private Date fecUsuarioMod;

}
