import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidator {
 

    static checkPasswords(group: AbstractControl) {
        let pass= group.get('password')!.value;
        let pass2= group.get('validpassword')!.value;
        if(pass2==null || pass2=="") return;
        if (pass !== pass2 ){
          group.get('validpassword')!.setErrors({noIguales:true})
         return  {noIguales:true}
        }
    
        group.get('validpassword')!.setErrors(null);
        return null;
    
      }


      static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
          if (!control.value) {
            // if control is empty return no error
            return null!;
          }
    
          // test the value of the control against the regexp supplied
          const valid = regex.test(control.value);
    
          // if true, return no error (no error), else return error passed in the second parameter
          return valid ? null! : error;
        };
    }
    



}
