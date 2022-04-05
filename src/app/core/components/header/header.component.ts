import { Component, OnInit } from '@angular/core';
import { LoginStorageUserService } from 'src/app/services/login.storageUser.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public imgLogo: string;

  constructor(private storageUser: LoginStorageUserService) {
    this.imgLogo = './assets/images/logo.png';
  }

  ngOnInit(): void {}

  salir() {
    this.storageUser.removeUser();
    window.location.href = 'auth/login';
  }
}
