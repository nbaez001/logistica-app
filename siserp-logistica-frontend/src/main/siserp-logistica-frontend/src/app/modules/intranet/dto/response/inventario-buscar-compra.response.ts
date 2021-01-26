import { InventarioBuscarCompraDetResponse } from "./inventario-buscar-compra-det.response";

export class InventarioBuscarCompraResponse {
    codCompra: string;
    nomProveedor: string;
    tipDocProveedor: number;
    nroDocProveedor: string;
    montoTotal: number;
    observacion: string;
    listaDetalleCompra: InventarioBuscarCompraDetResponse[];
}