import { usuarioResponse } from "./usuarioRespose";


export class Usuario {

  static usuarioJSON(obj: usuarioResponse) {
    return new Usuario(
      obj['email'],
      obj['nombre'],
      obj['dni'],
      obj['token'],
      obj['roles']
    );
  }

  constructor(
    public email: string,
    public nombre: string,
    public dni?: string,
    public token?: string,
    public roles?: []
  ) { }
}
