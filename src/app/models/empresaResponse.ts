import { Alumno } from "./alumno";

export interface empresaResponse {
  id: string;
  nombre: string;
  alumnos: Alumno[];
}
