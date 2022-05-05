import { RespuestaModel } from "./respuesta.model";

export class RespuestaCuestionarioModel {
  id!: number;
  id_usuario!: string;
  titulo!: string;
  destinatario!: string;
  respuestas!: Array<RespuestaModel>;

  setCuestionario(_cuestionario: unknown) {
    const cuestionario = _cuestionario as RespuestaCuestionarioModel;
    this.id = cuestionario.id || 0 ;
    this.id_usuario = cuestionario.id_usuario || '' ;
    this.titulo = cuestionario.titulo || '';
    this.destinatario = cuestionario.destinatario || '';
    this.respuestas = cuestionario.respuestas || [];
  }
}
