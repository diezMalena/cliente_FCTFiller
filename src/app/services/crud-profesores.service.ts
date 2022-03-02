import { Injectable } from '@angular/core';
import { profesorResponse } from '../models/profesores/profesorResponse';
import { profesorCreateResponse } from '../models/profesores/profesorCreateResponse';
import { ProfesorCreate } from '../models/profesores/profesorCreate';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudProfesoresService {

  constructor(private http: HttpClient) { }

  public ruta='http://127.0.0.1:8000/api/';
  public profesoresArray = new BehaviorSubject<string>('');

  /**
   * @author Laura <lauramorenoramos@gmail.com>
   * Esta función nos trae del servidor los profesores del centro de estudios correspondiente
   * gracias al dni del director o jefe de estudios que esta consultando este crud
   * @param dni_profesor es el dni del profesor que realiza la solicitud
   * @returns
   */
  public getProfesores(dni_profesor: string){
    let url: string = this.ruta+'listarProfesores/'+dni_profesor;
    return this.http.get<profesorResponse>(url);
  }

  /**
   * @author Laura <lauramorenoramos@gmail.com>
   * Esta función nos trae del servidor un profesor en concreto
   * @param dni_profesor es el dni del profesor que vamos a ver
   * @returns
   */
  public getProfesor(dni_profesor: string){
    let url: string = this.ruta+'listarProfesor/'+dni_profesor;
    return this.http.get<profesorResponse>(url);
  }
/**
 * @author Laura <lauramorenoramos@gmail.com>
 * Esta función nos trae del servidor un profesor en concreto con unos parametros
 * en concreto para poder editarlo posteriormente
 * @param dni_profesor es el dni del profesor que se va a editar
 * @returns
 */
  public getProfesorEdit(dni_profesor: string){
    let url: string = this.ruta+'listarProfesorEditar/'+dni_profesor;
    return this.http.get<profesorCreateResponse>(url);
  }


  /**
   * @author Laura <lauramorenoramos@gmail.com>
   * Esta funcion envia el dni del profesor que vamos a eliminar a el servidor y lo
   * elimina
   * @param dni_profesor es el dni del profesor que se va a eliminar
   * @returns
   */
  public eliminarProfesor(dni_profesor: string){
    let url: string = this.ruta+'eliminarProfesor/'+dni_profesor;
    let headers= new HttpHeaders({
      'Content-Type' : 'application/json',
      //'x-access-token': `${sessionStorage.getItem('token')}`,
    });
    return this.http.delete(url,{headers});
  }

  /**
   * @author Laura <lauramorenoramos@gmail.com>
   * Esta función nos permite enviar un profesor al servidor y editarlo
   * @param usuario es el usuario que se va a editar
   * @returns
   */
public editarUser(usuario: ProfesorCreate){
    let url: string=this.ruta+'modificarProfesor';
    let headers= new HttpHeaders({
      'Content-Type' : 'application/json',
    });
    return this.http.post<profesorCreateResponse>(url,usuario,{headers:headers}).pipe(
      map((resp:ProfesorCreate)=>{
        return ProfesorCreate.userJSON(usuario);
      })
    );
}

/**
 *  @author Laura <lauramorenoramos@gmail.com>
   * Esta función nos permite enviar un profesor al servidor y crearlo
   * @param usuario es el usuario que se va a crear
 * @returns
 */
  public registrarProfesor(usuario: ProfesorCreate){
    let url: string=this.ruta+'addProfesor';
    let headers= new HttpHeaders({
      'Content-Type' : 'application/json',
    });
    return this.http.post<profesorCreateResponse>(url,usuario,{headers:headers}).pipe(
      map((resp:ProfesorCreate)=>{
        return ProfesorCreate.userJSON(usuario);
      })
    );

  }

  /**
   *  @author Laura <lauramorenoramos@gmail.com>
   * Esta funcion recoge el nuevo array de profesores en una variable
   * @param arrayProfesores
   */
  public getProfesoresInArray(arrayProfesores: string){
    this.profesoresArray.next(arrayProfesores);
  }
}
