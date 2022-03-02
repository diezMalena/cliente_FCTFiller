import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { LoginService } from '../../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { LoginStorageUserService } from 'src/app/services/login.storageUser.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public static readonly usuario: string = "usuario";
  public imgLogo: string;
  login: FormGroup;
  submitted: boolean = false;
  usuario!: Usuario;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private LoginService: LoginService,
    private toastr: ToastrService,
    private storageUser: LoginStorageUserService,
  ) {
    this.imgLogo = "./assets/images/logo.png";
    this.login = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern]]
    });
  }

  ngOnInit(): void {
  }

  /**
   * Recoge los controles del formulario
   * @author Alvaro <alvarosantosmartin6@gmail.com>
   * @param event
   */
  get formulario() {
    return this.login.controls;
  }
  /**
   * Recoge los datos, comprueba que los campos sean válidos, almacena el email y la pass en una variale, lo envia al servidor,
   * según la respuesta salta un error de que los datos están incorrectos o te redirige a una página en función del tipo de usuario.
   * Guarda en la session el usuario.
   * @author Alvaro <alvarosantosmartin6@gmail.com>
   * @param event
   */
  onSubmit() {
    this.submitted = true;
    if (!this.login.valid) {
      return;
    }
    var datos = {
      'email': this.login.value.email,
      'pass': this.login.value.password
    }
    this.LoginService.login(datos).subscribe({
      next: (usuario: any) => {
        this.usuario = usuario;
        this.storageUser.setUser(this.usuario)
        sessionStorage.setItem(LoginComponent.usuario, JSON.stringify(usuario));
        this.toastr.success('Login realizado con éxito.', 'Login')
        if (this.usuario.tipo == 'trabajador') {
          window.location.href = ""
          // this.navegar('description/descriptioncomponent', {queryParams:''})
        }else if (this.usuario.tipo == 'profesor') {
          window.location.href = ""
          // this.navegar('description/descriptioncomponent', {queryParams:''})
        }else {
          window.location.href = ""
          // this.navegar('description/descriptioncomponent', {queryParams:''})
        }
      },
      error: e => {
        this.toastr.error('Datos de inicio de sesión incorrectos.', 'Error')
      }
    });
    this.onReset();
  }

  /**
   * Resetea el formulario
   * @author Alvaro <alvarosantosmartin6@gmail.com>
   * @param event
   */

  onReset() {
    this.submitted = false;
    this.login.reset();
  }

  /**
   * Se encarga de redirigir a una página u otra.
   * @author Alvaro <alvarosantosmartin6@gmail.com>
   * @param event
   */
  navegar(route?: string, params?: any): void {
    this.router.navigate([route], params);
  }
}
