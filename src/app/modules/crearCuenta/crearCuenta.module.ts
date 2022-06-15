import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { crearCuentaRoutingModule } from "./crearCuenta-routing.module";
import { CrearcuentaComponent } from './pages/crearcuenta/crearcuenta.component';
import { OtpComponent } from './pages/otp/otp.component';
import { HeaderComponent } from './pages/header/header.component';
import { FormularioCrearcuentaComponent } from './pages/formulario-crearcuenta/formulario-crearcuenta.component';
import { FormularioOtpComponent } from './pages/formulario-otp/formulario-otp.component';
import { IngresoexitosoComponent } from './pages/ingresoexitoso/ingresoexitoso.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations:[
    CrearcuentaComponent,
    OtpComponent,
    HeaderComponent,
    FormularioCrearcuentaComponent,
    FormularioOtpComponent,
    IngresoexitosoComponent
  ],
    imports:[CommonModule,crearCuentaRoutingModule,FormsModule,ReactiveFormsModule]
})
export class crearCuentaModule{

}