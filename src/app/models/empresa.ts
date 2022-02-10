import { Alumno } from './alumno';
import { EmpresaResponse } from './empresaResponse';
import { Trabajador } from './trabajador';

export class Empresa {
  static empresaJSON(obj: EmpresaResponse) {
    return new Empresa(
      obj['id'],
      obj['cif'],
      obj['nombre'],
      obj['responsable'],
      obj['dni_responsable'],
      obj['email'],
      obj['telefono'],
      obj['localidad'],
      obj['provincia'],
      obj['direccion'],
      obj['cp'],
      obj['representante'],
      obj['alumnos']
    );
  }

  constructor(
    public id: string,
    public cif?: string,
    public nombre?: string,
    public responsable?: string,
    public dni_responsable?: string,
    public email?: string,
    public telefono?: string,
    public localidad?: string,
    public provincia?: string,
    public direccion?: string,
    public cp?: string,
    public representante?: Trabajador,
    public alumnos?: Alumno[]
  ) {}
}
