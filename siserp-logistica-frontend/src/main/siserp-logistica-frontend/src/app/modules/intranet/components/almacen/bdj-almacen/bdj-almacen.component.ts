import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ACTIVO_LISTA, CONSTANTES, MENSAJES, MENSAJES_PANEL } from 'src/app/common';
import { FormService } from 'src/app/core/services/form.service';
import { AlmacenListarRequest } from '../../../dto/request/almacen-listar.request';
import { AlmacenListarResponse } from '../../../dto/response/almacen-listar.response';
import { OutResponse } from '../../../dto/response/out.response';
import { AlmacenService } from '../../../services/almacen.service';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { BdjEstanteComponent } from './bdj-estante/bdj-estante.component';
import { ModAlmacenComponent } from './mod-almacen/mod-almacen.component';
import { RegAlmacenComponent } from './reg-almacen/reg-almacen.component';

@Component({
  selector: 'app-bdj-almacen',
  templateUrl: './bdj-almacen.component.html',
  styleUrls: ['./bdj-almacen.component.scss']
})
export class BdjAlmacenComponent implements OnInit {
  activoLista = ACTIVO_LISTA;
  exportar = false;
  index: number;

  almacenListarResponse: AlmacenListarResponse[] = [];

  displayedColumns: string[];
  dataSource: MatTableDataSource<AlmacenListarResponse>;
  isLoading: boolean = false;

  formularioGrp: FormGroup;
  formErrors: any;

  columnsGrilla = [
    {
      columnDef: 'nombre',
      header: 'Nombre',
      cell: (m: AlmacenListarResponse) => m.nombre ? `${m.nombre}` : ''
    }, {
      columnDef: 'codigo',
      header: 'Codigo',
      cell: (m: AlmacenListarResponse) => m.codigo ? `${m.codigo}` : ''
    }, {
      columnDef: 'fecha',
      header: 'Fecha',
      cell: (m: AlmacenListarResponse) => m.fecha ? `${this.datePipe.transform(m.fecha, 'dd/MM/yyyy')}` : ''
    }, {
      columnDef: 'descripcion',
      header: 'Descripcion',
      cell: (m: AlmacenListarResponse) => m.descripcion ? m.descripcion : ''
    }, {
      columnDef: 'activo',
      header: 'Estado',
      cell: (m: AlmacenListarResponse) => this.activoLista.filter(el => (el.id == m.flagActivo))[0].nombre
    }];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private fb: FormBuilder,
    public dialog: MatDialog,
    private datePipe: DatePipe,
    @Inject(FormService) private formService: FormService,
    @Inject(AlmacenService) private almacenService: AlmacenService,
    private spinner: NgxSpinnerService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.formularioGrp = this.fb.group({
      nombre: ['', []],
      fecInicio: ['', []],
      fecFin: ['', []],
      activo: [this.activoLista.filter(el => (el.id == CONSTANTES.ACTIVO))[0], []],
    });

    this.formErrors = this.formService.buildFormErrors(this.formularioGrp, this.formErrors);
    this.formularioGrp.valueChanges.subscribe((val: any) => {
      this.formService.getValidationErrors(this.formularioGrp, this.formErrors, false);
    });

    this.definirTabla();
    this.inicializarVariables();
  }

  inicializarVariables(): void {
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
    if (this.almacenListarResponse.length > 0) {
      this.dataSource = new MatTableDataSource(this.almacenListarResponse);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  buscar(): void {
    this.dataSource = null;
    this.isLoading = true;

    let req = new AlmacenListarRequest();
    req.flagActivo = this.formularioGrp.get('activo').value.id;
    req.fecInicio = this.formularioGrp.get('fecInicio').value;
    req.fecFin = this.formularioGrp.get('fecFin').value;
    req.nombre = this.formularioGrp.get('nombre').value;

    this.almacenService.listarAlmacen(req).subscribe(
      (data: OutResponse<AlmacenListarResponse[]>) => {
        if (data.rcodigo == CONSTANTES.R_COD_EXITO) {
          this.almacenListarResponse = data.objeto;
        } else {
          this.almacenListarResponse = [];
        }
        this.cargarDatosTabla();
        this.isLoading = false;
      },
      error => {
        console.log(error);
        this._snackBar.open(error.statusText, null, { duration: 8000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['error-snackbar'] });
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

  regAlmacen() {
    const dialogRef = this.dialog.open(RegAlmacenComponent, {
      width: '500px',
      disableClose: false,
      data: {
        titulo: MENSAJES_PANEL.INTRANET.ALMACEN.ALMACEN.REGISTRAR.TITLE,
        objeto: null
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.almacenListarResponse.unshift(result);
        this.cargarDatosTabla();
      }
    });
  }

  modifAlmacen(obj: AlmacenListarResponse) {
    let index = this.almacenListarResponse.indexOf(obj);
    const dialogRef = this.dialog.open(ModAlmacenComponent, {
      width: '500px',
      disableClose: false,
      data: {
        titulo: MENSAJES_PANEL.INTRANET.ALMACEN.ALMACEN.EDITAR.TITLE,
        objeto: obj
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.almacenListarResponse.splice(index, 1);
        this.almacenListarResponse.unshift(result);
        this.cargarDatosTabla();
      }
    });
  }

  elimAlmacen(obj): void {
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
        this.index = this.almacenListarResponse.indexOf(obj);

        this.almacenService.eliminarAlmacen(obj).subscribe(
          (data: OutResponse<any>) => {
            if (data.rcodigo == CONSTANTES.R_COD_EXITO) {
              this._snackBar.open(MENSAJES.EXITO_OPERACION, null, { duration: 8000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['success-snackbar'] });
              this.almacenListarResponse.splice(this.index, 1);
              this.cargarDatosTabla();
            } else if (data.rcodigo == 23000) {
              this._snackBar.open(MENSAJES.ERROR_FOREIGN_KEY, null, { duration: 8000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['warning-snackbar'] });
            } else {
              this._snackBar.open(data.rmensaje, null, { duration: 8000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['error-snackbar'] });
            }
            this.spinner.hide();
          }, error => {
            console.error(error);
            this._snackBar.open(error.statusText, null, { duration: 8000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['error-snackbar'] });
            this.spinner.hide();
          }
        )
      }
    });
  }

  regEstantes(obj: AlmacenListarResponse): void {
    const dialogRef = this.dialog.open(BdjEstanteComponent, {
      width: '900px',
      disableClose: false,
      data: {
        titulo: MENSAJES_PANEL.INTRANET.ALMACEN.ESTANTE.REGISTRAR.TITLE,
        objeto: obj
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.almacenListarResponse.unshift(result);
        this.cargarDatosTabla();
      }
    });
  }

}
