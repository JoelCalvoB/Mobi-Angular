import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TYPE_DIALOG } from 'src/app/core/modelos/modales';
import { CognitoResponse } from 'src/app/core/modelos/modeloCognito';
import { AutenticacionCognitoService } from 'src/app/shared/services/autenticacion-cognito.service';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'app-codigo-verificacion',
  templateUrl: './codigo-verificacion.component.html',
  styleUrls: ['./codigo-verificacion.component.scss']
})
export class CodigoVerificacionComponent implements OnInit {

  @ViewChild("c2") inputc1!: ElementRef;
  @ViewChild("c3") inputc2!: ElementRef;
  @ViewChild("c4") inputc3!: ElementRef;
  @ViewChild("c5") inputc4!: ElementRef;
  @ViewChild("c6") inputc5!: ElementRef;
  @ViewChild("boton1") boton1!: ElementRef;
  public celular: String = ""
  public myForm!: FormGroup;
  public habilitado: boolean = false;
  public cargando: boolean = false;

  constructor(private fb: FormBuilder, private router: Router,private cognitoUser:AutenticacionCognitoService,
    private modalPrd:ModalService) { }

  ngOnInit(): void {
    if(!Boolean(this.cognitoUser.userCognito)) this.router.navigateByUrl("/auth/login");
    let formulario = history.state.formulario || {};
    this.celular = formulario.celular;
    this.myForm = this.createForm();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      c1: ['0', Validators.required],
      c2: ['0', Validators.required],
      c3: ['0', Validators.required],
      c4: ['0', Validators.required],
      c5: ['0', Validators.required],
      c6: ['0', Validators.required]
    });
  }

  public get f(): any {
    return this.myForm.controls;
  }

  public tecla(evento: any, llave: string) {

    let valor = (!navigator.userAgent.toLowerCase().includes("android") && !navigator.userAgent.toLowerCase().includes("ios")) ? evento.key : "";
    evento.preventDefault();
    this.myForm.controls[llave].setValue('0');
    setTimeout(() => {
      console.log(evento);
      if ((!navigator.userAgent.toLowerCase().includes("android") && !navigator.userAgent.toLowerCase().includes("ios"))) {
        this.myForm.controls[llave].setValue(valor);
      }
      switch (llave) {
        case 'c1':
          this.inputc1.nativeElement.focus();
          break;
        case 'c2':
          this.inputc2.nativeElement.focus();
          break;
        case 'c3':
          this.inputc3.nativeElement.focus();
          break;
        case 'c4':
          this.inputc4.nativeElement.focus();
          break;
        case 'c5':
          this.inputc5.nativeElement.focus();
          break;
        case 'c6':
          this.habilitado = true;
          setTimeout(() => {
            this.boton1.nativeElement.focus();
          }, 10);
          break;
      }
    }, 10);


  }

  public onSubmit() {
    if (this.myForm.invalid) {
      return;
    }

   this.modalPrd.showLoading("Verificando otp");
   const obj = this.myForm.value;

   this.cognitoUser.verificarMFA(`${obj.c1}${obj.c2}${obj.c3}${obj.c4}${obj.c5}${obj.c6}`).then((datos:CognitoResponse) =>{
      
    this.modalPrd.showMessageDialog({typeDialog:TYPE_DIALOG.SUCCESS,message:datos.mensaje}).then(datos =>{
      this.router.navigate(['/inicio']);
    });

   },(err:CognitoResponse) =>{

    this.modalPrd.showMessageDialog({typeDialog:TYPE_DIALOG.ERROR,message:err.mensaje});

   });

  }

}
