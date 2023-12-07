import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tabla } from 'src/app/core/modelos/modelotablas';
import { GeneralesService } from 'src/app/shared/services/generales.service';
import { RolesService } from 'src/app/shared/services/roles.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {


  public tabla:Tabla = {
    columnas:[],
    datos:[]
  };
  constructor(private generalesPrd:GeneralesService,private roles:RolesService,
    private router:Router) { }

  ngOnInit(): void {

    this.roles.getRoles().subscribe(datos =>{
      console.log("Esto son los roles",datos);
      this.tabla = {
        columnas:[
        {identificador:"id",nombre:"Id rol"},
        {identificador:"nombre",nombre:"Nombre rol"},
        {identificador:"esActivo",nombre:"Es activo"}],
        datos:datos
      }
    });
  }


  public mostrarmenu(){
    this.generalesPrd.showMenu();
  }

  public agregar(){
     this.router.navigateByUrl(`${this.router.routerState.snapshot.url}/nuevo`);
  }

}
