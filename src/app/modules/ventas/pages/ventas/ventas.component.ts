import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { GeneralesService } from 'src/app/shared/services/generales.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss']
})
export class VentasComponent implements OnInit {

  public urlatiendelos!:SafeUrl;

  constructor(private sanitizer:DomSanitizer,private generalesPrd:GeneralesService) { }

  ngOnInit(): void {
    this.urlatiendelos = this.sanitizer.bypassSecurityTrustUrl("https://empresas1.herokuapp.com");
  }
  public mostrarmenu(){
    this.generalesPrd.showMenu();
  }

}
