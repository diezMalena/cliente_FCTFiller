import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CuestionarioTutorEmpresaModel } from 'src/app/models/cuestionarios/cuestionarios-tutor-empresa.model';

const API_STORAGE_URL = `${environment.apiUrlCuestionario}`;

const obtenerCuestionariosURL = API_STORAGE_URL+environment.obtenerCuestionariosFCTURL;


@Injectable({
  providedIn: 'root'
})
export class TutorEmpresaService {

  constructor(private http: HttpClient,) { }


  getCuestionarios(dni:string | undefined): Observable<any> {
    return this.http.get<Array<CuestionarioTutorEmpresaModel>>(`${obtenerCuestionariosURL}/${dni}`).pipe(
      map((cuestionarios: Array<CuestionarioTutorEmpresaModel>) => {
        cuestionarios = <Array<CuestionarioTutorEmpresaModel>>cuestionarios.map((cuestionario: CuestionarioTutorEmpresaModel) => {
          return cuestionario
        });
        return cuestionarios || [];
      })
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
}
