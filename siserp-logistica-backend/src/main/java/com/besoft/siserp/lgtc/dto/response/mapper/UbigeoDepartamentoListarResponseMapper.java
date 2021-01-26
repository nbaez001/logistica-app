package com.besoft.siserp.lgtc.dto.response.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.besoft.siserp.lgtc.dto.response.UbigeoDepartamentoListarResponse;

public class UbigeoDepartamentoListarResponseMapper implements RowMapper<UbigeoDepartamentoListarResponse> {

	@Override
	public UbigeoDepartamentoListarResponse mapRow(ResultSet rs, int rowNum) throws SQLException {
		UbigeoDepartamentoListarResponse p = new UbigeoDepartamentoListarResponse();
		p.setId(rs.getInt("ID"));
		p.setNombre(rs.getString("NOMBRE"));
		p.setUbigeo(rs.getString("UBIGEO"));
		p.setUbigeoReniec(rs.getString("UBIGEO_RENIEC"));
		p.setFlagActivo(rs.getInt("FLG_ACTIVO"));
		return p;
	}

}