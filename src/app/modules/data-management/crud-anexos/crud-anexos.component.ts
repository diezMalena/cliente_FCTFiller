import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Anexo } from 'src/app/models/anexo';
import { AnexoService } from 'src/app/services/crud-anexos.service';
import * as FileSaver from 'file-saver';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalFirmaComponent } from '../modal-firma/modal-firma.component';
import { LoginStorageUserService } from 'src/app/services/login.storageUser.service';
import { Subject } from 'rxjs';
import { DialogService } from 'src/app/services/dialog.service';
import {ManualCrudAnexosComponent} from '../../manuales/manual-crud-anexos/manual-crud-anexos.component';


@Component({
  selector: 'app-crud-anexos',
  templateUrl: './crud-anexos.component.html',
  styleUrls: ['./crud-anexos.component.scss']
})
export class CrudAnexosComponent implements OnDestroy, OnInit {

  dtOptions: DataTables.Settings = {};
  // dtOptions: any  = {};
  dtTrigger = new Subject<any>();
  data: any;

  //anexos: Anexo[] = [];
  usuario;
  respuesta: any = [];
  dni_tutor?: string;
  codigo: string = '';

  constructor(
    private anexoService: AnexoService,
    private router: Router,
    private toastr: ToastrService,
    private modal: NgbModal,
    private storageUser: LoginStorageUserService,
    public dialogService: DialogService
  ) {
    this.usuario = storageUser.getUser();
    this.dni_tutor = this.usuario?.dni
  }

  ngOnInit(): void {
    delete this.dtOptions['language'];

    this.verAnexos();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  /**
   * Este metodo te permite ver los anexos
   * @author Pablo y Laura
   */
  public verAnexos() {

    // let table = $('#dataTable').DataTable({
    //   pagingType: 'full_numbers',
    //   pageLength: 10,
    //   processing: true,
    //   lengthMenu: [5, 10, 20, 50],
    //   language: {
    //     url: '//cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json',
    //     // "lengthMenu": "Mostrar _MENU_ registros por página",
    //     // "zeroRecords": "Sin resultados",
    //     // "info": "Mostrando página PAGE de PAGES",
    //     // "infoEmpty": "Sin registros disponibles",
    //     // "infoFiltered": "(MAX registros totales)",
    //     // "search": "Filtrar: ",
    //     // "searchPlaceholder": "Escriba para empezar",
    //     // "paginate": {
    //     //   "first": "<<",
    //     //   "last": ">>",
    //     //   "next": ">",
    //     //   "previous": "<",
    //     // }
    //   }
    // });

    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 10,
    //   processing: true,
    //   lengthMenu: [5, 10, 20, 50],
    //   responsive: true,
    //   language: {
    //     url: '//cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json'
    //     // "lengthMenu": "Mostrar _MENU_ registros por página",
    //     // "zeroRecords": "Sin resultados",
    //     // "info": "Mostrando página _PAGE_ de _PAGES_",
    //     // "infoEmpty": "Sin registros disponibles",
    //     // "infoFiltered": "(_MAX_ registros totales)",
    //     // "search": "Filtrar: ",
    //     // "searchPlaceholder": "Escriba para empezar",
    //     // "paginate": {
    //     //   "first": "<<",
    //     //   "last": ">>",
    //     //   "next": ">",
    //     //   "previous": "<",
    //     // }
    //   }
    // };

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json'
      }
    };
    this.anexoService.getAnexos(this.dni_tutor!).subscribe((response) => {
      this.respuesta = response;
      response = (this.respuesta as any).data;
      // Calling the DT trigger to manually render the table
      this.dtTrigger.next(this.respuesta);
    });
    $.extend(true, $.fn.dataTable.defaults, {
      "language": { "url": '//cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json' }
    })
  }

  /**
   *  @author Pablo
   * @param codigo es el mnombre del anexo a descargar
   * Este metodo te permite descargar un anexo en concreto, te avisa si ha salido mal o bien
   */
  public async descargarAnexo(codigo: string) {

    let hacerlo = await this.dialogService.confirmacion(
      'Descargar',
      `¿Está seguro de que desea descargar el anexo?`
    );

    if (hacerlo) {
    this.anexoService.descargarAnexo(this.dni_tutor!, codigo).subscribe({
      next: (res) => {
        const current = new Date();
        const blob = new Blob([res], { type: 'application/octet-stream' });
        FileSaver.saveAs(blob, codigo);
        this.toastr.success('Anexo Descargado', 'Descarga');
      },
      error: e => {
        console.log(e);
        this.toastr.error('El anexo no ha podido descargarse', 'Fallo');
      }
    })
    // this.router.navigate(['/data-management/curd-anexos']);
    this.router.navigate(['/data-management/crud-anexos']);
  }else{
    this.toastr.info('No has descargado el anexo', 'Descarga');
  }
}


  /**
   * @author Pablo
   * Esta funcion te permite descargar todos los anexos, te avisa si la descarga ha salido bien o mal
   */
  public async descargarTodo() {

    let hacerlo = await this.dialogService.confirmacion(
      'Descargar',
      `¿Está seguro de que desea descargar los anexos?`
    );

    if (hacerlo) {
    this.anexoService.descargarTodo(this.dni_tutor!).subscribe({
      next: (res) => {
        const current = new Date();
        const blob = new Blob([res], { type: 'application/octet-stream' });
        FileSaver.saveAs(blob, 'backup_' + current.getTime() + '.zip');
        this.toastr.success('Anexos Descargados', 'Descarga');
      },
      error: e => {
        console.log(e);
        this.toastr.error('Los anexos no han podido descargarse', 'Fallo');
      }
    })
    // this.router.navigate(['/data-management/curd-anexos']);
    this.router.navigate(['/data-management/crud-anexos']);
  }else{
    this.toastr.info('No has descargado los anexos', 'Descarga');
  }
  }

  /**
   *  @author Laura <lauramorenoramos97@gmail.com>
   *Esta funcion te permite eliminar un anexo, suscribiendote al metodo eliminar anexo del servicio
   Ademas, te avisa si todo ha salido bien o mal, por ultimo, vuelve a llamar a la funcion para
   que se refresque la vista
   */
  public async eliminarAnexo(codigo: string) {

    let hacerlo = await this.dialogService.confirmacion(
      'Eliminar',
      `¿Está seguro de que desea eliminar el anexo?: `+codigo
    );

    if (hacerlo) {
    this.anexoService.eliminarAnexo(this.dni_tutor!, codigo).subscribe({
      next: (res) => {
        this.toastr.success('Anexo Eliminado', 'Eliminado');
        this.verAnexos();
      },
      error: e => {
        console.log(e);
        this.toastr.error('El anexo no ha podido eliminarse', 'Fallo');
      }
    })
  }else{
    this.toastr.info('Has decidido no eliminar el anexo', 'No eliminado');
  }
  }


  /**
   *  @author Pablo
   * @param codigo es el mnombre del anexo a descargar
   * Este metodo te permite descargar un anexo en concreto, te avisa si ha salido mal o bien
   */
  //  public firmarAnexo(codigo: string){
  //   this.anexoService.descargarAnexo(this.dni_tutor,codigo).subscribe({
  //    next:(res)=>{
  //      const current= new Date();
  //      const blob = new Blob([res], {type: 'application/octet-stream'});
  //       FileSaver.saveAs(blob,codigo);
  //      this.toastr.success('Anexo Descargado', 'Descarga');
  //    },
  //    error: e =>{
  //      console.log(e);
  //      this.toastr.error('El anexo no ha podido descargarse', 'Fallo');
  //    }
  //  })
  //   // this.router.navigate(['/data-management/curd-anexos']);
  //   this.router.navigate(['/data-management/crud-anexos']);
  // }


  /**
 * Abre un modal para la firma del anexo
 * @author Pablo
 */
  public abrirModalFirma(codigo_anexo: string) {
    const modalFirma = this.modal.open(ModalFirmaComponent, {
      size: 'md',
      backdrop: 'static',
      keyboard: false,
    });
    modalFirma.componentInstance.codigo_anexo = codigo_anexo
  }


    public abrirAyuda(){
      this.modal.open(ManualCrudAnexosComponent, {size: 'lg'});
    }
}
