import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ACTIVO_LISTA, CONSTANTES, MENSAJES, MENSAJES_PANEL } from 'src/app/common';
import { DataDialog } from 'src/app/core/model/data-dialog.model';
import { DateService } from 'src/app/core/services/date.service';
import { FormService } from 'src/app/core/services/form.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { AlmacenEstanteEliminarRequest } from 'src/app/modules/intranet/dto/request/almacen-estante-eliminar.request';
import { AlmacenEstanteListarRequest } from 'src/app/modules/intranet/dto/request/almacen-estante-listar.request';
import { AlmacenEstanteModificarRequest } from 'src/app/modules/intranet/dto/request/almacen-estante-modificar.request';
import { AlmacenEstanteListarResponse } from 'src/app/modules/intranet/dto/response/almacen-estante-listar.response';
import { AlmacenListarResponse } from 'src/app/modules/intranet/dto/response/almacen-listar.response';
import { OutResponse } from 'src/app/modules/intranet/dto/response/out.response';
import { AlmacenService } from 'src/app/modules/intranet/services/almacen.service';
import { ModEstanteComponent } from './mod-estante/mod-estante.component';
import { RegEstanteComponent } from './reg-estante/reg-estante.component';

@Component({
  selector: 'app-bdj-estante',
  templateUrl: './bdj-estante.component.html',
  styleUrls: ['./bdj-estante.component.scss']
})
export class BdjEstanteComponent implements OnInit {
  activoLista: any[] = ACTIVO_LISTA;
  exportar: boolean = false;
  index: number = 0;

  formularioGrp: FormGroup;
  formErrors: any;

  almacenEstanteListarResponse: AlmacenEstanteListarResponse[];

  displayedColumns: string[];
  dataSource: MatTableDataSource<AlmacenEstanteListarResponse> = null;
  isLoading: boolean = false;

  columnsGrilla = [
    {
      columnDef: 'nombre',
      header: 'Nombre',
      cell: (m: AlmacenEstanteListarResponse) => m.nombre ? `${m.nombre}` : ''
    }, {
      columnDef: 'codigo',
      header: 'Codigo',
      cell: (m: AlmacenEstanteListarResponse) => m.codigo ? `${m.codigo}` : ''
    }, {
      columnDef: 'fecha',
      header: 'Fecha',
      cell: (m: AlmacenEstanteListarResponse) => m.fecha ? `${this.datePipe.transform(m.fecha, 'dd/MM/yyyy')}` : ''
    }, {
      columnDef: 'estado',
      header: 'Estado',
      cell: (m: AlmacenEstanteListarResponse) => this.activoLista.filter(el => (el.id == m.flagActivo))[0].nombre
    }];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private fb: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<BdjEstanteComponent>,
    private _snackBar: MatSnackBar,
    private datePipe: DatePipe,
    private spinner: NgxSpinnerService,
    @Inject(AlmacenService) private almacenService: AlmacenService,
    @Inject(UsuarioService) private user: UsuarioService,
    @Inject(FormService) private formService: FormService,
    @Inject(DateService) private dateService: DateService,
    @Inject(MAT_DIALOG_DATA) public dataDialog: DataDialog<AlmacenListarResponse>) { }

  ngOnInit() {
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

    this.inicializarVariables();
  }

  public inicializarVariables(): void {
    this.activoLista = JSON.parse(JSON.stringify(ACTIVO_LISTA));
    this.activoLista.unshift({ id: null, nombre: 'TODOS' });
    this.formularioGrp.get('activo').setValue(this.activoLista[1]);
    this.definirTabla();
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
    if (this.almacenEstanteListarResponse.length > 0) {
      this.dataSource = new MatTableDataSource(this.almacenEstanteListarResponse);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  buscar(): void {
    this.isLoading = true;

    let req = new AlmacenEstanteListarRequest();
    req.idAlmacen = this.dataDialog.objeto.id;
    req.fecInicio = this.formularioGrp.get('fecInicio').value;
    req.fecFin = this.formularioGrp.get('fecFin').value;
    req.nombre = this.formularioGrp.get('nombre').value;
    req.flagActivo = this.formularioGrp.get('activo').value.id;

    this.almacenService.listarEstante(req).subscribe(
      (data: OutResponse<AlmacenEstanteListarResponse[]>) => {
        console.log(data);
        if (data.rcodigo == CONSTANTES.R_COD_EXITO) {
          this.almacenEstanteListarResponse = data.objeto;
          this.cargarDatosTabla();
        } else {
          this.almacenEstanteListarResponse = [];
          this.cargarDatosTabla();
        }
        this.isLoading = false;
      }, error => {
        console.log(error);
        this.isLoading = false;
      }
    )
  }

  exportarExcel() {
    this.exportar = true;

    setTimeout(() => {
      this.exportar = false;
    }, 2000);
  }

  regEstante() {
    const dialogRef = this.dialog.open(RegEstanteComponent, {
      width: '500px',
      disableClose: false,
      data: {
        titulo: MENSAJES_PANEL.INTRANET.ALMACEN.ESTANTE.REGISTRAR.TITLE,
        objeto: this.dataDialog.objeto
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.almacenEstanteListarResponse.unshift(result);
        this.cargarDatosTabla();
      }
    });
  }

  modifEstante(obj: AlmacenEstanteListarResponse) {
    let index = this.almacenEstanteListarResponse.indexOf(obj);
    const dialogRef = this.dialog.open(ModEstanteComponent, {
      width: '500px',
      disableClose: false,
      data: {
        titulo: MENSAJES_PANEL.INTRANET.ALMACEN.ESTANTE.EDITAR.TITLE,
        objeto: obj
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.almacenEstanteListarResponse.splice(index, 1);
        this.almacenEstanteListarResponse.unshift(result);
        this.cargarDatosTabla();
      }
    });
  }

  elimEstante(row: AlmacenEstanteListarResponse): void {
    let index = this.almacenEstanteListarResponse.indexOf(row);

    let req = new AlmacenEstanteEliminarRequest();
    req.id = row.id;

    this.almacenService.eliminarEstante(req).subscribe(
      (data) => {
        if (data.rcodigo == CONSTANTES.R_COD_EXITO) {
          this.almacenEstanteListarResponse.splice(index, 1);
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
}
