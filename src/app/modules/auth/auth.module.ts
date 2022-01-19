import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegistroComponent,
    ForgotPassComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AuthModule { }
