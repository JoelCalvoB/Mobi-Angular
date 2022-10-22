import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SubirarchivosComponent } from './subirarchivos/subirarchivos.component';
import { ModalSeleccionarArchivosComponent } from './modal-seleccionar-archivos/modal-seleccionar-archivos.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { WidgetCargandoComponent } from './componentes/widget-cargando/widget-cargando.component';

@NgModule({
    declarations: [
        SubirarchivosComponent,
        ModalSeleccionarArchivosComponent,
        WidgetCargandoComponent],
    imports:[CommonModule,FormsModule,ReactiveFormsModule],
    exports:[SubirarchivosComponent,WidgetCargandoComponent]
})
export class SharedModule{}