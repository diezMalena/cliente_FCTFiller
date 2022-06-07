export class CursoAcademicoModel {

  curso_academico!: string;

  setCuestionario(_curso_academico: unknown) {
    const CursoAcademico = _curso_academico as CursoAcademicoModel;
    this.curso_academico = CursoAcademico.curso_academico || '' ;
  }
}
