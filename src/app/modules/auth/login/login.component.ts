import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login: FormGroup;
  submited: boolean = false;
  usuario?: Usuario;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
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
    this.submited = true;
    if(this.login.invalid){
      return;
    }
    this.usuario = new Usuario(this.login.value.email, this.login.value.password);
    this.onReset();
  }

  onReset() {
    this.submited = false;
    this.login.reset();
  }
}
