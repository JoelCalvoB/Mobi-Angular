import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuarios-detalle',
  templateUrl: './usuarios-detalle.component.html',
  styleUrls: ['./usuarios-detalle.component.scss']
})
export class UsuariosDetalleComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public comeback(){
    history.back();
}

}
