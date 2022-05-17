import { RespuestaModel } from "./respuesta.model";

export class CuestionarioRespondidoModel {

  id!: number;
  id_usuario!: string;
  titulo!: string;
  destinatario!: string;
  respuestas!: Array<RespuestaModel>;

  setCuestionario(_cuestionario: unknown) {
    const cuestionarioRespondido = _cuestionario as CuestionarioRespondidoModel;
    this.id = cuestionarioRespondido.id || 0 ;
    this.id_usuario = cuestionarioRespondido.id_usuario || '' ;
    this.titulo = cuestionarioRespondido.titulo || '';
    this.destinatario = cuestionarioRespondido.destinatario || '';
    this.respuestas = cuestionarioRespondido.respuestas || [];
  }
}
