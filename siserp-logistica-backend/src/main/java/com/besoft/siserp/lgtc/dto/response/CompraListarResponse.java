package com.besoft.siserp.lgtc.dto.response;

import java.io.Serializable;
import java.util.Date;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CompraListarResponse implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	private Long idProveedor;
	private Long idtTipoComprobante;
	private String nomTipoComprobante;
	private String codigo;
	private Double montoTotal;
	private String serieComprobante;
	private String nroComprobante;
	private String nroOrdenCompra;
	private String observacion;
	private Date fecha;
	private Integer flagActivo;
	private Long idtEstadoCompra;
	private String nomEstadoCompra;
	private String valEstadoCompra;
	private Long idUsuarioCrea;
	private Date fecUsuarioCrea;
	private Long idUsuarioMod;
	private Date fecUsuarioMod;
}
