import { NgModule } from "@angular/core";
import { UsuariosRoutingModule } from "./usuarios-routing.module";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";
import { UsuariosComponent } from "./pages/usuarios/usuarios.component";
import { UsuariosDetalleComponent } from "./pages/usuarios-detalle/usuarios-detalle.component";

@NgModule({

  declarations:[UsuariosComponent,UsuariosDetalleComponent],
  exports:[],
  imports:[UsuariosRoutingModule,CommonModule,FormsModule,ReactiveFormsModule,SharedModule]

})
export class UsuariosModule{

}
