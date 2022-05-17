import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { LoginStorageUserService } from 'src/app/services/login.storageUser.service';


@Injectable({
  providedIn: 'root'
})
export class JefaturaCuestionariosGuardService implements CanActivate {

  usuario;

  constructor(
    private storageUser: LoginStorageUserService,
  ) {
    this.usuario = this.storageUser.getUser();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {


    if (this.usuario!.isJefatura()) {
      console.log("entra1");
      return true;
    }
    console.log("entra2");
    return false;
  }
}
