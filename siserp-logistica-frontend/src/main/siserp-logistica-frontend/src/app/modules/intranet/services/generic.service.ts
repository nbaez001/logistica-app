import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OutResponse } from '../dto/response/out.response';
import { Observable } from 'rxjs';
import { MaestraRequest } from '../dto/request/maestra.request';
import { environment } from 'src/environments/environment';
import { BuscarMaestraRequest } from '../dto/request/buscar-maestra.request';
import { MaestraResponse } from '../dto/response/maestra.response';

@Injectable()
export class GenericService {

  constructor(private http: HttpClient) { }

  public listarMaestra(req: BuscarMaestraRequest): Observable<OutResponse<MaestraResponse[]>> {
    return this.http.post<OutResponse<MaestraResponse[]>>(`${environment.logisticaBackendUrl}/generic/listarMaestra`, req);
  }

  public registrarMaestra(req: MaestraRequest): Observable<OutResponse<MaestraResponse>> {
    return this.http.post<OutResponse<MaestraResponse>>(`${environment.logisticaBackendUrl}/generic/registrarMaestra`, req);
  }

  public actualizarMaestra(req: MaestraRequest): Observable<OutResponse<MaestraResponse>> {
    return this.http.post<OutResponse<MaestraResponse>>(`${environment.logisticaBackendUrl}/generic/actualizarMaestra`, req);
  }

  public eliminarMaestra(req: MaestraRequest): Observable<OutResponse<any>> {
    return this.http.post<OutResponse<any>>(`${environment.logisticaBackendUrl}/generic/eliminarMaestra`, req);
  }

  public descargarArchivo(req: any, path: string): Observable<OutResponse<any>> {
    return this.http.post<OutResponse<any>>(`${environment.logisticaBackendUrl}/${path}`, req);
  }

  public convertArchivoToBlob(data: Blob): Blob {
    return new Blob([data], { type: 'application/pdf' });
  }

  public convertToBlobFromByte(fResp: any): Blob {
    const byteCharacters = atob(fResp.data);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: fResp.type });
    const resultBlob: any = blob;
    resultBlob.lastModifiedDate = new Date();
    resultBlob.name = fResp.nombre;

    return blob;

  }
}
