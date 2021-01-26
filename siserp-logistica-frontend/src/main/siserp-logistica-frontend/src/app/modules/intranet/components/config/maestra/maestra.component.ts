import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MaestraResponse } from '../../../dto/response/maestra.response';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GenericService } from '../../../services/generic.service';
import { DatePipe } from '@angular/common';
import { OutResponse } from '../../../dto/response/out.response';
import { RegMaestraComponent } from './reg-maestra/reg-maestra.component';
import { CONSTANTES, MENSAJES, MENSAJES_PANEL } from 'src/app/common';
import { RegMaestraChildComponent } from './reg-maestra-child/reg-maestra-child.component';
import { BuscarMaestraRequest } from '../../../dto/request/buscar-maestra.request';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-maestra',
  templateUrl: './maestra.component.html',
  styleUrls: ['./maestra.component.scss']
})
export class MaestraComponent implements OnInit {
  exportar = false;
  index: number;

  listaMaestraResponse: MaestraResponse[];

  displayedColumns: string[];
  dataSource: MatTableDataSource<MaestraResponse>;
  isLoading: boolean = false;

  formularioGrp: FormGroup;
  messages = {
    'fecInicio': {
    },
    'fecFin': {
    }
  };
  formErrors = {
    'fecInicio': '',
    'fecFin': '',
  };

  columnsGrilla = [
    {
      columnDef: 'nombre',
      header: 'Nombre',
      cell: (m: MaestraResponse) => `${m.nombre}`
    }, {
      columnDef: 'codigo',
      header: 'Codigo',
      cell: (m: MaestraResponse) => `${m.codigo}`
    }, {
      columnDef: 'valor',
      header: 'Valor',
      cell: (m: MaestraResponse) => (m.valor != null) ? `${m.valor}` : ''
    }, {
      columnDef: 'descripcion',
      header: 'Descripcion',
      cell: (m: MaestraResponse) => (m.descripcion != null) ? `${m.descripcion}` : ''
    }, {
      columnDef: 'idTabla',
      header: 'ID Tabla',
      cell: (m: MaestraResponse) => `${m.idTabla}`
    }, {
      columnDef: 'idUsuarioCrea',
      header: 'Usuario creador',
      cell: (m: MaestraResponse) => `${m.idUsuarioCrea}`
    }, {
      columnDef: 'fecUsuarioCrea',
      header: 'Fecha creacion',
      cell: (m: MaestraResponse) => this.datePipe.transform(m.fecUsuarioCrea, 'dd/MM/yyyy')
    }, {
      columnDef: 'idUsuarioMod',
      header: 'Usuario modifica',
      cell: (m: MaestraResponse) => (m.idUsuarioMod != null) ? `${m.idUsuarioMod}` : ''
    }, {
      columnDef: 'fecUsuarioMod',
      header: 'Fecha modifica',
      cell: (m: MaestraResponse) => this.datePipe.transform(m.fecUsuarioMod, 'dd/MM/yyyy')
    }];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private fb: FormBuilder,
    public dialog: MatDialog,
    @Inject(GenericService) private genericService: GenericService,
    private _snackBar: MatSnackBar,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.formularioGrp = this.fb.group({
      fecInicio: ['', []],
      fecFin: ['', []],
    });

    this.listaMaestraResponse = [];

    this.definirTabla();
    this.inicializarVariables();
  }

  inicializarVariables(): void {
    this.buscar();
  }

  definirTabla(): void {
    this.displayedColumns = [];
    this.columnsGrilla.forEach(c => {
      this.displayedColumns.push(c.columnDef);
    });
    this.displayedColumns.unshift('id');
    this.displayedColumns.push('opt');
  }

  public cargarDatosTabla(): void {
    if (this.listaMaestraResponse.length > 0) {
      this.dataSource = new MatTableDataSource(this.listaMaestraResponse);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  buscar(): void {
    this.dataSource = null;
    this.isLoading = true;

    let req = new BuscarMaestraRequest();
    req.fecInicio = this.formularioGrp.get('fecInicio').value;
    req.fecFin = this.formularioGrp.get('fecFin').value;
    req.idMaestra = 0;

    this.genericService.listarMaestra(req).subscribe(
      (data: OutResponse<MaestraResponse[]>) => {
        console.log(data);
        if (data.rcodigo == CONSTANTES.R_COD_EXITO) {
          this.listaMaestraResponse = data.objeto;
        } else {
          this.listaMaestraResponse = [];
        }
        this.cargarDatosTabla();
        this.isLoading = false;
      },
      error => {
        console.log(error);
        this._snackBar.open(error.statusText, null, { duration: 5000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['error-snackbar'] });
        this.isLoading = false;
      }
    );
  }

  exportarExcel() {
    this.exportar = true;

    setTimeout(() => {
      this.exportar = false;
    }, 2000);
  }

  regMaestra(obj: MaestraResponse) {
    const dialogRef = this.dialog.open(RegMaestraComponent, {
      width: '600px',
      disableClose: false,
      data: {
        titulo: MENSAJES_PANEL.INTRANET.CONFIGURACION.MAESTRA.REGISTRAR.TITLE,
        objeto: null
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.listaMaestraResponse.unshift(result);
        this.cargarDatosTabla();
      }
    });
  }

  editMaestra(obj: MaestraResponse) {
    let index = this.listaMaestraResponse.indexOf(obj);
    const dialogRef = this.dialog.open(RegMaestraComponent, {
      width: '600px',
      disableClose: false,
      data: {
        titulo: MENSAJES_PANEL.INTRANET.CONFIGURACION.MAESTRA.MODIFICAR.TITLE,
        objeto: obj
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.listaMaestraResponse.splice(index, 1);
        this.listaMaestraResponse.unshift(result);
        this.cargarDatosTabla();
      }
    });
  }

  regMaestraChild(obj: MaestraResponse) {
    const dialogRef = this.dialog.open(RegMaestraChildComponent, {
      width: '600px',
      disableClose: false,
      data: {
        titulo: MENSAJES_PANEL.INTRANET.CONFIGURACION.MAESTRA.REGISTRARCHILD.TITLE,
        objeto: obj
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }

  elimMaestra(obj): void {
    this.index = this.listaMaestraResponse.indexOf(obj);

    this.genericService.eliminarMaestra(obj).subscribe(
      (data: OutResponse<any>) => {
        if (data.rcodigo == 1) {
          this.listaMaestraResponse.splice(this.index, 1);
          this.cargarDatosTabla();
        } else if (data.rcodigo == 23000) {
          this._snackBar.open(MENSAJES.ERROR_FOREIGN_KEY, null, { duration: 5000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['warning-snackbar'] });
        } else {
          this._snackBar.open(data.rmensaje, null, { duration: 5000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['error-snackbar'] });
        }
      }, error => {
        console.error(error);
        this._snackBar.open(error.statusText, null, { duration: 5000, horizontalPosition: 'right', verticalPosition: 'top', panelClass: ['error-snackbar'] });
      }
    )
  }
}
