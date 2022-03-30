import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginStorageUserService } from './login.storageUser.service';
import { alumnoResponse } from '../models/alumnoResponse';
import { Alumno } from '../models/alumno';
import { BehaviorSubject, map } from 'rxjs';
import { Grupo } from '../models/grupo';
import { grupoResponse } from '../models/grupoResponse';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class CrudAlumnosService {
  @Output() alumnoTrigger: EventEmitter<any> = new EventEmitter();
  public alumnosArray = new BehaviorSubject<Alumno[]>([]);

  private urlBase: string = environment.apiUrl + 'jefatura/';
  private urlListarAlumnos: string = 'listarAlumnos/';
  private urlVerAlumno: string = 'verAlumno/';
  private urlAddAlumno: string = 'addAlumno';
  private urlModificarAlumno: string = 'modificarAlumno';
  private urlEliminarAlumno: string = 'eliminarAlumno/';
  private urlListarGrupos: string = 'listarGrupos';

  constructor(private http: HttpClient) {}

  /***********************************************************************/
  //#region Gestión de alumnos - CRUD

  /***********************************************************************/
  //#region CRUD - Create

  /**
   * Registra a un alumno en la base de datos
   * @param alumno Un vector con los datos del alumno a registrar
   * @returns Un observable con la respuesta del servidor
   * @author David Sánchez Barragán
   */
  public registrarAlumno(alumno: Alumno) {
    const url: string = this.urlBase + this.urlAddAlumno;
    console.log(url);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(url, JSON.stringify(alumno), { headers });
  }

  //#endregion
  /***********************************************************************/

  /***********************************************************************/
  //#region CRUD - Read

  /**
   * Obtiene un listado de grupos
   * @returns `Observable` de la `HttpResponse`.
   * @author David Sánchez Barragán
   */
  public listarGrupos() {
    let url = this.urlBase + this.urlListarGrupos;

    return this.http.get<Grupo[]>(url).pipe(
      map((resp: grupoResponse[]) => {
        return resp.map((grupo) => Grupo.grupoJSON(grupo));
      })
    );
  }

  /**
   * Función que obtiene la lista de alumnos correspondiente al centro de estudios
   * de la persona que se ha logueado en el sistema
   * @param dni `string` DNI del usuario que se ha logueado en el sistema
   * @returns `Observable` de la `HttpResponse`.
   * @author David Sánchez Barragán
   */
  public listarAlumnos(dni: any) {
    let url = this.urlBase + this.urlListarAlumnos + dni;

    return this.http.get<Alumno[]>(url).pipe(
      map((resp: alumnoResponse[]) => {
        return resp.map((alumno) => Alumno.alumnoCompletoJSON(alumno));
      })
    );
  }

  //#endregion
  /***********************************************************************/

  /***********************************************************************/
  //#region CRUD - Update

  /**
   * Actualiza los datos de un alumno en la base de datos
   * @param alumno Un objeto con los datos del alumno
   * @returns Un observable con la respuesta del servidor
   * @author David Sánchez Barragán
   */
  public actualizarAlumno(alumno: Alumno) {
    const url: string = this.urlBase + this.urlModificarAlumno;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.put(url, JSON.stringify(alumno), { headers });
  }

  //#endregion
  /***********************************************************************/

  /***********************************************************************/
  //#region CRUD - Delete

  /**
   * Función que obtiene la lista de alumnos correspondiente al centro de estudios
   * de la persona que se ha logueado en el sistema
   * @param dni `string` DNI del usuario que se ha logueado en el sistema
   * @returns `Observable` de la `HttpResponse`.
   * @author David Sánchez Barragán
   */
  public borrarAlumno(dni: any) {
    let url = this.urlBase + this.urlEliminarAlumno + dni;

    return this.http.delete<any>(url).pipe(
      map((resp: any) => {
        return resp;
      })
    );
  }

  //#endregion
  /***********************************************************************/

  //#endregion
  /***********************************************************************/

  /***********************************************************************/
  //#region Funciones auxiliares

  /**
   * Establece el array de empresas
   * @param alumnosArray array de alumnos
   * @author David Sánchez Barragán
   */
  public setAlumnosArray(alumnosArray: Alumno[]) {
    this.alumnosArray.next(alumnosArray);
  }

  //#endregion
  /***********************************************************************/
}
