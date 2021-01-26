import { AutenticacionService } from "../../sesion/service/autenticacion.service";
import { AlmacenService } from "./almacen.service";
import { CompraService } from "./compra.service";
import { GenericService } from "./generic.service";
import { InventarioService } from "./inventario.service";
import { MarcaService } from "./marca.service";
import { ProductoService } from "./producto.service";
import { ProveedorService } from "./proveedor.service";
import { UbigeoService } from "./ubigeo.service";

export const SharedIntranetService = [
    AutenticacionService,

    GenericService,
    MarcaService,
    ProductoService,
    ProveedorService,
    UbigeoService,
    AlmacenService,
    CompraService,
    InventarioService,
];