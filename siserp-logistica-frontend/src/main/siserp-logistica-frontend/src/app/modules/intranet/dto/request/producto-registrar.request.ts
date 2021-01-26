export class ProductoRegistrarRequest {
    id: number;
    idMarca: number;
    nomMarca: string;
    idtTipo: number;
    nomTipo: string;
    idtUnidadMedida: number;
    nomUnidadMedida: string;
    codigo: string;
    nombre: string;
    descripcion: string;
    flagActivo: number;
    idUsuarioCrea: number;
    fecUsuarioCrea: Date;
    idUsuarioMod: number;
    fecUsuarioMod: Date;
}