import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

//falta la url del servidor

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public ruta: string = "http://localhost:8000/api/";
  constructor(private http: HttpClient,) { }

  public login(datos:object){
    let url: string = this.ruta + "login";
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(url, datos, {headers: headers});
  }
}
