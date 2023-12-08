import { Modulo, Versiones } from './../../../../core/modelos/usuarioLogin';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TYPE_DIALOG } from 'src/app/core/modelos/modales';
import { ModalService } from 'src/app/shared/services/modal.service';
import { VersionesServices } from 'src/app/shared/services/versiones.services';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import { RolesService } from 'src/app/shared/services/roles.service';
import { GeneralesService } from 'src/app/shared/services/generales.service';


@Component({
  selector: 'app-add-roles',
  templateUrl: './add-roles.component.html',
  styleUrls: ['./add-roles.component.scss']
})
export class AddRolesComponent implements OnInit {

  @ViewChild(MatAccordion) accordion!: MatAccordion;
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  public value:string = "";
  public modulos:Versiones[] = [];
  public myForm!:FormGroup;
  constructor(private versiones:VersionesServices,private fb:FormBuilder,private modalPrd:ModalService,
    private rolesPrd:RolesService,private generalesPrd:GeneralesService) { }

  ngOnInit(): void {
      this.versiones.getModulos().subscribe(datos =>{
        console.log(datos);
        this.modulos = datos;
      });


      this.myForm = this.createForm();

  }

  private createForm(){
    return this.fb.group({
      'rol':['',Validators.required]
    });
  }

  public comeback(){
        history.back();
  }

  public enviar(){
    if(this.myForm.invalid){
      Object.values(this.myForm.controls).forEach(control =>{
        control.markAllAsTouched();
      });

      return;
    }

    this.modalPrd.showMessageDialog({message:'',typeDialog:TYPE_DIALOG.QUESTION}).then(datos =>{
      if(datos.datos){

         const request = {
            nombre : this.myForm.value.rol,
            permisosxsubmodulos:[...this.modulos.map(s =>{

              const arregloPermisos:any = [];

               s.modulos.forEach(modulos =>{
                modulos.submodulos.forEach(submodulo =>{
                  if(submodulo.seleccionado){

                    submodulo.permisos.forEach(permiso =>{
                      if(permiso.seleccionado){
                        const requestpermisosmodulos = {
                          permiso : {
                               id:permiso.id
                          },
                          submodulo:{
                            idSubmodulo:submodulo.idSubmodulo
                          },
                          modulo:{
                            idModulo : modulos.idModulo
                          }
                         }
                         arregloPermisos.push(requestpermisosmodulos);
                      }
                     });
                  }

                });
               });
               return arregloPermisos;

            })]
         }

         this.modalPrd.showLoading("Guardando registro");
         this.rolesPrd.guardar(request).subscribe(datos =>{
             this.modalPrd.showMessageDialog({message:"Registro guardado con éxito",typeDialog:TYPE_DIALOG.SUCCESS});
             history.back();
         });

         console.log("Lo que se va a enviar",request);
      }
    });
  }


  public get f():AbstractControl{
    return this.myForm.controls["rol"];
  }

  public mostrarmenu(){
    this.generalesPrd.showMenu();
  }


  public cancelar(){
    history.back();
  }
}
