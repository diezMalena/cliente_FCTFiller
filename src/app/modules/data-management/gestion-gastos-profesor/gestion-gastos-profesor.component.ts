import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Alumno } from 'src/app/models/alumno';
import { LoginStorageUserService } from 'src/app/services/login.storageUser.service';
import { ModalAlumnoComponent } from '../modal-alumno/modal-alumno.component';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { ModoEdicion } from 'src/app/models/modoEdicion';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ManualGestionAlumnosComponent } from '../../manuales/manual-gestion-alumnos/manual-gestion-alumnos.component';
import { GastoProfesor } from 'src/app/models/gastoProfesor';
import { GestionGastosService } from 'src/app/services/gestion-gastos.service';
import { Gasto } from 'src/app/models/gasto';
import { Router } from '@angular/router';
import { ModalTicketDesplazamiento } from '../modal-ticket-desplazamiento/modal-ticket-desplazamiento.component';
import { FacturaTransporte } from 'src/app/models/facturaTransporte';
import { FacturaManutencion } from 'src/app/models/facturaManutencion';
import { ModalTicketManutencion } from '../modal-ticket-manutencion/modal-ticket-manutencion.component';
import * as FileSaver from 'file-saver';

GestionGastosService

@Component({
  selector: 'app-gestion-gastos-profesor',
  templateUrl: './gestion-gastos-profesor.component.html',
  styleUrls: ['./gestion-gastos-profesor.component.scss']
})
export class GestionGastosProfesorComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild(DataTableDirective, { static: false })

  /***********************************************************************/
  //#region Inicialización de variables
  dtElement?: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<any>();

  public gastoProfesor?: GastoProfesor;
  public modosEdicion: typeof ModoEdicion = ModoEdicion;
  //UI
  public curso?: string = '';

  constructor(
    private gestionGastosService: GestionGastosService,
    private loginStorageUser: LoginStorageUserService,
    private toastr: ToastrService,
    private modal: NgbModal,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    $.extend(true, $.fn.dataTable.defaults, {
      language: { url: '//cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json' },
    });
    this.cargarGastoProfesor();
  }

  //#endregion
  /***********************************************************************/

  /***********************************************************************/
  //#region Gestión de datatables

  ngAfterViewInit(): void {
    this.dtTrigger.next(this.gastoProfesor?.gastos);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    this.dtElement!.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
    });
  }

  //#endregion
  /***********************************************************************/

  /***********************************************************************/
  //#region Servicios - Peticiones al servidor

  /***********************************************************************/
  //#region Obtención de información: alumnos

  /**
   * Envía una petición al servidor para cargar los alumnos de un grupo y los lista en la tabla
   * @author David Sánchez Barragán
   */
  cargarGastoProfesor() {
    this.gestionGastosService
      .obtenerGastosProfesor()
      .subscribe({
        next: (result) => {
          this.gastoProfesor = result;
          this.rerender();
          this.dtTrigger.next(this.gastoProfesor.gastos);
          $.fn.dataTable.ext.errMode = 'throw';
          //UI
          this.curso = this.gastoProfesor?.nombreGrupo;
        },
        error: (error) => {
          this.toastr.error('No se han podido recuperar los datos', 'Error');
        },
      });
  }


  /**
   * Invoca al servicio que realiza la petición al servidor para añadir un alumno
   * al registro de gastos del profesor
   * @author David Sánchez Barragán
   */
  registrarAlumno(alumno: Alumno) {
    this.gestionGastosService.nuevoAlumnoGestionGastos(alumno).subscribe({
      next: (result)=>{
        this.toastr.success('Alumno insertado correctamente');
        this.cargarGastoProfesor();
      },
      error: (x) => {
        this.toastr.error('No se ha podido insertar el alumno');
      }
    })
  }

  //#endregion
  /***********************************************************************/

  /***********************************************************************/
  //#region Eliminación

  /**
   * Elimina un alumno de la base de datos, previa confirmación
   * @param dni DNI del alumno a eliminar
   * @author David Sánchez Barragán
   */
  borrarGastoAlumno(dni: string) {
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
          this.gestionGastosService.eliminarAlumnoDeGastos(dni)
            .subscribe({
              next: (response: any) => {
                this.cargarGastoProfesor();
                this.toastr.success('Alumno borrado correctamente');
              },
              error: (error) => {
                this.toastr.error('Ha ocurrido un error al eliminar al alumno');
              },
            });
        }
      });
  }

  //#endregion
  /***********************************************************************/

  //#endregion
  /***********************************************************************/

  /***********************************************************************/
  //#region Invocación de modales

  nuevoTicketTransporte(dni_alumno: string) {
    let facturaT = new FacturaTransporte(0, '', '', new Date(), 0, '');
    this.modal.open(ModalTicketDesplazamiento, {
      size: 'md',
      backdrop: 'static',
      keyboard: false,
    });

    this.gestionGastosService.facturaTransporteTrigger.emit([
      facturaT, ModoEdicion.nuevo, dni_alumno
    ]);

    this.obtenerGastoDesdeModal();
  }

  /**
 * Abre el modal para agregar una nueva factura de transporte
 */
  nuevoTicketManutencion(dni_alumno: string) {
    let facturaM = new FacturaManutencion(0, '', '', new Date(), 0, '');
    this.modal.open(ModalTicketManutencion, {
      size: 'md',
      backdrop: 'static',
      keyboard: false,
    });

    this.gestionGastosService.facturaManutencionTrigger.emit([
      facturaM, ModoEdicion.nuevo, dni_alumno
    ]);

    this.obtenerGastoDesdeModal();
  }

  /**
   * Actualiza los datos del gasto respecto de las modificaciones en el modal
   * @author David Sánchez Barragán
   */
  public obtenerGastoDesdeModal() {
    this.gestionGastosService.gastoBS.subscribe((gasto) => {
      if (gasto.dni_alumno !== undefined) {
        let i = this.gastoProfesor?.gastos?.findIndex(x => x.dni_alumno == gasto.dni_alumno);
        if (i! >= 0) {
          this.gastoProfesor?.gastos?.splice(i!, 1, gasto);
        }
        this.dtTrigger.next(this.gastoProfesor?.gastos);
      }
    });
  }


  /**
   * Abre un modal para ver o editar a un alumno
   * @param dni DNI del alumno del que se consultarán los gastos
   * @author David Sánchez Barragán
   */
  mostrarGastoAlumno(dni: string) {
    this.router.navigate(['/data-management/gestion-gastos-alumno'],
      { queryParams: { rol: 'Profesor', dni: dni } });
  }

  /**
   * Abre un modal de ayuda
   * @author Dani J. Coello <daniel.jimenezcoello@gmail.com>
   */
  public abrirAyuda(): void {
    this.modal.open(ManualGestionAlumnosComponent, { size: 'lg' });
  }

  public descargarAnexo() {
    this.gestionGastosService.descargarAnexoVI().subscribe({
      next: (res: any) => {
        const blob = new Blob([res], { type: 'application/octet-stream' });
        FileSaver.saveAs(blob, `Anexo6.${res.type.toString().includes('openxml')?'xlsx':'zip'}`);
      },
      error: (e) => {
        this.toastr.error('El anexo no ha podido descargarse', 'Error');
      },
    });
  }

  //#endregion
  /***********************************************************************/

}
