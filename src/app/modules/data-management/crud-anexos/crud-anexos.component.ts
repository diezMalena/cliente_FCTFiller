import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Anexo } from 'src/app/models/anexo';
import { AnexoService } from 'src/app/services/crud-anexos.service';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-crud-anexos',
  templateUrl: './crud-anexos.component.html',
  styleUrls: ['./crud-anexos.component.scss']
})
export class CrudAnexosComponent implements OnInit {
  //anexos: Anexo[] = [];
  respuesta: any =[];
  dni_tutor: string = '4d';
  codigo: string = '';

  constructor(
    private anexoService: AnexoService,
    private router: Router,
    private toastr: ToastrService,
    ){ }

  ngOnInit(): void {
    this.verAnexos();
  }


  /**
   * Este metodo te permite ver los anexos
   * @author Pablo y Laura
   */
  public verAnexos(){
    this.anexoService.getAnexos(this.dni_tutor).subscribe((response)=>{
      this.respuesta=response;
      console.log(response);
    })
  }

  /**
   *  @author Pablo
   * @param codigo es el mnombre del anexo a descargar
   * Este metodo te permite descargar un anexo en concreto, te avisa si ha salido mal o bien
   */
  public descargarAnexo(codigo: string){
    this.anexoService.descargarAnexo(this.dni_tutor,codigo).subscribe({
     next:(res)=>{
       const current= new Date();
       const blob = new Blob([res], {type: 'application/octet-stream'});
        FileSaver.saveAs(blob,codigo);
       this.toastr.success('Anexo Descargado', 'Descarga');
     },
     error: e =>{
       console.log(e);
       this.toastr.error('El anexo no ha podido descargarse', 'Fallo');
     }
   })
    // this.router.navigate(['/data-management/curd-anexos']);
    this.router.navigate(['/data-management/crud-anexos']);
  }


  /**
   * @author Pablo
   * Esta funcion te permite descargar todos los anexos, te avisa si la descarga ha salido bien o mal
   */
  public descargarTodo(){
    this.anexoService.descargarTodo(this.dni_tutor).subscribe({
     next:(res)=>{
       const current= new Date();
       const blob = new Blob([res], {type: 'application/octet-stream'});
        FileSaver.saveAs(blob,'backup_'+current.getTime()+'.zip');
       this.toastr.success('Anexos Descargados', 'Descarga');
     },
     error: e =>{
       console.log(e);
       this.toastr.error('Los anexos no han podido descargarse', 'Fallo');
     }
   })
    // this.router.navigate(['/data-management/curd-anexos']);
    this.router.navigate(['/data-management/crud-anexos']);
  }

  /**
   *  @author Laura <lauramorenoramos97@gmail.com>
   *Esta funcion te permite eliminar un anexo, suscribiendote al metodo eliminar anexo del servicio
   Ademas, te avisa si todo ha salido bien o mal, por ultimo, vuelve a llamar a la funcion para
   que se refresque la vista
   */
  public eliminarAnexo(codigo: string){
    this.anexoService.eliminarAnexo(this.dni_tutor,codigo).subscribe({
     next:(res)=>{
       this.toastr.success('Anexo Eliminado', 'Eliminado');
       this.verAnexos();
     },
     error: e =>{
       console.log(e);
       this.toastr.error('El anexo no ha podido eliminarse', 'Fallo');
     }
   })
    // this.router.navigate(['/data-management/curd-anexos']);
    // this.router.navigate(['/data-management/crud-anexos']);
  }


}
