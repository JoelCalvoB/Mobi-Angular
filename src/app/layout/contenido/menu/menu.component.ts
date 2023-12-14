import { Component, Inject, OnInit } from '@angular/core';
import { GeneralesService } from 'src/app/shared/services/generales.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { LoginAutenticacionService } from 'src/app/shared/services/login-autenticacion.service';
import { Colores, Empresa, Modulo, Usuario } from 'src/app/core/modelos/usuarioLogin';
import { BehaviorSubject } from 'rxjs';
import { MY_COLOR, MY_EMPRESA_DATA, MY_USER_DATA, MY_USER_TOKEN } from 'src/app/core/tokens/tokensProviders';
import { myTokenUserIndicator } from 'src/app/core/tokens/tokenRecurso';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/shared/services/modal.service';
import { TYPE_DIALOG } from 'src/app/core/modelos/modales';

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
        opacity: 0.0,
        margin: '-17px',
        padding: '0px',
      })),
      transition("abrir => cerrar", [
        animate('0.2s')
      ]),
      transition("cerrar => abrir", [
        animate('0.2s')])]
    )]
})
export class MenuComponent implements OnInit {

  public mostrar: boolean = true;
  public usuario!: Usuario;
  public empresa!:Empresa;

  constructor(private generalesPrd: GeneralesService, @Inject(MY_USER_TOKEN) private usuarioToken: myTokenUserIndicator, private usuariosPrd: LoginAutenticacionService,
    private routerPrd: Router,private modalPrd:ModalService,
    @Inject(MY_USER_DATA) private userSesion:BehaviorSubject<any>,
    @Inject(MY_EMPRESA_DATA) private empresaSesion:BehaviorSubject<Empresa>,
    @Inject(MY_COLOR) private colores:BehaviorSubject<Colores>) { }

  ngOnInit(): void {
    this.usuario = this.usuarioToken.getValue;
    this.generalesPrd.serviciomenu().subscribe(datos => {
      this.mostrar = !this.mostrar;
    });

    this.userSesion.subscribe(datos =>{
      console.log("Esta es la sesion",datos);
      this.usuario = datos;
    });
    this.empresaSesion.subscribe(datos =>{
        this.empresa = datos;
        this.colores.next({fondo:datos.colorsecundario,primario:datos.colorprimario});
    });
  }

  public seleccionar(item?: Modulo) {
    this.usuario.rol.modulos.forEach(s => {
      if (s.nombre !== item?.nombre)
        s.seleccionado = false
    });
    if (item) item.seleccionado = !item.seleccionado;
  }


  public cerrarSesion() {
    this.modalPrd.showMessageDialog({message:"¿Deseas cerrar sesión?",typeDialog:TYPE_DIALOG.QUESTION}).then(datos =>{
      if(datos.datos){
        this.usuariosPrd.cerrarSesion();
        this.routerPrd.navigateByUrl("/auth/login");
      }
    });

  }

  public navegar(item: any) {
    this.routerPrd.navigate([item?.ruta]);
  }

}
