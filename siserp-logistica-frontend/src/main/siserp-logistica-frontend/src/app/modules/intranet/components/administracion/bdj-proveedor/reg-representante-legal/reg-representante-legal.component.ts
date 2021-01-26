import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MaestraResponse } from 'src/app/modules/intranet/dto/response/maestra.response';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GenericService } from 'src/app/modules/intranet/services/generic.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { DataDialog } from 'src/app/core/model/data-dialog.model';
import { ProveedorService } from 'src/app/modules/intranet/services/proveedor.service';
import { OutResponse } from 'src/app/modules/intranet/dto/response/out.response';
import { BuscarMaestraRequest } from 'src/app/modules/intranet/dto/request/buscar-maestra.request';
import { CONSTANTES, MAESTRAS, MENSAJES } from 'src/app/common';
import { ProveedorJuridRepLegalListarResponse } from 'src/app/modules/intranet/dto/response/proveedor-jurid-rep-legal-listar.response';
import { DatePipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormService } from 'src/app/core/services/form.service';
import { UbigeoDepartamentoListarResponse } from 'src/app/modules/intranet/dto/response/ubigeo-departamento-listar.response';
import { UbigeoProvinciaListarResponse } from 'src/app/modules/intranet/dto/response/ubigeo-provincia-listar.response';
import { UbigeoDistritoListarResponse } from 'src/app/modules/intranet/dto/response/ubigeo-distrito-listar.response';
import { UbigeoService } from 'src/app/modules/intranet/services/ubigeo.service';
import { UbigeoProvinciaListarRequest } from 'src/app/modules/intranet/dto/request/ubigeo-provincia-listar.request';
import { UbigeoDistritoListarRequest } from 'src/app/modules/intranet/dto/request/ubigeo-distrito-listar.request';
import { ProveedorJuridRepLegalListarRequest } from 'src/app/modules/intranet/dto/request/proveedor-jurid-rep-legal-listar.request';
import { ProveedorJuridRepLegalBuscarResponse } from 'src/app/modules/intranet/dto/response/proveedor-jurid-rep-legal-buscar.response';
import { ProveedorListarResponse } from 'src/app/modules/intranet/dto/response/proveedor-listar.response';
import { ProveedorJuridRepLegalRegistrarRequest } from 'src/app/modules/intranet/dto/request/proveedor-jurid-rep-legal-registrar.request';
import { ProveedorJuridRepLegalEliminarRequest } from 'src/app/modules/intranet/dto/request/proveedor-jurid-rep-legal-eliminar.request';
import { ProveedorJuridRepLegalModificarRequest } from 'src/app/modules/intranet/dto/request/proveedor-jurid-rep-legal-modificar.request';
import { UbigeoProvinciaListarXUbigeoRequest } from 'src/app/modules/intranet/dto/request/ubigeo-provincia-listar_x_ubig.request';
import { UbigeoDistritoListarXUbigeoRequest } from 'src/app/modules/intranet/dto/request/ubigeo-distrito-listar_x_ubig.request';
import { ProveedorJuridRepLegalRegistrarResponse } from 'src/app/modules/intranet/dto/response/proveedor-jurid-rep-legal-registrar.response';
import { DateService } from 'src/app/core/services/date.service';

@Component({
  selector: 'app-reg-representante-legal',
  templateUrl: './reg-representante-legal.component.html',
  styleUrls: ['./reg-representante-legal.component.scss']
})
export class RegRepresentanteLegalComponent implements OnInit {
  guardar: boolean = false;
  modificar: boolean = false;
  index: number = 0;

  listaTipoDocumento: MaestraResponse[] = [];
  listaGenero: MaestraResponse[] = [];
  listaEstadoCivil: MaestraResponse[] = [];

  ubigeoDepartamentoListarResponse: UbigeoDepartamentoListarResponse[] = [];
  ubigeoProvinciaListarResponse: UbigeoProvinciaListarResponse[] = [];
  ubigeoDistritoListarResponse: UbigeoDistritoListarResponse[] = [];

  formularioGrp: FormGroup;
  represLegalEdit: ProveedorJuridRepLegalModificarRequest = null;
  formErrors: any;

  listaProveedorJuridRepLegalListarResponse: ProveedorJuridRepLegalListarResponse[];
  displayedColumns: string[];
  dataSource: MatTableDataSource<ProveedorJuridRepLegalListarResponse> = null;
  isLoading: boolean = false;

  columnsGrilla = [
    {
      columnDef: 'cargo',
      header: 'Cargo',
      cell: (m: ProveedorJuridRepLegalListarResponse) => m.cargo ? `${m.cargo}` : ''
    }, {
      columnDef: 'nombre',
      header: 'Nombre',
      cell: (m: ProveedorJuridRepLegalListarResponse) => m.nombre ? `${m.nombre} ${m.apellidoPat} ${m.apellidoMat}` : ''
    }, {
      columnDef: 'tipoDocumento',
      header: 'Tipo documento',
      cell: (m: ProveedorJuridRepLegalListarResponse) => m.nomTipoDocumento ? `${m.nomTipoDocumento}` : ''
    }, {
      columnDef: 'nroDocumento',
      header: 'Nro documento',
      cell: (m: ProveedorJuridRepLegalListarResponse) => m.nroDocumento ? `${m.nroDocumento}` : ''
    }, {
      columnDef: 'telefono',
      header: 'Telefono',
      cell: (m: ProveedorJuridRepLegalListarResponse) => m.telefono ? `${m.telefono}` : ''
    }, {
      columnDef: 'email',
      header: 'Email',
      cell: (m: ProveedorJuridRepLegalListarResponse) => m.email ? `${m.email}` : ''
    }];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<RegRepresentanteLegalComponent>,
    private _snackBar: MatSnackBar,
    private datePipe: DatePipe,
    @Inject(ProveedorService) private proveedorService: ProveedorService,
    @Inject(GenericService) private genericService: GenericService,
    @Inject(UbigeoService) private ubigeoService: UbigeoService,
    @Inject(UsuarioService) private user: UsuarioService,
    @Inject(FormService) private formService: FormService,
    @Inject(DateService) private dateService: DateService,
    @Inject(MAT_DIALOG_DATA) public dataDialog: DataDialog<ProveedorListarResponse>) { }

  ngOnInit() {
    this.formularioGrp = this.fb.group({
      tipoDocumento: ['', [Validators.required]],
      nroDocumento: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      apellidoPat: ['', [Validators.required]],
      apellidoMat: ['', [Validators.required]],
      cargo: ['', [Validators.required]],
      telefono: ['', []],
      email: ['', []],
      fecNacimiento: ['', []],
      genero: ['', []],
      estadoCivil: ['', []],
      direccion: ['', []],
      pais: ['', []],
      departamento: ['', []],
      provincia: ['', []],
      distrito: ['', []]
    });

    this.formErrors = this.formService.buildFormErrors(this.formularioGrp, this.formErrors);
    this.formularioGrp.valueChanges.subscribe((val: any) => {
      this.formService.getValidationErrors(this.formularioGrp, this.formErrors, false);
    });

    this.inicializarVariables();
  }

  public inicializarVariables(): void {
    this.definirTabla();
    this.listarRepresentanteLegal();
    this.comboTipoDocumento();
    this.comboGenero();
    this.comboEstadoCivil();
    this.comboDepartamento();
  }

  definirTabla(): void {
    this.displayedColumns = [];
    this.columnsGrilla.forEach(c => {
      this.displayedColumns.push(c.columnDef);
    });
    this.displayedColumns.unshift('id');
    this.displayedColumns.push('opt');
  }

  public cargarDatosTabla(): void {
    if (this.listaProveedorJuridRepLegalListarResponse.length > 0) {
      this.dataSource = new MatTableDataSource(this.listaProveedorJuridRepLegalListarResponse);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  listarRepresentanteLegal(): void {
    this.isLoading = true;

    let req = new ProveedorJuridRepLegalListarRequest();
    req.idProveedor = this.dataDialog.objeto.id;

    this.proveedorService.listarRepresentanteLegal(req).subscribe(
      (data: OutResponse<ProveedorJuridRepLegalListarResponse[]>) => {
        console.log(data);
        if (data.rcodigo == CONSTANTES.R_COD_EXITO) {
          this.listaProveedorJuridRepLegalListarResponse = data.objeto;
          this.cargarDatosTabla();
          this.formService.setAsUntoched(this.formularioGrp, this.formErrors, ['tipoDocumento'])
        } else {
          this.listaProveedorJuridRepLegalListarResponse = [];
          this.cargarDatosTabla();
        }
        this.isLoading = false;
      }, error => {
        console.log(error);
        this.isLoading = false;
      }
    )
  }

  comboDepartamento(): void {
    this.ubigeoService.listarDepartamento().subscribe(
      (data: OutResponse<UbigeoDepartamentoListarResponse[]>) => {
        if (data.rcodigo == 0) {
          this.ubigeoDepartamentoListarResponse = data.objeto;
          this.ubigeoDepartamentoListarResponse.unshift(JSON.parse(JSON.stringify({ id: 0, nombre: 'NO DEFINIDO' })));
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
        if (data.rcodigo == 0) {
          this.ubigeoProvinciaListarResponse = data.objeto;
          this.ubigeoProvinciaListarResponse.unshift(JSON.parse(JSON.stringify({ id: 0, nombre: 'NO DEFINIDO' })));
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
        if (data.rcodigo == 0) {
          this.ubigeoDistritoListarResponse = data.objeto;
          this.ubigeoDistritoListarResponse.unshift(JSON.parse(JSON.stringify({ id: 0, nombre: 'NO DEFINIDO' })));
          this.formularioGrp.get('distrito').setValue(this.ubigeoDistritoListarResponse[0]);
        } else {
          console.log(data.rmensaje);
        }
      }, error => {
        console.log(error);
      }
    )
  }

  comboProvinciaXUbigeo(ubigeo: string): void {
    let req = new UbigeoProvinciaListarXUbigeoRequest();
    req.codUbigeoDepartamento = ubigeo.substr(0, 2);

    console.log(req);
    this.ubigeoService.listarProvinciaXUbigeo(req).subscribe(
      (data: OutResponse<UbigeoProvinciaListarResponse[]>) => {
        if (data.rcodigo == 0) {
          this.ubigeoProvinciaListarResponse = data.objeto;
          this.ubigeoProvinciaListarResponse.unshift(JSON.parse(JSON.stringify({ id: 0, nombre: 'SELECCIONE' })));
          this.formularioGrp.get('provincia').setValue(this.ubigeoProvinciaListarResponse.filter(el => (el.ubigeo == ubigeo.substr(0, 4)))[0]);
          this.comboDistritoXUbigeo(ubigeo);
        } else {
          console.log(data.rmensaje);
        }
      }, error => {
        console.log(error);
      }
    )
  }

  comboDistritoXUbigeo(ubigeo: string): void {
    let req = new UbigeoDistritoListarXUbigeoRequest();
    req.codUbigeoProvincia = ubigeo.substr(0, 4);

    console.log(req);
    this.ubigeoService.listarDistritoXUbigeo(req).subscribe(
      (data: OutResponse<UbigeoDistritoListarResponse[]>) => {
        if (data.rcodigo == 0) {
          this.ubigeoDistritoListarResponse = data.objeto;
          this.ubigeoDistritoListarResponse.unshift(JSON.parse(JSON.stringify({ id: 0, nombre: 'SELECCIONE' })));
          this.formularioGrp.get('distrito').setValue(this.ubigeoDistritoListarResponse.filter(el => (el.ubigeo == ubigeo.substr(0, 6)))[0]);
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
          this.listaGenero = data.objeto;
          this.formularioGrp.get('genero').setValue(this.listaGenero[0]);
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
    if (this.formularioGrp.valid) {
      this.guardar = true;

      let req = new ProveedorJuridRepLegalRegistrarRequest();
      req.idProveedor = this.dataDialog.objeto.id;
      req.codUbigeo = this.formularioGrp.get('distrito').value.ubigeo;
      req.idtGenero = this.formularioGrp.get('genero').value.id;
      req.idtEstadoCivil = this.formularioGrp.get('estadoCivil').value.id;
      req.idtTipoDocumento = this.formularioGrp.get('tipoDocumento').value.id;

      req.nroDocumento = this.formularioGrp.get('nroDocumento').value;
      req.nombre = this.formularioGrp.get('nombre').value;
      req.apellidoPat = this.formularioGrp.get('apellidoPat').value;
      req.apellidoMat = this.formularioGrp.get('apellidoMat').value;
      req.direccion = this.formularioGrp.get('direccion').value;
      req.fecNacimiento = this.formularioGrp.get('fecNacimiento').value;
      req.cargo = this.formularioGrp.get('cargo').value;
      req.telefono = this.formularioGrp.get('telefono').value;
      req.email = this.formularioGrp.get('email').value;
      req.flagActivo = CONSTANTES.ACTIVO;
      req.idUsuarioCrea = this.user.getId;
      req.fecUsuarioCrea = new Date();

      console.log(req);
      this.proveedorService.registrarRepresentanteLegal(req).subscribe(
        (data: OutResponse<ProveedorJuridRepLegalRegistrarResponse>) => {
          if (data.rcodigo == CONSTANTES.R_COD_EXITO) {
            let res = new ProveedorJuridRepLegalListarResponse();
            res.id = data.objeto.id;
            res.idProveedor = req.idProveedor;
            res.idtTipoDocumento = req.idtTipoDocumento;
            res.nomTipoDocumento = this.formularioGrp.get('tipoDocumento').value.nombre;
            res.nroDocumento = req.nroDocumento;
            res.idtGenero = req.idtGenero;
            res.nomGenero = this.formularioGrp.get('genero').value.nombre;
            res.idtEstadoCivil = req.idtEstadoCivil;
            res.nomEstadoCivil = this.formularioGrp.get('estadoCivil').value.nombre;
            res.nombre = req.nombre
            res.apellidoPat = req.apellidoPat
            res.apellidoMat = req.apellidoMat;
            res.cargo = req.cargo;
            res.telefono = req.telefono;
            res.email = req.email;
            res.codUbigeo = req.codUbigeo;
            res.direccion = req.direccion;
            res.fecNacimiento = req.fecNacimiento;
            res.flagActivo = req.flagActivo;
            res.idUsuarioCrea = req.idUsuarioCrea;
            res.fecUsuarioCrea = req.fecUsuarioCrea;

            this.listaProveedorJuridRepLegalListarResponse.unshift(res);
            this.cargarDatosTabla();
            this.limpiar();
            this._snackBar.open(MENSAJES.EXITO_OPERACION, null, { duration: 8000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['success-snackbar'] });
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

  cargarRepresLegal(row: ProveedorJuridRepLegalListarResponse): void {
    this.index = this.listaProveedorJuridRepLegalListarResponse.indexOf(row);
    
    this.represLegalEdit = new ProveedorJuridRepLegalModificarRequest();
    this.represLegalEdit.id = row.id;
    this.represLegalEdit.codUbigeo = row.codUbigeo;
    this.represLegalEdit.idtGenero = row.idtGenero;
    this.represLegalEdit.idtEstadoCivil = row.idtEstadoCivil;
    this.represLegalEdit.idtTipoDocumento = row.idtTipoDocumento;
    this.represLegalEdit.nroDocumento = row.nroDocumento;
    this.represLegalEdit.nombre = row.nombre;
    this.represLegalEdit.apellidoPat = row.apellidoPat;
    this.represLegalEdit.apellidoMat = row.apellidoMat;
    this.represLegalEdit.direccion = row.direccion;
    this.represLegalEdit.fecNacimiento = row.fecNacimiento;
    this.represLegalEdit.cargo = row.cargo;
    this.represLegalEdit.telefono = row.telefono;
    this.represLegalEdit.email = row.email;
    this.represLegalEdit.flagActivo = row.flagActivo;

    let ge = this.listaGenero.filter(el => el.id == row.idtGenero)[0];
    let ec = this.listaEstadoCivil.filter(el => el.id == row.idtEstadoCivil)[0];
    let td = this.listaTipoDocumento.filter(el => el.id == row.idtTipoDocumento)[0];

    this.formularioGrp.get('genero').setValue(ge);
    this.formularioGrp.get('estadoCivil').setValue(ec);
    this.formularioGrp.get('tipoDocumento').setValue(td);
    this.formularioGrp.get('nroDocumento').setValue(row.nroDocumento);
    this.formularioGrp.get('nombre').setValue(row.nombre);
    this.formularioGrp.get('apellidoPat').setValue(row.apellidoPat);
    this.formularioGrp.get('apellidoMat').setValue(row.apellidoMat);
    this.formularioGrp.get('fecNacimiento').setValue(this.dateService.parseGuionDDMMYYYY(row.fecNacimiento));
    this.formularioGrp.get('cargo').setValue(row.cargo);
    this.formularioGrp.get('telefono').setValue(row.telefono);
    this.formularioGrp.get('email').setValue(row.email);
    this.formularioGrp.get('direccion').setValue(row.direccion);
    if (row.codUbigeo) {
      this.formularioGrp.get('departamento').setValue(this.ubigeoDepartamentoListarResponse.filter(el => (el.ubigeo == row.codUbigeo.substr(0, 2)))[0]);
      this.comboProvinciaXUbigeo(row.codUbigeo);
    } else {
      this.formularioGrp.get('departamento').setValue(this.ubigeoDepartamentoListarResponse[0]);
      this.comboProvincia();
    }
  }

  limpiar(): void {
    this.represLegalEdit = null;
    this.index = -1;
    this.formularioGrp.get('departamento').setValue(this.ubigeoDepartamentoListarResponse[0]);
    this.comboProvincia();
    this.formService.setAsUntoched(this.formularioGrp, this.formErrors, ['tipoDocumento', 'genero', 'estadoCivil', 'departamento', 'provincia', 'distrito']);
  }

  eliminar(row: ProveedorJuridRepLegalListarResponse): void {
    let index = this.listaProveedorJuridRepLegalListarResponse.indexOf(row);

    let req = new ProveedorJuridRepLegalEliminarRequest();
    req.id = row.id;

    this.proveedorService.eliminarRepresentanteLegal(req).subscribe(
      (data) => {
        if (data.rcodigo == CONSTANTES.R_COD_EXITO) {
          this.listaProveedorJuridRepLegalListarResponse.splice(index, 1);
          this.cargarDatosTabla();
          this._snackBar.open(MENSAJES.EXITO_OPERACION, null, { duration: 8000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['success-snackbar'] });
        } else {
          this._snackBar.open(data.rmensaje, null, { duration: 5000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['warning-snackbar'] });
        }
      }, error => {
        this._snackBar.open(error.statusText, null, { duration: 5000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['error-snackbar'] });
      }
    )
  }

  actualizar(): void {
    if (this.formularioGrp.valid) {
      this.modificar = true;

      this.represLegalEdit.codUbigeo = this.formularioGrp.get('distrito').value.ubigeo;
      this.represLegalEdit.idtGenero = this.formularioGrp.get('genero').value.id;
      this.represLegalEdit.idtEstadoCivil = this.formularioGrp.get('estadoCivil').value.id;
      this.represLegalEdit.idtTipoDocumento = this.formularioGrp.get('tipoDocumento').value.id;
      this.represLegalEdit.nroDocumento = this.formularioGrp.get('nroDocumento').value;
      this.represLegalEdit.nombre = this.formularioGrp.get('nombre').value;
      this.represLegalEdit.apellidoPat = this.formularioGrp.get('apellidoPat').value;
      this.represLegalEdit.apellidoMat = this.formularioGrp.get('apellidoMat').value;
      this.represLegalEdit.direccion = this.formularioGrp.get('direccion').value;
      this.represLegalEdit.fecNacimiento = this.formularioGrp.get('fecNacimiento').value;
      this.represLegalEdit.cargo = this.formularioGrp.get('cargo').value;
      this.represLegalEdit.telefono = this.formularioGrp.get('telefono').value;
      this.represLegalEdit.email = this.formularioGrp.get('email').value;
      this.represLegalEdit.flagActivo = CONSTANTES.ACTIVO;
      this.represLegalEdit.idUsuarioMod = this.user.getId;
      this.represLegalEdit.fecUsuarioMod = new Date();

      this.proveedorService.actualizarRepresentanteLegal(this.represLegalEdit).subscribe(
        (data: OutResponse<any>) => {
          console.log(data);
          if (data.rcodigo == CONSTANTES.R_COD_EXITO) {
            let res = this.listaProveedorJuridRepLegalListarResponse[this.index];
            res.idtTipoDocumento = this.represLegalEdit.idtTipoDocumento;
            res.nomTipoDocumento = this.formularioGrp.get('tipoDocumento').value.nombre;
            res.nroDocumento = this.represLegalEdit.nroDocumento;
            res.idtGenero = this.represLegalEdit.idtGenero;
            res.nomGenero = this.formularioGrp.get('genero').value.nombre;
            res.idtEstadoCivil = this.represLegalEdit.idtEstadoCivil;
            res.nomEstadoCivil = this.formularioGrp.get('estadoCivil').value.nombre;
            res.nombre = this.represLegalEdit.nombre
            res.apellidoPat = this.represLegalEdit.apellidoPat
            res.apellidoMat = this.represLegalEdit.apellidoMat;
            res.cargo = this.represLegalEdit.cargo;
            res.telefono = this.represLegalEdit.telefono;
            res.email = this.represLegalEdit.email;
            res.codUbigeo = this.represLegalEdit.codUbigeo;
            res.direccion = this.represLegalEdit.direccion;
            res.fecNacimiento = this.represLegalEdit.fecNacimiento;
            res.flagActivo = this.represLegalEdit.flagActivo;
            res.idUsuarioMod = this.represLegalEdit.idUsuarioMod;
            res.fecUsuarioMod = this.represLegalEdit.fecUsuarioMod;

            this.listaProveedorJuridRepLegalListarResponse.splice(this.index, 1);
            this.listaProveedorJuridRepLegalListarResponse.unshift(res);
            this.cargarDatosTabla();
            this.limpiar();
            this._snackBar.open(MENSAJES.EXITO_OPERACION, null, { duration: 8000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['success-snackbar'] });
          } else {
            this._snackBar.open(data.rmensaje, null, { duration: 5000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['warning-snackbar'] });
          }
          this.modificar = false;
        },
        error => {
          console.log(error);
          this.modificar = false;
          this._snackBar.open(error.statusText, null, { duration: 5000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['error-snackbar'] });
        }
      );
    } else {
      this.formService.getValidationErrors(this.formularioGrp, this.formErrors, true);
    }
  }
}
