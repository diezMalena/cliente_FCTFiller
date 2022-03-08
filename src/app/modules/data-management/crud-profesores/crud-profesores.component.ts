import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CrudProfesoresService } from 'src/app/services/crud-profesores.service';
import { ModalProfesoresComponent } from '../modal-profesores/modal-profesores.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { LoginStorageUserService } from 'src/app/services/login.storageUser.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-crud-profesores',
  templateUrl: './crud-profesores.component.html',
  styleUrls: ['./crud-profesores.component.scss']
})
export class CrudProfesoresComponent implements OnDestroy, OnInit {

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

  ngOnInit(): void {
    delete this.dtOptions['language'];
    this.verProfesores();
    this.getArrayProfesores();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  public verProfesores(){

    this.profesoresService.getProfesores(this.dni!).subscribe((response) => {
      this.profesores = response;
      response = (this.profesores as any).data;
      // Calling the DT trigger to manually render the table
      this.dtTrigger.next(this.profesores);
      $.fn.dataTable.ext.errMode = 'throw';
    });
    $.extend(true, $.fn.dataTable.defaults, {
      "language": { "url": '//cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json' }
    })

  }

  public getArrayProfesores(){
    this.profesoresService.profesoresArray.subscribe(array => {
      this.profesores = array;
    });
  }

  //0 ver, 1 es crear y 2 es editar

  public registrarProfesor(){
    sessionStorage.setItem("numPeticion", '1');
    this.modal.open(ModalProfesoresComponent, {size: 'md'});
  }

  public verProfesor(dni_profesor: string){
    sessionStorage.setItem("numPeticion", '0');
    sessionStorage.setItem("dniProfesor", dni_profesor);
    this.modal.open(ModalProfesoresComponent, {size: 'md'});

  }

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

  public modificarProfesor(dni_profesor: string){
    sessionStorage.setItem("numPeticion", '2');
    sessionStorage.setItem("dniProfesor", dni_profesor);
    this.modal.open(ModalProfesoresComponent, {size: 'md'});
  }
}
