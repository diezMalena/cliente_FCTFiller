import { alumnoResponse } from "./alumnoResponse";

export class Alumno {

  static alumnoJSON(obj: alumnoResponse) {
    return new Alumno(
      obj['nombre'],
      obj['dni'],
      obj['va_a_fct'],
      obj['horario'],
      obj['fecha_ini'],
      obj['fecha_fin'],
    );
  }

  constructor(
    public nombre: string,
    public dni: string,
    public va_a_fct: BigInteger,
    public horario?: string,
    public fecha_ini?: Date,
    public fecha_fin?: Date
  ) { }
}
