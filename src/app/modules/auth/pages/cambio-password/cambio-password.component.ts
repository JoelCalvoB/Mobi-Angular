import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TYPE_DIALOG } from 'src/app/core/modelos/modales';
import { CognitoResponse } from 'src/app/core/modelos/modeloCognito';
import { CustomValidator } from 'src/app/shared/customValidators/customValids';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'app-cambio-password',
  templateUrl: './cambio-password.component.html',
  styleUrls: ['./cambio-password.component.scss']
})
export class CambioPasswordComponent implements OnInit {

  public myForm!:FormGroup;
  public verPassword:boolean = false;
  activo: boolean = false;
  okPassword: boolean = false;

  private username!:string;

  constructor(private fb:FormBuilder,private router:Router,
    private modalPrd:ModalService) { }

  ngOnInit(): void {
    const datos = history.state.datos;
    if(!Boolean(datos))
      this.router.navigateByUrl("/auth/login");
    this.username = datos?.email;
    this.myForm = this.createForm();
    this.pass()
  }

  private createForm(){
    return this.fb.group({
      password: ['',
        Validators.compose([    /// PUNTOS A CUMPLIR DE LA CONTRASEÑA
          Validators.required,
          CustomValidator.patternValidator(/\d/, {
            hasNumber: true
          }),
          CustomValidator.patternValidator(/[A-Z]/, {
            hasCapitalCase: true
          }),
          CustomValidator.patternValidator(/[a-z]/, {
            hasSmallCase: true
          }),
          CustomValidator.patternValidator(
            /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
            {
              hasSpecialCharacters: true
            }
          ),
          Validators.minLength(8)
        ])
        ],
        validpassword: [null , [Validators.required]]
      }, { validator: CustomValidator.checkPasswords });
  }


  public onSubmit(){

    if(this.myForm.invalid){

      Object.values(this.myForm.controls).forEach(control =>{
        control.markAllAsTouched();
      });;

      return;
    }

    this.guardarPassword(this.myForm.value);

  }

  private guardarPassword(valores:any){
    this.modalPrd.showLoading("Actualizando contraseña");
  }

  public pass() {
    this.myForm.controls['password'].valueChanges.subscribe(resp => {
      if (resp.length >= 1) {
        this.activo = true;

        if (this.myForm.controls['password'].valid) {
          this.activo = false;
          this.okPassword = true;
        }
        else {
          this.okPassword = false;
        }

      }
      else {
        this.activo = false;
      }
    })
  }

  public get f():any{
    return this.myForm.controls;
  }

  public vacio(parametro:any):boolean{
    return Boolean(parametro)
  }
}
