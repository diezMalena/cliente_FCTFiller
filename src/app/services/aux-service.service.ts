import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuxService {
  @Output() alumnoTrigger: EventEmitter<any> = new EventEmitter();

  private urlBase: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /***********************************************************************/
  //#region Listado de provincias y ciudades

  /**
   * Obtiene un listado de provincias
   * @returns `Observable` de la `HttpResponse`.
   * @author David Sánchez Barragán
   */
  public listarProvincias() {
    let url = this.urlBase + 'listarProvincias';

    return this.http.get<string[]>(url).pipe(
      map((resp: string[]) => {
        return resp;
      })
    );
  }

  /**
   * Obtiene un listado de ciudades según una provincia
   * @param provincia Provincia de la que se quieren obtener las ciudades
   * @returns `Observable` de la `HttpResponse`.
   * @author David Sánchez Barragán
   */
  public listarCiudades(provincia: string) {
    let url = this.urlBase + 'listarCiudades/' + provincia;

    return this.http.get<string[]>(url).pipe(
      map((resp: string[]) => {
        return resp;
      })
    );
  }

  //#endregion
  /***********************************************************************/
}
