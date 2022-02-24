import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';



@Injectable({
  providedIn: 'root'
})
export class LoginStorageUserService {

  public static readonly SESSION_STORAGE_KEY: string = "usuario";

  usuario ?: Usuario;

  constructor() { }

  public setUser(user: Usuario) {
    this.usuario = user;
    sessionStorage.setItem(LoginStorageUserService.SESSION_STORAGE_KEY, JSON.stringify(this.usuario));
    console.log(sessionStorage.getItem(LoginStorageUserService.SESSION_STORAGE_KEY));
  }

  public getUser() {
    let user : string | any  = sessionStorage.getItem(LoginStorageUserService.SESSION_STORAGE_KEY);
    if (user) {
      this.usuario = Usuario.usuarioJSON(JSON.parse(user))
    }
    return this.usuario
  }

  public removeUser() {
    sessionStorage.removeItem(LoginStorageUserService.SESSION_STORAGE_KEY);
  }
}
