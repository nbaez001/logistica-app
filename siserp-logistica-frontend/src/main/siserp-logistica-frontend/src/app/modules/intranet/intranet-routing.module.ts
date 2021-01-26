import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BdjMarcaComponent } from './components/administracion/bdj-marca/bdj-marca.component';
import { BdjProductoComponent } from './components/administracion/bdj-producto/bdj-producto.component';
import { BdjProveedorComponent } from './components/administracion/bdj-proveedor/bdj-proveedor.component';
import { BdjCompraComponent } from './components/adquisicion/bdj-compra/bdj-compra.component';
import { BdjAlmacenComponent } from './components/almacen/bdj-almacen/bdj-almacen.component';
import { BdjInventarioComponent } from './components/almacen/bdj-inventario/bdj-inventario.component';
import { MaestraComponent } from './components/config/maestra/maestra.component';
import { HomeComponent } from './components/home/home.component';

const intranetRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }, {
        path: 'home',
        component: HomeComponent,
        data: { title: 'Home' }
      }, {
        path: 'configuracion/maestras',
        component: MaestraComponent,
        data: { title: 'Maestras' }
      }, {
        path: 'administracion/marcas',
        component: BdjMarcaComponent,
        data: { title: 'Marcas' }
      }, {
        path: 'administracion/productos',
        component: BdjProductoComponent,
        data: { title: 'Productos' }
      }, {
        path: 'administracion/proveedores',
        component: BdjProveedorComponent,
        data: { title: 'Proveedores' }
      }, {
        path: 'almacen/almacenes',
        component: BdjAlmacenComponent,
        data: { title: 'Almacenes' }
      }, {
        path: 'almacen/inventario',
        component: BdjInventarioComponent,
        data: { title: 'Inventario' }
      }, {
        path: 'adquisicion/compra',
        component: BdjCompraComponent,
        data: { title: 'Compras' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(intranetRoutes)],
  exports: [RouterModule]
})
export class IntranetRoutingModule { }
