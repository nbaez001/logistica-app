import { InventarioInventariarCompraDetRequest } from "./inventario-invent-compra-det.request";

export class InventarioInventariarCompraRequest {
    idCompra: number;
    idtEstadoCompra: number;
    idUsuarioCrea: number;
    fecUsuarioCrea: Date;
    listaDetalleInventario: InventarioInventariarCompraDetRequest[];
}