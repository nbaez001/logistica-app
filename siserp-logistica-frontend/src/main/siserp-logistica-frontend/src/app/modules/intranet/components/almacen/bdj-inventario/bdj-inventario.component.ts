import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ACTIVO_LISTA } from 'src/app/common';
import { FormService } from 'src/app/core/services/form.service';
import { InventarioListarRequest } from '../../../dto/request/inventario-listar.request';
import { InventarioListarResponse } from '../../../dto/response/inventario-listar.response';
import { OutResponse } from '../../../dto/response/out.response';
import { InventarioService } from '../../../services/inventario.service';

@Component({
  selector: 'app-bdj-inventario',
  templateUrl: './bdj-inventario.component.html',
  styleUrls: ['./bdj-inventario.component.scss']
})
export class BdjInventarioComponent implements OnInit {
  activoLista = ACTIVO_LISTA;
  exportar = false;

  inventarioListarResponse: InventarioListarResponse[] = [];

  displayedColumns: string[];
  dataSource: MatTableDataSource<InventarioListarResponse>;
  isLoading: boolean = false;

  formularioGrp: FormGroup;
  formErrors: any;

  columnsGrilla = [
    {
      columnDef: 'nombre',
      header: 'Nombre',
      cell: (m: InventarioListarResponse) => m.nombre ? `${m.nombre}` : ''
    }, {
      columnDef: 'codigo',
      header: 'Codigo',
      cell: (m: InventarioListarResponse) => m.codigo ? `${m.codigo}` : ''
    }, {
      columnDef: 'cantidad',
      header: 'Cantidad',
      cell: (m: InventarioListarResponse) => m.cantidad ? `${this.decimalPipe.transform(m.cantidad, '1.1-1')}` : ''
    }, {
      columnDef: 'precio',
      header: 'Precio',
      cell: (m: InventarioListarResponse) => m.precio ? `${this.decimalPipe.transform(m.precio, '1.2-2')}` : ''
    }, {
      columnDef: 'tipo',
      header: 'Tipo',
      cell: (m: InventarioListarResponse) => m.nomTipo ? `${m.nomTipo}` : ''
    }, {
      columnDef: 'marca',
      header: 'Marca',
      cell: (m: InventarioListarResponse) => m.nomMarca ? `${m.nomMarca}` : ''
    }, {
      columnDef: 'unidadMedida',
      header: 'Unidad medida',
      cell: (m: InventarioListarResponse) => m.nomUnidadMedida ? `${m.nomUnidadMedida}` : ''
    }, {
      columnDef: 'ubicacion',
      header: 'Ubicacion',
      cell: (m: InventarioListarResponse) => m.nomAlmacen ? `${m.nomAlmacen} - ${m.nomEstante}` : ''
    }, {
      columnDef: 'activo',
      header: 'Estado',
      cell: (m: InventarioListarResponse) => this.activoLista.filter(el => (el.id == m.flagActivo))[0].nombre
    }];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private fb: FormBuilder,
    public dialog: MatDialog,
    @Inject(InventarioService) private inventarioService: InventarioService,
    @Inject(FormService) private formService: FormService,
    private spinner: NgxSpinnerService,
    private _snackBar: MatSnackBar,
    private decimalPipe: DecimalPipe) { }

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
    if (this.inventarioListarResponse.length > 0) {
      this.dataSource = new MatTableDataSource(this.inventarioListarResponse);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  buscar(): void {
    this.dataSource = null;
    this.isLoading = true;
    let req = new InventarioListarRequest();
    req.nombre = this.formularioGrp.get('nombre').value;
    req.fecInicio = this.formularioGrp.get('fecInicio').value;
    req.fecFin = this.formularioGrp.get('fecFin').value;
    req.activo = this.formularioGrp.get('activo').value.id;

    console.log(req);
    this.inventarioService.listarInventario(req).subscribe(
      (data: OutResponse<InventarioListarResponse[]>) => {
        if (data.rcodigo == 0) {
          this.inventarioListarResponse = data.objeto;
        } else {
          this.inventarioListarResponse = [];
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

  editInventario(obj: InventarioListarResponse) {
    // let index = this.inventarioListarResponse.indexOf(obj);
    // const dialogRef = this.dialog.open(ModProductoComponent, {
    //   width: '600px',
    //   disableClose: false,
    //   data: {
    //     titulo: MENSAJES_PANEL.INTRANET.ADMINISTRACION.PRODUCTO.EDITAR.TITLE,
    //     objeto: obj
    //   }
    // });

    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result) {
    //     this.inventarioListarResponse.splice(index, 1);
    //     this.inventarioListarResponse.unshift(result);
    //     this.cargarDatosTabla();
    //   }
    // });
  }
}
