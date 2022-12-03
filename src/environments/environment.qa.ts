export const environment = {
    urlAdmin: "http://ec2-54-170-164-250.eu-west-1.compute.amazonaws.com:3000",
    urlVersion1App:"urlNube",
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