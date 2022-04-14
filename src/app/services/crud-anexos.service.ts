import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Anexo } from '../models/anexo';
import { anexoResponse } from '../models/anexoResponse';
import { anexoAlumnoResponse } from '../models/anexoAlumnoResponse';
import { tutoriaResponse } from '../models/tutoriaResponse';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AnexoService {
  constructor(private http: HttpClient) {}

  public ruta = environment.apiUrl;

  /***********************************************************************/
  //#region Gestión de anexos - CRUD

  /***********************************************************************/
  //#region CRUD - Read

  /**
   * Este metodo hace una llamada a la api y listar los anexos
   * @param dni_tutor Es el dni del tutor
   * @returns Un observable con un vector de anexos
   *@author Laura <lauramorenoramos97@gmail.com>
   */
  public getAnexosHistory(dni_tutor: string) {
    let url: string = this.ruta + 'listarHistorial/' + dni_tutor;
    return this.http.get<anexoResponse>(url);
  }

  /**
   * @author Pablo y Laura <lauramorenoramos97@gmail.com>
   * @param dni_tutor Es el dni del tutor
   * @returns Observable con una lista de anexos
   * Este metodo hace una llamada a la api y listar los anexos
   */
  public getAnexos(dni_tutor: string) {
    let url: string = this.ruta + 'listarAnexos/' + dni_tutor;
    return this.http.get<anexoResponse>(url);
  }

    /**
   * @param dni_tutor Es el dni del alumno
   * @returns Observable con una lista de anexos
   * Este metodo hace una llamada a la api y listar los anexos de los alumnos
   *@author Laura <lauramorenoramos97@gmail.com>
   */
  public getAnexosAlumno(dni_alumno: string) {
    let url: string = this.ruta + 'listaAnexosAlumno/' + dni_alumno;
    return this.http.get<anexoAlumnoResponse>(url);
  }

  /**
   * Devuelve los grupos de un centro de estudios asociado al usuario loggeado
   * @param dni_tutor DNI del usuario loggeado
   * @returns Observable con una lista de grupos
   * @author Laura <lauramorenoramos97@gmail.com>
   */
  public getGrupos(dni_tutor: string) {
    let url: string = this.ruta + 'listarGrupos/' + dni_tutor;
    return this.http.get<tutoriaResponse>(url);
  }

  //#endregion
  /***********************************************************************/

  /***********************************************************************/
  //#region CRUD - Delete

  /**
   * Este metodo hace una llamada a la api y elimina un anexo
   * @author Laura <lauramorenoramos97@gmail.com>
   * @param dni_tutor  Es el dni del tutor
   * @param cod_anexo  Es el nombre del anexo que se va a eliminar
   * @returns Un observable con la respuesta del servidor
   */
  public eliminarAnexo(dni_tutor: string, cod_anexo: string) {
    cod_anexo = cod_anexo.replace('/', '*');
    cod_anexo = cod_anexo.replace('/', '*');

    let url: string =
      this.ruta + 'eliminarAnexo/' + dni_tutor + '/' + cod_anexo;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.delete<anexoResponse>(url, { headers });
  }

  //#endregion
  /***********************************************************************/

  //#endregion
  /***********************************************************************/

  /***********************************************************************/
  //#region Descarga de anexos

  /**
   * @author Pablo
   * @param dni_tutor Es el dni del tutor
   * @param codigo Es el nombre del anexo que se va a descargar
   * @returns
   * Este metodo hace una llamada a la api y descargar un anexo en concreto
   */
  public descargarAnexo(dni_tutor: string, codigo: string) {
    let dato = { dni_tutor: dni_tutor, codigo: codigo };
    const url: string = this.ruta + 'descargarAnexo';
    return this.http.post(url, dato, { responseType: 'arraybuffer' });
  }

  /**
   * Este metodo hace una llamada a la api y descargar un anexo en concreto
   * @author Pablo
   * @param dni_tutor Es el dni del tutor
   * @returns Un observable con la respuesta de descarga del servidor
   */
  public descargarTodo(dni_tutor: string) {
    let dato = { dni_tutor: dni_tutor, habilitado: 1 };
    const url: string = this.ruta + 'descargarTodo';
    return this.http.post(url, dato, { responseType: 'arraybuffer' });
  }

  /**
   * @param dni_tutor  es el dni del tutor
   * @returns Un observable con la respuesta del descarga del servidor
   * Este metodo hace una llamada a la api y descarga todos los anexos
   * @author Laura <lauramorenoramos97@gmail.com>
   */
  public descargarTodoHistorial(dni_tutor: string) {
    let dato = { dni_tutor: dni_tutor, habilitado: 0 };
    const url: string = this.ruta + 'descargarTodo';
    return this.http.post(url, dato, { responseType: 'arraybuffer' });
  }

  //#endregion
  /***********************************************************************/

  /***********************************************************************/
  //#region Habilitar y deshabilitar anexos

  /**
   * Hace una llamada a la API para deshabilitar un anexo
   * @param cod_anexo Código del anexo a deshabilitar
   * @returns Un observable con la respuesta del servidor
   * @author Laura <lauramorenoramos97@gmail.com>
   */
  public deshabilitarAnexo(cod_anexo: string) {
    cod_anexo = cod_anexo.replace('/', '*');
    cod_anexo = cod_anexo.replace('/', '*');

    let url: string = this.ruta + 'deshabilitarAnexo';

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      //'x-access-token': `${sessionStorage.getItem('token')}`,
    });

    let dato = { cod_anexo: cod_anexo };
    return this.http.post<anexoResponse>(url, dato, { headers });
  }

  /**
   * Hace una llamada a la API para habilitar un anexo
   * @param cod_anexo Código del anexo a deshabilitar
   * @returns Un observable con la respuesta del servidor
   * @author Laura <lauramorenoramos97@gmail.com>
   */
  public habilitarAnexo(dni_tutor: string, cod_anexo: string) {
    cod_anexo = cod_anexo.replace('/', '*');
    cod_anexo = cod_anexo.replace('/', '*');

    let url: string = this.ruta + 'habilitarAnexo';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      //'x-access-token': `${sessionStorage.getItem('token')}`,
    });

    let dato = { cod_anexo: cod_anexo, dni_tutor: dni_tutor };
    return this.http.post<anexoResponse>(url, dato, { headers });
  }

  //#endregion
  /***********************************************************************/
}
