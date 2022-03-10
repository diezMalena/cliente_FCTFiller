import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginStorageUserService } from './login.storageUser.service';
import { alumnoResponse } from '../models/alumnoResponse';
import { Alumno } from '../models/alumno';
import { BehaviorSubject, map } from 'rxjs';
import { Grupo } from '../models/grupo';
import { grupoResponse } from '../models/grupoResponse';

@Injectable({
  providedIn: 'root'
})
export class CrudAlumnosService {
  @Output() alumnoTrigger: EventEmitter<any> = new EventEmitter();
  public alumnosArray = new BehaviorSubject<Alumno[]>([]);

  private urlBase: string = 'http://localhost:8000/api/jefatura/';
  private urlListarAlumnos: string = 'listarAlumnos/';
  private urlVerAlumno: string = 'verAlumno/';
  private urlAddAlumno: string = 'addAlumno';
  private urlModificarAlumno: string = 'modificarAlumno';
  private urlEliminarAlumno: string = 'eliminarAlumno/';
  private urlListarGrupos: string = 'listarGrupos';

  constructor(
    private http: HttpClient,
  ) { }

  /**
   * Obtiene un listado de grupos
   * @returns `Observable` de la `HttpResponse`.
   * @author David Sánchez Barragán
   */
   public listarGrupos() {
    let url = this.urlBase + this.urlListarGrupos;

    return this.http.get<Grupo[]>(url).pipe(
      map((resp: grupoResponse[]) => {
        return resp.map(grupo => Grupo.grupoJSON(grupo));
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
        return resp.map(alumno => Alumno.alumnoCompletoJSON(alumno))
      })
    );
  }

  /**
   * Función que obtiene la lista de alumnos correspondiente al centro de estudios
   * de la persona que se ha logueado en el sistema
   * @param dni `string` DNI del usuario que se ha logueado en el sistema
   * @returns `Observable` de la `HttpResponse`.
   */
  public borrarAlumno(dni: any) {
    let url = this.urlBase + this.urlEliminarAlumno + dni;
    //debugger;

    return this.http.delete<any>(url).pipe(
      map((resp: any) => {
        return resp;
      })
    );
  }

  /**
   *
   * @param alumno
   * @returns
   * @author
   */
  public actualizarAlumno(alumno : Alumno) {
    const url: string = this.urlBase + this.urlModificarAlumno;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.put(url, JSON.stringify(alumno), {headers});
  }

  public registrarAlumno(alumno : Alumno) {
    const url: string = this.urlBase + this.urlAddAlumno;
    console.log(url);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(url, JSON.stringify(alumno), {headers});
  }

  /**
   * Establece el array de empresas
   * @param alumnosArray array de alumnos
   * @author David Sánchez Barragán
   */
   public setAlumnosArray(alumnosArray: Alumno[]) {
    this.alumnosArray.next(alumnosArray);
  }


}
