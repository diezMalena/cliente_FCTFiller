import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CuestionarioModel } from 'src/app/models/cuestionarios/cuestionario.model';

const API_STORAGE_URL = `${environment.apiUrlCuestionario}`;
const crearCuestionarioURL = API_STORAGE_URL+environment.crearCuestionario;
const editarCuestionarioURL = API_STORAGE_URL+environment.editarCuestionarioURL;
const obtenerCuestionarioURL = API_STORAGE_URL+environment.obtenerCuestionarioURL;
const obtenerCuestionarioEdicionURL = API_STORAGE_URL+environment.obtenerCuestionarioEdicionURL;
const obtenerCuestionariosURL = API_STORAGE_URL+environment.obtenerCuestionariosURL;
const eliminarCuestionarioURL = API_STORAGE_URL+environment.eliminarCuestionarioURL;
const activarCuestionarioURL = API_STORAGE_URL+environment.activarCuestionarioURL;
const desactivarCuestionarioURL = API_STORAGE_URL+environment.desactivarCuestionarioURL;
const descargarCuestionarioURL = API_STORAGE_URL+environment.descargarCuestionarioURL;

@Injectable({
  providedIn: 'root'
})

export class CuestionarioService {

  constructor(private http: HttpClient,) { }

  add(storage: CuestionarioModel): Observable<any> {
    return this.http.post(`${crearCuestionarioURL}`, storage,{responseType: 'text'}).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.handleError)
    )
  }

  /**
   * Obtiene el cuestionario en función del destinatario y el código centro.
   * @params destinatario tipo destinatario.
   * @params codigo_centro codigo del centro.
   * @return cuestionario modelo cuestionario.
   * @author Pablo G. Galan <pablosiege@gmail.com>
   */
  getCuestionario(destinatario: string | null, codigo_centro: string|undefined|null ): Observable<any> {
    return this.http.get<CuestionarioModel>(`${obtenerCuestionarioURL}/${destinatario}/${codigo_centro}`).pipe(
      map((cuestionario: CuestionarioModel) => {
        return cuestionario || {};
      })
    )
  }

  /**
   * Obtiene el cuestionario en función del id.
   * @params id identificador del cuestionario.
   * @return cuestionario modelo cuestionario.
   * @author Pablo G. Galan <pablosiege@gmail.com>
   */
  getCuestionarioEdicion(id: string | null): Observable<any> {
    return this.http.get<CuestionarioModel>(`${obtenerCuestionarioEdicionURL}/${id}`).pipe(
      map((cuestionario: CuestionarioModel) => {
        return cuestionario || {};
      })
    )
  }

  /**
   * Obtiene los cuestionarios en función del código centro.
   * @params codigo_centro codigo del centro.
   * @return cuestionarios Array de modelo cuestionario.
   * @author Pablo G. Galan <pablosiege@gmail.com>
   */
  getCuestionarios(codigo_centro:string | undefined): Observable<any> {
    return this.http.get<Array<CuestionarioModel>>(`${obtenerCuestionariosURL}/${codigo_centro}`).pipe(
      map((cuestionarios: Array<CuestionarioModel>) => {
        cuestionarios = <Array<CuestionarioModel>>cuestionarios.map((cuestionario: CuestionarioModel) => {
          return cuestionario
        });
        return cuestionarios || [];
      })
    )
  }


  /**
   * Elimina el cuestionario en función de su id.
   * @params id identificador del cuestionario.
   * @return llamada la http.
   * @author Pablo G. Galan <pablosiege@gmail.com>
   */
  eliminarCuestionario(id: number): Observable<void> {
    return this.http.delete<void>(`${eliminarCuestionarioURL}/${id}`).pipe()
  }


  /**
   * Actualiza el cuestionario en función de su id.
   * @params CuestionarioModel modelo cuestionario.
   * @return res respuesta de la llamada http.
   * @author Pablo G. Galan <pablosiege@gmail.com>
   */
  update(storage: CuestionarioModel): Observable<any> {
    return this.http.post(`${editarCuestionarioURL}`, storage,{responseType: 'text'}).pipe(
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
   * Se activa el cuestionario en función de su id_cuestionario, destinatario y código_centro.
   * @params id_cuestionario.
   * @params destinatario.
   * @params cod_centro.
   * @return devuelve la respuesta a llamada.
   * @author Pablo G. Galan <pablosiege@gmail.com>
   */
  activarCuestionario(id_cuestionario: number , destinatario: string, cod_centro: string): Observable<any> {
    return this.http.post(`${activarCuestionarioURL}/${id_cuestionario}/${destinatario}/${cod_centro}`,{responseType: 'text'}).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.handleError)
    )
  }

  /**
   * Se desactiva el cuestionario en función de su id_cuestionario.
   * @params id_cuestionario.
   * @return devuelve la respuesta a llamada.
   * @author Pablo G. Galan <pablosiege@gmail.com>
   */
  desactivarCuestionario(id_cuestionario: number): Observable<any> {
    return this.http.post(`${desactivarCuestionarioURL}/${id_cuestionario}`,{responseType: 'text'}).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.handleError)
    )
  }

  /**
   * Descarga cuestionario pdf em función de su id_cuestionario.
   * @params id_cuestionario.
   * @return devuelve la llamada a descargarCuestionariosURL.
   * @author Pablo G. Galan <pablosiege@gmail.com>
   */
  descargarCuestionario(id_cuestionario: number): any {
    return this.http.get(`${descargarCuestionarioURL}/${id_cuestionario}`, {responseType: 'blob'});
  }


}
