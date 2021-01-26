package com.besoft.siserp.lgtc.dto.response.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.besoft.siserp.lgtc.dto.response.ProductoListarResponse;

public class ProductoListarResponseMapper implements RowMapper<ProductoListarResponse> {

	@Override
	public ProductoListarResponse mapRow(ResultSet rs, int rowNum) throws SQLException {
		ProductoListarResponse p = new ProductoListarResponse();
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
		p.setIdUsuarioCrea(rs.getLong("ID_USUARIO_CREA"));
		p.setFecUsuarioCrea(rs.getDate("FEC_USUARIO_CREA"));
		p.setIdUsuarioMod(rs.getLong("ID_USUARIO_MOD"));
		p.setFecUsuarioMod(rs.getDate("FEC_USUARIO_MOD"));
		return p;
	}

}
