import { Component, OnInit, Output,EventEmitter, Input, AfterViewInit } from '@angular/core';
import { ACCIONES_MODALARCHIVOS, ObjetoEmitidoModalArchivos } from 'src/app/core/modelos/objetoemitido';
declare var Webcam:any;
@Component({
  selector: 'app-modal-seleccionar-archivos',
  templateUrl: './modal-seleccionar-archivos.component.html',
  styleUrls: ['./modal-seleccionar-archivos.component.scss']
})
export class ModalSeleccionarArchivosComponent implements OnInit,AfterViewInit {
  @Output() salida:EventEmitter<ObjetoEmitidoModalArchivos> = new EventEmitter<ObjetoEmitidoModalArchivos>();
  @Input() opcion:string = "";
  @Input() esCamara:boolean = false;
  @Input() isMobile:boolean = false;
  public cantidadfotos = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
  public elegirFoto:boolean = false;
  public seleccionado = -1;
  public base64?:string = undefined;
  

  constructor() { 
    
    
     
    
  }
  ngAfterViewInit(): void {
   
  }

  ngOnInit(): void {
   
  }
  

  public cancelar(){
    this.salida.emit({type:ACCIONES_MODALARCHIVOS.CANCELAR});
  }
  public aceptar(){
    this.salida.emit({type:ACCIONES_MODALARCHIVOS.SUBIRARCHIVO,datos:this.seleccionado});
  }

  public visualizarFotoSeleccionada(item:any){
      this.elegirFoto = true;
      this.seleccionado = item;
  }

  public seleccionaFoto(){
    this.elegirFoto = false;
  }

  tomarFoto(){
      if(Boolean(this.base64)){
        this.salida.emit({type:ACCIONES_MODALARCHIVOS.SUBIRARCHIVO});
        return;
      }

      let mm:any = document.createElement("input");
      mm.type="file";
      mm.accept="image/*;capture=camera";
      mm.onchange = ()=>{
        for (let item in Object.getOwnPropertyNames(mm.files)) {

          let archivo: File = mm.files[item];
  
          if (this.esImagen(archivo.type)) {
            console.log("archivo",archivo);
            archivo.arrayBuffer().then(datos => {
              let arrayDatos = datos;
              console.log("arrayDatos",arrayDatos);
              let base64 = "data:image/png;base64,"+this.arrayBufferToBase64(datos);
              console.log("base64",base64);
              this.base64 = base64;
            });
          } else {
            console.log("Error de imagen");
          }
  
  
        }
      }
      mm.click();
      
      
  }

  private esImagen(tipoArchivo: string): boolean {
    return (tipoArchivo === '' || tipoArchivo === undefined) ? false : tipoArchivo.startsWith('image');
  }

  public arrayBufferToBase64(buffer: any) {
    let binary = '';
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

}
