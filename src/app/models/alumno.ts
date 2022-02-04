import { alumnoResponse } from "./alumnoResponse";

export class Alumno {

  static alumnoJSON(obj: alumnoResponse) {
    return new Alumno(
      obj['nombre'],
      obj['dni']
    );
  }

  constructor(
    public nombre: string,
    public dni: string
  ) { }
}
