import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Empresa } from '../models/empresa';

@Injectable({
  providedIn: 'root'
})
export class CrudEmpresasService {

  public URLAPI: string = 'http://127.0.0.1:8000/api/';

  constructor( private http: HttpClient) { }

  public getEmpresas(dniProfesor: string) {
    let url: string = this.URLAPI + 'getEmpresas/profe=' + dniProfesor;
    console.log(this.http.get<Empresa[]>(url));
    return this.http.get<Empresa[]>(url)
  }

}
