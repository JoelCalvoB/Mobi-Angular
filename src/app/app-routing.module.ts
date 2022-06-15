import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutenticacionLayoutComponent } from './layout/autenticacion/autenticacion-layout/autenticacion-layout.component';
import { ContenidoComponent } from './layout/contenido/contenido/contenido.component';

const routes: Routes = [
  { path: 'autenticacion', component: AutenticacionLayoutComponent,loadChildren:()=>import('./modules/crearCuenta/crearCuenta.module').then(m=>m.crearCuentaModule)},
  { path: 'sesion', component: ContenidoComponent,loadChildren:()=>import('./modules/validacionidentidad/validacionidentidad.modules').then(m=>m.validacionIdentidadModule)},
  { path: '**', redirectTo: '/autenticacion/crearcuenta', pathMatch: 'full' },
  { path: '', redirectTo: '/autenticacion/crearcuenta', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
