import { NgModule } from "@angular/core";
import { ClientesRoutingModule } from "./clientes-routing.module";
import { SharedModule } from "src/app/shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ClientesComponent } from "./pages/clientes/clientes.component";
import { ClientesDetalleComponent } from "./pages/clientes-detalle/clientes-detalle.component";

@NgModule({
  imports:[ClientesRoutingModule,CommonModule,FormsModule,ReactiveFormsModule,SharedModule],
  declarations:[ClientesComponent,ClientesDetalleComponent],
  exports:[]
})
export class ClientesModule{

}
