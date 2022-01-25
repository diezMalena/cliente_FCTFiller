import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-representante',
  templateUrl: './representante.component.html',
  styleUrls: ['./representante.component.scss']
})
export class RepresentanteComponent implements OnInit {

  public static readonly representante: string = "representante";
  representante: FormGroup  ;
  submitted: boolean = false;
  correoRepresentante?;
  nombreRepresentante?;
  ape1?;
  ape2?;
  dni?;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {

    var representante:string = '';
    this.correoRepresentante = '';
    this.nombreRepresentante = '';
    this.ape1 = '';
    this.ape2 = '';
    this.dni = '';
    if (sessionStorage.getItem(RepresentanteComponent.representante) != null) {
      representante = sessionStorage.getItem(RepresentanteComponent.representante)!;
      var datosRepre = JSON.parse(representante);
      this.correoRepresentante = datosRepre["correo"] ? datosRepre["correo"] : '';
      this.nombreRepresentante = datosRepre["nombre"] ? datosRepre["nombre"] : '';
      this.ape1 = datosRepre["apellido1"] ? datosRepre["apellido1"] : '';
      this.ape2 = datosRepre["apellido2"] ? datosRepre["apellido2"] : '';
      this.dni = datosRepre["dni"] ? datosRepre["dni"] : '';

  }

  this.representante = this.formBuilder.group({
    email: [this.correoRepresentante, [Validators.required, Validators.email]],
    nombre: [this.nombreRepresentante, [Validators.required]],
    apellido1: [this.ape1, [Validators.required]],
    apellido2: [this.ape2, [Validators.required]],
    dni: [this.dni, [Validators.required, Validators.minLength(9), Validators.maxLength(9)]]
  });

}

  ngOnInit(): void {
  }

  get formulario(){
    return this.representante.controls;
  }

  onSubmit(){
    this.submitted = true;
    if(!this.representante.valid) return;

    var correo = this.representante.value.email;
    var nombre = this.representante.value.nombre;
    var ape1 = this.representante.value.apellido1;
    var ape2 = this.representante.value.apellido2;
    var dni = this.representante.value.dni;

    var datosRepresentante = {
      'correo': correo,
      'nombre': nombre,
      'apellido1':ape1,
      'apellido2':ape2,
      'dni': dni
    }

    sessionStorage.setItem(RepresentanteComponent.representante, JSON.stringify(datosRepresentante));
    //console.log(datosRepresentante);

    this.router.navigateByUrl('empresa'); //Esto deberia ser registro-empresa/empresa.

    this.onReset();
  }

  onReset(){
    this.submitted = false;
    this.representante.reset();
  }

}
