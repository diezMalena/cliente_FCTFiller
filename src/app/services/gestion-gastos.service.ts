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
import { GastoProfesor } from '../models/gastoProfesor';
import { gastoResponse } from '../models/gastoResponse';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { FacturaManutencion } from '../models/facturaManutencion';
import { gastoProfesorResponse } from '../models/gastoProfesorResponse';

@Injectable({ providedIn: 'root' })
export class GestionGastosService {
  @Output() gastoTrigger: EventEmitter<any> = new EventEmitter();
  public gastoBS = new BehaviorSubject<Gasto>(new Gasto());

  @Output() facturaTransporteTrigger: EventEmitter<any> = new EventEmitter();
  public facturaTransporteBS = new BehaviorSubject<FacturaTransporte>(new FacturaTransporte());

  @Output() facturaManutencionTrigger: EventEmitter<any> = new EventEmitter();
  public facturaManutencionBS = new BehaviorSubject<FacturaTransporte>(new FacturaTransporte());

  private urlBase: string = environment.apiUrl;
  private urlGestionGastosAlumno: string = 'gestionGastosAlumno/';
  private urlActualizarDatosGastoAlumno: string = 'actualizarDatosGastoAlumno/';
  private urlActualizarDiasVehiculoPrivado: string = 'actualizarDiasVehiculoPrivado/';
  private urlActualizarFacturaTransporte: string = 'actualizarFacturaTransporte/';
  private urlNuevaFacturaTransporte: string = 'nuevaFacturaTransporte/';
  private urlActualizarFacturaManutencion: string = 'actualizarFacturaManutencion/';
  private urlNuevaFacturaManutencion: string = 'nuevaFacturaManutencion/';
  private urlEliminarFacturaTransporte: string = 'eliminarFacturaTransporte/';
  private urlEliminarFacturaManutencion: string = 'eliminarFacturaManutencion/';
  private urlGestionGastosProfesor: string = 'gestionGastosProfesor/';
  private urlEliminarAlumnoDeGastos: string = 'eliminarAlumnoDeGastos/';
  private urlNuevoAlumnoGestionGastos: string = 'nuevoAlumnoGestionGastos/';
  private urlDescargarAnexoVI: string = 'descargarAnexoVI/';

  public headers: HttpHeaders;

  constructor(private http: HttpClient, headersService: HttpHeadersService) {
    this.headers = headersService.getHeadersWithToken();
  }

  /***********************************************************************/
  //#region Gestión de gastos de alumnos - CRUD

  /***********************************************************************/
  //#region CRUD - Create

  public nuevaFacturaTransporte(factura: FacturaTransporte) {
    let url = this.urlBase + this.urlNuevaFacturaTransporte;
    const headers = this.headers;

    return this.http.post(url, factura, { headers });
  }

  public nuevaFacturaManutencion(factura: FacturaManutencion) {
    let url = this.urlBase + this.urlNuevaFacturaManutencion;
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

  public actualizarFacturaManutencion(factura: FacturaManutencion) {
    let url = this.urlBase + this.urlActualizarFacturaManutencion;
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

  public eliminarFacturaManutencion(id: number) {
    let url = this.urlBase + this.urlEliminarFacturaManutencion + id;
    const headers = this.headers;

    return this.http.delete<any>(url, { headers }).pipe(
      map((resp: any) => {
        return resp;
      })
    );
  }

  public eliminarFacturaTransporte(id: number) {
    let url = this.urlBase + this.urlEliminarFacturaTransporte + id;
    const headers = this.headers;

    return this.http.delete<any>(url, { headers }).pipe(
      map((resp: any) => {
        return resp;
      })
    );
  }

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

  public descargarAnexoVI() {
    let url = this.urlBase + this.urlDescargarAnexoVI;
    const headers = this.headers;

    return this.http.get(url, { headers: headers, responseType: 'blob' });
  }

  //#endregion
  /***********************************************************************/


  /***********************************************************************/
  //#region Gestión de gastos de profesores - CRUD

  //#region CRUD - Read

  /**
   * Realiza una petición al servidor y obtiene la información necesaria para cargar la pantalla inicial para el profesor
   * @returns `Observable` de la `HttpResponse`.
   * @author David Sánchez Barragán
   */
   public obtenerGastosProfesor() {
    let url = this.urlBase + this.urlGestionGastosProfesor;
    const headers = this.headers;

    return this.http.get<GastoProfesor>(url, { headers }).pipe(
      map((resp: gastoProfesorResponse) => {
        return GastoProfesor.gastoProfesorJSON(resp);
      })
    );
  }

  //#endregion

  //#region CRUD - Delete

  /**
   * Realiza una petición al servidor y obtiene la información necesaria para cargar la pantalla inicial para el profesor
   * @returns `Observable` de la `HttpResponse`.
   * @author David Sánchez Barragán
   */
   public eliminarAlumnoDeGastos(dni: string) {
    let url = this.urlBase + this.urlEliminarAlumnoDeGastos + dni;
    const headers = this.headers;

    return this.http.delete<any>(url, { headers }).pipe(
      map((resp: any) => {
        return resp;
      })
    );
  }

  //#endregion

  //#region CRUD - Create

  /**
   * Realiza una petición al servidor para insertar un nuevo alumno en la gestión de gastos
   * @returns `Observable` de la `HttpResponse`.
   * @author David Sánchez Barragán
   */
   public nuevoAlumnoGestionGastos(alumno: Alumno) {
    let url = this.urlBase + this.urlNuevoAlumnoGestionGastos;
    const headers = this.headers;

    return this.http.post(url, alumno, { headers });
  }

  //#endregion

  //#endregion
  /***********************************************************************/

}
