package com.besoft.siserp.lgtc.dto.response.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.besoft.siserp.lgtc.dto.response.InventarioCodigoBarraListarResponse;

public class InventarioCodigoBarraListarResponseMapper implements RowMapper<InventarioCodigoBarraListarResponse> {

	public InventarioCodigoBarraListarResponse mapRow(ResultSet rs, int rowNum) throws SQLException {
		InventarioCodigoBarraListarResponse c = new InventarioCodigoBarraListarResponse();
		c.setId(rs.getLong("ID"));
		c.setCodigo(rs.getString("CODIGO"));
		c.setFlagActivo(rs.getInt("FLAG_ACTIVO"));
		return c;
	}

}
