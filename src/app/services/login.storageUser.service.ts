import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';

@Injectable({ providedIn: 'root' })
export class LoginStorageUserService {
  public static readonly SESSION_STORAGE_KEY: string = 'usuario';
  usuario?: Usuario;

  constructor() {}

  /**
   * Establece un usuario como variable de sesión
   * @param user Objeto con los datos del usuario
   * @author Álvaro
   */
  public setUser(user: Usuario) {
    this.usuario = user;
    sessionStorage.setItem(
      LoginStorageUserService.SESSION_STORAGE_KEY,
      JSON.stringify(this.usuario)
    );
    console.log(
      sessionStorage.getItem(LoginStorageUserService.SESSION_STORAGE_KEY)
    );
  }

  /**
   * Obtiene un usuario de la sesión en forma de objeto
   * @returns Un objeto con el usuario en sesión
   * @author Álvaro
   */
  public getUser() {
    let user: string | any = sessionStorage.getItem(
      LoginStorageUserService.SESSION_STORAGE_KEY
    );
    if (user) {
      this.usuario = Usuario.usuarioJSON(JSON.parse(user));
    }
    return this.usuario;
  }

  /**
   * Elimina al usuario de la sesión
   * @author Álvaro
   */
  public removeUser() {
    sessionStorage.removeItem(LoginStorageUserService.SESSION_STORAGE_KEY);
  }
}
