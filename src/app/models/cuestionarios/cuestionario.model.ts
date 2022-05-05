import { PreguntaModel } from "./pregunta.model";

export class CuestionarioModel {

  id!: number;
  titulo!: string;
  destinatario!: string;
  preguntas!: Array<PreguntaModel>;

  setCuestionario(_cuestionario: unknown) {
    const cuestionario = _cuestionario as CuestionarioModel;
    this.id = cuestionario.id || 0 ;
    this.titulo = cuestionario.titulo || '';
    this.destinatario = cuestionario.destinatario || '';
    this.preguntas = cuestionario.preguntas || [];
  }
}
