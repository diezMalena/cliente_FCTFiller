import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CuestionarioModel } from 'src/app/models/cuestionarios/cuestionario.model';

const API_STORAGE_URL = `${environment.apiUrlCuestionario}`;
const crearCuestionarioURL = API_STORAGE_URL+environment.crearCuestionario;
const obtenerCuestionarioURL = API_STORAGE_URL+environment.obtenerCuestionarioURL;
const obtenerCuestionariosURL = API_STORAGE_URL+environment.obtenerCuestionariosURL;
const eliminarCuestionarioURL = API_STORAGE_URL+environment.eliminarCuestionarioURL;
//falta la url del servidor en las variables de entorno

@Injectable({
  providedIn: 'root'
})
export class CuestionarioService {

  constructor(private http: HttpClient,) { }

  public add(storage: CuestionarioModel): Observable<any> {
    // console.log(storage);
    return this.http.post(`${crearCuestionarioURL}`, storage,{responseType: 'text'}).pipe(
      map((res) => {
        console.log(res);
        return res || {};
      }),
      catchError(this.handleError)
    )
  }

  getCuestionario(destinatario: string | null): Observable<any> {
    return this.http.get<CuestionarioModel>(`${obtenerCuestionarioURL}/${destinatario}`).pipe(
      map((cuestionario: CuestionarioModel) => {
        return cuestionario || {};
      })
    )
  }


  getCuestionarios(): Observable<any> {
    return this.http.get<Array<CuestionarioModel>>(`${obtenerCuestionariosURL}`).pipe(
      map((cuestionarios: Array<CuestionarioModel>) => {
        cuestionarios = <Array<CuestionarioModel>>cuestionarios.map((cuestionario: CuestionarioModel) => {
          return cuestionario
        });
        return cuestionarios || [];
      })
    )
  }

  eliminarCuestionario(id: number): Observable<void> {
    return this.http.delete<void>(`${eliminarCuestionarioURL}/${id}`).pipe()
  }


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
}
