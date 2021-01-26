import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { MaestraResponse } from 'src/app/modules/intranet/dto/response/maestra.response';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GenericService } from 'src/app/modules/intranet/services/generic.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { DataDialog } from 'src/app/core/model/data-dialog.model';
import { ProveedorService } from 'src/app/modules/intranet/services/proveedor.service';
import { BuscarMaestraRequest } from 'src/app/modules/intranet/dto/request/buscar-maestra.request';
import { CONSTANTES, MAESTRAS, MENSAJES } from 'src/app/common';
import { OutResponse } from 'src/app/modules/intranet/dto/response/out.response';
import { ProveedorNaturalRegistrarRequest } from 'src/app/modules/intranet/dto/request/proveedor-natural-registrar.request';
import { ProveedorJuridicoRegistrarRequest } from 'src/app/modules/intranet/dto/request/proveedor-juridico-registrar.request';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormService } from 'src/app/core/services/form.service';
import { UbigeoDepartamentoListarResponse } from 'src/app/modules/intranet/dto/response/ubigeo-departamento-listar.response';
import { UbigeoProvinciaListarResponse } from 'src/app/modules/intranet/dto/response/ubigeo-provincia-listar.response';
import { UbigeoDistritoListarResponse } from 'src/app/modules/intranet/dto/response/ubigeo-distrito-listar.response';
import { UbigeoService } from 'src/app/modules/intranet/services/ubigeo.service';
import { UbigeoDistritoListarRequest } from 'src/app/modules/intranet/dto/request/ubigeo-distrito-listar.request';
import { UbigeoProvinciaListarRequest } from 'src/app/modules/intranet/dto/request/ubigeo-provincia-listar.request';
import { ProveedorListarResponse } from 'src/app/modules/intranet/dto/response/proveedor-listar.response';
import { ProveedorJuridicoRegistrarResponse } from 'src/app/modules/intranet/dto/response/proveedor-juridico-registrar.response';

@Component({
  selector: 'app-reg-proveedor',
  templateUrl: './reg-proveedor.component.html',
  styleUrls: ['./reg-proveedor.component.scss']
})
export class RegProveedorComponent implements OnInit {
  guardar: boolean = false;

  listaTipoProveedor: MaestraResponse[] = [];
  listaTipoDocumento: MaestraResponse[] = [];
  listaGenero: MaestraResponse[] = [];
  listaEstadoCivil: MaestraResponse[] = [];

  ubigeoDepartamentoListarResponse: UbigeoDepartamentoListarResponse[] = [];
  ubigeoProvinciaListarResponse: UbigeoProvinciaListarResponse[] = [];
  ubigeoDistritoListarResponse: UbigeoDistritoListarResponse[] = [];

  formularioGrp: FormGroup;
  proveedorNaturalEdit: ProveedorNaturalRegistrarRequest;
  formErrors: any;

  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<RegProveedorComponent>,
    private _snackBar: MatSnackBar,
    @Inject(ProveedorService) private proveedorService: ProveedorService,
    @Inject(GenericService) private genericService: GenericService,
    @Inject(UbigeoService) private ubigeoService: UbigeoService,
    @Inject(UsuarioService) private user: UsuarioService,
    @Inject(FormService) private formService: FormService,
    @Inject(MAT_DIALOG_DATA) public dataDialog: DataDialog<any>) { }

  ngOnInit() {
    this.formularioGrp = this.fb.group({
      //COMUN
      tipoProveedor: ['', [Validators.required]],
      tipoDocumento: ['', [Validators.required]],
      nroDocumento: ['', [Validators.required]],
      //PN
      nombre: ['', []],
      apellidoPat: ['', []],
      apellidoMat: ['', []],
      //PJ
      razonSocial: ['', [Validators.required]],
      nombreComercial: ['', [Validators.required]],
      giroNegocio: ['', []],
      //COMUN
      telefono: ['', []],
      email: ['', []],
      //PJ
      fecFundacion: ['', []],
      //PN
      fecNacimiento: ['', []],
      genero: ['', []],
      estadoCivil: ['', []],
      //COMUN
      direccion: ['', []],
      pais: ['', []],
      departamento: ['', []],
      provincia: ['', []],
      distrito: ['', []],
      observacion: ['', []],
    });

    this.formErrors = this.formService.buildFormErrors(this.formularioGrp, this.formErrors);
    this.formularioGrp.valueChanges.subscribe((val: any) => {
      this.formService.getValidationErrors(this.formularioGrp, this.formErrors, false);
    });

    this.formularioGrp.get('tipoProveedor').valueChanges.subscribe(
      data => {
        if (data) {
          this.activarFormulario(data.valor);
        }
      }
    );

    this.inicializarVariables();
  }

  public inicializarVariables(): void {
    this.comboTipoProveedor();
    this.comboTipoDocumento();
    this.comboGenero();
    this.comboEstadoCivil();
    this.comboDepartamento();
  }

  activarFormulario(tipo: string) {
    if (tipo === '2') {
      this.formularioGrp.get('tipoDocumento').setValue(this.listaTipoDocumento[0]);
      this.formularioGrp.get('nombre').enable();
      this.formularioGrp.get('apellidoPat').enable();
      this.formularioGrp.get('apellidoMat').enable();

      this.formularioGrp.get('razonSocial').disable();
      this.formularioGrp.get('nombreComercial').disable();

      this.formularioGrp.get('nombre').setValidators(Validators.compose([Validators.required]));
      this.formularioGrp.get('apellidoPat').setValidators(Validators.compose([Validators.required]));
      this.formularioGrp.get('apellidoMat').setValidators(Validators.compose([Validators.required]));
      this.formularioGrp.get('razonSocial').setValidators(Validators.compose([]));
      this.formularioGrp.get('nombreComercial').setValidators(Validators.compose([]));
      this.formularioGrp.updateValueAndValidity();
      this.formErrors = this.formService.buildFormErrors(this.formularioGrp, this.formErrors);
    } else {
      this.formularioGrp.get('tipoDocumento').setValue(this.listaTipoDocumento[1]);
      this.formularioGrp.get('razonSocial').enable();
      this.formularioGrp.get('nombreComercial').enable();

      this.formularioGrp.get('nombre').disable();
      this.formularioGrp.get('apellidoPat').disable();
      this.formularioGrp.get('apellidoMat').disable();

      this.formularioGrp.get('nombre').setValidators(Validators.compose([]));
      this.formularioGrp.get('apellidoPat').setValidators(Validators.compose([]));
      this.formularioGrp.get('apellidoMat').setValidators(Validators.compose([]));
      this.formularioGrp.get('razonSocial').setValidators(Validators.compose([Validators.required]));
      this.formularioGrp.get('nombreComercial').setValidators(Validators.compose([Validators.required]));
      this.formularioGrp.updateValueAndValidity();
      this.formErrors = this.formService.buildFormErrors(this.formularioGrp, this.formErrors);
    }
  }

  comboDepartamento(): void {
    this.ubigeoService.listarDepartamento().subscribe(
      (data: OutResponse<UbigeoDepartamentoListarResponse[]>) => {
        if (data.rcodigo == CONSTANTES.R_COD_EXITO) {
          this.ubigeoDepartamentoListarResponse = data.objeto;
          this.ubigeoDepartamentoListarResponse.unshift(JSON.parse(JSON.stringify({ id: 0, nombre: 'SELECCIONE' })));
          this.formularioGrp.get('departamento').setValue(this.ubigeoDepartamentoListarResponse[0]);
          this.comboProvincia();
        } else {
          console.log(data.rmensaje);
        }
      }, error => {
        console.log(error);
      }
    )
  }

  comboProvincia(): void {
    let req = new UbigeoProvinciaListarRequest();
    req.idDepartamento = this.formularioGrp.get('departamento').value.id;

    this.ubigeoService.listarProvincia(req).subscribe(
      (data: OutResponse<UbigeoProvinciaListarResponse[]>) => {
        if (data.rcodigo == CONSTANTES.R_COD_EXITO) {
          this.ubigeoProvinciaListarResponse = data.objeto;
          this.ubigeoProvinciaListarResponse.unshift(JSON.parse(JSON.stringify({ id: 0, nombre: 'SELECCIONE' })));
          this.formularioGrp.get('provincia').setValue(this.ubigeoProvinciaListarResponse[0]);
          this.comboDistrito();
        } else {
          console.log(data.rmensaje);
        }
      }, error => {
        console.log(error);
      }
    )
  }

  comboDistrito(): void {
    let req = new UbigeoDistritoListarRequest();
    req.idProvincia = this.formularioGrp.get('provincia').value.id;

    this.ubigeoService.listarDistrito(req).subscribe(
      (data: OutResponse<UbigeoDistritoListarResponse[]>) => {
        if (data.rcodigo == CONSTANTES.R_COD_EXITO) {
          this.ubigeoDistritoListarResponse = data.objeto;
          this.ubigeoDistritoListarResponse.unshift(JSON.parse(JSON.stringify({ id: 0, nombre: 'SELECCIONE' })));
          this.formularioGrp.get('distrito').setValue(this.ubigeoDistritoListarResponse[0]);
        } else {
          console.log(data.rmensaje);
        }
      }, error => {
        console.log(error);
      }
    )
  }

  comboTipoProveedor(): void {
    let req = new BuscarMaestraRequest();
    req.idTabla = MAESTRAS.TIPO_PROVEEDOR;

    this.genericService.listarMaestra(req).subscribe(
      (data: OutResponse<MaestraResponse[]>) => {
        console.log(data);
        if (data.rcodigo == CONSTANTES.R_COD_EXITO) {
          this.listaTipoProveedor = data.objeto;
          this.formularioGrp.get('tipoProveedor').setValue(this.listaTipoProveedor[0]);
        } else {
          console.log(data.rmensaje);
        }
      }, error => {
        console.log(error);
      }
    )
  }

  comboTipoDocumento(): void {
    let req = new BuscarMaestraRequest();
    req.idTabla = MAESTRAS.TIPO_DOCUMENTO_IDENTIDAD;

    this.genericService.listarMaestra(req).subscribe(
      (data: OutResponse<MaestraResponse[]>) => {
        if (data.rcodigo == CONSTANTES.R_COD_EXITO) {
          this.listaTipoDocumento = data.objeto;
          this.formularioGrp.get('tipoDocumento').setValue(this.listaTipoDocumento[1]);
        } else {
          console.log(data.rmensaje);
        }
      }, error => {
        console.log(error);
      }
    )
  }

  comboGenero(): void {
    let req = new BuscarMaestraRequest();
    req.idTabla = MAESTRAS.GENERO;

    this.genericService.listarMaestra(req).subscribe(
      (data: OutResponse<MaestraResponse[]>) => {
        if (data.rcodigo == CONSTANTES.R_COD_EXITO) {
          this.listaGenero = data.objeto; this.formularioGrp.get('genero').setValue(this.listaGenero[0]);
        } else {
          console.log(data.rmensaje);
        }
      }, error => {
        console.log(error);
      }
    )
  }

  comboEstadoCivil(): void {
    let req = new BuscarMaestraRequest();
    req.idTabla = MAESTRAS.ESTADO_CIVIL;

    this.genericService.listarMaestra(req).subscribe(
      (data: OutResponse<MaestraResponse[]>) => {
        if (data.rcodigo == CONSTANTES.R_COD_EXITO) {
          this.listaEstadoCivil = data.objeto;
          this.formularioGrp.get('estadoCivil').setValue(this.listaEstadoCivil[0]);
        } else {
          console.log(data.rmensaje);
        }
      }, error => {
        console.log(error);
      }
    )
  }

  registrar(): void {
    (this.formularioGrp.get('tipoProveedor').value.valor === '1') ? this.regProveedorJuridico() : this.regProveedorNatural();
  }

  regProveedorJuridico(): void {
    console.log('Ingreso prov juridico');
    if (this.formularioGrp.valid) {
      this.guardar = true;

      let req = new ProveedorJuridicoRegistrarRequest();
      req.idtTipoProveedor = this.formularioGrp.get('tipoProveedor').value.id; //COMUN
      req.flagActivo = CONSTANTES.ACTIVO;
      req.observacion = this.formularioGrp.get('observacion').value;
      req.idUsuarioCrea = this.user.getId;
      req.fecUsuarioCrea = new Date();

      req.codUbigeo = this.formularioGrp.get('distrito').value.codigo;
      req.idtTipoDocumento = this.formularioGrp.get('tipoDocumento').value.id; //COMUN
      req.nroDocumento = this.formularioGrp.get('nroDocumento').value;
      req.razonSocial = this.formularioGrp.get('razonSocial').value;
      req.nombreComercial = this.formularioGrp.get('nombreComercial').value;
      req.giroNegocio = this.formularioGrp.get('giroNegocio').value;
      req.telefono = this.formularioGrp.get('telefono').value;
      req.direccion = this.formularioGrp.get('direccion').value;
      req.email = this.formularioGrp.get('email').value;
      req.fecFundacion = this.formularioGrp.get('fecFundacion').value;

      console.log(req);
      this.proveedorService.registrarProveedorJuridico(req).subscribe(
        (data: OutResponse<ProveedorJuridicoRegistrarResponse>) => {
          if (data.rcodigo == CONSTANTES.R_COD_EXITO) {
            let res = new ProveedorListarResponse();
            res.id = data.objeto.idProveedor;
            res.idtTipoProveedor = req.idtTipoProveedor;
            res.nomTipoProveedor = this.formularioGrp.get('tipoProveedor').value.nombre;
            res.valTipoProveedor = this.formularioGrp.get('tipoProveedor').value.value;
            res.codigo = data.objeto.codigo;
            res.razonSocial = req.razonSocial;
            res.nombreComercial = req.nombreComercial;
            res.idtTipoDocumento = req.idtTipoDocumento;
            res.nomTipoDocumento = this.formularioGrp.get('tipoDocumento').value.nombre;
            res.nroDocumento = req.nroDocumento;
            res.telefono = req.telefono;
            res.direccion = req.direccion;
            res.email = req.email;
            res.codUbigeo = req.codUbigeo;

            this._snackBar.open(MENSAJES.EXITO_OPERACION, null, { duration: 8000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['success-snackbar'] });
            this.dialogRef.close(res);
          } else {
            this._snackBar.open(data.rmensaje, null, { duration: 5000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['warning-snackbar'] });
          }
          this.guardar = false;
        },
        error => {
          console.log(error);
          this.guardar = false;
          this._snackBar.open(error.statusText, null, { duration: 5000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['error-snackbar'] });
        }
      );
    } else {
      this.formService.getValidationErrors(this.formularioGrp, this.formErrors, true);
    }
  }

  regProveedorNatural(): void {
    console.log('Ingreso prov natural');
    if (this.formularioGrp.valid) {
      this.guardar = true;

      let req = new ProveedorNaturalRegistrarRequest();
      req.idtTipoProveedor = this.formularioGrp.get('tipoProveedor').value.id;
      req.observacion = this.formularioGrp.get('observacion').value;
      req.flagActivo = CONSTANTES.ACTIVO;
      req.idUsuarioCrea = this.user.getId;
      req.fecUsuarioCrea = new Date();

      req.codUbigeo = this.formularioGrp.get('distrito').value.ubigeo;
      req.idtGenero = this.formularioGrp.get('genero').value.id;
      req.idtEstadoCivil = this.formularioGrp.get('estadoCivil').value.id;
      req.idtTipoDocumento = this.formularioGrp.get('tipoDocumento').value.id;
      req.nroDocumento = this.formularioGrp.get('nroDocumento').value;
      req.nombre = this.formularioGrp.get('nombre').value;
      req.apellidoPat = this.formularioGrp.get('apellidoPat').value;
      req.apellidoMat = this.formularioGrp.get('apellidoMat').value;
      req.telefono = this.formularioGrp.get('telefono').value;
      req.direccion = this.formularioGrp.get('direccion').value;
      req.email = this.formularioGrp.get('email').value;
      req.fecNacimiento = this.formularioGrp.get('fecNacimiento').value;

      console.log(req);
      this.proveedorService.registrarProveedorNatural(req).subscribe(
        (data: OutResponse<any>) => {
          if (data.rcodigo == CONSTANTES.R_COD_EXITO) {
            let res = new ProveedorListarResponse();
            res.id = data.objeto.idProveedor;
            res.idtTipoProveedor = req.idtTipoProveedor;
            res.nomTipoProveedor = this.formularioGrp.get('tipoProveedor').value.nombre;
            res.valTipoProveedor = this.formularioGrp.get('tipoProveedor').value.value;
            res.codigo = data.objeto.codigo;
            res.nombre = req.nombre;
            res.apellidoPat = req.apellidoPat;
            res.apellidoMat = req.apellidoMat;
            res.idtTipoDocumento = req.idtTipoDocumento;
            res.nomTipoDocumento = this.formularioGrp.get('tipoDocumento').value.nombre;
            res.nroDocumento = req.nroDocumento;
            res.idtGenero = req.idtGenero;
            res.idtEstadoCivil = req.idtEstadoCivil;
            res.telefono = req.telefono;
            res.direccion = req.direccion;
            res.email = req.email;
            res.codUbigeo = req.codUbigeo;

            this._snackBar.open(MENSAJES.EXITO_OPERACION, null, { duration: 8000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['success-snackbar'] });
            this.dialogRef.close(res);
          } else {
            this._snackBar.open(data.rmensaje, null, { duration: 5000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['warning-snackbar'] });
          }
          this.guardar = false;
        },
        error => {
          console.log(error);
          this.guardar = false;
          this._snackBar.open(error.statusText, null, { duration: 5000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['error-snackbar'] });
        }
      );
    } else {
      this.formService.getValidationErrors(this.formularioGrp, this.formErrors, true);
    }
  }

  displayFn(obj) {
    return obj ? obj.nombre : undefined;
  }

  seleccionado(evt) {
    console.log(evt);
  }

}
