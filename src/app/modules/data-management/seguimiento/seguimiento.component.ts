
import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalAddComponent } from './modal-add/modal-add.component' ;
import { ModalEditarComponent } from './modal-editar/modal-editar.component';
import { Jornada } from  '../../../models/Jornada/jornada';
import { ModalJornadaService } from '../../../services/modal-jornada.service';
import { SeguimientoServiceService } from 'src/app/services/seguimiento-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as FileSaver from 'file-saver';
import { LoginStorageUserService } from 'src/app/services/login.storageUser.service';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'src/app/services/dialog.service';
import { ModalCambiotutorComponent } from './modal-cambiotutor/modal-cambiotutor.component';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ManualAnexo3Component } from '../../manuales/manual-anexo3/manual-anexo3.component';
import { isEmptyObject } from 'jquery';

@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.component.html',
  styleUrls: ['./seguimiento.component.scss']
})
export class SeguimientoComponent implements AfterViewInit, OnDestroy, OnInit{

  @ViewChild(DataTableDirective, { static: false })
  dtElement?: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<any>();

  usuario;
  public arrayJornadas: any = [];
  public dni_alumno?: string;
  public nombre_alumno: any;
  public nombre_empresa: any;
  public departamento: any;
  public departamentoEstablecido: boolean = false;
  deptoForm: FormGroup;
  submitted: boolean = false;
  public horasTotales: number = 0;
  public botonDescargar: boolean = false;
  public botonVer: boolean = false;
  public static readonly id_empresa: string = "id_empresa";
  public tutor_empresa: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private modal: NgbModal,
    private modalJornadaService: ModalJornadaService,
    private seguimientoService:SeguimientoServiceService,
    private storageUser: LoginStorageUserService,
    private toastr: ToastrService,
    public dialogService: DialogService
  ) {
    this.usuario = storageUser.getUser();
    this.dni_alumno = this.usuario?.dni
    this.deptoForm = this.formBuilder.group({
      depto: ['',[Validators.required]],
    });
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next(this.arrayJornadas);
  }

  ngOnInit(): void {
    this.arrayJornadas = this.rellenarArray();
    this.ponerNombre();
    this.recogerTutorEmpresa();
    this.gestionDepartamento();
    this.sumatorioHorasTotales();
    this.getArrayJornadas();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    this.dtElement!.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next(this.arrayJornadas);
    });
  }


  /**
   * Método que recoge el tutor que tiene asignado el alumno en la empresa.
   * @author Malena
   */
  public recogerTutorEmpresa(){
    this.seguimientoService.recogerTutorEmpresa(this.dni_alumno!).subscribe({
      next: (response: any) => {
        this.tutor_empresa = response[0]['dni_tutor'] +' - ' + response[0]['nombre_tutor'] ;
        /*La empresa a la que pertenece el alumno, me la llevo al modal de cambiar tutor para poder
        sacar los tutores/responsables de dicha empresa:*/
        let id_empresa = response[1];
        sessionStorage.setItem(SeguimientoComponent.id_empresa, JSON.stringify(id_empresa));
      },
      error: e => {
        this.toastr.error('No se ha podido recoger el tutor empresa.','Error al recoger el tutor');
      }
    });
  }

  /**
   * Método que abre un modal para seleccionar el nuevo tutor del alumno en la empresa.
   * @author Malena
   */
  public modalCambiarTutor(){
    this.modal.open(ModalCambiotutorComponent, { size: 'xs' });
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
        this.sumatorioHorasTotales();

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

        this.rerender();
    });
  }


  /**
 * Mostrará un modal para rellenar los campos para poder insertar un nuevo registro en el seguimiento.
 * @author Malena
 */
  nuevaJornada(){
    this.modal.open(ModalAddComponent, { size: 'm' });
  }


  /**
   * Metodo que recoge las jornadas que le corresponden al alumno y las muestra por pantalla.
   * @returns arrayJornada, las jornadas que tiene el alumno.
   * @author Malena.
   */
  public rellenarArray(){
    this.seguimientoService.devolverJornadas(this.dni_alumno!).subscribe({
      next: (response: any) => {
        this.arrayJornadas = response;
        var cuantasJornadasHay = this.arrayJornadas.length;

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

        this.rerender();
        $.fn.dataTable.ext.errMode = 'throw';
        this.dtTrigger.next(this.arrayJornadas);
      },
      error: e => {
        this.toastr.error('No se han podido mostrar las jornadas.','Error al mostrar jornadas');
      }
    });
    $.extend(true, $.fn.dataTable.defaults, {
      language: { url: '//cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json' },
      columnDefs: [
        {
          targets: 'nosort',
          orderable: false,
        },
      ],
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
    this.seguimientoService.escribirDatos(this.dni_alumno!).subscribe({
      next: (response: any) => {
        this.nombre_alumno = response[0]['nombre_alumno'] +' ' + response[0]['apellidos_alumno'] ;
        this.nombre_empresa = response[0]['nombre_empresa']
      },
      error: e => {
        this.toastr.error('No se ha podido mostrar ni el nombre del alumno ni de la empresa.','Error al mostrar datos');
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
    this.seguimientoService.gestionarDepartamento(this.dni_alumno!).subscribe({
      next: (response:any) => {
        //console.log(response);
        if(response[0]['departamento'] != ''){
          this.departamentoEstablecido = true;
          this.departamento = response[0]['departamento'];
        }else{
          this.departamentoEstablecido = false;
        }
      },
      error: e => {
        this.toastr.error('No se ha podido mostrar el departamento.','Error al mostrar departamento');
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

    this.seguimientoService.addDepartamento(this.dni_alumno!,this.departamento).subscribe({
      next: (response: any) => {
        this.departamentoEstablecido = true;
      },
      error: e => {
        this.toastr.error('No se ha podido añadir el departamento.','Error al añadir departamento');
      }
    });
  }


  /**
   * Este método se encarga de recoger el sumatorio de las horas totales que el alumno ha estado
   * haciendo en la empresa, y lo establece en la interfaz.
   * @author Malena.
   */
  public sumatorioHorasTotales(){
    this.seguimientoService.sumatorioHorasTotales(this.dni_alumno!).subscribe({
      next: (response:any) => {
        this.horasTotales = response
      },
      error: e => {
        this.toastr.error('No se ha podido mostrar las horas totales.','Error al mostrar horas totales');
      }
    })
  }

/**
 * Método que abre el Modal Dialog y depende de la respuesta hace una cosa u otra, en este
 * caso descargaría la hoja de seguimiento correspondiente.
 * @author Malena
 */
  public async descargarPDF(){
    if(this.deptoForm.value.depto == ""){
      this.toastr.error('No puedes descargar el documento sin añadir el departamento.','Error al descargar el documento');
    }else{
      let descargar = await this.dialogService.confirmacion(
        'Descargar Anexo III',
        'Se ha generado tu hoja de seguimiento, ¿Quiere descargarla?'
      );
      if(descargar){
        this.seguimientoService.descargarPDF(this.dni_alumno!).subscribe({
          next:(res:any) => {
            const blob = new Blob([res], {type: 'application/octet-stream'});
            FileSaver.saveAs(blob,'hoja_seguimiento.docx');
            this.toastr.success('Se ha descargado la hoja de seguimiento correctamente.','Generación de Anexo III');
          },
          error: e => {
            this.toastr.error('No se ha podido generar el documento correctamente.','Error en la generación del Anexo III');
          }
        });
      }
    }
  }

  /**
   * Método para abrir el manual del anexo3.
   * @author Malena
   */
  public abrirAyuda(){
    this.modal.open(ManualAnexo3Component, { size: 'lg' });
  }
}
