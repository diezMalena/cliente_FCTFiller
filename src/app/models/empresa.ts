import { Alumno } from "./alumno";
import { empresaResponse } from "./empresaResponse";
import { Trabajador } from "./trabajador";

export class Empresa {

  static empresaJSON(obj: empresaResponse) {
    return new Empresa(
      obj['id'],
      obj['cif'],
      obj['email'],
      obj['telefono'],
      obj['localidad'],
      obj['provincia'],
      obj['direccion'],
      obj['cp'],
      obj['nombre'],
      obj['representante'],
      obj['alumnos']
    );
  }

  constructor(
    public id: string,
    public cif: string,
    public nombre: string,
    public email: string,
    public telefono: string,
    public localidad: string,
    public provincia: string,
    public direccion: string,
    public cp: string,
    public representante?: Trabajador,
    public alumnos?: Alumno[]
  ) { }
}
