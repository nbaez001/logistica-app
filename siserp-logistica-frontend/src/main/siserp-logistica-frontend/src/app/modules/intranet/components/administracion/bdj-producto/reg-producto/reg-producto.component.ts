import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductoService } from 'src/app/modules/intranet/services/producto.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { DataDialog } from 'src/app/core/model/data-dialog.model';
import { MaestraResponse } from 'src/app/modules/intranet/dto/response/maestra.response';
import { Observable, of } from 'rxjs';
import { GenericService } from 'src/app/modules/intranet/services/generic.service';
import { BuscarMaestraRequest } from 'src/app/modules/intranet/dto/request/buscar-maestra.request';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CONSTANTES, MAESTRAS, MENSAJES } from 'src/app/common';
import { FormService } from 'src/app/core/services/form.service';
import { OutResponse } from 'src/app/modules/intranet/dto/response/out.response';
import { MarcaService } from 'src/app/modules/intranet/services/marca.service';
import { MarcaListarRequest } from 'src/app/modules/intranet/dto/request/marca-listar.request';
import { MarcaListarResponse } from 'src/app/modules/intranet/dto/response/marca-listar.response';
import { ProductoListarResponse } from 'src/app/modules/intranet/dto/response/producto-listar.response';
import { ProductoRegistrarRequest } from 'src/app/modules/intranet/dto/request/producto-registrar.request';
import { ProductoRegistrarResponse } from 'src/app/modules/intranet/dto/response/producto-registrar.response';

@Component({
  selector: 'app-reg-producto',
  templateUrl: './reg-producto.component.html',
  styleUrls: ['./reg-producto.component.scss']
})
export class RegProductoComponent implements OnInit {
  guardar: boolean = false;

  marca: any

  listaMarcas: Observable<MarcaListarResponse[]>;
  listaTipoProducto: MaestraResponse[] = [];
  listaUnidadMedida: MaestraResponse[] = [];

  formularioGrp: FormGroup;
  formErrors: any;


  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<RegProductoComponent>,
    private _snackBar: MatSnackBar,
    @Inject(ProductoService) private productoService: ProductoService,
    @Inject(MarcaService) private marcaService: MarcaService,
    @Inject(GenericService) private genericService: GenericService,
    @Inject(UsuarioService) private user: UsuarioService,
    @Inject(FormService) private formService: FormService,
    @Inject(MAT_DIALOG_DATA) public dataDialog: DataDialog<any>) { }

  ngOnInit() {
    this.formularioGrp = this.fb.group({
      nombre: ['', [Validators.required]],
      codigo: ['', [Validators.required]],
      marca: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      unidadMedida: ['', [Validators.required]],
      descripcion: ['', [Validators.maxLength(100)]]
    });

    this.formErrors = this.formService.buildFormErrors(this.formularioGrp, this.formErrors);
    this.formularioGrp.valueChanges.subscribe((val: any) => {
      this.formService.getValidationErrors(this.formularioGrp, this.formErrors, false);
    });

    //FOR AUTOCOMPLETES
    this.formularioGrp.get('marca').valueChanges.subscribe(
      data => {
        const filterValue = (typeof data == 'string') ? data.toUpperCase() : null;
        if (filterValue) {
          this._buscarMarca(filterValue);
        }
      }
    );
    //PARA AUTOCOMPLETES

    this.inicializarVariables();
  }

  public inicializarVariables(): void {
    this.comboTipoProducto();
    this.comboUnidadMedida();
  }

  comboTipoProducto(): void {
    let req = new BuscarMaestraRequest();
    req.idTabla = MAESTRAS.TIPO_PRODUCTO;

    this.genericService.listarMaestra(req).subscribe(
      (data: OutResponse<MaestraResponse[]>) => {
        if (data.rcodigo == CONSTANTES.R_COD_EXITO) {
          this.listaTipoProducto = data.objeto;
          this.formularioGrp.get('tipo').setValue(this.listaTipoProducto[0]);
        } else {
          console.log(data.rmensaje);
        }
      }, error => {
        console.log(error);
      }
    )
  }

  comboUnidadMedida(): void {
    let req = new BuscarMaestraRequest();
    req.idTabla = MAESTRAS.TIPO_UNIDAD_MEDIDA_COMERCIAL;

    this.genericService.listarMaestra(req).subscribe(
      (data: OutResponse<MaestraResponse[]>) => {
        if (data.rcodigo == CONSTANTES.R_COD_EXITO) {
          this.listaUnidadMedida = data.objeto;
          this.formularioGrp.get('unidadMedida').setValue(this.listaUnidadMedida[0]);
        } else {
          console.log(data.rmensaje);
        }
      }, error => {
        console.log(error);
      }
    )
  }

  private _buscarMarca(value: any): void {
    let req = new MarcaListarRequest();
    req.nombre = value;
    req.activo = CONSTANTES.ACTIVO;

    this.marcaService.listarMarca(req).subscribe(
      (data: OutResponse<MarcaListarResponse[]>) => {
        console.log(data);
        if (data.rcodigo == 0) {
          this.listaMarcas = JSON.parse(JSON.stringify(data.objeto));
        } else {
          console.log(data.rmensaje);
          this.listaMarcas = of([]);
        }
      }, error => {
        console.log(error);
        this.listaMarcas = of([]);
      }
    )
  }

  regProducto(): void {
    if (this.formularioGrp.valid) {
      this.guardar = true;

      let req = new ProductoRegistrarRequest();
      req.id = 0;
      req.idtTipo = this.formularioGrp.get('tipo').value.id;
      req.nomTipo = this.formularioGrp.get('tipo').value.nombre;
      req.idtUnidadMedida = this.formularioGrp.get('unidadMedida').value.id;
      req.nomUnidadMedida = this.formularioGrp.get('unidadMedida').value.nombre;
      req.nombre = this.formularioGrp.get('nombre').value;
      req.codigo = this.formularioGrp.get('codigo').value;
      req.descripcion = this.formularioGrp.get('descripcion').value;
      req.flagActivo = 1;
      req.idUsuarioCrea = this.user.getId;
      req.fecUsuarioCrea = new Date();

      if (typeof (this.formularioGrp.get('marca').value) === 'string') {
        req.nomMarca = this.formularioGrp.get('marca').value.toUpperCase();
      } else {
        req.idMarca = this.formularioGrp.get('marca').value.id;
        req.nomMarca = this.formularioGrp.get('marca').value.nombre.toUpperCase();
      }

      console.log(req);
      this.productoService.registrarProducto(req).subscribe(
        (data: OutResponse<ProductoRegistrarResponse>) => {
          if (data.rcodigo == 0) {
            let res = new ProductoListarResponse();
            res.id = data.objeto.id;
            res.idMarca = data.objeto.idMarca;
            res.nomMarca = req.nomMarca;
            res.idtTipo = req.idtTipo;
            res.nomTipo = req.nomTipo;
            res.idtUnidadMedida = req.idtUnidadMedida;
            res.nomUnidadMedida = req.nomUnidadMedida;
            res.codUnidadMedida = this.formularioGrp.get('unidadMedida').value.codigo;
            res.codigo = req.codigo;
            res.nombre = req.nombre;
            res.descripcion = req.descripcion;
            res.flagActivo = req.flagActivo;
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
      this.formService.getValidationErrors(this.formularioGrp, this.formErrors, true);
    }
  }

  displayFn(obj) {
    return obj ? obj.nombre : undefined;
  }

  seleccionado(evt) {
    console.log(evt);
  }

  generarCodigo(): void {
    let cod = '';
    let nombre = this.formularioGrp.get('nombre').value;
    if (nombre.length >= 3) {
      cod = nombre.substring(0, 3);
    } else {
      cod = nombre.substring(0, nombre.length);
    }
    this.formularioGrp.get('codigo').setValue(cod);
  }

}
