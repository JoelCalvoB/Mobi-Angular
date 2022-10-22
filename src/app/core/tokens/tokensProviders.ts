import { InjectionToken } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ModalLoading, ModalRespuesta } from "../modelos/modales";
import { myTokenUserIndicator } from "./tokenRecurso";

export const MY_USER_TOKEN = new InjectionToken<myTokenUserIndicator>("myUserToken");
export const MY_MODAL_MESSAGE = new InjectionToken<BehaviorSubject<ModalLoading>>("myModalMessage");
export const MY_MODAL_REPONSE = new InjectionToken<BehaviorSubject<ModalRespuesta>>("myModalReponse");
