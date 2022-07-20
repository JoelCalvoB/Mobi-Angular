import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { VentasComponent } from "./pages/ventas/ventas.component";
const rutas:Routes = [{path:'',children:[
    {path:'menuventas',component:VentasComponent}
]}];

@NgModule({
    declarations:[],
    imports:[RouterModule.forChild(rutas)],
    exports:[RouterModule]
})
export class ventasRoutingModule{}