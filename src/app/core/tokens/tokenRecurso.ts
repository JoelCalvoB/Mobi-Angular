import { Usuario } from "../modelos/usuarioLogin";

export class myTokenUserIndicator{
    private _usuario!:Usuario;
    constructor(){}
    public get getValue(){
        return this._usuario;
    }

    public set setValue(obj:Usuario){
        this._usuario = obj;
    }
}