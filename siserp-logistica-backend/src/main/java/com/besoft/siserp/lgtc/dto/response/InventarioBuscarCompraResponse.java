package com.besoft.siserp.lgtc.dto.response;

import java.io.Serializable;
import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class InventarioBuscarCompraResponse implements Serializable {
	private static final long serialVersionUID = 1L;

	private String codCompra;
	private String nomProveedor;
	private Long tipDocProveedor;
	private String nroDocProveedor;
	private Double montoTotal;
	private String observacion;
	private List<InventarioBuscarCompraDetResponse> listaDetalleCompra;
}
