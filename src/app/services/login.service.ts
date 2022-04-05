import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class LoginService {
  public ruta: string = environment.apiUrl;
  constructor(private http: HttpClient) {}

  /**
   * Envía una petición de login al servidor
   * @param datos Datos del login (usuario y password)
   * @returns Un observable con la respuesta del servidor
   * @author Álvaro
   */
  public login(datos: object) {
    let url: string = this.ruta + 'login';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(url, datos, { headers: headers });
  }
}
