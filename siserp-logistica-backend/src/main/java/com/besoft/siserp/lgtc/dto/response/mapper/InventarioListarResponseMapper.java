package com.besoft.siserp.lgtc.dto.response.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.besoft.siserp.lgtc.dto.response.InventarioListarResponse;

public class InventarioListarResponseMapper implements RowMapper<InventarioListarResponse> {

	@Override
	public InventarioListarResponse mapRow(ResultSet rs, int rowNum) throws SQLException {
		InventarioListarResponse p = new InventarioListarResponse();
		p.setId(rs.getLong("ID"));
		p.setIdMarca(rs.getInt("ID_MARCA"));
		p.setNomMarca(rs.getString("NOM_MARCA"));
		p.setIdtTipo(rs.getInt("IDT_TIPO"));
		p.setNomTipo(rs.getString("NOM_TIPO"));
		p.setIdtUnidadMedida(rs.getInt("IDT_UNIDAD_MEDIDA"));
		p.setNomUnidadMedida(rs.getString("NOM_UNIDAD_MEDIDA"));
		p.setCodUnidadMedida(rs.getString("COD_UNIDAD_MEDIDA"));
		p.setCodigo(rs.getString("CODIGO"));
		p.setNombre(rs.getString("NOMBRE"));
		p.setDescripcion(rs.getString("DESCRIPCION"));
		p.setFlagActivo(rs.getInt("FLAG_ACTIVO"));
		p.setCantidad(rs.getDouble("CANTIDAD"));
		p.setPrecio(rs.getDouble("PRECIO"));
		p.setIdEstante(rs.getLong("ID_ESTANTE"));
		p.setNomEstante(rs.getString("NOM_ESTANTE"));
		p.setIdAlmacen(rs.getLong("ID_ALMACEN"));
		p.setNomAlmacen(rs.getString("NOM_ALMACEN"));
		p.setIdUsuarioCrea(rs.getLong("ID_USUARIO_CREA"));
		p.setFecUsuarioCrea(rs.getDate("FEC_USUARIO_CREA"));
		p.setIdUsuarioMod(rs.getLong("ID_USUARIO_MOD"));
		p.setFecUsuarioMod(rs.getDate("FEC_USUARIO_MOD"));
		return p;
	}

}
