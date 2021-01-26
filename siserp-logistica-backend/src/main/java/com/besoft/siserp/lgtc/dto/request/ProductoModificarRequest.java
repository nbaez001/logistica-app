package com.besoft.siserp.lgtc.dto.request;

import java.io.Serializable;
import java.util.Date;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ProductoModificarRequest implements Serializable {

	private static final long serialVersionUID = 1L;

	private Long id;
	private Long idMarca;
	private String nomMarca;
	private Integer idtTipo;
	private Integer idtUnidadMedida;
	private String codigo;
	private String nombre;
	private String descripcion;
	private Integer flagActivo;
	private Long idUsuarioMod;
	private Date fecUsuarioMod;

}
