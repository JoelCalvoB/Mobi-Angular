import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";
import { ComprobaringresosComponent } from "./pages/comprobaringresos/comprobaringresos.component";
import { ValidacionidentidadComponent } from "./pages/validacionidentidad/validacionidentidad.component";
import { validacionIdentidadRoutingModule } from "./validacionidentidad-routing.module";

@NgModule({
    declarations:[ValidacionidentidadComponent,ComprobaringresosComponent],
    imports:[FormsModule,ReactiveFormsModule,CommonModule,validacionIdentidadRoutingModule,SharedModule]
})
export class validacionIdentidadModule{

}