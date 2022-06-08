import { Component, OnInit } from '@angular/core';
import { LoginStorageUserService } from 'src/app/services/login.storageUser.service';
import { NotificacionesService } from 'src/app/services/notificaciones.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public imgLogo: string;
  usuario;
  public email?:string;
  public dni?:string;
  public numNotificaciones:number = 0;
  public array3Notificaciones: any = [];

  constructor
    (
      private storageUser: LoginStorageUserService,
      private notificacionesService: NotificacionesService,
    ) {
    this.imgLogo = './assets/images/logo.png';
    this.usuario = storageUser.getUser();
    this.email = this.usuario?.email;
    this.dni = this.usuario?.dni;
  }

  ngOnInit(): void {
    this.generarNotificaciones();
    this.get3Notificaciones();
    this.countNotificaciones();
  }

  salir() {
    this.storageUser.removeUser();
    window.location.href = 'auth/login';
  }

  public generarNotificaciones(){
    this.notificacionesService.generarNotificaciones(this.dni!, this.email!).subscribe({
      next:()=>{},
      error:(e)=>{}
    })
  }

  public get3Notificaciones(){
    this.notificacionesService.getNotificacionesHeader(this.dni!, this.email!).subscribe({
      next:(response:any)=>{
        this.array3Notificaciones = response;
      },
      error:(e)=>{

      }
    })
  }

  public countNotificaciones(){
    this.notificacionesService.countNotificaciones(this.dni!, this.email!).subscribe({
      next:(response:any)=>{
        this.numNotificaciones = response;
      },
      error:(e)=>{

      }
    })
  }
}
