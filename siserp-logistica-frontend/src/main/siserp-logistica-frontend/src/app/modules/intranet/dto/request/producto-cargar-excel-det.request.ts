export class ProductoCargarExcelDetRequest {
    id: number;
    marca: string;
    idtUnidadMedida: number;
    nomUnidadMedida: string;
    codigo: string;
    nombre: string;
    descripcion: string;
    cantidad: number;
    precio: number;

    flgValidacion: boolean;
    validacion: string;
}