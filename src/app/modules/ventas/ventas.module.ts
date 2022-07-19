import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";
import { ventasRoutingModule } from "./ventas-routing.module";

@NgModule({
    declarations:[],
    imports:[CommonModule,ReactiveFormsModule,FormsModule,SharedModule,ventasRoutingModule]
})
export class ventasModule{

}