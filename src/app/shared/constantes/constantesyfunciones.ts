export function proxyPropiedad<TObj>(obj?: TObj) {
  return new Proxy({}, {
      get: (_, prop) => prop,
      set: () => {
      throw Error('Set not supported');
      },
  }) as {
      [P in keyof TObj]?: P;
  };
}



export enum TYPEOUTPUT{
  DELETE,
  INSERT,
  VIEW,
  UPDATE,
  SUSCRIBE,
  DETAILS
}
