import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Alumno } from '../models/alumno';
import { Empresa } from '../models/empresa';

@Injectable({
  providedIn: 'root'
})
export class AsociarAlumnoEmpresaService {

  constructor(private http: HttpClient) { }
  public solicitarAlumnos(dniTutor: string){
    let url: string = "http://127.0.0.1:8000/api/solicitarAlumnosSinEmpresa/"+dniTutor;
    return this.http.get<Alumno[]>(url)
  }

  public solicitarEmpresas(dniTutor: string){
    let url: string = "http://127.0.0.1:8000/api/solicitarEmpresasConAlumnos/"+dniTutor;
    return this.http.get<Empresa[]>(url)
  }

  public asignarAlumnos(dniTutor: string, alumnos: Alumno[], empresas: Empresa[]){
    let url: string = "http://127.0.0.1:8000/api/asignarAlumnos";
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let datos = {
      'dniTutor': dniTutor,
      'alumnos': alumnos,
      'empresas': empresas,
    };
    var datosString = JSON.stringify(datos);
    return this.http.post(url, datosString, {headers: headers});
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
