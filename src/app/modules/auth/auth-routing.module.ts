import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CambioPasswordComponent } from "./pages/cambio-password/cambio-password.component";
import { CrearcuentaComponent } from "./pages/crearcuenta/crearcuenta.component";
import { LoginComponent } from "./pages/login/login.component";

const rutas:Routes = [{path:'',children:[
    {path:'crearcuenta',component:CrearcuentaComponent},
    {path:'login',component:LoginComponent},
    {path:'cambiopassword',component:CambioPasswordComponent}
]}];

@NgModule({
    declarations:[],
    imports:[RouterModule.forChild(rutas)],
    exports:[RouterModule]
})
export class AuthRoutingModule{

}