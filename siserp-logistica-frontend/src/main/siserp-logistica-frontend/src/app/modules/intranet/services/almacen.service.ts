import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AlmacenEliminarRequest } from '../dto/request/almacen-eliminar.request';
import { AlmacenEstanteEliminarRequest } from '../dto/request/almacen-estante-eliminar.request';
import { AlmacenEstanteListarRequest } from '../dto/request/almacen-estante-listar.request';
import { AlmacenEstanteModificarRequest } from '../dto/request/almacen-estante-modificar.request';
import { AlmacenEstanteRegistrarRequest } from '../dto/request/almacen-estante-registrar.request';
import { AlmacenListarRequest } from '../dto/request/almacen-listar.request';
import { AlmacenModificarRequest } from '../dto/request/almacen-modificar.request';
import { AlmacenRegistrarRequest } from '../dto/request/almacen-registrar.request';
import { AlmacenEstanteListarResponse } from '../dto/response/almacen-estante-listar.response';
import { AlmacenEstanteRegistrarResponse } from '../dto/response/almacen-estante-registrar.response';
import { AlmacenListarResponse } from '../dto/response/almacen-listar.response';
import { AlmacenRegistrarResponse } from '../dto/response/almacen-registrar.response';
import { OutResponse } from '../dto/response/out.response';

@Injectable()
export class AlmacenService {
  constructor(private http: HttpClient) { }

  public listarAlmacen(req: AlmacenListarRequest): Observable<OutResponse<AlmacenListarResponse[]>> {
    return this.http.post<OutResponse<AlmacenListarResponse[]>>(`${environment.logisticaBackendUrl}/almacen/listarAlmacen`, req);
  }

  public registrarAlmacen(req: AlmacenRegistrarRequest): Observable<OutResponse<AlmacenRegistrarResponse>> {
    return this.http.post<OutResponse<AlmacenRegistrarResponse>>(`${environment.logisticaBackendUrl}/almacen/registrarAlmacen`, req);
  }

  public modificarAlmacen(req: AlmacenModificarRequest): Observable<OutResponse<any>> {
    return this.http.post<OutResponse<any>>(`${environment.logisticaBackendUrl}/almacen/modificarAlmacen`, req);
  }

  public eliminarAlmacen(req: AlmacenEliminarRequest): Observable<OutResponse<any>> {
    return this.http.post<OutResponse<any>>(`${environment.logisticaBackendUrl}/almacen/eliminarAlmacen`, req);
  }

  public listarEstante(req: AlmacenEstanteListarRequest): Observable<OutResponse<AlmacenEstanteListarResponse[]>> {
    return this.http.post<OutResponse<AlmacenEstanteListarResponse[]>>(`${environment.logisticaBackendUrl}/almacen/listarEstante`, req);
  }

  public registrarEstante(req: AlmacenEstanteRegistrarRequest): Observable<OutResponse<AlmacenEstanteRegistrarResponse>> {
    return this.http.post<OutResponse<AlmacenEstanteRegistrarResponse>>(`${environment.logisticaBackendUrl}/almacen/registrarEstante`, req);
  }

  public modificarEstante(req: AlmacenEstanteModificarRequest): Observable<OutResponse<any>> {
    return this.http.post<OutResponse<any>>(`${environment.logisticaBackendUrl}/almacen/modificarEstante`, req);
  }

  public eliminarEstante(req: AlmacenEstanteEliminarRequest): Observable<OutResponse<any>> {
    return this.http.post<OutResponse<any>>(`${environment.logisticaBackendUrl}/almacen/eliminarEstante`, req);
  }
}
