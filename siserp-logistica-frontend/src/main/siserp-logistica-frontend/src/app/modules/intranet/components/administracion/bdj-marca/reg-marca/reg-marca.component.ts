import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MENSAJES } from 'src/app/common';
import { DataDialog } from 'src/app/core/model/data-dialog.model';
import { FormService } from 'src/app/core/services/form.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { MarcaRegistrarRequest } from 'src/app/modules/intranet/dto/request/marca-registrar.request';
import { MarcaListarResponse } from 'src/app/modules/intranet/dto/response/marca-listar.response';
import { MarcaRegistrarResponse } from 'src/app/modules/intranet/dto/response/marca-registrar.response';
import { OutResponse } from 'src/app/modules/intranet/dto/response/out.response';
import { MarcaService } from 'src/app/modules/intranet/services/marca.service';

@Component({
  selector: 'app-reg-marca',
  templateUrl: './reg-marca.component.html',
  styleUrls: ['./reg-marca.component.scss']
})
export class RegMarcaComponent implements OnInit {
  guardar: boolean = false;

  formularioGrp: FormGroup;
  formErrors: any;

  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<RegMarcaComponent>,
    private _snackBar: MatSnackBar,
    @Inject(UsuarioService) private user: UsuarioService,
    @Inject(MarcaService) private marcaService: MarcaService,
    @Inject(FormService) private formService: FormService,
    @Inject(MAT_DIALOG_DATA) public dataDialog: DataDialog<any>) { }

  ngOnInit(): void {
    this.formularioGrp = this.fb.group({
      nombre: ['', [Validators.required]],
      codigo: ['', [Validators.required]],
    });

    this.formErrors = this.formService.buildFormErrors(this.formularioGrp, this.formErrors);
    this.formularioGrp.valueChanges.subscribe((val: any) => {
      this.formService.getValidationErrors(this.formularioGrp, this.formErrors, false);
    });

    this.inicializarVariables();
  }

  public inicializarVariables(): void {
  }

  regMarca(): void {
    if (this.formularioGrp.valid) {
      this.guardar = true;

      let req = new MarcaRegistrarRequest();
      req.nombre = this.formularioGrp.get('nombre').value;
      req.codigo = this.formularioGrp.get('codigo').value;
      req.flgActivo = 1;
      req.idUsuarioCrea = this.user.getId;
      req.fecUsuarioCrea = new Date();

      this.marcaService.registrarMarca(req).subscribe(
        (data: OutResponse<MarcaRegistrarResponse>) => {
          if (data.rcodigo == 0) {
            let res = new MarcaListarResponse();
            res.id = data.objeto.id;
            res.nombre = req.nombre;
            res.codigo = req.codigo;
            res.flgActivo = req.flgActivo;
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
