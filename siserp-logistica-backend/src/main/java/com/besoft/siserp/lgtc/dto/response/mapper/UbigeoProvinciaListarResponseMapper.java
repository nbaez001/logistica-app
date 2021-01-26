package com.besoft.siserp.lgtc.dto.response.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.besoft.siserp.lgtc.dto.response.UbigeoProvinciaListarResponse;

public class UbigeoProvinciaListarResponseMapper implements RowMapper<UbigeoProvinciaListarResponse> {

	@Override
	public UbigeoProvinciaListarResponse mapRow(ResultSet rs, int rowNum) throws SQLException {
		UbigeoProvinciaListarResponse p = new UbigeoProvinciaListarResponse();
		p.setId(rs.getInt("ID"));
		p.setIdDepartamento(rs.getInt("ID_DEPARTAMENTO"));
		p.setNombre(rs.getString("NOMBRE"));
		p.setUbigeo(rs.getString("UBIGEO"));
		p.setUbigeoReniec(rs.getString("UBIGEO_RENIEC"));
		p.setFlagActivo(rs.getInt("FLG_ACTIVO"));
		return p;
	}

}