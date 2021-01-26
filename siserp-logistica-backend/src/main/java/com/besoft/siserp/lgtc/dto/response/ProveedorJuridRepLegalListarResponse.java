package com.besoft.siserp.lgtc.dto.response;

import java.io.Serializable;
import java.util.Date;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ProveedorJuridRepLegalListarResponse implements Serializable {

	private static final long serialVersionUID = 1L;

	private Long id;
	private Long idProveedor;
	private Long idtTipoDocumento;
	private String nomTipoDocumento;
	private String nroDocumento;
	private Long idtGenero;
	private String nomGenero;
	private Long idtEstadoCivil;
	private String nomEstadoCivil;
	private String nombre;
	private String apellidoPat;
	private String apellidoMat;
	private String cargo;
	private String telefono;
	private String email;
	private String codUbigeo;
	private String direccion;
	private Date fecNacimiento;
	private Integer flagActivo;
	private Long idUsuarioCrea;
	private Date fecUsuarioCrea;
	private Long idUsuarioMod;
	private Date fecUsuarioMod;

}
