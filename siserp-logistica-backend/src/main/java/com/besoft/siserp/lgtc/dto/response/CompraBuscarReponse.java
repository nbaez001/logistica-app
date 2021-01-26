package com.besoft.siserp.lgtc.dto.response;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CompraBuscarReponse implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long idProveedor;
	private String nomProveedor;
	private Long tipDocProveedor;
	private String nroDocProveedor;

	private Long idtTipoComprobante;
	private Double montoTotal;
	private String serieComprobante;
	private String nroComprobante;
	private String nroOrdenCompra;
	private String observacion;
	private Date fecha;
	private List<CompraBuscarDetalleListarResponse> listaDetalleCompra;

}
