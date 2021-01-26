package com.besoft.siserp.lgtc.dto.request;

import java.io.Serializable;
import java.util.Date;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ProveedorJuridRepLegalModificarRequest implements Serializable {

	private static final long serialVersionUID = 1L;

	private Long id;
	private String codUbigeo;
	private Long idtGenero;
	private Long idtEstadoCivil;
	private Long idtTipoDocumento;
	private String nroDocumento;
	private String nombre;
	private String apellidoPat;
	private String apellidoMat;
	private String direccion;
	private Date fecNacimiento;
	private String cargo;
	private String telefono;
	private String email;
	private Integer flagActivo;
	private Long idUsuarioCrea;
	private Date fecUsuarioCrea;
	private Long idUsuarioMod;
	private Date fecUsuarioMod;
}
