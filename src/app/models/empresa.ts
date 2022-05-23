import { Alumno } from './alumno';
import { Convenio } from './convenio';
import { EmpresaResponse } from './empresaResponse';
import { Trabajador } from './trabajador';

export class Empresa {
  static empresaJSON(obj: EmpresaResponse) {
    return new Empresa(
      obj['id'],
      obj['cif'],
      obj['nombre'],
      obj['email'],
      obj['telefono'],
      obj['localidad'],
      obj['provincia'],
      obj['direccion'],
      obj['cp'],
      obj['representante'],
      obj['nombre_responsable'],
      obj['dni_responsable'],
      obj['alumnos'],
      obj['convenio']
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
    public nombre_responsable?: string,
    public dni_responsable?: string,
    public alumnos?: Alumno[],
    public convenio?: Convenio | null
  ) {}

  public isConvenioRenovable() {
    if (this.convenio) {
      if (this.convenio.fecha_fin) {
        var diff_ms = Date.now() - new Date(this.convenio.fecha_fin).getTime();
        var age_dt = new Date(diff_ms);

        console.log(Math.abs(age_dt.getUTCFullYear() - 1970) < 1);
        return Math.abs(age_dt.getUTCFullYear() - 1970) < 1;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
