import { Component, OnInit } from '@angular/core';
import { GeneralesService } from 'src/app/shared/services/generales.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  constructor(private generalesPrd:GeneralesService) { }

  ngOnInit(): void {
  }

  
  public mostrarmenu(){
    this.generalesPrd.showMenu();
  }

}
