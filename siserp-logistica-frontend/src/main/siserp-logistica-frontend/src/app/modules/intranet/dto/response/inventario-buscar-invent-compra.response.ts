import { InventarioBuscarInventCompraDetResponse } from "./inventario-buscar-invent-compra-det.response";

export class InventarioBuscarInventCompraResponse {
    codCompra: string;
    nomProveedor: string;
    tipDocProveedor: number;
    nroDocProveedor: string;
    montoTotal: number;
    observacion: string;
    listaDetalleCompra: InventarioBuscarInventCompraDetResponse[];
}