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
public class CompraModificarRequest implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	private Long idProveedor;
	private Long idtTipoComprobante;
	private Double montoTotal;
	private String serieComprobante;
	private String nroComprobante;
	private String nroOrdenCompra;
	private String observacion;
	private Date fecha;
	private Integer flagActivo;
	private Long idUsuarioMod;
	private Date fecUsuarioMod;
	private List<CompraModificarDetalleRequest> listaDetalleCompra;

	private String nomProveedor;
	private Long tipDocProveedor;
	private String nroDocProveedor;

}
