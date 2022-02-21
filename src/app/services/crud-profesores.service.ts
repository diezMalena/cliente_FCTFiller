import { Injectable } from '@angular/core';
import { profesorResponse } from '../models/profesorResponse';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CrudProfesoresService {

  constructor(private http: HttpClient) { }

  public ruta='http://127.0.0.1:8000/api/';

  public getProfesores(){
    let url: string = this.ruta+'listarProfesores';
    return this.http.get<profesorResponse>(url);
  }

  public getProfesor(dni_profesor: string){
    let url: string = this.ruta+'listarProfesor/'+dni_profesor;
    return this.http.get<profesorResponse>(url);
  }

  public eliminarProfesor(dni_profesor: string){
    let url: string = this.ruta+'eliminarAnexo/'+dni_profesor;
    let headers= new HttpHeaders({
      'Content-Type' : 'application/json',
      //'x-access-token': `${sessionStorage.getItem('token')}`,
    });
    return this.http.delete(url,{headers});
  }
}
