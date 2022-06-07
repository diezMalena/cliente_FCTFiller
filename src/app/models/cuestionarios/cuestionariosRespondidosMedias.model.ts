export class CuestionariosRespondidosMediasModel {

  name!: string;
  value!: number;

  setCuestionario(_cuestionario: unknown) {
    const cuestionarioRespondidoMedia = _cuestionario as CuestionariosRespondidosMediasModel;
    this.name = cuestionarioRespondidoMedia.name || '' ;
    this.value = cuestionarioRespondidoMedia.value || 0 ;
  }
}
