export const environment = {
  production: true,
  urlAdmin: "http://ec2-54-170-164-250.eu-west-1.compute.amazonaws.com:3000",
  configuracionCognito:{
    Auth:  {
      userPoolId: 'us-east-2_m8LZLLjoI',
      userPoolWebClientId: '2c26av0fl2vt8v8k823o8jsphg',

    },
    jscognito:{
      UserPoolId: 'us-east-2_m8LZLLjoI', 
      ClientId: '2c26av0fl2vt8v8k823o8jsphg'
    }
  }
};
