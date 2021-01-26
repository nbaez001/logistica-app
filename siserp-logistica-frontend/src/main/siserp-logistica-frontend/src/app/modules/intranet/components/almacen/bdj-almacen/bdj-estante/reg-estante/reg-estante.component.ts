import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CONSTANTES, MENSAJES } from 'src/app/common';
import { DataDialog } from 'src/app/core/model/data-dialog.model';
import { FormService } from 'src/app/core/services/form.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { AlmacenEstanteRegistrarRequest } from 'src/app/modules/intranet/dto/request/almacen-estante-registrar.request';
import { AlmacenEstanteListarResponse } from 'src/app/modules/intranet/dto/response/almacen-estante-listar.response';
import { AlmacenEstanteRegistrarResponse } from 'src/app/modules/intranet/dto/response/almacen-estante-registrar.response';
import { AlmacenListarResponse } from 'src/app/modules/intranet/dto/response/almacen-listar.response';
import { OutResponse } from 'src/app/modules/intranet/dto/response/out.response';
import { AlmacenService } from 'src/app/modules/intranet/services/almacen.service';

@Component({
  selector: 'app-reg-estante',
  templateUrl: './reg-estante.component.html',
  styleUrls: ['./reg-estante.component.scss']
})
export class RegEstanteComponent implements OnInit {
  guardar: boolean = false;

  formularioGrp: FormGroup;
  formErrors: any;

  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<RegEstanteComponent>,
    private _snackBar: MatSnackBar,
    @Inject(UsuarioService) private user: UsuarioService,
    @Inject(AlmacenService) private almacenService: AlmacenService,
    @Inject(FormService) private formService: FormService,
    @Inject(MAT_DIALOG_DATA) public dataDialog: DataDialog<AlmacenListarResponse>) { }

  ngOnInit(): void {
    this.formularioGrp = this.fb.group({
      nombre: ['', [Validators.required]],
      fecha: [{ value: new Date(), disabled: false }, [Validators.required]],
    });

    this.formErrors = this.formService.buildFormErrors(this.formularioGrp, this.formErrors);
    this.formularioGrp.valueChanges.subscribe((val: any) => {
      this.formService.getValidationErrors(this.formularioGrp, this.formErrors, false);
    });

    this.inicializarVariables();
  }

  public inicializarVariables(): void {
  }

  regEstante(): void {
    if (this.formularioGrp.valid) {
      this.guardar = true;

      let req = new AlmacenEstanteRegistrarRequest();
      req.idAlmacen = this.dataDialog.objeto.id;
      req.nombre = this.formularioGrp.get('nombre').value;
      req.fecha = this.formularioGrp.get('fecha').value;
      req.flagActivo = CONSTANTES.ACTIVO;
      req.idUsuarioCrea = this.user.getId;
      req.fecUsuarioCrea = new Date();

      this.almacenService.registrarEstante(req).subscribe(
        (data: OutResponse<AlmacenEstanteRegistrarResponse>) => {
          if (data.rcodigo == 0) {
            let res = new AlmacenEstanteListarResponse();
            res.id = data.objeto.id;
            res.codigo = data.objeto.codEstante;
            res.nombre = req.nombre;
            res.fecha = req.fecha;
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

}
