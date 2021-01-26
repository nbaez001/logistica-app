package com.besoft.siserp.lgtc.dto.response.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.besoft.siserp.lgtc.dto.response.ProveedorJuridRepLegalListarResponse;

public class RepresentanteLegalResponseMapper implements RowMapper<ProveedorJuridRepLegalListarResponse> {

	@Override
	public ProveedorJuridRepLegalListarResponse mapRow(ResultSet rs, int rowNum) throws SQLException {
		ProveedorJuridRepLegalListarResponse p = new ProveedorJuridRepLegalListarResponse();
		p.setId(rs.getLong("ID"));
		p.setIdProveedor(rs.getLong("ID_PROVEEDOR"));
		p.setIdtTipoDocumento(rs.getLong("IDT_TIPO_DOCUMENTO"));
		p.setNomTipoDocumento(rs.getString("NOM_TIPO_DOCUMENTO"));
		p.setNroDocumento(rs.getString("NRO_DOCUMENTO"));
		p.setIdtGenero(rs.getLong("IDT_GENERO"));
		p.setNomGenero(rs.getString("NOM_GENERO"));
		p.setIdtEstadoCivil(rs.getLong("IDT_ESTADO_CIVIL"));
		p.setNomEstadoCivil(rs.getString("NOM_ESTADO_CIVIL"));
		p.setNombre(rs.getString("NOMBRE"));
		p.setApellidoPat(rs.getString("APELLIDO_PAT"));
		p.setApellidoMat(rs.getString("APELLIDO_MAT"));
		p.setCargo(rs.getString("CARGO"));
		p.setTelefono(rs.getString("TELEFONO"));
		p.setEmail(rs.getString("EMAIL"));
		p.setFlagActivo(rs.getInt("FLAG_ACTIVO"));
		p.setCodUbigeo(rs.getString("COD_UBIGEO"));
		p.setDireccion(rs.getString("DIRECCION"));
		p.setFecNacimiento(rs.getDate("FEC_NACIMIENTO"));
		p.setIdUsuarioCrea(rs.getLong("ID_USUARIO_CREA"));
		p.setFecUsuarioCrea(rs.getDate("FEC_USUARIO_CREA"));
		p.setIdUsuarioMod(rs.getLong("ID_USUARIO_MOD"));
		p.setFecUsuarioMod(rs.getDate("FEC_USUARIO_MOD"));
		return p;
	}
}
