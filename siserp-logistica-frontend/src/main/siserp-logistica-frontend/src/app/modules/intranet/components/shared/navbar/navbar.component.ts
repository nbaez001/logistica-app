import { Component, Inject, Input, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { PermisoResponse } from 'src/app/core/model/permiso.response';
import { AutenticacionService } from 'src/app/modules/sesion/service/autenticacion.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Oauth2Response } from 'src/app/modules/sesion/dto/response/oauth2-response';
import { PermisoBuscarRequest } from 'src/app/modules/sesion/dto/request/permiso-buscar.request';
import { CONSTANTES } from 'src/app/common';
import { OutResponse } from '../../../dto/response/out.response';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private spinner: NgxSpinnerService,
    @Inject(UsuarioService) public user: UsuarioService,
    @Inject(AutenticacionService) public autenticacionService: AutenticacionService,
    private router: Router,) { }

  ngOnInit() {
    if (!this.user.getId) {
      let token = this.autenticacionService.existeToken();
      if (token != null && typeof (token) !== 'undefined' && token != '') {
        let oauth = new Oauth2Response();
        oauth.refresh_token = token;
        this.autenticacionService.refreshOauth2Token(oauth).subscribe(
          (data: Oauth2Response) => {
            this.listarPermiso(data);
          }, error => {
            console.log(error);
            this.autenticacionService.salir();
          });
      } else {
        this.autenticacionService.salir();
      }
    }
  }

  listarPermiso(oauth: Oauth2Response): void {
    let req = new PermisoBuscarRequest();
    req.idUsuario = oauth.id;
    req.idModulo = CONSTANTES.ID_MODULO_APP;

    this.autenticacionService.listarPermiso(req, oauth.access_token).subscribe(
      (data: OutResponse<PermisoResponse[]>) => {
        if (data.rcodigo == 0) {
          this.user.setValues(oauth, data.objeto);
          this.autenticacionService.saveToken(oauth);
        } else {
          this.autenticacionService.salir();
        }
      }, error => {
        console.log(error);

        this.autenticacionService.salir();
      }
    );
  }

  salir(): void {
    this.autenticacionService.salir();
  }

  marcarSeleccionado(obj: PermisoResponse): void {
    this.user.listaPermiso.forEach(el => {
      if (el.id == obj.id) {
        el.selected = true;
      } else {
        el.selected = false;
      }
    });
    console.log('MENU');
    console.log(this.user.listaPermiso);
  }
}
