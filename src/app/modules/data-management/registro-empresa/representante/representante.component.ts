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
  ape?;
  dni?;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {

    var representante:string = '';
    this.correoRepresentante = '';
    this.nombreRepresentante = '';
    this.ape = '';
    this.dni = '';
    if (sessionStorage.getItem(RepresentanteComponent.representante) != null) {
      representante = sessionStorage.getItem(RepresentanteComponent.representante)!;
      var datosRepre = JSON.parse(representante);
      this.correoRepresentante = datosRepre["correo"] ? datosRepre["correo"] : '';
      this.nombreRepresentante = datosRepre["nombre"] ? datosRepre["nombre"] : '';
      this.ape= datosRepre["apellido"] ? datosRepre["apellido"] : '';
      this.dni = datosRepre["dni"] ? datosRepre["dni"] : '';

  }

  this.representante = this.formBuilder.group({
    email: [this.correoRepresentante, [Validators.required, Validators.email]],
    nombre: [this.nombreRepresentante, [Validators.required]],
    apellido: [this.ape, [Validators.required]],
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
    var ape = this.representante.value.apellido;
    var dni = this.representante.value.dni;

    var datosRepresentante = {
      'correo': correo,
      'nombre': nombre,
      'apellido':ape,
      'dni': dni
    }

    sessionStorage.setItem(RepresentanteComponent.representante, JSON.stringify(datosRepresentante));
    //console.log(datosRepresentante);

    this.router.navigateByUrl('data-management/registro-empresa/empresa');

    this.onReset();
  }

  onReset(){
    this.submitted = false;
    this.representante.reset();
  }

}
