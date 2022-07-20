import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { reportesRoutingModule } from "./reportes-routing.module";
import { ReportesComponent } from './pages/reportes/reportes.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
    declarations:[
    ReportesComponent
  ],
    imports:[CommonModule,reportesRoutingModule,FormsModule,ReactiveFormsModule]
})
export class reportesModule{

}