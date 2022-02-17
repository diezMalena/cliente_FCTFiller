import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public imgLogo: string;
  login: FormGroup;
  submitted: boolean = false;
  usuario?: Usuario;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private LoginService: LoginService,
  ) {
    this.imgLogo="./assets/images/logo.png";
    this.login = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern]]
    });
  }

  ngOnInit(): void {
  }

  get formulario() {
    return this.login.controls;
  }

  onSubmit() {
    this.submitted = true;
    if(!this.login.valid){
      return;
    }
    var datos = {
      'email': this.login.value.email,
      'pass': this.login.value.password
    }
    this.LoginService.login(datos).subscribe({
      next: () => {

        //Cuando la API esté lista, me devolverá un mensaje indicandome que la empresa ha sido registrada correctamente.
        //this.router.navigateByUrl('principal');
      },
      error: e => {
      }
    });

    this.onReset();
  }

  onReset() {
    this.submitted = false;
    this.login.reset();
  }
}
