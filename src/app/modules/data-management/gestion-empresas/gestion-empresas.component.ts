import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Empresa } from 'src/app/models/empresa';
import { CrudEmpresasService } from 'src/app/services/crud-empresas.service';
import { LoginStorageUserService } from 'src/app/services/login.storageUser.service';
import { ModalEmpresaComponent } from '../modal-empresa/modal-empresa.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogService } from 'src/app/services/dialog.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-gestion-empresas',
  templateUrl: './gestion-empresas.component.html',
  styleUrls: ['./gestion-empresas.component.scss'],
})
export class GestionEmpresasComponent implements OnInit {
  empresas: Empresa[] = [];
  usuario;
  dniTutor?: string;

  constructor(
    private crudEmpresasService: CrudEmpresasService,
    private modal: NgbModal,
    private storageUser: LoginStorageUserService,
    private dialog: MatDialog,
    public dialogService: DialogService
  ) {
    this.usuario = storageUser.getUser();
    this.dniTutor = this.usuario?.dni;
  }

  ngOnInit(): void {
    this.getEmpresas();
  }

  /**
   * Inicializa las empresas del componente mediante el servicio correspondiente
   * @author Dani J. Coello <daniel.jimenezcoello@gmail.com>
   */
  public getEmpresas(): void {
    this.crudEmpresasService.getEmpresas(this.dniTutor!).subscribe({
      next: (empresas) => {
        this.empresas = empresas;
        this.empresas.forEach((empresa) => {
          this.crudEmpresasService.getRepresentante(empresa.id).subscribe({
            next: (representante) => {
              empresa.representante = representante;
            },
          });
        });
      },
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
   * Elimina una empresa de la base de datos
   * @param idEmpresa el ID de la empresa a eliminar
   * @author Dani J. Coello <daniel.jimenezcoello@gmail.com>
   */
  public deleteEmpresa(empresa: Empresa) {

    /*****************************************************************************************/
    /**************************UNIVERSALIZAR DIÁLOGO CONFIRMACIÓN*****************************/
    /*****************************************************************************************/

    // await this.dialogService.confirmacion(
    //   "Eliminar registro",
    //   `¿Está seguro de que quiere eliminar el registro de la empresa ${empresa.nombre}?`
    //   ).then( resp => {
    //     console.log(resp);
    //   })

    this.dialog
      .open(ConfirmDialogComponent, {
        data: {
          title: 'Eliminar registro',
          message: `¿Está seguro de que quiere eliminar el registro de la empresa ${empresa.nombre}?`,
        },
        width: '400px',
      })
      .afterClosed()
      .subscribe((res) => {
        if (res.respuesta) {
          this.crudEmpresasService.deleteEmpresa(empresa.id).subscribe({
            next: (response: any) => {
              this.getEmpresas();
              console.log(response.message);
            },
          });
        }
      });
  }
}
