import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';

import { IntranetRoutingModule } from './intranet-routing.module';
import { HomeComponent } from './components/home/home.component';
import { MaterialModule } from '../material.module';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { SharedModule } from '../shared.module';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { RegMaestraComponent } from './components/config/maestra/reg-maestra/reg-maestra.component';
import { RegMaestraChildComponent } from './components/config/maestra/reg-maestra-child/reg-maestra-child.component';
import { RegProductoComponent } from './components/administracion/bdj-producto/reg-producto/reg-producto.component';
import { RegProveedorComponent } from './components/administracion/bdj-proveedor/reg-proveedor/reg-proveedor.component';
import { RegRepresentanteLegalComponent } from './components/administracion/bdj-proveedor/reg-representante-legal/reg-representante-legal.component';
import { MaestraComponent } from './components/config/maestra/maestra.component';
import { BdjProductoComponent } from './components/administracion/bdj-producto/bdj-producto.component';
import { BdjProveedorComponent } from './components/administracion/bdj-proveedor/bdj-proveedor.component';
import { BdjCompraComponent } from './components/adquisicion/bdj-compra/bdj-compra.component';
import { PdfViewerComponent } from './components/shared/pdf-viewer/pdf-viewer.component';
import { BdjMarcaComponent } from './components/administracion/bdj-marca/bdj-marca.component';
import { RegMarcaComponent } from './components/administracion/bdj-marca/reg-marca/reg-marca.component';
import { SharedIntranetService } from './services/shared-intranet.service';
import { IconModule } from '../icon.module';
import { ModMarcaComponent } from './components/administracion/bdj-marca/mod-marca/mod-marca.component';
import { ModProductoComponent } from './components/administracion/bdj-producto/mod-producto/mod-producto.component';
import { ModProveedorComponent } from './components/administracion/bdj-proveedor/mod-proveedor/mod-proveedor.component';
import { ConfirmDialogComponent } from './components/shared/confirm-dialog/confirm-dialog.component';
import { BdjAlmacenComponent } from './components/almacen/bdj-almacen/bdj-almacen.component';
import { BdjInventarioComponent } from './components/almacen/bdj-inventario/bdj-inventario.component';
import { RegAlmacenComponent } from './components/almacen/bdj-almacen/reg-almacen/reg-almacen.component';
import { ModAlmacenComponent } from './components/almacen/bdj-almacen/mod-almacen/mod-almacen.component';
import { BdjEstanteComponent } from './components/almacen/bdj-almacen/bdj-estante/bdj-estante.component';
import { RegEstanteComponent } from './components/almacen/bdj-almacen/bdj-estante/reg-estante/reg-estante.component';
import { ModEstanteComponent } from './components/almacen/bdj-almacen/bdj-estante/mod-estante/mod-estante.component';
import { RegCompraComponent } from './components/adquisicion/bdj-compra/reg-compra/reg-compra.component';
import { ModCompraComponent } from './components/adquisicion/bdj-compra/mod-compra/mod-compra.component';
import { AlmCompraComponent } from './components/adquisicion/bdj-compra/alm-compra/alm-compra.component';
import { ModUbicacionComponent } from './components/adquisicion/bdj-compra/alm-compra/mod-ubicacion/mod-ubicacion.component';
import { EscanItemsComponent } from './components/adquisicion/bdj-compra/alm-compra/escan-items/escan-items.component';
import { ModAlmCompraComponent } from './components/adquisicion/bdj-compra/mod-alm-compra/mod-alm-compra.component';
import { ModEscanItemsComponent } from './components/adquisicion/bdj-compra/mod-alm-compra/mod-escan-items/mod-escan-items.component';
import { CargProductoComponent } from './components/administracion/bdj-producto/carg-producto/carg-producto.component';


@NgModule({
  entryComponents: [
    ConfirmDialogComponent,
    RegMaestraComponent,
    RegMaestraChildComponent,
    RegProductoComponent,
    RegProveedorComponent,
    ModProveedorComponent,
    RegRepresentanteLegalComponent,
    RegAlmacenComponent,
    ModAlmacenComponent,
    BdjEstanteComponent,
    RegEstanteComponent,
    ModEstanteComponent,
    RegCompraComponent,
    ModCompraComponent,
    AlmCompraComponent,
    ModUbicacionComponent,
    EscanItemsComponent,
    ModAlmCompraComponent,
    ModEscanItemsComponent,
    CargProductoComponent,
  ],
  declarations: [
    ConfirmDialogComponent,
    RegMaestraComponent,
    RegMaestraChildComponent,
    RegProductoComponent,
    RegProveedorComponent,
    ModProveedorComponent,
    RegRepresentanteLegalComponent,
    RegAlmacenComponent,
    ModAlmacenComponent,
    RegEstanteComponent,
    ModEstanteComponent,
    RegCompraComponent,
    ModCompraComponent,
    AlmCompraComponent,
    ModUbicacionComponent,
    EscanItemsComponent,
    ModAlmCompraComponent,
    ModEscanItemsComponent,
    CargProductoComponent,

    HomeComponent,
    NavbarComponent,
    MaestraComponent,
    BdjProductoComponent,
    BdjProveedorComponent,
    BdjCompraComponent,
    PdfViewerComponent,
    BdjMarcaComponent,
    RegMarcaComponent,
    ModMarcaComponent,
    ModProductoComponent,
    BdjAlmacenComponent,
    BdjInventarioComponent,
    BdjEstanteComponent,
  ],
  imports: [
    CommonModule,
    IntranetRoutingModule,
    SharedModule,
    MaterialModule,
    IconModule,
    NgxExtendedPdfViewerModule,
  ],
  providers: [
    ...SharedIntranetService,
    DatePipe,
    DecimalPipe,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },//DATEPICKER MUESTRA LA FECHA EN FORMATO DD/MM/YYYY
  ]
})
export class IntranetModule { }
