import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Tutor } from '../models/tutor';
import { map, Observable } from 'rxjs';
import { tutorResponse } from '../models/tutorResponse';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class SeguimientoServiceService {
  public ruta: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /***********************************************************************/
  //#region Cabeceras: departamento, alumno, horas y tutor

  /***********************************************************************/
  //#region Gestión del departamento

  /**
   * Solicita al servidor el nombre del departamento de las prácticas
   * @param dni DNI del alumno
   * @returns Observable con el nombre del departamento asignado (puede estar vacío)
   * @author Malena
   */
  public gestionarDepartamento(dni: string) {
    let url: string = this.ruta + 'gestionarDepartamento';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let dato = { dni: dni };

    return this.http.post(url, dato, { headers: headers });
  }

  /**
   * Añade un departamento a unas prácticas FCT
   * @param dni DNI del alumno
   * @param departamento Nombre del departamento
   * @returns Observable con la respuesta del servidor
   * @author Malena
   */
  public addDepartamento(dni: string, departamento: string) {
    let url: string = this.ruta + 'addDepartamento';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let datos = {
      dni: dni,
      departamento: departamento,
    };

    return this.http.put(url, datos, { headers: headers });
  }

  //#endregion
  /***********************************************************************/

  /***********************************************************************/
  //#region Gestión del tutor/responsable de empresa

  /**
   * Solicita al servidor los datos del tutor de empresa de las FCT
   * @param dni DNI del alumno
   * @returns Un observable con los datos del tutor de la empresa
   * @author Malena
   */
  public recogerTutorEmpresa(dni: string) {
    let url: string = this.ruta + 'recogerTutorEmpresa';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let dato = { dni: dni };

    return this.http.post(url, dato, { headers: headers });
  }

  /**
   * Solicita al servidor los datos de los tutores y responsables de la empresa asociada a las FCT
   * @param id_empresa La ID de la empresa de las FCT
   * @returns Un observable con un vector de trabajadores (tutores y responsables)
   * @author Malena
   */
  public getTutoresResponsables(id_empresa: string): Observable<Tutor[]> {
    let url: string = this.ruta + 'getTutoresResponsables/id=' + id_empresa;

    return this.http.get<tutorResponse[]>(url).pipe(
      map((resp: tutorResponse[]) => {
        return resp.map((tutor) => Tutor.tutorJSON(tutor));
      })
    );
  }

  /**
   * Establece un trabajador de la empresa como tutor seleccionado
   * @param dni_tutor_nuevo DNI del tutor a establecer
   * @param dni_alumno DNI del alumno
   * @returns Un observable con la respuesta del servidor
   * @author Malena
   */
  public guardarTutorSeleccionado(dni_tutor_nuevo: string, dni_alumno: string) {
    let url: string = this.ruta + 'actualizarTutorEmpresa';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let dato = {
      dni_tutor_nuevo: dni_tutor_nuevo,
      dni_alumno: dni_alumno,
    };

    return this.http.put(url, dato, { headers: headers });
  }

  //#endregion
  /***********************************************************************/

  /**
   * Solicita al servidor el nombre y apellidos del alumno y el nombre de la empresa
   * @param dni DNI del alumno
   * @returns Observable con los datos del alumno (nombre y apellidos) y el nombre de la empresa
   * @author Malena
   */
  public escribirDatos(dni: string) {
    let url: string = this.ruta + 'devolverDatosAlumno';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let dato = { dni: dni };

    return this.http.post(url, dato, { headers: headers });
  }

  /**
   * Solicita al servidor el sumatorio de las horas realizadas en las FCT
   * @param dni DNI del alumno
   * @returns Observable con el sumatorio de horas realizadas en las FCT
   * @author Malena
   */
  public sumatorioHorasTotales(dni: string) {
    let url: string = this.ruta + 'sumatorioHorasTotales';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let dato = { dni: dni };

    return this.http.post(url, dato, { headers: headers });
  }

  //#endregion
  /***********************************************************************/

  /***********************************************************************/
  //#region Gestión de jornadas

  /**
   * Solicita al servidor los datos de las jornadas de unas FCT
   * @param dni DNI del tutor
   * @returns Un observable con los datos de las jornadas
   * @author Malena
   */
  public devolverJornadas(dni: string) {
    let url: string = this.ruta + 'devolverJornadas';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let dato = { dni: dni };

    return this.http.post(url, dato, { headers: headers });
  }

  //#endregion
  /***********************************************************************/

  /***********************************************************************/
  //#region Descarga del Anexo III

  /**
   * Envía al servidor una señal de descarga del Anexo III
   * @param dni DNI del tutor
   * @returns Un observable con la descarga del Anexo III
   * @author Malena
   */
  public descargarPDF(dni: string) {
    let dato = { dni: dni };
    const url: string = this.ruta + 'generarAnexo3';
    return this.http.post(url, dato, { responseType: 'arraybuffer' });
  }

  //#endregion
  /***********************************************************************/
}
