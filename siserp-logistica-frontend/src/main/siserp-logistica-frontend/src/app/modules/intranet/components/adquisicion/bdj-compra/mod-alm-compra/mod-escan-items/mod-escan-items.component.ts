import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InventarioCodigoBarraDetModificarRequest } from 'src/app/modules/intranet/dto/request/inventario-codigo-barra-det-modificar.request';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { InventarioModificarCompraDetRequest } from 'src/app/modules/intranet/dto/request/inventario-modificar-compra-det.request';
import { DataDialog } from 'src/app/core/model/data-dialog.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-mod-escan-items',
  templateUrl: './mod-escan-items.component.html',
  styleUrls: ['./mod-escan-items.component.scss']
})
export class ModEscanItemsComponent implements OnInit {
  guardar: boolean = false;

  formularioGrp: FormGroup;
  formErrors: any;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  listaCodigos: InventarioCodigoBarraDetModificarRequest[] = [];
  listaCodigosElim: InventarioCodigoBarraDetModificarRequest[] = [];

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ModEscanItemsComponent>,
    @Inject(MAT_DIALOG_DATA) public dataDialog: DataDialog<InventarioModificarCompraDetRequest>) { }

  ngOnInit(): void {
    this.formularioGrp = this.fb.group({
      cantProductos: [{ value: 0, disabled: true }, []]
    });

    this.inicializarVariables();
  }

  public inicializarVariables(): void {
    this.listaCodigos = JSON.parse(JSON.stringify(this.dataDialog.objeto.listaCodigoBarra));
    this.listaCodigosElim = JSON.parse(JSON.stringify(this.dataDialog.objeto.listaCodigoBarraElim));
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

    if (existe && value.length != 0) {
      this._snackBar.open('Ya se ha ingresado el codigo: ' + value.trim(), null, { duration: 8000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['info-snackbar'] });
    } else {
      if (value.length != 0) {
        this.listaCodigos.push({ id: 0, codigo: value.trim(), flagActivo: 1 });
        this.formularioGrp.get('cantProductos').setValue(this.listaCodigos.length);
      }
    }

    if (input) {
      input.value = '';
    }
  }

  remove(codigo: InventarioCodigoBarraDetModificarRequest): void {
    const index = this.listaCodigos.indexOf(codigo);

    if (index >= 0) {
      if (codigo.id != 0) {
        codigo.flagActivo = 0;
        this.listaCodigosElim.push(codigo);
      }

      this.listaCodigos.splice(index, 1);
      this.formularioGrp.get('cantProductos').setValue(this.listaCodigos.length);
    }
  }

  guardarCodigos(): void {
    this.dialogRef.close({ listaCodigos: this.listaCodigos, listaCodigosElim: this.listaCodigosElim });
  }

}
