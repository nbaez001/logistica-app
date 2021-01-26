package com.besoft.siserp.lgtc.dto.response.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.besoft.siserp.lgtc.dto.response.CompraListarResponse;

public class CompraListarResponseMapper implements RowMapper<CompraListarResponse> {

	public CompraListarResponse mapRow(ResultSet rs, int rowNum) throws SQLException {
		CompraListarResponse c = new CompraListarResponse();
		c.setId(rs.getLong("ID"));
		c.setIdProveedor(rs.getLong("ID_PROVEEDOR"));
		c.setIdtTipoComprobante(rs.getLong("IDT_TIPO_COMPROBANTE"));
		c.setNomTipoComprobante(rs.getString("NOM_TIPO_COMPROBANTE"));
		c.setCodigo(rs.getString("CODIGO"));
		c.setMontoTotal(rs.getDouble("MONTO_TOTAL"));
		c.setSerieComprobante(rs.getString("SERIE_COMPROBANTE"));
		c.setNroComprobante(rs.getString("NRO_COMPROBANTE"));
		c.setNroOrdenCompra(rs.getString("NRO_ORDEN_COMPRA"));
		c.setObservacion(rs.getString("OBSERVACION"));
		c.setFecha(rs.getDate("FECHA"));
		c.setFlagActivo(rs.getInt("FLAG_ACTIVO"));
		c.setIdtEstadoCompra(rs.getLong("IDT_ESTADO_COMPRA"));
		c.setNomEstadoCompra(rs.getString("NOM_ESTADO_COMPRA"));
		c.setValEstadoCompra(rs.getString("VAL_ESTADO_COMPRA"));
		c.setIdUsuarioCrea(rs.getLong("ID_USUARIO_CREA"));
		c.setFecUsuarioCrea(rs.getDate("FEC_USUARIO_CREA"));
		c.setIdUsuarioMod(rs.getLong("ID_USUARIO_MOD"));
		c.setFecUsuarioMod(rs.getDate("FEC_USUARIO_MOD"));
		return c;
	}

}
