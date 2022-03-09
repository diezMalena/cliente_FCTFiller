import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Alumno } from 'src/app/models/alumno';
import { CrudAlumnosService } from 'src/app/services/crud-alumnos.service';
import { LoginStorageUserService } from 'src/app/services/login.storageUser.service';
import { ModalAlumnoComponent } from '../modal-alumno/modal-alumno.component';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-gestion-alumnos',
  templateUrl: './gestion-alumnos.component.html',
  styleUrls: ['./gestion-alumnos.component.scss']
})
export class GestionAlumnosComponent implements OnInit {

  public alumnos: Alumno[] = [];

  constructor(
    private crudAlumnosService: CrudAlumnosService,
    private loginStorageUser: LoginStorageUserService,
    private toastr: ToastrService,
    private modal: NgbModal,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {

    this.cargarAlumnos();

  }

  cargarAlumnos() {
    this.crudAlumnosService.listarAlumnos(this.loginStorageUser.getUser()?.dni).subscribe({
      next: (result) => {
        this.alumnos = result;
      },
      error: (error) => {
        this.toastr.error('No se han podido recuperar los datos', 'Error');
      }
    });
  }

  mostrarAlumno(alumno: Alumno, editar: boolean) {
    this.modal.open(ModalAlumnoComponent, {
      size: 'md',
      backdrop: 'static',
      keyboard: false,
    });
    this.crudAlumnosService.alumnoTrigger.emit([alumno, editar]);
  }

  borrarAlumno(alumno: Alumno) {
    this.dialog
      .open(ConfirmDialogComponent, {
        data: {
          title: 'Eliminar registro',
          message: `¿Está seguro de que quiere eliminar a este alumno?`,
        },
        width: '400px',
      })
      .afterClosed()
      .subscribe((res) => {
        if (res.respuesta) {
          this.crudAlumnosService.borrarAlumno(alumno.dni).subscribe({
            next: (response: any) => {
              this.toastr.success('Alumno borrado correctamente');
            },
            error: (error) => {
              this.toastr.error('Ha ocurrido un error al eliminar al alumno');
            }
          });
        }
      });
  }

}
