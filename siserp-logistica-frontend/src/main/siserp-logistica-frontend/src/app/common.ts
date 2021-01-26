import { PermisoResponse } from "./core/model/permiso.response";

export const EMPRESA = {
    NOMBRE: '',
    RUC: '20494506131'
};

export const MENSAJES_PANEL = {
    INTRANET: {
        CONFIGURACION: {
            MAESTRA: {
                REGISTRAR: {
                    TITLE: 'REGISTRAR MAESTRA'
                },
                MODIFICAR: {
                    TITLE: 'MODIFICAR MAESTRA'
                },
                REGISTRARCHILD: {
                    TITLE: 'REGISTRAR SUB-ITEMS MAESTRA'
                }
            }
        },
        ADMINISTRACION: {
            PRODUCTO: {
                REGISTRAR: {
                    TITLE: 'REGISTRAR PRODUCTO'
                },
                EDITAR: {
                    TITLE: 'MODIFICAR PRODUCTO'
                },
                CARGA_MASIVA: {
                    TITLE: 'CARGAR PRODUCTOS MASIVAMENTE'
                }
            },
            PROVEEDOR: {
                REGISTRAR: 'REGISTRAR PROVEEDOR',
                EDITAR: 'MODIFICAR PROVEEDOR',
                REGISTRAR_REP_LEGAL: 'REGISTRAR REPRESENTANTE LEGAL'
            },
            MARCA: {
                REGISTRAR: {
                    TITLE: 'REGISTRAR MARCA'
                },
                EDITAR: {
                    TITLE: 'MODIFICAR MARCA'
                }
            }
        },
        ALMACEN: {
            ALMACEN: {
                REGISTRAR: {
                    TITLE: 'REGISTRAR ALMACEN'
                },
                EDITAR: {
                    TITLE: 'MODIFICAR ALMACEN'
                }
            },
            ESTANTE: {
                REGISTRAR: {
                    TITLE: 'REGISTRAR ESTANTE'
                },
                EDITAR: {
                    TITLE: 'MODIFICAR ESTANTE'
                }
            }
        },
        ADQUISICION: {
            COMPRA: {
                REGISTRAR: {
                    TITLE: 'REGISTRAR COMPRA'
                },
                EDITAR: {
                    TITLE: 'MODIFICAR COMPRA'
                }
            },
            COMPRA_DETALLE: {
                REGISTRAR: {
                    TITLE: 'REGISTRAR DETALLE COMPRA'
                },
                EDITAR: {
                    TITLE: 'MODIFICAR DETALLE COMPRA'
                }
            },
            INVENTARIO: {
                ALMACENAR: {
                    TITLE: 'ALMACENAR COMPRA'
                },
                MODIFICAR_ALMACENAR: {
                    TITLE: 'MODIFICAR ALMACENAMIENTO COMPRA'
                },
                UBICACION: {
                    TITLE: 'UBICACIONES DE PRODUCTO'
                },
                ESCANEAR: {
                    TITLE: 'ESCANEAR CODIGO DE BARRA'
                }
            }
        }
    }
};

export const MENSAJES = {
    ERROR_FOREIGN_KEY: 'No se eliminar una categoria que tiene sub items',
    EXITO_OPERACION: 'Operacion exitosa',
    MSG_CONFIRMACION: '¿Esta seguro de continuar?',
    MSG_CONFIRMACION_PROD_REPETIDO: 'La lista contiene nombre de productos repetidos\n ¿Esta seguro de continuar?',
};

export const CONSTANTES = {
    ACTIVO: 1,
    INACTIVO: 0,
    ID_MODULO_APP: 1,
    R_COD_EXITO: 0,
    TIP_PROVEEDOR_NATURAL: '2',
    TIP_PROVEEDOR_JURIDICO: '1',
    COD_CONFIRMACION: 1,
    COD_SIN_CONFIRMACION: 0,

    VAL_ESTADO_COMPRA_REGISTRADO: '1',
    VAL_ESTADO_COMPRA_ALMACENADO: '2',
};

export const ACTIVO_LISTA: any[] = [{ id: 1, nombre: 'ACTIVO' }, { id: 0, nombre: 'INACTIVO' }]

export const MAESTRAS = {
    TIPO_PROVEEDOR: 1,
    GENERO: 2,
    ESTADO_COMPRA: 3,
    TIPO_PRODUCTO: 4,
    ESTADO_CIVIL: 5,
    TIPO_UNIDAD_MEDIDA_COMERCIAL: 103,
    TIPO_DOCUMENTO_IDENTIDAD: 106,

    ESTADO_REGISTRO: 1,
    ESTADO_VENTA: 6,
    TIPO_COMPROBANTE: 101,
};

export const FILE = {
    FILE_UPLOAD_MAX_SIZE: 52428800,
    FILE_UPLOAD_MAX_SIZE_MSG: function (size: number) {
        return 'SOLO SE PERMITEN ARCHIVOS DE 50MB COMO MAXIMO\n TAMAÑO DE ARCHIVO: ' + parseFloat((size / 1024 / 1024) + '').toFixed(2) + 'MB';
    }
}