import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import {FileUploadModel} from "../models/file-upload.model";

const API_STORAGE_URL = `${environment.apiUrl}/storage`;
//falta la url del servidor

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient,) { }

  add(storage: FileUploadModel): Observable<any> {
    console.log(storage);
    return this.http.post(`${API_STORAGE_URL}/file`, storage).pipe(
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
