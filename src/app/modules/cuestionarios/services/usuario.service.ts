import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { LoginStorageUserService } from 'src/app/services/login.storageUser.service';
import { CuestionarioRespondidoService } from 'src/app/services/cuestionarios/cuestionarioRespondido.service';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class UsuarioCuestionariosGuardService implements CanActivate {

  usuario;

  constructor(
    private storageUser: LoginStorageUserService,
    private cuestionarioRespondido: CuestionarioRespondidoService,
    private toastr: ToastrService,
  ) {
    this.usuario = this.storageUser.getUser();
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    // this.verificarCuestionarioRespondido();
    let respondido = await this.getData();

    if (this.usuario!.isAlumno() || this.usuario!.isTutorEmpresa()) {
      if(respondido){
        this.toastr.info('No hay cuestionarios pendientes de contestar', '¡Atención!');
        return false;

      }return true;
    }
    return false;
  }



  verificarCuestionarioRespondido() {
    this.cuestionarioRespondido.verificarCuestionarioRespondido(this.usuario?.dni).subscribe((res) => {
      console.log(res);
      if(res.length>0){
        return true;
      } return false;
    })
  }

  async getData() {
    let data = await this.cuestionarioRespondido.getDataSynchronous(this.usuario?.dni)
    console.log(data);
    if(data.length>0){
      return true;
    } return false;
 }


}
