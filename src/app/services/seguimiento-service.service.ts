import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SeguimientoServiceService {

  public ruta: string = "http://localhost:8000/api/";

  constructor(private http: HttpClient) { }

  /**
   * @author Malena
   */
  public escribirDatos(dni: string) {
    //console.log(datos);
    let url: string = this.ruta + "devolverDatosAlumno";
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let dato={dni:dni};
    return this.http.post(url, dato, { headers: headers });
  }

  /**
   * @author Malena
   */
  public gestionarDepartamento(dni:string){
    let url: string = this.ruta + "gestionarDepartamento";
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let dato={dni:dni};
    return this.http.post(url, dato, { headers: headers });
  }

  /**
   * @author Malena
   */
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

  /**
   * @author Malena
   */
  public sumatorioHorasTotales(dni:string){
    let url: string = this.ruta + "sumatorioHorasTotales";
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let dato={dni:dni};
    return this.http.post(url, dato, { headers: headers });
  }

  /**
   * @author Malena
   */
  public devolverJornadas(dni:string){
    let url: string = this.ruta + "devolverJornadas";
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let dato={dni:dni};
    return this.http.post(url, dato, { headers: headers });
  }

  /**
   * @author Malena
   */
  public descargarPDF(dni:string){
    let dato= {dni:dni};
    const url: string= this.ruta+"generarAnexo3";
    return this.http.post(url,dato, {responseType:'arraybuffer'});
  }

}
