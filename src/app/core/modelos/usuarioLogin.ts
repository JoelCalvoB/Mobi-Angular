export interface Usuario {
    nombre: string,
    correo: string,
    empresa: string,
    rol: Rol;
}


export interface Rol {
    nombre: string,
    modulos: Modulo[];
}

export interface Modulo {
    nombre: string,
    icono: string,
    submodulo: Submodulo[];
}

export interface Submodulo {
    nombre: string,
    ruta: string,
    permisos: Permisos[]
}

export interface Permisos {
    id: number,
    nombre: string,
}