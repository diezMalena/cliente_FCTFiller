import { Alumno } from "./alumno";
import { empresaResponse } from "./empresaResponse";

export class Empresa {

  static empresaJSON(obj: empresaResponse) {
    return new Empresa(
      obj['id'],
      obj['nombre'],
      obj['alumnos']
    );
  }

  constructor(
    public id: string,
    public nombre: string,
    public alumnos?: Alumno[]
  ) { }
}
