import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ModalLoading } from 'src/app/core/modelos/modales';
import { MY_MODAL_MESSAGE } from 'src/app/core/tokens/tokensProviders';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(@Inject(MY_MODAL_MESSAGE) private modal:BehaviorSubject<ModalLoading>) { }
  public showLoading(mensaje:string){
      this.modal.next({visible:true,message:mensaje});
  }

  public closeLoading(){
    this.modal.next({visible:false,message:''});
  }
}



