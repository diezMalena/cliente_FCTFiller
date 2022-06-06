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
import { ModalTicketDesplazamiento } from '../modal-ticket-desplazamiento/modal-ticket-desplazamiento.component';
import { ModalTicketManutencion } from '../modal-ticket-manutencion/modal-ticket-manutencion.component';
import { ActivatedRoute, Router } from '@angular/router';

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
  public dtElement?: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger = new Subject<any>();

  public gasto?: Gasto;
  public dias_transporte_privado: number = 0;
  public modosEdicion: typeof ModoEdicion = ModoEdicion;
  public isVisible: number = 1;
  public isSelected: boolean = true;
  public dniAlumno = '';

  constructor(
    private gestionGastosService: GestionGastosService,
    public loginStorageUser: LoginStorageUserService,
    private toastr: ToastrService,
    private modal: NgbModal,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      if (params['rol'] == 'Profesor') {
        this.dniAlumno = params['dni'];
      } else {
        this.dniAlumno = this.loginStorageUser.getUser()!.dni;
      }

      this.cargarGasto();

      $.extend(true, $.fn.dataTable.defaults, {
        language: { url: '//cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json' },
      });

      $.fn.dataTable.ext.errMode = 'none';
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
      .obtenerGastosAlumno(this.dniAlumno)
      .subscribe({
        next: (result) => {
          this.gasto = result;
          this.rerender();
          this.dtTrigger.next(this.gasto);
        },
        error: (error) => {
          this.toastr.error('No se han podido recuperar los datos', 'Error');
          this.gasto = undefined;
        },
      });
  }

  //#endregion
  /***********************************************************************/

  /***********************************************************************/
  //#region Actualización
  actualizarDiasVehiculoPrivado() {
    this.gasto!.dias_transporte_privado = this.dias_transporte_privado;
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
    this.dialog
      .open(ConfirmDialogComponent, {
        data: {
          title: 'Eliminar factura',
          message: `¿Está seguro de que quiere eliminar esta factura?`,
        },
        width: '400px',
      })
      .afterClosed()
      .subscribe((res) => {
        if (res.respuesta) {
          this.gestionGastosService.eliminarFacturaTransporte(id).subscribe({
            next: (response: any) => {
              this.cargarGasto();
              this.toastr.success('Factura borrada correctamente');
            },
            error: (error) => {
              this.toastr.error('Ha ocurrido un error al eliminar la factura');
            },
          });
        }
      });
  }

  /**
   * Gestiona la llamada al servicio que eliminará la factura de la base de datos
   * @param id ID del objeto a eliminar
   * @author David Sánchez Barragán
   */
  borrarFacturaManutencion(id: any) {
    this.dialog
      .open(ConfirmDialogComponent, {
        data: {
          title: 'Eliminar factura',
          message: `¿Está seguro de que quiere eliminar esta factura?`,
        },
        width: '400px',
      })
      .afterClosed()
      .subscribe((res) => {
        if (res.respuesta) {
          this.gestionGastosService.eliminarFacturaManutencion(id).subscribe({
            next: (response: any) => {
              this.cargarGasto();
              this.toastr.success('Factura borrada correctamente');
            },
            error: (error) => {
              this.toastr.error('Ha ocurrido un error al eliminar la factura');
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
    this.gestionGastosService.gastoTrigger.emit([
      gasto
    ]);

    this.obtenerGastoDesdeModal();
  }

  /**
   * Abre el modal para agregar una nueva factura de transporte
   */
  nuevoTicketTransporte() {
    let facturaT = new FacturaTransporte(0, '', '', new Date(), 0, '');
    this.modal.open(ModalTicketDesplazamiento, {
      size: 'md',
      backdrop: 'static',
      keyboard: false,
    });

    //Cambiar en un futuro la obtención del DNI, porque se compartirá
    //esta vista con la del profesor
    this.gestionGastosService.facturaTransporteTrigger.emit([
      facturaT, ModoEdicion.nuevo, this.dniAlumno
    ]);

    this.obtenerGastoDesdeModal();
  }

  /**
   * Abre el modal para agregar una nueva factura de transporte
   */
  nuevoTicketManutencion() {
    let facturaM = new FacturaManutencion(0, '', '', new Date(), 0, '');
    this.modal.open(ModalTicketManutencion, {
      size: 'md',
      backdrop: 'static',
      keyboard: false,
    });

    this.gestionGastosService.facturaManutencionTrigger.emit([
      facturaM, ModoEdicion.nuevo, this.dniAlumno
    ]);

    this.obtenerGastoDesdeModal();
  }

  /**
   * Abre un modal para ver o editar una factura de transporte
   * @param factura Objeto con los datos de la factura
   * @param modoEdicion 0 -> edición, 1 -> creación, 2 -> sólo lectura
   * @author David Sánchez Barragán
   */
  mostrarFacturaTransporte(fact: FacturaTransporte, modoEdicion: ModoEdicion) {
    this.modal.open(ModalTicketDesplazamiento, {
      size: 'md',
      backdrop: 'static',
      keyboard: false,
    });

    this.gestionGastosService.facturaTransporteTrigger.emit([
      fact, modoEdicion, this.dniAlumno
    ]);

    this.obtenerGastoDesdeModal();
  }

  /**
  * Abre un modal para ver o editar una factura de transporte
  * @param factura Objeto con los datos de la factura
  * @param modoEdicion 0 -> edición, 1 -> creación, 2 -> sólo lectura
  * @author David Sánchez Barragán
  */
  mostrarFacturaManutencion(fact: FacturaManutencion, modoEdicion: ModoEdicion) {
    this.modal.open(ModalTicketManutencion, {
      size: 'md',
      backdrop: 'static',
      keyboard: false,
    });

    this.gestionGastosService.facturaManutencionTrigger.emit([
      fact, modoEdicion, this.dniAlumno
    ]);

    this.obtenerGastoDesdeModal();
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

  public volver() {
    this.router.navigate(['/data-management/gestion-gastos-profesor']);
  }

  //#endregion
  /***********************************************************************/
}
