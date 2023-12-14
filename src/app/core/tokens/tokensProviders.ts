import { InjectionToken } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ModalLoading, ModalRespuesta } from "../modelos/modales";
import { myTokenUserIndicator } from "./tokenRecurso";
import { Colores } from "../modelos/usuarioLogin";

export const MY_USER_TOKEN = new InjectionToken<myTokenUserIndicator>("myUserToken");
export const MY_MODAL_MESSAGE = new InjectionToken<BehaviorSubject<ModalLoading>>("myModalMessage");
export const MY_MODAL_REPONSE = new InjectionToken<BehaviorSubject<ModalRespuesta>>("myModalReponse");
export const MY_USER_DATA = new InjectionToken<BehaviorSubject<any>>("myUserData");
export const MY_EMPRESA_DATA = new InjectionToken<BehaviorSubject<any>>("myEmpresaData");
export const MY_COLOR = new InjectionToken<BehaviorSubject<Colores>>("coloresUser");
