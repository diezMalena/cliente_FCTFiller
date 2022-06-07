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
//falta la url del servidor en las variables de entorno

@Injectable({
  providedIn: 'root'
})
export class CuestionarioService {

  constructor(private http: HttpClient,) { }

  add(storage: CuestionarioModel): Observable<any> {
    // console.log(storage);
    return this.http.post(`${crearCuestionarioURL}`, storage,{responseType: 'text'}).pipe(
      map((res) => {
        console.log(res);
        return res || {};
      }),
      catchError(this.handleError)
    )
  }

  getCuestionario(destinatario: string | null, codigo_centro: string|undefined|null ): Observable<any> {
    return this.http.get<CuestionarioModel>(`${obtenerCuestionarioURL}/${destinatario}/${codigo_centro}`).pipe(
      map((cuestionario: CuestionarioModel) => {
        return cuestionario || {};
      })
    )
  }

  getCuestionarioEdicion(id: string | null): Observable<any> {
    return this.http.get<CuestionarioModel>(`${obtenerCuestionarioEdicionURL}/${id}`).pipe(
      map((cuestionario: CuestionarioModel) => {
        return cuestionario || {};
      })
    )
  }


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

  eliminarCuestionario(id: number): Observable<void> {
    return this.http.delete<void>(`${eliminarCuestionarioURL}/${id}`).pipe()
  }


  update(storage: CuestionarioModel): Observable<any> {
    return this.http.post(`${editarCuestionarioURL}`, storage,{responseType: 'text'}).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.handleError)
    )
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


  activarCuestionario(id_cuestionario: number , destinatario: string, cod_centro: string): Observable<any> {
    return this.http.post(`${activarCuestionarioURL}/${id_cuestionario}/${destinatario}/${cod_centro}`,{responseType: 'text'}).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.handleError)
    )
  }

  desactivarCuestionario(id_cuestionario: number ): Observable<any> {
    return this.http.post(`${desactivarCuestionarioURL}/${id_cuestionario}`,{responseType: 'text'}).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.handleError)
    )
  }

}
