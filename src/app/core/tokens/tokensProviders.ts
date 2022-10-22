import { InjectionToken } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ModalLoading } from "../modelos/modales";
import { myTokenUserIndicator } from "./tokenRecurso";

export const MY_USER_TOKEN = new InjectionToken<myTokenUserIndicator>("myUserToken");
export const MY_MODAL_MESSAGE = new InjectionToken<BehaviorSubject<ModalLoading>>("myModalMessage");
