import { grupoResponse } from './grupoResponse';

export class Grupo {
  static grupoJSON(obj: grupoResponse) {
    return new Grupo(obj['cod'], obj['nombre_ciclo']);
  }

  constructor(public cod: string, public nombre_ciclo: string) {}
}
