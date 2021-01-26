import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, of } from 'rxjs';
import { CONSTANTES, MAESTRAS, MENSAJES } from 'src/app/common';
import { DataDialog } from 'src/app/core/model/data-dialog.model';
import { DateService } from 'src/app/core/services/date.service';
import { FormService } from 'src/app/core/services/form.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { BuscarMaestraRequest } from 'src/app/modules/intranet/dto/request/buscar-maestra.request';
import { CompraBuscarRequest } from 'src/app/modules/intranet/dto/request/compra-buscar.request';
import { CompraModificarDetalleRequest } from 'src/app/modules/intranet/dto/request/compra-modificar-detalle.request';
import { CompraModificarRequest } from 'src/app/modules/intranet/dto/request/compra-modificar-request';
import { CompraProductoBuscarRequest } from 'src/app/modules/intranet/dto/request/compra-producto-buscar.request';
import { CompraProveedorBuscarRequest } from 'src/app/modules/intranet/dto/request/compra-proveedor-buscar.reques';
import { CompraBuscarResponse } from 'src/app/modules/intranet/dto/response/compra-buscar.response';
import { CompraListarResponse } from 'src/app/modules/intranet/dto/response/compra-listar.response';
import { CompraProductoBuscarResponse } from 'src/app/modules/intranet/dto/response/compra-producto-buscar.response';
import { CompraProveedorBuscarResponse } from 'src/app/modules/intranet/dto/response/compra-proveedor-buscar.response';
import { MaestraResponse } from 'src/app/modules/intranet/dto/response/maestra.response';
import { OutResponse } from 'src/app/modules/intranet/dto/response/out.response';
import { CompraService } from 'src/app/modules/intranet/services/compra.service';
import { GenericService } from 'src/app/modules/intranet/services/generic.service';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-mod-compra',
  templateUrl: './mod-compra.component.html',
  styleUrls: ['./mod-compra.component.scss']
})
export class ModCompraComponent implements OnInit {
  modif: boolean = false;
  select: boolean = false;

  proveedorBuscarResponse: CompraProveedorBuscarResponse = null;
  productoBuscarResponse: CompraProductoBuscarResponse = null;

  lProveedorBuscarResponse: Observable<CompraProveedorBuscarResponse[]>;
  lProductoBuscarResponse: Observable<CompraProductoBuscarResponse[]>;

  listaTipoComprobante: MaestraResponse[] = [];
  listaTipoDocProveedor: MaestraResponse[] = [];

  formularioGrp: FormGroup;
  formErrors: any;
  formularioGrp2: FormGroup;
  formErrors2: any;
  formularioGrp3: FormGroup = new FormGroup({});
  formErrors3: any;

  lCompraModificarEliminados: CompraModificarDetalleRequest[] = [];

  lCompraModificarDetalleRequest: CompraModificarDetalleRequest[] = [];
  displayedColumns: string[];
  dataSource: MatTableDataSource<CompraModificarDetalleRequest> = null;
  isLoading: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private fb: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ModCompraComponent>,
    private _snackBar: MatSnackBar,
    @Inject(CompraService) private compraService: CompraService,
    @Inject(GenericService) private genericService: GenericService,
    @Inject(UsuarioService) private user: UsuarioService,
    @Inject(FormService) private formService: FormService,
    @Inject(DateService) private dateService: DateService,
    @Inject(MAT_DIALOG_DATA) public dataDialog: DataDialog<CompraListarResponse>) { }

  ngOnInit() {
    console.log(this.dataDialog);
    this.formularioGrp = this.fb.group({
      tipDocProveedor: ['', []],
      nroDocProveedor: ['', []],
      nomProveedor: ['', []],
      tipoComprobante: ['', [Validators.required]],
      serie: ['', []],
      numero: ['', []],
      // nroOrdenCompra: ['', []],
      fecha: [new Date(), [Validators.required]],
      montoTotal: ['', [Validators.required]],
      observacion: ['', []],
    });

    this.formularioGrp2 = this.fb.group({
      codProducto: ['', [Validators.required]],
      nomProducto: ['', [Validators.required]],
    });

    this.formErrors = this.formService.buildFormErrors(this.formularioGrp, this.formErrors);
    this.formularioGrp.valueChanges.subscribe((val: any) => {
      this.formService.getValidationErrors(this.formularioGrp, this.formErrors, false);
    });

    this.formErrors2 = this.formService.buildFormErrors(this.formularioGrp2, this.formErrors2);
    this.formularioGrp2.valueChanges.subscribe((val: any) => {
      this.formService.getValidationErrors(this.formularioGrp2, this.formErrors2, false);
    });

    this.formErrors3 = this.formService.buildFormErrors(this.formularioGrp3, this.formErrors3);
    this.formularioGrp3.valueChanges.subscribe((val: any) => {
      this.formService.getValidationErrors(this.formularioGrp3, this.formErrors3, false);
    });

    //FOR AUTOCOMPLETES
    this.formularioGrp.get('nroDocProveedor').valueChanges.subscribe(
      data => {
        const filterValue = (typeof data == 'number') ? data.toString() : null;
        if (filterValue && filterValue.length > 4) {
          this.select = false;
          this._buscarProveedorXDocumento(filterValue);
        }
      }
    );

    this.formularioGrp.get('nomProveedor').valueChanges.subscribe(
      data => {
        const filterValue = (typeof data == 'string') ? data.toUpperCase() : null;
        if (filterValue) {
          this.select = false;
          this._buscarProveedorXNombre(filterValue);
        }
      }
    );

    this.formularioGrp2.get('codProducto').valueChanges.subscribe(
      data => {
        const filterValue = (typeof data == 'string') ? data.toUpperCase() : null;
        if (filterValue && filterValue.length > 4) {
          this._buscarProductoXCodigo(filterValue);
        }
      }
    );

    this.formularioGrp2.get('nomProducto').valueChanges.subscribe(
      data => {
        const filterValue = (typeof data == 'string') ? data.toUpperCase() : null;
        if (filterValue) {
          this._buscarProductoXNombre(filterValue);
        }
      }
    );
    //PARA AUTOCOMPLETES

    this.definirTabla();
    this.inicializarVariables();
  }

  public inicializarVariables(): void {
    this.comboTipoComprobante();
    this.comboTipoDocProveedor();
    this.buscarCompra(this.dataDialog.objeto.id);
  }

  definirTabla(): void {
    this.displayedColumns = ['id', 'producto', 'precio', 'cantidad', 'cantDaniado', 'cantPerfecto', 'total', 'opt'];
  }

  public cargarDatosTabla(): void {
    if (this.lCompraModificarDetalleRequest.length > 0) {
      this.dataSource = new MatTableDataSource(this.lCompraModificarDetalleRequest);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    this.crearControles();
  }

  comboTipoComprobante(): void {
    let req = new BuscarMaestraRequest();
    req.idTabla = MAESTRAS.TIPO_COMPROBANTE;

    this.genericService.listarMaestra(req).subscribe(
      (data: OutResponse<MaestraResponse[]>) => {
        console.log(data);
        if (data.rcodigo == CONSTANTES.R_COD_EXITO) {
          this.listaTipoComprobante = data.objeto;
          this.formularioGrp.get('tipoComprobante').setValue(this.listaTipoComprobante[0]);
        } else {
          console.log(data.rmensaje);
        }
      }, error => {
        console.log(error);
      }
    )
  }

  comboTipoDocProveedor(): void {
    let req = new BuscarMaestraRequest();
    req.idTabla = MAESTRAS.TIPO_DOCUMENTO_IDENTIDAD;

    this.genericService.listarMaestra(req).subscribe(
      (data: OutResponse<MaestraResponse[]>) => {
        if (data.rcodigo == CONSTANTES.R_COD_EXITO) {
          this.listaTipoDocProveedor = data.objeto;
          this.formularioGrp.get('tipDocProveedor').setValue(this.listaTipoDocProveedor[1]);
        } else {
          console.log(data.rmensaje);
        }
      }, error => {
        console.log(error);
      }
    )
  }

  buscarCompra(id: number): void {
    let req = new CompraBuscarRequest();
    req.id = id;

    this.compraService.buscarCompra(req).subscribe(
      (data: OutResponse<CompraBuscarResponse>) => {
        console.log(data);
        if (data.rcodigo == CONSTANTES.R_COD_EXITO) {
          this.lCompraModificarDetalleRequest = [];
          data.objeto.listaDetalleCompra.forEach(el => {
            let obj = new CompraModificarDetalleRequest();
            obj.id = el.id;
            obj.idProducto = el.idProducto;
            obj.nomProducto = el.nomProducto;
            obj.cantidad = el.cantidad;
            obj.cantidadPerfecto = el.cantidadPerfecto;
            obj.cantidadDaniado = el.cantidadDaniado;
            obj.precioUnitario = el.precioUnitario;
            obj.subTotal = el.subTotal;
            obj.flagActivo = el.flagActivo;
            this.lCompraModificarDetalleRequest.push(obj);
          });

          this.cargarDatosTabla();

          if (data.objeto.idProveedor) {
            this.proveedorBuscarResponse = new CompraProveedorBuscarResponse();
            this.proveedorBuscarResponse.id = data.objeto.idProveedor;
            this.proveedorBuscarResponse.nombre = data.objeto.nomProveedor;
            this.proveedorBuscarResponse.tipDocumento = data.objeto.tipDocProveedor;
            this.proveedorBuscarResponse.nroDocumento = data.objeto.nroDocProveedor;

            this.formularioGrp.get('tipDocProveedor').setValue(this.listaTipoDocProveedor.filter(el => (el.id == data.objeto.tipDocProveedor))[0]);
            this.formularioGrp.get('nroDocProveedor').setValue(this.proveedorBuscarResponse);
            this.formularioGrp.get('nomProveedor').setValue(this.proveedorBuscarResponse);
          }

          this.formularioGrp.get('tipoComprobante').setValue(this.listaTipoComprobante.filter(el => (el.id == data.objeto.idtTipoComprobante))[0]);
          this.formularioGrp.get('serie').setValue(data.objeto.serieComprobante);
          this.formularioGrp.get('numero').setValue(data.objeto.nroComprobante);
          this.formularioGrp.get('fecha').setValue(this.dateService.parseGuionDDMMYYYY(data.objeto.fecha));
          this.formularioGrp.get('montoTotal').setValue(data.objeto.montoTotal);
          this.formularioGrp.get('observacion').setValue(data.objeto.observacion);
        } else {
          console.log(data.rmensaje);
        }
      }, error => {
        console.log(error);
      }
    )
  }

  private _buscarProveedorXDocumento(value: any): void {
    let req = new CompraProveedorBuscarRequest();
    req.nroDocProveedor = value;

    this.compraService.buscarProvedor(req).subscribe(
      (data: OutResponse<CompraProveedorBuscarResponse[]>) => {
        console.log(data);
        if (data.rcodigo == CONSTANTES.R_COD_EXITO) {
          this.lProveedorBuscarResponse = JSON.parse(JSON.stringify(data.objeto));
        } else {
          console.log(data.rmensaje);
          this.lProveedorBuscarResponse = of([]);
        }
      }, error => {
        console.log(error);
        this.lProveedorBuscarResponse = of([]);
      }
    )
  }

  private _buscarProveedorXNombre(value: any): void {
    let req = new CompraProveedorBuscarRequest();
    req.nomProveedor = value;

    this.compraService.buscarProvedor(req).subscribe(
      (data: OutResponse<CompraProveedorBuscarResponse[]>) => {
        console.log(data);
        if (data.rcodigo == CONSTANTES.R_COD_EXITO) {
          this.lProveedorBuscarResponse = JSON.parse(JSON.stringify(data.objeto));
        } else {
          console.log(data.rmensaje);
          this.lProveedorBuscarResponse = of([]);
        }
      }, error => {
        console.log(error);
        this.lProveedorBuscarResponse = of([]);
      }
    )
  }

  private _buscarProductoXCodigo(value: any): void {
    let req = new CompraProductoBuscarRequest();
    req.codProducto = value;

    this.compraService.buscarProducto(req).subscribe(
      (data: OutResponse<CompraProductoBuscarResponse[]>) => {
        console.log(data);
        if (data.rcodigo == CONSTANTES.R_COD_EXITO) {
          this.lProductoBuscarResponse = JSON.parse(JSON.stringify(data.objeto));
        } else {
          console.log(data.rmensaje);
          this.lProductoBuscarResponse = of([]);
        }
      }, error => {
        console.log(error);
        this.lProductoBuscarResponse = of([]);
      }
    )
  }

  private _buscarProductoXNombre(value: any): void {
    let req = new CompraProductoBuscarRequest();
    req.nomProducto = value;

    this.compraService.buscarProducto(req).subscribe(
      (data: OutResponse<CompraProductoBuscarResponse[]>) => {
        console.log(data);
        if (data.rcodigo == CONSTANTES.R_COD_EXITO) {
          this.lProductoBuscarResponse = JSON.parse(JSON.stringify(data.objeto));
        } else {
          console.log(data.rmensaje);
          this.lProductoBuscarResponse = of([]);
        }
      }, error => {
        console.log(error);
        this.lProductoBuscarResponse = of([]);
      }
    )
  }

  modCompra(): void {
    if (this.formularioGrp.valid && this.formularioGrp3.valid) {
      if (this.lCompraModificarDetalleRequest.length > 0) {
        this.modif = true;

        let req = new CompraModificarRequest();
        req.id = this.dataDialog.objeto.id;
        if (this.proveedorBuscarResponse) {
          req.idProveedor = this.proveedorBuscarResponse.id;
        } else {
          req.nomProveedor = this.formularioGrp.get('nomProveedor').value;
          req.nroDocProveedor = this.formularioGrp.get('nroDocProveedor').value;
          req.tipDocProveedor = this.formularioGrp.get('tipDocProveedor').value.id;
        }
        req.idtTipoComprobante = this.formularioGrp.get('tipoComprobante').value.id;
        req.montoTotal = this.formularioGrp.get('montoTotal').value;
        let serie = this.formularioGrp.get('serie').value;
        let numero = this.formularioGrp.get('numero').value;
        if (serie) {
          req.serieComprobante = serie.toString().padStart(4, '0');
        }
        if (numero) {
          req.nroComprobante = numero.toString().padStart(8, '0');
        }
        // req.nroOrdenCompra = this.formularioGrp.get('nroOrdenCompra').value;
        req.observacion = this.formularioGrp.get('observacion').value;
        req.fecha = this.formularioGrp.get('fecha').value;
        req.flagActivo = CONSTANTES.ACTIVO;
        req.idUsuarioMod = this.user.getId;
        req.fecUsuarioMod = new Date();

        req.listaDetalleCompra = [];
        this.lCompraModificarDetalleRequest.forEach(el => {
          req.listaDetalleCompra.push(el);
        })
        this.lCompraModificarEliminados.forEach(el => {
          req.listaDetalleCompra.push(el);
        })

        console.log(req);
        this.compraService.modificarCompra(req).subscribe(
          (data: OutResponse<any>) => {
            if (data.rcodigo == CONSTANTES.R_COD_EXITO) {
              let res = new CompraListarResponse();
              res.id = this.dataDialog.objeto.id;
              res.idProveedor = this.dataDialog.objeto.idProveedor;
              res.idtTipoComprobante = req.idtTipoComprobante;
              res.nomTipoComprobante = this.formularioGrp.get('tipoComprobante').value.nombre;
              res.codigo = this.dataDialog.objeto.codigo;
              res.montoTotal = req.montoTotal;
              res.serieComprobante = req.serieComprobante;
              res.nroComprobante = req.nroComprobante;
              // res.nroOrdenCompra = req.nroOrdenCompra;
              res.observacion = req.observacion;
              res.fecha = req.fecha;
              res.flagActivo = req.flagActivo;
              res.idtEstadoCompra = this.dataDialog.objeto.idtEstadoCompra;
              res.nomEstadoCompra = this.dataDialog.objeto.nomEstadoCompra;
              res.idUsuarioCrea = this.dataDialog.objeto.idUsuarioCrea;
              res.fecUsuarioCrea = this.dataDialog.objeto.fecUsuarioCrea;
              res.idUsuarioCrea = req.idUsuarioMod;
              res.fecUsuarioCrea = req.fecUsuarioMod;
              this.dialogRef.close(res);

              this._snackBar.open(MENSAJES.EXITO_OPERACION, null, { duration: 8000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['success-snackbar'] });
            } else {
              this._snackBar.open(data.rmensaje, null, { duration: 8000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['warning-snackbar'] });
            }
            this.modif = false;
          },
          error => {
            console.log(error);
            this.modif = false;
            this._snackBar.open(error.statusText, null, { duration: 8000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['error-snackbar'] });
          }
        );
      } else {
        this._snackBar.open('Ingrese al menos un detalle de productos comprados', null, { duration: 8000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['warning-snackbar'] });
      }
    } else {
      this.formService.getValidationErrors(this.formularioGrp, this.formErrors, true);
    }
  }

  displayFn(obj: CompraProveedorBuscarResponse) {
    return obj ? obj.nroDocumento : undefined;
  }

  displayFn2(obj: CompraProveedorBuscarResponse) {
    return obj ? obj.nombre : undefined;
  }

  displayFn3(obj: CompraProductoBuscarResponse) {
    return obj ? obj.codigo : undefined;
  }

  displayFn4(obj: CompraProductoBuscarResponse) {
    return obj ? obj.nombre : undefined;
  }

  seleccionado(evt) {
    this.proveedorBuscarResponse = evt.option.value;
    this.formularioGrp.get('nomProveedor').setValue(evt.option.value);
  }

  seleccionado2(evt) {
    this.proveedorBuscarResponse = evt.option.value;
    this.formularioGrp.get('nroDocProveedor').setValue(evt.option.value);
  }

  seleccionado3(evt) {
    this.productoBuscarResponse = evt.option.value;
    this.formularioGrp2.get('nomProducto').setValue(evt.option.value);
    setTimeout(() => {
      this.select = true;
    }, 300);
  }

  seleccionado4(evt) {
    this.productoBuscarResponse = evt.option.value;
    this.formularioGrp2.get('codProducto').setValue(evt.option.value);
    setTimeout(() => {
      this.select = true;
    }, 300);
  }

  agregarDetalle(): void {
    if (this.productoBuscarResponse && this.select) {
      let det = new CompraModificarDetalleRequest();
      det.idProducto = this.productoBuscarResponse.id;
      det.nomProducto = this.productoBuscarResponse.nombre;
      det.cantidad = 0.0;
      det.cantidadPerfecto = 0.0;
      det.cantidadDaniado = 0.0;
      det.precioUnitario = 0.0;
      det.subTotal = 0.0;
      det.flagActivo = CONSTANTES.ACTIVO;

      this.lCompraModificarDetalleRequest.push(det);
      this.cargarDatosTabla();

      //VACIA LOS CAMPOS
      this.formService.setAsUntoched(this.formularioGrp2, this.formErrors2);
      this.productoBuscarResponse = null;
      this.select = false;
    }
  }

  crearControles(): void {
    const frmCtrl = {};

    this.lCompraModificarDetalleRequest.forEach((el, i) => {
      frmCtrl[`p${i}`] = new FormControl({ value: el.precioUnitario, disabled: false }, [Validators.required, Validators.min(1)]);
      frmCtrl[`c${i}`] = new FormControl({ value: el.cantidad, disabled: false }, [Validators.required, Validators.min(1)]);
      frmCtrl[`cd${i}`] = new FormControl({ value: el.cantidadDaniado, disabled: false }, [Validators.required]);
    });

    this.formularioGrp3 = new FormGroup(frmCtrl);
    this.formErrors3 = this.formService.buildFormErrors(this.formularioGrp3, this.formErrors3);
  }

  actualizarSubtotal(i: number) {
    //CANTIDAD
    this.lCompraModificarDetalleRequest[i].precioUnitario = Number.parseFloat((this.formularioGrp3.get('p' + i).value).toFixed(2));
    //PRECIO NORMAL
    this.lCompraModificarDetalleRequest[i].cantidad = Number.parseFloat((this.formularioGrp3.get('c' + i).value).toFixed(1));
    this.lCompraModificarDetalleRequest[i].cantidadDaniado = Number.parseFloat((this.formularioGrp3.get('cd' + i).value).toFixed(1));
    //PRECIO VENTA (NORMAL-IGV)
    this.lCompraModificarDetalleRequest[i].cantidadPerfecto = this.lCompraModificarDetalleRequest[i].cantidad - this.lCompraModificarDetalleRequest[i].cantidadDaniado;
    this.lCompraModificarDetalleRequest[i].subTotal = this.lCompraModificarDetalleRequest[i].cantidad * this.lCompraModificarDetalleRequest[i].cantidad;
    console.log(this.lCompraModificarDetalleRequest[i]);
    // console.log('Getting validation errors');
    this.formService.getValidationErrors(this.formularioGrp3, this.formErrors3, true);
    // console.log('Getting validation errors');
    let subTotal = 0.0;
    this.lCompraModificarDetalleRequest.forEach(e => {
      subTotal += e.subTotal;
    });
    this.formularioGrp.get('montoTotal').setValue(subTotal);
  }

  elimProducto(obj: CompraModificarDetalleRequest): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        titulo: MENSAJES.MSG_CONFIRMACION,
        objeto: null
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == CONSTANTES.COD_CONFIRMACION) {
        let dm = new CompraModificarDetalleRequest();
        dm.id = obj.id;
        dm.idProducto = obj.idProducto;
        dm.nomProducto = obj.nomProducto;
        dm.cantidad = obj.cantidad;
        dm.cantidadPerfecto = obj.cantidadPerfecto;
        dm.cantidadDaniado = obj.cantidadDaniado;
        dm.precioUnitario = obj.precioUnitario;
        dm.subTotal = obj.subTotal;
        dm.flagActivo = CONSTANTES.INACTIVO;
        this.lCompraModificarEliminados.push(dm);

        let index = this.lCompraModificarDetalleRequest.indexOf(obj);
        this.lCompraModificarDetalleRequest.splice(index, 1);
        this.cargarDatosTabla();
      }
    });
  }

}
