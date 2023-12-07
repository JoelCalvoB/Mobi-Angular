import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralesService } from 'src/app/shared/services/generales.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  constructor(private generalesPrd:GeneralesService,private router:Router) { }

  ngOnInit() {
  }


  public mostrarmenu(){
    this.generalesPrd.showMenu();
  }

  public agregar(){
    this.router.navigateByUrl(`${this.router.routerState.snapshot.url}/nuevo`);
 }

}
