import { Component, Inject, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ModalLoading } from './core/modelos/modales';
import { MY_MODAL_MESSAGE } from './core/tokens/tokensProviders';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'mobie-frontend';
  public modalLoading!:ModalLoading;
  constructor(@Inject(MY_MODAL_MESSAGE) private modal:BehaviorSubject<ModalLoading>){

  }
  ngOnInit(): void {
    this.modal.subscribe(datos => this.modalLoading = datos);
  }
}
