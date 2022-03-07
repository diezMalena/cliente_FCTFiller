import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Empresa } from '../models/empresa';
import { EmpresaResponse } from '../models/empresaResponse';
import { Trabajador } from '../models/trabajador';
import { TrabajadorResponse } from '../models/trabajadorResponse';

@Injectable({
  providedIn: 'root',
})
export class CrudEmpresasService {
  @Output() empresaTrigger: EventEmitter<any> = new EventEmitter();

  public URLAPI: string = 'http://127.0.0.1:8000/api/';
  public empresasArray = new BehaviorSubject<Empresa[]>([]);

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

  /**
   * Devuelve un objeto con la información del representante de una empresa
   * @param idEmpresa la ID de la empresa
   * @returns un observable del representante de la empresa
   * @author Dani J. Coello <daniel.jimenezcoello@gmail.com>
   */
  public getRepresentante(idEmpresa: string): Observable<Trabajador> {
    const url: string = this.URLAPI + 'solicitar_representante/id=' + idEmpresa;
    return this.http.get<TrabajadorResponse>(url).pipe(
      map((trabajador: TrabajadorResponse) => {
        return Trabajador.trabajadorJSON(trabajador);
      })
    );
  }

  /**
   * Actualiza los datos de una empresa, devolviendo una respuesta del servidor
   * @param empresa La empresa a actualizar
   * @returns Un observable de la respuesta del servidor: 200 -> Todo bien; 400 -> Error
   * @author Dani J. Coello <daniel.jimenezcoello@gmail.com>
   */
  public updateEmpresa(empresa: Empresa) {
    const url: string = this.URLAPI + 'update_empresa';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.put(url, JSON.stringify(empresa), {headers});
  }

  /**
   * Actualiza los datos del representante legal de una empresa, devolviendo una respuesta del servidor
   * @param representante los datos del representante legal
   * @returns Un observable de la respuesta del servidor: 200 -> OK, 400 -> Error
   * @author Dani J. Coello <daniel.jimenezcoello@gmail.com>
   */
  public updateRepresentante(representante: Trabajador) {
    const url: string = this.URLAPI + 'update_representante';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.put(url, JSON.stringify(representante), {headers});
  }

  /**
   * Elimina una empresa de la base de datos
   * @param idEmpresa el ID de la empresa a eliminar
   * @returns una respuesta del servidor: 200 -> OK, 400 -> Error
   */
  public deleteEmpresa(idEmpresa: string) {
    const url: string = this.URLAPI + 'delete_empresa/id=' + idEmpresa;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    })
    return this.http.delete(url, {headers});
  }

  /**
   * Establece el array de empresas
   * @param empresasArray array de empresas
   * @author Dani J. Coello <daniel.jimenezcoello@gmail.com>
   */
  public getEmpresasArray(empresasArray: Empresa[]) {
    this.empresasArray.next(empresasArray);
  }
}
