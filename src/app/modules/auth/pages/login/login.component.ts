import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TYPE_DIALOG } from 'src/app/core/modelos/modales';
import { CognitoResponse, TYPE_ERROR_COGNITO } from 'src/app/core/modelos/modeloCognito';
import { AutenticacionCognitoService } from 'src/app/shared/services/autenticacion-cognito.service';
import { ModalService } from 'src/app/shared/services/modal.service';
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
  constructor(private modalPrd:ModalService,private fb:FormBuilder,private router:Router,private loginPrd:LoginAutenticacionService,
    private cognitoPrd:AutenticacionCognitoService) { }

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
    this.modalPrd.showLoading("Iniciando sesión");
    const username = this.formGroup.value.username;
    const password = this.formGroup.value.password;
    this.cognitoPrd.loginuser(username,password).then(datos =>{
      this.modalPrd.closeLoading();
        this.modalPrd.showMessageDialog({message:datos.mensaje,typeDialog:TYPE_DIALOG.ERROR}).then(()=>{
            this.modalPrd.closeMessageDialog();
        });
    },(err:CognitoResponse)=>{
      this.modalPrd.closeLoading();
      switch(err.TypeError){
        case TYPE_ERROR_COGNITO.NewPassword:
          this.modalPrd.showMessageDialog({message:err.mensaje,typeDialog:TYPE_DIALOG.SUCCESS}).then(datos =>{
            
          });
          break;
        default:
          this.modalPrd.showMessageDialog({message:err.mensaje,typeDialog:TYPE_DIALOG.ERROR});
      }
    });
    //this.router.navigate(['/inicio'],{state:{'formulario':this.formGroup.value}});
  
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
