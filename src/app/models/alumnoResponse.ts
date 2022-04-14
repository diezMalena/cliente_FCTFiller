export interface alumnoResponse {
  nombre: string;
  dni: string;
  va_a_fct: number;
  horario?: string;
  fecha_ini?: Date;
  fecha_fin?: Date;

  //Cambio 02-03-2022 David Sánchez Barragán
  //Incorporación campos para gestión alumnos
  cod_alumno?: number;
  email?: string;
  apellidos?: string;
  password?: string;
  provincia?: string;
  localidad?: string;
  dni_antiguo?: string;
  matricula_cod?: string;
  matricula_cod_centro?: string;
  matricula_cod_grupo?: string;
}
