package com.besoft.siserp.lgtc.dto.response.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.besoft.siserp.lgtc.dto.response.InventarioBuscarCompraDetResponse;

public class CompraBuscarDetalleListarResponseMapper implements RowMapper<InventarioBuscarCompraDetResponse> {

	public InventarioBuscarCompraDetResponse mapRow(ResultSet rs, int rowNum) throws SQLException {
		InventarioBuscarCompraDetResponse c = new InventarioBuscarCompraDetResponse();
		c.setIdDetCompra(rs.getLong("ID"));
		c.setIdCompra(rs.getLong("ID_COMPRA"));
		c.setIdProducto(rs.getLong("ID_PRODUCTO"));
		c.setNomProducto(rs.getString("NOM_PRODUCTO"));
		c.setCantidadPerfecto(rs.getDouble("CANTIDAD_PERFECTO"));
		c.setPrecioUnitario(rs.getDouble("PRECIO_UNITARIO"));
		return c;
	}

}
