import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginStorageUserService } from './login.storageUser.service';
import { alumnoResponse } from '../models/alumnoResponse';
import { Alumno } from '../models/alumno';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudAlumnosService {
  @Output() alumnoTrigger: EventEmitter<any> = new EventEmitter();

  private urlBase: string = 'http://localhost:8000/api/jefatura/';
  private urlListarAlumnos: string = 'listarAlumnos/';
  private urlVerAlumno: string = 'verAlumno/';
  private urlAddAlumno: string = 'addAlumno';
  private urlModificarAlumno: string = 'modificarAlumno';
  private urlEliminarAlumno: string = 'eliminarAlumno/';

  constructor(
    private http: HttpClient,
  ) { }

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

  public actualizarAlumno(alumno : Alumno) {
    const url: string = this.urlBase + this.urlModificarAlumno;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.put(url, JSON.stringify(alumno), {headers});
  }
}
