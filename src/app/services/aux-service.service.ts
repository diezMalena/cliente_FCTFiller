import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuxService {
  @Output() alumnoTrigger: EventEmitter<any> = new EventEmitter();

  private urlBase: string = 'http://localhost:8000/api/';

  constructor(
    private http: HttpClient,
  ) { }

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
}
