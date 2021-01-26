import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { Observable } from 'rxjs';
import { PermisoResponse } from 'src/app/core/model/permiso.response';
import { environment } from 'src/environments/environment';
import { OutResponse } from '../../intranet/dto/response/out.response';
import { PermisoBuscarRequest } from '../dto/request/permiso-buscar.request';
import { UsuarioRequest } from '../dto/request/usuario-request';
import { Oauth2Response } from '../dto/response/oauth2-response';

@Injectable()
export class AutenticacionService {
  constructor(private http: HttpClient, private router: Router) { }

  public oauth2Token(req: UsuarioRequest): Observable<Oauth2Response> {
    const params = new URLSearchParams();
    params.append('username', req.usuario);
    params.append('password', req.contrasenia);
    params.append('grant_type', 'password');

    const headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      Authorization: 'Basic ' + btoa(environment.clientId + ':' + environment.clientSecret)
    });

    return this.http.post<Oauth2Response>(`${environment.oauth2AuthorizerUrl}/oauth/token`, params.toString(), { headers });
  }

  public refreshOauth2Token(req: Oauth2Response): Observable<Oauth2Response> {
    const params = new URLSearchParams();
    params.append('refresh_token', req.refresh_token);
    params.append('grant_type', 'refresh_token');

    const headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      Authorization: 'Basic ' + btoa(environment.clientId + ':' + environment.clientSecret)
    });

    return this.http.post<Oauth2Response>(`${environment.oauth2AuthorizerUrl}/oauth/token`, params.toString(), { headers });
  }

  public listarPermiso(req: PermisoBuscarRequest, token: string): Observable<OutResponse<PermisoResponse[]>> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        authorization: 'Bearer ' + token
      })
    };
    return this.http.post<OutResponse<PermisoResponse[]>>(`${environment.oauth2AuthorizerUrl}/permiso/listarPermiso`, req, httpOptions);
  }

  saveToken(token: Oauth2Response) {
    const expireDate = token.expires_in / 3600;
    Cookie.set('refresh_token', token.refresh_token, expireDate);
  }

  existeToken(): any {
    const token = Cookie.get('refresh_token');
    return token;
  }

  saveCredenciales(idUsuario: string, passUsuario: string) {
    const expireDate = 3600 * 72 / 3600;
    Cookie.set('idUsuario', idUsuario, expireDate);
    Cookie.set('passUsuario', passUsuario, expireDate);
  }

  salir() {
    Cookie.delete('refresh_token');
    this.router.navigate(['/sesion/login']);
  }
}
