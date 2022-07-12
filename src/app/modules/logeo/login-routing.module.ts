import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginInitComponent } from './pages/principalLogin/login-init.component';

const rutas:Routes =[
  {
    path:'' , children:[
      {path:'new/session', component:LoginInitComponent}
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(rutas)
  ],
  exports:[RouterModule]
})
export class LoginRoutingModule { }
