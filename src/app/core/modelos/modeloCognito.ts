export class CognitoResponse {
    private _typeError!: TYPE_ERROR_COGNITO;

    private _datos: any;

    public get datos() {
        return this._datos;
    }

    public set datos(valor: any) {
        this._datos = valor;
    }

    set type(error: string) {
        switch (error) {
            case "LimitExceededException":
                this._typeError = TYPE_ERROR_COGNITO.LimitExceededException;
                break;
            case "NotAuthorizedException":
                this._typeError = TYPE_ERROR_COGNITO.NotAuthorizedException;
                break;
            case "CodeDeliveryFailureException":
                this._typeError = TYPE_ERROR_COGNITO.CodeDeliveryFailureException;
                break;
            case "UserNotConfirmedException":
                this._typeError = TYPE_ERROR_COGNITO.UserNotConfirmedException;
                break;
            case "NewPassword":
                this._typeError = TYPE_ERROR_COGNITO.NewPassword;
                break;
            case "PasswordChanged":
                this._typeError = TYPE_ERROR_COGNITO.PasswordChanged;
                break;
            case "Error":
                this._typeError = TYPE_ERROR_COGNITO.Error;
                break;
            case "LoginExitoso":
                this._typeError = TYPE_ERROR_COGNITO.LoginExitoso;
                break;
            case "SMS_MFA":
                this._typeError = TYPE_ERROR_COGNITO.SMS_MFA;
                break;
            case "ExpiredCodeException":
                this._typeError = TYPE_ERROR_COGNITO.ExpiredCodeException;
                break;
            case "CodeMismatchException":
                this._typeError = TYPE_ERROR_COGNITO.CodeMismatchException;
                break;
                case "CodigoCorrectoVerificacionMFA":
                    this._typeError = TYPE_ERROR_COGNITO.CodigoCorrectoVerificacionMFA;
                    break;
            default:
                this._typeError = TYPE_ERROR_COGNITO.nothing;
        }
    }

    public get TypeError() {
        return this._typeError;
    }

    get mensaje() {
        let respuesta: string;
        switch (this._typeError) {
            case TYPE_ERROR_COGNITO.LimitExceededException:
                respuesta = "Se ha excedido el límite de envios por día, favor de esperar.";
                break;
            case TYPE_ERROR_COGNITO.NotAuthorizedException:
                respuesta = "Usuario y/o Contraseña Inválidos";
                break;
            case TYPE_ERROR_COGNITO.CodeDeliveryFailureException:
                respuesta = "Los datos proporcionados serán validado y se le enviara un correo de confirmación para poder ingresar al aplicativo.";
                break;
            case TYPE_ERROR_COGNITO.UserNotConfirmedException:
                respuesta = "Datos en proceso de confirmación, se le enviara un correo cuando esten verificados.";
                break;
            case TYPE_ERROR_COGNITO.NewPassword:
                respuesta = "Es necesario cambiar la contraseña para continuar.";
                break;
            case TYPE_ERROR_COGNITO.PasswordChanged:
                respuesta = "Contraseña actualizada correctamente.";
                break;
            case TYPE_ERROR_COGNITO.Error:
                respuesta = "Error.";
                break;
            case TYPE_ERROR_COGNITO.LoginExitoso:
                respuesta = "Inicio de sesión correctamente, disfrute de la aplicación.";
                break;
            case TYPE_ERROR_COGNITO.SMS_MFA:
                respuesta = "Se le envio un código de seguridad a su número telefónico";
                break;
            case TYPE_ERROR_COGNITO.ExpiredCodeException:
                respuesta = "Código incorrecto o a expirado, favor de intentarlo de nuevo.";
                break;
            case TYPE_ERROR_COGNITO.CodeMismatchException:
                respuesta = "Código incorrecto o a expirado, favor de intentarlo de nuevo.";
                break
                case TYPE_ERROR_COGNITO.CodigoCorrectoVerificacionMFA:
                    respuesta = "Código de verificación de indentidad correcto, Disfrute de Atiendelos APP.";
                    break
            default:
                respuesta = "";
        }

        return respuesta;
    }


}

export enum TYPE_ERROR_COGNITO {
    LimitExceededException,
    NotAuthorizedException,
    CodeDeliveryFailureException,
    UserNotConfirmedException,
    NewPassword,
    PasswordChanged,
    Error,
    LoginExitoso,
    SMS_MFA,
    ExpiredCodeException,
    CodeMismatchException,
    CodigoCorrectoVerificacionMFA,
    nothing
}