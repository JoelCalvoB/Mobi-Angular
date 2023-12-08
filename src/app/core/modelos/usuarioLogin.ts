export interface Usuario {
    nombre: string,
    correo: string,
    empresa: string,
    rol: Rol;
}


export interface Rol {
    nombre: string,
    modulos: Modulo[],
    empresas:Empresa
}

export interface Modulo {
  idModulo:number,
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
    esActivo:boolean,
    seleccionado:boolean,
    idSubmodulo:number
}

export interface Permisos {
    id: number,
    nombre: string,
    esActivo:boolean,
    seleccionado:boolean
}

export interface Empresa{
  idEmpresa:Number,
  isCliente:boolean,
  nombre:string,
  razonSocial:string,
  versiones:Versiones[]
}


export interface Versiones{
     idVersion:number;
     nombre:string;
     nombrecorto:string;
     esCliente:boolean;
     esActivo:boolean;
     empresas:Empresa[];
     modulos:Modulo[];
}
