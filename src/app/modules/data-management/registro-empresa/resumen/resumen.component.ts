import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroEmpresaService } from '../../../../services/registro-empresa.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDescargaComponent } from '../modal-descarga/modal-descarga.component';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.scss']
})
export class ResumenComponent implements OnInit {

  public static readonly dni_tutor: string = "dni_tutor";
  public static repre: string = "representante";
  public static empresa: string = "empresa";
  public static ubi: string = "ubicacion";
  submitted: boolean = false;
  resumen: FormGroup;
  public correoRep: string;
  public nombreRep: string;
  public apellidosRep: string;
  public dniRep: string;

  public correoEmp: string;
  public nombreEmp: string;
  public telefonoEmp:number;
  public cifEmp: string;
  public tipoEmpresa: string;
  public tipoNumero: number = 0;

  public direccion: string;
  public localidad: string;
  public provincia: string;
  public cp: number;

  public dniTutor: string;

  constructor(

    private router: Router,
    private formBuilder: FormBuilder,
    private registroEmpresaService: RegistroEmpresaService,
    private modal: NgbModal,


  ) {
    this.correoRep = "hola";
    this.nombreRep = "hola";
    this.apellidosRep = "hola";
    this.dniRep = "hola";

    this.correoEmp = "hola";
    this.nombreEmp = "hola";
    this.telefonoEmp = 0;
    this.cifEmp = "hola";
    this.tipoEmpresa = '0';

    this.localidad = "hola";
    this.direccion = "hola";
    this.provincia = "hola";
    this.cp = 0;

    this.dniTutor = '20a';

    this.resumen = this.formBuilder.group({
      correoRep: [''],
      nombreRep: [''],
      apellidosRep: [''],
      dniRep: [''],
      correoEmp: [''],
      nombreEmp: [''],
      telefonoEmp: [''],
      cifEmp: [''],
      tipoEmpresa: [''],
      direccion: [''],
      localidad: [''],
      provincia: [''],
      cp: [''],
    });
  }

  ngOnInit(): void {
    var representante: string = sessionStorage.getItem(ResumenComponent.repre)!;
    var empresa = sessionStorage.getItem(ResumenComponent.empresa)!;
    var ubicacion = sessionStorage.getItem(ResumenComponent.ubi)!;

    var datosRepre = JSON.parse(representante);
    this.correoRep = datosRepre["correo"];
    this.nombreRep = datosRepre["nombre"];
    this.apellidosRep = datosRepre["apellido"];
    this.dniRep = datosRepre["dni"];

    var datosEmpresa = JSON.parse(empresa);
    this.correoEmp = datosEmpresa["correo"];
    this.nombreEmp = datosEmpresa["nombre"];
    this.telefonoEmp = datosEmpresa["telefono"];
    this.cifEmp = datosEmpresa["cif"];
    if(datosEmpresa["tipoEmpresa"] == '1'){
      this.tipoEmpresa = 'Privada';
    }else{
      this.tipoEmpresa = 'Pública';
    }
    this.tipoNumero = datosEmpresa["tipoEmpresa"];
    // console.log(this.tipoNumero);

    var datosUbicacion = JSON.parse(ubicacion);
    this.localidad = datosUbicacion["localidad"];
    this.direccion = datosUbicacion["direccion"];
    this.provincia = datosUbicacion["provincia"];
    this.cp = datosUbicacion["cp"];

  }

  get formulario(){
    return this.resumen.controls;
  }

  onSubmit(){
    this.submitted = true;
    if (!this.resumen.valid) return;

    var empresa = {
      'cif': this.cifEmp,
      'nombre': this.nombreEmp,
      'telefono': this.telefonoEmp,
      'email': this.correoEmp,
      'localidad':this.localidad,
      'provincia': this.provincia,
      'direccion': this.direccion,
      'cp': this.cp,
      'es_privada': this.tipoNumero,
    };

    var representante = {
      'dni': this.dniRep,
      'email':this.correoRep,
      'password':"superman",
      'nombre':this.nombreRep,
      'apellidos':this.apellidosRep,
    };


    var datos = {
      'empresa': empresa,
      'representante':representante,
      'dni':this.dniTutor,
    }

    console.log(datos);


    this.registroEmpresaService.enviarDatos(datos).subscribe({
      next: (response:any) => {
        let ruta = response.ruta_anexo;
        console.log(ruta);
        this.modal.open(ModalDescargaComponent,{ size: 'xs' });
        this.registroEmpresaService.descargarTrigger.emit([ruta]);
      },
      error: e => {
        console.log("No se han enviado los datos al servidor.");
      }
    });

    this.onReset();
  }

  onReset() {
    this.submitted = false;
    this.resumen.reset();
  }

}
