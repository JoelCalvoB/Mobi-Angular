import { Component, OnInit } from '@angular/core';
import { GeneralesService } from 'src/app/shared/services/generales.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  constructor(private generalesPrd:GeneralesService) { }

  ngOnInit(): void {

  }

  public mostrarmenu(){
    this.generalesPrd.showMenu();
  }

}
