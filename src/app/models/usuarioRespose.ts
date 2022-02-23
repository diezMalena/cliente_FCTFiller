export interface usuarioResponse {
  email: string;
  nombre: string;
  apellidos: string;
  dni?: string;
  tipo?: string;
  roles?: [];
  token?: string;
}
