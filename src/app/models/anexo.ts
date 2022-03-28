import { anexoResponse } from "./anexoResponse";

export class Anexo {

  static anexoJSON(obj: anexoResponse) {
    return new Anexo(
      // obj['dni'],
      obj['nombre'],
      obj['codigo'],
      obj['empresa'],
      obj['firma_empresa'],
      obj['firma_centro'],
      obj['fecha'],
    );
  }

  constructor(
    // public dni: string,
    public nombre: string,
    public codigo: string,
    public empresa: string,
    public firma_empresa: number,
    public firma_centro: number,
    public fecha: string,
    //public anexos?: Anexo[]
  ) { }
}
