package com.besoft.siserp.lgtc.dto.response.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.besoft.siserp.lgtc.dto.response.InventarioBuscarResponse;

public class InventarioBuscarResponseMapper implements RowMapper<InventarioBuscarResponse> {

	@Override
	public InventarioBuscarResponse mapRow(ResultSet rs, int rowNum) throws SQLException {
		InventarioBuscarResponse p = new InventarioBuscarResponse();
		p.setId(rs.getLong("ID"));
		p.setIdtUnidadMedida(rs.getInt("IDT_UNIDAD_MEDIDA"));
		p.setNomUnidadMedida(rs.getString("NOM_UNIDAD_MEDIDA"));
		p.setCodUnidadMedida(rs.getString("COD_UNIDAD_MEDIDA"));
		p.setCodProducto(rs.getString("COD_PRODUCTO"));
		p.setNombre(rs.getString("NOMBRE"));
		p.setCantidad(rs.getDouble("CANTIDAD"));
		p.setPrecio(rs.getDouble("PRECIO"));
		return p;
	}

}
