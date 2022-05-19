import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginStorageUserService } from './login.storageUser.service';
import { alumnoResponse } from '../models/alumnoResponse';
import { Alumno } from '../models/alumno';
import { environment } from 'src/environments/environment';
import { FacturaTransporte } from '../models/facturaTransporte';
import { facturaTransporteResponse } from '../models/facturaTransporteResponse';
import { HttpHeadersService } from './http-headers.service';
import { Gasto } from '../models/gasto';
import { gastoResponse } from '../models/gastoResponse';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GestionGastosService {
  @Output() gastoTrigger: EventEmitter<any> = new EventEmitter();
  public gastoBS = new BehaviorSubject<Gasto>(new Gasto());

  private urlBase: string = environment.apiUrl;
  private urlGestionGastosAlumno: string = 'gestionGastosAlumno/';
  private urlActualizarDatosGastoAlumno: string = 'actualizarDatosGastoAlumno/';
  public headers: HttpHeaders;

  constructor(private http: HttpClient, headersService: HttpHeadersService) {
    this.headers = headersService.getHeadersWithToken();
  }

  /***********************************************************************/
  //#region Gestión de alumnos - CRUD

  /***********************************************************************/
  //#region CRUD - Create



  //#endregion
  /***********************************************************************/

  /***********************************************************************/
  //#region CRUD - Read

  /**
   * Realiza una petición al servidor y obtiene la información necesaria para cargar la pantalla inicial
   * @param dni DNI del alumno
   * @returns `Observable` de la `HttpResponse`.
   * @author David Sánchez Barragán
   */
  public gestionGastosAlumno(dni: any) {
    let url = this.urlBase + this.urlGestionGastosAlumno + dni;
    const headers = this.headers;

    return this.http.get<Gasto>(url, { headers }).pipe(
      map((resp: gastoResponse) => {
        return Gasto.gastoJSON(resp);
      })
    );
  }



  //#endregion
  /***********************************************************************/

  /***********************************************************************/
  //#region CRUD - Update

  public actualizarDatosGastoAlumno(gasto: Gasto) {
    let url = this.urlBase + this.urlActualizarDatosGastoAlumno;
    const headers = this.headers;

    return this.http.put(url, JSON.stringify(gasto), { headers });
  }

  //#endregion
  /***********************************************************************/

  /***********************************************************************/
  //#region CRUD - Delete


  //#endregion
  /***********************************************************************/

  //#endregion
  /***********************************************************************/

  /***********************************************************************/
  //#region Funciones auxiliares

  // /**
  //  * Establece el array de alumnos
  //  * @param alumnosArray array de alumnos
  //  * @author David Sánchez Barragán
  //  */
  // public setAlumnosArray(alumnosArray: Alumno[]) {
  //   this.alumnosArray.next(alumnosArray);
  // }

  //#endregion
  /***********************************************************************/
}
