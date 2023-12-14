import { Colores, Empresa } from './../../../../core/modelos/usuarioLogin';
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
import { MY_COLOR, MY_EMPRESA_DATA, MY_USER_DATA } from 'src/app/core/tokens/tokensProviders';
import { EmpresasService } from 'src/app/shared/services/empresas.service';
import { GeneralesService } from 'src/app/shared/services/generales.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';

@Component({
  selector: 'app-clientes-detalle',
  templateUrl: './clientes-detalle.component.html',
  styleUrls: ['./clientes-detalle.component.scss'],
})
export class ClientesDetalleComponent implements OnInit {
  toppings = new FormControl('');

  panelOpenState = false;

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
  public vista:boolean = false;

  public usuarios:Usuario[] = [];

  public empresa!:Empresa;

  constructor(
    private fb: FormBuilder,
    private empresasPrd: EmpresasService,
    private modalPrd: ModalService,
    @Inject(MY_USER_DATA) private userPrd: BehaviorSubject<any>,
    private generalesPrd:GeneralesService,
    @Inject(MY_COLOR) private colores:BehaviorSubject<Colores>,
    private usuariosPrd:UsuariosService,
    @Inject(MY_EMPRESA_DATA) private empresaPrd:BehaviorSubject<Empresa>,
  ) {}

  ngOnInit() {
    this.myForm = this.createForm();

    this.userPrd.subscribe((datos) => {
      console.log('santiago', datos);
      this.usuario = datos;
    });
    this.empresaPrd.subscribe(datos =>{
      this.empresa = datos;
    });

    this.usuariosPrd.getAll().subscribe(datos =>{
        this.usuarios = datos;
    });
  }


  public cancelar(){
    history.back();
  }

  private createForm() {
    return this.fb.group({
      foto:[''],
      nombre: ['', Validators.required],
      rfc: ['', [Validators.required]],
      razonSocial: ['', [Validators.required]],
      esCliente: [false, Validators.required],
      version: ['',Validators.required],
      colorprimario:['#fc4a4a'],
      colorsecundario:['#f4f2f2'],
      usuarios:['',Validators.required]
    });
  }

  public comeback() {
    history.back();
  }

  public get f(): { [key: string]: AbstractControl } {
    return this.myForm.controls;
  }
  public enviar() {

    console.log("Guardar",this.myForm.controls);

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
            usuarios: [
              ...this.myForm.value.usuarios.map((s: any) => {
                return { id: s };
              }),
            ]
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

  public vistaPrevia(){
    const defadefectoult = {fondo:'#f4f2f2',primario:'#fc4a4a'}
    this.vista = !this.vista;
      if(!this.vista){
        this.colores.next(defadefectoult);
      }else{
        this.colores.next({primario:this.myForm.value.colorprimario,fondo:this.myForm.value.colorsecundario});
      }

  }
}
