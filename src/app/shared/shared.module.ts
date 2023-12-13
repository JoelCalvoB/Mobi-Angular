import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SubirarchivosComponent } from './subirarchivos/subirarchivos.component';
import { ModalSeleccionarArchivosComponent } from './modal-seleccionar-archivos/modal-seleccionar-archivos.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { WidgetCargandoComponent } from './componentes/widget-cargando/widget-cargando.component';
import { TablaGenericaComponent } from "./componentes/tabla-generica/tabla-generica.component";
import { AngularMaterialModuleShared } from "./angular.material.module";
import { SubirarchivoComponent } from "./componentes/subirarchivo/subirarchivo.component";
import { ManipularfilesDirective } from "./directivas/manipularfiles.directive";

@NgModule({
    declarations: [
        SubirarchivosComponent,
        ModalSeleccionarArchivosComponent,
        WidgetCargandoComponent,
        TablaGenericaComponent,
        SubirarchivoComponent,
        ManipularfilesDirective],
    imports:[CommonModule,FormsModule,ReactiveFormsModule,AngularMaterialModuleShared],
    exports:[SubirarchivosComponent,WidgetCargandoComponent,TablaGenericaComponent,AngularMaterialModuleShared,SubirarchivoComponent]
})
export class SharedModule{}
