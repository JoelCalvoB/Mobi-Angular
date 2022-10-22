import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { TYPE_DIALOG } from 'src/app/core/modelos/modales';
import { CognitoResponse, TYPE_ERROR_COGNITO } from 'src/app/core/modelos/modeloCognito';
import { CustomValidator } from 'src/app/shared/customValidators/customValids';
import { AutenticacionCognitoService } from 'src/app/shared/services/autenticacion-cognito.service';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'app-crearcuenta',
  templateUrl: './crearcuenta.component.html',
  styleUrls: ['./crearcuenta.component.scss']
})
export class CrearcuentaComponent implements OnInit {

 

  public formGroup!:FormGroup;
  public verPassword:boolean = false;
  public cargando:boolean = false;
  activo: boolean = false;
  okPassword: boolean = false;
  constructor(private fb:FormBuilder,private router:Router,private loginServices:AutenticacionCognitoService,
    private modalPrd:ModalService) { }

  ngOnInit(): void {
    this.formGroup = this.createForm("");
    this.pass();
  }

  public pass() {
    this.formGroup.controls['password'].valueChanges.subscribe(resp => {
      if (resp.length >= 1) {
        this.activo = true;

        if (this.formGroup.controls['password'].valid) {
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

  private createForm(obj:any):FormGroup{
    return this.fb.group({
      correo:['',[Validators.required,Validators.email]],
      celular:['',[Validators.required,Validators.pattern('[0-9]{10}')]],
      terminos:[false,[Validators.required,Validators.requiredTrue]],
      password: [obj.password,
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
    this.modalPrd.showLoading("Registrando usuario..");
    const usuario = this.formGroup.value.correo;
    const password = this.formGroup.value.password;
    const telefono = this.formGroup.value.celular;
    this.loginServices.registrarUsuario(usuario,telefono,password).then(datos =>{
      this.modalPrd.closeLoading();
      this.modalPrd.showMessageDialog({message:'Usuario registrado con éxito',typeDialog:TYPE_DIALOG.SUCCESS}).then(datos =>{
        this.router.navigate(['/auth/login'],{state:{'formulario':this.formGroup.value}})
      });
    }).catch((err:CognitoResponse) =>{
      
      this.modalPrd.closeLoading();
      this.modalPrd.showMessageDialog({typeDialog:TYPE_ERROR_COGNITO.CodeDeliveryFailureException === err.TypeError?TYPE_DIALOG.SUCCESS:TYPE_DIALOG.ERROR,message:err.mensaje});
    });
  }

  public get f():any{
    return  this.formGroup.controls;
  }

  public vacio(parametro:any):boolean{
    return Boolean(parametro)
  }



  public changeColor(){
      document.documentElement.style.setProperty("--principal", "red");
  }
}
