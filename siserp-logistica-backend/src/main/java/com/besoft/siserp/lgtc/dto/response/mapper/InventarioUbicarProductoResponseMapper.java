package com.besoft.siserp.lgtc.dto.response.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.besoft.siserp.lgtc.dto.response.InventarioUbicarProductoResponse;

public class InventarioUbicarProductoResponseMapper implements RowMapper<InventarioUbicarProductoResponse> {

	public InventarioUbicarProductoResponse mapRow(ResultSet rs, int rowNum) throws SQLException {
		InventarioUbicarProductoResponse c = new InventarioUbicarProductoResponse();
		c.setIdProducto(rs.getLong("ID_PRODUCTO"));
		c.setIdEstante(rs.getLong("ID_ESTANTE"));
		c.setNomEstante(rs.getString("NOM_ESTANTE"));
		c.setIdAlmacen(rs.getLong("ID_ALMACEN"));
		c.setNomAlmacen(rs.getString("NOM_ALMACEN"));
		c.setCantidad(rs.getDouble("CANTIDAD"));
		c.setPrecio(rs.getDouble("PRECIO"));
		c.setFlagActivo(rs.getInt("FLAG_ACTIVO"));
		return c;

	}

}
