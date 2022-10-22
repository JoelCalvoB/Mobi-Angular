import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ModalLoading, ModalRespuesta, TYPE_DIALOG } from 'src/app/core/modelos/modales';
import { MY_MODAL_MESSAGE, MY_MODAL_REPONSE } from 'src/app/core/tokens/tokensProviders';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(@Inject(MY_MODAL_MESSAGE) private modal:BehaviorSubject<ModalLoading>,
  @Inject(MY_MODAL_REPONSE) private modalResponsePrd:BehaviorSubject<ModalRespuesta>) {

    console.log("construirTodo");
   }
  public showLoading(mensaje:string){
      this.modal.next({visible:true,message:mensaje,typeDialog:TYPE_DIALOG.LOADING});
  }

  public closeLoading(){
    this.modal.next({visible:false,message:'',typeDialog:TYPE_DIALOG.LOADING});
  }

  public showMessageDialog(dialogo:ModalLoading):Promise<ModalRespuesta>{
    this.modal.next({visible:true,message:dialogo.message,typeDialog:dialogo.typeDialog});
    const promesa = new Promise<ModalRespuesta>((resolve)=>{
      this.modalResponsePrd.subscribe(datos =>{
        console.log("this.modalResponsePrd.subscribe");
        if(datos.type !== TYPE_DIALOG.NOTHING){
            resolve(datos);
        }
      });
    });
    return promesa;
  }

  public closeMessageDialog(){
    this.modalResponsePrd.next({type:TYPE_DIALOG.NOTHING,datos:undefined});
    this.closeLoading();
  }
}



