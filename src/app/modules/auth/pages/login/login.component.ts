import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TYPE_DIALOG } from 'src/app/core/modelos/modales';
import { CognitoResponse, TYPE_ERROR_COGNITO } from 'src/app/core/modelos/modeloCognito';
import { ModalService } from 'src/app/shared/services/modal.service';
import { LoginAutenticacionService } from '../../../../shared/services/login-autenticacion.service';
import { MY_EMPRESA_DATA, MY_USER_DATA } from 'src/app/core/tokens/tokensProviders';
import { BehaviorSubject } from 'rxjs';
import { Empresa } from 'src/app/core/modelos/usuarioLogin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public formGroup!: FormGroup;
  public verPassword: boolean = false;
  public cargando: boolean = false;
  public masempresas:boolean = false;
  public empresas:Empresa[] = [];
  public datos:any;
  activo: boolean = false;
  okPassword: boolean = false;
  constructor(private modalPrd: ModalService, private fb: FormBuilder, private router: Router, private loginPrd: LoginAutenticacionService,
   @Inject(MY_USER_DATA) private userSesion:BehaviorSubject<any>
    ,@Inject(MY_EMPRESA_DATA) private empresaSesion:BehaviorSubject<any>) { }

  ngOnInit(): void {
    this.formGroup = this.createForm({});
  }

  private createForm(obj?: any): FormGroup {
    return this.fb.group({
      username: ['', [Validators.required]],
      mantener: [false],
      password: [obj.password, Validators.required],
      validpassword: [null]
    });
  };

  public onSubmit() {
    if (this.formGroup.invalid) {
      Object.values(this.formGroup.controls).forEach(control => {
        control.markAllAsTouched();
      });
      return;
    }
    this.enviarDatos();
  }

  private enviarDatos() {
    this.modalPrd.showLoading("Iniciando sesión");
    const username = this.formGroup.value.username;
    const password = this.formGroup.value.password;
    this.loginPrd.login({username:username,password:password}).subscribe((datos:any)=>{



      console.log(datos.empresas);
      console.log("datos de sesion",datos);
      if(datos.empresas.length != undefined && datos.empresas.length == 1){
           sessionStorage.setItem("empresa",JSON.stringify(datos.empresas[0]));
           this.userSesion.next(datos.empresas[0]);
      }else if(datos.empresas.length != undefined && datos.empresas.length > 1){
         this.masempresas = true;
         this.empresas = datos.empresas;
         this.modalPrd.closeLoading();
         this.datos = datos;
         return;
      }else{
         console.log("No tiene empresas asociadas");
      }
      sessionStorage.setItem('datosusuario',JSON.stringify(datos));

      this.userSesion.next(datos);
      this.modalPrd.closeLoading();
      this.router.navigate(['/inicio'], { state: { 'formulario': this.formGroup.value } });
    });

  }

  get f(): any {

    return this.formGroup.controls;
  }

  public vacio(parametro: any): boolean {
    return Boolean(parametro)
  }



  public changeColor() {
    document.documentElement.style.setProperty("--principal", "red");
  }

  public redireccionar() {
    document.location.href = "/";
  }

  public seleccionar(item:Empresa){
     this.empresas.forEach(s => s.seleccionar = false);
     item.seleccionar = true;
  }

  public seleccionarEmpresa(){
    const empresa = this.empresas.find(s => s.seleccionar);
    sessionStorage.setItem("empresa",JSON.stringify(empresa));
    this.empresaSesion.next(empresa);
    sessionStorage.setItem('datosusuario',JSON.stringify(this.datos));

    this.userSesion.next(this.datos);
    this.router.navigate(['/inicio'], { state: { 'formulario': this.formGroup.value } });
  }


}
