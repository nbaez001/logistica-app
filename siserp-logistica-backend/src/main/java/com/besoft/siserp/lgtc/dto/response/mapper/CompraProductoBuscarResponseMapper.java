package com.besoft.siserp.lgtc.dto.response.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.besoft.siserp.lgtc.dto.response.CompraProductoBuscarResponse;

public class CompraProductoBuscarResponseMapper implements RowMapper<CompraProductoBuscarResponse> {

	public CompraProductoBuscarResponse mapRow(ResultSet rs, int rowNum) throws SQLException {
		CompraProductoBuscarResponse c = new CompraProductoBuscarResponse();
		c.setId(rs.getLong("ID"));
		c.setCodigo(rs.getString("CODIGO"));
		c.setNombre(rs.getString("NOMBRE"));
		return c;
	}

}
