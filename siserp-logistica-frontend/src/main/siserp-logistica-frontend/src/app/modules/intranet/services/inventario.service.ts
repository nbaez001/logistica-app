import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InventarioBuscarCompraRequest } from '../dto/request/inventario-buscar-compra.request';
import { InventarioBuscarInventCompraRequest } from '../dto/request/inventario-buscar-invent-compra.request';
import { InventarioCodigoBarraListarRequest } from '../dto/request/inventario-codigo-barra-listar.request';
import { InventarioEstanteListarRequest } from '../dto/request/inventario-estante-listar.request';
import { InventarioInventariarCompraRequest } from '../dto/request/inventario-invent-compra.request';
import { InventarioListarRequest } from '../dto/request/inventario-listar.request';
import { InventarioModificarCompraRequest } from '../dto/request/inventario-modificar-compra.request';
import { InventarioUbicarProductoRequest } from '../dto/request/inventario-ubicar-producto.request';
import { InventarioAlmacenListarResponse } from '../dto/response/inventario-almacen-listar.response';
import { InventarioBuscarCompraResponse } from '../dto/response/inventario-buscar-compra.response';
import { InventarioBuscarInventCompraResponse } from '../dto/response/inventario-buscar-invent-compra.response';
import { InventarioCodigoBarraListarResponse } from '../dto/response/inventario-codigo-barra-listar.response';
import { InventarioEstanteListarResponse } from '../dto/response/inventario-estante-listar.response';
import { InventarioListarResponse } from '../dto/response/inventario-listar.response';
import { InventarioUbicarProductoResponse } from '../dto/response/inventario-ubicar-producto.response';
import { OutResponse } from '../dto/response/out.response';

@Injectable()
export class InventarioService {

  constructor(private http: HttpClient) { }

  public inventariarCompra(req: InventarioInventariarCompraRequest): Observable<OutResponse<any>> {
    return this.http.post<OutResponse<any>>(`${environment.logisticaBackendUrl}/inventario/inventariarCompra`, req);
  }

  public buscarUbicacionProducto(req: InventarioUbicarProductoRequest): Observable<OutResponse<InventarioUbicarProductoResponse[]>> {
    return this.http.post<OutResponse<InventarioUbicarProductoResponse[]>>(`${environment.logisticaBackendUrl}/inventario/buscarUbicacionProducto`, req);
  }

  public buscarCompra(req: InventarioBuscarCompraRequest): Observable<OutResponse<InventarioBuscarCompraResponse>> {
    return this.http.post<OutResponse<InventarioBuscarCompraResponse>>(`${environment.logisticaBackendUrl}/inventario/buscarCompra`, req);
  }

  public listarAlmacen(): Observable<OutResponse<InventarioAlmacenListarResponse[]>> {
    return this.http.post<OutResponse<InventarioAlmacenListarResponse[]>>(`${environment.logisticaBackendUrl}/inventario/listarAlmacen`, {});
  }

  public listarEstante(req: InventarioEstanteListarRequest): Observable<OutResponse<InventarioEstanteListarResponse[]>> {
    return this.http.post<OutResponse<InventarioEstanteListarResponse[]>>(`${environment.logisticaBackendUrl}/inventario/listarEstante`, req);
  }

  public buscarInventarioCompra(req: InventarioBuscarInventCompraRequest): Observable<OutResponse<InventarioBuscarInventCompraResponse>> {
    return this.http.post<OutResponse<InventarioBuscarInventCompraResponse>>(`${environment.logisticaBackendUrl}/inventario/buscarInventarioCompra`, req);
  }

  public listaCodigoBarra(req: InventarioCodigoBarraListarRequest): Observable<OutResponse<InventarioCodigoBarraListarResponse[]>> {
    return this.http.post<OutResponse<InventarioCodigoBarraListarResponse[]>>(`${environment.logisticaBackendUrl}/inventario/listaCodigoBarra`, req);
  }

  public modificarInventarioCompra(req: InventarioModificarCompraRequest): Observable<OutResponse<any>> {
    return this.http.post<OutResponse<any>>(`${environment.logisticaBackendUrl}/inventario/modificarInventarioCompra`, req);
  }

  public listarInventario(req: InventarioListarRequest): Observable<OutResponse<InventarioListarResponse[]>> {
    return this.http.post<OutResponse<InventarioListarResponse[]>>(`${environment.logisticaBackendUrl}/inventario/listarInventario`, req);
  }
}
