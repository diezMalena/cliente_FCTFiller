import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistroEmpresaService {
  public ruta: string = "http://localhost:8000/api/";
  constructor(private http: HttpClient) { }

  public enviarDatos(datos:object){
    //console.log(datos);
    let url: string = this.ruta + "addDatosEmpresa";
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(url, datos, {headers: headers});
  }
}
