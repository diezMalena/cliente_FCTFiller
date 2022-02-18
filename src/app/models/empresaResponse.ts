import { Alumno } from './alumno';
import { Trabajador } from './trabajador';

export interface EmpresaResponse {
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
  nombre_responsable: string;
  dni_responsable: string;
  alumnos: Alumno[];
}
