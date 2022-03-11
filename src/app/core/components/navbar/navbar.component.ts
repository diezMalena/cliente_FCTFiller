import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { LoginComponent } from 'src/app/modules/auth/login/login.component';
import { LoginStorageUserService } from 'src/app/services/login.storageUser.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  usuario;
  constructor(
    private storageUser: LoginStorageUserService,
  ) {
    // let aux = sessionStorage.getItem(LoginComponent.usuario);
    // let usuario = JSON.parse(aux!)
    // this.usuario = Usuario.usuarioJSON(usuario)
    this.usuario = storageUser.getUser();
  }

  ngOnInit(): void {
    console.log(this.usuario)
  }

}
