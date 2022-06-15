import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ComprobaringresosComponent } from "./pages/comprobaringresos/comprobaringresos.component";
import { ValidacionidentidadComponent } from "./pages/validacionidentidad/validacionidentidad.component";


const rutas:Routes = [{
    path:'',children:[
        {path:'validacionidentidad',component:ValidacionidentidadComponent},
        {path:'exitoautorizada',component:ComprobaringresosComponent}
    ]
}];

@NgModule({
    imports:[RouterModule.forChild(rutas)]
})
export class validacionIdentidadRoutingModule{

}