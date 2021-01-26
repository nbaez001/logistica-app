import { AlmacenListarResponse } from "./almacen-listar.response";

export class InventarioUbicarProductoResponse {
    idProducto: number;
    idEstante: number;
    nomEstante: string;
    idAlmacen: number;
    nomAlmacen: string;
    cantidad: number;
    precio: number;
    flagActivo: number;
}