import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FileUploadModel } from '../models/file-upload.model';
import { LoginStorageUserService } from '../services/login.storageUser.service';

const API_STORAGE_URL = environment.apiUrl;

@Injectable({ providedIn: 'root' })
export class FileUploadService {
  constructor(
    private http: HttpClient,
    public loginStorageUser: LoginStorageUserService
  ) {}

  /**
   * Sube una serie de archivos al servidor
   * @param storage Vector con los archivos subidos en el cliente
   * @returns Un observable con la descarga
   * @author Pablo
   */
  add(storage: FileUploadModel[]): Observable<any> {
    const API_CSVUPLOAD_URL = API_STORAGE_URL + 'jefatura/recibirCSV';
    let data: any = {
      ficheros: storage,
      dni: this.loginStorageUser.getUser()?.dni,
    };

    return this.http.post(API_CSVUPLOAD_URL, data).pipe(
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
   */
  handleError(error: HttpErrorResponse) {
    let msg = '';

    if (error.error instanceof ErrorEvent) {
      msg = error.error.message;
    } else {
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
