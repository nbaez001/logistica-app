package com.besoft.siserp.lgtc.dto.response.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.besoft.siserp.lgtc.dto.response.CompraProveedorBuscarResponse;

public class CompraProveedorBuscarResponseMapper implements RowMapper<CompraProveedorBuscarResponse> {

	public CompraProveedorBuscarResponse mapRow(ResultSet rs, int rowNum) throws SQLException {
		CompraProveedorBuscarResponse c = new CompraProveedorBuscarResponse();
		c.setId(rs.getLong("ID"));
		c.setTipDocumento(rs.getLong("IDT_TIPO_DOCUMENTO"));
		c.setNombre(rs.getString("NOMBRE_PROVEEDOR"));
		c.setNroDocumento(rs.getString("NRO_DOCUMENTO"));		
		return c;
	}
}
