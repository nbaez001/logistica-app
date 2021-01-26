import { Component, Inject, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { InventarioInventariarCompraDetRequest } from 'src/app/modules/intranet/dto/request/inventario-invent-compra-det.request';
import { DataDialog } from 'src/app/core/model/data-dialog.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InventarioCodigoBarraDetRequest } from 'src/app/modules/intranet/dto/request/inventario-codigo-barra-det.request';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-escan-items',
  templateUrl: './escan-items.component.html',
  styleUrls: ['./escan-items.component.scss']
})
export class EscanItemsComponent implements OnInit {
  guardar: boolean = false;

  formularioGrp: FormGroup;
  formErrors: any;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  listaCodigos: InventarioCodigoBarraDetRequest[] = [];

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<EscanItemsComponent>,
    @Inject(MAT_DIALOG_DATA) public dataDialog: DataDialog<InventarioInventariarCompraDetRequest>) { }

  ngOnInit(): void {
    this.formularioGrp = this.fb.group({
      cantProductos: [{ value: 0, disabled: true }, []]
    });

    this.inicializarVariables();
  }

  public inicializarVariables(): void {
    this.listaCodigos = JSON.parse(JSON.stringify(this.dataDialog.objeto.listaCodigoBarra));
    this.formularioGrp.get('cantProductos').setValue(this.listaCodigos.length);
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    let existe = false;
    if ((value || '').trim()) {
      this.listaCodigos.forEach(el => {
        if (el.codigo == value.trim()) {
          existe = true;
        }
      });
    }

    console.log(value);
    console.log(value.length);
    if (existe && value.length != 0) {
      this._snackBar.open('Ya se ha ingresado el codigo: ' + value.trim(), null, { duration: 8000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['info-snackbar'] });
    } else {
      if (value.length != 0) {
        this.listaCodigos.push({ codigo: value.trim() });
        this.formularioGrp.get('cantProductos').setValue(this.listaCodigos.length);
      }
    }

    if (input) {
      input.value = '';
    }
  }

  remove(codigo: any): void {
    const index = this.listaCodigos.indexOf(codigo);

    if (index >= 0) {
      this.listaCodigos.splice(index, 1);
      this.formularioGrp.get('cantProductos').setValue(this.listaCodigos.length);
    }
  }

  guardarCodigos(): void {
    this.dialogRef.close(this.listaCodigos);
  }

}
