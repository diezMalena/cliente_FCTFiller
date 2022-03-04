import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CrudProfesoresService } from 'src/app/services/crud-profesores.service';
import { ModalProfesoresComponent } from '../modal-profesores/modal-profesores.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { LoginStorageUserService } from 'src/app/services/login.storageUser.service';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-crud-profesores',
  templateUrl: './crud-profesores.component.html',
  styleUrls: ['./crud-profesores.component.scss']
})
export class CrudProfesoresComponent implements OnInit {

  profesores: any =[];
  profesor: any = [];
  usuario;
  dni?: string;

  constructor(
    private profesoresService: CrudProfesoresService,
    private router: Router,
    private toastr: ToastrService,
    private modal: NgbModal,
    private storageUser: LoginStorageUserService,
    public dialogService: DialogService,
  ) {
    this.usuario = storageUser.getUser();
    this.dni = this.usuario?.dni
   }

  ngOnInit(): void {
  this.verProfesores();
  this.getArrayProfesores();
  }

  public verProfesores(){
    this.profesoresService.getProfesores(this.dni!).subscribe((response)=>{
      this.profesores=response;
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

  public async eliminarProfesor(dni_profesor: string){
    let hacerlo = await this.dialogService.confirmacion(
      'Eliminar',
      `¿Está seguro de que desea eliminar el profesor ` + dni_profesor + `?`
    );

    if (hacerlo) {
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
  }

  public modificarProfesor(dni_profesor: string){
    sessionStorage.setItem("numPeticion", '2');
    sessionStorage.setItem("dniProfesor", dni_profesor);
    this.modal.open(ModalProfesoresComponent, {size: 'md'});
  }
}
