import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Anexo } from '../models/anexo';


@Injectable({
  providedIn: 'root'
})


export class AnexoService {

  constructor(private http: HttpClient) { }

  public verAnexos(dni_tutor: string){
    let url: string = "http://127.0.0.1:8000/api/verAnexos/"+dni_tutor;
    return this.http.get<Anexo[]>(url)
  }

  public descargarAnexo(dni_tutor: string, codigo: string){
    let url: string = "http://127.0.0.1:8000/api/descargarAnexo/"+dni_tutor+"&"+codigo;
    return this.http.get<Anexo[]>(url)
  }

  public descargarTodo(dni_tutor: string){
    let url: string = "http://127.0.0.1:8000/api/descargarTodo/"+dni_tutor;
    return this.http.get<Anexo[]>(url)
  }

  public eliminarAnexo(dni_tutor: string, codigo: string){
    let url: string = "http://127.0.0.1:8000/api/eliminarAnexo/"+dni_tutor+"&"+codigo;
    return this.http.get<Anexo[]>(url)
  }

}
