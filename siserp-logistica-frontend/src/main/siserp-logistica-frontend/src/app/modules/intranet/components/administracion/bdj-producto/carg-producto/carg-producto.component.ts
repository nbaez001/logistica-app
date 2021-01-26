import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatHorizontalStepper } from '@angular/material/stepper';
import { NgxSpinnerService } from 'ngx-spinner';
import { CONSTANTES, FILE, MAESTRAS, MENSAJES, MENSAJES_PANEL } from 'src/app/common';
import { DataDialog } from 'src/app/core/model/data-dialog.model';
import { FormService } from 'src/app/core/services/form.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { ProductoService } from 'src/app/modules/intranet/services/producto.service';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import readXlsxFile from 'read-excel-file'
import { ProductoCargarExcelDetRequest } from 'src/app/modules/intranet/dto/request/producto-cargar-excel-det.request';
import { MatTableDataSource } from '@angular/material/table';
import { ProductoCargarExcelRequest } from 'src/app/modules/intranet/dto/request/producto-cargar-excel.request';
import { OutResponse } from 'src/app/modules/intranet/dto/response/out.response';
import { ProductoCargarExcelResponse } from 'src/app/modules/intranet/dto/response/producto-cargar-excel.response';
import { BuscarMaestraRequest } from 'src/app/modules/intranet/dto/request/buscar-maestra.request';
import { GenericService } from 'src/app/modules/intranet/services/generic.service';
import { MaestraResponse } from 'src/app/modules/intranet/dto/response/maestra.response';
import { InventarioService } from 'src/app/modules/intranet/services/inventario.service';
import { InventarioAlmacenListarResponse } from 'src/app/modules/intranet/dto/response/inventario-almacen-listar.response';
import { InventarioEstanteListarResponse } from 'src/app/modules/intranet/dto/response/inventario-estante-listar.response';
import { InventarioEstanteListarRequest } from 'src/app/modules/intranet/dto/request/inventario-estante-listar.request';

@Component({
  selector: 'app-carg-producto',
  templateUrl: './carg-producto.component.html',
  styleUrls: ['./carg-producto.component.scss']
})
export class CargProductoComponent implements OnInit {
  isLinear: boolean = false;
  @ViewChild(MatHorizontalStepper) stepper: MatHorizontalStepper;

  flagSuccessMsg: boolean = false;
  flagErrorMsg: boolean = false;
  errorMsg: string = '';

  selectedOptions: ProductoCargarExcelDetRequest;
  paso2Completado: boolean = true;

  fileupload: any;

  listaTipoProducto: MaestraResponse[] = [];
  listaAlmacen: InventarioAlmacenListarResponse[] = [];
  listaEstante: InventarioEstanteListarResponse[] = [];

  listaProductoCargarExcelErrores: ProductoCargarExcelDetRequest[] = [];
  listaProductoCargarExcel: ProductoCargarExcelDetRequest[] = [];
  formularioGrp: FormGroup;
  formErrors: any;

  listaProductosMostrarData: ProductoCargarExcelDetRequest[] = [];
  displayedColumns: string[] = ['id', 'marca', 'idtUnidadMedida', 'nomUnidadMedida', 'codigo', 'nombre', 'descripcion', 'cantidad', 'precio'];
  dataSource: MatTableDataSource<ProductoCargarExcelDetRequest> = null;
  isLoading: boolean = false;

  constructor(private fb: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<CargProductoComponent>,
    private _snackBar: MatSnackBar,
    private spinner: NgxSpinnerService,
    @Inject(InventarioService) private inventarioService: InventarioService,
    @Inject(GenericService) private genericService: GenericService,
    @Inject(ProductoService) private productoService: ProductoService,
    @Inject(UsuarioService) private user: UsuarioService,
    @Inject(FormService) private formService: FormService,
    @Inject(MAT_DIALOG_DATA) public dataDialog: DataDialog<any>) { }

  ngOnInit() {
    this.formularioGrp = this.fb.group({
      nombreArchivoProductos: ['', [Validators.required]],
      almacen: ['', [Validators.required]],
      estante: ['', [Validators.required]]
    });

    this.formErrors = this.formService.buildFormErrors(this.formularioGrp, this.formErrors);
    this.formularioGrp.valueChanges.subscribe((val: any) => {
      this.formService.getValidationErrors(this.formularioGrp, this.formErrors, false);
    });

    this.inicializarVariables();
  }

  public inicializarVariables(): void {
    this.comboTipoProducto();
    this.comboAlmacen();
  }

  comboTipoProducto(): void {
    let req = new BuscarMaestraRequest();
    req.idTabla = MAESTRAS.TIPO_PRODUCTO;

    this.genericService.listarMaestra(req).subscribe(
      (data: OutResponse<MaestraResponse[]>) => {
        if (data.rcodigo == CONSTANTES.R_COD_EXITO) {
          this.listaTipoProducto = data.objeto;
        } else {
          console.log(data.rmensaje);
        }
      }, error => {
        console.log(error);
      }
    )
  }

  comboAlmacen(): void {
    this.inventarioService.listarAlmacen().subscribe(
      (data: OutResponse<InventarioAlmacenListarResponse[]>) => {
        if (data.rcodigo == CONSTANTES.R_COD_EXITO) {
          this.listaAlmacen = data.objeto;
          this.formularioGrp.get('almacen').setValue(this.listaAlmacen[0]);
          this.comboEstante();
        } else {
          this.listaAlmacen = [];
        }
      },
      error => {
        console.log(error);
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
      },
      error => {
        console.log(error);
      }
    );
  }

  public cargarDatosTabla(): void {
    if (this.listaProductosMostrarData.length > 0) {
      this.dataSource = new MatTableDataSource(this.listaProductosMostrarData);
    }
  }

  public openInput(evt): void {
    document.getElementById('archivoProductos').click();
  }

  public cargarArchivoProductos(event) {
    this.fileupload = event.target.files[0];
    if (typeof event === 'undefined' || typeof this.fileupload === 'undefined' || typeof this.fileupload.name === 'undefined') {
      this.formularioGrp.get('nombreArchivoProductos').setValue(null);
    } else {
      if (this.fileupload.size > FILE.FILE_UPLOAD_MAX_SIZE) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          width: '300px',
          data: {
            titulo: FILE.FILE_UPLOAD_MAX_SIZE_MSG(this.fileupload.size),
            objeto: null
          }
        });

        this.fileupload = null;
      } else {
        let nombreArchivo = this.fileupload.name;
        this.formularioGrp.get('nombreArchivoProductos').setValue(nombreArchivo);
      }
    }
  }

  validarArchivoProductos(): void {
    if (this.formularioGrp.valid) {
      this.listaProductoCargarExcel = [];
      this.stepper.next();
      this.spinner.show();

      readXlsxFile(this.fileupload).then((rows: any[]) => {
        rows.forEach((el, i) => {
          if (i != 0) {
            let obj = new ProductoCargarExcelDetRequest();
            obj.id = el[0];
            obj.marca = el[1];
            obj.idtUnidadMedida = el[2];
            obj.nomUnidadMedida = el[3];
            obj.codigo = el[4];
            obj.nombre = el[5];
            obj.descripcion = el[6];
            obj.cantidad = el[7];
            obj.precio = el[8];

            this.listaProductoCargarExcel.push(obj);
          }
        });
        this.validarListaProducto(this.listaProductoCargarExcel);
        this.spinner.hide();
      });
    } else {
      this.formService.getValidationErrors(this.formularioGrp, this.formErrors, true);
    }
  }

  validarListaProducto(lista: ProductoCargarExcelDetRequest[]): void {
    // VALIDACION DE TIPO
    this.listaProductoCargarExcelErrores = [];

    lista.forEach((el, i) => {
      let msg = '';
      let flgError = false;

      //VALIDACION DE MARCA
      if (el.marca != null) {
        if (typeof (el.marca) != 'string') {
          msg += ' Campo MARCA debe ser texto,'
          flgError = true;
        }
      } else {
        msg += ' Campo MARCA no puede ser vacio,'
        flgError = true;
      }

      //VALIDACION IDT_UNIDAD_MEDIDA
      if (el.idtUnidadMedida != null) {
        if (typeof (el.idtUnidadMedida) != 'number') {
          msg += ' Campo IDT_UNIDAD_MEDIDA debe ser numerico,'
          flgError = true;
        }
      } else {
        msg += ' Campo IDT_UNIDAD_MEDIDA no puede ser vacio,'
        flgError = true;
      }

      //VALIDACION CODIGO
      if (el.codigo != null) {
        if (typeof (el.codigo) != 'string') {
          msg += ' Campo CODIGO debe ser texto,'
          flgError = true;
        }
      } else {
        msg += ' Campo CODIGO no puede ser vacio,'
        flgError = true;
      }

      //VALIDACION NOMBRE
      if (el.nombre != null) {
        if (typeof (el.nombre) != 'string') {
          msg += ' Campo NOMBRE debe ser texto,'
          flgError = true;
        } else {
          let cont = 0;
          let posiciones = '';
          lista.forEach((el2, i2) => {
            if (el.nombre == el2.nombre) {
              cont++;
              posiciones += (i2 + 1) + ',';
            }
          });

          if (cont > 1) {
            flgError = true;
            posiciones = posiciones.substr(0, posiciones.length - 1);
            msg += ' Campo NOMBRE se repite en las siguientes filas: [' + posiciones + '],';
          }
        }
      } else {
        msg += ' Campo NOMBRE no puede ser vacio,'
        flgError = true;
      }

      //VALIDACION CANTIDAD
      if (el.cantidad != null) {
        if (typeof (el.cantidad) != 'number') {
          msg += ' Campo CANTIDAD debe ser numerico,'
          flgError = true;
        }
      } else {
        msg += ' Campo CANTIDAD no puede ser vacio,'
        flgError = true;
      }

      //VALIDACION PRECIO
      if (el.precio != null) {
        if (typeof (el.precio) != 'number') {
          msg += ' Campo PRECIO debe ser numerico,'
          flgError = true;
        }
      } else {
        msg += ' Campo PRECIO no puede ser vacio,'
        flgError = true;
      }

      if (flgError) {
        msg = 'FILA ' + (i + 1) + ': ' + msg;
        el.flgValidacion = flgError;
        el.validacion = msg;

        if (flgError) {
          this.paso2Completado = this.paso2Completado && (!flgError);
        }

        this.listaProductoCargarExcelErrores.push(el);
      }
    });

    if (this.paso2Completado) {
      this.listaProductosMostrarData = [];
      lista.forEach(el => {
        this.listaProductosMostrarData.push(el);
      });
      this.cargarDatosTabla();
    }
  }

  onAreaListControlChanged(list) {
    // determine selected options
    this.selectedOptions = list.selectedOptions.selected.map(item => item.value);

    this.listaProductosMostrarData = [];
    this.listaProductosMostrarData.push(this.selectedOptions[0]);
    this.cargarDatosTabla();
  }

  registrarArchivoProductos(): void {
    if (this.listaProductoCargarExcel.length > 0) {
      this.stepper.next();
      this.spinner.show();

      let req = new ProductoCargarExcelRequest();
      req.idEstante = this.formularioGrp.get('estante').value.id;
      req.idtTipo = this.listaTipoProducto[0].id;
      req.idUsuarioCrea = this.user.id;
      req.fecUsuarioCrea = new Date();
      req.listaProducto = this.listaProductoCargarExcel;

      console.log(req);
      this.productoService.cargarProductoDesdeExcel(req).subscribe(
        (data: OutResponse<ProductoCargarExcelResponse>) => {
          if (data.rcodigo == 0) {
            this.flagSuccessMsg = true;
            this._snackBar.open(MENSAJES.EXITO_OPERACION, null, { duration: 8000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['success-snackbar'] });
          } else {
            this.flagErrorMsg = true;
            this.errorMsg = data.rmensaje + ' [FILA N°: ' + data.objeto.posicion + ']';
            this._snackBar.open(data.rmensaje, null, { duration: 8000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['warning-snackbar'] });
          }
          this.spinner.hide();
        },
        error => {
          console.log(error);
          this.flagErrorMsg = true;
          this.errorMsg = error;
          this.spinner.hide();
          this._snackBar.open(error.statusText, null, { duration: 8000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['error-snackbar'] });
        }
      );
    } else {
      this._snackBar.open('La lista de productos ingresada se encuentra vacia', null, { duration: 8000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['error-snackbar'] });
    }
  }

  anterior(): void {
    this.stepper.previous();
  }

  finalizar(): void {
    this.dialogRef.close(this.flagSuccessMsg);
  }
}
