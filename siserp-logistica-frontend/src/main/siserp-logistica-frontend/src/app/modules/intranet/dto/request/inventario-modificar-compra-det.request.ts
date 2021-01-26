import { InventarioCodigoBarraDetModificarRequest } from "./inventario-codigo-barra-det-modificar.request";

export class InventarioModificarCompraDetRequest {
    idDetCompraEstante: number;
    idEstante: number;
    idInventario: number;
    idProducto: number;
    cantidad: number;
    precio: number;
    listaCodigoBarra: InventarioCodigoBarraDetModificarRequest[];
    listaCodigoBarraElim: InventarioCodigoBarraDetModificarRequest[];

    nomProducto: string;
    precioCompra: number;
    ganancia: number;
    idAlmacen: number;
    nomAlmacen: string;
    nomEstante: string;

    precioAnterior: number;
}