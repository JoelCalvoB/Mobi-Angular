import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Salidatabla, Tabla } from 'src/app/core/modelos/modelotablas';
import { TYPEOUTPUT } from '../../constantes/constantesyfunciones';

@Component({
  selector: 'app-tabla-generica',
  templateUrl: './tabla-generica.component.html',
  styleUrls: ['./tabla-generica.component.scss']
})
export class TablaGenericaComponent implements OnChanges {



  @Input()
  public tabla!: Tabla;

  @Input()
  public eliminar:boolean = false;
  @Input()
  public suscribir:boolean = false;
  @Input()
  public modificar:boolean = false;
  @Input()
  public desglosar:boolean = false;

  public desploseContenido:boolean = false;

  @Output() private salida: EventEmitter<Salidatabla> = new EventEmitter<Salidatabla>();

  public arreglo: any[] = [];
  public arreglopaginador:any[] = ["...","1","2","3","..."];
  public cantidadTotal: number = 10;
  public indiceSeleccionado: number = 0;



  ngOnChanges(changes: SimpleChanges): void {
    this.arreglo = [];
      this.arreglopaginador = [];
    if (this.tabla && this.tabla.datos && this.tabla.datos.length != 0) {
      this.indiceSeleccionado = 0;
      this.iniciarTabla();
    }
  }




  private iniciarTabla() {
    let next: boolean = true;
    let indice: number = 0;
    while (next) {
      let aux: any = this.tabla.datos.slice(indice, indice + this.cantidadTotal);
      indice += this.cantidadTotal;
      if (aux && aux.length != 0) {
        this.arreglo.push(aux);
      } else {
        next = false;
      }
    }
  }

  public seleccionarIndice(indice: number) {
    this.indiceSeleccionado = indice;
  }


  public eliminarmethod(item: any) {
    this.salida.emit({ type: TYPEOUTPUT.DELETE, datos: item });
  }
  public consultarmethod(item: any) {
    this.salida.emit({ type: TYPEOUTPUT.VIEW, datos: item });
  }
  public modificarmethod(item: any) {
    this.salida.emit({ type: TYPEOUTPUT.UPDATE, datos: item });
  }

  public suscribirMethod(item: any) {
    this.salida.emit({ type: TYPEOUTPUT.SUSCRIBE, datos: item });
  }

  public desglosarmethod(item:any,indice:number){
      this.salida.emit({type:TYPEOUTPUT.DETAILS,datos:item,index:indice});
      this.desploseContenido = !this.desploseContenido;
  }

  public anterior() {
    if (this.indiceSeleccionado > 0) {
      this.indiceSeleccionado--;
    }
  }

  public siguiente() {
    if (this.indiceSeleccionado < this.arreglo.length-1) {
      this.indiceSeleccionado++;
    }
  }


}
