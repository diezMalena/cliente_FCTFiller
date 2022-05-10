import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginStorageUserService } from './login.storageUser.service';
import { alumnoResponse } from '../models/alumnoResponse';
import { Alumno } from '../models/alumno';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FacturaTransporte } from '../models/facturaTransporte';
import { facturaTransporteResponse } from '../models/facturaTransporteResponse';

@Injectable({ providedIn: 'root' })
export class GestionGastosService {
  //@Output() alumnoTrigger: EventEmitter<any> = new EventEmitter();
  //public alumnosArray = new BehaviorSubject<Alumno[]>([]);

  private urlBase: string = environment.apiUrl;
  private urlListarFacturasTransporte: string = 'listarFacturasTransporte/';

  constructor(private http: HttpClient) {}

  /***********************************************************************/
  //#region Gestión de alumnos - CRUD

  /***********************************************************************/
  //#region CRUD - Create



  //#endregion
  /***********************************************************************/

  /***********************************************************************/
  //#region CRUD - Read

  /**
   * Realiza una petición al servidor y obtiene un listado de facturas de transporte
   * @param dni DNI del alumno
   * @returns `Observable` de la `HttpResponse`.
   * @author David Sánchez Barragán
   */
  public listarFacturasTransporte(dni: any) {
    let url = this.urlBase + this.urlListarFacturasTransporte + dni;

    return this.http.get<FacturaTransporte[]>(url).pipe(
      map((resp: facturaTransporteResponse[]) => {
        return resp.map((fT) => FacturaTransporte.facturaTransporteJSON(fT));
      })
    );
  }



  //#endregion
  /***********************************************************************/

  /***********************************************************************/
  //#region CRUD - Update


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
