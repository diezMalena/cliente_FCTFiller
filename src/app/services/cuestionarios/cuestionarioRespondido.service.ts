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

  public add(storage: CuestionarioRespondidoModel): Observable<any> {
    // console.log(storage);
    return this.http.post(`${contestarCuestionarioURL}`, storage,{responseType: 'text'}).pipe(
      map((res) => {
        console.log(res);
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


  verificarCuestionarioRespondido(id_usuario: string | undefined): Observable<any> {
    return this.http.get<Array<CuestionarioRespondidoModel>>(`${verificarCuestionarioRespondidoURL}/${id_usuario}`).pipe(
      map((cuestionarios: Array<CuestionarioRespondidoModel>) => {
        cuestionarios = <Array<CuestionarioRespondidoModel>>cuestionarios.map((cuestionario: CuestionarioRespondidoModel) => {
          return cuestionario
        });
        return cuestionarios || [];
      })
    )
  }

  getData(id_usuario: string | undefined) {
    return this.http.get(`${verificarCuestionarioRespondidoURL}/${id_usuario}`)
 }
  getDataSynchronous(id_usuario: string | undefined):Promise<any>{
    return this.getData(id_usuario).toPromise()
  }

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
