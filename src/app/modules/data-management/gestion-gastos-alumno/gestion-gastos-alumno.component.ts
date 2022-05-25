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
import { FacturaTransporte } from 'src/app/models/facturaTransporte';
import { GestionGastosService } from 'src/app/services/gestion-gastos.service';
import { Gasto } from 'src/app/models/gasto';
import { FacturaManutencion } from 'src/app/models/facturaManutencion';
import { ModalGestionGastosAlumnoComponent } from '../modal-gestion-gastos-alumno/modal-gestion-gastos-alumno.component';
// import { ManualGestionAlumnosComponent } from '../../manuales/manual-gestion-gastos-alumno/manual-gestion-gastos-alumno.component';

@Component({
  selector: 'app-gestion-gastos-alumno',
  templateUrl: './gestion-gastos-alumno.component.html',
  styleUrls: ['./gestion-gastos-alumno.component.scss'],
})
export class GestionGastosAlumnoComponent
  implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild(DataTableDirective, { static: false })

  /***********************************************************************/
  //#region Inicialización de variables
  dtElement?: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<any>();

  public gasto?: Gasto;
  public modosEdicion: typeof ModoEdicion = ModoEdicion;
  public isVisible: number = 1;
  public isSelected: boolean = true;

  constructor(
    private gestionGastosService: GestionGastosService,
    private loginStorageUser: LoginStorageUserService,
    private toastr: ToastrService,
    private modal: NgbModal,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.cargarGasto();

    $.extend(true, $.fn.dataTable.defaults, {
      language: { url: '//cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json' },
    });
  }



  //#endregion
  /***********************************************************************/

  /***********************************************************************/
  //#region Gestión de datatables

  ngAfterViewInit(): void {
    this.dtTrigger.next(this.gasto);
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
  //#region Obtención de información: gasto

  /**
   * Llama al servicio que realiza la petición al servidor y gestiona la respuesta
   * @author David Sánchez Barragán
   */
  cargarGasto() {
    this.gestionGastosService
      .obtenerGastosAlumno(this.loginStorageUser.getUser()?.dni)
      .subscribe({
        next: (result) => {
          this.gasto = result;
          this.rerender();
          this.dtTrigger.next(this.gasto);
          $.fn.dataTable.ext.errMode = 'throw';
        },
        error: (error) => {
          this.toastr.error('No se han podido recuperar los datos', 'Error');
        },
      });
  }

  //#endregion
  /***********************************************************************/

  /***********************************************************************/
  //#region Actualización
  actualizarDiasVehiculoPrivado() {
    this.gestionGastosService.actualizarDiasVehiculoPrivado(this.gasto!).subscribe({
      next: (result) => {
        this.cargarGasto();
        this.toastr.success('Días actualizados correctamente');
      },
      error: (error) => {
        this.toastr.error('No se han podido actualizar los datos', 'Error');
      }
    })
  }
  //#endregion
  /***********************************************************************/

  /***********************************************************************/
  //#region Eliminación

  /**
   * Gestiona la llamada al servicio que eliminará la factura de la base de datos
   * @param id ID del objeto a eliminar
   * @author David Sánchez Barragán
   */
  borrarFacturaTransporte(id: any) {
    // this.dialog
    //   .open(ConfirmDialogComponent, {
    //     data: {
    //       title: 'Eliminar registro',
    //       message: `¿Está seguro de que quiere eliminar a este alumno?`,
    //     },
    //     width: '400px',
    //   })
    //   .afterClosed()
    //   .subscribe((res) => {
    //     if (res.respuesta) {
    //       this.crudAlumnosService.borrarAlumno(alumno.dni).subscribe({
    //         next: (response: any) => {
    //           this.cargarAlumnos();
    //           this.toastr.success('Alumno borrado correctamente');
    //         },
    //         error: (error) => {
    //           this.toastr.error('Ha ocurrido un error al eliminar al alumno');
    //         },
    //       });
    //     }
    //   });
  }

  //#endregion
  /***********************************************************************/

  //#endregion
  /***********************************************************************/

  /***********************************************************************/
  //#region Invocación de modales

  /**
   * Abre un modal para ver o editar una factura de transporte
   * @param factura Objeto con los datos de la factura
   * @param modoEdicion 0 -> edición, 1 -> creación, 2 -> sólo lectura
   * @author David Sánchez Barragán
   */
  mostrarFacturaTransporte(factura: FacturaTransporte, modoEdicion: ModoEdicion) {
    // this.modal.open(ModalAlumnoComponent, {
    //   size: 'md',
    //   backdrop: 'static',
    //   keyboard: false,
    // });
    // this.crudAlumnosService.alumnoTrigger.emit([alumno, modoEdicion]);
  }

  /**
     * Abre un modal para ver o editar una factura de manutención
     * @param factura Objeto con los datos de la factura
     * @param modoEdicion 0 -> edición, 1 -> creación, 2 -> sólo lectura
     * @author David Sánchez Barragán
     */
  mostrarFacturaManutencion(factura: FacturaManutencion, modoEdicion: ModoEdicion) {
    // this.modal.open(ModalAlumnoComponent, {
    //   size: 'md',
    //   backdrop: 'static',
    //   keyboard: false,
    // });
    // this.crudAlumnosService.alumnoTrigger.emit([alumno, modoEdicion]);
  }

  /**
   * Abre un modal para editar los datos del alumno
   * @author David Sánchez Barragán
   */
  editarDatosAlumno() {
    this.modal.open(ModalGestionGastosAlumnoComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
    });

    let gasto = this.gasto;
    console.log(gasto);
    this.gestionGastosService.gastoTrigger.emit([
      gasto,
    ]);

    this.obtenerGastoDesdeModal();
  }

  /**
   * Actualiza los datos de alumnos respecto de las modificaciones en el modal
   * @author David Sánchez Barragán
   */
  public obtenerFacturasDesdeModal() {
    // this.crudAlumnosService.alumnosArray.subscribe((array) => {
    //   this.listaAlumnos = array;
    //   this.rerender();
    //   this.dtTrigger.next(this.listaAlumnos);
    // });
  }

  /**
   * Actualiza los datos del gasto respecto de las modificaciones en el modal
   * @author David Sánchez Barragán
   */
  public obtenerGastoDesdeModal() {
    this.gestionGastosService.gastoBS.subscribe((gasto) => {
      this.gasto = gasto;
      this.dtTrigger.next(this.gasto);
    });
  }

  /**
   * Abre un modal de ayuda
   * @author Dani J. Coello <daniel.jimenezcoello@gmail.com>
   */
  public abrirAyuda(): void {
    // this.modal.open(ManualGestionAlumnosComponent, { size: 'lg' });
  }

  //#endregion
  /***********************************************************************/
}
