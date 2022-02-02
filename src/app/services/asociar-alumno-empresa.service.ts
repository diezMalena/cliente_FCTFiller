import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Alumno } from '../models/alumno';
import { Empresa } from '../models/empresa';
import { saveAs } from 'file-saver';
import * as FileSaver from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class AsociarAlumnoEmpresaService {


  constructor(private http: HttpClient) {

   }

  public solicitarAlumnos(dniTutor: string){
    let url: string = "http://127.0.0.1:8000/api/solicitarAlumnosSinEmpresa/"+dniTutor;
    return this.http.get<Alumno[]>(url)
  }

  public solicitarEmpresas(dniTutor: string){
    let url: string = "http://127.0.0.1:8000/api/solicitarEmpresasConAlumnos/"+dniTutor;
    return this.http.get<Empresa[]>(url)
  }

  public solicitarNombreCiclo(dniTutor: string){
    let url: string = "http://127.0.0.1:8000/api/solicitarNombreCiclo/"+dniTutor;
    return this.http.get(url)
  }

  public asignarAlumnos(dniTutor: string, empresas: Empresa[]){
    let url: string = "http://127.0.0.1:8000/api/actualizarEmpresaAsignadaAlumno";
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let datos = {
      'dni': dniTutor,
      'empresas': empresas
    };
    var datosString = JSON.stringify(datos);
    return this.http.post(url, datosString, {headers: headers});
  }


  public generarAnexo(dni:string){
    let dato= {dni_tutor:dni};
    const url: string="http://127.0.0.1:8000/api/relleno";

    return this.http.post(url,dato, {responseType:'arraybuffer'});
  }

}
