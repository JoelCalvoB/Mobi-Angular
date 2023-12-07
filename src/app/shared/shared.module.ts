import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SubirarchivosComponent } from './subirarchivos/subirarchivos.component';
import { ModalSeleccionarArchivosComponent } from './modal-seleccionar-archivos/modal-seleccionar-archivos.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { WidgetCargandoComponent } from './componentes/widget-cargando/widget-cargando.component';
import { TablaGenericaComponent } from "./componentes/tabla-generica/tabla-generica.component";

@NgModule({
    declarations: [
        SubirarchivosComponent,
        ModalSeleccionarArchivosComponent,
        WidgetCargandoComponent,
        TablaGenericaComponent],
    imports:[CommonModule,FormsModule,ReactiveFormsModule],
    exports:[SubirarchivosComponent,WidgetCargandoComponent,TablaGenericaComponent]
})
export class SharedModule{}
