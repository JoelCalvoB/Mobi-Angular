export interface Usuario {
    nombre: string,
    correo: string,
    empresa: string,
    rol: Rol;
}


export interface Rol {
    nombre: string,
    modulos: Modulo[];
    empresas:Empresa
}

export interface Modulo {
    nombre: string,
    icono: string,
    seleccionado:boolean;
    submodulos: Submodulo[];
}

export interface Submodulo {
    nombre: string,
    ruta: string,
    permisos: Permisos[]
    visible:boolean;
}

export interface Permisos {
    id: number,
    nombre: string,
}

export interface Empresa{
  idEmpresa:Number,
  isCliente:boolean,
  nombre:string,
  razonSocial:string
}
