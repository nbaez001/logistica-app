import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CONSTANTES } from 'src/app/common';
import { DataDialog } from 'src/app/core/model/data-dialog.model';
import { FormService } from 'src/app/core/services/form.service';
import { InventarioEstanteListarRequest } from 'src/app/modules/intranet/dto/request/inventario-estante-listar.request';
import { InventarioInventariarCompraDetRequest } from 'src/app/modules/intranet/dto/request/inventario-invent-compra-det.request';
import { InventarioUbicarProductoRequest } from 'src/app/modules/intranet/dto/request/inventario-ubicar-producto.request';
import { AlmacenListarResponse } from 'src/app/modules/intranet/dto/response/almacen-listar.response';
import { InventarioAlmacenListarResponse } from 'src/app/modules/intranet/dto/response/inventario-almacen-listar.response';
import { InventarioEstanteListarResponse } from 'src/app/modules/intranet/dto/response/inventario-estante-listar.response';
import { InventarioUbicarProductoResponse } from 'src/app/modules/intranet/dto/response/inventario-ubicar-producto.response';
import { OutResponse } from 'src/app/modules/intranet/dto/response/out.response';
import { AlmacenService } from 'src/app/modules/intranet/services/almacen.service';
import { InventarioService } from 'src/app/modules/intranet/services/inventario.service';

@Component({
  selector: 'app-mod-ubicacion',
  templateUrl: './mod-ubicacion.component.html',
  styleUrls: ['./mod-ubicacion.component.scss']
})
export class ModUbicacionComponent implements OnInit {
  ubic: boolean = false;
  listaAlmacen: InventarioAlmacenListarResponse[] = [];
  listaEstante: InventarioEstanteListarResponse[] = [];

  formularioGrp: FormGroup;
  formErrors: any;

  listaInventarioUbicarProductoResponse: InventarioUbicarProductoResponse[] = [];
  displayedColumns: string[];
  dataSource: MatTableDataSource<InventarioUbicarProductoResponse> = null;
  isLoading: boolean = false;

  selection = new SelectionModel<InventarioUbicarProductoResponse>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModUbicacionComponent>,
    private _snackBar: MatSnackBar,
    @Inject(AlmacenService) private almacenService: AlmacenService,
    @Inject(InventarioService) private inventarioService: InventarioService,
    @Inject(FormService) private formService: FormService,
    @Inject(MAT_DIALOG_DATA) public dataDialog: DataDialog<InventarioInventariarCompraDetRequest>) { }

  ngOnInit() {
    console.log(this.dataDialog);
    this.formularioGrp = this.fb.group({
      almacen: ['', [Validators.required]],
      estante: ['', [Validators.required]],
    });

    this.formErrors = this.formService.buildFormErrors(this.formularioGrp, this.formErrors);
    this.formularioGrp.valueChanges.subscribe((val: any) => {
      this.formService.getValidationErrors(this.formularioGrp, this.formErrors, false);
    });

    this.definirTabla();
    this.inicializarVariables();
  }

  public inicializarVariables(): void {
    this.buscarUbicaciones(this.dataDialog.objeto.idProducto);
    this.comboAlmacen();
  }

  definirTabla(): void {
    this.displayedColumns = ['select', 'id', 'producto', 'almacen', 'estante'];
  }

  public cargarDatosTabla(): void {
    if (this.listaInventarioUbicarProductoResponse.length > 0) {
      this.dataSource = new MatTableDataSource(this.listaInventarioUbicarProductoResponse);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  comboAlmacen(): void {
    this.inventarioService.listarAlmacen().subscribe(
      (data: OutResponse<InventarioAlmacenListarResponse[]>) => {
        if (data.rcodigo == CONSTANTES.R_COD_EXITO) {
          this.listaAlmacen = data.objeto;
          this.formularioGrp.get('almacen').setValue(this.listaAlmacen[0]);
        } else {
          this.listaAlmacen = [];
        }
        this.cargarDatosTabla();
        this.comboEstante();
        this.isLoading = false;
      },
      error => {
        console.log(error);
        this._snackBar.open(error.statusText, null, { duration: 8000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['error-snackbar'] });
        this.isLoading = false;
      }
    );
  }

  comboEstante(): void {
    let req = new InventarioEstanteListarRequest();
    req.idAlmacen = this.formularioGrp.get('almacen').value.id;

    this.inventarioService.listarEstante(req).subscribe(
      (data: OutResponse<InventarioEstanteListarResponse[]>) => {
        if (data.rcodigo == CONSTANTES.R_COD_EXITO) {
          this.listaEstante = data.objeto;
          this.formularioGrp.get('estante').setValue(this.listaEstante[0]);
        } else {
          this.listaEstante = [];
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

  buscarUbicaciones(idProducto: number): void {
    let req = new InventarioUbicarProductoRequest();
    req.idProducto = idProducto;

    this.inventarioService.buscarUbicacionProducto(req).subscribe(
      (data: OutResponse<InventarioUbicarProductoResponse[]>) => {
        console.log(data);
        if (data.rcodigo == CONSTANTES.R_COD_EXITO) {
          this.listaInventarioUbicarProductoResponse = data.objeto;

          this.cargarDatosTabla();
        } else {
          console.log(data.rmensaje);
        }
      }, error => {
        console.log(error);
      }
    )
  }

  agregarUbicacion(): void {
    if (this.formularioGrp.valid) {
      let existe = false;
      let idAlmacen = this.formularioGrp.get('almacen').value.id;
      let idEstante = this.formularioGrp.get('estante').value.id;

      this.listaInventarioUbicarProductoResponse.forEach(el => {
        if (el.idAlmacen == idAlmacen && el.idEstante == idEstante) {
          existe = true;
        }
      })

      if (!existe) {
        let obj = new InventarioUbicarProductoResponse();
        obj.idEstante = idEstante;
        obj.nomEstante = this.formularioGrp.get('estante').value.nombre;
        obj.idAlmacen = idAlmacen;
        obj.nomAlmacen = this.formularioGrp.get('almacen').value.nombre;
        obj.cantidad = 0.0;
        obj.precio = 0.0;
        obj.flagActivo = 1;

        this.listaInventarioUbicarProductoResponse.unshift(obj);
        this.cargarDatosTabla();
        this.seleccionar(obj);
      } else {
        this._snackBar.open('La nueva ubicacion que quiere agregar ya existe, seleccione la que desee de la lista', null, { duration: 8000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['warning-snackbar'] });
      }
    } else {
      this.formService.getValidationErrors(this.formularioGrp, this.formErrors, true);
    }
  }

  seleccionar(row: InventarioUbicarProductoResponse): void {
    this.selection.clear();
    this.selection.toggle(row);
  }

  selecUbicacion(): void {
    if (this.selection.selected.length > 0) {
      this.dialogRef.close(this.selection.selected[0]);
    } else {
      this._snackBar.open('Seleccione al menos una ubicacion para el producto', null, { duration: 8000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['warning-snackbar'] });
    }
  }

}
