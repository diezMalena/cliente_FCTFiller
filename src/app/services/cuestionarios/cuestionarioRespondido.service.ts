import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CuestionarioRespondidoModel } from 'src/app/models/cuestionarios/cuestionarioRespondido.model';
import { CuestionariosRespondidosMediasModel } from 'src/app/models/cuestionarios/cuestionariosRespondidosMedias.model';
import { CursoAcademicoModel } from 'src/app/models/cuestionarios/cursoAcademico.model';

const API_STORAGE_URL = `${environment.apiUrlCuestionario}`;
const contestarCuestionarioURL = API_STORAGE_URL+environment.contestarCuestionario;
const verificarCuestionarioRespondidoURL = API_STORAGE_URL+environment.verificarCuestionarioRespondidoURL;
const obtenerMediasCuestionariosRespondidosURL = API_STORAGE_URL+environment.obtenerMediasCuestionariosRespondidosURL;
const obtenerCursosAcademicosURL = API_STORAGE_URL+environment.obtenerCursosAcademicosURL;
const listarCuestionariosRespondidosURL = API_STORAGE_URL+environment.listarCuestionariosRespondidosURL;
//falta la url del servidor en las variables de entorno

@Injectable({
  providedIn: 'root'
})
export class CuestionarioRespondidoService {

  constructor(private http: HttpClient,) { }


  /**
 * Envía a la API el cuestionario respondido.
 * @params CuestionarioRespondidoModel.
 * @return devuelve la respuesta.
 * @author Pablo G. Galan <pablosiege@gmail.com>
 */
  public add(cuestionario: CuestionarioRespondidoModel): Observable<any> {
    return this.http.post(`${contestarCuestionarioURL}`, cuestionario,{responseType: 'text'}).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.handleError)
    )
  }

  /**
   * Captura el mensaje del error.
   * @params error de la llamada.
   * @return devuelve el mensaje de error.
   * @author Pablo G. Galan <pablosiege@gmail.com>
   */
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }


  /**
   * Comprueba si el cuestionario ya ha sido respondido por el usuario en función de su id_usuario.
   * @params id_usuario.
   * @return llamada HTTP.
   * @author Pablo G. Galan <pablosiege@gmail.com>
   */
  getData(id_usuario: string | undefined) {
    return this.http.get(`${verificarCuestionarioRespondidoURL}/${id_usuario}`)
 }

  /**
   * Realiza la petición de forma sincrona.
   * @params id_usuario.
   * @return llamada HTTP.
   * @author Pablo G. Galan <pablosiege@gmail.com>
   */
  getDataSynchronous(id_usuario: string | undefined):Promise<any>{
    return this.getData(id_usuario).toPromise()
  }

  /**
   * Obtiene las medias de los campos de tipo rango de los cuestionarios respondidos filtrados por curso académico, destinatario y código centro.
   * @params curso_academico.
   * @params destinatario.
   * @params codigo_centro.
   * @return cuestionario.
   * @author Pablo G. Galan <pablosiege@gmail.com>
   */
  obtenerMediasCuestionariosRespondidos(curso_academico:string | undefined , destinatario: string | undefined, codigo_centro: string | undefined): Observable<any> {
    return this.http.get<Array<CuestionariosRespondidosMediasModel>>(`${obtenerMediasCuestionariosRespondidosURL}?curso_academico=${curso_academico}&destinatario=${destinatario}&codigo_centro=${codigo_centro}`).pipe(
      map((cuestionarios: Array<CuestionariosRespondidosMediasModel>) => {
        cuestionarios = <Array<CuestionariosRespondidosMediasModel>>cuestionarios.map((cuestionario: CuestionariosRespondidosMediasModel) => {
          return cuestionario
        });
        return cuestionarios || [];
      })
    )
  }

  /**
   * Obtiene los cursos académicos disponibles en la API.
   * @return cursoAcademico array de cursos académicos.
   * @author Pablo G. Galan <pablosiege@gmail.com>
   */
  obtenerCursoAcademico(): Observable<any> {
    return this.http.get<Array<CursoAcademicoModel>>(`${obtenerCursosAcademicosURL}`).pipe(
      map((cursoAcademico: Array<CursoAcademicoModel>) => {
        cursoAcademico = <Array<CursoAcademicoModel>>cursoAcademico.map((cursoAcademico: CursoAcademicoModel) => {
          return cursoAcademico
        });
        return cursoAcademico || [];
      })
    )
  }

  /**
   * Obtiene los cuestionarios respondidos en función del curso académico, el destinatario y el código del centro.
   * @params curso_academico.
   * @params destinatario.
   * @params codigo_centro.
   * @return cuestionarios array de cuestionarios.
   * @author Pablo G. Galan <pablosiege@gmail.com>
   */
  obtenerCuestionariosRespondidos(curso_academico:string | undefined , destinatario: string | undefined, codigo_centro: string | undefined): Observable<any> {
    return this.http.get<Array<CuestionarioRespondidoModel>>(`${listarCuestionariosRespondidosURL}?curso_academico=${curso_academico}&destinatario=${destinatario}&codigo_centro=${codigo_centro}`).pipe(
      map((cuestionarios: Array<CuestionarioRespondidoModel>) => {
        cuestionarios = <Array<CuestionarioRespondidoModel>>cuestionarios.map((cuestionario: CuestionarioRespondidoModel) => {
          return cuestionario
        });
        return cuestionarios || [];
      })
    )
  }

}
