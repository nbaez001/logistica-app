import { CompraModificarDetalleRequest } from "./compra-modificar-detalle.request";
import { CompraRegistrarDetalleRequest } from "./compra-registrar-detalle.request";

export class CompraModificarRequest {
    id: number;
    idProveedor: number;
    idtTipoComprobante: number;
    montoTotal: number;
    serieComprobante: string;
    nroComprobante: string;
    nroOrdenCompra: string;
    observacion: string;
    fecha: Date;
    flagActivo: number;
    idUsuarioMod: number;
    fecUsuarioMod: Date;
    listaDetalleCompra: CompraModificarDetalleRequest[];

    nomProveedor: string;
    tipDocProveedor: number;
    nroDocProveedor: string;

}