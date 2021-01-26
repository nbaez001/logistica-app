import { CompraRegistrarDetalleRequest } from "./compra-registrar-detalle.request";

export class CompraRegistrarRequest {
    idProveedor: number;
    idtEstadoCompra: number;
    idtTipoComprobante: number;
    montoTotal: number;
    serieComprobante: string;
    nroComprobante: string;
    nroOrdenCompra: string
    observacion: string;
    fecha: Date;
    flagActivo: number;
    idUsuarioCrea: number;
    fecUsuarioCrea: Date;
    listaDetalleCompra: CompraRegistrarDetalleRequest[];

    nomProveedor: string;
    tipDocProveedor: number;
    nroDocProveedor: string;
}