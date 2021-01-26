import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CONSTANTES, MAESTRAS, MENSAJES, MENSAJES_PANEL } from 'src/app/common';
import { DataDialog } from 'src/app/core/model/data-dialog.model';
import { DateService } from 'src/app/core/services/date.service';
import { FormService } from 'src/app/core/services/form.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { BuscarMaestraRequest } from 'src/app/modules/intranet/dto/request/buscar-maestra.request';
import { InventarioBuscarCompraRequest } from 'src/app/modules/intranet/dto/request/inventario-buscar-compra.request';
import { InventarioCodigoBarraDetRequest } from 'src/app/modules/intranet/dto/request/inventario-codigo-barra-det.request';
import { InventarioInventariarCompraDetRequest } from 'src/app/modules/intranet/dto/request/inventario-invent-compra-det.request';
import { InventarioInventariarCompraRequest } from 'src/app/modules/intranet/dto/request/inventario-invent-compra.request';
import { InventarioUbicarProductoRequest } from 'src/app/modules/intranet/dto/request/inventario-ubicar-producto.request';
import { CompraListarResponse } from 'src/app/modules/intranet/dto/response/compra-listar.response';
import { InventarioBuscarCompraResponse } from 'src/app/modules/intranet/dto/response/inventario-buscar-compra.response';
import { InventarioUbicarProductoResponse } from 'src/app/modules/intranet/dto/response/inventario-ubicar-producto.response';
import { MaestraResponse } from 'src/app/modules/intranet/dto/response/maestra.response';
import { OutResponse } from 'src/app/modules/intranet/dto/response/out.response';
import { GenericService } from 'src/app/modules/intranet/services/generic.service';
import { InventarioService } from 'src/app/modules/intranet/services/inventario.service';
import { EscanItemsComponent } from './escan-items/escan-items.component';
import { ModUbicacionComponent } from './mod-ubicacion/mod-ubicacion.component';

@Component({
  selector: 'app-alm-compra',
  templateUrl: './alm-compra.component.html',
  styleUrls: ['./alm-compra.component.scss']
})
export class AlmCompraComponent implements OnInit {
  almacen: boolean = false;
  listaEstadoCompra: MaestraResponse[] = [];

  proveedorBuscarResponse: InventarioBuscarCompraResponse = null;

  formularioGrp: FormGroup;
  formErrors: any;
  formularioGrp3: FormGroup = new FormGroup({});
  formErrors3: any;

  lInventarioInventCompraDetRequest: InventarioInventariarCompraDetRequest[] = [];
  displayedColumns: string[];
  dataSource: MatTableDataSource<InventarioInventariarCompraDetRequest> = null;
  isLoading: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private fb: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AlmCompraComponent>,
    private _snackBar: MatSnackBar,
    @Inject(InventarioService) private inventarioService: InventarioService,
    @Inject(UsuarioService) private user: UsuarioService,
    @Inject(FormService) private formService: FormService,
    @Inject(GenericService) private genericService: GenericService,
    @Inject(DateService) private dateService: DateService,
    @Inject(MAT_DIALOG_DATA) public dataDialog: DataDialog<CompraListarResponse>) { }

  ngOnInit() {
    console.log(this.dataDialog);
    this.formularioGrp = this.fb.group({
      codCompra: [{ value: '', disabled: true }, [Validators.required]],
      proveedor: [{ value: '', disabled: true }, []],
      monto: [{ value: '', disabled: true }, []],
      observacion: [{ value: '', disabled: true }, []],
    });

    this.formErrors = this.formService.buildFormErrors(this.formularioGrp, this.formErrors);
    this.formularioGrp.valueChanges.subscribe((val: any) => {
      this.formService.getValidationErrors(this.formularioGrp, this.formErrors, false);
    });


    this.formErrors3 = this.formService.buildFormErrors(this.formularioGrp3, this.formErrors3);
    this.formularioGrp3.valueChanges.subscribe((val: any) => {
      this.formService.getValidationErrors(this.formularioGrp3, this.formErrors3, false);
    });

    this.definirTabla();
    this.inicializarVariables();
  }

  public inicializarVariables(): void {
    this.buscarCompra(this.dataDialog.objeto.id);
    this.comboEstadoCompra();
  }

  definirTabla(): void {
    this.displayedColumns = ['id', 'producto', 'cantidad', 'precioCompra', 'ganancia', 'precio', 'ubicacion', 'opt'];
  }

  public cargarDatosTabla(): void {
    if (this.lInventarioInventCompraDetRequest.length > 0) {
      this.dataSource = new MatTableDataSource(this.lInventarioInventCompraDetRequest);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    this.crearControles();
  }

  buscarCompra(id: number): void {
    let req = new InventarioBuscarCompraRequest();
    req.idCompra = id;

    this.inventarioService.buscarCompra(req).subscribe(
      (data: OutResponse<InventarioBuscarCompraResponse>) => {
        console.log(data);
        if (data.rcodigo == CONSTANTES.R_COD_EXITO) {
          this.lInventarioInventCompraDetRequest = [];
          data.objeto.listaDetalleCompra.forEach(el => {
            let obj = new InventarioInventariarCompraDetRequest();
            obj.idDetalleCompra = el.idDetCompra;
            obj.idProducto = el.idProducto;
            obj.cantidad = el.cantidadPerfecto;
            obj.nomProducto = el.nomProducto;
            obj.precioCompra = el.precioUnitario;
            obj.ganancia = 2.0;
            obj.precio = obj.precioCompra + (obj.ganancia / 100) * obj.precioCompra;
            obj.listaCodigoBarra = [];

            this.lInventarioInventCompraDetRequest.push(obj);
          });

          this.cargarDatosTabla();
          this.cargarUbicacionProductos();

          this.formularioGrp.get('codCompra').setValue(data.objeto.codCompra);
          this.formularioGrp.get('proveedor').setValue(data.objeto.nomProveedor + ' - ' + data.objeto.nroDocProveedor);
          this.formularioGrp.get('monto').setValue(data.objeto.montoTotal);
          this.formularioGrp.get('observacion').setValue(data.objeto.observacion);
        } else {
          console.log(data.rmensaje);
        }
      }, error => {
        console.log(error);
      }
    )
  }

  cargarUbicacionProductos(): void {
    this.lInventarioInventCompraDetRequest.forEach((el, i) => {
      let req = new InventarioUbicarProductoRequest();
      req.idProducto = el.idProducto;

      this.inventarioService.buscarUbicacionProducto(req).subscribe(
        (data: OutResponse<InventarioUbicarProductoResponse[]>) => {
          console.log(data);
          if (data.rcodigo == CONSTANTES.R_COD_EXITO && data.objeto.length > 0) {
            el.idAlmacen = data.objeto[0].idAlmacen;
            el.nomAlmacen = data.objeto[0].nomAlmacen;
            el.idEstante = data.objeto[0].idEstante;
            el.nomEstante = data.objeto[0].nomEstante;
            el.precioAnterior = data.objeto[0].precio;

            this.formularioGrp3.get('u' + i).setValue(el.nomAlmacen + ' - ' + el.nomEstante);
          } else {
            console.log(data.rmensaje);
          }
        }, error => {
          console.log(error);
        }
      )
    });
    this.cargarDatosTabla();
  }

  comboEstadoCompra(): void {
    let req = new BuscarMaestraRequest();
    req.idTabla = MAESTRAS.ESTADO_COMPRA;

    this.genericService.listarMaestra(req).subscribe(
      (data: OutResponse<MaestraResponse[]>) => {
        if (data.rcodigo == CONSTANTES.R_COD_EXITO) {
          this.listaEstadoCompra = data.objeto;
          console.log(this.listaEstadoCompra);
        } else {
          console.log(data.rmensaje);
        }
      }, error => {
        console.log(error);
      }
    )
  }

  almacenarCompra(): void {
    if (this.formularioGrp3.valid) {
      if (this.lInventarioInventCompraDetRequest.length > 0) {
        this.almacen = true;

        let nomEstadoCompra = '';

        let req = new InventarioInventariarCompraRequest();
        req.idCompra = this.dataDialog.objeto.id;
        this.listaEstadoCompra.forEach(el => {
          console.log(el);
          if (el.valor == CONSTANTES.VAL_ESTADO_COMPRA_ALMACENADO) {
            req.idtEstadoCompra = el.id;
            nomEstadoCompra = el.nombre;
          }
        })
        req.idUsuarioCrea = this.user.getId;
        req.fecUsuarioCrea = new Date();

        req.listaDetalleInventario = this.lInventarioInventCompraDetRequest;

        console.log(req);
        this.inventarioService.inventariarCompra(req).subscribe(
          (data: OutResponse<any>) => {
            if (data.rcodigo == CONSTANTES.R_COD_EXITO) {
              let res = this.dataDialog.objeto;
              res.idtEstadoCompra = req.idtEstadoCompra;
              res.nomEstadoCompra = nomEstadoCompra;
              res.valEstadoCompra = CONSTANTES.VAL_ESTADO_COMPRA_ALMACENADO;
              this.dialogRef.close(res);

              this._snackBar.open(MENSAJES.EXITO_OPERACION, null, { duration: 8000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['success-snackbar'] });
            } else {
              this._snackBar.open(data.rmensaje, null, { duration: 8000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['warning-snackbar'] });
            }
            this.almacen = false;
          },
          error => {
            console.log(error);
            this.almacen = false;
            this._snackBar.open(error.statusText, null, { duration: 8000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['error-snackbar'] });
          }
        );
      } else {
        this._snackBar.open('Ingrese al menos un detalle de productos comprados', null, { duration: 8000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['warning-snackbar'] });
      }
    } else {
      this.formService.getValidationErrors(this.formularioGrp3, this.formErrors3, true);
    }
  }

  crearControles(): void {
    const frmCtrl = {};

    this.lInventarioInventCompraDetRequest.forEach((el, i) => {
      frmCtrl[`g${i}`] = new FormControl({ value: el.ganancia, disabled: false }, [Validators.required, Validators.min(0.01)]);
      frmCtrl[`p${i}`] = new FormControl({ value: el.precio, disabled: false }, [Validators.required]);
      let ubicacion = '';
      if (el.nomAlmacen && el.nomEstante) {
        ubicacion = el.nomAlmacen + ' - ' + el.nomEstante;
      }
      frmCtrl[`u${i}`] = new FormControl({ value: ubicacion, disabled: false }, [Validators.required]);
    });

    this.formularioGrp3 = new FormGroup(frmCtrl);
    this.formErrors3 = this.formService.buildFormErrors(this.formularioGrp3, this.formErrors3);
  }

  actualizaPrecio(i: number) {
    //CANTIDAD
    this.lInventarioInventCompraDetRequest[i].ganancia = Number.parseFloat((this.formularioGrp3.get('g' + i).value).toFixed(2));
    this.lInventarioInventCompraDetRequest[i].precio = this.lInventarioInventCompraDetRequest[i].precioCompra * (100.0 + this.lInventarioInventCompraDetRequest[i].ganancia) / 100;
    this.formularioGrp3.get('p' + i).setValue(this.lInventarioInventCompraDetRequest[i].precio);
    console.log(this.lInventarioInventCompraDetRequest[i]);
    this.formService.getValidationErrors(this.formularioGrp3, this.formErrors3, true);
    console.log(this.formErrors3);
  }

  actualizaGanancia(i: number) {
    //CANTIDAD
    this.lInventarioInventCompraDetRequest[i].precio = Number.parseFloat((this.formularioGrp3.get('p' + i).value).toFixed(2));
    this.lInventarioInventCompraDetRequest[i].ganancia = (this.lInventarioInventCompraDetRequest[i].precio - this.lInventarioInventCompraDetRequest[i].precioCompra) / this.lInventarioInventCompraDetRequest[i].precioCompra * 100.0;
    this.formularioGrp3.get('g' + i).setValue(this.lInventarioInventCompraDetRequest[i].ganancia);
    console.log(this.lInventarioInventCompraDetRequest[i]);
    this.formService.getValidationErrors(this.formularioGrp3, this.formErrors3, true);
    console.log(this.formErrors3);
  }

  revisarUbicacion(obj: InventarioInventariarCompraDetRequest): void {
    let index = this.lInventarioInventCompraDetRequest.indexOf(obj);
    const dialogRef = this.dialog.open(ModUbicacionComponent, {
      width: '600px',
      disableClose: false,
      data: {
        titulo: MENSAJES_PANEL.INTRANET.ADQUISICION.INVENTARIO.UBICACION.TITLE,
        objeto: obj
      }
    });

    dialogRef.afterClosed().subscribe((result: InventarioUbicarProductoResponse) => {
      if (result) {
        this.lInventarioInventCompraDetRequest[index].idAlmacen = result.idAlmacen;
        this.lInventarioInventCompraDetRequest[index].nomAlmacen = result.nomAlmacen;
        this.lInventarioInventCompraDetRequest[index].idEstante = result.idEstante;
        this.lInventarioInventCompraDetRequest[index].nomEstante = result.nomEstante;
        this.lInventarioInventCompraDetRequest[index].precioAnterior = result.precio;
        this.cargarDatosTabla();
      }
    });
  }

  escanearProductos(obj: InventarioInventariarCompraDetRequest): void {
    let index = this.lInventarioInventCompraDetRequest.indexOf(obj);

    const dialogRef = this.dialog.open(EscanItemsComponent, {
      width: '500px',
      disableClose: false,
      data: {
        titulo: MENSAJES_PANEL.INTRANET.ADQUISICION.INVENTARIO.ESCANEAR.TITLE,
        objeto: obj
      }
    });

    dialogRef.afterClosed().subscribe((result: InventarioCodigoBarraDetRequest[]) => {
      if (result) {
        console.log(result);
        this.lInventarioInventCompraDetRequest[index].listaCodigoBarra = result;
      }
    });
  }

  validarAlmacenamiento(): void {
    this.formService.getValidationErrors(this.formularioGrp3, this.formErrors3, true);
  }
}
