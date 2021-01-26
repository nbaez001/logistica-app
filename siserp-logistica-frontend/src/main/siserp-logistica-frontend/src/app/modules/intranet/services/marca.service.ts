import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MarcaEliminarRequest } from '../dto/request/marca-eliminar.request';
import { MarcaListarRequest } from '../dto/request/marca-listar.request';
import { MarcaModificarRequest } from '../dto/request/marca-modificar.request';
import { MarcaRegistrarRequest } from '../dto/request/marca-registrar.request';
import { MarcaListarResponse } from '../dto/response/marca-listar.response';
import { MarcaRegistrarResponse } from '../dto/response/marca-registrar.response';
import { OutResponse } from '../dto/response/out.response';

@Injectable()
export class MarcaService {

  constructor(private http: HttpClient) { }

  public listarMarca(req: MarcaListarRequest): Observable<OutResponse<MarcaListarResponse[]>> {
    return this.http.post<OutResponse<MarcaListarResponse[]>>(`${environment.logisticaBackendUrl}/marca/listarMarca`, req);
  }

  public registrarMarca(req: MarcaRegistrarRequest): Observable<OutResponse<MarcaRegistrarResponse>> {
    return this.http.post<OutResponse<MarcaRegistrarResponse>>(`${environment.logisticaBackendUrl}/marca/registrarMarca`, req);
  }

  public modificarMarca(req: MarcaModificarRequest): Observable<OutResponse<any>> {
    return this.http.post<OutResponse<any>>(`${environment.logisticaBackendUrl}/marca/modificarMarca`, req);
  }

  public eliminarMarca(req: MarcaEliminarRequest): Observable<OutResponse<any>> {
    return this.http.post<OutResponse<any>>(`${environment.logisticaBackendUrl}/marca/eliminarMarca`, req);
  }
}
