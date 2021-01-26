import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ACTIVO_LISTA, CONSTANTES, MENSAJES } from 'src/app/common';
import { DataDialog } from 'src/app/core/model/data-dialog.model';
import { DateService } from 'src/app/core/services/date.service';
import { FormService } from 'src/app/core/services/form.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { AlmacenModificarRequest } from 'src/app/modules/intranet/dto/request/almacen-modificar.request';
import { AlmacenListarResponse } from 'src/app/modules/intranet/dto/response/almacen-listar.response';
import { OutResponse } from 'src/app/modules/intranet/dto/response/out.response';
import { AlmacenService } from 'src/app/modules/intranet/services/almacen.service';

@Component({
  selector: 'app-mod-almacen',
  templateUrl: './mod-almacen.component.html',
  styleUrls: ['./mod-almacen.component.scss']
})
export class ModAlmacenComponent implements OnInit {
  modif: boolean = false;
  activoLista: any[] = ACTIVO_LISTA;

  formularioGrp: FormGroup;
  formErrors: any;

  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModAlmacenComponent>,
    private _snackBar: MatSnackBar,
    @Inject(UsuarioService) private user: UsuarioService,
    @Inject(AlmacenService) private almacenService: AlmacenService,
    @Inject(FormService) private formService: FormService,
    @Inject(DateService) private dateService: DateService,
    @Inject(MAT_DIALOG_DATA) public dataDialog: DataDialog<AlmacenListarResponse>) { }

  ngOnInit(): void {
    this.formularioGrp = this.fb.group({
      nombre: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      activo: ['', [Validators.required]],
      descripcion: ['', []],
    });

    this.formErrors = this.formService.buildFormErrors(this.formularioGrp, this.formErrors);
    this.formularioGrp.valueChanges.subscribe((val: any) => {
      this.formService.getValidationErrors(this.formularioGrp, this.formErrors, false);
    });

    this.inicializarVariables();
  }

  public inicializarVariables(): void {
    this.formularioGrp.get('nombre').setValue(this.dataDialog.objeto.nombre);
    this.formularioGrp.get('fecha').setValue(this.dateService.parseGuionDDMMYYYY(this.dataDialog.objeto.fecha));
    this.formularioGrp.get('activo').setValue(this.activoLista.filter(e => (e.id == this.dataDialog.objeto.flagActivo))[0]);
    this.formularioGrp.get('descripcion').setValue(this.dataDialog.objeto.descripcion);
  }

  modAlmacen(): void {
    if (this.formularioGrp.valid) {
      this.modif = true;

      let req = new AlmacenModificarRequest();
      req.id = this.dataDialog.objeto.id;
      req.nombre = this.formularioGrp.get('nombre').value;
      req.fecha = this.formularioGrp.get('fecha').value;
      req.descripcion = this.formularioGrp.get('descripcion').value;
      req.flagActivo = this.formularioGrp.get('activo').value.id;
      req.idUsuarioMod = this.user.getId;
      req.fecUsuarioMod = new Date();

      this.almacenService.modificarAlmacen(req).subscribe(
        (data: OutResponse<any>) => {
          if (data.rcodigo == CONSTANTES.R_COD_EXITO) {
            let res = this.dataDialog.objeto;
            res.nombre = req.nombre;
            res.fecha = req.fecha;
            res.descripcion = req.descripcion;
            res.flagActivo = req.flagActivo;
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
}
