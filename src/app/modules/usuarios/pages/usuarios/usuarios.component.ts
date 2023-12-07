import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralesService } from 'src/app/shared/services/generales.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

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
