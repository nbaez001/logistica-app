import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ProductoListarResponse } from '../../../dto/response/producto-listar.response';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProductoService } from '../../../services/producto.service';
import { DatePipe } from '@angular/common';
import { OutResponse } from '../../../dto/response/out.response';
import { RegProductoComponent } from './reg-producto/reg-producto.component';
import { MENSAJES_PANEL, MENSAJES, ACTIVO_LISTA, CONSTANTES } from 'src/app/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormService } from 'src/app/core/services/form.service';
import { ModProductoComponent } from './mod-producto/mod-producto.component';
import { ProductoEliminarRequest } from '../../../dto/request/producto-eliminar.request';
import { ProductoListarRequest } from '../../../dto/request/producto-listar.request';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { CargProductoComponent } from './carg-producto/carg-producto.component';

@Component({
  selector: 'app-bdj-producto',
  templateUrl: './bdj-producto.component.html',
  styleUrls: ['./bdj-producto.component.scss']
})
export class BdjProductoComponent implements OnInit {
  activoLista = ACTIVO_LISTA;
  exportar = false;
  index: number;

  productoListarResponse: ProductoListarResponse[] = [];

  displayedColumns: string[];
  dataSource: MatTableDataSource<ProductoListarResponse>;
  isLoading: boolean = false;

  formularioGrp: FormGroup;
  formErrors: any;

  columnsGrilla = [
    {
      columnDef: 'nombre',
      header: 'Nombre',
      cell: (m: ProductoListarResponse) => m.nombre ? `${m.nombre}` : ''
    }, {
      columnDef: 'codigo',
      header: 'Codigo',
      cell: (m: ProductoListarResponse) => m.codigo ? `${m.codigo}` : ''
    }, {
      columnDef: 'tipo',
      header: 'Tipo',
      cell: (m: ProductoListarResponse) => m.nomTipo ? `${m.nomTipo}` : ''
    }, {
      columnDef: 'marca',
      header: 'Marca',
      cell: (m: ProductoListarResponse) => m.nomMarca ? `${m.nomMarca}` : ''
    }, {
      columnDef: 'unidadMedida',
      header: 'Unidad medida',
      cell: (m: ProductoListarResponse) => m.nomUnidadMedida ? `${m.nomUnidadMedida}` : ''
    }, {
      columnDef: 'descripcion',
      header: 'Descripcion',
      cell: (m: ProductoListarResponse) => m.descripcion ? `${(m.descripcion.length > 66) ? m.descripcion.substr(0, 66) : m.descripcion.substr(0, m.descripcion.length)}` : ''
    }, {
      columnDef: 'activo',
      header: 'Estado',
      cell: (m: ProductoListarResponse) => this.activoLista.filter(el => (el.id == m.flagActivo))[0].nombre
    }];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private fb: FormBuilder,
    public dialog: MatDialog,
    @Inject(ProductoService) private productoService: ProductoService,
    @Inject(FormService) private formService: FormService,
    private spinner: NgxSpinnerService,
    private _snackBar: MatSnackBar,
    private datePipe: DatePipe) { }

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
    if (this.productoListarResponse.length > 0) {
      this.dataSource = new MatTableDataSource(this.productoListarResponse);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  buscar(): void {
    this.dataSource = null;
    this.isLoading = true;
    let req = new ProductoListarRequest();
    req.nombre = this.formularioGrp.get('nombre').value;
    req.fecInicio = this.formularioGrp.get('fecInicio').value;
    req.fecFin = this.formularioGrp.get('fecFin').value;
    req.activo = this.formularioGrp.get('activo').value.id;

    console.log(req);
    this.productoService.listarProducto(req).subscribe(
      (data: OutResponse<ProductoListarResponse[]>) => {
        if (data.rcodigo == 0) {
          this.productoListarResponse = data.objeto;
        } else {
          this.productoListarResponse = [];
        }
        this.cargarDatosTabla();
        this.isLoading = false;
      },
      error => {
        console.log(error);
        this._snackBar.open(error.statusText, null, { duration: 5000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['error-snackbar'] });
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

  regProducto() {
    const dialogRef = this.dialog.open(RegProductoComponent, {
      width: '600px',
      disableClose: false,
      data: {
        titulo: MENSAJES_PANEL.INTRANET.ADMINISTRACION.PRODUCTO.REGISTRAR.TITLE,
        objeto: null
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.productoListarResponse.unshift(result);
        this.cargarDatosTabla();
      }
    });
  }

  editProducto(obj: ProductoListarResponse) {
    let index = this.productoListarResponse.indexOf(obj);
    const dialogRef = this.dialog.open(ModProductoComponent, {
      width: '600px',
      disableClose: false,
      data: {
        titulo: MENSAJES_PANEL.INTRANET.ADMINISTRACION.PRODUCTO.EDITAR.TITLE,
        objeto: obj
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.productoListarResponse.splice(index, 1);
        this.productoListarResponse.unshift(result);
        this.cargarDatosTabla();
      }
    });
  }

  elimProducto(obj: ProductoListarResponse): void {
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
        this.index = this.productoListarResponse.indexOf(obj);

        let req = new ProductoEliminarRequest();
        req.id = obj.id;

        this.productoService.eliminarProducto(req).subscribe(
          (data: OutResponse<any>) => {
            if (data.rcodigo == 0) {
              this.productoListarResponse.splice(this.index, 1);
              this.cargarDatosTabla();
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

  importarDesdeExcel(): void {
    const dialogRef = this.dialog.open(CargProductoComponent, {
      width: '800px',
      data: {
        titulo: MENSAJES_PANEL.INTRANET.ADMINISTRACION.PRODUCTO.CARGA_MASIVA.TITLE,
        objeto: null
      }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result == true) {
        this.buscar();
      }
    });
  }
}
