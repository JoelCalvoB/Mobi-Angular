import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";
import { AddRolesComponent } from "./pages/add-roles/add-roles.component";
import { RolesComponent } from "./pages/roles/roles.component";
import { RolesRoutingModule } from "./roles-routing.module";

@NgModule({
    declarations:[RolesComponent,AddRolesComponent],
    imports:[CommonModule,FormsModule,ReactiveFormsModule,SharedModule,RolesRoutingModule]
})
export class RolesModule{

}