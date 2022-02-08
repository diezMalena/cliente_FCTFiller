import { HttpClient } from '@angular/common/http';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Empresa } from '../models/empresa';
import { EmpresaResponse } from '../models/empresaResponse';

@Injectable({
  providedIn: 'root',
})
export class CrudEmpresasService {
  @Output() empresaTrigger: EventEmitter<any> = new EventEmitter();
  public URLAPI: string = 'http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient) {}

  /**
   * Devuelve una lista de empresas asociadas a un profesor mediante el centro de estudios
   * @param dniProfesor el DNI del profesor logueado
   * @returns un observable del vector de empresas asociadas al profesor
   * @author Dani J. Coello <daniel.jimenezcoello@gmail.com>
   */
  public getEmpresas(dniProfesor: string): Observable<Empresa[]> {
    const url: string =
      this.URLAPI + 'solicitar_empresas/profesor=' + dniProfesor;
    return this.http.get<EmpresaResponse[]>(url).pipe(
      map((resp: EmpresaResponse[]) => {
        return resp.map((empresa) => Empresa.empresaJSON(empresa));
      })
    );
  }

}
