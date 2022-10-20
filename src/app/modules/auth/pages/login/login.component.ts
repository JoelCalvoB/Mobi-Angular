import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginAutenticacionService } from '../../../../shared/services/login-autenticacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public formGroup!:FormGroup;
  public verPassword:boolean = false;
  public cargando:boolean = false;
  activo: boolean = false;
  okPassword: boolean = false;
  constructor(private fb:FormBuilder,private router:Router,private loginPrd:LoginAutenticacionService) { }

  ngOnInit(): void {
    this.formGroup = this.createForm({});
  }

  private createForm(obj?:any):FormGroup{
    return this.fb.group({
      username:['',[Validators.required,Validators.email]],
      mantener:[false],
      password: [obj.password,Validators.required  ],
        validpassword: [null ] });
    };

  public onSubmit(){
    if(this.formGroup.invalid){
        Object.values(this.formGroup.controls).forEach(control=>{
          control.markAllAsTouched();
        });
        return;
    }
    this.enviarDatos();
  }

  private enviarDatos(){
    this.cargando = true;
    this.loginPrd.login(this.formGroup.value).subscribe(datos =>{
      this.cargando = false;
      if(Boolean(datos)){
        this.router.navigate(['/inicio'],{state:{'formulario':this.formGroup.value}});
      }else{
        alert("Contraseña invalidas");
      }
    });
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

  public redireccionar(){
    document.location.href = "/";
  }


}
