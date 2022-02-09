import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Anexo } from '../models/anexo';
import { anexoResponse } from '../models/anexoResponse';

@Injectable({
  providedIn: 'root'
})


export class AnexoService {

  constructor(private http: HttpClient) { }

  public ruta='http://127.0.0.1:8000/api/';

  public getAnexos(dni_tutor: string){
    let dato= {dni_tutor:dni_tutor};
    let url: string = this.ruta+'listarAnexos';
    return this.http.post<anexoResponse>(url,dato);
  }


  public descargarAnexo(dni_tutor: string, codigo: string){
    let dato= {dni_tutor:dni_tutor, codigo: codigo};
    const url: string= this.ruta+"descargarAnexo";
    return this.http.post(url,dato, {responseType:'arraybuffer'});
  }

  public descargarTodo(dni_tutor: string){
    let dato= {dni_tutor:dni_tutor};
    const url: string= this.ruta+"descargarTodo";
    return this.http.post(url,dato, {responseType:'arraybuffer'});
  }


  public eliminarAnexo(dni_tutor: string, codigo: string){
    let dato= {dni_tutor:dni_tutor, codigo: codigo};
    let url: string = this.ruta+'eliminarAnexo';
    return this.http.post<anexoResponse>(url,dato);
  }

}
