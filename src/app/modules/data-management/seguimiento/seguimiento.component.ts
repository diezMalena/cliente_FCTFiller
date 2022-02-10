
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalAddComponent } from './modal-add/modal-add.component' ;
import { ModalEditarComponent } from './modal-editar/modal-editar.component';
import { Jornada } from  '../../../models/Jornada/jornada';
import { ModalJornadaService } from '../../../services/modal-jornada.service';
import { SeguimientoServiceService } from 'src/app/services/seguimiento-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.component.html',
  styleUrls: ['./seguimiento.component.scss']
})
export class SeguimientoComponent implements OnInit {

  public arrayJornadas: any = [];
  public dni_alumno: string = "12345678Q";
  public nombre_alumno: any;
  public nombre_empresa: any;
  public departamento: any;
  public departamentoEstablecido: boolean = false;
  deptoForm: FormGroup;
  submitted: boolean = false;
  public horasTotales: number = 0;
  public botonDescargar: boolean = false;
  public botonVer: boolean = false;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private modal: NgbModal,
    private modalJornadaService: ModalJornadaService,
    private seguimientoService:SeguimientoServiceService
  ) {
    this.deptoForm = this.formBuilder.group({
      depto: ['',[Validators.required]],
    });
  }



  ngOnInit(): void {
    this.arrayJornadas = this.rellenarArray();
    this.ponerNombre();
    this.gestionDepartamento();
    this.sumatorioHorasTotales();
    this.getArrayJornadas();
  }



  get formulario(){
    return this.deptoForm.controls;
  }


  /**
   * Con este metodo recojo el array de las jornadas directamente del modal para que se actualice
   * la tabla de las jornadas al insertar una nueva, sin necesidad de recargar la pagina.
   * @author Malena.
   */
  public getArrayJornadas(){
    this.modalJornadaService.jornadasArray.subscribe(array => {
      this.arrayJornadas = array;
        var cuantasJornadasHay = this.arrayJornadas.length;
        //console.log(cuantasJornadasHay);

        //Cuando se inserten 5 nuevas jornadas, se habilita el boton Descargar PDF:
        if(cuantasJornadasHay >= 5 && cuantasJornadasHay % 5 == 0){
          this.botonDescargar = true;
          this.botonVer = false;
        }

        //Cuando haya más de 5 jornadas añadidas, se mostrará el boton Ver PDF:
        if(cuantasJornadasHay > 5 && cuantasJornadasHay % 5 != 0){
          this.botonVer = true;
          this.botonDescargar = false;
        }
      //console.log(this.arrayJornadas);
    });
  }


  /**
 * Mostrará un modal para rellenar los campos para poder insertar un nuevo registro en el seguimiento.
 * @author Malena
 */
  nuevaJornada(){
    this.modal.open(ModalAddComponent, { size: 'm' });
    /*const ventanaModal = this.modal.open(ModalAddComponent, { size: 'm' });
    ventanaModal.componentInstance.jornadaTrigger.subscribe(() => {
      console.log('holaaa');
    });
    */
  }


  /**
   * Metodo que recoge las jornadas que le corresponden al alumno y las muestra por pantalla.
   * @returns arrayJornada, las jornadas que tiene el alumno.
   * @author Malena.
   */


  public rellenarArray(){
    this.seguimientoService.devolverJornadas(this.dni_alumno).subscribe({
      next: (response: any) => {
        this.arrayJornadas = response;
        var cuantasJornadasHay = this.arrayJornadas.length;
        //console.log(cuantasJornadasHay);

        //Cuando se inserten 5 nuevas jornadas, se habilita el boton Descargar PDF:
        if(cuantasJornadasHay >= 5 && cuantasJornadasHay % 5 == 0){
          this.botonDescargar = true;
          this.botonVer = false;
        }

        //Cuando haya más de 5 jornadas añadidas, se mostrará el boton Ver PDF:
        if(cuantasJornadasHay > 5 && cuantasJornadasHay % 5 != 0){
          this.botonVer = true;
          this.botonDescargar = false;
        }


      },
      error: e => {
        console.log('error en el nombre',e);
      }
    });
    return this.arrayJornadas;
  }


  /**
   * Este metodo sirve para abrir el modal en la jornada correspondiente que se ha pulsado,
   * para poder editar sus datos y actualizarlos en la BBDD.
   * @author Malena
   */
  public editar(jornada: Jornada){
    this.modal.open(ModalEditarComponent, { size: 'm' });
    this.modalJornadaService.jornadaTrigger.emit(jornada);
  }



  /**
   * Este método escribe el nombre del alumno y el nombre de la empresa en la interfaz.
   * @author Malena
   */
  public ponerNombre(){
    //console.log(this.dni_alumno);
    this.seguimientoService.escribirDatos(this.dni_alumno).subscribe({
      next: (response: any) => {
        this.nombre_alumno = response[0]['nombre_alumno'] +' ' + response[0]['apellidos_alumno'] ;
        this.nombre_empresa = response[0]['nombre_empresa']
        //console.log(response);
      },
      error: e => {
        console.log('error en el nombre',e);
      }
    });
  }



  /**
   * Este método controla si el Departamento que le corresponde al alumno está establecido en la BBDD o no.
   * La interfaz cambiará dependiendo de si está establecido el valor o no.
   * @author Malena
   */
  public gestionDepartamento(){
    this.seguimientoService.gestionarDepartamento(this.dni_alumno).subscribe({
      next: (response:any) => {
        //console.log(response);
        if(response[0]['departamento'] != ''){
          this.departamentoEstablecido = true;
          this.departamento = response[0]['departamento'];
        }else{
          console.log('El departamento está vacío.');
          this.departamentoEstablecido = false;
        }
      },
      error: e => {
        console.log('error departamento');
      }
    });
  }



  /**
   * Este método recoge el valor del Departamento y se añade a la BBDD en la tabla FCT de
   * su correspondiente alumno.
   * @author Malena
   */
  public guardarDepartamento(){
    this.submitted = true;
    if(!this.deptoForm.valid) return;
    this.departamento = this.deptoForm.value.depto;
    //console.log(this.departamento);

    this.seguimientoService.addDepartamento(this.dni_alumno,this.departamento).subscribe({
      next: (response: any) => {
        this.departamentoEstablecido = true;
      },
      error: e => {
        console.log('error en add el departamento.',e);
      }
    });
  }



  /**
   * Este método se encarga de recoger el sumatorio de las horas totales que el alumno ha estado
   * haciendo en la empresa, y lo establece en la interfaz.
   * @author Malena.
   */
  public sumatorioHorasTotales(){
    this.seguimientoService.sumatorioHorasTotales(this.dni_alumno).subscribe({
      next: (response:any) => {
        this.horasTotales = response
      },
      error: e => {
        console.log('No han llegado las horas');
      }
    })
  }

  public descargarPDF(){
    this.seguimientoService.descargarPDF(this.dni_alumno).subscribe({
      next:(response) => {
        console.log('Se ha descargado');
      },
      error: e => {
        console.log('No se ha descargado el documento');
      }
    });
  }

  public verPDF(){

  }

}
