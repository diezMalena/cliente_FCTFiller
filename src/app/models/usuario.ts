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
      //DSB Cambio 10-03-2022: Añadido codigo de centro de estudios
      obj['cod_centro'],
      obj['cod_grupo'],
      obj['curso_academico']
    );
  }

  constructor(
    public email: string,
    public nombre: string,
    public apellidos: string,
    public dni?: string,
    public tipo?: string,
    public roles?: Array<any>,
    public token?: string,
    //DSB Cambio 10-03-2022: Añadido codigo de centro de estudios
    public cod_centro?: string,
    public cod_grupo?: string,
    public curso_academico?: string
  ) { }

  /**
  * Esta función devuelve true si el usuario es profesor y director
  * @author Alvaro <alvarosantosmartin6@gmail.com> Dani <daniel.jimenezcoello@gmail.com>
  */
  public isDirector(): boolean {
    return this.tipo === 'profesor' && this.roles!.find(rol => rol.id_rol === 1) != undefined;
  }

  /**
  * Esta función devuelve true si el usuario es profesor y de jefatura
  * @author Alvaro <alvarosantosmartin6@gmail.com> Dani <daniel.jimenezcoello@gmail.com>
  */
  public isJefatura(): boolean {
    return this.tipo === 'profesor' && this.roles!.find(rol => rol.id_rol === 2) != undefined;
  }

  /**
  * Esta función devuelve true si el usuario es profesor y tutor
  * @author Alvaro <alvarosantosmartin6@gmail.com> Dani <daniel.jimenezcoello@gmail.com>
  */
  public isTutor(): boolean {
    return this.tipo === 'profesor' && this.roles?.find(rol => rol.id_rol === 3) != undefined;
  }

  /**
  * Esta función devuelve true si el usuario es trabajador y representante
  * @author Alvaro <alvarosantosmartin6@gmail.com> Dani <daniel.jimenezcoello@gmail.com>
  */
  public isRepresentante(): boolean {
    return this.tipo === 'trabajador' && this.roles!.find(rol => rol.id_rol === 1) != undefined;
  }

  /**
  * Esta función devuelve true si el usuario es trabajador y responsable
  * @author Alvaro <alvarosantosmartin6@gmail.com> Dani <daniel.jimenezcoello@gmail.com>
  */
  public isResponsable(): boolean {
    return this.tipo === 'trabajador' && this.roles!.find(rol => rol.id_rol === 2) != undefined;
  }

  /**
  * Esta función devuelve true si el usuario es trabajador y tutor
  * @author Alvaro <alvarosantosmartin6@gmail.com> Dani <daniel.jimenezcoello@gmail.com>
  */
  public isTutorEmpresa(): boolean {
    return this.tipo === 'trabajador' && this.roles?.find(rol => rol.id_rol === 3) != undefined;
  }

  /**
  * Esta función devuelve true si el usuario es profesor
  * @author Alvaro <alvarosantosmartin6@gmail.com> Dani <daniel.jimenezcoello@gmail.com>
  */
  public isProfesor(): boolean {
    return this.tipo === 'profesor';
  }

  /**
  * Esta función devuelve true si el usuario es trabajador
  * @author Alvaro <alvarosantosmartin6@gmail.com> Dani <daniel.jimenezcoello@gmail.com>
  */
  public isTrabajador(): boolean {
    return this.tipo === 'trabajador';
  }

  /**
  * Esta función devuelve true si el usuario es alumno
  * @author Alvaro <alvarosantosmartin6@gmail.com> Dani <daniel.jimenezcoello@gmail.com>
  */
  public isAlumno(): boolean {
    return this.tipo === 'alumno';
  }

}
