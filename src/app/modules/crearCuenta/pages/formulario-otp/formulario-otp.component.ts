import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario-otp',
  templateUrl: './formulario-otp.component.html',
  styleUrls: ['./formulario-otp.component.scss']
})
export class FormularioOtpComponent implements OnInit {
  @ViewChild("c2") inputc1!: ElementRef;
  @ViewChild("c3") inputc2!: ElementRef;
  @ViewChild("c4") inputc3!: ElementRef;
  @ViewChild("boton1") boton1!: ElementRef;
  public celular: String = ""
  public myForm!: FormGroup;
  public habilitado:boolean = false;
  public cargando:boolean = false;

  constructor(private fb: FormBuilder,private router:Router) { }

  ngOnInit(): void {
    let formulario = history.state.formulario || {};
    this.celular = formulario.celular;
    this.myForm = this.createForm();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      c1: ['0', Validators.required],
      c2: ['0', Validators.required],
      c3: ['0', Validators.required],
      c4: ['0', Validators.required]
    });
  }

  public get f(): any {
    return this.myForm.controls;
  }

  public tecla(evento: any, llave: string) {
   
    let valor = (!navigator.userAgent.toLowerCase().includes("android") && !navigator.userAgent.toLowerCase().includes("ios"))?evento.key:"";
    evento.preventDefault();
      this.myForm.controls[llave].setValue('0');
    setTimeout(() => {
      console.log(evento);
      if((!navigator.userAgent.toLowerCase().includes("android") && !navigator.userAgent.toLowerCase().includes("ios"))){
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
          this.habilitado = true;
          setTimeout(() => {
            this.boton1.nativeElement.focus();
          }, 10);
          break;
      }
     }, 10);
    

  }

  public onSubmit(){
      if(this.myForm.invalid){
          return;
      }

      this.cargando = true;
      setTimeout(() => {
        this.cargando = false;
        this.router.navigate(['/autenticacion/exito']);
      }, 1000);
  }

}
