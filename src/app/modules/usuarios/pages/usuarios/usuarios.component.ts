import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tabla } from 'src/app/core/modelos/modelotablas';
import { Usuario } from 'src/app/core/modelos/usuarioLogin';
import { GeneralesService } from 'src/app/shared/services/generales.service';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {


  public usuarios:Usuario[] = [];
  public tabla:Tabla = {
    columnas:[],
    datos:[]
  }

  constructor(private generalesPrd:GeneralesService,private router:Router,
    private usuariosPrd:UsuariosService) { }

  ngOnInit() {
    this.usuariosPrd.getAll().subscribe(datos =>{
       this.usuarios = datos;
       this.tabla = {
        columnas:[
          {identificador:'nombre',nombre:'Nombre'},
          {identificador:'primerApellido',nombre:'Primer apellido'},
          {identificador:'segundoApellido',nombre:'Segundo apellido'},
          {identificador:'correo',nombre:'Usuario'},
          {identificador:'telefono',nombre:'Teléfono'}

        ],
        datos:this.usuarios
       };
    });
  }



  public mostrarmenu(){
    this.generalesPrd.showMenu();
  }

  public agregar(){
    this.router.navigateByUrl(`${this.router.routerState.snapshot.url}/nuevo`);
 }
}
