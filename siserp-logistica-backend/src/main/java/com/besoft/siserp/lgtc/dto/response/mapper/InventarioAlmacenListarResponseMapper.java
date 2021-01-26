package com.besoft.siserp.lgtc.dto.response.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.besoft.siserp.lgtc.dto.response.InventarioAlmacenListarResponse;

public class InventarioAlmacenListarResponseMapper implements RowMapper<InventarioAlmacenListarResponse> {

	public InventarioAlmacenListarResponse mapRow(ResultSet rs, int rowNum) throws SQLException {
		InventarioAlmacenListarResponse c = new InventarioAlmacenListarResponse();
		c.setId(rs.getLong("ID"));
		c.setNombre(rs.getString("NOMBRE"));
		return c;

	}

}
