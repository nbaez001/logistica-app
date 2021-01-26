import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { MENSAJES_PANEL, MENSAJES, CONSTANTES, ACTIVO_LISTA } from 'src/app/common';
import { FormService } from 'src/app/core/services/form.service';
import { MarcaListarRequest } from '../../../dto/request/marca-listar.request';
import { MarcaListarResponse } from '../../../dto/response/marca-listar.response';
import { OutResponse } from '../../../dto/response/out.response';
import { MarcaService } from '../../../services/marca.service';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { ModMarcaComponent } from './mod-marca/mod-marca.component';
import { RegMarcaComponent } from './reg-marca/reg-marca.component';

@Component({
  selector: 'app-bdj-marca',
  templateUrl: './bdj-marca.component.html',
  styleUrls: ['./bdj-marca.component.scss']
})
export class BdjMarcaComponent implements OnInit {
  activoLista = ACTIVO_LISTA;
  exportar = false;
  index: number;

  marcaListarResponse: MarcaListarResponse[] = [];

  displayedColumns: string[];
  dataSource: MatTableDataSource<MarcaListarResponse>;
  isLoading: boolean = false;

  formularioGrp: FormGroup;
  formErrors: any;

  columnsGrilla = [
    {
      columnDef: 'nombre',
      header: 'Nombre',
      cell: (m: MarcaListarResponse) => m.nombre ? `${m.nombre}` : ''
    }, {
      columnDef: 'codigo',
      header: 'Codigo',
      cell: (m: MarcaListarResponse) => m.codigo ? `${m.codigo}` : ''
    }, {
      columnDef: 'activo',
      header: 'Estado',
      cell: (m: MarcaListarResponse) => m.flgActivo ? 'ACTIVO' : 'INACTIVO'
    }];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private fb: FormBuilder,
    public dialog: MatDialog,
    @Inject(FormService) private formService: FormService,
    @Inject(MarcaService) private marcaService: MarcaService,
    private spinner: NgxSpinnerService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.formularioGrp = this.fb.group({
      nombre: ['', []],
      fecInicio: ['', []],
      fecFin: ['', []],
      activo: ['', []],
    });

    this.formErrors = this.formService.buildFormErrors(this.formularioGrp, this.formErrors);
    this.formularioGrp.valueChanges.subscribe((val: any) => {
      this.formService.getValidationErrors(this.formularioGrp, this.formErrors, false);
    });

    this.definirTabla();
    this.inicializarVariables();
  }

  inicializarVariables(): void {
    this.activoLista = JSON.parse(JSON.stringify(ACTIVO_LISTA));
    this.activoLista.unshift({ id: null, nombre: 'TODOS' });
    this.formularioGrp.get('activo').setValue(this.activoLista[1]);
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
    if (this.marcaListarResponse.length > 0) {
      this.dataSource = new MatTableDataSource(this.marcaListarResponse);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  buscar(): void {
    this.dataSource = null;
    this.isLoading = true;

    let req = new MarcaListarRequest();
    req.activo = this.formularioGrp.get('activo').value.id;
    req.fecInicio = this.formularioGrp.get('fecInicio').value;
    req.fecFin = this.formularioGrp.get('fecFin').value;
    req.nombre = this.formularioGrp.get('nombre').value;

    this.marcaService.listarMarca(req).subscribe(
      (data: OutResponse<MarcaListarResponse[]>) => {
        if (data.rcodigo == 0) {
          this.marcaListarResponse = data.objeto;
        } else {
          this.marcaListarResponse = [];
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

  regMarca() {
    const dialogRef = this.dialog.open(RegMarcaComponent, {
      width: '500px',
      disableClose: false,
      data: {
        titulo: MENSAJES_PANEL.INTRANET.ADMINISTRACION.MARCA.REGISTRAR.TITLE,
        objeto: null
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.marcaListarResponse.unshift(result);
        this.cargarDatosTabla();
      }
    });
  }

  modifMarca(obj: MarcaListarResponse) {
    let index = this.marcaListarResponse.indexOf(obj);
    const dialogRef = this.dialog.open(ModMarcaComponent, {
      width: '500px',
      disableClose: false,
      data: {
        titulo: MENSAJES_PANEL.INTRANET.ADMINISTRACION.MARCA.EDITAR.TITLE,
        objeto: obj
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.marcaListarResponse.splice(index, 1);
        this.marcaListarResponse.unshift(result);
        this.cargarDatosTabla();
      }
    });
  }

  elimMarca(obj): void {
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
        this.index = this.marcaListarResponse.indexOf(obj);

        this.marcaService.eliminarMarca(obj).subscribe(
          (data: OutResponse<any>) => {
            if (data.rcodigo == 0) {
              this._snackBar.open(MENSAJES.EXITO_OPERACION, null, { duration: 8000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['success-snackbar'] });
              this.marcaListarResponse.splice(this.index, 1);
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
}
