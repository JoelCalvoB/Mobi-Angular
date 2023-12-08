import { ClientesModule } from './modules/clientes/clientes.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { protegerRutas } from './core/interceptors/proteccionRutas';
import { AutenticacionLayoutComponent } from './layout/autenticacion/autenticacion-layout/autenticacion-layout.component';
import { ContenidoComponent } from './layout/contenido/contenido/contenido.component';

const routes: Routes = [
  { path: 'auth', component: AutenticacionLayoutComponent,loadChildren:()=>import('./modules/auth/auth.module').then(m=>m.AuthModule)},
  { path: 'inicio', component: ContenidoComponent,canActivate:[protegerRutas],loadChildren:()=>import('./modules/inicio/inicio.module').then(m=>m.inicioModule)},
  { path: 'ventas', component: ContenidoComponent,canActivate:[protegerRutas],loadChildren:()=>import('./modules/ventas/ventas.module').then(m=>m.ventasModule)},
  { path: 'reportes', component: ContenidoComponent,canActivate:[protegerRutas],loadChildren:()=>import('./modules/reportes/reportes.module').then(m=>m.reportesModule)},
  { path: 'administracion', component: ContenidoComponent,canActivate:[protegerRutas],loadChildren:()=>import('./modules/roles/roles.module').then(m=>m.RolesModule)},
  { path: 'superadministracion', component: ContenidoComponent,canActivate:[protegerRutas],loadChildren:()=>import('./modules/roles/roles.module').then(m=>m.RolesModule)},
  { path: 'superadministracion', component: ContenidoComponent,canActivate:[protegerRutas],loadChildren:()=>import('./modules/usuarios/usuarios.module').then(m=>m.UsuariosModule)},
  { path: 'superadministracion', component: ContenidoComponent,canActivate:[protegerRutas],loadChildren:()=>import('./modules/clientes/clientes.module').then(m=>m.ClientesModule)},
  { path: '**', redirectTo: '/auth/login', pathMatch: 'full' },
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
