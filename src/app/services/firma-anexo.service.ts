import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FirmaAnexoModel } from '../models/firmaAnexo.model';

const API_STORAGE_URL = environment.apiUrl;

@Injectable({ providedIn: 'root' })
export class FirmaService {
  constructor(private http: HttpClient) {}

  /**
   * Sube una imagen con la firma en el servidor
   * @param storage Objeto con la imagen de la firma
   * @returns Un observable con la respuesta del servidor
   * @author Pablo
   */
  add(storage: FirmaAnexoModel): Observable<any> {
    console.log(storage);
    return this.http.post(`${API_STORAGE_URL}`, storage).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Maneja un error de response HTTP y lo lanza
   * @param error Error de la response
   * @returns Un mensaje de error
   * @author Pablo
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
}
