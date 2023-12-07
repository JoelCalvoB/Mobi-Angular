import { TYPEOUTPUT } from "src/app/shared/constantes/constantesyfunciones";

export interface Tabla{
  columnas:Propiedad[],
  datos:any
}


export interface Propiedad{
  identificador?:string,
  nombre?:string
}

export interface Salidatabla{
  type:TYPEOUTPUT;
  datos:any,
  index?:number
}
