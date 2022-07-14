import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public valor: any;

  constructor(private Router:Router) { }

  ngOnInit(): void {
    this.valor = localStorage.getItem('sesionOpen');
  }



Logout(){
      this.Router.navigateByUrl('/autenticacion/crearcuenta');
      localStorage.setItem('sesionOpen', 'false');
}

}
