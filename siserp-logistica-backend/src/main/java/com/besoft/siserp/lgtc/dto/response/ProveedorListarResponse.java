package com.besoft.siserp.lgtc.dto.response;

import java.io.Serializable;
import java.util.Date;

import lombok.Setter;
import lombok.ToString;
import lombok.Getter;

@Getter
@Setter
@ToString
public class ProveedorListarResponse implements Serializable {

	private static final long serialVersionUID = 1L;

	private Long id;
	private Long idtTipoProveedor;
	private String nomTipoProveedor;
	private String valTipoProveedor;
	private String codigo;
	private String nombre;
	private String apellidoPat;
	private String apellidoMat;
	private String razonSocial;
	private String nombreComercial;
	private String giroNegocio;
	private Date fecFundacion;
	private Date fecNacimiento;
	private Long idtTipoDocumento;
	private String nomTipoDocumento;
	private String nroDocumento;
	private Long idtGenero;
	private Long idtEstadoCivil;
	private String telefono;
	private String direccion;
	private String email;
	private String codUbigeo;
	private Integer flagActivo;
	private String observacion;
}
