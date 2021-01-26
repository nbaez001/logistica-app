package com.besoft.siserp.lgtc.dto.response.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.besoft.siserp.lgtc.dto.response.UbigeoDistritoListarResponse;

public class UbigeoDistritoListarResponseMapper implements RowMapper<UbigeoDistritoListarResponse> {

	@Override
	public UbigeoDistritoListarResponse mapRow(ResultSet rs, int rowNum) throws SQLException {
		UbigeoDistritoListarResponse p = new UbigeoDistritoListarResponse();
		p.setId(rs.getInt("ID"));
		p.setIdProvincia(rs.getInt("ID_PROVINCIA"));
		p.setNombre(rs.getString("NOMBRE"));
		p.setUbigeo(rs.getString("UBIGEO"));
		p.setUbigeoReniec(rs.getString("UBIGEO_RENIEC"));
		p.setFlagActivo(rs.getInt("FLG_ACTIVO"));
		return p;
	}

}