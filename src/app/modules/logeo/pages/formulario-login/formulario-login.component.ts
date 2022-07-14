import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidator } from 'src/app/shared/customValidators/customValids';

@Component({
  selector: 'app-formulario-login',
  templateUrl: './formulario-login.component.html',
  styleUrls: ['./formulario-login.component.scss']
})
export class FormularioLoginComponent implements OnInit {

  public formGroup!:FormGroup;
  public verPassword:boolean = false;
  public cargando:boolean = false;
  activo: boolean = false;
  okPassword: boolean = false;
  constructor(private fb:FormBuilder,private router:Router) { }

  ngOnInit(): void {
    this.formGroup = this.createForm("");
  }

  private createForm(obj:any):FormGroup{
    return this.fb.group({
      correo:['',[Validators.required,Validators.email]],
      mantener:[false],
      password: [obj.password,Validators.required  ],
        validpassword: [null , [Validators.required]] });
    };

  public onSubmit(){
    if(this.formGroup.invalid){
        Object.values(this.formGroup.controls).forEach(control=>{
          control.markAllAsTouched();
        });
        return;
    }
    this.guardar();
  }

  private guardar(){
    console.log("guada datos");
    this.cargando = true;
    setTimeout(() => {
        this.cargando = false;
        this.router.navigate(['/autenticacion/validacionotp'],{state:{'formulario':this.formGroup.value}})
    }, 2000);
  }

  get f():any{
    
    return  this.formGroup.controls;
  }

  public vacio(parametro:any):boolean{
    return Boolean(parametro)
  }



  public changeColor(){
      document.documentElement.style.setProperty("--principal", "red");
  }


}
