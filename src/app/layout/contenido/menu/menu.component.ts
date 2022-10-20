import { Component, Inject, OnInit } from '@angular/core';
import { GeneralesService } from 'src/app/shared/services/generales.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { LoginAutenticacionService } from 'src/app/shared/services/login-autenticacion.service';
import { Usuario } from 'src/app/core/modelos/usuarioLogin';
import { BehaviorSubject } from 'rxjs';
import { MY_USER_TOKEN } from 'src/app/core/tokens/tokensProviders';
import { myTokenUserIndicator } from 'src/app/core/tokens/tokenRecurso';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [
    trigger("abriendomenu", [
      state("abrir", style({
        display: 'block',
      })),
      state("cerrar", style({
        width: '0px',
        opacity: 0.0
      })),
      transition("abrir => cerrar", [
        animate('0.2s')
      ]),
      transition("cerrar => abrir", [
        animate('0.2s')])]
    )]
})
export class MenuComponent implements OnInit {

  public mostrar:boolean = true;
  public usuario!:Usuario;

  constructor(private generalesPrd:GeneralesService,@Inject(MY_USER_TOKEN) private usuarioToken:myTokenUserIndicator) { }

  ngOnInit(): void {
    this.usuario = this.usuarioToken.getValue;
    this.generalesPrd.serviciomenu().subscribe(datos =>{
      this.mostrar = !this.mostrar;
    });
  }

}
