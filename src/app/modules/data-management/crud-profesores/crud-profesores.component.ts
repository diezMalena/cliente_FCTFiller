import { Component, AfterViewInit, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CrudProfesoresService } from 'src/app/services/crud-profesores.service';
import { ModalProfesoresComponent } from '../modal-profesores/modal-profesores.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { LoginStorageUserService } from 'src/app/services/login.storageUser.service';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-crud-profesores',
  templateUrl: './crud-profesores.component.html',
  styleUrls: ['./crud-profesores.component.scss']
})
export class CrudProfesoresComponent implements AfterViewInit, OnDestroy, OnInit {

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective | undefined;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<any>();
  data: any;

  profesores: any =[];
  profesor: any = [];
  usuario;
  dni?: string;
  respuesta: any = [];

  constructor(
    private profesoresService: CrudProfesoresService,
    private router: Router,
    private toastr: ToastrService,
    private modal: NgbModal,
    private storageUser: LoginStorageUserService,
  ) {
    this.usuario = storageUser.getUser();
    this.dni = this.usuario?.dni
   }
  ngAfterViewInit(): void {
    this.dtTrigger.next(this.profesores);
  }

  ngOnInit(): void {
    delete this.dtOptions['language'];
    this.verProfesores();
    this.getArrayProfesores();
  }


  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    this.dtElement!.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next(this.profesores);
    });
  }

  /**
   * @author Laura <lauramorenoramos97@gmail.com>
   * Esta funcion recoge a los profesores del centro de estudios del director/jefe de estudios
   *
   */
  public verProfesores(){

    this.profesoresService.getProfesores(this.dni!).subscribe((response) => {
      this.profesores = response;
      response = (this.profesores as any).data;
      // Calling the DT trigger to manually render the table
      this.rerender();
      this.dtTrigger.next(this.profesores);
      $.fn.dataTable.ext.errMode = 'throw';
    });
    $.extend(true, $.fn.dataTable.defaults, {
      "language": { "url": '//cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json' }
    })

  }

  /**
   * @author Laura <lauramorenoramos97@gmail.com>
   * Esta funcion es una suscripcion a una variable BehaviorSubject que recoge el nuevo
   * array de profesores que ha sido modificado por haber añadido un profesor,
   * modificado un profesor o eliminado un profesor desde los modales
   */
  public getArrayProfesores(){
    this.profesoresService.profesoresArray.subscribe(array => {
      this.profesores = array;
      this.rerender();
    });
  }

  //0 ver, 1 es crear y 2 es editar
  /**
   * @author Laura <lauramorenoramos97@gmail.com>
   * Esta funcion sirve para llamar al modal que nos va a permitir registrar un profesor
   */
  public registrarProfesor(){
    sessionStorage.setItem("numPeticion", '1');
    this.modal.open(ModalProfesoresComponent, {size: 'md'});
  }

  /**
   * @author Laura <lauramorenoramos97@gmail.com>
   * Esta funcion sirve para llamar al modal que nos va a permitir ver un profesor
   */
  public verProfesor(dni_profesor: string){
    sessionStorage.setItem("numPeticion", '0');
    sessionStorage.setItem("dniProfesor", dni_profesor);
    this.modal.open(ModalProfesoresComponent, {size: 'md'});

  }

  /**
   * @author Laura <lauramorenoramos97@gmail.com>
   * Esta funcion sirve para llamar al modal que nos va a permitir eliminar un profesor
   */
  public eliminarProfesor(dni_profesor: string){
    this.profesoresService.eliminarProfesor(dni_profesor).subscribe({
      next:(res)=>{
        this.toastr.success('Profesor Eliminado', 'Eliminado');
        this.verProfesores();
      },
      error: e =>{
        console.log(e);
        this.toastr.error('El profesor no ha podido eliminarse', 'Fallo');
      }
    })
  }

  /**
   * @author Laura <lauramorenoramos97@gmail.com>
   * Esta funcion sirve para llamar al modal que nos va a permitir modificar un profesor
   */
  public modificarProfesor(dni_profesor: string){
    sessionStorage.setItem("numPeticion", '2');
    sessionStorage.setItem("dniProfesor", dni_profesor);
    this.modal.open(ModalProfesoresComponent, {size: 'md'});
  }
}
