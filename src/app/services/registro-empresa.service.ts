import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HttpHeadersService } from './http-headers.service';

@Injectable({ providedIn: 'root' })
export class RegistroEmpresaService {
  @Output() descargarTrigger: EventEmitter<any> = new EventEmitter();
  public ruta: string = environment.apiUrl;
  private headers: HttpHeaders;

  constructor(
    private http: HttpClient,
    private headersService: HttpHeadersService
  ) {
    this.headers = headersService.getHeadersWithToken();
  }

  /**
   * Registra en la base de datos a una empresa, su representante legal
   * y la asignación de ciclos de interés para la empresa
   * @param datos Contiene los datos necesarios para realizar el registro
   * @returns Un observable con la respuesta del servidor
   * @author Malena
   */
  public enviarDatos(datos: object) {
    let url: string = this.ruta + 'addDatosEmpresa';
    const headers = this.headers;

    return this.http.post(url, datos, { headers });
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
    const HTTPOptions = this.headersService.getHeadersWithTokenArrayBuffer();

    return this.http.post(url, dato, HTTPOptions);
  }
}
