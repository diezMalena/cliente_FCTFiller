import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Empresa } from 'src/app/models/empresa';
import { CrudEmpresasService } from 'src/app/services/crud-empresas.service';
import { LoginStorageUserService } from 'src/app/services/login.storageUser.service';
import { ModalEmpresaComponent } from '../modal-empresa/modal-empresa.component';
import { DialogService } from 'src/app/services/dialog.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ManualGestionEmpresasComponent } from '../../manuales/manual-gestion-empresas/manual-gestion-empresas.component';

@Component({
  selector: 'app-gestion-empresas',
  templateUrl: './gestion-empresas.component.html',
  styleUrls: ['./gestion-empresas.component.scss'],
})
export class GestionEmpresasComponent
  implements AfterViewInit, OnDestroy, OnInit
{
  @ViewChild(DataTableDirective, { static: false })
  dtElement?: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject<any>();

  empresas: Empresa[] = [];
  usuario;
  dniTutor?: string;

  constructor(
    private crudEmpresasService: CrudEmpresasService,
    private modal: NgbModal,
    private storageUser: LoginStorageUserService,
    public dialogService: DialogService,
    public toastr: ToastrService
  ) {
    this.usuario = storageUser.getUser();
    this.dniTutor = this.usuario?.dni;
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next(this.empresas);
  }

  ngOnInit(): void {
    delete this.dtOptions['language'];
    this.getEmpresas();
    this.getEmpresasFromModal();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    this.dtElement!.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next(this.empresas);
    });
  }

  /**
   * Inicializa las empresas del componente mediante el servicio correspondiente
   * @author Dani J. Coello <daniel.jimenezcoello@gmail.com>
   */
  public getEmpresas(): void {
    this.crudEmpresasService.getEmpresas(this.dniTutor!).subscribe({
      next: async (empresas) => {
        this.empresas = empresas;
        await this.meterRepresentantesEmpresas(this.empresas);
        this.rerender();
        $.fn.dataTable.ext.errMode = 'throw';
        this.dtTrigger.next(this.empresas);
      },
    });
    $.extend(true, $.fn.dataTable.defaults, {
      language: { url: '//cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json' },
    });
  }

  /**
   * Mete los representantes en las empresas correspondientes
   * @param empresas el vector de empresas
   * @author Dani J. Coello <daniel.jimenezcoello@gmail.com>
   */
  public async meterRepresentantesEmpresas(empresas: Empresa[]) {
    empresas.forEach((empresa) => {
      this.crudEmpresasService.getRepresentante(empresa.id).subscribe({
        next: (representante) => {
          empresa.representante = representante;
        },
      });
    });
  }

  /**
   * Abre un modal con los detalles de la empresa, editable o no según la variable booleana
   * @param empresa la empresa en cuestión
   * @param editar true -> vista de edición; false -> vista de sólo lectura
   * @author Dani J. Coello <daniel.jimenezcoello@gmail.com>
   */
  public mostrarEmpresa(empresa: Empresa, editar: boolean) {
    this.modal.open(ModalEmpresaComponent, {
      size: 'md',
      backdrop: 'static',
      keyboard: false,
    });
    this.crudEmpresasService.empresaTrigger.emit([empresa, editar]);
  }

  /**
   * Elimina una empresa de la base de datos, previa confirmación
   * @param empresa la empresa a eliminar
   * @author Dani J. Coello <daniel.jimenezcoello@gmail.com>
   */
  public async deleteEmpresa(empresa: Empresa) {
    let eliminar = await this.dialogService.confirmacion(
      'Eliminar registro',
      `¿Está seguro de que quiere eliminar el registro de la empresa ${empresa.nombre}?`
    );
    if (eliminar) {
      this.crudEmpresasService.deleteEmpresa(empresa.id).subscribe({
        next: (response: any) => {
          this.getEmpresas();
          this.toastr.success(response.message, response.title);
        },
        error: (err: any) => {
          console.log(err);
          this.toastr.error(err.error.message, err.error.title);
        },
      });
    }
  }

  /**
   * Coge el vector de empresas modificado del modal
   * @author Dani J. Coello <daniel.jimenezcoello@gmail.com>
   */
  public getEmpresasFromModal() {
    this.crudEmpresasService.empresasArray.subscribe((array) => {
      this.empresas = array;
      this.rerender();
    });
  }

  /**
   * Abre un modal de ayuda
   * @author Dani J. Coello <daniel.jimenezcoello@gmail.com>
   */
  public abrirAyuda(): void {
    this.modal.open(ManualGestionEmpresasComponent, { size: 'lg' });
  }
}
