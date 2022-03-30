import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Anexo } from '../models/anexo';
import { anexoResponse } from '../models/anexoResponse';
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
   * @author Pablo y Laura <lauramorenoramos97@gmail.com>
   * @param dni_tutor Es el dni del tutor
   * @returns Un observable con un vector de anexos
   */
  public getAnexos(dni_tutor: string) {
    let url: string = this.ruta + 'listarAnexos/' + dni_tutor;
    return this.http.get<anexoResponse>(url);
  }

  /**
   * Solicita los grupos asociados a un docente
   * @param dni_tutor DNI del docente loggeado
   * @returns Un observable con los grupos
   * @author Laura
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
   * @returns
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
   * Este metodo hace una llamada a la api y descargar un anexo en concreto
   * @author Pablo
   * @param dni_tutor Es el dni del tutor
   * @param codigo Es el nombre del anexo que se va a descargar
   * @returns
   */
  public descargarAnexo(dni_tutor: string, codigo: string) {
    let dato = { dni_tutor: dni_tutor, codigo: codigo };
    const url: string = this.ruta + 'descargarAnexo';
    return this.http.post(url, dato, { responseType: 'arraybuffer' });
  }

  /**
   * Este metodo hace una llamada a la api y descarga todos los anexos
   * @author Pablo
   * @param dni_tutor  Es el dni del tutor
   * @returns
   */
  public descargarTodo(dni_tutor: string) {
    let dato = { dni_tutor: dni_tutor };
    const url: string = this.ruta + 'descargarTodo';
    return this.http.post(url, dato, { responseType: 'arraybuffer' });
  }

  //#endregion
  /***********************************************************************/
}
