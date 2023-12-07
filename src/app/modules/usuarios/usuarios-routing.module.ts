import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UsuariosComponent } from "./pages/usuarios/usuarios.component";
import { UsuariosDetalleComponent } from "./pages/usuarios-detalle/usuarios-detalle.component";


const rutas:Routes = [
 {path:'usuarios',component:UsuariosComponent},
 {path:'usuarios/nuevo',component:UsuariosDetalleComponent},
 {path:'usuarios/:id',component:UsuariosDetalleComponent}
]

@NgModule({

  declarations:[],
  exports:[RouterModule],
  imports:[RouterModule.forChild(rutas)]

})
export class UsuariosRoutingModule{

}
