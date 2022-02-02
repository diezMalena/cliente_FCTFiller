import { Alumno } from "./alumno";
import { Trabajador } from "./trabajador";

export interface empresaResponse {
  id: string;
  cif: string;
  nombre: string;
  email: string;
  telefono: string;
  localidad: string;
  provincia: string;
  direccion: string;
  cp: string;
  representante: Trabajador;
  alumnos: Alumno[];
}
