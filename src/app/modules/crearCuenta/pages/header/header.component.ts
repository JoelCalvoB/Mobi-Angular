import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  @Input() darkheader:boolean = false;
  public flag:boolean=true;


  constructor(public router: Router) { }

  ngOnInit(): void {
    this.validOpenSession();
  }

  validOpenSession(){
    let valor =localStorage.getItem('sesionOpen');
  valor? this.flag=true:this.flag=false
  }


  login(){
    localStorage.setItem('sesionOpen', 'true');
this.router.navigateByUrl('login/new/session');
this.validOpenSession();
  }
}
