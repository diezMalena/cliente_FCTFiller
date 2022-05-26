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

  @Output() facturaTransporteTrigger: EventEmitter<any> = new EventEmitter();
  public facturaTransporteBS = new BehaviorSubject<FacturaTransporte>(new FacturaTransporte());

  private urlBase: string = environment.apiUrl;
  private urlGestionGastosAlumno: string = 'gestionGastosAlumno/';
  private urlActualizarDatosGastoAlumno: string = 'actualizarDatosGastoAlumno/';
  private urlActualizarDiasVehiculoPrivado: string = 'actualizarDiasVehiculoPrivado/';
  private urlActualizarFacturaTransporte: string = 'actualizarFacturaTransporte/';
  private urlNuevaFacturaTransporte: string = 'nuevaFacturaTransporte/';
  public headers: HttpHeaders;

  constructor(private http: HttpClient, headersService: HttpHeadersService) {
    this.headers = headersService.getHeadersWithToken();
  }

  /***********************************************************************/
  //#region Gestión de alumnos - CRUD

  /***********************************************************************/
  //#region CRUD - Create

  public nuevaFacturaTransporte(factura: FacturaTransporte) {
    let url = this.urlBase + this.urlNuevaFacturaTransporte;
    const headers = this.headers;

    return this.http.post(url, factura, { headers });
  }

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
  public obtenerGastosAlumno(dni: any) {
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

  public actualizarFacturaTransporte(factura: FacturaTransporte) {
    let url = this.urlBase + this.urlActualizarFacturaTransporte;
    const headers = this.headers;

    return this.http.put(url, JSON.stringify(factura), { headers });
  }

  public actualizarDiasVehiculoPrivado(gasto: Gasto) {
    let datos = {
      dni_alumno: gasto.dni_alumno,
      curso_academico: gasto.curso_academico,
      dias_transporte_privado: gasto.dias_transporte_privado
    };
    const url: string = this.urlBase + this.urlActualizarDiasVehiculoPrivado;
    const headers = this.headers;

    return this.http.put(url, JSON.stringify(datos), { headers });
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

  /**
   * Establece al Behaviour Subject el gasto
   * @param gasto Gasto del alumno
   * @author David Sánchez Barragán
   */
  public setGastoBS(gasto: Gasto) {
    this.gastoBS.next(gasto);
  }

  //#endregion
  /***********************************************************************/
}
