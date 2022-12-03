import { stringify } from '@angular/compiler/src/util';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { interval } from 'rxjs';
import { GeneralesService } from 'src/app/shared/services/generales.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss']
})
export class VentasComponent implements OnInit,AfterViewInit {
  @ViewChild("miIframe") iframeReferencia!:ElementRef;

  public urlatiendelos!:SafeUrl;
  public usuario:string = "MANSIONBARBARO"
  public usuarioPWd:string = "MANSIONBARBARO123"
  public idSucursal:string = "32";
  public idEmpresa:string = "7";
  

  constructor(private sanitizer:DomSanitizer,private generalesPrd:GeneralesService) { 
  }
  ngAfterViewInit(): void {
    let temporal = this.iframeReferencia;
    let objEnviar = {
      usuario:this.usuario,
      token:this.usuarioPWd,
      idsucursal:this.idSucursal,
      idempresa:this.idEmpresa
    }

    window.addEventListener('message', function (e) {
      if (e.origin === environment.urlVersion1App) {
        if(e.data.complete){
          temporal.nativeElement.contentWindow.postMessage({...objEnviar}, environment.urlVersion1App)
        }
      }
    })
  }

  ngOnInit(): void {
    console.log("Se esta mandando a llamar");
    this.urlatiendelos = this.sanitizer.bypassSecurityTrustResourceUrl(environment.urlVersion1App);
  }


  public mostrarmenu(){
    this.generalesPrd.showMenu();
  }

}
