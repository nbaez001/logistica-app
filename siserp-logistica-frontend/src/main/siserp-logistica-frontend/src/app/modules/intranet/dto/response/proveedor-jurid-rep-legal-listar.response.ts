export class ProveedorJuridRepLegalListarResponse {
    id: number;
    idProveedor: number;
    idtTipoDocumento: number;
    nomTipoDocumento: string;
    nroDocumento: string;
    idtGenero: number;//ADICIONAR
    nomGenero: number;//ADICIONAR
    idtEstadoCivil: number;//ADICIONAR
    nomEstadoCivil: number;//ADICIONAR
    nombre: string;
    apellidoPat: string;
    apellidoMat: string;
    cargo: string;
    telefono: string;
    email: string;
    codUbigeo: string;
    direccion: string;//ADICIONAR
    fecNacimiento: Date;//ADICIONAR
    flagActivo: number;
    idUsuarioCrea: number;
    fecUsuarioCrea: Date;
    idUsuarioMod: number;
    fecUsuarioMod: Date;
}