import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FileUploadModel } from '../models/file-upload.model';
import { LoginStorageUserService } from '../services/login.storageUser.service';
import { HttpHeadersService } from './http-headers.service';

const API_STORAGE_URL = environment.apiUrl;

@Injectable({ providedIn: 'root' })
export class FileUploadService {
  private headers: HttpHeaders;

  constructor(
    private http: HttpClient,
    public loginStorageUser: LoginStorageUserService,
    private headersService: HttpHeadersService
  ) {
    this.headers = headersService.getHeadersWithToken();
  }

  /**
   * Sube una serie de archivos al servidor
   * @param storage Vector con los archivos subidos en el cliente
   * @returns Un observable con la descarga
   * @author Pablo
   */
  add(storage: FileUploadModel[]): Observable<any> {
    const API_CSVUPLOAD_URL = API_STORAGE_URL + 'recibirCSV';
    const headers = this.headers;
    let data: any = {
      ficheros: storage,
      dni: this.loginStorageUser.getUser()?.dni,
    };

    return this.http.post(API_CSVUPLOAD_URL, data, { headers }).pipe(
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

  public subirAnexo(datos : any) {
    const headers = this.headers;
    const url: string = API_STORAGE_URL + 'subirAnexoEspecifico';
      return this.http.post(url, JSON.stringify(datos), { headers });
  }
}
