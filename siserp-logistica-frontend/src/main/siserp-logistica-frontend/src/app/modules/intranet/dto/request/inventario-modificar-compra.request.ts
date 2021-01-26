import { InventarioModificarCompraDetRequest } from "./inventario-modificar-compra-det.request";

export class InventarioModificarCompraRequest {
    idUsuarioMod: number;
    fecUsuarioMod: Date;
    listaDetalleInventario: InventarioModificarCompraDetRequest[];
}