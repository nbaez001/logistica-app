import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';
import { CONSTANTES, MAESTRAS, MENSAJES } from 'src/app/common';
import { DataDialog } from 'src/app/core/model/data-dialog.model';
import { FormService } from 'src/app/core/services/form.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { BuscarMaestraRequest } from 'src/app/modules/intranet/dto/request/buscar-maestra.request';
import { CompraProveedorBuscarRequest } from 'src/app/modules/intranet/dto/request/compra-proveedor-buscar.reques';
import { MaestraResponse } from 'src/app/modules/intranet/dto/response/maestra.response';
import { OutResponse } from 'src/app/modules/intranet/dto/response/out.response';
import { CompraProveedorBuscarResponse } from 'src/app/modules/intranet/dto/response/compra-proveedor-buscar.response';
import { GenericService } from 'src/app/modules/intranet/services/generic.service';
import { CompraService } from 'src/app/modules/intranet/services/compra.service';
import { CompraRegistrarRequest } from 'src/app/modules/intranet/dto/request/compra-registrar.request';
import { CompraRegistrarDetalleRequest } from 'src/app/modules/intranet/dto/request/compra-registrar-detalle.request';
import { CompraRegistrarResponse } from 'src/app/modules/intranet/dto/response/compra-registrar.response';
import { CompraListarResponse } from 'src/app/modules/intranet/dto/response/compra-listar.response';
import { CompraProductoBuscarResponse } from 'src/app/modules/intranet/dto/response/compra-producto-buscar.response';
import { CompraProductoBuscarRequest } from 'src/app/modules/intranet/dto/request/compra-producto-buscar.request';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-reg-compra',
  templateUrl: './reg-compra.component.html',
  styleUrls: ['./reg-compra.component.scss']
})
export class RegCompraComponent implements OnInit {
  guardar: boolean = false;
  select: boolean = false;

  proveedorBuscarResponse: CompraProveedorBuscarResponse = null;
  productoBuscarResponse: CompraProductoBuscarResponse = null;

  lProveedorBuscarResponse: Observable<CompraProveedorBuscarResponse[]>;
  lProductoBuscarResponse: Observable<CompraProductoBuscarResponse[]>;

  listaTipoComprobante: MaestraResponse[] = [];
  listaEstadoCompra: MaestraResponse[] = [];
  listaTipoDocProveedor: MaestraResponse[] = [];

  formularioGrp: FormGroup;
  formErrors: any;
  formularioGrp2: FormGroup;
  formErrors2: any;
  formularioGrp3: FormGroup = new FormGroup({});
  formErrors3: any;

  lCompraRegistrarDetalleRequest: CompraRegistrarDetalleRequest[] = [];
  displayedColumns: string[];
  dataSource: MatTableDataSource<CompraRegistrarDetalleRequest> = null;
  isLoading: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<RegCompraComponent>,
    private _snackBar: MatSnackBar,
    @Inject(CompraService) private compraService: CompraService,
    @Inject(GenericService) private genericService: GenericService,
    @Inject(UsuarioService) private user: UsuarioService,
    @Inject(FormService) private formService: FormService,
    @Inject(MAT_DIALOG_DATA) public dataDialog: DataDialog<any>) { }

  ngOnInit() {
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
    this.comboEstadoCompra();
    this.comboTipoComprobante();
    this.comboTipoDocProveedor();
  }

  definirTabla(): void {
    this.displayedColumns = ['id', 'producto', 'precio', 'cantidad', 'cantDaniado', 'cantPerfecto', 'total', 'opt'];
  }

  public cargarDatosTabla(): void {
    if (this.lCompraRegistrarDetalleRequest.length > 0) {
      this.dataSource = new MatTableDataSource(this.lCompraRegistrarDetalleRequest);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    this.crearControles();
  }

  comboEstadoCompra(): void {
    let req = new BuscarMaestraRequest();
    req.idTabla = MAESTRAS.ESTADO_COMPRA;

    this.genericService.listarMaestra(req).subscribe(
      (data: OutResponse<MaestraResponse[]>) => {
        if (data.rcodigo == CONSTANTES.R_COD_EXITO) {
          this.listaEstadoCompra = data.objeto;
        } else {
          console.log(data.rmensaje);
        }
      }, error => {
        console.log(error);
      }
    )
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

  regCompra(): void {
    if (this.formularioGrp.valid) {
      if (this.lCompraRegistrarDetalleRequest.length > 0) {
        this.guardar = true;

        let req = new CompraRegistrarRequest();
        if (this.proveedorBuscarResponse) {
          req.idProveedor = this.proveedorBuscarResponse.id;
        } else {
          req.nomProveedor = this.formularioGrp.get('nomProveedor').value;
          req.nroDocProveedor = this.formularioGrp.get('nroDocProveedor').value;
          req.tipDocProveedor = this.formularioGrp.get('tipDocProveedor').value.id;
        }
        req.idtEstadoCompra = this.listaEstadoCompra[0].id;
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
        req.idUsuarioCrea = this.user.getId;
        req.fecUsuarioCrea = new Date();
        req.listaDetalleCompra = this.lCompraRegistrarDetalleRequest;

        console.log(req);
        this.compraService.registrarCompra(req).subscribe(
          (data: OutResponse<CompraRegistrarResponse>) => {
            if (data.rcodigo == CONSTANTES.R_COD_EXITO) {
              let res = new CompraListarResponse();
              res.id = data.objeto.id;
              res.idProveedor = data.objeto.idProveedor;
              res.idtTipoComprobante = req.idtTipoComprobante;
              res.nomTipoComprobante = this.formularioGrp.get('tipoComprobante').value.nombre;
              res.codigo = data.objeto.codCompra;
              res.montoTotal = req.montoTotal;
              res.serieComprobante = req.serieComprobante;
              res.nroComprobante = req.nroComprobante;
              // res.nroOrdenCompra = req.nroOrdenCompra;
              res.observacion = req.observacion;
              res.fecha = req.fecha;
              res.flagActivo = req.flagActivo;
              res.idtEstadoCompra = req.idtEstadoCompra;
              res.nomEstadoCompra = this.listaEstadoCompra[0].nombre;
              res.valEstadoCompra = this.listaEstadoCompra[0].valor;
              res.idUsuarioCrea = req.idUsuarioCrea;
              res.fecUsuarioCrea = req.fecUsuarioCrea;
              this.dialogRef.close(res);

              this._snackBar.open(MENSAJES.EXITO_OPERACION, null, { duration: 8000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['success-snackbar'] });
            } else {
              this._snackBar.open(data.rmensaje, null, { duration: 8000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['warning-snackbar'] });
            }
            this.guardar = false;
          },
          error => {
            console.log(error);
            this.guardar = false;
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
      let det = new CompraRegistrarDetalleRequest();
      det.idProducto = this.productoBuscarResponse.id;
      det.nomProducto = this.productoBuscarResponse.nombre;
      det.cantidad = 0.0;
      det.cantidadPerfecto = 0.0;
      det.cantidadDaniado = 0.0;
      det.precioUnitario = 0.0;
      det.subTotal = 0.0;

      this.lCompraRegistrarDetalleRequest.push(det);
      this.cargarDatosTabla();

      //VACIA LOS CAMPOS
      this.formService.setAsUntoched(this.formularioGrp2, this.formErrors2);
      this.productoBuscarResponse = null;
      this.select = false;
    }
  }

  crearControles(): void {
    const frmCtrl = {};

    //LISTA DE VISIBLES EN INPUT
    // let lista = [];
    // this.displayedColumns.forEach(el => {
    //   lista.push(false);
    // });
    //FIN LISTA DE VISIBLES EN INPUT

    this.lCompraRegistrarDetalleRequest.forEach((el, i) => {
      frmCtrl[`p${i}`] = new FormControl({ value: el.precioUnitario, disabled: false }, [Validators.required, Validators.min(1)]);
      frmCtrl[`c${i}`] = new FormControl({ value: el.cantidad, disabled: false }, [Validators.required, Validators.min(1)]);
      frmCtrl[`cd${i}`] = new FormControl({ value: el.cantidadDaniado, disabled: false }, [Validators.required]);
    });

    this.formularioGrp3 = new FormGroup(frmCtrl);
    this.formErrors3 = this.formService.buildFormErrors(this.formularioGrp3, this.formErrors3);
  }

  actualizarSubtotal(i: number) {
    //CANTIDAD
    this.lCompraRegistrarDetalleRequest[i].precioUnitario = Number.parseFloat((this.formularioGrp3.get('p' + i).value).toFixed(2));
    //PRECIO NORMAL
    this.lCompraRegistrarDetalleRequest[i].cantidad = Number.parseFloat((this.formularioGrp3.get('c' + i).value).toFixed(1));
    this.lCompraRegistrarDetalleRequest[i].cantidadDaniado = Number.parseFloat((this.formularioGrp3.get('cd' + i).value).toFixed(1));
    //PRECIO VENTA (NORMAL-IGV)
    this.lCompraRegistrarDetalleRequest[i].cantidadPerfecto = this.lCompraRegistrarDetalleRequest[i].cantidad - this.lCompraRegistrarDetalleRequest[i].cantidadDaniado;
    this.lCompraRegistrarDetalleRequest[i].subTotal = this.lCompraRegistrarDetalleRequest[i].cantidad * this.lCompraRegistrarDetalleRequest[i].cantidad;
    console.log(this.lCompraRegistrarDetalleRequest[i]);
    // console.log('Getting validation errors');
    this.formService.getValidationErrors(this.formularioGrp3, this.formErrors3, true);
    // console.log('Getting validation errors');
    let subTotal = 0.0;
    this.lCompraRegistrarDetalleRequest.forEach(e => {
      subTotal += e.subTotal;
    });
    this.formularioGrp.get('montoTotal').setValue(subTotal);
  }

  elimProducto(obj: CompraRegistrarDetalleRequest): void {

  }
}
