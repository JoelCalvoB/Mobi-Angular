import { Injectable } from '@angular/core';


var AmazonCognitoIdentity = require('amazon-cognito-identity-js');


import {
	CognitoUserPool,
	CognitoUserAttribute,
	CognitoUser,
} from 'amazon-cognito-identity-js';



import { Auth } from 'aws-amplify';
import { environment } from 'src/environments/environment';
var sessionUserAttributes:any;

@Injectable({
  providedIn: 'root'
})
export class AutenticacionCognitoService {
  
  private congnitouser!:CognitoUser;

  constructor() { }

  public registrarUsuario(username:string,numeroTelefono:string,password:string):Promise<string | any>{
      const promesa = new Promise((resolve,reject)=>{
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
            reject(err.message || JSON.stringify(err));
            return;
          }
          var cognitoUser = result.user;
          resolve(cognitoUser);
          console.log('user name is ' + cognitoUser.getUsername());
        });
      });

      
      return promesa;
    
  }

  public confirmarUsuario(userName:string,codigoVerificacion:string){
    var poolData = environment.configuracionCognito.jscognito;
    var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    var userData = {
      Username: userName,
      Pool: userPool,
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
cognitoUser.confirmRegistration(codigoVerificacion, true, function(err:any, result:any) {
	if (err) {
		alert(err.message || JSON.stringify(err));
		return;
	}
	console.log('call result: ' + result);
});
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

  public loginuser(userName:string,password:string){
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
    let mm = this.reenviarCodigoVerificacion;

    this.congnitouser.authenticateUser(authenticationDetails,{
      onSuccess: function(result) {
        var accessToken = result.getAccessToken().getJwtToken();
      },
    
      onFailure: function(err) {
        console.log("ERROR");
        alert(err.message || JSON.stringify(err));
      },
    
    
      selectMFAType: function(challengeName, challengeParameters) {
        var mfaType = prompt('Please select the MFA method.', '') || ''; // valid values for mfaType is "SMS_MFA", "SOFTWARE_TOKEN_MFA"
        congnitouser.sendMFASelectionAnswer(mfaType, this);
      },
    
      totpRequired: function(secretCode) {
        var challengeAnswer = prompt('Please input the TOTP code.', '') || '';
        congnitouser.sendMFACode(challengeAnswer, this, 'SOFTWARE_TOKEN_MFA');
      },
    
      mfaRequired: function(codeDeliveryDetails) {
        console.log(codeDeliveryDetails);
        var verificationCode = prompt('codigo de verificacion', '') || '';
        congnitouser.sendMFACode(verificationCode, this);
      },
      newPasswordRequired: function(userAttributes, requiredAttributes) {
        // User was signed up by an admin and must provide new
        // password and required attributes, if any, to complete
        // authentication.

        // the api doesn't accept this field back
        delete userAttributes.email_verified;

        // store userAttributes on global variable
        sessionUserAttributes = userAttributes;
        console.log("email verificado",userAttributes);

        
        
    }
    })
  }

  public cambiandoPassword(userName:string,newPassword:string){
   

    
    delete sessionUserAttributes.phone_number_verified;
    delete sessionUserAttributes.phone_number;
    delete sessionUserAttributes.email;
    console.log(sessionUserAttributes);



    this.congnitouser.completeNewPasswordChallenge(newPassword, sessionUserAttributes,{
      onSuccess(session, userConfirmationNecessary?) {
        console.log(session,userConfirmationNecessary);
      },
      onFailure(err) {
        console.log(err);
      },
    });

  }
}
