package com.besoft.siserp.lgtc.dto.response;

import java.io.Serializable;
import java.util.Date;

import lombok.Getter;
import lombok.ToString;
import lombok.Setter;

@Getter
@Setter
@ToString
public class InventarioListarResponse implements Serializable {

	private static final long serialVersionUID = 1L;

	private Long id;
	private Integer idMarca;
	private String nomMarca;
	private Integer idtTipo;
	private String nomTipo;
	private Integer idtUnidadMedida;
	private String nomUnidadMedida;
	private String codUnidadMedida;
	private String codigo;
	private String nombre;
	private String descripcion;
	private Integer flagActivo;
	private Double cantidad;
	private Double precio;
	private Long idEstante;
	private String nomEstante;
	private Long idAlmacen;
	private String nomAlmacen;
	private Long idUsuarioCrea;
	private Date fecUsuarioCrea;
	private Long idUsuarioMod;
	private Date fecUsuarioMod;
}
