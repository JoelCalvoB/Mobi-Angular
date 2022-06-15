export interface ObjetoEmitidoModalArchivos{
    type:ACCIONES_MODALARCHIVOS;
    datos?:any;
    
}

export enum ACCIONES_MODALARCHIVOS {
    CANCELAR,
    SUBIRARCHIVO
  }