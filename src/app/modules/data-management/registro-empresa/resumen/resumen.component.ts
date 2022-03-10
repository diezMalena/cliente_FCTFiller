import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroEmpresaService } from '../../../../services/registro-empresa.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'src/app/services/dialog.service';
import * as FileSaver from 'file-saver';
import { LoginStorageUserService } from 'src/app/services/login.storageUser.service';

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

  public dniTutor?: string;

  constructor(

    private router: Router,
    private formBuilder: FormBuilder,
    private registroEmpresaService: RegistroEmpresaService,
    private toastr: ToastrService,
    public dialogService: DialogService,
    private storageUser: LoginStorageUserService
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

    this.dniTutor = storageUser.getUser()?.dni;

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

    var datosUbicacion = JSON.parse(ubicacion);
    this.localidad = datosUbicacion["localidad"];
    this.direccion = datosUbicacion["direccion"];
    this.provincia = datosUbicacion["provincia"];
    this.cp = datosUbicacion["cp"];

  }

  get formulario(){
    return this.resumen.controls;
  }

  /**
   * @author Malena
   */
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

    this.registroEmpresaService.enviarDatos(datos).subscribe({
      next: (response:any) => {
        let ruta = response.ruta_anexo;
        console.log(ruta);
        this.abrirModalDialog(ruta);
        this.toastr.success('Datos guardados correctamente.','Registro de empresa.');
      },
      error: e => {
        this.toastr.error('No se han guardado los datos correctamente.','Error al registrar empresa');
      }
    });

    this.onReset();
  }

  onReset() {
    this.submitted = false;
    this.resumen.reset();
  }

  /**
   * Metodo que abre el Modal Dialog y si elegimos la opcion afirmativa, descargará el anexo 0.
   *
   * @author Malena
   * @param ruta
   */
  public async abrirModalDialog(ruta:string){
    let descargar = await this.dialogService.confirmacion(
      'Descargar Anexo 0',
      'Se ha generado el Anexo 0, ¿Quiere descargarlo?'
    );
    if(descargar){
      this.registroEmpresaService.descargarAnexo0(ruta).subscribe({
        next: (response: any) => {
          this.toastr.success('Anexo 0 descargado correctamente.','Descarga Anexo 0.');
          let arr = ruta.split('\\',3);
          let nombre = arr.pop();
          const blob = new Blob([response], {type: 'application/octet-stream'});
          FileSaver.saveAs(blob,nombre);
          //Hacer un split de la ruta, y hacer un pop para coger el ultimo elemento.
        },
        error: e => {
          this.toastr.error('No se ha descargado el Anexo 0.','Error al descargar el Anexo 0');
        }
      });
    }
    this.router.navigateByUrl('data-management/gestion-empresas');
  }

}
