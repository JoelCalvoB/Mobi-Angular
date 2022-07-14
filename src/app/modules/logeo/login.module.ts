import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginInitComponent } from './pages/principalLogin/login-init.component';
import { LoginRoutingModule } from './login-routing.module';
import { crearCuentaModule } from '../crearCuenta/crearCuenta.module';
import { FormularioCrearcuentaComponent } from '../crearCuenta/pages/formulario-crearcuenta/formulario-crearcuenta.component';
import { FormularioLoginComponent } from './pages/formulario-login/formulario-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LoginInitComponent,
    FormularioLoginComponent,
    
  ],
  imports: [FormsModule , ReactiveFormsModule,
    CommonModule,
    LoginRoutingModule,
  ]
})
export class LoginModule { }
