import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clientes-detalle',
  templateUrl: './clientes-detalle.component.html',
  styleUrls: ['./clientes-detalle.component.scss']
})
export class ClientesDetalleComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public comeback(){
    history.back();
}

}
