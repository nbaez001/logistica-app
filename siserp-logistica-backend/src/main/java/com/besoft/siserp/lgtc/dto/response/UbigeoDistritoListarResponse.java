package com.besoft.siserp.lgtc.dto.response;

import java.io.Serializable;

import lombok.Setter;
import lombok.ToString;
import lombok.Getter;

@Getter
@Setter
@ToString
public class UbigeoDistritoListarResponse implements Serializable {
	private static final long serialVersionUID = 1L;
	private Integer id;
	private Integer idProvincia;
	private String nombre;
	private String ubigeo;
	private String ubigeoReniec;
	private Integer flagActivo;

}
