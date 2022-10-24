import { Injectable } from '@angular/core';


var AmazonCognitoIdentity = require('amazon-cognito-identity-js');


import {
	CognitoUserPool,
	CognitoUserAttribute,
	CognitoUser,
} from 'amazon-cognito-identity-js';



import { Auth } from 'aws-amplify';
import { CognitoResponse, TYPE_ERROR_COGNITO } from 'src/app/core/modelos/modeloCognito';
import { environment } from 'src/environments/environment';
var sessionUserAttributes:any;

@Injectable({
  providedIn: 'root'
})
export class AutenticacionCognitoService {
  
  private congnitouser!:CognitoUser;

  public get userCognito(){
    return this.congnitouser;
  }

  constructor() { }

  public registrarUsuario(username:string,numeroTelefono:string,password:string):Promise<CognitoResponse>{
      const promesa = new Promise<CognitoResponse>((resolve,reject)=>{
        var poolData = environment.configuracionCognito.jscognito;
        var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
        
        var attributeList = [];
        
        var dataEmail = {
          Name: 'email',
          Value: username,
        };
        
        var dataPhoneNumber = {
          Name: 'phone_number',
          Value: `+52${numeroTelefono}`,
        };
        var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
        var attributePhoneNumber = new AmazonCognitoIdentity.CognitoUserAttribute(
          dataPhoneNumber
        );
        
        attributeList.push(attributeEmail);
        attributeList.push(attributePhoneNumber);
        userPool.signUp(username, password, attributeList, null, function(
          err:any,
          result:any
        ) {
          if (err) {
            const respuesta = err.__type || JSON.stringify(err);
            console.log("ERROR registrarUsuario COGNITO",respuesta);
            const respuestaError:CognitoResponse = new CognitoResponse();
            respuestaError.type = err.code ;
            reject(respuestaError);
            return;
          }
          var cognitoUser = result.user;
          console.log("USUARIO REGISTRADO cognito",result);
          resolve(cognitoUser);
          console.log('user name is ' + cognitoUser.getUsername());
        });
      });

      
      return promesa;
    
  }

  public confirmarUsuario(codigoVerificacion:string):Promise<CognitoResponse>{
    const promesa = new Promise<CognitoResponse>((resolve,reject)=>{

      
  this.congnitouser.confirmRegistration(codigoVerificacion, true, function(err:any, result:any) {
    if (err) {
      console.log("err",err);
      const respuesta:CognitoResponse = new CognitoResponse();
      respuesta.type = "ExpiredCodeException";
      reject((respuesta));
      return;
    }
    console.log('call result: ' + result);
    resolve(result);
  });
    });

    return promesa;
    
  }

  public reenviarCodigoVerificacion(userName:string){
    var poolData = environment.configuracionCognito.jscognito;
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var userData = {
      Username: userName,
      Pool: userPool,
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.resendConfirmationCode(function(err:any, result:any) {
      if (err) {
        alert(err.message || JSON.stringify(err));
        return;
      }
      console.log('call result: ' + result);
    });
  }

  public loginuser(userName:string,password:string):Promise<CognitoResponse>{
    const promesa = new Promise<CognitoResponse>((resolve,reject)=>{
      var poolData = environment.configuracionCognito.jscognito;
      var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
      var userData = {
        Username: userName,
        Pool: userPool,
      };
      var authenticationData = {
        Username: userName,
        Password: password,
      };
      var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
        authenticationData
      );
      
      this.congnitouser = new AmazonCognitoIdentity.CognitoUser(userData);
      this.congnitouser.setAuthenticationFlowType('USER_PASSWORD_AUTH');
      let congnitouser = this.congnitouser;
      this.congnitouser.authenticateUser(authenticationDetails,{
        onSuccess: function(result) {
          var accessToken = result.getAccessToken().getJwtToken();
          console.log("OnSuccess",accessToken);
          const cognitoRespuesta:CognitoResponse = new CognitoResponse();
          cognitoRespuesta.type = "LoginExitoso";
          resolve(cognitoRespuesta);
        },
      
        onFailure: function(err) {
          console.log("onFailure",err);
          const reponseCognito:CognitoResponse = new CognitoResponse();
          reponseCognito.type = err.code;
          reject(reponseCognito);
        },
      
      
        selectMFAType: function(challengeName, challengeParameters) {
          var mfaType = prompt('Please select the MFA method.', '') || ''; // valid values for mfaType is "SMS_MFA", "SOFTWARE_TOKEN_MFA"
          console.log('selectMFAType');
          congnitouser.sendMFASelectionAnswer(mfaType, this);
        },
      
        totpRequired: function(secretCode) {
          var challengeAnswer = prompt('Please input the TOTP code.', '') || '';
          congnitouser.sendMFACode(challengeAnswer, this, 'SOFTWARE_TOKEN_MFA');
        },
      
        mfaRequired: function(codeDeliveryDetails) {
          console.log(codeDeliveryDetails);
          const reponseCognito:CognitoResponse = new CognitoResponse();
          reponseCognito.type = codeDeliveryDetails;
          resolve(reponseCognito);
         
        },
        newPasswordRequired: function(userAttributes, requiredAttributes) {
          const reponseCognito:CognitoResponse = new CognitoResponse();
          reponseCognito.type = "NewPassword";
          reponseCognito.datos = userAttributes;
          reject(reponseCognito);
      }
      })
    });
    return promesa;
  }

  public cambiandoPassword(newPassword:string,sessionUserAttributes:any):Promise<CognitoResponse>{

    delete sessionUserAttributes.phone_number_verified;
    delete sessionUserAttributes.phone_number;
    delete sessionUserAttributes.email;
    
    console.log("PasswordChanged",sessionUserAttributes);

    const promesa = new Promise<CognitoResponse>((resolve,reject)=>{

    this.congnitouser.completeNewPasswordChallenge(newPassword, sessionUserAttributes,{
      onSuccess(session, userConfirmationNecessary?) {
        console.log(session,userConfirmationNecessary);
        const cognito:CognitoResponse = new CognitoResponse();
        cognito.type = "PasswordChanged";
        resolve(cognito);
      },
      onFailure(err) {
        console.log(err);
        const cognito:CognitoResponse = new CognitoResponse();
        cognito.type = "Error";
        reject(cognito);
      },
    });
  });

  return promesa;

  }

  public verificarMFA(codigo:string):Promise<CognitoResponse>{
      const promesa = new Promise<CognitoResponse>((resolve,reject)=>{
        this.congnitouser.sendMFACode(codigo,{
          onSuccess:(result)=>{

            const cognito:CognitoResponse = new CognitoResponse();
            cognito.type = "CodigoCorrectoVerificacionMFA";
            cognito.datos = result;
            resolve(cognito);

          },
          onFailure(err) {
              const cognito:CognitoResponse = new CognitoResponse();
              cognito.type = err.code;
              reject(cognito);
          },
        });
      });
      return promesa;
  }
}
