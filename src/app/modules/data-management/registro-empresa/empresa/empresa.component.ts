import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.scss']
})
export class EmpresaComponent implements OnInit {

  public static readonly empresa: string = "empresa";
  empresa: FormGroup;
  submitted: boolean = false;
  correoEmpresa?;
  nombreEmpresa?;
  telefonoEmpresa?;
  cif?;
  tipoEmpresa?;

  constructor(

    private formBuilder: FormBuilder,
    private router: Router

  ) {

    var empresa: string;
    this.correoEmpresa = '';
    this.nombreEmpresa = '';
    this.telefonoEmpresa = '';
    this.cif = '';
    this.tipoEmpresa = '0';

    if(sessionStorage.getItem(EmpresaComponent.empresa) != null){
      empresa = sessionStorage.getItem(EmpresaComponent.empresa)!;
      var datosEmpresa = JSON.parse(empresa);
      this.correoEmpresa = datosEmpresa["correo"] ? datosEmpresa["correo"] : '';
      this.nombreEmpresa = datosEmpresa["nombre"] ? datosEmpresa["nombre"] : '';
      this.telefonoEmpresa = datosEmpresa["telefono"] ? datosEmpresa["telefono"] : '';
      this.cif = datosEmpresa["cif"] ? datosEmpresa["cif"] : '';
      this.tipoEmpresa = datosEmpresa["tipoEmpresa"] ? datosEmpresa["tipoEmpresa"] : '0';
    }

    this.empresa = this.formBuilder.group({
      email: [this.correoEmpresa,[Validators.required, Validators.email]],
      nombre: [this.nombreEmpresa,[Validators.required]],
      telefono: [this.telefonoEmpresa, [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      cif: [this.cif,[Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      tipoEmpresa: [this.tipoEmpresa,[Validators.required]],
    });

  }

  ngOnInit(): void {
  }

  get formulario(){
    return this.empresa.controls;
  }


  onSubmit(){
    this.submitted = true;
    if (!this.empresa.valid) return;

    var correo = this.empresa.value.email;
    var nombre = this.empresa.value.nombre;
    var telefono = this.empresa.value.telefono;
    var cif = this.empresa.value.cif;
    var tipoEmpresa = this.empresa.value.tipoEmpresa;
    // console.log(tipoEmpresa);

    var datosEmpresa = {
      'correo': correo,
      'nombre': nombre,
      'telefono': telefono,
      'cif': cif,
      'tipoEmpresa': tipoEmpresa,
    }

    sessionStorage.setItem(EmpresaComponent.empresa, JSON.stringify(datosEmpresa));
    console.log(datosEmpresa);

    this.router.navigateByUrl('data-management/registro-empresa/ubicacion');

    this.onReset();
  }

  onReset(){
    this.submitted = false;
    this.empresa.reset();
  }

}
