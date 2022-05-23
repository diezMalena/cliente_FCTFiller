import { ConvenioResponse } from './convenioResponse';

export class Convenio {
  static empresaJSON(obj: ConvenioResponse) {
    return new Convenio(
      obj['cod_convenio'],
      obj['cod_centro'],
      obj['id_empresa'],
      obj['fecha_ini'],
      obj['fecha_fin']
    );
  }

  constructor(
    public cod_convenio: string,
    public cod_centro: string,
    public id_empresa: number,
    public fecha_ini: Date | null,
    public fecha_fin: Date | null
  ) {}

  public isRenovable(): boolean {
    if (this.fecha_fin) {
      var diff_ms = Date.now() - new Date(this.fecha_fin).getTime();
      var age_dt = new Date(diff_ms);

      console.log(Math.abs(age_dt.getUTCFullYear() - 1970) < 1);
      return Math.abs(age_dt.getUTCFullYear() - 1970) < 1;
    } else {
      return false;
    }
  }
}
