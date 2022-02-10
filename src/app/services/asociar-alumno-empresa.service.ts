import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Alumno } from '../models/alumno';
import { Empresa } from '../models/empresa';

@Injectable({
  providedIn: 'root'
})
export class AsociarAlumnoEmpresaService {
  public ruta: string = "http://localhost:8000/api/";

  constructor(private http: HttpClient) { }
  public solicitarAlumnos(dniTutor: string){
    let url: string = this.ruta + "solicitarAlumnosSinEmpresa/"+dniTutor;
    return this.http.get<Alumno[]>(url)
  }

  public solicitarEmpresas(dniTutor: string){
    let url: string = this.ruta + "solicitarEmpresasConAlumnos/"+dniTutor;
    return this.http.get<Empresa[]>(url)
  }

  public solicitarNombreCiclo(dniTutor: string){
    let url: string = this.ruta + "solicitarNombreCiclo/"+dniTutor;
    return this.http.get(url)
  }

  public asignarAlumnos(datos:object){
    let url: string = this.ruta + "actualizarEmpresaAsignadaAlumno";
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(url, datos, {headers: headers});
  }

  public generarAnexo(dni:string){
    console.log(dni);
    const url: string="http://127.0.0.1:8000/api/relleno";
    let headers= new HttpHeaders({
      'Content-Type' : 'application/json',
    });
    let dato= {dni_tutor:dni};
    return this.http.post(url,dato,{headers: headers});
  }
}
