package com.besoft.siserp.lgtc.dto.request;

import java.io.Serializable;
import java.sql.Date;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ProveedorNaturalRegistrarRequest implements Serializable {

	private static final long serialVersionUID = 1L;

	private Long idtTipoProveedor;
	private String codigo;
	private String observacion;
	private Integer flagActivo;
	private Long idUsuarioCrea;
	private Date fecUsuarioCrea;
	
	private String codUbigeo;
	private Long idtGenero;
	private Long idtEstadoCivil;
	private Long idtTipoDocumento;
	private String nroDocumento;
	private String nombre;
	private String apellidoPat;
	private String apellidoMat;
	private String telefono;
	private String direccion;
	private String email;
	private Date fecNacimiento;
}
