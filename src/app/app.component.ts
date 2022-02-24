import { Component } from '@angular/core';
import { LoginStorageUserService } from './services/login.storageUser.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'cliente-fct-filler';
  usuario;
  constructor(
    private storageUser: LoginStorageUserService,
  ) {
    // let aux = sessionStorage.getItem(LoginComponent.usuario);
    // let usuario = JSON.parse(aux!)
    // this.usuario = Usuario.usuarioJSON(usuario)
    this.usuario = storageUser.getUser();
    console.log(this.usuario)
  }
}
