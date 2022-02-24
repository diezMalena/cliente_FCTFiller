import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import {FirmaAnexoModel} from "../models/firmaAnexo.model";

const API_STORAGE_URL = `${environment.apiUrlFirma}`;
//falta la url del servidor en las variables de entorno

@Injectable({
  providedIn: 'root'
})
export class FirmaService {

  constructor(private http: HttpClient,) { }

  add(storage: FirmaAnexoModel): Observable<any> {
    console.log(storage);
    return this.http.post(`${API_STORAGE_URL}`, storage).pipe(
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
}
