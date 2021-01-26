package com.besoft.siserp.lgtc.dto.response.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.besoft.siserp.lgtc.dto.response.InventarioEstanteListarResponse;

public class InventarioEstanteListarResponseMapper implements RowMapper<InventarioEstanteListarResponse> {

	public InventarioEstanteListarResponse mapRow(ResultSet rs, int rowNum) throws SQLException {
		InventarioEstanteListarResponse c = new InventarioEstanteListarResponse();
		c.setId(rs.getLong("ID"));
		c.setNombre(rs.getString("NOMBRE"));
		return c;

	}

}
