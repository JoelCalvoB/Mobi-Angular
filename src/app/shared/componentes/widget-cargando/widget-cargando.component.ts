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

  @Input() mensaje!: string;
  @Input() typedialog!: TYPE_DIALOG;


  public cargando: TYPE_DIALOG = TYPE_DIALOG.LOADING;
  public error: TYPE_DIALOG = TYPE_DIALOG.ERROR;
  public success: TYPE_DIALOG = TYPE_DIALOG.SUCCESS;
  public warning: TYPE_DIALOG = TYPE_DIALOG.WARNING;
  public question: TYPE_DIALOG = TYPE_DIALOG.QUESTION;
  public encabezado: string = "";


  constructor(@Inject(MY_MODAL_REPONSE) private modalResponsePrd: BehaviorSubject<ModalRespuesta>) { }

  ngOnInit(): void {
    switch (this.typedialog) {
      case TYPE_DIALOG.ERROR:
        this.encabezado = "Error";
        break;
      case TYPE_DIALOG.SUCCESS:
        this.encabezado = "Éxito";
        break;
      case TYPE_DIALOG.WARNING:
        this.encabezado = "Importante";
        break;
      case TYPE_DIALOG.QUESTION:
        this.encabezado = "Pregunta";
        break;
    }
  }

  public enviar(datos?: any) {
    switch (this.typedialog) {
      case TYPE_DIALOG.ERROR:
        this.modalResponsePrd.next({ type: this.typedialog, datos: datos });
        break;
      case TYPE_DIALOG.SUCCESS:
        this.modalResponsePrd.next({ type: this.typedialog, datos: datos });
        break;
      case TYPE_DIALOG.WARNING:
        this.modalResponsePrd.next({ type: this.typedialog, datos: datos });
        break;
      case TYPE_DIALOG.QUESTION:
        this.modalResponsePrd.next({ type: this.typedialog, datos: !Boolean(datos) });
        break;
    }
  }

  public cancelar() {
    this.enviar(true);
  }
}
