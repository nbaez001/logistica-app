package com.besoft.siserp.lgtc.dto.response.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.besoft.siserp.lgtc.dto.response.AlmacenEstanteListarResponse;

public class AlmacenEstanteListarResponseMapper implements RowMapper<AlmacenEstanteListarResponse> {

	public AlmacenEstanteListarResponse mapRow(ResultSet rs, int rowNum) throws SQLException {
		AlmacenEstanteListarResponse c = new AlmacenEstanteListarResponse();
		c.setId(rs.getLong("ID"));
		c.setIdAlmacen(rs.getLong("ID_ALMACEN"));
		c.setNombre(rs.getString("NOMBRE"));
		c.setCodigo(rs.getString("CODIGO"));
		c.setFecha(rs.getDate("FECHA"));
		c.setFlagActivo(rs.getInt("FLAG_ACTIVO"));
		c.setIdUsuarioCrea(rs.getLong("ID_USUARIO_CREA"));
		c.setFecUsuarioCrea(rs.getDate("FEC_USUARIO_CREA"));
		c.setIdUsuarioMod(rs.getLong("ID_USUARIO_MOD"));
		c.setFecUsuarioMod(rs.getDate("FEC_USUARIO_MOD"));
		return c;
	}

}
