import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import {FileUploadModel} from "../models/file-upload.model";
import { LoginStorageUserService } from "../services/login.storageUser.service";


const API_STORAGE_URL = `${environment.apiUrl}`;
//falta la url del servidor

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(
    private http: HttpClient,
    public loginStorageUser: LoginStorageUserService
  ) { }

  add(storage: FileUploadModel[]): Observable<any> {
    let data : any = {
      ficheros : storage,
      dni : this.loginStorageUser.getUser()?.dni
    };
//    console.log(data);

    return this.http.post(`${API_STORAGE_URL}`, data).pipe(
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
