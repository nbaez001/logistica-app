import { ProductoCargarExcelDetRequest } from "./producto-cargar-excel-det.request";

export class ProductoCargarExcelRequest {
    idtTipo: number;
    idEstante: number;
    idUsuarioCrea: number;
    fecUsuarioCrea: Date;
    listaProducto: ProductoCargarExcelDetRequest[];
}