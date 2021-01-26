package com.besoft.siserp.lgtc.dto.response.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.besoft.siserp.lgtc.dto.response.InventarioBuscarInventCompraDetResponse;

public class InventarioBuscarInventCompraDetResponseMapper  implements RowMapper<InventarioBuscarInventCompraDetResponse> {

	public InventarioBuscarInventCompraDetResponse mapRow(ResultSet rs, int rowNum) throws SQLException {
		InventarioBuscarInventCompraDetResponse c = new InventarioBuscarInventCompraDetResponse();
		c.setIdDetCompraEstante(rs.getLong("ID"));
		c.setIdProducto(rs.getLong("ID_PRODUCTO"));
		c.setNomProducto(rs.getString("NOM_PRODUCTO"));
		c.setIdInventario(rs.getLong("ID_INVENTARIO"));
		c.setIdEstante(rs.getLong("ID_ESTANTE"));
		c.setNomEstante(rs.getString("NOM_ESTANTE"));
		c.setIdAlmacen(rs.getLong("ID_ALMACEN"));
		c.setNomAlmacen(rs.getString("NOM_ALMACEN"));
		c.setCantidadPerfecto(rs.getDouble("CANTIDAD_PERFECTO"));
		c.setPrecioUnitario(rs.getDouble("PRECIO_UNITARIO"));
		c.setPrecio(rs.getDouble("PRECIO"));
		return c;
	}

}
