package com.besoft.siserp.lgtc.dto.request;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CompraRegistrarRequest implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long idProveedor;
	private Long idtEstadoCompra;
	private Long idtTipoComprobante;
	private Double montoTotal;
	private String serieComprobante;
	private String nroComprobante;
	private String nroOrdenCompra;
	private String observacion;
	private Date fecha;
	private Integer flagActivo;
	private Long idUsuarioCrea;
	private Date fecUsuarioCrea;
	private List<CompraRegistrarDetalleRequest> listaDetalleCompra;

	private String nomProveedor;
	private Long tipDocProveedor;
	private String nroDocProveedor;
}
