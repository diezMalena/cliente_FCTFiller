import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CuestionarioRespondidoModel } from 'src/app/models/cuestionarios/cuestionarioRespondido.model';

const API_STORAGE_URL = `${environment.apiUrlCuestionario}`;
const contestarCuestionarioURL = API_STORAGE_URL+environment.contestarCuestionario;
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
}
