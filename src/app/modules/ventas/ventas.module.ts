import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";
import { ventasRoutingModule } from "./ventas-routing.module";
import { VentasComponent } from './pages/ventas/ventas.component';

@NgModule({
    declarations:[
    VentasComponent
  ],
    imports:[CommonModule,ReactiveFormsModule,FormsModule,SharedModule,ventasRoutingModule]
})
export class ventasModule{

}