import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { TYPE_DIALOG } from 'src/app/core/modelos/modales';
import { Usuario } from 'src/app/core/modelos/usuarioLogin';
import { MY_USER_DATA } from 'src/app/core/tokens/tokensProviders';
import { EmpresasService } from 'src/app/shared/services/empresas.service';
import { GeneralesService } from 'src/app/shared/services/generales.service';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'app-clientes-detalle',
  templateUrl: './clientes-detalle.component.html',
  styleUrls: ['./clientes-detalle.component.scss'],
})
export class ClientesDetalleComponent implements OnInit {
  toppings = new FormControl('');

  toppingList: string[] = [
    'Extra cheese',
    'Mushroom',
    'Onion',
    'Pepperoni',
    'Sausage',
    'Tomato',
  ];

  public myForm!: FormGroup;
  public usuario!: Usuario;

  constructor(
    private fb: FormBuilder,
    private empresasPrd: EmpresasService,
    private modalPrd: ModalService,
    @Inject(MY_USER_DATA) private userPrd: BehaviorSubject<any>,
    private generalesPrd:GeneralesService
  ) {}

  ngOnInit() {
    this.myForm = this.createForm();

    this.userPrd.subscribe((datos) => {
      console.log('santiago', datos);
      this.usuario = datos;
    });
  }


  public cancelar(){
    history.back();
  }

  private createForm() {
    return this.fb.group({
      nombre: ['', Validators.required],
      rfc: ['', [Validators.required]],
      razonSocial: ['', [Validators.required]],
      esCliente: [false, Validators.required],
      version: [],
    });
  }

  public comeback() {
    history.back();
  }

  public get f(): { [key: string]: AbstractControl } {
    return this.myForm.controls;
  }
  public enviar() {

    if (this.myForm.invalid) {
      Object.values(this.myForm.controls).forEach((control) => {
        control.markAllAsTouched();
      });

      return;
    }

    this.guardar();
  }

  public mostrarmenu(){
    this.generalesPrd.showMenu();
  }

  private guardar() {


    this.modalPrd
      .showMessageDialog({
        message: '¿Deseas guardar el registro?',
        typeDialog: TYPE_DIALOG.QUESTION,
      })
      .then((msj) => {
        if (msj.datos) {
          this.modalPrd.showLoading('Guardando registro');
          const request = {
            ...this.myForm.value,
            version: [
              ...this.myForm.value.version.map((s: any) => {
                return { idVersion: s };
              }),
            ],
          };
          this.empresasPrd.guardar(request).subscribe((datos) => {
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
}
