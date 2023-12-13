import { Component, Inject, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ModalLoading } from './core/modelos/modales';
import { MY_COLOR, MY_MODAL_MESSAGE } from './core/tokens/tokensProviders';
import { Colores } from './core/modelos/usuarioLogin';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'mobie-frontend';
  public modalLoading!:ModalLoading;
  constructor(@Inject(MY_MODAL_MESSAGE) private modal:BehaviorSubject<ModalLoading>,
  @Inject(MY_COLOR) private colores:BehaviorSubject<Colores>
  ){

  }
  ngOnInit(): void {
    this.modal.subscribe(datos => this.modalLoading = datos);

    this.colores.subscribe((colores)=>{

      this.cambiarColor(colores.primario,colores.fondo);
    });

  }

  private cambiarColor(colormenu:string,colorfondo:string):void{


    let coloralterado = this.hexadecimalChangeColor(colormenu,1);
    let coloralterado2 = this.hexadecimalChangeColor(colormenu,0.2);
    document.documentElement.style.setProperty('--principal', colormenu);
    document.documentElement.style.setProperty('--fondo', colorfondo);
    document.documentElement.style.setProperty('--principalbold', coloralterado);
    document.documentElement.style.setProperty('--principalhide100', coloralterado2);
  }

  hexToRGB(hex:string,hide:number) {

    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${hide})`;;
  }




  private hexadecimalChangeColor(color:string,hide:number):string{
      return this.hexToRGB(color,hide);
  }
}
