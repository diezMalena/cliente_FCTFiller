import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SeguimientoServiceService {

  public ruta: string = "http://localhost:8000/api/";

  constructor(private http: HttpClient) { }

  public escribirDatos(dni: string) {
    //console.log(datos);
    let url: string = this.ruta + "devolverDatosAlumno";
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let dato={dni:dni};
    return this.http.post(url, dato, { headers: headers });
  }

  public gestionarDepartamento(dni:string){
    let url: string = this.ruta + "gestionarDepartamento";
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let dato={dni:dni};
    return this.http.post(url, dato, { headers: headers });
  }

  public addDepartamento(dni:string,departamento:string){
    let url: string = this.ruta + "addDepartamento";
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let datos={
      dni:dni,
      departamento:departamento,
    };
    return this.http.put(url, datos, { headers: headers });
  }

  public sumatorioHorasTotales(dni:string){
    let url: string = this.ruta + "sumatorioHorasTotales";
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let dato={dni:dni};
    return this.http.post(url, dato, { headers: headers });
  }

  public devolverJornadas(dni:string){
    let url: string = this.ruta + "devolverJornadas";
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let dato={dni:dni};
    return this.http.post(url, dato, { headers: headers });
  }

}
