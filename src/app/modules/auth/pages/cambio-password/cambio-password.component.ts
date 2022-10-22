import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidator } from 'src/app/shared/customValidators/customValids';

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

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.myForm = this.createForm();
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
