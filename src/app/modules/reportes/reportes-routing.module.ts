import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ReportesComponent } from "./pages/reportes/reportes.component";

const rutas:Routes = [{
    path:'',children:[
        {path:'reporte',component:ReportesComponent}
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(rutas)],
    exports: [RouterModule]
})
export class reportesRoutingModule {

}