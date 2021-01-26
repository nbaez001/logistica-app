import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OutResponse } from '../dto/response/out.response';
import { environment } from 'src/environments/environment';
import { ProductoRegistrarRequest } from '../dto/request/producto-registrar.request';
import { ProductoBuscarRequest } from '../dto/request/producto-buscar.request';
import { ProductoListarResponse } from '../dto/response/producto-listar.response';
import { ProductoRegistrarResponse } from '../dto/response/producto-registrar.response';
import { ProductoModificarResponse } from '../dto/response/producto-modificar.response';
import { ProductoModificarRequest } from '../dto/request/producto-modificar.request';
import { ProductoEliminarRequest } from '../dto/request/producto-eliminar.request';
import { ProductoListarRequest } from '../dto/request/producto-listar.request';
import { ProductoCargarExcelResponse } from '../dto/response/producto-cargar-excel.response';
import { ProductoCargarExcelRequest } from '../dto/request/producto-cargar-excel.request';

@Injectable()
export class ProductoService {

  constructor(private http: HttpClient) { }

  public listarProducto(req: ProductoListarRequest): Observable<OutResponse<ProductoListarResponse[]>> {
    return this.http.post<OutResponse<ProductoListarResponse[]>>(`${environment.logisticaBackendUrl}/producto/listarProducto`, req);
  }

  public registrarProducto(req: ProductoRegistrarRequest): Observable<OutResponse<ProductoRegistrarResponse>> {
    return this.http.post<OutResponse<ProductoRegistrarResponse>>(`${environment.logisticaBackendUrl}/producto/registrarProducto`, req);
  }

  public actualizarProducto(req: ProductoModificarRequest): Observable<OutResponse<ProductoModificarResponse>> {
    return this.http.post<OutResponse<ProductoModificarResponse>>(`${environment.logisticaBackendUrl}/producto/actualizarProducto`, req);
  }

  public eliminarProducto(req: ProductoEliminarRequest): Observable<OutResponse<any>> {
    return this.http.post<OutResponse<any>>(`${environment.logisticaBackendUrl}/producto/eliminarProducto`, req);
  }

  public buscarProducto(req: ProductoBuscarRequest): Observable<OutResponse<ProductoListarResponse[]>> {
    return this.http.post<OutResponse<ProductoListarResponse[]>>(`${environment.logisticaBackendUrl}/producto/buscarProducto`, req);
  }

  public cargarProductoDesdeExcel(req: ProductoCargarExcelRequest): Observable<OutResponse<ProductoCargarExcelResponse>> {
    return this.http.post<OutResponse<ProductoCargarExcelResponse>>(`${environment.logisticaBackendUrl}/producto/cargarProductoDesdeExcel`, req);
  }
}
