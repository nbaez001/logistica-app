package com.besoft.siserp.lgtc.dto.response;

import java.io.Serializable;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UbigeoDepartamentoListarResponse implements Serializable {
	private static final long serialVersionUID = 1L;
	private Integer id;
	private Integer idPais;
	private String nombre;
	private String ubigeo;
	private String ubigeoReniec;
	private Integer flagActivo;

}
