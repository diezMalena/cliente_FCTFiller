import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Anexo } from '../models/anexo';
import { anexoResponse } from '../models/anexoResponse';
import { tutoriaResponse } from '../models/tutoriaResponse';

@Injectable({
  providedIn: 'root'
})


export class AnexoService {

  constructor(private http: HttpClient) { }

  public ruta='http://127.0.0.1:8000/api/';

  /**
   * @author Pablo y Laura <lauramorenoramos97@gmail.com>
   * @param dni_tutor Es el dni del tutor
   * @returns
   *  Este metodo hace una llamada a la api y listar los anexos
   */
  public getAnexos(dni_tutor: string){
    let url: string = this.ruta+'listarAnexos/'+dni_tutor;
    return this.http.get<anexoResponse>(url);
  }

  public getGrupos(dni_tutor: string){
    let url: string = this.ruta+'listarGrupos/'+dni_tutor;
    return this.http.get<tutoriaResponse>(url);
  }


  /**
   * @author Pablo
   * @param dni_tutor Es el dni del tutor
   * @param codigo Es el nombre del anexo que se va a descargar
   * @returns
   * Este metodo hace una llamada a la api y descargar un anexo en concreto
   */
  public descargarAnexo(dni_tutor: string, codigo: string){
    let dato= {dni_tutor:dni_tutor, codigo: codigo};
    const url: string= this.ruta+"descargarAnexo";
    return this.http.post(url,dato, {responseType:'arraybuffer'});
  }


  /**
   * @author Pablo
   * @param dni_tutor  es el dni del tutor
   * @returns
   * Este metodo hace una llamada a la api y descarga todos los anexos
   */
  public descargarTodo(dni_tutor: string){
    let dato= {dni_tutor:dni_tutor};
    const url: string= this.ruta+"descargarTodo";
    return this.http.post(url,dato, {responseType:'arraybuffer'});
  }


  /**
   * @author Laura <lauramorenoramos97@gmail.com>
   * @param dni_tutor  Es el dni del tutor
   * @param cod_anexo  Es el nombre del anexo que se va a eliminar
   * @returns
   * Este metodo hace una llamada a la api y elimina un anexo
   */
  public eliminarAnexo(dni_tutor: string, cod_anexo: string){
    cod_anexo = cod_anexo.replace('/', "*");
    cod_anexo = cod_anexo.replace('/', "*");

    let url: string = this.ruta+'eliminarAnexo/'+dni_tutor+'/'+cod_anexo;
    let headers= new HttpHeaders({
      'Content-Type' : 'application/json',
      //'x-access-token': `${sessionStorage.getItem('token')}`,
    });
    return this.http.delete<anexoResponse>(url,{headers});
  }

}
