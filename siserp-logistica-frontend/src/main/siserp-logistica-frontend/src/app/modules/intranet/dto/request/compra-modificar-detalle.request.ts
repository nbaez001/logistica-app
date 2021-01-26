export class CompraModificarDetalleRequest {
    id: number;
    idProducto: number;
    nomProducto: string;
    cantidad: number;
    cantidadPerfecto: number;
    cantidadDaniado: number;
    precioUnitario: number;
    subTotal: number;
    flagActivo: number;
}