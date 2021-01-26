package com.besoft.siserp.lgtc.dto.request;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import lombok.Getter;
import lombok.ToString;
import lombok.Setter;

@Getter
@Setter
@ToString
public class ProductoCargarExcelRequest implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long idtTipo;
	private Long idEstante;
	private Long idUsuarioCrea;
	private Date fecUsuarioCrea;
	private List<ProductoCargarExcelDetRequest> listaProducto;
}
