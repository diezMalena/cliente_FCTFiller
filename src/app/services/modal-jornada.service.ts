import { Injectable, Output, EventEmitter } from '@angular/core';
import { Jornada } from '../models/Jornada/jornada';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ModalJornadaService {

  public ruta: string = "http://localhost:8000/api/";
  public jornadasArray = new BehaviorSubject<string>('');


  @Output() jornadaTrigger: EventEmitter<Jornada> = new EventEmitter();

  constructor(private http: HttpClient) { }

  public addJornada(jornada:Jornada, dni: string){
    let url: string = this.ruta + "addJornada";
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let datos = {
      jornada: jornada,
      dni_alumno: dni
    }

    console.log(datos);
    //var datosString = JSON.stringify(datos);
    return this.http.post(url, datos, {headers: headers});
  }

  public updateJornada(jornada:Jornada, dni: string){
    let url: string = this.ruta + "updateJornada";
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let datos = {
      jornada: jornada,
      dni_alumno: dni
    }
    console.log(datos);
    return this.http.post(url, datos, {headers: headers});
  }

  public getJornadasInArray(arrayJornada: string){
    this.jornadasArray.next(arrayJornada);
  }
}
