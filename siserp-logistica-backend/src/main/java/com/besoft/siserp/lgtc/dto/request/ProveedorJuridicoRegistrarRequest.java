package com.besoft.siserp.lgtc.dto.request;

import java.io.Serializable;
import java.sql.Date;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ProveedorJuridicoRegistrarRequest implements Serializable {

	private static final long serialVersionUID = 1L;

	private Long idtTipoProveedor;
	private String codigo;
	private Integer flagActivo;
	private String observacion;
	private Long idUsuarioCrea;
	private Date fecUsuarioCrea;
	
	private String codUbigeo;
	private Long idtTipoDocumento;
	private String nroDocumento;
	private String razonSocial;
	private String nombreComercial;
	private String giroNegocio;
	private String telefono;
	private String direccion;
	private String email;
	private Date fecfundacion;
}
