import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ACTIVO_LISTA, MENSAJES } from 'src/app/common';
import { DataDialog } from 'src/app/core/model/data-dialog.model';
import { FormService } from 'src/app/core/services/form.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { MarcaModificarRequest } from 'src/app/modules/intranet/dto/request/marca-modificar.request';
import { MarcaListarResponse } from 'src/app/modules/intranet/dto/response/marca-listar.response';
import { OutResponse } from 'src/app/modules/intranet/dto/response/out.response';
import { MarcaService } from 'src/app/modules/intranet/services/marca.service';

@Component({
  selector: 'app-mod-marca',
  templateUrl: './mod-marca.component.html',
  styleUrls: ['./mod-marca.component.scss']
})
export class ModMarcaComponent implements OnInit {
  modif: boolean = false;
  activoLista: any[] = ACTIVO_LISTA;

  formularioGrp: FormGroup;
  formErrors: any;

  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModMarcaComponent>,
    private _snackBar: MatSnackBar,
    @Inject(UsuarioService) private user: UsuarioService,
    @Inject(MarcaService) private marcaService: MarcaService,
    @Inject(FormService) private formService: FormService,
    @Inject(MAT_DIALOG_DATA) public dataDialog: DataDialog<MarcaListarResponse>) { }

  ngOnInit(): void {
    this.formularioGrp = this.fb.group({
      nombre: ['', [Validators.required]],
      codigo: ['', [Validators.required]],
      activo: ['', [Validators.required]],
    });

    this.formErrors = this.formService.buildFormErrors(this.formularioGrp, this.formErrors);
    this.formularioGrp.valueChanges.subscribe((val: any) => {
      this.formService.getValidationErrors(this.formularioGrp, this.formErrors, false);
    });

    this.inicializarVariables();
  }

  public inicializarVariables(): void {
    this.formularioGrp.get('nombre').setValue(this.dataDialog.objeto.nombre);
    this.formularioGrp.get('codigo').setValue(this.dataDialog.objeto.codigo);
    this.formularioGrp.get('activo').setValue(this.activoLista.filter(e => (e.id == this.dataDialog.objeto.flgActivo))[0]);
  }

  modMarca(): void {
    if (this.formularioGrp.valid) {
      this.modif = true;

      let req = new MarcaModificarRequest();
      req.id = this.dataDialog.objeto.id;
      req.nombre = this.formularioGrp.get('nombre').value;
      req.codigo = this.formularioGrp.get('codigo').value;
      req.flgActivo = this.formularioGrp.get('activo').value.id;
      req.idUsuarioMod = this.user.getId;
      req.fecUsuarioMod = new Date();

      this.marcaService.modificarMarca(req).subscribe(
        (data: OutResponse<any>) => {
          if (data.rcodigo == 0) {
            let res = this.dataDialog.objeto;
            res.nombre = req.nombre;
            res.codigo = req.codigo;
            res.flgActivo = req.flgActivo;
            res.idUsuarioMod = req.idUsuarioMod;
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
      this.formService.getValidationErrors(this.formularioGrp, this.formErrors, true);
    }
  }

  generarCodigo(): void {
    let cod = '';
    let nombre = this.formularioGrp.get('nombre').value;
    let array = nombre.split(' ');
    if (array.length >= 2) {
      array.forEach(e => {
        cod += e.charAt(0);
      });
    } else {
      if (nombre.length >= 2) {
        cod = nombre.substring(0, 2);
      } else {
        cod = nombre.substring(0, nombre.length);
      }
    }
    this.formularioGrp.get('codigo').setValue(cod);
  }
}
