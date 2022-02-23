import { usuarioResponse } from "./usuarioRespose";


export class Usuario {

  static usuarioJSON(obj: usuarioResponse) {
    return new Usuario(
      obj['email'],
      obj['nombre'],
      obj['apellidos'],
      obj['dni'],
      obj['tipo'],
      obj['roles'],
      obj['token'],
    );
  }

  constructor(
    public email: string,
    public nombre: string,
    public apellidos: string,
    public dni?: string,
    public tipo?: string,
    public roles?: Array<any>,
    public token?: string
  ) { }

  public isDirector(): boolean {
    return this.tipo === 'profesor' && this.roles!.find(rol => rol.id_rol === 1) != undefined;
  }

  public isJefatura(): boolean {
    return this.tipo === 'profesor' && this.roles!.find(rol => rol.id_rol === 2) != undefined;
  }

  public isTutor(): boolean {
    return this.tipo === 'profesor' && this.roles?.find(rol => rol.id_rol === 3) != undefined;
  }

  public isRepresentante(): boolean {
    return this.tipo === 'trabajador' && this.roles!.find(rol => rol.id_rol === 1) != undefined;
  }

  public isResponsable(): boolean {
    return this.tipo === 'responsable' && this.roles!.find(rol => rol.id_rol === 2) != undefined;
  }

  public isTutorEmpresa(): boolean {
    return this.tipo === 'tutor' && this.roles?.find(rol => rol.id_rol === 3) != undefined;
  }

  public isProfesor(): boolean {
    return this.tipo === 'profesor';
  }

  public isTrabajador(): boolean {
    return this.tipo === 'trabajador';
  }

  public isAlumno(): boolean {
    return this.tipo === 'alumno';
  }

}
