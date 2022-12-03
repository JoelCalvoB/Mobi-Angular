// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  urlAdmin: "http://ec2-54-170-164-250.eu-west-1.compute.amazonaws.com:3000",
  urlVersion1App:"http://localhost:8100",
  production: false,
  configuracionCognito:{
    Auth:  {
      userPoolId: 'us-east-2_st7cmLrFP',
      userPoolWebClientId: 'e75dhjuab2thgshsrhrm98qb9',

    },
    jscognito:{
      UserPoolId: 'us-east-2_st7cmLrFP', 
      ClientId: 'e75dhjuab2thgshsrhrm98qb9'
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
