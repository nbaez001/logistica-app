import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ACTIVO_LISTA, CONSTANTES, MAESTRAS, MENSAJES } from 'src/app/common';
import { DataDialog } from 'src/app/core/model/data-dialog.model';
import { DateService } from 'src/app/core/services/date.service';
import { FormService } from 'src/app/core/services/form.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { BuscarMaestraRequest } from 'src/app/modules/intranet/dto/request/buscar-maestra.request';
import { ProveedorJuridicoModificarRequest } from 'src/app/modules/intranet/dto/request/proveedor-juridico-modificar.request';
import { ProveedorNaturalModificarRequest } from 'src/app/modules/intranet/dto/request/proveedor-natural-modificar.request';
import { UbigeoDistritoListarRequest } from 'src/app/modules/intranet/dto/request/ubigeo-distrito-listar.request';
import { UbigeoDistritoListarXUbigeoRequest } from 'src/app/modules/intranet/dto/request/ubigeo-distrito-listar_x_ubig.request';
import { UbigeoProvinciaListarRequest } from 'src/app/modules/intranet/dto/request/ubigeo-provincia-listar.request';
import { UbigeoProvinciaListarXUbigeoRequest } from 'src/app/modules/intranet/dto/request/ubigeo-provincia-listar_x_ubig.request';
import { MaestraResponse } from 'src/app/modules/intranet/dto/response/maestra.response';
import { OutResponse } from 'src/app/modules/intranet/dto/response/out.response';
import { ProveedorListarResponse } from 'src/app/modules/intranet/dto/response/proveedor-listar.response';
import { UbigeoDepartamentoListarResponse } from 'src/app/modules/intranet/dto/response/ubigeo-departamento-listar.response';
import { UbigeoDistritoListarResponse } from 'src/app/modules/intranet/dto/response/ubigeo-distrito-listar.response';
import { UbigeoProvinciaListarResponse } from 'src/app/modules/intranet/dto/response/ubigeo-provincia-listar.response';
import { GenericService } from 'src/app/modules/intranet/services/generic.service';
import { ProveedorService } from 'src/app/modules/intranet/services/proveedor.service';
import { UbigeoService } from 'src/app/modules/intranet/services/ubigeo.service';

@Component({
  selector: 'app-mod-proveedor',
  templateUrl: './mod-proveedor.component.html',
  styleUrls: ['./mod-proveedor.component.scss']
})
export class ModProveedorComponent implements OnInit {
  activoLista: any[] = [];
  modif: boolean = false;

  listaTipoProveedor: MaestraResponse[] = [];
  listaTipoDocumento: MaestraResponse[] = [];
  listaGenero: MaestraResponse[] = [];
  listaEstadoCivil: MaestraResponse[] = [];

  ubigeoDepartamentoListarResponse: UbigeoDepartamentoListarResponse[] = [];
  ubigeoProvinciaListarResponse: UbigeoProvinciaListarResponse[] = [];
  ubigeoDistritoListarResponse: UbigeoDistritoListarResponse[] = [];

  formularioGrp: FormGroup;
  formErrors: any;

  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModProveedorComponent>,
    private _snackBar: MatSnackBar,
    @Inject(ProveedorService) private proveedorService: ProveedorService,
    @Inject(GenericService) private genericService: GenericService,
    @Inject(UbigeoService) private ubigeoService: UbigeoService,
    @Inject(UsuarioService) private user: UsuarioService,
    @Inject(FormService) private formService: FormService,
    @Inject(DateService) private dateService: DateService,
    @Inject(MAT_DIALOG_DATA) public dataDialog: DataDialog<ProveedorListarResponse>) { }

  ngOnInit() {
    console.log(this.dataDialog);
    this.formularioGrp = this.fb.group({
      //COMUN
      tipoProveedor: [{ value: '', disabled: true }, [Validators.required]],
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
      activo: ['', [Validators.required]],
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
    this.activoLista = JSON.parse(JSON.stringify(ACTIVO_LISTA));
    this.comboTipoProveedor();
    this.comboTipoDocumento();
    this.comboGenero();
    this.comboEstadoCivil();
    this.comboDepartamento();
    if (this.dataDialog.objeto.valTipoProveedor == CONSTANTES.TIP_PROVEEDOR_NATURAL) {
      this.formularioGrp.get('nroDocumento').setValue(this.dataDialog.objeto.nroDocumento);
      this.formularioGrp.get('nombre').setValue(this.dataDialog.objeto.nombre);
      this.formularioGrp.get('apellidoPat').setValue(this.dataDialog.objeto.apellidoPat);
      this.formularioGrp.get('apellidoMat').setValue(this.dataDialog.objeto.apellidoMat);
      this.formularioGrp.get('telefono').setValue(this.dataDialog.objeto.telefono);
      this.formularioGrp.get('email').setValue(this.dataDialog.objeto.email);
      this.formularioGrp.get('fecNacimiento').setValue(this.dateService.parseGuionDDMMYYYY(this.dataDialog.objeto.fecNacimiento));
      this.formularioGrp.get('direccion').setValue(this.dataDialog.objeto.direccion);
      this.formularioGrp.get('observacion').setValue(this.dataDialog.objeto.observacion);
      this.formularioGrp.get('activo').setValue(this.activoLista.filter(el => (el.id == this.dataDialog.objeto.flagActivo))[0]);
    } else {
      this.formularioGrp.get('nroDocumento').setValue(this.dataDialog.objeto.nroDocumento);
      this.formularioGrp.get('razonSocial').setValue(this.dataDialog.objeto.razonSocial);
      this.formularioGrp.get('nombreComercial').setValue(this.dataDialog.objeto.nombreComercial);
      this.formularioGrp.get('giroNegocio').setValue(this.dataDialog.objeto.giroNegocio);
      this.formularioGrp.get('telefono').setValue(this.dataDialog.objeto.telefono);
      this.formularioGrp.get('email').setValue(this.dataDialog.objeto.email);
      this.formularioGrp.get('fecFundacion').setValue(this.dateService.parseGuionDDMMYYYY(this.dataDialog.objeto.fecFundacion));
      this.formularioGrp.get('direccion').setValue(this.dataDialog.objeto.direccion);
      this.formularioGrp.get('observacion').setValue(this.dataDialog.objeto.observacion);
      this.formularioGrp.get('activo').setValue(this.activoLista.filter(el => (el.id == this.dataDialog.objeto.flagActivo))[0]);
    }
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
    console.log('Departamento');
    this.ubigeoService.listarDepartamento().subscribe(
      (data: OutResponse<UbigeoDepartamentoListarResponse[]>) => {
        console.log(data);
        if (data.rcodigo == CONSTANTES.R_COD_EXITO) {
          this.ubigeoDepartamentoListarResponse = data.objeto;
          this.ubigeoDepartamentoListarResponse.unshift(JSON.parse(JSON.stringify({ id: 0, nombre: 'SELECCIONE' })));
          if (this.dataDialog.objeto.codUbigeo) {
            console.log(this.dataDialog.objeto.codUbigeo);
            console.log(this.dataDialog.objeto.codUbigeo.substr(0, 2));
            this.formularioGrp.get('departamento').setValue(this.ubigeoDepartamentoListarResponse.filter(el => (el.ubigeo == this.dataDialog.objeto.codUbigeo.substr(0, 2)))[0]);
            this.comboProvinciaXUbigeo();
          } else {
            this.formularioGrp.get('departamento').setValue(this.ubigeoDepartamentoListarResponse[0]);
            this.comboProvincia();
          }

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
        console.log(data);
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

  comboProvinciaXUbigeo(): void {
    let req = new UbigeoProvinciaListarXUbigeoRequest();
    req.codUbigeoDepartamento = this.dataDialog.objeto.codUbigeo.substr(0, 2);

    console.log(req);
    this.ubigeoService.listarProvinciaXUbigeo(req).subscribe(
      (data: OutResponse<UbigeoProvinciaListarResponse[]>) => {
        console.log(data);
        if (data.rcodigo == CONSTANTES.R_COD_EXITO) {
          this.ubigeoProvinciaListarResponse = data.objeto;
          this.ubigeoProvinciaListarResponse.unshift(JSON.parse(JSON.stringify({ id: 0, nombre: 'SELECCIONE' })));
          if (this.dataDialog.objeto.codUbigeo) {
            this.formularioGrp.get('provincia').setValue(this.ubigeoProvinciaListarResponse.filter(el => (el.ubigeo == this.dataDialog.objeto.codUbigeo.substr(0, 4)))[0]);
            this.comboDistritoXUbigeo();
          } else {
            this.formularioGrp.get('provincia').setValue(this.ubigeoProvinciaListarResponse[0]);
            this.comboDistrito();
          }
        } else {
          console.log(data.rmensaje);
        }
      }, error => {
        console.log(error);
      }
    )
  }

  comboDistritoXUbigeo(): void {
    let req = new UbigeoDistritoListarXUbigeoRequest();
    req.codUbigeoProvincia = this.dataDialog.objeto.codUbigeo.substr(0, 4);

    console.log(req);
    this.ubigeoService.listarDistritoXUbigeo(req).subscribe(
      (data: OutResponse<UbigeoDistritoListarResponse[]>) => {
        if (data.rcodigo == CONSTANTES.R_COD_EXITO) {
          this.ubigeoDistritoListarResponse = data.objeto;
          this.ubigeoDistritoListarResponse.unshift(JSON.parse(JSON.stringify({ id: 0, nombre: 'SELECCIONE' })));
          if (this.dataDialog.objeto.codUbigeo) {
            this.formularioGrp.get('distrito').setValue(this.ubigeoDistritoListarResponse.filter(el => (el.ubigeo == this.dataDialog.objeto.codUbigeo.substr(0, 6)))[0]);
          } else {
            this.formularioGrp.get('distrito').setValue(this.ubigeoDistritoListarResponse[0]);
          }
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
          this.formularioGrp.get('tipoProveedor').setValue(this.listaTipoProveedor.filter(el => el.id == this.dataDialog.objeto.idtTipoProveedor)[0]);
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
          this.formularioGrp.get('tipoDocumento').setValue(this.listaTipoDocumento.filter(el => el.id == this.dataDialog.objeto.idtTipoDocumento)[0]);
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
          this.listaGenero = data.objeto;
          if (this.dataDialog.objeto.valTipoProveedor == CONSTANTES.TIP_PROVEEDOR_NATURAL) {
            this.formularioGrp.get('genero').setValue(this.listaGenero.filter(el => el.id == this.dataDialog.objeto.idtGenero)[0]);
          }
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
          if (this.dataDialog.objeto.valTipoProveedor == CONSTANTES.TIP_PROVEEDOR_NATURAL) {
            this.formularioGrp.get('estadoCivil').setValue(this.listaEstadoCivil.filter(el => el.id == this.dataDialog.objeto.idtEstadoCivil)[0]);
          }
        } else {
          console.log(data.rmensaje);
        }
      }, error => {
        console.log(error);
      }
    )
  }

  modificar(): void {
    (this.formularioGrp.get('tipoProveedor').value.valor === '1') ? this.modProveedorJuridico() : this.modProveedorNatural();
  }

  modProveedorJuridico(): void {
    console.log('Ingreso prov juridico');
    if (this.formularioGrp.valid) {
      this.modif = true;

      let req = new ProveedorJuridicoModificarRequest();
      req.idProveedor = this.dataDialog.objeto.id;
      req.flagActivo = this.formularioGrp.get('activo').value.id;
      req.observacion = this.formularioGrp.get('observacion').value;
      req.idUsuarioMod = this.user.getId;
      req.fecUsuarioMod = new Date();

      req.codUbigeo = this.formularioGrp.get('distrito').value.ubigeo;
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
      this.proveedorService.modificarProveedorJuridico(req).subscribe(
        (data: OutResponse<any>) => {
          console.log(data);
          if (data.rcodigo == CONSTANTES.R_COD_EXITO) {
            let res = this.dataDialog.objeto;
            res.razonSocial = req.razonSocial;
            res.nombreComercial = req.nombreComercial;
            res.giroNegocio = req.giroNegocio;
            res.fecFundacion = req.fecFundacion;
            res.nroDocumento = req.nroDocumento;
            res.telefono = req.telefono;
            res.direccion = req.direccion;
            res.email = req.email;
            res.codUbigeo = req.codUbigeo;
            res.observacion = req.observacion;
            res.flagActivo = req.flagActivo;

            this._snackBar.open(MENSAJES.EXITO_OPERACION, null, { duration: 8000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['success-snackbar'] });
            this.dialogRef.close(res);
          } else {
            this._snackBar.open(data.rmensaje, null, { duration: 5000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['warning-snackbar'] });
          }
          this.modif = false;
        },
        error => {
          console.log(error);
          this.modif = false;
          this._snackBar.open(error.statusText, null, { duration: 5000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['error-snackbar'] });
        }
      );
    } else {
      this.formService.getValidationErrors(this.formularioGrp, this.formErrors, true);
    }
  }

  modProveedorNatural(): void {
    console.log('Ingreso prov natural');
    if (this.formularioGrp.valid) {
      this.modif = true;

      let req = new ProveedorNaturalModificarRequest();
      req.idProveedor = this.dataDialog.objeto.id;
      req.observacion = this.formularioGrp.get('observacion').value;
      req.flagActivo = this.formularioGrp.get('activo').value.id;
      req.idUsuarioMod = this.user.getId;
      req.fecUsuarioMod = new Date();

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
      this.proveedorService.modificarProveedorNatural(req).subscribe(
        (data: OutResponse<any>) => {
          if (data.rcodigo == CONSTANTES.R_COD_EXITO) {
            let res = this.dataDialog.objeto;
            res.nombre = req.nombre;
            res.apellidoPat = req.apellidoPat;
            res.apellidoMat = req.apellidoMat;
            res.fecNacimiento = req.fecNacimiento;
            res.idtTipoDocumento = req.idtTipoDocumento;
            res.nomTipoDocumento = this.formularioGrp.get('tipoDocumento').value.nombre;
            res.nroDocumento = req.nroDocumento;
            res.idtGenero = req.idtGenero;
            res.idtEstadoCivil = req.idtEstadoCivil;
            res.telefono = req.telefono;
            res.direccion = req.direccion;
            res.email = req.email;
            res.codUbigeo = req.codUbigeo;
            res.observacion = req.observacion;
            res.flagActivo = req.flagActivo;

            this._snackBar.open(MENSAJES.EXITO_OPERACION, null, { duration: 8000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['success-snackbar'] });
            this.dialogRef.close(data.objeto);
          } else {
            this._snackBar.open(data.rmensaje, null, { duration: 5000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['warning-snackbar'] });
          }
          this.modif = false;
        },
        error => {
          console.log(error);
          this.modif = false;
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
