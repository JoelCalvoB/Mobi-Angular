import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CrearcuentaComponent } from "./pages/crearcuenta/crearcuenta.component";
import { LoginComponent } from "./pages/login/login.component";

const rutas:Routes = [{path:'',children:[
    {path:'crearcuenta',component:CrearcuentaComponent},
    {path:'login',component:LoginComponent}
]}];

@NgModule({
    declarations:[],
    imports:[RouterModule.forChild(rutas)],
    exports:[RouterModule]
})
export class AuthRoutingModule{

}