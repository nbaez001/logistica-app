import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProveedorService } from '../../../services/proveedor.service';
import { DatePipe } from '@angular/common';
import { OutResponse } from '../../../dto/response/out.response';
import { RegProveedorComponent } from './reg-proveedor/reg-proveedor.component';
import { ACTIVO_LISTA, CONSTANTES, MAESTRAS, MENSAJES, MENSAJES_PANEL } from 'src/app/common';
import { MaestraResponse } from '../../../dto/response/maestra.response';
import { GenericService } from '../../../services/generic.service';
import { BuscarMaestraRequest } from '../../../dto/request/buscar-maestra.request';
import { RegRepresentanteLegalComponent } from './reg-representante-legal/reg-representante-legal.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProveedorListarRequest } from '../../../dto/request/proveedor-listar.request';
import { ProveedorListarResponse } from '../../../dto/response/proveedor-listar.response';
import { ModProveedorComponent } from './mod-proveedor/mod-proveedor.component';
import { ProveedorEliminarRequest } from '../../../dto/request/proveedor-eliminar.request';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-bdj-proveedor',
  templateUrl: './bdj-proveedor.component.html',
  styleUrls: ['./bdj-proveedor.component.scss']
})
export class BdjProveedorComponent implements OnInit {
  activoLista: any[] = [];
  exportar = false;
  index: number;
  listaTipoProveedor: MaestraResponse[] = [];

  proveedorListarResponse: ProveedorListarResponse[];
  displayedColumns: string[];
  dataSource: MatTableDataSource<ProveedorListarResponse>;
  isLoading: boolean = false;

  formularioGrp: FormGroup;
  messages = {
    'tipoProveedor': {
    },
    'fecInicio': {
    },
    'fecFin': {
    }
  };
  formErrors = {
    'tipoProveedor': '',
    'fecInicio': '',
    'fecFin': '',
  };

  columnsGrilla = [
    {
      columnDef: 'nombre',
      header: 'Nombre',
      cell: (m: ProveedorListarResponse) => (m.valTipoProveedor == CONSTANTES.TIP_PROVEEDOR_NATURAL) ? `${m.nombre} ${m.apellidoPat} ${m.apellidoMat}` : `${m.razonSocial}`
    }, {
      columnDef: 'codigo',
      header: 'Codigo',
      cell: (m: ProveedorListarResponse) => m.codigo ? `${m.codigo}` : ''
    }, {
      columnDef: 'nomTipoProveedor',
      header: 'Tipo proveedor',
      cell: (m: ProveedorListarResponse) => m.nomTipoProveedor ? `${m.nomTipoProveedor}` : ''
    }, {
      columnDef: 'documento',
      header: 'Nro Documento',
      cell: (m: ProveedorListarResponse) => m.nroDocumento ? `${m.nroDocumento}` : ''
    }, {
      columnDef: 'telefono',
      header: 'Telefono',
      cell: (m: ProveedorListarResponse) => m.telefono ? `${m.telefono}` : ''
    }, {
      columnDef: 'email',
      header: 'Email',
      cell: (m: ProveedorListarResponse) => m.email ? `${m.email}` : ''
    }, {
      columnDef: 'direccion',
      header: 'Direccion',
      cell: (m: ProveedorListarResponse) => m.direccion ? `${m.direccion}` : ''
    }, {
      columnDef: 'activo',
      header: 'Estado',
      cell: (m: ProveedorListarResponse) => `${this.activoLista.filter(el => (el.id == m.flagActivo))[0].nombre}`
    }];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private fb: FormBuilder,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService,
    @Inject(ProveedorService) private proveedorService: ProveedorService,
    @Inject(GenericService) private genericService: GenericService,
    @Inject(UsuarioService) private user: UsuarioService,
    private _snackBar: MatSnackBar,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.formularioGrp = this.fb.group({
      tipoProveedor: ['', [Validators.required]],
      nombre: ['', []],
      fecInicio: ['', []],
      fecFin: ['', []],
      estado: ['', []],
    });

    this.proveedorListarResponse = [];

    this.definirTabla();
    this.inicializarVariables();
  }

  inicializarVariables(): void {
    this.activoLista = JSON.parse(JSON.stringify(ACTIVO_LISTA));
    this.activoLista.unshift({ id: null, nombre: 'TODOS' });
    this.formularioGrp.get('estado').setValue(this.activoLista[1]);

    this.listarTipoProveedor();
    this.buscar();
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
    if (this.proveedorListarResponse.length > 0) {
      this.dataSource = new MatTableDataSource(this.proveedorListarResponse);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  listarTipoProveedor(): void {
    let req = new BuscarMaestraRequest();
    req.idTabla = MAESTRAS.TIPO_PROVEEDOR;

    this.genericService.listarMaestra(req).subscribe(
      (data: OutResponse<MaestraResponse[]>) => {
        if (data.rcodigo == CONSTANTES.R_COD_EXITO) {
          this.listaTipoProveedor = data.objeto;
          this.listaTipoProveedor.unshift(JSON.parse(JSON.stringify({ id: 0, nombre: 'TODOS' })));
          this.formularioGrp.get('tipoProveedor').setValue(this.listaTipoProveedor[0]);
        } else {
          this.listaTipoProveedor.unshift(JSON.parse(JSON.stringify({ id: 0, nombre: 'TODOS' })));
          this.formularioGrp.get('tipoProveedor').setValue(this.listaTipoProveedor[0]);
          console.log(data.rmensaje);
        }
      }, error => {
        console.log(error);
      }
    )
  }

  buscar(): void {
    this.dataSource = null;
    this.isLoading = true;

    let req = new ProveedorListarRequest();
    req.idtTipoProveedor = this.formularioGrp.get('tipoProveedor').value.id;
    req.razonSocial = this.formularioGrp.get('nombre').value;
    req.fecInicio = this.formularioGrp.get('fecInicio').value;
    req.fecFin = this.formularioGrp.get('fecFin').value;
    req.activo = this.formularioGrp.get('estado').value.id;
    console.log(req);

    this.proveedorService.listarProveedor(req).subscribe(
      (data: OutResponse<ProveedorListarResponse[]>) => {
        console.log(data);
        if (data.rcodigo == CONSTANTES.R_COD_EXITO) {
          this.proveedorListarResponse = data.objeto;
        } else {
          this.proveedorListarResponse = [];
        }
        this.cargarDatosTabla();
        this.isLoading = false;
      },
      error => {
        console.log(error);
        this.isLoading = false;
      }
    );
  }

  exportarExcel() {
    this.exportar = true;

    setTimeout(() => {
      this.exportar = false;
    }, 2000);
  }

  registrar(obj: ProveedorListarResponse) {
    const dialogRef = this.dialog.open(RegProveedorComponent, {
      width: '800px',
      disableClose: false,
      data: {
        titulo: MENSAJES_PANEL.INTRANET.ADMINISTRACION.PROVEEDOR.REGISTRAR,
        objeto: null
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.proveedorListarResponse.unshift(result);
        this.cargarDatosTabla();
      }
    });
  }

  editar(obj: ProveedorListarResponse) {
    let index = this.proveedorListarResponse.indexOf(obj);
    const dialogRef = this.dialog.open(ModProveedorComponent, {
      width: '800px',
      disableClose: false,
      data: {
        titulo: MENSAJES_PANEL.INTRANET.ADMINISTRACION.PROVEEDOR.EDITAR,
        objeto: obj
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.proveedorListarResponse.splice(index, 1);
        this.proveedorListarResponse.unshift(result);
        this.cargarDatosTabla();
      }
    });
  }

  eliminar(obj: ProveedorListarResponse): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        titulo: MENSAJES.MSG_CONFIRMACION,
        objeto: null
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == CONSTANTES.COD_CONFIRMACION) {
        this.spinner.show();
        this.index = this.proveedorListarResponse.indexOf(obj);

        let req = new ProveedorEliminarRequest();
        req.id = obj.id;
        req.idUsuarioMod = this.user.getId;
        req.fecUsuarioMod = new Date();

        this.proveedorService.eliminarProveedor(req).subscribe(
          (data: OutResponse<any>) => {
            if (data.rcodigo == CONSTANTES.R_COD_EXITO) {
              this.proveedorListarResponse.splice(this.index, 1);
              this.cargarDatosTabla();
              this._snackBar.open(MENSAJES.EXITO_OPERACION, null, { duration: 8000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['success-snackbar'] });
            } else if (data.rcodigo == 23000) {
              this._snackBar.open(MENSAJES.ERROR_FOREIGN_KEY, null, { duration: 5000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['warning-snackbar'] });
            } else {
              this._snackBar.open(data.rmensaje, null, { duration: 5000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['error-snackbar'] });
            }
            this.spinner.hide();
          }, error => {
            console.error(error);
            this._snackBar.open(error.statusText, null, { duration: 5000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['error-snackbar'] });
            this.spinner.hide();
          }
        )
      }
    });
  }

  regRepresentanteLegal(obj: ProveedorListarResponse): void {
    const dialogRef = this.dialog.open(RegRepresentanteLegalComponent, {
      width: '1000px',
      disableClose: false,
      data: {
        titulo: MENSAJES_PANEL.INTRANET.ADMINISTRACION.PROVEEDOR.REGISTRAR_REP_LEGAL,
        objeto: obj
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
    });
  }

}
