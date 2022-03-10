import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Alumno } from 'src/app/models/alumno';
import { CrudAlumnosService } from 'src/app/services/crud-alumnos.service';
import { LoginStorageUserService } from 'src/app/services/login.storageUser.service';
import { ModalAlumnoComponent } from '../modal-alumno/modal-alumno.component';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { ModoEdicion } from 'src/app/models/modoEdicion';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-gestion-alumnos',
  templateUrl: './gestion-alumnos.component.html',
  styleUrls: ['./gestion-alumnos.component.scss']
})
export class GestionAlumnosComponent implements AfterViewInit, OnDestroy, OnInit {


  @ViewChild(DataTableDirective, {static: false})
  dtElement?: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<any>();

  public listaAlumnos: Alumno[] = [];
  public modosEdicion: typeof ModoEdicion = ModoEdicion;

  constructor(
    private crudAlumnosService: CrudAlumnosService,
    private loginStorageUser: LoginStorageUserService,
    private toastr: ToastrService,
    private modal: NgbModal,
    private dialog: MatDialog,
  ) { }

  ngAfterViewInit(): void {
    this.dtTrigger.next(this.listaAlumnos);
  }


  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    this.dtElement!.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();

    });
  }

  ngOnInit(): void {
    $.extend(true, $.fn.dataTable.defaults, {
      "language": { "url": '//cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json' }
    })
    this.cargarAlumnos();
    this.obtenerAlumnosDesdeModal()
  }

  cargarAlumnos() {
    this.crudAlumnosService.listarAlumnos(this.loginStorageUser.getUser()?.dni).subscribe({
      next: (result) => {
        this.listaAlumnos = result;
        this.rerender();
        this.dtTrigger.next(this.listaAlumnos);
        $.fn.dataTable.ext.errMode = 'throw';
      },
      error: (error) => {
        this.toastr.error('No se han podido recuperar los datos', 'Error');
      }
    });



  }

  mostrarAlumno(alumno: Alumno, modoEdicion: ModoEdicion) {
    this.modal.open(ModalAlumnoComponent, {
      size: 'md',
      backdrop: 'static',
      keyboard: false,
    });
    this.crudAlumnosService.alumnoTrigger.emit([alumno, modoEdicion]);
  }

  registrarAlumno() {
    this.modal.open(ModalAlumnoComponent, {
      size: 'md',
      backdrop: 'static',
      keyboard: false,
    });

    let alumno = new Alumno('', '', new Uint8Array(0));
    alumno.matricula_cod_centro = this.loginStorageUser.getUser()?.cod_centro;

    this.crudAlumnosService.alumnoTrigger.emit([alumno, this.modosEdicion.nuevo]);
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
              this.cargarAlumnos();
              this.toastr.success('Alumno borrado correctamente');
            },
            error: (error) => {
              this.toastr.error('Ha ocurrido un error al eliminar al alumno');
            }
          });
        }
      });
  }

  public obtenerAlumnosDesdeModal() {
    this.crudAlumnosService.alumnosArray.subscribe(array => {
      this.listaAlumnos = array;
      this.rerender();
      this.dtTrigger.next(this.listaAlumnos);
    })
  }

}
