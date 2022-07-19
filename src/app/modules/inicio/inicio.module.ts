import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { inicioRoutingModule } from "./inicio-routing.module";
import { InicioComponent } from "./pages/inicio/inicio.component";

@NgModule({
    declarations:[InicioComponent],
    imports:[CommonModule,inicioRoutingModule,ReactiveFormsModule,FormsModule],
})
export class inicioModule{

}