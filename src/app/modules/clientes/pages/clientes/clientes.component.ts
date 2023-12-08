import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tabla } from 'src/app/core/modelos/modelotablas';
import { EmpresasService } from 'src/app/shared/services/empresas.service';
import { GeneralesService } from 'src/app/shared/services/generales.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  public tabla:Tabla = {
    columnas:[],
    datos:[]
  }

  constructor(private generalesPrd:GeneralesService,private router:Router,private empresasPrd:EmpresasService) { }

  ngOnInit() {

    this.empresasPrd.getAll().subscribe(datos =>{
      datos = datos.map((s:any)=>{
        return {...s,versionesstr:s.versiones.map((m:any) => m.nombre).join(' ')};
      })
      this.tabla = {
        columnas:[
          {nombre:'Nombre de empresa',identificador:'nombre'},
          {nombre:'RFC',identificador:'rfc'},
          {nombre:'Razón social',identificador:'razonSocial'},
          {nombre:'Es cliente',identificador:'isCliente'},
          {nombre:'Versiones',identificador:'versionesstr'},
        ],
        datos:datos
      };
      console.log(datos);
    });
  }


  public mostrarmenu(){
    this.generalesPrd.showMenu();
  }

  public agregar(){
    this.router.navigateByUrl(`${this.router.routerState.snapshot.url}/nuevo`);
 }

}
