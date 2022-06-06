import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpHeadersService } from './http-headers.service';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {

  public ruta: string = environment.apiUrl;
  public jornadasArray = new BehaviorSubject<string>('');
  private headers: HttpHeaders;

  constructor(
    private http: HttpClient,
    private headersService: HttpHeadersService
  ) {
    this.headers = headersService.getHeadersWithToken();
  }

  public generarNotificaciones(dni:string,email:string){
    let url: string = this.ruta + 'generarNotificaciones';
    const headers = this.headers;
    let dato = { dni:dni, email: email };

    return this.http.post(url, dato, { headers });
  }

  public getNotificaciones(dni:string, email:string){
    let url: string = this.ruta + 'getNotificaciones';
    const headers = this.headers;
    let dato = { dni:dni, email: email };

    return this.http.post(url, dato, { headers });
  }

  public getNotificacionesHeader(dni:string,email:string){
    let url: string = this.ruta + 'getNotificacionesHeader';
    const headers = this.headers;
    let dato = { dni:dni, email: email };

    return this.http.post(url, dato, { headers });
  }

  public countNotificaciones(dni:string, email:string){
    let url: string = this.ruta + 'countNotificaciones';
    const headers = this.headers;
    let dato = { dni:dni, email: email };

    return this.http.post(url, dato, { headers });
  }

}
