import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClientesComponent } from "./pages/clientes/clientes.component";
import { ClientesDetalleComponent } from "./pages/clientes-detalle/clientes-detalle.component";


const rutas:Routes = [
  {path:'clientes',component:ClientesComponent},
  {path:'clientes/nuevo',component:ClientesDetalleComponent},
  {path:'clientes/:id',component:ClientesDetalleComponent},
];

@NgModule({
  imports:[RouterModule.forChild(rutas)],
  declarations:[],
  exports:[RouterModule]
})
export class ClientesRoutingModule{

}
