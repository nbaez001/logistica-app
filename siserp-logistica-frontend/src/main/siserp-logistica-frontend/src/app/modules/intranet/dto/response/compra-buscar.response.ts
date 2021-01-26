import { CompraBuscarDetalleListarResponse } from "./compra-buscar-detalle-listar.response";

export class CompraBuscarResponse {
    idProveedor: number;
    nomProveedor: string;
    tipDocProveedor: number;
    nroDocProveedor: string;

    idtTipoComprobante: number;
    montoTotal: number;
    serieComprobante: string;
    nroComprobante: string;
    nroOrdenCompra: string;
    observacion: string;
    fecha: Date;
    listaDetalleCompra: CompraBuscarDetalleListarResponse[];
}