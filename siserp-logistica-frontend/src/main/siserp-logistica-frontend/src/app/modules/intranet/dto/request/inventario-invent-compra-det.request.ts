import { InventarioCodigoBarraDetRequest } from "./inventario-codigo-barra-det.request";

export class InventarioInventariarCompraDetRequest {
    idDetalleCompra: number;
    idProducto: number;
    idEstante: number;
    cantidad: number;
    precio: number;
    listaCodigoBarra: InventarioCodigoBarraDetRequest[];

    nomProducto: string;
    precioCompra: number;
    ganancia: number;
    idAlmacen: number;
    nomAlmacen: string;
    nomEstante: string;

    precioAnterior: number;
}