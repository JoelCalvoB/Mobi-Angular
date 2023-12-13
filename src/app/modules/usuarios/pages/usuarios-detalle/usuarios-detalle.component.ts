import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TYPE_DIALOG } from 'src/app/core/modelos/modales';
import { Rol } from 'src/app/core/modelos/usuarioLogin';
import { GeneralesService } from 'src/app/shared/services/generales.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { RolesService } from 'src/app/shared/services/roles.service';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';

@Component({
  selector: 'app-usuarios-detalle',
  templateUrl: './usuarios-detalle.component.html',
  styleUrls: ['./usuarios-detalle.component.scss'],
})
export class UsuariosDetalleComponent implements OnInit {
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };
  public myForm!: FormGroup;

  public roles:Rol[] = [];

  constructor(private generalesPrd: GeneralesService,private fb:FormBuilder,private rolesPrd:RolesService,
    private usuariosPrd:UsuariosService,private modalPrd:ModalService) {}

  ngOnInit() {



    this.myForm = this.createForm();

    this.rolesPrd.getRoles().subscribe((datos:any) =>{
      this.roles = datos;
    });

  }

  private createForm(){
    return this.fb.group({
      nombre:['',Validators.required],
      primerApellido:['',Validators.required],
      segundoApellido:['',Validators.required],
      correo:['',Validators.required],
      telefono:['',Validators.required],
      fechaNacimiento:['',Validators.required],
      password:['',Validators.required],
      rol: this.fb.group({
          id:['',Validators.required]
      }),
    });
  }

  public comeback() {
    history.back();
  }

  public mostrarmenu() {
    this.generalesPrd.showMenu();
  }

  public get f(): {[key: string]: AbstractControl} {
    return this.myForm.controls;
  }

  public enviar() {


    if(this.myForm.invalid){


      Object.values(this.myForm.controls).forEach(control =>{
        control.markAllAsTouched();
      });

      return;
    }

    this.guardar();

  }


  public guardar(){
    console.log(this.myForm.value);
    this.modalPrd.showMessageDialog({message:'¿Deseas guardar el registro?',typeDialog:TYPE_DIALOG.QUESTION}).then(question =>{
      if(question.datos){
         this.modalPrd.showLoading("Registrando datos");
         this.usuariosPrd.guardar(this.myForm.value).subscribe(datos =>{
          console.log('Empresa guardada con exito', datos);
          this.modalPrd.showMessageDialog({
            message: 'Registro guardado con éxito',
            typeDialog: TYPE_DIALOG.SUCCESS,
          });
          history.back();
         });
      }
    });
  }

  public cancelar(){
    history.back();
  }
}
