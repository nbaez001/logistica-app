import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OutResponse } from '../dto/response/out.response';
import { environment } from 'src/environments/environment';
import { ProveedorNaturalRegistrarRequest } from '../dto/request/proveedor-natural-registrar.request';
import { ProveedorJuridicoRegistrarRequest } from '../dto/request/proveedor-juridico-registrar.request';
import { ProveedorJuridRepLegalRegistrarRequest } from '../dto/request/proveedor-jurid-rep-legal-registrar.request';
import { ProveedorJuridRepLegalBuscarRequest } from '../dto/request/proveedor-jurid-rep-legal-buscar.request';
import { ProveedorJuridRepLegalEliminarRequest } from '../dto/request/proveedor-jurid-rep-legal-eliminar.request';
import { ProveedorJuridRepLegalListarResponse } from '../dto/response/proveedor-jurid-rep-legal-listar.response';
import { ProveedorListarResponse } from '../dto/response/proveedor-listar.response';
import { ProveedorListarRequest } from '../dto/request/proveedor-listar.request';
import { ProveedorNaturalRegistrarResponse } from '../dto/response/proveedor-natural-registrar.response';
import { ProveedorJuridicoRegistrarResponse } from '../dto/response/proveedor-juridico-registrar.response';
import { ProveedorJuridRepLegalRegistrarResponse } from '../dto/response/proveedor-jurid-rep-legal-registrar.response';
import { ProveedorNaturalModificarRequest } from '../dto/request/proveedor-natural-modificar.request';
import { ProveedorJuridicoModificarRequest } from '../dto/request/proveedor-juridico-modificar.request';
import { ProveedorJuridRepLegalModificarRequest } from '../dto/request/proveedor-jurid-rep-legal-modificar.request';
import { ProveedorJuridRepLegalListarRequest } from '../dto/request/proveedor-jurid-rep-legal-listar.request';
import { ProveedorJuridRepLegalBuscarResponse } from '../dto/response/proveedor-jurid-rep-legal-buscar.response';
import { ProveedorEliminarRequest } from '../dto/request/proveedor-eliminar.request';

@Injectable()
export class ProveedorService {

  constructor(private http: HttpClient) { }

  public listarProveedor(req: ProveedorListarRequest): Observable<OutResponse<ProveedorListarResponse[]>> {
    return this.http.post<OutResponse<ProveedorListarResponse[]>>(`${environment.logisticaBackendUrl}/proveedor/listarProveedor`, req);
  }

  public registrarProveedorNatural(req: ProveedorNaturalRegistrarRequest): Observable<OutResponse<ProveedorNaturalRegistrarResponse>> {
    return this.http.post<OutResponse<ProveedorNaturalRegistrarResponse>>(`${environment.logisticaBackendUrl}/proveedor/registrarProveedorNatural`, req);
  }

  public modificarProveedorNatural(req: ProveedorNaturalModificarRequest): Observable<OutResponse<any>> {
    return this.http.post<OutResponse<any>>(`${environment.logisticaBackendUrl}/proveedor/actualizarProveedorNatural`, req);
  }

  public registrarProveedorJuridico(req: ProveedorJuridicoRegistrarRequest): Observable<OutResponse<ProveedorJuridicoRegistrarResponse>> {
    return this.http.post<OutResponse<ProveedorJuridicoRegistrarResponse>>(`${environment.logisticaBackendUrl}/proveedor/registrarProveedorJuridico`, req);
  }

  public modificarProveedorJuridico(req: ProveedorJuridicoModificarRequest): Observable<OutResponse<any>> {
    return this.http.post<OutResponse<any>>(`${environment.logisticaBackendUrl}/proveedor/actualizarProveedorJuridico`, req);
  }

  public eliminarProveedor(req: ProveedorEliminarRequest): Observable<OutResponse<any>> {
    return this.http.post<OutResponse<any>>(`${environment.logisticaBackendUrl}/proveedor/eliminarProveedor`, req);
  }

  public registrarRepresentanteLegal(req: ProveedorJuridRepLegalRegistrarRequest): Observable<OutResponse<ProveedorJuridRepLegalRegistrarResponse>> {
    return this.http.post<OutResponse<ProveedorJuridRepLegalRegistrarResponse>>(`${environment.logisticaBackendUrl}/proveedor/registrarRepresentanteLegal`, req);
  }

  public actualizarRepresentanteLegal(req: ProveedorJuridRepLegalModificarRequest): Observable<OutResponse<any>> {
    return this.http.post<OutResponse<any>>(`${environment.logisticaBackendUrl}/proveedor/actualizarRepresentanteLegal`, req);
  }

  public listarRepresentanteLegal(req: ProveedorJuridRepLegalListarRequest): Observable<OutResponse<ProveedorJuridRepLegalListarResponse[]>> {
    return this.http.post<OutResponse<ProveedorJuridRepLegalListarResponse[]>>(`${environment.logisticaBackendUrl}/proveedor/listarRepresentanteLegal`, req);
  }

  public obtenerRepresentanteLegal(req: ProveedorJuridRepLegalBuscarRequest): Observable<OutResponse<ProveedorJuridRepLegalBuscarResponse>> {
    return this.http.post<OutResponse<ProveedorJuridRepLegalBuscarResponse>>(`${environment.logisticaBackendUrl}/proveedor/obtenerRepresentanteLegal`, req);
  }

  public eliminarRepresentanteLegal(req: ProveedorJuridRepLegalEliminarRequest): Observable<OutResponse<any>> {
    return this.http.post<OutResponse<any>>(`${environment.logisticaBackendUrl}/proveedor/eliminarRepresentanteLegal`, req);
  }
}
