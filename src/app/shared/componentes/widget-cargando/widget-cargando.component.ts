import { Component, Inject, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ModalRespuesta, TYPE_DIALOG } from 'src/app/core/modelos/modales';
import { MY_MODAL_REPONSE } from 'src/app/core/tokens/tokensProviders';

@Component({
  selector: 'app-widget-cargando',
  templateUrl: './widget-cargando.component.html',
  styleUrls: ['./widget-cargando.component.scss']
})
export class WidgetCargandoComponent implements OnInit {

  @Input() mensaje!:string;
  @Input() typedialog!:TYPE_DIALOG;  


  public cargando:TYPE_DIALOG = TYPE_DIALOG.LOADING;
  public error:TYPE_DIALOG = TYPE_DIALOG.ERROR;


  constructor(@Inject(MY_MODAL_REPONSE) private modalResponsePrd:BehaviorSubject<ModalRespuesta>) { }

  ngOnInit(): void {
  }

  public enviar(){
    switch(this.typedialog){
      case TYPE_DIALOG.ERROR:
        console.log("Es esrror");
        this.modalResponsePrd.next({type:this.typedialog,datos:undefined});
        break;
    }
  }
}
