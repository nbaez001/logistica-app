import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CompraEliminarRequest } from '../dto/request/compra-eliminar.request';
import { CompraListarRequest } from '../dto/request/compra-listar.request';
import { CompraModificarRequest } from '../dto/request/compra-modificar-request';
import { CompraRegistrarRequest } from '../dto/request/compra-registrar.request';
import { CompraProveedorBuscarRequest } from '../dto/request/compra-proveedor-buscar.reques';
import { CompraListarResponse } from '../dto/response/compra-listar.response';
import { CompraRegistrarResponse } from '../dto/response/compra-registrar.response';
import { OutResponse } from '../dto/response/out.response';
import { CompraProveedorBuscarResponse } from '../dto/response/compra-proveedor-buscar.response';
import { CompraProductoBuscarRequest } from '../dto/request/compra-producto-buscar.request';
import { CompraProductoBuscarResponse } from '../dto/response/compra-producto-buscar.response';
import { CompraBuscarRequest } from '../dto/request/compra-buscar.request';
import { CompraBuscarResponse } from '../dto/response/compra-buscar.response';

@Injectable()
export class CompraService {

  constructor(private http: HttpClient) { }

  public listarCompra(req: CompraListarRequest): Observable<OutResponse<CompraListarResponse[]>> {
    return this.http.post<OutResponse<CompraListarResponse[]>>(`${environment.logisticaBackendUrl}/compra/listarCompra`, req);
  }

  public registrarCompra(req: CompraRegistrarRequest): Observable<OutResponse<CompraRegistrarResponse>> {
    return this.http.post<OutResponse<CompraRegistrarResponse>>(`${environment.logisticaBackendUrl}/compra/registrarCompra`, req);
  }

  public modificarCompra(req: CompraModificarRequest): Observable<OutResponse<any>> {
    return this.http.post<OutResponse<any>>(`${environment.logisticaBackendUrl}/compra/modificarCompra`, req);
  }

  public eliminarCompra(req: CompraEliminarRequest): Observable<OutResponse<any>> {
    return this.http.post<OutResponse<any>>(`${environment.logisticaBackendUrl}/compra/eliminarCompra`, req);
  }

  public buscarCompra(req: CompraBuscarRequest): Observable<OutResponse<CompraBuscarResponse>> {
    return this.http.post<OutResponse<CompraBuscarResponse>>(`${environment.logisticaBackendUrl}/compra/buscarCompra`, req);
  }

  public buscarProvedor(req: CompraProveedorBuscarRequest): Observable<OutResponse<CompraProveedorBuscarResponse[]>> {
    return this.http.post<OutResponse<CompraProveedorBuscarResponse[]>>(`${environment.logisticaBackendUrl}/compra/buscarProveedor`, req);
  }

  public buscarProducto(req: CompraProductoBuscarRequest): Observable<OutResponse<CompraProductoBuscarResponse[]>> {
    return this.http.post<OutResponse<CompraProductoBuscarResponse[]>>(`${environment.logisticaBackendUrl}/compra/buscarProducto`, req);
  }
}
