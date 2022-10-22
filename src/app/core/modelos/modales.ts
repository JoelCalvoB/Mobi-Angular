export enum TYPE_DIALOG{
    LOADING,
    ERROR,
    SUCCESS,
    QUESTION,
    WARNING,
    NOTHING
}


export interface ModalLoading{
    visible?:boolean,
    message:string,
    typeDialog:TYPE_DIALOG;
}

export interface ModalRespuesta{
    datos:any;
    type:TYPE_DIALOG;
}