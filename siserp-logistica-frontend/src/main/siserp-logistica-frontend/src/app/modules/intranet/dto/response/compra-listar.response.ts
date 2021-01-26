export class CompraListarResponse {
    id: number;
    idProveedor: number;
    idtTipoComprobante: number;
    nomTipoComprobante: string;
    codigo: string;
    montoTotal: number;
    serieComprobante: string;
    nroComprobante: string;
    nroOrdenCompra: string;
    observacion: string;
    fecha: Date;
    flagActivo: number;
    idtEstadoCompra: number;
    nomEstadoCompra: string;
    valEstadoCompra: string;
    idUsuarioCrea: number;
    fecUsuarioCrea: Date;
    idUsuarioMod: number;
    fecUsuarioMod: Date;
}