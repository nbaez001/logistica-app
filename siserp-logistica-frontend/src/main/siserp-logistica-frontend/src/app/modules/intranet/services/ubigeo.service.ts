import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UbigeoDistritoListarRequest } from '../dto/request/ubigeo-distrito-listar.request';
import { UbigeoDistritoListarXUbigeoRequest } from '../dto/request/ubigeo-distrito-listar_x_ubig.request';
import { UbigeoProvinciaListarRequest } from '../dto/request/ubigeo-provincia-listar.request';
import { UbigeoProvinciaListarXUbigeoRequest } from '../dto/request/ubigeo-provincia-listar_x_ubig.request';
import { OutResponse } from '../dto/response/out.response';
import { UbigeoDepartamentoListarResponse } from '../dto/response/ubigeo-departamento-listar.response';
import { UbigeoDistritoListarResponse } from '../dto/response/ubigeo-distrito-listar.response';
import { UbigeoProvinciaListarResponse } from '../dto/response/ubigeo-provincia-listar.response';

@Injectable()
export class UbigeoService {

  constructor(private http: HttpClient) { }

  public listarDepartamento(): Observable<OutResponse<UbigeoDepartamentoListarResponse[]>> {
    return this.http.post<OutResponse<UbigeoDepartamentoListarResponse[]>>(`${environment.logisticaBackendUrl}/ubigeo/listarDepartamento`, {});
  }

  public listarProvincia(req: UbigeoProvinciaListarRequest): Observable<OutResponse<UbigeoProvinciaListarResponse[]>> {
    return this.http.post<OutResponse<UbigeoProvinciaListarResponse[]>>(`${environment.logisticaBackendUrl}/ubigeo/listarProvincia`, req);
  }

  public listarDistrito(req: UbigeoDistritoListarRequest): Observable<OutResponse<UbigeoDistritoListarResponse[]>> {
    return this.http.post<OutResponse<UbigeoDistritoListarResponse[]>>(`${environment.logisticaBackendUrl}/ubigeo/listarDistrito`, req);
  }

  public listarProvinciaXUbigeo(req: UbigeoProvinciaListarXUbigeoRequest): Observable<OutResponse<UbigeoProvinciaListarResponse[]>> {
    return this.http.post<OutResponse<UbigeoProvinciaListarResponse[]>>(`${environment.logisticaBackendUrl}/ubigeo/listarProvinciaXUbigeo`, req);
  }

  public listarDistritoXUbigeo(req: UbigeoDistritoListarXUbigeoRequest): Observable<OutResponse<UbigeoDistritoListarResponse[]>> {
    return this.http.post<OutResponse<UbigeoDistritoListarResponse[]>>(`${environment.logisticaBackendUrl}/ubigeo/listarDistritoXUbigeo`, req);
  }
}
