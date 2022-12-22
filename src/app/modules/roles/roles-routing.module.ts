import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddRolesComponent } from "./pages/add-roles/add-roles.component";
import { RolesComponent } from "./pages/roles/roles.component";

const rutas:Routes = [
    {path:'roles',component:RolesComponent},
    {path:'roles/:id',component:AddRolesComponent},
];

@NgModule({
    imports:[RouterModule.forChild(rutas)]
})
export class RolesRoutingModule{

}