import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CONSTANTES, MENSAJES, MENSAJES_PANEL } from 'src/app/common';
import { DataDialog } from 'src/app/core/model/data-dialog.model';
import { DateService } from 'src/app/core/services/date.service';
import { FormService } from 'src/app/core/services/form.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { InventarioBuscarInventCompraRequest } from 'src/app/modules/intranet/dto/request/inventario-buscar-invent-compra.request';
import { InventarioCodigoBarraDetModificarRequest } from 'src/app/modules/intranet/dto/request/inventario-codigo-barra-det-modificar.request';
import { InventarioCodigoBarraListarRequest } from 'src/app/modules/intranet/dto/request/inventario-codigo-barra-listar.request';
import { InventarioInventariarCompraDetRequest } from 'src/app/modules/intranet/dto/request/inventario-invent-compra-det.request';
import { InventarioModificarCompraDetRequest } from 'src/app/modules/intranet/dto/request/inventario-modificar-compra-det.request';
import { InventarioModificarCompraRequest } from 'src/app/modules/intranet/dto/request/inventario-modificar-compra.request';
import { CompraListarResponse } from 'src/app/modules/intranet/dto/response/compra-listar.response';
import { InventarioBuscarCompraResponse } from 'src/app/modules/intranet/dto/response/inventario-buscar-compra.response';
import { InventarioBuscarInventCompraResponse } from 'src/app/modules/intranet/dto/response/inventario-buscar-invent-compra.response';
import { InventarioCodigoBarraListarResponse } from 'src/app/modules/intranet/dto/response/inventario-codigo-barra-listar.response';
import { InventarioUbicarProductoResponse } from 'src/app/modules/intranet/dto/response/inventario-ubicar-producto.response';
import { OutResponse } from 'src/app/modules/intranet/dto/response/out.response';
import { GenericService } from 'src/app/modules/intranet/services/generic.service';
import { InventarioService } from 'src/app/modules/intranet/services/inventario.service';
import { ModUbicacionComponent } from '../alm-compra/mod-ubicacion/mod-ubicacion.component';
import { ModEscanItemsComponent } from './mod-escan-items/mod-escan-items.component';

@Component({
  selector: 'app-mod-alm-compra',
  templateUrl: './mod-alm-compra.component.html',
  styleUrls: ['./mod-alm-compra.component.scss']
})
export class ModAlmCompraComponent implements OnInit {
  almacen: boolean = false;

  formularioGrp: FormGroup;
  formErrors: any;
  formularioGrp3: FormGroup = new FormGroup({});
  formErrors3: any;

  lInventarioModificarCompraDetRequest: InventarioModificarCompraDetRequest[] = [];
  displayedColumns: string[];
  dataSource: MatTableDataSource<InventarioModificarCompraDetRequest> = null;
  isLoading: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private fb: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ModAlmCompraComponent>,
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
  }

  definirTabla(): void {
    this.displayedColumns = ['id', 'producto', 'cantidad', 'precioCompra', 'ganancia', 'precio', 'ubicacion', 'opt'];
  }

  public cargarDatosTabla(): void {
    if (this.lInventarioModificarCompraDetRequest.length > 0) {
      this.dataSource = new MatTableDataSource(this.lInventarioModificarCompraDetRequest);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    this.crearControles();
  }

  buscarCompra(id: number): void {
    let req = new InventarioBuscarInventCompraRequest();
    req.idCompra = id;

    this.inventarioService.buscarInventarioCompra(req).subscribe(
      (data: OutResponse<InventarioBuscarInventCompraResponse>) => {
        if (data.rcodigo == CONSTANTES.R_COD_EXITO) {
          this.lInventarioModificarCompraDetRequest = [];
          data.objeto.listaDetalleCompra.forEach(el => {
            let obj = new InventarioModificarCompraDetRequest();
            obj.idDetCompraEstante = el.idDetCompraEstante;
            obj.idEstante = el.idEstante;
            obj.idInventario = el.idInventario;
            obj.idProducto = el.idProducto;
            obj.cantidad = el.cantidadPerfecto;
            obj.precio = el.precio;
            obj.listaCodigoBarra = [];
            obj.listaCodigoBarraElim = [];

            obj.nomProducto = el.nomProducto;
            obj.precioCompra = el.precioUnitario;
            obj.ganancia = (el.precio - el.precioUnitario) * 100 / el.precioUnitario;
            obj.idAlmacen = el.idAlmacen;
            obj.nomAlmacen = el.nomAlmacen;
            obj.nomEstante = el.nomEstante;

            this.lInventarioModificarCompraDetRequest.push(obj);
          });

          this.cargarDatosTabla();
          this.cargarListaCodigoBarras();

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

  cargarListaCodigoBarras(): void {
    this.lInventarioModificarCompraDetRequest.forEach((el, i) => {
      let req = new InventarioCodigoBarraListarRequest();
      req.idDetCompraEstante = el.idDetCompraEstante;

      this.inventarioService.listaCodigoBarra(req).subscribe(
        (data: OutResponse<InventarioCodigoBarraListarResponse[]>) => {
          console.log(data);
          if (data.rcodigo == CONSTANTES.R_COD_EXITO && data.objeto.length > 0) {
            let obj = new InventarioCodigoBarraDetModificarRequest();
            data.objeto.forEach(cb => {
              obj.id = cb.id;
              obj.codigo = cb.codigo;
              obj.flagActivo = cb.flagActivo;

              el.listaCodigoBarra.push(obj);
            });
          } else {
            console.log(data.rmensaje);
          }
        }, error => {
          console.log(error);
        }
      )
    });
    // this.cargarDatosTabla();
  }

  modifAmacenCompra(): void {
    if (this.formularioGrp3.valid) {
      if (this.lInventarioModificarCompraDetRequest.length > 0) {
        this.almacen = true;

        let nomEstadoCompra = '';

        let req = new InventarioModificarCompraRequest();
        req.idUsuarioMod = this.user.getId;
        req.fecUsuarioMod = new Date();
        req.listaDetalleInventario = this.lInventarioModificarCompraDetRequest;

        console.log(req);
        this.inventarioService.modificarInventarioCompra(req).subscribe(
          (data: OutResponse<any>) => {
            if (data.rcodigo == CONSTANTES.R_COD_EXITO) {
              let res = this.dataDialog.objeto;
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

    console.log('CREAR CONTROLES');
    console.log(this.lInventarioModificarCompraDetRequest);
    this.lInventarioModificarCompraDetRequest.forEach((el, i) => {
      console.log(el);
      frmCtrl[`g${i}`] = new FormControl({ value: el.ganancia, disabled: false }, [Validators.required, Validators.min(0)]);
      frmCtrl[`p${i}`] = new FormControl({ value: el.precio, disabled: false }, [Validators.required]);
      let ubicacion = '';
      if (el.nomAlmacen && el.nomEstante) {
        ubicacion = el.nomAlmacen + ' - ' + el.nomEstante;
      }
      console.log(ubicacion);
      frmCtrl[`u${i}`] = new FormControl({ value: ubicacion, disabled: false }, [Validators.required]);
    });

    this.formularioGrp3 = new FormGroup(frmCtrl);
    this.formErrors3 = this.formService.buildFormErrors(this.formularioGrp3, this.formErrors3);
  }

  actualizaPrecio(i: number) {
    //CANTIDAD
    this.lInventarioModificarCompraDetRequest[i].ganancia = Number.parseFloat((this.formularioGrp3.get('g' + i).value).toFixed(2));
    this.lInventarioModificarCompraDetRequest[i].precio = this.lInventarioModificarCompraDetRequest[i].precioCompra * (100.0 + this.lInventarioModificarCompraDetRequest[i].ganancia) / 100;
    this.formularioGrp3.get('p' + i).setValue(this.lInventarioModificarCompraDetRequest[i].precio);
    console.log(this.lInventarioModificarCompraDetRequest[i]);
    this.formService.getValidationErrors(this.formularioGrp3, this.formErrors3, true);
    console.log(this.formErrors3);
  }

  actualizaGanancia(i: number) {
    //CANTIDAD
    this.lInventarioModificarCompraDetRequest[i].precio = Number.parseFloat((this.formularioGrp3.get('p' + i).value).toFixed(2));
    this.lInventarioModificarCompraDetRequest[i].ganancia = (this.lInventarioModificarCompraDetRequest[i].precio - this.lInventarioModificarCompraDetRequest[i].precioCompra) / this.lInventarioModificarCompraDetRequest[i].precioCompra * 100.0;
    this.formularioGrp3.get('g' + i).setValue(this.lInventarioModificarCompraDetRequest[i].ganancia);
    console.log(this.lInventarioModificarCompraDetRequest[i]);
    this.formService.getValidationErrors(this.formularioGrp3, this.formErrors3, true);
    console.log(this.formErrors3);
  }

  revisarUbicacion(obj: InventarioModificarCompraDetRequest): void {
    let index = this.lInventarioModificarCompraDetRequest.indexOf(obj);
    let aux = new InventarioInventariarCompraDetRequest();
    aux.idProducto = obj.idProducto;

    const dialogRef = this.dialog.open(ModUbicacionComponent, {
      width: '600px',
      disableClose: false,
      data: {
        titulo: MENSAJES_PANEL.INTRANET.ADQUISICION.INVENTARIO.UBICACION.TITLE,
        objeto: aux
      }
    });

    dialogRef.afterClosed().subscribe((result: InventarioUbicarProductoResponse) => {
      if (result) {
        this.lInventarioModificarCompraDetRequest[index].idAlmacen = result.idAlmacen;
        this.lInventarioModificarCompraDetRequest[index].nomAlmacen = result.nomAlmacen;
        this.lInventarioModificarCompraDetRequest[index].idEstante = result.idEstante;
        this.lInventarioModificarCompraDetRequest[index].nomEstante = result.nomEstante;
        this.lInventarioModificarCompraDetRequest[index].precioAnterior = result.precio;
        this.cargarDatosTabla();
      }
    });
  }

  escanearProductos(obj: InventarioModificarCompraDetRequest): void {
    let index = this.lInventarioModificarCompraDetRequest.indexOf(obj);

    const dialogRef = this.dialog.open(ModEscanItemsComponent, {
      width: '500px',
      disableClose: false,
      data: {
        titulo: MENSAJES_PANEL.INTRANET.ADQUISICION.INVENTARIO.ESCANEAR.TITLE,
        objeto: obj
      }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        console.log(result);
        this.lInventarioModificarCompraDetRequest[index].listaCodigoBarra = result.listaCodigos;
        this.lInventarioModificarCompraDetRequest[index].listaCodigoBarraElim = result.listaCodigosElim;
      }
    });
  }

  validarAlmacenamiento(): void {
    this.formService.getValidationErrors(this.formularioGrp3, this.formErrors3, true);
  }
}
