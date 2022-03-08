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
import { tutoriaResponse } from 'src/app/models/tutoriaResponse';
import { Tutoria } from 'src/app/models/tutoria';

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
  gruposArr: any = [];
  dni_tutor?: string;
  dniAux?: string;
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

    if(this.usuario!.isTutor()){
      this.verAnexos();
    }else{
      this.verGrupos();
    }

  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  /**
   * Este metodo te permite ver los anexos
   * @author Pablo y Laura
   */
  public verAnexos() {
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
   * Este metodo sirve para traer los grupos y su tutor de un centro de estudio
   * @author  Laura <lauramorenoramos97@gmail.com>
   */
     public verGrupos(){
      this.anexoService.getGrupos(this.dni_tutor!).subscribe((response) => {
        this.gruposArr = response;
        this.dniAux= this.gruposArr[0].dni_profesor;
        this.verAnexosDirector();
      });

    }
    /**
   * Este metodo te permite ver los anexos para el director
   * @author Laura
   */
     /*public verAnexosDirector() {
      this.anexoService.getAnexos(this.dniAux!).subscribe((response) => {
        this.respuesta = response;
        response = (this.respuesta as any).data;
        // Calling the DT trigger to manually render the table
        this.dtTrigger.next(this.respuesta);
      });
      $.extend(true, $.fn.dataTable.defaults, {
        "language": { "url": '//cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json' }
      })
    }*/

      /**
   * Este metodo te permite ver los anexos para el director
   * @author Laura
   */
       public verAnexosDirector() {
        this.anexoService.getAnexos(this.dniAux!).subscribe({
          next: (res) => {
            this.respuesta = res;
            this.toastr.info('Anexos de: '+this.dniAux, 'Vistas Anexos');
            res = (this.respuesta as any).data;
            // Calling the DT trigger to manually render the table
            this.dtTrigger.next(this.respuesta);
          },
          error: e => {
            console.log(e);
            this.toastr.error('Los anexos afiliados a este grupo no han podido visualizarse', 'Fallo');
            this.respuesta= null;
          }
        });
        $.extend(true, $.fn.dataTable.defaults, {
          "language": { "url": '//cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json' }
        })
      }


  /*public render(): void{
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
   });
  }*/
    /**
   * Este metodo te permite ver los anexos
   * @author  Laura <lauramorenoramos97@gmail.com>
   */
     public verAnexosEliminar() {

      this.anexoService.getAnexos(this.dni_tutor!).subscribe((response) => {
        this.respuesta = response;
        response = (this.respuesta as any).data;
      });
    }

  /**
   *  @author Pablo
   * @param codigo es el mnombre del anexo a descargar
   * Este metodo te permite descargar un anexo en concreto, comprobando si estamos
   * intentando descargar el anexo como tutor o como director/jefe de estudios
   * para usar una variable dni o la otra, te avisa si ha salido mal o bien
   */
  public async descargarAnexo(codigo: string) {

    let hacerlo = await this.dialogService.confirmacion(
      'Descargar',
      `¿Está seguro de que desea descargar el anexo?`
    );

    if (hacerlo) {
      let dni : string;

      if(this.usuario?.isTutor()){
        dni = this.dni_tutor!;
      }else{
        dni = this.dniAux!;
      }

    this.anexoService.descargarAnexo(dni, codigo).subscribe({
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

      let dni : string;

      if(this.usuario?.isTutor()){
        dni = this.dni_tutor!;
      }else{
        dni = this.dniAux!;
      }

    this.anexoService.descargarTodo(dni).subscribe({
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
      let dni : string;

      if(this.usuario?.isTutor()){
        dni = this.dni_tutor!;
      }else{
        dni = this.dniAux!;
      }
    this.anexoService.eliminarAnexo(dni, codigo).subscribe({
      next: (res) => {
        this.toastr.success('Anexo Eliminado', 'Eliminado');

        if(this.usuario?.isTutor()){
          this.verAnexos();
        }else{
          this.verGrupos();
        }

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


    public buscar(dni : string){
      this.dniAux= dni;
      this.verAnexosDirector();
    }

}
