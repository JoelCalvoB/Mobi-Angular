import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-validacionidentidad',
  templateUrl: './validacionidentidad.component.html',
  styleUrls: ['./validacionidentidad.component.scss']
})
export class ValidacionidentidadComponent implements OnInit {

  public myForm!:FormGroup;
  public cargando:boolean = false;

  constructor(private fb:FormBuilder,private router:Router) { }

  ngOnInit(): void {
    this.myForm = this.createForm();
  }

  private createForm(){
    return this.fb.group({
      subida1:['',Validators.required],
      subida2:['',Validators.required],
      subida3:['',Validators.required]
    });
  }

  public recibirEvento(obj:any){
      switch(obj.type){
          case "ine":
            break;
          case "reverso":
            break;
          case "foto":
            break;
          default:
            console.log("Hubo un error");
            break;
      }
  }

  public enviarSubmit(){

     console.log("estado",this.myForm.invalid);
      if(this.myForm.invalid){
        return;
      }

      this.cargando = true;
      setTimeout(() => {
        this.cargando = false;
        this.router.navigate(["/sesion/exitoautorizada"]);
      }, 1000);

  }

}
