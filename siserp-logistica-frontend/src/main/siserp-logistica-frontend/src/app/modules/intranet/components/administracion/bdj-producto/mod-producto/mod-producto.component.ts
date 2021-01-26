import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';
import { ACTIVO_LISTA, CONSTANTES, MAESTRAS, MENSAJES } from 'src/app/common';
import { DataDialog } from 'src/app/core/model/data-dialog.model';
import { FormService } from 'src/app/core/services/form.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { BuscarMaestraRequest } from 'src/app/modules/intranet/dto/request/buscar-maestra.request';
import { MarcaListarRequest } from 'src/app/modules/intranet/dto/request/marca-listar.request';
import { ProductoModificarRequest } from 'src/app/modules/intranet/dto/request/producto-modificar.request';
import { MaestraResponse } from 'src/app/modules/intranet/dto/response/maestra.response';
import { MarcaListarResponse } from 'src/app/modules/intranet/dto/response/marca-listar.response';
import { OutResponse } from 'src/app/modules/intranet/dto/response/out.response';
import { ProductoListarResponse } from 'src/app/modules/intranet/dto/response/producto-listar.response';
import { ProductoModificarResponse } from 'src/app/modules/intranet/dto/response/producto-modificar.response';
import { GenericService } from 'src/app/modules/intranet/services/generic.service';
import { MarcaService } from 'src/app/modules/intranet/services/marca.service';
import { ProductoService } from 'src/app/modules/intranet/services/producto.service';

@Component({
  selector: 'app-mod-producto',
  templateUrl: './mod-producto.component.html',
  styleUrls: ['./mod-producto.component.scss']
})
export class ModProductoComponent implements OnInit {
  activoLista: any[] = ACTIVO_LISTA;
  modif: boolean = false;

  marca: MarcaListarResponse;
  listaMarcas: Observable<MarcaListarResponse[]>;
  listaTipoProducto: MaestraResponse[] = [];
  listaUnidadMedida: MaestraResponse[] = [];

  formularioGrp: FormGroup;
  formErrors: any;

  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModProductoComponent>,
    private _snackBar: MatSnackBar,
    @Inject(ProductoService) private productoService: ProductoService,
    @Inject(MarcaService) private marcaService: MarcaService,
    @Inject(GenericService) private genericService: GenericService,
    @Inject(UsuarioService) private user: UsuarioService,
    @Inject(FormService) private formService: FormService,
    @Inject(MAT_DIALOG_DATA) public dataDialog: DataDialog<ProductoListarResponse>) { }

  ngOnInit() {
    this.formularioGrp = this.fb.group({
      nombre: ['', [Validators.required]],
      codigo: ['', [Validators.required]],
      marca: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      unidadMedida: ['', [Validators.required]],
      descripcion: ['', []]
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

    this.formularioGrp.get('nombre').setValue(this.dataDialog.objeto.nombre);
    this.formularioGrp.get('codigo').setValue(this.dataDialog.objeto.codigo);
    this.marca = new MarcaListarResponse();
    this.marca.id = this.dataDialog.objeto.idMarca;
    this.marca.nombre = this.dataDialog.objeto.nomMarca;
    this.formularioGrp.get('marca').setValue(this.marca);
    this.formularioGrp.get('descripcion').setValue(this.dataDialog.objeto.descripcion);
  }

  comboTipoProducto(): void {
    let req = new BuscarMaestraRequest();
    req.idTabla = MAESTRAS.TIPO_PRODUCTO;

    this.genericService.listarMaestra(req).subscribe(
      (data: OutResponse<MaestraResponse[]>) => {
        if (data.rcodigo == CONSTANTES.R_COD_EXITO) {
          this.listaTipoProducto = data.objeto;
          this.formularioGrp.get('tipo').setValue(this.listaTipoProducto.filter(el => (el.id == this.dataDialog.objeto.idtTipo))[0]);
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
          this.formularioGrp.get('unidadMedida').setValue(this.listaUnidadMedida.filter(el => (el.id == this.dataDialog.objeto.idtUnidadMedida))[0]);
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

  editProducto(): void {
    if (this.formularioGrp.valid) {
      this.modif = true;

      let req = new ProductoModificarRequest();
      req.id = this.dataDialog.objeto.id;
      req.idMarca = this.formularioGrp.get('marca').value.id;
      req.nomMarca = this.formularioGrp.get('marca').value.nombre;
      req.idtTipo = this.formularioGrp.get('tipo').value.id;
      req.idtUnidadMedida = this.formularioGrp.get('unidadMedida').value.id;
      req.codigo = this.formularioGrp.get('codigo').value;
      req.nombre = this.formularioGrp.get('nombre').value;
      req.descripcion = this.formularioGrp.get('descripcion').value;
      req.flagActivo = this.dataDialog.objeto.flagActivo;
      req.idUsuarioMod = this.user.getId;
      req.fecUsuarioMod = new Date();

      this.productoService.actualizarProducto(req).subscribe(
        (data: OutResponse<ProductoModificarResponse>) => {
          if (data.rcodigo == 0) {
            let res = new ProductoListarResponse();
            res.id = this.dataDialog.objeto.id;
            res.idMarca = data.objeto.idMarca;
            res.nomMarca = this.formularioGrp.get('marca').value.nombre;
            res.idtTipo = req.idtTipo;
            res.nomTipo = this.formularioGrp.get('tipo').value.nombre;;
            res.idtUnidadMedida = req.idtUnidadMedida;
            res.nomUnidadMedida = this.formularioGrp.get('unidadMedida').value.nombre;
            res.codUnidadMedida = this.formularioGrp.get('unidadMedida').value.codigo;
            res.codigo = req.codigo;
            res.nombre = req.nombre;
            res.descripcion = req.descripcion;
            res.flagActivo = req.flagActivo;
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
        }, error => {
          console.log(error);
          this.modif = false;
          this._snackBar.open(error.statusText, null, { duration: 8000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['error-snackbar'] });
        }
      );
    } else {
      this.formService.getValidationErrors(this.formularioGrp, this.formErrors, true);
    }
  }

  displayFn(obj: MarcaListarResponse) {
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
