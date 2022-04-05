export interface usuarioResponse {
  email: string;
  nombre: string;
  apellidos: string;
  dni?: string;
  tipo?: string;
  roles?: [];
  token?: string;
  //DSB Cambio 10-03-2022: Añadido codigo de centro de estudios
  cod_centro?: string;
}
