import { NgModule } from "@angular/core";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatNativeDateModule} from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';






const elementos:any[] = [MatInputModule,MatFormFieldModule,MatIconModule,MatButtonModule,MatDividerModule,
  MatDatepickerModule,MatExpansionModule,MatNativeDateModule,MatCheckboxModule,MatSelectModule];

@NgModule({
  imports:elementos,
  exports:elementos
})
export class AngularMaterialModuleShared{

}
