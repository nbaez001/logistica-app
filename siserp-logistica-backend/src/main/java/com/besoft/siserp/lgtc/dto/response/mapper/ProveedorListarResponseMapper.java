package com.besoft.siserp.lgtc.dto.response.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.besoft.siserp.lgtc.dto.response.ProveedorListarResponse;

public class ProveedorListarResponseMapper implements RowMapper<ProveedorListarResponse> {

	@Override
	public ProveedorListarResponse mapRow(ResultSet rs, int rowNum) throws SQLException {
		ProveedorListarResponse p = new ProveedorListarResponse();
		p.setId(rs.getLong("ID"));
		p.setIdtTipoProveedor(rs.getLong("IDT_TIPO_PROVEEDOR"));
		p.setNomTipoProveedor(rs.getString("NOM_TIPO_PROVEEDOR"));
		p.setValTipoProveedor(rs.getString("VAL_TIPO_PROVEEDOR"));
		p.setCodigo(rs.getString("CODIGO"));
		p.setNombre(rs.getString("NOMBRE"));
		p.setApellidoPat(rs.getString("APELLIDO_PAT"));
		p.setApellidoMat(rs.getString("APELLIDO_MAT"));
		p.setRazonSocial(rs.getString("RAZON_SOCIAL"));
		p.setNombreComercial(rs.getString("NOMBRE_COMERCIAL"));
		p.setGiroNegocio(rs.getString("GIRO_NEGOCIO"));
		p.setFecFundacion(rs.getDate("FEC_FUNDACION"));
		p.setFecNacimiento(rs.getDate("FEC_NACIMIENTO"));
		p.setIdtTipoDocumento(rs.getLong("IDT_TIPO_DOCUMENTO"));
		p.setNomTipoDocumento(rs.getString("NOM_TIPO_DOCUMENTO"));
		p.setNroDocumento(rs.getString("NRO_DOCUMENTO"));
		p.setIdtGenero(rs.getLong("IDT_GENERO"));
		p.setIdtEstadoCivil(rs.getLong("IDT_ESTADO_CIVIL"));
		p.setTelefono(rs.getString("TELEFONO"));
		p.setDireccion(rs.getString("DIRECCION"));
		p.setEmail(rs.getString("EMAIL"));
		p.setCodUbigeo(rs.getString("COD_UBIGEO"));
		p.setFlagActivo(rs.getInt("FLAG_ACTIVO"));
		p.setObservacion(rs.getString("OBSERVACION"));
		return p;
	}
}
