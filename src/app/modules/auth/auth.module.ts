import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";
import { AuthRoutingModule } from "./auth-routing.module";
import { CrearcuentaComponent } from "./pages/crearcuenta/crearcuenta.component";
import { LoginComponent } from './pages/login/login.component';

@NgModule({
    declarations:[
    CrearcuentaComponent,
    LoginComponent
  ],
    imports:[CommonModule,AuthRoutingModule,SharedModule,FormsModule,ReactiveFormsModule]
})
export class AuthModule{

}