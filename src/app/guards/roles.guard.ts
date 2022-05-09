import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { LoginStorageUserService } from '../services/login.storageUser.service';

@Injectable({
  providedIn: 'root',
})
export class RolesGuard implements CanActivate {
  constructor(
    private storage: LoginStorageUserService,
    private router: Router
  ) {}

  /**
   * Permite pasar al usuario si tiene uno de los roles que especifican
   *
   * @author Dani J. Coello <daniel.jimenezcoello@gmail.com>
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const user: Usuario = this.storage.getUser()!;
    const roles: [number] = route.data['roles'];

    if (user.tipo === 'alumno') {
      return true;
    } else {
      for (let i = 0; i < roles.length; i++) {
        for (let j = 0; j < user.roles!.length; j++) {
          if (roles[i] === user.roles![j].id_rol) {
            return true;
          }
        }
      }
      this.router.navigateByUrl('');
      return false;
    }
  }
}
