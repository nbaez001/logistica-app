import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ACTIVO_LISTA, CONSTANTES, MAESTRAS, MENSAJES, MENSAJES_PANEL } from 'src/app/common';
import { FormService } from 'src/app/core/services/form.service';
import { BuscarMaestraRequest } from '../../../dto/request/buscar-maestra.request';
import { CompraListarRequest } from '../../../dto/request/compra-listar.request';
import { CompraListarResponse } from '../../../dto/response/compra-listar.response';
import { MaestraResponse } from '../../../dto/response/maestra.response';
import { OutResponse } from '../../../dto/response/out.response';
import { CompraService } from '../../../services/compra.service';
import { GenericService } from '../../../services/generic.service';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { AlmCompraComponent } from './alm-compra/alm-compra.component';
import { ModAlmCompraComponent } from './mod-alm-compra/mod-alm-compra.component';
import { ModCompraComponent } from './mod-compra/mod-compra.component';
import { RegCompraComponent } from './reg-compra/reg-compra.component';

@Component({
  selector: 'app-bdj-compra',
  templateUrl: './bdj-compra.component.html',
  styleUrls: ['./bdj-compra.component.scss']
})
export class BdjCompraComponent implements OnInit {
  CONSTANTES = CONSTANTES;
  activoLista: any;
  exportar = false;
  index: number;

  listaEstadoCompra: MaestraResponse[] = [];

  compraListarResponse: CompraListarResponse[] = [];
  displayedColumns: string[];
  dataSource: MatTableDataSource<CompraListarResponse>;
  isLoading: boolean = false;

  formularioGrp: FormGroup;
  formErrors: any;

  columnsGrilla = [
    {
      columnDef: 'codigo',
      header: 'Codigo',
      cell: (m: CompraListarResponse) => m.codigo ? `${m.codigo}` : ''
    }, {
      columnDef: 'tipoComprobante',
      header: 'Tipo comprobante',
      cell: (m: CompraListarResponse) => m.nomTipoComprobante ? `${m.nomTipoComprobante}` : ''
    }, {
      columnDef: 'nroComprobante',
      header: 'Nro comprobante',
      cell: (m: CompraListarResponse) => ((m.serieComprobante ? `${m.serieComprobante}` : '') + '-' + (m.nroComprobante ? `${m.nroComprobante}` : ''))
    }, {
      columnDef: 'montoTotal',
      header: 'Monto',
      cell: (m: CompraListarResponse) => m.montoTotal ? `S/. ${this.decimalPipe.transform(m.montoTotal, '1.2-2')}` : ''
    }, {
      columnDef: 'fecha',
      header: 'Fecha',
      cell: (m: CompraListarResponse) => m.fecha ? `${this.datePipe.transform(m.fecha, 'dd/MM/yyyy')}` : ''
    }, {
      columnDef: 'estadoCompra',
      header: 'Estado compra',
      cell: (m: CompraListarResponse) => m.nomEstadoCompra ? `${m.nomEstadoCompra}` : ''
    }, {
      columnDef: 'observacion',
      header: 'Observacion',
      cell: (m: CompraListarResponse) => m.observacion ? `${m.observacion}` : ''
    }, {
      columnDef: 'activo',
      header: 'Estado',
      cell: (m: CompraListarResponse) => m.flagActivo ? 'ACTIVO' : 'INACTIVO'
    }];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private fb: FormBuilder,
    public dialog: MatDialog,
    private datePipe: DatePipe,
    private decimalPipe: DecimalPipe,
    @Inject(FormService) private formService: FormService,
    @Inject(CompraService) private compraService: CompraService,
    @Inject(GenericService) private genericService: GenericService,
    private spinner: NgxSpinnerService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.formularioGrp = this.fb.group({
      estado: ['', [Validators.required]],
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
    this.comboEstadoCompra();
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
    if (this.compraListarResponse.length > 0) {
      this.dataSource = new MatTableDataSource(this.compraListarResponse);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  comboEstadoCompra(): void {
    let req = new BuscarMaestraRequest();
    req.idTabla = MAESTRAS.ESTADO_COMPRA;

    this.genericService.listarMaestra(req).subscribe(
      (data: OutResponse<MaestraResponse[]>) => {
        if (data.rcodigo == 1) {
          this.listaEstadoCompra = data.objeto;
          this.formularioGrp.get('estado').setValue(this.listaEstadoCompra[0]);
        } else {
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

    let req = new CompraListarRequest();
    req.flagActivo = this.formularioGrp.get('activo').value.id;
    req.fecInicio = this.formularioGrp.get('fecInicio').value;
    req.fecFin = this.formularioGrp.get('fecFin').value;
    req.idtEstadoCompra = this.formularioGrp.get('estado').value.id;

    this.compraService.listarCompra(req).subscribe(
      (data: OutResponse<CompraListarResponse[]>) => {
        if (data.rcodigo == CONSTANTES.R_COD_EXITO) {
          this.compraListarResponse = data.objeto;
        } else {
          this.compraListarResponse = [];
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

  regCompra() {
    const dialogRef = this.dialog.open(RegCompraComponent, {
      width: '1200px',
      disableClose: false,
      data: {
        titulo: MENSAJES_PANEL.INTRANET.ADQUISICION.COMPRA.REGISTRAR.TITLE,
        objeto: null
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.compraListarResponse.unshift(result);
        this.cargarDatosTabla();
      }
    });
  }

  modifCompra(obj: CompraListarResponse) {
    let index = this.compraListarResponse.indexOf(obj);
    const dialogRef = this.dialog.open(ModCompraComponent, {
      width: '1200px',
      disableClose: false,
      data: {
        titulo: MENSAJES_PANEL.INTRANET.ADQUISICION.COMPRA.EDITAR.TITLE,
        objeto: obj
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.compraListarResponse.splice(index, 1);
        this.compraListarResponse.unshift(result);
        this.cargarDatosTabla();
      }
    });
  }

  elimCompra(obj): void {
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
        this.index = this.compraListarResponse.indexOf(obj);

        this.compraService.eliminarCompra(obj).subscribe(
          (data: OutResponse<any>) => {
            if (data.rcodigo == CONSTANTES.R_COD_EXITO) {
              this._snackBar.open(MENSAJES.EXITO_OPERACION, null, { duration: 8000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['success-snackbar'] });
              this.compraListarResponse.splice(this.index, 1);
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

  almacenarCompra(obj: CompraListarResponse): void {
    let index = this.compraListarResponse.indexOf(obj);
    const dialogRef = this.dialog.open(AlmCompraComponent, {
      width: '1200px',
      disableClose: false,
      data: {
        titulo: MENSAJES_PANEL.INTRANET.ADQUISICION.INVENTARIO.ALMACENAR.TITLE,
        objeto: obj
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result) {
        this.compraListarResponse.splice(index, 1);
        this.compraListarResponse.unshift(result);
        this.cargarDatosTabla();
      }
    });
  }

  ModificarAlmaceCompra(obj: CompraListarResponse): void {
    const dialogRef = this.dialog.open(ModAlmCompraComponent, {
      width: '1200px',
      disableClose: false,
      data: {
        titulo: MENSAJES_PANEL.INTRANET.ADQUISICION.INVENTARIO.MODIFICAR_ALMACENAR.TITLE,
        objeto: obj
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }

}
