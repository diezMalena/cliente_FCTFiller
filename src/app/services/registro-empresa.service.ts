import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class RegistroEmpresaService {
  @Output() descargarTrigger: EventEmitter<any> = new EventEmitter();
  public ruta: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Registra en la base de datos a una empresa y su representante legal
   * @param datos Contiene los datos necesarios para realizar el registro
   * @returns Un observable con la respuesta del servidor
   * @author Malena
   */
  public enviarDatos(datos: object) {
    let url: string = this.ruta + 'addDatosEmpresa';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(url, datos, { headers: headers });
  }

  /**
   * Envía una señal de descarga del Anexo 0 / 0A al servidor
   * @param ruta Ruta del anexo a descargar
   * @returns Un observable con la descarga del anexo
   * @author Malena
   */
  public descargarAnexo0(ruta: string) {
    let dato = { ruta_anexo: ruta };
    const url: string = this.ruta + 'descargarAnexo0';
    return this.http.post(url, dato, { responseType: 'arraybuffer' });
  }
}
