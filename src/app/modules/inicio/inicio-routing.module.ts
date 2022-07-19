import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InicioComponent } from "./pages/inicio/inicio.component";

const rutas:Routes = [{
    path:'',children:[
        {path:'',component:InicioComponent}
    ]
}];

@NgModule({
    imports:[RouterModule.forChild(rutas)],
    exports:[RouterModule]
})
export class inicioRoutingModule{

}