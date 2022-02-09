import { anexoResponse } from "./anexoResponse";

export class Anexo {

  static anexoJSON(obj: anexoResponse) {
    return new Anexo(
      // obj['dni'],
      obj['codigo'],
      obj['nombre'],
      obj['empresa'],
      obj['firma_empresa'],
      obj['firma_instituto'],
    );
  }

  constructor(
    // public dni: string,
    public codigo: string,
    public nombre: string,
    public empresa: string,
    public firma_empresa: string,
    public firma_instituto: string,
    public anexos?: Anexo[]
  ) { }
}
