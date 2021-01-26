package com.besoft.siserp.lgtc.dto.response.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.besoft.siserp.lgtc.dto.response.AlmacenListarResponse;

public class AlmacenListarResponseMapper implements RowMapper<AlmacenListarResponse> {

	public AlmacenListarResponse mapRow(ResultSet rs, int rowNum) throws SQLException {
		AlmacenListarResponse c = new AlmacenListarResponse();
		c.setId(rs.getLong("ID"));
		c.setNombre(rs.getString("NOMBRE"));
		c.setCodigo(rs.getString("CODIGO"));
		c.setDescripcion(rs.getString("DESCRIPCION"));
		c.setFecha(rs.getDate("FECHA"));
		c.setFlagActivo(rs.getInt("FLAG_ACTIVO"));
		c.setIdUsuarioCrea(rs.getLong("ID_USUARIO_CREA"));
		c.setFecUsuarioCrea(rs.getDate("FEC_USUARIO_CREA"));
		c.setIdUsuarioMod(rs.getLong("ID_USUARIO_MOD"));
		c.setFecUsuarioMod(rs.getDate("FEC_USUARIO_MOD"));
		return c;
	}

}
