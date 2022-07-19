import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutenticacionLayoutComponent } from './layout/autenticacion/autenticacion-layout/autenticacion-layout.component';
import { ContenidoComponent } from './layout/contenido/contenido/contenido.component';

const routes: Routes = [
  { path: 'auth', component: AutenticacionLayoutComponent,loadChildren:()=>import('./modules/auth/auth.module').then(m=>m.AuthModule)},
  { path: 'sesion', component: ContenidoComponent,loadChildren:()=>import('./modules/validacionidentidad/validacionidentidad.modules').then(m=>m.validacionIdentidadModule)},
  { path: '**', redirectTo: '/auth/crearcuenta', pathMatch: 'full' },
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
